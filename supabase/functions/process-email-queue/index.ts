// Supabase Edge Function: process-email-queue
// Reads pgmq queues (auth_emails first, then transactional_emails) and sends
// via Lovable Email API. Called every few seconds by pg_cron.
// deno-lint-ignore-file no-explicit-any
import { sendLovableEmail } from "npm:@lovable.dev/email-js@^0.0.4";
import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@^2.108.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const MAX_RETRIES = 5;
const DEFAULT_BATCH_SIZE = 10;
const DEFAULT_SEND_DELAY_MS = 200;
const DEFAULT_AUTH_TTL_MINUTES = 15;
const DEFAULT_TRANSACTIONAL_TTL_MINUTES = 60;

function isRateLimited(error: unknown): boolean {
  if (error && typeof error === "object" && "status" in error) {
    return (error as { status: number }).status === 429;
  }
  return error instanceof Error && error.message.includes("429");
}
function isForbidden(error: unknown): boolean {
  if (error && typeof error === "object" && "status" in error) {
    return (error as { status: number }).status === 403;
  }
  return error instanceof Error && error.message.includes("403");
}
function getRetryAfterSeconds(error: unknown): number {
  if (error && typeof error === "object" && "retryAfterSeconds" in error) {
    return (error as { retryAfterSeconds: number | null }).retryAfterSeconds ?? 60;
  }
  return 60;
}

async function moveToDlq(
  supabase: SupabaseClient<any, any>,
  queue: string,
  msg: { msg_id: number; message: Record<string, any> },
  reason: string,
) {
  const payload = msg.message;
  await supabase.from("email_send_log").insert({
    message_id: payload.message_id,
    template_name: (payload.label || queue) as string,
    recipient_email: payload.to,
    status: "dlq",
    error_message: reason,
  });
  const { error } = await supabase.rpc("move_to_dlq", {
    source_queue: queue,
    dlq_name: `${queue}_dlq`,
    message_id: msg.msg_id,
    payload,
  });
  if (error) console.error("Failed to move message to DLQ", { queue, msg_id: msg.msg_id, reason, error });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!apiKey || !supabaseUrl || !supabaseServiceKey) {
    console.error("Missing required environment variables");
    return new Response(JSON.stringify({ error: "Server configuration error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const { data: state } = await supabase
    .from("email_send_state")
    .select("retry_after_until, batch_size, send_delay_ms, auth_email_ttl_minutes, transactional_email_ttl_minutes")
    .single();

  if (state?.retry_after_until && new Date(state.retry_after_until) > new Date()) {
    return new Response(JSON.stringify({ skipped: true, reason: "rate_limited" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const batchSize = state?.batch_size ?? DEFAULT_BATCH_SIZE;
  const sendDelayMs = state?.send_delay_ms ?? DEFAULT_SEND_DELAY_MS;
  const ttlMinutes: Record<string, number> = {
    auth_emails: state?.auth_email_ttl_minutes ?? DEFAULT_AUTH_TTL_MINUTES,
    transactional_emails: state?.transactional_email_ttl_minutes ?? DEFAULT_TRANSACTIONAL_TTL_MINUTES,
  };

  let totalProcessed = 0;

  for (const queue of ["auth_emails", "transactional_emails"]) {
    const { data: messages, error: readError } = await supabase.rpc("read_email_batch", {
      queue_name: queue,
      batch_size: batchSize,
      vt: 30,
    });
    if (readError) {
      console.error("Failed to read email batch", { queue, error: readError });
      continue;
    }
    if (!messages?.length) continue;

    const messageIds = Array.from(
      new Set(
        messages
          .map((msg: any) => (msg?.message?.message_id && typeof msg.message.message_id === "string" ? msg.message.message_id : null))
          .filter((id: string | null): id is string => Boolean(id)),
      ),
    );
    const failedAttemptsByMessageId = new Map<string, number>();
    if (messageIds.length > 0) {
      const { data: failedRows } = await supabase
        .from("email_send_log")
        .select("message_id")
        .in("message_id", messageIds)
        .eq("status", "failed");
      for (const row of failedRows ?? []) {
        const id = row?.message_id;
        if (typeof id !== "string" || !id) continue;
        failedAttemptsByMessageId.set(id, (failedAttemptsByMessageId.get(id) ?? 0) + 1);
      }
    }

    for (let i = 0; i < messages.length; i++) {
      const msg = messages[i];
      const payload = msg.message;
      const failedAttempts =
        payload?.message_id && typeof payload.message_id === "string"
          ? (failedAttemptsByMessageId.get(payload.message_id) ?? 0)
          : msg.read_ct ?? 0;

      const queuedAt = payload.queued_at ?? msg.enqueued_at;
      if (queuedAt) {
        const ageMs = Date.now() - new Date(queuedAt).getTime();
        const maxAgeMs = ttlMinutes[queue] * 60 * 1000;
        if (ageMs > maxAgeMs) {
          await moveToDlq(supabase, queue, msg, `TTL exceeded (${ttlMinutes[queue]} minutes)`);
          continue;
        }
      }
      if (failedAttempts >= MAX_RETRIES) {
        await moveToDlq(supabase, queue, msg, `Max retries (${MAX_RETRIES}) exceeded (attempted ${failedAttempts} times)`);
        continue;
      }

      if (payload.message_id) {
        const { data: alreadySent } = await supabase
          .from("email_send_log")
          .select("id")
          .eq("message_id", payload.message_id)
          .eq("status", "sent")
          .maybeSingle();
        if (alreadySent) {
          await supabase.rpc("delete_email", { queue_name: queue, message_id: msg.msg_id });
          continue;
        }
      }

      try {
        await sendLovableEmail(
          {
            run_id: payload.run_id,
            to: payload.to,
            from: payload.from,
            sender_domain: payload.sender_domain,
            subject: payload.subject,
            html: payload.html,
            text: payload.text,
            purpose: payload.purpose,
            label: payload.label,
            idempotency_key: payload.idempotency_key,
            unsubscribe_token: payload.unsubscribe_token,
            message_id: payload.message_id,
          },
          { apiKey, sendUrl: Deno.env.get("LOVABLE_SEND_URL") ?? undefined },
        );
        await supabase.from("email_send_log").insert({
          message_id: payload.message_id,
          template_name: payload.label || queue,
          recipient_email: payload.to,
          status: "sent",
        });
        await supabase.rpc("delete_email", { queue_name: queue, message_id: msg.msg_id });
        totalProcessed++;
      } catch (error) {
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.error("Email send failed", { queue, msg_id: msg.msg_id, error: errorMsg });

        if (isRateLimited(error)) {
          await supabase.from("email_send_log").insert({
            message_id: payload.message_id,
            template_name: payload.label || queue,
            recipient_email: payload.to,
            status: "failed",
            error_message: errorMsg.slice(0, 1000),
          });
          const retryAfterSecs = getRetryAfterSeconds(error);
          await supabase
            .from("email_send_state")
            .update({
              retry_after_until: new Date(Date.now() + retryAfterSecs * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("id", 1);
          return new Response(JSON.stringify({ processed: totalProcessed, stopped: "rate_limited" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        if (isForbidden(error)) {
          await moveToDlq(supabase, queue, msg, errorMsg.slice(0, 1000));
          return new Response(JSON.stringify({ processed: totalProcessed, stopped: "forbidden" }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        await supabase.from("email_send_log").insert({
          message_id: payload.message_id,
          template_name: payload.label || queue,
          recipient_email: payload.to,
          status: "failed",
          error_message: errorMsg.slice(0, 1000),
        });
        if (payload?.message_id && typeof payload.message_id === "string") {
          failedAttemptsByMessageId.set(payload.message_id, failedAttempts + 1);
        }
      }

      if (i < messages.length - 1) await new Promise((r) => setTimeout(r, sendDelayMs));
    }
  }

  return new Response(JSON.stringify({ processed: totalProcessed }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "242914892Vik!";
const NOTIFY_EMAIL = "vrm.marc@gmail.com";

const leadInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  whatsapp: z.string().trim().min(5).max(40),
  company: z.string().trim().min(1).max(160),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadInputSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: inserted, error } = await supabaseAdmin
      .from("leads")
      .insert({
        name: data.name,
        whatsapp: data.whatsapp,
        company: data.company,
      })
      .select("id, created_at")
      .single();

    if (error) {
      console.error("[submitLead] insert error", error);
      throw new Error("Não foi possível registrar o contato. Tente novamente.");
    }

    // Best-effort: enqueue the notification email directly (avoids self-fetch
    // limitations in serverless workers).
    try {
      const React = await import("react");
      const { render } = await import("@react-email/components");
      const { template } = await import("@/lib/email-templates/new-lead");

      const templateData = { ...data, createdAt: inserted.created_at };
      const element = React.createElement(template.component, templateData);
      const [html, plainText] = await Promise.all([
        render(element),
        render(element, { plainText: true }),
      ]);
      const subject =
        typeof template.subject === "function"
          ? template.subject(templateData)
          : template.subject;

      const SENDER_DOMAIN = "notify.conemagtestes.permutada.com.br";
      const messageId = crypto.randomUUID();
      const idempotencyKey = `lead-${inserted.id}`;

      // Get or create unsubscribe token for the notification recipient
      const normalizedEmail = NOTIFY_EMAIL.toLowerCase();
      let unsubscribeToken: string | null = null;
      const { data: existingToken } = await supabaseAdmin
        .from("email_unsubscribe_tokens")
        .select("token, used_at")
        .eq("email", normalizedEmail)
        .maybeSingle();
      if (existingToken && !existingToken.used_at) {
        unsubscribeToken = existingToken.token;
      } else if (!existingToken) {
        const bytes = new Uint8Array(32);
        crypto.getRandomValues(bytes);
        const newToken = Array.from(bytes)
          .map((b) => b.toString(16).padStart(2, "0"))
          .join("");
        await supabaseAdmin
          .from("email_unsubscribe_tokens")
          .upsert(
            { token: newToken, email: normalizedEmail },
            { onConflict: "email", ignoreDuplicates: true },
          );
        const { data: storedToken } = await supabaseAdmin
          .from("email_unsubscribe_tokens")
          .select("token")
          .eq("email", normalizedEmail)
          .maybeSingle();
        unsubscribeToken = storedToken?.token ?? newToken;
      }

      await supabaseAdmin.from("email_send_log").insert({
        message_id: messageId,
        template_name: "new-lead",
        recipient_email: NOTIFY_EMAIL,
        status: "pending",
      });

      const { error: enqueueError } = await supabaseAdmin.rpc("enqueue_email", {
        queue_name: "transactional_emails",
        payload: {
          message_id: messageId,
          to: NOTIFY_EMAIL,
          from: `Conemag <noreply@${SENDER_DOMAIN}>`,
          sender_domain: SENDER_DOMAIN,
          subject,
          html,
          text: plainText,
          purpose: "transactional",
          label: "new-lead",
          idempotency_key: idempotencyKey,
          unsubscribe_token: unsubscribeToken,
          queued_at: new Date().toISOString(),
        },
      });
      if (enqueueError) {
        console.error("[submitLead] enqueue failed", enqueueError);
        await supabaseAdmin.from("email_send_log").insert({
          message_id: messageId,
          template_name: "new-lead",
          recipient_email: NOTIFY_EMAIL,
          status: "failed",
          error_message: enqueueError.message ?? "Failed to enqueue",
        });
      }
    } catch (err) {
      console.error("[submitLead] notify error", err);
    }

    return { ok: true, id: inserted.id };
  });

const adminAuthSchema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(256),
});

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => adminAuthSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.username !== ADMIN_USER || data.password !== ADMIN_PASSWORD) {
      throw new Error("Usuário ou senha incorretos.");
    }
    return { ok: true, token: ADMIN_PASSWORD };
  });

const listLeadsSchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

export const listLeads = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => listLeadsSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.username !== ADMIN_USER || data.password !== ADMIN_PASSWORD) {
      throw new Error("Não autorizado.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: leads, error } = await supabaseAdmin
      .from("leads")
      .select("id, name, whatsapp, company, created_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (error) {
      console.error("[listLeads] error", error);
      throw new Error("Falha ao carregar leads.");
    }
    return { leads: leads ?? [] };
  });
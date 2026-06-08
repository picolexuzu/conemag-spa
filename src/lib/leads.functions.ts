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

    // Try to send email notification (best-effort, never blocks)
    try {
      const baseUrl =
        process.env.LOVABLE_APP_URL ||
        process.env.VITE_PUBLIC_SITE_URL ||
        "";
      await fetch(`${baseUrl}/lovable/email/transactional/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-notify": "1",
        },
        body: JSON.stringify({
          templateName: "new-lead",
          recipientEmail: NOTIFY_EMAIL,
          idempotencyKey: `lead-${inserted.id}`,
          templateData: { ...data, createdAt: inserted.created_at },
        }),
      }).catch(() => undefined);
    } catch {
      // ignore — email pipeline may not be configured yet
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
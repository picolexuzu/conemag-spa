import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
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

    // Best-effort email notification — never block the form submit
    try {
      const req = getRequest();
      const origin = new URL(req.url).origin;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      if (serviceKey) {
        const res = await fetch(`${origin}/lovable/email/transactional/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-internal-key": serviceKey,
          },
          body: JSON.stringify({
            templateName: "new-lead",
            recipientEmail: NOTIFY_EMAIL,
            idempotencyKey: `lead-${inserted.id}`,
            templateData: { ...data, createdAt: inserted.created_at },
          }),
        });
        if (!res.ok) {
          console.error("[submitLead] notify failed", res.status, await res.text().catch(() => ""));
        }
      } else {
        console.warn("[submitLead] SUPABASE_SERVICE_ROLE_KEY not set; skipping email notify");
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
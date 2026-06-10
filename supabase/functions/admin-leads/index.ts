// Supabase Edge Function: admin-leads
// POST { action: "login" | "list", username, password }
// deno-lint-ignore-file no-explicit-any
import { createClient } from "npm:@supabase/supabase-js@^2.108.0";

const ADMIN_USER = "admin";
const ADMIN_PASSWORD = "242914892Vik!";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  const { action, username, password } = body ?? {};
  if (username !== ADMIN_USER || password !== ADMIN_PASSWORD) {
    return new Response(JSON.stringify({ error: "Usuário ou senha incorretos." }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  if (action === "login") {
    return new Response(JSON.stringify({ ok: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  if (action === "list") {
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await supabase
      .from("leads")
      .select("id, name, whatsapp, company, created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("[admin-leads] list error", error);
      return new Response(JSON.stringify({ error: "Falha ao carregar leads." }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ leads: data ?? [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
});

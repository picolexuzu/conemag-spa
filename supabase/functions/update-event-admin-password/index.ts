import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

Deno.serve(async (req) => {
  const respond = (status: number, data: Record<string, unknown>) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return respond(405, { error: "method_not_allowed" });
  if (Date.now() > Date.parse("2026-10-19T13:10:00Z")) return respond(410, { error: "expired" });
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const password = Deno.env.get("EVENT_ADMIN_PASSWORD");
  if (!url || !key || !password) return respond(503, { error: "configuration_missing" });
  const client = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const token = req.headers.get("Authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return respond(401, { error: "unauthorized" });
  const { data: identity, error: identityError } = await client.auth.getUser(token);
  if (identityError || identity.user?.id !== "56ca4cdd-d634-456a-9732-2825747d570b")
    return respond(403, { error: "forbidden" });
  const { data, error } = await client.auth.admin.updateUserById(identity.user.id, { password });
  if (error || !data.user) return respond(422, { error: "password_update_rejected" });
  const { data: login, error: loginError } = await client.auth.signInWithPassword({
    email: "admin@admin.com", password,
  });
  if (loginError || login.user?.id !== identity.user.id)
    return respond(500, { error: "login_verification_failed" });
  await client.auth.signOut();
  return respond(200, { updated: true, login_verified: true });
});
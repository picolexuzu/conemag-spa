import { test } from "node:test";
import { strict as assert } from "node:assert";
import { createClient } from "@supabase/supabase-js";

test("Visitors and authenticated non-admins cannot read event forms", async () => {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  assert.ok(url && serviceKey && publicKey, "Backend test credentials must be available");
  const admin = createClient(url, serviceKey, { auth: { persistSession: false } });
  const visitor = createClient(url, publicKey, { auth: { persistSession: false } });
  const anonymous = await visitor.from("event_leads").select("id");
  assert.ok(anonymous.error || anonymous.data?.length === 0);
  const password = crypto.randomUUID() + crypto.randomUUID();
  const email = `permission-test-${crypto.randomUUID()}@example.com`;
  const created = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  assert.equal(created.error, null);
  const user = created.data.user;
  assert.ok(user);
  try {
    const login = await visitor.auth.signInWithPassword({ email, password });
    assert.equal(login.error, null);
    const result = await visitor.from("event_leads").select("id");
    assert.equal(result.error, null);
    assert.deepEqual(result.data, []);
    const role = await visitor.rpc("has_role", { _user_id: user.id, _role: "admin" });
    assert.equal(role.data, false);
  } finally {
    await admin.auth.admin.deleteUser(user.id);
  }
});
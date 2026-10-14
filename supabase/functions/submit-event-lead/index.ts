import { createClient } from "npm:@supabase/supabase-js@2";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { z } from "npm:zod@3";

const schema = z.object({
  name: z.string().trim().min(2).max(100), company: z.string().trim().min(2).max(150),
  whatsapp: z.string().trim().max(30).refine(v => /^\d{10,13}$/.test(v.replace(/\D/g, ""))),
  city_state: z.string().trim().min(3).max(120),
  challenge: z.enum(["Minha produção não acompanha a demanda", "Meu pátio está cheio, com muita sucata volumosa", "Quero valorizar melhor o material que vendo", "Gasto muito com movimentação e transporte", "Quero investir em um novo equipamento"]),
  material: z.enum(["Sucatas ferrosas / mistas", "Alumínio / perfis", "Cavacos / limalhas", "Chapas e estruturas metálicas", "Outros materiais"]),
  monthly_volume: z.enum(["Até 100 toneladas", "100 a 500 toneladas", "500 a 1.000 toneladas", "Acima de 1.000 toneladas", "Ainda não sei informar"]),
  current_process: z.enum(["Principalmente manual", "Já utilizo prensas ou tesouras", "Terceirizo o beneficiamento", "Estou começando uma operação"]),
  sale_condition: z.enum(["Sucatas soltas, sem beneficiamento", "Sucatas cortadas", "Sucatas compactadas / enfardadas", "Material separado e beneficiado"]),
  investment_timing: z.enum(["Imediatamente", "Nos próximos 3 meses", "Nos próximos 6 meses", "Estou pesquisando"]),
  consent: z.literal(true), equipment_interest: z.enum(["thx", "tvx", "tjx", "psx", "psx-manual", "plx", "pbx", "bmx", "tpx", "gtx", "ggx", "gfx", "trx"]).optional(),
  submission_id: z.string().uuid(), website: z.string().max(0).optional(),
});
const reply = (body: object, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
Deno.serve(async req => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return reply({ error: "Método não permitido." }, 405);
  try {
    const text = await req.text();
    if (text.length > 10000) return reply({ error: "Envio muito grande." }, 413);
    const parsed = schema.safeParse(JSON.parse(text));
    if (!parsed.success) return reply({ error: "Confira os dados e a autorização de contato." }, 400);
    const url = Deno.env.get("SUPABASE_URL"); const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !key) return reply({ error: "Atendimento temporariamente indisponível." }, 503);
    const { website: _, ...data } = parsed.data;
    const qualification = ["Imediatamente", "Nos próximos 3 meses"].includes(data.investment_timing) ? "QUENTE" : data.investment_timing === "Nos próximos 6 meses" ? "EM AVALIAÇÃO" : "EM PESQUISA";
    const { error } = await createClient(url, key).from("event_leads").insert({ ...data, whatsapp: data.whatsapp.replace(/\D/g, ""), qualification });
    if (error && error.code !== "23505") { console.error("Event lead storage failure", error.code); return reply({ error: "Não foi possível enviar. Tente novamente." }, 500); }
    return reply({ success: true });
  } catch { return reply({ error: "Envio inválido. Tente novamente." }, 400); }
});
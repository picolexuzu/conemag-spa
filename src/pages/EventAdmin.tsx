import { useEffect, useState } from "react";
import { Loader2, LogOut, Search, RefreshCw, ChevronLeft, ChevronRight, Eye, MessageCircle, LockKeyhole } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { diagnosticQuestions } from "@/lib/event-diagnostic";

type Lead = Tables<"event_leads">;
const PAGE_SIZE = 30;
const date = (value: string) => new Date(value).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

export default function EventAdmin() {
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Lead | null>(null);

  useEffect(() => {
    let active = true;
    async function verify() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error: roleError } = user ? await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" }) : { data: false, error: null };
      if (!active) return;
      setAuthorized(data === true && !roleError);
      if (!data) { setRows([]); setTotal(0); }
      setChecking(false);
    }
    void verify();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => { window.setTimeout(() => { void verify(); }, 0); });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  async function load() {
    setBusy(true); setError("");
    let request = supabase.from("event_leads").select("*", { count: "exact" }).order("created_at", { ascending: false }).range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
    const term = query.replace(/[^\p{L}\p{N}\s@.-]/gu, "").trim();
    if (term) request = request.or(`name.ilike.%${term}%,company.ilike.%${term}%,whatsapp.ilike.%${term}%,equipment_interest.ilike.%${term}%`);
    const { data, count, error: readError } = await request;
    if (readError) { setRows([]); setError("Não foi possível consultar os formulários. Tente novamente."); }
    else { setRows(data ?? []); setTotal(count ?? 0); }
    setBusy(false);
  }
  useEffect(() => { if (authorized) void load(); }, [authorized, page, query]);

  async function login(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError("");
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setPassword("");
    if (loginError || !data.user) setError("E-mail ou senha inválidos.");
    else {
      const { data: admin, error: roleError } = await supabase.rpc("has_role", { _user_id: data.user.id, _role: "admin" });
      if (!admin || roleError) { await supabase.auth.signOut(); setError("Esta conta não tem acesso à área administrativa."); }
      else setAuthorized(true);
    }
    setBusy(false);
  }

  return <EventLayout><section className="event-shell py-8 sm:py-12">
    {checking ? <div className="flex justify-center py-20"><Loader2 className="animate-spin" aria-label="Verificando acesso" /></div> : !authorized ? <div className="max-w-sm mx-auto py-8">
      <LockKeyhole className="text-primary mb-5" size={32} /><p className="text-sm font-semibold text-primary">ECO EXPO 2026</p><h1 className="text-3xl font-bold mt-2 mb-8">Acesso administrativo</h1>
      <form onSubmit={login} className="space-y-5"><label className="block font-semibold text-sm">E-mail<Input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} className="mt-2 h-12" /></label><label className="block font-semibold text-sm">Senha<Input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-2 h-12" /></label>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}<Button type="submit" disabled={busy} className="w-full h-12">{busy ? <Loader2 className="animate-spin" /> : <LockKeyhole />} Entrar</Button></form>
    </div> : <>
      <div className="flex flex-wrap justify-between items-start gap-4 mb-8"><div><p className="text-sm font-semibold text-primary">ECO EXPO 2026</p><h1 className="text-3xl font-bold mt-2">Formulários da feira</h1><p className="text-muted-foreground mt-2">{total} {total === 1 ? "envio" : "envios"}{query ? " encontrados" : " recebidos"}</p></div><Button variant="outline" onClick={() => { setAuthorized(false); setRows([]); setSelected(null); void supabase.auth.signOut(); }}><LogOut /> Sair</Button></div>
      <div className="flex gap-2 mb-6"><form className="flex gap-2 flex-1" onSubmit={e => { e.preventDefault(); setPage(0); setQuery(search); }}><Input aria-label="Buscar por nome, empresa, WhatsApp ou máquina" placeholder="Nome, empresa, WhatsApp ou máquina" value={search} onChange={e => setSearch(e.target.value)} /><Button type="submit" variant="outline" size="icon" aria-label="Buscar" title="Buscar"><Search /></Button></form><Button variant="outline" size="icon" disabled={busy} aria-label="Atualizar" title="Atualizar" onClick={() => void load()}><RefreshCw className={busy ? "animate-spin" : ""} /></Button></div>
      {error && <p role="alert" className="text-destructive mb-4">{error}</p>}
      {busy ? <div className="py-16 flex justify-center"><Loader2 className="animate-spin" /></div> : rows.length === 0 ? <p className="text-muted-foreground py-12 text-center">{query ? "Nenhum formulário encontrado." : "Nenhum formulário recebido ainda."}</p> : <div className="divide-y border-y">{rows.map(lead => <div key={lead.id} className="py-5 flex flex-wrap sm:flex-nowrap items-center gap-4"><div className="min-w-0 flex-1"><p className="font-bold break-words">{lead.name}</p><p className="text-sm break-words">{lead.company} · {lead.city_state}</p><p className="text-xs text-muted-foreground mt-2">{date(lead.created_at)} · {lead.equipment_interest?.toUpperCase() ?? "Geral"}</p></div><span className="text-xs font-bold text-primary">{lead.qualification}</span><Button variant="outline" onClick={() => setSelected(lead)}><Eye size={16} /> Ver respostas</Button></div>)}</div>}
      <div className="flex items-center justify-between gap-3 mt-6"><Button variant="outline" disabled={page === 0 || busy} onClick={() => setPage(p => p - 1)}><ChevronLeft /> Anterior</Button><span className="text-xs">{page + 1} / {Math.max(1, Math.ceil(total / PAGE_SIZE))}</span><Button variant="outline" disabled={(page + 1) * PAGE_SIZE >= total || busy} onClick={() => setPage(p => p + 1)}>Próxima <ChevronRight /></Button></div>
    </>}
  </section><Dialog open={!!selected} onOpenChange={open => { if (!open) setSelected(null); }}><DialogContent className="max-h-[85dvh] overflow-y-auto w-[calc(100%-2rem)] sm:max-w-xl"><DialogHeader><DialogTitle>{selected?.name}</DialogTitle><DialogDescription>{selected?.company} · {selected?.city_state}</DialogDescription></DialogHeader>{selected && <><div className="text-sm space-y-2"><p><strong>Recebido:</strong> {date(selected.created_at)}</p><p><strong>Máquina:</strong> {selected.equipment_interest?.toUpperCase() ?? "Geral"}</p><p><strong>Classificação:</strong> {selected.qualification}</p><p><strong>WhatsApp:</strong> {selected.whatsapp}</p></div><dl className="space-y-4 border-t pt-4">{diagnosticQuestions.map(q => <div key={q.key}><dt className="text-xs font-semibold text-muted-foreground">{q.title}</dt><dd className="text-sm font-medium mt-1">{selected[q.key]}</dd></div>)}</dl><p className="text-xs text-muted-foreground">Consentimento: {selected.consent ? "autorizado" : "não autorizado"} · {date(selected.consent_at)} · {selected.consent_version}</p><Button asChild><a href={`https://wa.me/${selected.whatsapp.replace(/\D/g, "").replace(/^(?!55)/, "55")}`} target="_blank" rel="noopener noreferrer"><MessageCircle /> Entrar em contato</a></Button></>}</DialogContent></Dialog></EventLayout>;
}
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Lock, Loader2, LogOut, RefreshCw, Users, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { adminLogin, listLeads } from "@/lib/leads.functions";

const STORAGE_KEY = "conemag-admin-session";

interface Session {
  username: string;
  password: string;
}

interface Lead {
  id: string;
  name: string;
  whatsapp: string;
  company: string;
  created_at: string;
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Leads Conemag" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setSession(JSON.parse(raw)); } catch { /* ignore */ }
    }
    setChecked(true);
  }, []);

  if (!checked) return null;
  if (!session) return <LoginGate onLogin={(s) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    setSession(s);
  }} />;

  return <LeadsDashboard session={session} onLogout={() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }} />;
}

function LoginGate({ onLogin }: { onLogin: (s: Session) => void }) {
  const login = useServerFn(adminLogin);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ data: { username, password } });
      onLogin({ username, password });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center mb-3">
            <Lock className="text-lime" size={24} />
          </div>
          <h1 className="text-xl font-bold text-foreground">Painel Administrativo</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acesso restrito — Leads Conemag</p>
        </div>
        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            autoComplete="username"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-lime"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            autoComplete="current-password"
            className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-lime"
          />
        </div>
        {error && <p className="mt-3 text-sm text-destructive text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : null}
          {loading ? "Validando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

function LeadsDashboard({ session, onLogout }: { session: Session; onLogout: () => void }) {
  const fetchLeads = useServerFn(listLeads);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rangeKey, setRangeKey] = useState<"today" | "week" | "month" | "custom" | "all">("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");

  const filtered = useMemo(() => {
    const now = new Date();
    let from: Date | null = null;
    let to: Date | null = null;
    if (rangeKey === "today") {
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (rangeKey === "week") {
      const day = now.getDay(); // 0 = dom
      const diff = (day + 6) % 7; // segunda como início
      from = new Date(now.getFullYear(), now.getMonth(), now.getDate() - diff);
    } else if (rangeKey === "month") {
      from = new Date(now.getFullYear(), now.getMonth(), 1);
    } else if (rangeKey === "custom") {
      if (customFrom) from = new Date(customFrom + "T00:00:00");
      if (customTo) to = new Date(customTo + "T23:59:59.999");
    }
    return leads.filter((l) => {
      const d = new Date(l.created_at);
      if (from && d < from) return false;
      if (to && d > to) return false;
      return true;
    });
  }, [leads, rangeKey, customFrom, customTo]);

  function exportXlsx() {
    const rows = filtered.map((l) => ({
      Data: new Date(l.created_at).toLocaleString("pt-BR"),
      Nome: l.name,
      WhatsApp: l.whatsapp,
      Empresa: l.company,
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 20 }, { wch: 28 }, { wch: 20 }, { wch: 30 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    const stamp = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(wb, `leads-conemag-${stamp}.xlsx`);
  }

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetchLeads({ data: session });
      setLeads(res.leads as Lead[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro");
      if (err instanceof Error && err.message.toLowerCase().includes("autorizado")) {
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Users className="text-lime" size={18} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Leads Conemag</h1>
              <p className="text-xs text-muted-foreground">{filtered.length} de {leads.length} contatos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportXlsx}
              disabled={filtered.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg bg-lime text-lime-foreground px-3 py-2 text-sm font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              <Download size={14} /> Exportar Excel
            </button>
            <button
              type="button"
              onClick={load}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition disabled:opacity-60"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Atualizar
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium hover:bg-muted transition"
            >
              <LogOut size={14} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {([
            ["today", "Hoje"],
            ["week", "Esta semana"],
            ["month", "Este mês"],
            ["custom", "Personalizado"],
            ["all", "Todo período"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setRangeKey(key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                rangeKey === key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-muted"
              }`}
            >
              {label}
            </button>
          ))}
          {rangeKey === "custom" && (
            <div className="flex items-center gap-2 ml-2">
              <input
                type="date"
                value={customFrom}
                onChange={(e) => setCustomFrom(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
              />
              <span className="text-muted-foreground text-sm">até</span>
              <input
                type="date"
                value={customTo}
                onChange={(e) => setCustomTo(e.target.value)}
                className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm"
              />
            </div>
          )}
        </div>
        {error && (
          <div className="mb-4 rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}
        {loading && leads.length === 0 ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-muted-foreground" /></div>
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground">Nenhum lead no período selecionado.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Data</th>
                  <th className="text-left px-4 py-3 font-semibold">Nome</th>
                  <th className="text-left px-4 py-3 font-semibold">WhatsApp</th>
                  <th className="text-left px-4 py-3 font-semibold">Empresa</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(l.created_at).toLocaleString("pt-BR")}
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{l.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`https://wa.me/${l.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        {l.whatsapp}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-foreground">{l.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
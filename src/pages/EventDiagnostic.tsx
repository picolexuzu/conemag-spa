import { useState } from "react";
import { useNavigate, useSearchParams, useParams, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Loader2, LockKeyhole } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { diagnosticQuestions, eventLeadSchema } from "@/lib/event-diagnostic";
import { eventEquipment } from "@/lib/event-catalog";
import { supabase } from "@/integrations/supabase/client";
import { usePageMeta } from "@/lib/usePageMeta";

export default function EventDiagnostic() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", company: "", whatsapp: "", city_state: "" });
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [submissionId] = useState(() => crypto.randomUUID());
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); const [params] = useSearchParams();
  const { slug } = useParams();
  const rawInterest = slug ?? params.get("equipamento")?.toLowerCase();
  const interest = eventEquipment.find(e => e.slug === rawInterest);
  usePageMeta({ title: "Conemag Group na ECO EXPO — Diagnóstico do pátio", description: "Converse com a Conemag na ECO EXPO 2026 e encontre soluções para sua operação de sucatas." });
  const questions = step === 0 ? diagnosticQuestions.slice(0, 2) : diagnosticQuestions.slice(2);
  const canContinue = questions.every(q => answers[q.key]);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError("");
    const parsed = eventLeadSchema.safeParse({ ...contact, ...answers, consent, submission_id: submissionId, equipment_interest: interest?.slug });
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Confira os dados."); return; }
    setBusy(true);
    try {
      const { data, error: sendError } = await supabase.functions.invoke("submit-event-lead", { body: { ...parsed.data, website } });
      if (sendError || !data?.success) throw new Error("Não foi possível enviar seu diagnóstico. Tente novamente.");
      navigate("/landingpage/equipamentos", { state: { submitted: true } });
    } catch (err) { setError(err instanceof Error ? err.message : "Não foi possível enviar."); }
    finally { setBusy(false); }
  }
  return <EventLayout>
    <section id="diagnostico" className="event-shell py-7 sm:py-12 max-w-3xl"><div className="mb-6"><Button asChild variant="ghost" className="px-0 mb-4"><Link to={interest ? `/landingpage/${interest.slug}` : "/landingpage"}><ArrowLeft /> Voltar ao equipamento</Link></Button><p className="event-eyebrow text-primary">Conemag Group · ECO EXPO 2026</p><h1 className="text-3xl font-bold mt-3">Diagnóstico do seu pátio.</h1></div><div>
      {interest && <p className="mb-6 border-l-4 border-primary pl-4 text-sm">Seu interesse: <strong>Linha {interest.code} · {interest.name}</strong></p>}
      <ol className="grid grid-cols-3 gap-3 mb-9">{["Seu desafio", "Sua operação", "Seu contato"].map((title, i) => <li key={title} className={`border-t-4 pt-3 text-xs sm:text-sm font-semibold ${i <= step ? "border-primary text-primary" : "border-border text-muted-foreground"}`}><span className="mr-2">0{i + 1}</span>{title}</li>)}</ol>
      <form onSubmit={submit}>
        {step < 2 ? <div className="space-y-8">{questions.map(q => <fieldset key={q.key}><legend className="font-bold text-lg sm:text-xl mb-4">{q.title}</legend><div className="grid gap-2">{q.options.map(option => <label key={option} className={`flex gap-3 items-center p-4 border rounded-lg cursor-pointer transition-colors ${answers[q.key] === option ? "border-primary bg-secondary text-primary" : "border-border bg-card hover:border-primary/50"}`}><input type="radio" className="accent-primary shrink-0" name={q.key} value={option} checked={answers[q.key] === option} onChange={() => setAnswers(prev => ({ ...prev, [q.key]: option }))} /><span className="text-sm font-medium leading-relaxed">{option}</span>{answers[q.key] === option && <Check className="ml-auto shrink-0" size={17} />}</label>)}</div></fieldset>)}</div> : <div><h2 className="text-2xl font-bold mb-2">Vamos conversar sobre sua operação.</h2><p className="text-sm text-muted-foreground mb-7">Deixe seus dados para o atendimento personalizado da Conemag.</p><div className="grid sm:grid-cols-2 gap-5">{([['name','Nome','name'],['company','Empresa','organization'],['whatsapp','WhatsApp com DDD','tel'],['city_state','Cidade / Estado','address-level2']] as const).map(([key,label,auto]) => <label key={key} className="text-sm font-semibold">{label}<Input className="mt-2 h-12 bg-card" required minLength={key === "name" || key === "company" ? 2 : 3} maxLength={key === "whatsapp" ? 30 : 100} type={key === "whatsapp" ? "tel" : "text"} autoComplete={auto} value={contact[key]} onChange={e => setContact(p => ({ ...p, [key]: e.target.value }))} /></label>)}</div><label className="hidden" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} /></label><label className="flex items-start gap-3 mt-7 text-xs leading-relaxed text-muted-foreground"><input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1 accent-primary" /><span>Autorizo a Conemag a utilizar os dados fornecidos para responder à minha solicitação e entrar em contato sobre soluções de meu interesse, conforme a <Link className="underline text-primary" to="/landingpage/privacidade" target="_blank">política de privacidade</Link>.</span></label></div>}
        {error && <p role="alert" className="mt-5 text-sm text-destructive">{error}</p>}
        <div className="flex items-center justify-between gap-4 mt-8">{step > 0 ? <Button type="button" variant="ghost" disabled={busy} onClick={() => { setStep(step - 1); setError(""); }}><ArrowLeft /> Voltar</Button> : <span className="flex items-center gap-2 text-xs text-muted-foreground"><LockKeyhole size={14} /> Dados protegidos</span>}{step < 2 ? <Button key="next" type="button" size="lg" className="h-12" disabled={!canContinue} onClick={() => { setStep(step + 1); document.getElementById("diagnostico")?.scrollIntoView(); }}>Continuar <ArrowRight /></Button> : <Button key="submit" type="submit" size="lg" disabled={busy} className="h-auto min-h-12 whitespace-normal text-left py-3">{busy ? <Loader2 className="animate-spin" /> : <ArrowRight />}{busy ? "Enviando…" : "Enviar meu diagnóstico"}</Button>}</div>
      </form>
    </div></section>
  </EventLayout>;
}
import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LeadFormModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function LeadFormModal({ open, onClose, title, subtitle }: LeadFormModalProps) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setError("");
      setDone(false);
      setTimeout(() => firstRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const trimmedName = name.trim();
      const trimmedWa = whatsapp.trim();
      const trimmedCo = company.trim();
      if (!trimmedName || !trimmedWa || !trimmedCo) {
        throw new Error("Preencha todos os campos.");
      }
      const { error: insertError } = await supabase.from("leads").insert({
        name: trimmedName,
        whatsapp: trimmedWa,
        company: trimmedCo,
      });
      if (insertError) {
        console.error("[lead] insert error", insertError);
        throw new Error("Não foi possível registrar o contato. Tente novamente.");
      }
      setDone(true);
      setName("");
      setWhatsapp("");
      setCompany("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar.");
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-card border border-border shadow-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Fechar"
        >
          <X size={20} />
        </button>

        {done ? (
          <div className="text-center py-6">
            <CheckCircle2 className="mx-auto text-primary mb-4" size={56} />
            <h3 className="text-2xl font-bold text-foreground mb-3">Recebemos seu contato!</h3>
            <p className="text-muted-foreground leading-relaxed">
              Em breve um de nossos especialistas vai entrar em contato com você.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-2.5 font-semibold hover:opacity-90 transition"
            >
              Fechar
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-foreground">
              {title ?? "Fale com um especialista"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {subtitle ?? "Preencha seus dados e nossa equipe entrará em contato."}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Nome
                </label>
                <input
                  ref={firstRef}
                  type="text"
                  required
                  maxLength={120}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  maxLength={40}
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
                  Nome da empresa
                </label>
                <input
                  type="text"
                  required
                  maxLength={160}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-lime"
                  placeholder="Sua empresa"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-lime text-lime-foreground px-6 py-3 font-semibold hover:shadow-lime-glow transition disabled:opacity-60"
              >
                {loading ? <Loader2 className="animate-spin" size={18} /> : null}
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

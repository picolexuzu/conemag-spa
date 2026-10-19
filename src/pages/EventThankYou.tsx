import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, CircleCheck } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { eventCatalogRedirectDelay, eventPresentationPath } from "@/lib/event-flow";
import { usePageMeta } from "@/lib/usePageMeta";

export default function EventThankYou() {
  const navigate = useNavigate();
  usePageMeta({ title: "Obrigado — Conemag Group | ECO EXPO", description: "Nossa equipe entrará em contato com o diagnóstico da sua produção." });
  useEffect(() => {
    const timer = window.setTimeout(() => navigate(eventPresentationPath(), { replace: true }), eventCatalogRedirectDelay);
    return () => window.clearTimeout(timer);
  }, [navigate]);
  return <EventLayout>
    <section className="event-shell max-w-3xl py-16 sm:py-24 text-center" aria-live="polite">
      <CircleCheck className="mx-auto mb-6 text-primary" size={64} strokeWidth={1.5} />
      <p className="event-eyebrow text-primary mb-4">Conemag Group · ECO EXPO 2026</p>
      <h1 className="text-4xl font-bold mb-6">Obrigado!</h1>
      <p className="text-lg leading-relaxed mb-8">Nossa equipe entrará em contato com você para informar o diagnóstico da sua produção.</p>
      <p className="text-sm text-muted-foreground mb-6">Em 5 segundos, você será direcionado para todos os equipamentos.</p>
      <Button asChild size="lg"><Link to={eventPresentationPath()}>Ver todos os equipamentos <ArrowRight /></Link></Button>
    </section>
  </EventLayout>;
}
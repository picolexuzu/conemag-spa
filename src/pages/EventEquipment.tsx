import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MessageCircle, Download, ArrowRight } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { eventEquipment } from "@/lib/event-catalog";
import { whatsappUrl } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/usePageMeta";
import catalog from "@/assets/event/catalogo.asset.json";

export default function EventEquipment() {
  const { slug } = useParams(); const eq = eventEquipment.find(e => e.slug === slug);
  usePageMeta({ title: eq ? `Linha ${eq.code} — Conemag Group` : "Equipamentos Conemag", description: eq?.description });
  if (!eq) return <Navigate to="/landingpage/equipamentos" replace />;
  const related = eventEquipment.filter(e => e.slug !== eq.slug && e.category === eq.category).slice(0, 2);
  return <EventLayout>
    <section className="event-stage"><div className="event-shell pt-7"><Button asChild variant="ghost" className="event-dim hover:bg-transparent hover:text-gold px-0"><Link to="/landingpage/equipamentos"><ArrowLeft /> Coleção Conemag</Link></Button></div>
      <div className="event-shell event-spotlight"><div className="event-spotlight-copy"><p className="event-eyebrow event-dim mb-5">{eq.category} / ECO EXPO 2026</p><h1 className="event-spotlight-title"><span className="block text-sm event-dim font-medium mb-3">LINHA</span>{eq.code}</h1><h2 className="mt-5 text-xl sm:text-2xl font-medium">{eq.name}</h2><p className="event-dim mt-5 text-sm leading-relaxed">{eq.description}</p><Button asChild variant="event" className="mt-7 h-12 px-6"><a href={whatsappUrl(`Olá! Visitei a ECO EXPO e tenho interesse na Linha ${eq.code} — ${eq.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar com a Conemag</a></Button></div><div className="event-machine-stage"><span className="event-machine-word" aria-hidden="true">{eq.code}</span><img src={eq.image} alt={eq.name} fetchPriority="high" /></div></div>
      <div className="event-shell"><div className="event-stage-bar grid sm:grid-cols-3 gap-6">{eq.benefits.map((b, i) => <div key={b} className="flex gap-4 items-center"><span className="text-gold text-xs event-number">0{i + 1}</span><p className="text-sm font-medium">{b}</p></div>)}</div></div>
    </section>
    <section className="event-shell py-14 sm:py-20"><div className="flex flex-wrap justify-between items-end gap-5 mb-8"><div><p className="event-eyebrow text-muted-foreground">Feita para o seu pátio</p><h2 className="text-3xl sm:text-4xl font-bold mt-3">{eq.code} em destaque.</h2></div><Button asChild variant="eventOutline" className="h-12"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação</a></Button></div><div className="bg-muted py-6 sm:py-10"><img src={eq.photo} alt={`Linha ${eq.code} na apresentação ECO EXPO`} className="event-detail-photo" loading="lazy" /></div></section>
    <section className="event-catalog-band"><div className="event-shell py-12 flex flex-wrap justify-between items-center gap-6"><div><p className="event-eyebrow mb-3">Uma solução para cada operação</p><h2 className="text-3xl font-bold">Vamos transformar seu pátio?</h2></div><Button asChild variant="eventOutline" className="h-12"><Link to={`/landingpage?equipamento=${eq.slug}`}>Fazer meu diagnóstico <ArrowRight /></Link></Button></div></section>
    {related.length > 0 && <section className="event-shell py-14"><h2 className="text-3xl font-bold mb-8">Explore também.</h2><div className="event-gallery">{related.map(machine => <Link key={machine.slug} to={`/landingpage/equipamentos/${machine.slug}`} className="event-machine-link"><div className="event-machine-photo"><img src={machine.image} alt={machine.name} loading="lazy" /></div><div className="flex justify-between items-center mt-5"><div><h3 className="text-2xl font-bold">Linha {machine.code}</h3><p className="text-sm text-muted-foreground mt-2">{machine.name}</p></div><span className="event-arrow"><ArrowUpRight size={20} /></span></div></Link>)}</div></section>}
  </EventLayout>;
}

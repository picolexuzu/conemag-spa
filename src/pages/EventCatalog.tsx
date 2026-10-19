import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight, Download, CheckCircle2 } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { eventCategories, eventEquipment } from "@/lib/event-catalog";
import catalog from "@/assets/event/catalogo.asset.json";
import { usePageMeta } from "@/lib/usePageMeta";

export default function EventCatalog() {
  const [category, setCategory] = useState("Todos");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const location = useLocation();
  const featured = eventEquipment.slice(0, 4);
  const eq = featured[featuredIndex] ?? featured[0];
  usePageMeta({ title: "Equipamentos Conemag Group — ECO EXPO 2026", description: "Conheça nossas linhas de equipamentos para sucatas e a apresentação Conemag na ECO EXPO." });
  if (!eq) return null;
  return <EventLayout>
    {location.state?.submitted && <div role="status" className="event-catalog-band"><div className="event-shell py-4 flex items-center gap-3 text-sm font-semibold"><CheckCircle2 size={20} />Diagnóstico enviado! Nossa equipe entrará em contato.</div></div>}
    <section className="event-stage">
      <div className="event-shell pt-9 flex flex-wrap items-center justify-between gap-3"><p className="event-eyebrow event-tag text-gold">Engenharia que transforma sucatas.</p><a href="#colecao" className="event-eyebrow event-dim flex gap-2 items-center">Explorar coleção <ArrowRight size={14} /></a></div>
      <div className="event-shell event-spotlight">
        <div className="event-spotlight-copy"><p className="event-eyebrow event-dim mb-5">{eq.category} / Conemag Group</p><h1 className="event-spotlight-title"><span className="block text-sm font-medium mb-3 event-dim">LINHA</span>{eq.code}</h1><h2 className="text-xl sm:text-2xl font-medium mt-5 max-w-sm">{eq.name}</h2><p className="event-dim text-sm mt-4 leading-relaxed max-w-xs">{eq.description}</p><Button asChild variant="event" className="h-12 mt-7 px-6"><Link to={`/landingpage/equipamentos/${eq.slug}`}>Conhecer a linha <ArrowUpRight /></Link></Button></div>
        <Link to={`/landingpage/equipamentos/${eq.slug}`} className="event-machine-stage" aria-label={`Conhecer Linha ${eq.code}`}><span aria-hidden="true" className="event-machine-word">{eq.code}</span><img key={eq.slug} src={eq.image} alt={`${eq.code} — ${eq.name}`} fetchPriority="high" /></Link>
      </div>
      <div className="event-shell"><div className="event-stage-bar flex items-center justify-between gap-4"><span className="event-eyebrow event-dim">Precisão. Força. Produtividade.</span><div className="flex items-center gap-4"><span className="text-xs event-dim event-number">0{featuredIndex + 1} / 0{featured.length}</span><Button variant="eventOutline" size="icon" aria-label="Máquina anterior" onClick={() => setFeaturedIndex(i => (i - 1 + featured.length) % featured.length)}><ArrowLeft /></Button><Button variant="eventOutline" size="icon" aria-label="Próxima máquina" onClick={() => setFeaturedIndex(i => (i + 1) % featured.length)}><ArrowRight /></Button></div></div></div>
    </section>
    <section id="colecao" className="event-shell py-14 sm:py-20 scroll-mt-6">
      <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="event-eyebrow text-muted-foreground">O próximo passo da sua operação</p><h2 className="text-4xl sm:text-5xl font-bold mt-3 leading-tight">Força em cada detalhe.</h2></div><p className="text-sm text-muted-foreground max-w-sm leading-relaxed">Do corte à movimentação. Encontre a linha Conemag para transformar o seu pátio.</p></div>
      <div className="flex flex-wrap gap-2 mt-8 mb-10" aria-label="Categorias de equipamentos">{eventCategories.map(c => <Button key={c} variant={c === category ? "default" : "ghost"} className="h-auto min-h-10 rounded-none shadow-none whitespace-normal" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</Button>)}</div>
      <div className="event-gallery">{eventEquipment.filter(e => category === "Todos" || e.category === category).map((machine, index) => <Link key={machine.slug} to={`/landingpage/equipamentos/${machine.slug}`} className="event-machine-link group"><div className="event-machine-photo"><span className="event-gallery-code" aria-hidden="true">{machine.code}</span><span className="event-photo-index text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><img src={machine.image} alt={`${machine.code} — ${machine.name}`} loading="lazy" /></div><div className="flex items-start justify-between gap-4 mt-5"><div><p className="event-eyebrow text-muted-foreground mb-2">{machine.category}</p><h3 className="text-3xl font-bold">Linha {machine.code}</h3><p className="text-sm mt-2 font-medium">{machine.name}</p></div><span className="event-arrow"><ArrowUpRight size={20} /></span></div></Link>)}</div>
    </section>
    <section className="event-catalog-band"><div className="event-shell py-12 sm:py-16 flex flex-wrap items-center justify-between gap-8"><div><p className="event-eyebrow mb-3">Conemag Group / ECO EXPO 2026</p><h2 className="text-3xl sm:text-4xl font-bold">Nossa engenharia.<br />Sua próxima conquista.</h2></div><Button asChild variant="eventOutline" className="h-14 px-6"><a href={catalog.url} target="_blank" rel="noopener noreferrer">Apresentação Conemag <Download /></a></Button></div></section>
  </EventLayout>;
}

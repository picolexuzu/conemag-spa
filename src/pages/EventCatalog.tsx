import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { Button } from "@/components/ui/button";
import { eventCategories, eventEquipment } from "@/lib/event-catalog";
import catalog from "@/assets/event/catalogo.asset.json";
import { usePageMeta } from "@/lib/usePageMeta";

export default function EventCatalog() {
  const [category, setCategory] = useState("Todos"); const location = useLocation();
  usePageMeta({ title: "Equipamentos Conemag Group — ECO EXPO 2026", description: "Conheça nossas linhas de equipamentos para sucatas e a apresentação Conemag na ECO EXPO." });
  return <EventLayout><div className="max-w-6xl mx-auto px-5 py-9 sm:py-14">
    {location.state?.submitted && <p role="status" className="flex items-center gap-3 bg-secondary border-l-4 border-primary px-4 py-4 mb-8 text-sm"><CheckCircle2 className="text-primary shrink-0" />Diagnóstico enviado! Nossa equipe entrará em contato.</p>}
    <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs font-bold text-primary uppercase tracking-widest">Conemag Group · ECO EXPO 2026</p><h1 className="text-4xl sm:text-5xl font-bold mt-3">Nossos equipamentos.</h1><p className="text-muted-foreground mt-4 max-w-xl">Soluções para cortar, compactar, briquetar e movimentar sucatas.</p></div><Button asChild variant="outline" className="h-12"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação Conemag</a></Button></div>
    <div className="flex flex-wrap gap-2 mt-9 mb-8" aria-label="Categorias de equipamentos">{eventCategories.map(c => <Button key={c} variant={c === category ? "default" : "outline"} className="h-auto min-h-10 whitespace-normal" aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</Button>)}</div>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{eventEquipment.filter(e => category === "Todos" || e.category === category).map(eq => <Link key={eq.slug} to={`/landingpage/equipamentos/${eq.slug}`} className="group rounded-lg border border-border overflow-hidden bg-card transition-colors hover:border-primary"><div className="aspect-[4/3] bg-muted p-5 grid place-items-center"><img src={eq.image} alt={`${eq.code} — ${eq.name}`} loading="lazy" className="w-full h-full max-h-60 object-contain transition-transform duration-300 group-hover:scale-105" /></div><div className="p-6"><p className="text-primary text-xs font-semibold uppercase">{eq.category}</p><div className="flex items-center justify-between mt-2"><h2 className="font-bold text-2xl">Linha {eq.code}</h2><ArrowUpRight size={20} className="text-primary" /></div><h3 className="font-semibold text-sm mt-2">{eq.name}</h3><p className="text-sm text-muted-foreground mt-3">{eq.description}</p></div></Link>)}</div>
  </div></EventLayout>;
}
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Download, CheckCircle2 } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { EventMachineCard } from "@/components/event/EventMachineCard";
import { Button } from "@/components/ui/button";
import { eventCategories, eventEquipment } from "@/lib/event-catalog";
import catalog from "@/assets/event/catalogo.asset.json";
import yard from "@/assets/event/optimized/yard.asset.json";
import { usePageMeta } from "@/lib/usePageMeta";
export default function EventCatalog() {
 const [category,setCategory]=useState("Todos"); const location=useLocation();
 usePageMeta({title:"Equipamentos Conemag Group — ECO EXPO 2026",description:"Conheça os equipamentos Conemag na ECO EXPO 2026."});
 return <EventLayout><div className="event-backdrop"><img src={yard.url} alt="" className="event-yard" decoding="async" />
 <div className="event-masthead"><p className="event-eyebrow mb-2">Feira ECO EXPO 2026</p><h1>Equipamentos<br />para transformar sucatas.</h1><p className="event-date">20 a 22 de outubro de 2026<br />Expo Center Norte · São Paulo</p></div>
 <div className="event-shell pb-10">{location.state?.submitted && <p role="status" className="flex items-center gap-3 bg-card p-4 border border-primary mb-5 text-sm"><CheckCircle2 />Diagnóstico enviado! Nossa equipe entrará em contato.</p>}
 <div className="flex flex-wrap justify-center gap-2 mb-7" aria-label="Categorias de equipamentos">{eventCategories.map(c=><Button key={c} variant={c===category?"default":"outline"} className="h-auto min-h-11 text-xs whitespace-normal" onClick={()=>setCategory(c)} aria-pressed={c===category}>{c}</Button>)}</div>
 <div className="event-brochure-grid">{eventEquipment.filter(e=>category==="Todos"||e.category===category).map(machine=><EventMachineCard key={machine.slug} machine={machine} />)}</div>
 <div className="text-center mt-10"><Button asChild variant="default" className="h-14 px-6"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação Conemag</a></Button></div>
 </div></div></EventLayout>;
}

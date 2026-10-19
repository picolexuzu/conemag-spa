import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Download, ArrowRight } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { EventBenefits } from "@/components/event/EventMachineCard";
import { Button } from "@/components/ui/button";
import { eventEquipment } from "@/lib/event-catalog";
import { whatsappUrl } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/usePageMeta";
import catalog from "@/assets/event/catalogo.asset.json";
import yard from "@/assets/event/scrap-yard.jpg";
export default function EventEquipment() {
 const {slug}=useParams(); const eq=eventEquipment.find(e=>e.slug===slug);
 usePageMeta({title:eq?`Linha ${eq.code} — Conemag Group | ECO EXPO`:"Conemag Group",description:eq?.description});
 if(!eq) return <Navigate to="/landingpage" replace />;
 const diagnostic=`/landingpage/${eq.slug}/diagnostico`;
 return <EventLayout><div className="event-backdrop"><img src={yard} alt="" className="event-yard" /><section className="event-machine-intro">
 <Button asChild variant="ghost" className="px-0 mb-3 text-primary"><Link to="/landingpage"><ArrowLeft /> Todos os equipamentos</Link></Button>
 <div className="event-machine-heading"><p className="event-eyebrow mb-4">Conemag Group · ECO EXPO 2026</p><span className="event-line-label">LINHA {eq.code}</span><h1>{eq.name}</h1><p className="text-sm leading-relaxed">{eq.description}</p></div>
 <div className="event-machine-visual"><img src={eq.image} alt={eq.name} fetchPriority="high" /></div>
 <EventBenefits benefits={eq.benefits} detail />
 <div className="event-machine-actions"><Button asChild variant="default" className="h-14 text-base font-bold"><Link to={diagnostic}>Quero esta solução <ArrowRight /></Link></Button><p className="text-xs text-center font-medium text-primary">Diagnóstico personalizado da sua operação</p><Button asChild variant="outline" className="bg-card h-12"><a href={whatsappUrl(`Olá! Visitei a ECO EXPO e tenho interesse na Linha ${eq.code} — ${eq.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar com a Conemag</a></Button></div>
 </section></div>
 <section className="event-shell py-8"><div className="flex items-center justify-between gap-4 mb-5"><h2 className="text-xl font-bold">{eq.code} em destaque</h2><Button asChild variant="ghost"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação</a></Button></div><img src={eq.photo} alt={`Linha ${eq.code} no catálogo ECO EXPO`} className="event-detail-photo" loading="lazy" /></section>
 <div className="event-sticky-action"><Button asChild variant="event"><Link to={diagnostic}>Quero esta solução <ArrowRight /></Link></Button></div>
 </EventLayout>;
}

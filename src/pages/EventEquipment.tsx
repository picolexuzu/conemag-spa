import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Download, ArrowRight } from "lucide-react";
import { EventLayout } from "@/components/event/EventLayout";
import { EventBenefits } from "@/components/event/EventMachineCard";
import { Button } from "@/components/ui/button";
import { eventEquipment } from "@/lib/event-catalog";
import { whatsappUrl } from "@/lib/whatsapp";
import { usePageMeta } from "@/lib/usePageMeta";
import catalog from "@/assets/event/catalogo.asset.json";
import yard from "@/assets/event/optimized/yard.asset.json";
export default function EventEquipment() {
 const {slug}=useParams(); const eq=eventEquipment.find(e=>e.slug===slug);
 usePageMeta({title:eq?`Linha ${eq.code} — Conemag Group | ECO EXPO`:"Conemag Group",description:eq?.description});
 if(!eq) return <Navigate to="/landingpage" replace />;
 const diagnostic=`/landingpage/${eq.slug}/diagnostico`;
 return <EventLayout whiteHeader><div className="event-backdrop"><img src={yard.url} alt="" className="event-yard" decoding="async" /><section className="event-machine-intro">
 <div className="event-machine-heading"><p className="event-eyebrow mb-4">Conemag Group · ECO EXPO 2026</p><span className="event-line-label">LINHA {eq.code}</span><h1>{eq.name}</h1><p className="text-sm leading-relaxed">{eq.description}</p></div>
 <div className="event-machine-visual"><picture><source media="(max-width: 767px)" srcSet={eq.imageMobile} /><img src={eq.image} alt={eq.name} fetchPriority="high" decoding="async" /></picture></div>
 <EventBenefits benefits={eq.benefits} detail />
 <div className="event-machine-actions"><Button asChild variant="default" className="h-14 text-base font-bold"><Link to={diagnostic}>Conhecer solução <ArrowRight /></Link></Button><p className="text-xs text-center font-medium text-primary">Diagnóstico personalizado da sua operação</p><Button asChild variant="outline" className="bg-card h-12"><a href={whatsappUrl(`Olá! Visitei a ECO EXPO e tenho interesse na Linha ${eq.code} — ${eq.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar com a Conemag</a></Button></div>
 </section></div>
 <section className="event-shell py-8"><div className="flex items-center justify-between gap-4 mb-5"><h2 className="text-xl font-bold">{eq.code} em destaque</h2><Button asChild variant="ghost"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação</a></Button></div><img src={eq.photo} alt={`Linha ${eq.code} no catálogo ECO EXPO`} className="event-detail-photo" loading="lazy" /><div className="flex justify-center mt-8"><Button asChild variant="outline" className="bg-card text-primary h-12"><Link to="/landingpage"><ArrowLeft /> Ver todos os equipamentos</Link></Button></div></section>
 <div className="event-sticky-action"><Button asChild variant="event"><Link to={diagnostic}>Conhecer solução <ArrowRight /></Link></Button></div>
 </EventLayout>;
}

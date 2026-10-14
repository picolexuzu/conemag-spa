import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Check, Download } from "lucide-react";
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
  return <EventLayout><div className="max-w-6xl mx-auto px-5 py-8 sm:py-12"><Button asChild variant="ghost" className="mb-8"><Link to="/landingpage/equipamentos"><ArrowLeft /> Todos os equipamentos</Link></Button><div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"><div><p className="text-primary font-bold text-xs uppercase">{eq.category}</p><h1 className="text-5xl sm:text-6xl font-bold mt-4">Linha {eq.code}</h1><h2 className="text-xl sm:text-2xl font-semibold mt-4">{eq.name}</h2><p className="mt-6 text-muted-foreground text-lg leading-relaxed">{eq.description}</p><ul className="mt-7 space-y-3">{eq.benefits.map(b => <li key={b} className="flex gap-3 items-center font-medium text-sm"><Check size={18} className="text-primary" />{b}</li>)}</ul><div className="flex flex-wrap gap-3 mt-8"><Button asChild className="h-12"><a href={whatsappUrl(`Olá! Visitei a ECO EXPO e tenho interesse na Linha ${eq.code} — ${eq.name}.`)} target="_blank" rel="noopener noreferrer"><MessageCircle /> Falar com a Conemag</a></Button><Button asChild variant="outline" className="h-12"><a href={catalog.url} target="_blank" rel="noopener noreferrer"><Download /> Apresentação</a></Button></div></div><div className="bg-muted aspect-square p-6 sm:p-10 grid place-items-center"><img src={eq.image} alt={eq.name} className="object-contain w-full h-full max-h-[480px]" /></div></div><section className="mt-14 border-t border-border pt-10"><h2 className="font-bold text-2xl mb-6">{eq.code} em destaque</h2><img src={eq.photo} alt={`Foto da Linha ${eq.code} no catálogo da ECO EXPO`} className="w-full max-w-3xl object-contain rounded-lg" loading="lazy" /></section></div></EventLayout>;
}
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, ShieldCheck, Zap, Settings2 } from "lucide-react";
import { eventEquipment } from "@/lib/event-catalog";
import yard from "@/assets/event/scrap-yard.jpg";

export function EventBenefits({ benefits, detail = false }: { benefits: readonly string[]; detail?: boolean }) {
  const icons = [ShieldCheck, Zap, Settings2];
  return <div className={`event-benefits ${detail ? "event-detail-benefits" : ""}`}>{benefits.map((b, i) => { const Icon = icons[i] ?? ShieldCheck; return <div className="event-benefit" key={b}><Icon strokeWidth={1.6} /><span>{b}</span></div>; })}</div>;
}
export function EventMachineCard({ machine }: { machine: typeof eventEquipment[number] }) {
  return <Link to={`/landingpage/${machine.slug}`} className="event-brochure" aria-label={`Conhecer ${machine.name} — Linha ${machine.code}`}>
    <div className="event-brochure-top"><span>LINHA {machine.code}</span><ArrowUpRight /></div>
    <div className="event-brochure-body"><h2>{machine.name}</h2><p>{machine.description}</p></div>
    <div className="event-brochure-image"><img className="event-yard" src={yard} alt="" loading="lazy" /><img className="event-equipment" src={machine.image} alt={machine.name} loading="lazy" /></div>
    <EventBenefits benefits={machine.benefits} /><div className="event-brochure-cta">Conhecer equipamento <ArrowRight /></div>
  </Link>;
}

import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/event/conemag-group.asset.json";
import eco from "@/assets/event/eco-expo.asset.json";
import { whatsappUrl } from "@/lib/whatsapp";

export function EventLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const inCatalog = pathname.includes("equipamentos");
  return <div className="event-page min-h-screen bg-background text-foreground">
    <header className="event-stage event-header">
      <div className="event-shell min-h-24 flex items-center justify-between gap-4 py-4">
        <Link to="/landingpage" aria-label="Conemag Group — início"><img src={logo.url} alt="Conemag Group" className="w-36 sm:w-48 h-12 object-contain" /></Link>
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase" aria-label="Navegação da feira">
          <Link to="/landingpage" className={!inCatalog ? "text-gold" : "event-dim"}>Diagnóstico</Link>
          <Link to="/landingpage/equipamentos" className={inCatalog ? "text-gold" : "event-dim"}>Equipamentos <ArrowUpRight className="inline ml-1" size={14} /></Link>
        </nav>
        <div className="flex items-center gap-5"><span className="hidden lg:block event-eyebrow event-dim leading-relaxed">ECO EXPO 2026<br />20 — 22 OUT / SÃO PAULO</span><img src={eco.url} alt="ECO EXPO" className="w-24 sm:w-28 h-11 bg-card object-contain p-1.5" /></div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="event-stage"><div className="event-shell py-10 flex flex-wrap justify-between items-center gap-6"><div><img src={logo.url} alt="Conemag Group" className="w-36 h-12 object-contain mb-3" /><p className="text-xs event-dim">Segue o líder · @prensasconemag</p></div><p className="hidden sm:block text-xs event-dim leading-relaxed">ECO EXPO 2026<br />Expo Center Norte · São Paulo</p><Button asChild variant="eventOutline" className="h-12"><a href={whatsappUrl("Olá! Estou visitando a ECO EXPO e gostaria de falar com a Conemag.")} target="_blank" rel="noopener noreferrer"><MessageCircle /> (16) 3333-6966</a></Button></div></footer>
  </div>;
}

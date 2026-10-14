import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/event/conemag-group.asset.json";
import eco from "@/assets/event/eco-expo.asset.json";
import { whatsappUrl } from "@/lib/whatsapp";

export function EventLayout({ children }: { children: React.ReactNode }) {
  return <div className="event-page min-h-screen bg-background text-foreground">
    <header className="bg-primary text-primary-foreground border-b border-primary-foreground/15">
      <div className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between gap-4">
        <Link to="/landingpage" aria-label="Conemag Group — início"><img src={logo.url} alt="Conemag Group" className="w-40 sm:w-52 h-14 object-contain" /></Link>
        <div className="flex items-center gap-3 sm:gap-6"><span className="hidden md:block text-xs font-semibold uppercase">20–22 outubro · São Paulo</span><img src={eco.url} alt="ECO EXPO" className="w-28 sm:w-36 h-14 rounded bg-card object-contain p-1.5" /></div>
      </div>
    </header>
    <main>{children}</main>
    <footer className="border-t border-border mt-14"><div className="max-w-6xl mx-auto px-5 py-7 flex flex-wrap items-center justify-between gap-4"><p className="text-sm font-semibold">Segue o líder · @prensasconemag</p><Button asChild variant="ghost"><a href={whatsappUrl("Olá! Estou visitando a ECO EXPO e gostaria de falar com a Conemag.")} target="_blank" rel="noopener noreferrer"><MessageCircle /> (16) 3333-6966</a></Button></div></footer>
  </div>;
}
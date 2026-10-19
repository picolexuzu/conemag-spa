import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/event/conemag-group.asset.json";
import darkLogo from "@/assets/event/conemag-group-dark.asset.json";
import eco from "@/assets/event/eco-expo.asset.json";
export function EventLayout({ children, whiteHeader = false }: { children: React.ReactNode; whiteHeader?: boolean }) {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return <div className="event-page min-h-screen bg-background text-foreground">
    <header className={whiteHeader ? "bg-card text-primary" : "bg-primary text-primary-foreground"}><div className="event-shell flex justify-between items-center gap-4 py-4"><Link to="/landingpage" aria-label="Conemag Group — equipamentos"><img src={whiteHeader ? darkLogo.url : logo.url} alt="Conemag Group" className="w-44 sm:w-52 h-14 object-contain" /></Link><img src={eco.url} alt="ECO EXPO" className="w-24 h-11 object-contain bg-card p-1" /></div><p className="text-center text-[9px] sm:text-xs font-bold uppercase pb-4">Líder em equipamentos para sucatas</p></header>
    <main>{children}</main>
    <footer className="bg-primary text-primary-foreground text-center py-7"><p className="font-bold text-gold text-sm">Segue o líder · @prensasconemag</p><p className="text-xs mt-2">Conemag Group · ECO EXPO 2026</p></footer>
  </div>;
}

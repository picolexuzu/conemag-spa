import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-conemag.png";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/equipos", label: "Equipos" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-xl shadow-elegant py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Conemag Latinoamérica" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-sm font-medium text-primary-foreground/85 hover:text-lime transition-colors relative group"
              activeProps={{ className: "text-lime" }}
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px bg-lime scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
          <Link
            to="/contacto"
            className="ml-4 inline-flex items-center rounded-full bg-lime text-lime-foreground px-5 py-2 text-sm font-semibold hover:bg-lime/90 transition shadow-lime-glow"
          >
            Cotizar ahora
          </Link>
        </nav>

        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary/98 backdrop-blur-xl border-t border-primary-foreground/10">
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base font-medium text-primary-foreground/90 hover:bg-primary-foreground/10 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

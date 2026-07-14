import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import logo from "@/assets/logo-conemag.png";
import { useI18n, locales } from "@/lib/i18n";
import { WHATSAPP_QUOTE_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { locale, setLocale, t } = useI18n();

  const nav = [
    { to: "/", label: t("nav.home") },
    { to: "/equipos", label: t("nav.equipment") },
    { to: "/servicios", label: t("nav.services") },
    { to: "/nosotros", label: t("nav.about") },
    { to: "/contacto", label: t("nav.contact") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-primary/95 shadow-elegant py-3" : "bg-primary/60 py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <img src={logo} alt="Conemag" className="h-9 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors relative group ${
                  isActive ? "text-gold" : "text-primary-foreground/85 hover:text-gold"
                }`
              }
            >
              {item.label}
              <span className="absolute inset-x-4 -bottom-0.5 h-px bg-gold scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </NavLink>
          ))}
          <div className="relative ml-2">
            <button
              onClick={() => setLangOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary-foreground/85 hover:text-gold transition-colors"
              aria-label="Language"
            >
              <Globe size={16} />
              {locales.find((l) => l.code === locale)?.label}
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-primary/95 border border-primary-foreground/10 shadow-elegant overflow-hidden">
                {locales.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLocale(l.code); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-primary-foreground/10 transition ${
                      l.code === locale ? "text-gold" : "text-primary-foreground/85"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href={whatsappUrl(WHATSAPP_QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 inline-flex items-center rounded-full bg-gold text-gold-foreground px-5 py-2 text-sm font-semibold hover:bg-gold/90 transition shadow-gold-glow"
          >
            {t("nav.quote")}
          </a>
        </nav>

        <button
          className="lg:hidden text-primary-foreground p-2"
          onClick={() => setOpen(!open)}
          aria-label={t("nav.menu")}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-primary/98 border-t border-primary-foreground/10">
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
            <a
              href={whatsappUrl(WHATSAPP_QUOTE_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-gold text-gold-foreground px-5 py-3 text-base font-semibold"
            >
              {t("nav.quote")}
            </a>
            <div className="mt-2 pt-3 border-t border-primary-foreground/10 flex gap-2">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLocale(l.code)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition ${
                    l.code === locale
                      ? "bg-gold text-gold-foreground border-gold"
                      : "border-primary-foreground/20 text-primary-foreground/85"
                  }`}
                >
                  {l.flag} {l.label}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

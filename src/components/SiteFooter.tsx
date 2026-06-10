import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram } from "lucide-react";
import logo from "@/assets/logo-conemag.png";
import { useT } from "@/lib/i18n";

export function SiteFooter() {
  const t = useT();
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <img src={logo} alt="Conemag" className="h-10 w-auto mb-4" />
            <p className="text-primary-foreground/70 max-w-md leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/prensasconemag/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-primary-foreground/20 grid place-items-center hover:bg-primary-foreground hover:text-primary transition"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary-foreground/60 mb-4">
              {t("footer.nav")}
            </h4>
            <ul className="space-y-2">
              {[
                ["/equipos", t("nav.equipment")],
                ["/servicios", t("nav.services")],
                ["/nosotros", t("nav.about")],
                ["/contacto", t("nav.contact")],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-primary-foreground/80 hover:text-primary-foreground transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-primary-foreground/60 mb-4">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-3 text-primary-foreground/80 text-sm">
              <li className="flex gap-2"><Phone size={16} className="mt-0.5" /> (16) 3333-6966</li>
              <li className="flex gap-2"><Mail size={16} className="mt-0.5" /> contato@conemag.com</li>
              <li className="flex gap-2"><MapPin size={16} className="mt-0.5" /> R. Sachs, 0315 - Chácara do trevo, Araraquara - SP, 14800-655</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-sm text-primary-foreground/50 flex flex-wrap justify-between gap-4">
          <p>© {new Date().getFullYear()} Conemag. {t("footer.rights")}</p>
          <p>{t("footer.motto")}</p>
        </div>
      </div>
    </footer>
  );
}

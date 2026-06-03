import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/lib/i18n";
import rental from "@/assets/service-rental.jpg";
import financing from "@/assets/service-financing.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Serviços — Conemag" },
      { name: "description", content: "Alquiler de equipos, financiamiento, asistencia técnica y repuestos. Soluciones completas para el reciclaje industrial." },
      { property: "og:title", content: "Servicios Conemag" },
      { property: "og:description", content: "Alquiler, financiamiento y asistencia técnica para sus operaciones." },
    ],
  }),
  component: ServiciosPage,
});

function ServiciosPage() {
  const t = useT();
  const rentalBenefits = [t("serv.rental.b1"), t("serv.rental.b2"), t("serv.rental.b3"), t("serv.rental.b4")];
  const financingBenefits = [t("serv.fin.b1"), t("serv.fin.b2"), t("serv.fin.b3"), t("serv.fin.b4"), t("serv.fin.b5")];
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <span className="text-sm uppercase tracking-widest text-lime font-semibold">{t("serv.kicker")}</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance max-w-4xl">
            {t("serv.title")}
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            {t("serv.sub")}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={rental} alt={t("serv.rental.kicker")} className="rounded-2xl shadow-elegant aspect-[4/3] object-cover" />
          </div>
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("serv.rental.kicker")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">{t("serv.rental.title")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("serv.rental.desc")}
            </p>
            <ul className="mt-8 space-y-3">
              {rentalBenefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shrink-0">
                    <Check size={12} />
                  </span>
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2 relative">
            <img src={financing} alt={t("serv.fin.kicker")} className="rounded-2xl shadow-elegant aspect-[4/3] object-cover" />
          </div>
          <div className="lg:order-1">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("serv.fin.kicker")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">{t("serv.fin.title")}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              {t("serv.fin.desc")}
            </p>
            <ul className="mt-8 space-y-3">
              {financingBenefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shrink-0">
                    <Check size={12} />
                  </span>
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            {t("serv.support.title")}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            {t("serv.support.sub")}
          </p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:shadow-glow transition">
            {t("serv.support.cta")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

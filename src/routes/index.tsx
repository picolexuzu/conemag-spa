import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Recycle, Shield, Wrench, Zap, ChevronRight, Layers, Scissors, Package, Cog, KeyRound, Landmark } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEquipmentList, getTotalModelCount, getCategoryModelCount, type CategoryKey } from "@/lib/equipment";
import { useI18n } from "@/lib/i18n";
import gtxHero from "@/assets/gtx-hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conemag — Equipamentos para reciclagem de sucata" },
      { name: "description", content: "Prensas, tesouras, briquetadeiras e trituradores Conemag. Tecnologia brasileira com 25+ anos de experiência, líder de mercado no Brasil." },
      { property: "og:title", content: "Conemag" },
      { property: "og:description", content: "Equipos de alto rendimiento para el procesamiento de chatarra metálica." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, locale } = useI18n();
  const equipment = getEquipmentList(locale);
  const features = [
    { icon: Shield, title: t("home.feature1.title"), desc: t("home.feature1.desc") },
    { icon: Zap, title: t("home.feature2.title"), desc: t("home.feature2.desc") },
    { icon: Wrench, title: t("home.feature3.title"), desc: t("home.feature3.desc") },
    { icon: Recycle, title: t("home.feature4.title"), desc: t("home.feature4.desc") },
  ];
  const categories: { key: CategoryKey; icon: typeof Layers }[] = [
    { key: "prensas", icon: Layers },
    { key: "tesouras", icon: Scissors },
    { key: "briquetadeiras", icon: Package },
    { key: "trituradores", icon: Cog },
  ];
  const totalModels = getTotalModelCount();
  const stats: [string, string][] = [
    ["+26", t("home.stats.years")],
    [`+${totalModels}`, t("home.stats.lines")],
    ["+1000", t("home.stats.own")],
    ["LATAM", t("home.stats.region")],
  ];
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={gtxHero}
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-gradient-radial opacity-60" />

        <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-md border border-lime/40 px-4 py-1.5 text-xs font-medium uppercase tracking-widest mb-8 text-lime">
            <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse" />
            {t("home.badge")}
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance max-w-5xl mx-auto">
            {t("home.hero.title")}
          </h1>
          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            {t("home.hero.sub")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/equipos"
              className="group inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground px-7 py-3.5 font-semibold hover:shadow-lime-glow transition-all"
            >
              {t("home.hero.cta1")}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 backdrop-blur-md bg-primary-foreground/5 text-primary-foreground px-7 py-3.5 font-semibold hover:bg-primary-foreground/15 transition"
            >
              {t("home.hero.cta2")}
            </Link>
          </div>
        </div>

        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-xs uppercase tracking-widest flex-col items-center gap-2 animate-pulse">
          <span>{t("home.scroll")}</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary-foreground/60 to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {stats.map(([num, label]) => (
            <div key={label}>
              <div className="text-4xl md:text-6xl font-display font-bold text-lime">{num}</div>
              <div className="mt-2 text-sm uppercase tracking-widest text-primary-foreground/70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("home.why")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-balance">
              {t("home.why.title")}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground mb-5 group-hover:shadow-glow transition">
                  <f.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mb-16">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("home.cat.kicker")}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold text-balance">{t("home.cat.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("home.cat.sub")}</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c) => {
              const count = getCategoryModelCount(c.key);
              return (
                <Link
                  key={c.key}
                  to="/equipos"
                  search={{ cat: c.key }}
                  className="group relative p-8 rounded-2xl bg-primary text-primary-foreground overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1"
                >
                  <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-lime/10 group-hover:bg-lime/20 transition" />
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-lime text-lime-foreground grid place-items-center mb-5">
                      <c.icon size={22} />
                    </div>
                    <h3 className="text-2xl font-display font-bold">{t(`cat.${c.key}`)}</h3>
                    <p className="mt-3 text-sm text-primary-foreground/70 leading-relaxed">{t(`cat.${c.key}.desc`)}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-lime">{count} {count === 1 ? "modelo" : "modelos"}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-lime group-hover:gap-2 transition-all">
                        {t("home.cat.viewLine")} <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* EQUIPMENT */}
      <section className="py-24 md:py-32 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("home.products.kicker")}</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-balance">
                {t("home.products.title")}
              </h2>
            </div>
            <Link to="/equipos" className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all">
              {t("home.products.viewAll")} <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.slice(0, 6).map((eq) => (
              <Link
                key={eq.code}
                to="/equipos/$slug"
                params={{ slug: eq.slug }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-secondary to-accent/30 p-6 grid place-items-center">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-primary font-semibold">{eq.category}</div>
                  <h3 className="mt-2 text-2xl font-display font-bold">
                    {eq.code} <span className="text-muted-foreground font-normal text-base">— {eq.name}</span>
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{eq.description}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    {t("card.viewDetails")} <ChevronRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("serv.kicker")}</span>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-balance">{t("home.services.title")}</h2>
              <p className="mt-4 text-muted-foreground">{t("home.services.sub")}</p>
            </div>
            <Link to="/servicios" className="inline-flex items-center gap-1 text-primary font-semibold hover:gap-2 transition-all">
              {t("home.services.viewAll")} <ChevronRight size={18} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/servicios"
              className="group relative p-10 rounded-3xl bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-lime/10 group-hover:bg-lime/20 transition" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary text-primary-foreground grid place-items-center mb-6">
                  <KeyRound size={24} />
                </div>
                <span className="text-xs uppercase tracking-widest text-primary font-semibold">{t("serv.rental.kicker")}</span>
                <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold">{t("serv.rental.title")}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{t("serv.rental.desc")}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.rental.b1")}</li>
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.rental.b2")}</li>
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.rental.b3")}</li>
                </ul>
                <div className="mt-8 inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                  {t("home.services.know")} <ChevronRight size={16} />
                </div>
              </div>
            </Link>

            <Link
              to="/servicios"
              className="group relative p-10 rounded-3xl bg-primary text-primary-foreground hover:shadow-elegant transition-all hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-lime/20 group-hover:bg-lime/30 transition" />
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-lime text-lime-foreground grid place-items-center mb-6">
                  <Landmark size={24} />
                </div>
                <span className="text-xs uppercase tracking-widest text-lime font-semibold">{t("serv.fin.kicker")}</span>
                <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold">{t("serv.fin.title")}</h3>
                <p className="mt-4 text-primary-foreground/80 leading-relaxed">{t("serv.fin.desc")}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.fin.b1")}</li>
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.fin.b2")}</li>
                  <li className="flex gap-2"><span className="text-lime">›</span>{t("serv.fin.b4")}</li>
                </ul>
                <div className="mt-8 inline-flex items-center gap-1 text-lime font-semibold group-hover:gap-2 transition-all">
                  {t("home.services.know")} <ChevronRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-balance max-w-3xl mx-auto">
            {t("home.cta.title")}
          </h2>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-xl mx-auto">
            {t("home.cta.sub")}
          </p>
          <Link
            to="/contacto"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground px-8 py-4 font-semibold hover:shadow-lime-glow transition"
          >
            {t("home.cta.button")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

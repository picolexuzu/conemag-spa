import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { equipmentRaw, equipmentSlugExists, getEquipmentBySlugLocalized, getEquipmentList } from "@/lib/equipment";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/equipos/$slug")({
  loader: ({ params }) => {
    if (!equipmentSlugExists(params.slug)) throw notFound();
    return { slug: params.slug };
  },
  head: ({ loaderData }) => {
    const raw = loaderData?.slug ? equipmentRaw.find((e) => e.slug === loaderData.slug) : undefined;
    if (!raw) return { meta: [{ title: "Conemag" }] };
    const eq = raw.i18n.pt;
    return {
      meta: [
        { title: `${raw.code} ${eq.name} — Conemag` },
        { name: "description", content: eq.description },
        { property: "og:title", content: `${raw.code} ${eq.name} — Conemag` },
        { property: "og:description", content: eq.description },
        { property: "og:image", content: raw.image },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <section className="pt-40 pb-24 container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <Link to="/equipos" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          <ArrowLeft size={18} /> ←
        </Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: ({ reset }) => (
    <SiteLayout>
      <section className="pt-40 pb-24 container mx-auto px-6 text-center">
        <h1 className="text-4xl font-bold">Error</h1>
        <button onClick={reset} className="mt-6 text-primary font-semibold">Retry</button>
      </section>
    </SiteLayout>
  ),
  component: EquipmentDetailPage,
});

function EquipmentDetailPage() {
  const { slug } = Route.useLoaderData();
  const { t, locale } = useI18n();
  const eq = getEquipmentBySlugLocalized(slug, locale)!;
  const related = getEquipmentList(locale).filter((e) => e.slug !== eq.slug).slice(0, 3);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="pt-32 pb-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <Link
            to="/equipos"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition"
          >
            <ArrowLeft size={16} /> {t("detail.back")}
          </Link>
          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-lime font-semibold">
                {eq.category}
              </span>
              <h1 className="mt-3 text-5xl md:text-6xl font-bold text-balance">
                {eq.code}
                <span className="block text-2xl md:text-3xl font-normal text-primary-foreground/80 mt-2">
                  {eq.name}
                </span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                {eq.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground px-7 py-3.5 font-semibold hover:shadow-lime-glow transition"
                >
                  {t("detail.requestQuote")} <ArrowRight size={18} />
                </Link>
                <a
                  href={`/datasheets/${eq.slug}.pdf`}
                  download
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 backdrop-blur-md bg-primary-foreground/5 px-7 py-3.5 font-semibold hover:bg-primary-foreground/15 transition"
                >
                  <Download size={18} /> {t("detail.datasheet")}
                </a>
              </div>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary-foreground/10 to-primary-foreground/5 rounded-3xl p-10 grid place-items-center backdrop-blur-sm border border-primary-foreground/10">
              <img src={eq.image} alt={`${eq.code} ${eq.name}`} className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.about")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">
            {t("detail.what")} {eq.name}?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{eq.overview}</p>
        </div>
      </section>

      {/* SPECS + ADVANTAGES */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.specs.kicker")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t("detail.specs.title")}</h2>
            <dl className="mt-8 divide-y divide-border bg-card rounded-2xl border border-border overflow-hidden">
              {eq.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-4 px-6 py-4">
                  <dt className="text-sm text-muted-foreground">{s.label}</dt>
                  <dd className="text-sm font-semibold text-right">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.adv.kicker")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t("detail.adv.title")}</h2>
            <ul className="mt-8 space-y-3">
              {eq.advantages.map((a) => (
                <li key={a} className="flex items-start gap-3 bg-card border border-border rounded-xl px-5 py-4">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-gradient-primary text-primary-foreground grid place-items-center flex-shrink-0">
                    <Check size={14} />
                  </span>
                  <span className="text-sm leading-relaxed">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.apps.kicker")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t("detail.apps.title")}</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eq.applications.map((app) => (
              <div key={app} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/40 transition">
                <p className="text-base font-medium">{app}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{t("detail.other")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.code}
                to="/equipos/$slug"
                params={{ slug: r.slug }}
                className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className="aspect-square bg-gradient-to-br from-secondary to-accent/30 p-6 grid place-items-center">
                  <img src={r.image} alt={r.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-widest text-primary font-semibold">{r.category}</div>
                  <h3 className="mt-2 text-xl font-display font-bold">
                    {r.code} <span className="text-muted-foreground font-normal text-sm">— {r.name}</span>
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold">{t("detail.cta.title")} {eq.code}?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
            {t("detail.cta.sub")}
          </p>
          <Link
            to="/contacto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime text-lime-foreground px-8 py-4 font-semibold hover:shadow-lime-glow transition"
          >
            {t("home.cta.button")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

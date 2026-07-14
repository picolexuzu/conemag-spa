import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Download } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { equipmentRaw, equipmentSlugExists, equipmentVariants, getEquipmentBySlugLocalized, getEquipmentList } from "@/lib/equipment";
import { useI18n } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";
import { whatsappUrl } from "@/lib/whatsapp";

export default function EquipmentDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();

  const exists = equipmentSlugExists(slug);
  const raw = exists ? equipmentRaw.find((e) => e.slug === slug) : undefined;
  const eq = exists ? getEquipmentBySlugLocalized(slug, locale) : undefined;

  usePageMeta(
    raw && eq
      ? {
          title: `${raw.code} ${eq.name} — Conemag`,
          description: eq.description,
          ogImage: raw.image,
        }
      : { title: "Conemag" },
  );

  if (!exists || !eq) {
    return <Navigate to="/equipos" replace />;
  }

  const related = getEquipmentList(locale).filter((e) => e.slug !== eq.slug).slice(0, 3);
  const variants = equipmentVariants[eq.code] ?? [];

  return (
    <SiteLayout>
      <section className="pt-32 pb-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <Link to="/equipos" className="inline-flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition">
            <ArrowLeft size={16} /> {t("detail.back")}
          </Link>
          <div className="mt-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm uppercase tracking-widest text-primary font-semibold">{eq.category}</span>
              <h1 className="mt-3 text-5xl md:text-6xl font-bold text-balance">
                {eq.code}
                <span className="block text-2xl md:text-3xl font-normal text-primary-foreground/80 mt-2">{eq.name}</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">{eq.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href={whatsappUrl(`Olá! Tenho interesse no equipamento ${eq.code} - ${eq.name}. Gostaria de receber um orçamento.`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-3.5 font-semibold hover:shadow-gold-glow transition">
                  {t("detail.requestQuote")} <ArrowRight size={18} />
                </a>
                <a href={`/datasheets/${eq.slug}.pdf`} download className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 backdrop-blur-md bg-primary-foreground/5 px-7 py-3.5 font-semibold hover:bg-primary-foreground/15 transition">
                  <Download size={18} /> {t("detail.datasheet")}
                </a>
              </div>
            </div>
            <div className="aspect-square bg-white rounded-3xl p-10 grid place-items-center shadow-2xl border border-primary-foreground/10">
              <img src={eq.image} alt={`${eq.code} ${eq.name}`} className="max-h-full max-w-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.about")}</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-balance">
            {t("detail.what")} {eq.name}?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{eq.overview}</p>
        </div>
      </section>

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

      {variants.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-6">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("detail.models.kicker")}</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold">{t("detail.models.title")}</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl">{t("detail.models.sub")}</p>
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {variants.map((v) => (
                <a key={v} href={whatsappUrl(`Olá! Tenho interesse no equipamento ${eq.code} - ${v}. Gostaria de receber um orçamento.`)} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:border-primary/40 hover:shadow-elegant transition-all hover:-translate-y-1 text-left">
                  <div className="text-xs uppercase tracking-widest text-primary font-semibold">{eq.code}</div>
                  <div className="mt-1 text-3xl md:text-4xl font-display font-bold">
                    {eq.code} <span className="text-muted-foreground font-normal">– {v}</span>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    {t("detail.requestQuote")} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{t("detail.other")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.code} to={`/equipos/${r.slug}`} className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1">
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

      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold">{t("detail.cta.title")} {eq.code}?</h2>
          <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">{t("detail.cta.sub")}</p>
          <a href={whatsappUrl(`Olá! Tenho interesse no equipamento ${eq.code} - ${eq.name}. Gostaria de receber um orçamento.`)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-8 py-4 font-semibold hover:shadow-gold-glow transition">
            {t("home.cta.button")} <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </SiteLayout>
  );
}

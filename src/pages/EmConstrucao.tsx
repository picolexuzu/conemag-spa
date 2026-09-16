import { useEffect, useRef } from "react";
import logo from "@/assets/logo-conemag.png";
import { usePageMeta } from "@/lib/usePageMeta";
import { WHATSAPP_QUOTE_MESSAGE, whatsappUrl } from "@/lib/whatsapp";
import heroVideo from "@/assets/hero.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";

const LOVABLE_ASSET_ORIGIN = "https://conemag-spa.lovable.app";
const resolveAssetUrl = (url: string) =>
  url.startsWith("/__l5e/") ? `${LOVABLE_ASSET_ORIGIN}${url}` : url;

export default function EmConstrucao() {
  const videoRef = useRef<HTMLVideoElement>(null);
  usePageMeta({
    title: "Conemag — Página em construção",
    description:
      "Nosso novo site está em construção. Fale com a Conemag pelo WhatsApp e conheça nossos equipamentos para preparação de sucatas.",
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.load();
    void video.play().catch(() => undefined);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-primary/60 py-5">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <img src={logo} alt="Conemag" className="h-9 md:h-10 w-auto" />
          <a
            href={whatsappUrl(WHATSAPP_QUOTE_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center rounded-full bg-gold text-gold-foreground px-5 py-2 text-sm font-semibold hover:bg-gold/90 transition shadow-gold-glow"
          >
            Entrar em contato
          </a>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={resolveAssetUrl(heroPoster.url)}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={resolveAssetUrl(heroVideo.url)} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="relative z-10 container mx-auto px-6 text-center text-primary-foreground">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] text-balance max-w-5xl mx-auto">
              PÁGINA EM CONSTRUÇÃO
            </h1>
            <p className="mt-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              Estamos preparando nosso novo site. Enquanto isso, fale direto com a nossa equipe.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href={whatsappUrl(WHATSAPP_QUOTE_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-7 py-3.5 font-semibold hover:shadow-gold-glow transition-all"
              >
                Entrar em contato
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

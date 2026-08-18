import Image from "next/image";
import Link from "next/link";
import { FALLBACK_IMAGE, type PageHero as PageHeroData } from "@/lib/api";

/**
 * Hero compartido por todas las páginas del sitio: imagen o video de fondo,
 * etiqueta, título, descripción y CTA opcionales, todo administrable desde
 * el gestor de contenido (Páginas del Sitio → Hero).
 */
export default function PageHero({ hero }: { hero: PageHeroData }) {
  const isVideo = hero.media_type === "video" && hero.video !== null;

  return (
    <section
      className={`relative flex items-end overflow-hidden bg-black ${
        isVideo ? "min-h-screen" : "min-h-[55vh]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        {isVideo ? (
          <video
            className="hero-video absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster={hero.video_poster?.url ?? FALLBACK_IMAGE}
          >
            <source src={hero.video!.url} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={hero.image?.url ?? FALLBACK_IMAGE}
            alt={hero.image?.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
      </div>

      <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 ${isVideo ? "pt-24" : "pt-40"}`}>
        <div className="max-w-4xl">
          {hero.eyebrow && (
            <p
              className={`anim-fade-up anim-delay-1 inline-block border border-accent/60 text-accent font-title uppercase tracking-[0.25em] px-4 py-2 mb-8 backdrop-blur-sm bg-black/20 ${
                hero.eyebrow.length > 40 ? "text-[11px] md:text-xs" : "text-xs md:text-sm"
              }`}
            >
              {hero.eyebrow}
            </p>
          )}
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight uppercase tracking-tight">
            {hero.title}
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          {hero.description && (
            <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl whitespace-pre-line">
              {hero.description}
            </p>
          )}
          {hero.cta.show && (
            <Link
              href={hero.cta.href}
              className="anim-fade-up anim-delay-4 inline-block mt-8 bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest shadow-2xl clip-notch-br-sm"
            >
              {hero.cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

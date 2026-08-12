import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPage, FALLBACK_IMAGE, type CoberturaCollections } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import CoverageMap from "@/components/sections/CoverageMap";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<CoberturaCollections>("cobertura");
  return pageMetadata(page.seo, "/cobertura", page.media.hero ?? null);
}

export default async function CoberturaPage() {
  const { texts, media, collections, seo } = await getPage<CoberturaCollections>("cobertura");
  const { locations } = collections;

  // Agrupadas por estado para la lista accesible (y SEO) bajo el mapa
  const states = [...new Set(locations.map((l) => l.state))].map((state) => ({
    state,
    locations: locations.filter((l) => l.state === state),
  }));

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />

      {/* Banner: mismo patrón que las demás páginas internas */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={media.hero?.url ?? FALLBACK_IMAGE}
            alt={media.hero?.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>

        <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-40">
          <p className="anim-fade-up anim-delay-1 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            {texts.hero_eyebrow}
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            {texts.hero_title}
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
            {texts.hero_subtitle}
          </p>
        </div>
      </section>

      {/* Cercanía con tu planta */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-title text-3xl md:text-5xl font-bold text-primary uppercase tracking-tight mb-8">
            {texts.intro_title}
          </h2>
          <div className="w-16 h-[3px] bg-support mx-auto mb-10" />
          <p className="text-industrial-gray font-body text-lg md:text-xl leading-relaxed">
            {texts.intro_body}
          </p>
        </div>
      </section>

      {/* Mapa de cobertura */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-12">
            <h2 className="font-title text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">
              {texts.map_title}
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
            <p className="text-white/80 font-body text-lg">{texts.map_intro}</p>
          </div>
        </div>

        {/* Visor a ancho completo de pantalla */}
        <div className="relative z-10 w-full">
          <CoverageMap locations={locations} />
        </div>

        <p className="relative z-10 text-support font-body text-sm mt-6 text-center px-6">
          Acerca con los botones, Ctrl + rueda del mouse o doble clic; arrastra para moverte por el mapa.
        </p>
      </section>

      {/* Lista de localidades por estado (fuente accesible e indexable) */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {states.map((group) => (
              <div key={group.state} className="bg-white border border-support/20 p-10 clip-notch-br">
                <h3 className="font-title text-2xl font-bold text-primary uppercase tracking-wider mb-2">
                  {group.state}
                </h3>
                <p className="font-title text-support text-xs uppercase tracking-[0.2em] mb-8">
                  {group.locations.length} {group.locations.length === 1 ? "localidad" : "localidades"}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {group.locations.map((location) => (
                    <li key={location.name} className="flex items-baseline gap-3 text-primary font-body">
                      <span className="w-3 h-[2px] bg-accent shrink-0 translate-y-[-3px]" aria-hidden />
                      {location.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight mb-10 max-w-3xl mx-auto leading-tight">
            {texts.cta_title}
          </h2>
          <Link
            href="/contacto"
            className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {texts.cta_label}
          </Link>
        </div>
      </section>
    </div>
  );
}

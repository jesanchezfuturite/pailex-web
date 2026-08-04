import type { Metadata } from "next";
import Image from "next/image";
import { getPage, FALLBACK_IMAGE, type IndustriasCollections } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<IndustriasCollections>("industrias");
  return pageMetadata(page.seo, "/industrias", page.media.hero ?? null);
}

export default async function IndustriasPage() {
  const { texts, media, collections, seo } = await getPage<IndustriasCollections>("industrias");

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      {/* Sub-hero de página interna: fotografía en duotono verde */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={FALLBACK_IMAGE}
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

      {/* Encabezado de sección */}
      <section className="pt-32 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              {texts.sectors_title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
          </div>
        </div>
      </section>

      {/* Filas de industrias: imagen a un lado, texto al otro, fondos alternados */}
      {collections.industries.map((industry, index) => (
        <section
          key={industry.name}
          className={`py-20 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative h-[360px] overflow-hidden clip-notch-br group">
                <Image
                  src={FALLBACK_IMAGE}
                  alt={industry.image?.alt ?? industry.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50" />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="w-8 h-[3px] bg-accent mb-5" />
              <h3 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight leading-none mb-4">
                {industry.name}
              </h3>
              <p className="text-industrial-gray font-body text-lg leading-relaxed mb-6">
                {industry.description}
              </p>
              <p className="font-title text-support text-xs md:text-sm uppercase tracking-[0.2em]">
                {industry.clients.join(" · ")}
              </p>
            </div>
          </div>
        </section>
      ))}

    </div>
  );
}

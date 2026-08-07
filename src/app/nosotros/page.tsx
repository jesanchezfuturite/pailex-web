import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPage, FALLBACK_IMAGE, type NosotrosCollections } from "@/lib/api";
import { withHighlight } from "@/lib/highlight";
import { pageMetadata, SchemaScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<NosotrosCollections>("nosotros");
  return pageMetadata(page.seo, "/nosotros", page.media.hero ?? null);
}

export default async function NosotrosPage() {
  const { texts, media, collections, seo } = await getPage<NosotrosCollections>("nosotros");

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      {/* Sub-hero de página interna: fotografía en duotono verde */}
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
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6" />
        </div>
      </section>

      {/* Más de 35 años de experiencia */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-none">
              {texts.experience_title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-6 mb-10" />
            <div className="space-y-6 text-industrial-gray font-body text-lg leading-relaxed">
              <p>{texts.experience_paragraph_1}</p>
              <p>{texts.experience_paragraph_2}</p>
              <p className="text-primary font-medium">{texts.experience_paragraph_3}</p>
            </div>
            <Link
              href="#cotizar"
              className="inline-block mt-10 bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              {texts.experience_cta_label}
            </Link>
          </div>

          <div className="relative">
            <div className="relative h-[520px] overflow-hidden clip-notch-br">
              <Image
                src={media.experience_image?.url ?? FALLBACK_IMAGE}
                alt={media.experience_image?.alt ?? ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
            </div>
            {/* Esquinero en L y pleca: detalles geométricos de marca */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-support hidden md:block" />
            <div className="absolute -bottom-4 right-10 w-24 h-1.5 bg-accent hidden md:block" />
          </div>
        </div>
      </section>

      {/* El valor que aportamos a tu negocio */}
      <section className="py-28 bg-primary text-white relative overflow-hidden">
        <Image
          src={media.value_background?.url ?? FALLBACK_IMAGE}
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-multiply pointer-events-none"
        />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-title text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-8">
            {withHighlight(texts.value_title, texts.value_title_highlight)}
          </h2>
          <div className="w-16 h-[3px] bg-accent mx-auto mb-10" />
          <p className="text-white/85 font-body text-lg md:text-xl leading-relaxed">
            {texts.value_body}
          </p>
          <p className="text-support font-body text-lg md:text-xl leading-relaxed mt-6">
            {texts.value_highlight}
          </p>
        </div>
      </section>

      {/* Lo que nos hace diferentes */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t-4 border-support pt-12 mb-16">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              {texts.differentiators_title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {collections.differentiators.map((item, i) => (
              <DifferentiatorCard
                key={item.title}
                number={String(i + 1).padStart(2, "0")}
                title={item.title}
                desc={item.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DifferentiatorCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="bg-white border border-support/20 p-10 group hover:bg-primary transition-all duration-500 clip-notch-br relative overflow-hidden">
      <span className="absolute top-6 right-8 font-title font-bold text-5xl text-support/20 group-hover:text-accent/20 transition-colors select-none">
        {number}
      </span>
      <div className="w-8 h-[3px] bg-accent mb-6" />
      <h3 className="font-title text-2xl font-bold text-primary group-hover:text-accent uppercase tracking-tight mb-5 transition-colors leading-tight pr-16">
        {title}
      </h3>
      <p className="text-industrial-gray group-hover:text-white/75 font-body leading-relaxed transition-colors">
        {desc}
      </p>
    </div>
  );
}

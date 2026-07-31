import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ProjectImage from "@/components/sections/ProjectImage";
import { getPage, type PortafolioCollections } from "@/lib/api";
import { withHighlight } from "@/lib/highlight";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<PortafolioCollections>("portafolio");
  return {
    title: page.seo.title ?? undefined,
    description: page.seo.description ?? undefined,
  };
}

export default async function PortafolioPage() {
  const { texts, media, collections } = await getPage<PortafolioCollections>("portafolio");

  return (
    <div className="bg-white">
      {/* Sub-hero de página interna: fotografía en duotono verde */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          {media.hero && (
            <Image
              src={media.hero.url}
              alt={media.hero.alt ?? ""}
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

      {/* Proyectos destacados: filas con fondos alternados blanco/gris */}
      <section className="pt-32 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              {texts.projects_title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
          </div>
        </div>
      </section>

      {collections.projects.map((project, index) => (
        <section
          key={project.title}
          className={`py-14 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <article className="border border-support/20 clip-notch-br group hover:border-primary/40 transition-colors bg-white">
              <div className="grid lg:grid-cols-[1fr_1.4fr]">
                {/* Fotografía del proyecto: clic para verla a pantalla completa */}
                {project.image && (
                  <ProjectImage
                    src={project.image.url}
                    title={project.title}
                    width={project.image.width}
                    height={project.image.height}
                  />
                )}

                {/* Ficha técnica */}
                <div className="p-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 content-center">
                  <ProjectField label="Cliente" value={project.client} />
                  <ProjectField label="Sector" value={project.sector} />
                  <ProjectField label="Alcance" value={project.scope} />
                  <div>
                    <p className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
                      Resultado
                    </p>
                    <p className="font-body text-primary font-medium flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-support mt-1 shrink-0" />
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      ))}

      {/* Desarrollo continuo */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        {media.development_background && (
          <Image
            src={media.development_background.url}
            alt=""
            fill
            className="object-cover opacity-10 mix-blend-multiply pointer-events-none"
          />
        )}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              {withHighlight(texts.development_title, texts.development_title_highlight)}
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
            <p className="text-white/80 font-body text-lg">
              {texts.development_intro}
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {collections.continuous_development.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-white/10 pb-3"
              >
                <span className="w-3 h-[2px] bg-accent shrink-0 translate-y-[-3px]" />
                <span className="font-body text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mt-16">
            <Link
              href="#cotizar"
              className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              {texts.development_cta_label}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">{label}</p>
      <p className="font-body text-primary">{value}</p>
    </div>
  );
}

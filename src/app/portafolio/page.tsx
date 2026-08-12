import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2, Clock, ShieldCheck, TrendingUp, UserCheck, Cog, Zap,
  RefreshCw, Layers, Package, Wrench, Target, type LucideIcon,
} from "lucide-react";
import ProjectImage from "@/components/sections/ProjectImage";
import { getPage, FALLBACK_IMAGE, type PortafolioCollections } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";

// Iconos administrables de los beneficios (campo "icon" en el CMS)
const benefitIcons: Record<string, LucideIcon> = {
  check: CheckCircle2,
  clock: Clock,
  shield: ShieldCheck,
  trending: TrendingUp,
  user: UserCheck,
  settings: Cog,
  zap: Zap,
  refresh: RefreshCw,
  layers: Layers,
  package: Package,
  wrench: Wrench,
  target: Target,
};

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<PortafolioCollections>("portafolio");
  return pageMetadata(page.seo, "/portafolio", page.media.hero ?? null);
}

export default async function PortafolioPage() {
  const { texts, media, collections, seo } = await getPage<PortafolioCollections>("portafolio");

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
                <ProjectImage
                  src={project.image?.url ?? FALLBACK_IMAGE}
                  title={project.title}
                  width={project.image?.width ?? 1600}
                  height={project.image?.height ?? 900}
                />

                {/* Ficha técnica */}
                <div className="p-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 content-center">
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

      {/* Casos de éxito: administrables desde el CMS (agregar/quitar/ordenar);
          el CTA al formulario aparece después del caso marcado en el panel */}
      {collections.success_cases.length > 0 && (
        <section className="py-24 bg-primary relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl mb-16">
              <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
                {texts.success_title}
              </h2>
              <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
              <p className="text-white/80 font-body text-lg">{texts.success_intro}</p>
            </div>

            <div className="space-y-12">
              {collections.success_cases.map((caso) => (
                <div key={caso.title}>
                  <article className="bg-white clip-notch-br p-10 md:p-12">
                    <p className="font-title text-support text-xs uppercase tracking-[0.3em] mb-3">
                      Caso de éxito
                    </p>
                    <h3 className="font-title text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight leading-tight mb-4">
                      {caso.title}
                    </h3>
                    {(caso.client || caso.industry) && (
                      <p className="font-body text-industrial-gray text-sm mb-8">
                        {[caso.client, caso.industry].filter(Boolean).join(" · ")}
                      </p>
                    )}

                    {caso.challenge && (
                      <div className="mb-8">
                        <h4 className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
                          Desafío
                        </h4>
                        <p className="font-body text-industrial-gray leading-relaxed">
                          {caso.challenge}
                        </p>
                      </div>
                    )}

                    {caso.intervention && (
                      <div className="mb-8">
                        <h4 className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
                          Nuestra intervención
                        </h4>
                        <div
                          className="prose-pailex prose-pailex-sm"
                          dangerouslySetInnerHTML={{ __html: caso.intervention }}
                        />
                      </div>
                    )}

                    {caso.benefits.length > 0 && (
                      <div className="mb-8">
                        <h4 className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-4">
                          Beneficios para el cliente
                        </h4>
                        <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                          {caso.benefits.map((benefit, i) => {
                            const Icon = benefitIcons[benefit.icon] ?? CheckCircle2;
                            return (
                              <li key={`${benefit.text}-${i}`} className="flex items-start gap-3">
                                <span className="w-9 h-9 bg-primary flex items-center justify-center clip-notch-br-sm shrink-0">
                                  <Icon size={17} className="text-accent" strokeWidth={1.8} />
                                </span>
                                <span className="font-body text-primary leading-snug pt-1.5">
                                  {benefit.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}

                    {caso.impact && (
                      <div className="bg-primary p-8 clip-notch-br-sm relative overflow-hidden">
                        <div className="w-8 h-[3px] bg-accent mb-4" />
                        <h4 className="font-title text-accent text-[11px] uppercase tracking-[0.25em] mb-3">
                          Impacto generado
                        </h4>
                        <p className="font-body text-white/90 text-lg leading-relaxed">
                          {caso.impact}
                        </p>
                      </div>
                    )}
                  </article>

                  {caso.show_cta_after && (
                    <div className="text-center mt-12">
                      <Link
                        href="/contacto"
                        className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {texts.success_cta_label}
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
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

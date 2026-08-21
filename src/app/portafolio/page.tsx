import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2, Clock, ShieldCheck, TrendingUp, UserCheck, Cog, Zap,
  RefreshCw, Layers, Package, Wrench, Target, type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getPage, FALLBACK_IMAGE, type PortafolioCollections } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";

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
  return pageMetadata(page.seo, `/${page.slug}`, page.hero.image ?? null);
}

export default async function PortafolioPage() {
  const page = await getPage<PortafolioCollections>("portafolio");
  if (page.status !== "published") notFound();
  const { texts, media, collections, seo } = page;

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <PageHero hero={page.hero} />

      {/* Casos de éxito: única sección de contenido de esta página; después
          del hero se salta directo a los casos, sin encabezado intermedio.
          Cada caso ocupa el ancho estándar de sección (como el resto del
          sitio) y alterna fondo blanco/gris; el CTA opcional conserva su
          propio fondo verde institucional. */}
      {collections.success_cases.length > 0 && (
        <>
          {collections.success_cases.map((caso, index) => (
            <div key={caso.title}>
              <section className={`${index === 0 ? "pt-24 pb-14" : "py-14"} ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}>
                <div className="max-w-7xl mx-auto px-6">
                  <article className="border border-support/20 clip-notch-br bg-white overflow-hidden">
                    {/* Desafío + intervención a la izquierda, imagen a la derecha */}
                    <div className="grid lg:grid-cols-2">
                      <div className="p-10 md:p-12 order-2 lg:order-1">
                        <h2 className="font-title text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight leading-tight mb-4">
                          {caso.title}
                        </h2>
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
                          <div>
                            <h4 className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
                              Nuestra intervención
                            </h4>
                            <div
                              className="prose-pailex prose-pailex-sm"
                              dangerouslySetInnerHTML={{ __html: caso.intervention }}
                            />
                          </div>
                        )}
                      </div>

                      <div className="relative min-h-[280px] lg:min-h-full order-1 lg:order-2">
                        <Image
                          src={caso.image?.url ?? FALLBACK_IMAGE}
                          alt={caso.image?.alt ?? caso.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                      </div>
                    </div>

                    {/* Beneficios para el cliente + impacto: igual que antes, ancho completo */}
                    {(caso.benefits.length > 0 || caso.impact) && (
                      <div className="p-10 md:p-12 border-t border-support/20">
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
                      </div>
                    )}
                  </article>
                </div>
              </section>

              {caso.show_cta_after && (
                <section className="py-16 bg-primary text-center relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{
                      backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }}
                  />
                  <Link
                    href="/contacto"
                    className="relative z-10 inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {texts.success_cta_label}
                  </Link>
                </section>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, getSolutions, FALLBACK_IMAGE } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import FAQAccordion from "@/components/sections/FAQAccordion";

/**
 * Plantilla única de los interiores de solución (secciones 1-3 aprobadas).
 * La estructura, jerarquía de encabezados (H2 → H3 → H4-H6) y colores por
 * fondo están fijados aquí; el CMS solo administra el contenido permitido.
 * Las secciones 4-8 se agregarán debajo cuando se aprueben.
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // Solo las publicadas se pre-renderizan; los borradores se resuelven
  // bajo demanda por su URL exacta (vista previa).
  const solutions = await getSolutions();
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) {
    return {};
  }

  const metadata = pageMetadata(
    { ...solution.seo, title: solution.seo.title ?? `${solution.name} | Pailex` },
    `/soluciones/${solution.slug}`,
    solution.hero.image ?? null,
  );

  // Los borradores se pueden revisar por URL, pero jamás indexar
  if (solution.status === "draft") {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = await getSolution(slug);
  if (!solution) {
    notFound();
  }

  const { banner, hero, intro, capabilities, faqs } = solution;
  const introDark = intro.background === "green";
  const showIntro = intro.enabled && Boolean(intro.title || intro.content);
  const showList = intro.list.enabled && intro.list.items.length > 0;
  const showCapabilities = capabilities.enabled && capabilities.items.length > 0;

  return (
    <div className="bg-white">
      <SchemaScript schema={solution.seo.schema} />

      {solution.status === "draft" && (
        <p className="fixed bottom-4 left-4 z-50 bg-industrial-gray text-white font-title text-xs uppercase tracking-[0.2em] px-4 py-2 clip-notch-br-sm">
          Borrador — vista previa
        </p>
      )}

      {/* ── Banner superior: mismo patrón que las demás páginas internas ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={banner.image?.url ?? FALLBACK_IMAGE}
            alt={banner.image?.alt ?? banner.title}
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
            Soluciones Pailex
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            {banner.title}
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          {banner.description && (
            <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
              {banner.description}
            </p>
          )}
        </div>
      </section>

      {/* ── Sección 1: Hero (obligatoria) ─────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-none">
                {hero.title}
              </h2>
              <div className="w-20 h-1.5 bg-support mt-6 mb-8" />
              {hero.description && (
                <div
                  className="prose-pailex"
                  dangerouslySetInnerHTML={{ __html: hero.description }}
                />
              )}
            </div>

            <div className="relative h-[380px] lg:h-[440px] overflow-hidden clip-notch-br">
              {hero.media_type === "video" && hero.video ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster={hero.video_poster?.url}
                >
                  <source src={hero.video.url} type="video/mp4" />
                </video>
              ) : (
                <>
                  <Image
                    src={hero.image?.url ?? FALLBACK_IMAGE}
                    alt={hero.image?.alt ?? hero.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                </>
              )}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50 pointer-events-none" />
            </div>
          </div>

          {hero.cta.show && (
            <div className="text-center mt-16">
              <Link
                href={hero.cta.href}
                className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {hero.cta.label}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Sección 2: Introducción técnica (opcional) ────────── */}
      {showIntro && (
        <section
          className={`py-24 relative overflow-hidden ${introDark ? "bg-primary" : "bg-white border-t border-support/10"}`}
        >
          {introDark && (
            <>
              <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
            </>
          )}

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {intro.title && (
              <div className="max-w-2xl mb-12">
                <h2
                  className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight ${introDark ? "text-white" : "text-primary"}`}
                >
                  {intro.title}
                </h2>
                <div className={`w-20 h-1.5 mt-4 ${introDark ? "bg-accent" : "bg-support"}`} />
              </div>
            )}

            <div className={showList ? "grid lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16" : ""}>
              {intro.content && (
                <div
                  className={introDark ? "prose-pailex prose-pailex-dark" : "prose-pailex"}
                  dangerouslySetInnerHTML={{ __html: intro.content }}
                />
              )}

              {showList && (
                <aside
                  className={`p-10 clip-notch-br self-start ${introDark ? "border border-white/15 bg-white/5" : "border border-support/20 bg-gray-50"}`}
                >
                  <h3
                    className={`font-title text-2xl font-bold uppercase tracking-wider mb-8 ${introDark ? "text-accent" : "text-primary"}`}
                  >
                    {intro.list.title}
                  </h3>
                  <ul className="space-y-4">
                    {intro.list.items.map((item, i) => (
                      <li
                        key={`${item.title}-${i}`}
                        className={`flex items-baseline gap-4 pb-3 border-b ${introDark ? "border-white/10" : "border-support/20"}`}
                      >
                        <span className="w-3 h-[2px] bg-accent shrink-0 translate-y-[-3px]" aria-hidden />
                        <div>
                          <p className={`font-title font-bold ${introDark ? "text-white/90" : "text-primary"}`}>
                            {item.title}
                          </p>
                          {item.description && (
                            <p className={`font-body text-sm mt-1 ${introDark ? "text-white/70" : "text-industrial-gray"}`}>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Sección 3: Capacidades / qué hacemos (opcional) ───── */}
      {showCapabilities && (
        <section className="py-24 bg-white border-t border-support/10">
          <div className="max-w-7xl mx-auto px-6">
            {capabilities.title && (
              <div className="max-w-2xl mb-16">
                <h2 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight">
                  {capabilities.title}
                </h2>
                <div className="w-20 h-1.5 bg-support mt-4" />
              </div>
            )}

            {/* Grid fijo: 3 por fila en escritorio, 2 en tablet, 1 en móvil */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {capabilities.items.map((item, i) => (
                <article
                  key={`${item.title}-${i}`}
                  className="border border-support/20 bg-white group transition-all duration-500 shadow-sm relative overflow-hidden clip-notch-br flex flex-col"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-support group-hover:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10" />
                  {item.image && (
                    <div className="relative h-56 overflow-hidden">
                      <Image
                        src={item.image.url}
                        alt={item.image.alt ?? item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-primary/15 group-hover:bg-primary/30 transition-colors duration-500" />
                    </div>
                  )}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="font-title text-2xl font-bold text-primary uppercase tracking-tight leading-tight mb-4">
                      {item.title}
                    </h3>
                    {item.description && (
                      <div
                        className="prose-pailex prose-pailex-sm flex-1"
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                    {item.href && (
                      <Link
                        href={item.href}
                        className="relative overflow-hidden text-primary font-bold uppercase text-xs tracking-[0.2em] inline-flex items-center self-start mt-6 group/btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        <span className="relative z-10 group-hover/btn:text-support transition-colors duration-300">
                          Ver más
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-support group-hover/btn:bg-accent origin-left transition-all duration-300" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sección FAQ: preguntas frecuentes (opcional) ──────── */}
      {faqs.enabled && faqs.items.length > 0 && (
        <FAQAccordion title={faqs.title} faqs={faqs.items} />
      )}
    </div>
  );
}

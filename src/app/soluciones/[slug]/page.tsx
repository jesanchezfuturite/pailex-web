import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSolution, getSolutions, FALLBACK_IMAGE } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import FAQAccordion from "@/components/sections/FAQAccordion";
import ContactQuoteForm from "@/components/forms/ContactQuoteForm";
import CoverageMap from "@/components/sections/CoverageMap";
import SectionDots from "@/components/sections/SectionDots";
import { withHighlight } from "@/lib/highlight";
import { sectionStyle, isDotted, cardStyle } from "@/lib/sectionStyle";

/**
 * Plantilla única de los interiores de solución (8 secciones aprobadas).
 * La estructura, jerarquía de encabezados (H2 → H3 → H4-H6) y colores por
 * fondo están fijados aquí; el CMS solo administra el contenido permitido.
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

  const {
    banner, hero, intro, capabilities, problems, coverage, reasons,
    cta_banner: ctaBanner, faqs,
  } = solution;
  const introDark = intro.background === "green";
  const showIntro = intro.enabled && Boolean(intro.title || intro.content);
  const showList = intro.list.enabled && intro.list.items.length > 0;
  const showContact = intro.show_contact;
  const showHighlight = Boolean(intro.highlight.text);
  const showCapabilities = capabilities.enabled && capabilities.items.length > 0;
  const showProblems = problems.enabled && problems.items.length > 0;
  const showCoverage = coverage.enabled && coverage.locations.length > 0;
  const showReasons = reasons.enabled && reasons.items.length > 0;
  const showCtaBanner = ctaBanner.enabled && Boolean(ctaBanner.title);

  const capabilitiesStyle = sectionStyle(capabilities.background);
  const problemsStyle = sectionStyle(problems.background);
  const coverageStyle = sectionStyle(coverage.background);
  const reasonsStyle = sectionStyle(reasons.background);
  const ctaBannerStyle = sectionStyle(ctaBanner.background);
  const coverageDark = coverage.background !== "white" && coverage.background !== "gray";
  const ctaBannerDark = ctaBanner.background !== "white" && ctaBanner.background !== "gray";

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
          {banner.media_type === "video" && banner.video ? (
            <video
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={banner.video_poster?.url}
            >
              <source src={banner.video.url} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={banner.image?.url ?? FALLBACK_IMAGE}
              alt={banner.image?.alt ?? banner.title}
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

      {/* ── Sección 2: Introducción / propuesta de valor (opcional) ── */}
      {showIntro && (
        <section
          id="cotizar-solucion"
          className={`py-24 relative overflow-hidden scroll-mt-24 ${introDark ? "bg-primary" : "bg-white border-t border-support/10"}`}
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
            <div className={showContact ? "grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16" : ""}>
              <div>
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

                {intro.content && (
                  <div
                    className={introDark ? "prose-pailex prose-pailex-dark" : "prose-pailex"}
                    dangerouslySetInnerHTML={{ __html: intro.content }}
                  />
                )}

                {showList && (
                  <div className="mt-10">
                    <h3
                      className={`font-title text-xl font-bold uppercase tracking-wider mb-6 ${introDark ? "text-accent" : "text-primary"}`}
                    >
                      {intro.list.title}
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                      {intro.list.items.map((item, i) => (
                        <li
                          key={`${item.title}-${i}`}
                          className={`flex items-baseline gap-3 font-body ${introDark ? "text-white/90" : "text-primary"}`}
                        >
                          <span className="w-3 h-[2px] bg-support shrink-0 translate-y-[-3px]" aria-hidden />
                          <div>
                            <p className="font-title font-bold">{item.title}</p>
                            {item.description && (
                              <div
                                className={`prose-pailex prose-pailex-sm text-sm mt-1 ${introDark ? "prose-pailex-dark text-white/70" : "text-industrial-gray"}`}
                                dangerouslySetInnerHTML={{ __html: item.description }}
                              />
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              </div>

              {showContact && <ContactQuoteForm title="Solicita tu cotización" submitLabel="Enviar" />}
            </div>
          </div>

          {showHighlight && (
            <div className="max-w-7xl mx-auto px-6 mt-12 relative z-10">
              <p className="text-primary font-title text-xl md:text-2xl uppercase tracking-tight leading-snug">
                {withHighlight(intro.highlight.text ?? "", intro.highlight.word, "font-bold")}
              </p>
            </div>
          )}

          {intro.cta.show && (
            <div className="max-w-7xl mx-auto px-6 mt-10 relative z-10 text-center">
              <Link href={intro.cta.href} className={introDark ? sectionStyle("primary").ctaButton : sectionStyle("white").ctaButton}>
                {intro.cta.label}
              </Link>
            </div>
          )}
        </section>
      )}

      {/* ── Sección 3: ¿Qué problemas podemos ayudarte a resolver? (opcional) ── */}
      {showProblems && (
        <section className={`py-24 relative overflow-hidden ${problemsStyle.section}`}>
          {isDotted(problems.background) && <SectionDots />}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-2xl mb-16">
              <h2 className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight ${problemsStyle.heading}`}>
                {problems.title}
              </h2>
              <div className={`w-20 h-1.5 mt-4 ${problemsStyle.accentLine}`} />
              {problems.content && (
                <div
                  className={`mt-6 prose-pailex ${problemsStyle.heading === "text-white" ? "prose-pailex-dark" : ""}`}
                  dangerouslySetInnerHTML={{ __html: problems.content }}
                />
              )}
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {problems.items.map((item, i) => {
                const itemStyle = cardStyle(item.background);
                // En tarjetas oscuras (verde institucional / translúcida) la respuesta se
                // lee completa en blanco, no al 70% como el resto de las tarjetas.
                const isDarkCard = item.background === "primary" || item.background === "glass";
                return (
                  <details key={`${item.question}-${i}`} className={`group border p-8 transition-all ${itemStyle.base} ${itemStyle.border}`}>
                    <summary className={`list-none cursor-pointer flex justify-between items-start gap-4 font-title font-bold text-lg uppercase tracking-tight ${itemStyle.heading}`}>
                      {item.question}
                      <span className="group-open:rotate-180 transition-transform text-xs shrink-0 mt-1">▼</span>
                    </summary>
                    <div
                      className={`mt-4 prose-pailex prose-pailex-sm border-t pt-4 ${itemStyle.border} ${isDarkCard ? "prose-pailex-dark text-white!" : ""}`}
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  </details>
                );
              })}
            </div>
            {problems.cta.show && (
              <div className="mt-12">
                <Link href={problems.cta.href} className={problemsStyle.ctaButton}>
                  {problems.cta.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Sección 4: Capacidades / qué hacemos (opcional) ───── */}
      {showCapabilities && (
        <section className={`py-24 relative overflow-hidden ${capabilitiesStyle.section}`}>
          {isDotted(capabilities.background) && <SectionDots />}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {capabilities.title && (
              <div className="mb-16">
                <div className="max-w-2xl">
                  <h2 className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight ${capabilitiesStyle.heading}`}>
                    {capabilities.title}
                  </h2>
                  <div className={`w-20 h-1.5 mt-4 ${capabilitiesStyle.accentLine}`} />
                </div>
                {capabilities.content && (
                  <div
                    className={`mt-6 prose-pailex ${capabilitiesStyle.heading === "text-white" ? "prose-pailex-dark" : ""}`}
                    dangerouslySetInnerHTML={{ __html: capabilities.content }}
                  />
                )}
              </div>
            )}

            {/* Grid fijo: 3 por fila en escritorio, 2 en tablet, 1 en móvil */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {capabilities.items.map((item, i) => {
                const itemStyle = cardStyle(item.background);
                const isDarkCard = item.background === "primary" || item.background === "glass";
                return (
                  <article
                    key={`${item.title}-${i}`}
                    className={`border group transition-all duration-500 shadow-sm relative overflow-hidden clip-notch-br flex flex-col ${itemStyle.base} ${itemStyle.border}`}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10 ${itemStyle.accentBar}`} />
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
                      <h3 className={`font-title text-2xl font-bold uppercase tracking-tight leading-tight mb-4 ${itemStyle.heading}`}>
                        {item.title}
                      </h3>
                      {item.description && (
                        <div
                          className={`prose-pailex prose-pailex-sm flex-1 ${isDarkCard ? "prose-pailex-dark" : ""}`}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                      {item.href && (
                        <Link
                          href={item.href}
                          className={`relative overflow-hidden font-bold uppercase text-xs tracking-[0.2em] inline-flex items-center self-start mt-6 group/btn focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${itemStyle.heading}`}
                        >
                          <span className="relative z-10 group-hover/btn:text-accent transition-colors duration-300">
                            Ver más
                          </span>
                          <span className={`absolute bottom-0 left-0 w-full h-[2px] group-hover/btn:bg-accent origin-left transition-all duration-300 ${itemStyle.accentBar}`} />
                        </Link>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
            {capabilities.cta.show && (
              <div className="mt-12">
                <Link href={capabilities.cta.href} className={capabilitiesStyle.ctaButton}>
                  {capabilities.cta.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Sección 5: Cobertura (opcional) ───────────────────── */}
      {showCoverage && (
        <section className={`py-24 relative overflow-hidden ${coverageStyle.section}`}>
          {isDotted(coverage.background) && <SectionDots />}
          <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div>
              {coverage.title && (
                <h2 className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight mb-6 ${coverageStyle.heading}`}>
                  {coverage.title}
                </h2>
              )}
              {coverage.content && (
                <div
                  className={coverageDark ? "prose-pailex prose-pailex-dark" : "prose-pailex"}
                  dangerouslySetInnerHTML={{ __html: coverage.content }}
                />
              )}
              {coverage.cta.show && (
                <Link href={coverage.cta.href} className={`mt-10 ${coverageStyle.ctaButton}`}>
                  {coverage.cta.label}
                </Link>
              )}
            </div>
            <div className="bg-primary/10 clip-notch-br overflow-hidden">
              <CoverageMap locations={coverage.locations} />
            </div>
          </div>
        </section>
      )}

      {/* ── Sección 6: ¿Por qué trabajar con Pailex? (opcional) ── */}
      {showReasons && (
        <section className={`py-32 relative overflow-hidden ${reasonsStyle.section}`}>
          {isDotted(reasons.background) && <SectionDots />}
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {reasons.title && (
              <div className={`border-t-4 pt-12 mb-16 ${reasonsStyle.accentLine.replace("bg-", "border-")}`}>
                <h2 className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight ${reasonsStyle.heading}`}>
                  {reasons.title}
                </h2>
                {reasons.content && (
                  <div
                    className={`mt-6 max-w-2xl prose-pailex ${reasonsStyle.heading === "text-white" ? "prose-pailex-dark" : ""}`}
                    dangerouslySetInnerHTML={{ __html: reasons.content }}
                  />
                )}
              </div>
            )}
            <div className="grid md:grid-cols-2 gap-10">
              {reasons.items.map((item, i) => {
                const itemStyle = cardStyle(item.background);
                const isDarkCard = item.background === "primary" || item.background === "glass";
                // Las tarjetas claras se vuelven verde institucional al pasar el mouse
                // (ver cardStyle().hover); el texto debe pasar a blanco en ese momento.
                const hoverTextWhite = itemStyle.hover.includes("hover:text-white");
                return (
                  <div
                    key={`${item.title}-${i}`}
                    className={`border p-10 group transition-all duration-500 clip-notch-br relative overflow-hidden ${itemStyle.base} ${itemStyle.border} ${itemStyle.hover}`}
                  >
                    <span className="absolute top-6 right-8 font-title font-bold text-5xl text-support/20 group-hover:text-accent/20 transition-colors select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className={`w-8 h-[3px] mb-6 ${itemStyle.accentBar}`} />
                    <h3 className={`font-title text-2xl font-bold uppercase tracking-tight mb-4 transition-colors leading-tight pr-16 group-hover:text-accent ${itemStyle.heading}`}>
                      {item.title}
                    </h3>
                    {item.description && (
                      <div
                        className={`prose-pailex prose-pailex-sm transition-colors ${isDarkCard ? "prose-pailex-dark" : ""} ${hoverTextWhite ? "group-hover:text-white!" : ""}`}
                        dangerouslySetInnerHTML={{ __html: item.description }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            {reasons.cta.show && (
              <div className="mt-12">
                <Link href={reasons.cta.href} className={reasonsStyle.ctaButton}>
                  {reasons.cta.label}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Sección 7: CTA de cierre (opcional) ───────────────── */}
      {showCtaBanner && (
        <section className={`py-24 relative overflow-hidden ${ctaBannerStyle.section}`}>
          {isDotted(ctaBanner.background) && <SectionDots />}
          <div className="absolute top-0 right-0 w-64 h-64 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-support/10 [clip-path:polygon(0_100%,0_0,100%_100%)] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className={`font-title text-3xl md:text-5xl font-bold mb-8 uppercase tracking-tighter leading-tight ${ctaBannerStyle.heading}`}>
              {ctaBanner.title}
            </h2>
            {ctaBanner.body && (
              <div
                className={`prose-pailex mb-10 [&_*]:text-center ${ctaBannerDark ? "prose-pailex-dark" : ""}`}
                dangerouslySetInnerHTML={{ __html: ctaBanner.body }}
              />
            )}
            <Link href={ctaBanner.cta.href} className={ctaBannerStyle.ctaButton}>
              {ctaBanner.cta.label}
            </Link>
          </div>
        </section>
      )}

      {/* ── Sección 8: preguntas frecuentes (opcional) ────────── */}
      {faqs.enabled && faqs.items.length > 0 && (
        <FAQAccordion
          title={faqs.title}
          content={faqs.content}
          faqs={faqs.items}
          background={faqs.background}
          cta={faqs.cta}
        />
      )}
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPage, FALLBACK_IMAGE, type NosotrosCollections } from "@/lib/api";
import { withHighlight } from "@/lib/highlight";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import Timeline from "@/components/sections/Timeline";
import CoverageMap from "@/components/sections/CoverageMap";
import SectionDots from "@/components/sections/SectionDots";
import { sectionStyle, isDotted, cardStyle, type CardBackground } from "@/lib/sectionStyle";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<NosotrosCollections>("nosotros");
  return pageMetadata(page.seo, `/${page.slug}`, page.hero.image ?? null);
}

export default async function NosotrosPage() {
  const page = await getPage<NosotrosCollections>("nosotros");
  const { texts, media, collections, seo, sections } = page;

  const experience = sections.experience;
  const value = sections.value;
  const coverage = sections.coverage;
  const differentiators = sections.differentiators;

  const experienceStyle = sectionStyle(experience.background);
  const valueStyle = sectionStyle(value.background);
  const coverageStyle = sectionStyle(coverage.background);
  const differentiatorsStyle = sectionStyle(differentiators.background);

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <PageHero hero={page.hero} />

      {/* Más de 35 años de experiencia */}
      <section className={`py-32 relative overflow-hidden ${experienceStyle.section}`}>
        {isDotted(experience.background) && <SectionDots />}
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <h2 className={`font-title text-4xl md:text-5xl font-bold uppercase tracking-tight leading-none ${experienceStyle.heading}`}>
              {experience.title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-6 mb-10" />
            <div
              className={`font-body text-lg leading-relaxed ${
                experience.background === "white" || experience.background === "gray" ? "prose-pailex" : "prose-pailex prose-pailex-dark"
              }`}
              dangerouslySetInnerHTML={{ __html: texts.experience_content }}
            />

            <Link
              href="#cotizar"
              className="inline-block mt-10 bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              {texts.experience_cta_label}
            </Link>
          </div>

          <div className="relative">
            <div className="relative h-[520px] overflow-hidden clip-notch-br">
              {experience.media_type === "video" && media.experience_video ? (
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster={media.experience_video_poster?.url}
                >
                  <source src={media.experience_video.url} type="video/mp4" />
                </video>
              ) : (
                <>
                  <Image
                    src={media.experience_image?.url ?? FALLBACK_IMAGE}
                    alt={media.experience_image?.alt ?? ""}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                </>
              )}
            </div>
            {/* Esquinero en L y pleca: detalles geométricos de marca */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-4 border-l-4 border-support hidden md:block" />
            <div className="absolute -bottom-4 right-10 w-24 h-1.5 bg-accent hidden md:block" />
          </div>
        </div>
      </section>

      <Timeline title={sections.timeline.title ?? "Nuestra trayectoria"} items={collections.timeline} background={sections.timeline.background} />

      {/* El valor que aportamos a tu negocio */}
      <section className={`py-28 relative overflow-hidden ${valueStyle.section}`}>
        {isDotted(value.background) && <SectionDots />}
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className={`font-title text-3xl md:text-5xl font-bold uppercase tracking-tight mb-8 ${valueStyle.heading}`}>
            {withHighlight(value.title ?? "", value.title_highlight)}
          </h2>
          <div className="w-16 h-[3px] bg-accent mx-auto mb-10" />
          <p className={`font-body text-lg md:text-xl leading-relaxed ${valueStyle.body}`}>
            {texts.value_body}
          </p>
          <p className="text-support font-body text-lg md:text-xl leading-relaxed mt-6">
            {texts.value_highlight}
          </p>
        </div>
      </section>

      {/* Zona de cobertura: mismo mapa y localidades que antes vivían en /cobertura */}
      {collections.locations.length > 0 && (
        <>
          <section className={`py-24 relative overflow-hidden ${coverageStyle.section}`}>
            {isDotted(coverage.background) && <SectionDots />}
            <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="max-w-2xl mb-12">
                <h2 className={`font-title text-3xl md:text-4xl font-bold uppercase tracking-tight ${coverageStyle.heading}`}>
                  {coverage.title}
                </h2>
                <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
                <p className={`font-body text-lg ${coverageStyle.body}`}>{texts.coverage_intro}</p>
              </div>
            </div>

            <div className="relative z-10 w-full">
              <CoverageMap locations={collections.locations} />
            </div>
          </section>

          <section className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid md:grid-cols-2 gap-10">
                {[...new Set(collections.locations.map((l) => l.state))].map((state) => {
                  const stateLocations = collections.locations.filter((l) => l.state === state);
                  return (
                    <div key={state} className="bg-white border border-support/20 p-10 clip-notch-br">
                      <h3 className="font-title text-2xl font-bold text-primary uppercase tracking-wider mb-2">
                        {state}
                      </h3>
                      <p className="font-title text-support text-xs uppercase tracking-[0.2em] mb-8">
                        {stateLocations.length} {stateLocations.length === 1 ? "localidad" : "localidades"}
                      </p>
                      <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                        {stateLocations.map((location) => (
                          <li key={location.name} className="flex items-baseline gap-3 text-primary font-body">
                            <span className="w-3 h-[2px] bg-accent shrink-0 translate-y-[-3px]" aria-hidden />
                            {location.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* Lo que nos hace diferentes */}
      <section className={`py-32 relative overflow-hidden ${differentiatorsStyle.section}`}>
        {isDotted(differentiators.background) && <SectionDots />}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="border-t-4 border-support pt-12 mb-16">
            <h2 className={`font-title text-4xl md:text-5xl font-bold uppercase tracking-tight ${differentiatorsStyle.heading}`}>
              {differentiators.title}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            {collections.differentiators.map((item, i) => (
              <DifferentiatorCard
                key={item.title}
                number={String(i + 1).padStart(2, "0")}
                title={item.title}
                desc={item.description}
                background={item.background}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function DifferentiatorCard({
  number, title, desc, background,
}: { number: string; title: string; desc: string; background: CardBackground }) {
  const style = cardStyle(background);
  return (
    <div className={`border p-10 group transition-all duration-500 clip-notch-br relative overflow-hidden ${style.base} ${style.border} ${style.hover}`}>
      <span className="absolute top-6 right-8 font-title font-bold text-5xl text-support/20 group-hover:text-accent/20 transition-colors select-none">
        {number}
      </span>
      <div className="w-8 h-[3px] bg-accent mb-6" />
      <h3 className={`font-title text-2xl font-bold uppercase tracking-tight mb-5 transition-colors leading-tight pr-16 group-hover:text-accent ${style.heading}`}>
        {title}
      </h3>
      <p className={`font-body leading-relaxed transition-colors ${style.body}`}>
        {desc}
      </p>
    </div>
  );
}

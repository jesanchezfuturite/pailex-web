import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPage, FALLBACK_IMAGE, type IndustriasCollections } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import SectionDots from "@/components/sections/SectionDots";
import { sectionStyle, isDotted, titleSize as titleSizeOf } from "@/lib/sectionStyle";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<IndustriasCollections>("industrias");
  return pageMetadata(page.seo, `/${page.slug}`, page.hero.image ?? null);
}

export default async function IndustriasPage() {
  const page = await getPage<IndustriasCollections>("industrias");
  if (page.status !== "published") notFound();
  const { collections, seo, sections } = page;

  const sectorsSection = sections.sectors;
  const sectorsStyle = sectionStyle(sectorsSection.background);
  const sectorsHeading = titleSizeOf(sectorsSection.title_size, "text-4xl md:text-5xl");

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <PageHero hero={page.hero} />

      {/* Encabezado de sección */}
      <section className={`pt-32 pb-8 relative overflow-hidden ${sectorsStyle.section}`}>
        {isDotted(sectorsSection.background) && <SectionDots />}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className={`font-title font-bold uppercase tracking-tight ${sectorsHeading.className} ${sectorsStyle.heading}`} style={sectorsHeading.style}>
              {sectorsSection.title}
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
                  src={industry.image?.url ?? FALLBACK_IMAGE}
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
              <p className="text-industrial-gray font-body text-lg leading-relaxed">
                {industry.description}
              </p>
              {industry.company_names.length > 0 && (
                <p className="text-support font-body text-sm mt-4 tracking-wide">
                  {industry.company_names.join(" ● ")}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

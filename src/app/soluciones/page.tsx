import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Cable, Droplets, Layers, Filter, Funnel, Forklift, Check,
  Wrench, Cog, Package, type LucideIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getPage, FALLBACK_IMAGE, type SolucionesCollections } from "@/lib/api";
import { withHighlight } from "@/lib/highlight";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import SectionDots from "@/components/sections/SectionDots";
import { sectionStyle, isDotted, cardStyle, titleSize as titleSizeOf } from "@/lib/sectionStyle";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<SolucionesCollections>("soluciones");
  return pageMetadata(page.seo, `/${page.slug}`, page.hero.image ?? null);
}

// Mapa de iconos administrables desde el CMS (campo "icon" de productos)
const productIcons: Record<string, LucideIcon> = {
  cable: Cable,
  droplets: Droplets,
  layers: Layers,
  filter: Filter,
  container: Funnel,
  forklift: Forklift,
  wrench: Wrench,
  cog: Cog,
  package: Package,
};

export default async function SolucionesPage() {
  const page = await getPage<SolucionesCollections>("soluciones");
  if (page.status !== "published") notFound();
  const { texts, collections, seo, sections } = page;
  const { services, products, capacity_groups: capacity } = collections;

  const servicesSection = sections.services;
  const productsSection = sections.products;
  const capacitySection = sections.capacity;

  const servicesStyle = sectionStyle(servicesSection.background);
  const productsStyle = sectionStyle(productsSection.background);
  const capacityStyle = sectionStyle(capacitySection.background);

  const servicesHeading = titleSizeOf(servicesSection.title_size, "text-4xl md:text-5xl");
  const productsHeading = titleSizeOf(productsSection.title_size, "text-4xl md:text-5xl");
  const capacityHeading = titleSizeOf(capacitySection.title_size, "text-4xl md:text-5xl");

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <PageHero hero={page.hero} />

      {/* Servicios industriales: encabezado; cada servicio alterna blanco/gris debajo */}
      <section id="servicios" className={`pt-32 pb-8 scroll-mt-24 relative overflow-hidden ${servicesStyle.section}`}>
        {isDotted(servicesSection.background) && <SectionDots />}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className={`font-title font-bold uppercase tracking-tight ${servicesHeading.className} ${servicesStyle.heading}`} style={servicesHeading.style}>
              {servicesSection.title}
            </h2>
            <div className={`w-20 h-1.5 mt-4 ${servicesStyle.accentLine}`} />
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.slug}
          id={service.slug}
          className={`py-20 scroll-mt-24 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative h-[380px] overflow-hidden clip-notch-br">
                <Image
                  src={service.image?.url ?? FALLBACK_IMAGE}
                  alt={service.image?.alt ?? service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <h3 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight mb-4 leading-none">
                {service.href ? (
                  <Link
                    href={service.href}
                    className="hover:text-support transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {service.title}
                  </Link>
                ) : (
                  service.title
                )}
              </h3>
              <p className="text-industrial-gray font-body text-lg leading-relaxed mb-8">
                {service.description}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {service.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-primary font-body">
                    <Check size={18} className="text-support mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="#cotizar"
            className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
          >
            {texts.services_cta_label}
          </Link>
        </div>
      </section>

      {/* Productos / Suministros */}
      <section id="productos" className={`py-32 scroll-mt-24 relative overflow-hidden ${productsStyle.section}`}>
        {isDotted(productsSection.background) && <SectionDots />}
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="border-t-4 border-support pt-12 mb-6">
            <h2 className={`font-title font-bold uppercase tracking-tight ${productsHeading.className} ${productsStyle.heading}`} style={productsHeading.style}>
              {productsSection.title}
            </h2>
          </div>
          <p className={`font-body text-lg max-w-3xl mb-16 ${productsStyle.body}`}>
            {texts.products_intro}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const ProductIcon = productIcons[product.icon] ?? Package;
              return (
                <div
                  key={product.name}
                  className="bg-white border border-support/20 p-8 group hover:bg-primary transition-all duration-500 clip-notch-br-sm"
                >
                  <ProductIcon
                    size={32}
                    className="text-support group-hover:text-accent transition-colors mb-5"
                    strokeWidth={1.5}
                  />
                  <p className="font-title font-bold text-primary group-hover:text-white uppercase tracking-wide leading-snug transition-colors">
                    {product.name}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link
              href="#cotizar"
              className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              {texts.products_cta_label}
            </Link>
          </div>
        </div>
      </section>

      {/* Capacidad instalada */}
      <section id="capacidad-instalada" className={`py-32 relative overflow-hidden scroll-mt-24 ${capacityStyle.section}`}>
        {isDotted(capacitySection.background) && <SectionDots />}
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className={`font-title font-bold uppercase tracking-tight ${capacityHeading.className} ${capacityStyle.heading}`} style={capacityHeading.style}>
              {withHighlight(capacitySection.title ?? "", capacitySection.title_highlight)}
            </h2>
            <div className={`w-20 h-1.5 mt-4 mb-6 ${capacityStyle.accentLine}`} />
            <p className={`font-body text-lg ${capacityStyle.body}`}>
              {texts.capacity_intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {capacity.map((group) => {
              const groupStyle = cardStyle(group.background);
              return (
                <div key={group.name} className={`border p-10 clip-notch-br ${groupStyle.base} ${groupStyle.border}`}>
                  <h3 className={`font-title text-2xl font-bold uppercase tracking-wider mb-8 ${groupStyle.heading}`}>
                    {group.name}
                  </h3>
                  <ul className="space-y-4">
                    {group.equipment.map((item, i) => (
                      <li key={item} className="flex items-baseline gap-4 border-b border-support/20 pb-3">
                        <span className="font-title text-support text-xs tracking-widest shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className={`font-body ${groupStyle.body}`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </div>
  );
}

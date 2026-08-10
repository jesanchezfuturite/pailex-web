import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Cable, Droplets, Layers, Filter, Container, Forklift, Check,
  Wrench, Cog, Package, type LucideIcon,
} from "lucide-react";
import { getPage, FALLBACK_IMAGE, type SolucionesCollections } from "@/lib/api";
import { withHighlight } from "@/lib/highlight";
import { pageMetadata, SchemaScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage<SolucionesCollections>("soluciones");
  return pageMetadata(page.seo, "/soluciones", page.media.hero ?? null);
}

// Mapa de iconos administrables desde el CMS (campo "icon" de productos)
const productIcons: Record<string, LucideIcon> = {
  cable: Cable,
  droplets: Droplets,
  layers: Layers,
  filter: Filter,
  container: Container,
  forklift: Forklift,
  wrench: Wrench,
  cog: Cog,
  package: Package,
};

export default async function SolucionesPage() {
  const { texts, media, collections, seo } = await getPage<SolucionesCollections>("soluciones");
  const { services, products, capacity_groups: capacity } = collections;

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      {/* Sub-hero: gradación esmeralda cinematográfica de alto contraste
          con acentos lima fríos (dirección de arte del banner) */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={media.hero?.url ?? FALLBACK_IMAGE}
            alt={media.hero?.alt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover contrast-125 saturate-[0.85]"
          />
          {/* Gradación esmeralda profunda en multiply + sombra hacia negro */}
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/10 to-black/30" />
          {/* Acento lima frío: resplandor lateral sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-accent/10" />
        </div>

        {/* Línea lima en la base del banner */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/60 via-accent/10 to-transparent z-20" />
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

      {/* Servicios industriales: filas con fondos alternados blanco/gris */}
      <section id="servicios" className="pt-32 pb-8 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              {texts.services_title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
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
      <section id="productos" className="py-32 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t-4 border-support pt-12 mb-6">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              {texts.products_title}
            </h2>
          </div>
          <p className="text-industrial-gray font-body text-lg max-w-3xl mb-16">
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
      <section id="capacidad-instalada" className="py-32 bg-primary text-white relative overflow-hidden scroll-mt-24">
        <Image
          src={media.capacity_background?.url ?? FALLBACK_IMAGE}
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

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              {withHighlight(texts.capacity_title, texts.capacity_title_highlight)}
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
            <p className="text-white/80 font-body text-lg">
              {texts.capacity_intro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {capacity.map((group) => (
              <div key={group.name} className="border border-white/15 p-10 clip-notch-br bg-white/5">
                <h3 className="font-title text-2xl font-bold text-accent uppercase tracking-wider mb-8">
                  {group.name}
                </h3>
                <ul className="space-y-4">
                  {group.equipment.map((item, i) => (
                    <li key={item} className="flex items-baseline gap-4 border-b border-white/10 pb-3">
                      <span className="font-title text-support text-xs tracking-widest shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

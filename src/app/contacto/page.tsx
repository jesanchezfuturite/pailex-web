import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import ContactQuoteForm from "@/components/forms/ContactQuoteForm";
import { getPage, getSite, FALLBACK_IMAGE } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("contacto");
  return pageMetadata(page.seo, "/contacto", page.media.hero ?? null);
}

// Convierte "+52 828 289 7071" en "tel:+528282897071"
const telHref = (phone?: string) => `tel:${(phone ?? "").replace(/[^\d+]/g, "")}`;

export default async function ContactoPage() {
  const [{ texts, media, seo }, site] = await Promise.all([getPage("contacto"), getSite()]);
  const { settings } = site;

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

      {/* Proyecto en puerta + formulario */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Intro + datos de contacto */}
          <div>
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-none">
              {texts.intro_title}
            </h2>
            <div className="w-20 h-1.5 bg-support mt-6 mb-8" />
            <p className="text-industrial-gray font-body text-lg leading-relaxed mb-12">
              {texts.intro_body}
            </p>

            <div className="space-y-6">
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-5 group"
              >
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Mail size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  {settings.email}
                </span>
              </a>
              <a href={telHref(settings.phone_1)} className="flex items-center gap-5 group">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Phone size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  {settings.phone_1}
                </span>
              </a>
              <a href={telHref(settings.phone_2)} className="flex items-center gap-5 group">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Phone size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  {settings.phone_2}
                </span>
              </a>
              <div className="flex items-center gap-5">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm shrink-0">
                  <MapPin size={20} className="text-accent" />
                </span>
                <span className="font-body text-primary">
                  {settings.address_text}
                </span>
              </div>
            </div>
          </div>

          {/* Formulario extendido de cotización → POST /api/leads del CMS */}
          <ContactQuoteForm
            title={texts.form_title}
            submitLabel={texts.form_submit_label}
          />
        </div>
      </section>
    </div>
  );
}

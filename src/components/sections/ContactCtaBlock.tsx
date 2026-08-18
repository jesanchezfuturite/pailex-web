import { Mail, Phone, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import ContactQuoteForm from "@/components/forms/ContactQuoteForm";

// Convierte "+52 828 289 7071" en "tel:+528282897071"
const telHref = (phone?: string) => `tel:${(phone ?? "").replace(/[^\d+]/g, "")}`;

interface ContactCtaBlockProps {
  title: string;
  body?: string | null;
  formTitle: string;
  submitLabel: string;
  settings: Record<string, string>;
}

/**
 * Bloque de "¿Tienes un proyecto en puerta?": intro + datos de contacto a la
 * izquierda, formulario extendido de cotización a la derecha. Mismo bloque
 * usado en /contacto y, opcionalmente, en los interiores de Soluciones.
 */
export default function ContactCtaBlock({ title, body, formTitle, submitLabel, settings }: ContactCtaBlockProps) {
  return (
    <section className="py-32">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16">
        <div>
          <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-none">
            {title}
          </h2>
          <div className="w-20 h-1.5 bg-support mt-6 mb-8" />
          {body && (
            <p className="text-industrial-gray font-body text-lg leading-relaxed mb-12">
              {body}
            </p>
          )}

          <div className="space-y-6">
            <a href={`mailto:${settings.email}`} className="flex items-center gap-5 group">
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
                <WhatsAppIcon size={20} className="text-accent group-hover:text-primary transition-colors" />
              </span>
              <span className="font-body text-primary group-hover:text-support transition-colors">
                {settings.phone_2}
              </span>
            </a>
            <div className="flex items-center gap-5">
              <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm shrink-0">
                <MapPin size={20} className="text-accent" />
              </span>
              <span className="font-body text-primary">{settings.address_text}</span>
            </div>
          </div>
        </div>

        <ContactQuoteForm title={formTitle} submitLabel={submitLabel} />
      </div>
    </section>
  );
}

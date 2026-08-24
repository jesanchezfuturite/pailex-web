import { Mail, Phone, MapPin } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

// Convierte "+52 828 289 7071" en "tel:+528282897071"
const telHref = (phone?: string) => `tel:${(phone ?? "").replace(/[^\d+]/g, "")}`;

/**
 * Fila de contacto (correo, teléfonos, dirección) con íconos en verde
 * institucional, uno al lado del otro. Usada en los interiores de Soluciones
 * junto al formulario de cotización, sin campos propios en el CMS.
 */
export default function ContactInfoRow({ settings }: { settings: Record<string, string> }) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
      <a href={`mailto:${settings.email}`} className="flex items-center gap-4 group">
        <span className="w-10 h-10 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
          <Mail size={17} className="text-accent group-hover:text-primary transition-colors" />
        </span>
        <span className="font-body text-primary group-hover:text-support transition-colors">
          {settings.email}
        </span>
      </a>
      <a href={telHref(settings.phone_1)} className="flex items-center gap-4 group">
        <span className="w-10 h-10 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
          <Phone size={17} className="text-accent group-hover:text-primary transition-colors" />
        </span>
        <span className="font-body text-primary group-hover:text-support transition-colors">
          {settings.phone_1}
        </span>
      </a>
      <a href={telHref(settings.phone_2)} className="flex items-center gap-4 group">
        <span className="w-10 h-10 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
          <WhatsAppIcon size={17} className="text-accent group-hover:text-primary transition-colors" />
        </span>
        <span className="font-body text-primary group-hover:text-support transition-colors">
          {settings.phone_2}
        </span>
      </a>
      <div className="flex items-center gap-4">
        <span className="w-10 h-10 bg-primary flex items-center justify-center clip-notch-br-sm shrink-0">
          <MapPin size={17} className="text-accent" />
        </span>
        <span className="font-body text-primary">{settings.address_text}</span>
      </div>
    </div>
  );
}

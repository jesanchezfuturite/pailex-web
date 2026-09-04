"use client";

import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { trackWhatsappClick } from "@/lib/tracking";

/** Burbuja flotante de WhatsApp, visible en todas las páginas del sitio. */
export default function WhatsAppBubble({ phone }: { phone?: string }) {
  const digits = (phone ?? "").replace(/[^\d]/g, "");
  if (!digits) return null;

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      onClick={() => trackWhatsappClick({ section: "floating_bubble" })}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}

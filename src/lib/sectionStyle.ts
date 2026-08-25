export type SectionBackground = "white" | "gray" | "primary" | "primary-dots" | "primary-glass";

// Botón CTA con contraste automático: verde institucional sobre fondos claros,
// verde lima sobre fondos oscuros (verde institucional).
const CTA_BUTTON_LIGHT =
  "inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm";
const CTA_BUTTON_DARK =
  "inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm";

/** Clases según el color de fondo elegido en el gestor; el texto se ajusta solo. */
export function sectionStyle(bg: SectionBackground) {
  switch (bg) {
    case "gray":
      return {
        section: "bg-gray-50",
        heading: "text-primary",
        body: "text-industrial-gray",
        accentLine: "bg-support",
        ctaButton: CTA_BUTTON_LIGHT,
      };
    case "primary":
    case "primary-dots":
      return {
        section: "bg-primary",
        heading: "text-white",
        body: "text-white/80",
        accentLine: "bg-accent",
        ctaButton: CTA_BUTTON_DARK,
      };
    case "primary-glass":
      return {
        section: "bg-primary/90",
        heading: "text-white",
        body: "text-white/80",
        accentLine: "bg-accent",
        ctaButton: CTA_BUTTON_DARK,
      };
    default:
      return {
        section: "bg-white",
        heading: "text-primary",
        body: "text-industrial-gray",
        accentLine: "bg-support",
        ctaButton: CTA_BUTTON_LIGHT,
      };
  }
}

export const isDotted = (bg: SectionBackground) => bg === "primary-dots";

/**
 * Tamaño de un título de sección: si el gestor tiene un valor en px, se usa
 * como estilo fijo (reemplazando las clases responsivas); si no, se dejan
 * las clases de Tailwind por defecto (el mismo tamaño que ya usa el sitio).
 */
export function titleSize(size: number | null | undefined, defaultClasses: string) {
  return {
    className: size ? "" : defaultClasses,
    style: size ? { fontSize: `${size}px` } : undefined,
  };
}

export type CardBackground = "white" | "gray" | "primary" | "support" | "glass";

/** Fondo base de una tarjeta; el hover siempre oscurece un poco, sin cambiar de tono. */
export function cardStyle(bg: CardBackground) {
  switch (bg) {
    case "gray":
      return { base: "bg-gray-50", border: "border-support/20", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray group-hover:text-white", accentBar: "bg-support group-hover:bg-accent" };
    case "primary":
      return { base: "bg-primary", border: "border-support/20", hover: "hover:brightness-110", heading: "text-white", body: "text-white/70", accentBar: "bg-accent" };
    case "support":
      return { base: "bg-support", border: "border-support/20", hover: "hover:brightness-95", heading: "text-primary", body: "text-primary/80", accentBar: "bg-primary" };
    case "glass":
      return { base: "bg-white/5", border: "border-white/15", hover: "hover:bg-white/10", heading: "text-white", body: "text-white/70", accentBar: "bg-accent" };
    default:
      return { base: "bg-white", border: "border-support/20", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray group-hover:text-white", accentBar: "bg-support group-hover:bg-accent" };
  }
}

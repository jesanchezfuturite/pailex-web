export type SectionBackground = "white" | "gray" | "primary" | "primary-dots" | "primary-glass";

/** Clases según el color de fondo elegido en el gestor; el texto se ajusta solo. */
export function sectionStyle(bg: SectionBackground) {
  switch (bg) {
    case "gray":
      return {
        section: "bg-gray-50",
        heading: "text-primary",
        body: "text-industrial-gray",
        accentLine: "bg-support",
      };
    case "primary":
    case "primary-dots":
      return {
        section: "bg-primary",
        heading: "text-white",
        body: "text-white/80",
        accentLine: "bg-accent",
      };
    case "primary-glass":
      return {
        section: "bg-primary/90",
        heading: "text-white",
        body: "text-white/80",
        accentLine: "bg-accent",
      };
    default:
      return {
        section: "bg-white",
        heading: "text-primary",
        body: "text-industrial-gray",
        accentLine: "bg-support",
      };
  }
}

export const isDotted = (bg: SectionBackground) => bg === "primary-dots";

export type CardBackground = "white" | "gray" | "primary" | "support" | "glass";

/** Fondo base de una tarjeta; el hover siempre oscurece un poco, sin cambiar de tono. */
export function cardStyle(bg: CardBackground) {
  switch (bg) {
    case "gray":
      return { base: "bg-gray-50", border: "border-support/20", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray group-hover:text-white" };
    case "primary":
      return { base: "bg-primary", border: "border-support/20", hover: "hover:brightness-110", heading: "text-white", body: "text-white/70" };
    case "support":
      return { base: "bg-support", border: "border-support/20", hover: "hover:brightness-95", heading: "text-primary", body: "text-primary/80" };
    case "glass":
      return { base: "bg-white/5", border: "border-white/15", hover: "hover:bg-white/10", heading: "text-white", body: "text-white/70" };
    default:
      return { base: "bg-white", border: "border-support/20", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray group-hover:text-white" };
  }
}

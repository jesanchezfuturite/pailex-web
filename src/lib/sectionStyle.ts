export type SectionBackground = "white" | "gray" | "primary" | "primary-dots";

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

export type CardBackground = "white" | "gray" | "primary" | "support";

/** Fondo base de una tarjeta; el hover siempre oscurece un poco, sin cambiar de tono. */
export function cardStyle(bg: CardBackground) {
  switch (bg) {
    case "gray":
      return { base: "bg-gray-50", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray" };
    case "primary":
      return { base: "bg-primary", hover: "hover:brightness-110", heading: "text-white", body: "text-white/70" };
    case "support":
      return { base: "bg-support", hover: "hover:brightness-95", heading: "text-primary", body: "text-primary/80" };
    default:
      return { base: "bg-white", hover: "hover:bg-primary hover:text-white", heading: "text-primary", body: "text-industrial-gray" };
  }
}

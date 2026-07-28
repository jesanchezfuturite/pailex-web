/**
 * Imagotipo PAILEX (isotipo + wordmark).
 *
 * IMPORTANTE: el isotipo de abajo es una APROXIMACIÓN provisional construida
 * a ojo desde el brandbook (cortes geométricos a 45° sobre la inicial "P").
 * El manual prohíbe deformar o alterar la marca, así que en cuanto el equipo
 * creativo entregue el vector oficial (.svg / .ai), reemplazar los <path>
 * de <Isotipo /> por los trazos oficiales. Nada más del componente cambia.
 */

const COLORS = {
  dark: "#004431",
  olive: "#B0BF92",
  white: "#FFFFFF",
  gray: "#4F5054",
  black: "#000000",
};

type Variant = "onDark" | "onLight" | "mono";

export function Isotipo({
  className,
  variant = "onDark",
}: {
  className?: string;
  variant?: Variant;
}) {
  const fill =
    variant === "onDark" ? COLORS.olive : variant === "mono" ? "currentColor" : COLORS.dark;
  return (
    <svg
      viewBox="0 0 96 96"
      className={className}
      fill={fill}
      aria-hidden="true"
      focusable="false"
    >
      {/* Viga superior con corte diagonal (provisional) */}
      <path d="M26 8h30l32 32v18H62V46L38 22H26z" />
      {/* Descendente inferior derecho (provisional) */}
      <path d="M62 58h26L62 88H30V68h32z" />
      {/* Cuadro suelto inferior izquierdo (provisional) */}
      <rect x="8" y="62" width="18" height="18" />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "onDark",
  markClassName = "h-8 w-8",
  textClassName = "text-2xl",
}: {
  className?: string;
  variant?: Variant;
  markClassName?: string;
  textClassName?: string;
}) {
  const textColor =
    variant === "onDark" ? "text-white" : variant === "mono" ? "" : "text-primary";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Isotipo className={markClassName} variant={variant} />
      <span
        className={`font-title font-bold tracking-tight leading-none ${textColor} ${textClassName}`}
      >
        PAILEX
      </span>
    </span>
  );
}

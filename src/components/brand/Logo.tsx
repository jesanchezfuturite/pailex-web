import Image from "next/image";

/**
 * Imagotipo PAILEX oficial (entregado el 30/jul/2026).
 *
 * Se renderiza desde los archivos oficiales en /public/images:
 * - onDark  → logo-pailex-blanco.webp (isotipo oliva + wordmark blanco, 2000×347,
 *             desde "Pailex 1200x1200.png" recortado al contenido)
 * - onLight → logo-pailex.webp        (isotipo verde  + wordmark gris,   896×156)
 *
 * <Isotipo /> conserva el trazo vectorizado del mark (extraído por análisis de
 * píxeles del original) para usos donde se requiera SVG: favicon, mono, acentos.
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
      viewBox="0 0 206 154"
      className={className}
      fill={fill}
      aria-hidden="true"
      focusable="false"
    >
      {/* Viga superior con corte a 45° y triángulo colgante izquierdo */}
      <path d="M0 0h104l50 50h-102v52L0 50Z" />
      {/* Columna derecha con base extendida y corte diagonal inferior */}
      <path d="M155 51h51v103H103L52 103h103Z" />
      {/* Cuadro suelto inferior izquierdo */}
      <path d="M0 103h52v51H0Z" />
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "onDark",
  markClassName = "h-8 w-auto",
}: {
  className?: string;
  variant?: Variant;
  markClassName?: string;
  textClassName?: string; // conservado por compatibilidad; el wordmark va en el archivo
}) {
  const src =
    variant === "onDark" ? "/images/logo-pailex-blanco.webp" : "/images/logo-pailex.webp";
  const dims = variant === "onDark" ? { width: 2000, height: 347 } : { width: 896, height: 156 };
  return (
    <span className={`inline-flex items-center ${className}`}>
      <Image
        src={src}
        alt="Pailex"
        width={dims.width}
        height={dims.height}
        className={markClassName}
        priority
      />
    </span>
  );
}

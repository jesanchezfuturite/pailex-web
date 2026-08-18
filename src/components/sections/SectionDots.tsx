/** Textura de puntos lima sobre fondo verde institucional (fondo "Verde con puntos"). */
export default function SectionDots() {
  return (
    <div
      className="absolute inset-0 opacity-5 pointer-events-none"
      style={{ backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)", backgroundSize: "30px 30px" }}
    />
  );
}

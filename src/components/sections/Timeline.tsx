import Image from "next/image";
import { FALLBACK_IMAGE, type TimelineItem as TimelineItemData, type PageSectionData } from "@/lib/api";
import { sectionStyle, isDotted } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

/**
 * Línea del tiempo de "Nosotros". En escritorio corre de izquierda a
 * derecha: los hitos alternan imagen arriba/descripción abajo y viceversa,
 * con el año sobre un punto en la línea horizontal central. En tablet/celular
 * pasa a vertical: línea a la izquierda, año + imagen + descripción a la
 * derecha, sin alternar.
 */
export default function Timeline({
  title, items, background = "white",
}: { title: string; items: TimelineItemData[]; background?: PageSectionData["background"] }) {
  if (items.length === 0) {
    return null;
  }

  const style = sectionStyle(background);

  return (
    <section className={`py-32 overflow-hidden relative ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-2xl mb-20">
          <h2 className={`font-title text-4xl md:text-5xl font-bold uppercase tracking-tight ${style.heading}`}>
            {title}
          </h2>
          <div className="w-20 h-1.5 bg-support mt-4" />
        </div>

        {/* Escritorio: horizontal, alternando arriba/abajo */}
        <div className="hidden lg:flex items-stretch relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-support/30 -translate-y-1/2" />
          {items.map((item, i) => {
            const imageFirst = i % 2 === 0;
            return (
              <div key={`${item.year}-${i}`} className="flex-1 flex flex-col items-center px-4 min-w-0">
                <div className="w-full flex flex-col items-center justify-end min-h-[260px]">
                  {imageFirst ? (
                    <TimelineImage image={item.image} className="w-full max-w-[220px] h-40 mb-8" />
                  ) : (
                    <TimelineText year={item.year} description={item.description} className="mb-8" />
                  )}
                </div>

                <TimelineDot />

                <div className="w-full flex flex-col items-center justify-start min-h-[260px]">
                  {imageFirst ? (
                    <TimelineText year={item.year} description={item.description} className="mt-8" />
                  ) : (
                    <TimelineImage image={item.image} className="w-full max-w-[220px] h-40 mt-8" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tablet / celular: vertical, línea a la izquierda, contenido ocupa el ancho disponible */}
        <div className="lg:hidden relative pl-10 sm:pl-12">
          <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-support/30" />
          <div className="space-y-14">
            {items.map((item, i) => (
              <div key={`${item.year}-${i}`} className="relative">
                <div className="absolute -left-10 sm:-left-12 top-1.5">
                  <TimelineDot />
                </div>
                <div className="w-full sm:flex sm:items-center sm:gap-8">
                  <TimelineImage image={item.image} className="w-full h-48 sm:h-56 sm:w-1/2 mb-6 sm:mb-0" />
                  <TimelineText
                    year={item.year}
                    description={item.description}
                    align="left"
                    className="sm:w-1/2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineDot() {
  return (
    <div className="relative z-10 shrink-0 w-4 h-4 bg-primary border-2 border-accent rotate-45" />
  );
}

function TimelineImage({ image, className = "" }: { image: TimelineItemData["image"]; className?: string }) {
  return (
    <div className={`relative overflow-hidden clip-notch-br-sm shrink-0 ${className}`}>
      <Image
        src={image?.url ?? FALLBACK_IMAGE}
        alt={image?.alt ?? ""}
        fill
        sizes="(max-width: 1024px) 90vw, 20vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
    </div>
  );
}

function TimelineText({
  year,
  description,
  align = "center",
  className = "",
}: {
  year: string;
  description: string;
  align?: "center" | "left";
  className?: string;
}) {
  const alignClasses = align === "left" ? "items-start text-left" : "items-center text-center max-w-[240px]";
  return (
    <div className={`flex flex-col ${alignClasses} ${className}`}>
      <p className="font-title text-2xl font-bold text-primary tracking-tight mb-2">{year}</p>
      <p className="text-industrial-gray font-body text-sm leading-relaxed">{description}</p>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */
import type { BrandItem } from "@/lib/api";
import { sectionStyle, isDotted, type SectionBackground } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

interface BrandSliderProps {
  title: string;
  brands: BrandItem[];
  background?: SectionBackground;
  /** Cantidad de marcas destacadas a mostrar en la fila fija; 0 = no mostrar la fila. */
  featuredCount?: number;
  /** true = logos destacados a color; false (por defecto) = en gris, como el carrusel. */
  featuredColor?: boolean;
}

export default function BrandSlider({ title, brands, background = "white", featuredCount = 5, featuredColor = false }: BrandSliderProps) {
  const style = sectionStyle(background);
  const featured = brands.filter((brand) => brand.featured).slice(0, featuredCount);

  return (
    <section className={`py-20 overflow-hidden border-y border-support/10 relative ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className={`font-title text-2xl md:text-3xl font-bold uppercase tracking-wider ${style.heading}`}>{title}</h2>
      </div>

      {featured.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mb-12 relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {featured.map((brand, index) => (
              <div key={index} className="text-industrial-gray font-title text-2xl md:text-4xl font-bold uppercase cursor-default tracking-tighter">
                {brand.logo ? (
                  <img
                    src={brand.logo.url}
                    alt={brand.logo.alt ?? brand.name}
                    className={`h-14 md:h-20 w-auto ${featuredColor ? "" : "grayscale"}`}
                  />
                ) : (
                  brand.name
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="relative flex overflow-hidden group">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap py-4 items-center">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="shrink-0 mx-12 text-industrial-gray font-title text-2xl md:text-4xl font-bold opacity-30 hover:opacity-100 transition-opacity uppercase cursor-default tracking-tighter">
              {brand.logo ? (
                <img
                  src={brand.logo.url}
                  alt={brand.logo.alt ?? brand.name}
                  className="h-12 md:h-16 w-auto grayscale"
                />
              ) : (
                brand.name
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

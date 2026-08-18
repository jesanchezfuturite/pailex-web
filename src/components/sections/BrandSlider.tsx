/* eslint-disable @next/next/no-img-element */
import type { BrandItem } from "@/lib/api";
import { sectionStyle, isDotted, type SectionBackground } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

interface BrandSliderProps {
  title: string;
  brands: BrandItem[];
  background?: SectionBackground;
}

export default function BrandSlider({ title, brands, background = "white" }: BrandSliderProps) {
  const style = sectionStyle(background);
  return (
    <section className={`py-20 overflow-hidden border-y border-support/10 relative ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className={`font-title text-2xl md:text-3xl font-bold uppercase tracking-wider ${style.heading}`}>{title}</h2>
      </div>

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

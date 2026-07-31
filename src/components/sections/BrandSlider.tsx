/* eslint-disable @next/next/no-img-element */
import type { BrandItem } from "@/lib/api";

interface BrandSliderProps {
  title: string;
  brands: BrandItem[];
}

export default function BrandSlider({ title, brands }: BrandSliderProps) {
  return (
    <section className="py-20 bg-white overflow-hidden border-y border-support/10">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="font-title text-2xl md:text-3xl font-bold text-primary uppercase tracking-wider">{title}</h2>
      </div>

      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4 items-center">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="mx-12 text-industrial-gray font-title text-2xl md:text-4xl font-bold opacity-30 hover:opacity-100 transition-opacity uppercase cursor-default tracking-tighter">
              {brand.logo ? (
                <img
                  src={brand.logo.url}
                  alt={brand.name}
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

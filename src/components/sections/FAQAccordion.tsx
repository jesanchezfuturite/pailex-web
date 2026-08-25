import Link from "next/link";
import type { FaqItem } from "@/lib/api";
import { sectionStyle, isDotted, titleSize as titleSizeOf, type SectionBackground } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

interface FAQAccordionProps {
  title: string;
  titleSize?: number | null;
  /** Texto opcional debajo del título (HTML del editor del CMS). */
  content?: string | null;
  faqs: FaqItem[];
  background?: SectionBackground;
  cta?: { show: boolean; label: string; href: string } | null;
}

export default function FAQAccordion({ title, titleSize, content, faqs, background = "white", cta }: FAQAccordionProps) {
  const style = sectionStyle(background);
  const heading = titleSizeOf(titleSize, "text-3xl md:text-4xl");
  return (
    <section className={`py-24 relative overflow-hidden ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className={`font-title font-bold mb-4 text-center uppercase tracking-tight ${heading.className} ${style.heading}`} style={heading.style}>{title}</h2>
        {content && (
          <div
            className={`text-center mb-12 ${background === "primary" || background === "primary-dots" || background === "primary-glass" ? "prose-pailex prose-pailex-dark" : "prose-pailex"}`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-support/30 p-6 transition-all hover:border-primary bg-white">
              <summary className="list-none cursor-pointer flex justify-between items-center font-title text-lg font-bold text-primary uppercase tracking-wide">
                {faq.question}
                <span className="text-support group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <div
                className="mt-4 prose-pailex prose-pailex-sm border-t border-support/10 pt-4"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </details>
          ))}
        </div>
        {cta?.show && (
          <div className="text-center mt-12">
            <Link href={cta.href} className={style.ctaButton}>
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

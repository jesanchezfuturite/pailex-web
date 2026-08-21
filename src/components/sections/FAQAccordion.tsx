import type { FaqItem } from "@/lib/api";
import { sectionStyle, isDotted, titleSize as titleSizeOf, type SectionBackground } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

interface FAQAccordionProps {
  title: string;
  titleSize?: number | null;
  faqs: FaqItem[];
  background?: SectionBackground;
}

export default function FAQAccordion({ title, titleSize, faqs, background = "white" }: FAQAccordionProps) {
  const style = sectionStyle(background);
  const heading = titleSizeOf(titleSize, "text-3xl md:text-4xl");
  return (
    <section className={`py-24 relative overflow-hidden ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className={`font-title font-bold mb-12 text-center uppercase tracking-tight ${heading.className} ${style.heading}`} style={heading.style}>{title}</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-support/30 p-6 transition-all hover:border-primary bg-white">
              <summary className="list-none cursor-pointer flex justify-between items-center font-title text-lg font-bold text-primary uppercase tracking-wide">
                {faq.question}
                <span className="text-support group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-4 text-industrial-gray leading-relaxed font-body border-t border-support/10 pt-4">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

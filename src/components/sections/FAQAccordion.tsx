import type { FaqItem } from "@/lib/api";
import { sectionStyle, isDotted, type SectionBackground } from "@/lib/sectionStyle";
import SectionDots from "./SectionDots";

interface FAQAccordionProps {
  title: string;
  faqs: FaqItem[];
  background?: SectionBackground;
}

export default function FAQAccordion({ title, faqs, background = "white" }: FAQAccordionProps) {
  const style = sectionStyle(background);
  return (
    <section className={`py-24 relative overflow-hidden ${style.section}`}>
      {isDotted(background) && <SectionDots />}
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h2 className={`font-title text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-tight ${style.heading}`}>{title}</h2>
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

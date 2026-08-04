import type { FaqItem } from "@/lib/api";

interface FAQAccordionProps {
  title: string;
  faqs: FaqItem[];
}

export default function FAQAccordion({ title, faqs }: FAQAccordionProps) {
  return (
    <section className="py-24 bg-white/50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-title text-3xl md:text-4xl font-bold text-primary mb-12 text-center uppercase tracking-tight">{title}</h2>
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

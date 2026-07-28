export default function FAQAccordion() {
  const faqs = [
    {
      q: "¿Con qué formatos de planos o diseños trabajan?",
      a: "Trabajamos con una amplia gama de formatos industriales incluyendo SolidWorks, STEP, IGES, AutoCAD y archivos PDFs detallados para garantizar una integración perfecta con su flujo de trabajo."
    },
    {
      q: "¿Cuál es su tiempo promedio de entrega para una cotización?",
      a: "Nuestro compromiso es la rapidez industrial; entregamos cotizaciones técnicas detalladas en un lapso de 24 a 48 horas hábiles."
    },
    {
      q: "¿Realizan envíos o entregas directas a planta?",
      a: "Sí, contamos con logística especializada para realizar entregas directas en planta o CEDIS en todo México, asegurando la integridad de sus piezas."
    }
  ];

  return (
    <section className="py-24 bg-white/50">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-title text-3xl md:text-4xl font-bold text-primary mb-12 text-center uppercase tracking-tight">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-support/30 p-6 transition-all hover:border-primary bg-white">
              <summary className="list-none cursor-pointer flex justify-between items-center font-title text-lg font-bold text-primary uppercase tracking-wide">
                {faq.q}
                <span className="text-support group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="mt-4 text-industrial-gray leading-relaxed font-body border-t border-support/10 pt-4">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

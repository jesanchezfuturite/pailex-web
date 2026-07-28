const brands = [
  "Kohler", "CICSA", "Suminregio", "LM Transport", "Grupo Kazerooni", 
  "GC Transportes", "Delquin", "Grúas Flores", "Coconal", "JOYA", 
  "Crazy Horse Trucking", "Toto", "Interceramic", "Vivolmex", "Metalsa", "Pemex"
];

export default function BrandSlider() {
  return (
    <section className="py-20 bg-white overflow-hidden border-y border-support/10">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="font-title text-2xl md:text-3xl font-bold text-primary uppercase tracking-wider">Marcas que han confiado en nosotros</h2>
      </div>
      
      <div className="relative flex overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="mx-12 text-industrial-gray font-title text-2xl md:text-4xl font-bold opacity-30 hover:opacity-100 transition-opacity uppercase cursor-default tracking-tighter">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

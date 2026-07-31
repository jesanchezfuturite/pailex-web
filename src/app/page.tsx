import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/sections/Hero";
import BrandSlider from "@/components/sections/BrandSlider";
import FAQAccordion from "@/components/sections/FAQAccordion";

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      
      {/* Sección Soluciones - Refinada */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div className="max-w-2xl">
              <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">Nuestras Soluciones</h2>
              <div className="w-20 h-1.5 bg-support mt-4" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <SolutionCard
              title="Servicios industriales"
              desc="Maquila especializada en pailería y maquinados CNC bajo estrictas tolerancias técnicas."
              image="/images/placeholder-pailex.webp"
              href="/soluciones#servicios"
            />
            <SolutionCard
              title="Suministros"
              desc="Venta y habilitado de acero, placas y piezas cortadas a la medida bajo tus especificaciones exactas."
              image="/images/placeholder-pailex.webp"
              href="/soluciones#productos"
            />
            <SolutionCard
              title="Infraestructura"
              desc="Tecnología de corte automatizado para garantizar rapidez y repetibilidad en cada pieza."
              image="/images/placeholder-pailex.webp"
              href="/soluciones#capacidad-instalada"
            />
          </div>
        </div>
      </section>

      {/* ¿Por qué elegir a Pailex? - Refinado con líneas de acento */}
      <section className="py-28 bg-primary text-white overflow-hidden relative">
        {/* Textura fotográfica sutil bajo el verde institucional */}
        <Image
          src="/images/placeholder-pailex.webp"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-multiply pointer-events-none"
        />
        <div className="absolute inset-0 opacity-5 pointer-events-none"
             style={{backgroundImage: 'radial-gradient(#E8FFC0 1px, transparent 1px)', backgroundSize: '30px 30px'}} />
             
        <div className="max-w-7xl mx-auto px-6 text-center mb-20 relative z-10">
          <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">¿Por qué elegir a <span className="text-accent">Pailex</span>?</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 relative z-10">
          <FeatureItem 
            title="Precisión Milimétrica" 
            desc="Garantizamos tolerancias estrictas en cada proceso de fabricación."
            isFirst
          />
          <FeatureItem 
            title="Capacidad Integral" 
            desc="Resolvemos desde el suministro hasta el producto terminado y logística."
          />
          <FeatureItem 
            title="Respuesta Industrial" 
            desc="Procesos optimizados para tiempos de entrega récord en la industria."
          />
          <FeatureItem 
            title="Garantía de Calidad" 
            desc="Trabajamos bajo los más rigurosos controles técnicos internacionales."
          />
        </div>
      </section>

      {/* Banner CTA Central — verde institucional; lima solo como acento (brandbook: uso moderado) */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Fondo fotográfico en duotono verde */}
        <Image
          src="/images/placeholder-pailex.webp"
          alt=""
          fill
          className="object-cover opacity-30 pointer-events-none"
        />
        <div className="absolute inset-0 bg-primary/80 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
             style={{backgroundImage: 'radial-gradient(#E8FFC0 2px, transparent 2px)', backgroundSize: '24px 24px'}} />
        {/* Motivo geométrico de marca: triángulos a 45° tipo molinete */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-support/10 [clip-path:polygon(0_100%,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-white font-title text-3xl md:text-5xl font-bold mb-12 max-w-5xl mx-auto leading-tight uppercase tracking-tighter">
            Optimiza tu cadena de suministro y asegura la <span className="text-accent">continuidad de tu operación</span> con nosotros.
          </h2>
          <button className="bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm">
            Iniciar Cotización
          </button>
        </div>
      </section>

      <BrandSlider />

      {/* Sectors Grid - Rediseño Tarjetas Técnicas */}
      <section className="py-32 bg-white border-b border-support/10">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight">Sectores que respaldamos</h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            { name: "Cerámica y sanitarios", image: "/images/placeholder-pailex.webp" },
            { name: "Metalmecánica", image: "/images/placeholder-pailex.webp" },
            { name: "Energía e industrial", image: "/images/placeholder-pailex.webp" },
            { name: "Transporte y logística", image: "/images/placeholder-pailex.webp" },
            { name: "Plástico e industria", image: "/images/placeholder-pailex.webp" },
          ].map((sector) => (
            <div key={sector.name} className="relative h-72 group overflow-hidden clip-notch-br-sm cursor-default">
              <Image
                src={sector.image}
                alt={sector.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent transition-colors duration-500 group-hover:from-primary" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="w-6 h-[2px] bg-accent mb-3 transition-all duration-500 group-hover:w-10" />
                <p className="font-title font-bold text-sm uppercase text-white tracking-widest leading-snug">{sector.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Blog - Refinado */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t-4 border-support pt-12 mb-16">
            <h2 className="font-title text-4xl font-bold text-primary uppercase tracking-tight">Explora nuestro Blog</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[1, 2, 3].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-white border border-support/10 h-80 mb-6 relative overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
                  <span className="text-support/40 font-title uppercase tracking-[0.2em] text-[10px]">Preview Industrial {i}</span>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-support/30" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-support/30" />
                </div>
                <h4 className="font-title text-xl font-bold text-primary group-hover:text-support transition-colors uppercase">Título del Artículo de Ingeniería {i}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <FAQAccordion />
    </div>
  );
}

function SolutionCard({ title, desc, image, href }: { title: string, desc: string, image: string, href: string }) {
  return (
    <div className="border border-support/20 hover:bg-primary group transition-all duration-500 shadow-sm relative overflow-hidden clip-notch-br">
      <div className="absolute top-0 left-0 w-full h-1 bg-support group-hover:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10" />
      <div className="relative h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/15 group-hover:bg-primary/40 transition-colors duration-500" />
      </div>
      <div className="p-10">
        <h3 className="font-title text-3xl font-bold text-primary group-hover:text-accent mb-6 transition-colors uppercase tracking-tight leading-none">{title}</h3>
        <p className="text-industrial-gray group-hover:text-white/70 mb-10 font-body transition-colors leading-relaxed text-lg">{desc}</p>
        <Link href={href} className="relative overflow-hidden group/btn text-primary font-bold uppercase text-xs tracking-[0.2em] inline-flex items-center">
          <span className="relative z-10 group-hover:text-accent transition-colors duration-300">Ver más</span>
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-support group-hover:bg-accent transform origin-left transition-all duration-300" />
        </Link>
      </div>
    </div>
  );
}

function FeatureItem({ title, desc, isFirst }: { title: string, desc: string, isFirst?: boolean }) {
  return (
    <div className={`p-10 border-support/25 ${isFirst ? 'md:border-l-0' : 'md:border-l'} space-y-6 group hover:bg-white/5 transition-colors`}>
      <div className="w-8 h-[3px] bg-accent" />
      <h4 className="font-title font-bold text-2xl uppercase tracking-wider text-white leading-tight">{title}</h4>
      <p className="text-support text-base font-body leading-relaxed">{desc}</p>
    </div>
  );
}

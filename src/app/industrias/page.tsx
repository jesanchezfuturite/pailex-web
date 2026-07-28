import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Industrias | Pailex — Sectores cerámico, metalmecánico, energético y más",
  description:
    "Proveedor metalmecánico para los sectores cerámico, metalmecánico, energético, plástico y de transporte: esmeriladoras, estructuras, maquinados y mantenimiento de equipo pesado.",
};

/* ⚠️ Autorización de uso de marcas pendiente (lineamientos §6.2): Toto, Interceramic,
   Vivolmex, Metalsa y Pemex están marcadas con asterisco en el mockup — confirmar con
   Futurité/cliente antes de publicar a producción. */
const industries = [
  {
    name: "Cerámica y sanitarios",
    desc: "Experiencia demostrada, esmeriladoras, carros transportadores.",
    clients: ["Kohler", "Toto", "Interceramic", "Vivolmex", "Animex"],
    image: "/images/porcelana.webp",
  },
  {
    name: "Metalmecánica",
    desc: "Estructuras y maquinado para planta industrial.",
    clients: ["Metalsa", "CICSA", "Suminregio"],
    image: "/images/metalmecanica.webp",
  },
  {
    name: "Energía e industrial",
    desc: "Acero inoxidable, bronce, alta exigencia técnica.",
    clients: ["Pemex", "Ternium"],
    image: "/images/energia.webp",
  },
  {
    name: "Plástico e industria general",
    desc: "Fabricación de piezas y estructuras para planta plástica.",
    clients: ["Delquin"],
    image: "/images/industria-plastico.webp",
  },
  {
    name: "Transporte y logística",
    desc: "Reparación y mantenimiento de equipo pesado.",
    clients: ["LM Transport", "GC Transportes", "Grúas Flores", "Crazy Horse Trucking"],
    image: "/images/trasporte-logistica.webp",
  },
];

export default function IndustriasPage() {
  return (
    <div className="bg-white">
      {/* Sub-hero de página interna: fotografía en duotono verde */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/industria-en-general.webp"
            alt="Planta industrial atendida por Pailex"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />
        </div>

        <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-40">
          <p className="anim-fade-up anim-delay-1 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            Sectores que respaldamos
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Industrias
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
            Soluciones metalmecánicas a la medida de cada sector, desde Monterrey
            hasta donde tu planta lo necesite.
          </p>
        </div>
      </section>

      {/* Encabezado de sección */}
      <section className="pt-32 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              Sectores que atendemos
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
          </div>
        </div>
      </section>

      {/* Filas de industrias: imagen a un lado, texto al otro, fondos alternados */}
      {industries.map((industry, index) => (
        <section
          key={industry.name}
          className={`py-20 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative h-[360px] overflow-hidden clip-notch-br group">
                <Image
                  src={industry.image}
                  alt={`Sector ${industry.name.toLowerCase()}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50" />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <div className="w-8 h-[3px] bg-accent mb-5" />
              <h3 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight leading-none mb-4">
                {industry.name}
              </h3>
              <p className="text-industrial-gray font-body text-lg leading-relaxed mb-6">
                {industry.desc}
              </p>
              <p className="font-title text-support text-xs md:text-sm uppercase tracking-[0.2em]">
                {industry.clients.join(" · ")}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* CTA hacia cotización */}
      <section className="py-28 bg-primary text-white relative overflow-hidden">
        <Image
          src="/images/contacto.webp"
          alt=""
          fill
          className="object-cover opacity-20 pointer-events-none"
        />
        <div className="absolute inset-0 bg-primary/80 pointer-events-none" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-title text-3xl md:text-4xl font-bold uppercase tracking-tight mb-10 max-w-3xl mx-auto leading-tight">
            ¿Tu sector no está en la lista? <span className="text-accent">Cuéntanos tu proyecto.</span>
          </h2>
          <Link
            href="#cotizar"
            className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </div>
  );
}

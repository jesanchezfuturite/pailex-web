import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import ProjectImage from "@/components/sections/ProjectImage";

export const metadata: Metadata = {
  title: "Portafolio | Pailex — Proyectos industriales llave en mano",
  description:
    "Casos reales de fabricación e instalación industrial: esmeriladoras, sistemas automatizados, bandas transportadoras y proyectos llave en mano para la industria cerámica.",
};

const projects = [
  {
    title: "Fabricación e instalación de banco de vaciado de taza",
    desc: "Fabricación e instalación de banco de vaciado de taza.",
    client: "KOHLER / Industria de cerámica",
    sector: "Industrial",
    scope: "Diseño, fabricación, pintura e instalación",
    result: "Proyecto entregado en tiempo y en operación al 100%",
    image: "/images/proyecto-banco-vaciado-taza.webp",
    imageWidth: 1309,
    imageHeight: 1202,
  },
  {
    title: "Proyecto de humectadora de moldes de yeso",
    desc: "Diseño, fabricación e instalación de sistema automatizado.",
    client: "KOHLER / Industria de cerámica",
    sector: "Industrial",
    scope: "Diseño, fabricación, instalación y automatización en planta",
    result: "Proyecto entregado en tiempo y en operación al 100%",
    image: "/images/proyecto-humectadora-moldes-yeso.webp",
    imageWidth: 1341,
    imageHeight: 1173,
  },
  {
    title: "Esmeriladora de taza de pared",
    desc: "Suministro, fabricación, instalación y puesta en marcha.",
    client: "KOHLER / Industria de cerámica",
    sector: "Industrial",
    scope: "Diseño, fabricación, instalación y automatización en planta",
    result: "Proyecto entregado en tiempo y en operación al 100%",
    image: "/images/proyecto-esmeriladora-taza-pared.webp",
    imageWidth: 1364,
    imageHeight: 1153,
  },
  {
    title: "Loop automático para recabado de taza",
    desc: "Fabricación, instalación y puesta en marcha de loop.",
    client: "KOHLER / Industria de cerámica",
    sector: "Industrial",
    scope: "Modificación, fabricación, instalación y automatización en planta",
    result: "Proyecto entregado en tiempo y en operación al 100%",
    image: "/images/proyecto-loop-recabado-taza.webp",
    imageWidth: 1322,
    imageHeight: 1190,
  },
  {
    title: "Banda transportadora para scrap",
    desc: "Fabricación, instalación y automatización en planta.",
    client: "KOHLER / Industria de cerámica",
    sector: "Industrial",
    scope: "Fabricación, instalación y automatización en planta",
    result: "Proyecto entregado en tiempo y en operación al 100%",
    image: "/images/proyecto-banda-transportadora-scrap.webp",
    imageWidth: 1295,
    imageHeight: 1215,
  },
];

const continuousDevelopment = [
  "Propela de 1.60 m para agitadores de esmaltes",
  "Esmeriladora de taza",
  "Cabina para recabado de taza",
  "Carros para transporte de tanque sanitario",
  "Banco para vaciado de urinal",
  "Mesas de trabajo",
  "Tableros para herramientas de limpieza",
  "Tolva de aluminio",
  "Mesa para pruebas de fugas de tazas",
  "Turbina para extractor de aire",
  "Fabricación de estructura metálica",
];

export default function PortafolioPage() {
  return (
    <div className="bg-white">
      {/* Sub-hero de página interna: fotografía en duotono verde */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/porcelana.webp"
            alt="Proyectos de Pailex para la industria cerámica"
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
            Proyectos entregados y en operación
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Portafolio
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
            Evidencia técnica de lo que fabricamos, instalamos y dejamos operando en planta.
          </p>
        </div>
      </section>

      {/* Proyectos destacados: filas con fondos alternados blanco/gris */}
      <section className="pt-32 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              Proyectos destacados
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
          </div>
        </div>
      </section>

      {projects.map((project, index) => (
        <section
          key={project.title}
          className={`py-14 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <article className="border border-support/20 clip-notch-br group hover:border-primary/40 transition-colors bg-white">
              <div className="grid lg:grid-cols-[1fr_1.4fr]">
                {/* Fotografía del proyecto: clic para verla a pantalla completa */}
                <ProjectImage
                  src={project.image}
                  title={project.title}
                  width={project.imageWidth}
                  height={project.imageHeight}
                />

                {/* Ficha técnica */}
                <div className="p-10 grid sm:grid-cols-2 gap-x-10 gap-y-8 content-center">
                  <ProjectField label="Cliente" value={project.client} />
                  <ProjectField label="Sector" value={project.sector} />
                  <ProjectField label="Alcance" value={project.scope} />
                  <div>
                    <p className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
                      Resultado
                    </p>
                    <p className="font-body text-primary font-medium flex items-start gap-2">
                      <CheckCircle2 size={18} className="text-support mt-1 shrink-0" />
                      {project.result}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      ))}

      {/* Desarrollo continuo */}
      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <Image
          src="/images/industria-en-general.webp"
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-multiply pointer-events-none"
        />
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-16">
            <h2 className="font-title text-4xl md:text-5xl font-bold uppercase tracking-tight text-white">
              Desarrollo <span className="text-accent">continuo</span>
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
            <p className="text-white/80 font-body text-lg">
              Fabricaciones recurrentes para cliente industrial: piezas, equipos y
              estructuras que mantienen su operación en marcha.
            </p>
          </div>

          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4">
            {continuousDevelopment.map((item) => (
              <li
                key={item}
                className="flex items-baseline gap-4 border-b border-white/10 pb-3"
              >
                <span className="w-3 h-[2px] bg-accent shrink-0 translate-y-[-3px]" />
                <span className="font-body text-white/90">{item}</span>
              </li>
            ))}
          </ul>

          <div className="text-center mt-16">
            <Link
              href="#cotizar"
              className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              Cotiza tu proyecto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProjectField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">{label}</p>
      <p className="font-body text-primary">{value}</p>
    </div>
  );
}

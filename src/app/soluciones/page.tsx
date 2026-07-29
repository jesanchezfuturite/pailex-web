import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Cable, Droplets, Layers, Filter, Container, Forklift, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Soluciones | Pailex — Pailería industrial, maquinados CNC y automatización",
  description:
    "Soluciones integrales en pailería industrial y maquinados CNC: estructuras metálicas, corte plasma y láser, rolado, mantenimiento industrial, automatización y proyectos llave en mano.",
};

/* Banner del sub-hero. PROVISIONAL: usar la imagen generada con este prompt cuando
   esté lista y colocarla en /public/images/banners/soluciones.webp:
   "Macro close-up shot of a heavy-duty CNC machining center or laser cutting raw
   steel sheet, dramatic orange sparks flying against a dark green mood background,
   rich dark emerald and deep forest green color grading, industrial precision
   engineering, high-contrast lighting with cold lime accents, crisp details, high
   motion freeze, shot on 85mm macro lens, ultra-realistic, cinematic industrial
   aesthetic, --ar 21:9 --style raw" */
const bannerImage = "/images/corte-plasma.webp";

const services = [
  {
    id: "paileria",
    title: "Pailería Industrial",
    desc: "Fabricación de estructuras metálicas y de acero bajo plano, con procesos completos de corte, formado y acabado.",
    image: "/images/paileria.webp",
    imageAlt: "Fabricación de estructuras metálicas en pailería industrial",
    items: [
      "Estructuras ligeras y pesadas",
      "Tanques y tuberías",
      "Corte plasma / láser",
      "Rolado",
      "Doblado",
      "Sandblast",
      "Pintura",
    ],
  },
  {
    id: "maquinados",
    title: "Maquinados de Precisión",
    desc: "Mecanizado de precisión en torno convencional y CNC para piezas especiales y refacciones industriales.",
    image: "/images/metalmecanica.webp",
    imageAlt: "Maquinados CNC de precisión en torno y fresadora",
    items: [
      "Torno convencional y CNC",
      "Fresado",
      "Taladro radial",
      "Sierra cinta",
      "Roscadora",
      "Refacciones bajo plano o muestra",
    ],
  },
  {
    id: "automatizacion",
    title: "Automatización",
    desc: "Ingeniería y fabricación de maquinaria especial para procesos productivos de alta exigencia.",
    image: "/images/porcelana.webp",
    imageAlt: "Maquinaria especial y automatización para la industria cerámica",
    items: [
      "Fabricación de maquinaria especial",
      "Esmeriladoras para industria cerámica",
      "Proyectos de alto valor y bajo volumen",
    ],
  },
  {
    id: "mantenimiento",
    title: "Mantenimiento Industrial",
    desc: "Soporte técnico para que tu producción nunca se detenga: intervención en planta y fabricación de refacciones.",
    image: "/images/industria-en-general.webp",
    imageAlt: "Mantenimiento industrial preventivo y correctivo en planta",
    items: [
      "Apoyo preventivo y correctivo",
      "Reparación de maquinaria",
      "Fabricación de refacciones",
      "Obra eléctrica",
    ],
  },
  {
    id: "llave-en-mano",
    title: "Proyectos Llave en Mano",
    desc: "Integración total: no solo entregamos la pieza — vamos a tu planta y la dejamos operando.",
    image: "/images/energia.webp",
    imageAlt: "Proyectos industriales llave en mano: diseño, fabricación e instalación",
    items: ["Diseño", "Fabricación", "Instalación"],
  },
];

const products = [
  { name: "Mangueras y conexiones", icon: Cable },
  { name: "Pipas de agua", icon: Droplets },
  { name: "Tarimas", icon: Layers },
  { name: "Filtración hidráulica / neumática", icon: Filter },
  { name: "Tolvas", icon: Container },
  { name: "Dollies", icon: Forklift },
];

const capacity = [
  {
    group: "Pailería y corte",
    equipment: [
      "Sierra cinta",
      "Pantógrafo plasma",
      "Corte láser",
      "Soldadora láser",
      "Roladora de perfiles y tubos",
      "Dobladora de lámina y placa",
      "Guillotina",
      "Máquina de soldar micro alambre",
      "Soldadora de aluminio",
      "Metalero",
    ],
  },
  {
    group: "Maquinado",
    equipment: ["Torno", "Fresa", "Torno CNC", "Taladro radial", "Roscadora"],
  },
];

export default function SolucionesPage() {
  return (
    <div className="bg-white">
      {/* Sub-hero: gradación esmeralda cinematográfica de alto contraste
          con acentos lima fríos (dirección de arte del banner) */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="Corte plasma CNC en planta de Pailex"
            fill
            priority
            sizes="100vw"
            className="object-cover contrast-125 saturate-[0.85]"
          />
          {/* Gradación esmeralda profunda en multiply + sombra hacia negro */}
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-primary/10 to-black/30" />
          {/* Acento lima frío: resplandor lateral sutil */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-accent/10" />
        </div>

        {/* Línea lima en la base del banner */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/60 via-accent/10 to-transparent z-20" />
        <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-40">
          <p className="anim-fade-up anim-delay-1 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            Diseño + Fabricación + Instalación
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Soluciones
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
            Soluciones integrales en pailería y maquinados.
          </p>
        </div>
      </section>

      {/* Servicios industriales: filas con fondos alternados blanco/gris */}
      <section id="servicios" className="pt-32 pb-8 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              Servicios industriales
            </h2>
            <div className="w-20 h-1.5 bg-support mt-4" />
          </div>
        </div>
      </section>

      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 scroll-mt-24 ${index % 2 === 1 ? "bg-gray-50" : "bg-white"}`}
        >
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={index % 2 === 1 ? "lg:order-2" : ""}>
              <div className="relative h-[380px] overflow-hidden clip-notch-br">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/25 mix-blend-multiply" />
              </div>
            </div>
            <div className={index % 2 === 1 ? "lg:order-1" : ""}>
              <h3 className="font-title text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight mb-4 leading-none">
                {service.title}
              </h3>
              <p className="text-industrial-gray font-body text-lg leading-relaxed mb-8">
                {service.desc}
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-primary font-body">
                    <Check size={18} className="text-support mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Link
            href="#cotizar"
            className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
          >
            Contáctanos
          </Link>
        </div>
      </section>

      {/* Productos / Suministros */}
      <section id="productos" className="py-32 bg-gray-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border-t-4 border-support pt-12 mb-6">
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
              Productos
            </h2>
          </div>
          <p className="text-industrial-gray font-body text-lg max-w-3xl mb-16">
            Comercialización de productos industriales para tu operación. Distribuidores
            de <span className="text-primary font-medium">Parker</span> y{" "}
            <span className="text-primary font-medium">Alfagomma</span> en mangueras y conexiones.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.name}
                className="bg-white border border-support/20 p-8 group hover:bg-primary transition-all duration-500 clip-notch-br-sm"
              >
                <product.icon
                  size={32}
                  className="text-support group-hover:text-accent transition-colors mb-5"
                  strokeWidth={1.5}
                />
                <p className="font-title font-bold text-primary group-hover:text-white uppercase tracking-wide leading-snug transition-colors">
                  {product.name}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="#cotizar"
              className="inline-block bg-primary text-white px-10 py-5 font-title font-bold text-lg hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              ¡Cotiza ahora!
            </Link>
          </div>
        </div>
      </section>

      {/* Capacidad instalada */}
      <section id="capacidad-instalada" className="py-32 bg-primary text-white relative overflow-hidden scroll-mt-24">
        <Image
          src="/images/almacen-placas-acero.webp"
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
              Capacidad <span className="text-accent">instalada</span>
            </h2>
            <div className="w-20 h-1.5 bg-accent mt-4 mb-6" />
            <p className="text-white/80 font-body text-lg">
              Infraestructura propia de corte, formado, soldadura y maquinado para
              responder con rapidez y repetibilidad en cada pieza.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {capacity.map((group) => (
              <div key={group.group} className="border border-white/15 p-10 clip-notch-br bg-white/5">
                <h3 className="font-title text-2xl font-bold text-accent uppercase tracking-wider mb-8">
                  {group.group}
                </h3>
                <ul className="space-y-4">
                  {group.equipment.map((item, i) => (
                    <li key={item} className="flex items-baseline gap-4 border-b border-white/10 pb-3">
                      <span className="font-title text-support text-xs tracking-widest shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-white/90">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="#cotizar"
              className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

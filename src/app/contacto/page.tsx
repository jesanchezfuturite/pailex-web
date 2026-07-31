import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone, MapPin, Paperclip } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacto | Pailex — Cotiza tu proyecto industrial",
  description:
    "Sube tus planos o archivos técnicos y recibe una propuesta económica precisa. Fabricación bajo plano, pailería industrial y maquinados CNC desde Monterrey.",
};

export default function ContactoPage() {
  return (
    <div className="bg-white">
      {/* Sub-hero de página interna: fotografía en duotono verde */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/placeholder-pailex.webp"
            alt="Contacta al equipo de ingeniería de Pailex"
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
            Tu producción nunca se detiene
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Contacto
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6" />
        </div>
      </section>

      {/* Proyecto en puerta + formulario */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1.2fr] gap-16">
          {/* Intro + datos de contacto */}
          <div>
            <h2 className="font-title text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-none">
              ¿Tienes un proyecto en puerta?
            </h2>
            <div className="w-20 h-1.5 bg-support mt-6 mb-8" />
            <p className="text-industrial-gray font-body text-lg leading-relaxed mb-12">
              Sube tus planos o archivos técnicos. Nuestro equipo de ingeniería evaluará
              la viabilidad y te enviará una propuesta económica precisa.
            </p>

            <div className="space-y-6">
              <a
                href="mailto:admon.pmpi2@gmail.com"
                className="flex items-center gap-5 group"
              >
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Mail size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  admon.pmpi2@gmail.com
                </span>
              </a>
              <a href="tel:+528282897071" className="flex items-center gap-5 group">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Phone size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  +52 828 289 7071
                </span>
              </a>
              <a href="tel:+5218180243684" className="flex items-center gap-5 group">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm group-hover:bg-accent transition-colors shrink-0">
                  <Phone size={20} className="text-accent group-hover:text-primary transition-colors" />
                </span>
                <span className="font-body text-primary group-hover:text-support transition-colors">
                  +52 1 81 8024 3684
                </span>
              </a>
              <div className="flex items-center gap-5">
                <span className="w-12 h-12 bg-primary flex items-center justify-center clip-notch-br-sm shrink-0">
                  <MapPin size={20} className="text-accent" />
                </span>
                <span className="font-body text-primary">
                  Monterrey, N.L. — desde Monterrey hasta donde tu planta lo necesite
                </span>
              </div>
            </div>
          </div>

          {/* Formulario extendido de cotización.
              ⚠️ Sin backend todavía: definir destino con Futurité (patrón de la
              agencia: webhook n8n + correo transaccional Brevo) — lineamientos §6.3. */}
          <div className="bg-gray-50 border border-support/20 p-10 md:p-12 clip-notch-br">
            <h2 className="font-title text-3xl font-bold text-primary uppercase tracking-tight mb-8">
              Contáctanos
            </h2>
            <form className="grid sm:grid-cols-2 gap-6">
              <ContactField label="Nombre completo" name="nombre" type="text" />
              <ContactField label="Industria / Empresa" name="empresa" type="text" />
              <ContactField label="Teléfono / Celular" name="telefono" type="tel" />
              <ContactField label="Correo electrónico" name="correo" type="email" />

              <div className="sm:col-span-2">
                <label
                  htmlFor="planos"
                  className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
                >
                  Planos / Archivos
                </label>
                <label
                  htmlFor="planos"
                  className="flex items-center gap-3 bg-white border border-support/30 border-dashed p-4 cursor-pointer hover:border-primary transition-colors"
                >
                  <Paperclip size={18} className="text-support shrink-0" />
                  <span className="font-body text-sm text-industrial-gray">
                    Adjunta tus planos o archivos técnicos (PDF, DWG, DXF, STEP, imágenes)
                  </span>
                </label>
                <input
                  id="planos"
                  name="planos"
                  type="file"
                  multiple
                  accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.jpg,.jpeg,.png"
                  className="sr-only"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="mensaje"
                  className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="w-full bg-white border border-support/30 p-3 text-sm font-body focus:border-primary outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="sm:col-span-2 bg-primary text-white font-title font-bold py-4 hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactField({ label, name, type }: { label: string; name: string; type: string }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full bg-white border border-support/30 p-3 text-sm font-body focus:border-primary outline-none transition-all"
      />
    </div>
  );
}

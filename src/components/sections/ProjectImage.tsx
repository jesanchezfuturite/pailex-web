"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Expand } from "lucide-react";

/* Imagen de proyecto con lightbox: al hacer clic se abre a pantalla completa
   sobre la misma página. Cierra con clic, botón X o tecla Escape.
   El overlay se monta en <body> vía portal: el clip-path de la tarjeta
   recortaría cualquier hijo fixed, aunque cubra el viewport. */
export default function ProjectImage({
  src,
  title,
  width,
  height,
}: {
  src: string;
  title: string;
  width: number;
  height: number;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Ver imagen de ${title} en pantalla completa`}
        className="relative w-full overflow-hidden cursor-zoom-in text-left block self-start"
      >
        <Image
          src={src}
          alt={title}
          width={width}
          height={height}
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent transition-colors duration-500 group-hover:via-primary/60" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent/50" />
        <Expand
          size={20}
          className="absolute top-5 right-5 text-white/70 group-hover:text-accent transition-colors"
          strokeWidth={1.5}
        />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="w-8 h-[3px] bg-accent mb-4" />
          <h3 className="font-title text-2xl md:text-3xl font-bold text-white uppercase tracking-tight leading-tight">
            {title}
          </h3>
        </div>
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] bg-black cursor-zoom-out"
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <Image src={src} alt={title} fill sizes="100vw" className="object-contain" />
            <button
              type="button"
              aria-label="Cerrar imagen"
              className="absolute top-6 right-6 text-white/70 hover:text-accent transition-colors z-10"
              onClick={() => setOpen(false)}
            >
              <X size={36} strokeWidth={1.5} />
            </button>
            <div className="absolute bottom-0 left-0 right-0 text-center pb-4">
              <span className="font-title text-white/80 text-sm uppercase tracking-[0.2em]">
                {title}
              </span>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

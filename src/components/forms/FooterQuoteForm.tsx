"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, SPECS_OPTIONS } from "@/lib/forms";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "bg-white/5 border border-white/10 p-3 text-sm text-white placeholder:text-white/50 focus:border-accent outline-none transition-all w-full";

export default function FooterQuoteForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("source", "footer");

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p className="border border-accent/40 bg-accent/10 text-accent p-6 font-body text-sm">
        ¡Gracias! Recibimos tu solicitud y te contactaremos a la brevedad.
      </p>
    );
  }

  return (
    <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
      <div className="col-span-2">
        <input name="name" required type="text" placeholder="Nombre completo" aria-label="Nombre completo" className={inputClass} />
      </div>
      <input name="email" required type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" className={inputClass} />
      <input name="phone" type="tel" placeholder="Teléfono / WhatsApp" aria-label="Teléfono / WhatsApp" className={inputClass} />
      <input name="company" type="text" placeholder="Empresa" aria-label="Empresa" className={inputClass} />
      <input name="position" type="text" placeholder="Cargo" aria-label="Cargo" className={inputClass} />
      <select
        name="service_type"
        required
        defaultValue=""
        aria-label="¿Qué tipo de servicio requieres?"
        className={`${inputClass} [&>option]:text-primary`}
      >
        <option value="" disabled>
          ¿Qué tipo de servicio requieres?
        </option>
        {SERVICE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <select
        name="has_specs"
        required
        defaultValue=""
        aria-label="¿Cuentas con plano, muestra o especificaciones?"
        className={`${inputClass} [&>option]:text-primary`}
      >
        <option value="" disabled>
          ¿Cuentas con plano, muestra o especificaciones?
        </option>
        {SPECS_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="col-span-2">
        <textarea
          name="message"
          placeholder="Cuéntanos un poco sobre tu requerimiento"
          aria-label="Cuéntanos un poco sobre tu requerimiento"
          rows={3}
          className={inputClass}
        />
      </div>
      {status === "error" && (
        <p className="col-span-2 text-red-300 text-xs font-body">
          No se pudo enviar tu solicitud. Intenta de nuevo o escríbenos por correo.
        </p>
      )}
      <button
        disabled={status === "sending"}
        className="col-span-2 bg-accent text-primary font-title font-bold py-3 hover:brightness-110 transition-all uppercase tracking-widest clip-notch-br-sm disabled:opacity-60"
      >
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}

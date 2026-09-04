"use client";

import { useState } from "react";
import { SERVICE_OPTIONS, SPECS_OPTIONS } from "@/lib/forms";
import { trackGenerateLead, trackContactFormSubmit, trackQuoteRequest } from "@/lib/tracking";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Status = "idle" | "sending" | "success" | "error";

interface ContactQuoteFormProps {
  title: string;
  submitLabel: string;
}

const inputClass =
  "w-full bg-white border border-support/30 p-3 text-sm font-body text-primary focus:border-primary outline-none transition-all";

export default function ContactQuoteForm({ title, submitLabel }: ContactQuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.append("source", "contacto");

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

      trackGenerateLead({ form_name: title });
      if (window.location.pathname.startsWith("/soluciones/")) {
        trackQuoteRequest({ form_name: title, service: String(data.get("service_type") ?? "") });
      } else {
        trackContactFormSubmit({ form_name: title, source: "contacto" });
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="bg-gray-50 border border-support/20 p-10 md:p-12 clip-notch-br">
      <h2 className="font-title text-3xl font-bold text-primary uppercase tracking-tight mb-8">
        {title}
      </h2>

      {status === "success" ? (
        <div className="border border-primary/20 bg-white p-8">
          <p className="font-title text-primary font-bold uppercase tracking-wide mb-3">
            ¡Solicitud enviada!
          </p>
          <p className="font-body text-industrial-gray text-sm leading-relaxed">
            Nuestro equipo de ingeniería revisará tu proyecto y te enviará una
            propuesta a la brevedad.
          </p>
        </div>
      ) : (
        <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="sm:col-span-2">
            <Field label="Nombre completo" name="name" type="text" required />
          </div>
          <Field label="Correo electrónico" name="email" type="email" required />
          <Field label="Teléfono / WhatsApp" name="phone" type="tel" />
          <Field label="Empresa" name="company" type="text" />
          <Field label="Cargo" name="position" type="text" />

          <SelectField
            label="¿Qué tipo de servicio requieres?"
            name="service_type"
            options={SERVICE_OPTIONS}
            required
          />
          <SelectField
            label="¿Cuentas con plano o muestra?"
            name="has_specs"
            options={SPECS_OPTIONS}
            required
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
            >
              Cuéntanos un poco sobre tu requerimiento
            </label>
            <textarea id="message" name="message" rows={4} className={inputClass} />
          </div>

          {status === "error" && (
            <p className="sm:col-span-2 text-red-600 text-xs font-body">
              No se pudo enviar tu solicitud. Verifica los datos e intenta de nuevo.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="sm:col-span-2 bg-primary text-white font-title font-bold py-4 hover:bg-accent hover:text-primary transition-all uppercase tracking-widest clip-notch-br-sm disabled:opacity-60"
          >
            {status === "sending" ? "Enviando…" : submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
      >
        {label}
      </label>
      <input id={name} name={name} type={type} required={required} className={inputClass} />
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
  required,
}: {
  label: string;
  name: string;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2"
      >
        {label}
      </label>
      <select id={name} name={name} required={required} defaultValue="" className={inputClass}>
        <option value="" disabled>
          Selecciona una opción
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

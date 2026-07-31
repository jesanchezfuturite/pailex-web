"use client";

import { useState } from "react";
import { Paperclip } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Status = "idle" | "sending" | "success" | "error";

interface ContactQuoteFormProps {
  title: string;
  filesLabel: string;
  filesHelp: string;
  submitLabel: string;
}

export default function ContactQuoteForm({ title, filesLabel, filesHelp, submitLabel }: ContactQuoteFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [fileCount, setFileCount] = useState(0);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = new FormData(form);

    // La API espera name/company/email/phone/message y files[]
    const data = new FormData();
    data.append("name", String(raw.get("nombre") ?? ""));
    data.append("company", String(raw.get("empresa") ?? ""));
    data.append("phone", String(raw.get("telefono") ?? ""));
    data.append("email", String(raw.get("correo") ?? ""));
    data.append("message", String(raw.get("mensaje") ?? ""));
    data.append("source", "contacto");
    for (const file of raw.getAll("planos")) {
      if (file instanceof File && file.size > 0) data.append("files[]", file);
    }

    setStatus("sending");
    try {
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setFileCount(0);
      setStatus("success");
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
          <Field label="Nombre completo" name="nombre" type="text" required />
          <Field label="Industria / Empresa" name="empresa" type="text" />
          <Field label="Teléfono / Celular" name="telefono" type="tel" />
          <Field label="Correo electrónico" name="correo" type="email" required />

          <div className="sm:col-span-2">
            <span className="block font-title text-support text-[11px] uppercase tracking-[0.25em] mb-2">
              {filesLabel}
            </span>
            <label
              htmlFor="planos"
              className="flex items-center gap-3 bg-white border border-support/30 border-dashed p-4 cursor-pointer hover:border-primary transition-colors"
            >
              <Paperclip size={18} className="text-support shrink-0" />
              <span className="font-body text-sm text-industrial-gray">
                {fileCount > 0 ? `${fileCount} archivo(s) seleccionado(s)` : filesHelp}
              </span>
            </label>
            <input
              id="planos"
              name="planos"
              type="file"
              multiple
              accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.iges,.jpg,.jpeg,.png"
              className="sr-only"
              onChange={(e) => setFileCount(e.currentTarget.files?.length ?? 0)}
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

          {status === "error" && (
            <p className="sm:col-span-2 text-red-600 text-xs font-body">
              No se pudo enviar tu solicitud. Verifica los datos (los archivos deben
              ser PDF, DWG, DXF, STEP o imágenes de máximo 20 MB) e intenta de nuevo.
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
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-white border border-support/30 p-3 text-sm font-body focus:border-primary outline-none transition-all"
      />
    </div>
  );
}

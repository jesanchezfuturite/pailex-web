"use client";

import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type Status = "idle" | "sending" | "success" | "error";

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
      <input name="name" required type="text" placeholder="Nombre" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
      <input name="email" required type="email" placeholder="Correo" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
      <input name="phone" type="tel" placeholder="Teléfono" className="bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
      <div className="col-span-2">
        <textarea name="message" placeholder="Mensaje" rows={3} className="w-full bg-white/5 border border-white/10 p-3 text-sm focus:border-accent outline-none transition-all" />
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

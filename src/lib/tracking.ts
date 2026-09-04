/**
 * Punto único para enviar eventos al dataLayer de Google Tag Manager.
 * Todo el tracking del sitio pasa por aquí (nunca dataLayer.push directo
 * desde un componente) para mantener nombres y campos consistentes y
 * facilitar agregar plataformas nuevas a futuro.
 */

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export function pushEvent(event: string, data: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

function currentPage(): string | undefined {
  return typeof window === "undefined" ? undefined : window.location.pathname;
}

export function trackGenerateLead(data: { form_name: string; page?: string; source?: string }): void {
  pushEvent("generate_lead", { page: currentPage(), ...data });
}

export function trackContactFormSubmit(data: { form_name: string; page?: string; source?: string }): void {
  pushEvent("contact_form_submit", { page: currentPage(), ...data });
}

export function trackQuoteRequest(data: {
  form_name: string;
  service?: string;
  product?: string;
  page?: string;
}): void {
  pushEvent("quote_request", { page: currentPage(), ...data });
}

export function trackWhatsappClick(data: { section: string; service?: string; product?: string }): void {
  pushEvent("whatsapp_click", { page: currentPage(), ...data });
}

export function trackPhoneClick(data: { phone_number: string; section: string }): void {
  pushEvent("phone_click", { page: currentPage(), ...data });
}

export function trackEmailClick(data: { email: string; section: string }): void {
  pushEvent("email_click", { page: currentPage(), ...data });
}

export function trackFileDownload(data: { file_name: string; file_url: string }): void {
  pushEvent("file_download", { page: currentPage(), ...data });
}

export function trackViewService(data: { service_name: string; category?: string }): void {
  pushEvent("view_service", { page: currentPage(), ...data });
}

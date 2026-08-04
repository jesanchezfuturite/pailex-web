/** Formatea una fecha ISO como "4 de agosto de 2026" (es-MX). */
export function formatDate(iso: string | null): string {
  if (!iso) {
    return "";
  }
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Monterrey",
  }).format(new Date(iso));
}

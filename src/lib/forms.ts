/** Opciones compartidas de los formularios de cotización (footer y contacto).
 *  Deben coincidir con la validación de POST /api/leads del CMS. */

export const SERVICE_OPTIONS = [
  "Pailería",
  "Maquinados",
  "Automatización industrial",
  "Proyecto personalizado",
  "Reparación y mantenimiento",
  "Otro",
] as const;

export const SPECS_OPTIONS = ["Sí", "No"] as const;

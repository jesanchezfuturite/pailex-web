// Cliente de la API del CMS (pailex-admin, Laravel).
// Todas las respuestas se cachean con la etiqueta "content"; el panel
// dispara POST /api/revalidate al guardar y Next regenera las páginas.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** Imagen de respaldo para los espacios fotográficos: lienzo 1600×900 con el
 *  imagotipo oficial centrado a tamaño proporcional (no se estira ni recorta
 *  el logo en contenedores con object-cover). */
export const FALLBACK_IMAGE = "/images/placeholder-pailex.webp";

export interface MediaItem {
  url: string;
  alt: string | null;
  width?: number | null;
  height?: number | null;
}

export interface Site {
  settings: Record<string, string>;
  menu: { label: string; href: string }[];
}

export interface SolutionCard {
  title: string;
  description: string;
  href: string;
  image: MediaItem | null;
}

export interface Feature {
  title: string;
  description: string;
}

export interface BrandItem {
  name: string;
  logo: MediaItem | null;
}

export interface SectorItem {
  name: string;
  image: MediaItem | null;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  description: string;
  bullets: string[];
  image: MediaItem | null;
}

export interface Product {
  name: string;
  icon: string;
}

export interface CapacityGroup {
  name: string;
  equipment: string[];
}

export interface Industry {
  name: string;
  description: string;
  clients: string[];
  image: MediaItem | null;
}

export interface Project {
  title: string;
  description: string;
  client: string;
  sector: string;
  scope: string;
  result: string;
  image: (MediaItem & { width: number; height: number }) | null;
}

export interface PageData<C = Record<string, never>> {
  slug: string;
  name: string;
  seo: { title: string | null; description: string | null };
  texts: Record<string, string>;
  media: Record<string, MediaItem>;
  collections: C;
}

export type HomeCollections = {
  solution_cards: SolutionCard[];
  features: Feature[];
  brands: BrandItem[];
  sectors: SectorItem[];
  faqs: FaqItem[];
};

export type NosotrosCollections = { differentiators: Differentiator[] };

export type SolucionesCollections = {
  services: Service[];
  products: Product[];
  capacity_groups: CapacityGroup[];
};

export type IndustriasCollections = { industries: Industry[] };

export type PortafolioCollections = {
  projects: Project[];
  continuous_development: string[];
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: "force-cache",
    next: { tags: ["content"] },
  });
  if (!res.ok) {
    throw new Error(`Error de la API del CMS: ${path} respondió ${res.status}`);
  }
  return res.json();
}

export const getSite = () => fetchJson<Site>("/api/site");

export const getPage = <C>(slug: string) => fetchJson<PageData<C>>(`/api/pages/${slug}`);

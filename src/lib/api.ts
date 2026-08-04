// Cliente de la API del CMS (pailex-admin, Laravel).
// Todas las respuestas se cachean con la etiqueta "content"; el panel
// dispara POST /api/revalidate al guardar y Next regenera las páginas.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** URL pública del sitio: canónicas, Open Graph y Schema.org. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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

export interface PostSummary {
  title: string;
  slug: string;
  excerpt: string;
  published_at: string | null;
  image: MediaItem | null;
}

export interface Post extends PostSummary {
  content: string;
}

export interface PageSeo {
  title: string | null;
  description: string | null;
  canonical?: string | null;
  og_title?: string | null;
  og_description?: string | null;
  og_image?: MediaItem | null;
  /** JSON-LD administrado desde el CMS; se inserta tal cual en la página. */
  schema?: unknown;
}

export interface PageData<C = Record<string, never>> {
  slug: string;
  name: string;
  seo: PageSeo;
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

/** Notas publicadas del blog, de la más reciente a la más antigua. */
export const getPosts = () => fetchJson<PostSummary[]>("/api/posts");

/** Detalle de una nota; null si no existe o no está publicada (→ 404 del sitio). */
export async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_URL}/api/posts/${encodeURIComponent(slug)}`, {
    cache: "force-cache",
    next: { tags: ["content"] },
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Error de la API del CMS: /api/posts/${slug} respondió ${res.status}`);
  }
  return res.json();
}

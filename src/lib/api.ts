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

export interface MenuLink {
  label: string;
  href: string;
}

export interface Site {
  settings: Record<string, string>;
  menu: MenuLink[];
  /** Interiores de solución publicados, para el dropdown de "Soluciones". */
  solutions_menu: MenuLink[];
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
  /** Destino del título (p. ej. el interior de la solución); null = sin enlace. */
  href: string | null;
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
  image: MediaItem | null;
}

export interface Project {
  title: string;
  description: string;
  sector: string;
  scope: string;
  result: string;
  image: (MediaItem & { width: number; height: number }) | null;
}

export interface SolutionSummary {
  name: string;
  slug: string;
}

/** Interior de solución: plantilla fija de secciones (hoy 1-3; 4-8 a futuro). */
export interface SolutionDetail {
  name: string;
  slug: string;
  status: "draft" | "published";
  seo: PageSeo;
  banner: {
    title: string;
    description: string | null;
    image: MediaItem | null;
  };
  hero: {
    title: string;
    description: string | null;
    media_type: "image" | "video";
    image: MediaItem | null;
    video: MediaItem | null;
    video_poster: MediaItem | null;
    cta: { show: boolean; label: string; href: string };
  };
  intro: {
    enabled: boolean;
    title: string | null;
    content: string | null;
    background: "white" | "green";
    list: {
      enabled: boolean;
      title: string;
      items: { title: string; description: string | null }[];
    };
  };
  capabilities: {
    enabled: boolean;
    title: string | null;
    items: {
      title: string;
      description: string | null;
      href: string | null;
      image: MediaItem | null;
    }[];
  };
  faqs: {
    enabled: boolean;
    title: string;
    items: FaqItem[];
  };
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

export interface CoverageLocation {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

export type CoberturaCollections = { locations: CoverageLocation[] };

export interface SuccessCase {
  title: string;
  client: string | null;
  industry: string | null;
  challenge: string | null;
  /** HTML del editor del CMS. */
  intervention: string | null;
  benefits: { icon: string; text: string }[];
  impact: string | null;
  /** El CTA de contacto se muestra después del caso que tenga esta bandera. */
  show_cta_after: boolean;
}

export type PortafolioCollections = {
  projects: Project[];
  success_cases: SuccessCase[];
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

/** Interiores de solución publicados, en el orden del menú. */
export const getSolutions = () => fetchJson<SolutionSummary[]>("/api/solutions");

/**
 * Detalle de un interior de solución; null si el slug no existe (→ 404).
 * Incluye borradores: su URL exacta funciona como vista previa y la página
 * los marca noindex.
 */
export async function getSolution(slug: string): Promise<SolutionDetail | null> {
  const res = await fetch(`${API_URL}/api/solutions/${encodeURIComponent(slug)}`, {
    cache: "force-cache",
    next: { tags: ["content"] },
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Error de la API del CMS: /api/solutions/${slug} respondió ${res.status}`);
  }
  return res.json();
}

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

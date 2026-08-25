// Cliente de la API del CMS (pailex-admin, Laravel).
// Todas las respuestas se cachean con la etiqueta "content"; el panel
// dispara POST /api/revalidate al guardar y Next regenera las páginas.

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

/** URL pública del sitio: canónicas, Open Graph y Schema.org. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Imagen de respaldo para los espacios fotográficos sin imagen configurada:
 *  un lienzo neutro liso, para no mostrar el logo de la empresa como si
 *  fuera contenido real. */
export const FALLBACK_IMAGE = "/images/placeholder.svg";

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

/** Colores de tarjeta permitidos en todo el sitio. */
export type CardBackground = "white" | "gray" | "primary" | "support";

export interface SolutionCard {
  title: string;
  description: string;
  href: string;
  background: CardBackground;
  image: MediaItem | null;
}

export interface Feature {
  title: string;
  description: string;
}

export interface BrandItem {
  name: string;
  logo: MediaItem | null;
  /** true = este logo se muestra a color; false (default) = en blanco y negro. */
  color: boolean;
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
  background: CardBackground;
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
  background: CardBackground;
}

export interface Industry {
  name: string;
  description: string;
  company_names: string[];
  image: MediaItem | null;
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
    media_type: "image" | "video";
    image: MediaItem | null;
    video: MediaItem | null;
    video_poster: MediaItem | null;
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
    /** Formulario de cotización + datos de contacto (correo, teléfonos, dirección); sin campos propios. */
    show_contact: boolean;
    list: {
      enabled: boolean;
      title: string;
      items: { title: string; description: string | null }[];
    };
    /** Franja verde de cierre (p. ej. "El resultado: ..."), con una palabra/frase resaltable. */
    highlight: { text: string | null; word: string | null };
  };
  capabilities: {
    enabled: boolean;
    title: string | null;
    background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
    items: {
      title: string;
      description: string | null;
      href: string | null;
      background: "white" | "gray" | "primary" | "support" | "glass";
      image: MediaItem | null;
    }[];
  };
  problems: {
    enabled: boolean;
    title: string;
    background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
    items: (FaqItem & { background: "white" | "gray" | "primary" | "support" | "glass" })[];
  };
  coverage: {
    enabled: boolean;
    title: string | null;
    content: string | null;
    background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
    cta: { label: string; href: string };
    locations: CoverageLocation[];
  };
  reasons: {
    enabled: boolean;
    title: string;
    background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
    items: { title: string; description: string | null; background: "white" | "gray" | "primary" | "support" | "glass" }[];
  };
  cta_banner: {
    enabled: boolean;
    title: string | null;
    body: string | null;
    background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
    cta: { label: string; href: string };
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

/** Hero estructurado de las páginas del sitio (mismo shape que el de Solutions). */
export interface PageHero {
  eyebrow: string | null;
  eyebrow_size: number | null;
  title: string;
  title_size: number | null;
  description: string | null;
  description_size: number | null;
  media_type: "image" | "video";
  image: MediaItem | null;
  video: MediaItem | null;
  video_poster: MediaItem | null;
  cta: { show: boolean; label: string; href: string };
}

/** Sección configurable (título, nombre interno para anclas y color de fondo). */
export interface PageSectionData {
  internal_name: string | null;
  title: string | null;
  title_size: number | null;
  title_highlight: string | null;
  background: "white" | "gray" | "primary" | "primary-dots" | "primary-glass";
  /** Solo aplica a secciones con medio propio (p. ej. "Más de 35 años"). */
  media_type: "image" | "video" | null;
}

export interface PageData<C = Record<string, never>> {
  slug: string;
  name: string;
  /** "draft" = aún no debe mostrarse en el sitio (la página responde 404). */
  status: "draft" | "published";
  seo: PageSeo;
  hero: PageHero;
  texts: Record<string, string>;
  media: Record<string, MediaItem>;
  sections: Record<string, PageSectionData>;
  collections: C;
}

/** Slug público → clave interna estable, usado por el middleware para
 *  enrutar una URL personalizada hacia la plantilla que le corresponde. */
export interface PageRoute {
  slug: string;
  template: string;
}

export type HomeCollections = {
  solution_cards: SolutionCard[];
  features: Feature[];
  brands: BrandItem[];
  sectors: SectorItem[];
  faqs: FaqItem[];
};

export interface TimelineItem {
  year: string;
  description: string;
  image: MediaItem | null;
}

export type NosotrosCollections = {
  differentiators: Differentiator[];
  timeline: TimelineItem[];
  /** Mismas localidades del mapa de Cobertura, reutilizadas en Nosotros. */
  locations: CoverageLocation[];
};

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

export interface SuccessCase {
  title: string;
  client: string | null;
  industry: string | null;
  image: MediaItem | null;
  challenge: string | null;
  /** HTML del editor del CMS. */
  intervention: string | null;
  benefits: { icon: string; text: string }[];
  impact: string | null;
  /** El CTA de contacto se muestra después del caso que tenga esta bandera. */
  show_cta_after: boolean;
}

export type PortafolioCollections = {
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

/** Usado por el middleware para resolver slugs personalizados a su plantilla. */
export const getPageRoutes = () => fetchJson<PageRoute[]>("/api/page-routes");

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

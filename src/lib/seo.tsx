import type { Metadata } from "next";
import { SITE_URL, type PageSeo, type MediaItem } from "@/lib/api";

/**
 * Construye la metadata de una página a partir de su bloque SEO del CMS:
 * <title>, meta description, canonical, Open Graph y Twitter Cards.
 * `path` es la ruta pública ("/nosotros"); `heroFallback` se usa como imagen
 * de Open Graph cuando el CMS no define una específica.
 */
export function pageMetadata(
  seo: PageSeo,
  path: string,
  heroFallback?: MediaItem | null,
): Metadata {
  const canonical = seo.canonical || `${SITE_URL}${path}`;
  const ogTitle = seo.og_title || seo.title || undefined;
  const ogDescription = seo.og_description || seo.description || undefined;
  const ogImage = seo.og_image ?? heroFallback ?? null;

  return {
    title: seo.title ?? undefined,
    description: seo.description ?? undefined,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Pailex",
      locale: "es_MX",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [{ url: ogImage.url, alt: ogImage.alt ?? undefined }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}

/** Inserta el JSON-LD (Schema.org) administrado desde el CMS. */
export function SchemaScript({ schema }: { schema?: unknown }) {
  if (!schema) {
    return null;
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

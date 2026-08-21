import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("terminos-y-condiciones");
  return pageMetadata(page.seo, "/terminos-y-condiciones");
}

// Página de solo documento: sin hero, solo Navbar (fijo) + Footer (globales
// desde layout.tsx) alrededor de un artículo administrable desde el CMS.
// En borrador hasta que se agregue el contenido desde el gestor.
export default async function TerminosCondicionesPage() {
  const page = await getPage("terminos-y-condiciones");
  if (page.status !== "published") notFound();
  const { name, texts, seo } = page;

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <article className="pt-36 pb-24 md:pt-44 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="font-title text-3xl md:text-5xl font-bold text-primary uppercase tracking-tight mb-6">
            {name}
          </h1>
          <div className="w-20 h-1.5 bg-support mb-10" />
          <div className="prose-pailex" dangerouslySetInnerHTML={{ __html: texts.content ?? "" }} />
        </div>
      </article>
    </div>
  );
}

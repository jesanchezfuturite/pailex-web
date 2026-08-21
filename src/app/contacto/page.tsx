import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPage, getSite } from "@/lib/api";
import { pageMetadata, SchemaScript } from "@/lib/seo";
import PageHero from "@/components/sections/PageHero";
import ContactCtaBlock from "@/components/sections/ContactCtaBlock";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("contacto");
  return pageMetadata(page.seo, `/${page.slug}`, page.hero.image ?? null);
}

export default async function ContactoPage() {
  const [page, site] = await Promise.all([getPage("contacto"), getSite()]);
  if (page.status !== "published") notFound();
  const { texts, seo } = page;
  const { settings } = site;

  return (
    <div className="bg-white">
      <SchemaScript schema={seo.schema} />
      <PageHero hero={page.hero} />

      <ContactCtaBlock
        title={texts.intro_title}
        body={texts.intro_body}
        formTitle={texts.form_title}
        submitLabel={texts.form_submit_label}
        settings={settings}
      />
    </div>
  );
}

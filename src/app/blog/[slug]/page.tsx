import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPost, getPosts, FALLBACK_IMAGE, SITE_URL } from "@/lib/api";
import { formatDate } from "@/lib/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {};
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const image = post.image?.url;

  return {
    title: `${post.title} | Blog Pailex`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: "Pailex",
      locale: "es_MX",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.published_at ?? undefined,
      images: image ? [{ url: image, alt: post.image?.alt ?? post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: image ? [image] : undefined,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  // Schema.org Article para buscadores y motores de respuesta
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image?.url ? [post.image.url] : undefined,
    datePublished: post.published_at ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "es-MX",
    author: { "@type": "Organization", name: "Pailex", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Pailex",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo-pailex.webp` },
    },
  };

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero: imagen principal en duotono verde con título y fecha */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden bg-black">
        <div className="absolute inset-0">
          <Image
            src={post.image?.url ?? FALLBACK_IMAGE}
            alt={post.image?.alt ?? post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />
        </div>

        <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 pb-16 pt-44">
          <p className="anim-fade-up anim-delay-1 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] mb-5">
            Blog Pailex
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-5" />
          <time
            dateTime={post.published_at ?? undefined}
            className="anim-fade-up anim-delay-3 block text-support font-title text-sm uppercase tracking-[0.2em]"
          >
            {formatDate(post.published_at)}
          </time>
        </div>
      </section>

      {/* Contenido del artículo */}
      <article className="py-20 md:py-28">
        <div className="max-w-3xl mx-auto px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-support hover:text-primary font-title text-xs uppercase tracking-[0.2em] transition-colors mb-12"
          >
            <ArrowLeft size={14} />
            Volver al blog
          </Link>

          {/* HTML del editor del CMS (contenido interno de confianza) */}
          <div className="prose-pailex" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </article>

      {/* CTA de cierre */}
      <section className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-title text-2xl md:text-4xl font-bold uppercase tracking-tight mb-8 max-w-3xl mx-auto leading-tight">
            ¿Tienes un proyecto en puerta? <span className="text-accent">Cuéntanos.</span>
          </h2>
          <Link
            href="/contacto"
            className="inline-block bg-accent text-primary px-10 py-5 font-title font-bold text-lg hover:bg-white transition-all uppercase tracking-widest clip-notch-br-sm"
          >
            Solicitar cotización
          </Link>
        </div>
      </section>
    </div>
  );
}

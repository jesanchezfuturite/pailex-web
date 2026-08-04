import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPosts, FALLBACK_IMAGE, SITE_URL, type PostSummary } from "@/lib/api";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Blog | Pailex — Ingeniería metalmecánica industrial",
  description:
    "Artículos técnicos sobre pailería industrial, maquinados CNC, mantenimiento y proyectos llave en mano: criterios de ingeniería para que tu producción nunca se detenga.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-white">
      {/* Encabezado del blog: banda institucional con motivos de marca */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden bg-primary">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#E8FFC0 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="absolute top-0 right-0 w-64 h-64 bg-support/10 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
        <div className="absolute top-24 right-6 w-10 h-10 border-t-2 border-r-2 border-accent/40 z-20 hidden md:block" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16 pt-40">
          <p className="anim-fade-up anim-delay-1 text-accent font-title text-xs md:text-sm uppercase tracking-[0.25em] mb-4">
            Criterios de ingeniería para tu planta
          </p>
          <h1 className="anim-fade-up anim-delay-2 text-white font-title text-5xl md:text-7xl font-bold uppercase tracking-tight">
            Blog
          </h1>
          <div className="anim-grow-x w-24 h-[3px] bg-accent mt-6 mb-6" />
          <p className="anim-fade-up anim-delay-3 text-white/80 text-lg md:text-2xl font-body max-w-2xl">
            Artículos técnicos sobre pailería, maquinados y mantenimiento industrial.
          </p>
        </div>
      </section>

      {/* Listado de notas */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length === 0 ? (
            <p className="text-industrial-gray font-body text-lg text-center py-20">
              Aún no hay notas publicadas. Vuelve pronto.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function PostCard({ post }: { post: PostSummary }) {
  return (
    <article className="border border-support/20 bg-white group transition-all duration-500 shadow-sm relative overflow-hidden clip-notch-br flex flex-col">
      <div className="absolute top-0 left-0 w-full h-1 bg-support group-hover:bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 z-10" />
      <Link href={`/blog/${post.slug}`} className="relative h-56 overflow-hidden block">
        <Image
          src={post.image?.url ?? FALLBACK_IMAGE}
          alt={post.image?.alt ?? post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-primary/15 group-hover:bg-primary/30 transition-colors duration-500" />
      </Link>
      <div className="p-8 flex flex-col flex-1">
        <time
          dateTime={post.published_at ?? undefined}
          className="font-title text-support text-xs uppercase tracking-[0.2em]"
        >
          {formatDate(post.published_at)}
        </time>
        <h2 className="font-title text-2xl font-bold text-primary uppercase tracking-tight leading-tight mt-3 mb-4">
          <Link href={`/blog/${post.slug}`} className="hover:text-support transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="text-industrial-gray font-body leading-relaxed mb-8 flex-1">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="relative overflow-hidden text-primary font-bold uppercase text-xs tracking-[0.2em] inline-flex items-center self-start group/btn"
        >
          <span className="relative z-10 group-hover/btn:text-support transition-colors duration-300">
            Leer más
          </span>
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-support group-hover/btn:bg-accent origin-left transition-all duration-300" />
        </Link>
      </div>
    </article>
  );
}

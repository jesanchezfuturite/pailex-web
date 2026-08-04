import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// El panel (Laravel) llama aquí al guardar contenido para regenerar
// todas las páginas que consumen la API del CMS.
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  if (!process.env.REVALIDATE_SECRET || body.secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  // expire: 0 fuerza expiración inmediata (sin servir contenido viejo)
  revalidateTag("content", { expire: 0 });

  return NextResponse.json({ ok: true });
}

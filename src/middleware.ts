import { NextRequest, NextResponse } from "next/server";
import { getPageRoutes } from "@/lib/api";

/**
 * Permite que el slug de una página se edite desde el CMS y la URL pública
 * cambie de verdad, sin necesitar un redeploy: cada página sigue viviendo en
 * su carpeta fija (la "plantilla", p. ej. src/app/portafolio), pero si el
 * administrador le pone un slug distinto (p. ej. "proyectos"), esta URL
 * personalizada se reescribe internamente hacia la plantilla, y la URL vieja
 * (el nombre de la plantilla) redirige a la nueva para no duplicar contenido.
 * El mapa de rutas usa el mismo tag "content" que el resto del contenido, así
 * que se actualiza solo cuando el panel guarda cambios.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Home siempre vive en "/"; su slug interno no participa del enrutamiento.
  if (pathname === "/") {
    return NextResponse.next();
  }

  const segment = pathname.split("/")[1];

  let routes;
  try {
    routes = await getPageRoutes();
  } catch {
    // Si el CMS no responde, no bloqueamos la navegación: se sirve tal cual.
    return NextResponse.next();
  }

  // ¿La URL visitada es un slug personalizado? → mostrar la plantilla interna.
  const bySlug = routes.find((r) => r.slug === segment && r.template !== segment);
  if (bySlug) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${segment}`, `/${bySlug.template}`);
    return NextResponse.rewrite(url);
  }

  // ¿La URL visitada es el nombre de la plantilla, pero ya tiene otro slug? → redirigir a la URL actual.
  const byTemplate = routes.find((r) => r.template === segment && r.slug !== segment);
  if (byTemplate) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(`/${segment}`, `/${byTemplate.slug}`);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Todas las rutas excepto: _next, archivos con extensión (imágenes,
     * videos, favicon, etc.) y la propia API interna de Next.
     */
    "/((?!_next|api|.*\\..*).*)",
  ],
};

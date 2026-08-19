import type { NextConfig } from "next";

// En producción la variable es obligatoria. Sin ella el build cae con un
// "ECONNREFUSED 127.0.0.1:8000" al prerenderizar contra el CMS local, y las
// remotePatterns de abajo quedan apuntando a localhost.
if (!process.env.NEXT_PUBLIC_API_URL && process.env.NODE_ENV === "production") {
  throw new Error(
    "Falta NEXT_PUBLIC_API_URL. Configúrala en Vercel (Settings → Environment " +
      "Variables) con la URL del CMS —sin /admin ni barra final—, por ejemplo " +
      "https://plx-ac.futurite.mobi, y vuelve a desplegar sin caché de build."
  );
}

// Host del CMS (Laravel) del que se sirven las imágenes administrables
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");

const isLocalApi = ["localhost", "127.0.0.1"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    // Solo en desarrollo: el optimizador de Next 16 bloquea IPs privadas por defecto
    dangerouslyAllowLocalIP: isLocalApi,
    // Necesario para /images/placeholder.svg (imagen propia, no subida por usuarios)
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
        hostname: apiUrl.hostname,
        port: apiUrl.port,
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;

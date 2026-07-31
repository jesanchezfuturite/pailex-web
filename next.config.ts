import type { NextConfig } from "next";

// Host del CMS (Laravel) del que se sirven las imágenes administrables
const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000");

const isLocalApi = ["localhost", "127.0.0.1"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    // Solo en desarrollo: el optimizador de Next 16 bloquea IPs privadas por defecto
    dangerouslyAllowLocalIP: isLocalApi,
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

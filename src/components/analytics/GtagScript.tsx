import Script from "next/script";

/**
 * Carga directa de gtag.js para GA4 y/o Google Ads, SOLO cuando esa
 * plataforma está activa y marcada como NO administrada por GTM (evita
 * duplicar la etiqueta si ya se configura dentro del contenedor de GTM).
 */
export function GtagScript({ ga4Id, adsId }: { ga4Id?: string | null; adsId?: string | null }) {
  const primaryId = ga4Id ?? adsId;
  if (!primaryId) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${primaryId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${ga4Id ? `gtag('config', '${ga4Id}');` : ""}
${adsId ? `gtag('config', '${adsId}');` : ""}`}
      </Script>
    </>
  );
}

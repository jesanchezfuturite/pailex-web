import Script from "next/script";
import type { TrackingConfig } from "@/lib/api";

/**
 * Estado por defecto de Google Consent Mode (todo denegado hasta que exista
 * un banner de cookies real). Se ejecuta antes que cualquier otro script de
 * medición para que, cuando se agregue un CMP más adelante, baste con
 * actualizar este mismo dataLayer en vez de rediseñar el tracking.
 */
export default function ConsentDefaults({ defaults }: { defaults: TrackingConfig["consent_defaults"] }) {
  return (
    <Script id="consent-defaults" strategy="beforeInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', ${JSON.stringify(defaults)});`}
    </Script>
  );
}

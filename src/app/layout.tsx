import type { Metadata } from "next";
import { Space_Grotesk, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppBubble from "@/components/layout/WhatsAppBubble";
import { getSite } from "@/lib/api";
import ConsentDefaults from "@/components/analytics/ConsentDefaults";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTMScript";
import { GtagScript } from "@/components/analytics/GtagScript";
import { MetaPixelScript } from "@/components/analytics/MetaPixelScript";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"]
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted-grotesk",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Pailex | Soluciones Metalmecánicas Industriales",
  description: "Pailería, Maquinados, Automatización y Proyectos Llave en Mano desde Monterrey.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSite();
  const tracking = site.tracking;

  const gtmId = tracking?.gtm.enabled ? tracking.gtm.container_id : null;
  const ga4DirectId = tracking?.ga4.enabled && !tracking.ga4.via_gtm ? tracking.ga4.measurement_id : null;
  const adsDirectId =
    tracking?.google_ads.enabled && !tracking.google_ads.via_gtm ? tracking.google_ads.conversion_id : null;
  const metaDirectId = tracking?.meta.enabled && !tracking.meta.via_gtm ? tracking.meta.pixel_id : null;

  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${schibstedGrotesk.variable} font-body antialiased`}>
        {gtmId && <GTMNoScript containerId={gtmId} />}
        <ConsentDefaults
          defaults={
            tracking?.consent_defaults ?? {
              analytics_storage: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            }
          }
        />
        {gtmId && <GTMScript containerId={gtmId} />}
        {(ga4DirectId || adsDirectId) && <GtagScript ga4Id={ga4DirectId} adsId={adsDirectId} />}
        {metaDirectId && <MetaPixelScript pixelId={metaDirectId} />}
        <Navbar menu={site.menu} solutionsMenu={site.solutions_menu ?? []} />
        <main>{children}</main>
        <Footer settings={site.settings} />
        <WhatsAppBubble phone={site.settings.phone_2} />
      </body>
    </html>
  );
}

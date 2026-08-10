import type { Metadata } from "next";
import { Space_Grotesk, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getSite } from "@/lib/api";

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

  return (
    <html lang="es">
      <body className={`${spaceGrotesk.variable} ${schibstedGrotesk.variable} font-body antialiased`}>
        <Navbar menu={site.menu} solutionsMenu={site.solutions_menu ?? []} />
        <main>{children}</main>
        <Footer settings={site.settings} />
      </body>
    </html>
  );
}

# PAILEX — Lineamientos del proyecto web

Documento de traspaso para el equipo que tome el desarrollo. Última actualización: 28 de julio de 2026.

---

## 1. Resumen

Sitio corporativo de **Pailex** (Pailería, Maquinados y Productos Industriales S.A. — Monterrey): soluciones metalmecánicas industriales, pailería, maquinados CNC, automatización y proyectos llave en mano.

- **Fuente de contenido:** mockup del equipo creativo (estructura de la home) + **PAILEX Brandbook** (identidad; documento confidencial, pedirlo a Futurité).
- **Estado actual:** home completa y alineada al brandbook (hero con video, soluciones, diferenciadores, CTA, marcas, sectores, blog placeholder, FAQ, footer con formulario). Páginas internas sin iniciar.

## 2. Stack técnico

| Pieza | Versión / detalle |
|---|---|
| Next.js | 16.2.10 (App Router, Turbopack) |
| React | 19.2.4 |
| Tailwind CSS | v4 (`@tailwindcss/postcss`, config en `tailwind.config.ts` vía `@config` en `globals.css`) |
| TypeScript | 5.x |
| Iconos | lucide-react |
| Fuentes | `next/font/google` (no hay `<link>` externos) |

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # verificar antes de cada PR
```

**Deploy:** Vercel, proyecto `pailex-web` (team Futurité). Repo: `github.com/jesanchezfuturite/pailex-web`. Push a `main` = deploy a producción. ⚠️ Vercel rechaza deploys si el email del autor del commit no es válido/verificado en GitHub — configurar `git config user.email` correcto antes del primer commit.

## 3. Estructura

```
src/
  app/
    layout.tsx        # fuentes, Navbar/Footer globales, metadata
    page.tsx          # home completa + SolutionCard + FeatureItem
    globals.css       # utilidades de marca (clips 45°, animaciones)
  components/
    brand/Logo.tsx    # imagotipo (isotipo PROVISIONAL, ver §5.3)
    layout/           # Navbar, Footer (footer incluye form de contacto)
    sections/         # Hero, BrandSlider, FAQAccordion
public/
  images/*.webp       # fotografía por sección (nombres descriptivos)
  videos/hero.mp4     # video del hero (2.4 MB, sin audio)
```

## 4. Identidad de marca — REGLAS NO NEGOCIABLES

Todo sale del brandbook oficial. Ante cualquier duda, el brandbook manda.

### 4.1 Paleta (ya mapeada en `tailwind.config.ts`)

| Token Tailwind | Hex | Uso permitido |
|---|---|---|
| `primary` | `#004431` | Verde oscuro institucional. Fondos y textos principales. Color dominante del sitio. |
| `support` | `#B0BF92` | Verde oliva. Soporte: textos secundarios, subtítulos, plecas, bordes. |
| `accent` | `#E8FFC0` | Verde lima. **SOLO acentos y llamados de atención, con moderación, sobre fondos oscuros o fotografía.** Nunca como fondo de secciones completas ni color dominante. |
| `industrial-gray` | `#4F5054` | Gris neutro para información secundaria. |
| blanco / negro | `#FFFFFF` / `#000000` | Espacios negativos / máximo contraste. |

### 4.2 Tipografía

- **Space Grotesk** (`font-title`): encabezados, títulos, botones. Títulos de sección en MAYÚSCULAS con `tracking-tight`.
- **Schibsted Grotesk** (`font-body`): cuerpo, subtítulos, detalles.
- Ambas cargadas en `layout.tsx` vía `next/font`; no agregar otras familias.

### 4.3 Logo

`src/components/brand/Logo.tsx` (variantes `onDark` / `onLight` / `mono`). **El isotipo actual es una aproximación provisional** dibujada a ojo — el brandbook prohíbe deformar la marca. Cuando el equipo creativo entregue el vector oficial (.svg/.ai), reemplazar únicamente los `<path>` de `<Isotipo />`. Respetar el área de seguridad 2X y tamaño mínimo digital de 214 px (imagotipo) / 50 px (isotipo).

### 4.4 Lenguaje visual

- **Cortes a 45°** derivados del isotipo: utilidades `clip-notch-br`, `clip-notch-br-sm`, `clip-notch-tl` en `globals.css`. Aplicarlos a botones y tarjetas nuevas.
- **Cero bordes redondeados.** La marca es 100% angular; no usar `rounded-*`.
- Detalles geométricos permitidos: plecas lima cortas, triángulos tipo molinete, esquineros en L.
- **Fotografía:** clave oscura industrial (soldadura, chispas, CNC), tratada en duotono verde (overlay `primary` en multiply + gradientes de legibilidad). Evitar stock brillante genérico.
- Animaciones: definidas en `globals.css`, siempre dentro de `@media (prefers-reduced-motion: no-preference)`.

### 4.5 Tono y voz (copy)

- **Tono:** autoridad experta — firme, directo, transparente. **Lenguaje:** preciso y técnico, datos de ingeniería.
- Frase ancla de la marca: *"35 años garantizando la continuidad de tu planta."*
- Conceptos recurrentes: integración total (Diseño + Fabricación + Instalación), "tu equipo de ingeniería extendido", "tu producción nunca se detiene".
- Todo el sitio en español (es-MX), trato de "tú" al cliente industrial.

## 5. Datos reales del cliente

- Email: `admon.pmpi2@gmail.com`
- Teléfonos: `+52 828 289 7071` y `+52 1 81 8024 3684`
- Origen: Monterrey, N.L. — alcance nacional ("desde Monterrey hasta donde tu planta lo necesite").

## 6. Pendientes al delegar

1. **Vector oficial del imagotipo** → reemplazar paths en `Logo.tsx` y generar favicon/OG image con el isotipo real.
2. **Logos de las 16 marcas cliente** para `BrandSlider` (hoy es texto). ⚠️ Toto, Interceramic, Vivolmex, Metalsa y Pemex están marcadas con asterisco en el mockup: **confirmar autorización de uso antes de publicar**.
3. **Backend del formulario de contacto** (footer): hoy no envía nada. Definir destino con Futurité (patrón habitual de la agencia: webhook n8n + correo transaccional Brevo).
4. **Páginas internas:** Nosotros, Soluciones (detalle), Industrias, Portafolio, Contacto. Los "Ver más" de soluciones deben enlazar a sus páginas (mockup: Servicios → Servicios, Suministros → Productos, Infraestructura → Capacidad instalada).
5. **Blog:** 3 tarjetas placeholder en home; falta contenido, imágenes (1200×675) y decisión de CMS o MDX.
6. **Legales:** Aviso de privacidad y Términos y condiciones (links del footer sin destino).
7. **SEO:** metadata por página, Open Graph, sitemap, favicon de marca.
8. **FAQ:** el mockup pide *"Confirmar info. con cliente"* — validar las 3 respuestas antes de lanzar.

## 7. Referencia rápida de secciones de la home

| Sección | Componente | Nota |
|---|---|---|
| Hero | `sections/Hero.tsx` | Video `hero.mp4` + Ken Burns + duotono verde + entrada escalonada. Poster: `paileria.webp`. |
| Nuestras Soluciones | `SolutionCard` en `page.tsx` | 3 tarjetas con foto, corte 45°, hover a verde institucional. |
| ¿Por qué elegir? | `FeatureItem` en `page.tsx` | Fondo `primary` + textura foto al 10%. Títulos blancos, pleca lima. |
| CTA cotización | `page.tsx` | Fondo `contacto.webp` en duotono. Lima solo en botón/acento. |
| Marcas | `sections/BrandSlider.tsx` | Marquee CSS (`animate-marquee`). Pendiente: logos reales. |
| Sectores | `page.tsx` | 5 tarjetas fotográficas con gradiente verde. |
| Blog | `page.tsx` | Placeholders. |
| FAQ | `sections/FAQAccordion.tsx` | `<details>` nativo, sin JS. |
| Footer + form | `layout/Footer.tsx` | Datos reales + form sin backend (ver §6.3). |

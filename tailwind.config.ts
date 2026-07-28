import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004431", // Verde oscuro
        support: "#B0BF92", // Verde oliva
        accent: "#E8FFC0",  // Verde lima
        industrial: {
          gray: "#4F5054",
          black: "#000000",
        }
      },
      fontFamily: {
        title: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-schibsted-grotesk)", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fill: 'fillAnimation 3s linear forwards', // Definisce l'animazione "fill"
      },
      keyframes: {
        fillAnimation: {
          '0%': { fill: 'transparent' },  // Colore iniziale
          '100%': { fill: 'currentColor' },  // Colore finale
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;

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
      boxShadow: {
        custom: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
    },
  },
  plugins: [],
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07121F",
        navy: "#0B1B2B",
        slate: "#183044",
        parchment: "#F8F5EE",
        paper: "#FFFDF7",
        gold: "#C9A45B",
        brass: "#8F6E2F",
        sage: "#8EA58C",
        alert: "#D86C4A"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Consolas", "monospace"]
      },
      boxShadow: {
        dossier: "0 24px 80px rgba(7, 18, 31, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;

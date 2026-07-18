import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#050505",
        pearl: "#FFFFFF",
        gold: {
          light: "#E6C875",
          DEFAULT: "#D4AF37",
          dark: "#B38D35",
        },
        platinum: {
          light: "#EDF3FF",
          DEFAULT: "#C7D6EC",
          dark: "#8CA3C4",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(180deg, #E6C875 0%, #B38D35 100%)",
        "shimmer-gradient":
          "linear-gradient(115deg, transparent 25%, rgba(199,214,236,0.55) 45%, rgba(230,200,117,0.75) 50%, rgba(199,214,236,0.55) 55%, transparent 75%)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;

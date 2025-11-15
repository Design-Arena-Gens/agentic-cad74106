import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#cfe5ff",
          200: "#9fcbff",
          300: "#6fb2ff",
          400: "#3f98ff",
          500: "#0f7eff",
          600: "#0c64cc",
          700: "#094a99",
          800: "#063066",
          900: "#031633"
        }
      }
    }
  },
  plugins: []
};

export default config;

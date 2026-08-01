/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        secondary: "#1E293B",
        accent: "#38BDF8",
        surface: "#F8FAFC",
        gold: "#EAB308",
        success: "#22C55E",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      backgroundImage: {
        aurora: "radial-gradient(60% 60% at 20% 20%, rgba(56,189,248,0.25) 0%, rgba(56,189,248,0) 60%), radial-gradient(50% 50% at 80% 30%, rgba(234,179,8,0.18) 0%, rgba(234,179,8,0) 60%), radial-gradient(70% 70% at 50% 100%, rgba(15,23,42,0.6) 0%, rgba(15,23,42,0) 60%)",
        "gold-gradient": "linear-gradient(135deg, #EAB308 0%, #F8D34A 50%, #EAB308 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.25)",
        glow: "0 0 40px rgba(56,189,248,0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        drift: {
          "0%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(20px,-30px) scale(1.05)" },
          "100%": { transform: "translate(0,0) scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        drift: "drift 12s ease-in-out infinite",
        shimmer: "shimmer 2.2s linear infinite",
      },
    },
  },
  plugins: [],
}

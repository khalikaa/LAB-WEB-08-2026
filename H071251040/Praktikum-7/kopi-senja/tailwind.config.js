/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        kopi: {
          tua: "#5a3a2a",
          sedang: "#8a5a3c",
          karamel: "#c0813f",
          krem: "#f4efeb",
          rak: "#9b8c82",
        },
      },
      backgroundImage: {
        garis:
          "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0, rgba(255,255,255,0.35) 2px, transparent 2px, transparent 6px)",
        rak: "linear-gradient(#a99a90, #85766c)",
        biji:
          "radial-gradient(ellipse at 30% 30%, #8a5a3c 0 3px, transparent 4px), radial-gradient(ellipse at 70% 60%, #8a5a3c 0 3px, transparent 4px), radial-gradient(ellipse at 40% 80%, #8a5a3c 0 3px, transparent 4px)",
      },
      boxShadow: {
        rak: "0 14px 18px -8px rgba(90,58,42,0.35)",
      },
      fontFamily: {
        jost: ["Jost", "Futura", "sans-serif"],
        judul: ["Oswald", "Impact", "sans-serif"],
        logo: ["Pacifico", "cursive"],
      },
    },
  },
  plugins: [],
};

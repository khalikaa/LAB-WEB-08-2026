/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        malam: "#1E1530",
        senja: "#2F2147",
        rona: "#F0507F",
        emas: "#F6C453",
        kertas: "#F6F1E7",
        tinta: "#231A33",
        mint: "#7EE0B5",
      },
      fontFamily: {
        judul: ['"Young Serif"', "serif"],
        badan: ["Figtree", "sans-serif"],
      },
      boxShadow: {
        tebal: "0 6px 0 #130B20, 0 20px 30px rgba(0,0,0,0.45)",
        "tombol-emas": "0 4px 0 #A87A12, 0 8px 12px rgba(0,0,0,0.35)",
        "tombol-rona": "0 4px 0 #A8244F, 0 8px 12px rgba(0,0,0,0.35)",
        "tombol-kertas": "0 4px 0 #A79F8C, 0 8px 12px rgba(0,0,0,0.35)",
        "tombol-senja": "0 3px 0 #130B20",
        lekuk: "inset 0 3px 6px rgba(0,0,0,0.5)",
      },
      keyframes: {
        melayang: {
          from: { transform: "translateY(24%)" },
          to: { transform: "translateY(17%)" },
        },
      },
      animation: {
        melayang: "melayang 7s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
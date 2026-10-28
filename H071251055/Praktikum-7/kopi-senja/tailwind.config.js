/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        espresso: '#2a1810',
        kopi: '#4a2c1a',
        amber: '#c9822b',
        amberdeep: '#a35f14',
        parchment: '#f0e0bc',
        cream: '#fbf2da',
        brick: '#9c3b1f',
      },
      fontFamily: {
        display: ['"Alfa Slab One"', 'Georgia', 'serif'],
        body: ['"Courier Prime"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        hard: '5px 5px 0 0 #2a1810',
        'hard-sm': '3px 3px 0 0 #2a1810',
      },
    },
  },
  plugins: [],
}

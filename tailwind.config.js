/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      animation: {
        'gradient-move': 'gradient-move 15s linear infinite',
      },
      keyframes: {
        'gradient-move': {
          '0%': { 'background-position': '0% 0%' },
          '100%': { 'background-position': '25px 25px' },
        }
      }
    },
  },
  plugins: [],
}
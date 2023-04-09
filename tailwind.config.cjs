/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#0B1218',
        'main-bg': '#151F2B',
        'secondary-bg': '#121A24',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
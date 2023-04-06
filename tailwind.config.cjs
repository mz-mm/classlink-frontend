/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-dark': '#0B1218',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F7F7FD",
        secondary: "#D9DCE3",
        tertiary: "#6E62E5",
        "login-bg": "#F7F7FD",
        "login-text": "#464151",
        placeholder: "#F7F7FD",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({})],
};

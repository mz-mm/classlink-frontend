/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#E1E5EE',
                'secondary': '#CCCFD7',
                'tertiary': '#6E62E5',
                'login-bg': '#F7F7FA',
                'login-text': '#464151',
            }
        },
    },
    plugins: [
        require('tailwind-scrollbar')({})
    ],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // Incluye todo
    "!./src/app/login/**/*.{html,ts}" // Excluye los archivos dentro de src/app/login
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.html.erb',
    './app/components/**/*.rb',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-debug-screens'),
  ],
}

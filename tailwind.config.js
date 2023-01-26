/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.html.erb',
    './app/components/**/*.rb',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwindcss-debug-screens'),
  ],
}

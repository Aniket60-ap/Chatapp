/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"], // ✅ includes React files
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

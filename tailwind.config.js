/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      blur: {
        xs: '1px',
      },
      fontFamily: {
        BMJUA : ['@/assets/BMJUA_ttf.ttf'],
      },
    },
  },
  plugins: [],
}

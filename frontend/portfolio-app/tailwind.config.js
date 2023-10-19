/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    variants: {
      extend: {},
    },
    fontFamily: {
      heading: ["ArchivoBlack", "sans-serif"],
      body: ["Lato", "sans-serif"],
    },
  },
  plugins: ["@tailwindcss/typography"],
};

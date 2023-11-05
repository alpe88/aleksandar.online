/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
import plugin from "tailwindcss/plugin";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "375px",
      ...defaultTheme.screens,
    },
  },
  plugins: [
    "@tailwindcss/typography",
    tailwindcssAnimated,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-stroke-sm": (value) => {
            return {
              "-webkit-text-stroke": `0.1rem ${value}`,
            };
          },
          "text-stroke-base": (value) => {
            return {
              "-webkit-text-stroke": `0.2rem ${value}`,
            };
          },
          "text-stroke-lg": (value) => {
            return {
              "-webkit-text-stroke": `0.3rem ${value}`,
            };
          },
          "text-stroke-xl": (value) => {
            return {
              "-webkit-text-stroke": `0.5rem ${value}`,
            };
          },
        },
        { values: flattenColorPalette(theme("colors")) }
      );
    }),
  ],
};

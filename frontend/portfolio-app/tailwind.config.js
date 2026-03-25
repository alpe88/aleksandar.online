/** @type {import('tailwindcss').Config} */
import tailwindcssAnimated from "tailwindcss-animated";
import plugin from "tailwindcss/plugin";

export default {
  plugins: [
    tailwindcssAnimated,
    plugin(function ({ matchUtilities }) {
      matchUtilities(
        {
          "text-stroke-sm": (value) => ({
            "-webkit-text-stroke": `0.1rem ${value}`,
          }),
          "text-stroke-base": (value) => ({
            "-webkit-text-stroke": `0.2rem ${value}`,
          }),
          "text-stroke-lg": (value) => ({
            "-webkit-text-stroke": `0.3rem ${value}`,
          }),
          "text-stroke-xl": (value) => ({
            "-webkit-text-stroke": `0.5rem ${value}`,
          }),
        },
        {
          values: {
            black: "#000",
            white: "#fff",
          },
          type: ["color"],
        }
      );
    }),
  ],
};

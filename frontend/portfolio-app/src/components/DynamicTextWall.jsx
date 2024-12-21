import PropTypes from "prop-types";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Typography from "./Typography";
import { ANIMATION_DELAY } from "../definitions/animation";

function getIndecies(breakpoint) {
  const fullConfig = resolveConfig(tailwindConfig);
  const { screens } = fullConfig.theme;
  const largeScreens = Object.keys(screens).filter((_, index) => index >= 3);

  return largeScreens.includes(breakpoint)
    ? { linesOfText: 4, highlightIndex: 1 }
    : { linesOfText: 7, highlightIndex: 2 };
}
export default function DynamicTextWall({ breakpoint, text }) {
  const { repeat, highlight } = text;
  const { linesOfText, highlightIndex } = getIndecies(breakpoint);

  const TextElements = Array.from({ length: linesOfText }, (_, index) => {
    const delay = (1 + linesOfText - index) * 1000;
    const delayClassName = ANIMATION_DELAY[delay];
    return {
      variant: "body",
      size:
        index === highlightIndex
          ? "text-[1.35rem] sm:text-[2.7rem] lg:text-[5rem] xl:text-[7rem]"
          : "text-[0.9rem] sm:text-[1.7rem] lg:text-[2.3rem] xl:text-[5rem]",
      className: `tracking-wide xs:tracking-widest sm:tracking-[0.3em] lg:tracking-normal px-1 w-full font-weight-bold uppercase ${
        index === highlightIndex
          ? "text-white"
          : "text-black text-stroke-sm-[#fff]"
      } text-center font-[ArchivoBlack] animate-fade animate-duration-[5ms] ${delayClassName}`,
      text: index === highlightIndex ? highlight : repeat,
    };
  });

  return (
    <>
      {TextElements.map((config, index) => (
        <Typography
          key={index}
          variant={config.variant}
          size={config.size}
          className={config.className}
        >
          {config.text}
        </Typography>
      ))}
    </>
  );
}

DynamicTextWall.propTypes = {
  breakpoint: PropTypes.oneOf(
    Object.keys(resolveConfig(tailwindConfig).theme.screens) || null
  ).isRequired,
  text: PropTypes.shape({
    highlight: PropTypes.string.isRequired,
    repeat: PropTypes.string.isRequired,
  }),
};

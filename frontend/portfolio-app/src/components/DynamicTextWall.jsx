import PropTypes from "prop-types";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import Typography from "./Typography";

function getIndecies(breakpoint) {
  const fullConfig = resolveConfig(tailwindConfig);
  const { screens } = fullConfig.theme;
  const largeScreens = Object.keys(screens).filter((_, index) => index >= 3);

  return largeScreens.includes(breakpoint)
    ? { linesOfText: 4, highlightIndex: 1 }
    : { linesOfText: 7, highlightIndex: 2 };
}

const ANIMATION_DELAY = {
  2000: "animate-delay-[2s]",
  3000: "animate-delay-[3s]",
  4000: "animate-delay-[4s]",
  5000: "animate-delay-[5s]",
  6000: "animate-delay-[6s]",
  7000: "animate-delay-[7s]",
  8000: "animate-delay-[8s]",
  9000: "animate-delay-[9s]",
  10000: "animate-delay-[10s]",
};

export default function DynamicTextWall({ breakpoint }) {
  const { linesOfText, highlightIndex } = getIndecies(breakpoint);

  const TextElements = Array.from({ length: linesOfText }, (_, index) => {
    const delay = (1 + linesOfText - index) * 1000;
    const delayClassName = ANIMATION_DELAY[delay];
    return {
      variant: index === highlightIndex ? "h1" : "body",
      size: "text-[1.35rem] sm:text-[2.7rem] lg:text-[5rem] xl:text-[7rem]",
      className: `tracking-wide xs:tracking-widest sm:tracking-[0.3em] lg:tracking-normal px-1 w-full font-weight-bold uppercase ${
        index === highlightIndex
          ? "text-white"
          : "text-black text-stroke-sm-[#fff]"
      } text-center font-[ArchivoBlack] animate-fade animate-duration-[10ms] ${delayClassName}`,
      text: "aleksandar",
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
    Object.keys(resolveConfig(tailwindConfig).theme.screens)
  ).isRequired,
};

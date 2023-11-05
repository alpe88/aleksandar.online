import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

function getScreenSize(width) {
  const fullConfig = resolveConfig(tailwindConfig);
  const { screens } = fullConfig.theme;

  return Object.entries(screens).reduce((foundKey, [key, value]) => {
    const numericValue = parseInt(value);
    if (numericValue <= width) {
      if (!foundKey || numericValue > parseInt(screens[foundKey])) {
        return key;
      }
    }
    return foundKey;
  }, null);
}

export function useTailwindBreakpoints(width) {
  const [breakpoint, setBreakpoint] = useState(getScreenSize(width));

  useEffect(() => {
    setBreakpoint(getScreenSize(width));
  }, [breakpoint, width]);

  return breakpoint;
}

export function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

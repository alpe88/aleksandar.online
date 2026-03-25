import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../definitions/breakpoints";

function getScreenSize(width) {
  const screens = BREAKPOINTS;

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
  return getScreenSize(width);
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

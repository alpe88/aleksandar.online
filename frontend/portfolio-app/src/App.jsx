import { useRef } from "react";
import { useNavigationType, useLoaderData, Link } from "react-router-dom";
import { DynamicTextWall, Typography } from "./components";
import { TITLES } from "./definitions/social-media";

import { getDate, getMonthYear } from "./modifiers/dates";
import {
  useTailwindBreakpoints,
  useWindowWidth,
} from "./hooks/useTailwindBreakpoints";

function sorter(a, b) {
  return (
    getDate(getMonthYear(b)).getTime() - getDate(getMonthYear(a)).getTime()
  );
}

function truncateWithEllipsis(str, truncAt) {
  const truncatedStr = str.substring(0, truncAt);
  return `${truncatedStr}...`;
}

function App() {
  const windowWidth = useWindowWidth();
  console.log({ windowWidth });
  const breakpoint = useTailwindBreakpoints(windowWidth);
  console.log({ breakpoint });
  const navigationType = useNavigationType();
  console.log({ navigationType });
  const [
    { page: aboutMe },
    { "work-experience": workExperiences },
    { resources },
    { site_title: name, tagline, resume_url },
    { email, linkedin, github },
  ] = useLoaderData();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-4/6 bg-black animate-line">
        <DynamicTextWall breakpoint={breakpoint} />
      </div>
    </div>
  );
}

export default App;

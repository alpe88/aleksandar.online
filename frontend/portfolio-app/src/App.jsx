import { useEffect, useState } from "react";
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
  const [animationComplete, isAnimationComplete] = useState(false);
  const windowWidth = useWindowWidth();
  const breakpoint = useTailwindBreakpoints(windowWidth);

  const [
    { page: aboutMe },
    { "work-experience": workExperiences },
    { resources },
    { site_title: name, tagline, resume_url },
    { email, linkedin, github },
  ] = useLoaderData();

  const sortedWorkExperiences = workExperiences.sort((a, b) =>
    sorter(a.custom_fields.start_date[0], b.custom_fields.start_date[0])
  );

  const contactMe = [email, linkedin, github];

  useEffect(() => {
    if (!animationComplete) {
      setTimeout(() => {
        isAnimationComplete(true);
      }, 11000);
    }
  }, [animationComplete]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      {!animationComplete ? (
        <div className="flex flex-col justify-center items-center w-4/6 bg-black animate-line">
          <DynamicTextWall
            breakpoint={breakpoint}
            text={{ repeat: tagline, highlight: name }}
          />
        </div>
      ) : (
        <>
          <section
            id="about-aleksandar"
            className="flex items-center h-screen animate-fade animate-duration-[10ms]"
          >
            <em
              className="relative border-[1px] border-black p-6 
                            after:absolute after:top-[2rem] after:left-[-2rem] 
                            after:w-[95%] after:h-[95%] 
                            after:border-black after:border-[1px]"
            >
              <Typography
                variant="h1"
                size="text-[1.35rem] sm:text-[2.7rem] lg:text-[5rem] xl:text-[7rem]"
                className="tracking-wide xs:tracking-widest sm:tracking-[0.3em] lg:tracking-normal w-full font-weight-bold 
                uppercase text-center font-[ArchivoBlack]"
              >
                {name}
              </Typography>
              <Typography
                variant="body"
                size="text-[1.1rem] sm:text-[2.3rem] lg:text-[3.2rem] xl:text-[5rem]"
                className="lg:px-8 w-full font-[ArchivoBlack] text-center"
              >
                {tagline}
              </Typography>
              <>
                {contactMe.map((via, id) => {
                  const { iconUrl } = via;
                  return <img key={id} src={iconUrl} />;
                })}
              </>
            </em>
          </section>

          <section id="work-experience" className="w-full dotted">
            <em className="flex justify-end">
              <Typography
                variant="h2"
                size="text-[7rem] lg:text-[10rem] xl:text-[15rem]"
                className="p-2 bg-white border-1 border-black uppercase text-vertical text-white text-stroke-sm-[#000] lg:text-stroke-lg-[#000] font-[ArchivoBlack]"
              >
                Work
              </Typography>
            </em>

            <div className="work-experience flex flex-col timeline border-t-[0.3265rem] border-black bg-white">
              {sortedWorkExperiences.map((workExperience) => {
                const {
                  ID,
                  post_title,
                  post_content,
                  custom_fields: {
                    job_title: [jobTitle],
                    company_name: [company],
                    location: [location],
                    start_date: [startDate],
                    end_date: [endDate],
                    project_highlight: [highlight],
                  },
                  tags,
                } = workExperience;
                return (
                  <div
                    id={`work-period${ID}`}
                    className="w-full timeline-element border-black border-b-[0.3265rem]"
                    key={ID}
                  >
                    <Typography
                      variant="span"
                      className="font-ArchivoBlack font-weight-bold"
                      size="text-[3rem] lg:text-[4rem] xl:text-[7rem]"
                    >
                      from: {startDate} to: {endDate} I worked @
                    </Typography>
                    <Typography
                      variant="h3"
                      size="text-[3rem] lg:text-[4rem] xl:text-[7rem]"
                      className="font-ArchivoBlack"
                    >
                      {company}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default App;

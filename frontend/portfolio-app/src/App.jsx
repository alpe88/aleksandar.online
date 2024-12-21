import { useEffect, useState, Suspense } from "react";
import { useLoaderData, Link, Await } from "react-router-dom";
import { DynamicTextWall, Logo, Typography } from "./components";
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

function App() {
  const [animationComplete, isAnimationComplete] = useState(false);
  const windowWidth = useWindowWidth();
  const breakpoint = useTailwindBreakpoints(windowWidth);

  // fetchedData is a promise returned from your loader
  const { fetchedData } = useLoaderData();

  useEffect(() => {
    if (!animationComplete) {
      const timer = setTimeout(() => {
        isAnimationComplete(true);
      }, 11000);
      return () => clearTimeout(timer);
    }
  }, [animationComplete]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <Suspense
        fallback={
          <section
            id="about-aleksandar"
            className="flex items-center h-[60vh] lg:h-screen animate-fade animate-duration-500"
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
                aleksandar online
              </Typography>
              <Typography
                variant="body"
                size="text-[1.1rem] sm:text-[2.3rem] lg:text-[3.2rem] xl:text-[5rem]"
                className="lg:px-8 w-full font-[ArchivoBlack] text-center"
              >
                software engineer
              </Typography>
            </em>
          </section>
        }
      >
        <Await resolve={fetchedData}>
          {(data) => {
            // Destructure your array data
            const [
              { page: aboutMe },
              { "work-experience": workExperiences },
              { resources },
              { site_title: name, tagline, resume_url },
              { email, linkedin, github },
            ] = data;

            // 1) Filter to only include posts with "job" in their category_nicenames
            const ONLY_JOBS = workExperiences.filter((item) =>
              item.category_nicenames?.includes("job")
            );

            // 2) Sort the filtered items
            const WORK_EXPERIENCES_ALL_SORTED = ONLY_JOBS.sort((a, b) =>
              sorter(
                a.custom_fields.start_date[0],
                b.custom_fields.start_date[0]
              )
            );

            const contactMe = [email, linkedin, github];

            return !animationComplete ? (
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
                  className="flex items-center h-[60vh] lg:h-screen animate-fade animate-duration-500"
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
                    <div className="flex felx-row justify-center items-center">
                      {contactMe.map((via, id) => {
                        const { icon_url, url, handle } = via;
                        return (
                          <Link
                            key={id}
                            to={`${url}${handle}`}
                            target="_blank"
                            className="p-4 z-10"
                          >
                            <img
                              className="animate-fade animate-duration-500 px-4 w-[64px] color-black"
                              src={icon_url}
                              alt={handle}
                            />
                          </Link>
                        );
                      })}
                    </div>
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
                    {WORK_EXPERIENCES_ALL_SORTED.map((workExperience) => {
                      const {
                        ID,
                        custom_fields: {
                          job_title: [jobTitle],
                          company_name: [company],
                          location: [location],
                          start_date: [startDate],
                          end_date: [endDate],
                          project_highlight: [highlight],
                        },
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
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}

export default App;

import { Suspense, useState, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { DynamicTextWall, Typography } from "./components";
import {
  useTailwindBreakpoints,
  useWindowWidth,
} from "./hooks/useTailwindBreakpoints";

/**
 * 1) Quick Fallback for Suspense
 *    Shown only while the data is still loading.
 */
function QuickFallback() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="loader" />
    </div>
  );
}

/**
 * 2) The Animation Screen
 *    Shown once data is available, but we still want
 *    a special loading/intro animation to finish before
 *    revealing the final content.
 */
function LoadingAnimation({ onDone, breakpoint }) {
  // Example: auto-finish after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => onDone(), 7000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="w-4/6 bg-black animate-line flex flex-col justify-center items-center h-screen">
      <DynamicTextWall
        breakpoint={breakpoint}
        text={{
          repeat: "software engineer",
          highlight: "aleksandar",
        }}
      />
    </div>
  );
}

export default function App() {
  const [animationDone, setAnimationDone] = useState(false);
  const windowWidth = useWindowWidth();
  const breakpoint = useTailwindBreakpoints(windowWidth);

  // fetchedData is your loader's promise
  const { fetchedData } = useLoaderData();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      {/**
       * Wrap your <Await> in Suspense. Use QuickFallback for
       * the genuine "data is not here yet" scenario.
       */}
      <Suspense fallback={<QuickFallback />}>
        <Await resolve={fetchedData}>
          {(data) => {
            // Data is loaded. But we also want to wait for our animation to finish.
            if (!animationDone) {
              return (
                <LoadingAnimation
                  breakpoint={breakpoint}
                  onDone={() => setAnimationDone(true)}
                />
              );
            }

            // At this point, data is loaded AND the animation is done.
            // Render your final UI (filtered + sorted).
            const [
              { page: aboutMe },
              { resources },
              { site_title: name, tagline, resume_url },
              { email, linkedin, github },
            ] = data;

            const contactMe = [email, linkedin, github];

            return (
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
                    <div className="flex flex-row justify-center items-center">
                      {contactMe.map((via, id) => {
                        const { icon_url, url, handle } = via;
                        return (
                          <a
                            key={id}
                            href={`${url}${handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-4 z-10"
                          >
                            <img
                              className="animate-fade animate-duration-500 px-4 w-[64px] color-black"
                              src={icon_url}
                              alt={handle}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </em>
                </section>

              </>
            );
          }}
        </Await>
      </Suspense>
    </main>
  );
}

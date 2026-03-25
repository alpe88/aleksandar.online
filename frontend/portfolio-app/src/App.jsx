import PropTypes from "prop-types";
import { Suspense, useState, useEffect } from "react";
import { useLoaderData, Await } from "react-router-dom";
import { DynamicTextWall, Typography } from "./components";
import {
  useTailwindBreakpoints,
  useWindowWidth,
} from "./hooks/useTailwindBreakpoints";

/**
 * Rendered by Suspense while the route loader promise is still pending.
 * This is the true network/data fallback. Once the loader resolves,
 * the app switches to the intro animation below.
 */
function QuickFallback() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="loader" />
    </div>
  );
}

/**
 * Runs after route data has loaded, but before the final content is revealed.
 * This is separate from the Suspense fallback above.
 */
function LoadingAnimation({ onDone, breakpoint }) {
  // End the intro once its text animation has had time to complete.
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

LoadingAnimation.propTypes = {
  onDone: PropTypes.func.isRequired,
  breakpoint: PropTypes.string,
};

export default function App() {
  const [animationDone, setAnimationDone] = useState(false);
  const windowWidth = useWindowWidth();
  const breakpoint = useTailwindBreakpoints(windowWidth);

  // The loader returns an unresolved promise so Suspense can show QuickFallback.
  const { fetchedData } = useLoaderData();

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      {/* Suspense covers the pending loader promise; <Await> renders once it resolves. */}
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
            const [, , { site_title: name, tagline }, { email, linkedin, github }] =
              data;

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

import { site } from "@/site";
import { ctaPrimary, ctaSecondary } from "./cta";

// Act 1, Intrigue. A short pin over the world: the claim greets on landing
// (full at p = 0), then its lines slide out one by one as the visitor starts
// down, handing the screen to the wiring. Four text elements, no more.
export default function Hero() {
  return (
    <section id="top" data-sc-act="pin" data-sc-span="1.5" data-sc-drift="#050505">
      <div data-sc-stage className="spot flex flex-col justify-end [--spot-size:55%_65%] [--spot-x:18%] [--spot-y:78%]">
        {/* Lead-anchored on the same column as the header and every section. */}
        <div className="sc-wrap pb-[clamp(3rem,12vh,9rem)]">
          <h1 className="sc-display sc-display--lg max-[700px]:text-(length:--sc-t-2xl)">
            <span className="block" data-sc-cue="0 0.6 0" data-sc-kinetic="lines">
              AI, backend and the wiring
            </span>{" "}
            <span className="block text-ink-soft" data-sc-cue="0 0.6 0" data-sc-kinetic="lines">
              underneath.
            </span>
          </h1>
          <div data-sc-cue="0 0.5 0">
            <p className="sc-lede mt-6 text-ink-soft">
              Software engineer in Karachi building Python APIs, applied AI and automation workflows with FastAPI, Docker
              and AWS.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className={`${ctaPrimary} px-5 py-3`}
              >
                Get in touch
              </a>
              <a
                href={site.resume}
                download
                className={`${ctaSecondary} px-5 py-3`}
              >
                Download résumé
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

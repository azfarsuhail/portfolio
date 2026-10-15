import { site } from "@/site";
import HeroCanvas from "./HeroCanvas";

const spec = [
  ["Role", "Junior Software Engineer"],
  ["Open to", "Python backend · Applied AI · Automation"],
  ["Base", "Karachi, PK — remote or relocation"],
  ["Degree", "BSCS, IoBM — Jan 2027"],
] as const;

const btn =
  "inline-flex items-center justify-center border px-[18px] py-[13px] font-mono text-xs tracking-[.14em] uppercase no-underline transition-colors max-[520px]:flex-[1_1_100%] max-[520px]:py-[15px]";

export default function Hero() {
  return (
    <section
      id="top"
      className="wrap relative isolate overflow-hidden pt-[clamp(34px,7vw,72px)] pb-[clamp(46px,7vw,92px)]"
    >
      <HeroCanvas />
      <div className="relative grid gap-x-[clamp(24px,5vw,72px)] min-[861px]:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div>
          <span data-reveal className="mb-[18px] block font-mono text-[13px] tracking-[.28em] uppercase">
            {site.name}
          </span>
          <h1
            data-reveal
            className="font-disp text-[clamp(40px,8.4vw,104px)] leading-[.94] font-extrabold tracking-[-.035em] uppercase"
          >
            AI, backend
            <br />
            and the wiring
            <br />
            <em className="text-mute-lg not-italic">underneath.</em>
          </h1>
        </div>
        <div>
          <p data-reveal className="mt-[26px] max-w-[66ch] text-lg leading-[1.6]">
            I&apos;m Azfar, a software engineer based in Karachi. I work with Python, FastAPI, SQL, Docker and AWS to
            build APIs, automate workflows and connect AI capabilities to useful products.
          </p>
          <p data-reveal className="mt-3.5 max-w-[66ch] text-lg leading-[1.6]">
            Junior Software Engineer and final-year Computer Science student at IoBM. My work spans Python APIs, AI
            applications, video-processing pipelines and software testing.
          </p>
          <div data-reveal className="mt-[26px] flex flex-wrap gap-3">
            <a className={`${btn} border-ink bg-ink text-vh hover:border-mag-lt hover:bg-mag-lt`} href={`mailto:${site.email}`}>
              Get in touch
            </a>
            <a className={`${btn} border-rule hover:border-mag`} href="#projects">
              View projects
            </a>
            <a className={`${btn} border-rule hover:border-mag`} href={site.resume} download>
              Résumé
            </a>
          </div>
          <dl data-reveal className="mt-[26px] border-t border-rule min-[861px]:mt-[34px]">
            {spec.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[104px_1fr] gap-4 border-b border-rule-soft py-[9px] font-mono text-[13px]">
                <dt className="text-mute">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

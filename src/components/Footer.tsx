import { site } from "@/site";
import Year from "./Year";
import { ctaPrimary, ctaSecondary } from "./cta";

const links = [
  ["Email", `mailto:${site.email}`, site.email],
  ["GitHub", site.github, site.github],
  ["LinkedIn", site.linkedin, site.linkedin],
] as const;

const row = "grid grid-cols-[6.5rem_minmax(0,1fr)] items-baseline gap-4 border-b border-hairline py-3 text-sm";
// Long URLs wrap instead of pushing the page wider on phones.
const val = "min-w-0 justify-self-start [overflow-wrap:anywhere]";

// Act 7, Compelled. The page stops: one date, one action, held. Greet-and-hold
// cue so the last screen is never empty; spotlight on the stage, magnet on the
// primary CTA only. close-stage lets the stage grow past one screen on short
// phones instead of clipping the contact list.
export default function Footer() {
  return (
    <footer id="contact" data-sc-act="pin" data-sc-span="1.3" data-sc-drift="#0d0d0e" className="border-t border-hairline">
      <div
        data-sc-stage
        data-sc-spotlight
        className="close-stage spot flex flex-col justify-end [--spot-size:80%_75%] [--spot-x:25%] [--spot-y:70%]"
      >
        <div className="sc-wrap pt-24 pb-10" data-sc-cue="0 1 0 0">
          <div className="lg:grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-end lg:gap-x-[clamp(2.5rem,6vw,7rem)]">
            <div>
              <h2 className="sc-display sc-display--lg">Open to work from January 2027.</h2>
              <p className="sc-body mt-6">
                I&apos;m interested in Python backend, applied AI and software engineering opportunities. If you&apos;re
                building something in these areas, I&apos;d be happy to discuss how I could contribute.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`mailto:${site.email}`}
                  data-sc-magnet="0.28"
                  className={`${ctaPrimary} px-6 py-3.5`}
                >
                  Get in touch
                </a>
                <a
                  href={site.resume}
                  download
                  className={`${ctaSecondary} px-6 py-3.5`}
                >
                  Download résumé
                </a>
              </div>
            </div>
            <div className="mt-10 border-t border-hairline lg:mt-0">
              {links.map(([k, href, label]) => (
                <a key={k} href={href} className={`group no-underline ${row}`}>
                  <span className="sc-label">{k}</span>
                  <span className={`${val} underline-offset-4 transition-colors duration-150 group-hover:text-glow`}>{label}</span>
                </a>
              ))}
              <span className={row}>
                <span className="sc-label">Location</span>
                <span className={val}>{site.location}, open to remote and relocation</span>
              </span>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap gap-x-6 gap-y-1.5 text-sm text-ink-soft">
            <span>{site.name}</span>
            <span>Python backend · Applied AI</span>
            <span>Karachi</span>
            <Year />
          </div>
        </div>
      </div>
    </footer>
  );
}

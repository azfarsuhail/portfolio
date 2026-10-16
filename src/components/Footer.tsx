import { site } from "@/site";
import Year from "./Year";

const links = [
  ["Email", `mailto:${site.email}`, site.email],
  ["GitHub", site.github, site.github],
  ["LinkedIn", site.linkedin, site.linkedin],
  ["Résumé", site.resume, "Download PDF"],
] as const;

const row = "grid grid-cols-[112px_minmax(0,1fr)] gap-4 border-b border-rule-soft py-[11px] font-mono text-[13.5px]";
const key = "text-[11px] tracking-[.14em] text-mute uppercase";
// Long URLs wrap instead of pushing the page wider on phones.
const val = "min-w-0 justify-self-start [overflow-wrap:anywhere]";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="wrap mt-2 scroll-mt-12 border-t border-rule bg-panel pt-[clamp(34px,6vw,64px)] pb-[clamp(30px,5vw,52px)]"
    >
      {/* Wide screens: the pitch on the left, the contact list beside it. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-x-[clamp(40px,6vw,112px)]">
        <div>
          <h2 className="font-disp text-[clamp(30px,6vw,64px)] leading-[.98] lg:text-[clamp(30px,3.6vw,60px)] font-extrabold tracking-[-.035em] uppercase">
            Open to work
            <br />
            from <span className="text-mag">January 2027</span>.
          </h2>
          <p className="mt-5 mb-[26px] max-w-[62ch] text-lg leading-[1.6] text-mute lg:mb-0">
            I&apos;m interested in Python backend, applied AI and software engineering opportunities. If you&apos;re
            building something in these areas, I&apos;d be happy to discuss how I could contribute.
          </p>
        </div>
        <div className="max-w-[720px] border-t border-rule lg:max-w-none">
          {links.map(([k, href, label]) => (
            <a key={k} href={href} download={k === "Résumé" || undefined} className={`group no-underline ${row}`}>
              <span className={key}>{k}</span>
              <span className={`${val} decoration-mag underline-offset-4 group-hover:underline`}>{label}</span>
            </a>
          ))}
          <span className={row}>
            <span className={key}>Location</span>
            <span className={val}>{site.location} · open to remote and relocation</span>
          </span>
        </div>
      </div>
      <div className="mt-[30px] flex flex-wrap gap-x-[22px] gap-y-1.5 font-mono text-[11px] tracking-[.1em] text-mute uppercase">
        <span>{site.name}</span>
        <span>Python backend · Applied AI</span>
        <span>Karachi</span>
        <Year />
      </div>
    </footer>
  );
}

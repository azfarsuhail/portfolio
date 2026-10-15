import { site } from "@/site";

const links = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["skills", "Skills"],
  ["impact", "Impact"],
  ["training", "Training"],
  ["contact", "Contact"],
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-t-[3px] border-b border-t-mag border-b-rule bg-panel">
      <div className="wrap flex h-[46px] items-center gap-5 overflow-hidden">
        <a href="#top" className="font-disp text-sm font-extrabold tracking-[-.01em] whitespace-nowrap uppercase no-underline">
          {site.name}
        </a>
        <nav aria-label="Sections" className="hidden gap-4 whitespace-nowrap min-[901px]:flex">
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="border-b border-transparent py-0.5 font-mono text-[11px] tracking-[.14em] text-mute uppercase no-underline hover:border-mag hover:text-ink"
            >
              {label}
            </a>
          ))}
        </nav>
        <span className="ml-auto inline-flex items-center gap-2 font-mono text-xs tracking-[.05em] whitespace-nowrap text-mag-lt max-[520px]:text-[11px] max-[520px]:tracking-normal">
          <i className="block size-[7px] bg-mag" />
          {site.availability}
        </span>
      </div>
    </header>
  );
}

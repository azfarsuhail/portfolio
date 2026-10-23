import { site } from "@/site";
import { ctaSecondary } from "./cta";

// Filmic one-shot chrome: the wordmark and the one action, nothing to jump
// between. The fade is a scrim where the bar's text sits, not a solid band
// across the world.
export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-60 bg-linear-to-b from-canvas from-55% to-transparent pb-8">
      <div className="sc-wrap pointer-events-auto flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-semibold tracking-[.01em] whitespace-nowrap no-underline">
          {site.name}
        </a>
        <a
          href={`mailto:${site.email}`}
          className={`${ctaSecondary} px-4 py-2 text-sm whitespace-nowrap`}
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

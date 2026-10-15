import type { ReactNode } from "react";

export function Section({
  id,
  className = "",
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`wrap scroll-mt-12 pb-[clamp(46px,7vw,92px)] ${className}`}>
      {children}
    </section>
  );
}

export function Head({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div data-reveal className="pt-[clamp(30px,5vw,58px)]">
      <span className="mb-3 block font-mono text-[11px] tracking-[.16em] text-mag-lt uppercase">{n}</span>
      <h2 className="font-disp text-[clamp(27px,4vw,44px)] leading-none font-extrabold tracking-[-.03em]">
        {title}
      </h2>
      <p className="mt-3 max-w-[62ch] text-[16.5px] text-mute">{children}</p>
    </div>
  );
}

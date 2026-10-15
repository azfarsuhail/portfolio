import type { ReactNode } from "react";

// The ruled table used by "More projects" and "Training & Credentials".
const cols = "md:grid-cols-[60px_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-x-6";

export function Table({ head, className = "", children }: { head: [string, string, string]; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <div className={`hidden border-b border-rule py-2 md:grid ${cols}`}>
        {head.map((h) => (
          <span key={h} className="lab">
            {h}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

export function Flag({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2.5 font-mono text-[11px] font-normal tracking-[.14em] whitespace-nowrap text-mag-lt uppercase">
      {children}
    </span>
  );
}

export type RowData = { id: string; title: string; flag?: string; body: string; tech: ReactNode };

export function Row({ id, title, flag, body, tech }: RowData) {
  return (
    <article
      data-reveal
      className={`grid grid-cols-[52px_1fr] gap-x-3 border-b border-l-2 border-b-rule-soft border-l-transparent py-[18px] pl-3.5 transition-colors hover:border-l-mag hover:bg-panel-2 ${cols}`}
    >
      <span className="pt-1 font-mono text-xs text-mute">{id}</span>
      <div>
        <h3 className="font-disp text-[19px] leading-[1.25] font-bold tracking-[-.015em]">
          {title}
          {flag && <Flag>{flag}</Flag>}
        </h3>
        <p className="mt-[7px] max-w-[60ch] text-[16.5px] leading-normal">{body}</p>
      </div>
      <div className="col-start-2 pt-2.5 font-mono text-xs leading-[1.85] tracking-[.03em] text-mute md:col-start-auto md:pt-1">
        {tech}
      </div>
    </article>
  );
}

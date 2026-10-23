import type { ReactNode } from "react";

// The ruled table used by the project archive and the credentials.
const cols = "md:grid-cols-[4rem_minmax(0,1.5fr)_minmax(0,1fr)] md:gap-x-6";

export function Table({ head, className = "", children }: { head: [string, string, string]; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <div className={`hidden border-b border-hairline py-2 md:grid ${cols}`}>
        {head.map((h) => (
          <span key={h} className="sc-label">
            {h}
          </span>
        ))}
      </div>
      {children}
    </div>
  );
}

// A status tag, not an accent: ink-soft on a hairline, so the blue stays owned by actions.
export function Flag({ children }: { children: ReactNode }) {
  return (
    <span className="ml-2.5 inline-block rounded-sm border border-hairline-strong px-2 py-0.5 align-middle font-mono text-xs leading-[1.3] font-normal tracking-[.04em] whitespace-nowrap text-ink-soft">
      {children}
    </span>
  );
}

export type RowData = { id: string; title: string; flag?: string; body: string; tech: ReactNode };

export function Row({ id, title, flag, body, tech }: RowData) {
  return (
    <article className={`grid grid-cols-[3.25rem_1fr] gap-x-3 border-b border-hairline py-5 transition-colors duration-150 hover:bg-surface ${cols}`}>
      <span className="pt-1 font-mono text-xs text-ink-soft">{id}</span>
      <div>
        <h3 className="text-lg leading-snug font-semibold">
          {title}
          {flag && <Flag>{flag}</Flag>}
        </h3>
        <p className="mt-2 max-w-(--sc-measure) text-ink-soft">{body}</p>
      </div>
      <div className="col-start-2 pt-2.5 font-mono text-xs leading-[1.85] tracking-[.03em] text-ink-soft md:col-start-auto md:pt-1">
        {tech}
      </div>
    </article>
  );
}

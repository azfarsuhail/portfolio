import type { ReactNode } from "react";

// Eyebrows are rationed (one per three sections at most); the heading carries itself.
export function Head({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div>
      {eyebrow && <span className="sc-label mb-4 block text-glow">{eyebrow}</span>}
      <h2 className="sc-display sc-display--md">{title}</h2>
      {children && <p className="sc-body mt-4">{children}</p>}
    </div>
  );
}

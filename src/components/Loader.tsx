"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { site } from "@/site";

// The curtain before the world: a few nodes wire themselves together while the
// page, its fonts and the engine load. Rendered on the server so it covers the
// first paint. It lifts once the page has loaded, never before 0.7s (so it
// reads as intent, not a flash) and never after 6s (so it cannot trap the page).
//
// Browsers expose no true load percentage, so the number tracks real
// milestones: hydrated 30, then +30 each for fonts and the window load event,
// 100 when ready. The shown value eases toward the target so it counts, not jumps.
const NODES: [number, number][] = [[14, 64], [44, 24], [80, 40], [62, 84], [106, 70]];
const EDGES: [number, number][] = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4]];
const MIN_MS = 700;
const MAX_MS = 6000;
const FADE_MS = 500;

export default function Loader() {
  const [phase, setPhase] = useState<"on" | "off" | "gone">("on");
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let live = true;
    let target = 30; // parsed and hydrated
    let shown = 0;
    let raf = 0;
    const tick = () => {
      shown += (target - shown) * 0.12;
      if (target - shown < 0.5) shown = target;
      setPct(Math.round(shown));
      if (shown < 100) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setTimeout(() => {
        if (!live) return;
        setPhase("off");
        setTimeout(() => live && setPhase("gone"), FADE_MS);
      }, 150); // let 100% register before the curtain lifts
    };
    raf = requestAnimationFrame(tick);

    const step = () => {
      target = Math.min(target + 30, 90);
    };
    const loaded =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((r) => window.addEventListener("load", r, { once: true }));
    const fonts = document.fonts.ready;
    loaded.then(step);
    fonts.then(step);
    const cap = new Promise((r) => setTimeout(r, MAX_MS));
    Promise.race([Promise.all([loaded, fonts]), cap]).then(() => {
      // performance.now() counts from navigation, so this is time on screen.
      setTimeout(() => {
        target = 100;
      }, Math.max(0, MIN_MS - performance.now()));
    });
    return () => {
      live = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      className={`loader spot fixed inset-0 z-100 grid place-items-center bg-canvas transition-[opacity,visibility] duration-500 ease-(--sc-ease-out) [--spot-size:45%_50%] [--spot-x:50%] [--spot-y:46%] ${
        phase === "off" ? "invisible opacity-0" : ""
      }`}
    >
      <div className="flex flex-col items-center gap-9">
        <svg viewBox="0 0 120 100" aria-hidden className="w-44 overflow-visible">
          {EDGES.map(([a, b], i) => (
            <line
              key={i}
              x1={NODES[a][0]}
              y1={NODES[a][1]}
              x2={NODES[b][0]}
              y2={NODES[b][1]}
              pathLength={1}
              className="loader-edge"
              style={{ "--i": i } as CSSProperties}
            />
          ))}
          {NODES.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 1 ? 3.6 : 2.6} className="loader-node" style={{ "--i": i } as CSSProperties} />
          ))}
        </svg>
        <div className="flex flex-col items-center gap-3.5">
          <span className="text-lg font-semibold tracking-[.01em]">{site.name}</span>
          <span
            role="progressbar"
            aria-label="Loading"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            className="relative block h-0.5 w-36 overflow-hidden bg-hairline-strong"
          >
            <span
              className="absolute inset-0 origin-left bg-accent"
              style={{ transform: `scaleX(${pct / 100})` }}
            />
          </span>
          <span className="font-mono text-sm text-ink tabular-nums" aria-hidden>
            {pct}%
          </span>
          <span className="sc-label">Loading</span>
        </div>
      </div>
    </div>
  );
}

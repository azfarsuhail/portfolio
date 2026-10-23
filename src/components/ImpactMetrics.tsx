import { Head } from "./Section";

// [value, decimals, unit, what it measures]. The engine's count device ticks
// each value up once on entry; the server renders the final number, so it
// reads without JS and under reduced motion. Real figures only (owner's call).
const marks: [number, number, string, string][] = [
  [97.8, 1, "%", "Diagnostic accuracy on the final-year medical imaging system, at sub-second inference."],
  [14, 0, " days", "From nothing to a running AI highlight pipeline for live sport."],
  [70, 0, "%", "Lift in the marketing team's output once clipping stopped being manual."],
  [40, 0, "%", "Cut in execution time on the Hadoop and Hive analytics pipeline."],
  [2, 0, " min", "What proposal generation takes now. It used to take hours."],
  [100, 0, "+", "Client projects running through the automation I built at Websity."],
  [30, 0, " fps", "Sustained landmark tracking in the real-time hand-sign classifier."],
  [32, 0, "", "Concurrent users held by the medical platform's pipeline with no measurable degradation."],
];

export default function ImpactMetrics() {
  return (
    <section
      id="impact"
      data-sc-act="flow"
      data-sc-drift="#0b0b0d"
      className="sc-section spot relative border-t border-hairline [--spot-x:80%] [--spot-y:45%]"
    >
      <div className="sc-wrap">
        <div data-sc-in>
          <Head title="Impact">Results I am happy to be asked about in an interview.</Head>
        </div>
        <div
          className="mt-8 grid border-t border-hairline md:grid-cols-2 md:gap-x-[clamp(1.5rem,5vw,4rem)]"
          data-sc-in
          data-sc-stagger="60"
        >
          {marks.map(([to, dec, unit, text]) => (
            <div
              key={text}
              className="grid grid-cols-[7.5rem_1fr] items-baseline gap-x-5 border-b border-hairline py-5 md:grid-cols-[9rem_1fr]"
            >
              <b className="sc-display halo block text-[clamp(1.9rem,3.4vw,2.75rem)] leading-none">
                <span data-sc-count={`0 ${to.toFixed(dec)}`}>{to.toFixed(dec)}</span>
                {unit && <span className="pl-0.5 text-[.48em] tracking-normal text-ink-soft">{unit}</span>}
              </b>
              <span className="leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

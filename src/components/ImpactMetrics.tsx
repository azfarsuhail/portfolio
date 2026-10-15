import { Head, Section } from "./Section";

// [value, decimals, unit, what it measures]. Motion counts each value up on
// first scroll-in; the server renders the final number so it reads without JS.
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
    <Section id="impact" className="border-t border-rule">
      <Head n="Eight numbers" title="Impact">
        Results I am happy to be asked about in an interview.
      </Head>
      <div className="mt-7 grid border-t border-rule md:grid-cols-2 md:gap-x-[clamp(24px,5vw,64px)]">
        {marks.map(([to, dec, unit, text]) => (
          <div
            key={text}
            data-reveal
            className="grid grid-cols-[112px_1fr] items-baseline gap-x-[18px] border-b border-rule-soft py-[15px] md:grid-cols-[132px_1fr]"
          >
            <b className="block font-disp text-[clamp(26px,3.4vw,38px)] leading-none font-extrabold tracking-[-.035em]">
              <span data-count={to} data-dec={dec}>
                {to.toFixed(dec)}
              </span>
              {unit && <span className="pl-0.5 text-[.5em] tracking-normal text-mute-lg">{unit}</span>}
            </b>
            <span className="text-base leading-[1.45]">{text}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

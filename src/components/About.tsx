import { Head } from "./Section";

const paras = [
  "I enjoy the work that connects an idea to a functioning application: building the API, integrating services, handling data and debugging the parts that do not work as expected.",
  "At Traders Global Generation, I am developing a social platform with an integrated marketplace, Redis-based trend tracking and AWS hosting. I also support software quality assurance on an outsourced project. Previously, I worked on a Python and FFmpeg sports-highlight pipeline at Tapmad Entertainment and built API-connected Python tools at Websity Digital.",
  "My interest in applied AI has led me to team projects in scholarship discovery and code review, as well as an ongoing final-year project combining medical-image analysis with recommendations grounded in curated information. I was recognised as a Top Performer in the Pak Angels / ASPIRE Generative and Agentic AI training programme, and have completed five Claude Academy courses.",
  "I am completing my BS Computer Science at IoBM, with graduation expected in January 2027. I want to keep developing my skills in backend engineering, cloud-native applications and reliable AI systems.",
];

const glance = [
  ["Now", "Junior Software Engineer, Traders Global Generation"],
  ["Open to", "Python backend · Applied AI · Automation"],
  ["Base", "Karachi, PK (remote or relocation)"],
  ["Building", "Knee osteoarthritis analysis system, my final-year project"],
  ["Led", "ScholarCompass and CodeGuard AI teams"],
  ["Recognised", "Top Performer, Pak Angels / ASPIRE Cohort 11"],
  ["Studying", "BSCS, IoBM, graduating Jan 2027"],
  ["Learning", "Cloud-native systems, MLOps, model evaluation"],
] as const;

// Act 2, Orientation: the quiet act before the peak. Flow, fade-in only.
export default function About() {
  return (
    <section
      id="about"
      data-sc-act="flow"
      data-sc-drift="#08080a"
      className="sc-section spot relative border-t border-hairline [--spot-x:85%] [--spot-y:20%]"
    >
      <div className="sc-wrap grid gap-x-[clamp(2.5rem,6vw,7rem)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <div data-sc-in>
          <Head title="From an idea to something that runs." />
          <dl className="mt-8 border-t border-hairline">
            {glance.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-hairline py-3 text-sm">
                <dt className="font-mono text-xs leading-6 tracking-[.06em] text-ink-soft uppercase">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="sc-stack lg:pt-2" data-sc-stagger="70" data-sc-in>
          {paras.map((p) => (
            <p key={p.slice(0, 24)} className="max-w-(--sc-measure) text-pretty">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

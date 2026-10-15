import { Head, Section } from "./Section";

const paras = [
  "I enjoy the work that connects an idea to a functioning application: building the API, integrating services, handling data and debugging the parts that do not work as expected.",
  "At Traders Global Generation, I am developing a social platform with an integrated marketplace, Redis-based trend tracking and AWS hosting. I also support software quality assurance on an outsourced project. Previously, I worked on a Python and FFmpeg sports-highlight pipeline at Tapmad Entertainment and built API-connected Python tools at Websity Digital.",
  "My interest in applied AI has led me to team projects in scholarship discovery and code review, as well as an ongoing final-year project combining medical-image analysis with recommendations grounded in curated information. I was recognised as a Top Performer in the Pak Angels / ASPIRE Generative and Agentic AI training programme, and have completed three Claude Academy courses.",
  "I am completing my BS Computer Science at IoBM, with graduation expected in January 2027. I want to keep developing my skills in backend engineering, cloud-native applications and reliable AI systems.",
];

const glance = [
  ["Now", "Junior Software Engineer, Traders Global Generation"],
  ["Building", "Knee osteoarthritis analysis system — final-year project"],
  ["Led", "ScholarCompass and CodeGuard AI teams"],
  ["Recognised", "Top Performer, Pak Angels / ASPIRE Cohort 11"],
  ["Studying", "BSCS, IoBM — graduating Jan 2027"],
  ["Learning", "Cloud-native systems, MLOps, model evaluation"],
] as const;

export default function About() {
  return (
    <Section id="about">
      {/* Wide screens: heading and facts on the left, the story on the right. */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)] lg:gap-x-[clamp(40px,6vw,112px)]">
        <div>
          <Head n="Python backend & applied AI" title="About">
            From an idea to something that runs.
          </Head>
          <dl data-reveal className="mt-7 border-t border-rule">
            {glance.map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[104px_1fr] gap-4 border-b border-rule-soft py-[11px] font-mono text-[13px] leading-normal"
              >
                <dt className="text-mute">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-9 border-t border-rule pt-5 lg:mt-0 lg:border-t-0 lg:pt-[clamp(30px,5vw,58px)]">
          {paras.map((p) => (
            <p key={p.slice(0, 24)} data-reveal className="mt-5 max-w-[68ch] text-lg leading-[1.65] first:mt-0">
              {p}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

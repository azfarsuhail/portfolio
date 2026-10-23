import Image from "next/image";
import { Head } from "./Section";

type Role = {
  start: string;
  org: string;
  title: string;
  mark: string;
  logo?: string;
  length: string;
  status: string;
  now?: boolean;
  points?: string[];
  stack?: string;
};

const roles: Role[] = [
  {
    start: "Aug 2026",
    org: "Traders Global Generation",
    title: "Junior Software Engineer",
    mark: "TG",
    logo: "https://tse1.mm.bing.net/th/id/OIP.dtTiMBHic3j0BtqhbVCXNwAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    length: "Ongoing",
    status: "Current",
    now: true,
    points: [
      "Developing a social platform with an integrated marketplace.",
      "Working on Redis-based trend tracking and AWS EC2/RDS hosting.",
      "Supporting software QA for an outsourced project through functional and regression testing.",
      "Reproducing defects, reporting issues and checking fixes.",
    ],
    stack: "Redis / AWS EC2 / AWS RDS / backend services / testing tools",
  },
  {
    start: "Dec 2025",
    org: "Tapmad Entertainment",
    title: "Streaming Intern",
    mark: "TM",
    logo: "https://media.licdn.com/dms/image/v2/C4D0BAQEaVwOw9b7C5g/company-logo_200_200/company-logo_200_200/0/1676451794449/tapmad_logo?e=2147483647&v=beta&t=T0iOPOLYUvmjd0m0H23LMusbFYt9sMJsOAZJrSuJFB8",
    length: "to Feb 2026",
    status: "Completed",
    points: [
      "Built a Python/FastAPI pipeline with FFmpeg and Docker for sports clipping and highlight workflows, from empty repo to running system in 14 days.",
      "Integrated video-processing services and automated repetitive processing steps, lifting the marketing team's clipping output by roughly 70%.",
      "Debugged application workflows and service integrations.",
    ],
    stack: "Python / FastAPI / FFmpeg / Docker",
  },
  {
    start: "Jun 2025",
    org: "JCCAIR Journal",
    title: "Technical Administrator",
    mark: "JC",
    logo: "https://jccair.org/public/journals/1/favicon_en.png",
    length: "Ongoing",
    status: "Current",
    now: true,
    points: [
      "Deploying and operating the journal's Open Journal Systems (OJS) platform on Hostinger as sole technical administrator.",
      "Administering the hosting environment over SSH and configuring cron jobs for scheduled tasks.",
      "Troubleshooting application issues with PHP command-line tools.",
      "Integrating and configuring OJS plugins.",
    ],
    stack: "OJS / Hostinger / SSH / PHP CLI / Cron / server administration",
  },
  {
    start: "Jun 2025",
    org: "Websity Digital",
    title: "Software Engineer Intern",
    mark: "WD",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQEqgnwHOeWy1A/company-logo_200_200/B4EZweW1svG0AM-/0/1770035830184/websity_digital_logo?e=2147483647&v=beta&t=JqBNUHDI4O7Gb4-K7vH9pHxUMUKiVSs5AhFX1IS8YF0",
    length: "to Sep 2025",
    status: "Completed",
    points: [
      "Developed Python tools and Streamlit applications using external APIs.",
      "Worked on generative AI and prospect-analysis workflows, taking proposal generation from hours to about two minutes across 100+ client projects.",
      "Processed structured API responses, debugged integrations and iterated on business-facing applications.",
    ],
    stack: "Python / Streamlit / REST APIs / JSON",
  },
  {
    start: "Jan 2027",
    org: "BSCS, Institute of Business Management",
    title: "Karachi · exchange semester at TED University, Ankara",
    mark: "IB",
    logo: "https://tse2.mm.bing.net/th/id/OIP.ODj_op9ZFWMeRUvVmOeF9wHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    length: "Final year",
    status: "Expected",
    stack: "DS&A / software engineering / operating systems / networks / distributed systems / cloud computing",
  },
];

// Act 5, Trust: the record, dated and in order. Flow, fade-in only.
export default function Experience() {
  return (
    <section
      id="experience"
      data-sc-act="flow"
      data-sc-drift="#070708"
      className="sc-section spot relative border-t border-hairline [--spot-x:12%] [--spot-y:8%]"
    >
      <div className="sc-wrap">
        <div data-sc-in>
          <Head title="Experience">A junior role, a technical administrator role and two internships, most recent first.</Head>
        </div>
        <div className="mt-8 border-t border-hairline" data-sc-in data-sc-stagger="60">
        {roles.map((r) => (
          <article
            key={r.org}
            className={`group border-b border-hairline px-4 transition-colors duration-150 hover:bg-surface ${r.now ? "bg-surface/60" : ""}`}
          >
            <div className="grid gap-1 pt-5 pb-1.5 font-mono text-xs text-ink-soft md:grid-cols-[6rem_minmax(0,1fr)_6rem_6.5rem] md:items-baseline md:gap-x-5">
              <span>{r.start}</span>
              <span className="flex items-start gap-3.5 font-sans text-xl leading-tight font-semibold text-ink">
                {/* Monogram shows behind the logo, and stays if the image fails. */}
                <span
                  data-fb={r.mark}
                  className="relative mt-0.5 grid size-[38px] flex-none place-items-center overflow-hidden rounded-sm border border-hairline bg-canvas before:font-mono before:text-xs before:font-normal before:tracking-[.08em] before:text-ink-soft before:content-[attr(data-fb)]"
                >
                  {/* Unoptimized: 38px marks gain nothing from the optimizer, and
                      skipping it means no remote-host allowlist to abuse as a proxy. */}
                  {r.logo && (
                    <Image
                      src={r.logo}
                      alt=""
                      fill
                      unoptimized
                      className="object-contain opacity-85 grayscale transition-[filter,opacity] group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  )}
                </span>
                <span className="block min-w-0">
                  {r.org}
                  <small className="sc-label mt-1.5 block">{r.title}</small>
                </span>
              </span>
              <span>{r.length}</span>
              <span
                className={`tracking-[.1em] md:text-right ${
                  r.now
                    ? "text-glow after:ml-[7px] after:inline-block after:size-1.5 after:rounded-full after:bg-accent after:align-middle after:content-['']"
                    : ""
                }`}
              >
                {r.status}
              </span>
            </div>
            <div className="max-w-[74ch] pt-1 pb-6 md:ml-[7.25rem]">
              {r.points && (
                <ul>
                  {r.points.map((p) => (
                    <li
                      key={p}
                      className="relative py-1.5 pl-5 before:absolute before:top-[0.95em] before:left-0 before:h-px before:w-2.5 before:bg-ink-soft before:content-['']"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 font-mono text-xs leading-[1.9] tracking-[.04em] text-ink-soft">{r.stack}</div>
            </div>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

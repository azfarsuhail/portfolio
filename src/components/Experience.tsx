import Image from "next/image";
import { Head, Section } from "./Section";

type Role = {
  start: string;
  org: string;
  title: string;
  mark: string;
  logo: string;
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
      "Built a Python/FastAPI pipeline with FFmpeg and Docker for sports clipping and highlight workflows — from empty repo to running system in 14 days.",
      "Integrated video-processing services and automated repetitive processing steps, lifting the marketing team's clipping output by roughly 70%.",
      "Debugged application workflows and service integrations.",
    ],
    stack: "Python / FastAPI / FFmpeg / Docker",
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

export default function Experience() {
  return (
    <Section id="experience">
      <Head n="Three roles" title="Experience">
        A junior role and two internships, most recent first.
      </Head>
      <div className="mt-7 border-t border-rule">
        {roles.map((r) => (
          <article
            key={r.org}
            data-reveal
            className={`group border-b border-l-2 border-b-rule-soft pl-4 transition-colors last:border-b-rule hover:bg-panel ${
              r.now ? "border-l-mag bg-panel" : "border-l-transparent"
            }`}
          >
            <div className="grid gap-1 pt-4 pb-1.5 font-mono text-xs text-mute md:grid-cols-[96px_minmax(0,1fr)_96px_104px] md:items-baseline md:gap-x-5">
              <span>{r.start}</span>
              <span className="flex items-start gap-3.5 font-disp text-[clamp(19px,2.5vw,27px)] leading-[1.15] font-bold tracking-[-.02em] text-ink">
                {/* Monogram shows behind the logo, and stays if the image fails. */}
                <span
                  data-fb={r.mark}
                  className="relative mt-0.5 grid size-[38px] flex-none place-items-center overflow-hidden border border-rule bg-panel-2 before:font-mono before:text-xs before:font-normal before:tracking-[.08em] before:text-mute-lg before:content-[attr(data-fb)]"
                >
                  <Image
                    src={r.logo}
                    alt=""
                    fill
                    sizes="38px"
                    className="object-contain opacity-85 grayscale transition-[filter,opacity] group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </span>
                <span className="block min-w-0">
                  {r.org}
                  <small className="mt-[5px] block font-mono text-xs font-normal tracking-[.1em] text-mute uppercase">
                    {r.title}
                  </small>
                </span>
              </span>
              <span>{r.length}</span>
              <span
                className={`tracking-[.14em] md:text-right ${
                  r.now
                    ? "text-mag-lt after:ml-[7px] after:inline-block after:size-1.5 after:bg-mag after:align-middle after:content-['']"
                    : ""
                }`}
              >
                {r.status}
              </span>
            </div>
            <div className="max-w-[74ch] pt-0.5 pb-5 md:ml-[116px]">
              {r.points && (
                <ul>
                  {r.points.map((p) => (
                    <li
                      key={p}
                      className="relative py-[5px] pl-5 text-[16.5px] leading-normal before:absolute before:left-0 before:text-mute-lg before:content-['—']"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-[11px] font-mono text-xs leading-[1.9] tracking-[.04em] text-mute">{r.stack}</div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

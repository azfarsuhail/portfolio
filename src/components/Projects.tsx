import { Head } from "./Section";
import { Flag, Row, Table, type RowData } from "./Rows";

const featured: RowData[] = [
  {
    id: "P01",
    title: "CodeGuard AI",
    flag: "Team lead",
    body: "A code-review application that brings together static analysis, GitHub integration and structured developer feedback. I led the team and coordinated development, integration, testing and presentations.",
    tech: "Static analysis · GitHub integration · structured code review",
  },
  {
    id: "P02",
    title: "ScholarCompass",
    flag: "Team lead",
    body: "A scholarship discovery application combining search, eligibility checks and document-processing workflows, with a FastAPI backend behind a Next.js interface.",
    tech: "FastAPI · Next.js · API integration · caching · document processing",
  },
  {
    id: "P03",
    title: "Sports Highlight & Video-Clipping Pipeline",
    body: "A Python and FFmpeg workflow for turning video streams into clips and sports-highlight candidates. A FastAPI backend coordinates processing; I built and integrated the processing components and automated the workflow steps.",
    tech: "Python · FastAPI · FFmpeg · Docker",
  },
  {
    id: "P04",
    title: "Knee Osteoarthritis Analysis & Recommendation System",
    flag: "In progress",
    body: "My final-year project: a mobile system pairing knee X-ray analysis with personalised recommendations grounded in curated physiotherapy information. An academic prototype under development.",
    tech: "React Native · FastAPI · PostgreSQL · SQLite · NGINX · CNN · RAG · vector retrieval",
  },
];

const more: RowData[] = [
  {
    id: "P05",
    title: "Social Platform with Integrated Marketplace",
    flag: "In development",
    body: "Current work at Traders Global Generation: backend functionality and the infrastructure behind a social platform with marketplace features and Redis-based trend tracking.",
    tech: "Redis · AWS EC2 · AWS RDS",
  },
  {
    id: "P06",
    title: "Dockerized Django Application on AWS",
    body: "A Django application I built, containerised and deployed to EC2, handling the deployment configuration, networking and the issues along the way.",
    tech: "Python · Django · Docker · AWS EC2",
  },
  {
    id: "P07",
    title: "Cloud Video Processing Environment",
    body: "A production server on AWS EC2 running custom-compiled, hardware-accelerated video runtimes under Docker Compose, behind an Nginx reverse proxy, writing to locked-down object storage.",
    tech: "AWS EC2 · Docker Compose · Nginx · FFmpeg · S3 · Linux",
  },
  {
    id: "P08",
    title: "Big Data E-Commerce Pipeline",
    body: "Batch processing over large e-commerce datasets in Hadoop and Hive. Reworking the job structure and partitioning cut total execution time by about 40%.",
    tech: "Hadoop · Hive · HDFS · SQL",
  },
  {
    id: "P09",
    title: "Trendd: Commerce Analytics Platform",
    body: "An AI-assisted platform that ingests QuickBooks and Faire data, maps it automatically, and runs the ETL and reporting asynchronously through Celery and Redis.",
    tech: "Next.js · Django REST · Celery · Redis · PostgreSQL · Amazon S3",
  },
  {
    id: "P10",
    title: "Jujutsu Kaisen Hand Sign Classifier",
    body: "Real-time hand-sign recognition on a custom landmark dataset I collected myself, holding a steady 30 FPS. Trained in Colab, runs on a webcam.",
    tech: "Python · MediaPipe · OpenCV · scikit-learn · Google Colab",
  },
  {
    id: "P11",
    title: "vMix Broadcast Ad Panel",
    body: "An ad-insertion panel for live production, driven by a FastAPI backend over local network protocols with full runtime activity logging.",
    tech: "Python · FastAPI · REST · networking · logging",
  },
  {
    id: "P12",
    title: "Prospect Analysis Dashboard",
    body: "Scrapes, cleans and charts client data in one Streamlit app, which turned proposal writing for 100+ clients into a two-minute job.",
    tech: "Python · Streamlit · web scraping · Pandas",
  },
  {
    id: "P13",
    title: "GitHub Repo Auditor",
    body: "Pulls repository metrics through the GitHub API, runs them past Gemini for a written read, and files the results automatically.",
    tech: "Python · GitHub API · Gemini API · n8n · Apps Script",
  },
  {
    id: "P14",
    title: "Internal Image Generation Tool",
    body: "A DALL·E 3 front end for the content team, built to keep image output flowing without hitting a shared ChatGPT Pro ceiling.",
    tech: "Python · Streamlit · OpenAI API · DALL·E 3",
  },
  {
    id: "P15",
    title: "Conversational AI Web App",
    body: "A ChatGPT-style client with streaming responses and persisted threads, written in TypeScript against the OpenAI API.",
    tech: "Next.js · React · TypeScript · OpenAI API",
  },
  {
    id: "P16",
    title: "Phone Data Enrichment App",
    body: "Takes raw phone-number records and runs them through an automated enrichment and validation pipeline before handoff.",
    tech: "Python · REST APIs · Pandas · data pipelines",
  },
];

const item = "rail-item w-[min(80vw,27rem)] shrink-0";

// Act 4, Conviction. A pan rail: the heading is the first item (already in view),
// the four builds settle in as it travels and lean toward the pointer, and a
// closing note points at the archive. Reduced motion turns it into a native
// horizontal scroll region (the engine's floor).
export default function Projects() {
  return (
    <>
      <section id="projects" data-sc-act="pan" data-sc-span="2.6" data-sc-drift="#0a0a0c" className="border-t border-hairline">
        <div data-sc-stage className="spot flex items-center [--spot-size:60%_60%] [--spot-x:30%] [--spot-y:50%]">
          <div data-sc-pan="0.04" className="items-center gap-6 px-(--sc-gutter) pt-16">
            <div className={`${item} pr-4`} style={{ "--i": 0 } as React.CSSProperties}>
              <Head eyebrow="Sixteen builds" title="Projects">
                Four here: two team builds I led, a media pipeline and my final-year system. The other twelve are listed
                below.
              </Head>
            </div>
            {featured.map((p, i) => (
              <div key={p.id} className={item} style={{ "--i": i + 1 } as React.CSSProperties}>
                <article
                  data-sc-tilt="6"
                  className="flex min-h-[25rem] flex-col rounded-md border border-hairline bg-surface p-7 shadow-[var(--sc-e2),var(--sc-edge)] transition-colors duration-150 hover:border-accent md:p-8"
                >
                  <span className="font-mono text-xs text-ink-soft">{p.id}</span>
                  <h3 className="mt-3 text-xl leading-tight font-semibold text-balance">
                    {p.title}
                    {p.flag && <Flag>{p.flag}</Flag>}
                  </h3>
                  <p className="mt-3 text-ink-soft">{p.body}</p>
                  <div className="mt-auto pt-6 font-mono text-xs leading-[1.85] tracking-[.03em] text-ink-soft">
                    {p.tech}
                  </div>
                </article>
              </div>
            ))}
            <div className={`${item} w-[min(70vw,18rem)]`} style={{ "--i": featured.length + 1 } as React.CSSProperties}>
              {/* No links inside the rail: a focused link here would sit translated off-screen. */}
              <p className="text-lg text-ink-soft">
                Twelve more, from a Hadoop pipeline to a hand-sign classifier, in the archive below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="archive" data-sc-act="flow" className="sc-wrap relative scroll-mt-20 pt-4 pb-(--sc-section)">
        <details className="group">
          <summary className="sc-label flex cursor-pointer list-none justify-between border-y border-hairline py-4 transition-colors duration-150 hover:text-ink after:text-glow after:content-['+'] group-open:after:content-['−'] [&::-webkit-details-marker]:hidden">
            More projects ({more.length})
          </summary>
          <Table head={["Ref", "Project", "Stack"]}>
            {more.map((p) => (
              <Row key={p.id} {...p} />
            ))}
          </Table>
        </details>
      </section>
    </>
  );
}

import { Head } from "./Section";
import SkillsConstellation from "./SkillsConstellation";

const groups: [string, string[]][] = [
  ["Languages", ["Python", "SQL", "TypeScript", "JavaScript", "Java", "C++", "C"]],
  ["Backend & APIs", ["FastAPI", "Django", "Django REST Framework", "SQLModel", "Uvicorn", "REST APIs", "external API integration", "webhooks & JSON"]],
  ["Applied AI", ["generative AI apps", "RAG & vector retrieval", "prompt engineering", "structured AI workflows", "agentic workflows", "AI service integration", "CNN image analysis", "scikit-learn", "OpenCV", "MediaPipe", "Whisper", "OpenAI", "Gemini"]],
  ["Video & media", ["FFmpeg", "hardware-accelerated transcoding", "real-time processing", "vMix integration", "workflow automation"]],
  ["Infrastructure", ["Docker", "Docker Compose", "Kubernetes", "NGINX", "Linux", "Git", "GitHub", "GitHub Actions", "CI/CD", "secrets management"]],
  ["Cloud", ["AWS EC2", "AWS RDS", "AWS S3", "Azure", "Vercel", "object storage", "production server config"]],
  ["Data", ["PostgreSQL", "MySQL", "SQLite", "Redis", "Kafka", "Hadoop", "Hive", "Pandas", "NumPy"]],
  ["Front end", ["React", "Next.js", "React Native", "Expo", "Tailwind", "shadcn/ui", "Streamlit"]],
  ["Quality", ["functional & regression testing", "defect reproduction & fix verification", "PyTest", "API & integration debugging", "requirements & architecture docs", "iterative prototyping"]],
  ["Foundations", ["data structures & algorithms", "operating systems", "networks", "distributed systems", "cloud computing", "OOP"]],
  ["Learning next", ["cloud-native systems", "MLOps", "model evaluation", "production AI engineering"]],
];

// Act 3, the peak. md and up: a pinned stage with the page's largest span. Its
// first fifth is the signature morph (NodeField flies the wiring onto the map),
// the rest is the hover. Below md the act is not rendered and the list below
// is the whole of Skills; it is the accessible source of truth at every width.
export default function Skills() {
  return (
    <>
      <section data-sc-act="pin" data-sc-span="3" data-sc-drift="#0d0d0e" className="hidden md:block">
        <div data-sc-stage aria-hidden className="spot [--spot-size:75%_70%] [--spot-x:50%] [--spot-y:58%]">
          <div className="sc-wrap flex h-full flex-col pt-24 pb-10">
            <p className="sc-display sc-display--md">The stack, mapped.</p>
            <p className="sc-label mt-3">Point at a star to light up its cluster</p>
            <div className="mt-6 min-h-0 flex-1">
              <SkillsConstellation />
            </div>
          </div>
        </div>
      </section>

      <section id="skills" data-sc-act="flow" className="sc-section relative border-t border-hairline">
        <div className="sc-wrap">
          <div data-sc-in>
            <Head title="Skills">Grouped the way I actually reach for it, not by how long the list looks.</Head>
          </div>
          <div className="mt-8 border-t border-hairline" data-sc-in data-sc-stagger="40">
            {groups.map(([k, items]) => (
              <div
                key={k}
                className="grid items-baseline gap-2 border-b border-hairline py-4 md:grid-cols-[12rem_1fr] md:gap-x-6"
              >
                <h3 className="sc-label">{k}</h3>
                <ul className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <li
                      key={s}
                      className="rounded-sm border border-hairline bg-surface px-2.5 py-1 text-sm leading-normal transition-colors duration-150 hover:border-accent hover:text-glow"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

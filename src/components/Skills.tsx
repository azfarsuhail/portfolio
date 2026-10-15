import { Head, Section } from "./Section";
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

export default function Skills() {
  return (
    <Section id="skills" className="border-y border-rule bg-panel">
      <Head n={`${groups.length} groups`} title="Skills">
        Grouped the way I actually reach for it, not by how long the list looks.
      </Head>
      <SkillsConstellation />
      <div className="mt-7 border-t border-rule">
        {groups.map(([k, items]) => (
          <div
            key={k}
            data-reveal
            className="grid items-baseline gap-[5px] border-b border-rule-soft py-[13px] md:grid-cols-[190px_1fr] md:gap-x-6"
          >
            <h3 className="lab">{k}</h3>
            <ul className="flex flex-wrap gap-2">
              {items.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-rule bg-panel-2 px-3 py-[5px] font-mono text-[12.5px] leading-[1.4] transition-colors hover:border-mag hover:text-mag-lt"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

// The stack as a broadcast ticker: marks at text size, monochrome, inline
// with their labels. Each row renders twice so the -50% loop is seamless.
type Item = [icon: string | null, label: string];

const rows: Item[][] = [
  [
    ["i-python", "Python"], ["i-typescript", "TypeScript"], ["i-fastapi", "FastAPI"], ["i-django", "Django"],
    ["i-react", "React / Native"], ["i-nextdotjs", "Next.js"], ["i-expo", "Expo"], ["i-tailwindcss", "Tailwind"],
    ["i-streamlit", "Streamlit"], ["i-postgresql", "PostgreSQL"], ["i-redis", "Redis"], ["i-apachekafka", "Kafka"],
    ["i-apachehadoop", "Hadoop"], ["i-apachehive", "Hive"], ["i-pandas", "pandas"], ["i-numpy", "NumPy"],
    ["i-celery", "Celery"],
  ],
  [
    ["i-docker", "Docker"], ["i-kubernetes", "Kubernetes"], ["i-nginx", "Nginx"], ["i-linux", "Linux"],
    ["i-githubactions", "GitHub Actions"], ["i-git", "Git"], [null, "AWS"], [null, "Azure"], ["i-vercel", "Vercel"],
    ["i-ffmpeg", "FFmpeg"], ["i-opencv", "OpenCV"], ["i-mediapipe", "MediaPipe"], ["i-scikitlearn", "scikit-learn"],
    [null, "OpenAI"], ["i-googlegemini", "Gemini"], ["i-n8n", "n8n"], ["i-postman", "Postman"],
  ],
];

const anim = ["motion-safe:animate-tk-a", "motion-safe:animate-tk-b"];

export default function Ticker() {
  return (
    <div aria-hidden className="group border-y border-rule bg-panel">
      {rows.map((row, r) => (
        <div key={r} className={`overflow-hidden ${r ? "border-t border-rule-soft" : ""}`}>
          <div className={`flex w-max group-hover:[animation-play-state:paused] ${anim[r]}`}>
            {[...row, ...row].map(([icon, label], i) => (
              <span
                key={i}
                className="flex items-center gap-[9px] border-r border-rule-soft px-5 py-3 font-mono text-[13px] tracking-[.05em] whitespace-nowrap text-mute transition-colors hover:text-ink max-[640px]:px-[15px] max-[640px]:py-2.5 max-[640px]:text-xs"
              >
                {icon && (
                  <svg className="size-[15px] flex-none fill-current max-[640px]:size-[13px]">
                    <use href={`/icons.svg#${icon}`} />
                  </svg>
                )}
                {label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

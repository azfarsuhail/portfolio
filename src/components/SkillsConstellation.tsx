"use client";

import { useEffect, useRef } from "react";
import { mulberry32 } from "@/lib/random";

// A 2D-canvas map of the stack: one star per skill, grouped into clusters.
// Hovering (or touching) near a star lights up its whole cluster. Decorative
// only: the pill list in Skills.tsx is the accessible source of truth.

type Level = "Expert" | "Proficient" | "Comfortable";
type ClusterId = "lang" | "backend" | "data" | "ai" | "frontend" | "cloud";
type Rgb = [number, number, number];

type Skill = {
  id: string;
  name: string;
  cluster: ClusterId;
  level: Level;
  brandColor: string;
  /** Anchor position, normalised 0–1 within the canvas. */
  x: number;
  y: number;
  connections: string[];
};

const CLUSTERS: Record<ClusterId, { label: string; color: string; at: [number, number] }> = {
  frontend: { label: "Frontend & Web", color: "#38bdf8", at: [0.15, 0.28] },
  lang: { label: "Languages & Core Tools", color: "#7aa7ff", at: [0.5, 0.27] },
  ai: { label: "AI/ML, Vision & Media", color: "#e979df", at: [0.85, 0.28] },
  backend: { label: "Backend & Systems", color: "#2dd4bf", at: [0.15, 0.71] },
  data: { label: "Data & Big Data", color: "#f59e0b", at: [0.5, 0.72] },
  cloud: { label: "Cloud & DevOps", color: "#60a5fa", at: [0.85, 0.71] },
};

// [id, name, level, brandColor, connections]. The first skill in each cluster
// is its hub and sits at the centre; the rest ring around it.
// ponytail: levels are placeholder self-ratings; review them before publishing.
type Row = [string, string, Level, string, string[]];
const ROWS: Record<ClusterId, Row[]> = {
  lang: [
    ["python", "Python", "Expert", "#3776ab", ["typescript", "sql", "javascript", "java", "cpp", "git", "fastapi", "pandas", "sklearn"]],
    ["typescript", "TypeScript", "Proficient", "#3178c6", ["javascript", "react", "nextjs"]],
    ["javascript", "JavaScript", "Proficient", "#f7df1e", ["java"]],
    ["java", "Java", "Comfortable", "#ed8b00", ["cpp"]],
    ["cpp", "C++", "Comfortable", "#00599c", []],
    ["git", "Git", "Proficient", "#f05032", ["sql", "gha"]],
    ["sql", "SQL", "Proficient", "#e38c00", ["postgres", "sqlite"]],
  ],
  backend: [
    ["fastapi", "FastAPI", "Expert", "#009688", ["django", "drf", "rest", "celery", "webhooks", "pytest", "postgres", "docker", "openai"]],
    ["django", "Django", "Proficient", "#44b78b", ["drf"]],
    ["drf", "Django REST", "Proficient", "#e04e39", ["rest"]],
    ["rest", "REST APIs", "Expert", "#61afef", ["webhooks"]],
    ["webhooks", "Webhooks", "Proficient", "#c73a63", []],
    ["pytest", "PyTest", "Proficient", "#0a9edc", ["celery", "gha"]],
    ["celery", "Celery", "Comfortable", "#b6de64", ["redis"]],
  ],
  data: [
    ["postgres", "PostgreSQL", "Proficient", "#4169e1", ["redis", "sqlite", "kafka", "hadoop", "hive", "pandas", "aws"]],
    ["redis", "Redis", "Proficient", "#ff4438", ["kafka"]],
    ["sqlite", "SQLite", "Proficient", "#44a8e0", ["pandas"]],
    ["pandas", "Pandas", "Proficient", "#a08cff", ["hive"]],
    ["hive", "Hive", "Comfortable", "#fdee21", ["hadoop"]],
    ["hadoop", "Hadoop", "Comfortable", "#66ccff", ["kafka"]],
    ["kafka", "Kafka", "Comfortable", "#d6d3cc", []],
  ],
  ai: [
    ["openai", "OpenAI", "Proficient", "#10a37f", ["gemini", "rag", "whisper", "sklearn", "opencv", "mediapipe", "ffmpeg"]],
    ["gemini", "Gemini", "Proficient", "#8e75b2", ["rag"]],
    ["rag", "RAG", "Proficient", "#e979df", ["whisper"]],
    ["whisper", "Whisper", "Comfortable", "#74aa9c", ["ffmpeg"]],
    ["ffmpeg", "FFmpeg", "Expert", "#5cb85c", ["opencv", "docker"]],
    ["opencv", "OpenCV", "Proficient", "#5c3ee8", ["mediapipe"]],
    ["mediapipe", "MediaPipe", "Proficient", "#0097a7", ["sklearn"]],
    ["sklearn", "scikit-learn", "Proficient", "#f7931e", []],
  ],
  frontend: [
    ["react", "React", "Proficient", "#61dafb", ["nextjs", "rn", "expo", "tailwind", "streamlit"]],
    ["nextjs", "Next.js", "Proficient", "#e8e5de", ["tailwind", "vercel"]],
    ["tailwind", "Tailwind", "Proficient", "#38bdf8", []],
    ["streamlit", "Streamlit", "Expert", "#ff4b4b", ["python"]],
    ["expo", "Expo", "Comfortable", "#a3a3ff", ["rn"]],
    ["rn", "React Native", "Proficient", "#58c4dc", []],
  ],
  cloud: [
    ["docker", "Docker", "Expert", "#2496ed", ["aws", "k8s", "nginx", "linux", "gha", "vercel"]],
    ["aws", "AWS", "Proficient", "#ff9900", ["nginx"]],
    ["nginx", "NGINX", "Proficient", "#009639", ["linux"]],
    ["linux", "Linux", "Proficient", "#fcc624", ["k8s"]],
    ["k8s", "Kubernetes", "Comfortable", "#326ce5", []],
    ["gha", "GitHub Actions", "Proficient", "#2088ff", ["vercel"]],
    ["vercel", "Vercel", "Proficient", "#e8e5de", []],
  ],
};

// ---- colour: every highlighted label is lifted until it clears WCAG AA ----
const BG: Rgb = [18, 18, 20]; // section background, --color-panel
const INK: Rgb = [232, 229, 222];
const hex = (h: string): Rgb => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const lum = (c: Rgb) => {
  const [r, g, b] = c.map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a: Rgb, b: Rgb) => {
  const [hi, lo] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (hi + 0.05) / (lo + 0.05);
};
/** Mix a brand colour toward ink until it reaches 4.5:1 on the background. */
function readable(color: string): Rgb {
  const c = hex(color);
  for (let t = 0; t <= 1; t += 0.05) {
    const m = c.map((v, i) => Math.round(v + (INK[i] - v) * t)) as Rgb;
    if (contrast(m, BG) >= 4.5) return m;
  }
  return INK;
}
const css = ([r, g, b]: Rgb, a = 1) => `rgba(${r},${g},${b},${a})`;

// Idle labels are ink at this alpha over the panel; fail the build if a
// palette change ever drops them below AA.
const IDLE_ALPHA = 0.62;
if (contrast(INK.map((v, i) => v * IDLE_ALPHA + BG[i] * (1 - IDLE_ALPHA)) as Rgb, BG) < 4.5) {
  throw new Error("SkillsConstellation: idle label colour is below WCAG AA");
}

// ---- layout: hub at the cluster centre, the rest on a jittered ellipse ----
const RX = 0.115;
const RY = 0.17;
const rand = mulberry32(11);

const SKILLS: Skill[] = (Object.keys(ROWS) as ClusterId[]).flatMap((cluster, ci) => {
  const [cx, cy] = CLUSTERS[cluster].at;
  const rows = ROWS[cluster];
  const ring = rows.length - 1;
  return rows.map(([id, name, level, brandColor, connections], i) => {
    if (i === 0) return { id, name, cluster, level, brandColor, connections, x: cx, y: cy };
    const a = -Math.PI / 2 + ci * 0.6 + ((i - 1) / ring) * Math.PI * 2;
    const k = 0.88 + rand() * 0.24;
    return { id, name, cluster, level, brandColor, connections, x: cx + Math.cos(a) * RX * k, y: cy + Math.sin(a) * RY * k };
  });
});

const INDEX = new Map(SKILLS.map((s, i) => [s.id, i]));
// Unique undirected edges; the same-cluster flag decides how a line is drawn.
const EDGES: [number, number, boolean][] = [];
{
  const seen = new Set<string>();
  SKILLS.forEach((s, a) =>
    s.connections.forEach((id) => {
      const b = INDEX.get(id);
      if (b === undefined) throw new Error(`SkillsConstellation: unknown connection "${id}" on "${s.id}"`);
      const key = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (!seen.has(key)) {
        seen.add(key);
        EDGES.push([a, b, SKILLS[b].cluster === s.cluster]);
      }
    }),
  );
}

const HUBS = new Set((Object.keys(ROWS) as ClusterId[]).map((c) => ROWS[c][0][0]));
const LABEL = SKILLS.map((s) => readable(s.brandColor));
const CLUSTER_LABEL = Object.fromEntries(
  (Object.keys(CLUSTERS) as ClusterId[]).map((c) => [c, readable(CLUSTERS[c].color)]),
) as Record<ClusterId, Rgb>;
const CORE: Record<Level, number> = { Expert: 3.4, Proficient: 2.7, Comfortable: 2.1 };
const PHASE = SKILLS.map(() => rand() * Math.PI * 2);
const STARS = Array.from({ length: 90 }, () => ({
  x: rand(),
  y: rand(),
  r: 0.6 + rand() * 0.9,
  b: 0.12 + rand() * 0.3,
  f: 0.4 + rand() * 1.4,
  p: rand() * Math.PI * 2,
}));
const REACH = 50; // px from a star that counts as "near"
const DRIFT = 4; // px of ambient wander around each anchor

export default function SkillsConstellation() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let still = motion.matches;
    let alive = true;
    let visible = false;
    let raf = 0;
    let w = 0;
    let h = 0;
    const pointer = { x: -1e4, y: -1e4 };
    const px = new Float32Array(SKILLS.length);
    const py = new Float32Array(SKILLS.length);
    const family = getComputedStyle(canvas).fontFamily;

    function draw(now: number) {
      if (!ctx || !w || !h) return;
      const t = still ? 0 : now / 1000;
      ctx.clearRect(0, 0, w, h);

      // Positions: anchor plus a slow wander (none when motion is reduced).
      const drift = still ? 0 : DRIFT;
      let hot = -1;
      let best = REACH;
      for (let i = 0; i < SKILLS.length; i++) {
        px[i] = SKILLS[i].x * w + Math.sin(t * 0.35 + PHASE[i]) * drift;
        py[i] = SKILLS[i].y * h + Math.cos(t * 0.3 + PHASE[i] * 1.3) * drift;
        const d = Math.hypot(pointer.x - px[i], pointer.y - py[i]);
        if (d < best) {
          best = d;
          hot = i;
        }
      }
      const active = hot >= 0 ? SKILLS[hot].cluster : null;

      // Star dust.
      ctx.fillStyle = css(INK);
      for (const s of STARS) {
        ctx.globalAlpha = still ? s.b : s.b * (0.55 + 0.45 * Math.sin(t * s.f + s.p));
        ctx.fillRect(s.x * w, s.y * h, s.r, s.r);
      }
      ctx.globalAlpha = 1;

      // Soft haze behind the lit cluster.
      if (active) {
        const c = CLUSTERS[active];
        const [r, g, b] = hex(c.color);
        const haze = ctx.createRadialGradient(c.at[0] * w, c.at[1] * h, 0, c.at[0] * w, c.at[1] * h, 0.2 * w);
        haze.addColorStop(0, `rgba(${r},${g},${b},.09)`);
        haze.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = haze;
        ctx.fillRect(0, 0, w, h);
      }

      // Lines: within-cluster brighter than cross-cluster; both pop when lit.
      for (const [a, b, intra] of EDGES) {
        const lit = active !== null && (SKILLS[a].cluster === active || SKILLS[b].cluster === active);
        if (intra && lit) {
          ctx.strokeStyle = css(hex(CLUSTERS[active].color), 0.6);
          ctx.lineWidth = 1.4;
        } else if (lit) {
          ctx.strokeStyle = css(INK, 0.22);
          ctx.lineWidth = 0.9;
        } else {
          ctx.strokeStyle = css(INK, intra ? (still ? 0.16 : 0.1) : still ? 0.08 : 0.05);
          ctx.lineWidth = intra ? 0.8 : 0.6;
        }
        ctx.beginPath();
        ctx.moveTo(px[a], py[a]);
        ctx.lineTo(px[b], py[b]);
        ctx.stroke();
      }

      // Stars: brand-coloured glow plus a crisp core sized by level.
      for (let i = 0; i < SKILLS.length; i++) {
        const s = SKILLS[i];
        const lit = s.cluster === active;
        const core = CORE[s.level];
        const pulse = still ? 1 : 1 + 0.08 * Math.sin(t * 1.4 + PHASE[i]);
        const glowR = core * (i === hot ? 8 : lit ? 5.5 : 3.6) * pulse;
        const [r, g, b] = hex(s.brandColor);
        const glow = ctx.createRadialGradient(px[i], py[i], 0, px[i], py[i], glowR);
        glow.addColorStop(0, `rgba(${r},${g},${b},${i === hot ? 0.6 : lit ? 0.42 : 0.22})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(px[i], py[i], glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = css(LABEL[i]);
        ctx.beginPath();
        ctx.arc(px[i], py[i], core, 0, Math.PI * 2);
        ctx.fill();
      }

      // Labels. Idle ink at 62% is ~6:1 on the panel; lit labels use the
      // contrast-lifted brand colour. Kept inside the canvas edges.
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let i = 0; i < SKILLS.length; i++) {
        const s = SKILLS[i];
        const lit = s.cluster === active;
        ctx.font = `${HUBS.has(s.id) ? 500 : 400} ${HUBS.has(s.id) ? 12.5 : 11.5}px ${family}`;
        const half = ctx.measureText(s.name).width / 2;
        const x = Math.min(Math.max(px[i], half + 4), w - half - 4);
        const y = py[i] + CORE[s.level] + 7;
        ctx.fillStyle = i === hot ? css(INK) : lit ? css(LABEL[i]) : css(INK, still ? 0.74 : IDLE_ALPHA);
        ctx.fillText(s.name, x, y);
        if (i === hot) {
          ctx.font = `400 10px ${family}`;
          ctx.fillStyle = css(INK, 0.72);
          ctx.fillText(s.level.toUpperCase(), x, y + 15);
        }
      }

      // Lit cluster's name, pinned top-left where no star sits.
      if (active) {
        const count = SKILLS.filter((s) => s.cluster === active).length;
        ctx.textAlign = "left";
        ctx.font = `500 11px ${family}`;
        ctx.fillStyle = css(CLUSTER_LABEL[active]);
        ctx.fillText(`${CLUSTERS[active].label.toUpperCase()} · ${count}`, 12, 12);
      }
    }

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!still && visible && !raf) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    // With no loop running, redraw on demand (reduced motion, or idle frames).
    const redraw = () => {
      if (!raf) draw(performance.now());
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    };

    const aim = (clientX: number, clientY: number) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = clientX - r.left;
      pointer.y = clientY - r.top;
      redraw();
    };
    const onMouse = (e: MouseEvent) => aim(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) aim(t.clientX, t.clientY);
    };
    const onLeave = () => {
      pointer.x = pointer.y = -1e4;
      redraw();
    };
    const onMotionChange = () => {
      still = motion.matches;
      stop();
      start();
      redraw();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    io.observe(wrap);
    canvas.addEventListener("mousemove", onMouse);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchstart", onTouch, { passive: true });
    canvas.addEventListener("touchmove", onTouch, { passive: true });
    canvas.addEventListener("touchend", onLeave);
    motion.addEventListener("change", onMotionChange);
    // Labels drawn before the web font loads would stay in the fallback face.
    document.fonts.ready.then(() => alive && redraw());

    return () => {
      alive = false;
      stop();
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouse);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchstart", onTouch);
      canvas.removeEventListener("touchmove", onTouch);
      canvas.removeEventListener("touchend", onLeave);
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div data-reveal className="mt-7 hidden md:block">
      <div ref={wrapRef} aria-hidden className="relative h-[460px] border-y border-rule">
        <canvas ref={canvasRef} className="absolute inset-0 size-full font-mono" />
      </div>
      <p className="lab mt-3">Hover a star to light up its cluster · full list below</p>
    </div>
  );
}

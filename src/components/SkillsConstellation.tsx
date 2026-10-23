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
  /** Anchor position, normalised 0–1 within the canvas. */
  x: number;
  y: number;
  connections: string[];
};

const CLUSTERS: Record<ClusterId, { label: string; at: [number, number] }> = {
  frontend: { label: "Frontend & Web", at: [0.15, 0.28] },
  lang: { label: "Languages & Core Tools", at: [0.5, 0.27] },
  ai: { label: "AI/ML, Vision & Media", at: [0.85, 0.28] },
  backend: { label: "Backend & Systems", at: [0.15, 0.71] },
  data: { label: "Data & Big Data", at: [0.5, 0.72] },
  cloud: { label: "Cloud & DevOps", at: [0.85, 0.71] },
};

// [id, name, level, connections]. The first skill in each cluster
// is its hub and sits at the centre; the rest ring around it.
// ponytail: levels are placeholder self-ratings; review them before publishing.
type Row = [string, string, Level, string[]];
const ROWS: Record<ClusterId, Row[]> = {
  lang: [
    ["python", "Python", "Expert", ["typescript", "sql", "javascript", "java", "cpp", "git", "fastapi", "pandas", "sklearn"]],
    ["typescript", "TypeScript", "Proficient", ["javascript", "react", "nextjs"]],
    ["javascript", "JavaScript", "Proficient", ["java"]],
    ["java", "Java", "Comfortable", ["cpp"]],
    ["cpp", "C++", "Comfortable", []],
    ["git", "Git", "Proficient", ["sql", "gha"]],
    ["sql", "SQL", "Proficient", ["postgres", "sqlite"]],
  ],
  backend: [
    ["fastapi", "FastAPI", "Expert", ["django", "drf", "rest", "celery", "webhooks", "pytest", "postgres", "docker", "openai"]],
    ["django", "Django", "Proficient", ["drf"]],
    ["drf", "Django REST", "Proficient", ["rest"]],
    ["rest", "REST APIs", "Expert", ["webhooks"]],
    ["webhooks", "Webhooks", "Proficient", []],
    ["pytest", "PyTest", "Proficient", ["celery", "gha"]],
    ["celery", "Celery", "Comfortable", ["redis"]],
  ],
  data: [
    ["postgres", "PostgreSQL", "Proficient", ["redis", "sqlite", "kafka", "hadoop", "hive", "pandas", "aws"]],
    ["redis", "Redis", "Proficient", ["kafka"]],
    ["sqlite", "SQLite", "Proficient", ["pandas"]],
    ["pandas", "Pandas", "Proficient", ["hive"]],
    ["hive", "Hive", "Comfortable", ["hadoop"]],
    ["hadoop", "Hadoop", "Comfortable", ["kafka"]],
    ["kafka", "Kafka", "Comfortable", []],
  ],
  ai: [
    ["openai", "OpenAI", "Proficient", ["gemini", "rag", "whisper", "sklearn", "opencv", "mediapipe", "ffmpeg"]],
    ["gemini", "Gemini", "Proficient", ["rag"]],
    ["rag", "RAG", "Proficient", ["whisper"]],
    ["whisper", "Whisper", "Comfortable", ["ffmpeg"]],
    ["ffmpeg", "FFmpeg", "Expert", ["opencv", "docker"]],
    ["opencv", "OpenCV", "Proficient", ["mediapipe"]],
    ["mediapipe", "MediaPipe", "Proficient", ["sklearn"]],
    ["sklearn", "scikit-learn", "Proficient", []],
  ],
  frontend: [
    ["react", "React", "Proficient", ["nextjs", "rn", "expo", "tailwind", "streamlit"]],
    ["nextjs", "Next.js", "Proficient", ["tailwind", "vercel"]],
    ["tailwind", "Tailwind", "Proficient", []],
    ["streamlit", "Streamlit", "Expert", ["python"]],
    ["expo", "Expo", "Comfortable", ["rn"]],
    ["rn", "React Native", "Proficient", []],
  ],
  cloud: [
    ["docker", "Docker", "Expert", ["aws", "k8s", "nginx", "linux", "gha", "vercel"]],
    ["aws", "AWS", "Proficient", ["nginx"]],
    ["nginx", "NGINX", "Proficient", ["linux"]],
    ["linux", "Linux", "Proficient", ["k8s"]],
    ["k8s", "Kubernetes", "Comfortable", []],
    ["gha", "GitHub Actions", "Proficient", ["vercel"]],
    ["vercel", "Vercel", "Proficient", []],
  ],
};

// ---- colour: every highlighted label is lifted until it clears WCAG AA ----
// Graded against the brightest ground the canvas can sit on: the peak of the
// blue spotlight behind it (accent at 14% over the canvas). Darker grounds only gain.
const BG: Rgb = [4, 19, 40];
const INK: Rgb = [244, 245, 246]; // --sc-ink, Ice White
const BLUE: Rgb = [0, 102, 255]; // --sc-accent, Electric Blue
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
const mix = (a: Rgb, b: Rgb, t: number) => a.map((v, i) => v + (b[i] - v) * t) as Rgb;
/** Mix a colour toward ink until it reaches 4.5:1 on the given ground. */
function readable(c: Rgb, ground: Rgb): Rgb {
  for (let t = 0; t <= 1; t += 0.05) {
    const m = mix(c, INK, t).map(Math.round) as Rgb;
    if (contrast(m, ground) >= 4.5) return m;
  }
  return INK;
}
const css = ([r, g, b]: Rgb, a = 1) => `rgba(${r},${g},${b},${a})`;

// ---- glow: soft, non-linear alpha falloff ----
// A two-stop gradient falls off linearly, and the eye reads the radius where
// that slope stops as a hard rim. These stops ease out instead, as fractions
// of the peak; at the cluster haze's 0.28 peak they are 0.28 / 0.16 / 0.06 /
// 0.015 / 0.
const FALLOFF: [number, number][] = [
  [0, 1],
  [0.3, 0.571],
  [0.6, 0.214],
  [0.85, 0.054],
  [1, 0],
];
const falloff = (u: number) => {
  for (let k = 1; k < FALLOFF.length; k++) {
    const [u1, a1] = FALLOFF[k];
    const [u0, a0] = FALLOFF[k - 1];
    if (u <= u1) return a0 + ((a1 - a0) * (u - u0)) / (u1 - u0);
  }
  return 0;
};
function softGlow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, peak: number) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  for (const [u, a] of FALLOFF) g.addColorStop(u, css(BLUE, peak * a));
  return g;
}
const HAZE = 0.28; // the lit cluster's haze, at its centre
type Glow = "hot" | "lit" | "idle";
const GLOW: Record<Glow, number> = { hot: 0.6, lit: 0.42, idle: 0.22 }; // per-star peaks
const GLOW_R: Record<Glow, number> = { hot: 8, lit: 5.5, idle: 3.6 }; // x core radius
const PULSE = 1.08; // widest breathing scale

// Idle labels are ink at this alpha. Graded against the spotlight plus the
// haze's 0.6 stop, which is as far into a lit neighbour's haze as an idle
// label sits; fail the build if a palette change drops it below AA.
const IDLE_ALPHA = 0.62;
if (contrast(mix(BG, INK, IDLE_ALPHA), mix(BG, BLUE, HAZE * FALLOFF[2][1])) < 4.5) {
  throw new Error("SkillsConstellation: idle label colour is below WCAG AA");
}

// ---- layout: hub at the cluster centre, the rest on a jittered ellipse ----
const RX = 0.115;
const RY = 0.17;
const rand = mulberry32(11);

// Exported for NodeField: its morph flies one 3D node onto each of these anchors.
export const SKILLS: Skill[] = (Object.keys(ROWS) as ClusterId[]).flatMap((cluster, ci) => {
  const [cx, cy] = CLUSTERS[cluster].at;
  const rows = ROWS[cluster];
  const ring = rows.length - 1;
  return rows.map(([id, name, level, connections], i) => {
    if (i === 0) return { id, name, cluster, level, connections, x: cx, y: cy };
    const a = -Math.PI / 2 + ci * 0.6 + ((i - 1) / ring) * Math.PI * 2;
    const k = 0.88 + rand() * 0.24;
    return { id, name, cluster, level, connections, x: cx + Math.cos(a) * RX * k, y: cy + Math.sin(a) * RY * k };
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
const CORE: Record<Level, number> = { Expert: 3.4, Proficient: 2.7, Comfortable: 2.1 };
// The alpha a star's own glow still has at its label's top edge (core + 7px
// below the star), worst case across levels at the pulse's widest.
const glowAtLabel = (kind: Glow) =>
  Math.max(...Object.values(CORE).map((c) => GLOW[kind] * falloff((c + 7) / (c * GLOW_R[kind] * PULSE))));
// Lit labels and cores: Electric Blue lifted toward Ice White until it clears
// AA on the worst ground under them: spotlight, haze peak, then their own glow.
const LIT = readable(BLUE, mix(mix(BG, BLUE, HAZE), BLUE, glowAtLabel("lit")));
// The hovered label is plain ink over the hot glow; check it the same way.
if (contrast(INK, mix(mix(BG, BLUE, HAZE), BLUE, glowAtLabel("hot"))) < 4.5) {
  throw new Error("SkillsConstellation: hovered label colour is below WCAG AA");
}
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

      // Soft haze behind the lit cluster. Its radius never exceeds the distance
      // to the nearest canvas edge: a glow the canvas clips before it reaches
      // zero leaves a straight hard line along that edge.
      if (active) {
        const [ax, ay] = CLUSTERS[active].at;
        const cx = ax * w;
        const cy = ay * h;
        const r = Math.min(0.2 * w, cx, w - cx, cy, h - cy);
        ctx.fillStyle = softGlow(ctx, cx, cy, r, HAZE);
        ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
      }

      // Lines: within-cluster brighter than cross-cluster; both pop when lit.
      for (const [a, b, intra] of EDGES) {
        const lit = active !== null && (SKILLS[a].cluster === active || SKILLS[b].cluster === active);
        if (intra && lit) {
          ctx.strokeStyle = css(BLUE, 0.7);
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

      // Stars: a blue glow plus a crisp core sized by level; Ice White at rest, lit blue.
      for (let i = 0; i < SKILLS.length; i++) {
        const s = SKILLS[i];
        const lit = s.cluster === active;
        const core = CORE[s.level];
        const pulse = still ? 1 : 1 + (PULSE - 1) * Math.sin(t * 1.4 + PHASE[i]);
        const kind: Glow = i === hot ? "hot" : lit ? "lit" : "idle";
        const glowR = core * GLOW_R[kind] * pulse;
        ctx.fillStyle = softGlow(ctx, px[i], py[i], glowR, GLOW[kind]);
        ctx.beginPath();
        ctx.arc(px[i], py[i], glowR, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = css(lit || i === hot ? LIT : INK);
        ctx.beginPath();
        ctx.arc(px[i], py[i], core, 0, Math.PI * 2);
        ctx.fill();
      }

      // Labels. Idle ink at 62% clears AA even on the spotlight (checked at load);
      // lit labels use the contrast-lifted blue. Kept inside the canvas edges.
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let i = 0; i < SKILLS.length; i++) {
        const s = SKILLS[i];
        const lit = s.cluster === active;
        ctx.font = `${HUBS.has(s.id) ? 500 : 400} ${HUBS.has(s.id) ? 12.5 : 11.5}px ${family}`;
        const half = ctx.measureText(s.name).width / 2;
        const x = Math.min(Math.max(px[i], half + 4), w - half - 4);
        const y = py[i] + CORE[s.level] + 7;
        ctx.fillStyle = i === hot ? css(INK) : lit ? css(LIT) : css(INK, still ? 0.74 : IDLE_ALPHA);
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
        ctx.fillStyle = css(LIT);
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

  // data-constellation is how NodeField finds the anchors' screen rectangle.
  return (
    <div ref={wrapRef} data-constellation aria-hidden className="constellation-canvas relative size-full">
      <canvas ref={canvasRef} className="absolute inset-0 size-full font-mono" />
    </div>
  );
}

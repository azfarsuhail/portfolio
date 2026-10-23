"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Color,
  Vector3,
  type BufferGeometry,
  type Group,
  type LineBasicMaterial,
  type PerspectiveCamera,
  type PointsMaterial,
} from "three";
import { mulberry32 } from "@/lib/random";
import { SKILLS } from "./SkillsConstellation";

// The page's one world: a tall column of wiring the camera sinks through as
// the visitor scrolls. The first M nodes are bound to the skill map's stars;
// the pinned Skills act flies them onto the 2D constellation and back out again
// (the signature move, scrollcraft/builds/portfolio/BRIEF.md). Built once from
// a seeded PRNG so it never reshuffles; three draw calls in total.
const COUNT = 340;
const LINK = 1.85;
const TOP = 6; // the column runs from y = TOP down to y = TOP - DEPTH
const DEPTH = 36;
const DESCENT = 1.6; // world units the camera sinks per viewport of scroll
const M = SKILLS.length;
const NODE = new Color("#0066ff"); // --sc-accent, Electric Blue
const NODE_RGB = NODE.toArray();
const LIT_RGB = new Color("#297fff").toArray(); // --color-glow: morph nodes brighten in flight
const LINE = "#0066ff"; // wiring: the accent at LINE_OPACITY
const LINE_OPACITY = 0.3;

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);
const smooth = (a: number, b: number, x: number) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function buildGraph() {
  const rand = mulberry32(7);
  const nodes = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    nodes[i * 3] = (rand() - 0.5) * 18;
    nodes[i * 3 + 1] = TOP - rand() * DEPTH;
    nodes[i * 3 + 2] = (rand() - 0.5) * 6;
  }
  const edges: number[] = [];
  for (let a = 0; a < COUNT; a++) {
    for (let b = a + 1; b < COUNT; b++) {
      const dx = nodes[a * 3] - nodes[b * 3];
      const dy = nodes[a * 3 + 1] - nodes[b * 3 + 1];
      const dz = nodes[a * 3 + 2] - nodes[b * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < LINK * LINK) {
        edges.push(nodes[a * 3], nodes[a * 3 + 1], nodes[a * 3 + 2], nodes[b * 3], nodes[b * 3 + 1], nodes[b * 3 + 2]);
      }
    }
  }
  return { nodes, edges: new Float32Array(edges) };
}

function Graph({ still }: { still: boolean }) {
  const pivot = useRef<Group>(null);
  const offset = useRef<Group>(null);
  const fieldMat = useRef<PointsMaterial>(null);
  const lineMat = useRef<LineBasicMaterial>(null);
  const morphMat = useRef<PointsMaterial>(null);
  const morphGeo = useRef<BufferGeometry>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const spin = useRef(0);
  const invalidate = useThree((s) => s.invalidate);
  const { nodes, edges } = useMemo(() => buildGraph(), []);
  const field = useMemo(() => nodes.slice(M * 3), [nodes]);
  const morph = useMemo(() => {
    const col = new Float32Array(M * 3);
    for (let i = 0; i < M; i++) col.set(NODE_RGB, i * 3);
    return { pos: nodes.slice(0, M * 3), col };
  }, [nodes]);
  const v = useMemo(() => new Vector3(), []);

  // Rendering is on demand: scroll and the pointer request frames, and useFrame
  // keeps requesting only while something is still moving.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
      invalidate();
    };
    const scroll = () => invalidate();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    const p = pivot.current;
    const o = offset.current;
    const geo = morphGeo.current;
    if (!p || !o || !geo || !fieldMat.current || !lineMat.current || !morphMat.current) return;
    const vh = window.innerHeight;
    const cam = state.camera as PerspectiveCamera;
    let busy = false;

    // Descend with the page, at a fraction of its speed, so the wiring reads as
    // deep behind it. The pivot follows the camera so tilt swings the nearby
    // wiring, not the far end of the column.
    const camY = still ? 0 : (-window.scrollY / vh) * DESCENT;
    cam.position.y = camY;
    p.position.y = camY;
    o.position.y = -camY;
    if (!still) {
      if (window.scrollY < vh) {
        spin.current += Math.min(delta, 1 / 30) * 0.025;
        busy = true;
      }
      const tx = pointer.current.y * 0.18;
      const ty = pointer.current.x * 0.25 + spin.current;
      p.rotation.x += (tx - p.rotation.x) * 0.06;
      p.rotation.y += (ty - p.rotation.y) * 0.06;
      if (Math.abs(tx - p.rotation.x) > 1e-4 || Math.abs(ty - p.rotation.y) > 1e-4) busy = true;
    }
    p.updateMatrixWorld();

    // The morph: t carries the nodes to the stars, fade hands over to the 2D
    // canvas (whose CSS opacity reads the same --sc-p). presence releases them
    // as the pinned stage leaves the top of the screen. Off below md the map
    // is not rendered, its rect is empty and nothing morphs.
    // Under reduced motion nothing flies (t stays 0) but the field still dims
    // while the map is up: opacity carries meaning, position does not.
    let dim = 0;
    let fade = 0;
    const wrap = document.querySelector<HTMLElement>("[data-constellation]");
    const r = wrap?.getBoundingClientRect();
    if (wrap && r && r.width > 0) {
      const act = wrap.closest<HTMLElement>("[data-sc-act]");
      const stage = wrap.closest<HTMLElement>("[data-sc-stage]") ?? wrap;
      const prog = parseFloat(act?.style.getPropertyValue("--sc-p") ?? "") || 0;
      const presence = clamp01(stage.getBoundingClientRect().bottom / vh);
      dim = smooth(0, 0.2, prog) * presence;
      fade = still ? dim : smooth(0.18, 0.28, prog) * presence;
    }
    const t = still ? 0 : dim;

    const H = 2 * cam.position.z * Math.tan((cam.fov * Math.PI) / 360);
    const W = H * cam.aspect;
    const pos = geo.attributes.position.array as Float32Array;
    const col = geo.attributes.color.array as Float32Array;
    for (let i = 0; i < M; i++) {
      v.set(nodes[i * 3], nodes[i * 3 + 1], nodes[i * 3 + 2]);
      o.localToWorld(v);
      if (t > 0 && r) {
        // The star's anchor, unprojected onto the z = 0 plane in front of the camera.
        const wx = ((r.left + SKILLS[i].x * r.width) / state.size.width - 0.5) * W;
        const wy = camY + (0.5 - (r.top + SKILLS[i].y * r.height) / state.size.height) * H;
        v.set(v.x + (wx - v.x) * t, v.y + (wy - v.y) * t, v.z * (1 - t));
      }
      pos[i * 3] = v.x;
      pos[i * 3 + 1] = v.y;
      pos[i * 3 + 2] = v.z;
      for (let k = 0; k < 3; k++) col[i * 3 + k] = NODE_RGB[k] + (LIT_RGB[k] - NODE_RGB[k]) * t;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    fieldMat.current.opacity = 0.75 * (1 - 0.8 * dim);
    lineMat.current.opacity = LINE_OPACITY * (1 - 0.9 * dim);
    morphMat.current.opacity = 0.75 * (1 - fade);
    if (busy) invalidate();
  });

  return (
    <>
      <group ref={pivot}>
        <group ref={offset}>
          <lineSegments>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[edges, 3]} />
            </bufferGeometry>
            <lineBasicMaterial ref={lineMat} color={LINE} transparent opacity={LINE_OPACITY} depthWrite={false} />
          </lineSegments>
          <points>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[field, 3]} />
            </bufferGeometry>
            <pointsMaterial ref={fieldMat} color={NODE} size={0.07} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
          </points>
        </group>
      </group>
      {/* Morph nodes live in world space: their positions are written every frame. */}
      <points frustumCulled={false}>
        <bufferGeometry ref={morphGeo}>
          <bufferAttribute attach="attributes-position" args={[morph.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[morph.col, 3]} />
        </bufferGeometry>
        <pointsMaterial ref={morphMat} vertexColors size={0.07} sizeAttenuation transparent opacity={0.75} depthWrite={false} />
      </points>
    </>
  );
}

export default function NodeField() {
  const [maxDpr, setMaxDpr] = useState(1.5);
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, maxDpr]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
    >
      <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
      <Graph still={still} />
    </Canvas>
  );
}

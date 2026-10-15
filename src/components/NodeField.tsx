"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";
import { mulberry32 } from "@/lib/random";

// A wired node graph: the "wiring underneath". One Points draw call plus one
// LineSegments draw call, built once from a seeded PRNG so it never reshuffles.
const COUNT = 120;
const LINK = 1.9;

function buildGraph() {
  const rand = mulberry32(7);
  const nodes = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    nodes[i * 3] = (rand() - 0.5) * 18;
    nodes[i * 3 + 1] = (rand() - 0.5) * 10;
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

function Graph() {
  const tilt = useRef<Group>(null);
  const spin = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { nodes, edges } = useMemo(() => buildGraph(), []);

  // The canvas sits behind the hero text with pointer-events off, so read the
  // pointer from the window rather than from R3F's canvas-bound events.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((_, delta) => {
    if (!tilt.current || !spin.current) return;
    spin.current.rotation.y += delta * 0.025;
    tilt.current.rotation.x += (pointer.current.y * 0.18 - tilt.current.rotation.x) * 0.04;
    tilt.current.rotation.y += (pointer.current.x * 0.25 - tilt.current.rotation.y) * 0.04;
  });

  return (
    <group ref={tilt}>
      <group ref={spin}>
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[edges, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#e8e5de" transparent opacity={0.14} />
        </lineSegments>
        <points>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#e979df" size={0.07} sizeAttenuation transparent opacity={0.9} />
        </points>
      </group>
    </group>
  );
}

export default function NodeField() {
  const wrap = useRef<HTMLDivElement>(null);
  const [onScreen, setOnScreen] = useState(true);
  const [maxDpr, setMaxDpr] = useState(1.5);
  const [still] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  // Stop the render loop entirely once the hero scrolls out of view.
  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    if (wrap.current) io.observe(wrap.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="size-full">
      <Canvas
        frameloop={still ? "demand" : onScreen ? "always" : "never"}
        dpr={[1, maxDpr]}
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
      >
        <PerformanceMonitor onDecline={() => setMaxDpr(1)} />
        <Graph />
      </Canvas>
    </div>
  );
}

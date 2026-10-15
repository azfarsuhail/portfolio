"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const MAX_TILT = 6; // degrees

// Tilts toward the pointer. Mouse-only and motion-safe: on touch or with
// reduced motion it is a plain card.
export default function TiltCard({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const el = ref.current;
        if (!el) return;
        gsap.set(el, { transformPerspective: 900 });
        const rx = gsap.quickTo(el, "rotationX", { duration: 0.45, ease: "power3" });
        const ry = gsap.quickTo(el, "rotationY", { duration: 0.45, ease: "power3" });
        let box = el.getBoundingClientRect();

        const enter = () => (box = el.getBoundingClientRect());
        const move = (e: PointerEvent) => {
          ry(((e.clientX - box.left) / box.width - 0.5) * 2 * MAX_TILT);
          rx(-((e.clientY - box.top) / box.height - 0.5) * 2 * MAX_TILT);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        el.addEventListener("pointerenter", enter);
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointerenter", enter);
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <article ref={ref} data-reveal className={className}>
      {children}
    </article>
  );
}

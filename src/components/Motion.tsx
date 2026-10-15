"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Page-wide motion layer: scroll reveals for [data-reveal] and count-ups for
// [data-count]. Behind matchMedia so reduced-motion visitors get the static page.
export default function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 92%",
        once: true,
        onEnter: (els) =>
          gsap.fromTo(
            els,
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08, overwrite: "auto" },
          ),
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const to = Number(el.dataset.count);
        const dec = Number(el.dataset.dec ?? 0);
        const n = { v: 0 };
        el.textContent = (0).toFixed(dec);
        gsap.to(n, {
          v: to,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate: () => {
            el.textContent = n.v.toFixed(dec);
          },
        });
      });
    });

    return () => mm.revert();
  });

  return null;
}

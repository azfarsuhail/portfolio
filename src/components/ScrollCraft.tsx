"use client";

import { useEffect } from "react";

type Instance = { destroy(): void };

// Mounts the vendored scroll-craft engine on the server-rendered page. The
// engine reads the data-sc-* attributes and drives them from one rAF loop; it
// generates no DOM beyond splitting kinetic headlines, which React never
// re-renders here, so hydration is never contested.
export default function ScrollCraft() {
  useEffect(() => {
    let live = true;
    let instance: Instance | undefined;
    import("@/lib/scrollcraft/scrollcraft.js").then(() => {
      if (live) instance = window.ScrollCraft?.mount(document);
    });
    return () => {
      live = false;
      instance?.destroy();
    };
  }, []);

  return null;
}

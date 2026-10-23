"use client";

import dynamic from "next/dynamic";

// three.js stays out of the server render and the initial bundle.
const NodeField = dynamic(() => import("./NodeField"), { ssr: false });

// The fixed stage behind every section: the page scrolls over one world.
// Negative z: above the body's drifting ground, below every section's content.
export default function World() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 opacity-80">
      <NodeField />
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

// three.js stays out of the server render and the initial bundle.
const NodeField = dynamic(() => import("./NodeField"), { ssr: false });

export default function HeroCanvas() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-80 [mask-image:linear-gradient(to_bottom,black_25%,transparent_80%)] min-[861px]:[mask-image:linear-gradient(to_right,black_20%,rgb(0_0_0/.35)_60%,transparent_95%)]"
    >
      <NodeField />
    </div>
  );
}

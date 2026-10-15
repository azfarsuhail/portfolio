"use client";

import { useSyncExternalStore } from "react";

// Read the year in the browser only: Cache Components rejects new Date()
// during prerender, so the server snapshot is empty and the client fills it in.
const noop = () => () => {};

export default function Year() {
  const year = useSyncExternalStore(noop, () => new Date().getFullYear(), () => null);
  return <span>{year}</span>;
}

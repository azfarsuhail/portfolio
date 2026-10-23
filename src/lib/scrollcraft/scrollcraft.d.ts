// Types for the vendored engine (scrollcraft.js, unedited). It is a classic
// script that assigns window.ScrollCraft; this file makes it importable.
export {};

declare global {
  interface Window {
    ScrollCraft?: { mount(root: ParentNode): { destroy(): void } };
  }
}

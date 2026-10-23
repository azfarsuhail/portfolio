// The two button styles, shared by the header, hero and close. Padding stays
// with each use. Primary: white on Electric Blue (4.8:1); hover adds a #297FFF
// glow around it instead of refilling it (white on #297FFF is only 3.8:1);
// pressed darkens to #0052CC. No transform here: the close's CTA is magnetic.
export const ctaPrimary =
  "rounded-sm bg-accent font-semibold text-accent-ink no-underline transition-[box-shadow,background-color] duration-150 hover:shadow-[0_0_0_1px_var(--glow),0_0_24px_color-mix(in_srgb,var(--glow)_45%,transparent)] active:bg-accent-press";

export const ctaSecondary =
  "rounded-sm border border-hairline bg-surface font-medium text-ink no-underline transition-colors duration-150 hover:border-glow active:translate-y-px";

# portfolio

Personal site for Azfar Suhail. Next.js (App Router) + TypeScript + Tailwind CSS v4, with GSAP for scroll and pointer motion and React Three Fiber for the hero background.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

- `src/site.ts` — name, title, description, contact links, availability line. The site URL resolves automatically on Vercel; set `SITE_URL` to pin a custom domain.
- `src/components/` — one file per section. Section copy lives as data arrays at the top of each file.
- `src/components/Motion.tsx` — scroll reveals (`data-reveal`) and Impact count-ups (`data-count`).
- `src/components/SkillsConstellation.tsx` — the 2D-canvas skills map (plain `2d` context, no libraries). Skills, clusters, levels and links are the data at the top of the file; the pill list in `Skills.tsx` stays the accessible source of truth.
- `src/components/NodeField.tsx` — the three.js node graph behind the hero; `HeroCanvas.tsx` lazy-loads it client-side.
- `src/app/opengraph-image.tsx` — generates the social preview image.
- `public/` — `resume.pdf`, `favicon.svg`, `icons.svg` (ticker icon sprite). Fonts are self-hosted from `src/fonts/` via `next/font/local`.

All motion respects `prefers-reduced-motion`; the project-card tilt only runs with a mouse.

`three` is pinned to r182: React Three Fiber 9.x still uses `THREE.Clock`, which r183+ warns about in the console. Lift the pin once R3F 10 is stable.

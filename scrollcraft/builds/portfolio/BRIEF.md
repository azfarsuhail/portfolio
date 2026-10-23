# BRIEF: azfar-suhail-portfolio

Interviewed 2026-10-23. Answers 1 to 9 are the owner's words, verbatim.
Everything under **Authored decisions** is mine and labelled as such.

Scope chosen by the owner: full scroll-craft rebuild inside the existing Next.js
app. Assets: none, code-driven only (no photos, no kie.ai). Copy rules: apply
scroll-craft's rules, keep the Impact metrics.

---

## 1. Vibe and references

> Vibe: Architectural, precise, glowing, editorial, subterranean.
> References: Blade Runner 2048 production design (monolithic structures, deep
> shadows, selective high-contrast light). Control (Remedy Entertainment)
> UI/environmental graphic design (stark typography, industrial precision,
> structured grids). Ghost in the Shell (1995) intro sequence (digital wiring
> underneath physical structures).

## 2. The scroll journey

> Hero / Entrance: The headline and floating node network (The Wiring Underneath).
> The Engine (About & Capabilities): Who you are, key stats/at-a-glance, and the
> interactive skill constellation canvas.
> The Proof (Projects): High-impact project cards (CodeGuard AI, ScholarCompass,
> sports pipeline, knee project) and the expandable archive.
> The Record (Experience & Credentials): Structured timeline of roles, degree,
> and training certifications.
> The Metric (Impact): The glowing counter stats.
> The Departure (CTA / Footer): Direct availability date (OPEN TO WORK FROM
> JANUARY 2027), contact links, and résumé download.

## 3. The energy curve

> Calm: Hero, Experience timeline, and Footer.
> Intense / Interactive: The Skills Constellation canvas and the Featured
> Project cards (where 3D tilt and cluster glowing peak).

## 4. Feelings, stage by stage, and the one moment

> Feelings: Intrigued (Hero) → Impressed by technical depth (Skills) →
> Convinced of execution capability (Projects/Impact) → Compelled to reach out
> (Footer).
> One Memorable Moment: Hovering over a node in the constellation canvas and
> watching the entire related tech cluster light up with glowing connection
> lines and brand colors.

## 5. The signature move

> The Interactive 2D/3D Hybrid Node Network (Skills Constellation) that smoothly
> scales down to an accessible, semantic pill badge layout on mobile viewports,
> running with zero off-screen draw overhead.

## 6. Aesthetic range

> Editorial Premium-Minimal with high-contrast typography and subtle dark-mode
> glow accents.

## 7. One world or distinct scenes

> One Unbroken World. A continuous deep dark atmosphere (#3A0F34 Deep Aubergine
> / #0A0A0B) where sections flow seamlessly using subtle radial spotlights and
> line dividers rather than hard, blocky scene transitions.

## 8. Audience and core belief

> Audience: Engineering leaders, technical hiring managers, and recruiters
> hiring for Python backend, applied AI, and full-stack systems roles.
> Belief: "This engineer doesn't just build UI—they architect scalable backend
> systems and production AI with extreme precision and polish."

## 9. The one action

> Primary: "Get in touch" (mailto: / direct contact).
> Secondary: "Download résumé" (/resume.pdf).

## Assets

> No imagery, code-driven.

---

## The feeling curve

Owner's feelings, with the two acts the owner did not name filled in (marked
*authored*). One line per act: the emotion, then what on screen causes it.

```
1  Intrigue      a two-line claim over a 3D wiring network that turns under the pointer
2  Orientation   (authored) quiet: who he is, plainly, with the facts at a glance
3  Impressed     PEAK: the wiring pulls itself into a map of the stack; a hover lights a cluster
4  Conviction    the four builds travel sideways under the hand and lean toward the pointer
5  Trust         (authored) calm: the record, dated and in order, nothing moving
6  Certainty     (authored) the real numbers land, once each
7  Compelled     the page stops: one date, one action, held
```

No two adjacent acts share a feeling. Act 2 is the silence before the peak.

## The peak

> I scrolled and the wiring behind the headline gathered itself into a map of
> everything he works with, and when I pointed at Python the whole languages
> cluster lit up.

Lives in act 3. It gets the most scroll room on the page (span 3.0 against a
next-largest of 2.6) and the quiet act in front of it.

## Tell-someone sentence

> It's the site where the wiring under the headline pulls itself together into
> a map of what he knows, and lights up wherever you point.

## Authored silence

Act 2 (Orientation) and act 5 (Trust) are deliberately still: flow sections,
fade-in only. That is authored calm, not dead scroll.

---

## Grammar: filmic one-shot

The owner's arc is one line (intrigued, impressed, convinced, compelled), one
action, and no hard transitions. That is the filmic one-shot's fit. Why the other
seven lost:

- **Continuous world** was the literal reading of answer 7, but the grammar
  requires worldflight (a fixed stage of generated video legs), forbids sections
  and puts all copy in fixed waypoint windows. The owner chose no imagery, and
  the content (16 projects, 5 roles, 7 credentials) is meant to be read and
  scanned. Answer 7 itself describes sections flowing through one atmosphere,
  which is the filmic grammar's continuous ground (`drift`), not worldflight.
- **Chaptered editorial**: its chapters land on hard cuts; answer 7 rules out
  "hard, blocky scene transitions".
- **Live surface**: a portfolio is not a product to operate, and a painted
  surface would break its honesty rule.
- **Typographic poster**: forbids cards and decorative motion; the brief's peak
  and the project cards are both.
- **Gallery / catalog**: bans the single hero claim and persuasion; the hero is
  a claim and the page argues a belief.
- **Split stage**: there is no two-sided argument here.
- **Rhythmic cutlist**: for energy brands; it bans `pin` and `dwell`, and the
  brief wants calm acts.

Consequences the grammar imposes: no section jump-nav and no visible sequence
(the header becomes wordmark plus one CTA), a continuous drifting ground, a
pinned close with a spotlight and a magnetic CTA.

## The signature move: the wiring becomes the map

One node network is the whole page's world. It sits fixed behind everything as
a 3D field (three.js), turning slowly under the pointer. When the visitor
reaches the Engine's pinned stage, 42 of its nodes leave the 3D field and fly to
the exact screen positions of the 2D constellation's stars, the rest of the
field dims, and the 2D canvas takes over in place: the hover-to-light-a-cluster
peak. Scroll back up and the nodes return to the field. Below 768px the morph
does not run and the same skills render as the semantic pill list, which is
the accessible source of truth at every width. Both canvases stop drawing when
nothing on them can change (off screen, or idle).

Not a kit device: the engine has no 3D, no cross-canvas handoff and no morph.
It is bespoke page code driven by the act's `--sc-p`.

## Fingerprint gate

Registry was empty (first build). Nothing to clear.

---

## Score

| Act | Beat | Device | Span (vh) | Why this one |
|---|---|---|---|---|
| 1 | Hero | `pin` + `kinetic` (greet cue), world field | 1.5 | The headline assembles over the wiring and greets on landing |
| 2 | Engine: who | `flow` + `in` | ~1.2 | The quiet act before the peak |
| 3 | Engine: the map (peak) | `pin` + signature morph + canvas hover | 3.0 | The largest span; the morph runs early in it, the hover gets the rest |
| - | Skills list | `flow` + `in` | ~1.4 | The semantic list; the only Skills view on phones |
| 4 | Proof | `pan` + `tilt` | 2.6 | Lateral travel reads as breadth across four builds |
| - | Archive | `flow` | small | The other twelve, one click away |
| 5 | Record | `flow` + `in` | ~2.5 | Calm and dated; nothing moves but the entrance |
| 6 | Metric | `count` on entry | ~1.1 | Real numbers, each once |
| 7 | Departure | `pin` + `spotlight` + `magnet`, held cue | 1.3 | The page stops and hands over one action |

Device families: pin, kinetic, flow/in, pan, pointer (tilt, spotlight,
magnet), count, drift. No family twice in a row across the acts. One scrub
budget unused (no video). Total about 15 viewport-heights over 7 acts.

---

## Authored decisions

- **Dark only.** The world is dark by the owner's answer 7, and the engine's
  drift writes the ground inline, which a light theme cannot override. The
  light theme and its toggle from the previous pass are removed; the whole page
  is the dark mode.
- **Colour, six roles and one accent.** canvas `#0A0A0B`; surface `#150B14`;
  ink `#F1ECEF`; ink-soft `#B3A6B0` (aubergine-tinted, not grey); accent
  `#5CE1E6` signal cyan (the "selective high-contrast light"; one accent, owned
  by actions, focus and the network's lit nodes); accent-ink `#0A0A0B`. Deep
  aubergine `#3A0F34` is the atmosphere: radial spotlights and the drift grade,
  never a flat fill. Measured worst case: ink-soft on a spotlight peak, 6.9:1.
  Constellation brand colours are data, not accents.
- **Type, two families.** Archivo (variable, width and weight axes) for display
  and text, display set expanded for the monolithic register; DM Mono for data
  only (dates, IDs, stacks). Inter from the previous pass is dropped: taste.md
  calls it a non-decision unless the brand asks for neutral.
- **Cut:** the stack ticker (no beat, and a decorative strip under the hero),
  the header's section links (filmic forbids jump nav), the "View projects"
  button (one action), most section eyebrows (one kept, on Proof).
- **Copy:** visible em dashes replaced with commas, colons or parentheses.
  Impact metrics kept, per the owner.
- **Hero** is held to four text elements: the claim, one subline, two CTAs. The
  hero's role and base facts move into the Engine's at-a-glance list.

---

## Verification (2026-10-23)

Harness (`shoot.mjs`, six frames per act) against the production build:

| Run | Length | Dead scroll | Cue contrast | Console |
|---|---|---|---|---|
| Desktop 1440x900 | 15.6 vh | none | all cues clear 4.5:1 at their worst frame (hero 15.9 / 7.8 / 15.1) | clean |
| Phone 390x844 | 17.0 vh | none | all clear | clean |
| Reduced motion | 15.6 vh | none | all clear | clean |

Contact sheets were skipped: the harness tiles them with ffmpeg, which is not
installed (only needed for video, and this build has none). Frames were read
individually instead.

Checked by hand in the browser: the morph lands on the stars and hands over to
the 2D canvas (opacity 1 by p 0.24); hovering Python lights the Languages cluster
in brand colours; Impact counts land on 97.8, 14, 70, 40, 2, 100, 30, 32; focus
ring is the accent; tab order follows reading order; with JavaScript disabled
every heading and number is visible.

Fixed during verification: hero copy anchored to the gutter instead of the
content column; header scrim too weak where copy scrolls under it; the field not
dimming behind the map under reduced motion; a link inside the moving rail that
keyboard focus could reach while it was off screen.

Not verified: a real phone (touch scrolling, iOS rendering, Low Power Mode),
and frame rate on a low-end GPU.

## Feel check

Read cold from the frames, one word per act, then diffed against the curve:

```
1  Intrigue     ->  intrigue (claim over moving wiring)          matches
2  Orientation  ->  calm                                          matches
3  Impressed    ->  impressed (the gather, then the lit cluster)  matches; it is the largest change
4  Conviction   ->  momentum                                      close; the tilt carries it
5  Trust        ->  steady                                        matches
6  Certainty    ->  certainty (numbers settle)                    matches
7  Compelled    ->  resolved                                      matches; the close holds
```

The peak is the largest visual change and holds the most scroll. The owner's own
cold scroll is the real check.

---

## Revision (2026-10-23): Webflow black and Electric Blue

At the owner's request the palette was replaced; grammar, journey, score and
signature move are unchanged. Supersedes the colour line under Authored
decisions.

- canvas `#050505`, surface `#141416`, ink `#F4F5F6`, ink-soft `#9E9EA7`,
  accent `#0066FF`, accent-ink `#FFFFFF`, hairline `#222226`. Highlight
  `#297FFF` for hovers, lit nodes and any blue text; `#0052CC` for a pressed CTA.
- `#0066FF` is 4.2:1 as text on the canvas, so it is used only for fills,
  borders, nodes and the focus ring. Blue text uses `#297FFF` (5.4:1 canvas,
  4.9:1 cards). White on `#297FFF` is 3.8:1, so the CTA hover is a `#297FFF`
  glow around the button, not a refill.
- Spotlights are the accent at 14% (peak `#041328`); the drift grade stays in
  the off-black family.
- The skill map's per-skill brand colours are gone: idle stars Ice White, the
  lit cluster Electric Blue, lit labels lifted to `rgb(37,123,254)` (4.7:1 on a
  spotlight peak). The peak sentence in this brief predates that change.

Verified after the change: harness clean on desktop and 390px (no dead scroll,
lowest cue contrast 7.2:1, no console errors); no horizontal overflow at 320,
390, 768, 1280; computed colours match the spec; CTA hover glow and card hover
border confirmed in the browser.

# Oxbridge Knights — Website Design & Build Spec
**For: Claude Code (build agent). This document is the north star. Follow it exactly. Do not improvise around it.**

Client: **Oxbridge Knights DDC** — Lagos-based architecture, real estate & construction studio with a London presence. 10+ years. Large-scale commercial developments and high-end bespoke residences.
Contact person: Izu Nnewuihe · izunnewuihe@gmail.com · +234 813 021 8143.
Pages: Home, About, Services, Projects, Contact. No payments. No booking.

---

## 0. The thesis (read this first; everything serves it)

The client's own words: they are *"heavy on contemporary and young staff in a profession ruled by old men,"* and want *"youthful sophistication or playfulness."*

So the whole site runs on one tension: **heritage name, disruptive work.** "Oxbridge Knights" sounds like an old British institution; the work is futuristic Lagos towers with Rolls-Royces and green Ferraris in the frame. We lean into that irony with confidence.

**Signature line / thesis:** `Old name. New rules.`

Everything below (type, colour, motion) exists to express this one idea. When a decision is unclear, choose the option that sharpens heritage-vs-future.

---

## 1. Colour tokens (all derived from the client's own assets — this is the anti-slop defence)

```css
--ink:        #0B1A2E;  /* deep navy from the logo wordmark. THE DOMINANT SURFACE. */
--paper:      #F2EDE6;  /* warm bone from the portfolio page background. Reading/gallery surface. */
--vermilion:  #D9291C;  /* the red from the portfolio's category labels. ACCENT ONLY. */
--white:      #FBFAF7;  /* warm off-white for text on ink. Never pure #fff. */
--slate:      #5A6472;  /* muted slate for meta/captions. Derived. */
--hair:       #E2DACE;  /* bone-shade hairlines/dividers on paper. */
```

**Usage law — non-negotiable:**
- **Navy is the primary brand surface.** Loader, hero, section breaks, footer, the Works index background = ink. Cream/paper is the *reading* surface (About body, gallery grid, Services). The site must feel navy-led, NOT cream-led. Cream-dominant is the AI-slop cluster; we are not that.
- **Vermilion is a scalpel, not a bucket.** Allowed on: active nav/filter state, ONE emphasis word per statement, the K-mark on hover, index ticks, the underline that draws on link hover. NEVER as a large fill, button background, or gradient. If vermilion covers more than ~2% of any viewport, it's wrong.
- No other colours. No gradients. No tints beyond the six tokens above.

**Two slop-clusters to consciously avoid** (from design review):
1. Cream + serif + warm-clay accent (`#D97757`-ish) → our accent is a true vermilion red, and navy dominates. Keep it that way.
2. Near-black + single acid accent → our ink screens are always broken up by bone sections, editorial serif, and real renders. Never let an ink screen read as generic dark-mode.

---

## 2. Type system (3 deliberate roles — self-hosted, never Inter/system)

The type system itself encodes the thesis: **serif = heritage, grotesk = new rules, mono = the technical/architectural spec sheet.**

| Role | Face | Source | Use |
|---|---|---|---|
| Display (heritage) | **Zodiak** | Fontshare (free, self-host) | Big editorial statements, project names, the wordmark voice. High-contrast serif; elegant, a little sharp. Used LARGE and sparingly. |
| Body / UI (new rules) | **Satoshi** | Fontshare (free, self-host) | Body copy, nav, buttons, service text. Clean modern grotesk. |
| Meta / data (spec sheet) | **Space Mono** | Google Fonts (`next/font`) | Year tags, locations, index numbers, coordinates, eyebrows. Tracked, uppercase. Gives an architectural-annotation texture. |

Self-host Zodiak + Satoshi: download the woff2 files from Fontshare into `/public/fonts`, declare `@font-face`, expose as CSS vars `--font-display`, `--font-body`. Load Space Mono via `next/font/google`.

**Type scale (clamp, fluid):**
```
display-xl : clamp(3rem, 11vw, 11rem)   /* hero statement */
display-l  : clamp(2.2rem, 6.5vw, 6rem)  /* section statements */
display-m  : clamp(1.6rem, 3.2vw, 3rem)  /* project names, sub-statements */
body       : clamp(1rem, 1.15vw, 1.25rem)
meta       : 0.75rem, letter-spacing 0.14em, uppercase (Space Mono)
```
Display leading tight (0.95–1.02). Body leading 1.5. One emphasis word per big statement set in *Zodiak italic* (and optionally vermilion), everything else roman.

---

## 3. Layout

- 12-column grid, side margins `6vw` desktop / `5vw` tablet / `20px` mobile. Max content width ~1600px, but hero/works/section-breaks go full-bleed.
- Deliberate asymmetry: statements pushed left or offset, images breaking the grid edge. Do not centre everything.
- Vertical rhythm alternates ink → paper → ink so scrolling has pulse.
- Generous whitespace. When unsure, add space, not decoration.

---

## 4. The signature (spend the boldness here; keep everything else quiet)

**The Works Index** — a horizontal, drag-scrollable catalogue on an ink surface, where heritage-serif project names sit against the futuristic renders, tagged in mono (year · location · type), navigated by a custom **K-mark cursor** (the K from the logo). This is the one thing the site is remembered by and the one thing you record for the socials reel. Everything around it stays disciplined.

Supporting motif: the **K-mark** (extract/redraw from the logo) recurs as the custom cursor and as a small section marker. Used with restraint.

---

## 5. Motion system (exact values — this is what separates supercar from slop)

Core stack: **Lenis** (smooth scroll) + **Framer Motion** (component motion) + **GSAP ScrollTrigger** (ONLY for the pinned horizontal Works index).

**Integration note (do this or scroll will fight itself):** drive ScrollTrigger from Lenis —
```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

- **Lenis:** `lerp: 0.09`, smoothWheel true. That weighted glide is half the premium feel.
- **Signature easings:**
  `--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);` (reveals, decelerate)
  `--ease-inout: cubic-bezier(0.65, 0, 0.35, 1);` (moves)
  Never use default `ease` / `ease-in-out`.
- **Headline reveal (line mask):** wrap each line in `overflow:hidden`; inner span animates `translateY(110% → 0)`, `--ease-out-expo`, 0.9s, stagger 0.07s per line. Trigger when 30% in view. NOT opacity fade.
- **Image reveal:** container `clip-path: inset(0 0 100% 0) → inset(0 0 0 0)` over 1.1s `--ease-out-expo`; inner `<img>` `scale(1.08 → 1)` same duration. This is the photographic wipe — use it for every hero/gallery image.
- **Hover (project card / link):** image `scale(1.03)`; a 1px vermilion underline draws L→R (`scaleX 0→1`, transform-origin left, 0.4s); meta shifts up 2px. Subtle.
- **Loader → hero:** ink full-screen; centred wordmark + `Architecture · Real Estate · Construction` + `Lagos · London`; a Space-Mono counter `000 → 100`. On 100, the ink panel lifts as a curtain (`clip-path inset(0 0 0 0) → inset(100% 0 0 0)` or translateY) over 1s `--ease-inout`, revealing the hero beneath; wordmark travels to nav position. ~1.8–2.4s total. Runs once per session (guard with sessionStorage).
- **Section divider marquee:** a slow horizontal marquee of `OXBRIDGE KNIGHTS —` or `ARCHITECTURE — REAL ESTATE — CONSTRUCTION —` in Zodiak, ink-on-paper or paper-on-ink. One, maybe two on the whole site. Not everywhere.
- **Custom cursor:** 10px dot, `mix-blend-mode: difference`. Over the Works index it grows to a ~64px disc showing the K-mark + `DRAG`. Over links → grows with `VIEW`. Hidden on touch devices.
- **Parallax:** subtle only (≤12% differential) on a few hero/section images. No parallax on the gallery grid.
- **`prefers-reduced-motion`:** disable Lenis, the loader curtain, line masks and parallax; fall back to instant/opacity. This is a quality floor, not optional.

**Motion ban:** no pulsing dots, no infinite bobbing arrows, no fade-up-everything, no scroll-jacking that traps the user, no spinner rings.

---

## 6. Page architecture & copy

Copy below is real and final-ish; use it, don't replace it with lorem or generic marketing. Tune lightly if needed.

### Loader → Home
- **Loader:** as in §5.
- **Hero (ink):** full-bleed hero render (`p17_a` or `p03_a` — tack-sharp mixed-use towers) held right/full, with the statement over/beside it:
  `Old name.` / `New *rules*.` (emphasis word Zodiak italic, vermilion). Meta marker: `LAGOS · LONDON — EST. 2016`. A quiet `SCROLL` in mono, bottom.
- **01 — Studio (paper):** short intro statement:
  “We’re an architecture, real estate and construction studio in Lagos, with a foot in London. Ten years of built work, and a young team that treats a conservative profession as an open invitation.” Sub: a link → About.
- **Selected Works (ink) = THE SIGNATURE:** horizontal drag Works index, 7–8 of the sharpest projects (prioritise tier:"hero" from manifest: p17, p03, p29, p11, p14, p19, p20, p23, p50, p52). Each panel: full render, Zodiak name, mono `YEAR · LOCATION · TYPE`. End panel → `All projects (44)` link to Projects.
- **Services teaser (paper):** the five services as a numbered catalogue `(01)–(05)` — numbering allowed here because it's a real catalogue. Name + one line each (see Services page). Hover reveals a related render.
- **Approach (ink):** one big statement: “Luxury isn’t loud. It’s *built* right.” (emphasis italic). Two short columns of body.
- **CTA (paper→ink):** `Let’s build.` huge, → Contact.
- **Footer (ink):** wordmark, Lagos + London lines, email, phone, Instagram, LinkedIn, `Back to top`, © Oxbridge Knights 2026.

### About
- Hero statement: `Heritage in the name. *Not* in the work.`
- Story (2–3 short paras): Lagos studio + London presence; 10+ years; young team; the range — high-rises, residences, civic and recreational work; the belief that Lagos deserves architecture as ambitious as the city.
- **Three values** — named editorial statements, NOT numbered (avoids the generic 01/02/03 tell):
  - **Nerve.** “We design buildings confident enough to look unlike their neighbours.”
  - **Rigor.** “Every line is drawn to be built. Beauty that survives the site.”
  - **Context.** “Lagos is the brief. We build for how this city actually lives.”
- Stats row (mono): `44 projects · 10+ years · 2 cities · Lagos ✳ London`.
- **“Built since 2016”** — a small, quiet strip of the 6 legacy works (manifest `legacy:true`), lower contrast, to prove track record without competing with the modern renders.

### Services (5) — numbered catalogue `(01)–(05)`
Each: number (mono, vermilion), name (Zodiak), one line (Satoshi), and 1–2 related renders pulled from the matching manifest category.
1. **Architecture** — “Concept to completion, across residential, commercial and civic.”
2. **Interior Design** — “Interiors that finish the architecture, not decorate it.”
3. **Real Estate Development** — “We originate, design and de-risk the projects we believe in.”
4. **Construction & Project Delivery** — “Drawings become buildings, on the ground, in Lagos conditions.”
5. **Master Planning** — “Estates and mixed-use districts planned to grow well.”

### Projects (the gallery)
- Reads `data/manifest.json`. Ink section header, paper grid.
- **Filter bar:** `All · Mixed-Use · Residential High-Rise · Multi-Residential · Private Residence · Interiors · Commercial & Civic · Recreational`. Active filter = vermilion. Filtering re-lays the grid with a quick stagger (Framer layout animation).
- **Grid:** editorial/asymmetric (not uniform cards). Each item: render (clip-reveal + hover scale), Zodiak name, mono `YEAR · LOCATION`. Respect `tier`: `hero` items span larger; `gallery` items sit standard. Sort by year desc within filter.
- **Detail = lightbox overlay** (not separate pages — assets are 1–2 images/project): click opens an ink overlay with the render(s) large, name, type, location, date. Prev/next. Close = K-mark cursor `CLOSE`.

### Contact
- Statement: `Tell us what you want to build.`
- Form: Name, Email, Phone, Message. Labels in mono, inputs underlined (no boxed cards). Submit button says `Send` → success state says `Sent`.
- Details block: `Lagos, Nigeria` / `London, UK` / email / phone / Instagram / LinkedIn.
- Backend: **Web3Forms** (free, no server) via a POST to their endpoint with the client access key in an env var, OR a Next.js route handler + Resend. Pick Web3Forms for speed. On success show the `Sent` state; on error, an in-voice message (“That didn’t send. Try again, or email us directly.”). No fake success.

---

## 7. Tech & file contract

- **Next.js (App Router) + TypeScript + Tailwind.** Deploy Vercel.
- **Deps:** `lenis`, `framer-motion`, `gsap` (+ ScrollTrigger), `next/font` for Space Mono. Self-host Zodiak + Satoshi.
- **Images:** the 56 renders live in `/public/library/` (filenames match `manifest.json` `images[]`). Use `next/image`. `sizes` set by tier: hero → up to 100vw; gallery → ~45vw desktop. Alt text = project `title` + location.
- **Data:** `/data/manifest.json` (provided). Projects gallery, Works index, and Services renders all read from it. Never hardcode a project list.
- **Quality floor:** responsive to 360px, visible keyboard focus rings (not removed), semantic headings, `prefers-reduced-motion` honoured, Lighthouse-sane (lazy-load below fold, no layout shift on image reveal — reserve aspect ratios).

**CSS specificity caution:** keep section padding on a single consistent selector strategy; don't let element-based and class-based selectors cancel each other's margins/padding between sections.

---

## 8. Build order (phases with completion gates — do NOT skip ahead)

1. **Scaffold.** Next.js + TS + Tailwind; drop `/public/library` + `/data/manifest.json`; wire fonts + colour tokens + type scale. Gate: a blank page renders with correct fonts/colours.
2. **Chrome + smooth scroll.** Nav, footer, Lenis, cursor, tokens. Gate: smooth scroll + custom cursor work, reduced-motion path works.
3. **Home static.** All sections laid out with real copy + images, NO motion yet. Gate: home reads right top-to-bottom on desktop + mobile.
4. **Motion layer.** Loader→hero curtain, line-mask reveals, image clip-reveals, hover states. Gate: home feels alive; no jank; reduced-motion clean.
5. **Works index (signature).** Pinned horizontal GSAP section with Lenis sync + K-mark drag cursor. Gate: drags smoothly, mobile falls back to swipe/stack.
6. **Projects gallery.** manifest-driven grid + filters + lightbox. Gate: all 44 modern projects render, filters + lightbox work.
7. **About, Services, Contact.** Gate: all pages complete, form sends.
8. **Polish + ship.** Perf pass, focus states, meta/OG, favicon from K-mark, deploy Vercel.

Ship each phase before starting the next. One task at a time.

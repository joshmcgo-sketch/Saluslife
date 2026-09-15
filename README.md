# Threshold

An investor-demo marketing + catalog site for **Threshold** — an independent certification
authority for wellness products (a testing lab with a public seal, not a marketplace).

Built with **React + Vite + Tailwind CSS + React Router**. Static frontend, local mock data,
no backend.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

```bash
npm run build    # production build to /dist
npm run preview  # serve the built output
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home — hero, trust strip, standards teaser, process, featured products, brands CTA |
| `/mission` | Problem statement + mission & no-sponsorship commitment |
| `/standards/equipment` | Full 5-part Equipment rubric (flagship) with pass-bar detail |
| `/standards/ingestibles` | Full 5-part Ingestibles rubric with pass-bar detail |
| `/catalog` | 12 marked products, filter by track (All / Equipment / Ingestibles) |
| `/product/:id` | Product detail — sticky image + scrolling rubric breakdown + Oasis-style reference card |

## Design notes

- **Palette (new — not the mockup's paper/forest/brass):** near-black warm ink canvas, layered
  card surfaces, warm bone text, a single **azure** interactive accent, and **green / amber / coral**
  reserved strictly for scoring semantics. Dark, editorial, high-trust — matching the Oasis
  reference aesthetic.
- **Type:** Fraunces (editorial display) + Inter (text).
- **Motion:** scroll-triggered fade/slide reveals with ~60–120ms stagger (`components/Reveal.jsx`,
  IntersectionObserver), score numbers count up from 0 (`ScoreRing`, `useCountUp`), product cards
  hover-lift ~4px. All respect `prefers-reduced-motion`.
- **Trust mark:** engraved seal in `components/Seal.jsx`, used consistently as the certification badge.

## Data

All content lives in:

- `src/data/standards.js` — the two 5-part rubrics + the 4-step process.
- `src/data/products.js` — 12 fabricated products, each with per-rubric findings, a "why it passed"
  writeup, and an Oasis-style independent lab reference profile.

Test data is **fictional** — clearly labelled throughout as a demo.

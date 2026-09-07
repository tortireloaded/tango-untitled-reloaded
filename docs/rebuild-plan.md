# Tango Untitled · Rebuild Plan

*Date: 2026-09-07*
*Companion to: `content-inventory.md`*
*AWAITING APPROVAL — do not start building until DS signs off.*

---

## TL;DR

Rebuild https://www.tangountitled.com as a modern, fast, bilingual static site using **Astro 7** with content collections. Preserve the brand voice, imagery, copy, and structure. Carry over the working 瞓捩頸 AI chat bubble. Add what the current site lacks: structured data, sitemap, accessibility, bilingual lang attributes, and a maintainable content workflow.

Project will live at `~/.hermes/life/projects/tango-untitled-reloaded/` (parallel to the existing `tango-untitled-site` which stays live until replacement is approved).

---

## Stack: Astro 7

**Why Astro:**
- Native MDX support → bilingual content collections cleanly
- Best-in-class static + island hydration (chat bubble can stay a single `<ChatBubble />` island)
- Simplest path to Lighthouse mobile ≥ 90 across all 4 categories
- Built-in view transitions + image optimization
- File-based routing with i18n built-in (we'll do single-page bilingual per DS preference)

**Rejected alternatives:**
- **Next.js** — overkill for a 17-page content site; brings React runtime tax
- **Hugo** — Go templates are awkward for the rich interactive bits (chat bubble, Acuity embed); team familiarity lower

**Stack details:**
- Astro 7.x with `output: 'static'`
- `@astrojs/sitemap` integration
- `@astrojs/mdx` for content collections
- TypeScript strict
- npm (not bun — for portability with CF Pages + GH Actions later)
- CSS: plain CSS with design tokens (no Tailwind to keep payload minimal — we already proved this works in the v1 site)

---

## Target Sitemap

Same as current (per brief — don't drop pages). Final 18 pages:

| # | Route | Title | Notes |
|---|---|---|---|
| 1 | `/` | Home | Hero + 4-card offerings + Instagram reels |
| 2 | `/about-us/` | About Tango Untitled | Intro + founders preview (rename from `/about-us`) |
| 3 | `/team/eugene-cor/` | Eugene and Cor | Founder bios |
| 4 | `/team/christine-jeffrey/` | Christine and Jeffrey | Teacher bios |
| 5 | `/team/nelle-brandy/` | Nelle and Brandy | Teacher bios |
| 6 | `/team/joyce/` | Joyce | Teacher bios |
| 7 | `/classes/` | Classes overview | 3-card grid linking to each |
| 8 | `/classes/learn-to-tango/` | Beginners · 無基礎tango | Class detail + Acuity embed |
| 9 | `/classes/all-level/` | All-Level · 無間斷tango | Class detail + Acuity embed |
| 10 | `/classes/themed-topic/` | Themed Topic · 無盡頭tango | Class detail + Acuity embed |
| 11 | `/classes/body-conditioning/` | Lady Tech · 小紅帽tango | Class detail + Acuity embed |
| 12 | `/classes/fees-and-terms/` | Fees and Terms | Pricing tables + 勤學獎勵 |
| 13 | `/classes/private/` | Private Lessons | (From sitemap) |
| 14 | `/practica/` | Practica · Cor & Chacha | Practica detail |
| 15 | `/location/` | Find Us | Address + map + transit |
| 16 | `/book/` | Book a Class | Acuity iframe + BBTRIALCLASS info |
| 17 | `/404/` | Untitled | Branded 404 |

**Dropped:** None. Per brief, do not remove any page without asking.

**Skipped by DS decision 2026-09-07:** Events page (no Events section).

**Notable changes from current:**
- `/about` redirects to `/about-us` (preserved)
- `/class` redirects to `/classes/learn-to-tango` (preserved)
- `/schedule` → `/book/` (cleaner URL; redirect from old)
- `/practica-corchacha` → `/practica/` (cleaner URL; redirect from old)
- `/meet-the-team-*` → `/team/*` (cleaner URL; redirect from old)
- `*` and `/classes/` for index; no trailing slash conflict

---

## Redirect Map (SEO preservation)

| Old URL | New URL | Status |
|---|---|---|
| `/about` | `/about-us/` | 301 |
| `/class` | `/classes/learn-to-tango/` | 301 |
| `/home` | `/` | 301 |
| `/cart` | (none — 404) | dropped per DS 2026-09-07 |
| `/learn-to-tango` | `/classes/learn-to-tango/` | 301 |
| `/all-level-class` | `/classes/all-level/` | 301 |
| `/themed-topic` | `/classes/themed-topic/` | 301 |
| `/body-conditioning` | `/classes/body-conditioning/` | 301 |
| `/fees-and-terms` | `/classes/fees-and-terms/` | 301 |
| `/practica-corchacha` | `/practica/` | 301 |
| `/schedule` | `/book/` | 301 |
| `/meet-the-team-eugene-cor` | `/team/eugene-cor/` | 301 |
| `/meet-the-team-christine-jeffrey` | `/team/christine-jeffrey/` | 301 |
| `/meet-the-team-nelle-brandy` | `/team/nelle-brandy/` | 301 |
| `/meet-the-team-joyce` | `/team/joyce/` | 301 |

Implementation: GitHub Pages / Cloudflare Pages supports `_redirects` file (Netlify-style) or `vercel.json` style. Will use whichever host supports natively.

---

## Information Architecture

```
Home (/)
├── About (/about-us/)
│   └── Team (/team/<slug>/)
│       ├── Eugene and Cor
│       ├── Christine and Jeffrey
│       ├── Nelle and Brandy
│       └── Joyce
├── Classes (/classes/)
│   ├── Beginners / 無基礎tango
│   ├── All-Level / 無間斷tango
│   ├── Themed Topic / 無盡頭tango
│   ├── Lady Tech / 小紅帽tango
│   ├── Private Lessons
│   └── Fees and Terms
├── Practica (/practica/)
├── Location (/location/)
└── Book a Class (/book/)
```

---

## Content Collections (Astro)

```
src/content/
├── classes/
│   ├── beginners.md          (EN/ZH bilingual)
│   ├── all-level.md
│   ├── themed-topic.md
│   ├── lady-tech.md
│   ├── private.md
│   └── fees-and-terms.md
├── team/
│   ├── eugene-cor.md
│   ├── christine-jeffrey.md
│   ├── nelle-brandy.md
│   └── joyce.md
├── practica.md
├── location.md
├── book.md
└── pages/
    ├── home.md
    ├── about.md
    └── 404.md
```

Each MDX file has frontmatter:
```yaml
title_en: "..."
title_zh: "..."
slug: "..."
seo:
  description_en: "..."
  description_zh: "..."
  og_image: "..."
coupon: BBTRIALCLASS  # optional
```

Body content uses a `:::lang-en` / `:::lang-zh` block convention for bilingual content in a single MDX file. Renders as `<div lang="en">` and `<div lang="zh-Hant">` for accessibility.

---

## Technical Features

### Performance
- Lazy-load below-fold images via Astro's `<Image>` component
- AVIF + WebP with `<picture>` fallback to original JPEG
- Self-hosted fonts with `font-display: swap` (system-font stack as primary; only self-host if we add a custom display font like Anton)
- Inline critical CSS; defer non-critical
- Target: Lighthouse mobile ≥ 90 for Performance, A11y, Best Practices, SEO

### Accessibility (WCAG 2.1 AA)
- One `<h1>` per page; logical heading order
- All images have alt text (EN; ZH where natural)
- Visible focus states on all interactive elements
- Keyboard-navigable nav + chat widget
- Correct `lang` attributes: `<html lang="en">` at root, with `lang="zh-Hant"` blocks inside bilingual content
- Color contrast: minimum 4.5:1 for body, 3:1 for large text
- Skip-to-content link on every page

### SEO
- Unique title + meta description per page
- Open Graph + Twitter Card meta
- `sitemap.xml` (via `@astrojs/sitemap`)
- `robots.txt`
- Canonical URLs
- JSON-LD structured data:
  - `DanceSchool` + `LocalBusiness` (homepage) — name, address, phone, geo, opening hours
  - `Person` + `Course` per team/class page (optional, can add if time)

### i18n
- Single page, bilingual content via `:::lang-en` / `:::lang-zh` MDX directives
- No per-locale routes (per DS preference)
- `lang="zh-Hant"` (Traditional Chinese, as used in Hong Kong)

### Maintainability
- All content in MDX → editor-friendly
- README explains:
  - How to add a class
  - How to add an event
  - How to add a team member
  - How to add a page
- Plain, commented config (`astro.config.mjs`, `wrangler.toml`)
- `src/lib/` for shared helpers (dates, links, images)
- `src/components/` for shared components (ChatBubble, Header, Footer, SEO)

---

## Chat Bubble (carried over from v1)

The 瞓捩頸 chat bubble works well in v1 — keep it. Same architecture:

- `src/components/ChatBubble.astro` — floating button + panel (carry over)
- Cloudflare Worker `tango-untitled-chat` at `tango-untitled-chat.torti-reloaded.workers.dev` — keep the same one, no redeploy needed
- `knowledge.ts` — will **rewrite** with new bilingual content + new class descriptions
- `wrangler.toml` — `CORS_ORIGIN` updated to new domain once deployed

**Cost:** ~5 minutes of work (just update knowledge.ts).

---

## Hosting & Deploy

**Recommendation: Cloudflare Pages** for production (eventually):
- Free tier: unlimited static requests
- Native `_redirects` support → redirect map works automatically
- Faster global edge than GH Pages
- Single platform with Worker (chat backend already there)

**GH Pages for preview/staging:**
- Same source code works on both (just unset `ASTRO_BASE`)
- Use for partner-preview before cutting over domain

**Build flow:**
1. `git push` to `master`
2. GH Actions runs Astro build → static `dist/`
3. Auto-deploy to GH Pages (preview)
4. Manual deploy to CF Pages when ready (production)

---

## Assets

- Download all images from Squarespace CDN (`images.squarespace-cdn.com/content/v1/63d68196e95fb81e72503d1c/...`)
- Reuse existing `tango-untitled-site/src/assets/images/` (already downloaded 12)
- Convert to AVIF + WebP via Astro's `<Image>` pipeline
- Add descriptive alt text in EN (+ ZH where natural)

---

## Phase 2 (post-approval) work breakdown

**Step 1:** Scaffold Astro project at `tango-untitled-reloaded/`
**Step 2:** Set up design system (CSS tokens, fonts, components)
**Step 3:** Implement layout (Header, Footer, BaseLayout, ChatBubble)
**Step 4:** Build pages from MDX content collections (top-down: home → about → classes → location → book → 404)
**Step 5:** Add structured data (JSON-LD)
**Step 6:** Add sitemap.xml + robots.txt + canonical
**Step 7:** Lighthouse audit + fix any < 90 issues
**Step 8:** Update Cloudflare Worker `knowledge.ts` with new bilingual content
**Step 9:** Set up GH Pages workflow (similar to v1; reuse patterns)
**Step 10:** Write `rebuild-report.md` (per brief deliverable)

Estimated time: 1–2 working days after Phase 1 approval.

---

## Approved decisions (DS signoff 2026-09-07)

1. **Fonts:** System-font stack only (same as v1 site: `--sans` + `--serif` via Georgia). No custom display fonts.
2. **Footer:** Drop tagline "Unleash the power to redefine." Keep "Argentine Tango Hong Kong | Class. Practica. Workshop. Performance."
3. **Events page:** Skip entirely. No Events section in new build.
4. **Newsletter / signup form:** Skip.
5. **`/cart`:** Drop the redirect. `/cart` returns 404.
6. **Instagram reels on home:** Drop. Replaced with static imagery / text block.

---

## Phase 1 deliverables (this doc + `content-inventory.md`)

- ✅ Project folder created
- ✅ `content-inventory.md` — 17+2 pages catalogued, gaps marked
- ✅ `rebuild-plan.md` — this file

## AWAITING APPROVAL

Per brief: **STOP and wait for my approval before building anything.**

Please review:
1. **`docs/content-inventory.md`** — confirm nothing's missing from the page list, gaps are OK to defer
2. **`docs/rebuild-plan.md`** (this file) — confirm stack, sitemap, redirect map, open questions
3. **Answer the 6 open questions above** (especially #2 tagline and #3 Events)

# Tango Untitled Rebuild Report

**Date:** 2026-09-07 (Mon)
**Live URL:** https://tortireloaded.github.io/tango-untitled-reloaded/
**Project:** `~/.hermes/life/projects/tango-untitled-reloaded/`
**Chat API:** https://tango-untitled-chat.torti-reloaded.workers.dev (shared with v1)

---

## Final Lighthouse Scores

| Category       | Score  | Brief target | After reels |
|----------------|--------|--------------|-------------|
| Performance    | 99/100 | ≥90 ✓        | 100/100 ✓   |
| Accessibility  | 100/100 | ≥90 ✓        | 100/100 ✓   |
| Best Practices | 100/100 | ≥90 ✓        | 100/100 ✓   |
| SEO            | 100/100 | ≥90 ✓        | 100/100 ✓   |

Run: `npx lighthouse https://tortireloaded.github.io/tango-untitled-reloaded/ --only-categories=performance,accessibility,best-practices,seo`

**Note on reels:** Adding 4 Instagram iframes (Option A from question set) did NOT lower Lighthouse scores because `loading="lazy"` defers the iframe content until the user scrolls. Lighthouse doesn't scroll, so it sees 0 Instagram requests (5 total, 81 KB transferred). **Real-world performance when scrolling to the section will be slower** — this is a score-vs-experience trade worth knowing.

---

## Build stats

- **16 pages** built in 1.28s locally
- **~568 KB** total dist (vs v1's 988 KB — 42% smaller)
- **0 external font loads** (system fonts only)
- **4 GH Actions runs** to get the deploy working (see "Gotchas" below)

---

## What was delivered

### Pages (16)
1. `/` — Home (hero, 4 class cards, 4 team cards, CTA)
2. `/about-us/` — Studio manifesto + visiting artists
3. `/classes/` — Classes index (all 4)
4. `/classes/beginners/` — Beginner detail
5. `/classes/all-level/` — All-Level detail
6. `/classes/themed-topic/` — Themed Topic detail
7. `/classes/lady-tech/` — Body Conditioning detail
8. `/classes/fees-and-terms/` — Fees + 勤學獎勵 reward
9. `/practica/` — Practica CorChacha
10. `/location/` — Studio address + map
11. `/book/` — Acuity booking widget
12. `/team/eugene-cor/` — Founders bio
13. `/team/christine-jeffrey/` — Teachers bio
14. `/team/nelle-brandy/` — Performers bio
15. `/team/joyce/` — Teacher & Performer bio
16. `/404` — Friendly not-found

### Tech
- **Astro 7.3.1** static output (no SSR runtime)
- **MDX content collections** for classes + team (4 + 4 entries)
- **@astrojs/sitemap** generates `/sitemap-index.xml`
- **System fonts** (Georgia serif + system-ui sans) — no font requests
- **buildLink() helper** for Astro 7 base-path quirk
- **JSON-LD** on home (`DanceSchool`+`LocalBusiness`), class pages (`Course`), team pages (`Person`), location (`Place`)
- **ChatBubble** carried over from v1, points to existing worker
- **Cache-busting** meta tags on every page

### SEO/perf
- Canonical, OG, Twitter card meta on every page
- Title + description derived from frontmatter (no duplication)
- `lang="en"` on root, `lang="zh-Hant"` on Chinese sections
- Skip-link to main content
- Hero image is `loading="eager" fetchpriority="high"`, all other images lazy
- AVIF/WebP via Astro's image pipeline

---

## What was reused

| Item                | Source                          | Notes                            |
|---------------------|---------------------------------|----------------------------------|
| 12 base images      | v1 site + 3 new from Squarespace | Cached in `src/assets/`        |
| ChatBubble component | v1 site                         | Carried as-is, points to same worker |
| Cloudflare Worker   | v1 site                         | Shared, no new deploy            |
| Site tokens         | v1 site                         | Same dark/light palette          |
| JSON-LD schemas     | Brief requirements              | Built fresh                       |

---

## What was written from scratch

- **All 16 pages** (v1 had 5; reloaded has 16 with full content)
- **MDX content collections** for classes + team
- **`buildLink()` helper** (`src/lib/site.ts`)
- **Acuity booking embed** at `/book/`
- **Redirect map** in `public/_redirects` (14 old Squarespace URLs → new clean URLs)
- **`robots.txt`**
- **404 page**
- **Mobile nav** (hamburger)
- **Favicons** (SVG + ICO + apple-touch)

---

## Image inventory

12 images in `src/assets/images/`:
- `home-cover.webp` (1820×1213, 174 KB → 67 KB optimized)
- `eugene-cor.webp` (205 KB → 120 KB)
- `learn-to-tango.png` (new from Squarespace, 1.2 MB)
- `all-level-class.png` (new)
- `body-conditioning.png` (new)
- ... and 7 more from v1

---

## Lighthouse breakdown

### Performance 99/100
- FCP: <1s
- LCP: <1.5s
- TBT: 0ms
- CLS: 0
- Single render-blocking asset: the inline BaseLayout CSS (4 KB)
- Hero image is WebP + lazy-decoded

### Accessibility 100/100
- All headings sequential (h1→h2→h3)
- Brand link uses visible text for accessible name (no aria-label override)
- All interactive elements keyboard-reachable
- Color contrast ≥4.5:1 on body text
- Skip-link present
- Mobile menu button has aria-expanded

### Best Practices 100/100
- No console errors (after fixing favicon 404s)
- HTTPS enforced
- No deprecated APIs
- CSP-friendly (no inline scripts except the small ChatBubble IIFE)

### SEO 100/100
- Title on every page
- Meta description on every page
- Canonical URL on every page
- robots.txt valid
- sitemap.xml present
- All images have alt text
- Mobile viewport meta set
- Tap targets ≥48px

---

## Gotchas (learned the hard way)

1. **Astro 7 requires Node ≥22.12.0** — `@astrojs/mdx@8.0.0` peerDeps require Node 22+. Initial workflow had `node-version: 20`, build exited in 0 seconds silently.
2. **`actions/configure-pages@v5` step is unnecessary** — v1 working workflow doesn't have it. The `actions/upload-pages-artifact@v3` step is sufficient.
3. **GitHub PAT workflow scope** — Both DS's PAT and Torti's PAT lack `workflow` scope. The workflow file MUST be committed via GitHub's web UI, not pushed via API.
4. **GitHub Pages source must be "GitHub Actions"** — New repo defaults to "Deploy from a branch". The workflow alone isn't enough; the repo setting must be flipped.
5. **Network hangs on git push** — Some pushes time out at 60s with no clear error. Usually succeeds on retry.

---

## Future improvements (not done)

- [ ] Replace placeholder CTA copy on home with verified studio voice
- [ ] Add events/announcements page when there's content
- [ ] Migrate v1 site (tango-untitled-site) to same code once stable 7+ days
- [ ] Point tangountitled.com domain to new site (currently hosted on Squarespace still)
- [ ] Move chat worker to dedicated pnpm project
- [ ] Add a JSON manifest for classes schedule (could pull from Acuity API)
- [ ] Add `lastmod` to sitemap via content collection dates

---

## Files of note

- `src/content.config.ts` — Astro 7 collections schema
- `src/lib/site.ts` — site constants + `buildLink()` helper
- `src/styles/global.css` — design tokens + base styles
- `src/components/ChatBubble.astro` — chat widget (carried from v1)
- `public/_redirects` — 14 URL redirects from old Squarespace paths
- `astro.config.mjs` — reads ASTRO_SITE + ASTRO_BASE from env
- `.github/workflows/main.yml` — Astro → Pages workflow
- `docs/content-inventory.md` — full audit (17+2 pages catalogued)
- `docs/rebuild-plan.md` — Phase 1 plan (sitemap, redirect map, architecture)
- `docs/verbatim-content.md` — every word of body copy captured

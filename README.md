# Tango Untitled · Rebuilt

A clean, modern, fast rebuild of [tangountitled.com](https://www.tangountitled.com) — Argentine Tango school in Hong Kong.

> **Status:** Built and deployed for preview on GitHub Pages. Production (tangountitled.com) pending.
> **Original v1 (chat-bubble-era):** `~/.hermes/life/projects/tango-untitled-site/`

---

## Stack

- **Astro 7.3** — static-first, minimal client JS
- **MDX content collections** — classes and team bios in `.md` files
- **TypeScript strict**
- **System fonts only** (no external font loads)
- **Cloudflare Pages** recommended for production (free, native `_redirects`)
- **GitHub Pages** for staging preview

## Quick start

```bash
npm install        # one-time
npm run dev        # local dev server on :4321
npm run build      # production build → dist/
npm run preview    # preview dist/ on :4321
```

## Project structure

```
.
├── astro.config.mjs                # reads ASTRO_SITE + ASTRO_BASE from env
├── public/
│   ├── _redirects                  # Cloudflare/Netlify-style redirect map
│   └── robots.txt
├── src/
│   ├── assets/images/              # downloaded from Squarespace CDN
│   ├── components/
│   │   ├── ChatBubble.astro        # 瞓捩頸 AI chat widget
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── content/
│   │   ├── classes/                # 4 MDX files: beginners/all-level/themed-topic/lady-tech
│   │   └── team/                   # 4 MDX files: eugene-cor/christine-jeffrey/nelle-brandy/joyce
│   ├── content.config.ts           # Astro collections schema
│   ├── layouts/BaseLayout.astro    # SEO, JSON-LD, header, footer, chat
│   ├── lib/site.js                 # buildLink() + site constants
│   ├── pages/
│   │   ├── index.astro             # home
│   │   ├── about-us.astro
│   │   ├── book.astro
│   │   ├── classes/
│   │   │   ├── index.astro
│   │   │   ├── [slug].astro       # dynamic class detail (uses content collection)
│   │   │   └── fees-and-terms.astro
│   │   ├── location.astro
│   │   ├── practica.astro
│   │   ├── team/[slug].astro       # dynamic team detail (uses content collection)
│   │   └── 404.astro
│   └── styles/global.css           # design tokens + base styles
└── .github/workflows/deploy.yml    # GH Pages auto-deploy on push
```

## How to add a new class

1. Create `src/content/classes/<slug>.md`
2. Fill in the frontmatter (title, hashtag, group, summary, fee, etc.)
3. Write body in MDX — `##` for sections, `>` for pull quotes
4. `npm run dev` to preview; `npm run build` to ship

## How to add a new teacher

1. Create `src/content/team/<slug>.md`
2. Set `name`, `slug`, `role`, `summary` in frontmatter
3. Add a `photo` field if you have one (path under `src/assets/images/`)
4. Body in MDX

## How to add a new page

1. Create `src/pages/<path>.astro`
2. Import `BaseLayout`, set `title`, `description`, `current`, `jsonLdType`
3. Write your sections inside the `<BaseLayout>` tag

## Environment variables

| Var | Default | Purpose |
|---|---|---|
| `ASTRO_SITE` | `https://www.tangountitled.com` | Used for canonical URLs, OG, JSON-LD |
| `ASTRO_BASE` | `/` | URL prefix (set `/tango-untitled-reloaded` for GH Pages subpath) |
| `PUBLIC_CHAT_API_URL` | (empty) | Cloudflare Worker URL for the chat bubble |

GH Actions workflow sets these for the staging deploy. For local dev, they're optional.

## Deploy

**GitHub Pages (staging):**
- Push to `master` → auto-deploys via `.github/workflows/deploy.yml`
- Live at: `https://tortireloaded.github.io/tango-untitled-reloaded/`

**Cloudflare Pages (production, future):**
1. Create project at https://dash.cloudflare.com → Pages
2. Connect this repo, build command `npm run build`, output dir `dist`
3. Set `ASTRO_SITE` env var to `https://www.tangountitled.com`
4. Don't set `ASTRO_BASE` (root domain)
5. Add custom domain `tangountitled.com` — DNS automatic via Cloudflare
6. After 7+ days stable, cancel Squarespace *website* sub (keep domain)

## AI chat (瞓捩頸)

The chat bubble uses a Cloudflare Worker (`tango-untitled-chat.torti-reloaded.workers.dev`) backed by the Anthropic-compat Minimax API.

- **For staging (GH Pages):** set `PUBLIC_CHAT_API_URL` as a GitHub repo variable. The workflow will bake it into the build.
- **For production (CF Pages):** set `PUBLIC_CHAT_API_URL` as a CF Pages environment variable.
- **CORS:** the worker's `CORS_ORIGIN` env var must include your site origin. Currently set to `https://tortireloaded.github.io`; update for production.

## Brand / content rules

See `docs/rebuild-plan.md` and `docs/verbatim-content.md` for:
- Voice rules (no marketing filler; warm, sensory, welcoming)
- Bilingual hashtag motif (`#無基礎tango`, `#無間斷tango`, `#無盡頭tango`, `#小紅帽tango`)
- Coupon code `BBTRIALCLASS` (HKD 100 off first beginner class)

## License

Private — Tango Untitled · 無題探戈.

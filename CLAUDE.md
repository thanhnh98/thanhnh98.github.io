# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`saptet.vn` — the marketing/SEO/utility website for the **Sắp Tết** Vietnamese Lunar New Year countdown product. Plain HTML/CSS/vanilla JS, no framework, no bundler except one esbuild call for the Tết Runner game. Deployed to GitHub Pages (`thanhnh98/thanhnh98.github.io`): GitHub's own "pages build and deployment" builds straight from `master` on every push. Node scripts exist only as build/codegen/test tooling — nothing runs server-side.

Content language is Vietnamese; all date math is Vietnam time (UTC+7). The sibling repos (Android, iOS, backend, static JSON API) are described in `../CLAUDE.md`; this site does **not** consume them — it only links to the store listings.

`package.json` is misleadingly named `saptet-blog-crawler`.

## Commands

| Command | What |
|---|---|
| `./run.sh [/page.html]` | Local preview: no-cache Python static server on the first free port from 8000, opens the page. Use this instead of any other static server — the no-cache headers matter because of the service worker. |
| `npm test` | Node's built-in runner over `test/*.test.js`. `pretest` runs `build:tet-runner` first, so the bundle is always fresh. |
| `node --test test/events-data.test.js` | Single file. Add `--test-name-pattern="..."` for a single case. |
| `npm run build:tet-runner` | esbuild `js/tet-runner-three.js` → `js/tet-runner-three.bundle.js` (the only bundled JS on the site). |
| `npm run build:icons` | Regenerates `js/vendor/lucide-subset.js` (the homepage + header Lucide icons, pinned lucide@1.48.0). **Run after adding a `data-lucide` icon to `index.html` or `components/header.html`** — `test/home-performance.test.js` fails on a missing icon. Other pages load the pinned full UMD from unpkg. |
| `npm run generate-tin-tuc-clean-urls` | **Required after creating/renaming/deleting any `tin-tuc/<slug>.html`.** When deleting a post, add its slug → redirect target to `data/removed-news.json` so the old URL doesn't 404. |
| `npm run generate-events` | Regenerates the 37 event pages + hub + sitemap event block. |
| `npm run generate-holidays` | Regenerates the English holiday countdown pages (`/christmas`, `/ramadan`, …), the `/countdowns` hub and the sitemap holiday block. |
| `npm run inject-tet-seo` | Pre-renders day-count SEO text/JSON-LD into the countdown landing pages. |
| `npm run inject-lunar-today` | Pre-renders today's lunar/almanac data (bloc, details, FAQ, JSON-LD, title, meta) into `lich-am-hom-nay.html`. Idempotent; also runs in the daily workflow. |
| `npm run deploy` | `predeploy` (build runner + `update-version`) then commits `sw.js .version .last_build_id` and pushes `master`. |
| `npm run crawl` | VNExpress Tết-article crawler (`crawl-tet-articles.js`) that rewrites `blog.html`. Legacy; `tin-tuc/` is the live blog. |

No lint step. `.github/workflows/deploy.yml` would re-run build → clean-urls → inject-seo → update-version and publish a `gh-pages` branch, but in practice it rarely runs: `deploy.sh` ends with a `[skip ci]` commit, which skips Actions. Treat the generator steps as something you must run locally before deploying. `.github/workflows/seo-daily-update.yml` runs inject-seo + generate-events + generate-holidays daily at 00:00 VN time and commits with `[skip ci]`.

## Generated files — never hand-edit

- `js/tet-runner-three.bundle.js` (from `js/tet-runner-three.js`)
- `js/vendor/lucide-subset.js` (from `scripts/build-lucide-subset.js`)
- The English holiday countdown pages (`christmas.html`, `ramadan.html`, … one per slug in `data/holidays-en.js`) and `countdowns.html`, plus the `<!-- Holiday countdown pages (EN) -->` sitemap block — rendered from `data/holidays-en.js` through `templates/holiday-countdown.html` / `templates/holidays-index.html`. Edit data/templates, then `npm run generate-holidays`. Their share images `assets/images/og/<slug>.jpg` (+ `countdowns.jpg`) come from `npm run render-holiday-og` (needs local Chrome + macOS `sips`, emoji via Noto Color Emoji); they contain no year, so re-render only when adding a holiday or changing its name/colors. `table`-rule holidays (Diwali, Hanukkah, CNY, Ramadan, Eid) need their date lists extended before they run out; `test/holiday-pages.test.js` fails when fewer than two future dates remain.
- `su-kien-quan-trong.html`, `su-kien-quan-trong/index.html`, every `su-kien/<slug>/index.html` — all rendered from `data/events-data.js` + `data/events-content.js` through `templates/events-index.html` and `templates/event-detail.html`. Edit the data/templates, then `npm run generate-events`.
- The `<!-- Event detail pages -->` block in `sitemap.xml` (rewritten by the same script). The rest of `sitemap.xml` is hand-written.
- `tin-tuc/<slug>/index.html` redirect stubs (GitHub Pages ignores `_redirects`; the file is kept but inert), and for deleted posts listed in `data/removed-news.json` also `tin-tuc/<slug>.html`.
- Directory pages (`slug/index.html`) must use the trailing-slash URL `/slug/` in canonical, sitemap and links — GitHub Pages 301s `/slug` → `/slug/`. `test/indexing-canonical.test.js` enforces this.
- The day count in `index.html` / the Tết landings (`data-seo="days-until-tet"`, `data-seo="giao-thua-days"`, `data-seo="live-days-answer"`, and the homepage/giao-thừa meta description) is rewritten daily by `inject-tet-seo`; the script throws if a target element is missing.
- `.version`, `.last_build_id`, the `CACHE_NAME` line in `sw.js`.
- The injected SEO snippet blocks in `index.html`, `con-bao-nhieu-ngay-nua-den-tet/index.html`, `con-bao-nhieu-ngay-nua-den-giao-thua/index.html`.
- The `<!-- LUNAR_TODAY -->` block, the `#bloc-*`/`#detail-*`/`#faq-*` texts, `<title>`, meta description and `#faq-schema` in `lich-am-hom-nay.html` (rewritten by `inject-lunar-today`).

Hand-written: page HTML, `css/*`, `js/*` (except the bundle), `data/*.js`, `data/foods/*.json`, `data/aff/products*`, `news.json`, `tin-tuc/<slug>.html`, the rest of `sitemap.xml`.

## Architecture

**Page shape.** Each top-level `.html` is standalone: its own `<head>` meta/OG/JSON-LD, its own `css/<feature>.css` + `js/<feature>.js` includes. Shared chrome is injected at runtime — `js/header-loader.js` fetches `/components/header.html` (and derives the active nav item from `window.location.pathname`, so a new page usually needs a branch there), `js/footer.js` fetches `/footer.html` with an inline fallback markup. There is no templating: adding a page means copying an existing one of the same family.

**URL families.** `<name>.html` at the root is canonical; a same-named directory with `index.html` is the extensionless alias. Tiny root `.html` files (e.g. `lich-tet-2026.html`, `qrcode.html`) are redirect shims to the real page.

**Data layer.** Static JS/JSON in `data/` loaded either by `<script src>` (exposing a global like `EVENTS_DATA`, which is also `require()`d by the Node generators and tests) or by `fetch` (`data/aff/products.json` for the shop, `news.json` for the blog listing, `data/foods/*.json` for dishes). Site-wide constants — store URLs, socials, asset paths — live in `js/resources.js`; read from there rather than hardcoding.

**Lunar dates.** `js/lunar-calendar.js` is the shared implementation (also `require()`d by `scripts/generate-event-pages.js`). The npm lunar packages are leftovers from experiments; prefer the in-repo module. `js/lunar-almanac.js` (UMD, tested in `test/lunar-almanac.test.js`) layers the folk almanac on top: can chi, giờ hoàng đạo by day branch, 12 trực, 12 sao, nạp âm, Hỷ/Tài Thần directions, tuổi xung, and the shared `DISCLAIMER_TEXT`. Every page showing that content must include the disclaimer text (`test/folk-disclaimer.test.js` enforces it) and must not claim to be "chính xác nhất".

**Games.** `js/word-chain-*.js` (engine / storage / DOM split, each with its own test) and the Three.js `tet-runner` (`js/tet-runner-engine.js` + `tet-runner-three.js` bundled, loaded lazily by `js/tet-runner-loader.js`).

**PWA.** `sw.js` precaches an explicit `urlsToCache` list and busts via `CACHE_NAME`; add genuinely critical new assets there. Static asset URLs carry manual `?v=YYYYMMDD` query strings in the HTML — bump them when changing a cached CSS/JS file.

**Homepage performance (mobile CWV).** `test/home-performance.test.js` guards what fixed INP/CLS/LCP: body scripts are `defer`, Google Fonts load non-blocking (`media="print"` swap), AdSense (`header-loader.js`), Firebase Analytics and the service worker start only after `load` + idle, infinite CSS animations in the hero animate only `transform`/`opacity` (animating `filter`, `box-shadow`, `text-shadow` or `left` kept the main thread ~50% busy while idle), and the fireworks canvas uses pre-rendered glow sprites instead of `shadowBlur`. The hero "today" card is pre-rendered by `inject-tet-seo` from `getHeroToday()` in `js/home-retention.js` so JS fills identical text (no shift).

**Tests** are regression guards, not unit tests: they `readFileSync` the real HTML/JS/JSON and assert on structure (counts, canonical/meta tags, required script tags, footer consistency). Changing markup will legitimately break them — update the assertion when the change is intended, and add a test file when adding a page family.

## News publishing (`.cursor/rules/news-publishing.mdc` — load-bearing)

- No speculation or forecasts ("sẽ", "có thể", price outlooks, "triển vọng") in titles, `news.json.summary`, or meta descriptions unless quoted from a named, linked authority.
- `publishedAt` is the real ISO-8601 generation time and is **never edited afterwards**, even when content or cover changes; it must match the "Đăng: DD/MM/YYYY" line in the article page.
- A "cover image" change means all six places at once: `news.json` `thumbnailUrl` + `thumbnailSource.{name,url}`, `.news-cover` in the article, `og:image`, `twitter:image`, JSON-LD `image`.
- `review-*` posts: the cover banner links to the article's affiliate URL (same as `#news-source-button[href]`) with `target="_blank" rel="noopener noreferrer nofollow"`; never invent an affiliate link.
- Each item ships 3 affiliate products: 1 primary in `affiliate`, 2 in `relatedAffiliates`.
- Full flow in `.cursor/skills/news-item-generator/SKILL.md` (mirrored for other agents at `.agents/skills/news-item-generator/SKILL.md`).

## Other agent rules present in the repo

`.trae/rules/project_rules.md`: every new page needs meta description/keywords/OG tags, a JSON-LD schema block, a `sitemap.xml` entry, and mobile-first responsive layout; constants go through `js/resources.js`; the package name `com.thanh_nguyen.tet_count_down` must stay consistent across `site.webmanifest`, `.well-known/assetlinks.json` and `apple-app-site-association`.

`.cursor/rules/web-rules.mdc` is largely aspirational (it claims Jest/ESLint/TypeScript and a Node backend that do not exist) — trust `package.json` over it.

## English holiday countdowns

`/christmas`, `/ramadan`, … are a separate English page family with their own inline header/footer (no `header-loader.js`/`footer.js`, `lang="en"`). `national` holidays count down in the country's IANA zone; `global` ones use the visitor's zone with a city picker. Time math lives in `js/zoned-time.js` (UMD, shared by the browser and the generator, DST-safe via `Intl`). Each page embeds its full date list in `#holiday-config`, so the clock rolls over to next year without a deploy; the pre-rendered day counts in text/meta are refreshed by the daily workflow. Arabic (RTL) versions live at `ar/<slug>.html` (`/ar/ramadan`, `/ar/eid-al-fitr`) and are driven by `data/holidays-ar.js` (content + `UI_AR` strings) through `templates/holiday-countdown-ar.html`; add a slug there to give another holiday an Arabic page. They reuse the English data's dates/zone/colors, show the Hijri (Umm al-Qura) date, use Western digits and Arabic plural forms via `Intl.PluralRules('ar')`, and pair with the English page through `hreflang` en/ar (x-default = English). `js/holiday-countdown.js` takes every visible string from `config.i18n`, and `css/holiday-countdown.css` must stay on logical properties (`*-inline-start/end`, `text-align: start`) — `test/holiday-pages-ar.test.js` fails on physical left/right. Visual language is deliberately flat/editorial: each holiday has a `palette` (paper / ink / accent / particle — no blended gradients, no gradient text, no rounded cards; tests enforce this and WCAG AA contrast for the accent) and a `particles` kind for the hero's ambient motion (snow, leaf, petal, confetti, drop, heart, ember, star, bat), generated with a slug-seeded PRNG so output stays stable. Motion (staggered hero entrance, per-digit roll, scroll reveal, particles) is disabled under `prefers-reduced-motion`, and the H1 animates transform-only because it is the LCP element. Fraunces is self-hosted at `assets/fonts/fraunces-latin.woff2` (OFL, license alongside) and preloaded. JSON-LD is `WebPage` (with `about` → aliases + Wikipedia `sameAs`) + `Organization` + `FAQPage` + `BreadcrumbList` — never `Event`. Titles must fit 60 chars and descriptions 160 (the generator picks the first candidate that fits; `test/holiday-pages.test.js` enforces it). One English URL serves every country: `hreflang="en"` + `x-default`, and `og:locale:alternate` for en_GB/en_CA/en_AU/en_IN.

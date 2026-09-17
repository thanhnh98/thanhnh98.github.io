# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`saptet.vn` — the marketing/SEO/utility website for the **Sắp Tết** Vietnamese Lunar New Year countdown product. Plain HTML/CSS/vanilla JS, no framework, no bundler except one esbuild call for the Tết Runner game. Deployed to GitHub Pages (`thanhnh98/thanhnh98.github.io`, push `master` → Actions publishes `gh-pages`). Node scripts exist only as build/codegen/test tooling — nothing runs server-side.

Content language is Vietnamese; all date math is Vietnam time (UTC+7). The sibling repos (Android, iOS, backend, static JSON API) are described in `../CLAUDE.md`; this site does **not** consume them — it only links to the store listings.

`package.json` is misleadingly named `saptet-blog-crawler`.

## Commands

| Command | What |
|---|---|
| `./run.sh [/page.html]` | Local preview: no-cache Python static server on the first free port from 8000, opens the page. Use this instead of any other static server — the no-cache headers matter because of the service worker. |
| `npm test` | Node's built-in runner over `test/*.test.js`. `pretest` runs `build:tet-runner` first, so the bundle is always fresh. |
| `node --test test/events-data.test.js` | Single file. Add `--test-name-pattern="..."` for a single case. |
| `npm run build:tet-runner` | esbuild `js/tet-runner-three.js` → `js/tet-runner-three.bundle.js` (the only bundled JS on the site). |
| `npm run generate-tin-tuc-clean-urls` | **Required after creating/renaming any `tin-tuc/<slug>.html`.** |
| `npm run generate-events` | Regenerates the 37 event pages + hub + sitemap event block. |
| `npm run inject-tet-seo` | Pre-renders day-count SEO text/JSON-LD into the countdown landing pages. |
| `npm run deploy` | `predeploy` (build runner + `update-version`) then commits `sw.js .version .last_build_id` and pushes `master`. |
| `npm run crawl` | VNExpress Tết-article crawler (`crawl-tet-articles.js`) that rewrites `blog.html`. Legacy; `tin-tuc/` is the live blog. |

No lint step. `.github/workflows/deploy.yml` re-runs build → clean-urls → inject-seo → update-version on every push to `master`, so a forgotten generator step self-heals on deploy — but the repo then differs from what is published. `.github/workflows/seo-daily-update.yml` runs inject-seo + generate-events daily at 00:00 VN time and commits with `[skip ci]`.

## Generated files — never hand-edit

- `js/tet-runner-three.bundle.js` (from `js/tet-runner-three.js`)
- `su-kien-quan-trong.html`, `su-kien-quan-trong/index.html`, every `su-kien/<slug>/index.html` — all rendered from `data/events-data.js` + `data/events-content.js` through `templates/events-index.html` and `templates/event-detail.html`. Edit the data/templates, then `npm run generate-events`.
- The `<!-- Event detail pages -->` block in `sitemap.xml` (rewritten by the same script). The rest of `sitemap.xml` is hand-written.
- `tin-tuc/<slug>/index.html` redirect stubs (GitHub Pages ignores `_redirects`; the file is kept but inert).
- `.version`, `.last_build_id`, the `CACHE_NAME` line in `sw.js`.
- The injected SEO snippet blocks in `index.html`, `con-bao-nhieu-ngay-nua-den-tet/index.html`, `con-bao-nhieu-ngay-nua-den-giao-thua/index.html`.

Hand-written: page HTML, `css/*`, `js/*` (except the bundle), `data/*.js`, `data/foods/*.json`, `data/aff/products*`, `news.json`, `tin-tuc/<slug>.html`, the rest of `sitemap.xml`.

## Architecture

**Page shape.** Each top-level `.html` is standalone: its own `<head>` meta/OG/JSON-LD, its own `css/<feature>.css` + `js/<feature>.js` includes. Shared chrome is injected at runtime — `js/header-loader.js` fetches `/components/header.html` (and derives the active nav item from `window.location.pathname`, so a new page usually needs a branch there), `js/footer.js` fetches `/footer.html` with an inline fallback markup. There is no templating: adding a page means copying an existing one of the same family.

**URL families.** `<name>.html` at the root is canonical; a same-named directory with `index.html` is the extensionless alias. Tiny root `.html` files (e.g. `lich-tet-2026.html`, `qrcode.html`) are redirect shims to the real page.

**Data layer.** Static JS/JSON in `data/` loaded either by `<script src>` (exposing a global like `EVENTS_DATA`, which is also `require()`d by the Node generators and tests) or by `fetch` (`data/aff/products.json` for the shop, `news.json` for the blog listing, `data/foods/*.json` for dishes). Site-wide constants — store URLs, socials, asset paths — live in `js/resources.js`; read from there rather than hardcoding.

**Lunar dates.** `js/lunar-calendar.js` is the shared implementation (also `require()`d by `scripts/generate-event-pages.js`). The npm lunar packages are leftovers from experiments; prefer the in-repo module.

**Games.** `js/word-chain-*.js` (engine / storage / DOM split, each with its own test) and the Three.js `tet-runner` (`js/tet-runner-engine.js` + `tet-runner-three.js` bundled, loaded lazily by `js/tet-runner-loader.js`).

**PWA.** `sw.js` precaches an explicit `urlsToCache` list and busts via `CACHE_NAME`; add genuinely critical new assets there. Static asset URLs carry manual `?v=YYYYMMDD` query strings in the HTML — bump them when changing a cached CSS/JS file.

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

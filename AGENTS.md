# Sắp Tết Website (`thanhnh98.github.io` / `saptet.vn`) — Agent Guidelines

Target: Marketing, SEO, and utility website `saptet.vn` (vanilla HTML/CSS/JS, no frontend framework, deployed to GitHub Pages).

## Key Commands
```bash
./run.sh [/page.html]                 # Local preview server with no-cache headers (preferred)
npm test                              # Built-in Node test runner (pretest builds runner)
node --test test/events-data.test.js  # Single test file
npm run build:tet-runner              # esbuild for Tết Runner Three.js game
npm run build:icons                   # Rebuild Lucide subset for homepage & header
npm run generate-tin-tuc-clean-urls   # REQUIRED after creating/renaming/deleting tin-tuc/<slug>.html
npm run generate-events               # Regenerate 37 event pages + sitemap event block
npm run generate-holidays             # Regenerate English holiday countdown pages + hubs
npm run inject-tet-seo                # Pre-render day-count SEO text and JSON-LD
npm run inject-lunar-today            # Pre-render today's lunar data in lich-am-hom-nay.html
npm run deploy                        # Build, update version, and push to master
```

## Generated Files (Never Hand-Edit)
- `js/tet-runner-three.bundle.js`
- `js/vendor/lucide-subset.js`
- `tin-tuc/<slug>/index.html` (redirect stubs)
- `su-kien-quan-trong.html` and `su-kien/<slug>/index.html` (rendered from `data/events-*.js`)
- English holiday countdown pages (`christmas.html`, `ramadan.html`, etc. from `data/holidays-en.js`)
- `.version`, `.last_build_id`, `CACHE_NAME` in `sw.js`
- Pre-rendered SEO snippet blocks in countdown landing pages

## News Publishing Non-Negotiables (`.cursor/rules/news-publishing.mdc`)
1. **No speculation/forecasts** ("sẽ", "có thể", price outlooks) in titles or summaries unless directly quoted from a named, linked authority.
2. **`publishedAt` is immutable**: Use the exact ISO-8601 generation time and never edit it afterwards.
3. **Cover image sync**: A cover change requires updating all 6 places simultaneously: `news.json` `thumbnailUrl` + `thumbnailSource.{name,url}`, `.news-cover` in article, `og:image`, `twitter:image`, and JSON-LD `image`.
4. **Affiliate integrity**: Every review item ships 3 affiliate products (1 primary, 2 related). Banner clicks through to the primary affiliate URL with `target="_blank" rel="noopener noreferrer nofollow"`.

## Performance & Mobile Core Web Vitals
- Guarded by `test/home-performance.test.js`.
- Scripts defer loading; Google Fonts load non-blocking.
- AdSense and service worker initialize after `window.load` + idle.
- CSS animations in hero animate `transform`/`opacity` only (never `box-shadow` or `filter`).

## Related Antigravity Skills
- [`saptet-web-seo`](file:///Users/ethan/Ethan/tlife/sap-tet/.agents/skills/saptet-web-seo/SKILL.md)

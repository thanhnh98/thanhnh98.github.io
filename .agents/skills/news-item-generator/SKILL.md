---
name: news-item-generator
description: Use when creating, publishing, or updating a new Sắp Tết news/blog item in this repo, including news.json, tin-tuc detail pages, affiliate blocks, sitemap entries, and clean URLs.
---

# News Item Generator

This is the Codex-readable mirror for the Cursor skill at `.cursor/skills/news-item-generator/SKILL.md`.
When this skill triggers, read that Cursor skill and `.cursor/rules/news-publishing.mdc` first; treat those files as the source of truth.

## Required Workflow

1. Read `news.json`, `data/aff/products`, and the closest existing `tin-tuc/*.html` article template.
2. Create or update exactly the needed files:
   - `news.json`
   - `tin-tuc/<slug>.html`
   - `sitemap.xml`
   - clean URL stub via `npm run generate-tin-tuc-clean-urls`
3. Use `publishedAt` as the real creation timestamp in ISO-8601. Never invent sequential or future dates.
4. Add 3 affiliate products when publishing an item: 1 primary in `affiliate`, 2 related in `relatedAffiliates`.
5. For product reviews, make the cover image link to the primary affiliate URL with `target="_blank"` and `rel="noopener noreferrer nofollow"`.
6. Include article-specific SEO metadata, JSON-LD, breadcrumb, category chip, summary, TOC, detailed sections, source box, disclaimer, CTA row, and `../js/news-affiliate-random.js`.
7. Keep content factual and attributable. Do not publish editorial forecasts, price predictions, or unsupported future claims.

## Validation

Run JSON validation, future-date checks, clean URL generation, and search checks for the new slug in `news.json`, `tin-tuc/`, and `sitemap.xml`.

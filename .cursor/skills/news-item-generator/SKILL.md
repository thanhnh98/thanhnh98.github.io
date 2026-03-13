---
name: news-item-generator
description: Creates and publishes a complete news item in this repository by updating news.json and creating news/<slug>.html. Use when the user asks to add/create/generate tin tuc, ban tin, or a new news article. Always attach at least one random affiliate product from data/aff/products and produce detailed article content with source links.
---

# News Item Generator

## Purpose

Use this skill to publish one new news item end-to-end while keeping:
- `news.json`
- `news/<slug>.html`
- affiliate product section in detail page

consistent and production-ready.

## Trigger Conditions

Apply this skill when user intent includes:
- "tạo tin tức"
- "add news"
- "generate news item"
- "viết bản tin"
- "đăng bài tin tức mới"

## Files To Update

- `news.json`
- `news/<slug>.html` (new file)

## Required Inputs

Collect or infer:
- `title`
- `summary`
- `category`
- `publishedAt` (ISO-8601)
- `author`
- `tags` (array)
- `source.name`
- `source.url`
- `links.canonicalUrl`
- `thumbnailUrl`

If a non-critical field is missing, infer from trusted context. Ask user only when ambiguity affects factual correctness.

## Mandatory Random Affiliate Rule

Every generated news item must include at least one random product from:
- `data/aff/products` (primary)
- `data/aff/products.json` (fallback)

### Product selection constraints

Selected product should have:
- non-empty `name`
- non-empty `url`
- `thumbnail` preferred (fallback allowed)

### JSON mapping (required)

Map random product into news item:
- `links.affiliateUrl` = product `url`
- `links.useAffiliate` = `true`
- `affiliate.id` = product `id` (or empty string if absent)
- `affiliate.shopId` = product `shopId` (or empty string)
- `affiliate.thumbnail` = product `thumbnail` (or empty string)
- `affiliate.name` = product `name`
- `affiliate.description` = product `description` (or empty string)
- `affiliate.type` = product `type` (or empty string)
- `affiliate.category` = product `category` (or empty string)
- `affiliate.coinBonus` = product `coinBonus` (or `0`)
- `affiliate.buyText` = product `buyText` (or `"Xem sản phẩm"`)
- `affiliate.url` = product `url`

## Article Detail Requirements (Detailed Content)

Do not generate short stub pages.

Each detail page must include:
1. Breadcrumb + category chip
2. H1 + metadata row
3. Cover image
4. Summary paragraph
5. TOC block
6. At least 3 content sections with meaningful paragraphs
7. Optional editorial viewpoint section when topic needs analysis
8. Affiliate `ads-card` block in article body:
   - include `data-random-affiliate="true"`
9. Source reference block with links
10. CTA row at bottom
11. Script include for random affiliate:
   - `../js/news-affiliate-random.js`

## Generation Workflow

1. Read `news.json`.
2. Read product list and pick one random valid product.
3. Compute next ID and slug:
   - ID: `news-XXX` (zero-padded, increment highest)
   - slug: lowercase hyphen-case from title
   - handle collisions with `-2`, `-3`, ...
4. Append new item to `news.json` using repository schema.
5. Create `news/<slug>.html` based on current detail template.
6. Ensure `detailPage` is exactly `./news/<slug>.html`.
7. Validate JSON formatting (2 spaces).

## Topic-Aware Skill Selection (Important)

Before writing article content:
1. Identify article domain (e.g., gold, fuel, policy, health, sports).
2. Check if a domain-specific skill already exists in `.cursor/skills/`.
3. If relevant skill exists, apply it first for content quality.
4. If no suitable skill exists:
   - analyze domain requirements,
   - create a new project skill for that domain,
   - then continue news generation using this publishing workflow.

This ensures unfamiliar topics still get structured, high-quality output.

## Validation Checklist

- `news.json` is valid JSON
- new `id` is unique
- new `slug` is unique
- `detailPage` matches created file path
- detail HTML exists in `news/`
- article is detailed (not thin content)
- random affiliate product is present in JSON
- detail page contains `.ads-card[data-random-affiliate="true"]`
- detail page loads `../js/news-affiliate-random.js`

## Output Style

After completion, report:
1. Created item ID + slug
2. Updated JSON path
3. Created HTML path
4. Random product selected (name + url)
5. Any fallback decisions (slug collision, missing field inference)

## Additional Examples

For examples, see [examples.md](examples.md).

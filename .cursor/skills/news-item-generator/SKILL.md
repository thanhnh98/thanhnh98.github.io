---
name: news-item-generator
description: Generates a new standardized news item for this project by updating news.json and creating a matching HTML detail page in news/. Use when the user asks to add news, generate a news item, create a new article entry, or maintain the news API source with required affiliate fields.
---

# News Item Generator

## Purpose

Use this skill to add one new news item while keeping the API source and detail page synchronized.

## Inputs Required

Collect these values from the user before generating:

- `title`
- `summary`
- `category`
- `publishedAt` (ISO-8601)
- `author`
- `tags` (array)
- `source.name`
- `links.canonicalUrl`
- `links.affiliateUrl`
- `affiliate.network`
- `affiliate.campaign`
- `affiliate.trackingId`
- `thumbnailUrl`

If any required value is missing, ask for it before writing files.

## Files To Update

- `news.json`
- `news/<slug>.html` (new file)

## Generation Workflow

1. Read `news.json`.
2. Compute the next ID and slug:
   - ID format: `news-XXX` (zero-padded, increment highest numeric value).
   - Slug format: lowercase, hyphen-separated from title.
   - If slug already exists, append `-2`, `-3`, etc. until unique.
3. Build a new item object using this contract:
   - Keep all existing top-level fields unchanged (`version`, `generatedAt`, `items`).
   - Append one item to `items` with required schema:

```json
{
  "id": "news-004",
  "slug": "sample-title",
  "title": "Sample Title",
  "summary": "Short summary.",
  "category": "general",
  "publishedAt": "2026-03-12T12:00:00Z",
  "author": "Editorial Team",
  "tags": ["sample"],
  "source": {
    "name": "Example Source",
    "url": "https://example.com/article"
  },
  "links": {
    "canonicalUrl": "https://example.com/article",
    "affiliateUrl": "https://example.com/article?ref=aff-id",
    "useAffiliate": true
  },
  "affiliate": {
    "network": "sample-network",
    "campaign": "march-2026",
    "trackingId": "aff-id",
    "disclosureRequired": true
  },
  "thumbnailUrl": "https://picsum.photos/seed/sample/800/450",
  "detailPage": "./news/sample-title.html"
}
```

4. Create `news/<slug>.html` using the project detail template pattern:
   - `<h1>` equals item title.
   - Include short paragraph from summary.
   - Include a link back to `../index.html`.
5. Ensure the new item's `detailPage` matches the created HTML path exactly: `./news/<slug>.html`.
6. Preserve valid JSON formatting (2-space indentation).

## Required Affiliate Rules

For every generated item:

- `links.canonicalUrl` must be non-empty.
- `links.affiliateUrl` must be non-empty.
- `links.useAffiliate` must be `true`.
- `affiliate.network` must be non-empty.
- `affiliate.campaign` must be non-empty.
- `affiliate.trackingId` must be non-empty.
- `affiliate.disclosureRequired` must be `true`.

Do not generate items with missing or empty required affiliate fields.

## Validation Checklist

Run this checklist after generation:

- `news.json` is valid JSON.
- New `id` is unique.
- New `slug` is unique.
- `detailPage` path equals created file path.
- HTML file exists in `news/`.
- All required affiliate fields are present and non-empty.

## Output Style

After completing generation, return:

1. Created item ID and slug.
2. Updated JSON path.
3. Created HTML file path.
4. Any fallback decisions made (for example slug collision handling).

## Additional Examples

For prompt examples and expected output snippets, see [examples.md](examples.md).

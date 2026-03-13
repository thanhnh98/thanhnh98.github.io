# Examples

## Example 1: Standard Item

### User prompt

Add one news item:
- title: Vietnam Tech Market Expands in Q1
- summary: Startup funding and cloud adoption increased in the first quarter.
- category: technology
- publishedAt: 2026-03-12T14:00:00Z
- author: Editorial Team
- tags: vietnam, startup, cloud
- source.name: Vietnam Business Daily
- links.canonicalUrl: https://example.com/vn-tech-q1
- links.affiliateUrl: https://example.com/vn-tech-q1?ref=abc123
- affiliate.network: impact
- affiliate.campaign: q1-tech
- affiliate.trackingId: abc123
- thumbnailUrl: https://picsum.photos/seed/vn-tech-q1/800/450

### Expected result (summary)

- Append one new object to `news.json`.
- Set `links.useAffiliate` to `true`.
- Set `affiliate.disclosureRequired` to `true`.
- Create matching file `tin-tuc/vietnam-tech-market-expands-in-q1.html`.
- Set `detailPage` to `./tin-tuc/vietnam-tech-market-expands-in-q1.html`.

## Example 2: Slug Collision

### User prompt

Add one news item:
- title: News 1
- summary: Follow-up coverage.
- category: general
- publishedAt: 2026-03-12T16:00:00Z
- author: Editorial Team
- tags: follow-up
- source.name: Example News
- links.canonicalUrl: https://example.com/news-1-follow-up
- links.affiliateUrl: https://example.com/news-1-follow-up?ref=xyz789
- affiliate.network: sample-network
- affiliate.campaign: follow-up
- affiliate.trackingId: xyz789
- thumbnailUrl: https://picsum.photos/seed/news1-followup/800/450

### Expected result (summary)

- If `news-1` already exists, use `news-1-2` as slug.
- Create `tin-tuc/news-1-2.html`.
- Set `detailPage` to `./tin-tuc/news-1-2.html`.
- Keep required affiliate fields populated.

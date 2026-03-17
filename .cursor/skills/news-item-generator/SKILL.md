---
name: news-item-generator
description: Creates and publishes a complete daily news item in this repository by updating news.json and creating tin-tuc/<slug>.html. Topics are not limited to Tet; prioritize current trends and verified facts from official/trusted sources. Always attach at least one random affiliate product from data/aff/products and produce detailed article content with source links.
---

# News Item Generator

## Purpose

Use this skill to publish one new news item end-to-end while keeping:
- `news.json`
- `tin-tuc/<slug>.html`
- affiliate product section in detail page

consistent and production-ready.

This is a general daily news workflow (`Bản Tin`), not a Tet-only workflow.

## Trigger Conditions

Apply this skill when user intent includes:
- "tạo tin tức"
- "add news"
- "generate news item"
- "viết bản tin"
- "đăng bài tin tức mới"

Also apply when user asks for:
- daily brief / bản tin mỗi ngày
- tin nóng theo xu hướng
- tổng hợp tin theo chủ đề

## Files To Update

- `news.json`
- `tin-tuc/<slug>.html` (new file)
- `sitemap.xml` (append new detail URL entry)
- routing references when needed (`components/header.html`, `js/navigation.js`, redirects)

## Routing Rules (Required)

Always keep news routing consistent with current structure:
- Listing page: `/tin-tuc/` (file path: `tin-tuc/index.html`)
- Detail page URL: `/tin-tuc/<slug>.html`
- `news.json.detailPage`: `./tin-tuc/<slug>.html`

When task includes route migration/update, enforce:
- `js/navigation.js`: map `/tin-tuc`, `/tin-tuc/`, `/tin-tuc.html` to `tin-tuc/index.html`
- `js/navigation.js`: map `/blog` and `/blog.html` to `tin-tuc/index.html` (if blog is deprecated)
- Header/menu links should point to `/tin-tuc/index.html` or `/tin-tuc/` consistently (prefer `/tin-tuc/index.html` for explicit file routing in this repo)
- Redirect rules should keep old blog URL working:
  - `_redirects`: `/blog` and `/blog.html` -> `/tin-tuc/index.html`
  - `.htaccess`: `^blog/?$` -> `/tin-tuc/index.html`

## Required Inputs

Collect or infer:
- `title`
- `summary`
- `category`
- `publishedAt` (ISO-8601) — **bắt buộc, xem quy tắc bên dưới**
- `author`

### publishedAt Rule (Bắt buộc — không vi phạm)

- `publishedAt` là **ngày phát hành** của bài viết, dùng để hiển thị trên trang tin tức (listing + detail).
- **Khi tạo bài mới:** Gán `publishedAt` = ngày giờ hiện tại lúc gen (ISO-8601, ví dụ `2026-03-16T10:30:00Z`).
- **Sau khi tạo:** **KHÔNG BAO GIỜ** chỉnh sửa `publishedAt` — kể cả khi sửa nội dung, ảnh, affiliate hay metadata khác.
- Đồng bộ: giá trị `publishedAt` trong `news.json` phải khớp với ngày hiển thị trong `tin-tuc/<slug>.html` (news-meta "Đăng: DD/MM/YYYY").
- `tags` (array)
- `source.name`
- `source.url`
- `links.canonicalUrl`
- `thumbnailUrl`
- `thumbnailSource.name`
- `thumbnailSource.url`

If a non-critical field is missing, infer from trusted context. Ask user only when ambiguity affects factual correctness.

### Publish Time Policy (Required)

- `publishedAt` in `news.json` is the article creation timestamp, not a scheduled future date.
- Never set `publishedAt` later than the current local time at creation.
- If editing old items, normalize any future-dated records back to their real creation time.
- Detail page metadata must stay consistent with `publishedAt`:
  - visible `Đăng: DD/MM/YYYY`
  - JSON-LD `datePublished` when present
  - sitemap `lastmod` for the same slug

### Default Sort Policy (Required)

- News listing must default to newest first (`publishedAt` descending).
- Do not rely on array insertion order; always enforce explicit date sort in listing logic.
- After updates, verify newest item appears first on `/tin-tuc/`.

### Thumbnail Relevance Rule (Required)

- `thumbnailUrl` must visually match the article topic/title/content.
- Avoid generic/random placeholders that are unrelated to the story.
- Prefer:
  1. Official/source-provided image when available and valid.
  2. A topic-keyword stock image URL that clearly matches domain context.
- If no suitable image is available, generate a neutral but topic-aligned fallback (not abstract random).

### Thumbnail Source Attribution Rule (Required)

- Every item must include a `thumbnailSource` object in `news.json`:
  - `thumbnailSource.name`
  - `thumbnailSource.url`
- The URL should point to the original media/source page or direct asset URL.
- If image comes from first-party assets, set source name to the first-party brand/site.
- Do not publish thumbnail without attribution metadata.

## Topic Scope and Naming Rules (Required)

- News topics can be any domain (economy, policy, tech, society, transport, health, sports, etc.).
- Do not force Tet-related framing unless the source topic itself is about Tet.
- Use neutral publication framing: `Bản Tin` / `Bản Tin mỗi ngày`.
- Avoid fixed phrases like "Bản Tin Tết 2027" in newly generated content unless explicitly requested.

## Trend-First Policy (Required)

Before drafting:
1. Identify whether the topic is currently trending or has fresh market/public relevance.
2. Prefer topics with recent momentum (policy updates, market moves, traffic spikes, public-impact events).
3. If user does not provide a topic, propose 5-10 trend-aligned options first.

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
7. Optional specialized analysis section when topic needs depth (e.g., "Phân tích diễn biến", "Điểm đáng chú ý")
8. Affiliate `ads-card` block in article body:
   - include `data-random-affiliate="true"` (in-body contextual block)
9. Post-conclusion affiliate `ads-card`:
   - add one more `data-random-affiliate="true"` block ngay sau phần kết luận
10. Placement override rule (required):
   - Default layout keeps 2 affiliate blocks (one in-body + one post-conclusion).
   - If user explicitly requests a different placement/count (e.g., only in-body, remove post-conclusion), user instruction takes priority.
   - When override is applied, keep exactly the requested placement/count and avoid leaving duplicate blocks.
11. Source reference block with links
12. CTA row at bottom
13. Script include for random affiliate:
   - `../js/news-affiliate-random.js`

## SEO Metadata Rules (Required)

Each `tin-tuc/<slug>.html` must include article-specific SEO metadata (no generic reuse):
- `<title>` aligned to article headline
- `<meta name="description">` aligned to article summary/content
- `<link rel="canonical" href="https://saptet.vn/tin-tuc/<slug>.html">`
- `<meta name="robots" content="index, follow">`
- Open Graph:
  - `og:type=article`
  - `og:title`
  - `og:description`
  - `og:image` (topic-relevant, same topic as article)
  - `og:url=https://saptet.vn/tin-tuc/<slug>.html`
- Twitter:
  - `twitter:card=summary_large_image`
  - `twitter:title`
  - `twitter:description`
  - `twitter:image`

SEO quality constraints:
- Title and description must reflect the actual article topic and section logic.
- Do not reuse identical description text across multiple different articles.
- `og:image` / `twitter:image` should be coherent with article content (prefer same cover image).
- Canonical URL must exactly match the generated detail page path.

## Topic-Differentiated Generation Algorithm (Critical)

Do NOT generate a one-style-fits-all article.

Before writing, classify topic intent, then build sections by domain logic:

### 1) Topic Classification

Map input to one primary topic class:
- `technology` (kỹ thuật/công nghệ/sản phẩm số)
- `economy` (kinh tế/tài chính/vĩ mô/giá cả)
- `entertainment` (giải trí/phim/nhạc/show/culture-trend)
- `society` (xã hội/đời sống/hành vi cộng đồng/chính sách tác động dân sinh)
- `policy` (chính sách/quy định/hiệu lực/tuân thủ)
- `health` (y tế/sức khỏe cộng đồng/chỉ báo dịch tễ)
- `travel` / `transport` / `commerce` / `energy` / `sports` (khi phù hợp)

If a topic overlaps multiple classes, choose:
1. primary = strongest user intent,
2. secondary = one supporting lens only.

### 2) Section Blueprint by Topic (Mandatory)

Use these blueprints as default article skeletons:

#### A. `technology` (Kỹ thuật/Công nghệ)
- Section 1: `Tính năng và thay đổi chính`
- Section 2: `Cách sử dụng / luồng thao tác (how to use)`
- Section 3: `Điều kiện triển khai và giới hạn thực tế`
- Optional Section 4: `Tác động tới trải nghiệm người dùng`
- Conclusion: neutral observation on adoption/readiness (no direct advice)

Reasoning:
- Người đọc công nghệ cần biết "mới gì", "dùng thế nào", "khi nào phù hợp".

#### B. `economy` (Kinh tế)
- Section 1: `Dữ liệu và chỉ số chính`
- Section 2: `Diễn biến thị trường theo kỳ`
- Section 3: `Phân tích động lực kỹ thuật` (chi phí, cung-cầu, thanh khoản, độ trễ)
- Optional Section 4: `Kịch bản diễn biến ngắn hạn` (mang tính mô tả)
- Conclusion: neutral observation on market state/uncertainty

Reasoning:
- Tin kinh tế phải bám số liệu, cấu trúc thị trường và cơ chế vận động.

#### C. `entertainment` (Giải trí)
- Section 1: `Nội dung nổi bật / điểm thu hút`
- Section 2: `Tính năng trải nghiệm và cách tham gia`
- Section 3: `Phản hồi cộng đồng và nhịp lan tỏa`
- Optional Section 4: `Yếu tố tạo trend (format, KOL, meme, short-form)`
- Conclusion: neutral observation on audience momentum

Reasoning:
- Tin giải trí cần trọng tâm vào trải nghiệm, mức lan truyền và mức độ quan tâm.

#### D. `society` (Xã hội)
- Section 1: `Bối cảnh và dữ liệu nền`
- Section 2: `Xu hướng hành vi / tâm lý cộng đồng`
- Section 3: `Tác động dân sinh theo nhóm đối tượng`
- Optional Section 4: `Biến số xã hội cần theo dõi`
- Conclusion: neutral observation on social trajectory

Reasoning:
- Tin xã hội cần giải thích hành vi, tâm lý và tác động thực tế đến đời sống.

#### E. `policy` (Chính sách)
- Section 1: `Nội dung quy định và mốc hiệu lực`
- Section 2: `Phạm vi áp dụng và đối tượng chịu tác động`
- Section 3: `Thay đổi so với trước`
- Optional Section 4: `Tác động vận hành thực tế`
- Conclusion: neutral observation on implementation signals

### 3) Narrative Control by Topic

Adjust language and evidence depth by class:
- `technology`: feature-level clarity, workflow verbs, UX terminology.
- `economy`: numeric precision, unit consistency, time-series phrasing.
- `entertainment`: audience engagement signals, platform dynamics, sentiment tone.
- `society`: context framing, social behavior patterns, group-level impact.
- `policy`: legal wording accuracy, effective dates, scope boundaries.

### 4) Hard Guardrails

- Reject outputs that reuse the same section names across all topics.
- Reject outputs that lack domain-specific evidence style (numbers for economy, usage flows for technology, audience dynamics for entertainment, behavioral framing for society).
- If topic class is unclear, add a short internal classification note first, then write.

## Verification and Source Integrity (Critical)

- News content must be factual and traceable to trusted sources.
- Prioritize source tiers in this order:
  1. Official/government/regulator pages
  2. Primary institutional sources (exchange, enterprise IR, ministry portals)
  3. Reputable press outlets as secondary context
- Do not invent numbers, timestamps, or quotes.
- If a metric is unverified, label it clearly as preliminary and avoid hard claims.
- Every article must include at least 1 primary source link; prefer 2+ when possible.
- Source timestamps should be fresh relative to publication time; avoid publishing with stale primary data when a newer official update exists.
- If latest official source is delayed, clearly mark the last verified update time in article content.

## Tone and Conclusion Policy

- Do not force fixed section names like "Nhận định chuyên môn" or "Gợi ý hành động".
- Conclusion sections should be neutral, journalistic observations.
- Avoid imperative advice language ("nên", "hãy", "cần phải làm...") in conclusions.
- Prefer evidence-based closing remarks that summarize trend direction, uncertainty, and observable implications.

## Generation Workflow

1. Read `news.json`.
2. **Set `publishedAt`** = ngày giờ hiện tại (ISO-8601). Ví dụ: nếu hôm nay là 16/03/2026 lúc 10:30, dùng `2026-03-16T10:30:00Z`.
3. Read product list and pick one random valid product.
4. Compute next ID and slug:
   - ID: `news-XXX` (zero-padded, increment highest)
   - slug: lowercase hyphen-case from title
   - handle collisions with `-2`, `-3`, ...
5. Append new item to `news.json` using repository schema.
   - include `thumbnailSource` in the new item.
   - **publishedAt** = ngày giờ hiện tại, không dùng ngày giả định hay tuần tự.
6. Create `tin-tuc/<slug>.html` based on current detail template.
7. Ensure `detailPage` is exactly `./tin-tuc/<slug>.html`.
8. Populate full SEO metadata block in detail HTML (title/description/canonical/og/twitter).
9. **Trong HTML detail:** news-meta "Đăng: DD/MM/YYYY" phải khớp với `publishedAt` (ví dụ `2026-03-16T10:30:00Z` → "Đăng: 16/03/2026").
10. Update `sitemap.xml`:
   - ensure listing URL `/tin-tuc/` exists
   - append `<url>` for `https://saptet.vn/tin-tuc/<slug>.html`
   - set `lastmod` to publish date (YYYY-MM-DD), `changefreq` to `weekly`, priority around `0.8`
11. Validate JSON formatting (2 spaces).
12. Run a future-date check for `publishedAt`; fail generation if any item date is in the future.

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

## Topic Taxonomy for Easy Management

Use controlled categories in `news.json`:
- `economy`
- `policy`
- `society`
- `transport`
- `energy`
- `technology`
- `entertainment`
- `health`
- `education`
- `travel`
- `commerce`
- `sports`
- `lifestyle` (legacy-compatible)

Tagging rule:
- 3-6 concise tags
- include at least: domain tag + event/impact tag
- avoid year-locked tags unless year is materially relevant

## Validation Checklist

- `news.json` is valid JSON
- new `id` is unique
- `publishedAt` = ngày giờ hiện tại lúc gen (không dùng ngày tuần tự hoặc giả định)
- new `slug` is unique
- no `publishedAt` values are in the future
- `detailPage` matches created file path
- detail HTML exists in `tin-tuc/`
- `sitemap.xml` contains `https://saptet.vn/tin-tuc/<slug>.html`
- detail HTML `Đăng:` date and `publishedAt` represent the same creation day
- `datePublished` (if exists) is consistent with `publishedAt`
- detail HTML includes canonical/og/twitter metadata matching its slug and topic
- detail HTML does not use generic copy-paste SEO description from unrelated article
- article is detailed (not thin content)
- random affiliate product is present in JSON
- detail page affiliate block count/placement matches user instruction when explicitly provided
- otherwise default to 2 blocks (in-body + post-conclusion)
- detail page loads `../js/news-affiliate-random.js`
- title/body do not force Tet framing when topic is non-Tet
- category follows controlled topic taxonomy
- article includes verified primary source references
- thumbnail is topic-relevant (no off-topic random image)
- thumbnail source attribution exists (`thumbnailSource.name`, `thumbnailSource.url`)
- section blueprint matches topic class (technology/economy/entertainment/society/...)
- section names are not generic-cloned from unrelated domains
- domain evidence style is correct (e.g., economy has indicators; technology has how-to flow)
- routing consistency maintained (`/tin-tuc/` listing, `/tin-tuc/<slug>.html` detail, legacy blog redirects when applicable)

## Output Style

After completion, report:
1. Created item ID + slug
2. Updated JSON path
3. Created HTML path
4. Random product selected (name + url)
5. Any fallback decisions (slug collision, missing field inference)

## Additional Examples

For examples, see [examples.md](examples.md).

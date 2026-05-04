---
name: news-item-generator
description: Creates and publishes a complete daily news item in this repository by updating news.json and creating tin-tuc/<slug>.html. Topics are not limited to Tet; prioritize current trends and verified facts from official/trusted sources. No editorial prediction or speculation—only attributable facts, past-tense observations, and clearly cited third-party forecasts when required. Always attach 3 affiliate products highly related to the article topic (1 primary + 2 related) and produce detailed article content with source links.
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
- `author` (default: "Sắp Tết Editor")

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

### Thumbnail License Rule (Legal Compliance)

- **Prefer:** Wikimedia Commons (CC, Public Domain), Unsplash, Pexels—images with clear reuse licenses.
- **Avoid:** Images from commercial newspapers (thoibaotaichinhvietnam.vn, kinhtedothi.vn, tienphong.vn, vnexpress.net, etc.) unless you have explicit permission.
- If no suitable licensed image exists, use a topic-aligned Wikimedia/stock image. Never use newspaper images without permission.

## Chính sách không dự đoán / không phán đoán (bắt buộc)

- **Không** viết dưới danh nghĩa biên tập các nội dung: dự báo giá, kịch bản tương lai, “sẽ / có thể” mang tính tiên đoán, triển vọng ngắn hạn do tự suy ra, “nhận định chuyên môn” không có nguồn.
- **Được phép:** mô tả **đã xảy ra**, số liệu có mốc thời gian, trích dẫn **nguyên văn có nguồn** khi một cơ quan/báo chính thức đưa dự báo (ghi rõ “theo [tên nguồn]…”).
- **Được phép:** mục kiểu “các mốc tin công khai đáng theo dõi” (lịch họp, báo cáo sắp công bố) **không** kèm kết luận biên tập về kết quả tương lai.
- Tránh tiêu đề/mục lục gợi dự báo: không dùng “triển vọng”, “dự báo”, “kịch bản” như lời của trang trừ khi đang **trích thuật** nguồn có thẩm quyền.

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

## Mandatory Related Affiliate Rule

Every generated news item must include 3 related products:
- 1 product liên quan nhất (primary) cho vị trí 1
- 2 sản phẩm liên quan còn lại cho vị trí 2 (khối "Sản phẩm liên quan")

Preferred source pools:
- `data/aff/products` (primary)
- `data/aff/products.json` (fallback)

### Product selection constraints

All selected products should have:
- non-empty `name`
- non-empty `url`
- `thumbnail` preferred (fallback allowed)

Relevance ranking rule:
- Score by topical match with article `title`, `tags`, `category`.
- Highest-relevance product goes to position 1.
- Next 2 products go to position 2.
- No duplicate product URLs across 3 items.

### JSON mapping (required)

Map primary product into news item:
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

Map the other 2 related products into:
- `relatedAffiliates` (array length = 2)
- Each item uses the same schema as `affiliate`

## Article Detail Requirements (Detailed Content)

Do not generate short stub pages.

Each detail page must include:
1. Breadcrumb + category chip
2. H1 + metadata row
3. Cover image
4. Summary paragraph
5. TOC block
6. At least 3 content sections with meaningful paragraphs
7. Optional specialized analysis section when topic needs depth (e.g., "Phân tích diễn biến **đã ghi nhận**", "Điểm đáng chú ý từ dữ liệu") — không dự báo tương lai
8. Affiliate `ads-card` block in article body:
   - include `data-random-affiliate="true"` (vị trí 1, primary product)
9. Post-conclusion affiliate `ads-card`:
   - add one more `data-random-affiliate="true"` block ngay sau phần kết luận (vị trí 2, hiển thị 2 related products + title "Sản phẩm liên quan")
10. Placement override rule (required):
   - Default layout keeps 2 affiliate blocks (one in-body + one post-conclusion).
   - If user explicitly requests a different placement/count (e.g., only in-body, remove post-conclusion), user instruction takes priority.
   - When override is applied, keep exactly the requested placement/count and avoid leaving duplicate blocks.
11. Source reference block (`<div class="source-box">`) with links
12. **Lưu ý nhỏ / disclaimer — vị trí theo độ nhạy cảm (bắt buộc):**
    - **Nguyên tắc:** Tin được xem là **nhạy cảm** (YMYL-adjacent) → đặt disclaimer **đầu trang**; các tin còn lại → đặt **cuối trang**, ngay trước nguồn.
    - **Tin nhạy cảm — đầu trang:** Ngay **sau** đoạn tóm tắt (`<p class="news-summary">`…`</p>`), **trước** `<nav class="news-toc">`, chèn `<aside class="news-disclaimer news-disclaimer--lead" aria-labelledby="disclaimer-block-title">` với `<h2 class="news-disclaimer-title" id="disclaimer-block-title">Lưu ý nhỏ</h2>`. **Không** đặt bản đầy đủ cùng kiểu ở cuối (tránh lặp dài); có thể kết thúc bằng một câu nhắc đối chiếu **Nguồn tham khảo** khi sắp tới mục đó trong bài.
    - **Tin thường — cuối trang:** Sau `</section>` của `news-content`, **trước** `<div class="source-box">`, chèn `<aside class="news-disclaimer news-disclaimer--near-sources" …>` (cùng tiêu đề và giọng như trên).
    - **Nội dung chung (cả hai vị trí):** Giọng tự nhiên, thân (ví dụ "mình", "bài này"): **đoạn mở (lead)** bài chi tiết dùng `<p class="news-disclaimer-lead">` — ví dụ: «Bài này là phần **tổng hợp và chia sẻ góc nhìn cá nhân** dựa trên các nguồn công khai. Những đoạn phân tích hay góc nhìn trong bài không thay cho thông báo chính thức từ cơ quan hoặc tổ chức được trích dẫn.» **Không** thêm cụm kiểu «viết lại cho dễ đọc / dễ theo dõi» hay «không phải báo chí / trang có giấy phép đăng tin» trừ khi user yêu cầu rõ. Trang listing `tin-tuc/index`: đoạn tương ứng kiểu «Mục Chia sẻ mỗi ngày là nơi mình tổng hợp tin từ nguồn mở» + câu về góc nhìn / không thay thông báo chính thức — **không** lặp các cụm đã bỏ ở trên. **Đoạn thứ hai (số liệu / nguồn, chuẩn):** sau lead, một `<p>` thường: «Các số liệu được tham khảo vào thời điểm viết bài, bạn có thể kiểm tra lại các nguồn tham khảo của các bài viết chính thống ở cuối mỗi bài.» — trang listing `tin-tuc/index` dùng cùng ý trong block disclaimer. **Đoạn kết disclaimer (chuẩn):** «Đây không phải thông tin tư vấn hay khuyến nghị đầu tư - vui lòng chỉ sử dụng cho mục đích tham khảo.» — **không** liệt kê luật/y tế hay «chứng chỉ hành nghề» trừ khi bài thuộc lĩnh vực đó và user yêu cầu rõ. Bài `policy` / lịch nghỉ: thêm đoạn ưu tiên văn bản chính thức. Bài giáo dục/lịch thi: thêm đoạn ưu tiên Bộ GD&amp;ĐT và nhà trường.
    - **Phân loại "nhạy cảm" (hướng dẫn):** Ưu tiên coi là nhạy cảm khi chủ đề có thể ảnh hưởng trực tiếp đến **sức khỏe, tiền bạc đầu tư, hoặc quyết định pháp lý cá nhân** — ví dụ: `health`; tin **giá vàng / lãi suất / đầu tư / chứng khoán / tiền mã hóa** trong nhóm `economy`; hướng dẫn mang tính **tư vấn pháp lý-y tế-tài chính** dù chỉ ở mức tổng hợp. Các chủ đề như công nghệ sản phẩm, giải trí, xã hội chung (không gắn quyết định tài chính/sức khỏe nặng) → dùng **cuối trang**.
    - Khi xóa `news-disclaimer-footer` khỏi trong section, **không** dùng regex/footer pattern nuốt khoảng trắng trước block `ads-card` post-conclusion.
13. CTA row at bottom
14. Script include for random affiliate:
   - `../js/news-affiliate-random.js`
15. **Bài review sản phẩm (bắt buộc):**
   - Cover banner đầu bài (`.news-cover`) phải click được để mở link affiliate chính.
   - URL cover click phải đồng nhất với CTA nguồn/affiliate chính (`#news-source-button` hoặc `links.affiliateUrl`).
   - Dùng `target="_blank"` + `rel="noopener noreferrer nofollow"`.

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
- Section 3: `Phân tích động lực kỹ thuật` (chi phí, cung-cầu, thanh khoản, độ trễ) — chỉ từ dữ liệu và giải thích cơ chế đã ghi nhận
- Optional Section 4: `Các mốc thông tin công khai đáng theo dõi` (lịch công bố, báo cáo, nguồn tra cứu) — **không** kịch bản giá hay dự báo biên tập
- Conclusion: tóm tắt trạng thái **đã quan sát** và giới hạn hiểu biết; không kết luận về hướng đi tương lai trừ khi trích nguồn có thẩm quyền

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
- Section 2: `Xu hướng hành vi / tâm lý cộng đồng` (chỉ từ khảo sát, báo cáo hoặc sự kiện đã diễn ra)
- Section 3: `Tác động dân sinh theo nhóm đối tượng`
- Optional Section 4: `Các mốc hoặc nguồn cập nhật đáng theo dõi` (không phán đoán kết quả)
- Conclusion: quan sát trung tính về những gì **đã** ghi nhận

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

## Content Writing Rules (Aggregation & Legal Compliance)

When drafting article content, follow these rules to avoid copyright risk and ensure legal compliance:

- **Rewrite 100%:** Never copy verbatim from any source. Summarize and express in your own words.
- **Minimum sources:** Use at least 2 trusted sources; prefer 3+ when possible. Prioritize: official/government, institutional, reputable press.
- **Verify before writing:** Only include information verifiable from sources. Do not invent numbers, timestamps, or quotes.
- **Title policy:** Accurate, reflects content; may be engaging but must not be clickbait or misleading.
- **Section naming:** Use "Góc nhìn biên tập" (editorial perspective) or "Phân tích khách quan dựa trên dữ liệu"—not "Nhận định cá nhân" (personal opinion).
- **No professional advice:** Do not give financial, medical, or legal advice. Use neutral, observational language.
- **No absolute claims:** Avoid definitive claims unless backed by official sources.
- **Copyright:** Do not use copyrighted content (images, long quotes). Short quotes must be attributed. For images, prefer Wikimedia Commons (CC), Unsplash, Pexels.
- **Emoji:** Use sparingly; avoid for economy, policy, finance topics.
- **Article length:** Minimum 400 words; target 400–800 words. Avoid thin content (150–300 words).
- **Lưu ý nhỏ / miễn trừ:** Vị trí theo mục 12 — **nhạy cảm:** `news-disclaimer--lead` sau tóm tắt, trước TOC; **tin thường:** `news-disclaimer--near-sources` trước `source-box`. Giọng tự nhiên; không bắt buộc `news-disclaimer-footer` trùng ý.

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
- Conclusion sections should be neutral, journalistic observations **về quá khứ và hiện tại đã có nguồn**.
- Avoid imperative advice language ("nên", "hãy", "cần phải làm...") in conclusions.
- **Không** kết thúc bằng dự đoán hướng đi, kịch bản giá, hay “triển vọng” do biên tập tự suy; chỉ tóm tắt điều đã kiểm chứng và (nếu cần) hướng độc giả tới nguồn chính thức để tự cập nhật.

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
- 3 related affiliate products are mapped in JSON (1 primary + 2 related)
- detail page affiliate block count/placement matches user instruction when explicitly provided
- otherwise default to 2 blocks (in-body + post-conclusion)
- detail page loads `../js/news-affiliate-random.js`
- nếu là bài review sản phẩm: cover banner click mở đúng link affiliate chính
- title/body do not force Tet framing when topic is non-Tet
- category follows controlled topic taxonomy
- article includes verified primary source references
- thumbnail is topic-relevant (no off-topic random image)
- thumbnail source attribution exists (`thumbnailSource.name`, `thumbnailSource.url`)
- thumbnail uses licensed source (Wikimedia Commons, Unsplash, Pexels preferred; avoid newspaper images without permission)
- disclaimer đúng vị trí theo độ nhạy cảm (mục 12): bài **nhạy cảm** có `news-disclaimer--lead` sau `news-summary`, trước TOC; bài **thường** có `news-disclaimer--near-sources` ngay trước `source-box`
- section blueprint matches topic class (technology/economy/entertainment/society/...)
- section names are not generic-cloned from unrelated domains
- domain evidence style is correct (e.g., economy has indicators; technology has how-to flow)
- routing consistency maintained (`/tin-tuc/` listing, `/tin-tuc/<slug>.html` detail, legacy blog redirects when applicable)

## Output Style

After completion, report:
1. Created item ID + slug
2. Updated JSON path
3. Created HTML path
4. Primary + related products selected (3 items)
5. Any fallback decisions (slug collision, missing field inference)

## Additional Examples

For examples, see [examples.md](examples.md).

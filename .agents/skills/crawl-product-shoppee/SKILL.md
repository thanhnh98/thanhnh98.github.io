---
name: crawl-product-shoppee
description: Use when crawling Shopee Affiliate product offers from https://affiliate.shopee.vn/offer/product_offer, including category tabs, keyword searches, paginated results, copying affiliate shortlinks, resolving Shopee product URLs, parsing product metadata, and appending non-duplicate records to data/aff/products.
---

# Crawl Product Shoppee

## Purpose

Use this skill to turn Shopee Affiliate offer cards into repo product records. It is designed for this repo's `data/aff/products` schema and the browser workflow where the user is logged in to Shopee Affiliate.

Also load `ecommerce-affiliate-shop` before editing product data. Use Chrome browser control, not plain HTTP, because Shopee Affiliate requires the user's logged-in browser state and Shopee product pages may require CAPTCHA/session continuity.

## Product Schema

Each product record must preserve the existing fields:

```json
{
  "id": "itemId",
  "shopId": "shopId",
  "thumbnail": "https://down-vn.img.susercontent.com/file/...",
  "images": [],
  "name": "Product name | Shopee Việt Nam",
  "description": "Verified description or Shopee meta description",
  "type": "shopee",
  "group": "tech-accessories",
  "category": ["phone-cases", "phone-accessories"],
  "coinBonus": 10,
  "buyText": "Xem sản phẩm",
  "url": "https://s.shopee.vn/..."
}
```

Never invent price, rating, sold count, voucher, or shipping claims. Only store product text/images observed from Shopee.

## Workflow

1. Open or claim the Chrome tab at `https://affiliate.shopee.vn/offer/product_offer`.
2. If the user asks for specific tabs, click each requested tab first; otherwise process the currently visible tab.
3. If the user provides a keyword, fill the search input, press Enter, and confirm the input value and visible results changed before crawling.
4. If the user asks for multiple pages, collect cards page by page from the pagination controls before crawling. Return to each page before clicking that page's card-scoped `Lấy link` buttons.
5. Read visible offer cards from anchors matching `/offer/product_offer/{itemId}`.
6. Load `data/aff/products` and build duplicate sets by both `id` and `shopId/id`.
7. For each visible card:
   - Skip if the offer `itemId` is already present.
   - Click that card's own `Lấy link` button.
   - Read the shortlink from the open dialog textbox, not from stale page text.
   - Close the dialog before moving to the next item.
   - Open the shortlink in a Shopee product tab.
   - Wait for product page load. If Shopee shows CAPTCHA, ask the user to solve it and resume.
   - Parse the resolved URL as `/product/{shopId}/{itemId}` or `-i.{shopId}.{itemId}`.
   - Reject the record if resolved `itemId` does not equal the source offer `itemId`.
   - Reject the record if title is generic Shopee homepage text, thumbnail is missing, or no product metadata is available.
8. Build records from JSON-LD `Product` first, then Open Graph meta tags, then visible product page text.
9. Append valid records with `scripts/append_products.js`.
10. Verify with `JSON.parse`, item count, required fields, and no new duplicate `shopId/id` pairs.

## Chrome Extraction Pattern

Use a real Chrome session with the Chrome skill. After claiming the affiliate tab, prefer bounded page evaluation:

```js
const cards = await affTab.playwright.evaluate(() =>
  [...document.querySelectorAll('a[href*="/offer/product_offer/"]')].map((a, index) => {
    const href = a.getAttribute('href') || '';
    const id = href.match(/product_offer\/(\d+)/)?.[1] || '';
    const text = (a.innerText || '').replace(/\s+/g, ' ').trim();
    return { index, id, href, text, buttonCount: a.querySelectorAll('button').length };
  }).filter(x => x.id)
);
```

For keyword crawling, use the page's search input and preserve whatever commission/filter tab is already active unless the user asks to change it:

```js
const search = affTab.playwright.locator('input[placeholder="Tìm kiếm tất cả sản phẩm Shopee"]');
if (await search.count() !== 1) throw new Error("search input not found");
await search.fill(keyword, { timeoutMs: 10000 });
await search.press("Enter", { timeoutMs: 10000 });
await affTab.playwright.waitForTimeout(2500);
const state = await affTab.playwright.evaluate(() => ({
  keyword: document.querySelector('input[placeholder="Tìm kiếm tất cả sản phẩm Shopee"]')?.value || "",
  count: document.querySelectorAll('a[href*="/offer/product_offer/"]').length,
}));
```

For pagination, scroll to the bottom if needed, collect each requested page's cards, then return to that page before copying links:

```js
const pageButton = affTab.playwright.locator("span.page-item.page-page").filter({ hasText: String(pageNumber) });
if (await pageButton.count() !== 1) throw new Error(`page ${pageNumber} button not found`);
await pageButton.click({ timeoutMs: 10000 });
await affTab.playwright.waitForTimeout(2200);
```

For copying a link, close any previous dialog first, click the card-scoped button, then read the dialog textbox:

```js
const button = affTab.playwright.locator(`a[href*="/offer/product_offer/${itemId}"] button`);
if (await button.count() !== 1) throw new Error("ambiguous Lấy link button");
await button.click({ timeoutMs: 10000 });
await affTab.playwright.waitForTimeout(1500);
const shortUrl = await affTab.playwright.evaluate(() => {
  const values = [...document.querySelectorAll("input,textarea")]
    .map(el => el.value || "")
    .filter(v => /https?:\/\/s\.shopee\.vn\//.test(v));
  return values[values.length - 1] || "";
});
```

If list-card buttons repeatedly resolve to the wrong product, open the detail page directly and get the link there:

```js
await affTab.goto(`https://affiliate.shopee.vn/offer/product_offer/${itemId}`);
```

## Product Page Parsing

Parse in priority order:

- URL: `shopId` and `itemId` from `/product/{shopId}/{itemId}` or canonical `-i.{shopId}.{itemId}`
- JSON-LD Product: `name`, `description`, `image`, `productID`
- Open Graph: `og:title`, `og:description`, `og:image`
- Images: `down-vn.img.susercontent.com/file/...`, normalized by removing `_tn` and `@resize_w..._nl.webp`

Reject a candidate when:

- Shortlink resolves to a different `itemId`
- `thumbnail` is empty
- title starts with generic `Shopee Việt Nam | Mua và Bán`
- product page is CAPTCHA/error and user has not solved it
- the same `id` or `shopId/id` already exists

## Category Heuristic

Choose from the categories already present in `data/aff/products`; do not use legacy aliases as stored category values.

- `apparel`: áo, váy, quần, bra, áo dài, đồ mặc.
- `shoes-bags`: dép, sandal, giày, túi xách.
- `personal-accessories`: mũ, găng tay, khẩu trang, băng đô, tất, phụ kiện tóc.
- `drinks`: sữa, trà, cà phê, nước uống.
- `snacks-sweets`: bánh, kẹo, socola, mứt, hạt ăn vặt.
- `pantry-food`: dầu ăn, ôliu, lạp xưởng, thực phẩm/gia vị nấu ăn.
- `kitchen-dining`: đồ bếp, hộp đựng, ly, cốc, chảo, khay, máy xay bếp.
- `home-essentials`: khăn giấy, túi rác, móc treo, kệ để đồ, đồ dùng gia đình.
- `home-appliances`: quạt, đèn, thiết bị điện gia dụng.
- `decorations`: lịch Tết, bình/lọ hoa, decal, đồ trang trí nhà, quạt trang trí.
- `gift-sets`: hộp quà, giỏ quà, set quà. If the item is food in gift packaging, keep the food category too, ordered by the primary product type.
- `lucky-money`: bao lì xì.
- `games-toys`: bài tây, bầu cua, đồ chơi/giải trí Tết.
- `phone-cases`: ốp lưng, case điện thoại, vỏ điện thoại. Also include `phone-accessories` in the same category array for phone cases.
- `phone-accessories`: AirPods, tai nghe, case AirPods, phụ kiện điện thoại không phải ốp lưng
- `phone-tablet`: điện thoại, iPad, máy tính bảng.
- `smart-wearables`: đồng hồ thông minh, vòng đeo thông minh.
- `electronics-gadgets`: màn hình, thiết bị điện tử không thuộc các nhóm tech cụ thể ở trên.

Prefer a conservative category over creating a new one.
Store product `category` as an array ordered from most specific to broader related categories. When the products file has `groups`, set a matching primary `group` too, such as `tech-accessories` for `phone-cases` and `phone-accessories`, or `home-living` for home/kitchen products.

## Append And Validate

Save crawled records to a temporary JSON array, then run:

```bash
node .agents/skills/crawl-product-shoppee/scripts/append_products.js \
  --records /tmp/shopee-aff-records.json \
  --products data/aff/products
```

For a dry run:

```bash
node .agents/skills/crawl-product-shoppee/scripts/append_products.js \
  --records /tmp/shopee-aff-records.json \
  --products data/aff/products \
  --dry-run
```

After appending, verify:

```bash
node -e "const fs=require('fs'); const j=JSON.parse(fs.readFileSync('data/aff/products','utf8')); console.log(j.data.products.length)"
```

Report how many visible offers were found, skipped as duplicates, rejected for mismatch/missing metadata, and appended.

---
name: ecommerce-affiliate-shop
description: Use when adding or editing affiliate products, Shopee/TikTok Shop product cards, affiliate CTAs, related product blocks, shop listings, or conversion-oriented ecommerce UI in this repo.
---

# Ecommerce Affiliate Shop

This is the Codex-readable mirror for `.cursor/skills/ecommerce-affiliate-shop/SKILL.md`.
Read the Cursor skill before changing affiliate product data or ecommerce UI.

## Affiliate Rules

- Be transparent about the source marketplace, such as Shopee or TikTok Shop.
- Use clear CTA text, usually `Xem sản phẩm`.
- Use product images that match the item; add meaningful alt text and `loading="lazy"`.
- Affiliate links must use `target="_blank"` and `rel="noopener noreferrer nofollow"` in article/detail contexts.
- Avoid misleading claims. If price, rating, sales count, or voucher information is not verified, do not invent it.
- Product cards and ad blocks should have multiple clear click points: image, title, CTA.

## Data Expectations

Products in `data/aff/products` should preserve the repo schema: `id`, `shopId`, `thumbnail`, `images`, `name`, `description`, `type`, `group`, `category`, `coinBonus`, `buyText`, and `url`. Store `category` as an array ordered from most specific to broader related categories, for example `["phone-cases", "phone-accessories"]`.

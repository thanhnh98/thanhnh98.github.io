# Homepage mobile ads experiment — 2026-10-07

## Implemented

- Compact mobile countdown, four timer columns; preserve the desktop hero.
- Auto-only by default: manual rectangle is disabled to avoid a large blank area and extra manual ad request. If explicitly enabled, it reserves 336×280 space.
- Reuse existing AdSense client 3395045728500314 and slot 5131370387.
- Load AdSense asynchronously earlier on the production homepage, not on local preview.
- Move mobile fireworks/app controls into the share strip to avoid anchor overlap.
- `data-home-manual-ads="off"` on the body hides/disables the manual unit. Auto ads remains controlled separately in AdSense.

## Before/after publishing

Account settings were not changed. After publishing, inspect the real mobile page and use Auto ads excluded areas if it places another in-page ad next to this unit. Keep anchor as an initial test; do not add a custom sticky unit.

The local preview has no ads or reserved manual ad space. Auto ads can still insert live placements, so local verification does not establish production CLS, fill or revenue. Do not initialize a hidden manual slot and wait for it to fill: Google warns this may prevent its ad request.

Mobile restores the original full-viewport countdown. The app CTA is an icon button in the mobile header and reuses the existing Android/iOS smart-store routing. The bottom 92px of the hero is intentionally free of owned UI so Auto ads behavior can be observed; there is no manual ad request or guarantee that Auto ads will choose it. Mobile uses header sharing only (no duplicate share CTA underneath). Continuous timer effects stay disabled to reduce rendering work. Sharing renders a standalone local Canvas PNG with a baked-in saptet.vn watermark.

## Measurement

Record a mobile baseline before launch. Compare mobile page RPM, Active View viewability, total revenue, pageviews and engagement over comparable traffic periods. Use 7–14 days as an initial observation window, longer if volume is low; account for Tet seasonality. Do not choose by ad CTR alone or promise a revenue increase.

The reused slot cannot isolate homepage revenue at ad-unit level; use URL/device reporting. Create a dedicated ad unit later if separate placement reporting is needed.

For an Auto-only comparison, disable the manual unit while keeping the same compact layout. A second comparison of the original layout would confound placement with layout changes.

Publish using the existing deployment/version workflow so service-worker users receive updated assets. No commit, push or deployment is included in this change.

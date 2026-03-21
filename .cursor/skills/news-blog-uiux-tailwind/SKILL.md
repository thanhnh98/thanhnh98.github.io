---
name: news-blog-uiux-tailwind
description: Generates modern Tailwind-based news/blog pages with strong UI/UX defaults and complete long-form article structures. Placeholder and sample copy must not imply editorial prediction or speculation (no forecasts, scenarios, or “sẽ/có thể” forward claims unless clearly labeled as quoted third-party source). Use when creating or redesigning news homepages, blog listing pages, article detail pages, responsive blog UIs, or improving readability and accessibility.
---

# Modern News/Blog UI-UX (Tailwind)

## Purpose

Use this skill to generate full-page code for modern news/blog interfaces with clean hierarchy, good readability, and mobile-first behavior.

## Output Contract

When this skill is invoked, produce complete page code (not just fragments) for one of:

- News homepage
- Blog listing page
- Blog/article detail page with full content sections

Default stack is HTML + Tailwind CSS.

## Workflow

1. Identify page type and audience goal.
2. Define content hierarchy before writing code:
   - Primary objective (read, discover, subscribe, click-through).
   - Page sections in order.
3. Generate Tailwind layout skeleton:
   - Semantic landmarks (`header`, `main`, `section`, `article`, `aside`, `footer`).
   - Responsive grid/flex structure (mobile-first).
4. Fill components with realistic placeholders (factual tone only—no invented forecasts or editorial speculation):
   - Hero area
   - Card/list modules
   - Metadata blocks (author, date, read-time, category)
   - CTA and related-content modules
5. Apply UX quality rules and accessibility checks before finalizing.

## Required UI/UX Rules

- Prioritize readability:
  - Article body max width around `max-w-3xl`.
  - Comfortable line height (`leading-7` or higher for long text).
  - Clear heading scale (`text-3xl`, `text-2xl`, `text-xl`).
- Keep information scent strong:
  - Show category chips/tags.
  - Use breadcrumbs on detail pages.
  - Include related posts near article end.
- Keep interactions clear:
  - Distinct hover/focus states for links and cards.
  - Consistent spacing rhythm (`space-y-*`, `gap-*`, section paddings).
- Preserve visual consistency:
  - One color system, one radius scale, one shadow intensity family.

## Accessibility Requirements

Every generated page must include:

- Proper heading order (single `h1`, then nested `h2`/`h3`).
- Keyboard-visible focus styles (`focus:outline-none focus:ring-*`).
- Semantic lists for nav/listing data where appropriate.
- Meaningful `alt` text for images.
- Sufficient color contrast for text and action elements.
- Link text that describes destination (avoid vague "click here").

## Full Article Detail Template

For article detail pages, include all major blocks:

1. Breadcrumb + category
2. Title + subtitle/standfirst
3. Author/date/read-time row
4. Cover image
5. Table of contents (for long article)
6. Article body with multiple sections:
   - Intro paragraph
   - At least 3 section headings
   - Quote/callout block
   - Bullet list and/or numbered list
7. Source references block
8. Affiliate/CTA block (if provided)
9. Related posts block
10. Footer

## Tailwind Implementation Defaults

- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Article container: `max-w-3xl mx-auto`
- Card style: `rounded-2xl border border-slate-200 bg-white shadow-sm`
- Sticky header (optional): `sticky top-0 z-40 backdrop-blur`
- Smooth reading spacing: `prose` style or equivalent utility classes

## Response Format

Return:

1. The complete page code.
2. A short note listing key UI/UX choices made (3-5 bullets).
3. Optional next enhancement suggestions (max 3).

## Examples and Checklist

- Prompt examples: [examples.md](examples.md)
- QA checklist: [reference.md](reference.md)

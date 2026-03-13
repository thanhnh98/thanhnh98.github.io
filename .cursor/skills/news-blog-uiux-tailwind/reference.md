# Quality Checklist

Use this checklist before final output.

## Responsiveness

- Mobile layout works first (`<640px`) without overlap.
- Tablet (`sm/md`) and desktop (`lg+`) use clear content hierarchy.
- Cards/images scale without distortion.
- Navigation remains usable on small screens.

## Accessibility

- Exactly one `h1` per page.
- Heading levels are sequential (`h2` under `h1`, then `h3`).
- Interactive elements have visible focus state.
- All meaningful images include descriptive `alt`.
- Color contrast is readable for body text and buttons.
- Landmark regions are present (`header`, `main`, `footer`).

## Content Completeness (Article Detail)

- Includes title, subtitle, author/date/read-time.
- Includes cover image and at least 3 content sections.
- Includes quote/callout and at least one list block.
- Includes sources/reference links.
- Includes related posts and a clear next action.

## UI Consistency

- Spacing rhythm is consistent across sections.
- Typography scale is consistent for headings/body/meta.
- Repeated components share the same visual style.
- Link/button states are visually consistent.

## Final Validation

- Page renders as complete code (no placeholder TODO blocks).
- Class names are valid Tailwind utilities.
- No broken local anchors/section links.

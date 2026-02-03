---
name: responsive-web-app
description: Best practices và patterns cho responsive web design. Bao gồm mobile-first approach, breakpoints, fluid typography với clamp(), responsive grids, touch-friendly UI, viewport optimization, và performance. Sử dụng khi implement layout mới, component mới, hoặc cải thiện responsive design cho website.
---

# Responsive Web-App Design

## Khi Nào Sử Dụng Skill Này

Áp dụng skill này khi:
- ✅ Implement layout hoặc component mới
- ✅ Thiết kế responsive grid
- ✅ Tối ưu typography cho mobile/desktop
- ✅ Implement navigation responsive
- ✅ Tối ưu images và media
- ✅ Cải thiện touch interactions
- ✅ Fix responsive issues

---

## Core Principles

### 1. Mobile-First Approach
- ✅ Design cho mobile trước, sau đó mở rộng cho desktop
- ✅ Base styles cho mobile, dùng `min-width` media queries
- ✅ Progressive enhancement từ mobile → tablet → desktop

### 2. Fluid & Flexible
- ✅ Sử dụng relative units (rem, em, %, vw, vh)
- ✅ Flexible layouts với Flexbox và CSS Grid
- ✅ Fluid typography với `clamp()`

### 3. Performance First
- ✅ Lazy load images
- ✅ Optimize assets cho mobile
- ✅ Minimize layout shifts (CLS)

---

## Breakpoints Strategy

### Standard Breakpoints

```css
/* Mobile First - Base styles cho mobile */
/* No media query = mobile styles */

/* Small Mobile */
@media (min-width: 480px) {
  /* Small phones landscape, large phones portrait */
}

/* Tablet */
@media (min-width: 768px) {
  /* Tablets portrait, small laptops */
}

/* Desktop */
@media (min-width: 1024px) {
  /* Laptops, desktops */
}

/* Large Desktop */
@media (min-width: 1280px) {
  /* Large desktops */
}
```

### Max-Width Approach (Khi cần)

```css
/* Desktop First - Base styles cho desktop */

/* Tablet */
@media (max-width: 1023px) {
  /* Tablet và nhỏ hơn */
}

/* Mobile */
@media (max-width: 768px) {
  /* Mobile và nhỏ hơn */
}

/* Small Mobile */
@media (max-width: 480px) {
  /* Small mobile */
}
```

### Breakpoint Variables (Recommended)

```css
:root {
  --breakpoint-sm: 480px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

@media (min-width: var(--breakpoint-md)) {
  /* Tablet styles */
}
```

---

## Viewport Meta Tag

### Essential Viewport

```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, viewport-fit=cover">
```

**Giải thích:**
- `width=device-width`: Set width theo device width
- `initial-scale=1`: Không zoom ban đầu
- `shrink-to-fit=no`: Prevent iOS Safari shrink
- `user-scalable=no`: Disable zoom (optional, chỉ khi cần)
- `viewport-fit=cover`: Cho notch devices (iPhone X+)

### PWA Viewport

```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover">
```

---

## Container & Layout

### Container Pattern

```css
.container {
  width: 100%;
  max-width: 1200px; /* hoặc 1280px */
  margin: 0 auto;
  padding: 0 1rem; /* Mobile padding */
}

@media (min-width: 768px) {
  .container {
    padding: 0 2rem; /* Tablet+ padding */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 3rem; /* Desktop padding */
  }
}
```

### Full-Width Sections

```css
.section {
  width: 100%;
  padding: 2rem 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .section {
    padding: 3rem 2rem; /* Tablet+ */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 4rem 3rem; /* Desktop */
  }
}
```

---

## Responsive Typography

### Fluid Typography với clamp()

```css
/* Heading */
h1 {
  font-size: clamp(1.75rem, 5vw, 2.75rem);
  /* Min: 1.75rem (mobile)
     Preferred: 5vw (fluid)
     Max: 2.75rem (desktop) */
}

h2 {
  font-size: clamp(1.5rem, 4vw, 2.25rem);
}

h3 {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
}

/* Body text */
p {
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
}

/* Small text */
small {
  font-size: clamp(0.8rem, 2vw, 1rem);
}
```

### Line Height Responsive

```css
p {
  font-size: clamp(0.95rem, 2.5vw, 1.15rem);
  line-height: 1.6; /* Fixed cho readability */
}

h1, h2, h3 {
  line-height: 1.2; /* Tighter cho headings */
}
```

### Font Weight Responsive

```css
h1 {
  font-weight: 700; /* Mobile: bold */
}

@media (min-width: 768px) {
  h1 {
    font-weight: 800; /* Desktop: extra bold */
  }
}
```

---

## Responsive Grids

### CSS Grid - Auto-fit Pattern

```css
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 1rem;
}

@media (min-width: 480px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* 2 columns */
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(4, 1fr); /* 4 columns */
  }
}
```

### CSS Grid - Auto-fit với minmax()

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

/* Mobile: items sẽ wrap khi < 250px */
/* Desktop: tự động fit số columns */
```

### Flexbox Responsive

```css
.flex-container {
  display: flex;
  flex-direction: column; /* Mobile: stack */
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row; /* Tablet+: horizontal */
    gap: 2rem;
  }
}
```

### Card Grid Pattern

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 480px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

---

## Responsive Images

### Lazy Loading

```html
<img src="image.jpg" 
     alt="Description"
     loading="lazy" />
```

### Responsive Images với srcset

```html
<img src="image-small.jpg"
     srcset="image-small.jpg 480w,
             image-medium.jpg 768w,
             image-large.jpg 1200w"
     sizes="(max-width: 480px) 100vw,
            (max-width: 768px) 50vw,
            33vw"
     alt="Description"
     loading="lazy" />
```

### Picture Element

```html
<picture>
  <source media="(min-width: 1024px)" 
          srcset="image-large.jpg" />
  <source media="(min-width: 768px)" 
          srcset="image-medium.jpg" />
  <img src="image-small.jpg" 
       alt="Description"
       loading="lazy" />
</picture>
```

### Aspect Ratio

```css
.image-container {
  position: relative;
  aspect-ratio: 16 / 9; /* Modern browsers */
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fallback cho browsers cũ */
@supports not (aspect-ratio: 16 / 9) {
  .image-container::before {
    content: '';
    display: block;
    padding-top: 56.25%; /* 16:9 = 56.25% */
  }
  
  .image-container img {
    position: absolute;
    top: 0;
    left: 0;
  }
}
```

### Image Placeholder

```css
.image-placeholder {
  background: linear-gradient(135deg, #eee 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  font-size: 2.5rem;
  aspect-ratio: 1;
}
```

---

## Touch-Friendly UI

### Touch Target Sizes

```css
/* Minimum touch target: 44x44px (iOS) hoặc 48x48px (Material) */
button, 
a.button,
.touch-target {
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem 1rem; /* Adequate padding */
}

@media (min-width: 768px) {
  /* Desktop có thể nhỏ hơn */
  button {
    min-width: auto;
    min-height: auto;
    padding: 0.5rem 0.75rem;
  }
}
```

### Spacing Between Touch Targets

```css
.touch-elements {
  display: flex;
  gap: 0.5rem; /* Minimum 8px spacing */
}

@media (min-width: 768px) {
  .touch-elements {
    gap: 0.25rem; /* Desktop có thể gần hơn */
  }
}
```

### Swipe Gestures

```css
.swipeable {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* iOS smooth scroll */
  scrollbar-width: none; /* Firefox */
  scroll-behavior: smooth;
}

.swipeable::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}

.swipeable-item {
  flex-shrink: 0; /* Prevent shrinking */
  min-width: 250px; /* Minimum card width */
}
```

---

## Navigation Responsive

### Mobile Menu Toggle

```html
<button class="mobile-menu-toggle" 
        aria-label="Toggle menu"
        aria-expanded="false">
  <span class="hamburger-icon"></span>
</button>
```

```css
.mobile-menu-toggle {
  display: none; /* Hidden on desktop */
}

@media (max-width: 767px) {
  .mobile-menu-toggle {
    display: block; /* Show on mobile */
  }
  
  nav {
    display: none; /* Hide nav on mobile */
  }
  
  nav.mobile-open {
    display: block; /* Show when toggled */
  }
}
```

### Horizontal Scroll Navigation

```css
.nav-scroll {
  display: flex;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  gap: 0.5rem;
  padding: 0 1rem;
  margin: 0 -1rem; /* Offset container padding */
}

.nav-scroll::-webkit-scrollbar {
  display: none;
}

.nav-scroll-item {
  flex-shrink: 0;
  white-space: nowrap;
}
```

### Sticky Header

```css
header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--color-header-bg);
}

/* Account for fixed header */
body {
  padding-top: 80px; /* Header height */
}

@media (max-width: 768px) {
  body {
    padding-top: 70px; /* Smaller header on mobile */
  }
}
```

---

## Forms Responsive

### Input Fields

```css
input, textarea, select {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem; /* Prevent zoom on iOS */
  border-radius: 8px;
  border: 1px solid #ddd;
}

@media (min-width: 768px) {
  input, textarea, select {
    max-width: 500px; /* Limit width on desktop */
  }
}
```

### Form Layout

```css
.form-group {
  margin-bottom: 1.5rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-row {
    flex-direction: row;
    gap: 1.5rem;
  }
  
  .form-row .form-group {
    flex: 1;
  }
}
```

### Buttons

```css
.btn {
  width: 100%; /* Mobile: full width */
  padding: 0.75rem 1.5rem;
  min-height: 44px;
  font-size: 1rem;
}

@media (min-width: 768px) {
  .btn {
    width: auto; /* Desktop: auto width */
    padding: 0.5rem 1.25rem;
  }
}
```

---

## Modal & Overlay Responsive

### Modal

```css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal-content {
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .modal-content {
    padding: 2rem;
    max-width: 700px;
  }
}
```

### Mobile-Fullscreen Modal

```css
@media (max-width: 767px) {
  .modal-content {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    padding: 1rem;
  }
}
```

---

## Spacing & Padding Responsive

### Section Padding

```css
.section {
  padding: 2rem 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .section {
    padding: 3rem 2rem; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .section {
    padding: 4rem 3rem; /* Desktop */
  }
}
```

### Gap Responsive

```css
.grid {
  gap: 1rem; /* Mobile */
}

@media (min-width: 768px) {
  .grid {
    gap: 1.5rem; /* Tablet+ */
  }
}

@media (min-width: 1024px) {
  .grid {
    gap: 2rem; /* Desktop */
  }
}
```

---

## Performance Optimization

### Reduce Layout Shifts (CLS)

```css
/* Reserve space cho images */
.image-container {
  aspect-ratio: 16 / 9;
  background: #f0f0f0; /* Placeholder color */
}

/* Reserve space cho ads */
.ad-container {
  min-height: 250px; /* Standard ad height */
  background: #f5f5f5;
}
```

### Lazy Load Everything

```html
<!-- Images -->
<img loading="lazy" />

<!-- Videos -->
<video loading="lazy" />

<!-- Iframes -->
<iframe loading="lazy" />
```

### Critical CSS

```html
<!-- Inline critical CSS -->
<style>
  /* Above-the-fold styles */
</style>

<!-- Defer non-critical CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
```

---

## Common Responsive Patterns

### Hero Section

```css
.hero {
  padding: 3rem 1rem;
  text-align: center;
}

.hero h1 {
  font-size: clamp(1.75rem, 5vw, 3rem);
  margin-bottom: 1rem;
}

.hero p {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .hero {
    padding: 5rem 2rem;
  }
}
```

### Card Component

```css
.card {
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .card {
    padding: 1.5rem;
  }
}
```

### Two-Column Layout

```css
.two-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .two-column {
    flex-direction: row;
  }
  
  .two-column > * {
    flex: 1;
  }
}
```

### Sidebar Layout

```css
.layout-with-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 1024px) {
  .layout-with-sidebar {
    flex-direction: row;
  }
  
  .main-content {
    flex: 1;
  }
  
  .sidebar {
    width: 300px;
    flex-shrink: 0;
  }
}
```

---

## Testing Checklist

Khi implement responsive design, test:

- [ ] Mobile (320px - 480px)
- [ ] Tablet portrait (768px)
- [ ] Tablet landscape (1024px)
- [ ] Desktop (1280px+)
- [ ] Touch targets đủ lớn (min 44x44px)
- [ ] Text readable không cần zoom
- [ ] Images load và hiển thị đúng
- [ ] Navigation hoạt động trên mobile
- [ ] Forms usable trên mobile
- [ ] Modals responsive
- [ ] No horizontal scroll
- [ ] Performance: LCP < 2.5s
- [ ] No layout shifts (CLS < 0.1)
- [ ] Test trên real devices nếu có thể

---

## Browser Support

### Modern CSS Features

```css
/* Grid - Supported từ 2017 */
.grid {
  display: grid;
}

/* Flexbox - Supported từ 2012 */
.flex {
  display: flex;
}

/* clamp() - Supported từ 2019 */
.font-fluid {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

/* aspect-ratio - Supported từ 2021 */
.image {
  aspect-ratio: 16 / 9;
}

/* Fallback cho aspect-ratio */
@supports not (aspect-ratio: 16 / 9) {
  .image::before {
    content: '';
    display: block;
    padding-top: 56.25%;
  }
}
```

---

## Common Issues & Solutions

### Issue: Horizontal Scroll

```css
/* Solution */
body {
  overflow-x: hidden;
}

.container {
  max-width: 100%;
  overflow-x: hidden;
}
```

### Issue: Text Too Small on Mobile

```css
/* Solution: Use clamp() */
p {
  font-size: clamp(1rem, 2.5vw, 1.15rem);
}
```

### Issue: Images Overflow

```css
/* Solution */
img {
  max-width: 100%;
  height: auto;
}
```

### Issue: Fixed Width Breaking Layout

```css
/* Bad */
.element {
  width: 500px; /* Fixed width */
}

/* Good */
.element {
  max-width: 500px;
  width: 100%;
}
```

### Issue: Touch Targets Too Small

```css
/* Solution */
button, a {
  min-width: 44px;
  min-height: 44px;
  padding: 0.75rem 1rem;
}
```

---

## Resources

- [MDN Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [CSS-Tricks Responsive Design](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Web.dev Responsive](https://web.dev/responsive-web-design-basics/)
- [Can I Use](https://caniuse.com/) - Browser support checker

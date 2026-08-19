---
name: ecommerce-affiliate-shop
description: Thiết kế và UX best practices cho tính năng shop affiliate (Shopee, TikTok Shop). Bao gồm product card design, category filtering, conversion optimization, mobile-first responsive, accessibility, và analytics tracking. Sử dụng khi implement hoặc cải thiện tính năng shop affiliate, product listing, hoặc e-commerce features.
---

# E-commerce Affiliate Shop - Design & UX

## Khi Nào Sử Dụng Skill Này

Áp dụng skill này khi:
- ✅ Implement tính năng shop affiliate mới
- ✅ Thiết kế product card/layout
- ✅ Cải thiện UX cho shop page
- ✅ Thêm tính năng filtering/sorting
- ✅ Tối ưu conversion rate
- ✅ Implement product detail page
- ✅ Thêm social sharing features

---

## Core Principles

### 1. Trust & Transparency
- ✅ Luôn hiển thị rõ affiliate badge (Shopee, TikTok Shop)
- ✅ Disclose affiliate relationship (theo quy định)
- ✅ Hiển thị giá nếu có (hoặc "Xem giá tại Shopee")
- ✅ Product images chất lượng, không misleading

### 2. Mobile-First Design
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Responsive grid: 1 col mobile → 2 tablet → 3-4 desktop
- ✅ Swipe-friendly category filters
- ✅ Fast loading, lazy load images

### 3. Conversion Optimization
- ✅ Clear CTA buttons ("Xem sản phẩm", "Mua ngay")
- ✅ Multiple click points (image, title, CTA)
- ✅ Social proof (nếu có: reviews, ratings)
- ✅ Share functionality để tăng reach

---

## Product Card Design

### Structure

```html
<article class="shop-card">
  <!-- Image Section -->
  <a href="[affiliate-url]" class="shop-card-link">
    <div class="shop-card-thumb">
      <img src="[product-image]" alt="[product-name]" loading="lazy" />
      <!-- Brand Badge -->
      <span class="shop-card-badge shopee">Shopee</span>
    </div>
    
    <!-- Content Section -->
    <div class="shop-card-body">
      <h3 class="shop-card-name">[Product Name]</h3>
      <p class="shop-card-desc">[Short description]</p>
    </div>
  </a>
  
  <!-- Actions Section -->
  <div class="shop-card-actions">
    <a href="[affiliate-url]" class="shop-card-cta">Xem sản phẩm</a>
    <button class="shop-card-share" aria-label="Chia sẻ">...</button>
  </div>
</article>
```

### Design Guidelines

#### 1. Image
- **Aspect Ratio**: 1:1 (square) cho consistency
- **Size**: Tối thiểu 400x400px, tối ưu 800x800px
- **Format**: WebP với fallback JPG
- **Lazy Loading**: `loading="lazy"` cho images below fold
- **Placeholder**: Hiển thị placeholder khi image lỗi
- **Alt Text**: Mô tả sản phẩm, không keyword stuffing

```html
<img src="product.jpg" 
     alt="Bao lì xì đỏ in chữ vàng năm 2027"
     loading="lazy"
     onerror="this.parentElement.classList.add('has-placeholder')" />
```

#### 2. Brand Badge
- **Position**: Top-left corner của image
- **Colors**: 
  - Shopee: `#ee4d2d` (đỏ Shopee)
  - TikTok Shop: `#000000` (đen TikTok)
- **Size**: Nhỏ, không che sản phẩm
- **Text**: "Shopee" hoặc "TikTok Shop"

```css
.shop-card-badge {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.shop-card-badge.shopee {
  background: #ee4d2d;
}

.shop-card-badge.tiktok {
  background: #000;
}
```

#### 3. Product Name
- **Font Size**: Responsive, clamp(0.9rem, 2vw, 1rem)
- **Line Height**: 1.35
- **Lines**: Tối đa 2 dòng, truncate với ellipsis
- **Weight**: 600 (semi-bold)
- **Color**: Dark text (#333 hoặc --color-text-primary)

```css
.shop-card-name {
  font-size: clamp(0.9rem, 2vw, 1rem);
  font-weight: 600;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.35rem;
}
```

#### 4. Description
- **Length**: Tối đa 2 dòng
- **Font Size**: 0.8rem
- **Color**: Secondary text (#666)
- **Optional**: Chỉ hiển thị nếu có

```css
.shop-card-desc {
  font-size: 0.8rem;
  color: var(--color-text-secondary, #666);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### 5. CTA Button
- **Text**: "Xem sản phẩm", "Mua ngay", hoặc custom `buyText`
- **Size**: Min 48px height (touch-friendly)
- **Color**: Gradient primary → secondary
- **Hover**: Slight scale (1.02)
- **Active**: Scale down (0.98)
- **Full Width**: Trong card actions container

```css
.shop-card-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  min-height: 48px;
  border-radius: 10px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  font-weight: 600;
  font-size: 0.85rem;
  text-decoration: none;
  transition: opacity 0.2s, transform 0.15s;
  flex: 1;
}

.shop-card-cta:hover {
  opacity: 0.95;
  transform: scale(1.02);
}

.shop-card-cta:active {
  transform: scale(0.98);
}
```

#### 6. Share Button
- **Icon**: SVG share icon
- **Size**: 48x48px (touch-friendly)
- **Position**: Bên cạnh CTA button
- **Background**: Light gray, hover darker
- **Functionality**: 
  - Native share API nếu có
  - Fallback: Copy to clipboard
  - Toast notification feedback

```css
.shop-card-share {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  min-width: 48px;
  min-height: 48px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.08);
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}

.shop-card-share:hover {
  background: rgba(0, 0, 0, 0.12);
  transform: scale(1.05);
}
```

### Card Hover Effects

```css
.shop-card {
  transition: box-shadow 0.25s, transform 0.25s;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.shop-card:hover {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}
```

---

## Grid Layout

### Responsive Breakpoints

```css
/* Mobile: 1 column */
.shop-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

/* Small tablet: 2 columns */
@media (min-width: 480px) {
  .shop-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
}

/* Tablet: 3 columns */
@media (min-width: 768px) {
  .shop-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Desktop: 4 columns */
@media (min-width: 1024px) {
  .shop-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Gap & Spacing
- **Gap**: 1.25rem mobile, 1.5rem tablet+
- **Card Padding**: 1rem body, 1.25rem actions bottom
- **Container Padding**: 1rem mobile, 2rem tablet+

---

## Category Filtering

### Design

```html
<div id="shop-categories" class="shop-categories" role="tablist">
  <button class="shop-category-btn active" data-category="other">
    Tất cả
  </button>
  <button class="shop-category-btn" data-category="lixi">
    Bao Lì Xì 🧧
  </button>
  <!-- More categories -->
</div>
```

### UX Guidelines

1. **Active State**: Rõ ràng với background color khác
2. **Mobile Scroll**: Horizontal scroll với `-webkit-overflow-scrolling: touch`
3. **URL Sync**: Update URL với `?category=xxx` để share được
4. **Accessibility**: `role="tablist"`, `aria-label`

```css
.shop-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

@media (max-width: 767px) {
  .shop-categories {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    flex-wrap: nowrap;
  }
  
  .shop-categories::-webkit-scrollbar {
    display: none;
  }
  
  .shop-category-btn {
    flex-shrink: 0;
  }
}

.shop-category-btn {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  border: 2px solid var(--color-primary);
  background: #fff;
  color: var(--color-primary);
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.shop-category-btn.active {
  background: var(--color-primary);
  color: #fff;
}
```

### JavaScript Implementation

```javascript
function updateUrlCategory(category) {
  const base = window.location.pathname;
  const url = category && category !== 'other'
    ? base + '?category=' + encodeURIComponent(category)
    : base;
  window.history.replaceState({ category }, '', url);
}

function getCategoryFromUrl(validCategories) {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category');
  if (category && validCategories.includes(category)) {
    return category;
  }
  return null;
}
```

---

## Loading & Empty States

### Loading State

```html
<div class="shop-loading">
  Đang tải sản phẩm...
</div>
```

```css
.shop-loading {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-text-secondary);
  font-size: 1.1rem;
}
```

### Empty State

```html
<p class="shop-empty">
  Chưa có sản phẩm nào trong danh mục này.
</p>
```

```css
.shop-empty {
  text-align: center;
  padding: 2rem 1rem;
  color: var(--color-text-secondary);
  font-size: 1rem;
}
```

### Error State

```html
<p class="shop-error">
  Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.
</p>
```

```css
.shop-error {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--color-primary);
  font-weight: 600;
}
```

---

## Share Functionality

### Implementation

```javascript
function shareProduct(productUrl, productName) {
  const shareUrl = toAbsoluteUrl(productUrl);
  
  // Track event
  trackShopEvent('share_item', { 
    item_name: productName, 
    item_url: shareUrl 
  });
  
  // Native Share API
  if (navigator.share) {
    navigator.share({
      url: shareUrl,
      title: productName
    }).then(() => {
      showShareFeedback('Đã chia sẻ');
    }).catch((err) => {
      if (err.name !== 'AbortError') {
        copyToClipboard(shareUrl);
        showShareFeedback('Đã copy link');
      }
    });
  } else {
    // Fallback: Copy to clipboard
    copyToClipboard(shareUrl);
    showShareFeedback('Đã copy link');
  }
}
```

### Toast Notification

```css
.shop-share-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%) translateY(1rem);
  padding: 0.6rem 1.25rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.85);
  color: #fff;
  font-size: 0.9rem;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.3s, transform 0.3s;
  pointer-events: none;
}

.shop-share-toast--show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

---

## Analytics Tracking

### Events to Track

```javascript
// Page view
trackShopEvent('open', { 
  page_path: window.location.pathname 
});

// Product click
trackShopEvent('click_item', { 
  item_name: productName,
  item_url: productUrl,
  brand: 'shopee' // or 'tiktok'
});

// Share
trackShopEvent('share_item', { 
  item_name: productName,
  item_url: productUrl 
});

// Category filter
trackShopEvent('filter_category', { 
  category: categoryId 
});
```

### Implementation

```javascript
function trackShopEvent(action, params) {
  if (window.webAnalytics && window.webAnalytics.trackEvent) {
    window.webAnalytics.trackEvent('shop_' + action, params || {});
  }
  
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', 'shop_' + action, params);
  }
}
```

---

## Product Data Structure

### JSON Format

```json
{
  "data": {
    "categories": [
      {
        "category": "other",
        "displayName": "Tất cả"
      },
      {
        "group": "gifts-decor",
        "category": ["lucky-money"],
        "displayName": "Bao Lì Xì 🧧"
      }
    ],
    "products": [
      {
        "id": "unique-id",
        "name": "Bao lì xì đỏ in chữ vàng năm 2027",
        "description": "Bao lì xì đẹp, chất lượng cao",
        "thumbnail": "https://example.com/image.jpg",
        "url": "https://shopee.vn/product-link",
        "category": "lixi",
        "buyText": "Xem sản phẩm"
      }
    ]
  }
}
```

### Required Fields
- `name`: Tên sản phẩm (required)
- `url`: Affiliate link (required)
- `group`: Group ID (required)
- `category`: Ordered array of category IDs (required)
- `thumbnail`: Image URL (optional, có placeholder)
- `description`: Mô tả ngắn (optional)
- `buyText`: Custom CTA text (optional, default: "Xem sản phẩm")

---

## Accessibility

### ARIA Labels

```html
<!-- Category buttons -->
<button class="shop-category-btn" 
        role="tab"
        aria-selected="true"
        aria-controls="shop-grid">
  Tất cả
</button>

<!-- Product card -->
<article class="shop-card">
  <a href="..." 
     aria-label="Xem sản phẩm: [Product Name]">
    ...
  </a>
</article>

<!-- Share button -->
<button class="shop-card-share" 
        aria-label="Chia sẻ sản phẩm">
  ...
</button>
```

### Keyboard Navigation
- ✅ Tab through categories và products
- ✅ Enter/Space để activate buttons
- ✅ Escape để close modals (nếu có)
- ✅ Focus visible với outline

### Screen Reader Support
- ✅ Semantic HTML (`<article>`, `<nav>`)
- ✅ Alt text cho images
- ✅ ARIA labels cho interactive elements
- ✅ Status announcements cho toast notifications

---

## Performance Optimization

### 1. Image Optimization
- ✅ Lazy loading với `loading="lazy"`
- ✅ WebP format với fallback
- ✅ Responsive images với `srcset`
- ✅ Placeholder khi image lỗi

### 2. JavaScript
- ✅ Defer non-critical scripts
- ✅ Load products async
- ✅ Debounce filter/search nếu có

### 3. CSS
- ✅ Critical CSS inline
- ✅ Non-critical CSS deferred
- ✅ Use CSS Grid (native, fast)

### 4. Network
- ✅ Preconnect to affiliate domains
- ✅ Cache product data
- ✅ CDN cho images

```html
<!-- Preconnect to Shopee/TikTok -->
<link rel="preconnect" href="https://shopee.vn">
<link rel="preconnect" href="https://tiktok.com">
```

---

## Affiliate Link Best Practices

### 1. Link Attributes
```html
<a href="[affiliate-url]" 
   target="_blank"
   rel="noopener noreferrer sponsored nofollow"
   class="shop-card-link">
```

- ✅ `target="_blank"`: Mở tab mới
- ✅ `rel="noopener noreferrer"`: bảo vệ tab gốc và quyền riêng tư
- ✅ `rel="sponsored nofollow"`: khai báo rõ liên kết affiliate/trả phí cho công cụ tìm kiếm

### 2. Disclosure
- ✅ Hiển thị rõ "Affiliate" hoặc badge brand
- ✅ Disclosure text ở footer hoặc đầu trang
- ✅ Tuân thủ quy định địa phương về affiliate disclosure

### 3. Tracking
- ✅ UTM parameters cho analytics
- ✅ Track clicks để optimize
- ✅ Monitor conversion rates

```javascript
function addUtmParams(url) {
  const utmParams = new URLSearchParams({
    utm_source: 'saptet',
    utm_medium: 'affiliate',
    utm_campaign: 'shop'
  });
  
  const urlObj = new URL(url);
  utmParams.forEach((value, key) => {
    urlObj.searchParams.append(key, value);
  });
  
  return urlObj.toString();
}
```

---

## Mobile-Specific Considerations

### 1. Touch Targets
- ✅ Min 44x44px cho buttons
- ✅ Adequate spacing giữa clickable elements
- ✅ No hover-only interactions

### 2. Swipe Gestures
- ✅ Category filters: horizontal scroll
- ✅ Product grid: vertical scroll
- ✅ Smooth scrolling với `-webkit-overflow-scrolling: touch`

### 3. Viewport
```html
<meta name="viewport" 
      content="width=device-width, initial-scale=1, shrink-to-fit=no">
```

### 4. Performance
- ✅ Lazy load images
- ✅ Minimize JavaScript
- ✅ Optimize images cho mobile (smaller sizes)

---

## Conversion Optimization Tips

### 1. Clear Value Proposition
- ✅ Hero section với value prop rõ ràng
- ✅ Category names với emoji để dễ nhận biết
- ✅ Trust signals (brand badges)

### 2. Multiple Click Points
- ✅ Image clickable
- ✅ Title clickable
- ✅ CTA button
- ✅ Tất cả link đến cùng affiliate URL

### 3. Social Proof (Nếu có)
- ✅ Ratings/reviews
- ✅ "X người đã mua"
- ✅ Best seller badges

### 4. Urgency (Nếu phù hợp)
- ✅ "Còn X sản phẩm"
- ✅ "Giảm giá đến hết ngày X"
- ✅ Countdown timers

### 5. Related Products
- ✅ "Sản phẩm tương tự"
- ✅ "Người mua cũng mua"
- ✅ Cross-category suggestions

---

## Testing Checklist

Khi implement shop affiliate, test:

- [ ] Product cards hiển thị đúng trên mobile/tablet/desktop
- [ ] Images load và có placeholder khi lỗi
- [ ] Category filtering hoạt động
- [ ] URL sync với category filter
- [ ] Affiliate links mở đúng (new tab)
- [ ] Share functionality hoạt động
- [ ] Analytics tracking đúng events
- [ ] Keyboard navigation hoạt động
- [ ] Screen reader đọc đúng
- [ ] Loading/empty/error states hiển thị
- [ ] Performance: LCP < 2.5s, INP < 200ms
- [ ] Images lazy load đúng
- [ ] Touch targets đủ lớn trên mobile

---

## Example: Complete Product Card Component

```html
<article class="shop-card">
  <a href="https://shopee.vn/product?affiliate=xxx" 
     target="_blank"
     rel="noopener noreferrer sponsored nofollow"
     class="shop-card-link"
     aria-label="Xem sản phẩm: Bao lì xì đỏ in chữ vàng năm 2027"
     onclick="trackShopEvent('click_item', {item_name: 'Bao lì xì đỏ', brand: 'shopee'})">
    
    <div class="shop-card-thumb">
      <img src="bao-li-xi.jpg" 
           alt="Bao lì xì đỏ in chữ vàng năm 2027"
           loading="lazy"
           onerror="this.parentElement.classList.add('has-placeholder')" />
      <span class="shop-card-badge shopee">Shopee</span>
    </div>
    
    <div class="shop-card-body">
      <h3 class="shop-card-name">Bao lì xì đỏ in chữ vàng năm 2027</h3>
      <p class="shop-card-desc">Bao lì xì đẹp, chất lượng cao, phù hợp Tết Nguyên Đán</p>
    </div>
  </a>
  
  <div class="shop-card-actions">
    <a href="https://shopee.vn/product?affiliate=xxx"
       target="_blank"
       rel="noopener noreferrer sponsored nofollow"
       class="shop-card-cta"
       onclick="trackShopEvent('click_item', {item_name: 'Bao lì xì đỏ', brand: 'shopee'})">
      Xem sản phẩm
    </a>
    <button class="shop-card-share"
            aria-label="Chia sẻ sản phẩm"
            onclick="shareProduct('https://shopee.vn/product', 'Bao lì xì đỏ')">
      <svg><!-- Share icon --></svg>
    </button>
  </div>
</article>
```

---

## Resources

- [Shopee Affiliate Program](https://affiliate.shopee.vn/)
- [TikTok Shop Affiliate](https://ads.tiktok.com/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [Web.dev Performance](https://web.dev/performance/)

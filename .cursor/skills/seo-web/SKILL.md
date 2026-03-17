---
name: seo-web
description: Tối ưu SEO cho website Sắp Tết khi implement trang mới hoặc tính năng mới. Bao gồm meta tags, schema markup, Vietnamese SEO, social sharing, performance optimization. Sử dụng khi tạo trang HTML mới, thêm tính năng, hoặc cải thiện SEO cho trang hiện có.
---

# SEO Web - Sắp Tết 2027

## Khi Nào Sử Dụng Skill Này

Áp dụng skill này khi:
- ✅ Tạo trang HTML mới (`*.html`)
- ✅ Thêm tính năng mới vào website
- ✅ Cập nhật nội dung trang hiện có
- ✅ Tối ưu SEO cho trang cụ thể
- ✅ Cải thiện social media sharing

---

## Checklist SEO Cho Trang Mới

Khi tạo trang mới, đảm bảo có đủ các thành phần sau:

### 1. Meta Tags Cơ Bản (Trong `<head>`)

```html
<!-- Required -->
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<title>[Từ khóa chính] | Sắp Tết 2027 - Tết Việt Nam</title>
<meta name="description" content="[Mô tả 150-160 ký tự, bao gồm từ khóa chính]" />
<meta name="keywords" content="[5-10 từ khóa liên quan, phân cách bằng dấu phẩy]" />
<link rel="canonical" href="https://saptet.vn/[url-trang]" />

<!-- SEO Meta -->
<meta name="robots" content="index, follow" />
<meta name="author" content="Sắp Tết - Đếm ngược Tết Nguyên Đán" />
<meta name="language" content="Vietnamese" />
```

**Quy tắc Title:**
- Độ dài: 50-60 ký tự
- Bắt đầu với từ khóa chính
- Bao gồm "Sắp Tết 2027" hoặc "Tết Việt Nam"
- Format: `[Từ khóa chính] | Sắp Tết 2027`

**Quy tắc Description:**
- Độ dài: 150-160 ký tự
- Bao gồm từ khóa chính ở đầu
- Có call-to-action hoặc thông tin hữu ích
- Không trùng lặp giữa các trang

### 2. Open Graph Tags (Facebook/LinkedIn)

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://saptet.vn/[url-trang]" />
<meta property="og:title" content="[Title tối ưu cho social, có thể khác title tag]" />
<meta property="og:description" content="[Description cho social, có thể khác meta description]" />
<meta property="og:image" content="https://saptet.vn/assets/images/img_sharing.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="[Mô tả hình ảnh]" />
<meta property="og:site_name" content="Sắp Tết - Đếm ngược Tết Nguyên Đán" />
<meta property="og:locale" content="vi_VN" />
```

**Lưu ý:**
- `og:image` phải là URL tuyệt đối
- Kích thước khuyến nghị: 1200x630px
- Format: JPG hoặc PNG
- File size: < 1MB

### 3. Twitter Card Tags

```html
<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="https://saptet.vn/[url-trang]" />
<meta property="twitter:title" content="[Title cho Twitter]" />
<meta property="twitter:description" content="[Description cho Twitter]" />
<meta property="twitter:image" content="https://saptet.vn/assets/images/img_sharing.png" />
<meta property="twitter:image:alt" content="[Mô tả hình ảnh]" />
<meta property="twitter:site" content="@sap.tetvn" />
```

### 4. Schema.org Structured Data

Tùy loại trang, thêm schema phù hợp:

#### WebPage Schema (Cho mọi trang)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "[Tên trang]",
  "description": "[Mô tả trang]",
  "url": "https://saptet.vn/[url-trang]",
  "inLanguage": "vi-VN",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Sắp Tết 2027",
    "url": "https://saptet.vn"
  }
}
</script>
```

#### Article Schema (Cho blog/articles)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "[Tiêu đề bài viết]",
  "description": "[Mô tả]",
  "image": "https://saptet.vn/[hinh-anh]",
  "author": {
    "@type": "Organization",
    "name": "Sắp Tết"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Sắp Tết",
    "logo": {
      "@type": "ImageObject",
      "url": "https://saptet.vn/assets/images/img_sharing.png"
    }
  },
  "datePublished": "[YYYY-MM-DD]",
  "dateModified": "[YYYY-MM-DD]",
  "inLanguage": "vi-VN"
}
</script>
```

#### FAQ Schema (Cho trang có FAQ)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "[Câu hỏi]",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "[Câu trả lời]"
    }
  }]
}
</script>
```

#### BreadcrumbList Schema (Cho trang có breadcrumb)
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Trang chủ",
    "item": "https://saptet.vn/"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "[Tên trang hiện tại]",
    "item": "https://saptet.vn/[url-trang]"
  }]
}
</script>
```

### 5. Semantic HTML Structure

```html
<!-- H1: Chỉ có 1 H1, chứa từ khóa chính -->
<h1>[Từ khóa chính] | Sắp Tết 2027</h1>

<!-- H2-H6: Phân cấp rõ ràng, mỗi heading chứa từ khóa liên quan -->
<h2>[Từ khóa phụ 1]</h2>
<h3>[Từ khóa phụ 2]</h3>

<!-- Sử dụng semantic tags -->
<article>...</article>
<section>...</section>
<nav>...</nav>
<header>...</header>
<footer>...</footer>
```

**Quy tắc Heading:**
- Chỉ có 1 H1 trên trang
- H1 phải chứa từ khóa chính
- H2-H6 phân cấp logic, không nhảy cấp
- Mỗi heading có nội dung hữu ích, không chỉ để SEO

### 6. Internal Linking

```html
<!-- Link đến các trang liên quan với anchor text có từ khóa -->
<a href="/mon-an-tet.html">Món ăn Tết truyền thống</a>
<a href="/tro-choi-tet.html">Trò chơi dân gian Tết</a>
<a href="/huong-dan-tet.html">Hướng dẫn đón Tết 2027</a>
```

**Quy tắc Internal Linking:**
- Anchor text chứa từ khóa liên quan
- Link đến trang có liên quan về nội dung
- Không spam link, chỉ link khi có ý nghĩa
- Sử dụng `rel="nofollow"` cho link affiliate/ads

### 7. Images Optimization

```html
<!-- Luôn có alt text mô tả -->
<img src="..." alt="[Mô tả chi tiết hình ảnh, có từ khóa nếu phù hợp]" />

<!-- Lazy loading cho images -->
<img src="..." alt="..." loading="lazy" />

<!-- Responsive images -->
<img src="..." 
     srcset="image-small.jpg 480w, image-large.jpg 1200w"
     sizes="(max-width: 600px) 480px, 1200px"
     alt="..." />
```

**Quy tắc Images:**
- Alt text mô tả nội dung hình ảnh
- Không keyword stuffing trong alt text
- Format: WebP hoặc JPG (tối ưu kích thước)
- File name: sử dụng từ khóa (VD: `mon-an-tet-banh-chung.jpg`)

---

## Từ Khóa Chính Cho Website Sắp Tết

### Primary Keywords (Từ khóa chính)
- Tết 2027
- Tết Nguyên Đán
- Sắp Tết 2027
- Đếm ngược Tết
- Tết Việt Nam
- Tết Việt

### Secondary Keywords (Từ khóa phụ)
- Lịch âm dương
- Món ăn Tết
- Phong tục Tết
- Trò chơi dân gian
- Lịch vạn niên
- Giờ hoàng đạo

### Long-tail Keywords (Từ khóa dài)
- Đếm ngược Tết Nguyên Đán 2027
- Còn bao lâu nữa đến Tết 2027
- Món ăn truyền thống Tết Việt Nam
- Hướng dẫn chuẩn bị Tết Nguyên Đán

**Quy tắc sử dụng từ khóa:**
- Từ khóa chính xuất hiện trong: title, H1, 100 từ đầu tiên
- Từ khóa phụ xuất hiện trong: H2-H3, alt text, internal links
- Tự nhiên, không keyword stuffing
- Tỷ lệ từ khóa: 1-2% tổng số từ

---

## Vietnamese SEO Best Practices

### 1. Tiếng Việt Có Dấu
- ✅ Luôn sử dụng tiếng Việt có dấu trong content
- ✅ Meta tags phải có dấu đầy đủ
- ✅ URL có thể không dấu (slug): `/mon-an-tet.html`

### 2. Từ Khóa Tiếng Việt
- Sử dụng từ khóa người Việt thực sự tìm kiếm
- Ví dụ: "Tết Nguyên Đán" thay vì "Lunar New Year"
- "Đếm ngược Tết" thay vì "Tết countdown"

### 3. Local SEO
```html
<!-- Geo-targeting -->
<meta name="geo.region" content="VN" />
<meta name="geo.placename" content="Vietnam" />
<meta name="geo.position" content="14.0583;108.2772" />
<meta name="ICBM" content="14.0583, 108.2772" />
```

### 4. Language Tags
```html
<html lang="vi">
<meta name="language" content="Vietnamese" />
<meta property="og:locale" content="vi_VN" />
```

---

## Performance SEO

### 1. Page Speed
- ✅ Minify CSS/JS
- ✅ Optimize images (WebP format)
- ✅ Lazy loading images
- ✅ Defer non-critical JS
- ✅ Use CDN for assets

### 2. Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### 3. Mobile-First
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="HandheldFriendly" content="True" />
<meta name="MobileOptimized" content="320" />
```

---

## Social Media SEO

### 1. Facebook Sharing
- Open Graph tags (đã liệt kê ở trên)
- Image size: 1200x630px
- Test với [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)

### 2. Twitter Sharing
- Twitter Card tags (đã liệt kê ở trên)
- Test với [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### 3. LinkedIn Sharing
- Sử dụng Open Graph tags (LinkedIn đọc OG tags)

---

## Technical SEO

### 1. Canonical URLs
```html
<!-- Mỗi trang phải có canonical -->
<link rel="canonical" href="https://saptet.vn/[url-trang]" />
```

### 2. Robots Meta
```html
<!-- Cho trang muốn index -->
<meta name="robots" content="index, follow" />

<!-- Cho trang không muốn index -->
<meta name="robots" content="noindex, nofollow" />
```

### 3. Sitemap
- Cập nhật `sitemap.xml` khi thêm trang mới
- Priority: 1.0 (homepage), 0.9 (trang chính), 0.7 (trang phụ)
- Changefreq: daily (trang động), weekly/monthly (trang tĩnh)

### 4. Robots.txt
- Đảm bảo không block trang mới
- Cho phép crawl assets (CSS, JS, images)

---

## PWA & Mobile SEO

### 1. Web Manifest
```html
<link rel="manifest" href="/site.webmanifest" />
```

### 2. Apple Touch Icon
```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

### 3. Theme Color
```html
<meta name="theme-color" content="#[màu chủ đạo]" />
```

---

## Content SEO Checklist

Khi viết content cho trang mới:

- [ ] Title tag có từ khóa chính, độ dài 50-60 ký tự
- [ ] Meta description có từ khóa, độ dài 150-160 ký tự
- [ ] H1 duy nhất, chứa từ khóa chính
- [ ] H2-H6 phân cấp rõ ràng, có từ khóa liên quan
- [ ] 100 từ đầu tiên chứa từ khóa chính
- [ ] Internal links với anchor text có từ khóa
- [ ] Images có alt text mô tả
- [ ] Content độc đáo, không copy từ nguồn khác
- [ ] Content đủ dài (tối thiểu 300 từ cho trang thông thường)
- [ ] FAQ section nếu phù hợp (với FAQ schema)

---

## Testing & Validation

Sau khi implement, kiểm tra:

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Kiểm tra schema markup

2. **Google Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
   - Kiểm tra mobile optimization

3. **PageSpeed Insights**: https://pagespeed.web.dev/
   - Kiểm tra performance

4. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
   - Kiểm tra Open Graph tags

5. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
   - Kiểm tra Twitter Card

---

## Ví Dụ Thực Tế

### Trang Món Ăn Tết (`mon-an-tet.html`)

```html
<head>
  <title>Món Ăn Tết Truyền Thống Việt Nam 2027 | Sắp Tết 2027</title>
  <meta name="description" content="Khám phá 14 món ăn Tết truyền thống Việt Nam: bánh chưng, thịt kho tàu, nem rán, xôi gấc. Hướng dẫn cách làm và ý nghĩa văn hóa từng món ăn Tết Nguyên Đán." />
  <meta name="keywords" content="món ăn Tết, món ăn Tết truyền thống, bánh chưng, thịt kho tàu, nem rán, xôi gấc, ẩm thực Tết Việt Nam" />
  <link rel="canonical" href="https://saptet.vn/mon-an-tet.html" />
  
  <!-- Open Graph -->
  <meta property="og:title" content="Món Ăn Tết Truyền Thống Việt Nam 2027 | Sắp Tết 2027" />
  <meta property="og:description" content="Khám phá 14 món ăn Tết truyền thống Việt Nam với hướng dẫn chi tiết và ý nghĩa văn hóa." />
  <meta property="og:url" content="https://saptet.vn/mon-an-tet.html" />
  
  <!-- Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Món Ăn Tết Truyền Thống Việt Nam 2027",
    "description": "Khám phá 14 món ăn Tết truyền thống...",
    "image": "https://saptet.vn/assets/images/img_sharing.png"
  }
  </script>
</head>
<body>
  <h1>Món Ăn Tết Truyền Thống Việt Nam 2027</h1>
  <h2>Bánh Chưng - Món Ăn Không Thể Thiếu</h2>
  <p>Bánh chưng là món ăn Tết truyền thống...</p>
  <!-- Internal links -->
  <a href="/huong-dan-tet.html">Hướng dẫn chuẩn bị Tết</a>
</body>
```

---

## Lưu Ý Quan Trọng

1. **Không Keyword Stuffing**: Từ khóa phải xuất hiện tự nhiên
2. **Unique Content**: Mỗi trang phải có nội dung độc đáo
3. **User Experience First**: SEO không được làm giảm UX
4. **Mobile-First**: Tối ưu cho mobile trước
5. **Performance**: Trang phải load nhanh (< 3s)
6. **Accessibility**: Tuân thủ WCAG guidelines

---

## Resources

- [Google Search Central](https://developers.google.com/search)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)

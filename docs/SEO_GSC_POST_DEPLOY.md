# SEO / GSC checklist sau deploy (Phase 1)

## Ngay sau khi deploy lên production

1. **Rich Results Test**  
   URL: https://search.google.com/test/rich-results  
   Kiểm tra: `https://saptet.vn/con-bao-nhieu-ngay-nua-den-tet`  
   Kỳ vọng: **WebPage** + **FAQPage** hợp lệ; **không** có Event (tránh lỗi thiếu `location`).

2. **Google Search Console – URL Inspection**  
   - `https://saptet.vn/con-bao-nhieu-ngay-nua-den-tet` → Request indexing (**một lần**)  
   - `https://saptet.vn/` → Request indexing nếu title/meta vừa đổi  

3. **Sitemap**  
   GSC → Sitemaps → gửi lại `https://saptet.vn/sitemap.xml`

## Theo dõi 14–28 ngày

Search Console → Hiệu suất → Truy vấn → lọc:

`còn bao nhiêu ngày nữa đến tết`

| Chỉ số | Baseline (ước lượng) | Mục tiêu ngắn | Mục tiêu tốt |
|--------|----------------------|---------------|--------------|
| CTR | ~0.43% | 1–1.5% | 2–3% |
| Clicks | 11 / ~2.5k imp | +50% | 2×+ |
| Vị trí TB | (ghi nhận) | ≤8 nếu CTR thấp | ≤5 |

So sánh thêm landing `/con-bao-nhieu-ngay-nua-den-tet` với homepage cho cùng query.

## Lưu ý

- `con-bao-lau-nua-den-tet.html` **không** redirect 301; theo dõi GSC riêng trước khi gộp URL.
- Số ngày trong HTML được cập nhật bởi workflow `seo-daily-update.yml` (00:00 giờ VN).

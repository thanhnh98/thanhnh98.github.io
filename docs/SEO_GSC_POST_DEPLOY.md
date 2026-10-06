# Theo dõi thử nghiệm SEO 30 ngày

Ngày bắt đầu dự kiến: **05/10/2026**. Chỉ điền ngày triển khai thực tế sau khi bản thay đổi đã lên production.

## Mục tiêu và nguyên tắc đánh giá

| Chỉ số | Baseline GSC 28 ngày | Mục tiêu ngày 28 |
| --- | ---: | ---: |
| CTR toàn site | 1,7% | ≥ 2,0% |
| CTR nhóm “còn bao nhiêu ngày…” | 1,4–1,9% | ≥ 2,5% |
| Click chuẩn hóa theo impression | 100% | ≥ 120% |
| Vị trí trung bình | 4,1 | Không giảm quá 0,5 bậc |

Đánh giá CTR ở cùng khoảng vị trí và so sánh theo truy vấn/trang. Không dùng click thô làm kết luận vì nhu cầu Tết tăng theo mùa.

## Mốc ghi nhận

| Mốc | Ngày dự kiến | Click | Impression | CTR | Vị trí TB | Ghi chú |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| Trước triển khai | 05/10/2026 | 8.913 | 524.854 | 1,7% | 4,1 | Cửa sổ 28 ngày |
| Ngày 7 | 12/10/2026 |  |  |  |  | Chỉ phát hiện xu hướng/bất thường |
| Ngày 14 | 19/10/2026 |  |  |  |  | Quyết định giữ hay thử title B |
| Ngày 28 | 02/11/2026 |  |  |  |  | Kết luận thử nghiệm |

Nếu CTR nhóm truy vấn chính không tăng ít nhất 20% ở ngày 14, thử title B: `Đếm Ngược Tết 2027 – Còn Bao Nhiêu Ngày Nữa Đến Tết?`.

## Kiểm tra ngay sau deploy

1. Mở source HTML khi JavaScript bị tắt và xác nhận title, description, H1, câu trả lời hero và WebPage JSON-LD đều có số ngày hiện tại.
2. Dùng Rich Results Test cho trang món ăn có Recipe; xác nhận `image`, `recipeIngredient` và `recipeInstructions` hợp lệ.
3. Dùng URL Inspection cho đúng bốn URL ưu tiên, rồi Request Indexing một lần mỗi URL:
   - `https://saptet.vn/`
   - `https://saptet.vn/con-bao-nhieu-ngay-nua-den-tet/`
   - `https://saptet.vn/tet-2027-la-ngay-nao/`
   - `https://saptet.vn/con-bao-nhieu-ngay-nua-den-giao-thua/`
4. Gửi lại `https://saptet.vn/sitemap.xml`. Không Request Indexing hàng loạt.
5. Sau khi URL live đã trả Recipe schema mới, mới bấm **Validate Fix** trong GSC.
6. Ghi ngày/giờ deploy thực tế vào tài liệu này và dùng cùng bộ lọc GSC ở các mốc 7, 14, 28 ngày.

## Chỉ số kỹ thuật phát hành

- Lighthouse mobile: LCP ≤ 2,5 giây; CLS ≤ 0,1; không có long task đáng kể.
- Kiểm tra chiều rộng 360px, 390px và 430px: hero không nhảy, bộ đếm không tràn, CTA không che nội dung.
- CrUX và báo cáo Core Web Vitals trong GSC chỉ dùng để kết luận lại sau khoảng 28 ngày.

## Giới hạn thử nghiệm

- Không đổi URL hoặc canonical trang chủ trong 14 ngày đầu.
- Không chỉnh title `/lich-van-nien.html` cho đến khi có dữ liệu truy vấn riêng; tránh cạnh tranh với `/lich-am-hom-nay.html`.
- Chưa redirect các trang đếm ngược phụ. Sau ngày 28 mới cân nhắc hợp nhất nếu chúng vẫn không có impression riêng.
- Workflow `seo-daily-update.yml` chịu trách nhiệm cập nhật số ngày trong HTML hằng ngày.

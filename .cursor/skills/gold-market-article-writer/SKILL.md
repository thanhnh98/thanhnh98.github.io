---
name: gold-market-article-writer
description: Analyze Vietnamese gold market data and write high-quality gold-price articles with clear editorial viewpoint and evidence. Use when the user asks for gia vang hom nay, phan tich gia vang, ban tin vang, nhan dinh vang theo tuan, or requests creating/publishing gold market news articles from official sources.
---

# Gold Market Article Writer

## Purpose

Skill này giúp tạo bài viết phân tích giá vàng theo chuẩn biên tập:
- Dễ đọc cho người phổ thông.
- Có chiều sâu dữ liệu cho người theo dõi thị trường.
- Có luận điểm rõ ràng, không chỉ liệt kê số.

Mặc định áp dụng cho thị trường Việt Nam (SJC, vàng nhẫn, doanh nghiệp niêm yết trong nước), có thể mở rộng thêm giá vàng thế giới khi cần bối cảnh.

## Default Mode

- **Tone:** hybrid (dễ đọc + sâu dữ liệu).
- **Data policy:** official-plus (nguồn chính thống + nguồn tổng hợp lớn để đối chiếu).
- **Frequency:** hỗ trợ cả daily và weekly.
- **Output:** hỗ trợ 2 mode:
  1. `article-only`
  2. `publish-to-repo` (update `news.json` + tạo `tin-tuc/<slug>.html`)

## When To Use

Kích hoạt skill khi user yêu cầu:
- "giá vàng hôm nay"
- "phân tích giá vàng"
- "bản tin vàng"
- "nhận định vàng tuần"
- "viết bài article giá vàng"
- "thêm tin tức giá vàng vào website"

## Core Rules

1. **Không bịa dữ liệu**  
   Chỉ dùng số liệu có nguồn. Nếu thiếu dữ liệu, ghi rõ "chưa có xác nhận" thay vì suy đoán.

2. **Ghi mốc thời gian rõ ràng**  
   Mọi số giá phải kèm mốc cập nhật (`HH:mm DD/MM/YYYY`) và đơn vị.

3. **Chuẩn hóa đơn vị**  
   Ưu tiên `triệu đồng/lượng` cho bài viết tiếng Việt. Nếu nguồn là nghìn/chỉ hoặc nghìn/lượng, quy đổi và nêu rõ cách quy đổi.

4. **Có quan điểm biên tập**  
   Mỗi bài cần ít nhất 1 luận điểm chính + 2 luận cứ dữ liệu.

5. **Tách dữ liệu và nhận định**  
   Dùng cấu trúc: "Dữ liệu ghi nhận" vs "Góc nhìn biên tập" để tránh nhập nhằng.

6. **Không nhắc bài khác trong nội dung chính**  
   Chỉ để link ở mục "Nguồn tham khảo".

## Source Priority

### Tier 1 (ưu tiên cao)
- Website bảng giá chính thức của doanh nghiệp niêm yết (DOJI, SJC, PNJ, Phú Quý, Bảo Tín Minh Châu...)
- Nguồn cơ quan quản lý/chính sách (khi liên quan)

### Tier 2 (đối chiếu bối cảnh)
- VietnamPlus, báo kinh tế lớn, hãng tin uy tín

### Source Validation Checklist

Trước khi viết, kiểm tra:
- URL truy cập được.
- Nội dung có timestamp hoặc thông tin cập nhật gần nhất.
- Dữ liệu không mâu thuẫn nghiêm trọng giữa các nguồn.
- Nếu có mâu thuẫn, nêu rõ "khác biệt do thời điểm cập nhật".

## Required Data Inputs

Tối thiểu cần có:
- Giá mua vào / bán ra (ít nhất 1 dòng sản phẩm trọng tâm, ví dụ SJC).
- Mốc cập nhật thời gian.
- Tên nguồn chính.

Khuyến nghị thêm:
- Chênh lệch mua-bán.
- Biến động so với phiên trước.
- Một chỉ báo bối cảnh (thế giới, tỷ giá, tâm lý trú ẩn, chính sách lãi suất).

## Article Types

## 1) Daily Gold Brief

Dùng cho "giá vàng hôm nay".

### Suggested Structure
1. **Lead (2-3 câu):** số nổi bật + điều cần chú ý.
2. **Dữ liệu chính:** bảng/đoạn tóm tắt mua-bán, biên độ, mốc giờ.
3. **Góc nhìn biên tập:** 1 luận điểm chính.
4. **Lưu ý cho người đọc:** 2-3 gạch đầu dòng quản trị rủi ro.
5. **Nguồn tham khảo:** chỉ liệt kê link.

## 2) Weekly Gold Analysis

Dùng cho "nhận định tuần".

### Suggested Structure
1. **Tổng quan tuần:** xu hướng tăng/giảm/đi ngang.
2. **Dữ liệu nổi bật:** high/low, spread, nhịp biến động.
3. **Drivers:** yếu tố chi phối (thế giới, tỷ giá, cung-cầu nội địa).
4. **Góc nhìn tuần tới:** kịch bản cơ sở + kịch bản rủi ro.
5. **Nguồn tham khảo.**

## Editorial View Framework

Mỗi bài bắt buộc có:
- **Claim:** nhận định ngắn, rõ ràng.
- **Evidence A:** số liệu trực tiếp từ nguồn giá.
- **Evidence B:** dữ liệu bối cảnh hoặc đối chiếu nguồn tin uy tín.
- **Risk note:** điều kiện khiến nhận định mất hiệu lực.

Mẫu:
- "Biên mua-bán đang rộng, vì vậy chiến lược lướt sóng cần kỷ luật điểm vào/ra hơn giai đoạn biến động thấp."

## Writing Style

- Ưu tiên câu ngắn, rõ nghĩa.
- Tránh giật tít gây hoảng loạn.
- Không dùng ngôn từ khuyến nghị đầu tư tuyệt đối.
- Dùng cụm trung tính: "ghi nhận", "cho thấy", "hàm ý", "cần lưu ý".

## Output Modes

## Mode A: article-only

Trả về:
1. Title
2. Summary (1 đoạn)
3. Full article body (Markdown hoặc HTML-ready)
4. Source list (URL)

## Mode B: publish-to-repo

Áp dụng cho repo này:
- Update `news.json`
- Tạo `tin-tuc/<slug>.html`
- Giữ tương thích layout/detail page hiện có.

### Publish Checklist
- `id` mới không trùng (`news-XXX`).
- `slug` không trùng.
- `detailPage` khớp đường dẫn file tạo mới.
- `publishedAt` ISO-8601.
- Có section "Nguồn tham khảo".
- Không chèn câu "tham chiếu bài khác" trong nội dung chính.

## Data-to-Text Sanity Checks

Trước khi hoàn tất:
- Kiểm tra số học cơ bản (spread = sell - buy).
- Kiểm tra nhất quán đơn vị.
- Kiểm tra chính tả tên nguồn.
- Kiểm tra timestamp có hợp lý theo ngày viết.

## Safe Language Policy

Không dùng:
- "chắc chắn sẽ tăng/giảm"
- "nên all-in"
- "bảo đảm lợi nhuận"

Dùng thay thế:
- "kịch bản cơ sở"
- "rủi ro cần theo dõi"
- "phù hợp với khẩu vị rủi ro thấp/trung bình/cao"

## Quick Template (Daily)

```markdown
# [Tiêu đề]

[Lead 2-3 câu: mức giá chính, spread, thời điểm cập nhật, ý chính]

## Dữ liệu chính
- Nguồn chính: [...]
- Mốc cập nhật: [...]
- Giá mua vào: [...]
- Giá bán ra: [...]
- Chênh lệch mua-bán: [...]

## Góc nhìn biên tập
[1 đoạn claim + 2 luận cứ dữ liệu]

## Lưu ý khi theo dõi giá vàng
- [...]
- [...]
- [...]

## Nguồn tham khảo
- [Nguồn 1](...)
- [Nguồn 2](...)
```

## Completion Output

Khi hoàn thành, luôn báo:
- Loại bài (daily/weekly)
- Nguồn đã dùng
- Mốc dữ liệu chính
- Nếu publish: file đã cập nhật/tạo mới


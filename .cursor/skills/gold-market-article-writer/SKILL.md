---
name: gold-market-article-writer
description: Analyze Vietnamese gold market data and write gold-price articles grounded in cited sources: same-day listings, verifiable context, and retrospective interpretation only—no editorial price forecasts or scenario speculation. Use when the user asks for gia vang hom nay, phan tich gia vang (data-driven), ban tin vang, tong hop tuan (past week data), or publishing gold market items from official sources.
---

# Gold Market Article Writer

## Purpose

Skill này giúp tạo bài viết về giá vàng theo chuẩn biên tập:
- Dễ đọc cho người phổ thông.
- Có chiều sâu dữ liệu cho người theo dõi thị trường.
- **Chỉ** luận điểm bám số đã có nguồn và diễn giải **đã xảy ra**; không dự báo giá, không kịch bản tương lai, không phán đoán chính sách nếu không trích dẫn rõ nguồn báo chí/cơ quan.

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
- "phân tích giá vàng" (chỉ trên dữ liệu và bối cảnh đã công bố)
- "bản tin vàng"
- "tổng hợp giá vàng tuần" / dữ liệu tuần đã qua (không “nhận định tuần tới” kiểu dự báo)
- "viết bài article giá vàng"
- "thêm tin tức giá vàng vào website"

## Core Rules

1. **Không bịa dữ liệu**  
   Chỉ dùng số liệu có nguồn. Nếu thiếu dữ liệu, ghi rõ "chưa có xác nhận" thay vì suy đoán.

2. **Ghi mốc thời gian rõ ràng**  
   Mọi số giá phải kèm mốc cập nhật (`HH:mm DD/MM/YYYY`) và đơn vị.

3. **Chuẩn hóa đơn vị**  
   Ưu tiên `triệu đồng/lượng` cho bài viết tiếng Việt. Nếu nguồn là nghìn/chỉ hoặc nghìn/lượng, quy đổi và nêu rõ cách quy đổi.

4. **Có góc nhìn biên tập — nhưng không phải dự báo**  
   Mỗi bài cần ít nhất 1 luận điểm chính diễn giải **dữ liệu đã ghi nhận** + 2 luận cứ là số hoặc trích thuật có nguồn.

5. **Tách dữ liệu và diễn giải**  
   Dùng cấu trúc: "Dữ liệu ghi nhận" vs "Góc nhìn biên tập (từ số liệu)" để tránh nhập nhằng với dự báo.

6. **Không nhắc bài khác trong nội dung chính**  
   Chỉ để link ở mục "Nguồn tham khảo".

7. **Không dự báo / không kịch bản giá**  
   Cấm: "kịch bản cơ sở", "triển vọng ngắn hạn" do tự suy, mức giá kỳ vọng phiên sau. Thay bằng: "các mốc tin công khai đáng theo dõi" (lịch họp, thông cáo, bảng niêm yết) không kèm kết luận về giá tương lai.

8. **Kỳ vọng thị trường hay “dự báo Fed”**  
   Chỉ được nêu nếu **trích thuật** báo chí/định chế có tên ("Theo VietnamPlus…", "Theo Reuters…") và không đóng khung như ý kiến riêng của trang.

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
- Một chỉ báo bối cảnh (thế giới, tỷ giá) **đã công bố** trong nguồn.

## Article Types

## 1) Daily Gold Brief

Dùng cho "giá vàng hôm nay".

### Suggested Structure
1. **Lead (2-3 câu):** số nổi bật + điều cần chú ý (từ niêm yết).
2. **Dữ liệu chính:** bảng/đoạn tóm tắt mua-bán, biên độ, mốc giờ.
3. **Góc nhìn biên tập:** 1 luận điểm diễn giải **chỉ** từ dữ liệu và bối cảnh đã trích nguồn.
4. **Lưu ý cho người đọc:** theo dõi bảng giá, mốc cập nhật, chênh lệch mua-bán (không khuyên mua/bán).
5. **Nguồn tham khảo:** chỉ liệt kê link.

## 2) Weekly Gold Wrap (dữ liệu tuần đã qua)

Dùng cho tổng hợp **tuần đã kết thúc** (high/low, spread, nhịp trong tuần).

### Suggested Structure
1. **Tổng quan tuần:** mô tả **đã diễn ra** (tăng/giảm/đi ngang theo số).
2. **Dữ liệu nổi bật:** high/low, spread, nhịp biến động.
3. **Yếu tố bối cảnh đã được nguồn tin nhắc tới** (trích thuật, có link).
4. **Các mốc công khai đáng theo dõi tuần sau** (lịch, báo cáo) — không kèm dự báo giá.
5. **Nguồn tham khảo.**

## Editorial View Framework (không dùng “nhận định tương lai”)

Mỗi bài bắt buộc có:
- **Claim:** một câu diễn giải **trạng thái đã quan sát** từ số (vd. spread rộng, lệch nội địa–thế giới).
- **Evidence A:** số liệu trực tiếp từ nguồn giá.
- **Evidence B:** dữ liệu bối cảnh hoặc trích báo chí có URL.
- **Risk / giới hạn:** điều kiện khiến **diễn giải trên** không còn đúng (vd. doanh nghiệp đổi spread đột ngột) — không viết như dự báo giá.

Mẫu (hợp lệ):
- "Biên mua-bán đang rộng theo bảng niêm yết; điều này làm tăng chi phí vào-ra so với giai đoạn spread hẹp hơn trong cùng nguồn dữ liệu."

## Writing Style

- Ưu tiên câu ngắn, rõ nghĩa.
- Tránh giật tít gây hoảng loạn.
- Không dùng ngôn từ khuyến nghị đầu tư tuyệt đối.
- Dùng cụm trung tính: "ghi nhận", "theo bảng niêm yết", "theo [nguồn] mô tả".

## Output Modes

## Mode A: article-only

Trả về:
1. Title
2. Summary (1 đoạn, không chứa dự báo)
3. Full article body (Markdown hoặc HTML-ready)
4. Source list (URL)

## Mode B: publish-to-repo

Áp dụng cho repo này:
- Update `news.json`
- Tạo `tin-tuc/<slug>.html`
- Giữ tương thích layout/detail page hiện có.
- Tuân thủ thêm `.cursor/skills/news-item-generator/SKILL.md` (đặc biệt mục không dự đoán).

### Publish Checklist
- `id` mới không trùng (`news-XXX`).
- `slug` không trùng.
- `detailPage` khớp đường dẫn file tạo mới.
- `publishedAt` ISO-8601 = **ngày giờ hiện tại lúc tạo bài**; không chỉnh sửa sau khi tạo.
- Có section "Nguồn tham khảo".
- Không chèn câu "tham chiếu bài khác" trong nội dung chính.

## Data-to-Text Sanity Checks

Trước khi hoàn tất:
- Kiểm tra số học cơ bản (spread = sell - buy).
- Kiểm tra nhất quán đơn vị.
- Kiểm tra chính tả tên nguồn.
- Kiểm tra timestamp có hợp lý theo ngày viết.
- Quét bài: không còn câu mang tính dự báo giá / kịch bản tương lai của biên tập.

## Safe Language Policy

Không dùng:
- "chắc chắn sẽ tăng/giảm"
- "nên all-in"
- "bảo đảm lợi nhuận"
- "kịch bản cơ sở / rủi ro tăng / rủi ro giảm" (kiểu dự báo giá)

Dùng thay thế:
- "theo dõi bảng niêm yết và mốc cập nhật"
- "đối chiếu nguồn [tên]"
- "các mốc tin công khai liên quan (không dự báo kết quả)"

## Quick Template (Daily)

```markdown
# [Tiêu đề]

[Lead 2-3 câu: mức giá chính, spread, thời điểm cập nhật, ý chính từ số liệu]

## Dữ liệu chính
- Nguồn chính: [...]
- Mốc cập nhật: [...]
- Giá mua vào: [...]
- Giá bán ra: [...]
- Chênh lệch mua-bán: [...]

## Góc nhìn biên tập (từ dữ liệu)
[1 đoạn claim + 2 luận cứ số/trích nguồn, không dự báo phiên sau]

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
- Loại bài (daily/weekly wrap)
- Nguồn đã dùng
- Mốc dữ liệu chính
- Nếu publish: file đã cập nhật/tạo mới

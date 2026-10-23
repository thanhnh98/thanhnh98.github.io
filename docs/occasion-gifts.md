# Quà theo dịp

`data/occasion-gifts.json` phân loại đủ 42 sự kiện theo `event.id`: 20 `gift`, 7 `prepare`, 15 `none`. Mỗi bộ mua sắm có đúng 10 `productIds` theo thứ tự biên tập. Mã `editorialId` và tên ngắn `occasionName` nằm trong danh mục chung `data/aff/products`. Không dùng `id` gốc để tham chiếu vì nguồn có giá trị trùng.

Khi thay món, cập nhật sản phẩm trong danh mục chung và tham chiếu trong bộ sưu tập. Chỉ chọn liên kết đến sản phẩm trực tiếp có ảnh, phù hợp thời điểm; tránh sản phẩm ghi năm cũ. Chạy `npm run check:occasion-links` để xác nhận shortlink chuyển đến mã sản phẩm Shopee và ảnh còn tải được. Sau khi kiểm tra, cập nhật `lastLinkChecked`. Kiểm tra này không chứng minh giá, biến thể hoặc tồn kho; người mua xác nhận các thông tin đó trên Shopee.

Chạy `npm run generate-events` để tạo lại 42 trang sự kiện từ template, rồi `npm test`. Các trang `none` không có khối quà. Cửa hàng đọc cùng danh mục và ẩn bộ sưu tập nếu thiếu món hoặc dữ liệu tải lỗi. Trước mùa lễ, rà lại tên món, sự phù hợp và link; không thêm giá cố định nếu nguồn chưa có giá tin cậy.

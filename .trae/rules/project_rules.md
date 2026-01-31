Project Rules
=============
The following rules apply to all projects.

## Core Project Guidelines
1. Đây là dự án về Đếm Ngược Tết và Thông tin về Tết.
2. Đảm bảo bố cục và màu chủ đạo của trang web.
3. Khi sửa code phải đảm bảo hiểu code và implement đúng structure nhất có thể
4. Với những component chung có thể tách ra common component để tái sử dụng.
5. Structure phải rõ ràng, chia bố cục theo mô hình dễ maintain.
6. Khi cần sử dụng assets đang không có trong project, đề xuất trước list assets để bổ sung, nếu không có thì có thể tạo place holder theo tên dễ thay thế.
7. Các giá trị Constants sẽ được tổng hợp ở resources.js. Hãy sử dụng file này để lấy các giá trị cần thiết, và lưu khi cần.

## SEO & Technical Guidelines
8. Mọi trang mới phải có meta description, keywords và Open Graph tags phù hợp.
9. Khi tạo trang mới, phải thêm vào sitemap.xml với priority và changefreq phù hợp.
10. Schema Markup (JSON-LD) bắt buộc cho tất cả các trang để cải thiện SEO.
11. Tất cả các trang phải responsive và tối ưu cho mobile-first.
12. Social sharing buttons phải được tích hợp cho các trang nội dung chính.

## App Configuration & Deep Linking
22. Package name phải nhất quán: `com.thanh_nguyen.tet_count_down` cho tất cả platforms
23. App ID cho iOS: `TEAMID.com.thanh_nguyen.tet_count_down` trong apple-app-site-association
24. Deep linking URLs phải được cấu hình trong cả assetlinks.json và apple-app-site-association
25. App store URLs trong resources.js phải khớp với package names thực tế

## File Structure & Organization
13. Components chung được lưu trong thư mục `/components/`
14. CSS được tổ chức theo module trong thư mục `/css/`
15. JavaScript được chia theo chức năng trong thư mục `/js/`
16. Assets (images, fonts, sounds) được tổ chức trong thư mục `/assets/`
17. Blog posts và nội dung động được quản lý trong `/blog.html` và có thể mở rộng

## Performance & Quality
18. Sử dụng WebP cho images khi có thể, fallback PNG/JPG
19. Minify CSS và JS cho production
20. Lazy loading cho images và content không critical
21. Đảm bảo accessibility (alt tags, semantic HTML, keyboard navigation)

## Blog Content Management & Crawling
26. Sử dụng hệ thống crawling tự động để cập nhật nội dung blog từ VNExpress
27. Script crawling phải có error handling và retry logic
28. Backup tự động blog.html trước mỗi lần cập nhật
29. Logging chi tiết cho tất cả hoạt động crawling
30. Phân loại bài viết tự động theo categories (Ẩm Thực, Phong Tục, Văn Hóa, etc.)
31. Giới hạn số lượng bài viết crawl để tránh spam
32. Cron job để tự động cập nhật blog theo lịch trình
33. Demo và test tools để kiểm tra chất lượng crawling
34. Rate limiting để tránh overload server nguồn
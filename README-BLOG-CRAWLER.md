# 🎋 Sắp Tết - Blog Crawler System

Hệ thống tự động crawl và cập nhật nội dung blog từ VNExpress về chủ đề Tết cổ truyền.

## 📋 Tính năng

- ✅ Crawl tự động bài viết từ VNExpress tag "Tết cổ truyền"
- ✅ Phân loại bài viết theo category (Ẩm Thực, Phong Tục, Văn Hóa, etc.)
- ✅ Cập nhật tự động vào `blog.html`
- ✅ Backup tự động trước khi cập nhật
- ✅ Logging chi tiết
- ✅ Hỗ trợ cron job để chạy định kỳ
- ✅ Xử lý lỗi và retry logic

## 🚀 Cài đặt

### 1. Cài đặt dependencies

```bash
# Cài đặt Node.js packages
npm install

# Hoặc sử dụng yarn
yarn install
```

### 2. Kiểm tra cấu trúc thư mục

```
├── crawl-tet-articles.js     # Script crawling chính
├── auto-update-blog.js       # Script tự động hóa
├── package.json              # Dependencies
├── blog.html                 # File blog cần cập nhật
├── logs/                     # Thư mục logs (tự tạo)
├── backups/                  # Thư mục backup (tự tạo)
└── scripts/                  # Thư mục scripts (tự tạo)
```

## 📖 Sử dụng

### Crawl thủ công

```bash
# Chạy crawling một lần
node crawl-tet-articles.js

# Hoặc sử dụng npm script
npm run crawl
```

### Sử dụng Auto Update Tool

```bash
# Cập nhật blog ngay
node auto-update-blog.js update

# Tạo backup
node auto-update-blog.js backup

# Xem logs gần nhất
node auto-update-blog.js logs

# Tạo cron job script
node auto-update-blog.js cron

# Hiển thị help
node auto-update-blog.js help
```

## ⏰ Thiết lập Cron Job

### 1. Tạo cron script

```bash
node auto-update-blog.js cron
```

### 2. Thiết lập crontab

```bash
# Mở crontab editor
crontab -e

# Thêm dòng sau để chạy mỗi ngày lúc 6:00 AM
0 6 * * * /path/to/your/project/scripts/update-blog-cron.sh

# Hoặc chạy mỗi 4 giờ
0 */4 * * * /path/to/your/project/scripts/update-blog-cron.sh
```

### 3. Kiểm tra cron job

```bash
# Xem danh sách cron jobs
crontab -l

# Xem logs cron
tail -f logs/cron.log
```

## 🔧 Cấu hình

### Crawl Configuration (crawl-tet-articles.js)

```javascript
const CONFIG = {
  vnexpressUrl: "https://vnexpress.net/tag/tet-co-truyen-99667",
  maxArticles: 10,
  blogFilePath: path.join(__dirname, "blog.html"),
  categories: {
    "bánh chưng": "Ẩm Thực",
    "mâm ngũ quả": "Phong Tục",
    "lời chúc": "Văn Hóa",
    // ... thêm categories
  }
};
```

### Auto Update Configuration (auto-update-blog.js)

```javascript
const CONFIG = {
  logFile: path.join(__dirname, 'logs', 'blog-update.log'),
  maxLogSize: 1024 * 1024, // 1MB
  backupCount: 5
};
```

## 📊 Monitoring & Logs

### Xem logs

```bash
# Logs gần nhất
node auto-update-blog.js logs

# Hoặc xem trực tiếp
tail -f logs/blog-update.log

# Xem tất cả logs
cat logs/blog-update.log
```

### Cấu trúc log

```
[2024-12-19T10:30:00.000Z] [INFO] === Starting automatic blog update ===
[2024-12-19T10:30:01.000Z] [INFO] Checking internet connection...
[2024-12-19T10:30:02.000Z] [INFO] Internet connection OK
[2024-12-19T10:30:03.000Z] [INFO] Creating backup of current blog file...
[2024-12-19T10:30:04.000Z] [INFO] 🔍 Đang crawl dữ liệu từ: https://vnexpress.net/tag/tet-co-truyen-99667
[2024-12-19T10:30:06.000Z] [INFO] ✅ Đã tìm thấy 8 bài viết
[2024-12-19T10:30:07.000Z] [INFO] 📝 Đang cập nhật blog.html...
[2024-12-19T10:30:08.000Z] [INFO] ✅ Đã cập nhật blog.html thành công!
[2024-12-19T10:30:09.000Z] [INFO] === Blog update completed successfully ===
```

## 🛠️ Troubleshooting

### Lỗi thường gặp

1. **Không crawl được dữ liệu**
   ```bash
   # Kiểm tra kết nối internet
   ping google.com
   
   # Kiểm tra URL VNExpress
   curl -I https://vnexpress.net/tag/tet-co-truyen-99667
   ```

2. **Lỗi permission khi tạo backup**
   ```bash
   # Kiểm tra quyền thư mục
   ls -la backups/
   
   # Tạo thư mục nếu cần
   mkdir -p backups logs scripts
   ```

3. **Cron job không chạy**
   ```bash
   # Kiểm tra cron service
   sudo service cron status
   
   # Kiểm tra logs cron system
   tail -f /var/log/cron
   ```

### Debug mode

```bash
# Chạy với debug
node --inspect crawl-tet-articles.js

# Hoặc với verbose logging
DEBUG=* node crawl-tet-articles.js
```

## 🔄 Backup & Recovery

### Backup tự động
- Mỗi lần cập nhật, file `blog.html` sẽ được backup tự động
- Backup được lưu trong thư mục `backups/` với timestamp
- Hệ thống giữ lại 10 backup gần nhất

### Khôi phục từ backup

```bash
# Xem danh sách backup
ls -la backups/

# Khôi phục từ backup
cp backups/blog-1703001234567.html blog.html
```

## 📈 Performance

### Tối ưu hóa

- **Timeout**: Script có timeout 10s cho mỗi request
- **Rate limiting**: Tránh spam requests đến VNExpress
- **Error handling**: Retry logic cho network errors
- **Memory**: Log rotation để tránh file log quá lớn

### Monitoring

```bash
# Kiểm tra performance
time node crawl-tet-articles.js

# Monitor memory usage
top -p $(pgrep -f "node.*crawl")
```

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - xem file LICENSE để biết thêm chi tiết.

## 🆘 Support

Nếu gặp vấn đề, vui lòng:
1. Kiểm tra logs: `node auto-update-blog.js logs`
2. Tạo issue trên GitHub
3. Liên hệ team qua email

---

**Made with ❤️ by Sắp Tết Team**
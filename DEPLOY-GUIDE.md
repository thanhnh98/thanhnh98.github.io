# 📘 Hướng dẫn Deploy và Update Website trên GitHub Pages

## 🎯 Vấn đề

Khi deploy website lên GitHub Pages, Service Worker có thể cache các file cũ và không tự động update. Người dùng có thể thấy nội dung cũ ngay cả khi bạn đã deploy version mới.

## ✅ Giải pháp

Hệ thống tự động update version đã được thiết lập để giải quyết vấn đề này:

1. **Tự động tạo version mới** mỗi lần deploy
2. **Update Service Worker cache name** để browser nhận ra có version mới
3. **Xóa cache cũ** và cache lại các file mới

## 🚀 Cách sử dụng

### Phương án 1: Deploy thủ công (Đơn giản nhất)

```bash
# 1. Chạy script để update version
npm run update-version

# 2. Commit tất cả thay đổi (bao gồm cả version files)
git add .
git commit -m "feat: your changes description"
git push origin master
```

GitHub Pages sẽ tự động deploy sau khi push.

### Phương án 2: Sử dụng npm script (Tự động hơn)

```bash
# Script này sẽ tự động update version, commit và push
npm run deploy
```

**Lưu ý:** Script này chỉ commit các file version. Bạn vẫn cần commit code changes trước.

### Phương án 3: Tự động với GitHub Actions (Khuyến nghị cho production)

GitHub Actions workflow đã được cấu hình tại `.github/workflows/deploy.yml`. 

**Cách hoạt động:**
- Tự động chạy khi bạn push code lên branch `master`
- Tự động update version
- Tự động commit và deploy

**Cấu hình:**
1. Vào repository settings trên GitHub
2. Tab "Actions" → Enable GitHub Actions (nếu chưa enable)
3. Tab "Pages" → Chọn source là "GitHub Actions" (nếu muốn deploy qua Actions)

## 📋 Checklist trước khi deploy

- [ ] Code đã được test và hoạt động đúng
- [ ] Đã chạy `npm run update-version` (hoặc để GitHub Actions tự động)
- [ ] Đã commit tất cả thay đổi
- [ ] Đã push lên GitHub

## 🔍 Kiểm tra sau khi deploy

1. **Kiểm tra version mới:**
   ```bash
   cat .version
   ```

2. **Kiểm tra Service Worker:**
   - Mở website trên browser
   - F12 → Application → Service Workers
   - Xem cache name có version mới không

3. **Test trên browser:**
   - Hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)
   - Hoặc clear cache và reload

## 🛠️ Troubleshooting

### Service Worker không update

**Nguyên nhân:** Browser đang cache service worker cũ

**Giải pháp:**
1. Mở DevTools (F12)
2. Application → Service Workers
3. Click "Unregister" để xóa service worker cũ
4. Reload trang

### Version không được update

**Kiểm tra:**
```bash
# Xem version hiện tại
cat .version

# Xem CACHE_NAME trong sw.js
grep CACHE_NAME sw.js
```

**Nếu version cũ:**
```bash
# Chạy lại script
npm run update-version

# Kiểm tra lại
cat .version
```

### GitHub Actions không chạy

1. Kiểm tra Actions đã được enable trong repository settings
2. Xem tab "Actions" trên GitHub để xem logs
3. Kiểm tra file `.github/workflows/deploy.yml` có tồn tại không

## 📁 Files quan trọng

- `scripts/update-version.js`: Script tự động update version
- `sw.js`: Service Worker file (sẽ được update version)
- `.version`: File lưu version hiện tại
- `.last_build_id`: File lưu git hash
- `.github/workflows/deploy.yml`: GitHub Actions workflow

## 💡 Best Practices

1. **Luôn chạy update-version trước khi deploy** để đảm bảo browser nhận ra update
2. **Commit version files** (`sw.js`, `.version`, `.last_build_id`) cùng với code changes
3. **Test trên local trước** khi push lên GitHub
4. **Sử dụng GitHub Actions** để tự động hóa quá trình deploy
5. **Kiểm tra sau khi deploy** để đảm bảo version mới đã được áp dụng

## 📞 Hỗ trợ

Nếu gặp vấn đề, kiểm tra:
1. File `scripts/README.md` để xem chi tiết về script
2. Logs trong GitHub Actions (nếu sử dụng)
3. Console trong browser DevTools để xem lỗi Service Worker

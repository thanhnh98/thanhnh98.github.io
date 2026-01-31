# ⚡ Quick Start - Update Version khi Deploy

## 🎯 Mục đích

Đảm bảo website tự động update khi deploy lên GitHub Pages, tránh tình trạng người dùng thấy nội dung cũ do Service Worker cache.

## 🚀 Cách sử dụng nhanh

### Cách 1: Sử dụng deploy.sh (Khuyến nghị - Đơn giản nhất)

```bash
./deploy.sh
```

Script này sẽ tự động:
- ✅ Update version
- ✅ Commit version files
- ✅ Push lên GitHub

### Cách 2: Sử dụng npm script

```bash
npm run update-version
git add .
git commit -m "your commit message"
git push origin master
```

### Cách 3: Chạy thủ công

```bash
# Update version
npm run update-version

# Commit và push
git add sw.js .version .last_build_id
git commit -m "chore: update version"
git push origin master
```

## ✅ Đã được thiết lập

- ✅ **deploy.sh** - Script bash để deploy tự động (khuyến nghị)
- ✅ Script tự động update version (`scripts/update-version.js`)
- ✅ Service Worker được cấu hình để check version mới
- ✅ GitHub Actions workflow để tự động deploy (`.github/workflows/deploy.yml`)
- ✅ NPM scripts trong `package.json`

## 📚 Tài liệu chi tiết

- Xem `DEPLOY-GUIDE.md` để biết chi tiết và troubleshooting
- Xem `scripts/README.md` để hiểu cách script hoạt động

## 💡 Lưu ý

- **Luôn chạy `npm run update-version` trước khi deploy** để đảm bảo browser nhận ra có update mới
- Version files (`.version`, `.last_build_id`) sẽ được tự động commit
- GitHub Pages sẽ tự động deploy sau khi push

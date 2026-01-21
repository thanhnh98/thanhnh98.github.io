# Scripts tự động update version cho GitHub Pages

## Tổng quan

Khi deploy website lên GitHub Pages, Service Worker có thể cache các file cũ và không tự động update. Script này tự động tạo version mới mỗi lần deploy để đảm bảo browser nhận ra có update mới.

## Cách hoạt động

1. **Script `update-version.js`** tự động:
   - Tạo version mới dựa trên timestamp và git commit hash
   - Update `CACHE_NAME` trong `sw.js` với version mới
   - Lưu version vào file `.version` và `.last_build_id`

2. **Service Worker** sẽ:
   - Sử dụng cache name mới → browser nhận ra có update
   - Xóa cache cũ khi activate
   - Cache các file mới với version mới

## Cách sử dụng

### Cách 1: Chạy thủ công trước khi deploy

```bash
# Chạy script để update version
npm run update-version

# Commit và push
git add sw.js .version .last_build_id
git commit -m "chore: update version"
git push origin master
```

### Cách 2: Sử dụng npm script (tự động)

```bash
# Script này sẽ tự động update version, commit và push
npm run deploy
```

### Cách 3: Tự động với GitHub Actions (Khuyến nghị)

GitHub Actions workflow (`.github/workflows/deploy.yml`) sẽ tự động:
- Chạy script update version khi có push vào branch `master`
- Commit và push version mới
- Deploy lên GitHub Pages

**Lưu ý:** Cần enable GitHub Actions trong repository settings và cấu hình GitHub Pages để deploy từ GitHub Actions.

## Cấu trúc version

Version được tạo theo format: `v1.0.{timestamp}-{githash}`

Ví dụ: `v1.0.1703123456789-a1b2c3d`

- `timestamp`: Thời gian deploy (milliseconds)
- `githash`: 7 ký tự đầu của git commit hash

## Files được tạo/cập nhật

- `sw.js`: Update `CACHE_NAME` với version mới
- `.version`: Lưu version hiện tại
- `.last_build_id`: Lưu git hash (để tracking)

## Troubleshooting

### Service Worker không update sau khi deploy

1. Kiểm tra xem script đã chạy thành công chưa:
   ```bash
   npm run update-version
   ```

2. Kiểm tra `sw.js` có `CACHE_NAME` mới không:
   ```bash
   grep CACHE_NAME sw.js
   ```

3. Clear cache trong browser:
   - Chrome: DevTools → Application → Clear storage
   - Hoặc hard refresh: `Ctrl+Shift+R` (Windows) / `Cmd+Shift+R` (Mac)

4. Unregister service worker cũ:
   - DevTools → Application → Service Workers → Unregister

### GitHub Actions không chạy

1. Kiểm tra GitHub Actions đã được enable trong repository settings
2. Kiểm tra file `.github/workflows/deploy.yml` có tồn tại không
3. Xem logs trong tab "Actions" của repository

## Best Practices

1. **Luôn chạy script trước khi deploy** để đảm bảo version được update
2. **Commit version files** (`sw.js`, `.version`, `.last_build_id`) cùng với code changes
3. **Sử dụng GitHub Actions** để tự động hóa quá trình deploy
4. **Test locally** trước khi push lên GitHub

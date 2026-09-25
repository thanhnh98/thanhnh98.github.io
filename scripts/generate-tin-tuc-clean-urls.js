/**
 * GitHub Pages không đọc file _redirects (Netlify/Cloudflare mới dùng).
 * Tạo tin-tuc/<slug>/index.html cho mỗi tin-tuc/<slug>.html để URL không đuôi .html vẫn mở được.
 * Bài đã xoá (data/removed-news.json: slug → đích) được thay bằng stub chuyển hướng ở cả
 * tin-tuc/<slug>.html và tin-tuc/<slug>/index.html, để URL cũ Google còn nhớ không trả 404.
 *
 * Chạy: node scripts/generate-tin-tuc-clean-urls.js
 */
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://saptet.vn';
const TIN_TUC_DIR = path.join(__dirname, '..', 'tin-tuc');
const REMOVED_NEWS_FILE = path.join(__dirname, '..', 'data', 'removed-news.json');

function redirectStub(canonical, target, label) {
  return `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Đang chuyển hướng…</title>
  <link rel="canonical" href="${canonical}" />
  <meta http-equiv="refresh" content="0;url=${target}" />
  <meta name="robots" content="noindex, follow" />
  <script>location.replace(${JSON.stringify(target)});</script>
</head>
<body>
  <p>Đang chuyển đến <a href="${target}">${label}</a>…</p>
</body>
</html>
`;
}

function writeRemovedNewsStubs() {
  const removed = JSON.parse(fs.readFileSync(REMOVED_NEWS_FILE, 'utf8'));
  for (const [slug, target] of Object.entries(removed)) {
    const html = redirectStub(`${SITE_ORIGIN}${target}`, target, 'trang liên quan');
    fs.mkdirSync(path.join(TIN_TUC_DIR, slug), { recursive: true });
    fs.writeFileSync(path.join(TIN_TUC_DIR, `${slug}.html`), html, 'utf8');
    fs.writeFileSync(path.join(TIN_TUC_DIR, slug, 'index.html'), html, 'utf8');
  }
  return new Set(Object.keys(removed));
}

function main() {
  if (!fs.existsSync(TIN_TUC_DIR)) {
    console.error('Missing tin-tuc directory:', TIN_TUC_DIR);
    process.exit(1);
  }

  const removedSlugs = writeRemovedNewsStubs();
  const files = fs
    .readdirSync(TIN_TUC_DIR)
    .filter((name) => name.endsWith('.html') && name !== 'index.html')
    .filter((name) => !removedSlugs.has(name.replace(/\.html$/i, '')));

  let created = 0;
  for (const file of files) {
    const slug = file.replace(/\.html$/i, '');
    const outDir = path.join(TIN_TUC_DIR, slug);
    const outFile = path.join(outDir, 'index.html');

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const canonical = `${SITE_ORIGIN}/tin-tuc/${slug}.html`;
    const relativeTarget = `../${slug}.html`;

    const html = redirectStub(canonical, relativeTarget, 'bài viết');

    fs.writeFileSync(outFile, html, 'utf8');
    created += 1;
  }

  console.log(`generate-tin-tuc-clean-urls: wrote ${created} stub(s) under tin-tuc/<slug>/index.html, ${removedSlugs.size} removed-post redirect(s)`);
}

main();

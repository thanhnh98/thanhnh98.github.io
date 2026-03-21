/**
 * GitHub Pages không đọc file _redirects (Netlify/Cloudflare mới dùng).
 * Tạo tin-tuc/<slug>/index.html cho mỗi tin-tuc/<slug>.html để URL không đuôi .html vẫn mở được.
 *
 * Chạy: node scripts/generate-tin-tuc-clean-urls.js
 */
const fs = require('fs');
const path = require('path');

const SITE_ORIGIN = 'https://saptet.vn';
const TIN_TUC_DIR = path.join(__dirname, '..', 'tin-tuc');

function main() {
  if (!fs.existsSync(TIN_TUC_DIR)) {
    console.error('Missing tin-tuc directory:', TIN_TUC_DIR);
    process.exit(1);
  }

  const files = fs
    .readdirSync(TIN_TUC_DIR)
    .filter((name) => name.endsWith('.html') && name !== 'index.html');

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

    const html = `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Đang chuyển hướng…</title>
  <link rel="canonical" href="${canonical}" />
  <meta http-equiv="refresh" content="0;url=${relativeTarget}" />
  <meta name="robots" content="noindex, follow" />
  <script>location.replace(${JSON.stringify(relativeTarget)});</script>
</head>
<body>
  <p>Đang chuyển đến <a href="${relativeTarget}">bài viết</a>…</p>
</body>
</html>
`;

    fs.writeFileSync(outFile, html, 'utf8');
    created += 1;
  }

  console.log(`generate-tin-tuc-clean-urls: wrote ${created} stub(s) under tin-tuc/<slug>/index.html`);
}

main();

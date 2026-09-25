/**
 * Render ảnh chia sẻ (og:image, 1200×630) cho các trang đếm ngược tiếng Anh.
 * Ảnh không chứa năm/số ngày nên chỉ cần chạy lại khi thêm sự kiện hoặc đổi màu/tên.
 * Chạy: npm run render-holiday-og   (cần Google Chrome và `sips` của macOS; đặt CHROME_PATH nếu Chrome không ở vị trí mặc định)
 */
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'assets/images/og');
const { HOLIDAYS_EN } = require(path.join(ROOT, 'data/holidays-en.js'));
const { HOLIDAYS_AR } = require(path.join(ROOT, 'data/holidays-ar.js'));

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium-browser',
  '/usr/bin/chromium',
].filter(Boolean);

function findChrome() {
  const chrome = CHROME_CANDIDATES.find((candidate) => fs.existsSync(candidate));
  if (!chrome) throw new Error('Google Chrome not found. Set CHROME_PATH.');
  return chrome;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function assetUrl(webPath) {
  return pathToFileURL(path.join(ROOT, webPath.replace(/^\//, ''))).href;
}

function cardHtml({ icon, background, title, subtitle, url, palette, kicker = 'Live countdown', rtl = false }) {
  // Dùng cùng illustration/mark với landing page để ảnh chia sẻ không phụ thuộc emoji hệ thống.
  const display = rtl ? '"Noto Kufi Arabic", sans-serif' : '"Fraunces", Georgia, serif';
  return `<!DOCTYPE html><html${rtl ? ' lang="ar" dir="rtl"' : ''}><head><meta charset="utf-8">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,800&family=Noto+Kufi+Arabic:wght@800&family=Noto+Sans+Arabic:wght@600&display=block">
  <style>
  html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
  body {
    position: relative; display: flex; flex-direction: column; justify-content: center; gap: 26px;
    box-sizing: border-box; padding: 0 96px;
    font-family: ${rtl ? '"Noto Sans Arabic", ' : ''}-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
    color: ${palette.ink}; background: ${palette.paper};
  }
  .background { position: absolute; inset: -18px; width: 1236px; height: 666px; object-fit: cover; filter: blur(4px) saturate(1.08); opacity: .7; }
  .wash { position: absolute; inset: 0; background: ${palette.paper}; opacity: .7; }
  body::after { content: ""; position: absolute; z-index: 1; inset-inline: 96px; bottom: 96px; height: 3px; background: ${palette.ink}; }
  .mark { position: absolute; z-index: 2; inset-inline-end: 96px; top: 50%; width: 190px; height: 190px; transform: translateY(-50%); filter: drop-shadow(0 18px 30px rgba(0,0,0,.16)); }
  .content { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 26px; }
  .kicker { display: flex; align-items: center; gap: 16px; color: ${palette.accent}; font-size: 26px; font-weight: 800; letter-spacing: ${rtl ? '0' : '.16em'}; text-transform: uppercase; }
  .kicker::before { content: ""; width: 44px; height: 3px; background: ${palette.accent}; }
  h1 { max-width: 700px; margin: 0; font-family: ${display}; font-size: ${rtl ? 80 : 100}px; font-weight: 800; line-height: ${rtl ? 1.3 : 0.98}; letter-spacing: ${rtl ? '0' : '-.03em'}; }
  p { max-width: 680px; margin: 0; color: ${palette.ink}; opacity: .78; font-size: 34px; font-weight: 600; }
  .url { position: absolute; ${rtl ? 'right' : 'left'}: 96px; bottom: 44px; direction: ltr; font-size: 24px; font-weight: 700; }
  </style></head><body>
  <img class="background" src="${background}" alt=""><span class="wash"></span>
  <img class="mark" src="${icon}" alt="">
  <div class="content"><span class="kicker">${escapeHtml(kicker)}</span>
  <h1>${escapeHtml(title)}</h1>
  <p>${escapeHtml(subtitle)}</p></div>
  <div class="url">${escapeHtml(url)}</div>
  </body></html>`;
}

function render(chrome, name, html) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'holiday-og-'));
  const htmlPath = path.join(tmp, `${name}.html`);
  const pngPath = path.join(tmp, `${name}.png`);
  const outPath = path.join(OUT_DIR, `${name}.jpg`);
  fs.writeFileSync(htmlPath, html, 'utf8');
  execFileSync(chrome, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--window-size=1200,630', '--virtual-time-budget=8000', `--screenshot=${pngPath}`, `file://${htmlPath}`,
  ], { stdio: 'ignore' });
  // PNG ~500 KB → JPEG ~60 KB. `sips` có sẵn trên macOS.
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', pngPath, '--out', outPath], { stdio: 'ignore' });
  fs.rmSync(tmp, { recursive: true, force: true });
  if (!fs.existsSync(outPath)) throw new Error(`Failed to render ${outPath}`);
  return outPath;
}

function main() {
  const chrome = findChrome();
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const holiday of HOLIDAYS_EN) {
    render(chrome, holiday.slug, cardHtml({
      icon: assetUrl(holiday.visual.icon),
      background: assetUrl(holiday.visual.background),
      title: `${holiday.name} Countdown`,
      subtitle: `How many days until ${holiday.name}?`,
      url: `saptet.vn/${holiday.slug}`,
      palette: holiday.palette,
    }));
  }
  render(chrome, 'countdowns', cardHtml({
    icon: assetUrl('/assets/images/ic_app.png'),
    background: assetUrl('/assets/images/holiday-countdowns/countdowns-hero.webp'),
    title: 'Holiday Countdowns',
    subtitle: 'Christmas, Ramadan, Diwali, Lunar New Year and more',
    url: 'saptet.vn/countdowns',
    palette: { paper: '#f0ede6', ink: '#1c1c24', accent: '#c2410c' },
  }));
  const arabic = Object.entries(HOLIDAYS_AR);
  for (const [slug, ar] of arabic) {
    const holiday = HOLIDAYS_EN.find((item) => item.slug === slug);
    render(chrome, `ar-${slug}`, cardHtml({
      icon: assetUrl(holiday.visual.icon),
      background: assetUrl(holiday.visual.background),
      title: ar.ogTitle,
      subtitle: ar.ogSubtitle,
      url: `saptet.vn/ar/${slug}`,
      palette: holiday.palette,
      kicker: 'عد تنازلي مباشر',
      rtl: true,
    }));
  }
  console.log(`render-holiday-og: wrote ${HOLIDAYS_EN.length + 1 + arabic.length} images to assets/images/og/`);
}

main();

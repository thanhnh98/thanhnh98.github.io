const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('countdown intent page uses restrained static visual design', () => {
  const html = read('con-bao-nhieu-ngay-nua-den-tet/index.html');
  const css = read('css/countdown-intent.css');

  assert.match(html, /class="intent-hero-shell"/);
  assert.match(html, /class="intent-countdown-panel"/);
  assert.match(html, /id="seconds-display"/);
  assert.match(html, /class="intent-quick-grid"/);
  assert.match(html, /<a class="intent-quick-card" href="\/lich-van-nien\.html">/);
  assert.match(html, /href="\/loi-chuc-tet\.html"/);
  assert.match(html, /class="intent-tet-info-card"/);
  assert.match(html, /countdown-intent\.css/);
  assert.match(css, /--intent-cream/);
  assert.match(css, /--intent-peach/);
  assert.match(css, /radial-gradient\(circle at 12% 8%/);
  assert.doesNotMatch(css, /countdown-panel-bg\.png/);
  assert.doesNotMatch(css, /countdown-page-corners\.png/);
  assert.doesNotMatch(css, /url\(['"]?\/assets\/images\/countdown/);
  assert.match(html, /class="intent-countdown-timer"/);
  assert.match(html, /class="intent-breakdown"/);
  assert.match(html, /id="months-display"/);
  assert.match(html, /id="weeks-display"/);
  assert.match(html, /id="total-hours-display"/);
  assert.match(html, /class="intent-page-deco"/);
  assert.doesNotMatch(html, /intentGradient/);
  assert.doesNotMatch(html, /animation:\s*intentGradient/);
  assert.doesNotMatch(html, /background-size:\s*200% 200%/);
});

test('countdown intent page keeps SEO copy evergreen and single-purpose', () => {
  const html = read('con-bao-nhieu-ngay-nua-den-tet/index.html');

  assert.match(html, /<title>Còn Bao Nhiêu Ngày Nữa Đến Tết 2027\? \| Sắp Tết<\/title>/);
  assert.doesNotMatch(html, /<meta name="description"[^>]+Hôm nay còn \d+ ngày/);
  assert.match(html, /data-seo="live-days-answer"/);
  assert.match(html, /data-seo="faq-days-answer"/);
  assert.match(html, /Chia sẻ countdown/);
});

test('header brand is not an extra page h1', () => {
  const header = read('components/header.html');
  const css = read('css/style.css');

  assert.doesNotMatch(header, /<h1><a href="\/"/);
  assert.match(header, /class="brand-title"/);
  assert.match(css, /\.brand-title a/);
});

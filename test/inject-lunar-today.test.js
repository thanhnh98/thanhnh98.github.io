const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { injectLunarToday, updateLunarSitemapLastmod } = require('../scripts/inject-lunar-today.js');
const { DISCLAIMER_TEXT } = require('../js/lunar-almanac.js');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'lich-am-hom-nay.html'), 'utf8');
const FIXED_DATE = new Date(2026, 8, 19); // Thứ Bảy, 9/8 âm lịch, ngày Bính Thân

test('injects today summary between the markers and keeps the markers', () => {
  const out = injectLunarToday(page, FIXED_DATE);
  const block = out.match(/<!-- LUNAR_TODAY:START -->([\s\S]*?)<!-- LUNAR_TODAY:END -->/);
  assert.ok(block, 'markers survive');
  assert.match(block[1], /id="lunar-today-summary"/);
  assert.match(block[1], /Thứ Bảy 19\/9\/2026/);
  assert.match(block[1], /9 tháng Tám/);
  assert.match(block[1], /Bính Thân/);
});

test('pre-renders bloc, details and FAQ text for the given date', () => {
  const out = injectLunarToday(page, FIXED_DATE);
  assert.match(out, /id="bloc-solar-weekday">Thứ Bảy</);
  assert.match(out, /id="bloc-solar-day">19</);
  assert.match(out, /id="bloc-lunar-month">Tháng Tám Âm Lịch</);
  assert.match(out, /id="bloc-canchi">Ngày Bính Thân</);
  assert.match(out, /id="month-title-display">Tháng 9 năm 2026</);
  assert.match(out, /id="detail-gio-hoangdao">Tý \(23h-1h\), Sửu \(1h-3h\), Thìn \(7h-9h\), Tỵ \(9h-11h\), Mùi \(13h-15h\), Tuất \(19h-21h\)</);
  assert.match(out, /id="detail-truc">Trực Bế</);
  assert.match(out, /id="detail-sao">Sao Bạch Hổ \(Hắc Đạo\)</);
  assert.match(out, /id="day-status-badge">Hắc Đạo</);
  assert.match(out, /class="details-badge-bad" id="day-status-badge"/);
  assert.match(out, /id="faq-hours-text">Tý, Sửu, Thìn, Tỵ, Mùi, Tuất</);
});

test('pre-renders title, meta description and FAQ JSON-LD with the disclaimer', () => {
  const out = injectLunarToday(page, FIXED_DATE);
  const title = out.match(/<title>([^<]*)<\/title>/)[1];
  assert.equal(title, 'Lịch âm hôm nay 19/9/2026 | Ngày âm, giờ tốt');
  const meta = out.match(/<meta name="description" content="([^"]*)">/)[1];
  assert.match(meta, /19\/9\/2026/);
  assert.match(meta, /ngày 9 tháng Tám năm Bính Ngọ/);
  assert.ok([...meta].length >= 130 && [...meta].length <= 160);
  const faq = out.match(/<script type="application\/ld\+json" id="faq-schema">([\s\S]*?)<\/script>/)[1];
  const parsed = JSON.parse(faq);
  assert.equal(parsed.mainEntity.length, 3);
  assert.match(parsed.mainEntity[0].acceptedAnswer.text, /19\/9\/2026/);
  assert.ok(parsed.mainEntity[2].acceptedAnswer.text.includes(DISCLAIMER_TEXT));
});

test('is idempotent: running twice yields the same output', () => {
  const once = injectLunarToday(page, FIXED_DATE);
  const twice = injectLunarToday(once, FIXED_DATE);
  assert.equal(twice, once);
});

test('a later run replaces the previous day cleanly', () => {
  const first = injectLunarToday(page, FIXED_DATE);
  const second = injectLunarToday(first, new Date(2026, 8, 20));
  assert.match(second, /id="bloc-solar-day">20</);
  assert.doesNotMatch(second, /id="bloc-solar-day">19</);
  assert.equal((second.match(/<!-- LUNAR_TODAY:START -->/g) || []).length, 1);
});

test('sitemap keeps the clean URL and updates its lastmod with the Vietnam date', () => {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const updated = updateLunarSitemapLastmod(sitemap, FIXED_DATE);
  assert.match(updated, /<loc>https:\/\/saptet\.vn\/lich-am-hom-nay<\/loc>\s*<lastmod>2026-09-19<\/lastmod>/);
  assert.doesNotMatch(updated, /<loc>https:\/\/saptet\.vn\/lich-am-hom-nay\.html<\/loc>/);
});

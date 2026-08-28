const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const indexPage = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');
const shopScript = fs.readFileSync(path.resolve(__dirname, '..', 'js', 'home-shop-preview.js'), 'utf8');
const homeCss = fs.readFileSync(path.resolve(__dirname, '..', 'css', 'home-retention.css'), 'utf8');

test('shopping carousel sits directly after the daily retention section', () => {
  const today = indexPage.indexOf('id="hom-nay"');
  const shop = indexPage.indexOf('id="kham-pha"');
  const quickLinks = indexPage.indexOf('id="tien-ich"');
  assert.ok(today !== -1 && shop > today && quickLinks > shop);
  assert.doesNotMatch(indexPage.slice(today, shop), /<section id=/);
});

test('shopping section exposes filters, manual controls and a full-shop chip', () => {
  assert.equal((indexPage.match(/data-home-shop-category=/g) || []).length, 4);
  assert.match(indexPage, /data-home-shop-category="all"[^>]+aria-pressed="true"/);
  assert.match(indexPage, /class="home-shop-more-chip" href="\/cua-hang\.html"/);
  assert.match(indexPage, /data-home-shop-prev/);
  assert.match(indexPage, /data-home-shop-next/);
  assert.match(indexPage, /id="home-shop-slider"[^>]+tabindex="0"/);
});

test('shopping carousel autoplays every five seconds and remains manually scrollable', () => {
  assert.match(shopScript, /AUTOPLAY_DELAY = 5000/);
  assert.match(shopScript, /window\.setInterval\(function \(\) \{ moveCarousel\(1\); \}, AUTOPLAY_DELAY\)/);
  assert.match(shopScript, /slider\.scrollTo\(\{ left: next, behavior: 'smooth' \}\)/);
  assert.match(shopScript, /itemsPerPage = Math\.max\(1, Math\.floor\(\(slider\.clientWidth \+ gap\) \/ itemStep\)\)/);
  assert.match(shopScript, /return itemStep \* itemsPerPage/);
  assert.match(shopScript, /pointermove/);
  assert.match(shopScript, /touchstart/);
  assert.match(shopScript, /event\.key !== 'ArrowLeft'/);
});

test('Tet quick links use vector icons instead of emoji', () => {
  const quickSection = indexPage.slice(indexPage.indexOf('id="tien-ich"'), indexPage.indexOf('id="app-intro"'));
  assert.equal((quickSection.match(/class="home-quick-icon"><i data-lucide=/g) || []).length, 4);
  assert.doesNotMatch(quickSection, /📅|💌|🧧|🎮/);
});

test('daily retention cards have distinct functional color identities', () => {
  assert.match(homeCss, /\.home-date-card \{ --today-accent: #1d4ed8;/);
  assert.match(homeCss, /\.home-event-card \{ --today-accent: #c2410c;/);
  assert.match(homeCss, /\.home-daily-card \{ --today-accent: #15803d;/);
});

test('daily retention items use the full card as their interaction area', () => {
  assert.match(indexPage, /<a class="home-tet-card home-date-card" href="\/lich-am-hom-nay\.html"/);
  assert.match(indexPage, /id="today-nearest-event-link" class="home-tet-card home-event-card"/);
  assert.match(indexPage, /id="home-daily-card"[^>]+data-home-card-action="#daily-action"/);
});

test('homepage app entry points opt into platform-aware routing', () => {
  assert.equal((indexPage.match(/data-home-smart-app(?:\s|>)/g) || []).length, 2);
  assert.match(indexPage, /data-home-smart-app-source="floating"/);
  assert.match(indexPage, /data-home-smart-app-source="footer"/);
});

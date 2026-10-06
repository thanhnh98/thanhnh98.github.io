const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { DISCLAIMER_TEXT } = require('../js/lunar-almanac.js');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'lich-am-hom-nay.html'), 'utf8');
const pageScript = fs.readFileSync(path.join(root, 'js', 'lich-am-hom-nay.js'), 'utf8');

const FORBIDDEN_CLAIMS = /chính xác nhất|nhanh nhất|may mắn nhất|đem lại may mắn|mang lại (nhiều )?may mắn|rước tài lộc|tránh rủi ro tai ương/i;

test('page loads the shared almanac module and its own DOM script instead of inline tables', () => {
  assert.match(page, /<script src="js\/lunar-almanac\.js\?v=\d{8}"><\/script>/);
  assert.match(page, /<script src="js\/lich-am-hom-nay\.js\?v=\d{8}"><\/script>/);
  assert.doesNotMatch(page, /AUSPICIOUS_HOURS/);
  assert.doesNotMatch(page, /const ACTIVITIES/);
  assert.doesNotMatch(page, /function getNapAm/);
});

test('DOM script derives everything from getAlmanac and never from the weekday', () => {
  assert.match(pageScript, /window\.LunarAlmanac/);
  assert.match(pageScript, /\.getAlmanac\(/);
  assert.doesNotMatch(pageScript, /(HOURS|hours)[^\n]*getDay\(\)/i);
  assert.doesNotMatch(pageScript, /AUSPICIOUS_HOURS/);
});

test('disclaimer uses the shared text and sits before the details grid', () => {
  const disclaimerIndex = page.indexOf(DISCLAIMER_TEXT);
  const gridIndex = page.indexOf('class="details-grid"');
  assert.ok(disclaimerIndex > -1, 'shared disclaimer text present');
  assert.ok(gridIndex > -1);
  assert.ok(disclaimerIndex < gridIndex, 'disclaimer comes before details grid');
  assert.match(page, /class="disclaimer-box"/);
});

test('FAQ section repeats a short disclaimer line', () => {
  const faq = page.match(/<div class="faq-accordion">[\s\S]*?<\/article>/)?.[0] || '';
  const beforeFaq = page.slice(0, page.indexOf('<div class="faq-accordion">'));
  assert.match(beforeFaq.slice(-1500) + faq, /tham khảo/);
});

test('head metadata and structured data make no accuracy or luck claims', () => {
  const head = page.slice(0, page.indexOf('</head>'));
  assert.doesNotMatch(head, FORBIDDEN_CLAIMS);
  const jsonLdBlocks = [...head.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  assert.ok(jsonLdBlocks.length >= 3);
  for (const block of jsonLdBlocks) {
    assert.doesNotThrow(() => JSON.parse(block[1]));
  }
});

test('visible copy and runtime strings make no accuracy or luck claims', () => {
  const body = page.slice(page.indexOf('<body'));
  assert.doesNotMatch(body, FORBIDDEN_CLAIMS);
  assert.doesNotMatch(pageScript, FORBIDDEN_CLAIMS);
});

test('runtime meta description and FAQ schema carry the disclaimer', () => {
  assert.match(pageScript, /DISCLAIMER_TEXT/);
});

test('page has a two-way solar/lunar converter', () => {
  assert.match(page, /id="convert-solar-form"/);
  assert.match(page, /id="convert-lunar-form"/);
  assert.match(page, /id="convert-lunar-leap"/);
  assert.match(pageScript, /lunarToSolar\(/);
});

test('page renders truc and star details', () => {
  assert.match(page, /id="detail-truc"/);
  assert.match(page, /id="detail-sao"/);
});

test('page offers keep actions: app download and share', () => {
  assert.match(page, /id="lunar-keep-app"/);
  assert.match(page, /id="lunar-keep-share"/);
  assert.match(page, /<script src="js\/resources\.js[^"]*"><\/script>/);
  assert.match(page, /<script src="js\/pwa-install\.js[^"]*"><\/script>/);
  assert.match(pageScript, /lunar_keep_action/);
});

test('page carries idempotent markers for the daily pre-render', () => {
  assert.match(page, /<!-- LUNAR_TODAY:START -->/);
  assert.match(page, /<!-- LUNAR_TODAY:END -->/);
});

test('month picker lives in the left column next to the bloc so selection binds to the details beside it', () => {
  const blocContainer = page.match(/<div class="bloc-container">[\s\S]*?<!-- Right: /)?.[0] || '';
  assert.match(blocContainer, /id="calendar-grid"/);
  assert.match(blocContainer, /id="prev-month-btn"/);
  assert.match(blocContainer, /id="toggle-calendar-btn"/);
  const afterWrapper = page.slice(page.indexOf('<!-- Đổi ngày âm dương -->'));
  assert.doesNotMatch(afterWrapper, /id="calendar-grid"/);
});

test('hero is compact: no long subtitle paragraph, summary stays', () => {
  const hero = page.match(/<section class="licham-hero[^"]*">[\s\S]*?<\/section>/)?.[0] || '';
  assert.match(hero, /licham-hero--compact/);
  assert.doesNotMatch(hero, /class="subtitle"/);
  assert.match(hero, /id="lunar-today-summary"/);
});

test('keep actions are compact pills', () => {
  assert.match(page, /class="keep-actions keep-actions--compact"/);
  assert.match(page, /\.keep-btn \{[^}]*white-space:\s*nowrap/);
});

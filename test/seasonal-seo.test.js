const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { buildNoelSeoPayload, injectNoelSeo } = require('../scripts/inject-seasonal-seo-snippets');
const { teacherCountdownAnswer } = require('../scripts/generate-event-pages');

const root = path.resolve(__dirname, '..');

test('Noel answer follows the Vietnam calendar and rolls to next year on 26 December', () => {
  assert.match(buildNoelSeoPayload(new Date('2026-12-24T17:00:00Z')).answer, /Hôm nay là Noel 2026/);
  const next = buildNoelSeoPayload(new Date('2026-12-25T17:00:00Z'));
  assert.equal(next.year, 2027);
  assert.match(next.answer, /Noel 2027/);
  const original = fs.readFileSync(path.join(root, 'noel.html'), 'utf8');
  const updated = injectNoelSeo(original, next);
  assert.match(updated, /<title>Còn Bao Nhiêu Ngày Nữa Đến Noel 2027\?/);
  assert.equal(injectNoelSeo(updated, next), updated);
});

test('20 November direct answer names the date and remaining calendar days', () => {
  const answer = teacherCountdownAnswer({ year: 2026, dateKey: '2026-11-20', daysUntil: 28 });
  assert.match(answer, /28 ngày/);
  assert.match(answer, /20\/11\/2026/);
  const page = fs.readFileSync(path.join(root, 'su-kien/nha-giao-viet-nam/index.html'), 'utf8');
  assert.match(page, /<h1>Còn bao nhiêu ngày nữa đến 20\/11\/2026\?<\/h1>/);
  assert.match(page, /data-event-answer data-date="2026-11-20"/);
});

test('Noel has one canonical sitemap URL and reciprocal language links', () => {
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const noel = fs.readFileSync(path.join(root, 'noel.html'), 'utf8');
  const christmas = fs.readFileSync(path.join(root, 'christmas.html'), 'utf8');
  assert.equal((sitemap.match(/<loc>https:\/\/saptet\.vn\/noel\.html<\/loc>/g) || []).length, 1);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/saptet\.vn\/christmas\?lang=vi<\/loc>/);
  assert.match(noel, /hreflang="en" href="https:\/\/saptet\.vn\/christmas"/);
  assert.match(christmas, /hreflang="vi" href="https:\/\/saptet\.vn\/noel\.html"/);
});

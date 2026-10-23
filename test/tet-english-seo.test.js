const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { render } = require('../scripts/inject-tet-english-seo');

const root = path.resolve(__dirname, '..');
const page = fs.readFileSync(path.join(root, 'when-is-tet-in-vietnam/index.html'), 'utf8');

test('English Tet page directly answers the search query and is reciprocal with Vietnamese', () => {
  const vi = fs.readFileSync(path.join(root, 'tet-2027-la-ngay-nao/index.html'), 'utf8');
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  assert.match(page, /<html lang="en">/);
  assert.match(page, /<h1 id="intent-title">When is Tet in Vietnam\?<\/h1>/);
  assert.match(page, /February 6, 2027/);
  assert.match(page, /February 5, 2027 \(29 Tet\)/);
  assert.match(page, /data-target="2027-02-06T00:00:00\+07:00"/);
  assert.match(page, /hreflang="vi" href="https:\/\/saptet\.vn\/tet-2027-la-ngay-nao\/"/);
  assert.match(vi, /hreflang="en" href="https:\/\/saptet\.vn\/when-is-tet-in-vietnam\/"/);
  assert.equal((sitemap.match(/<loc>https:\/\/saptet\.vn\/when-is-tet-in-vietnam\/<\/loc>/g) || []).length, 1);
});

test('crawlable English answer uses Vietnam calendar days and rolls over at midnight', () => {
  const before = render(page, new Date('2027-02-05T16:59:59Z'));
  assert.match(before, /1 calendar day until Tet 2027/);
  assert.match(before, /2027-02-06T00:00:00\+07:00/);
  const after = render(page, new Date('2027-02-05T17:00:00Z'));
  assert.match(after, /When Is Tet in Vietnam\? 2028 Date & Countdown/);
  assert.match(after, /2028-01-26T00:00:00\+07:00/);
  assert.match(after, /<summary id="tet-en-faq-date">When is Tet in Vietnam in 2028\?<\/summary>/);
  assert.match(after, /<summary id="tet-en-faq-eve">When is Vietnamese New Year's Eve in 2028\?<\/summary>/);
  assert.match(after, /"name":"When is Vietnamese New Year's Eve in 2028\?"/);
  assert.equal(render(after, new Date('2027-02-05T17:00:00Z')), after);
});

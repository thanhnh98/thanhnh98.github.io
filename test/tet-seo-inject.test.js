const assert = require('node:assert/strict');
const test = require('node:test');
const {
  TET_2027,
  GIAO_THUA_2027,
  GIAO_THUA_INSTANT_2027,
  buildTetSeoPayload,
  calendarDaysUntil,
  daysUntil,
} = require('../scripts/lib/tet-seo-dates');
const fs = require('node:fs');
const path = require('node:path');
const { TARGETS, injectTetSeo, updateHomepageSitemapLastmod } = require('../scripts/inject-tet-seo-snippets');
const { forDateKey: quoteForDateKey, forId: quoteForId, idForDateKey: quoteIdForDateKey } = require('../js/home-daily-quote');

const root = path.resolve(__dirname, '..');

test('daysUntil uses ceiling to next calendar milestone in VN context', () => {
  const vnMorning = new Date('2027-02-05T10:00:00+07:00');
  assert.equal(daysUntil(TET_2027, vnMorning), 1);
});

test('giao thua is one day before tet in day count', () => {
  const ref = new Date('2026-05-19T12:00:00+07:00');
  const toTet = daysUntil(TET_2027, ref);
  const toGiaoThua = daysUntil(GIAO_THUA_2027, ref);
  assert.equal(toTet - toGiaoThua, 1);
});

test('2027 giao thua is the night of 29 Tet and ends at midnight on 6 February', () => {
  assert.equal(GIAO_THUA_INSTANT_2027.getTime(), TET_2027.getTime());
  assert.equal(calendarDaysUntil('2027-02-05', new Date('2027-02-04T23:00:00+07:00')), 1);
  assert.equal(calendarDaysUntil('2027-02-05', new Date('2027-02-05T23:00:00+07:00')), 0);
  assert.equal(calendarDaysUntil('2027-02-05', new Date('2027-02-06T00:01:00+07:00')), 0);
  const payload = buildTetSeoPayload(new Date('2027-02-04T23:00:00+07:00'));
  assert.match(payload.faq.giaoThuaAnswer, /đêm 29 Tết, ngày 05\/02\/2027/);
  assert.match(payload.metaDescriptionGiaoThua, /29 Tết/);
  assert.doesNotMatch(fs.readFileSync(path.join(root, 'con-bao-nhieu-ngay-nua-den-tet/index.html'), 'utf8'), /đêm 30 Tết/);
  assert.match(fs.readFileSync(path.join(root, 'con-bao-nhieu-ngay-nua-den-giao-thua/index.html'), 'utf8'), /data-target="2027-02-06T00:00:00\+07:00"/);
});

test('buildTetSeoPayload keeps landing SEO copy evergreen', () => {
  const ref = new Date('2026-12-01T00:00:00+07:00');
  const payload = buildTetSeoPayload(ref);
  assert.ok(payload.daysUntilTet > 0);
  assert.doesNotMatch(payload.metaDescriptionLanding, /Hôm nay còn \d+ ngày/);
  assert.doesNotMatch(payload.faq.daysUntilTetAnswer, /hôm nay còn \d+ ngày/);
  assert.match(payload.snippetParagraph, /Tết Nguyên Đán 2027/);
  assert.equal(payload.tetWeekday, 'Thứ Bảy');
});

test('calendar day count follows the Vietnam date, not the runner timezone', () => {
  // 23:30 VN on 25/09 is still 25/09 in Vietnam (16:30 UTC).
  assert.equal(calendarDaysUntil('2027-02-06', new Date('2026-09-25T16:30:00Z')), 134);
  // 00:30 VN on 26/09 is 17:30 UTC on 25/09.
  assert.equal(calendarDaysUntil('2027-02-06', new Date('2026-09-25T17:30:00Z')), 133);
});

test('meta descriptions carry the day count and fit in 160 characters', () => {
  const payload = buildTetSeoPayload(new Date('2026-12-01T09:00:00+07:00'));
  assert.equal(payload.daysUntilTet, 67);
  assert.equal(
    payload.metaDescriptionHome,
    'Còn 67 ngày nữa đến Tết Nguyên Đán 2027, vào Thứ Bảy 06/02/2027. Xem đồng hồ đếm ngược theo giờ Việt Nam và lịch Tết.'
  );
  assert.match(payload.metaDescriptionGiaoThua, /^Hôm nay còn 66 ngày nữa đến đêm giao thừa 2027/);
  assert.ok(payload.metaDescriptionHome.length <= 160);
  assert.ok(payload.metaDescriptionGiaoThua.length <= 160);
});

test('homepage injection keeps title, snippet and WebPage schema aligned', () => {
  const payload = buildTetSeoPayload(new Date('2026-12-01T09:00:00+07:00'));
  const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const html = injectTetSeo('index.html', source, payload);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
  const webpage = schemas.find((schema) => schema['@type'] === 'WebPage');

  assert.match(html, new RegExp(`<title>${payload.titleHome.replace('?', '\\?')}<\\/title>`));
  assert.match(html, new RegExp(`meta name="description" content="${payload.metaDescriptionHome}"`));
  assert.equal(webpage.name, payload.titleHome.replace(' | Sắp Tết', ''));
  assert.equal(webpage.description, payload.metaDescriptionHome);
});

test('homepage sitemap lastmod follows the refreshed Vietnam date', () => {
  const payload = buildTetSeoPayload(new Date('2026-10-19T17:15:00Z'));
  const source = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  const updated = updateHomepageSitemapLastmod(source, payload);

  assert.match(updated, /<loc>https:\/\/saptet\.vn\/<\/loc>\s*<lastmod>2026-10-20<\/lastmod>/);
  assert.equal(updateHomepageSitemapLastmod(updated, payload), updated);
  assert.match(updated, /<loc>https:\/\/saptet\.vn\/con-bao-nhieu-ngay-nua-den-tet\/<\/loc>\s*<lastmod>2026-05-19<\/lastmod>/);
});

test('daily homepage quote changes with the Vietnam date and is pre-rendered', () => {
  const first = quoteForDateKey('2026-10-19');
  const next = quoteForDateKey('2026-10-20');
  assert.notEqual(first, next);
  assert.equal(quoteForDateKey('2026-10-19'), first);

  const payload = buildTetSeoPayload(new Date('2026-10-19T17:15:00Z'));
  const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const html = injectTetSeo('index.html', source, payload);
  assert.ok(html.includes(`<span class="preview-quote-text" data-home-daily-quote>${next}</span>`));
});

test('daily quotes have stable share ids and a live countdown caption', () => {
  for (let id = 0; id < 7; id += 1) {
    assert.ok(quoteForId(id));
  }
  const dateKey = '2026-10-19';
  assert.equal(quoteForId(quoteIdForDateKey(dateKey)), quoteForDateKey(dateKey));
  assert.equal(quoteForId(7), null);
  const { countdownCaption } = require('../js/home-wish-share-image');
  assert.equal(countdownCaption(110), 'Tết chỉ còn 110 ngày');
  assert.equal(countdownCaption(0, true), 'Tết chỉ còn 0 ngày');
  assert.equal(countdownCaption(0, false), '');
});

test('inject is idempotent and pre-renders the real day count', () => {
  const first = buildTetSeoPayload(new Date('2026-12-01T09:00:00+07:00'));
  const second = buildTetSeoPayload(new Date('2026-12-02T09:00:00+07:00'));

  for (const file of Object.keys(TARGETS)) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const once = injectTetSeo(file, html, first);
    assert.equal(injectTetSeo(file, once, first), once, `${file} should be stable on re-run`);
    assert.match(once, /\b67 ngày|\b66 ngày/, `${file} should contain the day count`);
    assert.match(injectTetSeo(file, once, second), /\b66 ngày|\b65 ngày/, `${file} should update the next day`);
  }
});

test('committed homepage never ships a zero day count to crawlers', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.doesNotMatch(html, /data-seo="days-until-tet">0</);
});

test('homepage hero "today" card is pre-rendered with the same strings home-retention.js renders', () => {
  const { getHeroToday } = require('../js/home-retention.js');
  const { EVENTS_DATA } = require('../data/events-data.js');
  const { calculateLunarDate } = require('../js/lunar-calendar.js');
  const now = new Date('2026-12-01T09:00:00+07:00');
  const payload = buildTetSeoPayload(now);
  const html = injectTetSeo('index.html', fs.readFileSync(path.join(root, 'index.html'), 'utf8'), payload);
  const today = getHeroToday(now, EVENTS_DATA, calculateLunarDate);

  assert.match(html, new RegExp(`<span id="today-date">${today.solarText}</span>`));
  assert.match(html, new RegExp(`<span id="today-lunar" class="today-lunar">\\(${today.lunarText}\\)</span>`));
  assert.ok(today.nearestEvent);
  assert.ok(html.includes(`<span id="nearest-event-text">${today.nearestEvent.text}</span>`));
  assert.match(html, /<a\b[^>]*id="nearest-event-link"[^>]*>/);
  assert.doesNotMatch(html, /id="nearest-event-link"[^>]* hidden>/);
});

test('homepage injection refreshes both desktop and mobile preview dates before deploy', () => {
  const now = new Date('2026-12-01T09:00:00+07:00');
  const payload = buildTetSeoPayload(now);
  const { getHeroToday } = require('../js/home-retention.js');
  const { EVENTS_DATA } = require('../data/events-data.js');
  const { calculateLunarDate } = require('../js/lunar-calendar.js');
  const today = getHeroToday(now, EVENTS_DATA, calculateLunarDate);
  const source = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const html = injectTetSeo('index.html', source, payload);
  const values = (pattern) => [...html.matchAll(pattern)].map((match) => match[1]);

  assert.deepEqual(values(/<span id="today-date">([^<]*)<\/span>/g), [today.solarText, today.solarText]);
  assert.deepEqual(values(/<span id="today-lunar"[^>]*>([^<]*)<\/span>/g), [`(${today.lunarText})`, `(${today.lunarText})`]);
  assert.deepEqual(values(/<span data-seo="days-until-tet">([^<]*)<\/span>/g), [String(payload.daysUntilTet), String(payload.daysUntilTet)]);
});

const assert = require('node:assert/strict');
const test = require('node:test');
const {
  TET_2027,
  GIAO_THUA_2027,
  buildTetSeoPayload,
  calendarDaysUntil,
  daysUntil,
} = require('../scripts/lib/tet-seo-dates');
const fs = require('node:fs');
const path = require('node:path');
const { TARGETS, injectTetSeo } = require('../scripts/inject-tet-seo-snippets');

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
  assert.match(payload.metaDescriptionHome, /^Hôm nay còn 67 ngày nữa đến Tết Nguyên Đán 2027/);
  assert.match(payload.metaDescriptionGiaoThua, /^Hôm nay còn 66 ngày nữa đến đêm giao thừa 2027/);
  assert.ok(payload.metaDescriptionHome.length <= 160);
  assert.ok(payload.metaDescriptionGiaoThua.length <= 160);
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

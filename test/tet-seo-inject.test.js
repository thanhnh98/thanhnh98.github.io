const assert = require('node:assert/strict');
const test = require('node:test');
const {
  TET_2027,
  GIAO_THUA_2027,
  buildTetSeoPayload,
  daysUntil,
} = require('../scripts/lib/tet-seo-dates');

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

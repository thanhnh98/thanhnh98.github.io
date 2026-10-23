const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { SALE_DAYS } = require('../data/sale-days.js');
const { render } = require('../scripts/generate-sale-page.js');
const { EVENTS_DATA } = require('../data/events-data.js');

test('double-date countdown advances monthly and across the year in Vietnam time', () => {
  assert.deepEqual(SALE_DAYS.getNextSale('2026-10-23'), { dateKey: '2026-11-11', label: '11.11', daysUntil: 19 });
  assert.deepEqual(SALE_DAYS.getNextSale('2026-11-10'), { dateKey: '2026-11-11', label: '11.11', daysUntil: 1 });
  assert.deepEqual(SALE_DAYS.getNextSale('2026-11-11'), { dateKey: '2026-12-12', label: '12.12', daysUntil: 31 });
  assert.deepEqual(SALE_DAYS.getNextSale('2026-12-12'), { dateKey: '2027-01-01', label: '1.1', daysUntil: 20 });
  assert.equal(SALE_DAYS.isDoubleDay('2026-11-11'), true);
  assert.equal(SALE_DAYS.isDoubleDay('2026-11-12'), false);
  assert.equal(SALE_DAYS.vietnamTodayKey(new Date('2026-11-10T17:00:00Z')), '2026-11-11');
});

test('sale page has one canonical and direct, current answer', () => {
  const html = render('2026-10-23');
  assert.match(html, /<title>Còn Bao Nhiêu Ngày Nữa Đến 11\.11\? \| Sắp Săn Sale<\/title>/);
  assert.match(html, /<h1[^>]*>Còn bao nhiêu ngày nữa đến ngày sale đôi 11\.11\?<\/h1>/);
  assert.match(html, /Còn 19 ngày nữa đến ngày sale đôi 11\.11 \(11\/11\/2026\)/);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
  assert.match(html, /href="https:\/\/saptet\.vn\/sap-san-sale\/"/);
  const sitemap = fs.readFileSync(path.join(__dirname, '../sitemap.xml'), 'utf8');
  assert.equal((sitemap.match(/<loc>https:\/\/saptet\.vn\/sap-san-sale\/<\/loc>/g) || []).length, 1);
});

test('moving event dates roll forward correctly', () => {
  const bySlug = (slug) => EVENTS_DATA.getEventBySlug(slug);
  assert.equal(EVENTS_DATA.getNextOccurrence(bySlug('black-friday'), { todayKey: '2026-10-23' }).dateKey, '2026-11-27');
  assert.equal(EVENTS_DATA.getNextOccurrence(bySlug('black-friday'), { todayKey: '2026-11-28' }).dateKey, '2027-11-26');
  assert.equal(EVENTS_DATA.getNextOccurrence(bySlug('ngay-cua-me'), { todayKey: '2026-12-01' }).dateKey, '2027-05-09');
  assert.equal(EVENTS_DATA.getNextOccurrence(bySlug('ngay-cua-cha'), { todayKey: '2026-12-01' }).dateKey, '2027-06-20');
  assert.ok(EVENTS_DATA.getSolarEventMap(2026)['11-27'].some((event) => event.slug === 'black-friday'));
});

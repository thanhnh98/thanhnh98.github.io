const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const cheerio = require('cheerio');
const payday = require('../js/sap-co-luong.js');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const atVietnam = (value) => new Date(`${value}+07:00`);

test('salary day clamps to the last day of short and leap-year months', () => {
  assert.equal(payday.effectiveSalaryDay(2027, 2, 31), 28);
  assert.equal(payday.effectiveSalaryDay(2028, 2, 31), 29);
  assert.equal(payday.effectiveSalaryDay(2027, 4, 31), 30);
  assert.equal(payday.effectiveSalaryDay(2027, 1, 31), 31);
});

test('calendar day picker exposes exactly day 1 through day 31', () => {
  const days = payday.salaryDayOptions();
  assert.equal(days.length, 31);
  assert.deepEqual(days, Array.from({ length: 31 }, (_, index) => index + 1));
});

test('countdown selects this month, celebrates all payday, then rolls forward', () => {
  const before = payday.getPaydayState(atVietnam('2027-01-30T23:59:59'), 31);
  assert.equal(before.mode, 'countdown');
  assert.equal(before.target.toISOString(), '2027-01-30T17:00:00.000Z');

  const start = payday.getPaydayState(atVietnam('2027-01-31T00:00:00'), 31);
  const end = payday.getPaydayState(atVietnam('2027-01-31T23:59:59'), 31);
  assert.equal(start.mode, 'payday');
  assert.equal(end.mode, 'payday');
  assert.equal(start.target.toISOString(), '2027-02-27T17:00:00.000Z');

  const next = payday.getPaydayState(atVietnam('2027-02-01T00:00:00'), 31);
  assert.equal(next.mode, 'countdown');
  assert.equal(next.effectiveDay, 28);
});

test('salary countdown crosses the year boundary and supports day one', () => {
  const december = payday.getPaydayState(atVietnam('2027-12-31T12:00:00'), 1);
  assert.equal(december.target.toISOString(), '2027-12-31T17:00:00.000Z');
  const january = payday.getPaydayState(atVietnam('2028-01-01T19:00:00'), 1);
  assert.equal(january.mode, 'payday');
});

test('config storage validates values, defaults the role and survives blocked storage', () => {
  const values = new Map();
  const storage = { getItem: (key) => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
  const store = payday.createConfigStore(storage);
  assert.equal(store.get(), null);
  assert.deepEqual(store.save(25, 'unknown'), { version: 1, salaryDay: 25, role: 'single' });
  assert.equal(store.get().salaryDay, 25);

  const blocked = payday.createConfigStore({ getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } });
  blocked.save(10, 'dating');
  assert.equal(blocked.get().role, 'dating');
});

test('all four roles have distinct advice and product preferences', () => {
  assert.deepEqual(payday.VALID_ROLES, ['single', 'dating', 'has-wife', 'has-husband']);
  payday.VALID_ROLES.forEach((role) => {
    assert.ok(payday.ROLE_CONTENT[role].groups.length >= 3);
  });
  assert.equal(payday.ROLE_CONTENT['has-wife'].items.length, 1);
  assert.equal(payday.ROLE_CONTENT['has-wife'].items[0], 'Chuyển hết cho vợ.');
  assert.equal(payday.ROLE_CONTENT['has-husband'].items[0], 'Shopping món mình thích.');
  assert.equal(payday.ROLE_CONTENT.dating.items[0], 'Để dành tiền cưới vợ/chồng.');
  assert.equal(payday.ROLE_CONTENT.single.items[0], 'Làm gì cũng được, đừng đầu tư lung tung.');
  assert.ok(payday.ROLE_CONTENT['has-husband'].items.length > 1);
  assert.ok(payday.ROLE_CONTENT.dating.items.length > 1);
  assert.ok(payday.ROLE_CONTENT.single.items.length > 1);
});

test('product selection ranks matching groups and removes duplicates', () => {
  const product = (id, group) => ({ id, group, name: id, thumbnail: `https://img/${id}.jpg`, url: `https://shop/${id}` });
  const selected = payday.chooseProducts([
    product('tech', 'tech-accessories'),
    product('home', 'home-living'),
    product('home', 'home-living'),
    product('gift', 'gifts-decor')
  ], 'has-wife', 3);
  assert.equal(selected[0].id, 'home');
  assert.deepEqual(selected.map((item) => item.id).sort(), ['gift', 'home', 'tech']);
});

test('product selection keeps role recommendations varied across preferred groups', () => {
  const product = (id, group) => ({ id, group, name: id, thumbnail: `https://img/${id}.jpg`, url: `https://shop/${id}` });
  const selected = payday.chooseProducts([
    product('tech-1', 'tech-accessories'), product('tech-2', 'tech-accessories'),
    product('fashion-1', 'fashion-personal'), product('fashion-2', 'fashion-personal'),
    product('food-1', 'food-drink'), product('food-2', 'food-drink')
  ], 'single', 6);
  assert.deepEqual(selected.map((item) => item.id), ['tech-1', 'fashion-1', 'food-1', 'tech-2', 'fashion-2', 'food-2']);
});

test('payday page ships onboarding, accessibility, SEO and affiliate disclosure', () => {
  const html = read('sap-co-luong/index.html');
  const $ = cheerio.load(html);
  assert.equal($('link[rel="canonical"]').attr('href'), 'https://saptet.vn/sap-co-luong/');
  assert.equal($('meta[name="viewport"]').length, 1);
  assert.equal($('h1').length, 1);
  assert.equal($('#salary-day').is('input[type="hidden"]'), true);
  assert.equal($('select#salary-day').length, 0);
  assert.equal($('[data-salary-day-grid][role="group"]').length, 1);
  assert.equal($('[data-payday-onboarding][role="dialog"]').length, 1);
  assert.equal($('[data-payday-today-message]').text().trim(), 'Hôm nay có lương');
  assert.equal($('[data-payday-today-message] [data-lucide="party-popper"]').length, 1);
  assert.match($('[data-payday-effective]').text(), /Cố gắng vượt qua những ngày này bạn nhé/);
  assert.equal($('#payday-role option').length, 4);
  assert.equal($('label[for="payday-role-trigger"]').text().trim(), 'Bạn đang');
  assert.deepEqual($('#payday-role option').map((_, option) => $(option).text()).get(), ['Độc thân', 'Đang yêu', 'Có chồng', 'Có vợ']);
  assert.equal($('.payday-role-select > #payday-role').length, 1);
  assert.equal($('.payday-role-select [data-lucide="chevron-down"]').length, 1);
  assert.equal($('[data-role-trigger][aria-haspopup="listbox"]').length, 1);
  assert.equal($('[data-role-menu][role="listbox"] [role="option"]').length, 4);
  assert.deepEqual($('.payday-stats [data-lucide]').map((_, icon) => $(icon).attr('data-lucide')).get(), ['moon', 'briefcase', 'calendar-days']);
  assert.doesNotMatch($('.payday-stats').text(), /[🌙💼📅]/u);
  assert.match(html, /Liên kết affiliate/);
  const css = read('css/sap-co-luong.css');
  const js = read('js/sap-co-luong.js');
  assert.match(css, /prefers-reduced-motion/);
  assert.match(css, /@keyframes payday-hero-float/);
  assert.match(css, /appearance:\s*none/);
  assert.match(css, /@keyframes payday-role-card-in/);
  assert.match(css, /@keyframes payday-role-menu-in/);
  assert.match(css, /@keyframes payday-role-option-in/);
  assert.match(css, /@keyframes payday-digit-out/);
  assert.match(css, /@keyframes payday-digit-in/);
  assert.match(css, /\.payday-countdown\s*>\s*div\s*>\s*span/);
  assert.doesNotMatch(css, /\.payday-countdown span\s*\{/);
  assert.match(js, /renderRole\(true\)/);
  assert.match(js, /previousCharacter !== character/);
  assert.match(js, /ArrowLeft[\s\S]*ArrowRight[\s\S]*ArrowUp[\s\S]*ArrowDown/);
  assert.match(html, /assets\/images\/sap-co-luong\/payday-waiting\.webp/);
  assert.match(js, /payday-hero\.webp[\s\S]*payday-waiting\.webp/);
  assert.equal(fs.existsSync(path.join(root, 'assets/images/sap-co-luong/payday-hero.webp')), true);
  assert.equal(fs.existsSync(path.join(root, 'assets/images/sap-co-luong/payday-waiting.webp')), true);

  const schema = JSON.parse($('script[type="application/ld+json"]').text());
  const types = schema['@graph'].map((item) => item['@type']);
  for (const type of ['WebPage', 'BreadcrumbList', 'FAQPage', 'Organization']) assert.ok(types.includes(type));
});

test('payday page is discoverable from menu, homepage and sitemap', () => {
  assert.match(read('components/header.html'), /href="\/sap-co-luong\/"/);
  assert.match(read('js/header-loader.js'), /normalizedPath === '\/sap-co-luong'[\s\S]*return 'payday'/);
  assert.match(read('index.html'), /data-home-quick-link="payday"[\s\S]*href="\/sap-co-luong\/"/);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/sap-co-luong\/<\/loc>/);
});

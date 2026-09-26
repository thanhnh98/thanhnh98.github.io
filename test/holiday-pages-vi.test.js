const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { HOLIDAYS_EN, HOLIDAY_CATEGORIES } = require('../data/holidays-en.js');
const { HOLIDAYS_VI, UI_VI, HOLIDAY_CATEGORIES_VI } = require('../data/holidays-vi.js');
const { HOLIDAYS_AR } = require('../data/holidays-ar.js');

const decode = (text) => text.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
// Ký tự có dấu riêng của tiếng Việt (ă, â, đ, ơ, ư, ạ…ỹ).
const VIETNAMESE = /[ăâđêôơưĂÂĐÊÔƠƯẠ-ỹ]/;

function graphOf(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()))
    .flatMap((schema) => schema['@graph'] || [schema]);
}

test('Vietnamese data covers every holiday with the same structure as the English data', () => {
  for (const holiday of HOLIDAYS_EN) {
    const vi = HOLIDAYS_VI[holiday.slug];
    assert.ok(vi, `missing ${holiday.slug}`);
    for (const key of ['h1', 'tagline', 'shareMessage']) assert.match(vi[key], VIETNAMESE, `${holiday.slug}.${key} should be Vietnamese`);
    assert.ok(vi.name && vi.name.length <= 24, `${holiday.slug}.name`);
    assert.equal(vi.about.length, holiday.about.length, `${holiday.slug}.about`);
    assert.equal(vi.traditions.length, holiday.traditions.length, `${holiday.slug}.traditions`);
    assert.equal(vi.faq.length, holiday.faq.length, `${holiday.slug}.faq`);
    assert.equal(vi.regions.length, holiday.regions.length, `${holiday.slug}.regions`);
    assert.ok(vi.origin.roots && vi.origin.communities, `${holiday.slug}.origin`);
    assert.equal(Boolean(vi.zoneLabel), holiday.scope === 'national', `${holiday.slug}.zoneLabel only for national scope`);
    assert.equal(Boolean(vi.dateNote), Boolean(holiday.dateNote), `${holiday.slug}.dateNote`);
    if (holiday.moonDisclaimer) assert.match(vi.dateNote, /trăng lưỡi liềm/);
    if (vi.wikipedia) assert.match(vi.wikipedia, /^https:\/\/vi\.wikipedia\.org\/wiki\//);
    assert.ok(vi.keywords.length >= 3, `${holiday.slug}.keywords`);
  }
  assert.equal(Object.keys(HOLIDAYS_VI).length, HOLIDAYS_EN.length, 'no Vietnamese entry without an English page');
  // "Sắp X": mỗi sự kiện có H1 thương hiệu + slug ASCII /sap-<tên-việt>/ duy nhất, không đụng file có sẵn ở gốc.
  const sapSlugs = new Set();
  for (const holiday of HOLIDAYS_EN) {
    const vi = HOLIDAYS_VI[holiday.slug];
    assert.equal(vi.h1, `Sắp ${vi.name}`, `${holiday.slug}.h1 should be "Sắp <name>"`);
    assert.match(vi.sapSlug, /^sap-[a-z0-9]+(-[a-z0-9]+)*$/, `${holiday.slug}.sapSlug`);
    assert.ok(!sapSlugs.has(vi.sapSlug), `${holiday.slug}.sapSlug duplicated`);
    sapSlugs.add(vi.sapSlug);
    assert.ok(!fs.existsSync(path.join(root, `${vi.sapSlug}.html`)), `${vi.sapSlug}.html would shadow the alias`);
    assert.ok(vi.keywords.some((keyword) => keyword.startsWith('sắp ')), `${holiday.slug}.keywords needs a "sắp …" phrase`);
  }

  for (const category of HOLIDAY_CATEGORIES) assert.ok(HOLIDAY_CATEGORIES_VI[category.id], category.id);
});

for (const holiday of HOLIDAYS_EN) {
  const { slug } = holiday;
  const vi = HOLIDAYS_VI[slug];
  const file = `vi/${slug}.html`;

  test(`${file} is an indexable Vietnamese countdown page`, () => {
    const html = read(file);
    const canonical = `https://saptet.vn/vi/${slug}`;
    assert.match(html, /<html lang="vi">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large">/);
    assert.match(html, /<meta property="og:locale" content="vi_VN">/);
    assert.match(html, /\/assets\/fonts\/fraunces-vietnamese\.woff2/);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/);
    assert.match(html, new RegExp(`class="hc-hero-bg" src="${holiday.visual.background}"`));

    const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
    assert.ok(title.length <= 60, `title length ${title.length}: ${title}`);
    assert.ok(title.includes(vi.name));
    assert.ok(title.startsWith(`Sắp ${vi.name} `), `title should start with "Sắp ${vi.name}": ${title}`);
    assert.match(title, /Còn bao nhiêu ngày nữa\?$/, `title keeps the question: ${title}`);
    assert.match(description, /^Sắp /, `description opens with "Sắp": ${description}`);
    assert.match(html, new RegExp(`<h1 id="hc-title" class="hc-title">Sắp ${vi.name} <span data-hc-year>\\d{4}</span></h1>`));
    assert.match(html, new RegExp(`<meta property="og:title" content="Sắp ${vi.name} \\d{4}">`));
    const keywords = html.match(/<meta name="keywords" content="([^"]+)">/)[1];
    assert.match(keywords, new RegExp(`sắp ${vi.name.toLowerCase()} \\d{4}`), 'keywords carry "sắp <name> <year>"');
    const summaries = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => decode(match[1]));
    assert.equal(summaries[0], `Sắp ${vi.name} chưa? Còn bao nhiêu ngày nữa?`, 'first FAQ is the "Sắp X chưa" question');
    assert.ok(description.length >= 100 && description.length <= 160, `description length ${description.length}`);

    // Không sót nhãn tiếng Anh trong giao diện.
    for (const english of ['>Days<', '>Hours<', '>Minutes<', '>Seconds<', 'Share Countdown', 'Frequently Asked Questions', 'More Countdowns', 'Also known as', 'Traditions<']) {
      assert.ok(!html.includes(english), `leftover English: ${english}`);
    }
    for (const unit of ['Ngày', 'Giờ', 'Phút', 'Giây']) assert.ok(html.includes(`<span>${unit}</span>`), unit);
    for (const region of vi.regions) assert.ok(decode(html).includes(`<h3>${region.country}</h3>`), region.country);
    assert.ok(decode(html).includes(vi.origin.roots));
    if (holiday.scope === 'global') {
      assert.match(html, /<select data-hc-zone /);
      assert.match(html, /bắt đầu lúc nào trên thế giới\?<\/h3>/);
    } else {
      assert.doesNotMatch(html, /data-hc-zone/);
    }
    if (vi.seeAlso) assert.ok(html.includes(`<a href="${vi.seeAlso.href}">`), 'seeAlso link');

    const config = JSON.parse(html.match(/<script id="holiday-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(config.name, vi.name);
    assert.equal(config.shareMessage, vi.shareMessage);
    assert.equal(config.i18n.locale, 'vi-VN');
    assert.deepEqual(config.i18n.shareUnits, UI_VI.units);
    assert.deepEqual(config.dates.length > 1, true);
  });

  test(`/${vi.sapSlug}/ is a noindex alias that redirects to /vi/${slug}`, () => {
    const stub = read(`${vi.sapSlug}/index.html`);
    assert.match(stub, /<html lang="vi">/);
    assert.match(stub, new RegExp(`<link rel="canonical" href="https://saptet.vn/vi/${slug}" />`));
    assert.match(stub, new RegExp(`<meta http-equiv="refresh" content="0;url=/vi/${slug}" />`));
    assert.match(stub, /<meta name="robots" content="noindex, follow" \/>/);
    assert.match(stub, new RegExp(`location\\.replace\\("/vi/${slug}"\\)`));
    assert.ok(stub.includes(`Sắp ${vi.name}`), 'stub names the holiday');
    assert.ok(stub.length < 1500, 'stays a small redirect stub');
    assert.doesNotMatch(read('sitemap.xml'), new RegExp(`<loc>https://saptet.vn/${vi.sapSlug}/?</loc>`), 'alias stays out of the sitemap');
  });

  test(`${file} pairs with its English page through hreflang and structured data`, () => {
    const html = read(file);
    const english = read(`${slug}.html`);
    for (const page of [html, english]) {
      assert.match(page, new RegExp(`hreflang="en" href="https://saptet.vn/${slug}"`));
      assert.match(page, new RegExp(`hreflang="vi" href="https://saptet.vn/vi/${slug}"`));
      assert.match(page, new RegExp(`hreflang="x-default" href="https://saptet.vn/${slug}"`));
    }
    if (HOLIDAYS_AR[slug]) assert.match(html, new RegExp(`hreflang="ar" href="https://saptet.vn/ar/${slug}"`));
    assert.match(english, new RegExp(`<a href="/vi/${slug}" hreflang="vi" lang="vi">Tiếng Việt</a>`));
    assert.match(html, new RegExp(`<a href="/${slug}" hreflang="en" lang="en">English</a>`));

    const graph = graphOf(html);
    const page = graph.find((node) => node['@type'] === 'WebPage');
    assert.equal(page.inLanguage, 'vi');
    assert.equal(page.about.name, vi.name);
    assert.ok(page.about.alternateName.includes(holiday.name) || vi.name === holiday.name);
    assert.ok(!graph.some((node) => node['@type'] === 'Event'));
    const faq = graph.find((node) => node['@type'] === 'FAQPage');
    const visible = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => decode(match[1]));
    assert.deepEqual(faq.mainEntity.map((entry) => entry.name), visible);

    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)[1];
    assert.equal(ogImage, `https://saptet.vn/assets/images/og/vi-${slug}.jpg`);
    assert.ok(fs.existsSync(path.join(root, `assets/images/og/vi-${slug}.jpg`)));
    assert.match(read('sitemap.xml'), new RegExp(`<loc>https://saptet.vn/vi/${slug}</loc>`));
  });
}

test('Vietnamese hub lists every holiday by category and localizes card labels', () => {
  const hub = read('vi/countdowns.html');
  assert.match(hub, /<html lang="vi">/);
  assert.match(hub, /<link rel="canonical" href="https:\/\/saptet\.vn\/vi\/countdowns">/);
  assert.match(hub, /hreflang="en" href="https:\/\/saptet\.vn\/countdowns"/);
  assert.match(read('countdowns.html'), /hreflang="vi" href="https:\/\/saptet\.vn\/vi\/countdowns"/);
  for (const category of HOLIDAY_CATEGORIES) {
    const section = hub.split(`<section class="hc-section hc-category" id="${category.id}"`)[1].split('</section>')[0];
    assert.ok(decode(section).includes(HOLIDAY_CATEGORIES_VI[category.id].title));
    for (const holiday of HOLIDAYS_EN.filter((item) => item.category === category.id)) {
      assert.match(section, new RegExp(`href="/vi/${holiday.slug}"`));
    }
  }
  const config = JSON.parse(hub.match(/<script id="holiday-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(config.i18n.locale, 'vi-VN', 'cards refresh with Vietnamese day labels');
  assert.doesNotMatch(hub, /data-hc-card-days>\d+ days?</);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/vi\/countdowns<\/loc>/);
});

// Menu "More / Xem thêm": mọi trang đều có lối tắt tới toàn bộ danh mục, mục đầu tiên quay về trang tất cả.
const MENU_PAGES = [
  ...HOLIDAYS_EN.map((holiday) => ({ file: `${holiday.slug}.html`, prefix: '', label: 'More', all: 'All countdowns', current: `/${holiday.slug}` })),
  { file: 'countdowns.html', prefix: '', label: 'More', all: 'All countdowns', current: '/countdowns' },
  ...HOLIDAYS_EN.map((holiday) => ({ file: `vi/${holiday.slug}.html`, prefix: '/vi', label: UI_VI.more, all: UI_VI.allCountdowns, current: `/vi/${holiday.slug}` })),
  { file: 'vi/countdowns.html', prefix: '/vi', label: UI_VI.more, all: UI_VI.allCountdowns, current: '/vi/countdowns' },
];

for (const { file, prefix, label, all, current } of MENU_PAGES) {
  test(`${file} header has a "${label}" menu with every category and an "all" link`, () => {
    const html = read(file);
    const header = html.slice(html.indexOf('<header class="hc-header">'), html.indexOf('</header>'));
    const menu = header.slice(header.indexOf('<details class="hc-menu" data-hc-menu>'));
    assert.ok(menu.startsWith('<details'), 'menu present');
    assert.ok(header.indexOf('</nav>') < header.indexOf('<details'), 'menu sits outside the scrolling nav');
    assert.match(menu, new RegExp(`<summary class="hc-menu-toggle">${label} <svg`));
    const firstLink = menu.match(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)</);
    assert.equal(firstLink[1], `${prefix}/countdowns`, 'first item returns to the all-countdowns page');
    assert.equal(firstLink[2].trim(), all);
    for (const holiday of HOLIDAYS_EN) assert.ok(menu.includes(`href="${prefix}/${holiday.slug}"`), `${holiday.slug} in menu`);
    assert.equal((menu.match(/class="hc-menu-title"/g) || []).length, HOLIDAY_CATEGORIES.length);
    assert.match(menu, new RegExp(`href="${current}" aria-current="page"`));
    assert.doesNotMatch(header, /<a href="\/countdowns">All<\/a>/, 'the old standalone "All" link moved into the menu');
  });
}

test('menu closes on outside click, Escape and link selection', () => {
  const source = read('js/holiday-countdown.js');
  assert.match(source, /function initMenus\(\)/);
  assert.match(source, /event\.key !== 'Escape'/);
  assert.match(source, /!menu\.contains\(event\.target\)/);
  assert.match(source, /initMenus\(\);/);
});

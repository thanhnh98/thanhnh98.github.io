const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { HOLIDAYS_EN, HOLIDAY_CATEGORIES } = require('../data/holidays-en.js');
const { HOLIDAYS_VI, UI_VI, HOLIDAY_CATEGORIES_VI } = require('../data/holidays-vi.js');
const { HOLIDAYS_AR } = require('../data/holidays-ar.js');
const { langData, langVariant } = require('./helpers/holiday-lang.js');

const decode = (text) => text.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
// Ký tự có dấu riêng của tiếng Việt (ă, â, đ, ơ, ư, ạ…ỹ).
const VIETNAMESE = /[ăâđêôơưĂÂĐÊÔƠƯẠ-ỹ]/;
const re = (text) => new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

function graphOf(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()))
    .flatMap((schema) => schema['@graph'] || [schema]);
}

test('Vietnamese data covers every holiday with the same structure as the English data', () => {
  for (const holiday of HOLIDAYS_EN) {
    const vi = HOLIDAYS_VI[holiday.slug];
    assert.ok(vi, `missing ${holiday.slug}`);
    assert.equal(vi.h1, undefined, `${holiday.slug}: H1 is the plain name, no separate "Sắp …" h1`);
    for (const key of ['tagline', 'shareMessage']) assert.match(vi[key], VIETNAMESE, `${holiday.slug}.${key} should be Vietnamese`);
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
  // Alias ASCII /sap-<tên-việt>/ duy nhất, không đụng file có sẵn ở gốc.
  const sapSlugs = new Set();
  for (const holiday of HOLIDAYS_EN) {
    const vi = HOLIDAYS_VI[holiday.slug];
    assert.match(vi.sapSlug, /^sap-[a-z0-9]+(-[a-z0-9]+)*$/, `${holiday.slug}.sapSlug`);
    assert.ok(!sapSlugs.has(vi.sapSlug), `${holiday.slug}.sapSlug duplicated`);
    sapSlugs.add(vi.sapSlug);
    assert.ok(!fs.existsSync(path.join(root, `${vi.sapSlug}.html`)), `${vi.sapSlug}.html would shadow the alias`);
  }

  for (const category of HOLIDAY_CATEGORIES) assert.ok(HOLIDAY_CATEGORIES_VI[category.id], category.id);
});

for (const holiday of HOLIDAYS_EN) {
  const { slug } = holiday;
  const vi = HOLIDAYS_VI[slug];
  const file = `${slug}.html?lang=vi`;
  const canonical = `https://saptet.vn/${slug}?lang=vi`;

  test(`${file} is an indexable Vietnamese countdown page`, () => {
    const { html, head, source } = langVariant(`${slug}.html`, 'vi');
    assert.equal(head.url, canonical);
    assert.equal(head.dir, null);
    assert.match(source, /<meta name="robots" content="index, follow, max-image-preview:large">/);
    assert.match(html, /<meta property="og:locale" content="vi_VN">/);
    assert.match(html, re(`<meta property="og:url" content="${canonical}">`));
    assert.match(html, /\/assets\/fonts\/fraunces-vietnamese\.woff2/);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/);
    assert.match(html, new RegExp(`class="hc-hero-bg" src="${holiday.visual.background}"`));

    const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
    assert.ok(title.length <= 60, `title length ${title.length}: ${title}`);
    assert.ok(title.startsWith(`${vi.name} 20`), `title leads with the name + year: ${title}`);
    assert.match(title, /còn bao nhiêu ngày nữa\?/i, `title keeps the question: ${title}`);
    assert.ok(description.length >= 100 && description.length <= 160, `description length ${description.length}`);
    // Landing chỉ hiển thị tên sự kiện, không còn "Sắp <tên>".
    assert.match(html, new RegExp(`<h1 id="hc-title" class="hc-title">${vi.name} <span data-hc-year>\\d{4}</span></h1>`));
    for (const text of [title, description, decode(html)]) assert.ok(!text.includes(`Sắp ${vi.name}`), `leftover "Sắp ${vi.name}"`);
    assert.match(html, new RegExp(`<meta property="og:title" content="Đếm ngược ${vi.name} \\d{4}">`));
    const summaries = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => decode(match[1]));
    assert.equal(summaries[0], `Còn bao nhiêu ngày nữa đến ${vi.name}?`);

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

  for (const stubFile of [`${vi.sapSlug}/index.html`, `vi/${slug}.html`]) {
    test(`${stubFile} is a noindex redirect to /${slug}?lang=vi`, () => {
      const stub = read(stubFile);
      assert.match(stub, /<html lang="vi">/);
      assert.match(stub, re(`<link rel="canonical" href="${canonical}" />`));
      assert.match(stub, re(`<meta http-equiv="refresh" content="0;url=/${slug}?lang=vi" />`));
      assert.match(stub, /<meta name="robots" content="noindex, follow" \/>/);
      assert.match(stub, re(`location.replace("/${slug}?lang=vi" + location.hash)`));
      assert.ok(stub.includes(vi.name), 'stub names the holiday');
      assert.ok(!stub.includes('Sắp '), 'no "Sắp" in the stub');
      assert.ok(stub.length < 1500, 'stays a small redirect stub');
      assert.doesNotMatch(read('sitemap.xml'), re(`<loc>https://saptet.vn/${stubFile.replace(/(\/index)?\.html$/, '')}`), 'stub stays out of the sitemap');
    });
  }

  test(`${file} pairs with its English page through hreflang and structured data`, () => {
    const { html, source: english } = langVariant(`${slug}.html`, 'vi');
    assert.match(english, re(`hreflang="en" href="https://saptet.vn/${slug}">`));
    assert.match(english, re(`hreflang="vi" href="${canonical}">`));
    assert.match(english, re(`hreflang="x-default" href="https://saptet.vn/${slug}">`));
    if (HOLIDAYS_AR[slug]) assert.match(english, re(`hreflang="ar" href="https://saptet.vn/${slug}?lang=ar">`));
    assert.match(english, re(`<a href="/${slug}?lang=vi" hreflang="vi" lang="vi">Tiếng Việt</a>`));
    assert.match(html, re(`<a href="/${slug}" hreflang="en" lang="en">English</a>`));
    assert.doesNotMatch(html, /href="\/vi\//, 'no links to the legacy /vi/ paths');

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
    const graphPage = graph.find((node) => node['@type'] === 'WebPage');
    assert.equal(graphPage.url, canonical);
    assert.equal(langData(english).vi.modified, graphPage.dateModified);
    assert.match(read('sitemap.xml'), re(`<loc>${canonical}</loc>`));
  });
}

test('Vietnamese hub lists every holiday by category and localizes card labels', () => {
  const { html: hub, head, source } = langVariant('countdowns.html', 'vi');
  assert.equal(head.url, 'https://saptet.vn/countdowns?lang=vi');
  assert.ok(!decode(head.title).startsWith('Sắp'), head.title);
  assert.match(source, /hreflang="vi" href="https:\/\/saptet\.vn\/countdowns\?lang=vi"/);
  for (const category of HOLIDAY_CATEGORIES) {
    const section = hub.split(`<section class="hc-section hc-category" id="${category.id}"`)[1].split('</section>')[0];
    assert.ok(decode(section).includes(HOLIDAY_CATEGORIES_VI[category.id].title));
    for (const holiday of HOLIDAYS_EN.filter((item) => item.category === category.id)) {
      assert.match(section, re(`href="/${holiday.slug}?lang=vi"`));
    }
  }
  const config = JSON.parse(hub.match(/<script id="holiday-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(config.i18n.locale, 'vi-VN', 'cards refresh with Vietnamese day labels');
  assert.doesNotMatch(hub, /data-hc-card-days>\d+ days?</);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/countdowns\?lang=vi<\/loc>/);
  assert.match(read('vi/countdowns.html'), /content="0;url=\/countdowns\?lang=vi"/, 'legacy hub URL redirects');
});

// Menu "More / Xem thêm": mọi trang đều có lối tắt tới toàn bộ danh mục, mục đầu tiên quay về trang tất cả.
const enHref = (slug) => `/${slug}`;
const viHref = (slug) => `/${slug}?lang=vi`;
const MENU_PAGES = [
  ...HOLIDAYS_EN.map((holiday) => ({ file: `${holiday.slug}.html`, lang: 'en', href: enHref, label: 'More', all: 'All countdowns', current: enHref(holiday.slug) })),
  { file: 'countdowns.html', lang: 'en', href: enHref, label: 'More', all: 'All countdowns', current: '/countdowns' },
  ...HOLIDAYS_EN.map((holiday) => ({ file: `${holiday.slug}.html`, lang: 'vi', href: viHref, label: UI_VI.more, all: UI_VI.allCountdowns, current: viHref(holiday.slug) })),
  { file: 'countdowns.html', lang: 'vi', href: viHref, label: UI_VI.more, all: UI_VI.allCountdowns, current: viHref('countdowns') },
];

for (const { file, lang, href, label, all, current } of MENU_PAGES) {
  test(`${file}${lang === 'en' ? '' : `?lang=${lang}`} header has a "${label}" menu with every category and an "all" link`, () => {
    const html = lang === 'en' ? read(file) : langVariant(file, lang).body;
    const header = html.slice(html.indexOf('<header class="hc-header">'), html.indexOf('</header>'));
    const menu = header.slice(header.indexOf('<details class="hc-menu" data-hc-menu>'));
    assert.ok(menu.startsWith('<details'), 'menu present');
    assert.ok(header.indexOf('</nav>') < header.indexOf('<details'), 'menu sits outside the scrolling nav');
    assert.match(menu, new RegExp(`<summary class="hc-menu-toggle">${label} <svg`));
    const firstLink = menu.match(/<a [^>]*href="([^"]+)"[^>]*>([^<]+)</);
    assert.equal(firstLink[1], href('countdowns'), 'first item returns to the all-countdowns page');
    assert.equal(firstLink[2].trim(), all);
    for (const holiday of HOLIDAYS_EN) assert.ok(menu.includes(`href="${href(holiday.slug)}"`), `${holiday.slug} in menu`);
    assert.equal((menu.match(/class="hc-menu-title"/g) || []).length, HOLIDAY_CATEGORIES.length);
    assert.match(menu, re(`href="${current}" aria-current="page"`));
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

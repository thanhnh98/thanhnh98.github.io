const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { EVENTS_DATA } = require('../data/events-data.js');
const { EVENTS_CONTENT } = require('../data/events-content.js');
const { lunarToSolar } = require('../js/lunar-calendar.js');

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex.match(/[0-9a-f]{2}/gi).map((value) => parseInt(value, 16) / 255);
    const [red, green, blue] = channels.map((value) => (
      value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    ));
    return (0.2126 * red) + (0.7152 * green) + (0.0722 * blue);
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

test('event hero isolates shared header decoration and keeps AA contrast', () => {
  const globalCss = read('css/style.css');
  const eventsCss = read('css/events-page.css');
  assert.match(globalCss, /#header-container > header \{/);
  assert.match(globalCss, /#header-container > header::before \{/);
  assert.match(eventsCss, /\.event-article-hero::before \{ content: none; \}/);
  assert.match(eventsCss, /\.event-article-hero h1 \{ font-size: clamp\(2\.15rem, 4\.4vw, 3\.65rem\); \}/);
  assert.match(eventsCss, /@media \(max-width: 720px\)[\s\S]*?\.event-article-hero h1 \{ font-size: clamp\(2rem, 9vw, 2\.55rem\)/);
  assert.ok(contrastRatio('#681315', '#fff8e7') >= 4.5, 'hero title needs AA contrast');
  assert.ok(contrastRatio('#654b44', '#fff8e7') >= 4.5, 'hero lead needs AA contrast');
  assert.ok(contrastRatio('#ffffff', '#681315') >= 4.5, 'date card text needs AA contrast');
  assert.ok(contrastRatio('#ffe39a', '#681315') >= 4.5, 'date card label needs AA contrast');
});

test('all events expose unique clean slugs and editorial content', () => {
  const events = EVENTS_DATA.getAllEvents();
  assert.equal(events.length, 37);
  assert.equal(new Set(events.map((event) => event.slug)).size, 37);

  for (const event of events) {
    assert.match(event.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const content = EVENTS_CONTENT.getEventContent(event.id);
    assert.ok(content.context.length >= 80, `${event.id} needs a useful context paragraph`);
    assert.ok(content.tip.length >= 50, `${event.id} needs a useful tip`);
    assert.equal(content.activities.length, 3, `${event.id} needs three activity ideas`);
  }
});

test('upcoming occurrence logic rolls passed dates forward in Vietnam time', () => {
  const events = EVENTS_DATA.getUpcomingEvents({ todayKey: '2026-09-04', lunarToSolar });
  assert.equal(events.length, 37);
  assert.equal(events[0].event.id, 'lunar-tet-trung-thu');
  assert.equal(events[0].occurrence.dateKey, '2026-09-25');

  const nationalDay = events.find((item) => item.event.id === 'solar-quoc-khanh-viet-nam');
  assert.equal(nationalDay.occurrence.dateKey, '2027-09-02');
  const tet = events.find((item) => item.event.id === 'lunar-tet-nguyen-dan');
  assert.equal(tet.occurrence.dateKey, '2027-02-06');
  assert.ok(events.every((item) => item.occurrence.dateKey >= '2026-09-04'));
});

test('event hub is static-first, searchable and links every event page', () => {
  const html = read('su-kien-quan-trong.html');
  assert.match(html, /class="events-filter-panel"/);
  assert.match(html, /data-events-search/);
  assert.match(html, /data-events-filter="holiday"/);
  assert.equal((html.match(/data-event-card/g) || []).length, 37);

  for (const event of EVENTS_DATA.getAllEvents()) {
    assert.match(html, new RegExp(`href="/su-kien/${event.slug}/"`));
  }

  const schemas = jsonLd(html).flatMap((item) => item['@graph'] || [item]);
  assert.ok(schemas.some((item) => item['@type'] === 'CollectionPage'));
  assert.ok(schemas.some((item) => item['@type'] === 'ItemList'));
  assert.ok(schemas.some((item) => item['@type'] === 'BreadcrumbList'));
  assert.ok(!schemas.some((item) => item['@type'] === 'Event'));

  const localRouteHtml = read('su-kien-quan-trong/index.html');
  assert.match(localRouteHtml, /<h1>Lịch sự kiện sắp tới<\/h1>/);
  assert.match(localRouteHtml, /<meta name="robots" content="noindex, follow, max-image-preview:large">/);
  assert.match(localRouteHtml, /<link rel="canonical" href="https:\/\/saptet\.vn\/su-kien-quan-trong\.html">/);
});

test('all 37 event pages are indexable, self-canonical articles', () => {
  for (const event of EVENTS_DATA.getAllEvents()) {
    const file = `su-kien/${event.slug}/index.html`;
    assert.ok(fs.existsSync(path.join(root, file)), `missing ${file}`);
    const html = read(file);
    const canonical = `https://saptet.vn/su-kien/${event.slug}/`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large">/);
    assert.match(html, /<link rel="stylesheet" href="\/css\/events-page\.css\?v=[a-f0-9]{16}">/);
    assert.doesNotMatch(html, /\{\{ASSET_VERSION\}\}/);
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.ok((html.match(/<details>/g) || []).length >= 3);

    const schemas = jsonLd(html).flatMap((item) => item['@graph'] || [item]);
    assert.ok(schemas.some((item) => item['@type'] === 'Article'));
    assert.ok(schemas.some((item) => item['@type'] === 'BreadcrumbList'));
    assert.ok(!schemas.some((item) => item['@type'] === 'Event'));
  }
});

test('sitemap includes clean event URLs and drops generic detail utility', () => {
  const sitemap = read('sitemap.xml');
  assert.doesNotMatch(sitemap, /https:\/\/saptet\.vn\/chi-tiet-su-kien\.html/);
  assert.equal((sitemap.match(/<loc>https:\/\/saptet\.vn\/su-kien\//g) || []).length, 37);
  for (const event of EVENTS_DATA.getAllEvents()) {
    const canonical = `https://saptet.vn/su-kien/${event.slug}/`;
    const html = read(`su-kien/${event.slug}/index.html`);
    const article = jsonLd(html).flatMap((item) => item['@graph'] || [item])
      .find((item) => item['@type'] === 'Article');
    assert.ok(article && article.dateModified, `${event.slug} needs Article dateModified`);
    assert.match(sitemap, new RegExp(`<loc>${canonical}<\\/loc>\\s*<lastmod>${article.dateModified}<\\/lastmod>`));
  }
  assert.match(read('chi-tiet-su-kien.html'), /<meta name="robots" content="noindex, follow">/);
  assert.match(read('lich-van-nien.html'), /'\/su-kien\/' \+ encodeURIComponent\(x\.slug\)/);
});

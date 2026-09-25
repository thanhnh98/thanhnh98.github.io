const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { HOLIDAYS_AR, UI_AR } = require('../data/holidays-ar.js');
const { HOLIDAYS_EN } = require('../data/holidays-en.js');

const decode = (text) => text.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const ARABIC = /[؀-ۿ]/;

function graphOf(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()))
    .flatMap((schema) => schema['@graph'] || [schema]);
}

test('Arabic data only covers existing holidays and is complete', () => {
  const slugs = new Set(HOLIDAYS_EN.map((holiday) => holiday.slug));
  for (const [slug, ar] of Object.entries(HOLIDAYS_AR)) {
    assert.ok(slugs.has(slug), `unknown slug ${slug}`);
    for (const key of ['name', 'title', 'h1', 'description', 'answer', 'dateNote', 'tagline', 'liveTitle', 'liveText']) {
      assert.match(ar[key], ARABIC, `${slug}.${key} should be Arabic`);
    }
    assert.ok(ar.about.length >= 2 && ar.traditions.length >= 3 && ar.faq.length >= 2 && ar.regions.length >= 3, slug);
    assert.match(ar.wikipedia, /^https:\/\/ar\.wikipedia\.org\/wiki\//);
  }
  // Tiếng Ả Rập có 6 dạng số nhiều; thiếu dạng nào sẽ hiển thị sai ngữ pháp.
  for (const form of ['zero', 'one', 'two', 'few', 'many', 'other']) assert.ok(UI_AR.dayForms[form], form);
});

for (const [slug, ar] of Object.entries(HOLIDAYS_AR)) {
  const file = `ar/${slug}.html`;

  test(`${file} is an indexable right-to-left Arabic page`, () => {
    const html = read(file);
    const canonical = `https://saptet.vn/ar/${slug}`;
    assert.match(html, /<html lang="ar" dir="rtl">/);
    assert.match(html, /<body class="hc-page hc-page--rtl">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large">/);
    assert.match(html, /<meta property="og:locale" content="ar_AR">/);
    assert.match(html, /family=Noto\+Sans\+Arabic/);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/);

    const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
    assert.match(title, ARABIC);
    assert.ok(title.length <= 60, `title length ${title.length}`);
    assert.ok(description.length >= 100 && description.length <= 160, `description length ${description.length}`);
    assert.ok(title.includes(ar.name));

    // Không để sót nhãn tiếng Anh trong giao diện.
    for (const english of ['>Days<', '>Hours<', '>Minutes<', '>Seconds<', 'Share Countdown', 'Frequently Asked Questions', 'More Countdowns']) {
      assert.ok(!html.includes(english), `leftover English: ${english}`);
    }
    for (const unit of Object.values(UI_AR.units)) assert.ok(html.includes(`<span>${unit}</span>`), unit);

    // Ngày Hijri (Umm al-Qura) phải khớp tháng của sự kiện.
    const hijri = html.match(/data-hc-hijri>([^<]+)</)[1];
    assert.match(hijri, slug === 'ramadan' ? /^1 رمضان \d{4} هـ$/ : /^1 شوال \d{4} هـ$/);
    assert.match(html, /رؤية هلال/, 'moon-sighting disclaimer');

    const config = JSON.parse(html.match(/<script id="holiday-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(config.i18n.locale, 'ar-u-nu-latn');
    assert.equal(config.name, ar.name);
  });

  test(`${file} and its English page reference each other with hreflang`, () => {
    const arabic = read(file);
    const english = read(`${slug}.html`);
    for (const html of [arabic, english]) {
      assert.match(html, new RegExp(`hreflang="en" href="https://saptet.vn/${slug}"`));
      assert.match(html, new RegExp(`hreflang="ar" href="https://saptet.vn/ar/${slug}"`));
      assert.match(html, new RegExp(`hreflang="x-default" href="https://saptet.vn/${slug}"`));
    }
    assert.match(english, new RegExp(`<a href="/ar/${slug}" hreflang="ar" lang="ar">العربية</a>`));
    assert.match(arabic, new RegExp(`<a href="/${slug}" hreflang="en" lang="en">English</a>`));
  });

  test(`${file} has Arabic structured data, share image and sitemap entry`, () => {
    const html = read(file);
    const graph = graphOf(html);
    const page = graph.find((node) => node['@type'] === 'WebPage');
    assert.equal(page.inLanguage, 'ar');
    assert.equal(page.about.name, ar.name);
    assert.ok(page.about.alternateName.includes(HOLIDAYS_EN.find((h) => h.slug === slug).name));
    assert.ok(!graph.some((node) => node['@type'] === 'Event'));

    const faq = graph.find((node) => node['@type'] === 'FAQPage');
    const visible = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => decode(match[1]));
    assert.deepEqual(faq.mainEntity.map((entry) => entry.name), visible);

    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)[1];
    assert.equal(ogImage, `https://saptet.vn/assets/images/og/ar-${slug}.jpg`);
    assert.ok(fs.existsSync(path.join(root, `assets/images/og/ar-${slug}.jpg`)));
    assert.match(read('sitemap.xml'), new RegExp(`<loc>https://saptet.vn/ar/${slug}</loc>`));
  });
}

test('countdown stylesheet uses logical properties so RTL pages mirror correctly', () => {
  const css = read('css/holiday-countdown.css');
  assert.doesNotMatch(css, /(margin|padding|border)-(left|right)\s*:/);
  assert.doesNotMatch(css, /text-align:\s*(left|right)/);
  assert.match(css, /\.hc-page--rtl \*, [^{]+\{ letter-spacing: 0 !important; \}/, 'Arabic letters must not be spaced apart');
});

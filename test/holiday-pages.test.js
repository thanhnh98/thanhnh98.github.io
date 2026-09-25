const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const { HOLIDAYS_EN } = require('../data/holidays-en.js');
const { resolveDates, easterSunday, nthWeekday } = require('../scripts/generate-holiday-pages.js');

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()));
}

function nodes(schema) {
  return schema['@graph'] || [schema];
}

test('holiday data is complete and internally consistent', () => {
  const slugs = new Set(HOLIDAYS_EN.map((holiday) => holiday.slug));
  assert.equal(slugs.size, HOLIDAYS_EN.length, 'slugs must be unique');
  for (const holiday of HOLIDAYS_EN) {
    assert.match(holiday.slug, /^[a-z0-9-]+$/);
    assert.ok(['global', 'national'].includes(holiday.scope), holiday.slug);
    if (holiday.scope === 'national') {
      assert.ok(holiday.zone && holiday.zoneLabel, `${holiday.slug} needs zone + zoneLabel`);
      assert.doesNotThrow(() => new Intl.DateTimeFormat('en-US', { timeZone: holiday.zone }));
    }
    assert.match(holiday.startTime, /^\d{2}:\d{2}$/);
    assert.ok(holiday.about.length >= 2 && holiday.traditions.length >= 3 && holiday.faq.length >= 2, holiday.slug);
    for (const slug of holiday.related) assert.ok(slugs.has(slug), `${holiday.slug} → unknown related ${slug}`);
    if (holiday.moonDisclaimer) assert.match(holiday.dateNote, /moon/i);
  }
});

test('date tables still have at least two future dates', () => {
  const today = new Date().toISOString().slice(0, 10);
  for (const holiday of HOLIDAYS_EN.filter((item) => item.rule.type === 'table')) {
    const future = holiday.rule.dates.filter((key) => key >= today);
    assert.ok(future.length >= 2, `${holiday.slug}: extend the date table in data/holidays-en.js`);
  }
});

test('rule-based dates are computed correctly', () => {
  assert.equal(easterSunday(2027), '2027-03-28');
  assert.equal(easterSunday(2028), '2028-04-16');
  assert.equal(easterSunday(2030), '2030-04-21');
  assert.equal(nthWeekday(2026, 11, 4, 4), '2026-11-26');
  assert.equal(nthWeekday(2027, 11, 4, 4), '2027-11-25');
  const christmas = HOLIDAYS_EN.find((holiday) => holiday.slug === 'christmas');
  assert.ok(resolveDates(christmas, 2026).includes('2031-12-25'));
});

for (const holiday of HOLIDAYS_EN) {
  test(`${holiday.slug}.html is an indexable English countdown page`, () => {
    const html = read(`${holiday.slug}.html`);
    const canonical = `https://saptet.vn/${holiday.slug}`;
    assert.match(html, /<html lang="en">/);
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}">`));
    assert.match(html, /<meta name="robots" content="index, follow, max-image-preview:large">/);
    assert.match(html, /<meta property="og:locale" content="en_US">/);
    assert.match(html, new RegExp(`<title>${holiday.name.replace(/'/g, '&#39;')} Countdown \\d{4}: How Many Days`));
    assert.match(html, /data-hc-unit="seconds"/);
    // Hero chỉ dành cho đếm ngược; nội dung SEO nằm ở các section bên dưới.
    const hero = html.slice(html.indexOf('<section class="hc-hero"'), html.indexOf('<section class="hc-section" id="details">'));
    assert.match(hero, /class="hc-timer"/);
    assert.match(hero, /data-hc-share/);
    assert.doesNotMatch(hero, /<details>|hc-faq|About \w+<\/h2>/);
    assert.match(html, /Sắp Tết is the Lunar New Year countdown app followed by more than 100,000 people across Vietnam\./);
    assert.doesNotMatch(html, /70,000/);
    assert.match(html, /js\/zoned-time\.js/);
    assert.match(html, /js\/holiday-countdown\.js/);
    assert.doesNotMatch(html, /\{\{[A-Z_]+\}\}/, 'no unreplaced template tokens');

    const config = JSON.parse(html.match(/<script id="holiday-config" type="application\/json">([\s\S]*?)<\/script>/)[1]);
    assert.equal(config.slug, holiday.slug);
    assert.equal(config.scope, holiday.scope);
    assert.ok(config.dates.length >= 2);

    const graph = jsonLd(html).flatMap(nodes);
    const types = graph.map((node) => node['@type']);
    assert.ok(types.includes('WebPage') && types.includes('FAQPage') && types.includes('BreadcrumbList'));
    assert.ok(!types.includes('Event'), 'countdown pages must not use Event schema');
    const faq = graph.find((node) => node['@type'] === 'FAQPage');
    const visibleQuestions = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => match[1].replace(/&#39;/g, '\''));
    assert.deepEqual(faq.mainEntity.map((entry) => entry.name), visibleQuestions, 'FAQ schema matches visible FAQ');

    if (holiday.scope === 'global') assert.match(html, /<select data-hc-zone /);
    else assert.doesNotMatch(html, /data-hc-zone/);
    if (holiday.moonDisclaimer) {
      assert.match(html, /sighting of the crescent moon/);
      assert.match(hero, /data-hc-date>[^<]*\(expected\)</);
      assert.equal(config.expected, true);
    }
  });
}

test('hub lists every holiday and every page is in the sitemap', () => {
  const hub = read('countdowns.html');
  const sitemap = read('sitemap.xml');
  assert.match(hub, /<link rel="canonical" href="https:\/\/saptet\.vn\/countdowns">/);
  assert.match(sitemap, /<loc>https:\/\/saptet\.vn\/countdowns<\/loc>/);
  for (const holiday of HOLIDAYS_EN) {
    assert.match(hub, new RegExp(`href="/${holiday.slug}"`));
    assert.match(sitemap, new RegExp(`<loc>https://saptet\\.vn/${holiday.slug}</loc>`));
  }
  assert.equal((sitemap.match(/<!-- Holiday countdown pages \(EN\) -->/g) || []).length, 1);
});

test('Christmas and Noel pages point at each other with hreflang', () => {
  const christmas = read('christmas.html');
  const noel = read('noel.html');
  for (const html of [christmas, noel]) {
    assert.match(html, /hreflang="en" href="https:\/\/saptet\.vn\/christmas"/);
    assert.match(html, /hreflang="vi" href="https:\/\/saptet\.vn\/noel\.html"/);
    assert.match(html, /hreflang="x-default" href="https:\/\/saptet\.vn\/christmas"/);
  }
});

test('hub groups every holiday under a known category section', () => {
  const { HOLIDAY_CATEGORIES } = require('../data/holidays-en.js');
  const hub = read('countdowns.html');
  const ids = HOLIDAY_CATEGORIES.map((category) => category.id);
  for (const holiday of HOLIDAYS_EN) assert.ok(ids.includes(holiday.category), `${holiday.slug}: unknown category`);
  for (const category of HOLIDAY_CATEGORIES) {
    assert.match(hub, new RegExp(`<section class="hc-section hc-category" id="${category.id}"`));
    assert.match(hub, new RegExp(`<a href="#${category.id}">`));
    const section = hub.split(`id="${category.id}"`)[1].split('</section>')[0];
    for (const holiday of HOLIDAYS_EN.filter((item) => item.category === category.id)) {
      assert.match(section, new RegExp(`href="/${holiday.slug}"`), `${holiday.slug} missing from ${category.id}`);
    }
  }
});

test('Vietnamese header links to the countdown hub from the "Thêm" menu', () => {
  const header = read('components/header.html');
  const secondary = header.split('id="nav-secondary-menu"')[1];
  assert.match(secondary, /<a href="\/countdowns" data-page="countdowns" hreflang="en">/);
  assert.match(secondary, /Đếm Ngược Thế Giới/);
});

function decode(text) {
  return text.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
}

for (const file of [...HOLIDAYS_EN.map((holiday) => `${holiday.slug}.html`), 'countdowns.html']) {
  test(`${file} meets the international SEO checklist`, () => {
    const html = read(file);
    const slug = file.replace(/\.html$/, '');
    const canonical = `https://saptet.vn/${slug}`;

    const title = decode(html.match(/<title>([^<]+)<\/title>/)[1]);
    const description = decode(html.match(/<meta name="description" content="([^"]+)"/)[1]);
    assert.ok(title.length <= 60, `title too long (${title.length}): ${title}`);
    assert.ok(description.length >= 100 && description.length <= 160, `description length ${description.length}`);

    // Một URL tiếng Anh phục vụ mọi quốc gia: hreflang en + x-default tự trỏ, og:locale có biến thể.
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="en" href="${canonical}">`));
    assert.match(html, new RegExp(`<link rel="alternate" hreflang="x-default" href="${canonical}">`));
    for (const locale of ['en_GB', 'en_CA', 'en_AU', 'en_IN']) {
      assert.match(html, new RegExp(`<meta property="og:locale:alternate" content="${locale}">`));
    }

    // Ảnh chia sẻ riêng, đúng kích thước, có sẵn trong repo.
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)[1];
    assert.equal(ogImage, `https://saptet.vn/assets/images/og/${slug}.jpg`);
    assert.ok(fs.existsSync(path.join(root, `assets/images/og/${slug}.jpg`)), `missing ${ogImage}`);
    assert.match(html, /<meta property="og:image:width" content="1200">/);
    assert.match(html, /<meta property="og:image:height" content="630">/);
    assert.match(html, /<meta property="og:image:alt" content="[^"]+">/);
    assert.match(html, new RegExp(`<meta name="twitter:image" content="${ogImage}">`));

    const graph = jsonLd(html).flatMap(nodes);
    const page = graph.find((node) => ['WebPage', 'CollectionPage'].includes(node['@type']));
    assert.equal(page.inLanguage, 'en');
    assert.match(page.datePublished, /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(page.publisher['@id'], 'https://saptet.vn/#organization');
    assert.equal(page.primaryImageOfPage.url, ogImage);
    assert.ok(graph.some((node) => node['@type'] === 'Organization' && node.logo));
  });
}

for (const holiday of HOLIDAYS_EN) {
  test(`${holiday.slug}.html covers the holiday across countries`, () => {
    const html = read(`${holiday.slug}.html`);
    const page = jsonLd(html).flatMap(nodes).find((node) => node['@type'] === 'WebPage');
    assert.equal(page.about.name, holiday.name);
    assert.deepEqual(page.about.alternateName, holiday.aliases);
    assert.match(page.about.sameAs, /^https:\/\/en\.wikipedia\.org\/wiki\//);

    assert.match(html, /<nav class="hc-container hc-breadcrumb" aria-label="Breadcrumb">/);
    assert.match(html, /<strong>Also known as:<\/strong>/);
    for (const alias of holiday.aliases) assert.ok(decode(html).includes(alias), `${holiday.slug}: alias ${alias} not visible`);
    assert.ok(holiday.regions.length >= 3, `${holiday.slug}: needs at least 3 regions`);
    for (const region of holiday.regions) {
      assert.ok(decode(html).includes(`<h3>${region.country}</h3>`), `${holiday.slug}: region ${region.country} missing`);
    }
    if (holiday.scope === 'global') {
      assert.match(html, /start around the world\?<\/h3>/);
      assert.ok((html.match(/data-hc-your-time="\d+"/g) || []).length >= 12, 'world time table should list major cities');
    }
  });
}

test('countdown pages use flat palettes, per-holiday motion and respect reduced motion', () => {
  const css = read('css/holiday-countdown.css');
  // Không pha gradient màu: chỉ cho phép gradient hai tông có điểm dừng cứng của ô đồng hồ.
  const gradients = css.match(/(?:linear|radial|conic)-gradient\([^;]+/g) || [];
  assert.deepEqual(gradients.filter((g) => !/50%, var\(--hc-ink\) 50%/.test(g)), [], 'no blended gradients');
  assert.doesNotMatch(css, /background-clip:\s*text/, 'no gradient text');
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.hc-sky \{ display: none; \}/);

  const kinds = new Set();
  for (const holiday of HOLIDAYS_EN) {
    const html = read(`${holiday.slug}.html`);
    for (const key of ['paper', 'ink', 'accent', 'particle']) assert.match(holiday.palette[key], /^#[0-9a-f]{6}$/i, `${holiday.slug}.${key}`);
    assert.ok(html.includes(`--hc-paper:${holiday.palette.paper}`), `${holiday.slug}: palette not applied`);
    assert.match(html, new RegExp(`<div class="hc-sky hc-sky--${holiday.particles} [^"]+" aria-hidden="true" data-hc-sky>`));
    assert.ok((html.match(/class="hc-p"/g) || []).length >= 6, `${holiday.slug}: too few particles`);
    assert.doesNotMatch(html, /hc-kicker-emoji|hc-mini-emoji/, 'no emoji decoration in the UI');
    kinds.add(holiday.particles);
  }
  assert.ok(kinds.size >= 8, 'holidays should not all share the same motion');
});

test('palette text colors meet WCAG AA contrast on paper and surface backgrounds', () => {
  const channels = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const luminance = (hex) => {
    const [r, g, b] = channels(hex).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (a, b) => {
    const [x, y] = [luminance(a), luminance(b)];
    return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
  };
  const mix = (a, b, t) => `#${channels(a).map((v, i) => Math.round((v * t + channels(b)[i] * (1 - t)) * 255).toString(16).padStart(2, '0')).join('')}`;
  for (const { slug, palette } of HOLIDAYS_EN) {
    const surface = mix(palette.paper, '#ffffff', 0.35); // khớp --hc-surface trong CSS
    for (const [label, fg, bg] of [
      ['accent/paper', palette.accent, palette.paper],
      ['accent/surface', palette.accent, surface],
      ['ink/paper', palette.ink, palette.paper],
      ['paper/ink (timer digits)', palette.paper, palette.ink],
    ]) {
      assert.ok(contrast(fg, bg) >= 4.5, `${slug} ${label} contrast ${contrast(fg, bg).toFixed(2)} < 4.5`);
    }
  }
});

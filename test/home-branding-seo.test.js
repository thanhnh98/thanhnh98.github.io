const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function getJsonLdObjects(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()));
}

test('homepage hero is visual-first with compact subline in countdown card', () => {
  const html = read('index.html');

  assert.match(
    html,
    /<title>(\{\{SEO_TITLE\}\}|Sắp Tết 2027 – Đếm Ngược Tết Nguyên Đán)<\/title>/
  );
  assert.match(html, /class="countdown-hero-title"/);
  assert.match(html, /Đếm ngược đến Tết <span id="tet-year">/);
  assert.match(html, /class="countdown-hero-subline"/);
  assert.match(html, /class="countdown-detail-cta"/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-tet"/);
  assert.doesNotMatch(html, /class="home-seo-answer"/);
  assert.doesNotMatch(html, /home-seo-answer__snippet/);
});

test('homepage WebSite schema names the brand without generic keyword aliases', () => {
  const html = read('index.html');
  const website = getJsonLdObjects(html).find((item) => item['@type'] === 'WebSite');

  assert.equal(website.name, 'Sắp Tết');
  assert.deepEqual(website.alternateName, [
    'Sắp Tết 2027',
    'Sắp Tết - Đếm ngược Tết',
    'App Sắp Tết',
  ]);
});

test('web app manifest reinforces the same brand entity', () => {
  const manifest = JSON.parse(read('site.webmanifest'));

  assert.equal(manifest.name, 'Sắp Tết - Đếm ngược Tết 2027');
  assert.equal(manifest.short_name, 'Sắp Tết');
});

test('intent landing page has self-canonical, FAQ visible and FAQPage schema', () => {
  const html = read('con-bao-nhieu-ngay-nua-den-tet/index.html');
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/saptet\.vn\/con-bao-nhieu-ngay-nua-den-tet">/
  );
  assert.match(html, /<h1[^>]*>Còn bao nhiêu ngày nữa đến Tết 2027\?<\/h1>/);
  assert.match(html, /class="seo-landing-detail"/);
  assert.match(html, /<summary>Còn bao nhiêu ngày nữa đến Tết 2027\?<\/summary>/);
  assert.doesNotMatch(html, /Còn \d+ ngày nữa đến Tết Nguyên Đán 2027\. Tết 2027 rơi vào/);

  const schemas = getJsonLdObjects(html);
  const webpageSchema = schemas.find((item) => item['@type'] === 'WebPage');
  const faqSchema = schemas.find((item) => item['@type'] === 'FAQPage');
  const eventSchemas = schemas.filter((item) => item['@type'] === 'Event');

  assert.equal(eventSchemas.length, 0);
  assert.ok(webpageSchema);
  assert.ok(faqSchema);
  assert.equal(faqSchema.mainEntity.length, 5);

  const firstFaqAnswer = html.match(
    /<summary>Còn bao nhiêu ngày nữa đến Tết 2027\?<\/summary>\s*<p>([^<]+)<\/p>/
  )?.[1];
  assert.equal(faqSchema.mainEntity[0].acceptedAnswer.text, firstFaqAnswer);
});

test('homepage title and meta use brand-first copy from inject payload', () => {
  const { buildTetSeoPayload } = require('../scripts/lib/tet-seo-dates');
  const payload = buildTetSeoPayload(new Date('2026-05-19T12:00:00+07:00'));

  assert.equal(payload.titleHome, 'Sắp Tết 2027 – Đếm Ngược Tết Nguyên Đán');
  assert.match(payload.metaDescriptionHome, /Đếm ngược Tết Nguyên Đán 2027 theo giờ Việt Nam/);
  assert.match(payload.landingDetailLine, /Tết Nguyên Đán 2027 rơi vào/);
  assert.doesNotMatch(payload.landingDetailLine, /Còn \d+ ngày/);
});

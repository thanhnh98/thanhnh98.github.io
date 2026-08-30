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

test('homepage hero is compact, branded and links to the countdown intent page', () => {
  const html = read('index.html');

  assert.match(
    html,
    /<title>(\{\{SEO_TITLE\}\}|Sắp Tết 2027 – Đếm Ngược Tết Nguyên Đán)<\/title>/
  );
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /class="countdown-hero-title"/);
  assert.match(html, /Đếm ngược đến Tết <span id="tet-year">/);
  assert.match(html, /class="countdown-info-card"/);
  assert.match(html, /class="timer-box"/);
  assert.match(html, /id="countdown-timer"/);
  assert.match(html, /id="share-countdown-btn"/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-tet"/);
  assert.doesNotMatch(html, /class="countdown-detail-cta"/);
});

test('homepage keeps sharing below the full-screen hero greeting', () => {
  const html = read('index.html');
  const css = read('css/home-retention.css');
  const heroStart = html.indexOf('<section id="countdown"');
  const heroEnd = html.indexOf('</section>', heroStart);
  const greeting = html.indexOf('class="tet-greeting"', heroStart);
  const shareButton = html.indexOf('id="share-countdown-btn"');
  const todaySection = html.indexOf('<section id="hom-nay"');

  assert.ok(heroStart >= 0 && greeting > heroStart && greeting < heroEnd);
  assert.ok(shareButton > heroEnd && shareButton < todaySection);
  assert.match(css, /#countdown-timer \.timer-box[\s\S]*?min-height:\s*clamp\(174px,\s*19vw,\s*222px\)/);
  assert.match(css, /\.countdown-content-wrapper[\s\S]*?justify-content:\s*space-between/);
  assert.match(css, /@media \(max-width:\s*560px\)[\s\S]*?#countdown-timer[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.countdown-content-wrapper\s*\{\s*padding:\s*0\.65rem 0\.25rem/);
});

test('homepage stays compact with six focused content sections', () => {
  const html = read('index.html');
  const primarySections = [...html.matchAll(/<section\b[^>]*data-home-section="[^"]+"/g)];

  assert.equal(primarySections.length, 6);
  assert.match(html, /data-home-section="hero"/);
  assert.match(html, /data-home-section="today"/);
  assert.match(html, /data-home-section="quick-links"/);
  assert.match(html, /data-home-section="app"/);
  assert.match(html, /data-home-section="discovery"/);
  assert.match(html, /data-home-section="seo"/);
  assert.doesNotMatch(html, /id="calendar-grid"|id="events-carousel"|id="games-carousel"/);
  assert.doesNotMatch(html, /id="smart-app-download-fab"|id="app-download"/);
});

test('homepage keeps three crawlable FAQs and useful internal links', () => {
  const html = read('index.html');

  assert.equal((html.match(/<details\b[^>]*class="home-faq-item"/g) || []).length, 3);
  assert.match(html, /href="\/lich-am-hom-nay\.html"/);
  assert.match(html, /href="\/loi-chuc-tet\.html"/);
  assert.match(html, /href="\/may-tinh-li-xi\.html"/);
  assert.match(html, /href="\/tro-choi-tet\.html"/);
  assert.match(html, /href="\/su-kien-quan-trong\.html"/);
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
  assert.equal(manifest.shortcuts.find((item) => item.short_name === 'Lịch').url, '/lich-am-hom-nay.html');
});

test('intent landing page has self-canonical, FAQ visible and FAQPage schema', () => {
  const html = read('con-bao-nhieu-ngay-nua-den-tet/index.html');
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/saptet\.vn\/con-bao-nhieu-ngay-nua-den-tet">/
  );
  assert.match(
    html,
    /<h1[^>]*>Còn bao nhiêu ngày nữa đến <span class="intent-h1-accent">Tết 2027<\/span>\?<\/h1>/
  );
  assert.match(html, /class="[^"]*\bseo-landing-detail\b[^"]*"/);
  assert.match(html, /Nhiều điều thú vị có tại ứng dụng Sắp Tết/);
  assert.match(html, /href="\/ung-dung\.html"/);
  assert.match(html, /<summary>Còn bao nhiêu ngày nữa đến Tết 2027\?<\/summary>/);
  assert.match(html, /data-seo="faq-days-answer"/);
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
    /data-seo="faq-days-answer"[^>]*>([^<]+)</
  )?.[1];
  assert.equal(faqSchema.mainEntity[0].name, 'Còn bao nhiêu ngày nữa đến Tết 2027?');
  assert.match(faqSchema.mainEntity[0].acceptedAnswer.text, /ngày, giờ, phút và giây/);
  assert.ok(firstFaqAnswer && firstFaqAnswer.includes('ngày'));
});

test('loi chuc tet page is indexable and supports the wishes CTA', () => {
  const html = read('loi-chuc-tet.html');
  const header = read('components/header.html');
  const loader = read('js/header-loader.js');
  const sitemap = read('sitemap.xml');

  assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/loi-chuc-tet\.html">/);
  assert.match(html, /<h1>Lời chúc Tết 2027 hay, ngắn gọn và ý nghĩa<\/h1>/);
  assert.match(html, /class="copy-wish-btn"/);
  assert.match(header, /href="\/loi-chuc-tet\.html" data-page="loi-chuc"/);
  assert.match(loader, /filename === 'loi-chuc-tet\.html'/);
  assert.match(sitemap, /https:\/\/saptet\.vn\/loi-chuc-tet\.html/);
});

test('tro choi tet page uses the compact game-first experience', () => {
  const html = read('tro-choi-tet.html');
  const css = read('css/game.css');

  assert.match(html, /class="game-intro"/);
  assert.match(html, /<h1 id="game-title">Nối Chữ<\/h1>/);
  assert.match(html, /id="start-game" class="primary-game-button"/);
  assert.match(html, /class="game-hud"/);
  assert.match(css, /Nối Chữ — compact, game-first layout/);
  assert.match(css, /\.game-hud\s*\{[\s\S]*grid-template-columns:\s*repeat\(4,/);
});

test('homepage title and meta use brand-first copy from inject payload', () => {
  const { buildTetSeoPayload } = require('../scripts/lib/tet-seo-dates');
  const payload = buildTetSeoPayload(new Date('2026-05-19T12:00:00+07:00'));

  assert.equal(payload.titleHome, 'Sắp Tết 2027 – Đếm Ngược Tết Nguyên Đán');
  assert.match(payload.metaDescriptionHome, /Đếm ngược Tết Nguyên Đán 2027 theo giờ Việt Nam/);
  assert.match(payload.landingDetailLine, /Tết Nguyên Đán 2027 rơi vào/);
  assert.doesNotMatch(payload.landingDetailLine, /Còn \d+ ngày/);
});

test('homepage prioritizes one screenshot-led app showcase with one floating entry point', () => {
  const html = read('index.html');

  assert.equal((html.match(/class="home-app-showcase"/g) || []).length, 1);
  assert.equal((html.match(/class="home-phone-preview /g) || []).length, 3);
  assert.match(html, /data-home-app-download="android"/);
  assert.match(html, /data-home-app-download="ios"/);
  assert.equal((html.match(/data-home-floating-app/g) || []).length, 1);
  assert.match(html, /class="home-floating-app-cta"[^>]+href="#app-intro"/);
  assert.match(html, /href="\/ung-dung\.html"/);
  assert.doesNotMatch(html, /smart-app-download-fab|app-intro-section|app-download-seo-section/);
});

test('homepage only uses the three relevant JSON-LD entity types', () => {
  const html = read('index.html');
  const schemas = getJsonLdObjects(html);

  assert.deepEqual(schemas.map((item) => item['@type']).sort(), ['Organization', 'WebPage', 'WebSite']);
  assert.doesNotMatch(html, /aggregateRating|"@type"\s*:\s*"Food"|"@type"\s*:\s*"Thing"/);
});

test('homepage lazily loads optimized app demos and does not eagerly load html2canvas', () => {
  const html = read('index.html');

  assert.doesNotMatch(html, /image-b277c8ee|image-3cecc9f2|image-20046f91/);
  assert.equal((html.match(/assets\/images\/app-demo-[^" ]+\.webp/g) || []).length, 3);
  assert.equal((html.match(/class="home-phone-preview[^>]+>[\s\S]*?loading="lazy"/g) || []).length, 3);
  assert.doesNotMatch(html, /<script[^>]+src="[^"]*html2canvas/i);
  assert.match(html, /js\/home-retention\.js/);
});

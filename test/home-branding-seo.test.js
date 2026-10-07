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

test('homepage hero leads with the highest-impression countdown question', () => {
  const html = read('index.html');

  assert.match(html, /<title>Còn Bao Nhiêu Ngày Nữa Đến Tết 2027\? \| Sắp Tết<\/title>/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /class="countdown-hero-title"/);
  assert.match(html, /Còn bao nhiêu ngày nữa đến Tết <span id="tet-year">2027<\/span>\?/);
  assert.match(html, /Đếm ngược Tết Nguyên Đán Đinh Mùi/);
  assert.match(html, /class="countdown-info-card"/);
  assert.match(html, /class="timer-box"/);
  assert.match(html, /id="countdown-timer"/);
  assert.match(html, /id="share-countdown-btn"/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-tet\/"/);
  assert.doesNotMatch(html, /class="countdown-detail-cta"/);
});

test('homepage restores a full viewport mobile countdown with reserved bottom space', () => {
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
  assert.doesNotMatch(html, /class="home-hero-app-promo"/);
  assert.match(read('js/header-loader.js'), /className = 'home-header-app'/);
  assert.match(css, /@media \(max-width:\s*560px\)[\s\S]*?#countdown-timer[\s\S]*?grid-template-columns:\s*repeat\(2,/);
  assert.match(css, /@media \(max-width:\s*768px\)[\s\S]*?\.countdown-section\s*\{[^}]*height:\s*calc\(100svh - 66px\)/);
});

test('homepage stays compact with seven focused content sections', () => {
  const html = read('index.html');
  const primarySections = [...html.matchAll(/<section\b[^>]*data-home-section="[^"]+"/g)];

  assert.equal(primarySections.length, 7);
  assert.match(html, /data-home-section="hero"/);
  assert.match(html, /data-home-section="today"/);
  assert.match(html, /data-home-section="game"/);
  assert.match(html, /href="\/ngua-phi-don-tet\.html"/);
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
  assert.match(html, /href="\/ngua-phi-don-tet\.html"/);
  assert.match(html, /href="\/su-kien-quan-trong\.html"/);
  assert.match(html, /href="\/tet-2027-la-ngay-nao\/"[^>]*>Tết 2027 là ngày nào\?/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-giao-thua\/"[^>]*>đếm ngược giao thừa 2027/);
});

test('giao thua landing links back to the homepage and two sibling intents', () => {
  const html = read('con-bao-nhieu-ngay-nua-den-giao-thua/index.html');
  const clusterLinks = [
    '/con-bao-nhieu-ngay-nua-den-tet/',
    '/tet-2027-la-ngay-nao/',
  ];

  assert.match(html, /href="\/"[^>]*>Trang chủ Sắp Tết<\/a>/);
  for (const href of clusterLinks) assert.match(html, new RegExp(`href="${href}"`));
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
    /<link rel="canonical" href="https:\/\/saptet\.vn\/con-bao-nhieu-ngay-nua-den-tet\/">/
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

test('Tet date landing answers the date intent with a timeline and matching FAQ schema', () => {
  const html = read('tet-2027-la-ngay-nao/index.html');
  const schemas = getJsonLdObjects(html);
  const faq = schemas.find((item) => item['@type'] === 'FAQPage');

  assert.match(html, /<title>Tết 2027 Là Ngày Nào\? Mùng 1, Giao Thừa &amp; Lịch Tết<\/title>/);
  assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/tet-2027-la-ngay-nao\/">/);
  for (const date of ['30/01/2027', '05/02/2027', '06/02/2027', '07/02/2027', '08/02/2027']) {
    assert.match(html, new RegExp(date.replaceAll('/', '\\/')));
  }
  assert.equal((html.match(/<details\b[^>]*class="intent-faq-item"/g) || []).length, 3);
  assert.ok(faq);
  assert.equal(faq.mainEntity.length, 3);
  assert.match(html, /href="\/"[^>]*>Trang chủ<\/a>/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-tet\/"/);
  assert.match(html, /href="\/con-bao-nhieu-ngay-nua-den-giao-thua\/"/);
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

test('tro choi tet page is a two-game hub', () => {
  const html = read('tro-choi-tet.html');
  const css = read('css/games-hub.css');

  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/data-game-card=/g) || []).length, 2);
  assert.match(html, /class="games-hub-grid"/);
  assert.match(html, /href="\/ngua-phi-don-tet\.html"/);
  assert.match(html, /href="\/noi-chu\.html"/);
  assert.match(html, /horse-mascot\.webp/);
  assert.match(html, /"@type":"CollectionPage"/);
  assert.match(css, /grid-template-columns:\s*repeat\(2,/);
});

test('homepage title and meta answer the highest-impression query', () => {
  const { buildTetSeoPayload } = require('../scripts/lib/tet-seo-dates');
  const payload = buildTetSeoPayload(new Date('2026-05-19T12:00:00+07:00'));

  assert.equal(payload.titleHome, 'Còn Bao Nhiêu Ngày Nữa Đến Tết 2027? | Sắp Tết');
  assert.equal(
    payload.metaDescriptionHome,
    `Còn ${payload.daysUntilTet} ngày nữa đến Tết Nguyên Đán 2027, vào Thứ Bảy 06/02/2027. Xem đồng hồ đếm ngược theo giờ Việt Nam và lịch Tết.`
  );
  assert.ok(payload.metaDescriptionHome.length <= 160);
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

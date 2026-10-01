const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const cheerio = require('cheerio');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const summer = require('../js/nghi-he.js');

function atVietnam(value) {
    return new Date(`${value}+07:00`);
}

test('summer countdown uses the 31 May and 5 September boundaries in Vietnam time', () => {
    const before = summer.getSummerBreakState(atVietnam('2027-05-30T23:59:59'));
    assert.equal(before.mode, 'countdown');
    assert.equal(before.targetYear, 2027);
    assert.equal(before.target.toISOString(), '2027-05-30T17:00:00.000Z');

    const atBreak = summer.getSummerBreakState(atVietnam('2027-05-31T00:00:00'));
    assert.deepEqual({ mode: atBreak.mode, target: atBreak.target, targetYear: atBreak.targetYear }, {
        mode: 'summer',
        target: null,
        targetYear: 2027
    });

    assert.equal(summer.getSummerBreakState(atVietnam('2027-07-15T12:00:00')).mode, 'summer');
    assert.equal(summer.getSummerBreakState(atVietnam('2027-09-04T23:59:59')).mode, 'summer');

    const nextCycle = summer.getSummerBreakState(atVietnam('2027-09-05T00:00:00'));
    assert.equal(nextCycle.mode, 'countdown');
    assert.equal(nextCycle.targetYear, 2028);
    assert.equal(nextCycle.target.toISOString(), '2028-05-30T17:00:00.000Z');
});

test('summer countdown remains pinned to Vietnam year across device time zones', () => {
    const instant = new Date('2027-05-30T17:00:00.000Z');
    assert.equal(summer.getVietnamYear(instant), 2027);
    assert.equal(summer.getSummerBreakState(instant).mode, 'summer');
    assert.equal(summer.VIETNAM_TIME_ZONE, 'Asia/Ho_Chi_Minh');
});

test('summer page ships complete SEO and structured data', () => {
    const html = read('nghi-he/index.html');
    const $ = cheerio.load(html);
    const description = $('meta[name="description"]').attr('content');

    assert.equal($('link[rel="canonical"]').attr('href'), 'https://saptet.vn/nghi-he/');
    assert.match($('meta[name="robots"]').attr('content'), /index, follow/);
    assert.ok(description.length <= 160, `description is ${description.length} characters`);
    assert.equal($('h1').length, 1);
    assert.equal($('meta[property="og:image:width"]').attr('content'), '1200');
    assert.equal($('meta[property="og:image:height"]').attr('content'), '630');

    const schema = JSON.parse($('script[type="application/ld+json"]').first().text());
    const types = schema['@graph'].map((node) => node['@type']);
    for (const type of ['WebPage', 'BreadcrumbList', 'FAQPage', 'Organization', 'ImageObject']) {
        assert.ok(types.includes(type), `missing ${type} schema`);
    }

    const faq = schema['@graph'].find((node) => node['@type'] === 'FAQPage');
    const visibleFaq = $('.summer-faq-list details').map((_, detail) => ({
        name: $(detail).find('summary').text().trim(),
        text: $(detail).find('p').text().trim()
    })).get();
    assert.deepEqual(faq.mainEntity.map((item) => ({
        name: item.name,
        text: item.acceptedAnswer.text
    })), visibleFaq);
});

test('summer page contains age-specific activities, supervision labels and optimized images', () => {
    const html = read('nghi-he/index.html');
    const $ = cheerio.load(html);

    for (const id of ['hoat-dong-mam-non', 'hoat-dong-tieu-hoc', 'hoat-dong-thcs']) {
        assert.equal($(`#${id}`).length, 1, `missing ${id}`);
        assert.equal($(`a[href="#${id}"]`).length, 1, `missing anchor for ${id}`);
        assert.equal($(`#${id} .summer-activity-card`).length, 5, `${id} needs five activities`);
    }

    assert.ok($('.summer-supervision').length >= 8);
    assert.equal($('img[src$=".webp"][width][height]').length, 2);
    assert.equal($('img[loading="lazy"]').length, 1);
    assert.doesNotMatch(html, /<style\b|style="/);

    assert.ok(fs.existsSync(path.join(root, 'assets/images/nghi-he/hoc-sinh-vui-choi-nghi-he.webp')));
    assert.ok(fs.existsSync(path.join(root, 'assets/images/nghi-he/hoat-dong-he-cho-be.webp')));
    assert.ok(fs.existsSync(path.join(root, 'assets/images/og/nghi-he.jpg')));
});

test('summer page is discoverable from navigation and sitemap', () => {
    assert.match(read('components/header.html'), /href="\/nghi-he\/"/);
    assert.match(read('js/header-loader.js'), /normalizedPath === '\/nghi-he'[\s\S]*return 'summer'/);
    assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/nghi-he\/<\/loc>/);
});

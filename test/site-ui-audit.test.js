const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cheerio = require('cheerio');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function sitemapFiles() {
    const sitemap = read('sitemap.xml');
    return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => {
        const pathname = new URL(match[1]).pathname;
        if (pathname === '/') return 'index.html';
        const relative = pathname.replace(/^\//, '');
        if (relative.endsWith('/')) return `${relative}index.html`;
        if (relative.endsWith('.html')) return relative;
        return `${relative}/index.html`;
    });
}

test('every public sitemap page keeps one primary heading and responsive metadata', () => {
    for (const file of sitemapFiles()) {
        const $ = cheerio.load(read(file));
        assert.equal($('meta[name="viewport"]').length, 1, `${file} needs a viewport meta tag`);
        assert.equal($('h1').length, 1, `${file} should have exactly one h1`);
    }
});

test('refreshed intent pages share a live, responsive landing pattern', () => {
    for (const file of [
        'dem-nguoc-tet-2027/index.html',
        'tet-2027-la-ngay-nao/index.html',
        'con-bao-nhieu-ngay-nua-den-giao-thua/index.html',
    ]) {
        const html = read(file);
        assert.match(html, /css\/intent-page\.css/);
        assert.match(html, /js\/intent-countdown\.js/);
        assert.match(html, /data-intent-countdown/);
        assert.doesNotMatch(html, /<style\b|style="/);
    }
});

test('seasonal pages are evergreen, load the shared footer and avoid inline styling', () => {
    for (const file of ['trung-thu.html', 'noel.html']) {
        const html = read(file);
        assert.match(html, /css\/seasonal-page\.css/);
        assert.match(html, /js\/seasonal-page\.js/);
        assert.match(html, /js\/footer\.js/);
        assert.match(html, /data-seasonal-countdown/);
        assert.doesNotMatch(html, /<style\b|style="/);
    }
});

test('older editorial pages opt into the shared visual refresh', () => {
    for (const file of ['con-bao-lau-nua-den-tet.html', 'lich-nghi-tet-2027.html', 'huong-dan-tet.html']) {
        const html = read(file);
        assert.match(html, /class="editorial-refresh"/);
        assert.match(html, /css\/editorial-refresh\.css/);
    }
});

test('mid-autumn fallback dates match the lunar calendar milestones', () => {
    const source = read('js/trung-thu-calculator.js');
    assert.match(source, /2026:\s*new Date\(2026, 8, 25\)/);
    assert.match(source, /2027:\s*new Date\(2027, 8, 15\)/);
    assert.match(source, /2030:\s*new Date\(2030, 8, 12\)/);
});

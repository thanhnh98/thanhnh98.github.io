const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const CLARITY_TAG = 'clarity.ms/tag';
const CLARITY_PROJECT = 'rw42vujbmw';

// Fragment được fetch lúc runtime + trang dev, không phải trang public
const NOT_A_PAGE = new Set([
    'footer.html',
    'demo-preview.html',
    'test-calculator.html',
    path.join('components', 'header.html'),
    path.join('components', 'ads-banner.html'),
    path.join('assets', 'ads', 'adsense_ads.html'),
]);
const SKIP_DIRS = ['node_modules', '.git'];

// Stub chuyển hướng (vd tai-ung-dung.html, lich-tet-2026.html) không cần tracking
const isRedirectStub = (html) =>
    /location\.replace|http-equiv="refresh"/.test(html) && /noindex/i.test(html) && html.length < 1500;

function collectPages() {
    const pages = [];
    (function visit(dir) {
        for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) {
                if (SKIP_DIRS.includes(entry.name)) continue;
                visit(path.join(dir, entry.name));
            } else if (entry.name.endsWith('.html')) {
                const relative = path.relative(root, path.join(dir, entry.name));
                if (NOT_A_PAGE.has(relative)) continue;
                const html = fs.readFileSync(path.join(root, relative), 'utf8');
                if (isRedirectStub(html)) continue;
                pages.push({ relative, html });
            }
        }
    })(root);
    return pages;
}

test('every public page loads the Microsoft Clarity tag', () => {
    const pages = collectPages();

    // Bảo vệ chính bài test: nếu bộ lọc hỏng, đừng để nó pass rỗng
    assert.ok(pages.length > 80, `chỉ tìm thấy ${pages.length} trang, bộ lọc có vấn đề`);

    const missing = pages.filter(({ html }) => !html.includes(CLARITY_TAG)).map(({ relative }) => relative);
    assert.deepEqual(missing, []);
});

test('Clarity snippet uses one consistent project id and loads inside head', () => {
    for (const { relative, html } of collectPages()) {
        assert.match(html, new RegExp(CLARITY_PROJECT), `${relative} dùng project id khác`);
        const head = html.slice(0, html.indexOf('</head>'));
        assert.ok(head.includes(CLARITY_TAG), `${relative} đặt snippet Clarity ngoài <head>`);
    }
});

test('event page templates carry the Clarity tag so generated pages keep it', () => {
    for (const template of ['templates/event-detail.html', 'templates/events-index.html']) {
        const html = fs.readFileSync(path.join(root, template), 'utf8');
        assert.match(html, new RegExp(CLARITY_TAG), `${template} thiếu snippet Clarity`);
    }
});

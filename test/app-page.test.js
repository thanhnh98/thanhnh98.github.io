const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('app landing page has a focused responsive structure', () => {
    const html = read('ung-dung.html');

    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.match(html, /css\/app-page\.css/);
    assert.match(html, /js\/app-page\.js/);
    assert.doesNotMatch(html, /<style\b/);

    for (const id of ['tong-quan', 'tinh-nang', 'trai-nghiem', 'tai-ung-dung']) {
        assert.match(html, new RegExp(`id="${id}"`));
    }

    for (const platform of ['android', 'ios']) {
        assert.match(html, new RegExp(`data-app-download="${platform}"`));
    }
});

test('app page structured data describes the page, app, breadcrumbs and visible FAQ', () => {
    const html = read('ung-dung.html');
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/);
    assert.ok(jsonLdMatch, 'JSON-LD block should exist');

    const schema = JSON.parse(jsonLdMatch[1]);
    const types = schema['@graph'].map((item) => item['@type']);
    assert.deepEqual(types, ['WebPage', 'MobileApplication', 'BreadcrumbList', 'FAQPage']);
    assert.doesNotMatch(jsonLdMatch[1], /AggregateRating/);

    const faqSchema = schema['@graph'].find((item) => item['@type'] === 'FAQPage');
    for (const question of faqSchema.mainEntity) {
        assert.match(html, new RegExp(question.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    }
});

test('all app features have valid content and local image assets', () => {
    const sandbox = { window: {} };
    vm.runInNewContext(read('data/app-features.js'), sandbox);
    const features = sandbox.window.APP_FEATURES;

    assert.equal(features.length, 8);
    for (const feature of features) {
        assert.ok(feature.title);
        assert.ok(feature.description);
        assert.ok(fs.existsSync(path.join(root, 'assets/images/app-features', feature.drawable)));
    }
});

test('app interactions cover progressive reveal, FAQ, QR and mobile download', () => {
    const pageScript = read('js/app-page.js');
    const qrScript = read('js/app-intro-qr.js');

    assert.match(pageScript, /IntersectionObserver/);
    assert.match(pageScript, /prefers-reduced-motion/);
    assert.match(pageScript, /wireFaqAccordion/);
    assert.match(pageScript, /app-mobile-download/);
    assert.doesNotMatch(pageScript, /innerHTML/);

    assert.match(qrScript, /aria-hidden/);
    assert.match(qrScript, /modalClose\.focus\(\)/);
    assert.match(qrScript, /lastFocusedElement\.focus\(\)/);
    assert.match(qrScript, /e\.key === 'Escape'/);
});

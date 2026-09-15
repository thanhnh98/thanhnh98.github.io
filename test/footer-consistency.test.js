const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('shared footer carries the homepage footer structure and navigation', () => {
    const homepage = read('index.html');
    const shared = read('footer.html');
    const sharedStyles = read('css/style.css');

    for (const className of [
        'home-site-footer',
        'home-footer-grid',
        'home-footer-brand',
        'home-footer-links',
        'home-footer-community',
        'home-footer-bottom',
    ]) {
        assert.match(homepage, new RegExp(className));
        assert.match(shared, new RegExp(className));
        assert.match(sharedStyles, new RegExp(`\\.${className}`));
    }

    for (const label of ['Tiện ích', 'Khám phá', 'Kết nối', 'Chính sách bảo mật', 'Điều khoản sử dụng']) {
        assert.match(shared, new RegExp(label));
    }
});

test('every page with a shared footer container loads the footer component', () => {
    const htmlFiles = [];

    function visit(directory) {
        for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
            const absolute = path.join(directory, entry.name);
            if (entry.isDirectory()) visit(absolute);
            else if (entry.name.endsWith('.html')) htmlFiles.push(absolute);
        }
    }

    visit(root);
    const missingLoader = htmlFiles
        .filter((file) => read(path.relative(root, file)).includes('id="footer-container"'))
        .filter((file) => !read(path.relative(root, file)).includes('footer.js'))
        .map((file) => path.relative(root, file));

    assert.deepEqual(missingLoader, []);
});

test('standalone public pages now use the shared footer', () => {
    for (const file of ['404.html', 'chi-tiet-mon-an.html', 'tai-ung-dung.html']) {
        const html = read(file);
        assert.match(html, /id="footer-container"/);
        assert.match(html, /js\/footer\.js/);
    }
});

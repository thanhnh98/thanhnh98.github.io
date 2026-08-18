const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const appleStandardEula = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

test('Vietnamese and English Terms of Use pages expose Apple Standard EULA', () => {
  for (const locale of ['vi', 'en']) {
    const html = read(`terms-of-use/${locale}/index.html`);
    assert.match(html, /<h1>[^<]*(Điều khoản sử dụng|Terms of Use)/);
    assert.ok(html.includes(appleStandardEula));
    assert.match(html, /apps\.apple\.com\/account\/subscriptions/);
    assert.match(html, new RegExp(`/privacy-policy/${locale}/`));
  }
});

test('legal pages are discoverable from the footer and sitemap', () => {
  const footer = read('footer.html');
  const sitemap = read('sitemap.xml');

  assert.match(footer, /href="\/terms-of-use\/vi\/"/);
  assert.match(sitemap, /https:\/\/saptet\.vn\/terms-of-use\/vi\//);
  assert.match(sitemap, /https:\/\/saptet\.vn\/terms-of-use\/en\//);
});

test('short Terms of Use URLs redirect to the Vietnamese canonical page', () => {
  for (const file of ['terms-of-use.html', 'terms-of-use/index.html']) {
    const html = read(file);
    assert.match(html, /location\.replace\("\/terms-of-use\/vi\/" \+ q \+ h\)/);
    assert.match(html, /https:\/\/saptet\.vn\/terms-of-use\/vi\//);
  }
});

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const SUPPORT_EMAIL = 'tlife1001@gmail.com';

test('support page is an indexable contact page with the official channels', () => {
  const html = read('support.html');
  assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/support">/);
  assert.match(html, /<meta name="robots" content="index, follow">/);
  assert.match(html, new RegExp(`href="mailto:${SUPPORT_EMAIL}`));
  for (const url of ['https://www.facebook.com/saptet2027/', 'https://www.tiktok.com/@sap.tet', 'https://www.youtube.com/@saptet']) {
    assert.ok(html.includes(`href="${url}"`), `missing ${url}`);
  }
  assert.match(html, /\/privacy-policy\/vi\//);
  assert.match(html, /\/terms-of-use\/vi\//);
  assert.match(html, /id="footer-container"/);
  assert.match(html, /js\/footer\.js/);

  const schema = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const types = schema['@graph'].map((node) => node['@type']);
  assert.ok(types.includes('ContactPage'));
  const org = schema['@graph'].find((node) => node['@type'] === 'Organization');
  assert.equal(org.contactPoint.email, SUPPORT_EMAIL);
});

test('only the official support email is used across the site', () => {
  assert.match(read('js/resources.js'), new RegExp(`email: '${SUPPORT_EMAIL}'`));
  for (const file of ['support.html', 'footer.html', 'js/footer.js', 'js/resources.js']) {
    assert.doesNotMatch(read(file), /sap\.tet\.vn/, `${file} must not reference sap.tet.vn`);
  }
});

test('support page is linked from the shared footers and listed in the sitemap', () => {
  assert.match(read('footer.html'), /<a href="\/support">Hỗ trợ<\/a>/);
  assert.match(read('js/footer.js'), /<a href="\/support">Hỗ trợ<\/a>/);
  assert.match(read('christmas.html'), /<a href="\/support">Support<\/a>/);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/support<\/loc>/);
});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const thiep = require('../js/thiep.js');

test('404 page hands /thiep/<slug> to the app and offers the download', () => {
  const html = read('404.html');
  assert.ok(html.includes('/^\\/thiep\\/([A-Za-z2-9]{10})\\/?$/'));
  assert.match(html, /class="thiep-page"/);
  assert.match(html, /id="thiep-open-app"/);
  assert.match(html, /apps\.apple\.com\/app\/id6743064990/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.thanh_nguyen\.tet_count_down/);
  assert.match(html, /<script src="\/js\/thiep\.js\?v=\d{8}"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\/css\/thiep\.css\?v=\d{8}">/);
  assert.match(html, /<meta name="robots" content="noindex/);
});

test('the website never shows the card itself', () => {
  const js = read('js/thiep.js');
  assert.doesNotMatch(js, /fetch\(|api\.saptet\.vn|public\/cards/);
  assert.doesNotMatch(read('404.html'), /thiep-message/);
});

test('slugs are read from the path only when they are card slugs', () => {
  assert.equal(thiep.slugFromPath('/thiep/z5dsg6r2bq'), 'Z5DSG6R2BQ');
  assert.equal(thiep.slugFromPath('/thiep/Z5DSG6R2BQ/'), 'Z5DSG6R2BQ');
  assert.equal(thiep.slugFromPath('/thiep/SHORT'), null);
  assert.equal(thiep.slugFromPath('/thiep/ABCDEFGHI0'), null, 'no look-alike characters');
  assert.equal(thiep.slugFromPath('/friends/ABCDEFGH'), null);
});

test('the app hand-off opens the card by slug, with Google Play as the Android fallback', () => {
  assert.equal(thiep.appLink('Z5DSG6R2BQ', 'iPhone'), 'saptet://saptet.vn/?page=wish_card&slug=Z5DSG6R2BQ');
  const android = thiep.appLink('Z5DSG6R2BQ', 'Linux; Android 14');
  assert.match(android, /^intent:\/\/saptet\.vn\/\?page=wish_card&slug=Z5DSG6R2BQ#Intent;scheme=saptet;package=com\.thanh_nguyen\.tet_count_down;/);
  assert.match(android, /S\.browser_fallback_url=https%3A%2F%2Fplay\.google\.com/);
});

test('the router leaves /thiep/ to 404.html instead of redirecting to /404.html', () => {
  assert.match(read('js/navigation.js'), /currentPath\.startsWith\('\/thiep\/'\)/);
});

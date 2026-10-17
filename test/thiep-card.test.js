const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const thiep = require('../js/thiep.js');

test('404 page renders a wish card for /thiep/<slug>', () => {
  const html = read('404.html');
  assert.ok(html.includes('/^\\/thiep\\/([A-Za-z2-9]{10})\\/?$/'));
  assert.match(html, /class="thiep-page"/);
  assert.match(html, /id="thiep-envelope"/);
  assert.match(html, /<script src="\/js\/thiep\.js\?v=\d{8}"><\/script>/);
  assert.match(html, /<link rel="stylesheet" href="\/css\/thiep\.css\?v=\d{8}">/);
  assert.match(html, /<meta name="robots" content="noindex/);
});

test('the card fonts ship with the site', () => {
  for (const font of ['thuphap4.otf', 'selender.otf', 'bep_semi_bold.ttf']) {
    assert.ok(fs.existsSync(path.join(root, 'assets/fonts', font)), font);
    assert.ok(read('css/thiep.css').includes('/assets/fonts/' + font), font);
  }
});

test('slugs are read from the path only when they are card slugs', () => {
  assert.equal(thiep.slugFromPath('/thiep/z5dsg6r2bq'), 'Z5DSG6R2BQ');
  assert.equal(thiep.slugFromPath('/thiep/Z5DSG6R2BQ/'), 'Z5DSG6R2BQ');
  assert.equal(thiep.slugFromPath('/thiep/SHORT'), null);
  assert.equal(thiep.slugFromPath('/thiep/ABCDEFGHI0'), null, 'no look-alike characters');
  assert.equal(thiep.slugFromPath('/friends/ABCDEFGH'), null);
});

test('an unknown background or font falls back to the defaults', () => {
  assert.equal(thiep.resolveTheme('li_xi', 'modern').background.id, 'li_xi');
  assert.equal(thiep.resolveTheme('li_xi', 'modern').fontFamily, 'ThiepBep');
  assert.equal(thiep.resolveTheme('li_xi', 'modern').url, '/assets/images/thiep/li_xi.webp');
  assert.equal(thiep.resolveTheme('from_the_future', 'wavy').background.id, 'mai_vang');
  assert.equal(thiep.resolveTheme('x', 'wavy').fontId, 'calligraphy');
});

test('every card background ships with the site and keeps its text box on the card', () => {
  const ids = thiep.BACKGROUNDS.map((b) => b.id);
  assert.equal(ids[0], 'mai_vang', 'the apps fall back to mai vàng too');
  assert.equal(new Set(ids).size, ids.length);
  for (const b of thiep.BACKGROUNDS) {
    assert.ok(fs.existsSync(path.join(root, 'assets/images/thiep', b.id + '.webp')), b.id);
    const { x, y, w, h } = b.textBox;
    assert.ok(x >= 0 && y >= 0 && x + w <= 1 && y + h <= 1, b.id);
    assert.match(b.textColor + b.nameColor, /^#[0-9A-F]{6}#[0-9A-F]{6}$/i, b.id);
  }
});

test('the message gets the largest size that fits', () => {
  assert.equal(thiep.fitFontSize((px) => px <= 23.4, 12, 60), 23);
  assert.equal(thiep.fitFontSize(() => false, 12, 60), 12, 'never below the minimum');
});

test('the app hand-off opens the card by slug, with the store as Android fallback', () => {
  assert.equal(thiep.appLinks('Z5DSG6R2BQ', 'iPhone'), 'saptet://saptet.vn/?page=wish_card&slug=Z5DSG6R2BQ');
  const android = thiep.appLinks('Z5DSG6R2BQ', 'Linux; Android 14');
  assert.match(android, /^intent:\/\/saptet\.vn\/\?page=wish_card&slug=Z5DSG6R2BQ#Intent;scheme=saptet;package=com\.thanh_nguyen\.tet_count_down;/);
  assert.match(android, /S\.browser_fallback_url=https%3A%2F%2Fplay\.google\.com/);
});

test('the router leaves /thiep/ to 404.html instead of redirecting to /404.html', () => {
  assert.match(read('js/navigation.js'), /currentPath\.startsWith\('\/thiep\/'\)/);
});

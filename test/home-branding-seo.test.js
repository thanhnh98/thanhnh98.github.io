const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function getJsonLdObjects(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

test('homepage uses focused Sắp Tết branding signals', () => {
  const html = read('index.html');

  assert.match(html, /<title>Sắp Tết - Đếm ngược Tết 2027, lịch âm & tiện ích Tết<\/title>/);
  assert.match(
    html,
    /content="Sắp Tết giúp bạn đếm ngược Tết 2027, xem lịch âm dương, ngày Tết, sự kiện, món ăn, trò chơi và tải app theo dõi Tết mỗi ngày\."/
  );
  assert.match(html, /<meta property="og:site_name" content="Sắp Tết" \/>/);
  assert.match(html, /<meta name="application-name" content="Sắp Tết" \/>/);
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
  assert.ok(!website.alternateName.includes('Tết'));
  assert.ok(!website.alternateName.includes('Tết Việt Nam'));
});

test('web app manifest reinforces the same brand entity', () => {
  const manifest = JSON.parse(read('site.webmanifest'));

  assert.equal(manifest.name, 'Sắp Tết - Đếm ngược Tết 2027');
  assert.equal(manifest.short_name, 'Sắp Tết');
  assert.match(manifest.description, /^Sắp Tết giúp bạn đếm ngược Tết 2027/);
});

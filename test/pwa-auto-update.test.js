const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('PWA silently reloads once when a new service worker takes control', () => {
  const installer = read('js/pwa-install.js');

  assert.match(installer, /addEventListener\('controllerchange'/);
  assert.match(installer, /hadController/);
  assert.match(installer, /isReloadingForUpdate/);
  assert.match(installer, /window\.location\.reload\(\)/);
  assert.doesNotMatch(installer, /Cập nhật có sẵn|Cập nhật ngay|showUpdateAvailable/);
});

test('all required precache files exist', () => {
  const serviceWorker = read('sw.js');
  const precacheBlock = serviceWorker.match(/const urlsToCache = \[([\s\S]*?)\];/)?.[1];

  assert.ok(precacheBlock, 'urlsToCache must be declared');

  const urls = [...precacheBlock.matchAll(/['"](\/[^'"]+)['"]/g)]
    .map((match) => match[1]);

  for (const url of urls) {
    const relativePath = url === '/' ? 'index.html' : url.slice(1);
    assert.ok(fs.existsSync(path.join(root, relativePath)), `${url} must exist`);
  }
});

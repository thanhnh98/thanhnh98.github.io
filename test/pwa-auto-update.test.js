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

  for (const homepageAsset of [
    '/css/style.css',
    '/css/colors.css',
    '/css/home-retention.css',
    '/components/header.html',
    '/js/home-retention.js',
    '/js/home-shop-preview.js',
    '/js/home-fireworks.js',
    '/css/tet-runner.css',
    '/js/tet-runner-engine.js',
    '/js/tet-runner-loader.js',
  '/js/tet-runner-three.bundle.js',
  '/assets/images/tet-runner/vietnam-north.webp',
  '/assets/images/tet-runner/vietnam-central.webp',
  '/assets/images/tet-runner/vietnam-south.webp',
  '/assets/sounds/tet-runner-crash.mp3',
  '/assets/sounds/tet-runner-failed.mp3',
  ]) {
    assert.ok(urls.includes(homepageAsset), `${homepageAsset} must be precached`);
  }

  for (const url of urls) {
    const relativePath = url === '/' ? 'index.html' : url.slice(1);
    assert.ok(fs.existsSync(path.join(root, relativePath)), `${url} must exist`);
  }
});

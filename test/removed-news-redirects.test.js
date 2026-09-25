const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));

function fileForPath(target) {
  const rel = target.replace(/^\//, '');
  return rel === '' || rel.endsWith('/') ? `${rel}index.html` : rel;
}

function assertRedirectStub(file, target) {
  assert.ok(exists(file), `${file} should exist`);
  const html = read(file);
  assert.match(html, new RegExp(`<link rel="canonical" href="https://saptet\\.vn${target}" />`), file);
  assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0;url=${target}" />`), file);
  assert.match(html, /<meta name="robots" content="noindex, follow" \/>/, file);
}

test('deleted news posts redirect instead of returning 404', () => {
  const removed = JSON.parse(read('data/removed-news.json'));
  assert.ok(Object.keys(removed).length > 0);

  for (const [slug, target] of Object.entries(removed)) {
    assert.ok(exists(fileForPath(target)), `${slug} redirects to missing page ${target}`);
    assertRedirectStub(`tin-tuc/${slug}.html`, target);
    assertRedirectStub(`tin-tuc/${slug}/index.html`, target);
  }
});

test('deleted news posts stay out of the sitemap and news listing', () => {
  const removed = Object.keys(JSON.parse(read('data/removed-news.json')));
  const sitemap = read('sitemap.xml');
  const news = read('news.json');

  for (const slug of removed) {
    assert.ok(!sitemap.includes(`/tin-tuc/${slug}`), `${slug} should not be in sitemap.xml`);
    assert.ok(!news.includes(slug), `${slug} should not be in news.json`);
  }
});

test('/su-kien/ redirects to the event hub', () => {
  assertRedirectStub('su-kien/index.html', '/su-kien-quan-trong.html');
});

test('404 page loads assets with root-relative paths so it works at nested URLs', () => {
  const html = read('404.html');
  const relative = [...html.matchAll(/\b(?:href|src)="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((url) => !/^(\/|#|https?:|mailto:|tel:|data:)/.test(url));

  assert.deepEqual(relative, []);
  assert.match(html, /href="\/tin-tuc\/"/);
  assert.match(html, /href="\/su-kien-quan-trong\.html"/);
});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const script = fs.readFileSync(path.resolve(__dirname, '..', 'js', 'home-news-preview.js'), 'utf8');
const indexPage = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf8');

test('home news preview tracks blog open with preview params', () => {
  assert.match(script, /data-home-news-preview-track="1"/);
  assert.match(script, /trackHomeNewsPreviewClick/);
  assert.match(script, /trackEvent\('web_blogs_visit'/);
  assert.match(script, /blog_title:/);
  assert.match(script, /blog:/);
  assert.match(script, /preview: 'home_news_preview'/);
});

test('home page cache-busts the blog preview tracking script', () => {
  assert.match(indexPage, /js\/home-news-preview\.js\?v=20260513/);
});

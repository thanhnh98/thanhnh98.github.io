const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const page = fs.readFileSync(path.resolve(__dirname, '..', 'mon-an-tet.html'), 'utf8');

test('mon an tet uses a compact food guide layout', () => {
  assert.match(page, /food-hero--compact/);
  assert.match(page, /class="food-layout"/);
  assert.match(page, /class="food-sidebar"/);
  assert.doesNotMatch(page, /class="back-button"/);
});

test('food page exposes filter controls and categorized cards', () => {
  assert.match(page, /class="food-filter-bar"/);
  assert.match(page, /data-food-filter="all"/);
  assert.match(page, /data-food-category="banh-truyen-thong"/);
  assert.match(page, /data-food-category="mon-chinh"/);
  assert.match(page, /data-food-category="mon-vung-mien"/);
  assert.match(page, /function filterFoodCards/);
});

test('food cards are keyboard accessible recipe launchers', () => {
  const cardOpeners = page.match(/class="food-card"[^>]+role="button"[^>]+tabindex="0"/g) || [];

  assert.ok(cardOpeners.length >= 10);
  assert.match(page, /setupFoodCardKeyboard/);
});

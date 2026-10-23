const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { EVENTS_DATA } = require('../data/events-data.js');

const root = path.resolve(__dirname, '..');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'data/occasion-gifts.json'), 'utf8'));
const products = JSON.parse(fs.readFileSync(path.join(root, 'data/aff/products'), 'utf8')).data.products;
const events = EVENTS_DATA.getAllEvents();
const selected = products.filter(product => product.editorialId);
const productById = new Map(selected.map(product => [product.editorialId, product]));

const expectedGift = new Set([
  'lunar-tet-nguyen-dan', 'lunar-vu-lan', 'lunar-tet-trung-thu', 'lunar-tet-trung-cuu', 'lunar-that-tich',
  'solar-tet-duong-lich', 'solar-thay-thuoc-viet-nam', 'solar-quoc-te-phu-nu', 'solar-quoc-te-lao-dong',
  'solar-quoc-te-thieu-nhi', 'solar-gia-dinh-viet-nam', 'solar-doanh-nhan-viet-nam', 'solar-phu-nu-viet-nam',
  'solar-nha-giao-viet-nam', 'solar-valentine', 'solar-quoc-te-hanh-phuc', 'solar-giang-sinh',
  'solar-quoc-te-nam-gioi', 'solar-ngay-cua-me', 'solar-ngay-cua-cha',
]);
const expectedPrepare = new Set([
  'lunar-via-than-tai', 'lunar-tet-nguyen-tieu', 'lunar-tet-han-thuc', 'lunar-tet-doan-ngo',
  'lunar-tet-ha-nguyen', 'lunar-ong-cong-ong-tao', 'solar-black-friday',
]);

test('all 42 events have the intended shopping classification', () => {
  assert.equal(events.length, 42);
  assert.equal(Object.keys(catalog.collections).length, 42);
  for (const event of events) {
    const collection = catalog.collections[event.id];
    assert.ok(collection, `missing ${event.id}`);
    const expected = expectedGift.has(event.id) ? 'gift' : expectedPrepare.has(event.id) ? 'prepare' : 'none';
    assert.equal(collection.type, expected, event.id);
  }
  assert.equal(expectedGift.size, 20);
  assert.equal(expectedPrepare.size, 7);
});

test('27 complete collections have ten distinct, direct, pictured products with unique editorial IDs', () => {
  assert.equal(productById.size, selected.length, 'editorial IDs must be unique');
  assert.equal(new Set(selected.map(product => product.url)).size, selected.length, 'curated links must be unique');
  for (const [eventId, collection] of Object.entries(catalog.collections)) {
    if (collection.type === 'none') {
      assert.equal(collection.productIds, undefined, eventId);
      continue;
    }
    assert.ok(collection.title && collection.intro, eventId);
    assert.equal(collection.productIds.length, 10, eventId);
    assert.equal(new Set(collection.productIds).size, 10, eventId);
    for (const id of collection.productIds) {
      const product = productById.get(id);
      assert.ok(product, `${eventId}: ${id}`);
      assert.match(product.url, /^https:\/\/s\.shopee\.vn\/[\w-]+$/, `${eventId}: ${id}`);
      assert.notEqual(product.linkType, 'search', `${eventId}: ${id}`);
      assert.match(product.thumbnail, /^https:\/\//, `${eventId}: ${id}`);
      assert.ok(product.occasionName, `${eventId}: ${id}`);
      assert.doesNotMatch(product.name, /2026/i, `${eventId}: ${id} is stale for 2027`);
    }
  }
});

test('generated event pages show four featured gifts and a matching store link only when classified', () => {
  for (const event of events) {
    const html = fs.readFileSync(path.join(root, 'su-kien', event.slug, 'index.html'), 'utf8');
    const collection = catalog.collections[event.id];
    if (collection.type === 'none') {
      assert.doesNotMatch(html, /class="event-gifts"/, event.id);
      continue;
    }
    assert.match(html, new RegExp(`href="/cua-hang\\.html\\?occasion=${event.slug}"`), event.id);
    assert.equal((html.match(/class="event-gift-card"/g) || []).length, 4, event.id);
    for (const id of collection.productIds.slice(0, 4)) {
      assert.ok(html.includes(productById.get(id).url.replace(/&/g, '&amp;')), `${event.id}: ${id}`);
    }
  }
});

test('store loads the occasion catalog before the existing product filters', () => {
  const html = fs.readFileSync(path.join(root, 'cua-hang.html'), 'utf8');
  assert.ok(html.indexOf('id="occasion-discovery"') < html.indexOf('class="shop-controls"'));
  assert.match(html, /js\/occasion-shop\.js/);
  assert.match(html, /id="occasion-basket-items"/);
});

test('occasion discovery leaves the general shop usable when its data fails to load', async () => {
  const elements = new Map(['occasion-discovery', 'occasion-list', 'occasion-selection', 'occasion-grid', 'occasion-error', 'occasion-basket-items']
    .map(id => [id, { hidden: false, textContent: '', replaceChildren() {} }]));
  const context = {
    document: { readyState: 'complete', getElementById: id => elements.get(id) || null },
    fetch: async () => { throw new Error('offline'); },
    console: { error() {} },
    localStorage: { getItem: () => null },
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'js/occasion-shop.js'), 'utf8'), context);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(elements.get('occasion-selection').hidden, true);
  assert.equal(elements.get('occasion-error').hidden, false);
  assert.match(elements.get('occasion-error').textContent, /danh mục sản phẩm bên dưới/);
});

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

class FakeElement {
  constructor(tagName = 'div') {
    this.tagName = tagName.toUpperCase();
    this.children = [];
    this.dataset = {};
    this.style = {};
    this.attributes = {};
    this.eventListeners = {};
    this.parentElement = null;
    this.scrollWidth = 0;
    this.clientWidth = 1;
    this.value = '';
    this._innerHTML = '';
    this.className = '';
    this.textContent = '';
    this.classList = {
      add: (...names) => this.setClassNames(names, true),
      remove: (...names) => this.setClassNames(names, false),
      toggle: (name, force) => {
        this.setClassNames([name], force);
      },
    };
  }

  set innerHTML(value) {
    this._innerHTML = String(value || '');
    this.children = [];
  }

  get innerHTML() {
    return this._innerHTML;
  }

  setClassNames(names, enabled) {
    const current = new Set(String(this.className || '').split(/\s+/).filter(Boolean));
    names.forEach((name) => {
      if (enabled) current.add(name);
      else current.delete(name);
    });
    this.className = Array.from(current).join(' ');
  }

  appendChild(child) {
    child.parentElement = this;
    this.children.push(child);
    return child;
  }

  removeChild(child) {
    this.children = this.children.filter((item) => item !== child);
    child.parentElement = null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  getAttribute(name) {
    return this.attributes[name] || '';
  }

  addEventListener(type, handler) {
    this.eventListeners[type] = handler;
  }

  getBoundingClientRect() {
    return { left: 0, top: 0, width: 1, height: 1 };
  }

  scrollTo() {}
  select() {}
}

function makeDocument() {
  const ids = {
    'shop-grid': new FakeElement('div'),
    'shop-search': new FakeElement('input'),
    'shop-groups': new FakeElement('div'),
    'shop-categories': new FakeElement('select'),
    'shop-platforms': new FakeElement('div'),
    'shop-highlight-track': new FakeElement('div'),
    'shop-highlight-section': new FakeElement('section'),
    'shop-result-count': new FakeElement('p'),
  };

  return {
    readyState: 'complete',
    body: new FakeElement('body'),
    createElement: (tagName) => new FakeElement(tagName),
    getElementById: (id) => ids[id] || null,
    querySelectorAll: (selector) => {
      if (selector === '.shop-platform-btn') return ids['shop-platforms'].children;
      if (selector === '#shop-groups .shop-category-btn') return ids['shop-groups'].children;
      return [];
    },
    addEventListener: () => {},
    _ids: ids,
  };
}

test('shop filters render nhu cau groups and danh muc options when data groups are omitted', async () => {
  const source = fs.readFileSync(path.join(root, 'js/shop.js'), 'utf8');
  const data = JSON.parse(fs.readFileSync(path.join(root, 'data/aff/products'), 'utf8'));
  const fixture = {
    data: {
      categories: data.data.categories,
      products: data.data.products.slice(0, 8).map((product) => {
        const copy = { ...product };
        delete copy.group;
        return copy;
      }),
    },
  };
  const document = makeDocument();
  const context = {
    console,
    document,
    navigator: {},
    requestAnimationFrame: (fn) => fn(),
    setTimeout: (fn) => fn(),
    window: {
      document,
      location: { pathname: '/cua-hang.html', search: '', hash: '', origin: 'https://saptet.vn' },
      history: { replaceState() {} },
      lucide: { createIcons() {} },
    },
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify(fixture),
    }),
  };

  vm.runInNewContext(source, context, { filename: 'js/shop.js' });
  await new Promise((resolve) => setImmediate(resolve));

  const groupLabels = document._ids['shop-groups'].children.map((child) => child.attributes['aria-label']);
  const categoryLabels = document._ids['shop-categories'].children.map((child) => child.textContent);

  assert.ok(groupLabels.length > 1, 'expected more than the all group');
  assert.ok(groupLabels.includes('Nhà cửa & đời sống'));
  assert.ok(categoryLabels.length > 1, 'expected category options to render');
  assert.ok(categoryLabels.includes('Đồ dùng gia đình'));
});

test('known shop products map to the right nhu cau groups', () => {
  const data = JSON.parse(fs.readFileSync(path.join(root, 'data/aff/products'), 'utf8')).data;
  const categories = new Map(data.categories.map((category) => [category.category, category]));
  const productsById = new Map(data.products.map((product) => [String(product.id), product]));
  const expectations = {
    865932: { category: 'drinks', group: 'food-drink' },
    294568: { category: 'drinks', group: 'food-drink' },
    44905008402: { category: 'phone-tablet', group: 'tech-accessories' },
    40752431100: { category: 'smart-wearables', group: 'tech-accessories' },
    40207608778: { category: 'phone-accessories', group: 'tech-accessories' },
    26416966997: { category: 'apparel', group: 'fashion-personal' },
    48308749307: { category: 'kitchen-dining', group: 'home-living' },
    967626: { category: 'pantry-food', group: 'food-drink' },
  };

  for (const [id, expected] of Object.entries(expectations)) {
    const product = productsById.get(id);
    assert.ok(product, `expected product ${id} to exist`);
    const productCategories = Array.isArray(product.category) ? product.category : [product.category];
    const category = categories.get(productCategories[0]);
    assert.ok(productCategories.includes(expected.category), `wrong category for ${id}: ${product.name}`);
    assert.equal(product.group, expected.group, `wrong stored group for ${id}: ${product.name}`);
    assert.equal(category?.group, expected.group, `category group mismatch for ${id}: ${product.name}`);
  }
});

test('shop URL category filter renders matching real products', async () => {
  const source = fs.readFileSync(path.join(root, 'js/shop.js'), 'utf8');
  const fixture = JSON.parse(fs.readFileSync(path.join(root, 'data/aff/products'), 'utf8'));
  const document = makeDocument();
  let replacedUrl = '';
  const context = {
    console,
    document,
    navigator: {},
    requestAnimationFrame: (fn) => fn(),
    setTimeout: (fn) => fn(),
    window: {
      document,
      location: {
        pathname: '/cua-hang.html',
        search: '?category=smart-wearables',
        hash: '',
        origin: 'https://saptet.vn',
      },
      history: { replaceState: (_state, _title, url) => { replacedUrl = url; } },
      lucide: { createIcons() {} },
    },
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify(fixture),
    }),
  };

  vm.runInNewContext(source, context, { filename: 'js/shop.js' });
  await new Promise((resolve) => setImmediate(resolve));

  assert.equal(document._ids['shop-grid'].children.length, 7);
  assert.equal(document._ids['shop-result-count'].textContent, '7 sản phẩm');
  assert.equal(replacedUrl, '/cua-hang.html?group=tech-accessories&category=smart-wearables');
});

test('shop category filter includes products whose secondary category belongs to the active group', async () => {
  const source = fs.readFileSync(path.join(root, 'js/shop.js'), 'utf8');
  const fixture = {
    data: {
      groups: [
        { group: 'gifts-decor', displayName: 'Quà tặng & trang trí' },
        { group: 'home-living', displayName: 'Nhà cửa & đời sống' },
      ],
      categories: [
        { category: 'decorations', displayName: 'Trang trí', group: 'gifts-decor' },
        { category: 'home-appliances', displayName: 'Đồ điện gia dụng', group: 'home-living' },
      ],
      products: [
        {
          id: 'secondary-category-product',
          shopId: 'shop',
          thumbnail: '',
          images: [],
          name: 'Đèn ngủ cảm ứng decor',
          description: '',
          type: 'shopee',
          group: 'gifts-decor',
          category: ['decorations', 'home-appliances'],
          coinBonus: 10,
          buyText: 'Xem sản phẩm',
          url: 'https://s.shopee.vn/example',
        },
      ],
    },
  };
  const document = makeDocument();
  const context = {
    console,
    document,
    navigator: {},
    requestAnimationFrame: (fn) => fn(),
    setTimeout: (fn) => fn(),
    window: {
      document,
      location: { pathname: '/cua-hang.html', search: '', hash: '', origin: 'https://saptet.vn' },
      history: { replaceState() {} },
      lucide: { createIcons() {} },
    },
    fetch: async () => ({
      ok: true,
      text: async () => JSON.stringify(fixture),
    }),
  };

  vm.runInNewContext(source, context, { filename: 'js/shop.js' });
  await new Promise((resolve) => setImmediate(resolve));

  const homeGroupButton = document._ids['shop-groups'].children.find(
    (child) => child.dataset.group === 'home-living'
  );
  assert.ok(homeGroupButton, 'expected home-living group button');
  homeGroupButton.eventListeners.click({ clientX: 0, clientY: 0 });

  const categorySelect = document._ids['shop-categories'];
  categorySelect.value = 'home-appliances';
  categorySelect.onchange();

  assert.equal(document._ids['shop-grid'].children.length, 1);
});

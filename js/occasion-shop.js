/** Curated gifts by occasion. The shortlist lives on this device; purchases happen on Shopee. */
(function () {
  'use strict';
  const STORAGE_KEY = 'saptet-occasion-basket-v1';
  const root = document.getElementById('occasion-discovery');
  if (!root) return;
  const list = document.getElementById('occasion-list');
  const selection = document.getElementById('occasion-selection');
  const grid = document.getElementById('occasion-grid');
  const error = document.getElementById('occasion-error');
  const basketItems = document.getElementById('occasion-basket-items');
  let entries = [];
  let productById = new Map();
  let selectedSlug = '';
  let savedIds = readBasket();

  function readBasket() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? [...new Set(value.filter(id => typeof id === 'string'))] : [];
    } catch (_) { return []; }
  }

  function saveBasket() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds)); } catch (_) { /* private browsing */ }
  }

  function getSlugFromUrl() {
    return new URL(window.location.href).searchParams.get('occasion') || '';
  }

  function updateUrl(slug) {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set('occasion', slug);
    else url.searchParams.delete('occasion');
    history.pushState({ occasion: slug }, '', url.pathname + url.search + url.hash);
  }

  function dateLabel(dateKey) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  }

  function productName(product) { return product.occasionName || product.name || 'Sản phẩm'; }

  function makeImage(product) {
    const wrap = document.createElement('div');
    wrap.className = 'occasion-product-image';
    const img = document.createElement('img');
    img.src = product.thumbnail;
    img.alt = '';
    img.loading = 'lazy';
    img.onerror = function () {
      img.remove();
      wrap.textContent = '🎁';
      wrap.classList.add('occasion-product-image--empty');
    };
    wrap.appendChild(img);
    return wrap;
  }

  function makeOutbound(product, label, className) {
    const link = document.createElement('a');
    link.className = className;
    link.href = product.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer nofollow';
    link.textContent = label;
    return link;
  }

  function renderBasket() {
    savedIds = savedIds.filter(id => productById.has(id));
    saveBasket();
    const count = savedIds.length;
    document.getElementById('occasion-basket-count').textContent = `${count} món đã lưu`;
    basketItems.replaceChildren();
    if (!count) {
      const empty = document.createElement('p');
      empty.className = 'occasion-basket-empty';
      empty.textContent = 'Chọn “Thêm vào giỏ gợi ý” ở món bạn thích.';
      basketItems.appendChild(empty);
      return;
    }
    savedIds.forEach(id => {
      const product = productById.get(id);
      const row = document.createElement('div');
      row.className = 'occasion-basket-row';
      const img = document.createElement('img');
      img.src = product.thumbnail;
      img.alt = '';
      img.loading = 'lazy';
      const content = document.createElement('div');
      const name = document.createElement('strong');
      name.textContent = productName(product);
      const actions = document.createElement('div');
      actions.className = 'occasion-basket-actions';
      actions.appendChild(makeOutbound(product, 'Mở trên Shopee ↗', 'occasion-basket-link'));
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Bỏ món';
      remove.setAttribute('aria-label', `Bỏ ${productName(product)} khỏi giỏ gợi ý`);
      remove.addEventListener('click', () => toggleSaved(id));
      actions.appendChild(remove);
      content.append(name, actions);
      row.append(img, content);
      basketItems.appendChild(row);
    });
  }

  function toggleSaved(id) {
    if (savedIds.includes(id)) savedIds = savedIds.filter(item => item !== id);
    else savedIds.push(id);
    saveBasket();
    renderBasket();
    grid.querySelectorAll('[data-product-id]').forEach(button => {
      if (button.dataset.productId !== id) return;
      const active = savedIds.includes(id);
      button.setAttribute('aria-pressed', String(active));
      button.setAttribute('aria-label', `${active ? 'Bỏ' : 'Thêm'} ${productName(productById.get(id))} ${active ? 'khỏi' : 'vào'} giỏ gợi ý`);
      button.textContent = active ? '✓ Đã thêm · Bỏ món' : '+ Thêm vào giỏ gợi ý';
      button.classList.toggle('is-saved', active);
    });
  }

  function makeCard(product, index) {
    const card = document.createElement('article');
    card.className = 'occasion-product-card';
    card.setAttribute('role', 'listitem');
    const imageLink = makeOutbound(product, '', 'occasion-product-image-link');
    imageLink.setAttribute('aria-label', `Xem ${productName(product)} trên Shopee`);
    imageLink.appendChild(makeImage(product));
    const info = document.createElement('div');
    info.className = 'occasion-product-body';
    const number = document.createElement('span');
    number.className = 'occasion-product-number';
    number.textContent = `Gợi ý ${String(index + 1).padStart(2, '0')}`;
    const name = document.createElement('h4');
    name.textContent = productName(product);
    const add = document.createElement('button');
    add.type = 'button';
    add.className = 'occasion-add';
    add.dataset.productId = product.editorialId;
    const active = savedIds.includes(product.editorialId);
    add.setAttribute('aria-pressed', String(active));
    add.setAttribute('aria-label', `${active ? 'Bỏ' : 'Thêm'} ${productName(product)} ${active ? 'khỏi' : 'vào'} giỏ gợi ý`);
    add.textContent = active ? '✓ Đã thêm · Bỏ món' : '+ Thêm vào giỏ gợi ý';
    add.classList.toggle('is-saved', active);
    add.addEventListener('click', () => toggleSaved(product.editorialId));
    info.append(number, name, add, makeOutbound(product, 'Xem trên Shopee ↗', 'occasion-product-buy'));
    card.append(imageLink, info);
    return card;
  }

  function renderTabs() {
    list.replaceChildren();
    entries.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'occasion-tab';
      button.dataset.slug = item.event.slug;
      button.setAttribute('aria-pressed', String(item.event.slug === selectedSlug));
      const date = document.createElement('span');
      date.className = 'occasion-tab-date';
      date.textContent = dateLabel(item.occurrence.dateKey);
      const title = document.createElement('strong');
      title.textContent = item.event.name;
      const kind = document.createElement('span');
      kind.className = 'occasion-tab-kind';
      kind.textContent = item.collection.type === 'prepare' ? 'Sắm sửa' : 'Quà tặng';
      button.append(date, title, kind);
      button.addEventListener('click', () => select(item.event.slug, true));
      list.appendChild(button);
    });
  }

  function select(slug, changeUrl) {
    const item = entries.find(entry => entry.event.slug === slug);
    selectedSlug = item ? slug : '';
    if (changeUrl) updateUrl(selectedSlug);
    let activeTab = null;
    list.querySelectorAll('.occasion-tab').forEach(button => {
      const active = button.dataset.slug === selectedSlug;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
      if (active) activeTab = button;
    });
    if (activeTab) {
      const left = activeTab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
      list.scrollTo({ left: left - (list.clientWidth - activeTab.clientWidth) / 2, behavior: changeUrl ? 'smooth' : 'auto' });
    }
    selection.hidden = !item;
    if (!item) return;
    document.getElementById('occasion-date').textContent = `Lần tới: ${dateLabel(item.occurrence.dateKey)} · ${item.collection.type === 'prepare' ? 'Chuẩn bị' : 'Quà tặng'}`;
    document.getElementById('occasion-title').textContent = item.collection.title;
    document.getElementById('occasion-intro').textContent = item.collection.intro;
    grid.replaceChildren(...item.collection.productIds.map((id, index) => makeCard(productById.get(id), index)));
    renderBasket();
  }

  async function init() {
    try {
      const [catalogResponse, feedResponse] = await Promise.all([
        fetch('data/occasion-gifts.json'), fetch('data/aff/products')
      ]);
      if (!catalogResponse.ok || !feedResponse.ok) throw new Error('load failed');
      const [catalog, feed] = await Promise.all([catalogResponse.json(), feedResponse.json()]);
      if (!window.EVENTS_DATA || typeof lunarToSolar !== 'function') throw new Error('calendar unavailable');
      productById = new Map((feed.data?.products || []).filter(product => product.editorialId).map(product => [product.editorialId, product]));
      entries = window.EVENTS_DATA.getUpcomingEvents({ lunarToSolar }).filter(item => {
        const collection = catalog.collections?.[item.event.id];
        if (!collection || collection.type === 'none' || collection.productIds?.length !== 10) return false;
        if (new Set(collection.productIds).size !== 10) return false;
        if (!collection.productIds.every(id => {
          const p = productById.get(id);
          return p && p.thumbnail && /^https:\/\/s\.shopee\.vn\//.test(p.url) && p.linkType !== 'search';
        })) return false;
        item.collection = collection;
        return true;
      });
      if (!entries.length) throw new Error('no complete collections');
      const requestedSlug = getSlugFromUrl();
      selectedSlug = entries.some(item => item.event.slug === requestedSlug) ? requestedSlug : entries[0].event.slug;
      renderTabs();
      select(selectedSlug, false);
      document.getElementById('occasion-clear').addEventListener('click', () => select('', true));
      window.addEventListener('popstate', () => select(getSlugFromUrl(), false));
    } catch (cause) {
      list.replaceChildren();
      selection.hidden = true;
      error.hidden = false;
      error.textContent = 'Chưa tải được quà theo dịp. Bạn vẫn có thể xem danh mục sản phẩm bên dưới; hãy thử tải lại trang sau.';
      console.error('Occasion shop:', cause);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

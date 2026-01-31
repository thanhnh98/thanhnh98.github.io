/**
 * Shop / Referral products page
 * Loads products from data/aff/products, filters by category,
 * opens Shopee or TikTok based on product URL (brand from URL).
 */

(function () {
  const PRODUCTS_PATH = 'data/aff/products';
  const ALL_CATEGORY = 'other';

  function getBrandFromUrl(url) {
    if (!url || typeof url !== 'string') return 'other';
    const u = url.toLowerCase();
    if (u.includes('shopee')) return 'shopee';
    if (u.includes('tiktok')) return 'tiktok';
    return 'other';
  }

  function getBrandLabel(brand) {
    if (brand === 'shopee') return 'Shopee';
    if (brand === 'tiktok') return 'TikTok Shop';
    return '';
  }

  function getBrandClass(brand) {
    if (brand === 'shopee') return 'shopee';
    if (brand === 'tiktok') return 'tiktok';
    return '';
  }

  async function loadProducts() {
    var paths = [PRODUCTS_PATH, 'data/aff/products.json'];
    for (var i = 0; i < paths.length; i++) {
      try {
        var res = await fetch(paths[i]);
        if (!res.ok) continue;
        var text = await res.text();
        var json = JSON.parse(text);
        var data = json?.data;
        if (!data || !Array.isArray(data.products)) continue;
        return {
          categories: Array.isArray(data.categories) ? data.categories : [],
          products: data.products
        };
      } catch (err) {
        if (i === paths.length - 1) {
          console.error('Shop: failed to load products', err);
          return { categories: [], products: [] };
        }
      }
    }
    return { categories: [], products: [] };
  }

  function renderCategories(categories, activeCategory, onSelect) {
    const container = document.getElementById('shop-categories');
    if (!container) return;
    container.innerHTML = '';
    categories.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'shop-category-btn' + (cat.category === activeCategory ? ' active' : '');
      btn.textContent = cat.displayName || cat.category;
      btn.dataset.category = cat.category;
      btn.addEventListener('click', function () {
        onSelect(cat.category);
      });
      container.appendChild(btn);
    });
  }

  function renderProducts(products, activeCategory) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const filtered = activeCategory === ALL_CATEGORY
      ? products
      : products.filter(function (p) { return p.category === activeCategory; });

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="shop-empty">Chưa có sản phẩm nào trong danh mục này.</p>';
      return;
    }

    filtered.forEach(function (p) {
      const brand = getBrandFromUrl(p.url);
      const brandLabel = getBrandLabel(brand);
      const brandClass = getBrandClass(brand);
      const thumb = (p.thumbnail && p.thumbnail.trim()) ? p.thumbnail : '';
      const name = (p.name && p.name.trim()) || 'Sản phẩm';
      const desc = (p.description && p.description.trim()) || '';
      const buyText = (p.buyText && p.buyText.trim()) || 'Xem sản phẩm';
      const url = (p.url && p.url.trim()) || '#';

      const card = document.createElement('article');
      card.className = 'shop-card';

      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'shop-card-link';
      link.setAttribute('aria-label', 'Xem sản phẩm: ' + name);

      const thumbEl = document.createElement('div');
      thumbEl.className = 'shop-card-thumb';
      if (thumb) {
        const img = document.createElement('img');
        img.src = thumb;
        img.alt = name;
        img.loading = 'lazy';
        img.onerror = function () {
          thumbEl.classList.add('has-placeholder');
          var ph = document.createElement('div');
          ph.className = 'shop-card-placeholder';
          ph.setAttribute('aria-hidden', 'true');
          ph.textContent = '🛍️';
          thumbEl.appendChild(ph);
        };
        thumbEl.appendChild(img);
      } else {
        var ph = document.createElement('div');
        ph.className = 'shop-card-placeholder';
        ph.setAttribute('aria-hidden', 'true');
        ph.textContent = '🛍️';
        thumbEl.appendChild(ph);
      }
      if (brandLabel) {
        var badge = document.createElement('span');
        badge.className = 'shop-card-badge ' + brandClass;
        badge.textContent = brandLabel;
        thumbEl.appendChild(badge);
      }
      link.appendChild(thumbEl);

      const body = document.createElement('div');
      body.className = 'shop-card-body';
      var nameEl = document.createElement('h3');
      nameEl.className = 'shop-card-name';
      nameEl.textContent = name;
      body.appendChild(nameEl);
      if (desc) {
        var descEl = document.createElement('p');
        descEl.className = 'shop-card-desc';
        descEl.textContent = desc;
        body.appendChild(descEl);
      }
      var cta = document.createElement('span');
      cta.className = 'shop-card-cta';
      cta.textContent = buyText;
      body.appendChild(cta);
      link.appendChild(body);

      card.appendChild(link);
      grid.appendChild(card);
    });
  }

  function setCategoryActive(category) {
    var btns = document.querySelectorAll('.shop-category-btn');
    btns.forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.category === category);
    });
  }

  function init() {
    var grid = document.getElementById('shop-grid');
    var categoriesEl = document.getElementById('shop-categories');
    if (!grid) return;

    grid.innerHTML = '<p class="shop-loading">Đang tải sản phẩm...</p>';

    loadProducts().then(function (result) {
      var categories = result.categories;
      var products = result.products;

      if (!products.length) {
        grid.innerHTML = '<p class="shop-error">Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.</p>';
        return;
      }

      var activeCategory = ALL_CATEGORY;
      if (categories.length && categories[0].category === ALL_CATEGORY) {
        activeCategory = ALL_CATEGORY;
      } else if (categories.length) {
        activeCategory = categories[0].category;
      }

      renderCategories(categories, activeCategory, function (cat) {
        activeCategory = cat;
        setCategoryActive(cat);
        renderProducts(products, activeCategory);
      });
      renderProducts(products, activeCategory);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

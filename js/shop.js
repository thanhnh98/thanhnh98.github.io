/**
 * Shop / Referral products page
 * Loads products from data/aff/products, filters by category and platform,
 * opens Shopee or TikTok based on product URL (brand from URL).
 */

(function () {
  const PRODUCTS_PATH = 'data/aff/products';
  const ALL_CATEGORY = 'other';
  const ALL_PLATFORM = 'all';
  
  // Platform filter options
  const PLATFORMS = [
    { id: 'all', displayName: 'Tất cả' },
    { id: 'tiktok', displayName: 'TikTok' },
    { id: 'shopee', displayName: 'Shopee' },
    { id: 'other', displayName: 'Khác' }
  ];

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

  function normalizeText(value) {
    return String(value || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .trim();
  }

  function toAbsoluteUrl(url) {
    if (!url || typeof url !== 'string') return '';
    url = url.trim();
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    var origin = typeof window !== 'undefined' && window.location ? window.location.origin : '';
    return origin + (url.startsWith('/') ? url : '/' + url);
  }

  function showShareFeedback(message) {
    var el = document.createElement('div');
    el.className = 'shop-share-toast';
    el.textContent = message;
    el.setAttribute('role', 'status');
    document.body.appendChild(el);
    requestAnimationFrame(function () {
      el.classList.add('shop-share-toast--show');
    });
    setTimeout(function () {
      el.classList.remove('shop-share-toast--show');
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 2000);
  }

  function trackShopEvent(action, params) {
    if (typeof window !== 'undefined' && window.webAnalytics && window.webAnalytics.trackEvent) {
      window.webAnalytics.trackEvent('shop_' + action, params || {});
    }
  }

  function shareProduct(productUrl, name) {
    var shareUrl = toAbsoluteUrl(productUrl);
    if (!shareUrl) {
      showShareFeedback('Không có link để chia sẻ');
      return;
    }
    trackShopEvent('share_item', { item_name: name || '', item_url: shareUrl });
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        url: shareUrl
      }).then(function () {
        showShareFeedback('Đã chia sẻ');
      }).catch(function (err) {
        if (err && err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
          showShareFeedback('Đã copy link');
        }
      });
    } else {
      copyToClipboard(shareUrl);
      showShareFeedback('Đã copy link');
    }
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (e) {}
      document.body.removeChild(ta);
    }
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
    var activeBtn = null;
    categories.forEach(function (cat) {
      const btn = document.createElement('button');
      btn.type = 'button';
      var isActive = cat.category === activeCategory;
      btn.className = 'shop-category-btn' + (isActive ? ' active' : '');
      btn.textContent = cat.displayName || cat.category;
      btn.dataset.category = cat.category;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.addEventListener('click', function (e) {
        createRipple(e, btn);
        onSelect(cat.category);
      });
      container.appendChild(btn);
      if (isActive) {
        activeBtn = btn;
      }
    });
    // Scroll active button to center on initial render (after a small delay for DOM)
    if (activeBtn) {
      setTimeout(function () {
        scrollButtonToCenter(activeBtn);
      }, 150);
    }
  }

  function renderPlatforms(activePlatform, onSelect) {
    const container = document.getElementById('shop-platforms');
    if (!container) return;
    container.innerHTML = '';
    PLATFORMS.forEach(function (plat) {
      const btn = document.createElement('button');
      btn.type = 'button';
      var isActive = plat.id === activePlatform;
      btn.className = 'shop-platform-btn' + (isActive ? ' active' : '') + (plat.id !== 'all' && plat.id !== 'other' ? ' ' + plat.id : '');
      btn.textContent = plat.displayName;
      btn.dataset.platform = plat.id;
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.addEventListener('click', function (e) {
        createRipple(e, btn);
        onSelect(plat.id);
      });
      container.appendChild(btn);
    });
  }

  function setPlatformActive(platform) {
    var btns = document.querySelectorAll('.shop-platform-btn');
    btns.forEach(function (btn) {
      var isActive = btn.dataset.platform === platform;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function renderProducts(products, activeCategory, activePlatform, searchTerm) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;
    grid.innerHTML = '';

    // Filter by category
    var filtered = activeCategory === ALL_CATEGORY
      ? products
      : products.filter(function (p) { return p.category === activeCategory; });
    
    // Filter by platform
    if (activePlatform && activePlatform !== ALL_PLATFORM) {
      filtered = filtered.filter(function (p) {
        var brand = getBrandFromUrl(p.url);
        return brand === activePlatform;
      });
    }

    var normalizedQuery = normalizeText(searchTerm);
    if (normalizedQuery) {
      filtered = filtered.filter(function (p) {
        var haystack = normalizeText([
          p.name,
          p.description,
          p.category,
          getBrandLabel(getBrandFromUrl(p.url))
        ].join(' '));
        return haystack.indexOf(normalizedQuery) !== -1;
      });
    }

    updateResultCount(filtered.length, products.length, normalizedQuery);

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="shop-empty">Không tìm thấy sản phẩm phù hợp. Thử đổi từ khóa hoặc bỏ bớt bộ lọc.</p>';
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
      link.rel = 'noopener noreferrer nofollow';
      link.className = 'shop-card-link';
      link.setAttribute('aria-label', 'Xem sản phẩm: ' + name);
      link.addEventListener('click', function () {
        trackShopEvent('click_item', { item_name: name, item_url: url, brand: brand });
      });

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
      link.appendChild(body);
      card.appendChild(link);

      var actions = document.createElement('div');
      actions.className = 'shop-card-actions';
      var ctaLink = document.createElement('a');
      ctaLink.href = url;
      ctaLink.target = '_blank';
      ctaLink.rel = 'noopener noreferrer nofollow';
      ctaLink.className = 'shop-card-cta';
      ctaLink.textContent = buyText;
      ctaLink.addEventListener('click', function () {
        trackShopEvent('click_item', { item_name: name, item_url: url, brand: brand });
      });
      actions.appendChild(ctaLink);
      var shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.className = 'shop-card-share';
      shareBtn.setAttribute('aria-label', 'Chia sẻ sản phẩm');
      shareBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';
      shareBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        shareProduct(url, name);
      });
      actions.appendChild(shareBtn);
      card.appendChild(actions);
      grid.appendChild(card);
    });
  }

  function updateResultCount(count, total, hasSearch) {
    var el = document.getElementById('shop-result-count');
    if (!el) return;
    if (hasSearch) {
      el.textContent = count + '/' + total + ' sản phẩm phù hợp';
      return;
    }
    el.textContent = count + ' sản phẩm';
  }

  function setCategoryActive(category) {
    var btns = document.querySelectorAll('.shop-category-btn');
    var activeBtn = null;
    btns.forEach(function (btn) {
      var isActive = btn.dataset.category === category;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) {
        activeBtn = btn;
      }
    });
    // Scroll active button to center on mobile (with small delay to ensure DOM is updated)
    if (activeBtn) {
      requestAnimationFrame(function () {
        scrollButtonToCenter(activeBtn);
      });
    }
  }

  /**
   * Scroll button to center of its container (for mobile horizontal scroll)
   */
  function scrollButtonToCenter(btn) {
    if (!btn) return;
    var container = btn.parentElement;
    if (!container) return;
    
    // Only apply when container is scrollable
    if (container.scrollWidth <= container.clientWidth) return;
    
    // Calculate the scroll position to center the button
    var btnLeft = btn.offsetLeft;
    var btnWidth = btn.offsetWidth;
    var containerWidth = container.clientWidth;
    
    // Target scroll position: button center aligned with container center
    var scrollTarget = btnLeft - (containerWidth / 2) + (btnWidth / 2);
    
    // Clamp to valid scroll range
    var maxScroll = container.scrollWidth - containerWidth;
    scrollTarget = Math.max(0, Math.min(scrollTarget, maxScroll));
    
    // Smooth scroll to center
    container.scrollTo({
      left: scrollTarget,
      behavior: 'smooth'
    });
  }

  /**
   * Create ripple effect on button click
   */
  function createRipple(event, btn) {
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var x = event.clientX - rect.left - size / 2;
    var y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    btn.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(function () {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, 500);
  }

  /**
   * Lấy category từ URL: ?category=xxx hoặc #xxx
   * Trả về category id nếu hợp lệ, null nếu không có hoặc không khớp danh sách.
   */
  function getCategoryFromUrl(validCategories) {
    if (!validCategories || !validCategories.length) return null;
    var set = {};
    validCategories.forEach(function (c) {
      set[c.category] = true;
    });
    var search = typeof window !== 'undefined' && window.location ? window.location.search : '';
    var hash = typeof window !== 'undefined' && window.location ? window.location.hash : '';
    var fromQuery = null;
    var fromHash = null;
    if (search) {
      var m = search.match(/\bcategory=([^&]+)/i);
      if (m) fromQuery = decodeURIComponent(m[1].replace(/\+/g, ' ')).trim();
    }
    if (hash && hash.length > 1) {
      fromHash = decodeURIComponent(hash.slice(1).replace(/\+/g, ' ')).trim();
    }
    var slug = fromQuery || fromHash;
    if (!slug) return null;
    if (set[slug]) return slug;
    return null;
  }

  /**
   * Cập nhật URL với category hiện tại (không reload trang).
   * Dùng query ?category= để dễ share và SEO.
   */
  function updateUrlCategory(category) {
    if (typeof window === 'undefined' || !window.history || !window.location) return;
    var base = window.location.pathname || '/cua-hang.html';
    var url = category && category !== ALL_CATEGORY
      ? base + '?category=' + encodeURIComponent(category)
      : base;
    if (window.location.search + (window.location.hash || '') !== (url === base ? '' : url.slice(base.length))) {
      window.history.replaceState({ category: category }, '', url);
    }
  }

  function init() {
    var grid = document.getElementById('shop-grid');
    var categoriesEl = document.getElementById('shop-categories');
    var searchInput = document.getElementById('shop-search');
    if (!grid) return;

    trackShopEvent('open', { page_path: typeof window !== 'undefined' && window.location ? window.location.pathname : '' });
    grid.innerHTML = '<p class="shop-loading">Đang tải sản phẩm...</p>';

    loadProducts().then(function (result) {
      var categories = result.categories;
      var products = result.products;

      if (!products.length) {
        grid.innerHTML = '<p class="shop-error">Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.</p>';
        return;
      }

      var activeCategory = ALL_CATEGORY;
      var activePlatform = ALL_PLATFORM;
      var activeSearch = '';
      var fromUrl = getCategoryFromUrl(categories);
      if (fromUrl) {
        activeCategory = fromUrl;
      } else if (categories.length && categories[0].category === ALL_CATEGORY) {
        activeCategory = ALL_CATEGORY;
      } else if (categories.length) {
        activeCategory = categories[0].category;
      }

      updateUrlCategory(activeCategory);

      renderCategories(categories, activeCategory, function (cat) {
        activeCategory = cat;
        setCategoryActive(cat);
        renderProducts(products, activeCategory, activePlatform, activeSearch);
        updateUrlCategory(activeCategory);
      });
      
      renderPlatforms(activePlatform, function (plat) {
        activePlatform = plat;
        setPlatformActive(plat);
        renderProducts(products, activeCategory, activePlatform, activeSearch);
      });

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          activeSearch = searchInput.value || '';
          renderProducts(products, activeCategory, activePlatform, activeSearch);
        });
      }
      
      renderProducts(products, activeCategory, activePlatform, activeSearch);
      if (window.lucide && window.lucide.createIcons) {
        window.lucide.createIcons();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

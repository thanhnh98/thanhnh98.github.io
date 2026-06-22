/**
 * Shop / Referral products page
 * Loads products from data/aff/products, filters by category and platform,
 * opens Shopee or TikTok based on product URL (brand from URL).
 */

(function () {
  const PRODUCTS_PATH = 'data/aff/products';
  const ALL_CATEGORY = 'other';
  const ALL_PLATFORM = 'all';

  // Emoji icons for each category slug
  const CATEGORY_ICONS = {
    'other':       '🛍️',
    'lixi':        '🧧',
    'quatet':      '🎁',
    'decor':       '🏮',
    'clothes':     '👘',
    'banhkeo':     '🍬',
    'thucpham':    '🥘',
    'thucphamkho': '🏺',
    'assets':      '📦',
    'bachhoa':     '🛒',
    'tech':        '💡',
    'electric':    '⚡',
    'oplung':      '📱',
  };

  // Platform filter options
  const PLATFORMS = [
    { id: 'all',    displayName: 'Tất cả' },
    { id: 'tiktok', displayName: 'TikTok Shop' },
    { id: 'shopee', displayName: 'Shopee' },
  ];

  function getBrandFromUrl(url) {
    if (!url || typeof url !== 'string') return 'other';
    const u = url.toLowerCase();
    if (u.includes('shopee')) return 'shopee';
    if (u.includes('tiktok') || u.includes('vt.tiktok')) return 'tiktok';
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

  /**
   * Strip noise suffixes from Shopee/TikTok product names.
   * e.g. "Sản phẩm ABC | Shopee Việt Nam" → "Sản phẩm ABC"
   */
  function cleanName(raw) {
    if (!raw) return '';
    return raw
      .replace(/\s*\|\s*shopee việt nam/i, '')
      .replace(/\s*\|\s*shopee/i, '')
      .replace(/\s*\|\s*tiktok shop/i, '')
      .trim();
  }

  /**
   * Parse sold-count badge from description.
   * Returns { soldText, cleanDesc } where soldText may be null.
   * Hides generic Shopee boilerplate copy.
   */
  function parseDescription(raw) {
    if (!raw || typeof raw !== 'string') return { soldText: null, cleanDesc: '' };
    const trimmed = raw.trim();

    // Detect "Xk+ lượt bán" or "X lượt bán" pattern
    const soldMatch = trimmed.match(/(\d[\d.,k+]+\+?\s*lượt bán)/i);
    const soldText = soldMatch ? soldMatch[1].trim() : null;

    // Detect generic Shopee boilerplate (starts with "Mua " and contains "Shopee đảm bảo" / "XEM NGAY")
    const isBoilerplate = /^Mua .+giá tốt/i.test(trimmed) ||
                          /shopee đảm bảo nhận hàng/i.test(trimmed) ||
                          /XEM NGAY!/i.test(trimmed) ||
                          /Sản phẩm từ Shopee/i.test(trimmed);

    const cleanDesc = isBoilerplate ? '' : trimmed;
    return { soldText, cleanDesc };
  }

  /**
   * CTA text and CSS class per platform.
   */
  function getCtaInfo(brand, fallbackText) {
    if (brand === 'shopee') return { text: 'Mua trên Shopee', cls: 'cta-shopee' };
    if (brand === 'tiktok') return { text: 'Xem TikTok Shop', cls: 'cta-tiktok' };
    return { text: fallbackText || 'Xem sản phẩm', cls: '' };
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

  /**
   * Pick N random items from array.
   * Seed = today's date string so picks stay stable within the same day
   * but refresh daily (gives "hôm nay" feel without needing a server).
   */
  function pickHighlightProducts(products, count) {
    if (!products || !products.length) return [];
    count = Math.min(count, products.length);

    // Simple date-seeded shuffle (Fisher-Yates with lcg)
    var today = new Date();
    var seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    function lcg(s) { return (s * 1664525 + 1013904223) & 0xffffffff; }

    // Clone & shuffle
    var arr = products.slice();
    var s = seed;
    for (var i = arr.length - 1; i > 0; i--) {
      s = lcg(s);
      var j = Math.abs(s) % (i + 1);
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr.slice(0, count);
  }

  /**
   * Render the "\u0110\u01b0\u1ee3c l\u1ef1a ch\u1ecdn nhi\u1ec1u nh\u1ea5t" highlight strip.
   * Shows HIGHLIGHT_COUNT random products in a horizontal-scroll track.
   */
  var HIGHLIGHT_COUNT = 6;

  function renderHighlight(products) {
    var track = document.getElementById('shop-highlight-track');
    var section = document.getElementById('shop-highlight-section');
    if (!track || !section) return;

    var picks = pickHighlightProducts(products, HIGHLIGHT_COUNT);
    if (!picks.length) {
      section.style.display = 'none';
      return;
    }

    track.innerHTML = '';

    picks.forEach(function (p) {
      var brand = getBrandFromUrl(p.url);
      var brandLabel = getBrandLabel(brand);
      var brandClass = getBrandClass(brand);
      var name = cleanName((p.name && p.name.trim()) || 'S\u1ea3n ph\u1ea9m');
      var thumb = (p.thumbnail && p.thumbnail.trim()) ? p.thumbnail : '';
      var url = (p.url && p.url.trim()) || '#';
      var ctaInfo = getCtaInfo(brand, p.buyText);

      // Card wrapper
      var card = document.createElement('article');
      card.className = 'hl-card';
      card.setAttribute('role', 'listitem');

      // Entire card is a link
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer nofollow';
      link.className = 'hl-card-link';
      link.setAttribute('aria-label', name);
      link.addEventListener('click', function () {
        trackShopEvent('highlight_click', { item_name: name, item_url: url, brand: brand });
      });

      // Thumbnail
      var thumbEl = document.createElement('div');
      thumbEl.className = 'hl-card-thumb';
      if (thumb) {
        var img = document.createElement('img');
        img.src = thumb;
        img.alt = name;
        img.loading = 'lazy';
        img.onerror = function () {
          thumbEl.innerHTML = '<span aria-hidden="true" class="hl-card-placeholder">\uD83D\uDECD\uFE0F</span>';
        };
        thumbEl.appendChild(img);
      } else {
        thumbEl.innerHTML = '<span aria-hidden="true" class="hl-card-placeholder">\uD83D\uDECD\uFE0F</span>';
      }

      // Platform badge
      if (brandLabel) {
        var badge = document.createElement('span');
        badge.className = 'shop-card-badge ' + brandClass;
        badge.textContent = brandLabel;
        thumbEl.appendChild(badge);
      }

      link.appendChild(thumbEl);

      // Name
      var nameEl = document.createElement('p');
      nameEl.className = 'hl-card-name';
      nameEl.textContent = name;
      link.appendChild(nameEl);

      card.appendChild(link);

      // CTA button
      var cta = document.createElement('a');
      cta.href = url;
      cta.target = '_blank';
      cta.rel = 'noopener noreferrer nofollow';
      cta.className = 'hl-card-cta ' + ctaInfo.cls;
      cta.textContent = ctaInfo.text;
      cta.addEventListener('click', function () {
        trackShopEvent('highlight_click', { item_name: name, item_url: url, brand: brand });
      });
      card.appendChild(cta);

      track.appendChild(card);
    });
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
        // Deduplicate categories by category slug (keep first occurrence)
        var rawCats = Array.isArray(data.categories) ? data.categories : [];
        var seenCats = {};
        var dedupedCats = rawCats.filter(function (c) {
          if (seenCats[c.category]) return false;
          seenCats[c.category] = true;
          return true;
        });
        return {
          categories: dedupedCats,
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
      // Add emoji icon if available
      var icon = CATEGORY_ICONS[cat.category] || '';
      var label = cat.displayName || cat.category;
      btn.innerHTML = icon
        ? '<span class="cat-icon" aria-hidden="true">' + icon + '</span><span class="cat-label">' + label + '</span>'
        : '<span class="cat-label">' + label + '</span>';
      btn.dataset.category = cat.category;
      btn.setAttribute('aria-label', label);
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
      const rawName = (p.name && p.name.trim()) || 'Sản phẩm';
      const name = cleanName(rawName);
      const { soldText, cleanDesc } = parseDescription(p.description);
      const ctaInfo = getCtaInfo(brand, p.buyText);
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

      // Thumbnail
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
      // Platform badge
      if (brandLabel) {
        var badge = document.createElement('span');
        badge.className = 'shop-card-badge ' + brandClass;
        badge.textContent = brandLabel;
        thumbEl.appendChild(badge);
      }
      link.appendChild(thumbEl);

      // Card body
      const body = document.createElement('div');
      body.className = 'shop-card-body';

      var nameEl = document.createElement('h3');
      nameEl.className = 'shop-card-name';
      nameEl.textContent = name;
      body.appendChild(nameEl);

      // "Được chọn nhiều" pill from description soldText
      if (soldText) {
        var soldEl = document.createElement('p');
        soldEl.className = 'shop-card-sold';
        soldEl.innerHTML = '<span class="shop-card-sold-icon" aria-hidden="true">🔥</span>' + soldText + ' đã chọn';
        body.appendChild(soldEl);
      } else if (cleanDesc) {
        // Only show description if it's custom/useful (not Shopee boilerplate)
        var descEl = document.createElement('p');
        descEl.className = 'shop-card-desc';
        descEl.textContent = cleanDesc;
        body.appendChild(descEl);
      }

      link.appendChild(body);
      card.appendChild(link);

      // Actions row
      var actions = document.createElement('div');
      actions.className = 'shop-card-actions';

      var ctaLink = document.createElement('a');
      ctaLink.href = url;
      ctaLink.target = '_blank';
      ctaLink.rel = 'noopener noreferrer nofollow';
      ctaLink.className = 'shop-card-cta ' + ctaInfo.cls;
      ctaLink.textContent = ctaInfo.text;
      ctaLink.addEventListener('click', function () {
        trackShopEvent('click_item', { item_name: name, item_url: url, brand: brand });
      });
      actions.appendChild(ctaLink);

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

      // Highlight section — render before main grid
      renderHighlight(products);

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

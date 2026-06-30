/**
 * Shop / Referral products page
 * Loads products from data/aff/products, filters by category/categories and platform,
 * opens Shopee or TikTok based on product URL (brand from URL).
 */

(function () {
  const PRODUCTS_PATH = 'data/aff/products';
  const ALL_GROUP = 'all';
  const ALL_CATEGORY = 'all';
  const ALL_PLATFORM = 'all';

  const GROUP_ICONS = {
    'all':                '🛍️',
    'tech-accessories':   '📱',
    'fashion-personal':   '👗',
    'home-living':        '🏠',
    'food-drink':         '🍽️',
    'gifts-decor':        '🎁',
    'learning-office':    '✏️',
    'other':              '✨',
  };

  const GROUP_LABELS = {
    'tech-accessories': 'Công nghệ & phụ kiện',
    'fashion-personal': 'Thời trang & cá nhân',
    'home-living': 'Nhà cửa & đời sống',
    'food-drink': 'Đồ ăn & thức uống',
    'gifts-decor': 'Quà tặng & trang trí',
    'learning-office': 'Học tập & văn phòng',
    'other': 'Khác',
  };

  const CATEGORY_ICONS = {
    'all':                 '🛍️',
    'phone-tablet':        '📱',
    'smart-wearables':     '⌚',
    'phone-accessories':   '🔌',
    'phone-cases':         '📲',
    'electronics-gadgets': '💡',
    'apparel':             '👘',
    'shoes-bags':          '👟',
    'personal-accessories':'🧢',
    'beauty-personal-care':'🧴',
    'home-appliances':     '⚡',
    'kitchen-dining':      '🍳',
    'home-essentials':     '📦',
    'home-comfort':        '🛏️',
    'snacks-sweets':       '🍬',
    'drinks':              '☕',
    'pantry-food':         '🥘',
    'gift-sets':           '🎁',
    'decorations':         '🏮',
    'lucky-money':         '🧧',
    'games-toys':          '🎲',
    'stationery':          '🖊️',
    'learning-tools':      '🧮',
    'misc':                '✨',
  };

  const LEGACY_CATEGORY_ALIASES = {
    'other':       { group: ALL_GROUP, category: ALL_CATEGORY },
    'lixi':        { group: 'gifts-decor', category: 'lucky-money' },
    'quatet':      { group: 'gifts-decor', category: 'gift-sets' },
    'decor':       { group: 'gifts-decor', category: 'decorations' },
    'clothes':     { group: 'fashion-personal', category: 'apparel' },
    'banhkeo':     { group: 'food-drink', category: 'snacks-sweets' },
    'thucpham':    { group: 'food-drink', category: 'pantry-food' },
    'thucphamkho': { group: 'food-drink', category: 'drinks' },
    'assets':      { group: 'home-living', category: 'home-essentials' },
    'bachhoa':     { group: 'home-living', category: 'home-essentials' },
    'tech':        { group: 'tech-accessories', category: ALL_CATEGORY },
    'electric':    { group: 'home-living', category: 'home-appliances' },
    'Điện tử':     { group: 'tech-accessories', category: 'electronics-gadgets' },
    'oplung':      { group: 'tech-accessories', category: 'phone-cases' },
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

  function dedupeByKey(items, key) {
    var seen = {};
    return (items || []).filter(function (item) {
      var value = item && item[key];
      if (!value || seen[value]) return false;
      seen[value] = true;
      return true;
    });
  }

  function getCategoryMeta(categories, category) {
    for (var i = 0; i < (categories || []).length; i++) {
      if (categories[i].category === category) return categories[i];
    }
    return null;
  }

  function getProductCategories(product) {
    if (!product) return [];
    var value = Array.isArray(product.category) ? product.category : product.categories;
    if (!Array.isArray(value)) value = product.category ? [product.category] : [];
    var seen = {};
    return value.map(function (category) {
      return String(category || '').trim();
    }).filter(function (category) {
      if (!category || seen[category]) return false;
      seen[category] = true;
      return true;
    });
  }

  function getPrimaryCategory(product) {
    return getProductCategories(product)[0] || '';
  }

  function productHasCategory(product, category) {
    if (!category || category === ALL_CATEGORY) return true;
    return getProductCategories(product).indexOf(category) !== -1;
  }

  function getProductGroups(product) {
    if (!product) return [];
    var value = Array.isArray(product.groups) ? product.groups : [product.group];
    var seen = {};
    return value.map(function (group) {
      return String(group || '').trim();
    }).filter(function (group) {
      if (!group || seen[group]) return false;
      seen[group] = true;
      return true;
    });
  }

  function productHasGroup(product, group) {
    if (!group || group === ALL_GROUP) return true;
    return getProductGroups(product).indexOf(group) !== -1;
  }

  function getProductGroup(product, categories) {
    var productCategories = getProductCategories(product);
    for (var i = 0; i < productCategories.length; i++) {
      var meta = getCategoryMeta(categories, productCategories[i]);
      if (meta && meta.group) return meta.group;
    }
    if (product && product.group) return product.group;
    return 'other';
  }

  function getProductCategorySearchText(product) {
    return getProductCategories(product).join(' ');
  }

  function getProductGroupSearchText(product) {
    return getProductGroups(product).join(' ');
  }

  function normalizeProduct(product, categories) {
    var copy = Object.assign({}, product);
    var productCategories = getProductCategories(copy);
    if (!productCategories.length && copy.category) productCategories = [copy.category];
    copy.category = productCategories;
    copy.group = getProductGroup(copy, categories);
    copy.groups = [copy.group];
    productCategories.forEach(function (category) {
      var meta = getCategoryMeta(categories, category);
      if (meta && meta.group && copy.groups.indexOf(meta.group) === -1) {
        copy.groups.push(meta.group);
      }
    });
    return copy;
  }

  function getLegacyProductGroup(product, categories) {
    var meta = getCategoryMeta(categories, getPrimaryCategory(product));
    if (meta && meta.group) return meta.group;
    if (product && product.group) return product.group;
    return 'other';
  }

  function buildGroups(rawGroups, categories, products) {
    var groups = dedupeByKey(rawGroups, 'group');
    if (groups.length) return groups;

    var seen = {};
    var derived = [];

    function addGroup(group) {
      if (!group || seen[group] || group === ALL_GROUP) return;
      seen[group] = true;
      derived.push({
        group: group,
        displayName: GROUP_LABELS[group] || group
      });
    }

    (categories || []).forEach(function (cat) {
      addGroup(cat && cat.group);
    });
    (products || []).forEach(function (product) {
      addGroup(getLegacyProductGroup(product, categories));
    });

    return derived;
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
        var rawGroups = Array.isArray(data.groups) ? data.groups : [];
        var rawCats = Array.isArray(data.categories) ? data.categories : [];
        var dedupedCats = dedupeByKey(rawCats, 'category');
        var dedupedGroups = buildGroups(rawGroups, dedupedCats, data.products);
        var products = data.products.map(function (p) {
          return normalizeProduct(p, dedupedCats);
        });
        return {
          groups: dedupedGroups,
          categories: dedupedCats,
          products: products
        };
      } catch (err) {
        if (i === paths.length - 1) {
          console.error('Shop: failed to load products', err);
          return { groups: [], categories: [], products: [] };
        }
      }
    }
    return { groups: [], categories: [], products: [] };
  }

  function renderGroups(groups, activeGroup, onSelect) {
    const container = document.getElementById('shop-groups');
    if (!container) return;
    var list = [{ group: ALL_GROUP, displayName: 'Tất cả' }].concat(groups || []);
    container.innerHTML = '';
    var activeBtn = null;
    list.forEach(function (group) {
      const btn = document.createElement('button');
      btn.type = 'button';
      var isActive = group.group === activeGroup;
      btn.className = 'shop-category-btn' + (isActive ? ' active' : '');
      var icon = GROUP_ICONS[group.group] || '';
      var label = group.displayName || group.group;
      btn.innerHTML = icon
        ? '<span class="cat-icon" aria-hidden="true">' + icon + '</span><span class="cat-label">' + label + '</span>'
        : '<span class="cat-label">' + label + '</span>';
      btn.dataset.group = group.group;
      btn.setAttribute('aria-label', label);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      btn.addEventListener('click', function (e) {
        createRipple(e, btn);
        onSelect(group.group);
      });
      container.appendChild(btn);
      if (isActive) activeBtn = btn;
    });
    if (activeBtn) {
      setTimeout(function () {
        scrollButtonToCenter(activeBtn);
      }, 150);
    }
  }

  function renderCategories(categories, activeGroup, activeCategory, onSelect) {
    const select = document.getElementById('shop-categories');
    if (!select) return;
    select.innerHTML = '';
    var visibleCategories = (categories || []).filter(function (cat) {
      return activeGroup === ALL_GROUP || cat.group === activeGroup;
    });
    var list = [{ category: ALL_CATEGORY, displayName: 'Tất cả', group: activeGroup }].concat(visibleCategories);
    list.forEach(function (cat) {
      const option = document.createElement('option');
      var label = cat.displayName || cat.category;
      option.value = cat.category;
      option.textContent = label;
      if (cat.category === activeCategory) option.selected = true;
      select.appendChild(option);
    });
    if (!list.some(function (cat) { return cat.category === activeCategory; })) {
      select.value = ALL_CATEGORY;
    }
    select.onchange = function () {
      onSelect(select.value || ALL_CATEGORY);
    };
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

  function renderProducts(products, activeGroup, activeCategory, activePlatform, searchTerm) {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;
    grid.innerHTML = '';

    var filtered = activeGroup === ALL_GROUP
      ? products
      : products.filter(function (p) { return productHasGroup(p, activeGroup); });

    if (activeCategory !== ALL_CATEGORY) {
      filtered = filtered.filter(function (p) { return productHasCategory(p, activeCategory); });
    }
    
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
          getProductGroupSearchText(p),
          getProductCategorySearchText(p),
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
    var select = document.getElementById('shop-categories');
    if (select) select.value = category || ALL_CATEGORY;
  }

  function setGroupActive(group) {
    var btns = document.querySelectorAll('#shop-groups .shop-category-btn');
    var activeBtn = null;
    btns.forEach(function (btn) {
      var isActive = btn.dataset.group === group;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      if (isActive) activeBtn = btn;
    });
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

  function getFiltersFromUrl(validGroups, validCategories) {
    var groupSet = {};
    var categorySet = {};
    (validGroups || []).forEach(function (g) {
      groupSet[g.group] = true;
    });
    (validCategories || []).forEach(function (c) {
      categorySet[c.category] = c;
    });
    var search = typeof window !== 'undefined' && window.location ? window.location.search : '';
    var hash = typeof window !== 'undefined' && window.location ? window.location.hash : '';
    var group = null;
    var category = null;
    var fromHash = null;
    if (search) {
      var groupMatch = search.match(/\bgroup=([^&]+)/i);
      var categoryMatch = search.match(/\bcategory=([^&]+)/i);
      if (groupMatch) group = decodeURIComponent(groupMatch[1].replace(/\+/g, ' ')).trim();
      if (categoryMatch) category = decodeURIComponent(categoryMatch[1].replace(/\+/g, ' ')).trim();
    }
    if (hash && hash.length > 1) {
      fromHash = decodeURIComponent(hash.slice(1).replace(/\+/g, ' ')).trim();
    }
    if (!category && fromHash) category = fromHash;

    if (category && LEGACY_CATEGORY_ALIASES[category]) {
      return LEGACY_CATEGORY_ALIASES[category];
    }
    if (category && categorySet[category]) {
      return { group: groupSet[group] ? group : categorySet[category].group, category: category };
    }
    if (group && groupSet[group]) {
      return { group: group, category: ALL_CATEGORY };
    }
    return { group: ALL_GROUP, category: ALL_CATEGORY };
  }

  function updateUrlFilters(group, category) {
    if (typeof window === 'undefined' || !window.history || !window.location) return;
    var base = window.location.pathname || '/cua-hang.html';
    var params = [];
    if (group && group !== ALL_GROUP) params.push('group=' + encodeURIComponent(group));
    if (category && category !== ALL_CATEGORY) params.push('category=' + encodeURIComponent(category));
    var url = params.length ? base + '?' + params.join('&') : base;
    if (window.location.pathname + window.location.search !== url) {
      window.history.replaceState({ group: group, category: category }, '', url);
    }
  }

  function init() {
    var grid = document.getElementById('shop-grid');
    var searchInput = document.getElementById('shop-search');
    if (!grid) return;

    trackShopEvent('open', { page_path: typeof window !== 'undefined' && window.location ? window.location.pathname : '' });
    grid.innerHTML = '<p class="shop-loading">Đang tải sản phẩm...</p>';

    loadProducts().then(function (result) {
      var groups = result.groups;
      var categories = result.categories;
      var products = result.products;

      if (!products.length) {
        grid.innerHTML = '<p class="shop-error">Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.</p>';
        return;
      }

      var activeCategory = ALL_CATEGORY;
      var activePlatform = ALL_PLATFORM;
      var activeSearch = '';
      var fromUrl = getFiltersFromUrl(groups, categories);
      var activeGroup = fromUrl.group || ALL_GROUP;
      activeCategory = fromUrl.category || ALL_CATEGORY;

      updateUrlFilters(activeGroup, activeCategory);

      function selectCategory(cat) {
        activeCategory = cat;
        setCategoryActive(cat);
        renderProducts(products, activeGroup, activeCategory, activePlatform, activeSearch);
        updateUrlFilters(activeGroup, activeCategory);
      }

      renderGroups(groups, activeGroup, function (group) {
        activeGroup = group;
        activeCategory = ALL_CATEGORY;
        setGroupActive(group);
        renderCategories(categories, activeGroup, activeCategory, selectCategory);
        renderProducts(products, activeGroup, activeCategory, activePlatform, activeSearch);
        updateUrlFilters(activeGroup, activeCategory);
      });

      renderCategories(categories, activeGroup, activeCategory, selectCategory);
      
      renderPlatforms(activePlatform, function (plat) {
        activePlatform = plat;
        setPlatformActive(plat);
        renderProducts(products, activeGroup, activeCategory, activePlatform, activeSearch);
      });

      if (searchInput) {
        searchInput.addEventListener('input', function () {
          activeSearch = searchInput.value || '';
          renderProducts(products, activeGroup, activeCategory, activePlatform, activeSearch);
        });
      }

      // Highlight section — render before main grid
      renderHighlight(products);

      renderProducts(products, activeGroup, activeCategory, activePlatform, activeSearch);
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

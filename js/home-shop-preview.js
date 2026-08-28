(function () {
  'use strict';

  var PRODUCT_LIMIT = 12;
  var AUTOPLAY_DELAY = 5000;
  var loaded = false;
  var allProducts = [];
  var activeCategory = 'all';
  var autoplayTimer = null;
  var dragState = null;
  var preventNextClick = false;

  function scoreProduct(product) {
    var text = [product.name, product.group].concat(product.category || []).join(' ').toLowerCase();
    var score = 0;
    if (/2027/.test(text)) score += 30;
    if (/tết|tet/.test(text)) score += 30;
    if (/lì xì|li xi/.test(text)) score += 24;
    if (/valentine/.test(text)) score -= 30;
    if (/2026/.test(text)) score -= 12;
    if (/trang trí|quà tặng/.test(text)) score += 10;
    if (/gift|decor|home-living/.test(text)) score += 8;
    if (product.thumbnail) score += 2;
    return score;
  }

  function rankProducts(products) {
    return (products || [])
      .filter(function (product) { return product && product.url && product.name && product.thumbnail; })
      .map(function (product, index) { return { product: product, score: scoreProduct(product), index: index }; })
      .sort(function (a, b) { return b.score - a.score || a.index - b.index; });
  }

  function hasCategory(item, category) {
    return (item.product.category || []).indexOf(category) !== -1;
  }

  function chooseProducts(products, category) {
    var ranked = rankProducts(products);
    if (category !== 'all') {
      return ranked.filter(function (item) { return hasCategory(item, category); })
        .slice(0, PRODUCT_LIMIT)
        .map(function (item) { return item.product; });
    }

    var selected = [];
    ['lucky-money', 'decorations', 'gift-sets'].forEach(function (categoryName) {
      var match = ranked.find(function (item) {
        return selected.indexOf(item) === -1 && hasCategory(item, categoryName);
      });
      if (match) selected.push(match);
    });
    ranked.forEach(function (item) {
      if (selected.length < PRODUCT_LIMIT && selected.indexOf(item) === -1) selected.push(item);
    });
    return selected.slice(0, PRODUCT_LIMIT).map(function (item) { return item.product; });
  }

  function getBrandLabel(product) {
    var value = String(product.url || product.type || '').toLowerCase();
    return value.indexOf('tiktok') !== -1 ? 'TikTok Shop' : 'Shopee';
  }

  function getBrandClass(product) {
    return getBrandLabel(product) === 'TikTok Shop' ? 'tiktok' : 'shopee';
  }

  function makeCard(product) {
    var article = document.createElement('article');
    article.className = 'home-shop-card';
    article.setAttribute('role', 'listitem');

    var link = document.createElement('a');
    link.className = 'home-shop-card-link';
    link.href = product.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer sponsored';
    link.setAttribute('aria-label', 'Xem sản phẩm: ' + product.name);

    var thumb = document.createElement('div');
    thumb.className = 'home-shop-card-thumb';
    var image = document.createElement('img');
    image.src = product.thumbnail;
    image.alt = product.name;
    image.loading = 'lazy';
    image.decoding = 'async';
    thumb.appendChild(image);

    var badge = document.createElement('span');
    badge.className = 'home-shop-card-badge ' + getBrandClass(product);
    badge.textContent = getBrandLabel(product);
    thumb.appendChild(badge);

    var body = document.createElement('div');
    body.className = 'home-shop-card-body';
    var eyebrow = document.createElement('span');
    eyebrow.className = 'home-shop-card-eyebrow';
    eyebrow.textContent = 'Gợi ý sắm Tết';
    var name = document.createElement('h4');
    name.className = 'home-shop-card-name';
    name.textContent = product.name;
    var cta = document.createElement('span');
    cta.className = 'home-shop-card-cta';
    cta.textContent = 'Xem sản phẩm';
    var arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';
    cta.appendChild(arrow);
    body.appendChild(eyebrow);
    body.appendChild(name);
    body.appendChild(cta);

    link.appendChild(thumb);
    link.appendChild(body);
    article.appendChild(link);
    return article;
  }

  function stopAutoplay() {
    if (autoplayTimer) window.clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  function getScrollStep() {
    var slider = document.getElementById('home-shop-slider');
    var track = document.getElementById('home-shop-track');
    var firstCard = track && track.querySelector('.home-shop-card');
    if (!slider || !track || !firstCard) return 0;
    var gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    var itemStep = firstCard.getBoundingClientRect().width + gap;
    var itemsPerPage = Math.max(1, Math.floor((slider.clientWidth + gap) / itemStep));
    return itemStep * itemsPerPage;
  }

  function moveCarousel(direction) {
    var slider = document.getElementById('home-shop-slider');
    if (!slider) return;
    var step = getScrollStep();
    if (!step) return;
    var maxScroll = Math.max(0, slider.scrollWidth - slider.clientWidth);
    var next;
    if (direction > 0) next = slider.scrollLeft >= maxScroll - 4 ? 0 : Math.min(maxScroll, slider.scrollLeft + step);
    else next = slider.scrollLeft <= 4 ? maxScroll : Math.max(0, slider.scrollLeft - step);
    slider.scrollTo({ left: next, behavior: 'smooth' });
  }

  function startAutoplay() {
    stopAutoplay();
    var slider = document.getElementById('home-shop-slider');
    var cards = document.querySelectorAll('#home-shop-track .home-shop-card');
    if (!slider || cards.length < 2 || slider.scrollWidth <= slider.clientWidth) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoplayTimer = window.setInterval(function () { moveCarousel(1); }, AUTOPLAY_DELAY);
  }

  function restartAutoplay() {
    stopAutoplay();
    window.setTimeout(startAutoplay, 250);
  }

  function updateCategoryButtons() {
    document.querySelectorAll('[data-home-shop-category]').forEach(function (button) {
      var active = button.getAttribute('data-home-shop-category') === activeCategory;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function render() {
    var track = document.getElementById('home-shop-track');
    var slider = document.getElementById('home-shop-slider');
    var loading = document.getElementById('home-shop-loading');
    if (!track) return;

    var selected = chooseProducts(allProducts, activeCategory);
    stopAutoplay();
    track.innerHTML = '';
    selected.forEach(function (product) { track.appendChild(makeCard(product)); });
    if (slider) slider.scrollLeft = 0;
    if (loading) {
      loading.hidden = selected.length > 0;
      if (!selected.length) loading.textContent = 'Chưa có gợi ý phù hợp.';
    }
    window.requestAnimationFrame(startAutoplay);
  }

  function bindCarousel() {
    var slider = document.getElementById('home-shop-slider');
    if (!slider) return;

    document.querySelector('[data-home-shop-prev]')?.addEventListener('click', function () { moveCarousel(-1); restartAutoplay(); });
    document.querySelector('[data-home-shop-next]')?.addEventListener('click', function () { moveCarousel(1); restartAutoplay(); });
    document.querySelectorAll('[data-home-shop-category]').forEach(function (button) {
      button.addEventListener('click', function () {
        activeCategory = button.getAttribute('data-home-shop-category') || 'all';
        updateCategoryButtons();
        render();
      });
    });

    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);
    slider.addEventListener('touchstart', stopAutoplay, { passive: true });
    slider.addEventListener('touchend', restartAutoplay, { passive: true });
    slider.addEventListener('wheel', restartAutoplay, { passive: true });
    slider.addEventListener('keydown', function (event) {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      moveCarousel(event.key === 'ArrowRight' ? 1 : -1);
      restartAutoplay();
    });

    slider.addEventListener('pointerdown', function (event) {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      dragState = { x: event.clientX, left: slider.scrollLeft, moved: false };
      slider.classList.add('is-dragging');
      stopAutoplay();
    });
    slider.addEventListener('pointermove', function (event) {
      if (!dragState) return;
      var distance = event.clientX - dragState.x;
      if (Math.abs(distance) > 5) dragState.moved = true;
      if (!dragState.moved) return;
      event.preventDefault();
      slider.scrollLeft = dragState.left - distance;
    });
    function finishDrag() {
      if (!dragState) return;
      preventNextClick = dragState.moved;
      dragState = null;
      slider.classList.remove('is-dragging');
      restartAutoplay();
    }
    slider.addEventListener('pointerup', finishDrag);
    slider.addEventListener('pointercancel', finishDrag);
    slider.addEventListener('pointerleave', finishDrag);
    slider.addEventListener('click', function (event) {
      if (!preventNextClick) return;
      event.preventDefault();
      event.stopPropagation();
      preventNextClick = false;
    }, true);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopAutoplay();
      else startAutoplay();
    });
  }

  function load() {
    if (loaded) return;
    loaded = true;
    fetch('/data/aff/products')
      .then(function (response) { if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); })
      .then(function (payload) {
        allProducts = payload && payload.data ? payload.data.products || [] : [];
        render();
      })
      .catch(function () {
        var loading = document.getElementById('home-shop-loading');
        if (loading) loading.textContent = 'Không tải được gợi ý lúc này.';
      });
  }

  function init() {
    var section = document.getElementById('kham-pha');
    if (!section) return;
    bindCarousel();
    if (!('IntersectionObserver' in window)) { load(); return; }
    var observer = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      observer.disconnect();
      load();
    }, { rootMargin: '240px 0px' });
    observer.observe(section);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

/**
 * Homepage shop preview: slider 4 items per slide, auto-advance every 1 second.
 */
(function () {
  var PRODUCTS_PATH = 'data/aff/products';
  var FALLBACK_PATH = 'data/aff/products.json';
  var ITEMS_PER_SLIDE = 4;
  var INTERVAL_MS = 5000;

  function getBrand(url) {
    if (!url || typeof url !== 'string') return '';
    var u = url.toLowerCase();
    if (u.indexOf('shopee') !== -1) return 'shopee';
    if (u.indexOf('tiktok') !== -1) return 'tiktok';
    return '';
  }

  function getBrandLabel(brand) {
    if (brand === 'shopee') return 'Shopee';
    if (brand === 'tiktok') return 'TikTok Shop';
    return '';
  }

  function loadProducts() {
    var paths = [PRODUCTS_PATH, FALLBACK_PATH];
    return paths.reduce(function (prev, path) {
      return prev.catch(function () {
        return fetch(path).then(function (res) {
          if (!res.ok) throw new Error('Not ok');
          return res.text();
        }).then(function (text) {
          var json = JSON.parse(text);
          var data = json && json.data;
          if (!data || !Array.isArray(data.products)) throw new Error('Invalid data');
          return data.products;
        });
      });
    }, Promise.reject());
  }

  function makeCard(p) {
    var url = (p.url && p.url.trim()) || '#';
    var name = (p.name && p.name.trim()) || 'Sản phẩm';
    var thumb = (p.thumbnail && p.thumbnail.trim()) || '';
    var brand = getBrand(url);
    var brandLabel = getBrandLabel(brand);
    var brandClass = brand ? brand : '';

    var article = document.createElement('article');
    article.className = 'home-shop-card';
    article.setAttribute('role', 'listitem');

    var link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'home-shop-card-link';
    link.setAttribute('aria-label', 'Xem sản phẩm: ' + name);

    var thumbEl = document.createElement('div');
    thumbEl.className = 'home-shop-card-thumb';
    if (thumb) {
      var img = document.createElement('img');
      img.src = thumb;
      img.alt = name;
      img.loading = 'lazy';
      thumbEl.appendChild(img);
    }
    if (brandLabel) {
      var badge = document.createElement('span');
      badge.className = 'home-shop-card-badge ' + brandClass;
      badge.textContent = brandLabel;
      thumbEl.appendChild(badge);
    }
    link.appendChild(thumbEl);

    var body = document.createElement('div');
    body.className = 'home-shop-card-body';
    var nameEl = document.createElement('h3');
    nameEl.className = 'home-shop-card-name';
    nameEl.textContent = name;
    body.appendChild(nameEl);
    link.appendChild(body);

    article.appendChild(link);
    return article;
  }

  function chunk(arr, size) {
    var out = [];
    for (var i = 0; i < arr.length; i += size) {
      out.push(arr.slice(i, i + size));
    }
    return out;
  }

  function render(products) {
    var track = document.getElementById('home-shop-track');
    var slider = document.getElementById('home-shop-slider');
    var loading = document.getElementById('home-shop-loading');
    var dotsEl = document.getElementById('home-shop-dots');

    if (!track || !slider) return;

    var list = products || [];
    var slides = chunk(list, ITEMS_PER_SLIDE);
    if (slides.length === 0) {
      if (loading) loading.textContent = 'Chưa có sản phẩm.';
      return;
    }

    if (loading) loading.style.display = 'none';
    slider.style.display = 'block';

    slides.forEach(function (group) {
      var slide = document.createElement('div');
      slide.className = 'home-shop-slide';
      slide.setAttribute('role', 'listitem');

      var grid = document.createElement('div');
      grid.className = 'home-shop-grid';
      group.forEach(function (p) {
        grid.appendChild(makeCard(p));
      });
      slide.appendChild(grid);
      track.appendChild(slide);
    });

    var totalSlides = slides.length;
    var currentIndex = 0;
    var timer = null;

    function goTo(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = 'translateX(-' + currentIndex * 100 + '%)';
      if (dotsEl) {
        var dots = dotsEl.querySelectorAll('.home-shop-dot');
        dots.forEach(function (d, i) {
          d.classList.toggle('is-active', i === currentIndex);
        });
      }
    }

    if (dotsEl && totalSlides > 1) {
      dotsEl.innerHTML = '';
      for (var i = 0; i < totalSlides; i++) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'home-shop-dot' + (i === 0 ? ' is-active' : '');
        btn.setAttribute('aria-label', 'Slide ' + (i + 1));
        btn.addEventListener('click', function (j) {
          return function () {
            goTo(j);
            resetTimer();
          };
        }(i));
        dotsEl.appendChild(btn);
      }
    } else if (dotsEl) {
      dotsEl.innerHTML = '';
    }

    function next() {
      goTo(currentIndex + 1);
    }

    function resetTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, INTERVAL_MS);
    }

    var prevBtn = document.getElementById('home-shop-prev');
    var nextBtn = document.getElementById('home-shop-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        goTo(currentIndex - 1);
        resetTimer();
      });
      prevBtn.classList.toggle('is-hidden', totalSlides <= 1);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        goTo(currentIndex + 1);
        resetTimer();
      });
      nextBtn.classList.toggle('is-hidden', totalSlides <= 1);
    }

    resetTimer();
  }

  function init() {
    loadProducts().then(render).catch(function () {
      var loading = document.getElementById('home-shop-loading');
      if (loading) {
        loading.textContent = 'Không tải được sản phẩm.';
        loading.style.display = '';
      }
      var slider = document.getElementById('home-shop-slider');
      if (slider) slider.style.display = 'none';
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

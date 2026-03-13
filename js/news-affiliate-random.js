/**
 * Random affiliate renderer for news detail pages.
 * Loads products from /data/aff/products and fills .ads-card blocks.
 */
(function () {
  function getProductsPathCandidates() {
    var origin = window.location.origin;
    return [
      origin + '/data/aff/products',
      origin + '/data/aff/products.json'
    ];
  }

  function getBrandFromUrl(url) {
    if (!url || typeof url !== 'string') return '';
    var u = url.toLowerCase();
    if (u.indexOf('shopee') >= 0) return 'Shopee';
    if (u.indexOf('tiktok') >= 0) return 'TikTok Shop';
    return '';
  }

  async function loadProducts() {
    var paths = getProductsPathCandidates();
    for (var i = 0; i < paths.length; i++) {
      try {
        var response = await fetch(paths[i]);
        if (!response.ok) continue;
        var json = await response.json();
        var products = json && json.data && Array.isArray(json.data.products) ? json.data.products : [];
        if (products.length) return products;
      } catch (err) {
        // Try next path.
      }
    }
    return [];
  }

  function pickRandomProduct(products) {
    var valid = products.filter(function (p) {
      return p && p.url && p.name;
    });
    if (!valid.length) return null;
    var index = Math.floor(Math.random() * valid.length);
    return valid[index];
  }

  function fillAdsCard(card, product) {
    if (!card || !product) return;

    var imgEl = card.querySelector('img');
    var titleEl = card.querySelector('h4');
    var descEl = card.querySelector('p');
    var linkEl = card.querySelector('a.btn-news');
    var thumbLinkEl = card.querySelector('a.ads-card-thumb-link');
    var titleLinkEl = card.querySelector('a.ads-card-title-link');

    if (!imgEl || !titleEl || !descEl || !linkEl) return;

    var name = String(product.name || 'Sản phẩm gợi ý');
    var description = String(product.description || '').trim();
    var brand = getBrandFromUrl(product.url);

    imgEl.src = product.thumbnail || imgEl.src;
    imgEl.alt = name;
    titleEl.textContent = name;
    descEl.textContent = description || (brand ? ('Gợi ý mua sắm từ ' + brand + '.') : 'Gợi ý mua sắm phù hợp theo nội dung bài viết.');
    linkEl.href = product.url;
    linkEl.textContent = product.buyText || 'Xem sản phẩm';

    if (thumbLinkEl) thumbLinkEl.href = product.url;
    if (titleLinkEl) titleLinkEl.href = product.url;
  }

  async function initRandomAffiliateInNews() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.ads-card[data-random-affiliate="true"]'));
    if (!cards.length) return;

    var products = await loadProducts();
    if (!products.length) return;

    cards.forEach(function (card) {
      var product = pickRandomProduct(products);
      fillAdsCard(card, product);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRandomAffiliateInNews);
  } else {
    initRandomAffiliateInNews();
  }
})();

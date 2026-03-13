/**
 * Random affiliate renderer for news detail pages.
 * Loads products from /data/aff/products and fills .ads-card blocks.
 */
(function () {
  function getNewsDataPathCandidates() {
    var origin = window.location.origin;
    return [origin + '/news.json'];
  }

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

  function getCurrentArticleSlug() {
    var path = window.location.pathname || '';
    var fileName = path.split('/').pop() || '';
    if (!fileName || fileName.indexOf('.html') === -1) return '';
    return fileName.replace(/\.html$/i, '');
  }

  async function loadNewsItemBySlug(slug) {
    if (!slug) return null;
    var paths = getNewsDataPathCandidates();
    for (var i = 0; i < paths.length; i++) {
      try {
        var response = await fetch(paths[i]);
        if (!response.ok) continue;
        var json = await response.json();
        var items = json && Array.isArray(json.items) ? json.items : [];
        for (var j = 0; j < items.length; j++) {
          if (items[j] && items[j].slug === slug) return items[j];
        }
      } catch (err) {
        // Try next path.
      }
    }
    return null;
  }

  function createImageSourceText(item) {
    if (!item) return null;
    var source = item.thumbnailSource || {};
    var sourceName = source.name || '';
    var sourceUrl = source.url || '';

    if (!sourceUrl && item.thumbnailUrl) sourceUrl = item.thumbnailUrl;
    if (!sourceName && sourceUrl) {
      try {
        sourceName = new URL(sourceUrl).hostname.replace(/^www\./, '');
      } catch (err) {
        sourceName = 'Nguồn ảnh';
      }
    }

    if (!sourceName || !sourceUrl) return null;
    return { name: sourceName, url: sourceUrl };
  }

  function renderImageSourceAttribution(item) {
    var coverImage = document.querySelector('.news-cover');
    if (!coverImage) return;
    var article = document.querySelector('.news-article');
    if (!article) return;
    if (article.querySelector('.news-image-source')) return;

    var sourceText = createImageSourceText(item);
    if (!sourceText) return;

    var wrapper = document.createElement('div');
    wrapper.className = 'news-image-source';
    wrapper.appendChild(document.createTextNode('Nguồn ảnh: '));

    var link = document.createElement('a');
    link.href = sourceText.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer nofollow';
    link.textContent = sourceText.name;

    wrapper.appendChild(link);
    coverImage.insertAdjacentElement('afterend', wrapper);
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

  function createFallbackAdsCard() {
    var card = document.createElement('aside');
    card.className = 'ads-card ads-card-post-conclusion';
    card.setAttribute('aria-label', 'Quảng cáo sản phẩm');
    card.setAttribute('data-random-affiliate', 'true');
    card.innerHTML =
      '<a class="ads-card-more-link" href="/cua-hang.html">Xem thêm sản phẩm</a>' +
      '<a class="ads-card-thumb-link" href="https://saptet.vn/cua-hang.html" target="_blank" rel="noopener noreferrer nofollow">' +
        '<span class="ads-card-label">QC</span>' +
        '<img src="https://saptet.vn/assets/images/img_sharing.png" alt="Sản phẩm gợi ý" loading="lazy" />' +
      '</a>' +
      '<div class="ads-card-content">' +
        '<a class="ads-card-title-link" href="https://saptet.vn/cua-hang.html" target="_blank" rel="noopener noreferrer nofollow">' +
          '<h4>Sản phẩm gợi ý</h4>' +
        '</a>' +
        '<p>Đang tải gợi ý mua sắm phù hợp...</p>' +
        '<a class="btn-news primary" href="https://saptet.vn/cua-hang.html" target="_blank" rel="noopener noreferrer nofollow">Xem sản phẩm</a>' +
      '</div>';
    return card;
  }

  function hasPostConclusionAffiliate(newsContent, conclusionHeading) {
    if (!newsContent || !conclusionHeading) return false;
    var node = conclusionHeading.nextElementSibling;
    while (node) {
      if (node.classList && node.classList.contains('ads-card')) return true;
      if (node.tagName && node.tagName.toUpperCase() === 'H2') break;
      node = node.nextElementSibling;
    }
    return false;
  }

  function ensurePostConclusionAffiliateCard() {
    var newsContent = document.querySelector('.news-content');
    if (!newsContent) return;

    var conclusionHeading = newsContent.querySelector('#ket-luan');
    if (!conclusionHeading) return;
    if (hasPostConclusionAffiliate(newsContent, conclusionHeading)) return;

    var templateCard = newsContent.querySelector('.ads-card[data-random-affiliate="true"]');
    var newCard = templateCard ? templateCard.cloneNode(true) : createFallbackAdsCard();
    if (!newCard.classList.contains('ads-card-post-conclusion')) {
      newCard.classList.add('ads-card-post-conclusion');
    }
    newCard.setAttribute('data-random-affiliate', 'true');

    var insertAfter = conclusionHeading;
    var cursor = conclusionHeading.nextElementSibling;
    while (cursor) {
      if (cursor.tagName && cursor.tagName.toUpperCase() === 'H2') break;
      if (cursor.classList && cursor.classList.contains('ads-card')) break;
      insertAfter = cursor;
      cursor = cursor.nextElementSibling;
    }
    insertAfter.insertAdjacentElement('afterend', newCard);
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

  async function initNewsImageSourceAttribution() {
    var slug = getCurrentArticleSlug();
    if (!slug) return;
    var item = await loadNewsItemBySlug(slug);
    if (!item) return;
    renderImageSourceAttribution(item);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensurePostConclusionAffiliateCard();
      initRandomAffiliateInNews();
      initNewsImageSourceAttribution();
    });
  } else {
    ensurePostConclusionAffiliateCard();
    initRandomAffiliateInNews();
    initNewsImageSourceAttribution();
  }
})();

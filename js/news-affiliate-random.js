/**
 * Affiliate renderer for news detail pages.
 * Position 1: most relevant primary product.
 * Position 2: two related products.
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

  function pickRandomProducts(products, count, excludedUrls) {
    var excluded = {};
    (excludedUrls || []).forEach(function (url) {
      if (url) excluded[String(url)] = true;
    });

    var valid = products.filter(function (p) {
      return p && p.url && p.name && !excluded[String(p.url)];
    });
    if (!valid.length) return [];

    var shuffled = valid.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = temp;
    }
    return shuffled.slice(0, Math.max(0, count || 0));
  }

  function tokenizeText(text) {
    return String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9\u00C0-\u024F\s-]/g, ' ')
      .split(/[\s-]+/)
      .filter(Boolean);
  }

  function buildArticleKeywords(item) {
    var tokens = [];
    if (!item) return tokens;
    tokens = tokens.concat(tokenizeText(item.title));
    tokens = tokens.concat(tokenizeText(item.slug));
    if (Array.isArray(item.tags)) {
      item.tags.forEach(function (tag) {
        tokens = tokens.concat(tokenizeText(tag));
      });
    }
    return Array.from(new Set(tokens)).filter(function (t) { return t.length >= 3; });
  }

  function scoreProductRelevance(product, item, primaryAffiliate) {
    if (!product || !product.url || !product.name) return -1;
    var score = 0;
    var targetCategory = (primaryAffiliate && primaryAffiliate.category) || (item && item.affiliate && item.affiliate.category) || '';
    var targetType = (primaryAffiliate && primaryAffiliate.type) || (item && item.affiliate && item.affiliate.type) || '';

    if (targetCategory && product.category && String(product.category) === String(targetCategory)) score += 8;
    if (targetType && product.type && String(product.type) === String(targetType)) score += 3;

    var productTokens = tokenizeText(product.name + ' ' + (product.description || ''));
    var tokenSet = {};
    productTokens.forEach(function (t) { tokenSet[t] = true; });

    var keywords = buildArticleKeywords(item);
    var matched = 0;
    keywords.forEach(function (kw) {
      if (tokenSet[kw]) matched += 1;
    });
    score += Math.min(6, matched);
    return score;
  }

  function pickTopRelatedProducts(products, count, excludedUrls, item, primaryAffiliate) {
    var excluded = {};
    (excludedUrls || []).forEach(function (url) {
      if (url) excluded[String(url)] = true;
    });

    var ranked = products
      .filter(function (p) { return p && p.url && p.name && !excluded[String(p.url)]; })
      .map(function (p, idx) {
        return { product: p, score: scoreProductRelevance(p, item, primaryAffiliate), idx: idx };
      })
      .sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.idx - b.idx;
      })
      .slice(0, Math.max(0, count || 0))
      .map(function (x) { return x.product; });

    return ranked;
  }

  function getCurrentArticleSlug() {
    var path = window.location.pathname || '';
    var parts = path.split('/').filter(Boolean);
    if (!parts.length) return '';

    var last = parts[parts.length - 1];
    var prev = parts.length > 1 ? parts[parts.length - 2] : '';

    // /tin-tuc/slug.html
    if (/\.html$/i.test(last) && last.toLowerCase() !== 'index.html') {
      return last.replace(/\.html$/i, '');
    }

    // /tin-tuc/slug/index.html
    if (last.toLowerCase() === 'index.html' && prev && prev !== 'tin-tuc') {
      return prev;
    }

    // /tin-tuc/slug/
    if (last !== 'tin-tuc') {
      return last;
    }

    return '';
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

  function isExternalUrl(url) {
    if (!url || typeof url !== 'string') return false;
    return /^https?:\/\//i.test(url);
  }

  function isReviewArticle(slug, title) {
    var normalizedSlug = String(slug || '').toLowerCase();
    var normalizedTitle = String(title || '').toLowerCase();
    return normalizedSlug.indexOf('review-') === 0 || normalizedTitle.indexOf('review ') === 0;
  }

  function makeReviewCoverClickable(slug) {
    var titleEl = document.querySelector('.news-title');
    var title = titleEl ? titleEl.textContent.trim() : '';
    if (!isReviewArticle(slug, title)) return;

    var sourceBtn = document.querySelector('#news-source-button');
    if (!sourceBtn) return;
    var affiliateUrl = sourceBtn.getAttribute('href') || '';
    if (!isExternalUrl(affiliateUrl)) return;

    var coverImage = document.querySelector('.news-cover');
    if (!coverImage) return;
    if (coverImage.closest('a.news-cover-link')) return;

    var link = document.createElement('a');
    link.className = 'news-cover-link';
    link.href = affiliateUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer nofollow';
    link.setAttribute('aria-label', 'Mở link sản phẩm liên kết');

    var parent = coverImage.parentNode;
    if (!parent) return;
    parent.insertBefore(link, coverImage);
    link.appendChild(coverImage);
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

  function createRelatedProductsSection(templateCard, products) {
    if (!templateCard) return null;

    var wrapper = document.createElement('section');
    wrapper.className = 'ads-related-section';
    wrapper.setAttribute('aria-label', 'Sản phẩm liên quan');

    var heading = document.createElement('h3');
    heading.className = 'ads-related-title';
    heading.textContent = 'Sản phẩm liên quan';
    wrapper.appendChild(heading);

    var grid = document.createElement('div');
    grid.className = 'ads-related-grid';

    products.forEach(function (product) {
      var card = templateCard.cloneNode(true);
      card.classList.add('ads-card-related-item');
      fillAdsCard(card, product);
      grid.appendChild(card);
    });

    wrapper.appendChild(grid);
    return wrapper;
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

  async function shareCurrentArticle() {
    var title = (document.querySelector('.news-title') && document.querySelector('.news-title').textContent.trim()) || document.title || 'Bản Tin';
    var url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: title, url: url });
        return true;
      } catch (err) {
        if (err && err.name === 'AbortError') return false;
      }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        return true;
      } catch (err) {
        // fallback below
      }
    }

    var input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    return true;
  }

  function ensureDetailShareButton() {
    var ctaRow = document.querySelector('.news-article .cta-row');
    if (!ctaRow) return;
    if (ctaRow.querySelector('#news-share-button')) return;

    var shareBtn = document.createElement('button');
    shareBtn.id = 'news-share-button';
    shareBtn.type = 'button';
    shareBtn.className = 'btn-share-icon-only';
    shareBtn.setAttribute('aria-label', 'Chia sẻ bài viết');
    shareBtn.setAttribute('title', 'Chia sẻ bài viết');
    shareBtn.innerHTML = "<svg class='news-share-icon' viewBox='0 0 24 24' aria-hidden='true'><circle cx='18' cy='5' r='3'></circle><circle cx='6' cy='12' r='3'></circle><circle cx='18' cy='19' r='3'></circle><path d='M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49'></path></svg>";
    shareBtn.addEventListener('click', function () {
      shareCurrentArticle().then(function (shared) {
        if (!shared) return;
        if (window.webAnalytics && window.webAnalytics.trackEvent) {
          var title = (document.querySelector('.news-title') && document.querySelector('.news-title').textContent.trim()) || document.title || '';
          window.webAnalytics.trackEvent('news_article_share', {
            article_title: title,
            article_slug: getCurrentArticleSlug(),
            share_url: window.location.href
          });
        }
      });
    });

    ctaRow.insertAdjacentElement('afterbegin', shareBtn);
  }

  function getItemAffiliate(item) {
    if (!item || !item.affiliate) return null;
    if (!item.affiliate.url || !item.affiliate.name) return null;
    return item.affiliate;
  }

  function getItemRelatedAffiliates(item, primaryAffiliate) {
    if (!item || !Array.isArray(item.relatedAffiliates)) return [];
    var primaryUrl = primaryAffiliate && primaryAffiliate.url ? String(primaryAffiliate.url) : '';
    return item.relatedAffiliates
      .filter(function (p) { return p && p.url && p.name; })
      .filter(function (p) { return !primaryUrl || String(p.url) !== primaryUrl; })
      .slice(0, 2);
  }

  async function initAffiliateInNews() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.ads-card[data-random-affiliate="true"]'));
    if (!cards.length) return;

    var products = await loadProducts();
    if (!products.length) return;

    var slug = getCurrentArticleSlug();
    var item = await loadNewsItemBySlug(slug);
    var fixedAffiliate = getItemAffiliate(item);
    var firstCard = cards[0];
    var secondCard = cards[1];

    if (firstCard) {
      if (fixedAffiliate) {
        fillAdsCard(firstCard, fixedAffiliate);
      } else {
        // Non-random fallback: pick highest relevance product.
        var topPrimary = pickTopRelatedProducts(products, 1, [], item, null)[0];
        if (topPrimary) fillAdsCard(firstCard, topPrimary);
      }
    }

    if (!secondCard) return;

    var excluded = [];
    if (fixedAffiliate && fixedAffiliate.url) excluded.push(fixedAffiliate.url);
    var relatedProducts = getItemRelatedAffiliates(item, fixedAffiliate);
    if (relatedProducts.length < 2) {
      var need = 2 - relatedProducts.length;
      var extraExcluded = excluded.concat(relatedProducts.map(function (p) { return p.url; }));
      var extra = pickTopRelatedProducts(products, need, extraExcluded, item, fixedAffiliate);
      relatedProducts = relatedProducts.concat(extra);
    }
    if (relatedProducts.length < 2) {
      var extraDeterministicExcluded = excluded.concat(relatedProducts.map(function (p) { return p.url; }));
      var deterministicExtra = pickTopRelatedProducts(products, 2 - relatedProducts.length, extraDeterministicExcluded, item, fixedAffiliate);
      relatedProducts = relatedProducts.concat(deterministicExtra);
    }
    if (!relatedProducts.length) return;

    var relatedSection = createRelatedProductsSection(secondCard, relatedProducts);
    if (!relatedSection) return;
    secondCard.replaceWith(relatedSection);
  }

  async function initNewsImageSourceAttribution() {
    var slug = getCurrentArticleSlug();
    if (!slug) return;
    var item = await loadNewsItemBySlug(slug);
    if (!item) return;
    renderImageSourceAttribution(item);
    makeReviewCoverClickable(slug);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensurePostConclusionAffiliateCard();
      ensureDetailShareButton();
      initAffiliateInNews();
      initNewsImageSourceAttribution();
    });
  } else {
    ensurePostConclusionAffiliateCard();
    ensureDetailShareButton();
    initAffiliateInNews();
    initNewsImageSourceAttribution();
  }
})();

/**
 * Home News Preview - Loads latest news from news.json and renders cards
 */
(function () {
  'use strict';

  var HOME_NEWS_LIMIT = 1;

  function getNewsJsonUrls() {
    var urls = [];
    try {
      urls.push(new URL('news.json', window.location.href).href);
    } catch (e) {}
    urls.push('/news.json');
    urls.push('news.json');
    return urls;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatDate(isoDate) {
    if (!isoDate) return '';
    if (typeof window.formatNewsPublishedAtGMT7 === 'function') {
      return window.formatNewsPublishedAtGMT7(isoDate);
    }
    var date = new Date(isoDate);
    if (isNaN(date.getTime())) return isoDate || '';
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  function resolveDetailUrl(detailPage) {
    if (!detailPage) return '#';
    if (/^https?:\/\//i.test(detailPage)) return detailPage;
    var cleaned = String(detailPage).replace(/^\.\//, '');
    return cleaned ? '/' + cleaned : '#';
  }

  function normalizePost(post) {
    return {
      id: post.id || '',
      title: post.title || 'Bài viết mới',
      summary: post.summary || '',
      category: post.category || 'general',
      publishedAt: post.publishedAt || '',
      thumbnailUrl: post.thumbnailUrl || '/assets/images/img_sharing.png',
      detailUrl: resolveDetailUrl(post.detailPage)
    };
  }

  function renderNewsCard(post) {
    var url = post.detailUrl || '#';
    return (
      '<article class="home-news-card home-news-card--featured" role="listitem">' +
        '<a href="' + escapeHtml(url) + '" class="home-news-card-link" aria-label="Đọc bài: ' + escapeHtml(post.title) + '">' +
          '<div class="home-news-card-thumb-wrap">' +
            '<img class="home-news-card-thumb" src="' + escapeHtml(post.thumbnailUrl) + '" alt="' + escapeHtml(post.title) + '" loading="lazy">' +
          '</div>' +
          '<div class="home-news-card-body">' +
            '<span class="home-news-card-date">' + escapeHtml(formatDate(post.publishedAt)) + '</span>' +
            '<h3 class="home-news-card-title">' + escapeHtml(post.title) + '</h3>' +
            '<p class="home-news-card-summary">' + escapeHtml(post.summary) + '</p>' +
            '<span class="home-news-card-cta">Đọc bài viết</span>' +
          '</div>' +
        '</a>' +
      '</article>'
    );
  }

  function render(posts) {
    var gridEl = document.getElementById('home-news-grid');
    var loadingEl = document.getElementById('home-news-loading');
    if (!gridEl) return;

    if (loadingEl) loadingEl.style.display = 'none';

    if (!Array.isArray(posts) || posts.length === 0) {
      gridEl.innerHTML = '<p class="home-news-empty">Chưa có bài blog. Vui lòng quay lại sau.</p>';
      return;
    }

    var post = posts[0];
    gridEl.innerHTML = renderNewsCard(normalizePost(post));
  }

  function tryFetch(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    });
  }

  function tryXhr(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.responseType = 'json';
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
        else reject(new Error('HTTP ' + xhr.status));
      };
      xhr.onerror = reject;
      xhr.send();
    });
  }

  function getLatestItem(items) {
    if (!Array.isArray(items) || items.length === 0) return null;
    return items.slice().sort(function (a, b) {
      return new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime();
    })[0];
  }

  function parseInlineNews() {
    var inlineEl = document.getElementById('news-json-inline');
    if (!inlineEl || !inlineEl.textContent) return null;
    try {
      var data = JSON.parse(inlineEl.textContent);
      return data && data.items ? data.items : null;
    } catch (e) { return null; }
  }

  function loadNews() {
    var gridEl = document.getElementById('home-news-grid');
    if (!gridEl) return;

    var inlineItems = parseInlineNews();
    var urls = getNewsJsonUrls();

    function tryLoad(index) {
      if (index >= urls.length) {
        var fallback = getLatestItem(inlineItems || []);
        render(fallback ? [fallback] : []);
        return Promise.resolve();
      }
      var url = urls[index];
      return tryFetch(url)
        .catch(function () { return tryXhr(url); })
        .then(function (data) {
          var items = data && data.items ? data.items : [];
          var latest = getLatestItem(items) || getLatestItem(inlineItems || []);
          render(latest ? [latest] : []);
        })
        .catch(function () {
          return tryLoad(index + 1);
        });
    }

    tryLoad(0);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNews);
  } else {
    loadNews();
  }
})();

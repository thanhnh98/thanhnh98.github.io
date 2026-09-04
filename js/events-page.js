(function () {
  var PAGE_SIZE = 12;

  function normalizeText(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .toLowerCase()
      .trim();
  }

  function vietnamTodayKey() {
    if (window.EVENTS_DATA && typeof window.EVENTS_DATA.getVietnamTodayKey === 'function') {
      return window.EVENTS_DATA.getVietnamTodayKey();
    }
    return new Date().toISOString().slice(0, 10);
  }

  function daysBetween(fromKey, toKey) {
    var from = fromKey.split('-').map(Number);
    var to = toKey.split('-').map(Number);
    return Math.round((Date.UTC(to[0], to[1] - 1, to[2]) - Date.UTC(from[0], from[1] - 1, from[2])) / 86400000);
  }

  function countdownLabel(dateKey) {
    var days = daysBetween(vietnamTodayKey(), dateKey);
    if (days <= 0) return 'Diễn ra hôm nay';
    if (days === 1) return 'Diễn ra ngày mai';
    return 'Còn ' + days + ' ngày';
  }

  function updateCountdowns() {
    document.querySelectorAll('[data-event-countdown][data-date]').forEach(function (element) {
      element.textContent = countdownLabel(element.getAttribute('data-date'));
    });
  }

  function initExplorer() {
    var explorer = document.querySelector('[data-events-explorer]');
    if (!explorer) return;

    var search = explorer.querySelector('[data-events-search]');
    var clear = explorer.querySelector('[data-events-search-clear]');
    var filterButtons = Array.from(explorer.querySelectorAll('[data-events-filter]'));
    var cards = Array.from(explorer.querySelectorAll('[data-event-card]'));
    var resultCount = explorer.querySelector('[data-events-result-count]');
    var empty = explorer.querySelector('[data-events-empty]');
    var reset = explorer.querySelector('[data-events-reset]');
    var loadMore = explorer.querySelector('[data-events-load-more]');
    var activeFilter = 'all';
    var visibleLimit = PAGE_SIZE;

    function matchesFilter(card) {
      if (activeFilter === 'all') return true;
      if (activeFilter === 'holiday') return card.dataset.holiday === 'true';
      return card.dataset.category === activeFilter;
    }

    function render() {
      var query = normalizeText(search ? search.value : '');
      var matching = cards.filter(function (card) {
        return matchesFilter(card) && (!query || normalizeText(card.dataset.search).includes(query));
      });
      var hasActiveQuery = !!query || activeFilter !== 'all';
      var displayLimit = hasActiveQuery ? matching.length : visibleLimit;

      cards.forEach(function (card) {
        var index = matching.indexOf(card);
        card.hidden = index === -1 || index >= displayLimit;
      });

      if (resultCount) {
        resultCount.textContent = matching.length + ' sự kiện phù hợp';
      }
      if (empty) empty.classList.toggle('is-visible', matching.length === 0);
      if (loadMore) {
        loadMore.hidden = hasActiveQuery || displayLimit >= matching.length;
        if (!loadMore.hidden) {
          loadMore.setAttribute('aria-label', 'Hiển thị thêm sự kiện, đang xem ' + displayLimit + ' trên ' + matching.length);
        }
      }
      if (clear) clear.classList.toggle('is-visible', !!query);
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.dataset.eventsFilter;
        visibleLimit = PAGE_SIZE;
        filterButtons.forEach(function (item) {
          item.setAttribute('aria-pressed', item === button ? 'true' : 'false');
        });
        render();
      });
    });

    if (search) {
      search.addEventListener('input', function () {
        visibleLimit = PAGE_SIZE;
        render();
      });
    }

    if (clear) {
      clear.addEventListener('click', function () {
        if (search) {
          search.value = '';
          search.focus();
        }
        render();
      });
    }

    function resetExplorer() {
      activeFilter = 'all';
      visibleLimit = PAGE_SIZE;
      if (search) search.value = '';
      filterButtons.forEach(function (item) {
        item.setAttribute('aria-pressed', item.dataset.eventsFilter === 'all' ? 'true' : 'false');
      });
      render();
      if (search) search.focus();
    }

    if (reset) reset.addEventListener('click', resetExplorer);
    if (loadMore) {
      loadMore.addEventListener('click', function () {
        visibleLimit += PAGE_SIZE;
        render();
        var firstNewCard = cards[visibleLimit - PAGE_SIZE];
        if (firstNewCard) {
          var link = firstNewCard.querySelector('a');
          if (link) link.focus({ preventScroll: true });
          firstNewCard.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
        }
      });
    }

    render();
  }

  function init() {
    updateCountdowns();
    initExplorer();
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

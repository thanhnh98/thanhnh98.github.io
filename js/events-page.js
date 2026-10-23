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

  function formatDate(dateKey) {
    var parts = dateKey.split('-').map(Number);
    return String(parts[2]).padStart(2, '0') + '/' + String(parts[1]).padStart(2, '0') + '/' + parts[0];
  }

  function formatDateLong(dateKey) {
    var parts = dateKey.split('-').map(Number);
    var weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][new Date(Date.UTC(parts[0], parts[1] - 1, parts[2])).getUTCDay()];
    return weekday + ', ' + parts[2] + ' tháng ' + parts[1] + ', ' + parts[0];
  }

  function formatDateLongEnglish(dateKey) {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).format(new Date(dateKey + 'T00:00:00Z'));
  }

  function activeDate(element) {
    var slug = element.getAttribute('data-event-slug');
    if (slug && window.EVENTS_DATA) {
      var event = window.EVENTS_DATA.getEventBySlug(slug);
      var occurrence = event && window.EVENTS_DATA.getNextOccurrence(event, {
        todayKey: vietnamTodayKey(),
        lunarToSolar: typeof lunarToSolar === 'function' ? lunarToSolar : null
      });
      if (occurrence) return occurrence.dateKey;
    }
    return element.getAttribute('data-date');
  }

  function updateCountdowns() {
    var pageEvent = null;
    document.querySelectorAll('[data-event-countdown][data-date]').forEach(function (element) {
      var dateKey = activeDate(element);
      var slug = element.getAttribute('data-event-slug');
      pageEvent = slug && window.EVENTS_DATA ? window.EVENTS_DATA.getEventBySlug(slug) : null;
      var english = new URLSearchParams(window.location.search).get('lang') === 'en' && pageEvent && pageEvent.englishName;
      var days = daysBetween(vietnamTodayKey(), dateKey);
      if (english) document.title = 'How many days until ' + pageEvent.englishName + ' ' + dateKey.slice(0, 4) + '? | Sắp Tết';
      element.textContent = english ? (days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : days + ' days left') : countdownLabel(dateKey);
      var dateLong = document.querySelector('[data-event-date-long]');
      if (dateLong) dateLong.textContent = english ? formatDateLongEnglish(dateKey) : formatDateLong(dateKey);
      document.querySelectorAll('[data-event-answer]').forEach(function (answer) {
        answer.setAttribute('data-date', dateKey);
      });
    });
    document.querySelectorAll('[data-event-answer][data-date]').forEach(function (element) {
      var dateKey = element.getAttribute('data-date');
      var days = daysBetween(vietnamTodayKey(), dateKey);
      var parts = dateKey.split('-').map(Number);
      var date = formatDate(dateKey);
      var weekday = formatDateLong(dateKey).split(',')[0];
      var name = element.getAttribute('data-event-name') || 'Sự kiện';
      var english = new URLSearchParams(window.location.search).get('lang') === 'en' && pageEvent && pageEvent.englishName;
      if (english) {
        element.textContent = days === 0
          ? 'Today is ' + pageEvent.englishName + ' ' + parts[0] + ' (' + date + ').'
          : days + ' days until ' + pageEvent.englishName + ' ' + parts[0] + ', ' + formatDateLongEnglish(dateKey) + '.';
        return;
      }
      element.textContent = days < 0
        ? name + ' ' + parts[0] + ' đã qua. Trang sẽ cập nhật lần diễn ra tiếp theo.'
        : days === 0
          ? 'Hôm nay là ' + name + ' ' + parts[0] + ', ngày ' + date + '.'
          : 'Còn ' + days + ' ngày nữa đến ' + name + ' ' + parts[0] + ', ' + weekday + ', ngày ' + date + '.';
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
    window.setInterval(updateCountdowns, 60000);
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

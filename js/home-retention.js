(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.HomeRetention = api;
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var TIME_ZONE = 'Asia/Ho_Chi_Minh';
  var STATE_KEY = 'saptet_home_retention_v1';
  var TET_DATE_KEY = '2027-02-06';
  var TET_DATE_TIME = new Date('2027-02-06T00:00:00+07:00');
  var DAY_MS = 24 * 60 * 60 * 1000;
  var ANDROID_APP_URL = 'https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down';
  var IOS_APP_URL = 'https://apps.apple.com/gb/app/s%E1%BA%AFp-t%E1%BA%BFt-%C4%91%E1%BA%BFm-ng%C6%B0%E1%BB%A3c-t%E1%BA%BFt-2027/id6743064990?platform=iphone';
  var dateFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  var discoverySuggestions = [
    { title: 'Xem lịch âm hôm nay', description: 'Tra cứu ngày âm, giờ hoàng đạo và việc nên làm trong ngày.', href: '/lich-am-hom-nay.html', action: 'Xem lịch hôm nay' },
    { title: 'Chuẩn bị một lời chúc', description: 'Lưu sẵn một câu chúc ấm áp để gửi tới người thân khi Tết đến.', href: '/loi-chuc-tet.html', action: 'Chọn lời chúc' },
    { title: 'Khám phá một món Tết', description: 'Mỗi vùng miền có một hương vị riêng cho mâm cơm sum họp.', href: '/mon-an-tet.html', action: 'Xem món Tết' },
    { title: 'Chơi một ván nối chữ', description: 'Một thử thách ngắn để thư giãn và làm nóng không khí Tết.', href: '/tro-choi-tet.html', action: 'Chơi ngay' },
    { title: 'Xem sự kiện sắp tới', description: 'Đừng bỏ lỡ những ngày lễ và cột mốc đáng nhớ trong năm.', href: '/su-kien-quan-trong.html', action: 'Xem sự kiện' },
    { title: 'Lên ngân sách lì xì', description: 'Ước tính trước khoản lì xì để việc chuẩn bị nhẹ nhàng hơn.', href: '/may-tinh-li-xi.html', action: 'Tính thử' }
  ];

  var preparationTasks = [
    'Lập danh sách những người bạn muốn chúc Tết.',
    'Kiểm tra lịch nghỉ và dự kiến ngày về quê.',
    'Dọn một ngăn tủ nhỏ để bắt đầu làm mới nhà cửa.',
    'Lên ngân sách lì xì phù hợp với gia đình.',
    'Chọn một món Tết muốn tự tay chuẩn bị.',
    'Kiểm tra lại đồ trang trí có thể tái sử dụng.',
    'Ghi lại những món cần mua trước khi đông đúc.',
    'Chuẩn bị một lời chúc riêng cho người quan trọng.',
    'Lên lịch thăm hỏi họ hàng và bạn bè.',
    'Dành 15 phút sắp xếp khu vực đón khách.',
    'Kiểm tra phương tiện hoặc vé cho chuyến đi Tết.',
    'Chọn một hoạt động cả gia đình có thể làm cùng nhau.'
  ];

  var tetCustoms = [
    { title: 'Mùng 1 · Chúc Tết gia đình', description: 'Bắt đầu năm mới bằng lời chúc bình an, sức khỏe và sum vầy.', href: '/loi-chuc-tet.html', action: 'Chọn lời chúc' },
    { title: 'Mùng 2 · Thăm hỏi người thân', description: 'Dành thời gian kết nối với họ hàng, bạn bè và những người bạn trân quý.', href: '/loi-chuc-tet.html', action: 'Gửi lời chúc' },
    { title: 'Mùng 3 · Gìn giữ nếp nhà', description: 'Cùng gia đình chia sẻ một món ăn, câu chuyện hoặc trò chơi truyền thống.', href: '/tro-choi-tet.html', action: 'Chơi cùng nhau' },
    { title: 'Mùng 4 · Du xuân nhẹ nhàng', description: 'Chọn một điểm đến gần và giữ nhịp nghỉ ngơi thoải mái cho cả nhà.', href: '/tin-tuc/', action: 'Xem gợi ý' },
    { title: 'Mùng 5 · Khai mở điều mới', description: 'Viết xuống một điều nhỏ bạn muốn duy trì trong năm Đinh Mùi.', href: '/tin-tuc/', action: 'Đọc bài mới' },
    { title: 'Mùng 6 · Sắp lại nhịp sống', description: 'Chuẩn bị lịch làm việc và giữ lại một chút không khí Tết cho tuần mới.', href: '/lich-am-hom-nay.html', action: 'Xem lịch' },
    { title: 'Mùng 7 · Khép tuần đầu năm', description: 'Nhìn lại những khoảnh khắc vui và gửi thêm một lời cảm ơn chân thành.', href: '/loi-chuc-tet.html', action: 'Chọn lời nhắn' }
  ];

  function detectAppPlatform(navigatorLike) {
    var value = navigatorLike || {};
    var userAgent = String(value.userAgent || '');
    var platform = String((value.userAgentData && value.userAgentData.platform) || value.platform || '');
    if (/android/i.test(userAgent) || /android/i.test(platform)) return 'android';
    if (/iphone|ipad|ipod/i.test(userAgent) || /iphone|ipad|ipod/i.test(platform)) return 'ios';
    if (/mac/i.test(platform) && Number(value.maxTouchPoints || 0) > 1) return 'ios';
    return 'web';
  }

  function getVietnamParts(date) {
    var values = {};
    dateFormatter.formatToParts(date).forEach(function (part) {
      if (part.type !== 'literal') values[part.type] = Number(part.value);
    });
    return { year: values.year, month: values.month, day: values.day };
  }

  function getVietnamDateKey(date) {
    var parts = getVietnamParts(date);
    return String(parts.year) + '-' + String(parts.month).padStart(2, '0') + '-' + String(parts.day).padStart(2, '0');
  }

  function parseDateKey(key) {
    var parts = String(key || '').split('-').map(Number);
    if (parts.length !== 3 || parts.some(function (value) { return !Number.isFinite(value); })) return null;
    return Date.UTC(parts[0], parts[1] - 1, parts[2]);
  }

  function daysBetweenKeys(fromKey, toKey) {
    var from = parseDateKey(fromKey);
    var to = parseDateKey(toKey);
    if (from === null || to === null) return null;
    return Math.round((to - from) / DAY_MS);
  }

  function normalizeState(value) {
    var state = value && typeof value === 'object' ? value : {};
    return {
      version: 1,
      lastVisitDate: typeof state.lastVisitDate === 'string' ? state.lastVisitDate : '',
      visitStreak: Number.isInteger(state.visitStreak) && state.visitStreak > 0 ? state.visitStreak : 0,
      completedTaskIds: Array.isArray(state.completedTaskIds)
        ? state.completedTaskIds.filter(function (item) { return typeof item === 'string'; }).slice(-120)
        : []
    };
  }

  function readStoredState(storage) {
    var raw = storage.getItem(STATE_KEY);
    return raw ? normalizeState(JSON.parse(raw)) : normalizeState(null);
  }

  function saveStoredState(storage, state) {
    storage.setItem(STATE_KEY, JSON.stringify(normalizeState(state)));
  }

  function updateVisitState(storage, now) {
    var date = now instanceof Date ? now : new Date();
    var todayKey = getVietnamDateKey(date);
    var state;
    var storageAvailable = true;

    try {
      state = readStoredState(storage);
    } catch (error) {
      storageAvailable = false;
      state = normalizeState(null);
    }

    var previousDate = state.lastVisitDate;
    var difference = previousDate ? daysBetweenKeys(previousDate, todayKey) : null;
    var isNewVisitDay = !previousDate || difference !== 0;
    var isReturningVisit = Boolean(previousDate && difference !== 0);

    if (!previousDate) state.visitStreak = 1;
    else if (difference === 1) state.visitStreak += 1;
    else if (difference !== 0) state.visitStreak = 1;
    state.lastVisitDate = todayKey;

    if (storageAvailable) {
      try {
        saveStoredState(storage, state);
      } catch (error) {
        storageAvailable = false;
      }
    }

    return {
      state: state,
      storageAvailable: storageAvailable,
      isNewVisitDay: isNewVisitDay,
      isReturningVisit: isReturningVisit,
      daysSinceLastVisit: difference
    };
  }

  function getHomePhase(now) {
    var todayKey = getVietnamDateKey(now instanceof Date ? now : new Date());
    var daysUntilTet = daysBetweenKeys(todayKey, TET_DATE_KEY);
    if (daysUntilTet <= 0 && daysUntilTet >= -6) return 'tet';
    if (daysUntilTet >= 1 && daysUntilTet <= 45) return 'preparation';
    return 'discovery';
  }

  function stableIndex(dateKey, length) {
    var number = String(dateKey).replace(/-/g, '').split('').reduce(function (sum, digit) { return sum + Number(digit); }, 0);
    return number % length;
  }

  function getDailyContent(now, phase) {
    var date = now instanceof Date ? now : new Date();
    var dateKey = getVietnamDateKey(date);
    var currentPhase = phase || getHomePhase(date);
    if (currentPhase === 'tet') {
      var tetOffset = Math.abs(daysBetweenKeys(dateKey, TET_DATE_KEY));
      return Object.assign({ id: dateKey, phase: currentPhase, label: 'Phong tục hôm nay' }, tetCustoms[Math.min(tetOffset, tetCustoms.length - 1)]);
    }
    if (currentPhase === 'preparation') {
      return {
        id: dateKey,
        phase: currentPhase,
        label: 'Việc Tết hôm nay',
        title: preparationTasks[stableIndex(dateKey, preparationTasks.length)],
        description: 'Một việc nhỏ mỗi ngày sẽ giúp những tuần trước Tết nhẹ nhàng hơn.',
        action: 'Đánh dấu hoàn thành'
      };
    }
    return Object.assign({ id: dateKey, phase: currentPhase, label: 'Gợi ý hôm nay' }, discoverySuggestions[stableIndex(dateKey, discoverySuggestions.length)]);
  }

  function setText(id, value) {
    var element = document.getElementById(id);
    if (element) element.textContent = value;
  }

  function trackReturnVisit(params) {
    window.webAnalytics?.trackEvent('home_return_visit', params);
  }
  function trackDailyCardView(params) {
    window.webAnalytics?.trackEvent('home_daily_card_view', params);
  }
  function trackDailyActionComplete(params) {
    window.webAnalytics?.trackEvent('home_daily_action_complete', params);
  }
  function trackQuickLink(params) {
    window.webAnalytics?.trackEvent('home_quick_link_click', params);
  }
  function trackDiscoveryClick(params) {
    window.webAnalytics?.trackEvent('home_discovery_click', params);
  }

  function updateCountdown() {
    var now = new Date();
    var difference = Math.max(0, TET_DATE_TIME.getTime() - now.getTime());
    var days = Math.floor(difference / DAY_MS);
    var hours = Math.floor((difference % DAY_MS) / 3600000);
    var minutes = Math.floor((difference % 3600000) / 60000);
    var seconds = Math.floor((difference % 60000) / 1000);
    var calendarDays = Math.max(0, daysBetweenKeys(getVietnamDateKey(now), TET_DATE_KEY));

    setText('days', String(days).padStart(3, '0'));
    setText('hours', String(hours).padStart(2, '0'));
    setText('minutes', String(minutes).padStart(2, '0'));
    setText('seconds', String(seconds).padStart(2, '0'));
    var seoDays = document.querySelector('[data-seo="days-until-tet"]');
    if (seoDays) seoDays.textContent = String(calendarDays);
  }

  function formatToday(parts) {
    var localDate = new Date(parts.year, parts.month - 1, parts.day, 12);
    return new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(localDate);
  }

  function renderDateCard(now) {
    var parts = getVietnamParts(now);
    var localDate = new Date(parts.year, parts.month - 1, parts.day, 12);
    var solarText = formatToday(parts);
    setText('today-solar-date', solarText);
    setText('today-date', solarText);
    if (typeof window.calculateLunarDate === 'function') {
      try {
        var lunar = window.calculateLunarDate(localDate);
        var lunarText = 'Âm lịch: ' + lunar.day + '/' + lunar.month + '/' + lunar.year;
        setText('today-lunar-date', lunarText);
        setText('today-lunar', '(' + lunarText + ')');
      } catch (error) {
        setText('today-lunar-date', 'Xem lịch âm hôm nay');
        setText('today-lunar', 'Xem lịch âm');
      }
    }
  }

  function getEventsForDate(date) {
    var events = [];
    var data = window.EVENTS_DATA;
    if (!data) return events;
    var solar = data.getSolarEventMap?.()[String(date.getMonth() + 1) + '-' + String(date.getDate())] || [];
    solar.forEach(function (item) {
      if (!events.some(function (event) { return event.name === item.name; })) events.push(item);
    });
    if (typeof window.calculateLunarDate === 'function') {
      try {
        var lunar = window.calculateLunarDate(date);
        var lunarEvent = data.getLunarEventMap?.()[String(lunar.month) + '-' + String(lunar.day)];
        if (lunarEvent && !events.some(function (event) { return event.name === lunarEvent.name; })) events.push(lunarEvent);
      } catch (error) {}
    }
    return events;
  }

  function renderNearestEvent(now) {
    var parts = getVietnamParts(now);
    var cursor = new Date(parts.year, parts.month - 1, parts.day, 12);
    for (var offset = 0; offset <= 370; offset += 1) {
      var events = getEventsForDate(cursor);
      if (events.length) {
        setText('nearest-event-name', events[0].name);
        var countdownText = offset === 0 ? 'Diễn ra hôm nay' : 'Còn ' + offset + ' ngày';
        setText('nearest-event-countdown', countdownText);
        setText('nearest-event-text', 'Sắp tới: ' + events[0].name + ' · ' + countdownText);
        var heroEventLink = document.getElementById('nearest-event-link');
        if (heroEventLink) heroEventLink.hidden = false;
        return;
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  }

  function renderDailyCard(content, result, storage) {
    setText('daily-phase-label', content.label);
    setText('daily-title', content.title);
    setText('daily-description', content.description);
    var action = document.getElementById('daily-action');
    var card = document.getElementById('home-daily-card');
    if (!action) return;
    if (card) {
      card.setAttribute('role', content.phase === 'preparation' ? 'button' : 'link');
      card.setAttribute('aria-label', content.label + ': ' + content.title + '. ' + content.action);
      card.removeAttribute('aria-disabled');
    }
    action.textContent = content.action + ' →';
    action.classList.remove('is-complete');
    action.removeAttribute('data-action');
    action.setAttribute('role', 'link');

    if (content.phase !== 'preparation') {
      action.href = content.href;
      return;
    }

    var completed = result.state.completedTaskIds.indexOf(content.id) !== -1;
    action.href = '#';
    action.setAttribute('role', 'button');
    action.setAttribute('data-action', 'complete');
    if (completed) {
      action.textContent = 'Đã hoàn thành hôm nay ✓';
      action.classList.add('is-complete');
      if (card) card.setAttribute('aria-disabled', 'true');
      return;
    }

    action.addEventListener('click', function completeDailyTask(event) {
      event.preventDefault();
      if (result.state.completedTaskIds.indexOf(content.id) === -1) result.state.completedTaskIds.push(content.id);
      if (result.storageAvailable) {
        try { saveStoredState(storage, result.state); } catch (error) { result.storageAvailable = false; }
      }
      action.textContent = 'Đã hoàn thành hôm nay ✓';
      action.classList.add('is-complete');
      if (card) card.setAttribute('aria-disabled', 'true');
      trackDailyActionComplete({ item_id: content.id, phase: content.phase, streak: result.state.visitStreak });
      showToast('Đã lưu việc Tết hôm nay');
    }, { once: true });
  }

  function showToast(message) {
    var toast = document.getElementById('home-toast');
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(function () { toast.hidden = true; }, 2600);
  }

  function loadHtml2Canvas() {
    if (window.html2canvas) return Promise.resolve(window.html2canvas);
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[data-home-html2canvas]');
      if (existing) {
        existing.addEventListener('load', function () { resolve(window.html2canvas); }, { once: true });
        existing.addEventListener('error', reject, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      script.async = true;
      script.setAttribute('data-home-html2canvas', 'true');
      script.addEventListener('load', function () { resolve(window.html2canvas); }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function canvasToBlob(canvas) {
    return new Promise(function (resolve) { canvas.toBlob(resolve, 'image/png', 0.94); });
  }

  async function shareCountdown() {
    var shareData = { title: document.title, text: 'Cùng mình đếm ngược đến Tết Nguyên Đán 2027!', url: window.location.href };
    window.webAnalytics?.trackShare('homepage', 'countdown');
    if (navigator.share) {
      try { await navigator.share(shareData); return; } catch (error) { if (error && error.name === 'AbortError') return; }
    }
    try {
      var capture = await loadHtml2Canvas();
      var card = document.getElementById('countdown-share-card') || document.getElementById('countdown-content-wrapper');
      var canvas = await capture(card, { backgroundColor: '#701a2f', scale: Math.min(window.devicePixelRatio || 1, 2) });
      var blob = await canvasToBlob(canvas);
      if (blob) {
        var url = URL.createObjectURL(blob);
        var download = document.createElement('a');
        download.href = url;
        download.download = 'sap-tet-2027.png';
        download.click();
        window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        showToast('Đã tải ảnh countdown');
        return;
      }
    } catch (error) {}
    try { await navigator.clipboard.writeText(window.location.href); showToast('Đã sao chép liên kết'); } catch (error) { showToast('Hãy sao chép liên kết trên thanh địa chỉ'); }
  }

  function bindFullCardActions() {
    document.querySelectorAll('[data-home-card-action]').forEach(function (card) {
      function activateCard(event) {
        if (card.getAttribute('aria-disabled') === 'true') return;
        if (event.type === 'click' && event.target.closest('a, button')) return;
        if (event.type === 'keydown') {
          if (event.target !== card || (event.key !== 'Enter' && event.key !== ' ')) return;
          event.preventDefault();
        }
        var action = card.querySelector(card.getAttribute('data-home-card-action'));
        if (action) action.click();
      }
      card.addEventListener('click', activateCard);
      card.addEventListener('keydown', activateCard);
    });
  }

  function configureSmartAppButtons(navigatorLike) {
    var platform = detectAppPlatform(navigatorLike);
    var destination = platform === 'android' ? ANDROID_APP_URL : platform === 'ios' ? IOS_APP_URL : '#app-intro';
    document.querySelectorAll('[data-home-smart-app]').forEach(function (link) {
      link.setAttribute('href', destination);
      link.setAttribute('data-home-app-platform', platform);
      if (platform === 'web') {
        link.removeAttribute('target');
        link.removeAttribute('rel');
        link.addEventListener('click', function (event) {
          event.preventDefault();
          document.getElementById('app-intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
      if (link.hasAttribute('data-home-floating-app')) {
        var storeName = platform === 'android' ? 'Google Play' : platform === 'ios' ? 'App Store' : 'phần tải ứng dụng';
        link.setAttribute('aria-label', 'Mở ' + storeName + ' của Sắp Tết');
        var tooltip = link.querySelector('.home-floating-app-tooltip');
        if (tooltip) tooltip.textContent = platform === 'web' ? 'Tải ứng dụng' : 'Mở ' + storeName;
      }
    });
    return platform;
  }

  function bindAnalytics() {
    document.querySelectorAll('[data-home-quick-link]').forEach(function (link) {
      link.addEventListener('click', function () {
        trackQuickLink({ destination: link.getAttribute('href'), item_id: link.getAttribute('data-home-quick-link') });
      });
    });
    var discovery = document.getElementById('kham-pha');
    discovery?.addEventListener('click', function (event) {
      var link = event.target.closest('a');
      if (!link) return;
      trackDiscoveryClick({ destination: link.getAttribute('href') || '', content_type: 'affiliate' });
    });
    document.querySelectorAll('[data-home-app-download]').forEach(function (link) {
      link.addEventListener('click', function () {
        window.webAnalytics?.trackDownloadClick(link.getAttribute('data-home-app-download'), 'home_app_showcase');
      });
    });
    document.querySelectorAll('[data-home-smart-app]').forEach(function (link) {
      link.addEventListener('click', function () {
        var source = link.getAttribute('data-home-smart-app-source') || 'homepage';
        window.webAnalytics?.trackImportantAction(source === 'floating' ? 'home_floating_app_open' : 'home_footer_app_open', {
          destination: link.getAttribute('href') || '#app-intro',
          platform: link.getAttribute('data-home-app-platform') || 'web'
        });
      });
    });
  }

  function registerServiceWorker() {
    if (!('serviceWorker' in navigator) || !window.isSecureContext) return;
    navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' }).catch(function () {});
  }

  function getBrowserStorage() {
    try {
      return window.localStorage;
    } catch (error) {
      return {
        getItem: function () { throw error; },
        setItem: function () { throw error; }
      };
    }
  }

  function init() {
    if (window.__homeRetentionInitialized) return;
    window.__homeRetentionInitialized = true;
    var now = new Date();
    var storage = getBrowserStorage();
    var result = updateVisitState(storage, now);
    var phase = getHomePhase(now);
    var content = getDailyContent(now, phase);

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
    renderDateCard(now);
    renderNearestEvent(now);
    renderDailyCard(content, result, storage);
    bindFullCardActions();
    configureSmartAppButtons(navigator);

    if (result.storageAvailable) {
      var streak = document.getElementById('home-streak');
      if (streak) streak.hidden = false;
      setText('visit-streak', String(result.state.visitStreak));
    }
    if (result.isReturningVisit) trackReturnVisit({ days_since_last_visit: result.daysSinceLastVisit, streak: result.state.visitStreak });
    trackDailyCardView({ item_id: content.id, phase: phase, streak: result.storageAvailable ? result.state.visitStreak : 0 });

    document.getElementById('share-countdown-btn')?.addEventListener('click', shareCountdown);
    bindAnalytics();
    registerServiceWorker();
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
  }

  return {
    STATE_KEY: STATE_KEY,
    TIME_ZONE: TIME_ZONE,
    getVietnamDateKey: getVietnamDateKey,
    updateVisitState: updateVisitState,
    getHomePhase: getHomePhase,
    getDailyContent: getDailyContent,
    daysBetweenKeys: daysBetweenKeys,
    detectAppPlatform: detectAppPlatform
  };
});

(function (root, factory) {
  var api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) {
    root.HomeFireworks = api;
    var start = function () { api.init(root, root.document); };
    if (root.document.readyState === 'loading') root.document.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  }
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  var PALETTES = [
    ['#ff3b30', '#ffd60a'],
    ['#a40e2c', '#ff7a00'],
    ['#ff2d78', '#8b2cf5'],
    ['#159947', '#ffd60a'],
    ['#1769e0', '#00a6fb'],
    ['#ff6a00', '#e02626']
  ];
  var TET_TIME = new Date('2027-02-06T00:00:00+07:00');
  var DAY_MS = 24 * 60 * 60 * 1000;
  var MAX_DAILY_ROCKETS = 20;
  var RETENTION_STATE_KEY = 'saptet_home_retention_v1';
  var COLLECTION_STATE_KEY = 'saptet_home_fireworks_collection_v1';
  var DAILY_REWARD_STATE_KEY = 'saptet_home_fireworks_daily_v1';
  var VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh';
  var LEGACY_MESSAGE_REPLACEMENTS = {
    'sap-tet': 'tet-vui-nhu-hoi',
    'tet-countdown': 'loc-do-ca-nam',
    'happy-new-year': 'sum-vay-don-xuan'
  };
  var SIGNATURE_MESSAGES = [
    { id: 'tet-vui-nhu-hoi', text: 'Tết Vui Như Hội' },
    { id: 'loc-do-ca-nam', text: 'Lộc Đỏ Cả Năm' },
    { id: 'sum-vay-don-xuan', text: 'Sum Vầy Đón Xuân' },
    { id: 'van-su-nhu-y', text: 'Vạn Sự Như Ý' },
    { id: 'an-khang-thinh-vuong', text: 'An Khang Thịnh Vượng' },
    { id: 'tan-tai-tan-loc', text: 'Tấn Tài Tấn Lộc' },
    { id: 'xuan-sum-vay', text: 'Xuân Sum Vầy' },
    { id: 'phuc-loc-day-nha', text: 'Phúc Lộc Đầy Nhà' },
    { id: 'cung-chuc-tan-xuan', text: 'Cung Chúc Tân Xuân' },
    { id: 'tai-loc-nhu-y', text: 'Tài Lộc Như Ý' },
    { id: 'binh-an-nhu-y', text: 'Bình An Như Ý' },
    { id: 'gia-dinh-hanh-phuc', text: 'Gia Đình Hạnh Phúc' },
    { id: 'suc-khoe-doi-dao', text: 'Sức Khỏe Dồi Dào' },
    { id: 'ma-dao-thanh-cong', text: 'Mã Đáo Thành Công' },
    { id: 'phat-tai-phat-loc', text: 'Phát Tài Phát Lộc' },
    { id: 'tien-vao-nhu-nuoc', text: 'Tiền Vào Như Nước' },
    { id: 'nam-moi-binh-an', text: 'Năm Mới Bình An' },
    { id: 'xuan-sang-phu-quy', text: 'Xuân Sang Phú Quý' },
    { id: 'loc-biec-day-nha', text: 'Lộc Biếc Đầy Nhà' },
    { id: 'tet-dong-day', text: 'Tết Đong Đầy' },
    { id: 'van-phuc-don-xuan', text: 'Vạn Phúc Đón Xuân' },
    { id: 'nhu-y-cat-tuong', text: 'Như Ý Cát Tường' },
    { id: 'thuan-buom-xuoi-gio', text: 'Thuận Buồm Xuôi Gió' },
    { id: 'cong-thanh-danh-toai', text: 'Công Thành Danh Toại' },
    { id: 'dai-cat-dai-loi', text: 'Đại Cát Đại Lợi' },
    { id: 'phu-quy-an-khang', text: 'Phú Quý An Khang' },
    { id: 'hanh-phuc-vien-man', text: 'Hạnh Phúc Viên Mãn' },
    { id: 'may-man-ca-nam', text: 'May Mắn Cả Năm' },
    { id: 'niem-vui-go-cua', text: 'Niềm Vui Gõ Cửa' },
    { id: 'xuan-ve-ruc-ro', text: 'Xuân Về Rực Rỡ' },
    { id: 'muon-dieu-nhu-y', text: 'Muôn Điều Như Ý' },
    { id: 'don-xuan-binh-an', text: 'Đón Xuân Bình An' },
    { id: 'xuan-an-vui', text: 'Xuân An Vui' },
    { id: 'tet-am-ap', text: 'Tết Ấm Áp' },
    { id: 'loc-den-tan-gia', text: 'Lộc Đến Tận Gia' },
    { id: 'phuc-khi-ngap-tran', text: 'Phúc Khí Ngập Tràn' },
    { id: 'nam-moi-hanh-thong', text: 'Năm Mới Hanh Thông' },
    { id: 'su-nghiep-thang-hoa', text: 'Sự Nghiệp Thăng Hoa' },
    { id: 'hoc-hanh-tan-toi', text: 'Học Hành Tấn Tới' },
    { id: 'uoc-gi-duoc-nay', text: 'Ước Gì Được Nấy' },
    { id: 'cuoi-tha-ga-ca-nam-may-man', text: 'Cười Thả Ga, Cả Năm May Mắn' },
    { id: 'vi-day-tien-tim-day-vui', text: 'Ví Đầy Tiền, Tim Đầy Vui' },
    { id: 'tet-nay-het-e', text: 'Tết Này Hết Ế' },
    { id: 'deadline-lui-tet-toi', text: 'Deadline Lùi, Tết Tới' },
    { id: 'ngu-ngon-an-khoe', text: 'Ngủ Ngon, Ăn Khỏe' },
    { id: 'mo-cua-don-loc', text: 'Mở Cửa Đón Lộc' },
    { id: 'xuan-nay-rat-chill', text: 'Xuân Này Rất Chill' },
    { id: 'ca-nam-ruc-ro', text: 'Cả Năm Rực Rỡ' },
    { id: 'buon-may-ban-dat', text: 'Buôn May Bán Đắt' },
    { id: 'tien-ve-tai-loc-toi', text: 'Tiền Về, Tài Lộc Tới' },
    { id: 'gia-dao-hung-thinh', text: 'Gia Đạo Hưng Thịnh' },
    { id: 'tam-an-van-su-thanh', text: 'Tâm An, Vạn Sự Thành' },
    { id: 'phuc-day-loc-day', text: 'Phúc Đầy, Lộc Đầy' },
    { id: 'tet-vui-het-nac', text: 'Tết Vui Hết Nấc' },
    { id: 'xuan-sang-loc-den', text: 'Xuân Sang, Lộc Đến' },
    { id: 'nhan-duyen-nhu-y', text: 'Nhân Duyên Như Ý' },
    { id: 'cong-viec-hanh-thong', text: 'Công Việc Hanh Thông' },
    { id: 'di-dau-cung-gap-may', text: 'Đi Đâu Cũng Gặp May' },
    { id: 'quanh-nam-toan-niem-vui', text: 'Quanh Năm Toàn Niềm Vui' },
    { id: 'nha-nha-am-em', text: 'Nhà Nhà Ấm Êm' },
    { id: 'tet-du-day-vi', text: 'Tết Đủ Đầy Vị' },
    { id: 'moi-ngay-mot-niem-vui', text: 'Mỗi Ngày Một Niềm Vui' },
    { id: 'tai-danh-phuc-thinh', text: 'Tài Danh Phúc Thịnh' },
    { id: 'xuan-moi-khoi-sac', text: 'Xuân Mới Khởi Sắc' }
  ];

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function between(minimum, maximum, random) {
    return minimum + (maximum - minimum) * random();
  }

  function createLaunchPlan(width, height, random, rocketCount) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var safeWidth = Math.max(320, Number(width) || 320);
    var safeHeight = Math.max(480, Number(height) || 480);
    var count = clamp(Math.round(Number(rocketCount) || 1), 1, MAX_DAILY_ROCKETS);
    var plan = [];
    for (var index = 0; index < count; index += 1) {
      var targetX = between(safeWidth * 0.1, safeWidth * 0.9, randomValue);
      var palette = PALETTES[Math.floor(randomValue() * PALETTES.length) % PALETTES.length];
      plan.push({
        startX: clamp(targetX + between(-safeWidth * 0.12, safeWidth * 0.12, randomValue), 24, safeWidth - 24),
        targetX: targetX,
        targetY: between(safeHeight * 0.14, safeHeight * 0.55, randomValue),
        delay: index * 135 + Math.round(between(0, 55, randomValue)),
        duration: between(680, 880, randomValue),
        curve: between(-32, 32, randomValue),
        color: palette[0],
        accent: palette[1]
      });
    }
    return plan;
  }

  function normalizeStreak(value) {
    var streak = Math.floor(Number(value) || 1);
    return clamp(streak, 1, MAX_DAILY_ROCKETS);
  }

  function normalizeVisitStreak(value) {
    return Math.max(1, Math.floor(Number(value) || 1));
  }

  function getVietnamDateKey(now) {
    var date = now instanceof Date ? now : new Date();
    var parts = new Intl.DateTimeFormat('en-US', {
      timeZone: VIETNAM_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(date);
    var values = {};
    parts.forEach(function (part) { values[part.type] = part.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function createDailyTarget(random) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    return 30 + Math.floor(clamp(Number(randomValue()) || 0, 0, .999999) * 71);
  }

  function normalizeDailyRewardState(value, now, random) {
    var dateKey = getVietnamDateKey(now);
    if (!value || value.dateKey !== dateKey) {
      return { version: 1, dateKey: dateKey, target: createDailyTarget(random), rocketsFired: 0, rewardClaimed: false, messageId: '' };
    }
    var target = clamp(Math.floor(Number(value.target) || createDailyTarget(random)), 30, 100);
    return {
      version: 1,
      dateKey: dateKey,
      target: target,
      rocketsFired: clamp(Math.floor(Number(value.rocketsFired) || 0), 0, target),
      rewardClaimed: Boolean(value.rewardClaimed),
      messageId: typeof value.messageId === 'string' ? (LEGACY_MESSAGE_REPLACEMENTS[value.messageId] || value.messageId) : ''
    };
  }

  function advanceDailyRewardState(state, rocketCount) {
    var target = clamp(Math.floor(Number(state && state.target) || 30), 30, 100);
    var current = clamp(Math.floor(Number(state && state.rocketsFired) || 0), 0, target);
    if (state && state.rewardClaimed) {
      return { state: Object.assign({}, state, { target: target, rocketsFired: current }), rewardReached: false };
    }
    var next = Math.min(target, current + Math.max(1, Math.floor(Number(rocketCount) || 1)));
    var rewardReached = next >= target;
    return {
      state: Object.assign({}, state, { target: target, rocketsFired: next, rewardClaimed: rewardReached }),
      rewardReached: rewardReached
    };
  }

  function readDailyRewardState(storage, now, random) {
    var raw = storage.getItem(DAILY_REWARD_STATE_KEY);
    return normalizeDailyRewardState(raw ? JSON.parse(raw) : null, now, random);
  }

  function saveDailyRewardState(storage, state) {
    storage.setItem(DAILY_REWARD_STATE_KEY, JSON.stringify(state));
  }

  function getRewardTier(streak) {
    var value = normalizeStreak(streak);
    if (value >= 20) return { key: 'royal', name: 'Hoàng gia' };
    if (value >= 14) return { key: 'jade', name: 'Ngọc bích' };
    if (value >= 7) return { key: 'gold', name: 'Kim sắc' };
    if (value >= 3) return { key: 'silver', name: 'Ánh bạc' };
    return { key: 'scarlet', name: 'Đỏ son' };
  }

  function readVisitStreak(storage) {
    try {
      var state = JSON.parse(storage.getItem(RETENTION_STATE_KEY) || '{}');
      return normalizeVisitStreak(state.visitStreak);
    } catch (error) {
      return 1;
    }
  }

  function getStreakReward(streak) {
    var visitStreak = normalizeVisitStreak(streak);
    var rockets = normalizeStreak(visitStreak);
    return {
      streak: visitStreak,
      rockets: rockets,
      tier: getRewardTier(rockets)
    };
  }

  function getDaysUntilTet(now) {
    var date = now instanceof Date ? now : new Date();
    return Math.max(0, Math.floor((TET_TIME.getTime() - date.getTime()) / DAY_MS));
  }

  function getSignatureMessages(now) {
    return SIGNATURE_MESSAGES.map(function (item) {
      return {
        id: item.id,
        text: item.text
      };
    });
  }

  function getSpecialFireworkMessages(now) {
    return [
      { id: 'special-countdown', text: 'Còn ' + getDaysUntilTet(now) + ' ngày nữa đến Tết', special: true },
      { id: 'special-sap-tet-2027', text: 'Sắp Tết 2027', special: true },
      { id: 'special-happy-new-year', text: 'Happy New Year', special: true },
      { id: 'special-chuc-mung-nam-moi', text: 'Chúc Mừng Năm Mới', special: true }
    ];
  }

  function createSignatureSelection(random, now, excludedIds) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var messages = getSignatureMessages(now);
    var excluded = new Set(Array.isArray(excludedIds) ? excludedIds : []);
    var availableMessages = messages.filter(function (message) { return !excluded.has(message.id); });
    var pool = availableMessages.length ? availableMessages : messages;
    return pool[Math.floor(randomValue() * pool.length) % pool.length];
  }

  function createSignatureMessage(random, now) {
    return createSignatureSelection(random, now).text;
  }

  function createUnlockedSignatureSelection(random, now, unlockedIds) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var unlocked = new Set(Array.isArray(unlockedIds) ? unlockedIds : []);
    var pool = getSignatureMessages(now).filter(function (message) { return unlocked.has(message.id); });
    if (!pool.length) return null;
    return pool[Math.floor(randomValue() * pool.length) % pool.length];
  }

  function createFireworkDisplaySelection(random, now, unlockedIds) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var unlocked = new Set(Array.isArray(unlockedIds) ? unlockedIds : []);
    var unlockedPool = getSignatureMessages(now).filter(function (message) { return unlocked.has(message.id); });
    var specialPool = getSpecialFireworkMessages(now);
    var pool = !unlockedPool.length || randomValue() < .5 ? specialPool : unlockedPool;
    return pool[Math.floor(randomValue() * pool.length) % pool.length];
  }

  function normalizeCollectionState(value) {
    var validIds = new Set(SIGNATURE_MESSAGES.map(function (item) { return item.id; }));
    var ids = value && Array.isArray(value.unlockedIds) ? value.unlockedIds : [];
    var migratedIds = ids.map(function (id) { return LEGACY_MESSAGE_REPLACEMENTS[id] || id; });
    return {
      version: 1,
      unlockedIds: Array.from(new Set(migratedIds.filter(function (id) { return typeof id === 'string' && validIds.has(id); }))),
      clicksSinceWish: clamp(Math.floor(Number(value && value.clicksSinceWish) || 0), 0, 19),
      launcherHintSeen: Boolean(value && value.launcherHintSeen)
    };
  }

  function advanceWishReplayCounter(value) {
    var next = clamp(Math.floor(Number(value) || 0), 0, 19) + 1;
    return { clicksSinceWish: next >= 20 ? 0 : next, wishReached: next >= 20 };
  }

  function readCollectionState(storage) {
    var raw = storage.getItem(COLLECTION_STATE_KEY);
    return normalizeCollectionState(raw ? JSON.parse(raw) : null);
  }

  function saveCollectionState(storage, state) {
    storage.setItem(COLLECTION_STATE_KEY, JSON.stringify(normalizeCollectionState(state)));
  }

  function unlockCollectionItem(state, messageId) {
    var normalized = normalizeCollectionState(state);
    var isValid = SIGNATURE_MESSAGES.some(function (item) { return item.id === messageId; });
    if (!isValid || normalized.unlockedIds.indexOf(messageId) !== -1) {
      return { state: normalized, newlyUnlocked: false };
    }
    normalized.unlockedIds.push(messageId);
    return { state: normalized, newlyUnlocked: true };
  }

  function createSignatureRocket(width, height, random) {
    var randomValue = typeof random === 'function' ? random : Math.random;
    var safeWidth = Math.max(320, Number(width) || 320);
    var safeHeight = Math.max(480, Number(height) || 480);
    return {
      startX: between(safeWidth * .38, safeWidth * .62, randomValue),
      targetX: between(safeWidth * .28, safeWidth * .72, randomValue),
      targetY: between(safeHeight * .18, safeHeight * .52, randomValue),
      delay: 240,
      duration: between(820, 980, randomValue),
      curve: between(-18, 18, randomValue),
      color: '#d71932',
      accent: '#ffd60a',
      signature: true
    };
  }

  function createController(win, doc, trigger) {
    var canvas = null;
    var context = null;
    var width = 0;
    var height = 0;
    var rockets = [];
    var particles = [];
    var flashes = [];
    var wordBursts = [];
    var pendingLaunches = 0;
    var animationFrame = 0;
    var cleanupTimer = 0;
    var testStreak = 1;
    var testMode = false;
    var storage;
    var dailyRewardState;
    var rewardModalLastFocus = null;
    var launcherDiscoveryTimer = 0;
    var launchFeedbackTimer = 0;

    try {
      storage = win.localStorage;
      testMode = new win.URLSearchParams(win.location.search).get('test-phaohoa') === '1';
    } catch (error) {
      storage = { getItem: function () { return null; }, setItem: function () { throw error; } };
    }
    var collectionState;
    try {
      collectionState = testMode ? normalizeCollectionState(null) : readCollectionState(storage);
    } catch (error) {
      collectionState = normalizeCollectionState(null);
    }
    try {
      dailyRewardState = testMode ? normalizeDailyRewardState(null, new Date(), Math.random) : readDailyRewardState(storage, new Date(), Math.random);
      if (!testMode) saveDailyRewardState(storage, dailyRewardState);
    } catch (error) {
      dailyRewardState = normalizeDailyRewardState(null, new Date(), Math.random);
    }

    function getReward() {
      return getStreakReward(testMode ? testStreak : readVisitStreak(storage));
    }

    function setElementText(id, value) {
      var element = doc.getElementById(id);
      if (element) element.textContent = value;
    }

    function setProgress(id, value) {
      var element = doc.getElementById(id);
      if (!element) return;
      element.value = Number(value) || 0;
      element.setAttribute('value', String(Number(value) || 0));
    }

    function renderLaunchProgress(showSuccess) {
      var clicks = collectionState.clicksSinceWish;
      var action = dailyRewardState.rewardClaimed ? 'Bắn tiếp' : 'Bắn pháo';
      setElementText('home-fireworks-launch-label', showSuccess ? 'Lời chúc đã xuất hiện!' : action + ' · ' + clicks + '/20');
      var reward = getReward();
      trigger.setAttribute('aria-label', 'Bắn pháo hoa. Tiến độ ' + clicks + ' trên 20 lượt đến lời chúc tiếp theo. Mỗi lần bắn ' + reward.rockets + ' viên.');
    }

    function showLaunchSuccess() {
      if (launchFeedbackTimer) win.clearTimeout(launchFeedbackTimer);
      renderLaunchProgress(true);
      launchFeedbackTimer = win.setTimeout(function () {
        launchFeedbackTimer = 0;
        renderLaunchProgress(false);
      }, 1500);
    }

    function dismissLauncherDiscovery(markAsLaunched) {
      if (launcherDiscoveryTimer) {
        win.clearTimeout(launcherDiscoveryTimer);
        launcherDiscoveryTimer = 0;
      }
      trigger.classList.remove('is-discovering');
      if (markAsLaunched) trigger.classList.add('has-launched');
      if (collectionState.launcherHintSeen) return;
      collectionState.launcherHintSeen = true;
      if (!testMode) {
        try { saveCollectionState(storage, collectionState); } catch (error) {}
      }
    }

    function setupLauncherDiscovery() {
      if (collectionState.launcherHintSeen) return;
      trigger.classList.add('is-discovering');
      launcherDiscoveryTimer = win.setTimeout(function () { dismissLauncherDiscovery(false); }, 5000);
    }

    function renderReward(reward) {
      var value = reward || getReward();
      trigger.setAttribute('data-tier', value.tier.key);
      trigger.removeAttribute('data-used');
      setElementText('visit-streak', String(value.streak));
      setElementText('home-fireworks-shot-count', String(value.rockets));
      return value;
    }

    function renderFeaturedWish(message, label) {
      var featured = doc.getElementById('home-fireworks-featured');
      if (!featured) return;
      var collectionList = doc.getElementById('home-fireworks-collection-list');
      if (collectionList) {
        collectionList.querySelectorAll('.home-fireworks-collection-item.is-unlocked').forEach(function (item) {
          var isActive = Boolean(message && item.getAttribute('data-message-id') === message.id);
          item.classList.toggle('is-active', isActive);
          item.setAttribute('aria-pressed', String(isActive));
        });
      }
      if (!message) {
        featured.classList.remove('is-revealed');
        featured.removeAttribute('data-variant');
        setElementText('home-fireworks-featured-label', 'Lời chúc đầu tiên đang chờ');
        setElementText('home-fireworks-featured-wish', 'Bắn pháo hoa để mở khóa');
        setElementText('home-fireworks-featured-hint', 'Lời chúc mới nhất sẽ xuất hiện tại đây');
        return;
      }
      var messageIndex = getSignatureMessages(new Date()).findIndex(function (item) { return item.id === message.id; });
      featured.classList.add('is-revealed');
      featured.setAttribute('data-variant', String(Math.max(0, messageIndex) % 4));
      setElementText('home-fireworks-featured-label', label || 'Lời chúc nổi bật');
      setElementText('home-fireworks-featured-wish', message.text);
      setElementText('home-fireworks-featured-hint', 'Chọn một thẻ khác để xem và trình diễn lại');
    }

    function renderCollection(newMessageId) {
      var list = doc.getElementById('home-fireworks-collection-list');
      if (!list) return;
      while (list.firstChild) list.removeChild(list.firstChild);
      var unlocked = new Set(collectionState.unlockedIds);
      var messages = getSignatureMessages(new Date());
      var messagesById = new Map(messages.map(function (message) { return [message.id, message]; }));
      var messageNumbers = new Map(messages.map(function (message, index) { return [message.id, index + 1]; }));
      var unlockedMessages = collectionState.unlockedIds.slice().reverse().map(function (id) { return messagesById.get(id); }).filter(Boolean);
      var orderedMessages = unlockedMessages.concat(messages.filter(function (message) { return !unlocked.has(message.id); }));
      orderedMessages.forEach(function (message) {
        var isUnlocked = unlocked.has(message.id);
        var number = String(messageNumbers.get(message.id)).padStart(2, '0');
        var item = doc.createElement(isUnlocked ? 'button' : 'span');
        if (isUnlocked) item.type = 'button';
        item.className = 'home-fireworks-collection-item ' + (isUnlocked ? 'is-unlocked' : 'is-locked') + (message.id === newMessageId ? ' is-new' : '');
        item.setAttribute('data-variant', String((Number(messageNumbers.get(message.id)) - 1) % 4));
        item.setAttribute('data-message-id', message.id);
        var cardNumber = doc.createElement('span');
        cardNumber.className = 'home-fireworks-card-number';
        cardNumber.textContent = 'Thẻ ' + number;
        var cardText = doc.createElement('strong');
        cardText.className = 'home-fireworks-card-text';
        cardText.textContent = isUnlocked ? message.text : 'Chưa mở khóa';
        item.appendChild(cardNumber);
        item.appendChild(cardText);
        item.setAttribute('aria-label', isUnlocked ? 'Xem lại lời chúc: ' + message.text : 'Lời chúc số ' + number + ' chưa mở khóa');
        if (isUnlocked) {
          item.addEventListener('click', function () {
            renderFeaturedWish(message, 'Đang trình diễn');
            replayMessage(message);
            if (win.webAnalytics && typeof win.webAnalytics.trackEvent === 'function') {
              win.webAnalytics.trackEvent('home_fireworks_wish_replay', { source: 'collection_card', message_id: message.id });
            }
          });
        }
        list.appendChild(item);
      });
      var unlockedCount = collectionState.unlockedIds.length;
      var isComplete = unlockedCount === SIGNATURE_MESSAGES.length;
      var collection = doc.getElementById('home-fireworks-collection');
      if (collection) collection.classList.toggle('is-complete', isComplete);
      setElementText('home-fireworks-collection-progress', unlockedCount + '/' + SIGNATURE_MESSAGES.length);
      setElementText('home-fireworks-unlocked-summary', isComplete ? 'Chọn thẻ để trình diễn lại' : (unlockedCount ? unlockedCount + ' lời chúc đã mở' : 'Chưa có lời chúc'));
      var todayMessage = dailyRewardState.rewardClaimed ? messagesById.get(dailyRewardState.messageId) : null;
      var featuredMessage = newMessageId ? messagesById.get(newMessageId) : (todayMessage || unlockedMessages[0]);
      renderFeaturedWish(featuredMessage, newMessageId ? 'Lời chúc vừa mở' : (todayMessage ? 'Lời chúc hôm nay' : 'Lời chúc nổi bật'));
      setProgress('home-fireworks-collection-meter', unlockedCount);
      var collectionMeter = doc.getElementById('home-fireworks-collection-meter');
      if (collectionMeter) {
        collectionMeter.max = SIGNATURE_MESSAGES.length;
        collectionMeter.setAttribute('max', String(SIGNATURE_MESSAGES.length));
      }
    }

    function renderDailyMission() {
      var collection = doc.getElementById('home-fireworks-collection');
      var claimed = Boolean(dailyRewardState.rewardClaimed);
      var collectionComplete = collectionState.unlockedIds.length === SIGNATURE_MESSAGES.length;
      var todayMessage = claimed ? getSignatureMessages(new Date()).find(function (message) { return message.id === dailyRewardState.messageId; }) : null;
      if (collection) collection.classList.toggle('is-daily-claimed', claimed);
      setElementText('home-fireworks-daily-count', claimed ? 'Đã nhận' : dailyRewardState.rocketsFired + ' viên');
      setProgress('home-fireworks-daily-meter', dailyRewardState.rocketsFired);
      var meter = doc.getElementById('home-fireworks-daily-meter');
      if (meter) {
        meter.max = dailyRewardState.target;
        meter.setAttribute('max', String(dailyRewardState.target));
      }
      if (claimed) {
        setElementText('home-fireworks-mission-label', 'Lời chúc hôm nay');
        setElementText('home-fireworks-mission-title', todayMessage ? todayMessage.text : 'Đã mở khóa thành công');
        setElementText('home-fireworks-mission-copy', collectionComplete ? 'Bộ sưu tập đã trọn vẹn. Cứ mỗi 20 lần bấm sẽ trình diễn ngẫu nhiên một lời chúc.' : 'Bạn vừa sưu tầm thêm một lời chúc mới! Cứ mỗi 20 lần bấm, pháo hoa sẽ trình diễn một lời chúc đã mở khóa; mỗi ngày lại có một lời chúc mới chờ bạn khám phá.');
      } else {
        setElementText('home-fireworks-mission-label', 'Thử thách hôm nay');
        setElementText('home-fireworks-mission-title', dailyRewardState.rocketsFired >= 30 ? 'Lời chúc sắp xuất hiện' : 'Tìm lời chúc trong pháo hoa');
        setElementText('home-fireworks-mission-copy', dailyRewardState.rocketsFired >= 30 ? 'Thẻ mới có thể xuất hiện trong bất kỳ lượt bắn nào tiếp theo.' : (collectionComplete ? 'Cứ mỗi 20 lần bấm sẽ trình diễn ngẫu nhiên một lời chúc trong bộ sưu tập.' : 'Mỗi 20 lần bấm sẽ hiện một lời chúc đã có; mỗi ngày còn có cơ hội tìm 1 thẻ mới.'));
      }
      setElementText('home-fireworks-return-note-copy', collectionComplete ? 'Bộ sưu tập đã trọn vẹn — mỗi 20 lần bấm sẽ hiện một lời chúc ngẫu nhiên.' : 'Mỗi ngày mở 1 lời chúc mới. Lời chúc đã có xuất hiện sau mỗi 20 lần bấm.');
      renderLaunchProgress(false);
    }

    function closeRewardCelebration() {
      var modal = doc.getElementById('home-fireworks-reward-modal');
      if (!modal || modal.hidden) return;
      modal.hidden = true;
      doc.body.classList.remove('home-fireworks-reward-open');
      if (rewardModalLastFocus && typeof rewardModalLastFocus.focus === 'function') rewardModalLastFocus.focus();
      rewardModalLastFocus = null;
    }

    function showRewardCelebration(message, newlyUnlocked) {
      var modal = doc.getElementById('home-fireworks-reward-modal');
      if (!modal || !message || !newlyUnlocked) return;
      rewardModalLastFocus = doc.activeElement;
      setElementText('home-fireworks-reward-wish', message.text);
      setElementText('home-fireworks-reward-copy', 'Lời chúc mới đã được thêm vào bộ sưu tập của bạn.');
      modal.hidden = false;
      doc.body.classList.add('home-fireworks-reward-open');
      var closeButton = doc.getElementById('home-fireworks-reward-close');
      if (closeButton) closeButton.focus();
    }

    function unlockMessage(message) {
      var result = unlockCollectionItem(collectionState, message.id);
      collectionState = result.state;
      if (result.newlyUnlocked && !testMode) {
        try { saveCollectionState(storage, collectionState); } catch (error) {}
      }
      renderCollection(result.newlyUnlocked ? message.id : '');
      return result.newlyUnlocked;
    }

    function resizeCanvas() {
      if (!canvas) return;
      width = win.innerWidth;
      height = win.innerHeight;
      var ratio = Math.min(win.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function ensureCanvas() {
      win.clearTimeout(cleanupTimer);
      cleanupTimer = 0;
      if (canvas) {
        resizeCanvas();
        return;
      }
      canvas = doc.createElement('canvas');
      canvas.className = 'home-fireworks-canvas';
      canvas.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(canvas);
      context = canvas.getContext('2d');
      resizeCanvas();
    }

    function removeCanvasWhenIdle() {
      win.clearTimeout(cleanupTimer);
      cleanupTimer = win.setTimeout(function () {
        if (rockets.length || particles.length || flashes.length || wordBursts.length || pendingLaunches) return;
        if (canvas) canvas.remove();
        canvas = null;
        context = null;
      }, 350);
    }

    function explode(rocket, now) {
      var particleCount = (rocket.signature ? 92 : 68) + Math.floor(Math.random() * 24);
      flashes.push({ x: rocket.targetX, y: rocket.targetY, born: now, life: 430, color: rocket.accent });
      if (rocket.signature) {
        wordBursts.push({ x: rocket.targetX, y: rocket.targetY, born: now, life: 2300, text: rocket.message || 'Sắp Tết' });
      }
      for (var index = 0; index < particleCount; index += 1) {
        var angle = (index / particleCount) * Math.PI * 2 + between(-0.055, 0.055, Math.random);
        var speed = between(75, 205, Math.random);
        particles.push({
          x: rocket.targetX,
          y: rocket.targetY,
          born: now,
          life: between(1050, 1750, Math.random),
          velocityX: Math.cos(angle) * speed,
          velocityY: Math.sin(angle) * speed,
          radius: between(.75, 3.8, Math.random),
          color: index % 5 === 0 ? rocket.accent : rocket.color
        });
      }
      if (particles.length > 1800) particles.splice(0, particles.length - 1800);
    }

    function drawRocket(rocket, now) {
      var progress = clamp((now - rocket.born) / rocket.duration, 0, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var previousProgress = clamp(progress - 0.08, 0, 1);
      var previousEased = 1 - Math.pow(1 - previousProgress, 3);
      var curve = Math.sin(progress * Math.PI) * rocket.curve;
      var previousCurve = Math.sin(previousProgress * Math.PI) * rocket.curve;
      var x = rocket.startX + (rocket.targetX - rocket.startX) * eased + curve;
      var y = height + 18 + (rocket.targetY - height - 18) * eased;
      var previousX = rocket.startX + (rocket.targetX - rocket.startX) * previousEased + previousCurve;
      var previousY = height + 18 + (rocket.targetY - height - 18) * previousEased;
      var gradient = context.createLinearGradient(previousX, previousY, x, y);
      gradient.addColorStop(0, 'rgba(255,255,255,0)');
      gradient.addColorStop(1, rocket.accent);
      context.beginPath();
      context.moveTo(previousX, previousY);
      context.lineTo(x, y);
      context.lineWidth = 2.2;
      context.strokeStyle = gradient;
      context.stroke();
      context.beginPath();
      context.arc(x, y, 3.2, 0, Math.PI * 2);
      context.fillStyle = rocket.accent;
      context.shadowColor = rocket.color;
      context.shadowBlur = 13;
      context.fill();
      context.shadowBlur = 0;
      return progress >= 1;
    }

    function drawParticle(particle, now) {
      var age = now - particle.born;
      var progress = age / particle.life;
      if (progress >= 1) return false;
      var seconds = age / 1000;
      var drag = 1 - progress * 0.32;
      var x = particle.x + particle.velocityX * seconds * drag;
      var y = particle.y + particle.velocityY * seconds + 72 * seconds * seconds;
      var alpha = Math.pow(1 - progress, 1.35);
      context.globalAlpha = alpha;
      context.beginPath();
      context.moveTo(x - particle.velocityX * .045 * (1 - progress), y - (particle.velocityY + 144 * seconds) * .045 * (1 - progress));
      context.lineTo(x, y);
      context.strokeStyle = particle.color;
      context.lineWidth = Math.max(.55, particle.radius * .58);
      context.lineCap = 'round';
      context.stroke();
      context.beginPath();
      context.arc(x, y, Math.max(.45, particle.radius * (1 - progress * .55)), 0, Math.PI * 2);
      context.fillStyle = particle.color;
      context.shadowColor = particle.color;
      context.shadowBlur = 7;
      context.fill();
      context.shadowBlur = 0;
      context.globalAlpha = 1;
      return true;
    }

    function drawWordBurst(wordBurst, now) {
      var age = now - wordBurst.born;
      var progress = age / wordBurst.life;
      if (progress >= 1) return false;
      var reveal = clamp(age / 360, 0, 1);
      var fade = progress > .68 ? clamp((1 - progress) / .32, 0, 1) : 1;
      var scale = .72 + (1 - Math.pow(1 - reveal, 3)) * .28;
      var fontSize = clamp(width * .085, 38, 84);
      context.save();
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.lineJoin = 'round';
      context.font = '700 ' + fontSize + 'px "Dancing Script", "Be Vietnam Pro", sans-serif';
      var measuredWidth = context.measureText(wordBurst.text).width;
      var fitScale = Math.min(1, (width * .84) / Math.max(1, measuredWidth));
      var renderedHalfWidth = measuredWidth * fitScale * scale / 2;
      var safeX = clamp(wordBurst.x, renderedHalfWidth + 18, width - renderedHalfWidth - 18);
      var safeY = clamp(wordBurst.y, fontSize * .75, height - fontSize);
      context.translate(safeX, safeY);
      context.scale(scale * fitScale, scale * fitScale);
      context.globalAlpha = fade;
      context.lineWidth = Math.max(4, fontSize * .075);
      context.strokeStyle = '#8a1025';
      context.shadowColor = 'rgba(127, 14, 32, .72)';
      context.shadowBlur = 18;
      context.strokeText(wordBurst.text, 0, 0);
      context.fillStyle = '#ffd60a';
      context.fillText(wordBurst.text, 0, 0);
      context.restore();
      return true;
    }

    function drawFlash(flash, now) {
      var progress = (now - flash.born) / flash.life;
      if (progress >= 1) return false;
      context.globalAlpha = 1 - progress;
      context.beginPath();
      context.arc(flash.x, flash.y, Math.max(0, 12 * (1 - progress)), 0, Math.PI * 2);
      context.fillStyle = flash.color;
      context.shadowColor = flash.color;
      context.shadowBlur = 22;
      context.fill();
      context.shadowBlur = 0;
      context.beginPath();
      context.arc(flash.x, flash.y, 8 + progress * 42, 0, Math.PI * 2);
      context.strokeStyle = flash.color;
      context.lineWidth = 3 * (1 - progress);
      context.stroke();
      context.globalAlpha = 1;
      return true;
    }

    function animate(now) {
      animationFrame = 0;
      if (!canvas || !context) return;
      context.clearRect(0, 0, width, height);
      var remainingRockets = [];
      rockets.forEach(function (rocket) {
        if (drawRocket(rocket, now)) explode(rocket, now);
        else remainingRockets.push(rocket);
      });
      rockets = remainingRockets;
      particles = particles.filter(function (particle) { return drawParticle(particle, now); });
      flashes = flashes.filter(function (flash) { return drawFlash(flash, now); });
      wordBursts = wordBursts.filter(function (wordBurst) { return drawWordBurst(wordBurst, now); });
      if (rockets.length || particles.length || flashes.length || wordBursts.length || pendingLaunches) animationFrame = win.requestAnimationFrame(animate);
      else removeCanvasWhenIdle();
    }

    function requestAnimation() {
      if (!animationFrame) animationFrame = win.requestAnimationFrame(animate);
    }

    function replayMessage(message) {
      if (!message) return false;
      if (win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
      ensureCanvas();
      var signatureRocket = createSignatureRocket(width, height, Math.random);
      signatureRocket.message = message.text;
      pendingLaunches += 1;
      win.setTimeout(function () {
        pendingLaunches -= 1;
        rockets.push(Object.assign({ born: win.performance.now() }, signatureRocket));
        requestAnimation();
      }, signatureRocket.delay);
      requestAnimation();
      return true;
    }

    function launch() {
      var reward = getReward();
      var nowDate = new Date();
      try {
        dailyRewardState = testMode ? normalizeDailyRewardState(dailyRewardState, nowDate, Math.random) : readDailyRewardState(storage, nowDate, Math.random);
      } catch (error) {
        dailyRewardState = normalizeDailyRewardState(dailyRewardState, nowDate, Math.random);
      }
      var dailyResult = advanceDailyRewardState(dailyRewardState, reward.rockets);
      dailyRewardState = dailyResult.state;
      var replayResult = advanceWishReplayCounter(collectionState.clicksSinceWish);
      collectionState.clicksSinceWish = replayResult.clicksSinceWish;
      renderReward(reward);
      trigger.classList.remove('is-launching');
      void trigger.offsetWidth;
      trigger.classList.add('is-launching');
      win.setTimeout(function () { trigger.classList.remove('is-launching'); }, 700);

      var signatureMessage = replayResult.wishReached ? createFireworkDisplaySelection(Math.random, nowDate, collectionState.unlockedIds) : null;
      var newlyUnlocked = false;
      if (dailyResult.rewardReached) {
        var dailyMessage = createSignatureSelection(Math.random, nowDate, collectionState.unlockedIds);
        dailyRewardState.messageId = dailyMessage.id;
        newlyUnlocked = unlockMessage(dailyMessage);
        if (newlyUnlocked) {
          signatureMessage = dailyMessage;
          showRewardCelebration(dailyMessage, true);
        }
      }
      if (!testMode) {
        try { saveDailyRewardState(storage, dailyRewardState); } catch (error) {}
        try { saveCollectionState(storage, collectionState); } catch (error) {}
      }
      renderDailyMission();
      if (replayResult.wishReached) showLaunchSuccess();
      var result = {
        launched: true,
        reward: reward,
        dailyRocketsFired: dailyRewardState.rocketsFired,
        dailyTarget: dailyRewardState.target,
        dailyRewardUnlocked: dailyResult.rewardReached,
        signatureMessageId: signatureMessage ? signatureMessage.id : '',
        recurringWishShown: replayResult.wishReached,
        newlyUnlocked: newlyUnlocked,
        rocketCount: reward.rockets
      };
      if (win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches) return result;
      ensureCanvas();
      var plan = createLaunchPlan(width, height, Math.random, reward.rockets);
      if (signatureMessage) {
        var signatureRocket = createSignatureRocket(width, height, Math.random);
        signatureRocket.message = signatureMessage.text;
        plan[plan.length - 1] = signatureRocket;
      }
      pendingLaunches += plan.length;
      plan.forEach(function (item) {
        win.setTimeout(function () {
          pendingLaunches -= 1;
          rockets.push(Object.assign({ born: win.performance.now() }, item));
          requestAnimation();
        }, item.delay);
      });
      requestAnimation();
      return result;
    }

    function setTestDay(value) {
      if (!testMode) return getReward();
      testStreak = normalizeStreak(value);
      var reward = renderReward(getReward());
      renderLaunchProgress(false);
      return reward;
    }

    var rewardClose = doc.getElementById('home-fireworks-reward-close');
    var rewardModal = doc.getElementById('home-fireworks-reward-modal');
    if (rewardClose) rewardClose.addEventListener('click', closeRewardCelebration);
    if (rewardModal) rewardModal.addEventListener('click', function (event) { if (event.target === rewardModal) closeRewardCelebration(); });
    doc.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeRewardCelebration();
      if (event.key === 'Tab' && rewardModal && !rewardModal.hidden && rewardClose) {
        event.preventDefault();
        rewardClose.focus();
      }
    });
    renderReward(getReward());
    renderCollection('');
    renderDailyMission();
    setupLauncherDiscovery();
    return {
      launch: launch,
      dismissLauncherDiscovery: dismissLauncherDiscovery,
      getReward: getReward,
      getDailyRewardState: function () { return Object.assign({}, dailyRewardState); },
      getCollectionState: function () { return normalizeCollectionState(collectionState); },
      setTestDay: setTestDay,
      isTestMode: testMode
    };
  }

  function createTestPanel(doc, controller) {
    if (!controller || !controller.isTestMode) return null;
    var panel = doc.createElement('aside');
    panel.className = 'home-fireworks-test-panel';
    panel.setAttribute('aria-label', 'Chế độ test pháo hoa');
    var title = doc.createElement('strong');
    title.textContent = 'Chế độ test · chọn ngày streak';
    var days = doc.createElement('div');
    days.className = 'home-fireworks-test-days';
    [1, 2, 3, 7, 14, 20].forEach(function (day) {
      var button = doc.createElement('button');
      button.type = 'button';
      button.textContent = 'Ngày ' + day;
      if (day === 1) button.classList.add('is-active');
      button.addEventListener('click', function () {
        days.querySelectorAll('button').forEach(function (item) { item.classList.remove('is-active'); });
        button.classList.add('is-active');
        controller.setTestDay(day);
      });
      days.appendChild(button);
    });
    panel.appendChild(title);
    panel.appendChild(days);
    doc.body.appendChild(panel);
    return panel;
  }

  function init(win, doc) {
    if (!win || !doc) return null;
    var trigger = doc.getElementById('home-fireworks-trigger');
    if (!trigger || trigger.hasAttribute('data-home-fireworks-bound')) return null;
    trigger.setAttribute('data-home-fireworks-bound', 'true');
    var controller = createController(win, doc, trigger);
    createTestPanel(doc, controller);
    function launchAndTrack(source) {
      controller.dismissLauncherDiscovery(true);
      var result = controller.launch();
      if (result && result.launched && win.webAnalytics && typeof win.webAnalytics.trackEvent === 'function') {
        win.webAnalytics.trackEvent('home_fireworks_launch', {
          source: controller.isTestMode ? 'test_panel' : source,
          streak: result.reward.streak,
          rocket_count: result.rocketCount,
          tier: result.reward.tier.key,
          daily_rockets_fired: result.dailyRocketsFired,
          daily_target: result.dailyTarget,
          daily_reward_unlocked: result.dailyRewardUnlocked,
          signature_message_id: result.signatureMessageId,
          recurring_wish_shown: result.recurringWishShown,
          collection_new_unlock: result.newlyUnlocked
        });
      }
    }
    trigger.addEventListener('click', function () { launchAndTrack('floating_button'); });
    var collectionLaunch = doc.getElementById('home-fireworks-collection-launch');
    if (collectionLaunch) collectionLaunch.addEventListener('click', function () { launchAndTrack('collection_card'); });
    return controller;
  }

  return {
    createLaunchPlan: createLaunchPlan,
    createSignatureRocket: createSignatureRocket,
    createSignatureSelection: createSignatureSelection,
    createUnlockedSignatureSelection: createUnlockedSignatureSelection,
    createFireworkDisplaySelection: createFireworkDisplaySelection,
    createSignatureMessage: createSignatureMessage,
    getSignatureMessages: getSignatureMessages,
    getSpecialFireworkMessages: getSpecialFireworkMessages,
    getDaysUntilTet: getDaysUntilTet,
    getRewardTier: getRewardTier,
    getStreakReward: getStreakReward,
    getVietnamDateKey: getVietnamDateKey,
    createDailyTarget: createDailyTarget,
    normalizeDailyRewardState: normalizeDailyRewardState,
    advanceDailyRewardState: advanceDailyRewardState,
    readDailyRewardState: readDailyRewardState,
    saveDailyRewardState: saveDailyRewardState,
    normalizeCollectionState: normalizeCollectionState,
    readCollectionState: readCollectionState,
    saveCollectionState: saveCollectionState,
    unlockCollectionItem: unlockCollectionItem,
    advanceWishReplayCounter: advanceWishReplayCounter,
    readVisitStreak: readVisitStreak,
    createController: createController,
    init: init
  };
});

(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.PaydayCountdown = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh';
  const STORAGE_KEY = 'sap_tet_salary_countdown_v1';
  const STORAGE_VERSION = 1;
  const DEFAULT_ROLE = 'single';
  const VALID_ROLES = ['single', 'dating', 'has-wife', 'has-husband'];

  const ROLE_CONTENT = {
    single: {
      label: 'Độc thân',
      title: 'Lương về, mình vẫn là ưu tiên số một',
      items: [
        'Làm gì cũng được, đừng đầu tư lung tung.',
        'Thanh toán các khoản cố định để phần còn lại thật sự là của bạn.',
        'Tự thưởng một món nhỏ, nhưng đặt giới hạn trước khi bấm mua.',
        'Dành một phần để ăn ngon hoặc làm điều vui cùng gia đình, bạn bè.'
      ],
      groups: ['tech-accessories', 'fashion-personal', 'food-drink']
    },
    dating: {
      label: 'Đang yêu',
      title: 'Có lương rồi, yêu vui mà ví vẫn khỏe',
      items: [
        'Để dành tiền cưới vợ/chồng.',
        'Ưu tiên một trải nghiệm chung thay vì mua quà chỉ vì đang giảm giá.',
        'Trao đổi thẳng về kế hoạch tiết kiệm nếu hai bạn có mục tiêu chung.',
        'Giữ lại một khoản riêng cho bản thân — yêu nhau không cần chung mọi hóa đơn.'
      ],
      groups: ['gifts-decor', 'food-drink', 'fashion-personal']
    },
    'has-wife': {
      label: 'Có vợ',
      title: 'Lương về, bàn chuyện tiền nhà thật nhẹ nhàng',
      items: [
        'Chuyển hết cho vợ.'
      ],
      groups: ['home-living', 'food-drink', 'gifts-decor']
    },
    'has-husband': {
      label: 'Có chồng',
      title: 'Lương về, chia việc tiền bạc chứ đừng ôm hết',
      items: [
        'Shopping món mình thích.',
        'Ưu tiên quỹ dự phòng gia đình trước các món mua ngẫu hứng.',
        'Giữ một khoản chăm sóc bản thân mà không thấy có lỗi.',
        'Chọn một niềm vui chung vừa túi tiền để ngày lương đáng nhớ hơn.'
      ],
      groups: ['home-living', 'food-drink', 'gifts-decor']
    }
  };

  const FUN_MESSAGES = [
    'Ví đang khởi động lại. Xin đừng mở ứng dụng mua sắm quá sớm.',
    'Lương chưa về nhưng danh sách muốn mua đã đi trước ba vòng.',
    'Kiên nhẫn nhé, tài khoản sắp có một khoảnh khắc huy hoàng.',
    'Mỗi ngày chưa đặt đơn là một ngày chiếc ví được nghỉ dưỡng.',
    'Tiết kiệm trước, tự thưởng sau — thứ tự nhỏ, khác biệt lớn.',
    'Ngày lương là ngày hội; ngân sách là hàng rào bảo vệ cuộc vui.',
    'Đừng hỏi lương đi đâu. Hãy giao việc cho từng đồng ngay khi nó tới.',
    'Tin vui: ngày lương đang đến. Tin tốt hơn: bạn đã có kế hoạch.'
  ];

  function clampSalaryDay(value) {
    const day = Number(value);
    return Number.isInteger(day) && day >= 1 && day <= 31 ? day : null;
  }

  function salaryDayOptions() {
    return Array.from({ length: 31 }, function (_value, index) { return index + 1; });
  }

  function daysInMonth(year, month) {
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  function effectiveSalaryDay(year, month, salaryDay) {
    const validDay = clampSalaryDay(salaryDay);
    if (!validDay) throw new RangeError('Ngày nhận lương phải từ 1 đến 31');
    return Math.min(validDay, daysInMonth(year, month));
  }

  function vietnamDate(year, month, day, hour) {
    const mm = String(month).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const hh = String(hour || 0).padStart(2, '0');
    return new Date(`${year}-${mm}-${dd}T${hh}:00:00+07:00`);
  }

  function getVietnamParts(input) {
    const date = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(date.getTime())) throw new TypeError('Thời điểm không hợp lệ');
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: VIETNAM_TIME_ZONE,
      year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(date);
    const values = {};
    parts.forEach(function (part) { if (part.type !== 'literal') values[part.type] = Number(part.value); });
    return { year: values.year, month: values.month, day: values.day };
  }

  function nextMonth(year, month) {
    return month === 12 ? { year: year + 1, month: 1 } : { year: year, month: month + 1 };
  }

  function previousMonth(year, month) {
    return month === 1 ? { year: year - 1, month: 12 } : { year: year, month: month - 1 };
  }

  function salaryDate(year, month, salaryDay) {
    return vietnamDate(year, month, effectiveSalaryDay(year, month, salaryDay));
  }

  function getPaydayState(input, salaryDay) {
    const now = input instanceof Date ? new Date(input.getTime()) : new Date(input);
    if (Number.isNaN(now.getTime())) throw new TypeError('Thời điểm không hợp lệ');
    const selectedDay = clampSalaryDay(salaryDay);
    if (!selectedDay) throw new RangeError('Ngày nhận lương phải từ 1 đến 31');

    const current = getVietnamParts(now);
    const effectiveToday = effectiveSalaryDay(current.year, current.month, selectedDay);
    if (current.day === effectiveToday) {
      const following = nextMonth(current.year, current.month);
      return {
        mode: 'payday',
        payday: salaryDate(current.year, current.month, selectedDay),
        target: salaryDate(following.year, following.month, selectedDay),
        effectiveDay: effectiveToday,
        selectedDay: selectedDay
      };
    }

    let targetMonth = { year: current.year, month: current.month };
    if (current.day > effectiveToday) targetMonth = nextMonth(current.year, current.month);
    const previous = previousMonth(targetMonth.year, targetMonth.month);
    return {
      mode: 'countdown',
      payday: null,
      target: salaryDate(targetMonth.year, targetMonth.month, selectedDay),
      previous: salaryDate(previous.year, previous.month, selectedDay),
      effectiveDay: effectiveSalaryDay(targetMonth.year, targetMonth.month, selectedDay),
      selectedDay: selectedDay
    };
  }

  function getRemaining(target, input) {
    const now = input instanceof Date ? input : new Date(input);
    const seconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
    return {
      totalSeconds: seconds,
      days: Math.floor(seconds / 86400),
      hours: Math.floor((seconds % 86400) / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60
    };
  }

  function countBusinessDays(input, target) {
    const current = getVietnamParts(input);
    let cursor = vietnamDate(current.year, current.month, current.day, 12);
    const end = new Date(target.getTime());
    let count = 0;
    while (cursor < end) {
      cursor = new Date(cursor.getTime() + 86400000);
      if (cursor > end) break;
      const weekday = cursor.getUTCDay();
      if (weekday !== 0 && weekday !== 6) count += 1;
    }
    return count;
  }

  function getFunMessage(input, role) {
    const parts = getVietnamParts(input);
    const roleIndex = Math.max(0, VALID_ROLES.indexOf(role));
    const seed = parts.year * 372 + parts.month * 31 + parts.day + roleIndex * 7;
    return FUN_MESSAGES[seed % FUN_MESSAGES.length];
  }

  function normalizeConfig(value) {
    if (!value || value.version !== STORAGE_VERSION) return null;
    const salaryDay = clampSalaryDay(value.salaryDay);
    if (!salaryDay) return null;
    return {
      version: STORAGE_VERSION,
      salaryDay: salaryDay,
      role: VALID_ROLES.indexOf(value.role) !== -1 ? value.role : DEFAULT_ROLE
    };
  }

  function createConfigStore(storage) {
    let memoryValue = null;
    function readRaw() {
      try { return storage ? storage.getItem(STORAGE_KEY) : memoryValue; }
      catch (_error) { return memoryValue; }
    }
    function writeRaw(value) {
      memoryValue = value;
      try { if (storage) storage.setItem(STORAGE_KEY, value); }
      catch (_error) { /* Keep the in-memory fallback for this page session. */ }
    }
    return {
      get: function () {
        const raw = readRaw();
        if (!raw) return null;
        try { return normalizeConfig(JSON.parse(raw)); }
        catch (_error) { return null; }
      },
      save: function (salaryDay, role) {
        const config = normalizeConfig({ version: STORAGE_VERSION, salaryDay: salaryDay, role: role || DEFAULT_ROLE });
        if (!config) throw new RangeError('Cấu hình ngày lương không hợp lệ');
        writeRaw(JSON.stringify(config));
        return config;
      }
    };
  }

  function productGroups(product) {
    const groups = Array.isArray(product && product.groups) ? product.groups.slice() : [];
    if (product && product.group) groups.push(product.group);
    return groups.filter(Boolean);
  }

  function chooseProducts(products, role, limit) {
    const wanted = (ROLE_CONTENT[role] || ROLE_CONTENT.single).groups;
    const productLimit = limit || 6;
    const seen = {};
    const valid = (products || []).filter(function (product) {
      const key = String(product && (product.id || product.url) || '');
      if (!key || seen[key] || !product.name || !product.thumbnail || !/^https?:\/\//.test(product.url || '')) return false;
      seen[key] = true;
      return true;
    });
    const ranked = valid.map(function (product, index) {
      const groups = productGroups(product);
      let score = 0;
      wanted.forEach(function (group, wantedIndex) {
        if (groups.indexOf(group) !== -1) score = Math.max(score, 30 - wantedIndex * 7);
      });
      return { product: product, score: score, index: index };
    }).sort(function (a, b) { return b.score - a.score || a.index - b.index; });
    const selected = [];
    for (let round = 0; round < 2 && selected.length < productLimit; round += 1) {
      wanted.forEach(function (group) {
        if (selected.length >= productLimit) return;
        const match = ranked.find(function (item) {
          return selected.indexOf(item) === -1 && productGroups(item.product).indexOf(group) !== -1;
        });
        if (match) selected.push(match);
      });
    }
    ranked.forEach(function (item) {
      if (selected.length < productLimit && selected.indexOf(item) === -1) selected.push(item);
    });
    return selected.slice(0, productLimit).map(function (item) { return item.product; });
  }

  function initPage() {
    const page = document.querySelector('[data-payday-page]');
    if (!page) return;
    let browserStorage = null;
    try { browserStorage = window.localStorage; }
    catch (_error) { /* Some privacy modes block even reading window.localStorage. */ }
    const store = createConfigStore(browserStorage);
    let config = store.get();
    let timer = null;
    const modal = document.querySelector('[data-payday-onboarding]');
    const form = document.querySelector('[data-payday-form]');
    const dayInput = document.getElementById('salary-day');
    const dayGrid = document.querySelector('[data-salary-day-grid]');
    const selectedDayLabel = document.querySelector('[data-selected-day]');
    const submitButton = document.querySelector('[data-payday-submit]');
    const roleSelect = document.getElementById('payday-role');
    const modalTitle = document.getElementById('payday-modal-title');
    const modalCopy = document.getElementById('payday-modal-copy');
    const cancelButton = document.querySelector('[data-payday-cancel]');
    const digits = {};
    ['days', 'hours', 'minutes', 'seconds'].forEach(function (unit) {
      digits[unit] = document.querySelector(`[data-payday-unit="${unit}"]`);
    });

    function initRevealAnimations() {
      const sections = Array.from(document.querySelectorAll('.payday-reveal'));
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reducedMotion || !('IntersectionObserver' in window)) {
        sections.forEach(function (section) { section.classList.add('is-visible'); });
        return;
      }
      document.documentElement.classList.add('payday-motion-ready');
      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
      sections.forEach(function (section) { observer.observe(section); });
    }

    function selectSalaryDay(value, focus) {
      const salaryDay = clampSalaryDay(value);
      dayInput.value = salaryDay ? String(salaryDay) : '';
      selectedDayLabel.textContent = salaryDay ? `Ngày ${salaryDay}` : 'Chưa chọn ngày';
      submitButton.disabled = !salaryDay;
      Array.from(dayGrid.querySelectorAll('.payday-day-button')).forEach(function (button) {
        const selected = Number(button.dataset.value) === salaryDay;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
        if (selected && focus) button.focus();
      });
    }

    function renderDayPicker() {
      dayGrid.innerHTML = '';
      salaryDayOptions().forEach(function (day) {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'payday-day-button';
        button.dataset.value = String(day);
        button.textContent = String(day);
        button.setAttribute('aria-label', `Ngày ${day}`);
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', function () { selectSalaryDay(day, false); });
        dayGrid.appendChild(button);
      });
    }

    renderDayPicker();
    initRevealAnimations();

    dayGrid.addEventListener('keydown', function (event) {
      const current = event.target.closest('.payday-day-button');
      if (!current) return;
      const day = Number(current.dataset.value);
      const movements = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
      let nextDay = movements[event.key] ? day + movements[event.key] : null;
      if (event.key === 'Home') nextDay = 1;
      if (event.key === 'End') nextDay = 31;
      if (nextDay === null) return;
      event.preventDefault();
      nextDay = Math.max(1, Math.min(31, nextDay));
      const target = dayGrid.querySelector(`[data-value="${nextDay}"]`);
      if (target) target.focus();
    });

    function openDayPicker(editing) {
      modal.hidden = false;
      document.body.classList.add('payday-modal-open');
      page.setAttribute('inert', '');
      document.getElementById('header-container').setAttribute('inert', '');
      document.getElementById('footer-container').setAttribute('inert', '');
      modalTitle.textContent = editing ? 'Đổi ngày nhận lương' : 'Bạn thường nhận lương ngày nào?';
      modalCopy.textContent = editing ? 'Chọn ngày mới, đồng hồ sẽ cập nhật ngay.' : 'Chỉ cần chọn một lần, Sắp Tết sẽ ghi nhớ trên thiết bị này.';
      cancelButton.hidden = !editing;
      selectSalaryDay(editing && config ? config.salaryDay : null, false);
      window.setTimeout(function () {
        const target = dayGrid.querySelector('.is-selected') || dayGrid.querySelector('.payday-day-button');
        if (target) target.focus();
      }, 0);
    }

    function closeDayPicker() {
      modal.hidden = true;
      document.body.classList.remove('payday-modal-open');
      page.removeAttribute('inert');
      document.getElementById('header-container').removeAttribute('inert');
      document.getElementById('footer-container').removeAttribute('inert');
      document.querySelector('[data-payday-edit]').focus();
    }

    function formatDate(date) {
      return new Intl.DateTimeFormat('vi-VN', {
        timeZone: VIETNAM_TIME_ZONE, weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric'
      }).format(date);
    }

    function renderRole(animate) {
      const content = ROLE_CONTENT[config.role] || ROLE_CONTENT.single;
      roleSelect.value = config.role;
      const title = document.querySelector('[data-payday-advice-title]');
      const selectShell = roleSelect.closest('.payday-role-select');
      title.textContent = content.title;
      const list = document.querySelector('[data-payday-advice-list]');
      list.innerHTML = '';
      list.classList.toggle('payday-advice-list--spotlight', content.items.length === 1);
      content.items.forEach(function (item, index) {
        const li = document.createElement('li');
        li.style.setProperty('--role-index', index);
        li.innerHTML = '<span aria-hidden="true">✓</span><p></p>';
        li.querySelector('p').textContent = item;
        list.appendChild(li);
      });
      document.querySelector('[data-payday-fun]').textContent = getFunMessage(new Date(), config.role);
      if (animate) {
        title.classList.remove('is-updating');
        list.classList.remove('is-updating');
        selectShell.classList.remove('is-changing');
        void list.offsetWidth;
        title.classList.add('is-updating');
        list.classList.add('is-updating');
        selectShell.classList.add('is-changing');
        window.setTimeout(function () {
          title.classList.remove('is-updating');
          list.classList.remove('is-updating');
          selectShell.classList.remove('is-changing');
        }, 780);
      }
    }

    function renderCountdown() {
      const now = new Date();
      const state = getPaydayState(now, config.salaryDay);
      const isPayday = state.mode === 'payday';
      const countdown = document.querySelector('.payday-countdown');
      const todayMessage = document.querySelector('[data-payday-today-message]');
      const visualImage = document.querySelector('[data-payday-visual-image]');
      const visualSource = isPayday
        ? '/assets/images/sap-co-luong/payday-hero.webp'
        : '/assets/images/sap-co-luong/payday-waiting.webp';
      document.body.classList.toggle('payday-is-here', isPayday);
      countdown.hidden = isPayday;
      todayMessage.hidden = !isPayday;
      if (visualImage.getAttribute('src') !== visualSource) visualImage.setAttribute('src', visualSource);
      document.querySelector('[data-payday-status]').textContent = isPayday ? 'Lương về rồi!' : 'Sắp có lương rồi!';
      document.querySelector('[data-payday-note]').textContent = isPayday
        ? 'Hôm nay cứ vui một chút — rồi nhớ giao việc cho từng đồng nhé.'
        : 'Bình tĩnh giữ ví, ngày huy hoàng đang đến gần.';
      document.querySelector('[data-payday-target]').textContent = isPayday
        ? `Ngày nhận lương tháng này · ${formatDate(state.payday)}`
        : `Kỳ lương tiếp theo · ${formatDate(state.target)}`;

      const remaining = isPayday ? { days: 0, hours: 0, minutes: 0, seconds: 0 } : getRemaining(state.target, now);
      digits.days.textContent = String(remaining.days);
      digits.hours.textContent = String(remaining.hours).padStart(2, '0');
      digits.minutes.textContent = String(remaining.minutes).padStart(2, '0');
      digits.seconds.textContent = String(remaining.seconds).padStart(2, '0');
      digits.seconds.classList.remove('is-ticking');
      void digits.seconds.offsetWidth;
      digits.seconds.classList.add('is-ticking');
      document.querySelector('[data-payday-sleeps]').textContent = isPayday ? '0' : String(Math.max(0, Math.ceil((state.target - now) / 86400000)));
      document.querySelector('[data-payday-workdays]').textContent = isPayday ? '0' : String(countBusinessDays(now, state.target));
      document.querySelector('[data-payday-weekday]').textContent = new Intl.DateTimeFormat('vi-VN', {
        timeZone: VIETNAM_TIME_ZONE, weekday: 'long'
      }).format(isPayday ? state.payday : state.target);
      document.querySelector('[data-payday-effective]').textContent = state.effectiveDay !== state.selectedDay
        ? `Tháng này không có ngày ${state.selectedDay}, nên lương được tính vào ngày cuối tháng (${state.effectiveDay}).`
        : 'Cố gắng vượt qua những ngày này bạn nhé.';
    }

    function track(name, params) {
      if (window.webAnalytics && window.webAnalytics.trackEvent) window.webAnalytics.trackEvent(name, params || {});
    }

    function brand(product) {
      return /tiktok/i.test(product.url || '') ? 'TikTok Shop' : 'Shopee';
    }

    function renderProducts(products) {
      const grid = document.querySelector('[data-payday-products]');
      const status = document.querySelector('[data-payday-products-status]');
      const selected = chooseProducts(products, config.role, 6);
      grid.innerHTML = '';
      if (!selected.length) {
        status.textContent = 'Chưa có gợi ý phù hợp. Bạn vẫn có thể xem toàn bộ cửa hàng.';
        return;
      }
      status.hidden = true;
      selected.forEach(function (product) {
        const article = document.createElement('article');
        article.className = 'payday-product-card';
        const link = document.createElement('a');
        link.href = product.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer sponsored';
        link.addEventListener('click', function () { track('payday_product_click', { role: config.role, product_id: String(product.id || '') }); });
        const image = document.createElement('img');
        image.src = product.thumbnail;
        image.alt = product.name;
        image.loading = 'lazy';
        image.decoding = 'async';
        const badge = document.createElement('span');
        badge.className = 'payday-product-brand';
        badge.textContent = brand(product);
        const name = document.createElement('h3');
        name.textContent = product.name;
        const cta = document.createElement('strong');
        cta.textContent = 'Xem sản phẩm →';
        link.append(image, badge, name, cta);
        article.appendChild(link);
        grid.appendChild(article);
      });
    }

    function loadProducts() {
      const status = document.querySelector('[data-payday-products-status]');
      status.hidden = false;
      status.textContent = 'Đang chọn vài món hợp với bạn…';
      fetch('/data/aff/products').then(function (response) {
        if (!response.ok) throw new Error('Không tải được sản phẩm');
        return response.json();
      }).then(function (payload) {
        renderProducts((payload.data || payload).products || []);
      }).catch(function () {
        document.querySelector('[data-payday-products]').innerHTML = '';
        status.hidden = false;
        status.textContent = 'Chưa tải được gợi ý lúc này. Ghé cửa hàng để xem đầy đủ nhé.';
      });
    }

    function start() {
      renderRole(false);
      renderCountdown();
      loadProducts();
      if (timer) window.clearInterval(timer);
      timer = window.setInterval(renderCountdown, 1000);
      page.removeAttribute('aria-busy');
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const salaryDay = clampSalaryDay(dayInput.value);
      if (!salaryDay) return;
      config = store.save(salaryDay, config ? config.role : DEFAULT_ROLE);
      closeDayPicker();
      start();
      track('payday_day_saved', { salary_day: salaryDay });
    });
    cancelButton.addEventListener('click', closeDayPicker);
    modal.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && config) closeDayPicker();
    });
    document.querySelector('[data-payday-edit]').addEventListener('click', function () { openDayPicker(true); });
    roleSelect.addEventListener('change', function () {
      config = store.save(config.salaryDay, roleSelect.value);
      renderRole(true);
      loadProducts();
      track('payday_role_changed', { role: config.role });
    });

    if (config) start();
    else openDayPicker(false);
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPage);
    else initPage();
  }

  return {
    VIETNAM_TIME_ZONE: VIETNAM_TIME_ZONE,
    STORAGE_KEY: STORAGE_KEY,
    DEFAULT_ROLE: DEFAULT_ROLE,
    VALID_ROLES: VALID_ROLES,
    ROLE_CONTENT: ROLE_CONTENT,
    clampSalaryDay: clampSalaryDay,
    salaryDayOptions: salaryDayOptions,
    daysInMonth: daysInMonth,
    effectiveSalaryDay: effectiveSalaryDay,
    vietnamDate: vietnamDate,
    getVietnamParts: getVietnamParts,
    getPaydayState: getPaydayState,
    getRemaining: getRemaining,
    countBusinessDays: countBusinessDays,
    getFunMessage: getFunMessage,
    normalizeConfig: normalizeConfig,
    createConfigStore: createConfigStore,
    chooseProducts: chooseProducts
  };
});

(function () {
  'use strict';
  const root = document.querySelector('.home-preview');
  if (!root) return;

  const menuButton = document.getElementById('preview-menu-toggle');
  const menu = document.getElementById('preview-menu');
  const closeMenu = () => {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Mở menu');
  };
  menuButton.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    menuButton.setAttribute('aria-expanded', String(!menu.hidden));
    menuButton.setAttribute('aria-label', menu.hidden ? 'Mở menu' : 'Đóng menu');
  });
  document.addEventListener('click', (event) => {
    if (!menu.hidden && !event.target.closest('.preview-header')) closeMenu();
    const upcoming = event.target.closest('[data-coming-soon]');
    if (!upcoming) return;
    const toast = document.getElementById('home-toast');
    if (!toast) return;
    toast.textContent = upcoming.dataset.comingSoon + ' đang được phát triển.';
    toast.hidden = false;
    clearTimeout(toast._previewTimer);
    toast._previewTimer = setTimeout(() => { toast.hidden = true; }, 3200);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !menu.hidden) { closeMenu(); menuButton.focus(); }
  });
  menu.querySelector('.preview-menu-share')?.addEventListener('click', () => {
    closeMenu();
    document.getElementById('share-countdown-btn')?.click();
  });

  const appDialog = document.getElementById('preview-app-dialog');
  if (appDialog) {
    const appDialogTitle = document.getElementById('preview-app-dialog-title');
    const appDialogImage = document.getElementById('preview-app-dialog-image');
    let activeShortcut = null;
    document.querySelectorAll('[data-preview-app-feature]').forEach((shortcut) => {
      shortcut.addEventListener('click', () => {
        activeShortcut = shortcut;
        appDialogTitle.textContent = shortcut.dataset.previewAppFeature + ' trên ứng dụng Sắp Tết';
        appDialogImage.src = shortcut.querySelector('img').getAttribute('src');
        appDialog.showModal();
      });
    });
    document.getElementById('preview-app-dialog-close').addEventListener('click', () => appDialog.close());
    appDialog.addEventListener('click', (event) => {
      if (event.target !== appDialog) return;
      const rect = appDialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) appDialog.close();
    });
    appDialog.addEventListener('close', () => activeShortcut?.focus());
  }

  function bindMascotWishes(selector, messages) {
    const mascot = document.querySelector(selector);
    const bubble = mascot?.querySelector('.preview-mascot-wish');
    if (!mascot || !bubble) return;
    let pending = 0;
    let showing = false;
    let messageIndex = 0;
    function showNext() {
      if (showing || pending === 0) return;
      pending -= 1;
      showing = true;
      bubble.textContent = messages[messageIndex % messages.length];
      messageIndex += 1;
      bubble.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => bubble.classList.add('is-visible')));
      setTimeout(() => {
        bubble.classList.remove('is-visible');
        setTimeout(() => {
          bubble.hidden = true;
          showing = false;
          showNext();
        }, 320);
      }, 3000);
    }
    mascot.addEventListener('click', () => { pending += 1; showNext(); });
  }
  bindMascotWishes('.preview-mascot-boy', [
    'Chúc bạn năm mới vui như Tết mỗi ngày!',
    'Năm mới gặp nhiều may mắn nhé!',
    'Chúc cả nhà luôn ấm áp và sum vầy!'
  ]);
  bindMascotWishes('.preview-mascot-girl', [
    'Chúc bạn một mùa xuân thật rực rỡ!',
    'Tết này luôn bình an và hạnh phúc nhé!',
    'Mọi điều tốt lành sẽ đến với bạn!'
  ]);

  // Keep the same data source and timezone as the production Home, including
  // the solar/lunar date after a Vietnam midnight without a page reload.
  let renderedDateKey = '';
  function syncToday() {
    if (!window.HomeRetention || !window.calculateLunarDate) return;
    const now = new Date();
    const dateKey = window.HomeRetention.getVietnamDateKey(now);
    if (dateKey === renderedDateKey) return;
    renderedDateKey = dateKey;
    const quote = document.querySelector('[data-home-daily-quote]');
    if (quote && window.HomeDailyQuote) quote.textContent = window.HomeDailyQuote.forDateKey(dateKey);
    const today = window.HomeRetention.getHeroToday(now, window.EVENTS_DATA, window.calculateLunarDate);
    document.getElementById('today-date').textContent = today.solarText;
    document.getElementById('today-lunar').textContent = today.lunarText ? '(' + today.lunarText + ')' : '(Xem lịch âm)';
  }
  syncToday();
  setInterval(syncToday, 30000);

  const wishTrigger = document.querySelector('.preview-quote');
  const wishShortcut = document.querySelector('[data-preview-wish-shortcut]');
  let wishReturnFocus = wishTrigger;
  const wishDialog = document.getElementById('home-wish-dialog');
  const wishImage = document.getElementById('home-wish-image');
  const wishText = document.getElementById('home-wish-text');
  const wishLink = document.getElementById('home-wish-link');
  const wishDownload = document.getElementById('home-wish-download');
  const wishStatus = document.getElementById('home-wish-status');
  let currentWishId = null;
  let currentWishFile = null;
  let currentWishCountdown = 0;
  let currentWishImageUrl = null;
  let wishImageJob = 0;
  let wishImageModulePromise = null;

  function wishUrl(id) {
    return 'https://saptet.vn/?loi-chuc=' + id;
  }

  function displayedCountdownDays() {
    const days = Number.parseInt(document.getElementById('days')?.textContent || '', 10);
    if (Number.isInteger(days) && days >= 0) return days;
    return Math.max(0, Math.floor((new Date('2027-02-06T00:00:00+07:00').getTime() - Date.now()) / 86400000));
  }

  function loadWishImageModule() {
    if (window.HomeWishShareImage) return Promise.resolve(window.HomeWishShareImage);
    if (!wishImageModulePromise) wishImageModulePromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'js/home-wish-share-image.js?v=20261019-dynamic-countdown';
      script.onload = () => window.HomeWishShareImage ? resolve(window.HomeWishShareImage) : reject(new Error('Wish image renderer unavailable'));
      script.onerror = () => reject(new Error('Wish image renderer unavailable'));
      document.head.appendChild(script);
    }).catch((error) => { wishImageModulePromise = null; throw error; });
    return wishImageModulePromise;
  }

  async function openWish(id) {
    const message = window.HomeDailyQuote?.forId(id);
    if (!message || !wishDialog) return;
    const job = ++wishImageJob;
    if (currentWishImageUrl) URL.revokeObjectURL(currentWishImageUrl);
    currentWishImageUrl = null;
    currentWishId = id;
    currentWishFile = null;
    wishText.textContent = message;
    wishImage.src = 'assets/images/home-preview/quote-banner.webp';
    wishImage.alt = 'Thiệp Tết với lời chúc: ' + message;
    wishLink.href = wishUrl(id);
    wishLink.textContent = wishUrl(id);
    wishDownload.disabled = true;
    wishStatus.textContent = 'Đang tạo ảnh lời chúc…';
    if (!wishDialog.open) wishDialog.showModal();
    try {
      const imageModule = await loadWishImageModule();
      const days = displayedCountdownDays();
      const blob = await imageModule.render(message, days);
      if (job !== wishImageJob) return;
      currentWishCountdown = days;
      currentWishFile = new File([blob], 'sap-tet-loi-chuc-' + id + '.png', { type: 'image/png' });
      currentWishImageUrl = URL.createObjectURL(blob);
      wishImage.src = currentWishImageUrl;
      wishImage.alt = 'Thiệp Tết với lời chúc: ' + message + (days > 0 ? '. Tết chỉ còn ' + days + ' ngày.' : '');
      wishDownload.disabled = false;
      wishStatus.textContent = 'Ảnh đã sẵn sàng để chia sẻ hoặc tải xuống.';
    } catch (error) {
      if (job === wishImageJob) wishStatus.textContent = 'Chưa tạo được ảnh. Bạn vẫn có thể chia sẻ liên kết lời chúc.';
    }
  }

  async function copyWishLink() {
    const url = wishLink.href;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
    } catch (error) {
      const input = document.createElement('textarea');
      input.value = url;
      input.style.position = 'fixed';
      input.style.opacity = '0';
      document.body.appendChild(input);
      input.select();
      const copied = typeof document.execCommand === 'function' && document.execCommand('copy');
      input.remove();
      if (!copied) { wishStatus.textContent = 'Chưa sao chép được. Bạn có thể chọn liên kết bên trên.'; return; }
    }
    wishStatus.textContent = 'Đã sao chép liên kết lời chúc.';
  }

  function openDailyWish(trigger) {
    const dateKey = renderedDateKey || window.HomeRetention?.getVietnamDateKey(new Date());
    wishReturnFocus = trigger;
    openWish(window.HomeDailyQuote?.idForDateKey(dateKey));
  }
  wishTrigger?.addEventListener('click', () => openDailyWish(wishTrigger));
  wishShortcut?.addEventListener('click', () => openDailyWish(wishShortcut));
  document.getElementById('home-wish-close')?.addEventListener('click', () => wishDialog.close());
  wishDialog?.addEventListener('click', (event) => {
    if (event.target !== wishDialog) return;
    const rect = wishDialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) wishDialog.close();
  });
  wishDialog?.addEventListener('close', () => (wishReturnFocus?.isConnected ? wishReturnFocus : wishTrigger)?.focus());
  document.getElementById('home-wish-copy')?.addEventListener('click', copyWishLink);
  wishDownload?.addEventListener('click', () => {
    if (!currentWishImageUrl || !currentWishFile) return;
    const link = document.createElement('a');
    link.href = currentWishImageUrl;
    link.download = currentWishFile.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });
  document.getElementById('home-wish-share')?.addEventListener('click', async () => {
    if (currentWishId === null) return;
    const url = wishUrl(currentWishId);
    const message = wishText.textContent;
    const caption = window.HomeWishShareImage?.countdownCaption(currentWishCountdown);
    const shareText = [message, caption].filter(Boolean).join('\n');
    if (!navigator.share) { await copyWishLink(); return; }
    try {
      const payload = { title: 'Lời chúc Tết 2027 | Sắp Tết', text: shareText, url };
      if (currentWishFile && navigator.canShare?.({ files: [currentWishFile] })) {
        payload.files = [currentWishFile];
        payload.text = shareText + '\n' + url;
        delete payload.url;
      }
      await navigator.share(payload);
      wishStatus.textContent = 'Đã mở bảng chia sẻ lời chúc.';
    } catch (error) {
      if (error.name !== 'AbortError') await copyWishLink();
    }
  });
  const sharedWish = new URLSearchParams(location.search).get('loi-chuc');
  if (sharedWish && /^[0-6]$/.test(sharedWish)) {
    const id = Number(sharedWish);
    if (document.readyState === 'complete') openWish(id);
    else document.addEventListener('DOMContentLoaded', () => openWish(id), { once: true });
  }

  document.querySelectorAll('.preview-timer-card').forEach((card) => {
    let resetTimer;
    card.addEventListener('click', () => {
      card.classList.add('is-celebrating');
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => card.classList.remove('is-celebrating'), 600);
    });
  });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reducedMotion.matches) return;
  root.classList.add('has-motion');

  const hero = document.querySelector('.preview-hero');
  const scene = document.querySelector('.preview-scene');
  const petals = document.querySelector('.preview-petals');
  const petalPositions = [7, 14, 28, 38, 53, 68, 80, 91];
  petalPositions.forEach((position, index) => {
    const petal = document.createElement('span');
    petal.className = 'preview-petal';
    petal.style.setProperty('--left', position + '%');
    petal.style.setProperty('--size', (7 + index % 3 * 3) + 'px');
    petal.style.setProperty('--duration', (7 + index % 4 * 1.5) + 's');
    petal.style.setProperty('--delay', (-index * 1.3) + 's');
    petal.style.setProperty('--drift', ((index % 2 ? 1 : -1) * (18 + index * 4)) + 'px');
    petals.appendChild(petal);
  });

  const revealItems = document.querySelectorAll('.preview-info, .preview-timer-card, .preview-greeting, .preview-shortcut, .preview-quote, .preview-task');
  revealItems.forEach((element, index) => {
    element.dataset.previewReveal = '';
    element.style.transitionDelay = Math.min(index % 6, 4) * 55 + 'ms';
  });
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 25px 0px' });
    revealItems.forEach((element) => revealObserver.observe(element));
  } else {
    revealItems.forEach((element) => element.classList.add('is-visible'));
  }

  const numberIds = ['days', 'hours', 'minutes', 'seconds'];
  numberIds.forEach((id) => {
    const value = document.getElementById(id);
    let previous = value.textContent;
    new MutationObserver(() => {
      if (value.textContent === previous) return;
      previous = value.textContent;
      if (document.hidden || !value.animate) return;
      value.animate([
        { opacity: 0.55, transform: 'translateY(-5px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: id === 'seconds' ? 240 : 380, easing: 'cubic-bezier(.22,.8,.25,1)' });
    }).observe(value, { childList: true, characterData: true, subtree: true });
  });

  let heroVisible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      heroVisible = entries[0].isIntersecting;
      hero.classList.toggle('is-offscreen', !heroVisible);
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', () => root.classList.toggle('is-hidden', document.hidden));
  let parallaxPending = false;
  window.addEventListener('scroll', () => {
    if (parallaxPending || !heroVisible || document.hidden) return;
    parallaxPending = true;
    requestAnimationFrame(() => {
      scene.style.transform = 'scale(1.025) translateY(' + Math.min(12, window.scrollY * 0.07).toFixed(1) + 'px)';
      parallaxPending = false;
    });
  }, { passive: true });
})();

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

  const appDialog = document.getElementById('preview-app-dialog');
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

  // Keep the same data source and timezone as the production Home, including
  // the solar/lunar date after a Vietnam midnight without a page reload.
  let renderedDateKey = '';
  function syncToday() {
    if (!window.HomeRetention || !window.calculateLunarDate) return;
    const now = new Date();
    const dateKey = window.HomeRetention.getVietnamDateKey(now);
    if (dateKey === renderedDateKey) return;
    renderedDateKey = dateKey;
    const today = window.HomeRetention.getHeroToday(now, window.EVENTS_DATA, window.calculateLunarDate);
    document.getElementById('today-date').textContent = today.solarText;
    document.getElementById('today-lunar').textContent = today.lunarText ? '(' + today.lunarText + ')' : '(Xem lịch âm)';
  }
  syncToday();
  setInterval(syncToday, 30000);

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

(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && root.document) api.init(root.document, root);
})(typeof window !== 'undefined' ? window : null, function () {
  'use strict';

  const STORAGE_KEY = 'sap_tet_wedding_plan_v1';
  const DB_NAME = 'sap_tet_wedding';
  const DB_STORE = 'wedding_data';
  const MAX_PHOTO_BYTES = 8000000;
  const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
  const MAX_MONEY = 1000000000000;
  const GROUPS = [
    { id: 'foundation', title: 'Đặt nền cho ngày vui', note: 'Từ 6 tháng trước' },
    { id: 'ceremony', title: 'Hai gia đình và nghi lễ', note: 'Khoảng 3–6 tháng trước' },
    { id: 'details', title: 'Những điều làm nên dấu ấn', note: 'Khoảng 1–3 tháng trước' },
    { id: 'final', title: 'Sẵn sàng về chung một nhà', note: 'Trong tháng cuối' },
    { id: 'personal', title: 'Việc riêng của hai bạn', note: 'Tự thêm vào kế hoạch' }
  ];
  const PRESETS = [
    { id: 'budget', group: 'foundation', title: 'Thống nhất ngân sách và điều quan trọng nhất', offset: 180 },
    { id: 'venue', group: 'foundation', title: 'Chọn ngày, địa điểm và đặt tiệc', offset: 180 },
    { id: 'guests-draft', group: 'foundation', title: 'Lên danh sách khách mời sơ bộ', offset: 150 },
    { id: 'families', group: 'ceremony', title: 'Hai gia đình gặp mặt, bàn các nghi lễ', offset: 120 },
    { id: 'photo', group: 'ceremony', title: 'Đặt lịch chụp ảnh và quay phim', offset: 120 },
    { id: 'attire', group: 'ceremony', title: 'Chọn váy, vest, áo dài và nhẫn cưới', offset: 90 },
    { id: 'ceremony-plan', group: 'ceremony', title: 'Chốt kế hoạch ăn hỏi, rước dâu nếu có', offset: 90 },
    { id: 'invites', group: 'details', title: 'Chuẩn bị và gửi thiệp mời', offset: 60 },
    { id: 'decor', group: 'details', title: 'Chốt trang trí, hoa và chương trình tiệc', offset: 45 },
    { id: 'makeup', group: 'details', title: 'Đặt lịch trang điểm, thử đồ và chỉnh sửa', offset: 45 },
    { id: 'guests-final', group: 'final', title: 'Xác nhận khách mời và số bàn', offset: 21 },
    { id: 'vendors', group: 'final', title: 'Xác nhận giờ và đầu mối với các bên dịch vụ', offset: 14 },
    { id: 'packing', group: 'final', title: 'Chuẩn bị giấy tờ, đồ cá nhân và vật dụng cần mang', offset: 7 },
    { id: 'rest', group: 'final', title: 'Dành thời gian nghỉ ngơi trước ngày vui', offset: 1 }
  ];
  const CATEGORIES = {
    venue: 'Địa điểm & tiệc', photo: 'Ảnh & video', attire: 'Trang phục & nhẫn',
    decor: 'Trang trí & hoa', invitations: 'Thiệp mời', travel: 'Di chuyển', other: 'Khác'
  };

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const [year, month, day] = value.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return year >= 1900 && year <= 2100 && date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
  }

  function validTime(value) { return value === '' || (typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value)); }
  function cleanName(value) { return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 40) : ''; }
  function cleanTitle(value) { return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ').slice(0, 100) : ''; }
  function money(value) {
    const number = Number(value);
    return Number.isSafeInteger(number) && number >= 0 && number <= MAX_MONEY ? number : null;
  }
  function dateMs(value) {
    const [year, month, day] = value.split('-').map(Number);
    return Date.UTC(year, month - 1, day);
  }
  function vietnamDate(now) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(now);
    const get = type => parts.find(part => part.type === type).value;
    return `${get('year')}-${get('month')}-${get('day')}`;
  }
  function targetMs(date, time) {
    const [year, month, day] = date.split('-').map(Number);
    const [hour, minute] = (time || '00:00').split(':').map(Number);
    return Date.UTC(year, month - 1, day, hour - 7, minute);
  }
  function countdown(now, wedding) {
    if (!wedding || !validDate(wedding.date) || !validTime(wedding.time || '')) return { mode: 'empty' };
    const today = vietnamDate(now);
    if (now.getTime() < targetMs(wedding.date, wedding.time)) {
      const seconds = Math.ceil((targetMs(wedding.date, wedding.time) - now.getTime()) / 1000);
      return {
        mode: 'countdown', days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24,
        minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60
      };
    }
    if (today === wedding.date) return { mode: 'today' };
    if (today > wedding.date) return { mode: 'married', days: Math.round((dateMs(today) - dateMs(wedding.date)) / 86400000) };
    return { mode: 'today' };
  }
  function dueDate(weddingDate, offset) { return new Date(dateMs(weddingDate) - offset * 86400000).toISOString().slice(0, 10); }
  function budgetTotals(plan) {
    const expenses = plan.expenses || [];
    return {
      estimated: expenses.reduce((sum, item) => sum + item.estimated, 0),
      actual: expenses.reduce((sum, item) => sum + item.actual, 0),
      remaining: (plan.budgetTotal || 0) - expenses.reduce((sum, item) => sum + item.actual, 0)
    };
  }
  function taskStats(plan) {
    const completed = new Set(plan.completed || []);
    const tasks = [...PRESETS, ...(plan.customTasks || []).map(task => ({ ...task, group: 'personal' }))];
    return GROUPS.map(group => {
      const items = tasks.filter(task => task.group === group.id);
      const done = items.filter(task => completed.has(task.id)).length;
      return { id: group.id, title: group.title, total: items.length, done, remaining: items.length - done, percent: items.length ? Math.round(done / items.length * 100) : 0 };
    }).filter(group => group.total);
  }
  function emptyPlan() { return { version: 1, wedding: null, completed: [], customTasks: [], budgetTotal: 0, expenses: [] }; }
  function normalizePlan(value) {
    if (!value || typeof value !== 'object' || value.version !== 1) throw new Error('Tệp kế hoạch không đúng định dạng.');
    const plan = emptyPlan();
    if (value.wedding != null) {
      const w = value.wedding;
      if (!validDate(w.date) || !validTime(w.time || '')) throw new Error('Ngày cưới trong kế hoạch không hợp lệ.');
      plan.wedding = { date: w.date, time: w.time || '', partner1: cleanName(w.partner1), partner2: cleanName(w.partner2) };
    }
    if (!Array.isArray(value.completed) || !Array.isArray(value.customTasks) || !Array.isArray(value.expenses)) throw new Error('Danh sách trong kế hoạch không hợp lệ.');
    if (value.customTasks.length > 200 || value.expenses.length > 200) throw new Error('Kế hoạch có quá nhiều mục.');
    const presetIds = new Set(PRESETS.map(task => task.id));
    plan.customTasks = value.customTasks.map(task => {
      if (!task || typeof task.id !== 'string' || !/^custom-[a-zA-Z0-9-]{1,80}$/.test(task.id) || !cleanTitle(task.title) || (task.dueDate && !validDate(task.dueDate))) throw new Error('Việc tự thêm không hợp lệ.');
      return { id: task.id, title: cleanTitle(task.title), dueDate: task.dueDate || '' };
    });
    const taskIds = new Set([...presetIds, ...plan.customTasks.map(task => task.id)]);
    if (taskIds.size !== presetIds.size + plan.customTasks.length) throw new Error('Kế hoạch có việc bị trùng.');
    plan.completed = [...new Set(value.completed.filter(id => typeof id === 'string' && taskIds.has(id)))];
    plan.budgetTotal = money(value.budgetTotal);
    if (plan.budgetTotal === null) throw new Error('Ngân sách tổng không hợp lệ.');
    plan.expenses = value.expenses.map(item => {
      const estimated = money(item && item.estimated);
      const actual = money(item && item.actual);
      if (!item || typeof item.id !== 'string' || !/^expense-[a-zA-Z0-9-]{1,80}$/.test(item.id) || !cleanTitle(item.title) || !CATEGORIES[item.category] || estimated === null || actual === null) throw new Error('Khoản chi không hợp lệ.');
      return { id: item.id, title: cleanTitle(item.title), category: item.category, estimated, actual };
    });
    if (new Set(plan.expenses.map(item => item.id)).size !== plan.expenses.length) throw new Error('Kế hoạch có khoản chi bị trùng.');
    return plan;
  }
  function idbRequest(request) {
    return new Promise((resolve, reject) => { request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error); });
  }
  function idbTransaction(db, change) {
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(DB_STORE, 'readwrite');
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error || new Error('Không thể lưu dữ liệu.'));
      transaction.onerror = () => reject(transaction.error || new Error('Không thể lưu dữ liệu.'));
      change(transaction.objectStore(DB_STORE));
    });
  }
  async function createIndexedStore(indexedDB, legacyStorage) {
    let db = null;
    let memoryPlan = null;
    let memoryPhoto = null;
    if (indexedDB) {
      try {
        db = await new Promise((resolve, reject) => {
          const request = indexedDB.open(DB_NAME, 1);
          request.onupgradeneeded = () => request.result.createObjectStore(DB_STORE);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
          request.onblocked = () => reject(new Error('Kho dữ liệu đang được mở ở tab khác.'));
        });
        db.onversionchange = () => db.close();
      } catch (_) { db = null; }
    }
    if (db) {
      const saved = await idbRequest(db.transaction(DB_STORE).objectStore(DB_STORE).get('plan'));
      if (saved) {
        try { memoryPlan = normalizePlan(saved); } catch (_) { /* Keep the stored record for recovery. */ }
      } else if (legacyStorage) {
        try {
          const raw = legacyStorage.getItem(STORAGE_KEY);
          if (raw) {
            const migrated = normalizePlan(JSON.parse(raw));
            await idbTransaction(db, store => store.put(migrated, 'plan'));
            memoryPlan = migrated;
            legacyStorage.removeItem(STORAGE_KEY);
          }
        } catch (_) { /* Never delete the old record if migration fails. */ }
      }
      memoryPhoto = await idbRequest(db.transaction(DB_STORE).objectStore(DB_STORE).get('photo')) || null;
    } else if (legacyStorage) {
      try { const raw = legacyStorage.getItem(STORAGE_KEY); if (raw) memoryPlan = normalizePlan(JSON.parse(raw)); } catch (_) { /* Use a new in-memory plan. */ }
    }
    return {
      get persistent() { return !!db; },
      load() { return memoryPlan; },
      loadPhoto() { return memoryPhoto; },
      async save(plan) {
        const next = normalizePlan(plan);
        if (db) await idbTransaction(db, store => store.put(next, 'plan'));
        memoryPlan = next;
      },
      async savePhoto(photo) {
        if (db) await idbTransaction(db, store => photo ? store.put(photo, 'photo') : store.delete('photo'));
        memoryPhoto = photo;
      },
      async replace(plan, photo) {
        const next = normalizePlan(plan);
        if (db) await idbTransaction(db, store => { store.put(next, 'plan'); photo ? store.put(photo, 'photo') : store.delete('photo'); });
        memoryPlan = next; memoryPhoto = photo;
      },
      async clear() {
        if (db) await idbTransaction(db, store => store.clear());
        memoryPlan = null; memoryPhoto = null;
        try { if (legacyStorage) legacyStorage.removeItem(STORAGE_KEY); } catch (_) { /* IndexedDB has already been cleared. */ }
      }
    };
  }
  function validPhoto(photo) { return photo instanceof Blob && PHOTO_TYPES.has(photo.type) && photo.size > 0 && photo.size <= MAX_PHOTO_BYTES; }
  function photoToDataUrl(photo) {
    return new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(reader.error); reader.readAsDataURL(photo); });
  }
  function photoFromDataUrl(value) {
    if (value == null) return null;
    if (typeof value !== 'string' || value.length > 11000000 || !/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) throw new Error('Ảnh cưới trong tệp không hợp lệ.');
    const [header, content] = value.split(',');
    const bytes = atob(content); const buffer = new Uint8Array(bytes.length);
    for (let index = 0; index < bytes.length; index++) buffer[index] = bytes.charCodeAt(index);
    const photo = new Blob([buffer], { type: header.slice(5, -7) });
    if (!validPhoto(photo)) throw new Error('Ảnh cưới trong tệp quá lớn hoặc không hợp lệ.');
    return photo;
  }
  async function ensureDecodablePhoto(window, photo) {
    if (window.createImageBitmap) {
      const bitmap = await window.createImageBitmap(photo);
      bitmap.close();
      return;
    }
    const url = URL.createObjectURL(photo);
    try {
      await new Promise((resolve, reject) => {
        const image = new window.Image();
        image.onload = resolve;
        image.onerror = () => reject(new Error('Không thể mở ảnh cưới.'));
        image.src = url;
      });
    } finally { URL.revokeObjectURL(url); }
  }
  function shareCountdownText(now, wedding) {
    const state = countdown(now, wedding);
    if (state.mode === 'countdown') {
      if (state.days) return { value: String(state.days), unit: 'NGÀY NỮA', detail: `${state.hours} giờ ${state.minutes} phút đến ngày cưới` };
      if (state.hours) return { value: String(state.hours), unit: 'GIỜ NỮA', detail: `${state.minutes} phút ${state.seconds} giây đến ngày cưới` };
      if (state.minutes) return { value: String(state.minutes), unit: 'PHÚT NỮA', detail: `${state.seconds} giây đến ngày cưới` };
      return { value: String(state.seconds), unit: 'GIÂY NỮA', detail: 'Đến giờ tổ chức lễ cưới' };
    }
    if (state.mode === 'today') return { value: 'HÔM NAY', unit: 'LÀ NGÀY CƯỚI', detail: 'Chúc hai bạn một ngày thật trọn vẹn' };
    if (state.mode === 'married') return { value: String(state.days), unit: 'NGÀY BÊN NHAU', detail: 'Mỗi ngày bên nhau là một ngày vui' };
    throw new Error('Hãy chọn ngày cưới trước khi chia sẻ.');
  }
  function loadImage(window, src) {
    return new Promise((resolve, reject) => {
      const image = new window.Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Không thể tải ảnh để chia sẻ.'));
      image.src = src;
    });
  }
  function drawCover(context, image, x, y, width, height) {
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const imageWidth = image.naturalWidth * scale;
    const imageHeight = image.naturalHeight * scale;
    context.drawImage(image, x + (width - imageWidth) / 2, y + (height - imageHeight) / 2, imageWidth, imageHeight);
  }
  function drawFittedText(context, text, y, maxWidth, baseSize, minSize, weight) {
    let size = baseSize;
    do {
      context.font = `${weight} ${size}px WeddingFraunces, Georgia, serif`;
      if (context.measureText(text).width <= maxWidth || size <= minSize) break;
      size -= 2;
    } while (size > minSize);
    context.fillText(text, 540, y, maxWidth);
  }
  async function createShareImage(document, window, wedding, photo, now) {
    if (!wedding || !validDate(wedding.date)) throw new Error('Hãy chọn ngày cưới trước khi chia sẻ.');
    if (document.fonts) await document.fonts.ready;
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1350;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Trình duyệt không thể tạo ảnh chia sẻ.');
    const background = context.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, '#fffaf3'); background.addColorStop(.58, '#f8e8e5'); background.addColorStop(1, '#f5dfe0');
    context.fillStyle = background; context.fillRect(0, 0, 1080, 1350);
    context.strokeStyle = '#d9b8a5'; context.lineWidth = 3; context.strokeRect(42, 42, 996, 1266);
    context.textAlign = 'center'; context.fillStyle = '#a54a59';
    context.font = '700 30px WeddingGilroy, Arial, sans-serif';
    context.fillText('✦  SẮP CƯỚI  ✦', 540, 117);
    const names = [wedding.partner1, wedding.partner2].filter(Boolean).join('  &  ') || 'Chuyện chúng mình';
    context.fillStyle = '#823347';
    drawFittedText(context, names, 225, 920, 88, 44, 650);
    context.save();
    context.beginPath();
    context.moveTo(192, 888); context.lineTo(192, 515);
    context.bezierCurveTo(192, 205, 888, 205, 888, 515);
    context.lineTo(888, 888); context.closePath(); context.clip();
    context.fillStyle = '#fff8f2'; context.fillRect(192, 280, 696, 608);
    let imageUrl = null;
    try {
      imageUrl = photo ? URL.createObjectURL(photo) : '/assets/images/sap-cuoi/wedding-hero.svg';
      const image = await loadImage(window, imageUrl);
      if (photo) drawCover(context, image, 192, 280, 696, 608);
      else {
        const size = Math.min(650 / image.naturalWidth, 580 / image.naturalHeight);
        const width = image.naturalWidth * size; const height = image.naturalHeight * size;
        context.drawImage(image, 540 - width / 2, 280 + (608 - height) / 2, width, height);
      }
    } finally { if (photo && imageUrl) URL.revokeObjectURL(imageUrl); context.restore(); }
    context.strokeStyle = '#d3a674'; context.lineWidth = 5;
    context.beginPath(); context.moveTo(192, 888); context.lineTo(192, 515);
    context.bezierCurveTo(192, 205, 888, 205, 888, 515);
    context.lineTo(888, 888); context.stroke();
    const summary = shareCountdownText(now, wedding);
    context.fillStyle = '#a34c5d';
    drawFittedText(context, summary.value, 1040, 900, summary.value.length > 5 ? 89 : 132, 64, 700);
    context.font = '700 33px WeddingGilroy, Arial, sans-serif';
    context.letterSpacing = '5px'; context.fillText(summary.unit, 540, 1094);
    context.letterSpacing = '0px'; context.fillStyle = '#76505b';
    context.font = '400 31px WeddingGilroy, Arial, sans-serif';
    context.fillText(summary.detail, 540, 1150, 920);
    context.fillStyle = '#8d5260'; context.font = '700 34px WeddingGilroy, Arial, sans-serif';
    context.fillText(`${formatDate(wedding.date)}${wedding.time ? ` · ${wedding.time}` : ''}`, 540, 1218, 920);
    context.fillStyle = '#9a777c'; context.font = '400 23px WeddingGilroy, Arial, sans-serif';
    const capturedAt = new Intl.DateTimeFormat('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(now);
    context.fillText(`Ảnh tạo lúc ${capturedAt} · saptet.vn`, 540, 1273);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    if (!blob) throw new Error('Không thể xuất ảnh chia sẻ.');
    return blob;
  }
  function formatDate(date, options) {
    return new Intl.DateTimeFormat('vi-VN', { timeZone: 'UTC', day: 'numeric', month: 'long', year: 'numeric', ...options }).format(new Date(dateMs(date)));
  }
  const formatMoney = value => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(value);
  const id = prefix => `${prefix}-${(globalThis.crypto && globalThis.crypto.randomUUID ? globalThis.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`)}`;

  async function init(document, window) {
    const page = document.querySelector('[data-wedding-page]');
    if (!page) return;
    let storage;
    try { storage = window.localStorage; } catch (_) { storage = null; }
    let store;
    try { store = await createIndexedStore(window.indexedDB, storage); }
    catch (_) { store = await createIndexedStore(null, storage); }
    let plan = store.load() || emptyPlan();
    let photo = store.loadPhoto();
    let photoUrl = null;
    let writeQueue = Promise.resolve();
    const $ = selector => document.querySelector(selector);
    const message = $('[data-wedding-message]');
    const dialog = $('#wedding-dialog');
    const shareDialog = $('#wedding-share-dialog');
    const weddingForm = $('#wedding-form');
    const taskForm = $('#wedding-task-form');
    const expenseForm = $('#wedding-expense-form');
    const notice = text => { message.textContent = text; message.hidden = !text; };
    let shareBlob = null;
    let sharePreviewUrl = null;
    let shareSequence = 0;
    let renderedNames = null;
    const queueWrite = operation => {
      const pending = writeQueue.then(operation);
      writeQueue = pending.catch(() => notice('Không thể lưu vào IndexedDB. Hãy xuất bản sao và kiểm tra dung lượng trình duyệt.'));
      return pending;
    };
    const save = () => {
      const snapshot = normalizePlan(plan);
      queueWrite(() => store.save(snapshot)).catch(() => {});
      if (!store.persistent) notice('Trình duyệt đang chặn IndexedDB. Hãy xuất bản sao trước khi rời trang.');
    };

    function renderPhoto() {
      if (photoUrl) { URL.revokeObjectURL(photoUrl); photoUrl = null; }
      const visible = !!photo;
      const image = $('[data-wedding-photo]');
      const photoFrame = $('[data-wedding-photo-frame]');
      const illustration = $('[data-wedding-illustration]');
      photoFrame.hidden = !visible;
      illustration.hidden = visible;
      $('[data-wedding-photo-remove]').hidden = !photo;
      if (visible) { photoUrl = URL.createObjectURL(photo); image.src = photoUrl; }
      else image.removeAttribute('src');
    }

    function renderHero() {
      const wedding = plan.wedding;
      const state = countdown(new Date(), wedding);
      const names = wedding ? [wedding.partner1, wedding.partner2].filter(Boolean) : [];
      const namesElement = $('[data-wedding-names]');
      const namesKey = JSON.stringify(names);
      if (namesKey !== renderedNames) {
        renderedNames = namesKey;
        namesElement.replaceChildren();
        namesElement.classList.toggle('is-placeholder', names.length === 0);
        namesElement.classList.toggle('has-two', names.length === 2);
        if (names.length) names.forEach((name, index) => {
          if (index) {
            const ampersand = document.createElement('span');
            ampersand.className = 'wedding-name-ampersand';
            ampersand.textContent = ' & ';
            namesElement.append(ampersand);
          }
          const part = document.createElement('span');
          part.className = 'wedding-person';
          part.textContent = name;
          namesElement.append(part);
        });
        else namesElement.textContent = 'Chuyện chúng mình';
      }
      $('[data-wedding-date]').textContent = wedding ? `${formatDate(wedding.date)}${wedding.time ? ` · ${wedding.time}` : ''}` : 'Chọn ngày đặc biệt của hai bạn';
      $('[data-wedding-status]').textContent = state.mode === 'today' ? 'Hôm nay là ngày hạnh phúc!' : state.mode === 'married' ? 'Mỗi ngày bên nhau là một ngày vui' : state.mode === 'empty' ? 'Hành trình về chung một nhà bắt đầu từ đây' : 'Cùng đếm đến ngày mình chung đôi';
      const timer = $('[data-wedding-timer]');
      timer.hidden = state.mode !== 'countdown';
      if (state.mode === 'countdown') {
        ['days', 'hours', 'minutes', 'seconds'].forEach(unit => { $(`[data-wedding-unit="${unit}"]`).textContent = unit === 'days' ? String(state[unit]) : String(state[unit]).padStart(2, '0'); });
      }
      $('[data-wedding-after]').hidden = state.mode !== 'today' && state.mode !== 'married';
      $('[data-wedding-after]').textContent = state.mode === 'today' ? 'Chúc hai bạn một ngày cưới thật trọn vẹn.' : state.mode === 'married' ? `Đã bên nhau ${state.days} ngày kể từ ngày cưới.` : '';
      $('[data-wedding-start]').hidden = state.mode !== 'empty';
      $('[data-wedding-edit]').hidden = state.mode === 'empty';
      $('[data-wedding-share]').hidden = state.mode === 'empty';
    }

    function renderTasks() {
      const list = $('[data-wedding-task-groups]');
      list.replaceChildren();
      if (!plan.wedding) { $('[data-wedding-task-empty]').hidden = false; $('[data-wedding-task-content]').hidden = true; return; }
      $('[data-wedding-task-empty]').hidden = true;
      $('[data-wedding-task-content]').hidden = false;
      const today = vietnamDate(new Date());
      const all = [...PRESETS.map(task => ({ ...task, dueDate: dueDate(plan.wedding.date, task.offset), custom: false })), ...plan.customTasks.map(task => ({ ...task, group: 'personal', custom: true }))];
      const completed = new Set(plan.completed);
      const done = all.filter(task => completed.has(task.id)).length;
      $('[data-wedding-progress]').textContent = `${done}/${all.length} việc đã xong`;
      $('[data-wedding-progress-bar]').style.width = `${Math.round(done / all.length * 100)}%`;
      const stats = $('[data-wedding-category-stats]');
      stats.replaceChildren();
      taskStats(plan).forEach(group => {
        const card = document.createElement('div'); card.className = 'wedding-stat-card';
        const heading = document.createElement('strong'); heading.textContent = group.title;
        const count = document.createElement('span'); count.textContent = `${group.done}/${group.total} đã xong`;
        const track = document.createElement('div'); track.className = 'wedding-stat-track'; track.setAttribute('aria-hidden', 'true');
        const bar = document.createElement('span'); bar.style.width = `${group.percent}%`; track.append(bar);
        const remaining = document.createElement('small'); remaining.textContent = group.remaining ? `Còn ${group.remaining} việc` : 'Đã hoàn thành';
        card.append(heading, count, track, remaining); stats.append(card);
      });
      const priority = all.filter(task => !completed.has(task.id) && task.dueDate).sort((a, b) => a.dueDate.localeCompare(b.dueDate)).slice(0, 3);
      const priorityBox = $('[data-wedding-priority]');
      priorityBox.replaceChildren();
      priority.forEach(task => {
        const item = document.createElement('li');
        item.textContent = `${task.title} · ${task.dueDate < today ? 'Cần xem lại' : formatDate(task.dueDate, { month: 'numeric' })}`;
        priorityBox.append(item);
      });
      $('[data-wedding-priority-wrap]').hidden = priority.length === 0;
      GROUPS.forEach(group => {
        const tasks = all.filter(task => task.group === group.id);
        if (!tasks.length) return;
        const section = document.createElement('section');
        section.className = 'wedding-task-group';
        const header = document.createElement('div');
        header.className = 'wedding-task-group-head';
        const title = document.createElement('h3'); title.textContent = group.title;
        const note = document.createElement('span'); note.textContent = group.note;
        header.append(title, note);
        section.append(header);
        tasks.forEach(task => {
          const row = document.createElement('div'); row.className = `wedding-task${completed.has(task.id) ? ' is-done' : ''}`;
          const label = document.createElement('label');
          const box = document.createElement('input'); box.type = 'checkbox'; box.checked = completed.has(task.id); box.dataset.taskId = task.id;
          const copy = document.createElement('span'); copy.className = 'wedding-task-copy';
          const name = document.createElement('strong'); name.textContent = task.title;
          const due = document.createElement('small'); due.textContent = task.dueDate ? `${task.custom ? 'Hạn' : 'Gợi ý'}: ${formatDate(task.dueDate, { month: 'numeric' })}` : 'Chưa đặt hạn';
          copy.append(name, due); label.append(box, copy); row.append(label);
          if (task.custom) {
            const actions = document.createElement('div'); actions.className = 'wedding-row-actions';
            [['Sửa', 'edit'], ['Xóa', 'delete']].forEach(([text, action]) => {
              const button = document.createElement('button'); button.type = 'button'; button.textContent = text; button.dataset.taskAction = action; button.dataset.taskId = task.id; actions.append(button);
            });
            row.append(actions);
          }
          section.append(row);
        });
        list.append(section);
      });
    }

    function renderBudget() {
      const totals = budgetTotals(plan);
      $('[data-budget-total]').textContent = formatMoney(plan.budgetTotal);
      $('[data-budget-estimated]').textContent = formatMoney(totals.estimated);
      $('[data-budget-actual]').textContent = formatMoney(totals.actual);
      $('[data-budget-remaining]').textContent = formatMoney(totals.remaining);
      $('[data-budget-remaining]').classList.toggle('is-over', totals.remaining < 0);
      $('[data-budget-limit]').value = plan.budgetTotal || '';
      const list = $('[data-budget-list]'); list.replaceChildren();
      $('[data-budget-empty]').hidden = !!plan.expenses.length;
      plan.expenses.forEach(item => {
        const row = document.createElement('div'); row.className = 'wedding-expense';
        const copy = document.createElement('div'); copy.className = 'wedding-expense-copy';
        const title = document.createElement('strong'); title.textContent = item.title;
        const category = document.createElement('small'); category.textContent = CATEGORIES[item.category];
        copy.append(title, category);
        const amounts = document.createElement('div'); amounts.className = 'wedding-expense-amounts';
        const estimate = document.createElement('span'); estimate.textContent = `Dự kiến ${formatMoney(item.estimated)}`;
        const actual = document.createElement('strong'); actual.textContent = `Đã chi ${formatMoney(item.actual)}`;
        amounts.append(estimate, actual);
        const actions = document.createElement('div'); actions.className = 'wedding-row-actions';
        [['Sửa', 'edit'], ['Xóa', 'delete']].forEach(([text, action]) => {
          const button = document.createElement('button'); button.type = 'button'; button.textContent = text; button.dataset.expenseAction = action; button.dataset.expenseId = item.id; actions.append(button);
        });
        row.append(copy, amounts, actions); list.append(row);
      });
    }
    function render() { renderHero(); renderPhoto(); renderTasks(); renderBudget(); }

    function openDialog() {
      const wedding = plan.wedding || { date: '', time: '', partner1: '', partner2: '' };
      weddingForm.elements.date.value = wedding.date;
      weddingForm.elements.time.value = wedding.time;
      weddingForm.elements.partner1.value = wedding.partner1;
      weddingForm.elements.partner2.value = wedding.partner2;
      dialog.showModal();
    }
    $('[data-wedding-start]').addEventListener('click', openDialog);
    $('[data-wedding-start-link]').addEventListener('click', openDialog);
    $('[data-wedding-edit]').addEventListener('click', openDialog);
    $('[data-wedding-close]').addEventListener('click', () => dialog.close());
    weddingForm.addEventListener('submit', event => {
      event.preventDefault();
      const data = new FormData(weddingForm);
      const date = data.get('date'); const time = data.get('time') || '';
      if (!validDate(date) || !validTime(time)) return notice('Vui lòng chọn ngày và giờ cưới hợp lệ.');
      plan.wedding = { date, time, partner1: cleanName(data.get('partner1')), partner2: cleanName(data.get('partner2')) };
      save(); dialog.close(); notice('Đã lưu ngày cưới của hai bạn.'); render();
    });
    taskForm.addEventListener('submit', event => {
      event.preventDefault(); if (!plan.wedding) return;
      const data = new FormData(taskForm); const title = cleanTitle(data.get('title')); const due = data.get('dueDate') || '';
      if (!title || (due && !validDate(due))) return notice('Vui lòng nhập việc và hạn hợp lệ.');
      const editing = taskForm.elements.taskId.value;
      if (editing) {
        const task = plan.customTasks.find(item => item.id === editing);
        if (task) Object.assign(task, { title, dueDate: due });
      } else {
        if (plan.customTasks.length >= 200) return notice('Kế hoạch đã có tối đa 200 việc riêng.');
        plan.customTasks.push({ id: id('custom'), title, dueDate: due });
      }
      taskForm.reset(); taskForm.elements.taskId.value = ''; $('[data-task-submit]').textContent = 'Thêm việc';
      save(); renderTasks(); notice('Đã lưu việc cần làm.');
    });
    $('[data-wedding-task-groups]').addEventListener('change', event => {
      const taskId = event.target.dataset.taskId; if (!taskId) return;
      plan.completed = event.target.checked ? [...new Set([...plan.completed, taskId])] : plan.completed.filter(item => item !== taskId);
      save(); renderTasks();
    });
    $('[data-wedding-task-groups]').addEventListener('click', event => {
      const button = event.target.closest('[data-task-action]'); if (!button) return;
      const task = plan.customTasks.find(item => item.id === button.dataset.taskId); if (!task) return;
      if (button.dataset.taskAction === 'edit') {
        taskForm.elements.taskId.value = task.id; taskForm.elements.title.value = task.title; taskForm.elements.dueDate.value = task.dueDate;
        $('[data-task-submit]').textContent = 'Lưu thay đổi'; taskForm.scrollIntoView({ behavior: 'smooth', block: 'center' }); taskForm.elements.title.focus();
      } else if (window.confirm('Xóa việc này khỏi kế hoạch?')) {
        plan.customTasks = plan.customTasks.filter(item => item.id !== task.id); plan.completed = plan.completed.filter(item => item !== task.id);
        save(); renderTasks(); notice('Đã xóa việc.');
      }
    });
    $('#wedding-budget-form').addEventListener('submit', event => {
      event.preventDefault(); const amount = money($('#wedding-budget-limit').value);
      if (amount === null) return notice('Ngân sách cần là số VND từ 0 đến 1.000 tỷ.');
      plan.budgetTotal = amount; save(); renderBudget(); notice('Đã lưu ngân sách tổng.');
    });
    expenseForm.addEventListener('submit', event => {
      event.preventDefault(); const data = new FormData(expenseForm);
      const title = cleanTitle(data.get('title')); const category = data.get('category');
      const estimated = money(data.get('estimated')); const actual = money(data.get('actual'));
      if (!title || !CATEGORIES[category] || estimated === null || actual === null) return notice('Vui lòng nhập khoản chi và số tiền hợp lệ.');
      const editing = expenseForm.elements.expenseId.value;
      if (editing) {
        const item = plan.expenses.find(row => row.id === editing); if (item) Object.assign(item, { title, category, estimated, actual });
      } else {
        if (plan.expenses.length >= 200) return notice('Kế hoạch đã có tối đa 200 khoản chi.');
        plan.expenses.push({ id: id('expense'), title, category, estimated, actual });
      }
      expenseForm.reset(); expenseForm.elements.expenseId.value = ''; $('[data-expense-submit]').textContent = 'Thêm khoản chi';
      save(); renderBudget(); notice('Đã lưu khoản chi.');
    });
    $('[data-budget-list]').addEventListener('click', event => {
      const button = event.target.closest('[data-expense-action]'); if (!button) return;
      const item = plan.expenses.find(row => row.id === button.dataset.expenseId); if (!item) return;
      if (button.dataset.expenseAction === 'edit') {
        expenseForm.elements.expenseId.value = item.id; expenseForm.elements.title.value = item.title; expenseForm.elements.category.value = item.category;
        expenseForm.elements.estimated.value = item.estimated; expenseForm.elements.actual.value = item.actual;
        $('[data-expense-submit]').textContent = 'Lưu thay đổi'; expenseForm.scrollIntoView({ behavior: 'smooth', block: 'center' }); expenseForm.elements.title.focus();
      } else if (window.confirm('Xóa khoản chi này?')) {
        plan.expenses = plan.expenses.filter(row => row.id !== item.id); save(); renderBudget(); notice('Đã xóa khoản chi.');
      }
    });
    function downloadShareImage() {
      if (!shareBlob) return;
      const url = URL.createObjectURL(shareBlob);
      const link = document.createElement('a');
      link.href = url; link.download = 'hanh-trinh-sap-cuoi.png';
      document.body.append(link); link.click(); link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
    $('[data-wedding-share]').addEventListener('click', async () => {
      if (!plan.wedding) return;
      const sequence = ++shareSequence;
      shareBlob = null;
      $('[data-wedding-share-save]').disabled = true;
      $('[data-wedding-share-send]').disabled = true;
      $('[data-wedding-share-preview]').hidden = true;
      $('[data-wedding-share-loading]').hidden = false;
      $('[data-wedding-share-loading]').textContent = 'Đang tạo ảnh xem trước…';
      $('[data-wedding-share-feedback]').hidden = true;
      shareDialog.showModal();
      try {
        const blob = await createShareImage(document, window, plan.wedding, photo, new Date());
        if (sequence !== shareSequence || !shareDialog.open) return;
        if (sharePreviewUrl) URL.revokeObjectURL(sharePreviewUrl);
        shareBlob = blob;
        sharePreviewUrl = URL.createObjectURL(blob);
        $('[data-wedding-share-preview]').src = sharePreviewUrl;
        $('[data-wedding-share-preview]').hidden = false;
        $('[data-wedding-share-loading]').hidden = true;
        $('[data-wedding-share-save]').disabled = false;
        $('[data-wedding-share-send]').disabled = false;
      } catch (error) {
        if (sequence !== shareSequence) return;
        $('[data-wedding-share-loading]').textContent = error.message || 'Không thể tạo ảnh. Vui lòng thử lại.';
      }
    });
    $('[data-wedding-share-close]').addEventListener('click', () => shareDialog.close());
    shareDialog.addEventListener('close', () => {
      shareSequence++;
      shareBlob = null;
      if (sharePreviewUrl) { URL.revokeObjectURL(sharePreviewUrl); sharePreviewUrl = null; }
      $('[data-wedding-share-preview]').removeAttribute('src');
    });
    $('[data-wedding-share-save]').addEventListener('click', downloadShareImage);
    $('[data-wedding-share-send]').addEventListener('click', async () => {
      if (!shareBlob) return;
      const feedback = $('[data-wedding-share-feedback]');
      const file = new window.File([shareBlob], 'hanh-trinh-sap-cuoi.png', { type: 'image/png' });
      try {
        if (window.navigator.share && window.navigator.canShare && window.navigator.canShare({ files: [file] })) {
          await window.navigator.share({ files: [file], title: 'Hành trình sắp cưới' });
        } else if (window.navigator.clipboard && window.navigator.clipboard.write && window.ClipboardItem) {
          await window.navigator.clipboard.write([new window.ClipboardItem({ 'image/png': shareBlob })]);
          feedback.textContent = 'Đã sao chép ảnh. Bạn có thể dán vào tin nhắn để gửi.';
          feedback.hidden = false;
        } else {
          downloadShareImage();
          feedback.textContent = 'Đã tải ảnh. Bạn có thể gửi ảnh này qua ứng dụng mình chọn.';
          feedback.hidden = false;
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        downloadShareImage();
        feedback.textContent = 'Chia sẻ trực tiếp chưa khả dụng. Ảnh đã được tải về để bạn gửi đi.';
        feedback.hidden = false;
      }
    });
    $('[data-wedding-photo-input]').addEventListener('change', async event => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      try {
        if (!validPhoto(file)) throw new Error('Chọn ảnh JPG, PNG hoặc WebP dưới 8 MB.');
        await ensureDecodablePhoto(window, file);
        await queueWrite(() => store.savePhoto(file));
        photo = file;
        renderPhoto(); notice('Đã thay ảnh cưới trên thiết bị này.');
      } catch (error) { notice(error.message || 'Không thể đọc ảnh cưới.'); }
      finally { event.target.value = ''; }
    });
    $('[data-wedding-photo-remove]').addEventListener('click', async () => {
      try { await queueWrite(() => store.savePhoto(null)); photo = null; renderPhoto(); notice('Đã dùng lại hình minh họa mặc định.'); }
      catch (_) { /* The storage warning is already visible. */ }
    });
    $('[data-wedding-export]').addEventListener('click', async () => {
      try {
        await writeQueue;
        const backup = { version: 2, plan, photo: photo ? await photoToDataUrl(photo) : null };
        const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob); const link = document.createElement('a'); link.href = url; link.download = 'sap-cuoi-ke-hoach.json'; link.click();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      } catch (_) { notice('Không thể xuất bản sao. Vui lòng thử lại.'); }
    });
    $('[data-wedding-import]').addEventListener('change', async event => {
      const file = event.target.files && event.target.files[0]; if (!file) return;
      try {
        if (file.size > 11200000) throw new Error('Tệp quá lớn.');
        const parsed = JSON.parse(await file.text());
        const imported = normalizePlan(parsed.version === 2 ? parsed.plan : parsed);
        const importedPhoto = parsed.version === 2 ? photoFromDataUrl(parsed.photo) : null;
        if (importedPhoto) await ensureDecodablePhoto(window, importedPhoto);
        if (!window.confirm('Nhập tệp sẽ thay thế kế hoạch hiện tại trên máy này. Tiếp tục?')) return;
        await writeQueue;
        await store.replace(imported, importedPhoto);
        plan = imported; photo = importedPhoto; render(); notice('Đã nhập kế hoạch và ảnh cưới từ tệp.');
      } catch (error) { notice(error.message || 'Không thể đọc tệp kế hoạch.'); }
      finally { event.target.value = ''; }
    });
    $('[data-wedding-clear]').addEventListener('click', async () => {
      if (!window.confirm('Xóa toàn bộ kế hoạch cưới trên trình duyệt này?')) return;
      await writeQueue;
      try { await store.clear(); plan = emptyPlan(); photo = null; render(); notice('Đã xóa kế hoạch và ảnh cưới trên máy này.'); }
      catch (_) { notice('Không thể xóa dữ liệu trong IndexedDB. Vui lòng thử lại.'); }
    });
    const rejectOldShareLink = () => {
      if (!/^#wedding=/i.test(window.location.hash)) return;
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      notice('Liên kết đồng hồ cũ không còn hiển thị ngày cưới. Kế hoạch chỉ xem được trên trình duyệt đã lưu dữ liệu.');
    };
    window.addEventListener('hashchange', rejectOldShareLink);
    rejectOldShareLink();
    if (!store.persistent) notice('Trình duyệt đang chặn lưu dữ liệu. Hãy xuất tệp sao lưu trước khi rời trang.');
    render(); window.setInterval(renderHero, 1000);
    window.addEventListener('pagehide', () => { if (photoUrl) URL.revokeObjectURL(photoUrl); });
    window.addEventListener('pageshow', event => { if (event.persisted) renderPhoto(); });
    const hero = $('[data-wedding-hero]');
    if ('IntersectionObserver' in window) new IntersectionObserver(entries => { hero.classList.toggle('is-offscreen', !entries[0].isIntersecting); }).observe(hero);
    document.addEventListener('visibilitychange', () => hero.classList.toggle('is-page-hidden', document.hidden));
  }

  return { STORAGE_KEY, DB_NAME, PRESETS, CATEGORIES, validDate, validTime, vietnamDate, targetMs, countdown, shareCountdownText, dueDate, budgetTotals, taskStats, emptyPlan, normalizePlan, createIndexedStore, validPhoto, photoFromDataUrl, init };
});

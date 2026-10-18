/* Browser-local preparation lists for the four Tết planning pages. */
(function () {
  'use strict';

  const page = document.body.dataset.prepPage;
  if (!page) return;
  const year = document.body.dataset.tetYear || '2027';
  const key = `sap-tet-prep-${year}-${page}-v1`;
  const $ = (selector) => document.querySelector(selector);
  const money = (value) => `${new Intl.NumberFormat('vi-VN').format(value)} đ`;
  const bounded = (value, min, max) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, Math.floor(number))) : min;
  };
  const validText = (value, max = 80) => String(value || '').trim().slice(0, max);
  const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  function readState(fallback) {
    try {
      const saved = JSON.parse(localStorage.getItem(key));
      return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : fallback;
    } catch (_) {
      return fallback;
    }
  }

  function persist(state) {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (_) {
      toast('Trình duyệt chưa cho phép lưu danh sách.');
    }
  }

  function toast(message) {
    let node = $('.prep-toast');
    if (!node) {
      node = document.createElement('div');
      node.className = 'prep-toast';
      node.setAttribute('role', 'status');
      document.body.append(node);
    }
    node.textContent = message;
    node.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => { node.hidden = true; }, 3200);
  }

  function setText(selector, value) {
    const node = $(selector);
    if (node) node.textContent = value;
  }

  function setProgress(done, total, label = 'việc đã hoàn thành') {
    setText('#prep-done', String(done));
    setText('#prep-total', String(total));
    setText('#prep-progress-copy', `${done}/${total} ${label}`);
    const bar = $('#prep-progress-fill');
    if (bar) bar.style.width = `${total ? Math.round(done / total * 100) : 0}%`;
  }

  function makeRow({ title, subtitle, amount, checked, onCheck, onEdit, onRemove }) {
    const row = document.createElement('div');
    row.className = `prep-row${checked ? ' is-complete' : ''}`;
    const checkbox = document.createElement('input');
    checkbox.className = 'prep-row-check';
    checkbox.type = 'checkbox';
    checkbox.checked = !!checked;
    checkbox.setAttribute('aria-label', `Đánh dấu ${title} đã hoàn thành`);
    checkbox.addEventListener('change', (event) => onCheck(event.target.checked));
    const copy = document.createElement('div');
    copy.className = 'prep-row-copy';
    const name = document.createElement('strong');
    name.textContent = title;
    copy.append(name);
    if (subtitle) {
      const detail = document.createElement('small');
      detail.textContent = subtitle;
      copy.append(detail);
    }
    row.append(checkbox, copy);
    if (amount !== undefined) {
      const sum = document.createElement('span');
      sum.className = 'prep-row-amount';
      sum.textContent = money(amount);
      row.append(sum);
    }
    if (onEdit) {
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.className = 'prep-row-edit';
      edit.setAttribute('aria-label', `Sửa ${title}`);
      edit.textContent = 'Sửa';
      edit.addEventListener('click', onEdit);
      row.append(edit);
    }
    if (onRemove) {
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'prep-row-remove';
      remove.setAttribute('aria-label', `Xóa ${title}`);
      remove.textContent = '×';
      remove.addEventListener('click', onRemove);
      row.append(remove);
    }
    return row;
  }

  function makeGroup(title, count, rows) {
    const section = document.createElement('section');
    section.className = 'prep-group';
    const heading = document.createElement('h3');
    heading.className = 'prep-group-title';
    heading.textContent = title;
    const total = document.createElement('small');
    total.textContent = `${count} mục`;
    heading.append(total);
    const list = document.createElement('div');
    list.className = 'prep-row-list';
    list.append(...rows);
    section.append(heading, list);
    return section;
  }

  const groups = {
    lixi: ['Gia đình', 'Trẻ nhỏ', 'Bạn bè', 'Khác'],
    shopping: ['Thực phẩm', 'Bánh mứt', 'Trang trí', 'Quà Tết', 'Khác'],
    cleaning: ['Phòng khách', 'Bếp', 'Phòng ngủ', 'Bàn thờ', 'Khác']
  };

  function initLiXi() {
    const stored = readState({ budget: 0, recipients: [] });
    const state = {
      budget: bounded(stored.budget, 0, 100000000000),
      recipients: Array.isArray(stored.recipients) ? stored.recipients.slice(0, 500).map((item) => ({
        id: validText(item.id, 60) || uid(),
        name: validText(item.name),
        group: groups.lixi.includes(item.group) ? item.group : 'Khác',
        quantity: bounded(item.quantity, 1, 999),
        amount: bounded(item.amount, 0, 1000000000),
        ready: item.ready === true
      })).filter((item) => item.name) : []
    };
    const budgetInput = $('#prep-budget');
    budgetInput.value = state.budget || '';
    $('#prep-budget-form').addEventListener('submit', (event) => {
      event.preventDefault();
      state.budget = bounded(budgetInput.value, 0, 100000000000);
      persist(state);
      render();
      toast('Đã lưu ngân sách lì xì.');
    });
    const recipientForm = $('#prep-form');
    let editingRecipientId = null;
    recipientForm.closest('details').addEventListener('toggle', (event) => {
      if (event.target.open || !editingRecipientId) return;
      editingRecipientId = null;
      recipientForm.reset();
      recipientForm.elements.quantity.value = '1';
      recipientForm.querySelector('button[type="submit"]').textContent = 'Lưu người nhận';
    });
    recipientForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!editingRecipientId && state.recipients.length >= 500) return toast('Danh sách đã đạt 500 người nhận.');
      const name = validText(recipientForm.elements.name.value);
      if (!name) return;
      const values = {
        name,
        group: groups.lixi.includes(recipientForm.elements.group.value) ? recipientForm.elements.group.value : 'Khác',
        quantity: bounded(recipientForm.elements.quantity.value, 1, 999),
        amount: bounded(recipientForm.elements.amount.value, 0, 1000000000)
      };
      const existing = state.recipients.find((item) => item.id === editingRecipientId);
      if (existing) Object.assign(existing, values);
      else state.recipients.push({ id: uid(), ...values, ready: false });
      persist(state);
      recipientForm.reset();
      recipientForm.elements.quantity.value = '1';
      recipientForm.querySelector('button[type="submit"]').textContent = 'Lưu người nhận';
      recipientForm.closest('details').open = false;
      editingRecipientId = null;
      render();
      toast(existing ? 'Đã cập nhật người nhận.' : 'Đã thêm người nhận.');
    });
    function render() {
      const list = $('#prep-list');
      list.replaceChildren();
      const planned = state.recipients.reduce((sum, item) => sum + item.quantity * item.amount, 0);
      const ready = state.recipients.filter((item) => item.ready).reduce((sum, item) => sum + item.quantity * item.amount, 0);
      setText('#prep-planned', money(planned));
      setText('#prep-ready', money(ready));
      setText('#prep-remaining', state.budget ? money(state.budget - planned) : 'Chưa đặt');
      setProgress(state.recipients.filter((item) => item.ready).length, state.recipients.length, 'người nhận đã chuẩn bị');
      if (!state.recipients.length) {
        const empty = document.createElement('p');
        empty.className = 'prep-empty';
        empty.textContent = 'Chưa có người nhận. Thêm người đầu tiên để lên kế hoạch lì xì.';
        list.append(empty);
        return;
      }
      for (const group of groups.lixi) {
        const items = state.recipients.filter((item) => item.group === group);
        if (!items.length) continue;
        list.append(makeGroup(group, items.length, items.map((item) => makeRow({
          title: item.name,
          subtitle: `${item.quantity} bao × ${money(item.amount)}`,
          amount: item.quantity * item.amount,
          checked: item.ready,
          onCheck: (checked) => { item.ready = checked; persist(state); render(); },
          onEdit: () => {
            editingRecipientId = item.id;
            recipientForm.elements.name.value = item.name;
            recipientForm.elements.group.value = item.group;
            recipientForm.elements.quantity.value = String(item.quantity);
            recipientForm.elements.amount.value = String(item.amount);
            recipientForm.querySelector('button[type="submit"]').textContent = 'Lưu thay đổi';
            recipientForm.closest('details').open = true;
            recipientForm.elements.name.focus();
          },
          onRemove: () => {
            if (!confirm(`Xóa ${item.name} khỏi danh sách?`)) return;
            state.recipients = state.recipients.filter((entry) => entry.id !== item.id);
            persist(state); render();
          }
        }))));
      }
    }
    render();
  }

  const cookingTasks = [
    { id: 'learn-ingredients', group: 'Tìm hiểu', title: 'Xem nguyên liệu và dụng cụ cần có', detail: 'Chuẩn bị danh sách trước khi đi chợ.' },
    { id: 'learn-recipe', group: 'Tìm hiểu', title: 'Đọc hướng dẫn gói và nấu', detail: 'Nắm các bước trước khi bắt đầu.' },
    { id: 'buy-ingredients', group: 'Chuẩn bị', title: 'Mua gạo nếp, đậu xanh, thịt và lá dong', detail: 'Điều chỉnh số lượng theo gia đình.' },
    { id: 'prepare-tools', group: 'Chuẩn bị', title: 'Chuẩn bị khuôn, lạt và nồi nấu', detail: 'Kiểm tra dụng cụ đã sẵn sàng.' },
    { id: 'practice-wrap', group: 'Tập gói', title: 'Tập xếp lá và cho nhân', detail: 'Có thể tập trước với một chiếc bánh.' },
    { id: 'practice-tie', group: 'Tập gói', title: 'Tập buộc lạt cho chắc tay', detail: 'Đánh dấu khi bạn đã tự gói được.' },
    { id: 'choose-day', group: 'Ngày nấu', title: 'Chọn ngày cùng gia đình nấu bánh', detail: 'Dành đủ thời gian để trông nồi bánh.' },
    { id: 'prepare-space', group: 'Ngày nấu', title: 'Sắp xếp chỗ nấu và người trông', detail: 'Chú ý an toàn với nước nóng và lửa.' }
  ];

  const cleaningTasks = [
    { id: 'living-dust', group: 'Phòng khách', title: 'Lau bụi bàn ghế và kệ' },
    { id: 'living-floor', group: 'Phòng khách', title: 'Lau sàn và cửa sổ' },
    { id: 'kitchen-fridge', group: 'Bếp', title: 'Sắp xếp tủ lạnh' },
    { id: 'kitchen-counter', group: 'Bếp', title: 'Lau bếp và mặt bàn' },
    { id: 'bedroom-closet', group: 'Phòng ngủ', title: 'Sắp xếp quần áo và đồ dùng' },
    { id: 'altar-clean', group: 'Bàn thờ', title: 'Dọn và lau bàn thờ theo nếp nhà' }
  ];

  function initChecklist(kind) {
    const stored = readState({ checked: [], date: '', custom: [] });
    const checked = Array.isArray(stored.checked) ? stored.checked.filter((id) => typeof id === 'string').slice(0, 500) : [];
    const state = {
      checked,
      date: /^\d{4}-\d{2}-\d{2}$/.test(stored.date) ? stored.date : '',
      custom: kind === 'cleaning' && Array.isArray(stored.custom) ? stored.custom.slice(0, 200).map((item) => ({
        id: validText(item.id, 60) || uid(),
        group: groups.cleaning.includes(item.group) ? item.group : 'Khác',
        title: validText(item.title)
      })).filter((item) => item.title) : []
    };
    const dateInput = $('#prep-date');
    if (dateInput) {
      dateInput.value = state.date;
      dateInput.addEventListener('change', () => {
        state.date = dateInput.value;
        persist(state);
        toast('Đã lưu ngày dự định.');
      });
    }
    if (kind === 'cleaning') {
      $('#prep-form').addEventListener('submit', (event) => {
        event.preventDefault();
        if (state.custom.length >= 200) return toast('Danh sách đã đạt 200 việc riêng.');
        const form = event.currentTarget;
        const title = validText(form.elements.title.value);
        if (!title) return;
        state.custom.push({ id: uid(), title, group: groups.cleaning.includes(form.elements.group.value) ? form.elements.group.value : 'Khác' });
        persist(state); form.reset(); render(); toast('Đã thêm việc dọn dẹp.');
      });
    }
    function render() {
      const list = $('#prep-list');
      list.replaceChildren();
      const tasks = kind === 'cooking' ? cookingTasks : [...cleaningTasks, ...state.custom];
      const done = tasks.filter((task) => state.checked.includes(task.id)).length;
      setProgress(done, tasks.length, kind === 'cooking' ? 'bước đã hoàn thành' : 'việc đã hoàn thành');
      setText('#prep-left', String(tasks.length - done));
      const sections = kind === 'cooking' ? ['Tìm hiểu', 'Chuẩn bị', 'Tập gói', 'Ngày nấu'] : groups.cleaning;
      for (const group of sections) {
        const items = tasks.filter((task) => task.group === group);
        if (!items.length) continue;
        list.append(makeGroup(group, items.length, items.map((task) => makeRow({
          title: task.title,
          subtitle: task.detail || '',
          checked: state.checked.includes(task.id),
          onCheck: (value) => {
            state.checked = value ? [...new Set([...state.checked, task.id])] : state.checked.filter((id) => id !== task.id);
            persist(state); render();
          },
          onRemove: kind === 'cleaning' && state.custom.some((item) => item.id === task.id) ? () => {
            if (!confirm(`Xóa việc “${task.title}”?`)) return;
            state.custom = state.custom.filter((item) => item.id !== task.id);
            state.checked = state.checked.filter((id) => id !== task.id);
            persist(state); render();
          } : null
        }))));
      }
    }
    render();
  }

  function initShopping() {
    const stored = readState({ items: [] });
    const state = { items: Array.isArray(stored.items) ? stored.items.slice(0, 500).map((item) => ({
      id: validText(item.id, 60) || uid(),
      title: validText(item.title),
      group: groups.shopping.includes(item.group) ? item.group : 'Khác',
      quantity: bounded(item.quantity, 1, 999),
      price: bounded(item.price, 0, 1000000000),
      bought: item.bought === true
    })).filter((item) => item.title) : [] };
    const itemForm = $('#prep-form');
    let editingItemId = null;
    itemForm.closest('details').addEventListener('toggle', (event) => {
      if (event.target.open || !editingItemId) return;
      editingItemId = null;
      itemForm.reset();
      itemForm.elements.quantity.value = '1';
      itemForm.querySelector('button[type="submit"]').textContent = 'Lưu món';
    });
    itemForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!editingItemId && state.items.length >= 500) return toast('Danh sách đã đạt 500 món.');
      const title = validText(itemForm.elements.title.value);
      if (!title) return;
      const values = {
        title,
        group: groups.shopping.includes(itemForm.elements.group.value) ? itemForm.elements.group.value : 'Khác',
        quantity: bounded(itemForm.elements.quantity.value, 1, 999),
        price: bounded(itemForm.elements.price.value, 0, 1000000000)
      };
      const existing = state.items.find((item) => item.id === editingItemId);
      if (existing) Object.assign(existing, values);
      else state.items.push({ id: uid(), ...values, bought: false });
      persist(state);
      itemForm.reset();
      itemForm.elements.quantity.value = '1';
      itemForm.querySelector('button[type="submit"]').textContent = 'Lưu món';
      itemForm.closest('details').open = false;
      editingItemId = null;
      render();
      toast(existing ? 'Đã cập nhật món cần mua.' : 'Đã thêm món cần mua.');
    });
    function render() {
      const list = $('#prep-list');
      list.replaceChildren();
      const planned = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const bought = state.items.filter((item) => item.bought).reduce((sum, item) => sum + item.quantity * item.price, 0);
      setText('#prep-planned', money(planned));
      setText('#prep-bought', money(bought));
      setText('#prep-left', String(state.items.filter((item) => !item.bought).length));
      setProgress(state.items.filter((item) => item.bought).length, state.items.length, 'món đã mua');
      if (!state.items.length) {
        const empty = document.createElement('p');
        empty.className = 'prep-empty';
        empty.textContent = 'Danh sách đang trống. Thêm món đầu tiên để chuẩn bị mua sắm Tết.';
        list.append(empty);
        return;
      }
      for (const group of groups.shopping) {
        const items = state.items.filter((item) => item.group === group);
        if (!items.length) continue;
        list.append(makeGroup(group, items.length, items.map((item) => makeRow({
          title: item.title,
          subtitle: `${item.quantity} × ${money(item.price)}`,
          amount: item.quantity * item.price,
          checked: item.bought,
          onCheck: (checked) => { item.bought = checked; persist(state); render(); },
          onEdit: () => {
            editingItemId = item.id;
            itemForm.elements.title.value = item.title;
            itemForm.elements.group.value = item.group;
            itemForm.elements.quantity.value = String(item.quantity);
            itemForm.elements.price.value = String(item.price);
            itemForm.querySelector('button[type="submit"]').textContent = 'Lưu thay đổi';
            itemForm.closest('details').open = true;
            itemForm.elements.title.focus();
          },
          onRemove: () => {
            if (!confirm(`Xóa ${item.title} khỏi danh sách?`)) return;
            state.items = state.items.filter((entry) => entry.id !== item.id);
            persist(state); render();
          }
        }))));
      }
    }
    render();
  }

  const switcher = $('.prep-switcher');
  const activeLink = switcher?.querySelector('[aria-current="page"]');
  if (switcher && activeLink) switcher.scrollLeft = activeLink.offsetLeft - switcher.offsetLeft - 12;

  if (page === 'lixi') initLiXi();
  if (page === 'cooking') initChecklist('cooking');
  if (page === 'cleaning') initChecklist('cleaning');
  if (page === 'shopping') initShopping();
})();

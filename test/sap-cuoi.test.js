const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const wedding = require('../js/sap-cuoi.js');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const atVietnam = value => new Date(`${value}+07:00`);

test('wedding dates reject rollover and accept leap day', () => {
  assert.equal(wedding.validDate('2028-02-29'), true);
  assert.equal(wedding.validDate('2027-02-29'), false);
  assert.equal(wedding.validDate('2027-04-31'), false);
  assert.equal(wedding.validDate('2027-13-01'), false);
});

test('countdown uses Vietnam time across year boundary and ignores host timezone', () => {
  const plan = { date: '2028-01-01', time: '09:00' };
  assert.equal(wedding.targetMs(plan.date, plan.time), Date.parse('2028-01-01T02:00:00Z'));
  assert.equal(wedding.vietnamDate(new Date('2027-12-31T17:00:00Z')), '2028-01-01');
  const before = wedding.countdown(atVietnam('2027-12-31T23:59:59'), plan);
  assert.equal(before.mode, 'countdown');
  assert.equal(before.days, 0);
  assert.equal(before.hours, 9);
  assert.equal(before.seconds, 1);
});

test('countdown runs every second until the ceremony, then celebrates and counts married days', () => {
  const plan = { date: '2028-02-29', time: '09:00' };
  assert.deepEqual(wedding.countdown(atVietnam('2028-02-29T08:59:58'), plan), { mode: 'countdown', days: 0, hours: 0, minutes: 0, seconds: 2 });
  assert.deepEqual(wedding.countdown(atVietnam('2028-02-29T08:59:59'), plan), { mode: 'countdown', days: 0, hours: 0, minutes: 0, seconds: 1 });
  assert.equal(wedding.countdown(atVietnam('2028-02-29T09:00:00'), plan).mode, 'today');
  assert.equal(wedding.countdown(atVietnam('2028-02-29T23:59:59'), plan).mode, 'today');
  assert.deepEqual(wedding.countdown(atVietnam('2028-03-01T00:00:00'), plan), { mode: 'married', days: 1 });
  assert.equal(wedding.dueDate('2028-02-29', 1), '2028-02-28');
  assert.equal(wedding.countdown(atVietnam('2028-02-29T00:00:00'), { date: '2028-02-29', time: '' }).mode, 'today');
});

test('checklist target dates move when the wedding date changes', () => {
  const first = wedding.dueDate('2027-10-25', 30);
  const moved = wedding.dueDate('2027-11-25', 30);
  assert.equal(first, '2027-09-25');
  assert.equal(moved, '2027-10-26');
});

test('budget totals update from estimated and actual expenses', () => {
  const plan = wedding.emptyPlan();
  plan.budgetTotal = 100000000;
  plan.expenses = [{ estimated: 40000000, actual: 50000000 }, { estimated: 20000000, actual: 10000000 }];
  assert.deepEqual(wedding.budgetTotals(plan), { estimated: 60000000, actual: 60000000, remaining: 40000000 });
  plan.expenses[0].actual = 95000000;
  assert.equal(wedding.budgetTotals(plan).remaining, -5000000);
});

test('share image describes the current countdown without exposing a plan link', () => {
  const source = { date: '2027-02-14', time: '09:30', partner1: 'An', partner2: 'Bình' };
  assert.deepEqual(wedding.shareCountdownText(atVietnam('2027-02-13T08:00:00'), source), { value: '1', unit: 'NGÀY NỮA', detail: '1 giờ 30 phút đến ngày cưới' });
  assert.deepEqual(wedding.shareCountdownText(atVietnam('2027-02-14T09:29:30'), source), { value: '30', unit: 'GIÂY NỮA', detail: 'Đến giờ tổ chức lễ cưới' });
  assert.equal(wedding.shareCountdownText(atVietnam('2027-02-14T09:30:00'), source).unit, 'LÀ NGÀY CƯỚI');
  assert.equal(wedding.shareCountdownText(atVietnam('2027-02-15T00:00:00'), source).unit, 'NGÀY BÊN NHAU');
  assert.match(read('sap-cuoi/index.html'), /Chỉ chia sẻ ảnh này/);
  assert.doesNotMatch(read('js/sap-cuoi.js'), /makeShareHash|parseShareHash|clipboard\.writeText/);
});

test('import rejects malformed data and keeps completed custom tasks', () => {
  const plan = wedding.emptyPlan();
  plan.wedding = { date: '2027-02-14', time: '', partner1: 'An', partner2: 'Bình' };
  plan.customTasks.push({ id: 'custom-song', title: 'Chọn bài hát', dueDate: '' });
  plan.completed.push('custom-song', 'venue');
  assert.deepEqual(wedding.normalizePlan(JSON.parse(JSON.stringify(plan))), plan);
  assert.throws(() => wedding.normalizePlan({ ...plan, expenses: [{ id: 'expense-1', title: 'Tiệc', category: 'venue', estimated: -1, actual: 0 }] }));
  assert.throws(() => wedding.normalizePlan({ ...plan, wedding: { date: '2027-02-29' } }));
});

test('category statistics update for preset and personal tasks', () => {
  const plan = wedding.emptyPlan();
  plan.customTasks.push({ id: 'custom-song', title: 'Chọn bài hát', dueDate: '' });
  plan.completed.push('budget', 'venue', 'custom-song');
  const stats = wedding.taskStats(plan);
  assert.deepEqual(stats.find(item => item.id === 'foundation'), { id: 'foundation', title: 'Đặt nền cho ngày vui', total: 3, done: 2, remaining: 1, percent: 67 });
  assert.deepEqual(stats.find(item => item.id === 'personal'), { id: 'personal', title: 'Việc riêng của hai bạn', total: 1, done: 1, remaining: 0, percent: 100 });
});

test('IndexedDB fallback reads legacy plan without deleting its only copy', async () => {
  const values = new Map();
  const storage = { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
  const plan = wedding.emptyPlan();
  plan.wedding = { date: '2027-02-14', time: '', partner1: '', partner2: '' };
  storage.setItem(wedding.STORAGE_KEY, JSON.stringify(plan));
  const store = await wedding.createIndexedStore(null, storage);
  assert.deepEqual(store.load(), plan);
  assert.equal(store.persistent, false);
  await store.save({ ...plan, budgetTotal: 1000 });
  assert.deepEqual(JSON.parse(storage.getItem(wedding.STORAGE_KEY)), plan);
  await store.clear();
  assert.equal(store.load(), null);
  const blocked = await wedding.createIndexedStore(null, { getItem() { throw Error('blocked'); }, removeItem() { throw Error('blocked'); } });
  assert.equal(blocked.persistent, false);
  assert.equal(blocked.load(), null);
});

test('backup image accepts supported data and rejects malformed or oversized data', () => {
  const photo = wedding.photoFromDataUrl('data:image/png;base64,aGVsbG8=');
  assert.equal(photo.type, 'image/png');
  assert.equal(photo.size, 5);
  assert.throws(() => wedding.photoFromDataUrl('data:text/html;base64,aGVsbG8='));
  assert.throws(() => wedding.photoFromDataUrl('data:image/png;base64,%%%'));
});

test('page is indexable at its own canonical and hearts are decorative and motion aware', () => {
  const html = read('sap-cuoi/index.html');
  const css = read('css/sap-cuoi.css');
  assert.match(html, /rel="canonical" href="https:\/\/saptet\.vn\/sap-cuoi\/"/);
  assert.match(read('sitemap.xml'), /<loc>https:\/\/saptet\.vn\/sap-cuoi\/<\/loc>/);
  assert.match(html, /class="wedding-hearts" aria-hidden="true"/);
  assert.match(html, /<main data-clarity-mask="True">/);
  assert.match(html, /if \(!window\.location\.hash\)/);
  assert.match(css, /\.wedding-hearts\{[^}]*pointer-events:none/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)\{\.wedding-hearts\{display:none/);
  const keyframe = css.match(/@keyframes wedding-heart-fall\{[^]*?\}\}/)?.[0] || '';
  assert.doesNotMatch(keyframe, /\b(left|top|width|height|box-shadow|filter)\s*:/);
});

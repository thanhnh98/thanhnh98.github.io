const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const page = fs.readFileSync(path.resolve(__dirname, '..', 'lich-van-nien.html'), 'utf8');

test('lich van nien uses a compact workspace layout', () => {
  assert.match(page, /calendar-hero--compact/);
  assert.match(page, /class="calendar-workspace"/);
  assert.match(page, /class="calendar-panel"/);
  assert.match(page, /class="calendar-sidebar"/);
});

test('date details and event lists live in the sidebar', () => {
  const sidebar = page.match(/<aside class="calendar-sidebar"[\s\S]*?<\/aside>/)?.[0] || '';

  assert.match(sidebar, /id="calendarDetailSection"/);
  assert.match(sidebar, /id="eventsUpcomingWrap"/);
  assert.match(sidebar, /id="eventsYearListWrap"/);
});

test('selecting a date updates inline detail instead of opening a modal', () => {
  const selectDateBody = page.match(/const selectDay = \(\) => \{[\s\S]*?\n\s*\};/)?.[0] || '';

  assert.doesNotMatch(selectDateBody, /openDialog\(\)/);
});

test('calendar colors use shared brand tokens with accessible day states', () => {
  assert.match(page, /--calendar-primary:\s*var\(--brand-red/);
  assert.match(page, /--calendar-primary-strong:\s*var\(--brand-red-deep/);
  assert.match(page, /--calendar-text:\s*var\(--brand-ink/);
  assert.match(page, /\.calendar-day\.other-month\s*\{[\s\S]*?opacity:\s*1;/);
  assert.match(page, /\.calendar-day\.selected \.day-number,[\s\S]*?color:\s*#fff !important;/);
  assert.match(page, /outline:\s*3px solid var\(--calendar-accent\)/);
});

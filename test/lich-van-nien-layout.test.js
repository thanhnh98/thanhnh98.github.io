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

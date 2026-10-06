const test = require('node:test');
const assert = require('node:assert/strict');
const ZonedTime = require('../js/zoned-time.js');

const iso = (ms) => new Date(ms).toISOString();

test('converts wall time in fixed-offset zones', () => {
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2027-02-06', '00:00', 'Asia/Ho_Chi_Minh')), '2027-02-05T17:00:00.000Z');
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2026-11-08', '00:00', 'Asia/Kolkata')), '2026-11-07T18:30:00.000Z');
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2027-01-01', '00:00', 'UTC')), '2027-01-01T00:00:00.000Z');
});

test('handles DST on both sides of the switch in New York', () => {
  // EST (UTC−5) in winter, EDT (UTC−4) in summer
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2026-12-25', '00:00', 'America/New_York')), '2026-12-25T05:00:00.000Z');
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2026-10-31', '00:00', 'America/New_York')), '2026-10-31T04:00:00.000Z');
  // Ngày chuyển giờ: 2026-11-01 01:30 vẫn tồn tại, 2027-03-14 02:30 không tồn tại → không được ném lỗi
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2026-11-01', '00:00', 'America/New_York')), '2026-11-01T04:00:00.000Z');
  assert.ok(Number.isFinite(ZonedTime.zonedWallTimeToUtc('2027-03-14', '02:30', 'America/New_York')));
});

test('handles southern-hemisphere DST (Sydney)', () => {
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2026-12-25', '00:00', 'Australia/Sydney')), '2026-12-24T13:00:00.000Z');
  assert.equal(iso(ZonedTime.zonedWallTimeToUtc('2027-07-01', '00:00', 'Australia/Sydney')), '2027-06-30T14:00:00.000Z');
});

test('formats UTC offsets', () => {
  const winter = Date.UTC(2026, 11, 25);
  assert.equal(ZonedTime.formatOffset(winter, 'America/New_York'), 'UTC−5');
  assert.equal(ZonedTime.formatOffset(winter, 'Asia/Kolkata'), 'UTC+5:30');
  assert.equal(ZonedTime.formatOffset(winter, 'UTC'), 'UTC');
});

test('picks the live or next occurrence and rolls over after it ends', () => {
  const holiday = { dates: ['2027-12-25', '2026-12-25'], startTime: '00:00', durationDays: 1 };
  const zone = 'America/New_York';
  const before = ZonedTime.nextOccurrence(holiday, Date.UTC(2026, 8, 25), zone);
  assert.equal(before.dateKey, '2026-12-25');
  assert.equal(before.live, false);

  const during = ZonedTime.nextOccurrence(holiday, Date.UTC(2026, 11, 25, 12), zone);
  assert.equal(during.dateKey, '2026-12-25');
  assert.equal(during.live, true);

  const after = ZonedTime.nextOccurrence(holiday, Date.UTC(2026, 11, 26, 6), zone);
  assert.equal(after.dateKey, '2027-12-25');

  assert.equal(ZonedTime.nextOccurrence(holiday, Date.UTC(2028, 0, 1), zone), null);
});

test('counts calendar days and today keys per zone', () => {
  assert.equal(ZonedTime.daysBetween('2026-09-25', '2026-12-25'), 91);
  const ms = Date.UTC(2026, 8, 25, 20);
  assert.equal(ZonedTime.todayKey(ms, 'Asia/Ho_Chi_Minh'), '2026-09-26');
  assert.equal(ZonedTime.todayKey(ms, 'America/Los_Angeles'), '2026-09-25');
});

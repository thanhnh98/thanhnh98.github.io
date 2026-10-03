(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.VietnamHolidays = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  const OFFICIAL_CALENDARS = {
    2026: {
      status: 'official',
      source: 'https://xaydungchinhsach.chinhphu.vn/de-xuat-phuong-an-nghi-tet-am-lich-nghi-le-quoc-khanh-nam-2026-119251002130522291.htm',
      periods: [
        ['2026-01-01', '2026-01-01', 'Tết Dương lịch'],
        ['2026-02-14', '2026-02-22', 'Tết Nguyên Đán'],
        ['2026-04-25', '2026-04-27', 'Giỗ Tổ Hùng Vương'],
        ['2026-04-30', '2026-05-03', 'Ngày 30/4 và Quốc tế Lao động'],
        ['2026-08-29', '2026-09-02', 'Quốc khánh']
      ]
    },
    2027: {
      status: 'official',
      source: 'https://vpcp.chinhphu.vn/van-ban-ban-hanh/174505.htm',
      periods: [
        ['2027-01-01', '2027-01-01', 'Tết Dương lịch'],
        ['2027-02-05', '2027-02-14', 'Tết Nguyên Đán'],
        ['2027-04-16', '2027-04-16', 'Giỗ Tổ Hùng Vương'],
        ['2027-04-30', '2027-05-03', 'Ngày 30/4 và Quốc tế Lao động'],
        ['2027-09-02', '2027-09-05', 'Quốc khánh']
      ]
    }
  };

  const FIXED_HOLIDAYS = {
    '01-01': 'Tết Dương lịch',
    '04-30': 'Ngày Giải phóng miền Nam',
    '05-01': 'Quốc tế Lao động',
    '09-02': 'Quốc khánh'
  };

  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function dateKey(year, month, day) {
    return `${year}-${pad(month)}-${pad(day)}`;
  }

  function keyToUtcDate(key) {
    const parts = key.split('-').map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  }

  function expandPeriods(periods) {
    const dates = {};
    (periods || []).forEach(function (period) {
      let cursor = keyToUtcDate(period[0]);
      const end = keyToUtcDate(period[1]);
      while (cursor <= end) {
        dates[dateKey(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, cursor.getUTCDate())] = period[2];
        cursor = new Date(cursor.getTime() + 86400000);
      }
    });
    return dates;
  }

  const OFFICIAL_DATES = {};
  Object.keys(OFFICIAL_CALENDARS).forEach(function (year) {
    OFFICIAL_DATES[year] = expandPeriods(OFFICIAL_CALENDARS[year].periods);
  });

  function getCalendarStatus(year) {
    const calendar = OFFICIAL_CALENDARS[year];
    return calendar
      ? { status: calendar.status, source: calendar.source }
      : { status: 'estimated', source: null };
  }

  function getHoliday(year, month, day) {
    const key = dateKey(year, month, day);
    const official = OFFICIAL_DATES[year];
    if (official && official[key]) {
      return { name: official[key], status: 'official', source: OFFICIAL_CALENDARS[year].source };
    }
    const fixed = FIXED_HOLIDAYS[`${pad(month)}-${pad(day)}`];
    return fixed ? { name: fixed, status: 'estimated', source: null } : null;
  }

  return {
    OFFICIAL_CALENDARS: OFFICIAL_CALENDARS,
    getCalendarStatus: getCalendarStatus,
    getHoliday: getHoliday
  };
});

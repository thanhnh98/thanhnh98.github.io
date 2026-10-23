(function (global) {
  function parts(key) {
    var values = String(key).split('-').map(Number);
    return { year: values[0], month: values[1], day: values[2] };
  }

  function dateKey(year, month) {
    return year + '-' + String(month).padStart(2, '0') + '-' + String(month).padStart(2, '0');
  }

  function daysBetween(fromKey, toKey) {
    var from = parts(fromKey);
    var to = parts(toKey);
    return Math.round((Date.UTC(to.year, to.month - 1, to.day) - Date.UTC(from.year, from.month - 1, from.day)) / 86400000);
  }

  function vietnamTodayKey(now) {
    var values = {};
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(now || new Date()).forEach(function (part) { values[part.type] = part.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function getNextSale(todayKey) {
    var today = parts(todayKey);
    for (var month = today.month; month <= 12; month += 1) {
      var candidate = dateKey(today.year, month);
      if (candidate > todayKey) return { dateKey: candidate, label: month + '.' + month, daysUntil: daysBetween(todayKey, candidate) };
    }
    return { dateKey: dateKey(today.year + 1, 1), label: '1.1', daysUntil: daysBetween(todayKey, dateKey(today.year + 1, 1)) };
  }

  function isDoubleDay(todayKey) {
    var today = parts(todayKey);
    return today.month === today.day && today.month <= 12;
  }

  global.SALE_DAYS = { getNextSale: getNextSale, isDoubleDay: isDoubleDay, vietnamTodayKey: vietnamTodayKey, daysBetween: daysBetween };
})(typeof window !== 'undefined' ? window : this);

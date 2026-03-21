/**
 * Format ISO 8601 publishedAt for display in Vietnam time (UTC+7 / Asia/Ho_Chi_Minh).
 * Example: 2026-03-21T01:29:03Z → "21/03/2026, 08:29 (UTC+7)"
 */
(function (global) {
  'use strict';

  function formatNewsPublishedAtGMT7(isoDate) {
    if (!isoDate) return '';
    var d = new Date(isoDate);
    if (isNaN(d.getTime())) return String(isoDate);

    try {
      var fmt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Ho_Chi_Minh',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      var parts = fmt.formatToParts(d);
      var map = {};
      for (var i = 0; i < parts.length; i++) {
        map[parts[i].type] = parts[i].value;
      }
      return map.day + '/' + map.month + '/' + map.year + ', ' + map.hour + ':' + map.minute + ' (UTC+7)';
    } catch (e) {
      return d.toLocaleString('vi-VN');
    }
  }

  global.formatNewsPublishedAtGMT7 = formatNewsPublishedAtGMT7;
})(typeof window !== 'undefined' ? window : this);

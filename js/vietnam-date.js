/** The calendar's "today" is always the civil date in Vietnam. */
(function (root) {
  'use strict';

  function getVietnamToday(now) {
    var parts = {};
    new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit'
    }).formatToParts(now || new Date()).forEach(function (part) {
      if (part.type !== 'literal') parts[part.type] = Number(part.value);
    });
    return new Date(parts.year, parts.month - 1, parts.day);
  }

  var api = { getVietnamToday: getVietnamToday };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.VietnamDate = api;
})(typeof window !== 'undefined' ? window : null);

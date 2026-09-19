/**
 * DOM cho trang Lịch Âm Hôm Nay. Mọi dữ liệu lịch dân gian lấy từ js/lunar-almanac.js.
 */
(function () {
  'use strict';

  var almanac = window.LunarAlmanac;
  if (!almanac) return;

  var DISCLAIMER_TEXT = almanac.DISCLAIMER_TEXT;
  var SHORT_DISCLAIMER = ' Thông tin theo quan niệm dân gian, chỉ để tham khảo.';
  var SITE_SUFFIX = ' | Sắp Tết 2027';

  var currentCalendarDate = new Date();
  var selectedDate = new Date();

  function $(id) { return document.getElementById(id); }
  function setText(id, value) { var el = $(id); if (el) el.textContent = value; }
  function pad2(n) { return String(n).padStart(2, '0'); }
  function sameDay(a, b) { return a.toDateString() === b.toDateString(); }
  function formatSolar(date) { return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear(); }
  function hourList(list) { return list.map(function (h) { return h.chi + ' (' + h.range + ')'; }).join(', '); }
  function lunarLabel(a) {
    return (a.lunar.day === 1 ? 'Mùng 1' : a.lunar.day) + ' tháng ' + a.lunarMonthName + (a.lunar.isLeapMonth ? ' (nhuận)' : '');
  }

  function track(name, params) {
    if (window.webAnalytics && typeof window.webAnalytics.trackEvent === 'function') {
      window.webAnalytics.trackEvent(name, params || {});
    }
  }

  function updateDateDetails(date) {
    var a = almanac.getAlmanac(date);
    var isToday = sameDay(date, new Date());
    var isGood = a.star.status === 'hoang-dao';
    var statusLabel = isGood ? 'Hoàng Đạo' : 'Hắc Đạo';

    setText('bloc-solar-weekday', a.weekday);
    setText('bloc-solar-day', pad2(a.solar.day));
    setText('bloc-solar-meta', 'Tháng ' + a.solar.month + ' năm ' + a.solar.year);
    setText('bloc-lunar-label', isToday ? 'Âm lịch hôm nay' : 'Âm lịch');
    setText('bloc-lunar-day', a.lunar.day === 1 ? 'Mùng 1' : String(a.lunar.day));
    setText('bloc-lunar-month', 'Tháng ' + a.lunarMonthName + (a.lunar.isLeapMonth ? ' (nhuận)' : '') + ' Âm Lịch');
    setText('bloc-canchi', 'Ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi);

    setText('details-heading', isToday ? 'Thông Tin Chi Tiết Ngày Hôm Nay' : 'Thông Tin Chi Tiết Ngày ' + formatSolar(date));
    setText('detail-canchi', 'Ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + ', Tháng ' + a.canChi.month.can + ' ' + a.canChi.month.chi + ', Năm ' + a.canChi.year.can + ' ' + a.canChi.year.chi);
    setText('detail-tiet-nguhanh', 'Tiết khí: ' + a.solarTerm + ' | Ngũ hành ngày: ' + a.napAm.element + ' (' + a.napAm.name + ')');
    setText('detail-truc', 'Trực ' + a.truc.name);
    setText('detail-sao', 'Sao ' + a.star.star + ' (' + statusLabel + ')');
    setText('detail-gio-hoangdao', hourList(a.luckyHours.good));
    setText('detail-gio-hacdao', hourList(a.luckyHours.bad));
    setText('detail-huong-xuathanh', 'Hỷ Thần: ' + a.directions.hyThan + ' | Tài Thần: ' + a.directions.taiThan);
    setText('detail-tuoi-xungkhac', a.conflictAges.join(', '));
    setText('detail-viec-nenlam', a.truc.nen.join(', ') + '.');
    setText('detail-viec-kiengky', a.truc.kieng.join(', ') + '.');

    var badge = $('day-status-badge');
    if (badge) {
      badge.textContent = statusLabel;
      badge.className = isGood ? 'details-badge-good' : 'details-badge-bad';
    }

    setText('faq-lunar-text', lunarLabel(a) + ' (ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + ')');
    setText('faq-hours-text', a.luckyHours.good.map(function (h) { return h.chi; }).join(', '));
    setText('faq-status-text', statusLabel.toLowerCase() + ' (sao ' + a.star.star + ', trực ' + a.truc.name + ')');

    var solarText = formatSolar(date);
    var titlePrefix = isToday ? 'Lịch Âm Hôm Nay Ngày ' + solarText : 'Lịch Âm Ngày ' + solarText;
    document.title = titlePrefix + ' - Xem Lịch Âm Dương, Giờ Hoàng Đạo' + SITE_SUFFIX;
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', (isToday ? 'Lịch âm hôm nay ' : 'Lịch âm ngày ') + solarText + ': ngày ' + lunarLabel(a) + ', ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + ', giờ hoàng đạo ' + a.luckyHours.good.map(function (h) { return h.chi; }).join(', ') + ', hướng xuất hành, tuổi xung, việc nên làm.' + SHORT_DISCLAIMER);
    }

    var faqSchemaEl = $('faq-schema');
    if (faqSchemaEl) {
      faqSchemaEl.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Hôm nay ngày bao nhiêu âm lịch?',
            acceptedAnswer: { '@type': 'Answer', text: 'Ngày ' + solarText + ' dương lịch là ngày ' + lunarLabel(a) + ' âm lịch, ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + ', tháng ' + a.canChi.month.can + ' ' + a.canChi.month.chi + ', năm ' + a.canChi.year.can + ' ' + a.canChi.year.chi + '.' }
          },
          {
            '@type': 'Question',
            name: 'Giờ hoàng đạo hôm nay là những giờ nào?',
            acceptedAnswer: { '@type': 'Answer', text: 'Theo lịch can chi, các giờ hoàng đạo ngày ' + solarText + ' gồm: ' + hourList(a.luckyHours.good) + '.' + SHORT_DISCLAIMER }
          },
          {
            '@type': 'Question',
            name: 'Ngày hôm nay tốt hay xấu và nên làm việc gì?',
            acceptedAnswer: { '@type': 'Answer', text: 'Theo lịch dân gian, ngày ' + solarText + ' là ngày ' + statusLabel.toLowerCase() + ' (sao ' + a.star.star + ', trực ' + a.truc.name + '). Việc thường được cho là hợp: ' + a.truc.nen.join(', ') + '. Việc thường được kiêng: ' + a.truc.kieng.join(', ') + '. ' + DISCLAIMER_TEXT }
          }
        ]
      }, null, 2);
    }
  }

  function makeDayCell(date, extraClass) {
    var cell = document.createElement('div');
    cell.className = 'calendar-day' + (extraClass ? ' ' + extraClass : '');
    var solar = document.createElement('div');
    solar.className = 'solar-date';
    solar.textContent = String(date.getDate());
    var lunar = document.createElement('div');
    lunar.className = 'lunar-date';
    var l = window.calculateLunarDate(date);
    lunar.textContent = l.day === 1 ? l.day + '/' + l.month : String(l.day);
    cell.appendChild(solar);
    cell.appendChild(lunar);
    return cell;
  }

  function generateMonthCalendar(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var grid = $('calendar-grid');
    setText('month-title-display', 'Tháng ' + (month + 1) + ' năm ' + year);
    grid.innerHTML = '';

    ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].forEach(function (label) {
      var header = document.createElement('div');
      header.className = 'calendar-day-header';
      header.textContent = label;
      grid.appendChild(header);
    });

    var firstWeekday = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var prevMonthDays = new Date(year, month, 0).getDate();
    var today = new Date();

    for (var i = firstWeekday - 1; i >= 0; i -= 1) {
      grid.appendChild(makeDayCell(new Date(year, month - 1, prevMonthDays - i), 'other-month'));
    }
    for (var day = 1; day <= daysInMonth; day += 1) {
      (function (current) {
        var cls = [];
        if (sameDay(current, today)) cls.push('today');
        if (sameDay(current, selectedDate)) cls.push('selected');
        var cell = makeDayCell(current, cls.join(' '));
        cell.addEventListener('click', function () {
          selectDate(current, false);
        });
        grid.appendChild(cell);
      })(new Date(year, month, day));
    }
    var total = firstWeekday + daysInMonth;
    var remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
    for (var extra = 1; extra <= remaining; extra += 1) {
      grid.appendChild(makeDayCell(new Date(year, month + 1, extra), 'other-month'));
    }
  }

  function selectDate(date, scrollIntoView) {
    selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    var sameMonth = currentCalendarDate.getFullYear() === selectedDate.getFullYear() && currentCalendarDate.getMonth() === selectedDate.getMonth();
    if (!sameMonth) currentCalendarDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    updateDateDetails(selectedDate);
    generateMonthCalendar(currentCalendarDate);
    if (scrollIntoView) {
      var card = document.querySelector('.bloc-card');
      if (card && card.scrollIntoView) card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function bindConverter() {
    var solarForm = $('convert-solar-form');
    var lunarForm = $('convert-lunar-form');
    var result = $('convert-result');

    function showResult(text, date) {
      if (!result) return;
      result.textContent = text;
      result.hidden = false;
      if (date) {
        var link = document.createElement('button');
        link.type = 'button';
        link.className = 'convert-jump';
        link.textContent = 'Xem chi tiết ngày này';
        link.addEventListener('click', function () { selectDate(date, true); });
        result.appendChild(document.createTextNode(' '));
        result.appendChild(link);
      }
    }

    if (solarForm) {
      solarForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var value = $('convert-solar-date').value;
        var parts = value.split('-').map(Number);
        if (parts.length !== 3 || parts.some(isNaN)) { showResult('Vui lòng chọn ngày dương lịch.'); return; }
        var date = new Date(parts[0], parts[1] - 1, parts[2]);
        var a = almanac.getAlmanac(date);
        showResult('Ngày ' + formatSolar(date) + ' dương lịch là ' + lunarLabel(a) + ' năm ' + a.canChi.year.can + ' ' + a.canChi.year.chi + ' (ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + ').', date);
        track('lunar_convert', { direction: 'solar_to_lunar' });
      });
    }

    if (lunarForm) {
      lunarForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var day = Number($('convert-lunar-day').value);
        var month = Number($('convert-lunar-month').value);
        var year = Number($('convert-lunar-year').value);
        var leap = $('convert-lunar-leap').checked;
        if (!day || !month || !year) { showResult('Vui lòng nhập đủ ngày, tháng, năm âm lịch.'); return; }
        var date = window.lunarToSolar(year, month, day, leap);
        if (!date) { showResult('Không có ngày ' + day + '/' + month + (leap ? ' nhuận' : '') + ' trong năm âm lịch ' + year + '.'); return; }
        showResult('Ngày ' + day + '/' + month + (leap ? ' (nhuận)' : '') + ' năm ' + year + ' âm lịch là ' + almanac.WEEKDAYS[date.getDay()] + ', ' + formatSolar(date) + ' dương lịch.', date);
        track('lunar_convert', { direction: 'lunar_to_solar' });
      });
    }
  }

  function bindKeepActions() {
    var app = $('lunar-keep-app');
    if (app && window.APP_RESOURCES && window.APP_RESOURCES.appStore) {
      var ua = navigator.userAgent || '';
      var isIos = /iphone|ipad|ipod/i.test(ua) || (/mac/i.test(navigator.platform || '') && navigator.maxTouchPoints > 1);
      app.href = isIos ? window.APP_RESOURCES.appStore.ios : window.APP_RESOURCES.appStore.android;
      app.addEventListener('click', function () { track('lunar_keep_action', { type: isIos ? 'app_ios' : 'app_android' }); });
    }

    var share = $('lunar-keep-share');
    if (share) {
      share.addEventListener('click', async function () {
        var a = almanac.getAlmanac(selectedDate);
        var text = 'Lịch âm ' + formatSolar(selectedDate) + ': ' + lunarLabel(a) + ', ngày ' + a.canChi.day.can + ' ' + a.canChi.day.chi + '. Giờ hoàng đạo: ' + a.luckyHours.good.map(function (h) { return h.chi; }).join(', ') + '.';
        var url = window.location.origin + window.location.pathname;
        track('lunar_keep_action', { type: 'share' });
        if (navigator.share) {
          try { await navigator.share({ title: document.title, text: text, url: url }); return; } catch (error) { if (error && error.name === 'AbortError') return; }
        }
        try {
          await navigator.clipboard.writeText(text + ' ' + url);
          share.textContent = 'Đã sao chép';
          setTimeout(function () { share.textContent = 'Chia sẻ'; }, 2000);
        } catch (error) { /* clipboard unavailable */ }
      });
    }
  }

  function bindFaq() {
    document.querySelectorAll('.faq-question').forEach(function (item) {
      item.addEventListener('click', function () {
        var parent = item.parentElement;
        var isActive = parent.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(function (el) { el.classList.remove('active'); });
        if (!isActive) parent.classList.add('active');
      });
    });
  }

  function init() {
    var today = new Date();
    selectedDate = new Date(today);
    currentCalendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
    var solarInput = $('convert-solar-date');
    if (solarInput && !solarInput.value) solarInput.value = today.getFullYear() + '-' + pad2(today.getMonth() + 1) + '-' + pad2(today.getDate());
    var lunarYear = $('convert-lunar-year');
    if (lunarYear && !lunarYear.value) lunarYear.value = String(today.getFullYear());

    updateDateDetails(selectedDate);
    generateMonthCalendar(currentCalendarDate);

    $('prev-month-btn').addEventListener('click', function () {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      generateMonthCalendar(currentCalendarDate);
    });
    $('next-month-btn').addEventListener('click', function () {
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      generateMonthCalendar(currentCalendarDate);
    });
    $('today-btn').addEventListener('click', function () { selectDate(new Date(), false); });

    bindConverter();
    bindKeepActions();
    bindFaq();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

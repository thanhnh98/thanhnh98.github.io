/**
 * Hiển thị "Hôm nay" (thứ, ngày dương, âm lịch) và sự kiện gần nhất
 * Kiểm tra cả sự kiện âm lịch và dương lịch. Chạy trên trang chủ (section countdown).
 */
(function () {
  var DAY_NAMES = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  var LUNAR_MONTH_NAMES = [
    'Giêng', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín', 'Mười', 'Mười Một', 'Chạp'
  ];

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function formatSolarDate(d) {
    return pad2(d.getDate()) + '/' + pad2(d.getMonth() + 1) + '/' + d.getFullYear();
  }

  function getTodayString() {
    var d = new Date();
    var dayName = DAY_NAMES[d.getDay()];
    return dayName + ', ' + formatSolarDate(d);
  }

  function getLunarString(solarDate) {
    var calc = typeof window.calculateLunarDateFromComponent === 'function'
      ? window.calculateLunarDateFromComponent
      : (typeof calculateLunarDate === 'function' ? calculateLunarDate : null);
    if (!calc) return '';
    try {
      var lunar = calc(solarDate);
      if (lunar && lunar.day != null && lunar.month != null) {
        var name = LUNAR_MONTH_NAMES[lunar.month - 1] || ('tháng ' + lunar.month);
        return ' (Âm lịch: ' + lunar.day + '/' + lunar.month + ')';
      }
    } catch (e) {}
    return '';
  }

  /**
   * Thu thập tất cả ngày sự kiện (dương lịch) trong năm hiện tại và năm sau (để có sự kiện sắp tới).
   * Mỗi phần tử: { date: Date, name: string, isLunar: boolean }
   */
  function collectAllEventDates(today) {
    var year = today.getFullYear();
    var list = [];
    var ev, d, solarDate;

    if (typeof window.EVENTS_DATA === 'undefined') return list;

    // Sự kiện dương lịch (VN + quốc tế) – năm nay và năm sau
    [window.EVENTS_DATA.SOLAR_EVENTS_VIETNAM, window.EVENTS_DATA.SOLAR_EVENTS_INTERNATIONAL].forEach(function (arr) {
      if (!Array.isArray(arr)) return;
      arr.forEach(function (e) {
        ev = e;
        d = new Date(year, ev.month - 1, ev.day);
        d.setHours(0, 0, 0, 0);
        list.push({ date: d, name: ev.name, isLunar: false });
        d = new Date(year + 1, ev.month - 1, ev.day);
        d.setHours(0, 0, 0, 0);
        list.push({ date: d, name: ev.name, isLunar: false });
      });
    });

    // Sự kiện âm lịch → chuyển sang dương lịch (năm nay; tháng Chạp 23/12 có thể rơi vào đầu năm dương lịch)
    if (typeof lunarToSolar !== 'function') return list;
    if (!window.EVENTS_DATA.LUNAR_EVENTS) return list;

    window.EVENTS_DATA.LUNAR_EVENTS.forEach(function (ev) {
      try {
        // Trong năm dương lịch hiện tại: phần lớn âm lịch là year, riêng tháng Chạp có thể year-1
        solarDate = ev.lunarMonth === 12
          ? lunarToSolar(year - 1, 12, ev.lunarDay)
          : lunarToSolar(year, ev.lunarMonth, ev.lunarDay);
        if (solarDate) {
          var eventDate = new Date(solarDate.getFullYear(), solarDate.getMonth(), solarDate.getDate());
          eventDate.setHours(0, 0, 0, 0);
          list.push({ date: eventDate, name: ev.name, isLunar: true });
        }
        // Năm sau (để có sự kiện sắp tới khi đã qua hết năm nay)
        solarDate = ev.lunarMonth === 12
          ? lunarToSolar(year, 12, ev.lunarDay)
          : lunarToSolar(year + 1, ev.lunarMonth, ev.lunarDay);
        if (solarDate) {
          eventDate = new Date(solarDate.getFullYear(), solarDate.getMonth(), solarDate.getDate());
          eventDate.setHours(0, 0, 0, 0);
          list.push({ date: eventDate, name: ev.name, isLunar: true });
        }
      } catch (err) {}
    });

    return list;
  }

  /** Đếm số ngày có sự kiện trong vòng 1 tháng (30 ngày) từ hôm nay. */
  var ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

  function countUpcomingEventsInOneMonth(today, allEvents) {
    today.setHours(0, 0, 0, 0);
    var todayTime = today.getTime();
    var endTime = todayTime + ONE_MONTH_MS;
    var seen = {};
    var count = 0;
    allEvents.forEach(function (item) {
      var t = item.date.getTime();
      if (t >= todayTime && t <= endTime) {
        var key = item.date.getFullYear() + '-' + (item.date.getMonth() + 1) + '-' + item.date.getDate();
        if (!seen[key]) {
          seen[key] = true;
          count++;
        }
      }
    });
    return count;
  }

  function render() {
    var elDate = document.getElementById('today-date');
    var elCount = document.getElementById('today-event-count');
    var today = new Date();

    if (elDate) {
      elDate.textContent = getTodayString();
    }

    var allEvents = collectAllEventDates(today);
    var count = countUpcomingEventsInOneMonth(new Date(today.getTime()), allEvents);
    if (elCount) {
      if (count >= 1) {
        elCount.textContent = ' (có sự kiện sắp diễn ra)';
      } else {
        elCount.textContent = '';
      }
    }
  }

  function init() {
    if (!document.getElementById('today-date')) return;
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

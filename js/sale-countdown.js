(function () {
  function render() {
    var english = new URLSearchParams(window.location.search).get('lang') === 'en';
    var todayKey = SALE_DAYS.vietnamTodayKey();
    var next = SALE_DAYS.getNextSale(todayKey);
    var label = document.querySelector('[data-sale-label]');
    var date = document.querySelector('[data-sale-date]');
    var days = document.querySelector('[data-sale-days]');
    var answer = document.querySelector('[data-sale-answer]');
    var faqAnswer = document.querySelector('[data-sale-faq-answer]');
    var heading = document.querySelector('[data-sale-heading]');
    var today = document.querySelector('[data-sale-today]');
    var parts = next.dateKey.split('-').map(Number);
    var formatted = String(parts[2]).padStart(2, '0') + '/' + String(parts[1]).padStart(2, '0') + '/' + parts[0];
    var sentence = english
      ? 'There are ' + next.daysUntil + ' days until the next double-date sale on ' + next.label + ' (' + formatted + '), Vietnam time.'
      : 'Còn ' + next.daysUntil + ' ngày nữa đến ngày sale đôi ' + next.label + ' (' + formatted + ') theo giờ Việt Nam.';
    if (label) label.textContent = next.label;
    if (date) date.textContent = formatted;
    if (days) days.textContent = next.daysUntil;
    if (answer) answer.textContent = sentence;
    if (faqAnswer) faqAnswer.textContent = sentence;
    if (heading) heading.textContent = english
      ? 'How many days until the next double-date sale on ' + next.label + '?'
      : 'Còn bao nhiêu ngày nữa đến ngày sale đôi ' + next.label + '?';
    document.title = english
      ? 'How Many Days Until ' + next.label + '? | Sale Countdown'
      : 'Còn Bao Nhiêu Ngày Nữa Đến ' + next.label + '? | Sắp Săn Sale';
    if (today) {
      today.hidden = !SALE_DAYS.isDoubleDay(todayKey);
      if (!today.hidden) today.textContent = english
        ? 'Today is the ' + partsForToday(todayKey) + ' double date. Check each store for its actual sale hours.'
        : 'Hôm nay là ngày đôi ' + partsForToday(todayKey) + '. Hãy kiểm tra thời gian ưu đãi tại từng cửa hàng.';
    }
    var midnightUtc = Date.UTC(parts[0], parts[1] - 1, parts[2], -7);
    var seconds = Math.max(0, Math.floor((midnightUtc - Date.now()) / 1000));
    var clock = document.querySelector('[data-sale-clock]');
    if (clock) {
      var hours = Math.floor((seconds % 86400) / 3600);
      var minutes = Math.floor((seconds % 3600) / 60);
      var remainingSeconds = seconds % 60;
      clock.textContent = [hours, minutes, remainingSeconds].map(function (value) { return String(value).padStart(2, '0'); }).join(':');
    }
  }

  function partsForToday(key) {
    var month = Number(key.split('-')[1]);
    return month + '.' + month;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
  setInterval(render, 1000);
})();

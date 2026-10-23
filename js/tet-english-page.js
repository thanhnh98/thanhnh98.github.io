(function () {
  var dates = [
    ['2027-02-06', 'Year of the Goat'],
    ['2028-01-26', 'Year of the Monkey'],
    ['2029-02-13', 'Year of the Rooster'],
    ['2030-02-03', 'Year of the Dog']
  ];
  var now = new Date();
  var next = dates.find(function (entry) { return now < new Date(entry[0] + 'T00:00:00+07:00'); });
  if (!next) return;
  var year = Number(next[0].slice(0, 4));
  var target = new Date(next[0] + 'T00:00:00+07:00');
  var pretty = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(target);
  var eve = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(target.getTime() - 86400000));
  var vnToday = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  var part = function (key) { return vnToday.find(function (item) { return item.type === key; }).value; };
  var todayUtc = Date.UTC(Number(part('year')), Number(part('month')) - 1, Number(part('day')));
  var targetUtc = Date.UTC(Number(next[0].slice(0, 4)), Number(next[0].slice(5, 7)) - 1, Number(next[0].slice(8, 10)));
  var days = Math.max(0, Math.round((targetUtc - todayUtc) / 86400000));
  var answer = document.getElementById('tet-en-answer');
  var date = document.getElementById('tet-en-date');
  var daysAnswer = document.getElementById('tet-en-days-answer');
  var countdown = document.querySelector('[data-intent-countdown]');
  if (answer) answer.innerHTML = 'Tet ' + year + ' in Vietnam begins on <strong>' + pretty + '</strong>. New Year\'s Eve is ' + eve + '—' + (year === 2027 ? 'the 29th and final day of the lunar year' : 'the final day of the lunar year') + '.';
  if (date) date.textContent = pretty;
  if (daysAnswer) daysAnswer.textContent = days + ' calendar ' + (days === 1 ? 'day' : 'days') + ' until Tet ' + year + ' in Vietnam.';
  var faqDate = document.getElementById('tet-en-faq-date');
  var faqDateAnswer = document.getElementById('tet-en-faq-date-answer');
  var faqEve = document.getElementById('tet-en-faq-eve');
  var faqEveAnswer = document.getElementById('tet-en-faq-eve-answer');
  var lastDay = year === 2027 ? 'the 29th and final day of the lunar year' : 'the final day of the lunar year';
  if (faqDate) faqDate.textContent = 'When is Tet in Vietnam in ' + year + '?';
  if (faqDateAnswer) faqDateAnswer.textContent = 'The first day of Tet ' + year + ' is ' + pretty + '. It begins at midnight in Vietnam (UTC+7).';
  if (faqEve) faqEve.textContent = "When is Vietnamese New Year's Eve in " + year + '?';
  if (faqEveAnswer) faqEveAnswer.textContent = "New Year's Eve is " + eve + ', ' + lastDay + '. The new lunar year begins at 00:00 on ' + pretty + ', Vietnam time.';
  if (countdown) countdown.setAttribute('data-target', next[0] + 'T00:00:00+07:00');
  window.setInterval(function () { if (Date.now() >= target.getTime()) window.location.reload(); }, 60000);
})();

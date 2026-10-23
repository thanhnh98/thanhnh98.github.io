/** Refresh the crawlable answer to “when is Tet in Vietnam” in Vietnam time. */
const fs = require('node:fs');
const path = require('node:path');
const { calendarDaysUntil, vnDateKey } = require('./lib/tet-seo-dates');

const FILE = path.join(__dirname, '..', 'when-is-tet-in-vietnam', 'index.html');
const DATES = ['2027-02-06', '2028-01-26', '2029-02-13', '2030-02-03'];

function replaceRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) throw new Error(`English Tet SEO: missing ${label}`);
  pattern.lastIndex = 0;
  return html.replace(pattern, replacement);
}

function render(html, now = new Date()) {
  const key = DATES.find((date) => now < new Date(`${date}T00:00:00+07:00`));
  if (!key) throw new Error('English Tet SEO: extend the Tet date table before 2030 ends');
  const year = Number(key.slice(0, 4));
  const target = new Date(`${key}T00:00:00+07:00`);
  const eve = new Date(target.getTime() - 86400000);
  const date = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(target);
  const eveDate = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(eve);
  const days = calendarDaysUntil(key, now);
  const lastDay = year === 2027 ? 'the 29th and final day of the lunar year' : 'the final day of the lunar year';
  const title = `When Is Tet in Vietnam? ${year} Date & Countdown | Sắp Tết`;
  const description = `When is Tet in Vietnam? Tet ${year} starts ${date}. See the Vietnam-time countdown, New Year's Eve and official 2027 holiday dates.`;

  html = replaceRequired(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, 'title');
  html = replaceRequired(html, /(<meta name="description" content=")[^"]*(">)/, `$1${description}$2`, 'meta description');
  html = replaceRequired(html, /(<meta name="keywords" content=")[^"]*(">)/, `$1when is tet in vietnam, tet ${year} date, when is vietnamese new year ${year}, tet holiday vietnam, vietnam lunar new year countdown$2`, 'keywords');
  html = replaceRequired(html, /(<meta property="og:title" content=")[^"]*(">)/, `$1When Is Tet in Vietnam? Tet ${year} Date & Countdown$2`, 'OG title');
  html = replaceRequired(html, /(<meta property="og:description" content=")[^"]*(">)/, `$1Tet in Vietnam begins ${date}. Check the countdown, New Year's Eve and the official 2027 holiday schedule.$2`, 'OG description');
  html = replaceRequired(html, /(<meta name="twitter:title" content=")[^"]*(">)/, `$1When Is Tet in Vietnam? Tet ${year} Date & Countdown$2`, 'Twitter title');
  html = replaceRequired(html, /(<meta name="twitter:description" content=")[^"]*(">)/, `$1Tet in Vietnam begins ${date}. Check the countdown and holiday dates.$2`, 'Twitter description');
  html = replaceRequired(html, /(<p class="intent-lead" id="tet-en-answer">)[\s\S]*?(<\/p>)/, `$1Tet ${year} in Vietnam begins on <strong>${date}</strong>. New Year's Eve is ${eveDate}—${lastDay}.$2`, 'hero answer');
  html = replaceRequired(html, /(<strong id="tet-en-date">)[^<]*(<\/strong>)/, `$1${date}$2`, 'short answer');
  html = replaceRequired(html, /(<p id="tet-en-days-answer">)[^<]*(<\/p>)/, `$1${days} calendar ${days === 1 ? 'day' : 'days'} until Tet ${year} in Vietnam.$2`, 'calendar-day answer');
  html = replaceRequired(html, /(<summary id="tet-en-faq-date">)[^<]*(<\/summary>)/, `$1When is Tet in Vietnam in ${year}?$2`, 'date FAQ question');
  html = replaceRequired(html, /(<p id="tet-en-faq-date-answer">)[^<]*(<\/p>)/, `$1The first day of Tet ${year} is ${date}. It begins at midnight in Vietnam (UTC+7).$2`, 'date FAQ answer');
  html = replaceRequired(html, /(<summary id="tet-en-faq-eve">)[^<]*(<\/summary>)/, `$1When is Vietnamese New Year's Eve in ${year}?$2`, 'eve FAQ question');
  html = replaceRequired(html, /(<p id="tet-en-faq-eve-answer">)[^<]*(<\/p>)/, `$1New Year's Eve is ${eveDate}, ${lastDay}. The new lunar year begins at 00:00 on ${date}, Vietnam time.$2`, 'eve FAQ answer');
  html = replaceRequired(html, /(<div class="intent-countdown" data-intent-countdown data-target=")[^"]*(")/, `$1${key}T00:00:00+07:00$2`, 'countdown target');
  html = replaceRequired(html, /(<script type="application\/ld\+json" id="tet-english-schema">)([\s\S]*?)(<\/script>)/, (_, open, json, close) => {
    const schema = JSON.parse(json);
    schema['@graph'][0].name = `When Is Tet in Vietnam? ${year} Date & Countdown`;
    schema['@graph'][0].description = `Tet ${year} in Vietnam begins ${date}.`;
    schema['@graph'][0].dateModified = vnDateKey(now);
    schema['@graph'][1].mainEntity[0].name = `When is Tet in Vietnam in ${year}?`;
    schema['@graph'][1].mainEntity[0].acceptedAnswer.text = `The first day of Tet ${year} in Vietnam is ${date}. The new lunar year begins at midnight in Vietnam (UTC+7).`;
    schema['@graph'][1].mainEntity[1].name = `When is Vietnamese New Year's Eve in ${year}?`;
    schema['@graph'][1].mainEntity[1].acceptedAnswer.text = `Vietnamese New Year's Eve is ${eveDate}, ${lastDay}. The first day of Tet begins at 00:00 on ${date}, Vietnam time.`;
    return `${open}${JSON.stringify(schema)}${close}`;
  }, 'JSON-LD');
  return html;
}

if (require.main === module) {
  const original = fs.readFileSync(FILE, 'utf8');
  const updated = render(original);
  if (updated !== original) fs.writeFileSync(FILE, updated);
}

module.exports = { render, DATES };

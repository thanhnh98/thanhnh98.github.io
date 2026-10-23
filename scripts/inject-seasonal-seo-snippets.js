/** Refresh the indexable Vietnamese Noel page for the current Vietnam date. */
const fs = require('node:fs');
const path = require('node:path');
const { vnDateKey, calendarDaysUntil } = require('./lib/tet-seo-dates');

const ROOT = path.join(__dirname, '..');

function replaceOrThrow(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`inject-seasonal-seo: ${label} not found`);
  re.lastIndex = 0;
  return html.replace(re, replacement);
}

function buildNoelSeoPayload(now = new Date()) {
  const today = vnDateKey(now);
  let year = Number(today.slice(0, 4));
  if (today > `${year}-12-25`) year += 1;
  const days = calendarDaysUntil(`${year}-12-25`, now);
  const weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][new Date(Date.UTC(year, 11, 25)).getUTCDay()];
  const answer = days === 0
    ? `Hôm nay là Noel ${year}, ${weekday} ngày 25/12/${year}.`
    : `Còn ${days} ngày lịch nữa đến Noel ${year}, ${weekday} ngày 25/12/${year}.`;
  return {
    year,
    answer,
    title: `Còn Bao Nhiêu Ngày Nữa Đến Noel ${year}? | Sắp Tết`,
    description: `${answer} Xem đồng hồ đếm ngược Giáng sinh từng giây theo giờ Việt Nam.`,
    ogDescription: `${answer} Xem đồng hồ đếm ngược Giáng sinh theo giờ Việt Nam.`,
  };
}

function injectNoelSeo(html, payload) {
  html = replaceOrThrow(html, /(<title>)[^<]*(<\/title>)/, `$1${payload.title}$2`, 'title');
  html = replaceOrThrow(html, /(<meta name="description" content=")[^"]*(")/, `$1${payload.description}$2`, 'description');
  html = replaceOrThrow(html, /(<meta name="keywords" content=")[^"]*(")/, `$1đếm ngược noel, noel ${payload.year}, giáng sinh, đếm ngược giáng sinh, còn bao nhiêu ngày nữa đến noel$2`, 'keywords');
  html = replaceOrThrow(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${payload.title}$2`, 'og:title');
  html = replaceOrThrow(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${payload.ogDescription}$2`, 'og:description');
  html = replaceOrThrow(html, /(<span data-seasonal-year>)[^<]*(<\/span>)/, `$1${payload.year}$2`, 'year');
  html = replaceOrThrow(html, /(<p class="seasonal-lead" data-noel-answer>)[^<]*(<\/p>)/, `$1${payload.answer}$2`, 'hero answer');
  html = replaceOrThrow(html, /(<p data-noel-answer>)[^<]*(<\/p>)/, `$1${payload.answer}$2`, 'FAQ answer');
  html = replaceOrThrow(html, /(<p class="seasonal-date" data-seasonal-date>)[^<]*(<\/p>)/, `$1Giáng Sinh: 25/12/${payload.year}$2`, 'date label');
  return html;
}

function main() {
  const file = path.join(ROOT, 'noel.html');
  fs.writeFileSync(file, injectNoelSeo(fs.readFileSync(file, 'utf8'), buildNoelSeoPayload()), 'utf8');
}

if (require.main === module) main();

module.exports = { buildNoelSeoPayload, injectNoelSeo };

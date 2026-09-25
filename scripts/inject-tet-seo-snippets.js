/**
 * Pre-render Tết SEO snippets into static HTML (Asia/Ho_Chi_Minh).
 * Idempotent: rewrites the same elements on every run, so the daily workflow keeps the
 * day count in the HTML (for crawlers that don't run JS) and in the meta description fresh.
 * Usage: node scripts/inject-tet-seo-snippets.js
 */

const fs = require('fs');
const path = require('path');
const { buildTetSeoPayload } = require('./lib/tet-seo-dates');
const { getHeroToday } = require('../js/home-retention.js');
const { EVENTS_DATA } = require('../data/events-data.js');
const { calculateLunarDate } = require('../js/lunar-calendar.js');

const ROOT = path.join(__dirname, '..');

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function replaceOrThrow(html, re, replacement, label) {
  if (!re.test(html)) throw new Error(`inject-tet-seo: ${label} not found`);
  return html.replace(re, replacement);
}

function setTextById(html, id, text) {
  const re = new RegExp(`(<([a-z]+)\\b[^>]*\\bid="${id}"[^>]*>)[^<]*(</\\2>)`);
  return replaceOrThrow(html, re, `$1${escapeHtml(text)}$3`, `#${id}`);
}

// Thẻ "Hôm nay" của hero + thẻ ngày/sự kiện trên trang chủ: cùng chuỗi mà js/home-retention.js sẽ điền,
// để nội dung không đổi kích thước khi JS chạy (CLS) và bot không chạy JS vẫn thấy ngày thật.
function injectHeroToday(html, now) {
  const today = getHeroToday(now, EVENTS_DATA, calculateLunarDate);
  html = setTextById(html, 'today-date', today.solarText);
  html = setTextById(html, 'today-solar-date', today.solarText);
  html = setTextById(html, 'today-lunar', today.lunarText ? `(${today.lunarText})` : 'Xem lịch âm');
  html = setTextById(html, 'today-lunar-date', today.lunarText || 'Xem lịch âm hôm nay');
  if (!today.nearestEvent) return html;
  html = setTextById(html, 'nearest-event-text', today.nearestEvent.text);
  html = setTextById(html, 'nearest-event-name', today.nearestEvent.name);
  html = setTextById(html, 'nearest-event-countdown', today.nearestEvent.countdownText);
  return html.replace(/(<a\b[^>]*\bid="nearest-event-link"[^>]*?) hidden>/, '$1>');
}

function setMetaDescription(html, text, label) {
  return replaceOrThrow(html, /(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(text)}$2`, `${label} meta description`);
}

const TARGETS = {
  'index.html': (html, payload) => {
    html = setMetaDescription(html, payload.metaDescriptionHome, 'index.html');
    html = injectHeroToday(html, payload.now);
    return replaceOrThrow(
      html,
      /(<span data-seo="days-until-tet">)[^<]*(<\/span>)/,
      `$1${payload.daysUntilTet}$2`,
      'index.html days-until-tet',
    );
  },
  'con-bao-nhieu-ngay-nua-den-tet/index.html': (html, payload) => replaceOrThrow(
    html,
    /(data-seo="live-days-answer">)[\s\S]*?(<\/p>)/,
    `$1\n                            <strong>${escapeHtml(payload.answerLead)}</strong>\n                        $2`,
    'landing live-days-answer',
  ),
  'con-bao-nhieu-ngay-nua-den-giao-thua/index.html': (html, payload) => {
    html = setMetaDescription(html, payload.metaDescriptionGiaoThua, 'giao-thua');
    return replaceOrThrow(
      html,
      /(<p data-seo="giao-thua-days">)[^<]*(<\/p>)/,
      `$1Hôm nay còn ${payload.daysUntilGiaoThua} ngày nữa đến đêm giao thừa (30 Tết, ${payload.giaoThuaDate}).$2`,
      'giao-thua days line',
    );
  },
};

function injectTetSeo(file, html, payload) {
  return TARGETS[file](html, payload);
}

function main() {
  const payload = buildTetSeoPayload();
  for (const file of Object.keys(TARGETS)) {
    const filePath = path.join(ROOT, file);
    fs.writeFileSync(filePath, injectTetSeo(file, fs.readFileSync(filePath, 'utf8'), payload), 'utf8');
  }
  console.log(
    `inject-tet-seo: updated ${Object.keys(TARGETS).length} file(s); daysUntilTet=${payload.daysUntilTet} (VN ${payload.todayDate})`
  );
}

if (require.main === module) main();

module.exports = { TARGETS, injectTetSeo };

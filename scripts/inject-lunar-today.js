/**
 * Pre-render dữ liệu lịch âm của ngày hôm nay (Asia/Ho_Chi_Minh) vào lich-am-hom-nay.html
 * để HTML tĩnh luôn có nội dung đúng ngày cho crawler. JS client ghi đè lại khi tải trang.
 * Idempotent: chạy nhiều lần cho cùng kết quả.
 * Usage: node scripts/inject-lunar-today.js
 */

const fs = require('fs');
const path = require('path');
const almanac = require('../js/lunar-almanac.js');

const ROOT = path.join(__dirname, '..');
const TARGET = path.join(ROOT, 'lich-am-hom-nay.html');
const SHORT_DISCLAIMER = ' Thông tin theo quan niệm dân gian, chỉ để tham khảo.';
const SITE_SUFFIX = ' | Sắp Tết 2027';

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getVietnamToday(now) {
  const parts = {};
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' })
    .formatToParts(now || new Date())
    .forEach((part) => { if (part.type !== 'literal') parts[part.type] = Number(part.value); });
  return new Date(parts.year, parts.month - 1, parts.day);
}

function formatSolar(date) {
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function hourList(list) {
  return list.map((h) => `${h.chi} (${h.range})`).join(', ');
}

function lunarLabel(a) {
  return `${a.lunar.day === 1 ? 'Mùng 1' : a.lunar.day} tháng ${a.lunarMonthName}${a.lunar.isLeapMonth ? ' (nhuận)' : ''}`;
}

function setElementText(html, id, text) {
  const re = new RegExp(`(id="${id}"[^>]*>)[^<]*(<)`);
  if (!re.test(html)) throw new Error(`inject-lunar-today: missing element #${id}`);
  return html.replace(re, `$1${escapeHtml(text)}$2`);
}

function buildFaqSchema(a, solarText, statusLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hôm nay ngày bao nhiêu âm lịch?',
        acceptedAnswer: { '@type': 'Answer', text: `Ngày ${solarText} dương lịch là ngày ${lunarLabel(a)} âm lịch, ngày ${a.canChi.day.can} ${a.canChi.day.chi}, tháng ${a.canChi.month.can} ${a.canChi.month.chi}, năm ${a.canChi.year.can} ${a.canChi.year.chi}.` }
      },
      {
        '@type': 'Question',
        name: 'Giờ hoàng đạo hôm nay là những giờ nào?',
        acceptedAnswer: { '@type': 'Answer', text: `Theo lịch can chi, các giờ hoàng đạo ngày ${solarText} gồm: ${hourList(a.luckyHours.good)}.${SHORT_DISCLAIMER}` }
      },
      {
        '@type': 'Question',
        name: 'Ngày hôm nay tốt hay xấu và nên làm việc gì?',
        acceptedAnswer: { '@type': 'Answer', text: `Theo lịch dân gian, ngày ${solarText} là ngày ${statusLabel.toLowerCase()} (sao ${a.star.star}, trực ${a.truc.name}). Việc thường được cho là hợp: ${a.truc.nen.join(', ')}. Việc thường được kiêng: ${a.truc.kieng.join(', ')}. ${almanac.DISCLAIMER_TEXT}` }
      }
    ]
  };
}

function injectLunarToday(html, date) {
  const a = almanac.getAlmanac(date);
  const isGood = a.star.status === 'hoang-dao';
  const statusLabel = isGood ? 'Hoàng Đạo' : 'Hắc Đạo';
  const solarText = formatSolar(date);
  const goodChis = a.luckyHours.good.map((h) => h.chi).join(', ');

  let out = html;

  // Summary block between markers
  const summary = `Hôm nay, ${a.weekday} ${solarText}, là ngày ${lunarLabel(a)} năm ${a.canChi.year.can} ${a.canChi.year.chi} (ngày ${a.canChi.day.can} ${a.canChi.day.chi}).`;
  const markerRe = /<!-- LUNAR_TODAY:START -->[\s\S]*?<!-- LUNAR_TODAY:END -->/;
  if (!markerRe.test(out)) throw new Error('inject-lunar-today: LUNAR_TODAY markers not found');
  out = out.replace(markerRe, `<!-- LUNAR_TODAY:START -->\n                <p class="hero-today-summary" id="lunar-today-summary">${escapeHtml(summary)}</p>\n                <!-- LUNAR_TODAY:END -->`);

  // Bloc
  out = setElementText(out, 'bloc-solar-weekday', a.weekday);
  out = setElementText(out, 'bloc-solar-day', String(a.solar.day).padStart(2, '0'));
  out = setElementText(out, 'bloc-solar-meta', `Tháng ${a.solar.month} năm ${a.solar.year}`);
  out = setElementText(out, 'bloc-lunar-day', a.lunar.day === 1 ? 'Mùng 1' : String(a.lunar.day));
  out = setElementText(out, 'bloc-lunar-month', `Tháng ${a.lunarMonthName}${a.lunar.isLeapMonth ? ' (nhuận)' : ''} Âm Lịch`);
  out = setElementText(out, 'bloc-canchi', `Ngày ${a.canChi.day.can} ${a.canChi.day.chi}`);

  // Details
  out = setElementText(out, 'detail-canchi', `Ngày ${a.canChi.day.can} ${a.canChi.day.chi}, Tháng ${a.canChi.month.can} ${a.canChi.month.chi}, Năm ${a.canChi.year.can} ${a.canChi.year.chi}`);
  out = setElementText(out, 'detail-tiet-nguhanh', `Tiết khí: ${a.solarTerm} | Ngũ hành ngày: ${a.napAm.element} (${a.napAm.name})`);
  out = setElementText(out, 'detail-truc', `Trực ${a.truc.name}`);
  out = setElementText(out, 'detail-sao', `Sao ${a.star.star} (${statusLabel})`);
  out = setElementText(out, 'detail-gio-hoangdao', hourList(a.luckyHours.good));
  out = setElementText(out, 'detail-gio-hacdao', hourList(a.luckyHours.bad));
  out = setElementText(out, 'detail-huong-xuathanh', `Hỷ Thần: ${a.directions.hyThan} | Tài Thần: ${a.directions.taiThan}`);
  out = setElementText(out, 'detail-tuoi-xungkhac', a.conflictAges.join(', '));
  out = setElementText(out, 'detail-viec-nenlam', `${a.truc.nen.join(', ')}.`);
  out = setElementText(out, 'detail-viec-kiengky', `${a.truc.kieng.join(', ')}.`);

  // Badge: class + text
  out = out.replace(/class="details-badge-(good|bad)" id="day-status-badge"/, `class="details-badge-${isGood ? 'good' : 'bad'}" id="day-status-badge"`);
  out = setElementText(out, 'day-status-badge', statusLabel);

  // FAQ text
  out = setElementText(out, 'faq-lunar-text', `${lunarLabel(a)} (ngày ${a.canChi.day.can} ${a.canChi.day.chi})`);
  out = setElementText(out, 'faq-hours-text', goodChis);
  out = setElementText(out, 'faq-status-text', `${statusLabel.toLowerCase()} (sao ${a.star.star}, trực ${a.truc.name})`);

  // Title + meta description
  out = out.replace(/<title>[^<]*<\/title>/, `<title>Lịch Âm Hôm Nay Ngày ${solarText} - Xem Lịch Âm Dương, Giờ Hoàng Đạo${SITE_SUFFIX}</title>`);
  const metaDescription = `Lịch âm hôm nay ${solarText}: ngày ${lunarLabel(a)}, ngày ${a.canChi.day.can} ${a.canChi.day.chi}, giờ hoàng đạo ${goodChis}, hướng xuất hành, tuổi xung, việc nên làm.${SHORT_DISCLAIMER}`;
  out = out.replace(/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(metaDescription)}$2`);

  // FAQ JSON-LD
  const faqRe = /(<script type="application\/ld\+json" id="faq-schema">)[\s\S]*?(<\/script>)/;
  if (!faqRe.test(out)) throw new Error('inject-lunar-today: faq-schema block not found');
  const faqJson = JSON.stringify(buildFaqSchema(a, solarText, statusLabel), null, 4).replace(/<\//g, '<\\/');
  out = out.replace(faqRe, `$1\n    ${faqJson.replace(/\n/g, '\n    ')}\n    $2`);

  return out;
}

function main() {
  const today = getVietnamToday();
  const html = fs.readFileSync(TARGET, 'utf8');
  const out = injectLunarToday(html, today);
  if (out !== html) {
    fs.writeFileSync(TARGET, out, 'utf8');
    console.log(`inject-lunar-today: updated for ${formatSolar(today)}`);
  } else {
    console.log('inject-lunar-today: no change');
  }
}

if (require.main === module) {
  main();
}

module.exports = { injectLunarToday, getVietnamToday };

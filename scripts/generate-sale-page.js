const fs = require('node:fs');
const path = require('node:path');
const { SALE_DAYS } = require('../data/sale-days.js');

const root = path.resolve(__dirname, '..');
const canonical = 'https://saptet.vn/sap-san-sale/';

function render(todayKey) {
  const next = SALE_DAYS.getNextSale(todayKey);
  const [year, month, day] = next.dateKey.split('-').map(Number);
  const date = `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  const answer = `Còn ${next.daysUntil} ngày nữa đến ngày sale đôi ${next.label} (${date}) theo giờ Việt Nam.`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebPage', '@id': `${canonical}#webpage`, url: canonical, name: `Còn bao nhiêu ngày nữa đến ngày sale đôi ${next.label}?`, description: answer, inLanguage: 'vi-VN', dateModified: todayKey },
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Trang chủ', item: 'https://saptet.vn/' }, { '@type': 'ListItem', position: 2, name: 'Sắp Săn Sale', item: canonical }] }
    ]
  };
  const currentMonth = Number(todayKey.split('-')[1]);
  const replacements = {
    LABEL: next.label, DAYS: next.daysUntil, DATE: date, ANSWER: answer,
    TODAY_HIDDEN: SALE_DAYS.isDoubleDay(todayKey) ? '' : 'hidden',
    TODAY_NOTE: SALE_DAYS.isDoubleDay(todayKey) ? `Hôm nay là ngày đôi ${currentMonth}.${currentMonth}. Hãy kiểm tra thời gian ưu đãi tại từng cửa hàng.` : '',
    SCHEMA: JSON.stringify(schema).replace(/</g, '\\u003c')
  };
  return Object.entries(replacements).reduce((html, [key, value]) => html.split(`{{${key}}}`).join(String(value)), fs.readFileSync(path.join(root, 'templates/sale-countdown.html'), 'utf8'));
}

function updateSitemap(todayKey) {
  const file = path.join(root, 'sitemap.xml');
  const current = fs.readFileSync(file, 'utf8');
  const withoutSale = current.replace(/\s*<url>\s*<loc>https:\/\/saptet\.vn\/sap-san-sale\/<\/loc>[\s\S]*?<\/url>/g, '');
  const entry = `\n    <url>\n        <loc>${canonical}</loc>\n        <lastmod>${todayKey}</lastmod>\n        <changefreq>daily</changefreq>\n        <priority>0.76</priority>\n    </url>`;
  fs.writeFileSync(file, withoutSale.replace('\n</urlset>', `${entry}\n</urlset>`));
}

function main() {
  const todayKey = SALE_DAYS.vietnamTodayKey();
  const target = path.join(root, 'sap-san-sale/index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(todayKey));
  updateSitemap(todayKey);
  console.log(`generate-sale-page: ${todayKey} -> ${SALE_DAYS.getNextSale(todayKey).dateKey}`);
}

if (require.main === module) main();
module.exports = { render, updateSitemap };

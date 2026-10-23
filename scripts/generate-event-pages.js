/**
 * Sinh trang tổng hợp và các trang sự kiện tĩnh cho GitHub Pages.
 * Chạy: node scripts/generate-event-pages.js
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SITE_ORIGIN = 'https://saptet.vn';
const HUB_URL = `${SITE_ORIGIN}/su-kien-quan-trong.html`;
const PUBLISHED_AT = '2026-09-04';
const { EVENTS_DATA } = require(path.join(ROOT, 'data/events-data.js'));
const { EVENTS_CONTENT } = require(path.join(ROOT, 'data/events-content.js'));
const { lunarToSolar } = require(path.join(ROOT, 'js/lunar-calendar.js'));
const occasionCatalog = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/occasion-gifts.json'), 'utf8'));
const occasionProducts = new Map(JSON.parse(fs.readFileSync(path.join(ROOT, 'data/aff/products'), 'utf8')).data.products
  .filter((product) => product.editorialId)
  .map((product) => [product.editorialId, product]));

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, content) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content, 'utf8');
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function compact(value, maxLength) {
  const text = String(value).replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).replace(/\s+\S*$/, '')}…`;
}

function signature(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 16);
}

const EVENTS_ASSET_VERSION = signature(read('css/events-page.css'));

function currentLastmod(targetFile, nextSignature) {
  const target = path.join(ROOT, targetFile);
  if (!fs.existsSync(target)) return EVENTS_DATA.getVietnamTodayKey();
  const html = fs.readFileSync(target, 'utf8');
  const existingSignature = html.match(/name="saptet:generated-signature" content="([^"]+)"/)?.[1];
  const existingModified = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  return existingSignature === nextSignature && existingModified
    ? existingModified
    : EVENTS_DATA.getVietnamTodayKey();
}

function replaceTokens(template, values) {
  return Object.entries(values).reduce(
    (html, [key, value]) => html.split(`{{${key}}}`).join(String(value)),
    template,
  );
}

function dateParts(dateKey) {
  const [year, month, day] = dateKey.split('-').map(Number);
  return { year, month, day };
}

function formatDateShort(dateKey) {
  const { year, month, day } = dateParts(dateKey);
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
}

function formatDateLong(dateKey) {
  const { year, month, day } = dateParts(dateKey);
  const weekdays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const weekday = weekdays[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday}, ${day} tháng ${month}, ${year}`;
}

function formatDateLongEnglish(dateKey) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(`${dateKey}T00:00:00Z`));
}

function lunarLabel(event) {
  const label = event.lunarLabel || `${event.lunarDay}/${event.lunarMonth}`;
  return /âm lịch/i.test(label) ? label : `${label} âm lịch`;
}

function categoryLabel(event) {
  if (event.category === 'lunar') return 'Sự kiện âm lịch';
  if (event.category === 'international') return 'Ngày quốc tế';
  return 'Ngày đáng nhớ tại Việt Nam';
}

function calendarLabel(event) {
  return event.category === 'lunar' ? 'Âm lịch' : 'Dương lịch';
}

function isHoliday(event) {
  return event.isHoliday === true || event.isNationalHoliday === true;
}

function eventUrl(event) {
  return `${SITE_ORIGIN}/su-kien/${event.slug}/`;
}

function countdownLabel(days) {
  if (days === 0) return 'Diễn ra hôm nay';
  if (days === 1) return 'Diễn ra ngày mai';
  return `Còn ${days} ngày`;
}

function countdownAnswer(event, occurrence) {
  const date = formatDateShort(occurrence.dateKey);
  if (occurrence.daysUntil === 0) return `Hôm nay là ${event.name} ${occurrence.year}, ngày ${date}.`;
  return `Còn ${occurrence.daysUntil} ngày nữa đến ${event.name} ${occurrence.year}, ${formatDateLong(occurrence.dateKey).split(',')[0]}, ngày ${date}.`;
}

function countdownQuestion(event, occurrence) {
  const query = event.countdownQuery;
  const separator = /^\d{1,2}\/\d{1,2}$/.test(query) ? '/' : ' ';
  return `Còn bao nhiêu ngày nữa đến ${query}${separator}${occurrence.year}?`;
}

function badgeHtml(event, occurrence) {
  const badges = [
    `<span class="events-badge${event.category === 'lunar' ? ' events-badge--lunar' : ''}">${calendarLabel(event)}</span>`,
  ];
  if (event.category === 'international') badges.push('<span class="events-badge events-badge--international">Quốc tế</span>');
  if (isHoliday(event)) badges.push('<span class="events-badge events-badge--holiday">Ngày nghỉ lễ</span>');
  if (occurrence.daysUntil <= 7) badges.push(`<span class="events-badge events-badge--soon">${escapeHtml(countdownLabel(occurrence.daysUntil))}</span>`);
  return badges.join('');
}

function cardHtml(item) {
  const { event, occurrence } = item;
  const search = [event.name, event.description, event.lunarLabel, ...(EVENTS_CONTENT.getEventContent(event.id).keywords || [])].filter(Boolean).join(' ');
  const calendarNote = event.category === 'lunar' ? `${lunarLabel(event)} · ${formatDateShort(occurrence.dateKey)}` : `${formatDateShort(occurrence.dateKey)} dương lịch`;
  return `
          <article class="events-index-card" data-event-card data-category="${event.category}" data-holiday="${isHoliday(event)}" data-search="${escapeHtml(search)}">
            <a class="events-index-card-link" href="/su-kien/${event.slug}/" aria-label="Xem ${escapeHtml(event.name)}">
              <span class="events-date-tile" aria-hidden="true"><strong>${occurrence.day}</strong><span>Tháng ${occurrence.month}</span></span>
              <div class="events-index-card-body">
                <h3>${escapeHtml(event.name)}</h3>
                <p class="events-card-date">${escapeHtml(calendarNote)} · <span data-event-countdown data-date="${occurrence.dateKey}">${escapeHtml(countdownLabel(occurrence.daysUntil))}</span></p>
                <p class="events-card-description">${escapeHtml(event.description)}</p>
                <div class="events-card-meta">${badgeHtml(event, occurrence)}</div>
              </div>
              <span class="events-card-arrow" aria-hidden="true"><i data-lucide="arrow-up-right"></i></span>
            </a>
          </article>`;
}

function giftSectionHtml(event) {
  const collection = occasionCatalog.collections[event.id];
  if (!collection || collection.type === 'none') return '';
  if (!Array.isArray(collection.productIds) || collection.productIds.length !== 10) {
    throw new Error(`Occasion ${event.id} must have exactly 10 products`);
  }
  const featured = collection.productIds.slice(0, 4).map((id) => {
    const product = occasionProducts.get(id);
    if (!product) throw new Error(`Missing occasion product ${id}`);
    const name = product.occasionName || product.name;
    return `<a class="event-gift-card" href="${escapeHtml(product.url)}" target="_blank" rel="noopener noreferrer nofollow" aria-label="Xem ${escapeHtml(name)} trên Shopee">
              <span class="event-gift-image"><img src="${escapeHtml(product.thumbnail)}" alt="" loading="lazy"></span>
              <strong>${escapeHtml(name)}</strong><span class="event-gift-platform">Xem trên Shopee <span aria-hidden="true">↗</span></span>
            </a>`;
  }).join('');
  return `        <section class="event-gifts" aria-labelledby="event-gifts-title">
          <div class="event-gifts-heading"><div><p class="event-gifts-kicker">${collection.type === 'prepare' ? 'Sắm sửa theo dịp' : 'Quà theo dịp'}</p><h2 id="event-gifts-title">${escapeHtml(collection.title)}</h2><p>${escapeHtml(collection.intro)}</p></div><span class="event-gifts-count">10 món được chọn</span></div>
          <div class="event-gift-grid">${featured}</div>
          <div class="event-gifts-footer"><p>Giá và tình trạng hàng được xác nhận trên Shopee khi mở sản phẩm.</p><a href="/cua-hang.html?occasion=${encodeURIComponent(event.slug)}">Xem đủ 10 món &amp; tạo giỏ gợi ý <span aria-hidden="true">→</span></a></div>
        </section>`;
}

function nextEventHtml(item) {
  const { event, occurrence } = item;
  const calendarNote = event.category === 'lunar' ? `${lunarLabel(event)} · ${formatDateShort(occurrence.dateKey)}` : `${formatDateShort(occurrence.dateKey)} dương lịch`;
  return `<aside class="events-next-card" aria-labelledby="next-event-title">
        <p class="events-next-label"><i data-lucide="sparkles" aria-hidden="true"></i>Sự kiện gần nhất</p>
        <div class="events-next-layout">
          <span class="events-date-tile" aria-hidden="true"><strong>${occurrence.day}</strong><span>Tháng ${occurrence.month}</span></span>
          <div>
            <h2 id="next-event-title">${escapeHtml(event.name)}</h2>
            <p class="events-next-date">${escapeHtml(calendarNote)}</p>
            <p class="events-next-countdown" data-event-countdown data-date="${occurrence.dateKey}">${escapeHtml(countdownLabel(occurrence.daysUntil))}</p>
          </div>
        </div>
        <a class="events-next-link" href="/su-kien/${event.slug}/">Xem ý nghĩa &amp; chi tiết <i data-lucide="arrow-right" aria-hidden="true"></i></a>
      </aside>`;
}

function hubSchema(items, modified) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${HUB_URL}#webpage`,
        url: HUB_URL,
        name: `Lịch sự kiện sắp tới ${dateParts(items[0].occurrence.dateKey).year}`,
        description: `Tra cứu ${items.length} ngày lễ và sự kiện sắp tới tại Việt Nam theo âm lịch và dương lịch.`,
        inLanguage: 'vi-VN',
        dateModified: modified,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        mainEntity: { '@id': `${HUB_URL}#event-list` },
      },
      {
        '@type': 'ItemList',
        '@id': `${HUB_URL}#event-list`,
        numberOfItems: items.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.event.name,
          url: eventUrl(item.event),
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Sự kiện quan trọng', item: HUB_URL },
        ],
      },
    ],
  };
}

function generateHub(items) {
  const template = read('templates/events-index.html');
  const nextSignature = signature({
    items: items.map(({ event, occurrence }) => [event.id, occurrence.dateKey, event.description]),
    template,
    eventsAssetVersion: EVENTS_ASSET_VERSION,
  });
  const modified = currentLastmod('su-kien-quan-trong.html', nextSignature);
  const html = replaceTokens(template, {
    YEAR: dateParts(items[0].occurrence.dateKey).year,
    ASSET_VERSION: EVENTS_ASSET_VERSION,
    SIGNATURE: nextSignature,
    SCHEMA: JSON.stringify(hubSchema(items, modified), null, 2).replace(/</g, '\\u003c'),
    NEXT_EVENT: nextEventHtml(items[0]),
    EVENT_CARDS: items.map(cardHtml).join(''),
  });
  write('su-kien-quan-trong.html', html);
  write(
    'su-kien-quan-trong/index.html',
    html.replace(
      '<meta name="robots" content="index, follow, max-image-preview:large">',
      '<meta name="robots" content="noindex, follow, max-image-preview:large">',
    ),
  );
  return modified;
}

function makeFaq(event, occurrence, content) {
  const dateAnswer = event.category === 'lunar'
    ? `${event.name} lần tới rơi vào ${formatDateLong(occurrence.dateKey)}, tương ứng ${lunarLabel(event)}. Ngày dương sẽ thay đổi theo từng năm.`
    : `${event.name} diễn ra vào ${formatDateShort(occurrence.dateKey)}. ${event.nthWeekday ? 'Ngày dương lịch thay đổi theo từng năm.' : 'Đây là ngày dương lịch cố định hằng năm.'}`;
  const holidayAnswer = isHoliday(event)
    ? `${event.name} được đánh dấu là ngày nghỉ lễ chính thức. Lịch nghỉ, nghỉ bù hoặc hoán đổi ngày làm việc cần đối chiếu thông báo áp dụng cho từng năm.`
    : `${event.name} không được đánh dấu là ngày nghỉ lễ chính thức trong danh mục này. Lịch làm việc của từng cơ quan, trường học hoặc doanh nghiệp có thể khác nhau.`;
  const activityAnswer = `Bạn có thể ${content.activities.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join('; ')}.`;
  const faq = [
    { question: `${event.name} lần tới là ngày nào?`, answer: dateAnswer },
    { question: `${event.name} có được nghỉ không?`, answer: holidayAnswer },
    { question: `Nên làm gì vào ${event.name}?`, answer: activityAnswer },
  ];
  if (event.countdownQuery) {
    faq.unshift({ question: countdownQuestion(event, occurrence), answer: countdownAnswer(event, occurrence), liveDate: occurrence.dateKey });
  }
  return faq;
}

function relatedItems(currentIndex, items) {
  if (currentIndex <= items.length - 4) return items.slice(currentIndex + 1, currentIndex + 4);
  return items.slice(Math.max(0, currentIndex - 3), currentIndex);
}

function detailSchema(event, occurrence, modified, description, headline) {
  const canonical = eventUrl(event);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: headline,
        description,
        inLanguage: 'vi-VN',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        mainEntity: { '@id': `${canonical}#article` },
      },
      {
        '@type': 'Article',
        '@id': `${canonical}#article`,
        mainEntityOfPage: { '@id': `${canonical}#webpage` },
        headline,
        description,
        image: [`${SITE_ORIGIN}/assets/images/img_sharing.png`],
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        author: { '@type': 'Organization', name: 'Sắp Tết', url: `${SITE_ORIGIN}/` },
        publisher: { '@type': 'Organization', name: 'Sắp Tết', url: `${SITE_ORIGIN}/` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: `${SITE_ORIGIN}/` },
          { '@type': 'ListItem', position: 2, name: 'Sự kiện', item: HUB_URL },
          { '@type': 'ListItem', position: 3, name: event.name, item: canonical },
        ],
      },
    ],
  };
}

function generateDetail(item, index, items) {
  const { event, occurrence } = item;
  const content = EVENTS_CONTENT.getEventContent(event.id);
  const faq = makeFaq(event, occurrence, content);
  const canonical = eventUrl(event);
  const countdownPage = !!event.countdownQuery;
  const headline = countdownPage ? countdownQuestion(event, occurrence) : `${event.name} ${occurrence.year} là ngày nào?`;
  const description = compact(countdownPage
    ? `${countdownAnswer(event, occurrence)} Xem đếm ngược, ngày diễn ra và ý nghĩa ${event.name}.`
    : `${event.name} ${occurrence.year} diễn ra ngày ${formatDateShort(occurrence.dateKey)}. Xem đếm ngược, ý nghĩa, hoạt động gợi ý và thông tin ngày nghỉ.`, 158);
  const target = `su-kien/${event.slug}/index.html`;
  const template = read('templates/event-detail.html');
  const nextSignature = signature({
    event,
    occurrence: occurrence.dateKey,
    content,
    occasion: occasionCatalog.collections[event.id],
    occasionProducts: (occasionCatalog.collections[event.id].productIds || []).slice(0, 4).map((id) => {
      const product = occasionProducts.get(id);
      return product && [product.occasionName, product.thumbnail, product.url];
    }),
    faq,
    template,
    eventsAssetVersion: EVENTS_ASSET_VERSION,
  });
  const modified = currentLastmod(target, nextSignature);
  const whenContent = event.category === 'lunar'
    ? `<p${event.englishName ? ` data-en="${escapeHtml(`${event.englishName} falls on lunar ${event.lunarDay}/${event.lunarMonth}. The next occurrence is ${formatDateShort(occurrence.dateKey)} (Gregorian). Its Gregorian date changes every year.`)}"` : ''}><strong>${escapeHtml(lunarLabel(event))}</strong> lần tới tương ứng <strong>${formatDateShort(occurrence.dateKey)}</strong> dương lịch. Vì là ngày âm, mốc dương lịch sẽ thay đổi qua từng năm.</p><p${event.englishName ? ' data-en="This page shows the next occurrence in Vietnam time so you can plan ahead."' : ''}>Trang này luôn ưu tiên lần diễn ra gần nhất tính theo múi giờ Việt Nam, giúp bạn lên kế hoạch mà không phải dò lại ngày đã qua.</p>`
    : event.nthWeekday
      ? `<p><strong>${escapeHtml(event.name)}</strong> là <strong${event.englishName ? ` data-en="${event.id === 'solar-black-friday' ? 'the fourth Friday in November' : event.id === 'solar-ngay-cua-me' ? 'the second Sunday in May' : 'the third Sunday in June'}"` : ''}>${event.nthWeekday.nth === 4 ? 'thứ Sáu thứ tư tháng 11' : `Chủ Nhật thứ ${event.nthWeekday.nth} tháng ${event.month}`}</strong> hằng năm. Lần tiếp theo là <strong${event.englishName ? ` data-en="${escapeHtml(formatDateLongEnglish(occurrence.dateKey))}"` : ''}>${formatDateLong(occurrence.dateKey)}</strong>; ngày dương lịch thay đổi theo từng năm.</p><p>Đếm ngược tính theo ngày tại Việt Nam.${event.id === 'solar-black-friday' ? ' Thời điểm khuyến mãi của từng cửa hàng có thể khác ngày trên lịch.' : ''}</p>`
      : `<p><strong>${escapeHtml(event.name)}</strong> được ghi nhận vào ngày <strong>${String(event.day).padStart(2, '0')}/${String(event.month).padStart(2, '0')}</strong> dương lịch hằng năm. Lần tiếp theo là <strong${event.englishName ? ` data-en="${escapeHtml(formatDateLongEnglish(occurrence.dateKey))}"` : ''}>${formatDateLong(occurrence.dateKey)}</strong>.</p><p>Trạng thái đếm ngược được tính theo ngày tại Việt Nam và tự cập nhật khi bạn mở trang.</p>`;
  const related = relatedItems(index, items).map(({ event: relatedEvent, occurrence: relatedOccurrence }) => `
            <a class="event-related-card" href="/su-kien/${relatedEvent.slug}/">
              <span>${formatDateShort(relatedOccurrence.dateKey)} · ${calendarLabel(relatedEvent)}</span>
              <strong>${escapeHtml(relatedEvent.name)}</strong>
            </a>`).join('');
  let html = replaceTokens(template, {
    TITLE: escapeHtml(countdownPage ? `${headline} | Sắp Tết` : `${headline} Ý nghĩa & đếm ngược | Sắp Tết`),
    META_DESCRIPTION: escapeHtml(description),
    CANONICAL: canonical,
    OG_TITLE: escapeHtml(`${headline} | Sắp Tết`),
    ASSET_VERSION: EVENTS_ASSET_VERSION,
    SIGNATURE: nextSignature,
    SCHEMA: JSON.stringify(detailSchema(event, occurrence, modified, description, headline), null, 2).replace(/</g, '\\u003c'),
    EVENT_NAME: escapeHtml(event.name),
    EVENT_SLUG: escapeHtml(event.slug),
    CATEGORY_LABEL: escapeHtml(categoryLabel(event)),
    H1: escapeHtml(headline),
    DESCRIPTION: escapeHtml(event.description),
    BADGES: badgeHtml(event, occurrence),
    DATE_LONG: escapeHtml(formatDateLong(occurrence.dateKey)),
    CALENDAR_NOTE: escapeHtml(event.category === 'lunar' ? lunarLabel(event) : event.nthWeekday ? 'Ngày dương lịch thay đổi hằng năm' : 'Ngày dương lịch cố định hằng năm'),
    DATE_KEY: occurrence.dateKey,
    COUNTDOWN: escapeHtml(countdownLabel(occurrence.daysUntil)),
    WHEN_CONTENT: whenContent,
    CONTEXT: escapeHtml(content.context),
    ACTIVITIES: content.activities.map((activity) => `<li>${escapeHtml(activity)}</li>`).join(''),
    GIFT_SECTION: giftSectionHtml(event),
    TIP: escapeHtml(content.tip),
    FAQ: faq.map((item) => `<details><summary>${escapeHtml(item.question)}</summary><p${item.liveDate ? ` data-event-answer data-date="${item.liveDate}" data-event-name="${escapeHtml(event.name)}"` : ''}>${escapeHtml(item.answer)}</p></details>`).join(''),
    RELATED: related,
    DATE_SHORT: formatDateShort(occurrence.dateKey),
    CALENDAR_TYPE: calendarLabel(event),
    HOLIDAY_ROW: isHoliday(event) ? '            <div><dt>Ngày nghỉ lễ</dt><dd>Có</dd></div>' : '',
  });
  if (countdownPage) {
    const lead = `<p class="event-article-lead">${escapeHtml(event.description)}</p>`;
    if (!html.includes(lead)) throw new Error('Event lead not found');
    html = html.replace(lead, `${lead}\n        <p class="event-article-lead" data-event-answer data-date="${occurrence.dateKey}" data-event-name="${escapeHtml(event.name)}">${escapeHtml(countdownAnswer(event, occurrence))}</p>`);
  }
  write(target, html);
  return { event, lastmod: modified };
}

function updateSitemap(details, hubLastmod) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemap = sitemap.replace(/\s*<!-- Event detail pages -->/g, '');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/saptet\.vn\/chi-tiet-su-kien\.html<\/loc>[\s\S]*?<\/url>/g, '');
  sitemap = sitemap.replace(/\s*<url>\s*<loc>https:\/\/saptet\.vn\/su-kien\/[^<]+<\/loc>[\s\S]*?<\/url>/g, '');
  sitemap = sitemap.replace(
    /(<loc>https:\/\/saptet\.vn\/su-kien-quan-trong\.html<\/loc>\s*<lastmod>)[^<]+/,
    `$1${hubLastmod}`,
  );
  const entries = details.map(({ event, lastmod }) => `
    <url>
        <loc>${eventUrl(event)}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>yearly</changefreq>
        <priority>0.72</priority>
    </url>`).join('');
  sitemap = sitemap.replace('\n</urlset>', `\n    <!-- Event detail pages -->${entries}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

function main() {
  const items = EVENTS_DATA.getUpcomingEvents({ lunarToSolar });
  if (items.length !== EVENTS_DATA.getAllEvents().length) throw new Error('Some event dates could not be generated');
  const hubLastmod = generateHub(items);
  const details = items.map((item, index) => generateDetail(item, index, items));
  updateSitemap(details, hubLastmod);
  console.log(`generate-event-pages: wrote hub and ${details.length} event pages`);
}

if (require.main === module) main();

module.exports = {
  countdownAnswer,
  teacherCountdownAnswer: (occurrence) => countdownAnswer({ name: 'Ngày Nhà giáo Việt Nam' }, occurrence),
};

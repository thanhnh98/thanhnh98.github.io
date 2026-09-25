/**
 * Sinh các trang đếm ngược tiếng Anh (/christmas, /ramadan, …) và hub /countdowns.
 * Dữ liệu: data/holidays-en.js. Template: templates/holiday-countdown.html, templates/holidays-index.html.
 * Chạy: node scripts/generate-holiday-pages.js (cũng chạy hằng ngày trong seo-daily-update.yml
 * để số ngày pre-render cho SEO luôn đúng).
 */
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.join(__dirname, '..');
const SITE_ORIGIN = 'https://saptet.vn';
const HUB_SLUG = 'countdowns';
const SITEMAP_MARKER = '<!-- Holiday countdown pages (EN) -->';
const PUBLISHED_AT = '2026-09-25';
const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
const OG_SIZE = { width: 1200, height: 630 };
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;
// Thành phố cho bảng "khi nào bắt đầu" ở trang scope 'global' (xếp theo thời điểm tới).
const WORLD_CITIES = [
  { zone: 'Pacific/Kiritimati', label: 'Kiritimati, Kiribati' },
  { zone: 'Pacific/Auckland', label: 'Auckland' },
  { zone: 'Australia/Sydney', label: 'Sydney' },
  { zone: 'Asia/Tokyo', label: 'Tokyo' },
  { zone: 'Asia/Manila', label: 'Manila' },
  { zone: 'Asia/Singapore', label: 'Singapore' },
  { zone: 'Asia/Ho_Chi_Minh', label: 'Ho Chi Minh City' },
  { zone: 'Asia/Kolkata', label: 'Mumbai & New Delhi' },
  { zone: 'Asia/Dubai', label: 'Dubai' },
  { zone: 'Europe/Berlin', label: 'Berlin & Paris' },
  { zone: 'Europe/London', label: 'London' },
  { zone: 'America/Sao_Paulo', label: 'São Paulo' },
  { zone: 'America/New_York', label: 'New York & Toronto' },
  { zone: 'America/Chicago', label: 'Chicago' },
  { zone: 'America/Los_Angeles', label: 'Los Angeles & Vancouver' },
  { zone: 'Pacific/Honolulu', label: 'Honolulu' },
];
const { HOLIDAYS_EN, HOLIDAY_CATEGORIES, GLOBAL_ZONE_CHOICES } = require(path.join(ROOT, 'data/holidays-en.js'));
const ZonedTime = require(path.join(ROOT, 'js/zoned-time.js'));
const { HOLIDAYS_AR, UI_AR } = require(path.join(ROOT, 'data/holidays-ar.js'));

// Mốc "hôm nay" cho nội dung pre-render: trang global dùng UTC, trang national dùng zone của nước đó.
const SEO_ZONE_GLOBAL = 'UTC';
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, content) {
  fs.writeFileSync(path.join(ROOT, file), content, 'utf8');
}

function escapeHtml(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function signature(value) {
  return crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex').slice(0, 16);
}

function replaceTokens(template, values) {
  const html = Object.entries(values).reduce(
    (out, [key, value]) => out.split(`{{${key}}}`).join(String(value)),
    template,
  );
  const leftover = html.match(/\{\{[A-Z_]+\}\}/);
  if (leftover) throw new Error(`Unreplaced token ${leftover[0]}`);
  return html;
}

function jsonLd(value) {
  return JSON.stringify(value, null, 2).replace(/</g, '\\u003c');
}

const ASSET_VERSION = signature([
  read('css/holiday-countdown.css'),
  read('js/holiday-countdown.js'),
  read('js/zoned-time.js'),
]);

function dateKey(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function easterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return dateKey(year, month, day);
}

function nthWeekday(year, month, weekday, nth) {
  const firstWeekday = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const day = 1 + ((weekday - firstWeekday + 7) % 7) + (nth - 1) * 7;
  return dateKey(year, month, day);
}

// Danh sách ngày cụ thể nhúng vào trang để runtime tự chuyển sang năm sau mà không cần deploy.
function resolveDates(holiday, currentYear) {
  const { rule } = holiday;
  if (rule.type === 'table') return rule.dates.slice().sort();
  const dates = [];
  for (let year = currentYear - 1; year <= currentYear + 5; year += 1) {
    if (rule.type === 'fixed') dates.push(dateKey(year, rule.month, rule.day));
    else if (rule.type === 'nth-weekday') dates.push(nthWeekday(year, rule.month, rule.weekday, rule.nth));
    else if (rule.type === 'easter') dates.push(easterSunday(year));
    else throw new Error(`Unknown rule ${rule.type} for ${holiday.slug}`);
  }
  return dates;
}

function parts(key) {
  const [year, month, day] = key.split('-').map(Number);
  return { year, month, day, weekday: WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()] };
}

function formatLong(key) {
  const p = parts(key);
  return `${p.weekday}, ${MONTHS[p.month - 1]} ${p.day}, ${p.year}`;
}

function formatShort(key) {
  const p = parts(key);
  return `${MONTHS[p.month - 1]} ${p.day}, ${p.year}`;
}

function formatTime(time) {
  const [h, m] = time.split(':').map(Number);
  const suffix = h < 12 ? 'AM' : 'PM';
  return `${h % 12 || 12}:${String(m).padStart(2, '0')} ${suffix}`;
}

function pageUrl(slug) {
  return `${SITE_ORIGIN}/${slug}`;
}

function seoZone(holiday) {
  return holiday.scope === 'national' ? holiday.zone : SEO_ZONE_GLOBAL;
}

function buildItem(holiday, now) {
  const zone = seoZone(holiday);
  const today = ZonedTime.todayKey(now, zone);
  const dates = resolveDates(holiday, Number(today.slice(0, 4)));
  const occurrence = ZonedTime.nextOccurrence({ ...holiday, dates }, now, zone);
  if (!occurrence) throw new Error(`${holiday.slug}: no upcoming date left in data/holidays-en.js — add more dates`);
  const upcoming = dates.filter((key) => key >= occurrence.dateKey);
  if (upcoming.length < 2) console.warn(`generate-holiday-pages: ${holiday.slug} has only ${upcoming.length} upcoming date(s) — extend its table`);
  return {
    holiday,
    dates,
    upcoming,
    occurrence,
    daysLeft: Math.max(0, ZonedTime.daysBetween(today, occurrence.dateKey)),
  };
}

// Chọn phương án đầu tiên vừa giới hạn độ dài (title ~60, description ~160 ký tự).
function fit(candidates, max, label) {
  const found = candidates.find((candidate) => candidate.length <= max);
  if (!found) throw new Error(`${label}: no candidate fits ${max} chars`);
  return found;
}

function titleFor(holiday, year) {
  return fit([
    `${holiday.name} Countdown ${year}: How Many Days Until ${holiday.name}?`,
    `${holiday.name} Countdown ${year}: How Many Days Left?`,
    `${holiday.name} Countdown ${year}`,
  ], TITLE_MAX, `${holiday.slug} title`);
}

function descriptionFor(item) {
  const { holiday, occurrence, daysLeft } = item;
  const year = occurrence.dateKey.slice(0, 4);
  if (occurrence.live) {
    return fit([
      `${holiday.name} ${year} is happening now. Live countdown to the next ${holiday.name} in days, hours, minutes and seconds.`,
      `${holiday.name} ${year} is happening now. Live countdown to the next ${holiday.name}.`,
    ], DESCRIPTION_MAX, `${holiday.slug} description`);
  }
  const when = `${expectedWord(holiday)}on ${formatLong(occurrence.dateKey)}`;
  const count = `${daysLeft} ${dayWord(daysLeft)}`;
  return fit([
    `How many days until ${holiday.name}? ${count} to go until ${holiday.name}, ${when}. Live countdown in days, hours, minutes and seconds.`,
    `How many days until ${holiday.name}? ${count} to go until ${holiday.name}, ${when}. Live countdown to the second.`,
    `${count} until ${holiday.name} ${year}, ${when}. Live countdown to the second.`,
  ], DESCRIPTION_MAX, `${holiday.slug} description`);
}

function ogImage(slug) {
  return `${SITE_ORIGIN}/assets/images/og/${slug}.jpg`;
}

function dayWord(days) {
  return days === 1 ? 'day' : 'days';
}

function expectedWord(holiday) {
  return holiday.moonDisclaimer ? 'expected ' : '';
}

function answerText(item) {
  const { holiday, occurrence, daysLeft } = item;
  const year = occurrence.dateKey.slice(0, 4);
  const when = formatLong(occurrence.dateKey);
  if (occurrence.live) return `${holiday.name} ${year} is happening now. It began on ${when}.`;
  const place = holiday.scope === 'national' ? ` (${holiday.zoneLabel} time)` : '';
  return `${holiday.name} ${year} is ${expectedWord(holiday)}on ${when}${place}. That is ${daysLeft} ${dayWord(daysLeft)} from today.`;
}

function targetText(item) {
  const { holiday, occurrence } = item;
  const at = formatTime(holiday.startTime);
  if (holiday.scope === 'national') {
    return `Starts at ${at} in ${holiday.zoneLabel} (${ZonedTime.formatOffset(occurrence.start, holiday.zone)})`;
  }
  return `Starts at ${at} in your time zone`;
}

function makeFaq(item) {
  const { holiday, occurrence, daysLeft, upcoming } = item;
  const year = occurrence.dateKey.slice(0, 4);
  const faq = [
    {
      q: `How many days until ${holiday.name}?`,
      a: occurrence.live
        ? `${holiday.name} ${year} is happening now. The countdown on this page will switch to the next ${holiday.name} automatically.`
        : `There are ${daysLeft} ${dayWord(daysLeft)} until ${holiday.name} ${year}, which is ${expectedWord(holiday)}on ${formatLong(occurrence.dateKey)}. The live countdown on this page updates every second.`,
    },
  ];
  const next = upcoming.find((key) => key.slice(0, 4) !== year);
  if (next) {
    faq.push({
      q: `When is ${holiday.name} ${next.slice(0, 4)}?`,
      a: `${holiday.name} ${next.slice(0, 4)} is ${expectedWord(holiday)}on ${formatLong(next)}.`,
    });
  }
  return faq.concat(holiday.faq);
}

function cardHtml(item) {
  const { holiday, dates, occurrence, daysLeft } = item;
  const zoneAttr = holiday.scope === 'national' ? ` data-zone="${holiday.zone}"` : '';
  const days = occurrence.live ? 'Today!' : `${daysLeft} ${dayWord(daysLeft)}`;
  return `
          <a class="hc-mini" href="/${holiday.slug}" data-hc-card data-dates="${dates.join(',')}" data-start-time="${holiday.startTime}" data-duration="${holiday.durationDays}"${zoneAttr}>
            <span class="hc-mini-body">
              <strong>${escapeHtml(holiday.name)}</strong>
              <span>${formatShort(occurrence.dateKey)} · ${escapeHtml(holiday.country)}</span>
            </span>
            <span class="hc-mini-days" data-hc-card-days>${days}</span>
          </a>`;
}

function headerHtml(items, languageLink = '') {
  const nav = ['christmas', 'new-year', 'halloween']
    .map((slug) => items.find((item) => item.holiday.slug === slug).holiday)
    .map((holiday) => `<a href="/${holiday.slug}">${escapeHtml(holiday.name)}</a>`)
    .join('');
  return `  <header class="hc-header">
    <div class="hc-container hc-header-inner">
      <a class="hc-brand" href="/${HUB_SLUG}"><img src="/assets/images/ic_app.png" alt="" width="32" height="32"><span>Countdowns</span></a>
      <nav class="hc-nav" aria-label="Countdowns">${nav}<a href="/${HUB_SLUG}">All</a>${languageLink}</nav>
    </div>
  </header>`;
}

function arabicUrl(slug) {
  return `${SITE_ORIGIN}/ar/${slug}`;
}

function footerHtml() {
  return `  <footer class="hc-footer">
    <div class="hc-container hc-footer-inner">
      <div>
        <p class="hc-footer-brand">Made by the team behind <a href="/" hreflang="vi" lang="vi">Sắp Tết</a></p>
        <p>Sắp Tết is the Lunar New Year countdown app followed by more than 100,000 people across Vietnam.</p>
      </div>
      <nav aria-label="Legal">
        <a href="/${HUB_SLUG}">All countdowns</a>
        <a href="/privacy-policy/en/">Privacy Policy</a>
        <a href="/terms-of-use/en/">Terms of Use</a>
        <a href="/support">Support</a>
        <a href="/" hreflang="vi" lang="vi">Tiếng Việt</a>
      </nav>
    </div>
  </footer>`;
}

function zonePickerHtml(holiday) {
  if (holiday.scope !== 'global') return '';
  const options = GLOBAL_ZONE_CHOICES
    .map((choice) => `<option value="${choice.zone}">${escapeHtml(choice.label)}</option>`)
    .join('');
  return `          <label class="hc-zone"><span aria-hidden="true">🌐</span><span class="hc-visually-hidden">Time zone</span>
            <select data-hc-zone name="timezone" autocomplete="off"><option value="local">My time zone</option>${options}</select>
          </label>`;
}

function hreflangHtml(holiday, canonical) {
  // Một URL tiếng Anh cho mọi quốc gia (en-US, en-GB, en-IN, …): khai báo 'en' + x-default.
  const links = [`  <link rel="alternate" hreflang="en" href="${canonical}">`];
  if (holiday && holiday.hreflangVi) links.push(`  <link rel="alternate" hreflang="vi" href="${holiday.hreflangVi}">`);
  if (holiday && HOLIDAYS_AR[holiday.slug]) links.push(`  <link rel="alternate" hreflang="ar" href="${arabicUrl(holiday.slug)}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${canonical}">`);
  return links.join('\n');
}

function paletteStyle(holiday) {
  const { paper, ink, accent, particle } = holiday.palette;
  return `--hc-paper:${paper};--hc-ink:${ink};--hc-accent:${accent};--hc-particle:${particle}`;
}

// Hiệu ứng nền ở hero. Vị trí/tốc độ lấy từ PRNG có seed theo slug để output ổn định giữa các lần chạy.
const PARTICLE_SHAPES = {
  leaf: '<path d="M4 20C4 10 10 4 20 4c0 10-6 16-16 16Zm0 0 9-9" fill="currentColor" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>',
  petal: '<path d="M12 3c3.5 3 5 6.5 5 9.5A5 5 0 0 1 12 18a5 5 0 0 1-5-5.5C7 9.5 8.5 6 12 3Z" fill="currentColor"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" fill="currentColor"/>',
  drop: '<path d="M12 3s6 6.7 6 11a6 6 0 0 1-12 0c0-4.3 6-11 6-11Z" fill="currentColor"/>',
  star: '<path d="M12 2l1.8 8.2L22 12l-8.2 1.8L12 22l-1.8-8.2L2 12l8.2-1.8Z" fill="currentColor"/>',
  bat: '<path d="M12 9.6c.4-.9 1-1.5 1.4-1.4l.3 1c1.4-2.2 4.2-3.6 8.3-3.4-1.2 1.2-1.6 3-1.2 5.2-1.6-.9-3.3-.7-4.4.6-.8-.8-2-.9-2.8-.1-.4 1.5-1 2.8-1.6 4.4-.6-1.6-1.2-2.9-1.6-4.4-.8-.8-2-.7-2.8.1-1.1-1.3-2.8-1.5-4.4-.6.4-2.2 0-4-1.2-5.2 4.1-.2 6.9 1.2 8.3 3.4l.3-1c.4-.1 1 .5 1.4 1.4Z" fill="currentColor"/>',
};
const PARTICLE_MOTION = {
  snow: 'fall', leaf: 'fall', petal: 'fall', confetti: 'fall', drop: 'rain',
  heart: 'rise', ember: 'rise', star: 'twinkle', bat: 'drift',
};
const PARTICLE_COUNT = { snow: 26, confetti: 22, drop: 18, ember: 18, star: 16, leaf: 12, petal: 14, heart: 12, bat: 7 };

function seededRandom(seedText) {
  let seed = 0;
  for (const char of seedText) seed = (seed * 31 + char.charCodeAt(0)) >>> 0;
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function skyHtml(holiday) {
  const kind = holiday.particles;
  const motion = PARTICLE_MOTION[kind];
  if (!motion) throw new Error(`${holiday.slug}: unknown particles ${kind}`);
  const random = seededRandom(holiday.slug);
  const round = (value, digits = 1) => Number(value.toFixed(digits));
  const shape = PARTICLE_SHAPES[kind];
  const items = [];
  for (let i = 0; i < PARTICLE_COUNT[kind]; i += 1) {
    const size = kind === 'snow' ? round(3 + random() * 6) : kind === 'ember' ? round(3 + random() * 4)
      : kind === 'bat' ? round(30 + random() * 22) : round(10 + random() * 12);
    const duration = motion === 'twinkle' ? round(2.4 + random() * 3) : motion === 'rain' ? round(2.2 + random() * 1.6)
      : motion === 'drift' ? round(16 + random() * 10) : round(9 + random() * 9);
    const vars = [
      `--x:${round(random() * 100)}%`,
      `--y:${round(random() * 90)}%`,
      `--s:${size}px`,
      `--t:${duration}s`,
      `--delay:${round(-random() * duration)}s`,
      `--sway:${round(20 + random() * 50)}px`,
      `--spin:${Math.round(120 + random() * 360)}deg`,
      `--o:${round(0.3 + random() * 0.35, 2)}`,
    ].join(';');
    const inner = shape ? `<svg viewBox="0 0 24 24" focusable="false">${shape}</svg>` : '';
    items.push(`<span class="hc-p" style="${vars}">${inner}</span>`);
  }
  return `<div class="hc-sky hc-sky--${kind} hc-sky--${motion}" aria-hidden="true" data-hc-sky>${items.join('')}</div>`;
}

function organizationNode() {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: 'Sắp Tết',
    url: `${SITE_ORIGIN}/`,
    logo: { '@type': 'ImageObject', url: `${SITE_ORIGIN}/assets/images/ic_app.png` },
  };
}

function regionsHtml(holiday) {
  return holiday.regions.map((region) => `
            <article class="hc-region">
              <h3>${escapeHtml(region.country)}</h3>
              <p>${escapeHtml(region.note)}</p>
            </article>`).join('');
}

function worldTimesHtml(item) {
  const { holiday, occurrence } = item;
  if (holiday.scope !== 'global') return '';
  const rows = WORLD_CITIES
    .map((city) => ({ ...city, start: ZonedTime.zonedWallTimeToUtc(occurrence.dateKey, holiday.startTime, city.zone) }))
    .sort((a, b) => a.start - b.start)
    .map((city) => {
      const utc = new Date(city.start).toISOString();
      const utcLabel = `${MONTHS[Number(utc.slice(5, 7)) - 1].slice(0, 3)} ${Number(utc.slice(8, 10))}, ${utc.slice(11, 16)} UTC`;
      return `<tr><th scope="row">${escapeHtml(city.label)}</th><td>${utcLabel}</td><td data-hc-your-time="${city.start}">—</td></tr>`;
    }).join('');
  const year = occurrence.dateKey.slice(0, 4);
  return `
          <h3>When does ${escapeHtml(holiday.name)} ${year} start around the world?</h3>
          <p>${escapeHtml(holiday.name)} begins at ${formatTime(holiday.startTime)} local time, so it reaches the islands of Kiribati first and Hawaii last. Here is when it starts in major cities, and what time that is for you.</p>
          <div class="hc-table-wrap">
            <table class="hc-table">
              <thead><tr><th scope="col">City</th><th scope="col">Starts (UTC)</th><th scope="col">Your time</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>`;
}

function detailSchema(item, faq, canonical, description, modified) {
  const { holiday, occurrence } = item;
  const image = ogImage(holiday.slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: titleFor(holiday, occurrence.dateKey.slice(0, 4)),
        description,
        inLanguage: 'en',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        isPartOf: { '@type': 'WebSite', name: 'saptet.vn', url: `${SITE_ORIGIN}/` },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, ...OG_SIZE },
        about: {
          '@type': 'Thing',
          name: holiday.name,
          alternateName: holiday.aliases,
          sameAs: holiday.wikipedia,
        },
      },
      organizationNode(),
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Countdowns', item: pageUrl(HUB_SLUG) },
          { '@type': 'ListItem', position: 2, name: holiday.name, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((entry) => ({
          '@type': 'Question',
          name: entry.q,
          acceptedAnswer: { '@type': 'Answer', text: entry.a },
        })),
      },
    ],
  };
}

function currentModified(file, nextSignature, today) {
  const target = path.join(ROOT, file);
  if (!fs.existsSync(target)) return today;
  const html = fs.readFileSync(target, 'utf8');
  const existingSignature = html.match(/name="saptet:generated-signature" content="([^"]+)"/)?.[1];
  const existingModified = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  return existingSignature === nextSignature && existingModified ? existingModified : today;
}

function generateDetail(item, items, shared) {
  const { holiday, occurrence, upcoming, daysLeft } = item;
  const year = occurrence.dateKey.slice(0, 4);
  const canonical = pageUrl(holiday.slug);
  const file = `${holiday.slug}.html`;
  const faq = makeFaq(item);
  const description = descriptionFor(item);
  const related = holiday.related.map((slug) => {
    const relatedItem = items.find((candidate) => candidate.holiday.slug === slug);
    if (!relatedItem) throw new Error(`${holiday.slug}: unknown related slug ${slug}`);
    return cardHtml(relatedItem);
  }).join('');
  const config = {
    slug: holiday.slug,
    name: holiday.name,
    emoji: holiday.emoji,
    scope: holiday.scope,
    zone: holiday.zone || null,
    zoneLabel: holiday.zoneLabel || null,
    startTime: holiday.startTime,
    durationDays: holiday.durationDays,
    expected: Boolean(holiday.moonDisclaimer),
    dates: item.dates,
  };
  const template = read('templates/holiday-countdown.html');
  const values = {
    TITLE: escapeHtml(titleFor(holiday, year)),
    OG_IMAGE: ogImage(holiday.slug),
    OG_IMAGE_ALT: escapeHtml(`${holiday.name} countdown: how many days until ${holiday.name}`),
    ALIASES: escapeHtml(holiday.aliases.join(', ')),
    REGIONS: regionsHtml(holiday),
    WORLD_TIMES: worldTimesHtml(item),
    OG_TITLE: escapeHtml(`${holiday.name} Countdown ${year} ${holiday.emoji}`),
    META_DESCRIPTION: escapeHtml(description),
    KEYWORDS: escapeHtml(holiday.keywords.concat(holiday.aliases.map((alias) => `${alias.toLowerCase()} countdown`)).join(', ')),
    CANONICAL: canonical,
    HREFLANG: hreflangHtml(holiday, canonical),
    PALETTE: paletteStyle(holiday),
    SKY: skyHtml(holiday),
    ASSET_VERSION,
    HEADER: HOLIDAYS_AR[holiday.slug]
      ? headerHtml(items, `<a href="/ar/${holiday.slug}" hreflang="ar" lang="ar">العربية</a>`)
      : shared.header,
    FOOTER: shared.footer,
    KICKER: escapeHtml(holiday.scope === 'national' ? `${holiday.country} · ${holiday.zoneLabel} time` : 'Worldwide · your local time'),
    DATE_LONG: escapeHtml(formatLong(occurrence.dateKey) + (holiday.moonDisclaimer ? ' (expected)' : '')),
    SUMMARY_DAYS: escapeHtml(occurrence.live ? `${holiday.name} is here!` : `${daysLeft} ${dayWord(daysLeft)}`),
    SUMMARY_REST: escapeHtml(occurrence.live ? 'Enjoy the celebration.' : `to go until ${holiday.name} ${year}`),
    TAGLINE: escapeHtml(holiday.tagline),
    NAME: escapeHtml(holiday.name),
    YEAR: year,
    DAYS_LEFT: String(daysLeft),
    ZONE_PICKER: zonePickerHtml(holiday),
    TARGET_TEXT: escapeHtml(targetText(item)),
    ANSWER: escapeHtml(answerText(item)),
    DATE_NOTE: holiday.dateNote ? `          <p class="hc-note">${escapeHtml(holiday.dateNote)}</p>` : '',
    DATE_ROWS: upcoming.slice(0, 5).map((key) => {
      const p = parts(key);
      return `<tr><td>${p.year}</td><td>${MONTHS[p.month - 1]} ${p.day}</td><td>${p.weekday}</td></tr>`;
    }).join(''),
    ABOUT: holiday.about.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join('\n'),
    TRADITIONS: holiday.traditions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join(''),
    FAQ: faq.map((entry) => `<details><summary>${escapeHtml(entry.q)}</summary><p>${escapeHtml(entry.a)}</p></details>`).join(''),
    RELATED: related,
    CONFIG: JSON.stringify(config).replace(/</g, '\\u003c'),
  };
  const nextSignature = signature({ values, template });
  const modified = currentModified(file, nextSignature, shared.today);
  const html = replaceTokens(template, {
    ...values,
    SIGNATURE: nextSignature,
    SCHEMA: jsonLd(detailSchema(item, faq, canonical, description, modified)),
  });
  write(file, html);
  return { url: canonical, lastmod: modified };
}

function generateHub(items, shared) {
  const canonical = pageUrl(HUB_SLUG);
  const file = `${HUB_SLUG}.html`;
  const sorted = items.slice().sort((a, b) => a.occurrence.start - b.occurrence.start);
  const description = `Live countdowns to ${sorted.slice(0, 4).map((item) => item.holiday.name).join(', ')} and more of the world's biggest holidays, in each country's time zone.`;
  const template = read('templates/holidays-index.html');
  const values = {
    TITLE: escapeHtml(fit(['Holiday Countdowns: Days Until Christmas, Ramadan & More'], TITLE_MAX, 'hub title')),
    HREFLANG: hreflangHtml(null, canonical),
    OG_IMAGE: ogImage(HUB_SLUG),
    META_DESCRIPTION: escapeHtml(description),
    CANONICAL: canonical,
    ASSET_VERSION,
    HEADER: shared.header,
    FOOTER: shared.footer,
    SECTIONS: HOLIDAY_CATEGORIES.map((category) => {
      const inCategory = sorted.filter((item) => item.holiday.category === category.id);
      return `
    <section class="hc-section hc-category" id="${category.id}" aria-labelledby="hc-cat-${category.id}">
      <div class="hc-container">
        <div class="hc-category-head">
          <h2 id="hc-cat-${category.id}">${escapeHtml(category.title)}</h2>
          <p>${escapeHtml(category.intro)}</p>
        </div>
        <div class="hc-cards hc-cards--hub">${inCategory.map(cardHtml).join('')}
        </div>
      </div>
    </section>`;
    }).join(''),
    CATEGORY_NAV: HOLIDAY_CATEGORIES.map((category) => `<a href="#${category.id}">${escapeHtml(category.title)}</a>`).join(''),
  };
  const nextSignature = signature({ values, template });
  const modified = currentModified(file, nextSignature, shared.today);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: 'Holiday Countdowns',
        description,
        inLanguage: 'en',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        publisher: { '@id': ORGANIZATION_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: ogImage(HUB_SLUG), ...OG_SIZE },
        mainEntity: { '@id': `${canonical}#list` },
      },
      organizationNode(),
      {
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        itemListElement: sorted.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: `${item.holiday.name} Countdown`,
          url: pageUrl(item.holiday.slug),
        })),
      },
    ],
  };
  write(file, replaceTokens(template, { ...values, SIGNATURE: nextSignature, SCHEMA: jsonLd(schema) }));
  return { url: canonical, lastmod: modified };
}

// ---------- Trang tiếng Ả Rập (RTL) ----------

function fillAr(template, values) {
  return template.replace(/\{(\w+)\}/g, (match, key) => (values[key] == null ? match : String(values[key])));
}

function formatWithIntl(locale, dateKeyValue, options) {
  const [y, m, d] = dateKeyValue.split('-').map(Number);
  return new Intl.DateTimeFormat(locale, { timeZone: 'UTC', ...options }).format(new Date(Date.UTC(y, m - 1, d)));
}

function formatLongAr(key) {
  return formatWithIntl(UI_AR.locale, key, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDayMonthAr(key) {
  return formatWithIntl(UI_AR.locale, key, { day: 'numeric', month: 'long' });
}

function formatHijri(key) {
  return formatWithIntl(UI_AR.hijriLocale, key, { day: 'numeric', month: 'long', year: 'numeric' });
}

function dayLabelAr(n) {
  const category = new Intl.PluralRules('ar').select(n);
  return fillAr(UI_AR.dayForms[category] || UI_AR.dayForms.other, { n });
}

function arabicHeaderHtml(slug) {
  const nav = Object.keys(HOLIDAYS_AR)
    .map((key) => `<a href="/ar/${key}"${key === slug ? ' aria-current="page"' : ''}>${escapeHtml(HOLIDAYS_AR[key].name)}</a>`)
    .join('');
  return `  <header class="hc-header">
    <div class="hc-container hc-header-inner">
      <a class="hc-brand" href="/ar/${slug}"><img src="/assets/images/ic_app.png" alt="" width="32" height="32"><span>العد التنازلي</span></a>
      <nav class="hc-nav" aria-label="العدادات">${nav}<a href="/${slug}" hreflang="en" lang="en">English</a></nav>
    </div>
  </header>`;
}

function arabicFooterHtml(slug) {
  return `  <footer class="hc-footer">
    <div class="hc-container hc-footer-inner">
      <div>
        <p class="hc-footer-brand">من فريق تطبيق <a href="/" hreflang="vi" lang="vi"><bdi>Sắp Tết</bdi></a></p>
        <p><bdi lang="vi">Sắp Tết</bdi> هو تطبيق العد التنازلي لرأس السنة القمرية، ويتابعه أكثر من 100,000 شخص في فيتنام.</p>
      </div>
      <nav aria-label="روابط">
        <a href="/${HUB_SLUG}" hreflang="en">${UI_AR.allCountdowns}</a>
        <a href="/privacy-policy/en/" hreflang="en">سياسة الخصوصية</a>
        <a href="/terms-of-use/en/" hreflang="en">شروط الاستخدام</a>
        <a href="/support">الدعم</a>
        <a href="/${slug}" hreflang="en" lang="en">English</a>
      </nav>
    </div>
  </footer>`;
}

function arabicCardHtml(item) {
  const { holiday, dates, occurrence, daysLeft } = item;
  const ar = HOLIDAYS_AR[holiday.slug];
  const zoneAttr = holiday.scope === 'national' ? ` data-zone="${holiday.zone}"` : '';
  const days = occurrence.live ? UI_AR.today : dayLabelAr(daysLeft);
  return `
          <a class="hc-mini" href="/ar/${holiday.slug}" data-hc-card data-dates="${dates.join(',')}" data-start-time="${holiday.startTime}" data-duration="${holiday.durationDays}"${zoneAttr}>
            <span class="hc-mini-body">
              <strong>${escapeHtml(ar.name)}</strong>
              <span>${escapeHtml(formatLongAr(occurrence.dateKey))}</span>
            </span>
            <span class="hc-mini-days" data-hc-card-days>${escapeHtml(days)}</span>
          </a>`;
}

function arabicSchema(item, ar, faq, canonical, description, title, modified) {
  const { holiday } = item;
  const image = `${SITE_ORIGIN}/assets/images/og/ar-${holiday.slug}.jpg`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'ar',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        isPartOf: { '@type': 'WebSite', name: 'saptet.vn', url: `${SITE_ORIGIN}/` },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, ...OG_SIZE },
        about: {
          '@type': 'Thing',
          name: ar.name,
          alternateName: ar.aliases.concat(holiday.name, holiday.aliases),
          sameAs: [encodeURI(ar.wikipedia), holiday.wikipedia],
        },
      },
      organizationNode(),
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: UI_AR.breadcrumbHub, item: pageUrl(HUB_SLUG) },
          { '@type': 'ListItem', position: 2, name: ar.name, item: canonical },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((entry) => ({
          '@type': 'Question',
          name: entry.q,
          acceptedAnswer: { '@type': 'Answer', text: entry.a },
        })),
      },
    ],
  };
}

function generateArabicDetail(item, items, shared) {
  const { holiday, occurrence, upcoming, daysLeft } = item;
  const ar = HOLIDAYS_AR[holiday.slug];
  const year = occurrence.dateKey.slice(0, 4);
  const canonical = arabicUrl(holiday.slug);
  const file = `ar/${holiday.slug}.html`;
  const vars = {
    name: ar.name,
    year,
    days: dayLabelAr(daysLeft),
    date: formatLongAr(occurrence.dateKey),
    hijri: formatHijri(occurrence.dateKey),
  };
  const title = fit([fillAr(ar.title, vars), fillAr(ar.titleShort, vars)], TITLE_MAX, `ar/${holiday.slug} title`);
  const description = occurrence.live
    ? fit([`${ar.liveTitle} ${ar.liveText} عداد تنازلي مباشر حتى ${ar.name} القادم.`], DESCRIPTION_MAX, `ar/${holiday.slug} description`)
    : fit([fillAr(ar.description, vars), fillAr(ar.descriptionShort, vars)], DESCRIPTION_MAX, `ar/${holiday.slug} description`);
  const faq = [{ q: ar.faqDaysQ, a: fillAr(ar.faqDaysA, vars) }];
  const next = upcoming.find((key) => key.slice(0, 4) !== year);
  if (next) {
    const nextVars = { ...vars, year: next.slice(0, 4), date: formatLongAr(next), hijri: formatHijri(next) };
    faq.push({ q: fillAr(ar.faqNextQ, nextVars), a: fillAr(ar.faqNextA, nextVars) });
  }
  faq.push(...ar.faq);

  const zoneOffset = ZonedTime.formatOffset(occurrence.start, holiday.zone);
  const related = items
    .filter((candidate) => candidate.holiday.slug !== holiday.slug && HOLIDAYS_AR[candidate.holiday.slug])
    .map(arabicCardHtml).join('');
  const config = {
    slug: holiday.slug,
    name: ar.name,
    emoji: holiday.emoji,
    scope: holiday.scope,
    zone: holiday.zone || null,
    zoneLabel: ar.zoneLabel,
    startTime: holiday.startTime,
    durationDays: holiday.durationDays,
    expected: Boolean(holiday.moonDisclaimer),
    dates: item.dates,
    i18n: {
      locale: UI_AR.locale,
      hijriLocale: UI_AR.hijriLocale,
      dayForms: UI_AR.dayForms,
      summaryRest: UI_AR.summaryRest,
      target: UI_AR.target,
      local: UI_AR.local,
      expected: UI_AR.expected,
      liveTitle: ar.liveTitle,
      liveText: ar.liveText,
      unknownTitle: UI_AR.unknownTitle,
      unknownText: UI_AR.unknownText,
      today: UI_AR.today,
      shareText: UI_AR.shareText,
      shareCopied: UI_AR.shareCopied,
    },
  };
  const template = read('templates/holiday-countdown-ar.html');
  const values = {
    TITLE: escapeHtml(title),
    OG_TITLE: escapeHtml(`${ar.ogTitle} ${year} ${holiday.emoji}`),
    META_DESCRIPTION: escapeHtml(description),
    KEYWORDS: escapeHtml(ar.keywords.flatMap((keyword) => [keyword, `${keyword} ${year}`]).join('، ')),
    CANONICAL: canonical,
    HREFLANG: [
      `  <link rel="alternate" hreflang="en" href="${pageUrl(holiday.slug)}">`,
      `  <link rel="alternate" hreflang="ar" href="${canonical}">`,
      `  <link rel="alternate" hreflang="x-default" href="${pageUrl(holiday.slug)}">`,
    ].join('\n'),
    OG_IMAGE: `${SITE_ORIGIN}/assets/images/og/ar-${holiday.slug}.jpg`,
    OG_IMAGE_ALT: escapeHtml(`${ar.ogTitle}: ${ar.ogSubtitle}`),
    PALETTE: paletteStyle(holiday),
    SKY: skyHtml(holiday),
    ASSET_VERSION,
    HEADER: arabicHeaderHtml(holiday.slug),
    FOOTER: arabicFooterHtml(holiday.slug),
    KICKER: escapeHtml(ar.kicker),
    H1: escapeHtml(ar.h1),
    YEAR: year,
    NAME: escapeHtml(ar.name),
    DATE_LONG: escapeHtml(vars.date + (holiday.moonDisclaimer ? UI_AR.expected : '')),
    HIJRI: escapeHtml(vars.hijri),
    TARGET_TEXT: escapeHtml(fillAr(UI_AR.target, {
      time: new Intl.DateTimeFormat(UI_AR.locale, { timeZone: holiday.zone, hour: 'numeric', minute: '2-digit' }).format(new Date(occurrence.start)),
      zone: ar.zoneLabel,
      offset: `\u2068${zoneOffset}\u2069`,
    })),
    SUMMARY_DAYS: escapeHtml(occurrence.live ? ar.liveTitle : vars.days),
    SUMMARY_REST: escapeHtml(occurrence.live ? ar.liveText : fillAr(UI_AR.summaryRest, vars)),
    TIMER_LABEL: escapeHtml(fillAr(UI_AR.timerLabel, vars)),
    UNIT_DAYS: UI_AR.units.days,
    UNIT_HOURS: UI_AR.units.hours,
    UNIT_MINUTES: UI_AR.units.minutes,
    UNIT_SECONDS: UI_AR.units.seconds,
    DAYS_LEFT: String(daysLeft),
    SHARE_BUTTON: escapeHtml(UI_AR.shareButton),
    ABOUT_LINK: escapeHtml(fillAr(UI_AR.aboutLink, vars)),
    BREADCRUMB_HUB: escapeHtml(UI_AR.breadcrumbHub),
    HOW_MANY_HEADING: escapeHtml(fillAr(UI_AR.howManyHeading, vars)),
    ANSWER: escapeHtml(fillAr(ar.answer, vars)),
    DATE_NOTE: escapeHtml(ar.dateNote),
    DATES_HEADING: escapeHtml(fillAr(UI_AR.datesHeading, vars)),
    DATES_COLS: UI_AR.datesCols.map((col) => `<th scope="col">${escapeHtml(col)}</th>`).join(''),
    DATE_ROWS: upcoming.slice(0, 5).map((key) => `<tr><td>${key.slice(0, 4)}</td><td>${escapeHtml(formatLongAr(key))}</td><td>${escapeHtml(formatHijri(key))}</td></tr>`).join(''),
    ABOUT_HEADING: escapeHtml(fillAr(UI_AR.aboutHeading, vars)),
    TAGLINE: escapeHtml(ar.tagline),
    ALSO_KNOWN_AS: escapeHtml(UI_AR.alsoKnownAs),
    ALIASES: escapeHtml(ar.aliases.join('، ')),
    ABOUT: ar.about.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join('\n'),
    TRADITIONS_HEADING: escapeHtml(UI_AR.traditionsHeading),
    TRADITIONS: ar.traditions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join(''),
    WORLD_HEADING: escapeHtml(fillAr(UI_AR.worldHeading, vars)),
    REGIONS: ar.regions.map((region) => `
            <article class="hc-region">
              <h3>${escapeHtml(region.country)}</h3>
              <p>${escapeHtml(region.note)}</p>
            </article>`).join(''),
    FAQ_HEADING: escapeHtml(UI_AR.faqHeading),
    FAQ: faq.map((entry) => `<details><summary>${escapeHtml(entry.q)}</summary><p>${escapeHtml(entry.a)}</p></details>`).join(''),
    MORE_HEADING: escapeHtml(UI_AR.moreHeading),
    ALL_COUNTDOWNS: escapeHtml(UI_AR.allCountdowns),
    RELATED: related,
    CONFIG: JSON.stringify(config).replace(/</g, '\\u003c'),
  };
  const nextSignature = signature({ values, template });
  const modified = currentModified(file, nextSignature, shared.today);
  const html = replaceTokens(template, {
    ...values,
    SIGNATURE: nextSignature,
    SCHEMA: jsonLd(arabicSchema(item, ar, faq, canonical, description, title, modified)),
  });
  fs.mkdirSync(path.join(ROOT, 'ar'), { recursive: true });
  write(file, html);
  return { url: canonical, lastmod: modified };
}

function updateSitemap(pages) {
  const sitemapPath = path.join(ROOT, 'sitemap.xml');
  let sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const escapedMarker = SITEMAP_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  sitemap = sitemap.replace(new RegExp(`\\s*${escapedMarker}`, 'g'), '');
  for (const { url } of pages) {
    const loc = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    sitemap = sitemap.replace(new RegExp(`\\s*<url>\\s*<loc>${loc}</loc>[\\s\\S]*?</url>`, 'g'), '');
  }
  const entries = pages.map(({ url, lastmod, priority }) => `
    <url>
        <loc>${url}</loc>
        <lastmod>${lastmod}</lastmod>
        <changefreq>daily</changefreq>
        <priority>${priority}</priority>
    </url>`).join('');
  sitemap = sitemap.replace('\n</urlset>', `\n    ${SITEMAP_MARKER}${entries}\n</urlset>`);
  fs.writeFileSync(sitemapPath, sitemap, 'utf8');
}

function main() {
  const categoryIds = new Set(HOLIDAY_CATEGORIES.map((category) => category.id));
  for (const holiday of HOLIDAYS_EN) {
    if (!categoryIds.has(holiday.category)) throw new Error(`${holiday.slug}: unknown category ${holiday.category}`);
  }
  const now = Date.now();
  const items = HOLIDAYS_EN.map((holiday) => buildItem(holiday, now));
  const shared = {
    today: ZonedTime.todayKey(now, 'Asia/Ho_Chi_Minh'),
    header: headerHtml(items),
    footer: footerHtml(),
  };
  const hub = generateHub(items, shared);
  const details = items.map((item) => generateDetail(item, items, shared));
  for (const slug of Object.keys(HOLIDAYS_AR)) {
    if (!items.some((item) => item.holiday.slug === slug)) throw new Error(`data/holidays-ar.js: unknown slug ${slug}`);
  }
  const arabic = items
    .filter((item) => HOLIDAYS_AR[item.holiday.slug])
    .map((item) => generateArabicDetail(item, items, shared));
  updateSitemap([
    { ...hub, priority: '0.7' },
    ...details.map((page) => ({ ...page, priority: '0.8' })),
    ...arabic.map((page) => ({ ...page, priority: '0.8' })),
  ]);
  console.log(`generate-holiday-pages: wrote /${HUB_SLUG}, ${details.length} English and ${arabic.length} Arabic pages`);
}

if (require.main === module) main();

module.exports = { resolveDates, easterSunday, nthWeekday };

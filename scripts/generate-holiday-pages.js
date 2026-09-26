/**
 * Sinh các trang đếm ngược tiếng Anh (/christmas, /ramadan, …) và hub /countdowns,
 * bản tiếng Việt (/vi/christmas, …, hub /vi/countdowns) và bản tiếng Ả Rập (/ar/ramadan, …).
 * Dữ liệu: data/holidays-en.js, data/holidays-vi.js, data/holidays-ar.js.
 * Template: templates/holiday-countdown{,-vi,-ar}.html, templates/holidays-index{,-vi}.html.
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
const { HOLIDAYS_VI, UI_VI, HOLIDAY_CATEGORIES_VI } = require(path.join(ROOT, 'data/holidays-vi.js'));

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
            <img class="hc-mini-mark" src="${holiday.visual.icon}" alt="" aria-hidden="true" width="46" height="46" loading="lazy" decoding="async">
            <span class="hc-mini-body">
              <strong>${escapeHtml(holiday.name)}</strong>
              <span>${formatShort(occurrence.dateKey)}</span>
            </span>
            <span class="hc-mini-days" data-hc-card-days>${days}</span>
          </a>`;
}

const HEADER_QUICK_SLUGS = ['christmas', 'new-year', 'halloween'];
const MENU_CHEVRON = '<svg class="hc-menu-chevron" aria-hidden="true" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>';

// Menu "More / Xem thêm": toàn bộ danh mục theo nhóm để nhảy nhanh giữa các trang, mục đầu quay về hub.
function menuHtml({ label, allHref, allLabel, groups, currentHref }) {
  const current = (href) => (href === currentHref ? ' aria-current="page"' : '');
  const sections = groups.map((group) => `
          <div class="hc-menu-group">
            <p class="hc-menu-title">${escapeHtml(group.title)}</p>
            <ul>${group.links.map((link) => `<li><a href="${link.href}"${current(link.href)}>${escapeHtml(link.label)}</a></li>`).join('')}</ul>
          </div>`).join('');
  return `
      <details class="hc-menu" data-hc-menu>
        <summary class="hc-menu-toggle">${escapeHtml(label)} ${MENU_CHEVRON}</summary>
        <div class="hc-menu-panel">
          <a class="hc-menu-all" href="${allHref}"${current(allHref)}>${escapeHtml(allLabel)} <span aria-hidden="true">→</span></a>
          <div class="hc-menu-groups">${sections}
          </div>
        </div>
      </details>`;
}

function headerHtml({ brandHref, brandLabel, navLabel, quick, languages = [], menu }) {
  const nav = quick.map((link) => `<a href="${link.href}">${escapeHtml(link.label)}</a>`).join('')
    + languages.map((link) => `<a href="${link.href}" hreflang="${link.lang}" lang="${link.lang}">${link.label}</a>`).join('');
  return `  <header class="hc-header">
    <div class="hc-container hc-header-inner">
      <a class="hc-brand" href="${brandHref}"><img src="/assets/images/ic_app.png" alt="" width="32" height="32"><span>${escapeHtml(brandLabel)}</span></a>
      <nav class="hc-nav" aria-label="${escapeHtml(navLabel)}">${nav}</nav>${menuHtml(menu)}
    </div>
  </header>`;
}

function englishHeaderHtml(items, slug = null) {
  const bySlug = (key) => items.find((item) => item.holiday.slug === key).holiday;
  const languages = [{ href: slug ? `/vi/${slug}` : `/vi/${HUB_SLUG}`, lang: 'vi', label: 'Tiếng Việt' }];
  if (slug && HOLIDAYS_AR[slug]) languages.push({ href: `/ar/${slug}`, lang: 'ar', label: 'العربية' });
  return headerHtml({
    brandHref: `/${HUB_SLUG}`,
    brandLabel: 'Countdowns',
    navLabel: 'Countdowns',
    quick: HEADER_QUICK_SLUGS.map((key) => ({ href: `/${key}`, label: bySlug(key).name })),
    languages,
    menu: {
      label: 'More',
      allHref: `/${HUB_SLUG}`,
      allLabel: 'All countdowns',
      currentHref: slug ? `/${slug}` : `/${HUB_SLUG}`,
      groups: HOLIDAY_CATEGORIES.map((category) => ({
        title: category.title,
        links: sortedByDate(items).filter((item) => item.holiday.category === category.id)
          .map((item) => ({ href: `/${item.holiday.slug}`, label: item.holiday.name })),
      })),
    },
  });
}

function sortedByDate(items) {
  return items.slice().sort((a, b) => a.occurrence.start - b.occurrence.start);
}

function vietnameseUrl(slug) {
  return `${SITE_ORIGIN}/vi/${slug}`;
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
  return `          <label class="hc-zone"><svg class="hc-control-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9Z"/></svg><span class="hc-visually-hidden">Time zone</span>
            <select data-hc-zone name="timezone" autocomplete="off"><option value="local">My time zone</option>${options}</select>
          </label>`;
}

function hreflangHtml(holiday, canonical) {
  // Một URL tiếng Anh cho mọi quốc gia (en-US, en-GB, en-IN, …): khai báo 'en' + x-default.
  const links = [`  <link rel="alternate" hreflang="en" href="${canonical}">`];
  links.push(`  <link rel="alternate" hreflang="vi" href="${vietnameseUrl(holiday ? holiday.slug : HUB_SLUG)}">`);
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
const PARTICLE_COUNT = { snow: 16, confetti: 14, drop: 12, ember: 12, star: 11, leaf: 9, petal: 10, heart: 9, bat: 6 };

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
  const intro = holiday.moonDisclaimer
    ? `The expected first day is shown at ${formatTime(holiday.startTime)} in each city. Local religious authorities may announce a different date after the crescent moon is sighted.`
    : `${holiday.name} begins at ${formatTime(holiday.startTime)} local time, so it reaches the islands of Kiribati first and Hawaii last. Here is when it starts in major cities, and what time that is for you.`;
  return `
          <h3>When does ${escapeHtml(holiday.name)} ${year} start around the world?</h3>
          <p>${escapeHtml(intro)}</p>
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
    shareMessage: holiday.shareMessage,
    visual: holiday.visual,
    palette: holiday.palette,
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
    WORLD_NOTE: escapeHtml(`These examples cover major regional and diaspora traditions. They are representative, not an exhaustive list of every country or community that observes ${holiday.name}; customs can also vary within a country.`),
    WORLD_TIMES: worldTimesHtml(item),
    OG_TITLE: escapeHtml(`${holiday.name} Countdown ${year}`),
    META_DESCRIPTION: escapeHtml(description),
    KEYWORDS: escapeHtml(holiday.keywords.concat(holiday.aliases.map((alias) => `${alias.toLowerCase()} countdown`)).join(', ')),
    CANONICAL: canonical,
    HREFLANG: hreflangHtml(holiday, canonical),
    PALETTE: paletteStyle(holiday),
    HERO_BACKGROUND: holiday.visual.background,
    HERO_ICON: holiday.visual.icon,
    FOCAL_POINT: holiday.visual.focalPoint,
    SKY: skyHtml(holiday),
    ASSET_VERSION,
    HEADER: englishHeaderHtml(items, holiday.slug),
    FOOTER: shared.footer,
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
    ORIGIN_ROOTS: escapeHtml(holiday.origin.roots),
    ORIGIN_COMMUNITIES: escapeHtml(holiday.origin.communities),
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
  const sorted = sortedByDate(items);
  const description = `Live countdowns to ${sorted.slice(0, 4).map((item) => item.holiday.name).join(', ')} and more of the world's biggest holidays, in each country's time zone.`;
  const template = read('templates/holidays-index.html');
  const values = {
    TITLE: escapeHtml(fit(['Holiday Countdowns: Days Until Christmas, Ramadan & More'], TITLE_MAX, 'hub title')),
    HREFLANG: hreflangHtml(null, canonical),
    OG_IMAGE: ogImage(HUB_SLUG),
    META_DESCRIPTION: escapeHtml(description),
    CANONICAL: canonical,
    ASSET_VERSION,
    HEADER: englishHeaderHtml(items),
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
            <img class="hc-mini-mark" src="${holiday.visual.icon}" alt="" aria-hidden="true" width="46" height="46" loading="lazy" decoding="async">
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
    shareMessage: ar.shareMessage,
    visual: holiday.visual,
    palette: holiday.palette,
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
      yourZone: UI_AR.yourZone,
      myZone: UI_AR.myZone,
      local: UI_AR.local,
      expected: UI_AR.expected,
      liveTitle: ar.liveTitle,
      liveText: ar.liveText,
      unknownTitle: UI_AR.unknownTitle,
      unknownText: UI_AR.unknownText,
      today: UI_AR.today,
      shareText: UI_AR.shareText,
      shareCopied: UI_AR.shareCopied,
      shareCaptured: UI_AR.shareCaptured,
      shareEyebrow: UI_AR.shareEyebrow,
      shareReady: UI_AR.shareReady,
      shareFailed: UI_AR.shareFailed,
      shareDownloaded: UI_AR.shareDownloaded,
      shareUnavailable: UI_AR.shareUnavailable,
      shareFooter: UI_AR.shareFooter,
      shareUnits: UI_AR.units,
    },
  };
  const template = read('templates/holiday-countdown-ar.html');
  const values = {
    TITLE: escapeHtml(title),
    OG_TITLE: escapeHtml(`${ar.ogTitle} ${year}`),
    META_DESCRIPTION: escapeHtml(description),
    KEYWORDS: escapeHtml(ar.keywords.flatMap((keyword) => [keyword, `${keyword} ${year}`]).join('، ')),
    CANONICAL: canonical,
    HREFLANG: [
      `  <link rel="alternate" hreflang="en" href="${pageUrl(holiday.slug)}">`,
      `  <link rel="alternate" hreflang="ar" href="${canonical}">`,
      `  <link rel="alternate" hreflang="vi" href="${vietnameseUrl(holiday.slug)}">`,
      `  <link rel="alternate" hreflang="x-default" href="${pageUrl(holiday.slug)}">`,
    ].join('\n'),
    OG_IMAGE: `${SITE_ORIGIN}/assets/images/og/ar-${holiday.slug}.jpg`,
    OG_IMAGE_ALT: escapeHtml(`${ar.ogTitle}: ${ar.ogSubtitle}`),
    PALETTE: paletteStyle(holiday),
    HERO_BACKGROUND: holiday.visual.background,
    HERO_ICON: holiday.visual.icon,
    FOCAL_POINT: holiday.visual.focalPoint,
    SKY: skyHtml(holiday),
    ASSET_VERSION,
    HEADER: arabicHeaderHtml(holiday.slug),
    FOOTER: arabicFooterHtml(holiday.slug),
    H1: escapeHtml(ar.h1),
    YEAR: year,
    NAME: escapeHtml(ar.name),
    DATE_LONG: escapeHtml(vars.date + (holiday.moonDisclaimer ? UI_AR.expected : '')),
    HIJRI: escapeHtml(vars.hijri),
    TARGET_TEXT: escapeHtml(holiday.scope === 'global'
      ? 'يبدأ عند منتصف الليل بتوقيتك المحلي'
      : fillAr(UI_AR.target, {
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
    SHARE_READY_LABEL: escapeHtml(UI_AR.shareReadyLabel),
    SHARE_PREVIEW_TITLE: escapeHtml(fillAr(UI_AR.sharePreviewTitle, vars)),
    SHARE_PREVIEW_INTRO: escapeHtml(UI_AR.sharePreviewIntro),
    SHARE_PREVIEW_ALT: escapeHtml(fillAr(UI_AR.sharePreviewAlt, vars)),
    SHARE_RENDERING: escapeHtml(UI_AR.shareRendering),
    SHARE_IMAGE: escapeHtml(UI_AR.shareImage),
    SHARE_DOWNLOAD: escapeHtml(UI_AR.shareDownload),
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
    ORIGIN_HEADING: escapeHtml(UI_AR.originHeading),
    ORIGIN_ROOTS_LABEL: escapeHtml(UI_AR.originRoots),
    ORIGIN_COMMUNITIES_LABEL: escapeHtml(UI_AR.originCommunities),
    ORIGIN_ROOTS: escapeHtml(ar.origin.roots),
    ORIGIN_COMMUNITIES: escapeHtml(ar.origin.communities),
    TRADITIONS_HEADING: escapeHtml(UI_AR.traditionsHeading),
    TRADITIONS: ar.traditions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join(''),
    WORLD_HEADING: escapeHtml(fillAr(UI_AR.worldHeading, vars)),
    WORLD_NOTE: escapeHtml(fillAr(UI_AR.worldNote, vars)),
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

// ---------- Trang tiếng Việt ----------

function formatLongVi(key) {
  const p = parts(key);
  return `${UI_VI.weekdays[new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay()]}, ngày ${p.day}/${p.month}/${p.year}`;
}

function formatShortVi(key) {
  const p = parts(key);
  return `${p.day}/${p.month}/${p.year}`;
}

// Cùng định dạng với formatDateTime() trong js/holiday-countdown.js để JS điền lại không làm nhảy chữ.
function formatHeroVi(ms, zone) {
  return new Intl.DateTimeFormat(UI_VI.locale, { timeZone: zone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(ms));
}

function dayLabelVi(n) {
  return fillAr(UI_VI.dayForms.other, { n });
}

function expectedVi(holiday) {
  return holiday.moonDisclaimer ? 'dự kiến ' : '';
}

function vietnameseHeaderHtml(items, slug = null) {
  const bySlug = (key) => HOLIDAYS_VI[key];
  return headerHtml({
    brandHref: `/vi/${HUB_SLUG}`,
    brandLabel: UI_VI.brand,
    navLabel: UI_VI.navLabel,
    quick: HEADER_QUICK_SLUGS.map((key) => ({ href: `/vi/${key}`, label: bySlug(key).name })),
    languages: [{ href: slug ? `/${slug}` : `/${HUB_SLUG}`, lang: 'en', label: 'English' }],
    menu: {
      label: UI_VI.more,
      allHref: `/vi/${HUB_SLUG}`,
      allLabel: UI_VI.allCountdowns,
      currentHref: slug ? `/vi/${slug}` : `/vi/${HUB_SLUG}`,
      groups: HOLIDAY_CATEGORIES.map((category) => ({
        title: HOLIDAY_CATEGORIES_VI[category.id].title,
        links: sortedByDate(items).filter((item) => item.holiday.category === category.id)
          .map((item) => ({ href: `/vi/${item.holiday.slug}`, label: HOLIDAYS_VI[item.holiday.slug].name })),
      })),
    },
  });
}

function vietnameseFooterHtml(slug = null) {
  return `  <footer class="hc-footer">
    <div class="hc-container hc-footer-inner">
      <div>
        <p class="hc-footer-brand">Thực hiện bởi đội ngũ <a href="/">Sắp Tết</a></p>
        <p>Sắp Tết là ứng dụng đếm ngược Tết Nguyên Đán được hơn 100.000 người Việt theo dõi.</p>
      </div>
      <nav aria-label="Liên kết">
        <a href="/vi/${HUB_SLUG}">${UI_VI.allCountdowns}</a>
        <a href="/privacy-policy/vi/">Chính sách bảo mật</a>
        <a href="/terms-of-use/vi/">Điều khoản sử dụng</a>
        <a href="/support">Hỗ trợ</a>
        <a href="/${slug || HUB_SLUG}" hreflang="en" lang="en">English</a>
      </nav>
    </div>
  </footer>`;
}

function vietnameseCardHtml(item) {
  const { holiday, dates, occurrence, daysLeft } = item;
  const vi = HOLIDAYS_VI[holiday.slug];
  const zoneAttr = holiday.scope === 'national' ? ` data-zone="${holiday.zone}"` : '';
  const days = occurrence.live ? UI_VI.today : dayLabelVi(daysLeft);
  return `
          <a class="hc-mini" href="/vi/${holiday.slug}" data-hc-card data-dates="${dates.join(',')}" data-start-time="${holiday.startTime}" data-duration="${holiday.durationDays}"${zoneAttr}>
            <img class="hc-mini-mark" src="${holiday.visual.icon}" alt="" aria-hidden="true" width="46" height="46" loading="lazy" decoding="async">
            <span class="hc-mini-body">
              <strong>${escapeHtml(vi.name)}</strong>
              <span>${formatShortVi(occurrence.dateKey)}</span>
            </span>
            <span class="hc-mini-days" data-hc-card-days>${escapeHtml(days)}</span>
          </a>`;
}

function vietnameseI18n() {
  return {
    locale: UI_VI.locale,
    dayForms: UI_VI.dayForms,
    summaryRest: UI_VI.summaryRest,
    target: UI_VI.target,
    yourZone: UI_VI.yourZone,
    myZone: UI_VI.myZone,
    local: UI_VI.local,
    expected: UI_VI.expected,
    liveTitle: UI_VI.liveTitle,
    liveText: UI_VI.liveText,
    unknownTitle: UI_VI.unknownTitle,
    unknownText: UI_VI.unknownText,
    today: UI_VI.today,
    shareText: UI_VI.shareText,
    shareCopied: UI_VI.shareCopied,
    shareCaptured: UI_VI.shareCaptured,
    shareEyebrow: UI_VI.shareEyebrow,
    shareReady: UI_VI.shareReady,
    shareFailed: UI_VI.shareFailed,
    shareDownloaded: UI_VI.shareDownloaded,
    shareUnavailable: UI_VI.shareUnavailable,
    shareFooter: UI_VI.shareFooter,
    shareUnits: UI_VI.units,
  };
}

// Title/description/FAQ tiếng Việt bám cụm thương hiệu "Sắp X" (như "Sắp Tết") + câu hỏi "còn bao nhiêu ngày nữa".
function vietnameseTitle(vi, year, slug) {
  return fit([
    `Sắp ${vi.name} ${year}: Còn bao nhiêu ngày nữa?`,
    `Sắp ${vi.name}: Còn bao nhiêu ngày nữa?`,
  ], TITLE_MAX, `vi/${slug} title`);
}

function vietnameseDescription(item, vi) {
  const { holiday, occurrence, daysLeft } = item;
  const year = occurrence.dateKey.slice(0, 4);
  if (occurrence.live) {
    return fit([
      `Sắp ${vi.name}? ${vi.name} ${year} đang diễn ra. Đồng hồ đếm ngược trực tiếp đến ${vi.name} lần tới theo ngày, giờ, phút và giây.`,
      `Sắp ${vi.name}? ${vi.name} ${year} đang diễn ra. Đếm ngược trực tiếp đến ${vi.name} lần tới.`,
    ], DESCRIPTION_MAX, `vi/${holiday.slug} description`);
  }
  const when = `${expectedVi(holiday)}vào ${formatLongVi(occurrence.dateKey)}`;
  const count = dayLabelVi(daysLeft);
  return fit([
    `Sắp ${vi.name} chưa? Còn ${count} nữa đến ${vi.name} ${year}, ${when}. Đồng hồ đếm ngược trực tiếp theo ngày, giờ, phút, giây.`,
    `Sắp ${vi.name} chưa? Còn ${count} nữa đến ${vi.name} ${year}, ${when}. Đếm ngược trực tiếp từng giây.`,
    `Sắp ${vi.name}: còn ${count} đến ${vi.name} ${year}, ${when}. Đếm ngược từng giây.`,
  ], DESCRIPTION_MAX, `vi/${holiday.slug} description`);
}

function vietnameseZoneLabel(holiday, vi) {
  return `${UI_VI.zonePrefix}${vi.zoneLabel}`;
}

function vietnameseTarget(item, vi) {
  const { holiday, occurrence } = item;
  if (holiday.scope === 'national') {
    return fillAr(UI_VI.target, {
      time: holiday.startTime,
      zone: vietnameseZoneLabel(holiday, vi),
      offset: ZonedTime.formatOffset(occurrence.start, holiday.zone),
    });
  }
  return `Bắt đầu lúc ${holiday.startTime} ${UI_VI.yourZone}`;
}

function vietnameseAnswer(item, vi) {
  const { holiday, occurrence, daysLeft } = item;
  const year = occurrence.dateKey.slice(0, 4);
  const when = formatLongVi(occurrence.dateKey);
  if (occurrence.live) return `${vi.name} ${year} đang diễn ra, bắt đầu từ ${when}.`;
  const place = holiday.scope === 'national' ? ` (theo ${vietnameseZoneLabel(holiday, vi)})` : '';
  return `${vi.name} ${year} ${expectedVi(holiday)}rơi vào ${when}${place}, tức còn ${dayLabelVi(daysLeft)} nữa tính từ hôm nay.`;
}

function vietnameseFaq(item, vi) {
  const { holiday, occurrence, daysLeft, upcoming } = item;
  const year = occurrence.dateKey.slice(0, 4);
  const faq = [{
    q: `Sắp ${vi.name} chưa? Còn bao nhiêu ngày nữa?`,
    a: occurrence.live
      ? `${vi.name} ${year} đang diễn ra. Đồng hồ trên trang sẽ tự chuyển sang ${vi.name} lần tới.`
      : `Còn ${dayLabelVi(daysLeft)} nữa là đến ${vi.name} ${year}, ${expectedVi(holiday)}vào ${formatLongVi(occurrence.dateKey)}. Đồng hồ đếm ngược trên trang cập nhật từng giây.`,
  }];
  const next = upcoming.find((key) => key.slice(0, 4) !== year);
  if (next) {
    faq.push({
      q: `${vi.name} ${next.slice(0, 4)} vào ngày nào?`,
      a: `${vi.name} ${next.slice(0, 4)} ${expectedVi(holiday)}rơi vào ${formatLongVi(next)}.`,
    });
  }
  return faq.concat(vi.faq);
}

function vietnameseWorldTimesHtml(item, vi) {
  const { holiday, occurrence } = item;
  if (holiday.scope !== 'global') return '';
  const rows = WORLD_CITIES
    .map((city) => ({ ...city, start: ZonedTime.zonedWallTimeToUtc(occurrence.dateKey, holiday.startTime, city.zone) }))
    .sort((a, b) => a.start - b.start)
    .map((city) => {
      const utc = new Date(city.start).toISOString();
      const utcLabel = `${utc.slice(11, 16)} ${Number(utc.slice(8, 10))}/${Number(utc.slice(5, 7))} (UTC)`;
      const label = UI_VI.cities[city.label] || city.label;
      return `<tr><th scope="row">${escapeHtml(label)}</th><td>${utcLabel}</td><td data-hc-your-time="${city.start}">—</td></tr>`;
    }).join('');
  const year = occurrence.dateKey.slice(0, 4);
  const intro = holiday.moonDisclaimer
    ? `Bảng dưới đây ghi ngày bắt đầu dự kiến lúc ${holiday.startTime} tại từng thành phố. Cơ quan tôn giáo địa phương có thể công bố ngày khác sau khi quan sát trăng lưỡi liềm.`
    : `${vi.name} bắt đầu lúc ${holiday.startTime} theo giờ địa phương, nên đến quần đảo Kiribati đầu tiên và Hawaii sau cùng. Dưới đây là thời điểm bắt đầu tại các thành phố lớn và giờ tương ứng với bạn.`;
  return `
          <h3>${escapeHtml(vi.name)} ${year} bắt đầu lúc nào trên thế giới?</h3>
          <p>${escapeHtml(intro)}</p>
          <div class="hc-table-wrap">
            <table class="hc-table">
              <thead><tr><th scope="col">Thành phố</th><th scope="col">Bắt đầu (UTC)</th><th scope="col">Giờ của bạn</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>`;
}

function vietnameseZonePickerHtml(holiday) {
  if (holiday.scope !== 'global') return '';
  const options = GLOBAL_ZONE_CHOICES
    .map((choice) => `<option value="${choice.zone}">${escapeHtml(UI_VI.cities[choice.label] || choice.label)}</option>`)
    .join('');
  return `          <label class="hc-zone"><svg class="hc-control-icon" aria-hidden="true" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 4 6 4 9s-1 6-4 9c-3-3-4-6-4-9s1-6 4-9Z"/></svg><span class="hc-visually-hidden">${UI_VI.zonePickerLabel}</span>
            <select data-hc-zone name="timezone" autocomplete="off"><option value="local">Múi giờ của tôi</option>${options}</select>
          </label>`;
}

function vietnameseHreflang(slug) {
  const links = [
    `  <link rel="alternate" hreflang="en" href="${pageUrl(slug)}">`,
    `  <link rel="alternate" hreflang="vi" href="${vietnameseUrl(slug)}">`,
  ];
  if (HOLIDAYS_AR[slug]) links.push(`  <link rel="alternate" hreflang="ar" href="${arabicUrl(slug)}">`);
  links.push(`  <link rel="alternate" hreflang="x-default" href="${pageUrl(slug)}">`);
  return links.join('\n');
}

function vietnameseSchema({ canonical, title, description, modified, image, about, breadcrumbName, faq }) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonical}#webpage`,
        url: canonical,
        name: title,
        description,
        inLanguage: 'vi',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        isPartOf: { '@type': 'WebSite', name: 'saptet.vn', url: `${SITE_ORIGIN}/` },
        publisher: { '@id': ORGANIZATION_ID },
        breadcrumb: { '@id': `${canonical}#breadcrumb` },
        primaryImageOfPage: { '@type': 'ImageObject', url: image, ...OG_SIZE },
        about,
      },
      organizationNode(),
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonical}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: UI_VI.hubName, item: vietnameseUrl(HUB_SLUG) },
          { '@type': 'ListItem', position: 2, name: breadcrumbName, item: canonical },
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

function vietnameseOgImage(slug) {
  return `${SITE_ORIGIN}/assets/images/og/vi-${slug}.jpg`;
}

function generateVietnameseDetail(item, items, shared) {
  const { holiday, occurrence, upcoming, daysLeft } = item;
  const vi = HOLIDAYS_VI[holiday.slug];
  const year = occurrence.dateKey.slice(0, 4);
  const canonical = vietnameseUrl(holiday.slug);
  const file = `vi/${holiday.slug}.html`;
  const title = vietnameseTitle(vi, year, holiday.slug);
  const description = vietnameseDescription(item, vi);
  const faq = vietnameseFaq(item, vi);
  const related = holiday.related.map((slug) => vietnameseCardHtml(items.find((candidate) => candidate.holiday.slug === slug))).join('');
  const config = {
    slug: holiday.slug,
    name: vi.name,
    shareMessage: vi.shareMessage,
    visual: holiday.visual,
    palette: holiday.palette,
    scope: holiday.scope,
    zone: holiday.zone || null,
    zoneLabel: holiday.scope === 'national' ? vietnameseZoneLabel(holiday, vi) : null,
    startTime: holiday.startTime,
    durationDays: holiday.durationDays,
    expected: Boolean(holiday.moonDisclaimer),
    dates: item.dates,
    i18n: vietnameseI18n(),
  };
  const heroZone = holiday.scope === 'national' ? holiday.zone : SEO_ZONE_GLOBAL;
  const seeAlso = vi.seeAlso
    ? `          <p class="hc-note hc-see-also"><a href="${vi.seeAlso.href}">${escapeHtml(vi.seeAlso.label)}</a></p>\n`
    : '';
  const template = read('templates/holiday-countdown-vi.html');
  const values = {
    TITLE: escapeHtml(title),
    OG_TITLE: escapeHtml(`${vi.h1} ${year}`),
    OG_IMAGE: vietnameseOgImage(holiday.slug),
    OG_IMAGE_ALT: escapeHtml(`${vi.h1}: còn bao nhiêu ngày nữa đến ${vi.name}`),
    META_DESCRIPTION: escapeHtml(description),
    KEYWORDS: escapeHtml(vi.keywords.concat(`sắp ${vi.name.toLowerCase()} ${year}`).join(', ')),
    CANONICAL: canonical,
    HREFLANG: vietnameseHreflang(holiday.slug),
    PALETTE: paletteStyle(holiday),
    HERO_BACKGROUND: holiday.visual.background,
    HERO_ICON: holiday.visual.icon,
    FOCAL_POINT: holiday.visual.focalPoint,
    SKY: skyHtml(holiday),
    ASSET_VERSION,
    HEADER: vietnameseHeaderHtml(items, holiday.slug),
    FOOTER: vietnameseFooterHtml(holiday.slug),
    H1: escapeHtml(vi.h1),
    NAME: escapeHtml(vi.name),
    YEAR: year,
    DATE_LONG: escapeHtml(formatHeroVi(occurrence.start, heroZone) + (holiday.moonDisclaimer ? UI_VI.expected : '')),
    TARGET_TEXT: escapeHtml(vietnameseTarget(item, vi)),
    SUMMARY_DAYS: escapeHtml(occurrence.live ? fillAr(UI_VI.liveTitle, { name: vi.name }) : dayLabelVi(daysLeft)),
    SUMMARY_REST: escapeHtml(occurrence.live ? UI_VI.liveText : fillAr(UI_VI.summaryRest, { name: vi.name, year })),
    DAYS_LEFT: String(daysLeft),
    ZONE_PICKER: vietnameseZonePickerHtml(holiday),
    ANSWER: escapeHtml(vietnameseAnswer(item, vi)),
    DATE_NOTE: vi.dateNote ? `          <p class="hc-note">${escapeHtml(vi.dateNote)}</p>` : '',
    DATE_ROWS: upcoming.slice(0, 5).map((key) => {
      const p = parts(key);
      return `<tr><td>${p.year}</td><td>${p.day}/${p.month}</td><td>${UI_VI.weekdays[new Date(Date.UTC(p.year, p.month - 1, p.day)).getUTCDay()]}</td></tr>`;
    }).join(''),
    TAGLINE: escapeHtml(vi.tagline),
    ALIASES: escapeHtml(vi.aliases.join(', ')),
    ABOUT: vi.about.map((paragraph) => `          <p>${escapeHtml(paragraph)}</p>`).join('\n'),
    ORIGIN_ROOTS: escapeHtml(vi.origin.roots),
    ORIGIN_COMMUNITIES: escapeHtml(vi.origin.communities),
    TRADITIONS: vi.traditions.map((entry) => `<li>${escapeHtml(entry)}</li>`).join(''),
    SEE_ALSO: seeAlso,
    WORLD_NOTE: escapeHtml(`Các ví dụ dưới đây giới thiệu những truyền thống tiêu biểu theo khu vực và cộng đồng kiều dân, không phải danh sách đầy đủ mọi quốc gia hay cộng đồng đón ${vi.name}; phong tục cũng khác nhau ngay trong một quốc gia.`),
    REGIONS: vi.regions.map((region) => `
            <article class="hc-region">
              <h3>${escapeHtml(region.country)}</h3>
              <p>${escapeHtml(region.note)}</p>
            </article>`).join(''),
    WORLD_TIMES: vietnameseWorldTimesHtml(item, vi),
    FAQ: faq.map((entry) => `<details><summary>${escapeHtml(entry.q)}</summary><p>${escapeHtml(entry.a)}</p></details>`).join(''),
    RELATED: related,
    CONFIG: JSON.stringify(config).replace(/</g, '\\u003c'),
  };
  const nextSignature = signature({ values, template });
  const modified = currentModified(file, nextSignature, shared.today);
  const about = {
    '@type': 'Thing',
    name: vi.name,
    alternateName: vi.aliases.concat(holiday.name).filter((value, index, list) => list.indexOf(value) === index && value !== vi.name),
    sameAs: vi.wikipedia ? [encodeURI(vi.wikipedia), holiday.wikipedia] : holiday.wikipedia,
  };
  const html = replaceTokens(template, {
    ...values,
    SIGNATURE: nextSignature,
    SCHEMA: jsonLd(vietnameseSchema({
      canonical, title, description, modified, image: vietnameseOgImage(holiday.slug), about, breadcrumbName: vi.name, faq,
    })),
  });
  write(file, html);
  return { url: canonical, lastmod: modified };
}

// Alias URL dễ nhớ /sap-<tên-việt>/ (ví dụ /sap-giang-sinh/) → chuyển hướng về trang canonical /vi/<slug>.
// Stub noindex như tin-tuc/<slug>/index.html, không vào sitemap.
function writeVietnameseAlias(item, vi) {
  const { slug } = item.holiday;
  if (!/^sap-[a-z0-9]+(-[a-z0-9]+)*$/.test(vi.sapSlug || '')) throw new Error(`data/holidays-vi.js: ${slug}.sapSlug must look like sap-ten-viet`);
  if (fs.existsSync(path.join(ROOT, `${vi.sapSlug}.html`))) throw new Error(`${vi.sapSlug}.html already exists at the site root`);
  const target = `/vi/${slug}`;
  const label = escapeHtml(`${vi.h1} ${item.occurrence.dateKey.slice(0, 4)}`);
  fs.mkdirSync(path.join(ROOT, vi.sapSlug), { recursive: true });
  write(`${vi.sapSlug}/index.html`, `<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${label} – Đang chuyển hướng…</title>
  <link rel="canonical" href="${SITE_ORIGIN}${target}" />
  <meta http-equiv="refresh" content="0;url=${target}" />
  <meta name="robots" content="noindex, follow" />
  <script>location.replace("${target}");</script>
</head>
<body>
  <p>Đang chuyển đến <a href="${target}">${label}</a>…</p>
</body>
</html>
`);
}

function generateVietnameseHub(items, shared) {
  const canonical = vietnameseUrl(HUB_SLUG);
  const file = `vi/${HUB_SLUG}.html`;
  const sorted = sortedByDate(items);
  const names = sorted.slice(0, 4).map((item) => HOLIDAYS_VI[item.holiday.slug].name);
  const description = `Đếm ngược trực tiếp đến ${names.join(', ')} và nhiều ngày lễ lớn khác trên thế giới, theo múi giờ của từng quốc gia.`;
  const title = fit(['Sắp Giáng sinh, Halloween, Ramadan… Đếm ngược ngày lễ', 'Đếm ngược ngày lễ: Giáng sinh, Halloween, Ramadan…', 'Đếm ngược ngày lễ thế giới'], TITLE_MAX, 'vi hub title');
  const template = read('templates/holidays-index-vi.html');
  const values = {
    TITLE: escapeHtml(title),
    HREFLANG: vietnameseHreflang(HUB_SLUG),
    OG_IMAGE: vietnameseOgImage(HUB_SLUG),
    META_DESCRIPTION: escapeHtml(description),
    CANONICAL: canonical,
    ASSET_VERSION,
    HEADER: vietnameseHeaderHtml(items),
    FOOTER: vietnameseFooterHtml(),
    SECTIONS: HOLIDAY_CATEGORIES.map((category) => {
      const copy = HOLIDAY_CATEGORIES_VI[category.id];
      const inCategory = sorted.filter((item) => item.holiday.category === category.id);
      return `
    <section class="hc-section hc-category" id="${category.id}" aria-labelledby="hc-cat-${category.id}">
      <div class="hc-container">
        <div class="hc-category-head">
          <h2 id="hc-cat-${category.id}">${escapeHtml(copy.title)}</h2>
          <p>${escapeHtml(copy.intro)}</p>
        </div>
        <div class="hc-cards hc-cards--hub">${inCategory.map(vietnameseCardHtml).join('')}
        </div>
      </div>
    </section>`;
    }).join(''),
    CATEGORY_NAV: HOLIDAY_CATEGORIES.map((category) => `<a href="#${category.id}">${escapeHtml(HOLIDAY_CATEGORIES_VI[category.id].title)}</a>`).join(''),
    CONFIG: JSON.stringify({ i18n: vietnameseI18n() }).replace(/</g, '\\u003c'),
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
        name: UI_VI.hubName,
        description,
        inLanguage: 'vi',
        datePublished: PUBLISHED_AT,
        dateModified: modified,
        publisher: { '@id': ORGANIZATION_ID },
        primaryImageOfPage: { '@type': 'ImageObject', url: vietnameseOgImage(HUB_SLUG), ...OG_SIZE },
        mainEntity: { '@id': `${canonical}#list` },
      },
      organizationNode(),
      {
        '@type': 'ItemList',
        '@id': `${canonical}#list`,
        itemListElement: sorted.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: HOLIDAYS_VI[item.holiday.slug].h1,
          url: vietnameseUrl(item.holiday.slug),
        })),
      },
    ],
  };
  write(file, replaceTokens(template, { ...values, SIGNATURE: nextSignature, SCHEMA: jsonLd(schema) }));
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
  for (const holiday of HOLIDAYS_EN) {
    if (!HOLIDAYS_VI[holiday.slug]) throw new Error(`data/holidays-vi.js: missing ${holiday.slug}`);
  }
  fs.mkdirSync(path.join(ROOT, 'vi'), { recursive: true });
  const vietnameseHub = generateVietnameseHub(items, shared);
  const vietnamese = items.map((item) => generateVietnameseDetail(item, items, shared));
  for (const item of items) writeVietnameseAlias(item, HOLIDAYS_VI[item.holiday.slug]);
  updateSitemap([
    { ...hub, priority: '0.7' },
    ...details.map((page) => ({ ...page, priority: '0.8' })),
    { ...vietnameseHub, priority: '0.7' },
    ...vietnamese.map((page) => ({ ...page, priority: '0.8' })),
    ...arabic.map((page) => ({ ...page, priority: '0.8' })),
  ]);
  console.log(`generate-holiday-pages: wrote /${HUB_SLUG}, /vi/${HUB_SLUG}, ${details.length} English, ${vietnamese.length} Vietnamese (+${vietnamese.length} /sap-* aliases) and ${arabic.length} Arabic pages`);
}

if (require.main === module) main();

module.exports = { resolveDates, easterSunday, nthWeekday };

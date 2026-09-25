/**
 * Đồng hồ đếm ngược cho các trang /christmas, /ramadan, /ar/ramadan, … và hub /countdowns.
 * Cần js/zoned-time.js nạp trước. Cấu hình trang nằm trong <script id="holiday-config" type="application/json">;
 * chuỗi hiển thị lấy từ config.i18n (mặc định tiếng Anh), nên cùng một file phục vụ cả trang LTR và RTL.
 */
(function () {
    var ZT = window.ZonedTime;
    if (!ZT) return;

    var STORAGE_KEY = 'saptet.holidayZone';
    var FSI = '⁨';
    var PDI = '⁩';
    var reduceMotion = (function () {
        try { return window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; }
    })();
    var localZone = (function () {
        try { return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'; } catch (e) { return 'UTC'; }
    })();

    var EN = {
        locale: 'en-US',
        hijriLocale: null,
        dayForms: { one: '{n} day', other: '{n} days' },
        summaryRest: 'to go until {name} {year}',
        target: 'Starts at {time} in {zone} ({offset})',
        yourZone: 'your time zone',
        myZone: 'My time zone ({zone})',
        local: 'That is {datetime} where you are.',
        expected: ' (expected)',
        liveTitle: '{name} is here!',
        liveText: 'Enjoy the celebration. {emoji}',
        unknownTitle: 'Next date',
        unknownText: 'to be announced',
        today: 'Today!',
        shareText: '{name} countdown {emoji}',
        shareCopied: 'Link copied. Share it with friends!'
    };

    function strings(config) {
        var out = {};
        var key;
        for (key in EN) out[key] = EN[key];
        var custom = (config && config.i18n) || {};
        for (key in custom) out[key] = custom[key];
        return out;
    }

    function fill(template, values) {
        return String(template).replace(/\{(\w+)\}/g, function (match, name) {
            return values[name] == null ? '' : values[name];
        });
    }

    function dayLabel(T, n) {
        var category = 'other';
        try { category = new Intl.PluralRules(T.locale).select(n); } catch (e) { /* Intl cũ */ }
        var form = T.dayForms[category] || T.dayForms.other;
        return fill(form, { n: n });
    }

    function pad(value) { return String(value).padStart(2, '0'); }

    function readStoredZone() {
        try { return window.localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function storeZone(zone) {
        try { window.localStorage.setItem(STORAGE_KEY, zone); } catch (e) { /* private mode */ }
    }

    function zoneFor(holiday, selected) {
        if (holiday.scope === 'national') return holiday.zone;
        return selected && selected !== 'local' ? selected : localZone;
    }

    function format(locale, ms, options) {
        try { return new Intl.DateTimeFormat(locale, options).format(new Date(ms)); } catch (e) { return ''; }
    }

    function formatDateTime(T, ms, zone, withTime) {
        var options = { timeZone: zone, weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (withTime) { options.hour = 'numeric'; options.minute = '2-digit'; }
        return format(T.locale, ms, options);
    }

    function breakdown(remaining) {
        var total = Math.max(0, Math.floor(remaining / 1000));
        return {
            days: Math.floor(total / 86400),
            hours: Math.floor((total % 86400) / 3600),
            minutes: Math.floor((total % 3600) / 60),
            seconds: total % 60
        };
    }

    function setText(root, selector, value) {
        root.querySelectorAll(selector).forEach(function (el) { el.textContent = value; });
    }

    // Ô đồng hồ: bọc từng chữ số, chỉ chữ số thay đổi mới "lăn" (CSS .hc-d.is-new).
    function setDigits(root, selector, value) {
        root.querySelectorAll(selector).forEach(function (el) {
            var previous = el.getAttribute('data-value');
            if (previous === value) return;
            el.setAttribute('data-value', value);
            if (reduceMotion || previous === null || previous.length !== value.length) {
                el.textContent = value;
                return;
            }
            el.textContent = '';
            for (var i = 0; i < value.length; i++) {
                var digit = document.createElement('span');
                digit.className = value[i] !== previous[i] ? 'hc-d is-new' : 'hc-d';
                digit.textContent = value[i];
                el.appendChild(digit);
            }
        });
    }

    // Số ngày lịch còn lại (khớp câu trả lời SEO), khác với ô "Days" là số ngày trọn vẹn.
    function calendarDaysUntil(occ, now, zone) {
        return Math.max(0, ZT.daysBetween(ZT.todayKey(now, zone), occ.dateKey));
    }

    function initPage(config) {
        var root = document.querySelector('[data-hc-root]');
        if (!root) return;
        var T = strings(config);
        var select = root.querySelector('[data-hc-zone]');
        var selected = 'local';

        if (select) {
            var stored = readStoredZone();
            if (stored && select.querySelector('option[value="' + stored + '"]')) selected = stored;
            select.value = selected;
            select.addEventListener('change', function () {
                selected = select.value;
                storeZone(selected);
                tick();
            });
            var localOption = select.querySelector('option[value="local"]');
            if (localOption) localOption.textContent = fill(T.myZone, { zone: localZone.replace(/_/g, ' ') });
        }

        function tick() {
            var now = Date.now();
            var zone = zoneFor(config, selected);
            var occ = ZT.nextOccurrence(config, now, zone);
            if (!occ) {
                root.classList.add('is-unknown');
                setText(root, '[data-hc-summary-days]', T.unknownTitle);
                setText(root, '[data-hc-summary-rest]', T.unknownText);
                return;
            }
            var year = occ.dateKey.slice(0, 4);
            var parts = breakdown(occ.start - now);
            var vars = { name: config.name, emoji: config.emoji || '', year: year };
            root.classList.toggle('is-live', occ.live);
            setDigits(root, '[data-hc-unit="days"]', String(parts.days));
            setDigits(root, '[data-hc-unit="hours"]', pad(parts.hours));
            setDigits(root, '[data-hc-unit="minutes"]', pad(parts.minutes));
            setDigits(root, '[data-hc-unit="seconds"]', pad(parts.seconds));
            setText(document, '[data-hc-year]', year);
            setText(root, '[data-hc-date]', formatDateTime(T, occ.start, zone, false) + (config.expected ? T.expected : ''));
            if (T.hijriLocale) {
                setText(root, '[data-hc-hijri]', format(T.hijriLocale, occ.start, { timeZone: zone, day: 'numeric', month: 'long', year: 'numeric' }));
            }
            if (occ.live) {
                setText(root, '[data-hc-summary-days]', fill(T.liveTitle, vars));
                setText(root, '[data-hc-summary-rest]', fill(T.liveText, vars));
            } else {
                setText(root, '[data-hc-summary-days]', dayLabel(T, calendarDaysUntil(occ, now, zone)));
                setText(root, '[data-hc-summary-rest]', fill(T.summaryRest, vars));
            }

            var zoneName = config.scope === 'national'
                ? config.zoneLabel
                : (select && selected !== 'local' ? select.options[select.selectedIndex].text : T.yourZone);
            // FSI/PDI cô lập "UTC+3" để dấu ngoặc không bị đảo trong câu RTL.
            setText(root, '[data-hc-target]', fill(T.target, {
                time: format(T.locale, occ.start, { timeZone: zone, hour: 'numeric', minute: '2-digit' }),
                zone: zoneName,
                offset: FSI + ZT.formatOffset(occ.start, zone) + PDI
            }));

            var localNote = '';
            if (config.scope === 'national' && ZT.offsetAt(occ.start, localZone) !== ZT.offsetAt(occ.start, zone)) {
                localNote = fill(T.local, { datetime: formatDateTime(T, occ.start, localZone, true) });
            }
            setText(root, '[data-hc-local]', localNote);
        }

        tick();
        window.setInterval(tick, 1000);
        initShare(root, config, T);
    }

    function initShare(root, config, T) {
        var button = root.querySelector('[data-hc-share]');
        var status = root.querySelector('[data-hc-share-status]');
        if (!button) return;
        var canonical = document.querySelector('link[rel="canonical"]');
        var url = canonical ? canonical.href : window.location.href;
        var title = document.title;

        function say(message) {
            if (!status) return;
            status.textContent = message;
            window.setTimeout(function () { status.textContent = ''; }, 3000);
        }

        button.addEventListener('click', function () {
            if (navigator.share) {
                navigator.share({ title: title, text: fill(T.shareText, { name: config.name, emoji: config.emoji || '' }), url: url })
                    .catch(function () { /* người dùng huỷ */ });
                return;
            }
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url)
                    .then(function () { say(T.shareCopied); })
                    .catch(function () { say(url); });
                return;
            }
            say(url);
        });
    }

    // Thẻ nhỏ ở hub và khối "More countdowns": chỉ cập nhật số ngày.
    function initCards(T) {
        var cards = document.querySelectorAll('[data-hc-card]');
        if (!cards.length) return;
        function update() {
            var now = Date.now();
            cards.forEach(function (card) {
                var holiday = {
                    dates: card.getAttribute('data-dates').split(','),
                    startTime: card.getAttribute('data-start-time'),
                    durationDays: Number(card.getAttribute('data-duration')) || 1
                };
                var zone = card.getAttribute('data-zone') || localZone;
                var occ = ZT.nextOccurrence(holiday, now, zone);
                var label = card.querySelector('[data-hc-card-days]');
                if (!label || !occ) return;
                label.textContent = occ.live ? T.today : dayLabel(T, calendarDaysUntil(occ, now, zone));
            });
        }
        update();
        window.setInterval(update, 60000);
    }

    // Bảng "start around the world": đổi mốc UTC sang giờ của khách.
    function initWorldTimes(T) {
        document.querySelectorAll('[data-hc-your-time]').forEach(function (cell) {
            var ms = Number(cell.getAttribute('data-hc-your-time'));
            if (!Number.isFinite(ms)) return;
            cell.textContent = format(T.locale, ms, { timeZone: localZone, month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
        });
    }

    // Section bên dưới hiện dần khi cuộn tới; hiệu ứng nền tạm dừng khi hero khuất.
    function initMotion() {
        if (reduceMotion || !('IntersectionObserver' in window)) return;
        var targets = document.querySelectorAll('.hc-section .hc-container > *, .hc-section > .hc-breadcrumb');
        var reveal = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                reveal.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        targets.forEach(function (el) {
            // Phần đã nằm trong màn hình lúc tải thì giữ nguyên, tránh nháy.
            if (el.getBoundingClientRect().top < window.innerHeight) return;
            el.classList.add('hc-reveal');
            reveal.observe(el);
        });

        var hero = document.querySelector('.hc-hero');
        if (hero && hero.querySelector('[data-hc-sky]')) {
            new IntersectionObserver(function (entries) {
                hero.classList.toggle('is-offscreen', !entries[0].isIntersecting);
            }).observe(hero);
        }
    }

    var config = null;
    var configEl = document.getElementById('holiday-config');
    if (configEl) {
        try { config = JSON.parse(configEl.textContent); } catch (e) { config = null; /* cấu hình hỏng: giữ số pre-render */ }
    }
    if (config) initPage(config);
    var pageStrings = strings(config);
    initCards(pageStrings);
    initWorldTimes(pageStrings);
    initMotion();
})();

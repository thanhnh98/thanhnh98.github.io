/**
 * Đồng hồ đếm ngược cho các trang /christmas, /vi/christmas, /ar/ramadan, … và hub /countdowns, /vi/countdowns.
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
        liveText: 'Enjoy the celebration.',
        unknownTitle: 'Next date',
        unknownText: 'to be announced',
        today: 'Today!',
        shareText: '{name} countdown',
        shareCopied: 'Link copied. Share it with friends!',
        shareCaptured: 'Captured {datetime}',
        shareEyebrow: 'THE MOMENT IS GETTING CLOSER',
        shareReady: 'Your countdown image is ready.',
        shareFailed: 'We could not create the image. Please try again.',
        shareDownloaded: 'Countdown image downloaded.',
        shareUnavailable: 'Direct image sharing is not available, so the image was downloaded instead.',
        shareFooter: '{name} countdown',
        shareUnits: { days: 'DAYS', hours: 'HOURS', minutes: 'MINUTES', seconds: 'SECONDS' }
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

    function loadImage(src) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.decoding = 'async';
            image.onload = function () { resolve(image); };
            image.onerror = reject;
            image.src = src;
        });
    }

    function roundedRect(ctx, x, y, width, height, radius) {
        var r = Math.min(radius, width / 2, height / 2);
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + width, y, x + width, y + height, r);
        ctx.arcTo(x + width, y + height, x, y + height, r);
        ctx.arcTo(x, y + height, x, y, r);
        ctx.arcTo(x, y, x + width, y, r);
        ctx.closePath();
    }

    function drawCover(ctx, image, width, height, overscan) {
        var scale = Math.max((width + overscan * 2) / image.naturalWidth, (height + overscan * 2) / image.naturalHeight);
        var drawWidth = image.naturalWidth * scale;
        var drawHeight = image.naturalHeight * scale;
        ctx.drawImage(image, (width - drawWidth) / 2, (height - drawHeight) / 2, drawWidth, drawHeight);
    }

    function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
        var words = String(text).split(/\s+/);
        var lines = [];
        var line = '';
        words.forEach(function (word) {
            var next = line ? line + ' ' + word : word;
            if (line && ctx.measureText(next).width > maxWidth) {
                lines.push(line);
                line = word;
            } else {
                line = next;
            }
        });
        if (line) lines.push(line);
        if (maxLines && lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
            while (ctx.measureText(lines[lines.length - 1] + '…').width > maxWidth) {
                lines[lines.length - 1] = lines[lines.length - 1].slice(0, -1);
            }
            lines[lines.length - 1] += '…';
        }
        lines.forEach(function (entry, index) { ctx.fillText(entry, x, y + index * lineHeight); });
        return y + lines.length * lineHeight;
    }

    function canvasBlob(canvas) {
        return new Promise(function (resolve, reject) {
            canvas.toBlob(function (blob) { blob ? resolve(blob) : reject(new Error('Canvas export failed')); }, 'image/png');
        });
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
            var vars = { name: config.name, year: year };
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
        var dialog = document.querySelector('[data-hc-share-dialog]');
        var canvas = dialog && dialog.querySelector('[data-hc-share-canvas]');
        var preview = dialog && dialog.querySelector('[data-hc-share-preview]');
        var loading = dialog && dialog.querySelector('[data-hc-share-loading]');
        var dialogStatus = dialog && dialog.querySelector('[data-hc-share-dialog-status]');
        var shareImage = dialog && dialog.querySelector('[data-hc-share-image]');
        var downloadImage = dialog && dialog.querySelector('[data-hc-share-download]');
        var close = dialog && dialog.querySelector('[data-hc-share-close]');
        if (!button || !dialog || !canvas) return;
        var canonical = document.querySelector('link[rel="canonical"]');
        var url = canonical ? canonical.href : window.location.href;
        var title = document.title;
        var latestBlob = null;
        var latestFileName = '';

        function say(message) {
            if (!status) return;
            status.textContent = message;
            window.setTimeout(function () { status.textContent = ''; }, 3000);
        }

        function setDialogStatus(message) {
            if (dialogStatus) dialogStatus.textContent = message;
        }

        function openDialog() {
            if (typeof dialog.showModal === 'function') dialog.showModal();
            else dialog.setAttribute('open', '');
        }

        function closeDialog() {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');
        }

        function downloadBlob(blob, fileName) {
            var objectUrl = URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.href = objectUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(function () { URL.revokeObjectURL(objectUrl); }, 1000);
        }

        async function renderShareImage() {
            var select = root.querySelector('[data-hc-zone]');
            var selected = select ? select.value : 'local';
            var zone = zoneFor(config, selected);
            var capturedAt = Date.now();
            var occ = ZT.nextOccurrence(config, capturedAt, zone);
            if (!occ) throw new Error('No upcoming occurrence');
            var remaining = breakdown(occ.start - capturedAt);
            var year = occ.dateKey.slice(0, 4);
            var palette = config.palette || { paper: '#f5efe5', ink: '#20202a', accent: '#b24836' };
            var backgroundPath = config.visual && config.visual.background;
            var iconPath = config.visual && config.visual.icon;
            var images = await Promise.all([loadImage(backgroundPath), loadImage(iconPath)]);
            if (document.fonts && document.fonts.ready) await document.fonts.ready;

            var ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var rtl = document.documentElement.dir === 'rtl';
            var textX = rtl ? width - 100 : 100;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.filter = 'blur(24px) saturate(1.12)';
            drawCover(ctx, images[0], width, height, 50);
            ctx.restore();
            ctx.fillStyle = palette.paper;
            ctx.globalAlpha = 0.76;
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1;

            // Hình học trang trí nhẹ để ảnh có nhịp điệu mà không cạnh tranh với số đếm.
            ctx.strokeStyle = palette.accent;
            ctx.globalAlpha = 0.24;
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.arc(1080, 125, 155, 0, Math.PI * 2); ctx.stroke();
            ctx.beginPath(); ctx.arc(75, 1370, 210, 0, Math.PI * 2); ctx.stroke();
            ctx.globalAlpha = 1;

            roundedRect(ctx, 72, 62, width - 144, height - 124, 48);
            ctx.fillStyle = palette.paper;
            ctx.globalAlpha = 0.78;
            ctx.fill();
            ctx.globalAlpha = 1;

            ctx.drawImage(images[1], rtl ? width - 240 : 100, 105, 140, 140);
            ctx.direction = rtl ? 'rtl' : 'ltr';
            ctx.textAlign = rtl ? 'right' : 'left';
            ctx.fillStyle = palette.accent;
            ctx.font = '800 25px system-ui, sans-serif';
            ctx.fillText(T.shareEyebrow, textX, 310);

            ctx.fillStyle = palette.ink;
            ctx.font = rtl ? '800 72px "Noto Kufi Arabic", sans-serif' : '800 84px "Fraunces", Georgia, serif';
            var titleEnd = wrapText(ctx, config.name + ' ' + year, textX, 410, 1000, rtl ? 105 : 92, 2);
            ctx.fillStyle = palette.accent;
            ctx.font = rtl ? '700 36px "Noto Sans Arabic", sans-serif' : '700 39px system-ui, sans-serif';
            wrapText(ctx, config.shareMessage, textX, titleEnd + 42, 990, 52, 2);

            var values = [String(remaining.days), pad(remaining.hours), pad(remaining.minutes), pad(remaining.seconds)];
            var units = [T.shareUnits.days, T.shareUnits.hours, T.shareUnits.minutes, T.shareUnits.seconds];
            var cardY = 730;
            var cardWidth = 232;
            var cardGap = 22;
            var startX = 103;
            for (var i = 0; i < 4; i++) {
                var cardX = startX + i * (cardWidth + cardGap);
                roundedRect(ctx, cardX, cardY, cardWidth, 255, 28);
                ctx.fillStyle = palette.ink;
                ctx.fill();
                ctx.textAlign = 'center';
                ctx.direction = 'ltr';
                ctx.fillStyle = palette.paper;
                ctx.font = '800 82px "Fraunces", Georgia, serif';
                ctx.fillText(values[i], cardX + cardWidth / 2, cardY + 115);
                ctx.fillStyle = palette.paper;
                ctx.globalAlpha = 0.72;
                ctx.font = '800 21px system-ui, sans-serif';
                ctx.fillText(units[i], cardX + cardWidth / 2, cardY + 183);
                ctx.globalAlpha = 1;
            }

            ctx.direction = rtl ? 'rtl' : 'ltr';
            ctx.textAlign = rtl ? 'right' : 'left';
            ctx.fillStyle = palette.ink;
            ctx.font = rtl ? '700 30px "Noto Sans Arabic", sans-serif' : '700 31px system-ui, sans-serif';
            wrapText(ctx, formatDateTime(T, occ.start, zone, false) + (config.expected ? T.expected : ''), textX, 1085, 1000, 45, 2);
            ctx.fillStyle = palette.ink;
            ctx.globalAlpha = 0.66;
            ctx.font = rtl ? '500 23px "Noto Sans Arabic", sans-serif' : '600 23px system-ui, sans-serif';
            ctx.fillText(fill(T.shareCaptured, { datetime: formatDateTime(T, capturedAt, localZone, true) }), textX, 1215);
            ctx.globalAlpha = 1;

            ctx.strokeStyle = palette.accent;
            ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(100, 1270); ctx.lineTo(width - 100, 1270); ctx.stroke();
            ctx.fillStyle = palette.ink;
            ctx.font = '800 27px system-ui, sans-serif';
            ctx.textAlign = rtl ? 'right' : 'left';
            ctx.fillText('saptet.vn', textX, 1335);
            ctx.fillStyle = palette.accent;
            ctx.font = rtl ? '700 24px "Noto Sans Arabic", sans-serif' : '700 24px system-ui, sans-serif';
            ctx.textAlign = rtl ? 'left' : 'right';
            ctx.fillText(fill(T.shareFooter, { name: config.name }), rtl ? 100 : width - 100, 1335);

            canvas.setAttribute('aria-label', fill(T.shareText, { name: config.name }) + ': ' + values.join(', '));
            latestFileName = config.slug + '-countdown-' + year + '.png';
            return canvasBlob(canvas);
        }

        button.addEventListener('click', async function () {
            latestBlob = null;
            preview.setAttribute('aria-busy', 'true');
            if (loading) loading.hidden = false;
            shareImage.disabled = true;
            downloadImage.disabled = true;
            setDialogStatus('');
            openDialog();
            try {
                latestBlob = await renderShareImage();
                preview.setAttribute('aria-busy', 'false');
                if (loading) loading.hidden = true;
                shareImage.disabled = false;
                downloadImage.disabled = false;
                setDialogStatus(T.shareReady);
            } catch (error) {
                preview.setAttribute('aria-busy', 'false');
                if (loading) loading.hidden = true;
                setDialogStatus(T.shareFailed);
            }
        });

        downloadImage.addEventListener('click', function () {
            if (!latestBlob) return;
            downloadBlob(latestBlob, latestFileName);
            setDialogStatus(T.shareDownloaded);
        });

        shareImage.addEventListener('click', async function () {
            if (!latestBlob) return;
            if (typeof File !== 'function') {
                downloadBlob(latestBlob, latestFileName);
                setDialogStatus(T.shareUnavailable);
                return;
            }
            var file = new File([latestBlob], latestFileName, { type: 'image/png' });
            var payload = { files: [file], title: title, text: fill(T.shareText, { name: config.name }), url: url };
            if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
                try { await navigator.share(payload); } catch (error) { if (error.name !== 'AbortError') setDialogStatus(T.shareFailed); }
                return;
            }
            downloadBlob(latestBlob, latestFileName);
            setDialogStatus(T.shareUnavailable);
        });

        close.addEventListener('click', closeDialog);
        dialog.addEventListener('click', function (event) { if (event.target === dialog) closeDialog(); });
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

    // Menu "More / Xem thêm" (<details>): đóng khi bấm ra ngoài, nhấn Esc hoặc chọn một mục.
    function initMenus() {
        var menus = document.querySelectorAll('[data-hc-menu]');
        if (!menus.length) return;
        document.addEventListener('click', function (event) {
            menus.forEach(function (menu) {
                if (menu.open && !menu.contains(event.target)) menu.open = false;
            });
        });
        document.addEventListener('keydown', function (event) {
            if (event.key !== 'Escape') return;
            menus.forEach(function (menu) {
                if (!menu.open) return;
                menu.open = false;
                var toggle = menu.querySelector('summary');
                if (toggle) toggle.focus();
            });
        });
        menus.forEach(function (menu) {
            menu.addEventListener('click', function (event) {
                if (event.target.closest && event.target.closest('a')) menu.open = false;
            });
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

        function syncVisibility() {
            if (hero) hero.classList.toggle('is-page-hidden', document.hidden);
        }
        document.addEventListener('visibilitychange', syncVisibility);
        syncVisibility();
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
    initMenus();
    initMotion();
})();

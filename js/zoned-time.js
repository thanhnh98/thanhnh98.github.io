/**
 * Múi giờ IANA ↔ thời điểm UTC, không phụ thuộc thư viện.
 * Dùng chung cho trang đếm ngược tiếng Anh (browser) và scripts/generate-holiday-pages.js (Node).
 */
(function (root, factory) {
    var api = factory();
    if (typeof module === 'object' && module.exports) module.exports = api;
    else root.ZonedTime = api;
})(typeof self !== 'undefined' ? self : this, function () {
    var DAY_MS = 86400000;
    var formatters = {};

    function formatterFor(timeZone) {
        if (!formatters[timeZone]) {
            formatters[timeZone] = new Intl.DateTimeFormat('en-US', {
                timeZone: timeZone,
                hourCycle: 'h23',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
        return formatters[timeZone];
    }

    function wallParts(ms, timeZone) {
        var map = {};
        formatterFor(timeZone).formatToParts(new Date(ms)).forEach(function (part) {
            map[part.type] = part.value;
        });
        return {
            year: Number(map.year),
            month: Number(map.month),
            day: Number(map.day),
            hour: Number(map.hour) % 24,
            minute: Number(map.minute),
            second: Number(map.second)
        };
    }

    // Độ lệch (ms) của timeZone so với UTC tại thời điểm ms.
    function offsetAt(ms, timeZone) {
        var p = wallParts(ms, timeZone);
        var asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
        return asUtc - Math.floor(ms / 1000) * 1000;
    }

    // "2026-12-25" + "00:00" tại timeZone → epoch ms. Lặp hai lần để đúng quanh mốc DST.
    function zonedWallTimeToUtc(dateKey, time, timeZone) {
        var d = dateKey.split('-').map(Number);
        var t = (time || '00:00').split(':').map(Number);
        var guess = Date.UTC(d[0], d[1] - 1, d[2], t[0], t[1] || 0);
        var first = guess - offsetAt(guess, timeZone);
        var second = guess - offsetAt(first, timeZone);
        return second;
    }

    function todayKey(ms, timeZone) {
        var p = wallParts(ms, timeZone);
        return p.year + '-' + String(p.month).padStart(2, '0') + '-' + String(p.day).padStart(2, '0');
    }

    // Số ngày lịch giữa hai dateKey (b - a).
    function daysBetween(a, b) {
        var pa = a.split('-').map(Number);
        var pb = b.split('-').map(Number);
        return Math.round((Date.UTC(pb[0], pb[1] - 1, pb[2]) - Date.UTC(pa[0], pa[1] - 1, pa[2])) / DAY_MS);
    }

    // "UTC+5:30", "UTC−5"
    function formatOffset(ms, timeZone) {
        var minutes = Math.round(offsetAt(ms, timeZone) / 60000);
        if (minutes === 0) return 'UTC';
        var sign = minutes > 0 ? '+' : '−';
        var abs = Math.abs(minutes);
        var h = Math.floor(abs / 60);
        var m = abs % 60;
        return 'UTC' + sign + h + (m ? ':' + String(m).padStart(2, '0') : '');
    }

    /**
     * Lần diễn ra hiện tại/tiếp theo trong danh sách dateKey.
     * holiday: { dates: [...], startTime, durationDays }
     * → { dateKey, start, end, live } hoặc null khi đã hết dữ liệu.
     */
    function nextOccurrence(holiday, nowMs, timeZone) {
        var duration = (holiday.durationDays || 1) * DAY_MS;
        var dates = holiday.dates.slice().sort();
        for (var i = 0; i < dates.length; i++) {
            var start = zonedWallTimeToUtc(dates[i], holiday.startTime, timeZone);
            var end = start + duration;
            if (end > nowMs) {
                return { dateKey: dates[i], start: start, end: end, live: start <= nowMs };
            }
        }
        return null;
    }

    return {
        DAY_MS: DAY_MS,
        wallParts: wallParts,
        offsetAt: offsetAt,
        zonedWallTimeToUtc: zonedWallTimeToUtc,
        todayKey: todayKey,
        daysBetween: daysBetween,
        formatOffset: formatOffset,
        nextOccurrence: nextOccurrence
    };
});

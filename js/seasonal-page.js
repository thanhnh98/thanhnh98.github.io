(function () {
    function pad(value) { return String(value).padStart(2, '0'); }
    function formatDate(date) { return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/'); }

    function vietnamTodayKey() {
        var parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Ho_Chi_Minh', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
        function part(type) { return parts.find(function (item) { return item.type === type; }).value; }
        return part('year') + '-' + part('month') + '-' + part('day');
    }

    function calendarDaysUntil(dateKey) {
        var today = vietnamTodayKey().split('-').map(Number);
        var target = dateKey.split('-').map(Number);
        return Math.max(0, Math.round((Date.UTC(target[0], target[1] - 1, target[2]) - Date.UTC(today[0], today[1] - 1, today[2])) / 86400000));
    }

    function noelYear() {
        var today = vietnamTodayKey();
        var year = Number(today.slice(0, 4));
        return today > year + '-12-25' ? year + 1 : year;
    }

    function noelAnswer(year) {
        var dateKey = year + '-12-25';
        var days = calendarDaysUntil(dateKey);
        var weekday = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][new Date(Date.UTC(year, 11, 25)).getUTCDay()];
        return days === 0
            ? 'Hôm nay là Noel ' + year + ', ' + weekday + ' ngày 25/12/' + year + '.'
            : 'Còn ' + days + ' ngày lịch nữa đến Noel ' + year + ', ' + weekday + ' ngày 25/12/' + year + '.';
    }

    function getNoelDate() {
        return new Date(noelYear() + '-12-25T00:00:00+07:00');
    }

    function getTarget(kind) {
        if (kind === 'mid-autumn' && typeof window.getNextTrungThu === 'function') return window.getNextTrungThu().date;
        return getNoelDate();
    }

    function initCountdown(element) {
        var kind = element.getAttribute('data-seasonal-countdown');
        var target = getTarget(kind);
        var dateLabel = document.querySelector('[data-seasonal-date]');

        function update() {
            if (kind === 'christmas') target = getNoelDate();
            var year = kind === 'christmas' ? noelYear() : target.getFullYear();
            document.querySelectorAll('[data-seasonal-year]').forEach(function (label) { label.textContent = String(year); });
            if (dateLabel) dateLabel.textContent = kind === 'christmas' ? 'Giáng Sinh: 25/12/' + year : 'Tết Trung Thu: ' + formatDate(target);
            if (kind === 'christmas') document.querySelectorAll('[data-noel-answer]').forEach(function (answer) { answer.textContent = noelAnswer(year); });
            var remaining = Math.max(0, target.getTime() - Date.now());
            var total = Math.floor(remaining / 1000);
            var values = { days: Math.floor(total / 86400), hours: Math.floor((total % 86400) / 3600), minutes: Math.floor((total % 3600) / 60), seconds: total % 60 };
            Object.keys(values).forEach(function (unit) {
                var field = element.querySelector('[data-unit="' + unit + '"]');
                if (field) field.textContent = unit === 'days' ? String(values[unit]) : pad(values[unit]);
            });
        }

        update();
        window.setInterval(update, 1000);
    }

    var shareButton = document.querySelector('[data-seasonal-share]');
    if (shareButton) shareButton.addEventListener('click', async function () {
        var payload = { title: document.title, text: document.querySelector('meta[name="description"]')?.content || '', url: location.href };
        if (navigator.share) {
            try { await navigator.share(payload); } catch (error) { return; }
        } else if (navigator.clipboard) {
            await navigator.clipboard.writeText(location.href);
            shareButton.textContent = 'Đã sao chép liên kết';
        }
    });

    document.querySelectorAll('[data-seasonal-countdown]').forEach(initCountdown);
})();

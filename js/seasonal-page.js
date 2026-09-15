(function () {
    function pad(value) { return String(value).padStart(2, '0'); }
    function formatDate(date) { return [pad(date.getDate()), pad(date.getMonth() + 1), date.getFullYear()].join('/'); }

    function getNoelDate() {
        var now = new Date();
        var target = new Date(now.getFullYear(), 11, 25);
        if (now >= target) target = new Date(now.getFullYear() + 1, 11, 25);
        return target;
    }

    function getTarget(kind) {
        if (kind === 'mid-autumn' && typeof window.getNextTrungThu === 'function') return window.getNextTrungThu().date;
        return getNoelDate();
    }

    function initCountdown(element) {
        var kind = element.getAttribute('data-seasonal-countdown');
        var target = getTarget(kind);
        var dateLabel = document.querySelector('[data-seasonal-date]');
        document.querySelectorAll('[data-seasonal-year]').forEach(function (label) { label.textContent = String(target.getFullYear()); });
        if (dateLabel) dateLabel.textContent = (kind === 'mid-autumn' ? 'Tết Trung Thu: ' : 'Giáng Sinh: ') + formatDate(target);

        function update() {
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

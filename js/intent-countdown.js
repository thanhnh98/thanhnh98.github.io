(function () {
    function pad(value) { return String(value).padStart(2, '0'); }

    function initCountdown(element) {
        var target = new Date(element.getAttribute('data-target'));
        if (Number.isNaN(target.getTime())) return;
        var fields = {
            days: element.querySelector('[data-unit="days"]'),
            hours: element.querySelector('[data-unit="hours"]'),
            minutes: element.querySelector('[data-unit="minutes"]'),
            seconds: element.querySelector('[data-unit="seconds"]')
        };

        function update() {
            var remaining = Math.max(0, target.getTime() - Date.now());
            var totalSeconds = Math.floor(remaining / 1000);
            var values = {
                days: Math.floor(totalSeconds / 86400),
                hours: Math.floor((totalSeconds % 86400) / 3600),
                minutes: Math.floor((totalSeconds % 3600) / 60),
                seconds: totalSeconds % 60
            };
            if (fields.days) fields.days.textContent = String(values.days);
            if (fields.hours) fields.hours.textContent = pad(values.hours);
            if (fields.minutes) fields.minutes.textContent = pad(values.minutes);
            if (fields.seconds) fields.seconds.textContent = pad(values.seconds);
        }

        update();
        window.setInterval(update, 1000);
    }

    document.querySelectorAll('[data-intent-countdown]').forEach(initCountdown);
})();

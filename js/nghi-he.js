(function (root, factory) {
    const api = factory();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }

    if (root) {
        root.SummerBreakCountdown = api;
    }
})(typeof window !== 'undefined' ? window : globalThis, function () {
    'use strict';

    const VIETNAM_TIME_ZONE = 'Asia/Ho_Chi_Minh';
    const TARGET_MONTH = 5;
    const TARGET_DAY = 31;
    const SCHOOL_START_MONTH = 9;
    const SCHOOL_START_DAY = 5;

    function getVietnamYear(date) {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: VIETNAM_TIME_ZONE,
            year: 'numeric'
        });
        return Number(formatter.format(date));
    }

    function vietnamDate(year, month, day) {
        const monthText = String(month).padStart(2, '0');
        const dayText = String(day).padStart(2, '0');
        return new Date(`${year}-${monthText}-${dayText}T00:00:00+07:00`);
    }

    function getSummerBreakState(input) {
        const now = input instanceof Date ? new Date(input.getTime()) : new Date(input);
        if (Number.isNaN(now.getTime())) {
            throw new TypeError('Thời điểm không hợp lệ');
        }

        const vietnamYear = getVietnamYear(now);
        const thisYearTarget = vietnamDate(vietnamYear, TARGET_MONTH, TARGET_DAY);
        const schoolStart = vietnamDate(vietnamYear, SCHOOL_START_MONTH, SCHOOL_START_DAY);

        if (now < thisYearTarget) {
            return {
                mode: 'countdown',
                target: thisYearTarget,
                targetYear: vietnamYear
            };
        }

        if (now < schoolStart) {
            return {
                mode: 'summer',
                target: null,
                targetYear: vietnamYear
            };
        }

        const nextYear = vietnamYear + 1;
        return {
            mode: 'countdown',
            target: vietnamDate(nextYear, TARGET_MONTH, TARGET_DAY),
            targetYear: nextYear
        };
    }

    function getRemaining(target, now) {
        const remainingSeconds = Math.max(0, Math.floor((target.getTime() - now.getTime()) / 1000));
        return {
            days: Math.floor(remainingSeconds / 86400),
            hours: Math.floor((remainingSeconds % 86400) / 3600),
            minutes: Math.floor((remainingSeconds % 3600) / 60),
            seconds: remainingSeconds % 60
        };
    }

    function pad(value) {
        return String(value).padStart(2, '0');
    }

    function initCountdown() {
        const countdown = document.querySelector('[data-summer-countdown]');
        if (!countdown) return;

        const fields = {
            days: countdown.querySelector('[data-unit="days"]'),
            hours: countdown.querySelector('[data-unit="hours"]'),
            minutes: countdown.querySelector('[data-unit="minutes"]'),
            seconds: countdown.querySelector('[data-unit="seconds"]')
        };
        const heading = document.querySelector('[data-summer-status]');
        const note = document.querySelector('[data-summer-note]');
        const targetLabel = document.querySelector('[data-summer-target]');
        let lastMode = '';
        let lastTargetYear = 0;

        function render() {
            const now = new Date();
            const state = getSummerBreakState(now);

            document.querySelectorAll('[data-summer-year]').forEach(function (element) {
                element.textContent = String(state.targetYear);
            });

            if (state.mode === 'summer') {
                fields.days.textContent = '0';
                fields.hours.textContent = '00';
                fields.minutes.textContent = '00';
                fields.seconds.textContent = '00';
                if (lastMode !== state.mode || lastTargetYear !== state.targetYear) {
                    heading.textContent = 'Nghỉ hè rồi!';
                    note.textContent = 'Chúc các em có một mùa hè vui, an toàn và thật nhiều trải nghiệm đẹp.';
                    targetLabel.textContent = `Mùa hè ${state.targetYear} · Hẹn gặp lại năm học mới`;
                    document.body.classList.add('summer-has-arrived');
                }
            } else {
                const remaining = getRemaining(state.target, now);
                fields.days.textContent = String(remaining.days);
                fields.hours.textContent = pad(remaining.hours);
                fields.minutes.textContent = pad(remaining.minutes);
                fields.seconds.textContent = pad(remaining.seconds);
                if (lastMode !== state.mode || lastTargetYear !== state.targetYear) {
                    heading.textContent = `Đếm ngược nghỉ hè ${state.targetYear}`;
                    note.textContent = 'Cùng hoàn thành thật tốt những ngày học còn lại nhé!';
                    targetLabel.textContent = `Mốc tham khảo: 00:00 ngày 31/05/${state.targetYear} (giờ Việt Nam)`;
                    document.body.classList.remove('summer-has-arrived');
                }
            }

            lastMode = state.mode;
            lastTargetYear = state.targetYear;
        }

        render();
        window.setInterval(render, 1000);
    }

    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initCountdown);
        } else {
            initCountdown();
        }
    }

    return {
        VIETNAM_TIME_ZONE,
        getVietnamYear,
        vietnamDate,
        getSummerBreakState,
        getRemaining
    };
});

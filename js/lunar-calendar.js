/**
 * Vietnamese lunar calendar conversion utilities.
 * Ported from astronomical formula in:
 * https://gist.githubusercontent.com/thanhnh98/03293613fb04a7a4cc3cb40d3914c968/raw/0aff4b90791441fc2c50d825eacd1f0970572e22/VietnameseLunarCalendar.kt
 */

const VIETNAM_TIME_ZONE = 7.0;
const LUNAR_YEAR_DATA = {}; // Backward compatibility for legacy imports.
const ZODIAC_ANIMALS = ['Ty', 'Suu', 'Dan', 'Mao', 'Thin', 'Ty', 'Ngo', 'Mui', 'Than', 'Dau', 'Tuat', 'Hoi'];

const _solarToLunarCache = new Map();
const _lunarToSolarYearIndex = new Map();

function _toDateKey(year, month, day) {
    return String(year) + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0');
}

function _fromDate(date) {
    return {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
    };
}

function jdFromDate(day, month, year) {
    const a = Math.floor((14 - month) / 12);
    const y = year + 4800 - a;
    const m = month + 12 * a - 3;
    let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y
        + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
    if (jd < 2299161) {
        jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }
    return jd;
}

function newMoon(k) {
    const t = k / 1236.85;
    const t2 = t * t;
    const t3 = t2 * t;
    const dr = Math.PI / 180;

    let jd1 = 2415020.75933 + 29.53058868 * k + 0.0001178 * t2 - 0.000000155 * t3;
    jd1 += 0.00033 * Math.sin((166.56 + 132.87 * t - 0.009173 * t2) * dr);

    const m = 359.2242 + 29.10535608 * k - 0.0000333 * t2 - 0.00000347 * t3;
    const mpr = 306.0253 + 385.81691806 * k + 0.0107306 * t2 + 0.00001236 * t3;
    const f = 21.2964 + 390.67050646 * k - 0.0016528 * t2 - 0.00000239 * t3;

    const c1 = (0.1734 - 0.000393 * t) * Math.sin(m * dr) + 0.0021 * Math.sin(2 * dr * m);
    const c2 = -0.4068 * Math.sin(mpr * dr) + 0.0161 * Math.sin(dr * 2 * mpr);
    const c3 = -0.0004 * Math.sin(dr * 3 * mpr) + 0.0104 * Math.sin(dr * 2 * f);
    const c4 = -0.0051 * Math.sin(dr * (m + mpr)) - 0.0074 * Math.sin(dr * (m - mpr));
    const c5 = 0.0004 * Math.sin(dr * (2 * f + m)) - 0.0004 * Math.sin(dr * (2 * f - m));
    const c6 = -0.0006 * Math.sin(dr * (2 * f + mpr)) + 0.0010 * Math.sin(dr * (2 * f - mpr));
    const c7 = 0.0005 * Math.sin(dr * (2 * mpr + m));

    const deltaT = t < -11
        ? 0.001 + 0.000839 * t + 0.0002261 * t2 - 0.00000845 * t3 - 0.000000081 * t * t3
        : -0.000278 + 0.000265 * t + 0.000262 * t2;

    return jd1 + c1 + c2 + c3 + c4 + c5 + c6 + c7 - deltaT;
}

function getNewMoonDay(k, timeZone) {
    return Math.floor(newMoon(k) + 0.5 + timeZone / 24.0);
}

function sunLongitude(jdn) {
    const t = (jdn - 2451545.0) / 36525;
    const t2 = t * t;
    const dr = Math.PI / 180;
    const m = 357.52910 + 35999.05030 * t - 0.0001559 * t2 - 0.00000048 * t * t2;
    const l0 = 280.46645 + 36000.76983 * t + 0.0003032 * t2;
    let dl = (1.914600 - 0.004817 * t - 0.000014 * t2) * Math.sin(dr * m);
    dl += (0.019993 - 0.000101 * t) * Math.sin(dr * 2 * m) + 0.000290 * Math.sin(dr * 3 * m);
    let l = l0 + dl;
    l *= dr;
    l -= Math.PI * 2 * Math.floor(l / (Math.PI * 2));
    return l;
}

function getSunLongitude(dayNumber, timeZone) {
    return Math.floor(sunLongitude(dayNumber - 0.5 - timeZone / 24) / Math.PI * 6);
}

function getLunarMonth11(year, timeZone) {
    const off = jdFromDate(31, 12, year) - 2415021;
    const k = Math.floor(off / 29.530588853);
    let nm = getNewMoonDay(k, timeZone);
    const sunLong = getSunLongitude(nm, timeZone);
    if (sunLong >= 9) {
        nm = getNewMoonDay(k - 1, timeZone);
    }
    return nm;
}

function getLeapMonthOffset(a11, timeZone) {
    const k = Math.floor(0.5 + (a11 - 2415021.076998695) / 29.530588853);
    let last = 0;
    let i = 1;
    let arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    do {
        last = arc;
        i += 1;
        arc = getSunLongitude(getNewMoonDay(k + i, timeZone), timeZone);
    } while (arc !== last && i < 14);
    return i - 1;
}

function convertSolarToVietnameseLunar(day, month, year, timeZone) {
    const tz = typeof timeZone === 'number' ? timeZone : VIETNAM_TIME_ZONE;

    const dayNumber = jdFromDate(day, month, year);
    const k = Math.floor((dayNumber - 2415021.076998695) / 29.530588853);

    let monthStart = getNewMoonDay(k + 1, tz);
    if (monthStart > dayNumber) {
        monthStart = getNewMoonDay(k, tz);
    }

    let a11 = getLunarMonth11(year, tz);
    let b11 = a11;
    let lunarYear;

    if (a11 >= monthStart) {
        lunarYear = year;
        a11 = getLunarMonth11(year - 1, tz);
    } else {
        lunarYear = year + 1;
        b11 = getLunarMonth11(year + 1, tz);
    }

    const lunarDay = dayNumber - monthStart + 1;
    const diff = Math.floor((monthStart - a11) / 29);
    let lunarLeap = 0;
    let lunarMonth = diff + 11;

    if (b11 - a11 > 365) {
        const leapMonthDiff = getLeapMonthOffset(a11, tz);
        if (diff >= leapMonthDiff) {
            lunarMonth = diff + 10;
            if (diff === leapMonthDiff) {
                lunarLeap = 1;
            }
        }
    }

    if (lunarMonth > 12) {
        lunarMonth -= 12;
    }
    if (lunarMonth >= 11 && diff < 4) {
        lunarYear -= 1;
    }

    return {
        day: lunarDay,
        month: lunarMonth,
        year: lunarYear,
        isLeapMonth: lunarLeap === 1
    };
}

function _getZodiacName(lunarYear) {
    return ZODIAC_ANIMALS[(lunarYear + 8) % 12];
}

function calculateLunarDate(solarDate) {
    if (!(solarDate instanceof Date)) {
        return { day: 1, month: 1, year: 1970, isLeapMonth: false, zodiac: _getZodiacName(1970), dateStr: '1/1/1970' };
    }

    const parts = _fromDate(solarDate);
    const key = _toDateKey(parts.year, parts.month, parts.day);
    const cached = _solarToLunarCache.get(key);
    if (cached) {
        return cached;
    }

    const lunar = convertSolarToVietnameseLunar(parts.day, parts.month, parts.year, VIETNAM_TIME_ZONE);
    const result = {
        day: lunar.day,
        month: lunar.month,
        year: lunar.year,
        isLeapMonth: lunar.isLeapMonth,
        zodiac: _getZodiacName(lunar.year),
        dateStr: String(lunar.day) + '/' + String(lunar.month) + '/' + String(lunar.year)
    };

    _solarToLunarCache.set(key, result);
    return result;
}

// Backward-compatible alias used by existing pages.
function solarToLunarFallback(solarDate) {
    return calculateLunarDate(solarDate);
}

function _buildLunarYearIndex(lunarYear) {
    const index = new Map();
    const start = new Date(lunarYear - 1, 0, 1);
    const end = new Date(lunarYear + 1, 11, 31);
    const cursor = new Date(start.getTime());

    while (cursor <= end) {
        const lunar = calculateLunarDate(cursor);
        if (lunar.year === lunarYear) {
            const key = lunar.month + '-' + lunar.day + '-' + (lunar.isLeapMonth ? 1 : 0);
            if (!index.has(key)) {
                index.set(key, new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate()));
            }
        }
        cursor.setDate(cursor.getDate() + 1);
    }

    _lunarToSolarYearIndex.set(lunarYear, index);
    return index;
}

/**
 * Chuyen ngay am lich sang duong lich theo nam am lich.
 * @param {number} year Nam am lich
 * @param {number} lunarMonth Thang am (1-12)
 * @param {number} lunarDay Ngay am (1-30)
 * @param {boolean} isLeapMonth Co phai thang nhuan khong
 * @returns {Date|null}
 */
function lunarToSolar(year, lunarMonth, lunarDay, isLeapMonth) {
    const leap = isLeapMonth === true;
    const index = _lunarToSolarYearIndex.get(year) || _buildLunarYearIndex(year);
    const key = lunarMonth + '-' + lunarDay + '-' + (leap ? 1 : 0);
    return index.get(key) || null;
}

function calculateTetDate(year) {
    const byIndex = lunarToSolar(year, 1, 1, false);
    if (byIndex) {
        return byIndex;
    }

    // Fallback safety: scan Jan-Feb for Lunar 1/1.
    for (let month = 0; month <= 1; month += 1) {
        for (let day = 1; day <= 31; day += 1) {
            const d = new Date(year, month, day);
            if (d.getMonth() !== month) {
                break;
            }
            const lunar = calculateLunarDate(d);
            if (lunar.year === year && lunar.month === 1 && lunar.day === 1 && !lunar.isLeapMonth) {
                return d;
            }
        }
    }

    return new Date(year, 1, 1);
}

const TET_DATES = {
    2024: new Date(2024, 1, 10),
    2025: new Date(2025, 0, 29),
    2026: new Date(2026, 1, 17),
    2027: new Date(2027, 1, 6),
    2028: new Date(2028, 0, 26),
    2029: new Date(2029, 1, 13)
};

for (let year = 2030; year <= 2035; year += 1) {
    TET_DATES[year] = calculateTetDate(year);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateLunarDate,
        solarToLunarFallback,
        lunarToSolar,
        calculateTetDate,
        convertSolarToVietnameseLunar,
        jdFromDate,
        getNewMoonDay,
        getLunarMonth11,
        getLeapMonthOffset,
        TET_DATES,
        LUNAR_YEAR_DATA
    };
}

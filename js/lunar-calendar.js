/**
 * Lunar Calendar Component
 * Reusable component for calculating and displaying Vietnamese lunar calendar
 * Can be used in any page by including this file
 */

// Tet dates for the next few years (Vietnamese Lunar New Year)
const TET_DATES = {
    2024: new Date(2024, 1, 10), // Feb 10, 2024 - Tết Giáp Thìn
    2025: new Date(2025, 0, 29), // Jan 29, 2025 - Tết Ất Tỵ
    2026: new Date(2026, 1, 17), // Feb 17, 2026 - Tết Bính Ngọ
    2027: new Date(2027, 1, 6),  // Feb 6, 2027 - Tết Đinh Mùi
    2028: new Date(2028, 0, 26), // Jan 26, 2028 - Tết Mậu Thân
    2029: new Date(2029, 1, 13), // Feb 13, 2029 - Tết Kỷ Dậu
};

// Accurate lunar calendar data for specific years
const LUNAR_YEAR_DATA = {
    2024: {
        tetDate: new Date(2024, 1, 10), // Feb 10, 2024
        monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
        leapMonth: null,
        leapMonthDays: 0
    },
    2025: {
        tetDate: new Date(2025, 0, 29), // Jan 29, 2025
        monthDays: [30, 29, 30, 29, 29, 30, 30, 30, 29, 30, 30, 29],
        leapMonth: 6, // Leap month 6
        leapMonthDays: 29
    },
    2026: {
        tetDate: new Date(2026, 1, 17), // Feb 17, 2026
        monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
        leapMonth: null,
        leapMonthDays: 0
    },
    2027: {
        tetDate: new Date(2027, 1, 6), // Feb 6, 2027
        monthDays: [30, 29, 30, 29, 30, 29, 30, 30, 29, 30, 29, 30],
        leapMonth: null,
        leapMonthDays: 0
    }
};

/**
 * Calculate approximate Tet date for years not in lookup table
 */
function calculateTetDate(year) {
    const baseYear = 2024;
    const baseTet = new Date(2024, 1, 10);
    const yearDiff = year - baseYear;
    const lunarYearDays = 354;
    const daysDiff = yearDiff * lunarYearDays;
    return new Date(baseTet.getTime() + daysDiff * 24 * 60 * 60 * 1000);
}

/**
 * Calculate lunar date from solar date
 * Returns: { day, month, isLeapMonth?, year?, zodiac? }
 */
function calculateLunarDate(solarDate) {
    try {
        // Try to use chinese-lunar-calendar library if available
        if (typeof LunarCalendar !== 'undefined' && typeof LunarCalendar.getLunar === 'function') {
            const year = solarDate.getFullYear();
            const month = solarDate.getMonth() + 1;
            const day = solarDate.getDate();
            
            const lunar = LunarCalendar.getLunar(year, month, day);
            
            return {
                day: lunar.lunarDate,
                month: lunar.lunarMonth,
                isLeapMonth: lunar.isLeap,
                year: lunar.lunarYear,
                zodiac: lunar.zodiac,
                dateStr: lunar.dateStr
            };
        }
    } catch (error) {
        console.warn('chinese-lunar-calendar library not available, using fallback calculation:', error);
    }
    
    // Fallback calculation
    return solarToLunarFallback(solarDate);
}

/**
 * Fallback lunar calendar calculation
 * Fixed logic for dates before Tet
 */
function solarToLunarFallback(solarDate) {
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();
    
    // Get lunar year data
    let yearData = LUNAR_YEAR_DATA[year];
    if (!yearData) {
        // Fallback for years not in data
        yearData = {
            tetDate: calculateTetDate(year),
            monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        };
    }
    
    // Calculate days from Tet
    const daysDiff = Math.floor((solarDate - yearData.tetDate) / (1000 * 60 * 60 * 24));
    
    let lunarMonth = 1;
    let lunarDay = 1;
    
    // If date is before current year's Tet, use previous year's data
    if (daysDiff < 0) {
        const prevYear = year - 1;
        let prevYearData = LUNAR_YEAR_DATA[prevYear];
        
        if (!prevYearData) {
            prevYearData = {
                tetDate: calculateTetDate(prevYear),
                monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
                leapMonth: null,
                leapMonthDays: 0
            };
        }
        
        // Calculate from previous year's Tet
        const daysFromPrevTet = Math.floor((solarDate - prevYearData.tetDate) / (1000 * 60 * 60 * 24));
        
        if (daysFromPrevTet >= 0) {
            // Date is after previous year's Tet, calculate normally
            let remainingDays = daysFromPrevTet;
            let monthIndex = 0;
            let isLeapMonth = false;
            
            while (remainingDays > 0 && monthIndex < prevYearData.monthDays.length) {
                if (remainingDays >= prevYearData.monthDays[monthIndex]) {
                    remainingDays -= prevYearData.monthDays[monthIndex];
                    monthIndex++;
                    
                    // Handle leap month after the regular month
                    if (prevYearData.leapMonth && monthIndex === prevYearData.leapMonth && remainingDays >= 0) {
                        if (remainingDays >= prevYearData.leapMonthDays) {
                            remainingDays -= prevYearData.leapMonthDays;
                        } else {
                            isLeapMonth = true;
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
            
            if (isLeapMonth) {
                lunarMonth = prevYearData.leapMonth;
            } else {
                lunarMonth = monthIndex + 1;
            }
            lunarDay = remainingDays + 1;
        } else {
            // Date is before previous year's Tet (very rare)
            lunarMonth = 12;
            lunarDay = 1;
        }
    } else if (daysDiff >= 0) {
        // After Tet - calculation with proper leap month handling
        let remainingDays = daysDiff;
        let monthIndex = 0;
        let isLeapMonth = false;
        
        // Month-by-month calculation with leap month support
        while (remainingDays > 0 && monthIndex < yearData.monthDays.length) {
            // Check if current month has enough days
            if (remainingDays >= yearData.monthDays[monthIndex]) {
                remainingDays -= yearData.monthDays[monthIndex];
                monthIndex++;
                
                // Handle leap month after the regular month
                if (yearData.leapMonth && monthIndex === yearData.leapMonth && remainingDays >= 0) {
                    if (remainingDays >= yearData.leapMonthDays) {
                        // We're past the leap month, continue to next regular month
                        remainingDays -= yearData.leapMonthDays;
                    } else {
                        // We're in the leap month
                        isLeapMonth = true;
                        break;
                    }
                }
            } else {
                break;
            }
        }
        
        // Determine the final month and day
        if (isLeapMonth) {
            lunarMonth = yearData.leapMonth; // Leap month number
        } else {
            lunarMonth = monthIndex + 1;
        }
        lunarDay = remainingDays + 1;
    }
    
    return {
        day: lunarDay,
        month: lunarMonth
    };
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateLunarDate,
        solarToLunarFallback,
        TET_DATES,
        LUNAR_YEAR_DATA
    };
}

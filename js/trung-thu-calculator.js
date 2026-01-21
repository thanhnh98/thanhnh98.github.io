/**
 * Trung Thu Calculator
 * Tính toán ngày Trung Thu (15/8 âm lịch) cho các năm
 */

/**
 * Tính toán ngày Trung Thu (15/8 âm lịch) cho một năm cụ thể
 * @param {number} year - Năm dương lịch
 * @returns {Date} - Ngày Trung Thu của năm đó
 */
function calculateTrungThuDate(year) {
    // Sử dụng thư viện lunar calendar nếu có
    if (typeof LunarCalendar !== 'undefined' && typeof LunarCalendar.getLunar === 'function') {
        // Tìm ngày 15/8 âm lịch bằng cách duyệt qua các ngày trong khoảng tháng 9-10 dương lịch
        // Trung Thu thường rơi vào khoảng cuối tháng 9 đến đầu tháng 10 dương lịch
        for (let month = 8; month <= 10; month++) { // Tháng 9-11 (0-indexed: 8-10)
            for (let day = 1; day <= 31; day++) {
                try {
                    const solarDate = new Date(year, month, day);
                    const lunar = LunarCalendar.getLunar(year, month + 1, day);
                    
                    if (lunar.lunarMonth === 8 && lunar.lunarDate === 15 && !lunar.isLeap) {
                        return new Date(year, month, day);
                    }
                } catch (e) {
                    continue;
                }
            }
        }
    }
    
    // Fallback: Sử dụng dữ liệu đã biết hoặc tính toán gần đúng
    const trungThuDates = {
        2024: new Date(2024, 8, 17), // 17/9/2024
        2025: new Date(2025, 9, 6),  // 6/10/2025
        2026: new Date(2026, 9, 25), // 25/10/2026
        2027: new Date(2027, 9, 15), // 15/10/2027
        2028: new Date(2028, 9, 3),  // 3/10/2028
        2029: new Date(2029, 8, 22), // 22/9/2029
        2030: new Date(2030, 9, 11),  // 11/10/2030
    };
    
    if (trungThuDates[year]) {
        return trungThuDates[year];
    }
    
    // Tính toán gần đúng: Trung Thu thường cách Tết khoảng 210-240 ngày
    // Sử dụng TET_DATES từ lunar-calendar.js nếu có
    let tetDate;
    if (typeof TET_DATES !== 'undefined' && TET_DATES[year]) {
        tetDate = TET_DATES[year];
    } else {
        // Ước tính ngày Tết
        const baseYear = 2025;
        const baseTet = new Date(2025, 0, 29);
        const yearDiff = year - baseYear;
        const lunarYearDays = 354;
        tetDate = new Date(baseTet.getTime() + yearDiff * lunarYearDays * 24 * 60 * 60 * 1000);
    }
    
    // Trung Thu thường cách Tết khoảng 7 tháng âm lịch (khoảng 210 ngày)
    const trungThuDate = new Date(tetDate);
    trungThuDate.setDate(trungThuDate.getDate() + 210);
    
    return trungThuDate;
}

/**
 * Lấy ngày Trung Thu tiếp theo (của năm hiện tại hoặc năm sau)
 * @returns {Object} - { year, date }
 */
function getNextTrungThu() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Tính Trung Thu năm hiện tại
    const thisYearTrungThu = calculateTrungThuDate(currentYear);
    
    // Nếu Trung Thu năm nay chưa qua, trả về năm nay
    if (now < thisYearTrungThu) {
        return {
            year: currentYear,
            date: thisYearTrungThu
        };
    }
    
    // Nếu đã qua, trả về năm sau
    const nextYear = currentYear + 1;
    return {
        year: nextYear,
        date: calculateTrungThuDate(nextYear)
    };
}

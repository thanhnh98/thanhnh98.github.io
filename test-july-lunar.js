// Test script to verify July lunar month has 30 days
const LunarCalendar = require('chinese-lunar-calendar');

console.log('Testing July lunar month days...');

// Test function to count days in a lunar month
function countLunarMonthDays(year, month) {
    let dayCount = 0;
    let currentDay = 1;
    
    while (true) {
        try {
            const lunar = LunarCalendar.getLunar(year, month, currentDay);
            if (lunar.lunarMonth === month) {
                dayCount++;
                currentDay++;
            } else {
                break;
            }
        } catch (error) {
            break;
        }
    }
    
    return dayCount;
}

// Test July lunar month for different years
const testYears = [2024, 2025, 2026];

testYears.forEach(year => {
    console.log(`\n=== Year ${year} ===`);
    
    // Test July lunar month (month 7)
    const julyDays = countLunarMonthDays(year, 7);
    console.log(`July lunar month has ${julyDays} days`);
    
    // Test some specific dates
    console.log('Sample July lunar dates:');
    for (let day = 1; day <= Math.min(julyDays, 5); day++) {
        try {
            const lunar = LunarCalendar.getLunar(year, 7, day);
            console.log(`Solar ${year}-07-${day.toString().padStart(2, '0')} -> Lunar ${lunar.lunarDate}/${lunar.lunarMonth}`);
        } catch (error) {
            console.log(`Error for ${year}-07-${day}: ${error.message}`);
        }
    }
    
    // Test last day of July
    if (julyDays > 0) {
        try {
            const lunar = LunarCalendar.getLunar(year, 7, julyDays);
            console.log(`Last day: Solar ${year}-07-${julyDays.toString().padStart(2, '0')} -> Lunar ${lunar.lunarDate}/${lunar.lunarMonth}`);
        } catch (error) {
            console.log(`Error for last day: ${error.message}`);
        }
    }
});

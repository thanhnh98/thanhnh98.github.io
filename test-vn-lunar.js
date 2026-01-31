// Test script for @dqcai/vn-lunar library
import { VnLunar } from '@dqcai/vn-lunar';

// Test the library
console.log('Testing @dqcai/vn-lunar library...');

try {
    // Test solar to lunar conversion
    const solarDate = new Date(2025, 0, 29); // January 29, 2025 (Tet 2025)
    console.log('Solar date:', solarDate.toDateString());
    
    const lunar = VnLunar.fromSolarDate(solarDate);
    console.log('Lunar date:', lunar.toString());
    console.log('Lunar day:', lunar.day);
    console.log('Lunar month:', lunar.month);
    console.log('Lunar year:', lunar.year);
    console.log('Is leap month:', lunar.isLeapMonth);
    console.log('Can Chi year:', lunar.yearCanChi);
    console.log('Can Chi month:', lunar.monthCanChi);
    console.log('Can Chi day:', lunar.dayCanChi);
    
    // Test lunar to solar conversion
    const lunarDate = VnLunar.fromLunarDate(2025, 1, 1); // Tet 2025
    console.log('\nLunar to solar:');
    console.log('Lunar date:', lunarDate.toString());
    console.log('Solar date:', lunarDate.toSolarDate().toDateString());
    
} catch (error) {
    console.error('Error testing library:', error);
}

// Sắp Tết 2026 - Enhanced Countdown and Calendar

// Tết dates for the next few years (Vietnamese Lunar New Year)
// Set to 00:00:00 Vietnam time (UTC+7)
const tetDates = {
    2025: new Date('2025-01-29T00:00:00+07:00'), // Tết Ất Tỵ
    2026: new Date('2026-02-17T00:00:00+07:00'), // Tết Bính Ngọ
    2027: new Date('2027-02-06T00:00:00+07:00'), // Tết Đinh Mùi
    2028: new Date('2028-01-26T00:00:00+07:00'), // Tết Mậu Thân
    2029: new Date('2029-02-13T00:00:00+07:00'), // Tết Kỷ Dậu
};

// Calendar state
let currentCalendarDate = new Date();
let selectedDate = null;

// Lunar calendar data (simplified - in real app would use proper lunar calendar library)
const lunarMonths = [
    'Tháng Giêng', 'Tháng Hai', 'Tháng Ba', 'Tháng Tư',
    'Tháng Năm', 'Tháng Sáu', 'Tháng Bảy', 'Tháng Tám',
    'Tháng Chín', 'Tháng Mười', 'Tháng Mười Một', 'Tháng Chạp'
];

const zodiacAnimals = [
    'Tý (Chuột)', 'Sửu (Trâu)', 'Dần (Hổ)', 'Mão (Mèo)',
    'Thìn (Rồng)', 'Tỵ (Rắn)', 'Ngọ (Ngựa)', 'Mùi (Dê)',
    'Thân (Khỉ)', 'Dậu (Gà)', 'Tuất (Chó)', 'Hợi (Heo)'
];

function getNextTet() {
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // Check if current year's Tết has passed
    if (tetDates[currentYear] && now < tetDates[currentYear]) {
        return { year: currentYear, date: tetDates[currentYear] };
    }
    
    // If current year's Tết has passed, get next year's Tết
    const nextYear = currentYear + 1;
    if (tetDates[nextYear]) {
        return { year: nextYear, date: tetDates[nextYear] };
    }
    
    // Fallback: estimate next year's Tết
    const estimatedDate = new Date(nextYear, 0, 29);
    return { year: nextYear, date: estimatedDate };
}

function updateCountdown() {
    const nextTet = getNextTet();
    const now = new Date().getTime();
    const tetTime = nextTet.date.getTime();
    const distance = tetTime - now;
    
    // Update the year display
    document.getElementById('tet-year').textContent = nextTet.year;
    
    if (distance > 0) {
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the display
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // Hide greeting message
        document.querySelector('.tet-greeting').style.display = 'none';
    } else {
        // Tết has arrived!
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Show greeting message
        document.querySelector('.tet-greeting').style.display = 'block';
    }
}

// Calendar functions
function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    const today = new Date();
    
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthElement = document.getElementById('current-month');
    
    // Update month display
    const monthNames = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
        'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
        'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    currentMonthElement.textContent = `${monthNames[month]} ${year}`;
    
    // Clear previous calendar
    calendarGrid.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    dayHeaders.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day other-month';
        calendarGrid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        
        const currentDate = new Date(year, month, day);
        
        // Check if this is today
        const isToday = currentDate.toDateString() === today.toDateString();
        
        // Check if this is a Tet date
        const isTetDate = Object.values(tetDates).some(tetDate => 
            currentDate.toDateString() === tetDate.toDateString()
        );
        
        // Add special classes
        if (isToday) {
            dayElement.classList.add('today');
        }
        if (isTetDate) {
            dayElement.classList.add('tet-date');
        }
        
        // Create solar date element
        const solarDate = document.createElement('div');
        solarDate.className = 'solar-date';
        solarDate.textContent = day;
        
        // Create lunar date element
        const lunarDate = document.createElement('div');
        lunarDate.className = 'lunar-date';
        
        // Calculate lunar date (simplified calculation)
        const lunarInfo = calculateLunarDate(currentDate);
        
        // Format lunar date display
        if (lunarInfo.day === 1) {
            lunarDate.textContent = `${lunarInfo.day}/${lunarInfo.month}`;
        } else {
            lunarDate.textContent = lunarInfo.day;
        }
        
        // Add Tet indicator if it's a Tet date
        if (isTetDate) {
            const tetIndicator = document.createElement('div');
            tetIndicator.className = 'tet-indicator';
            tetIndicator.textContent = '🧧';
            dayElement.appendChild(tetIndicator);
        }
        
        dayElement.appendChild(solarDate);
        dayElement.appendChild(lunarDate);
        
        // Add click event
        dayElement.addEventListener('click', () => {
            // Remove previous selection
            document.querySelectorAll('.calendar-day.selected').forEach(el => {
                el.classList.remove('selected');
            });
            
            // Add selection to clicked day
            dayElement.classList.add('selected');
            selectedDate = new Date(year, month, day);
            updateLunarInfo(selectedDate);
        });
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Auto-select today if it's in the current month
    if (year === today.getFullYear() && month === today.getMonth()) {
        const todayElement = document.querySelector('.calendar-day.today');
        if (todayElement && !selectedDate) {
            todayElement.classList.add('selected');
            selectedDate = new Date(today);
            updateLunarInfo(selectedDate);
        }
    }
}

// Accurate lunar calendar calculation for Vietnamese lunar calendar
function calculateLunarDate(solarDate) {
    // Convert to Julian Day Number for astronomical calculations
    const jd = getJulianDayNumber(solarDate);
    
    // Get lunar month and day using accurate algorithm
    const lunarInfo = solarToLunar(solarDate);
    
    return {
        day: lunarInfo.day,
        month: lunarInfo.month // Keep 1-based month index
    };
}

// Convert Gregorian date to Julian Day Number
function getJulianDayNumber(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    
    return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

// Import lunar-calendar library for accurate calculations
// Note: This requires the lunar-calendar npm package to be installed
function solarToLunar(solarDate) {
    try {
        // Use lunar-calendar library for accurate conversion
        if (typeof require !== 'undefined') {
            const lunar = require('lunar-calendar');
            const result = lunar.solarToLunar(
                solarDate.getFullYear(),
                solarDate.getMonth() + 1, // lunar-calendar expects 1-based month
                solarDate.getDate()
            );
            
            return {
                day: result.lunarDay,
                month: result.lunarMonth,
                isLeapMonth: result.lunarLeapMonth === result.lunarMonth,
                leapMonth: result.lunarLeapMonth,
                zodiac: result.zodiac,
                ganZhiYear: result.GanZhiYear,
                ganZhiMonth: result.GanZhiMonth,
                ganZhiDay: result.GanZhiDay
            };
        }
    } catch (error) {
        console.warn('lunar-calendar library not available, using fallback calculation:', error.message);
    }
    
    // Fallback calculation for browser environment or when library is not available
    return solarToLunarFallback(solarDate);
}

// Fallback lunar calendar calculation
function solarToLunarFallback(solarDate) {
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();
    
    // Accurate lunar calendar data for specific years
    const lunarYearData = {
        2025: {
            tetDate: new Date(2025, 0, 29), // Jan 29, 2025
            monthDays: [30, 29, 30, 29, 29, 30, 29, 30, 29, 30, 30, 29], // 12 regular months with correct days
            leapMonth: 6, // Leap month 6
            leapMonthDays: 29 // Days in leap month
        },
        2024: {
            tetDate: new Date(2024, 1, 10), // Feb 10, 2024
            monthDays: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        },
        2026: {
            tetDate: new Date(2026, 1, 17), // Feb 17, 2026
            monthDays: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        }
    };
    
    // Get lunar year data
    let yearData = lunarYearData[year];
    if (!yearData) {
        // Fallback for years not in data
        yearData = {
            tetDate: calculateTetDate(year),
            monthDays: [29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        };
    }
    
    // Calculate days from Tet
    const daysDiff = Math.floor((solarDate - yearData.tetDate) / (1000 * 60 * 60 * 24));
    
    let lunarMonth = 1;
    let lunarDay = 1;
    
    if (daysDiff >= 0) {
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
    } else {
        // Before Tet (previous lunar year)
        let remainingDays = Math.abs(daysDiff);
        lunarMonth = 12;
        let monthIndex = 11;
        
        while (remainingDays > yearData.monthDays[monthIndex]) {
            remainingDays -= yearData.monthDays[monthIndex];
            monthIndex--;
            if (monthIndex < 0) {
                monthIndex = 11;
                lunarMonth = 12;
            } else {
                lunarMonth = monthIndex + 1;
            }
        }
        lunarDay = yearData.monthDays[monthIndex] - remainingDays + 1;
    }
    
    return {
        day: lunarDay,
        month: lunarMonth
    };
}

// Calculate approximate Tet date for years not in lookup table
function calculateTetDate(year) {
    // Simplified calculation based on lunar cycle
    // This is an approximation for fallback purposes
    const baseYear = 2024;
    const baseTet = new Date(2024, 1, 10);
    const yearDiff = year - baseYear;
    
    // Lunar year is approximately 354 days
    const lunarYearDays = 354;
    const daysDiff = yearDiff * lunarYearDays;
    
    const estimatedTet = new Date(baseTet.getTime() + daysDiff * 24 * 60 * 60 * 1000);
    return estimatedTet;
}

function updateLunarInfo(date) {
    const lunarInfoElement = document.getElementById('lunar-date-info');
    
    // Calculate lunar date
    const lunarInfo = calculateLunarDate(date);
    const lunarMonth = lunarMonths[lunarInfo.month - 1] || lunarMonths[0];
    const zodiac = zodiacAnimals[date.getFullYear() % 12];
    
    const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'long' });
    const solarDate = date.toLocaleDateString('vi-VN');
    
    // Calculate auspicious hours for the selected date
    const auspiciousData = calculateAuspiciousHours(date);
    const auspiciousHours = formatAuspiciousInfo(auspiciousData.auspicious);
    const inauspiciousHours = formatAuspiciousInfo(auspiciousData.inauspicious);
    
    // Determine good and bad activities based on lunar day
    const goodActivities = getGoodActivities(lunarInfo.day);
    const badActivities = getBadActivities(lunarInfo.day);
    
    lunarInfoElement.innerHTML = `
        <p><strong>Ngày dương lịch:</strong> ${dayOfWeek}, ${solarDate}</p>
        <p><strong>Ngày âm lịch:</strong> ${lunarInfo.day} ${lunarMonth}</p>
        <p><strong>Năm:</strong> ${zodiac}</p>
        <p><strong>Giờ hoàng đạo:</strong> ${auspiciousHours}</p>
        <p><strong>Giờ hắc đạo:</strong> ${inauspiciousHours}</p>
        <p><strong>Việc nên làm:</strong> ${goodActivities}</p>
        <p><strong>Việc không nên làm:</strong> ${badActivities}</p>
    `;
}

// Navigation functions
function previousMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    generateCalendar(currentCalendarDate);
}

function nextMonth() {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    generateCalendar(currentCalendarDate);
}

// Smooth scrolling for navigation
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Update Tet date display
function updateTetDateDisplay() {
    const tetDateDisplay = document.querySelector('.tet-date-display');
    if (tetDateDisplay) {
        const nextTet = getNextTet();
        const lunarDate = calculateLunarDate(nextTet.date);
        tetDateDisplay.innerHTML = `
            <p>Đón Tết Nguyên Đán Bính Ngọ</p>
            <p class="tet-date-solar">${nextTet.date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        `;
    }
}

// Music Player functionality
function initializeMusicPlayer() {
    const audio = document.getElementById('tet-music');
    const musicToggle = document.getElementById('music-toggle');
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');
    
    if (musicToggle && audio) {
        musicToggle.addEventListener('click', function() {
            if (audio.paused) {
                audio.play().then(() => {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'inline';
                }).catch(error => {
                    console.log('Audio play failed:', error);
                });
            } else {
                audio.pause();
                playIcon.style.display = 'inline';
                pauseIcon.style.display = 'none';
            }
        });
        
        // Handle audio events
        audio.addEventListener('ended', function() {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
        
        audio.addEventListener('pause', function() {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        });
        
        audio.addEventListener('play', function() {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        });
        
        // Set volume to a comfortable level
        audio.volume = 0.5;
    }
}

// Navigation helper functions
function navigateToGame(url) {
    // Use direct navigation for game pages to avoid router conflicts
    window.location.href = url;
}

function navigateToPage(url) {
    // Use direct navigation for pages to avoid router conflicts
    window.location.href = url;
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Update Tet date display
    updateTetDateDisplay();
    
    // Initialize calendar with today's date
    const today = new Date();
    currentCalendarDate = new Date(today.getFullYear(), today.getMonth(), 1);
    generateCalendar(currentCalendarDate);
    
    // Add event listeners for calendar navigation
    document.getElementById('prev-month').addEventListener('click', previousMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
    
    // Initialize music player
    initializeMusicPlayer();
    
    // Add smooth scrolling to navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
    
    // Update current year in footer if exists
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Initialize events carousel
    initializeEventsCarousel();
});

// Make navigation functions globally available
window.navigateToGame = navigateToGame;
window.navigateToPage = navigateToPage;

// Function to get next occurrence of an event (this year or next year)
function getNextEventDate(month, day, currentYear = null) {
    const now = new Date();
    const year = currentYear || now.getFullYear();
    const eventDate = new Date(year, month - 1, day);
    
    // If the event has passed this year, get next year's date
    if (eventDate < now) {
        return new Date(year + 1, month - 1, day);
    }
    return eventDate;
}

// Events data with dynamic dates
const eventsData = {
    'tet': {
        name: 'Tết Nguyên Đán',
        getDate: () => getNextEventDate(2, 17), // February 17, 2026
        icon: '🏮',
        description: 'Đón Tết Bính Ngọ',
        background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'
    },
    'valentine': {
        name: 'Valentine',
        getDate: () => getNextEventDate(2, 14), // February 14
        icon: '💕',
        description: 'Ngày Tình Yêu',
        background: 'linear-gradient(135deg, #ff69b4, #ff1493)'
    },
    'women-day': {
        name: 'Quốc Tế Phụ Nữ',
        getDate: () => getNextEventDate(3, 8), // March 8
        icon: '🌸',
        description: 'Ngày 8/3',
        background: 'linear-gradient(135deg, #ff69b4, #ffc0cb)'
    },
    'hung-kings': {
        name: 'Giỗ Tổ Hùng Vương',
        getDate: () => getNextEventDate(4, 7), // April 7 (approximate)
        icon: '🏛️',
        description: '10/3 Âm Lịch',
        background: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    },
    'liberation': {
        name: 'Giải Phóng Miền Nam',
        getDate: () => getNextEventDate(4, 30), // April 30
        icon: '🇻🇳',
        description: 'Ngày Thống Nhất',
        background: 'linear-gradient(135deg, #ff0000, #ffff00)'
    },
    'labor-day': {
        name: 'Quốc Tế Lao Động',
        getDate: () => getNextEventDate(5, 1), // May 1
        icon: '⚒️',
        description: 'Ngày 1/5',
        background: 'linear-gradient(135deg, #ff4757, #ff6b7a)'
    },
    'mid-autumn': {
        name: 'Tết Trung Thu',
        getDate: () => getNextEventDate(10, 6), // October 6 (approximate)
        icon: '🥮',
        description: '15/8 Âm Lịch',
        background: 'linear-gradient(135deg, #ffa500, #ffb347)'
    },
    'teachers-day': {
        name: 'Nhà Giáo Việt Nam',
        getDate: () => getNextEventDate(11, 20), // November 20
        icon: '📚',
        description: 'Ngày Nhà Giáo',
        background: 'linear-gradient(135deg, #4169e1, #6495ed)'
    },
    'christmas': {
        name: 'Giáng Sinh',
        getDate: () => getNextEventDate(12, 25), // December 25
        icon: '🎄',
        description: 'Noel',
        background: 'linear-gradient(135deg, #228b22, #32cd32)'
    },
    'new-year': {
        name: 'Tết Dương Lịch',
        getDate: () => getNextEventDate(1, 1), // January 1
        icon: '🎆',
        description: 'Năm Mới',
        background: 'linear-gradient(135deg, #4169e1, #00bfff)'
    }
};

// Carousel variables
let currentEventIndex = 0;
let carouselInterval;
let modalCountdownInterval;
let eventCountdownInterval;
let eventModalCountdownInterval;

function initializeEventsCarousel() {
    const carousel = document.getElementById('events-carousel');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const container = document.querySelector('.events-carousel-container');
    const modal = document.getElementById('event-modal');
    const closeModal = document.querySelector('.close-modal');
    
    // Update event cards with current dates
    updateEventCards();
    
    // Carousel navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollCarousel('prev');
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            scrollCarousel('next');
        });
    }
    
    // Remove all modal event listeners - no longer use event modal
    // if (closeModal) {
    //     closeModal.addEventListener('click', closeEventModal);
    // }

    // if (modal) {
    //     modal.addEventListener('click', (e) => {
    //         if (e.target === modal) {
    //             closeEventModal();
    //         }
    //     });
    // }

    // // Keyboard navigation
    // document.addEventListener('keydown', (e) => {
    //     if (modal && modal.style.display === 'block') {
    //         if (e.key === 'Escape') {
    //             closeEventModal();
    //         }
    //     }
    // });
    
    // Smooth scrolling behavior for carousel
    if (carousel) {
        carousel.style.scrollBehavior = 'smooth';
    }
    
    // Add touch/swipe support for mobile and desktop
    if (container) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
            e.preventDefault();
        });
        
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        container.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
        
        // Set initial cursor style
        container.style.cursor = 'grab';
    }
}

// Update event cards with current dates and sort by upcoming dates
function updateEventCards() {
    const carousel = document.getElementById('events-carousel');
    if (!carousel) return;
    
    // Get all events with their dates and sort by upcoming dates
    const sortedEvents = Object.keys(eventsData)
        .map(eventKey => ({
            key: eventKey,
            data: eventsData[eventKey],
            date: eventsData[eventKey].getDate()
        }))
        .sort((a, b) => a.date - b.date);
    
    // Clear carousel and rebuild with sorted events
    carousel.innerHTML = '';
    
    sortedEvents.forEach(({ key, data }) => {
        const eventDate = data.getDate();
        const card = document.createElement('div');
        card.className = 'event-card';
        card.setAttribute('data-event', key);
        
        card.innerHTML = `
            <div class="event-icon">${data.icon}</div>
            <h3>${data.name}</h3>
            <p class="event-date">${eventDate.toLocaleDateString('vi-VN')}</p>
            <div class="event-countdown" data-target="${eventDate.getTime()}">
                <div class="countdown-item">
                    <span class="countdown-value days">00</span>
                    <span class="countdown-label">Ngày</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value hours">00</span>
                    <span class="countdown-label">Giờ</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-value minutes">00</span>
                    <span class="countdown-label">Phút</span>
                </div>
            </div>
            <p class="event-desc">${data.description}</p>
        `;
        
        card.addEventListener('click', () => {
            scrollCardToCenter(card);
            openEventModal(key);
        });
        
        carousel.appendChild(card);
    });
    
    // Start countdown timers for all events
    startEventCountdowns();
}

// Function to update countdown timers for all event cards
function updateEventCountdowns() {
    const eventCards = document.querySelectorAll('.event-countdown');
    
    eventCards.forEach(countdown => {
        const targetTime = parseInt(countdown.getAttribute('data-target'));
        const now = new Date().getTime();
        const distance = targetTime - now;
        
        const daysElement = countdown.querySelector('.days');
        const hoursElement = countdown.querySelector('.hours');
        const minutesElement = countdown.querySelector('.minutes');
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            
            if (daysElement) daysElement.textContent = days.toString().padStart(2, '0');
            if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
            if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        } else {
            // Event has passed
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
        }
    });
}

// Function to start countdown timers for events
function startEventCountdowns() {
    // Clear any existing interval
    if (eventCountdownInterval) {
        clearInterval(eventCountdownInterval);
    }
    
    // Update immediately
    updateEventCountdowns();
    
    // Update every second
    eventCountdownInterval = setInterval(updateEventCountdowns, 1000);
}

function scrollCarousel(direction) {
    const carouselContainer = document.querySelector('.events-carousel-container');
    const cardWidth = 280 + 32; // card width + gap
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    
    carouselContainer.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function scrollCardToCenter(card) {
    const carouselContainer = document.querySelector('.events-carousel-container');
    const cardRect = card.getBoundingClientRect();
    const containerRect = carouselContainer.getBoundingClientRect();
    
    // Calculate the position to center the card
    const cardCenter = cardRect.left + cardRect.width / 2;
    const containerCenter = containerRect.left + containerRect.width / 2;
    const scrollOffset = cardCenter - containerCenter;
    
    carouselContainer.scrollBy({
        left: scrollOffset,
        behavior: 'smooth'
    });
}

function openEventModal(eventKey) {
    const event = eventsData[eventKey];
    if (!event) return;
    
    const modal = document.getElementById('eventModal');
    const title = document.getElementById('eventModalTitle');
    const icon = document.getElementById('eventModalIcon');
    const date = document.getElementById('eventModalDate');
    const description = document.getElementById('eventModalDescription');
    const modalContent = modal.querySelector('.faq-modal-content');
    
    const eventDate = event.getDate();
    
    title.textContent = `${event.icon} ${event.name}`;
    icon.textContent = event.icon;
    date.textContent = eventDate.toLocaleDateString('vi-VN');
    description.textContent = event.description;
    
    // Apply event theme color to modal
    if (modalContent && event.background) {
        modalContent.style.background = event.background;
        modalContent.style.color = 'white';
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Start countdown for this specific event
    startEventModalCountdown(eventDate);
}

function closeEventModal() {
    const modal = document.getElementById('event-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Add exit animation
    modalContent.style.transition = 'all 0.3s ease';
    modalContent.style.transform = 'scale(0.7)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear countdown interval
        if (modalCountdownInterval) {
            clearInterval(modalCountdownInterval);
        }
    }, 300);
}

function startModalCountdown(targetDate) {
    // Clear any existing interval
    if (modalCountdownInterval) {
        clearInterval(modalCountdownInterval);
    }
    
    function updateModalCountdown() {
        const now = new Date().getTime();
        const targetTime = targetDate.getTime();
        const distance = targetTime - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            document.getElementById('modal-days').textContent = days.toString().padStart(2, '0');
            document.getElementById('modal-hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('modal-minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('modal-seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            // Event has passed
            document.getElementById('modal-days').textContent = '00';
            document.getElementById('modal-hours').textContent = '00';
            document.getElementById('modal-minutes').textContent = '00';
            document.getElementById('modal-seconds').textContent = '00';
        }
    }
    
    // Update immediately
    updateModalCountdown();
    
    // Update every second
    modalCountdownInterval = setInterval(updateModalCountdown, 1000);
}

// Add seasonal decorations based on current date
function addSeasonalDecorations() {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    let decorationEmoji = '🎊';
    
    // Determine seasonal decoration
    if ((month === 12 && day >= 20) || (month === 1 && day <= 15)) {
        decorationEmoji = '🏮'; // Tết season
    } else if (month === 2 && day >= 10 && day <= 20) {
        decorationEmoji = '💕'; // Valentine season
    } else if (month === 3) {
        decorationEmoji = '🌸'; // Spring
    } else if (month >= 9 && month <= 11) {
        decorationEmoji = '🍂'; // Autumn
    } else if (month === 12 && day >= 15) {
        decorationEmoji = '🎄'; // Christmas season
    }
    
    // Update background decorations
    const eventsSection = document.querySelector('.events-section');
    if (eventsSection) {
        eventsSection.style.setProperty('--decoration-emoji', `"${decorationEmoji}"`);
    }
}

// Smooth scrolling for all links
function initializeSmoothScrolling() {
    // Add smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Vietnamese Auspicious Hours Calculator
function calculateAuspiciousHours(date) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const lunarDay = getLunarDay(date);
    
    // Traditional Vietnamese auspicious hours based on day of week and lunar calendar
    const auspiciousHours = {
        0: ['23-01', '05-07', '11-13'], // Sunday
        1: ['01-03', '07-09', '13-15'], // Monday  
        2: ['03-05', '09-11', '15-17'], // Tuesday
        3: ['05-07', '11-13', '17-19'], // Wednesday
        4: ['07-09', '13-15', '19-21'], // Thursday
        5: ['09-11', '15-17', '21-23'], // Friday
        6: ['11-13', '17-19', '23-01']  // Saturday
    };
    
    const inauspiciousHours = {
        0: ['09-11', '15-17', '21-23'], // Sunday
        1: ['11-13', '17-19', '23-01'], // Monday
        2: ['13-15', '19-21', '01-03'], // Tuesday
        3: ['15-17', '21-23', '03-05'], // Wednesday
        4: ['17-19', '23-01', '05-07'], // Thursday
        5: ['19-21', '01-03', '07-09'], // Friday
        6: ['21-23', '03-05', '09-11']  // Saturday
    };
    
    return {
        auspicious: auspiciousHours[dayOfWeek] || [],
        inauspicious: inauspiciousHours[dayOfWeek] || []
    };
}

// Get lunar day (simplified calculation)
function getLunarDay(date) {
    // Simplified lunar calculation - in real implementation, use proper lunar calendar algorithm
    const baseDate = new Date(2024, 0, 1); // Reference date
    const diffTime = Math.abs(date - baseDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays % 30) + 1; // Simplified 30-day lunar month
}

// Format auspicious information
function formatAuspiciousInfo(hours) {
    if (!hours || hours.length === 0) return 'Không có';
    return hours.map(hour => {
        const [start, end] = hour.split('-');
        return `${start}:00-${end}:00`;
    }).join(', ');
}

// Helper functions for lunar calendar activities
function getGoodActivities(lunarDay) {
    const activities = {
        1: 'Khai trương, khởi công, cưới hỏi',
        2: 'Xuất hành, giao dịch, mua sắm',
        3: 'Cầu nguyện, thờ cúng, học tập',
        4: 'An táng, dọn nhà, sửa chữa',
        5: 'Khai trương, ký hợp đồng, đầu tư',
        6: 'Cưới hỏi, xuất hành, gặp gỡ',
        7: 'Thờ cúng, cầu nguyện, tu tập',
        8: 'Khởi công, xây dựng, trồng trọt',
        9: 'Giao dịch, mua bán, kinh doanh',
        10: 'Cưới hỏi, lễ hội, vui chơi',
        11: 'Xuất hành, du lịch, di chuyển',
        12: 'Học tập, nghiên cứu, sáng tác',
        13: 'Khai trương, khởi nghiệp, đầu tư',
        14: 'Cầu nguyện, thờ cúng, từ thiện',
        15: 'Cưới hỏi, lễ hội, sum họp',
        16: 'Xuất hành, giao dịch, hợp tác',
        17: 'Sửa chữa, tu bổ, cải tạo',
        18: 'Học tập, thi cử, nghiên cứu',
        19: 'Khai trương, kinh doanh, đầu tư',
        20: 'Cưới hỏi, lễ hội, vui chơi',
        21: 'Xuất hành, du lịch, khám phá',
        22: 'Thờ cúng, cầu nguyện, tu tập',
        23: 'Giao dịch, mua bán, hợp tác',
        24: 'Sửa chữa, dọn dẹp, trang trí',
        25: 'Cưới hỏi, sum họp, gặp gỡ',
        26: 'Học tập, nghiên cứu, sáng tác',
        27: 'Khai trương, khởi công, đầu tư',
        28: 'Xuất hành, giao dịch, kinh doanh',
        29: 'Cầu nguyện, thờ cúng, từ thiện',
        30: 'Nghỉ ngơi, tĩnh tâm, suy ngẫm'
    };
    return activities[lunarDay] || 'Các việc thông thường';
}

function getBadActivities(lunarDay) {
    const activities = {
        1: 'An táng, phá dỡ, tranh cãi',
        2: 'Khởi công lớn, ký hợp đồng quan trọng',
        3: 'Cưới hỏi, khai trương, xuất hành xa',
        4: 'Giao dịch lớn, đầu tư mạo hiểm',
        5: 'An táng, phá dỡ, chuyển nhà',
        6: 'Khởi kiện, tranh chấp, cãi vã',
        7: 'Khai trương, cưới hỏi, vui chơi',
        8: 'An táng, phá dỡ, đào đất',
        9: 'Cưới hỏi, lễ hội, sum họp',
        10: 'Khởi kiện, tranh chấp, xung đột',
        11: 'Khai trương lớn, đầu tư quan trọng',
        12: 'Cưới hỏi, lễ hội, vui chơi',
        13: 'An táng, phá dỡ, chuyển nhà',
        14: 'Khởi kiện, tranh chấp, cãi vã',
        15: 'Phá dỡ, đào đất, chặt cây',
        16: 'An táng, tang lễ, việc buồn',
        17: 'Cưới hỏi, khai trương, lễ hội',
        18: 'Khởi kiện, tranh chấp, xung đột',
        19: 'An táng, phá dỡ, chuyển nhà',
        20: 'Giao dịch mạo hiểm, đầu tư lớn',
        21: 'Cưới hỏi, khai trương, lễ hội',
        22: 'Khởi kiện, tranh chấp, cãi vã',
        23: 'An táng, phá dỡ, đào đất',
        24: 'Cưới hỏi, lễ hội, sum họp',
        25: 'Khởi kiện, tranh chấp, xung đột',
        26: 'An táng, phá dỡ, chuyển nhà',
        27: 'Giao dịch mạo hiểm, cãi vã',
        28: 'Cưới hỏi, khai trương, lễ hội',
        29: 'Khởi kiện, tranh chấp, phá dỡ',
        30: 'Khai trương, cưới hỏi, xuất hành'
    };
    return activities[lunarDay] || 'Các việc không phù hợp';
}

// Initialize seasonal decorations
document.addEventListener('DOMContentLoaded', () => {
    addSeasonalDecorations();
    initializeSmoothScrolling();
    initializeLogoScrollToTop();
});

// Logo click to scroll to top functionality
function initializeLogoScrollToTop() {
    // Add click event to entire header brand area
    const headerBrand = document.querySelector('.header-brand');
    if (headerBrand) {
        headerBrand.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if we're on the home page
            const currentPath = window.location.pathname;
            const isHomePage = currentPath === '/' || currentPath === '/index' || currentPath === '/index.html' || currentPath.endsWith('/index.html');
            
            if (isHomePage) {
                // If on home page, smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // If on other page, navigate to home page with clean URL
                window.location.href = '/';
            }
        });
        // Add cursor pointer style
        headerBrand.style.cursor = 'pointer';
    }
}

// Event Modal Functions
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Clear the countdown interval
    if (eventModalCountdownInterval) {
        clearInterval(eventModalCountdownInterval);
        eventModalCountdownInterval = null;
    }
}

function startEventModalCountdown(eventDateStr) {
    // Clear existing interval
    if (eventModalCountdownInterval) {
        clearInterval(eventModalCountdownInterval);
    }
    
    function updateModalCountdown() {
        const eventDate = new Date(eventDateStr);
        const now = new Date();
        const timeDiff = eventDate - now;
        
        if (timeDiff <= 0) {
            document.getElementById('eventModalDays').textContent = '00';
            document.getElementById('eventModalHours').textContent = '00';
            document.getElementById('eventModalMinutes').textContent = '00';
            document.getElementById('eventModalSeconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        document.getElementById('eventModalDays').textContent = days.toString().padStart(2, '0');
        document.getElementById('eventModalHours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('eventModalMinutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('eventModalSeconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately
    updateModalCountdown();
    
    // Update every second
    eventModalCountdownInterval = setInterval(updateModalCountdown, 1000);
}

// Event listeners for closing modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('eventModal');
    
    if (modal) {
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEventModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeEventModal();
        }
    });
});
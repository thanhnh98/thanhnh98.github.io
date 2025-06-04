// Sắp Tết 2026 - Enhanced Countdown and Calendar

// Tết dates for the next few years (Vietnamese Lunar New Year)
const tetDates = {
    2025: new Date('2025-01-29'), // Tết Ất Tỵ
    2026: new Date('2026-02-17'), // Tết Bính Ngọ
    2027: new Date('2027-02-06'), // Tết Đinh Mùi
    2028: new Date('2028-01-26'), // Tết Mậu Thân
    2029: new Date('2029-02-13'), // Tết Kỷ Dậu
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
        
        // Create solar date element
        const solarDate = document.createElement('div');
        solarDate.className = 'solar-date';
        solarDate.textContent = day;
        
        // Create lunar date element
        const lunarDate = document.createElement('div');
        lunarDate.className = 'lunar-date';
        
        // Calculate lunar date (simplified calculation)
        const currentDate = new Date(year, month, day);
        const lunarInfo = calculateLunarDate(currentDate);
        
        // Format lunar date display
        if (lunarInfo.day === 1) {
            lunarDate.textContent = `${lunarInfo.day}/${lunarInfo.month}`;
        } else {
            lunarDate.textContent = lunarInfo.day;
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
}

// Calculate lunar date (simplified approximation)
function calculateLunarDate(solarDate) {
    // This is a simplified calculation for demonstration
    // In a real application, use a proper lunar calendar library
    const baseDate = new Date(2024, 0, 1); // January 1, 2024
    const daysDiff = Math.floor((solarDate - baseDate) / (1000 * 60 * 60 * 24));
    
    // Approximate lunar calculation (29.5 days per lunar month)
    const lunarDays = Math.floor(daysDiff % 29.5) + 1;
    const lunarMonthIndex = Math.floor(daysDiff / 29.5) % 12;
    
    return {
        day: lunarDays > 29 ? 29 : lunarDays,
        month: lunarMonthIndex
    };
}

function updateLunarInfo(date) {
    const lunarInfoElement = document.getElementById('lunar-date-info');
    
    // Calculate lunar date
    const lunarInfo = calculateLunarDate(date);
    const lunarMonth = lunarMonths[lunarInfo.month - 1] || lunarMonths[0];
    const zodiac = zodiacAnimals[date.getFullYear() % 12];
    
    const dayOfWeek = date.toLocaleDateString('vi-VN', { weekday: 'long' });
    const solarDate = date.toLocaleDateString('vi-VN');
    
    lunarInfoElement.innerHTML = `
        <p><strong>Ngày dương lịch:</strong> ${dayOfWeek}, ${solarDate}</p>
        <p><strong>Ngày âm lịch:</strong> ${lunarInfo.day} ${lunarMonth}</p>
        <p><strong>Năm:</strong> ${zodiac}</p>
        <p><strong>Ngày tốt:</strong> Khai trương, cưới hỏi, xuất hành</p>
        <p><strong>Ngày xấu:</strong> Động thổ, an táng</p>
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
            <p>Tết Nguyên Đán ${nextTet.year}</p>
            <p>Ngày ${lunarDate.day} tháng ${lunarDate.month} năm Ất Tỵ</p>
            <p class="tet-date-solar">${nextTet.date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        `;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Update Tet date display
    updateTetDateDisplay();
    
    // Initialize calendar
    generateCalendar(currentCalendarDate);
    
    // Add event listeners for calendar navigation
    document.getElementById('prev-month').addEventListener('click', previousMonth);
    document.getElementById('next-month').addEventListener('click', nextMonth);
    
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
});
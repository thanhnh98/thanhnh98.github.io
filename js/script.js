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

// ===== LỜI CHÚC TẾT NGẪU NHIÊN =====
const tetGreetings = [
    'Chúc Mừng Năm Mới! An Khang Thịnh Vượng!',
    'Năm mới Vạn Sự Như Ý, Tỷ Sự Như Mơ!',
    'Phúc Lộc Thọ đầy nhà, Tài Lộc đến muôn nơi!',
    'Năm mới Phát Tài Phát Lộc, Sức Khỏe Dồi Dào!',
    'Chúc năm mới Hạnh Phúc, Bình An, Thành Công!',
    'Tân Xuân Vạn Phúc, Gia Đình Hạnh Phúc!',
    'Năm mới Mã Đáo Thành Công, Vạn Sự Hanh Thông!',
    'Chúc Xuân An Lành, Hạnh Phúc Viên Mãn!',
    'Năm mới Tài Lộc Như Ý, Công Danh Thăng Tiến!',
    'Xuân sang Phú Quý, Năm mới Bình An!',
    'Chúc năm mới Thịnh Vượng, Phát Đạt, An Khang!',
    'Tết đến Xuân về, Hạnh Phúc Tràn Đầy!',
    'Năm mới Gặp Nhiều May Mắn, Vui Vẻ Cả Năm!',
    'Chúc Sức Khỏe, Hạnh Phúc, Phát Tài Năm Mới!',
    'Xuân Bính Ngọ Mã Đáo Thành Công, Vạn Sự Như Ý!',
    'Năm Ngọ Tài Lộc Dồi Dào, Công Việc Thuận Lợi!',
    'Chúc Tân Xuân Hạnh Phúc, An Khang Thịnh Vượng!',
    'Năm mới Rồng Bay Phượng Múa, Gia Đình Sum Vầy!',
    'Xuân Về Hoa Nở, Phúc Lộc Đầy Nhà!',
    'Chúc Mừng Năm Mới! Mọi Điều Tốt Đẹp Nhất!'
];

// Tên các ngày Mùng Tết
const mungTetNames = [
    '', // index 0 không dùng
    'Mùng 1 Tết',
    'Mùng 2 Tết',
    'Mùng 3 Tết',
    'Mùng 4 Tết',
    'Mùng 5 Tết',
    'Mùng 6 Tết',
    'Mùng 7 Tết',
    'Mùng 8 Tết',
    'Mùng 9 Tết',
    'Mùng 10 Tết'
];

// Biến lưu trạng thái đã bắn pháo hoa chưa
let hasTriggeredFireworks = false;
let currentGreetingIndex = -1;

// ===== HÀM BẮN PHÁO HOA =====
function createFirework(x, y) {
    const container = document.getElementById('fireworks-container');
    if (!container) return;
    
    const colors = ['firework-red', 'firework-gold', 'firework-orange', 'firework-pink', 'firework-yellow', 'firework-white'];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = `firework-particle ${colors[Math.floor(Math.random() * colors.length)]}`;
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 80 + Math.random() * 120;
        const endX = Math.cos(angle) * velocity;
        const endY = Math.sin(angle) * velocity;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--end-x', endX + 'px');
        particle.style.setProperty('--end-y', endY + 'px');
        particle.style.animation = `particleExplode ${0.8 + Math.random() * 0.4}s ease-out forwards`;
        particle.style.transform = `translate(${endX}px, ${endY}px)`;
        
        container.appendChild(particle);
        
        // Xóa particle sau khi animation hoàn thành
        setTimeout(() => particle.remove(), 1500);
    }
}

function launchFireworks() {
    const container = document.getElementById('fireworks-container');
    if (!container) return;
    
    container.classList.add('active');
    
    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;
    
    // Bắn 15 đợt pháo hoa trong 5 giây
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * viewWidth * 0.8 + viewWidth * 0.1;
            const y = Math.random() * viewHeight * 0.5 + viewHeight * 0.1;
            createFirework(x, y);
        }, i * 350);
    }
    
    // Ẩn container sau khi xong
    setTimeout(() => {
        container.classList.remove('active');
    }, 7000);
}

// ===== LẤY LỜI CHÚC NGẪU NHIÊN =====
function getRandomGreeting() {
    // Mỗi ngày lấy 1 lời chúc ngẫu nhiên, giữ nguyên trong ngày
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('tetGreetingDate');
    
    if (savedDate === today && currentGreetingIndex >= 0) {
        return tetGreetings[currentGreetingIndex];
    }
    
    currentGreetingIndex = Math.floor(Math.random() * tetGreetings.length);
    localStorage.setItem('tetGreetingDate', today);
    return tetGreetings[currentGreetingIndex];
}

// ===== KIỂM TRA ĐANG TRONG NGÀY TẾT (Mùng 1-10) =====
function checkMungTet() {
    try {
        // Sử dụng calculateLunarDate từ lunar-calendar.js
        if (typeof calculateLunarDate === 'function') {
            const today = new Date();
            const lunar = calculateLunarDate(today);
            
            // Nếu là tháng 1 âm lịch và ngày từ 1-10 → đang trong Mùng Tết
            if (lunar && lunar.month === 1 && lunar.day >= 1 && lunar.day <= 10) {
                return {
                    isMungTet: true,
                    day: lunar.day,
                    name: mungTetNames[lunar.day] || `Mùng ${lunar.day} Tết`
                };
            }
        }
    } catch (e) {
        console.warn('Không thể tính ngày âm lịch:', e);
    }
    
    return { isMungTet: false, day: 0, name: '' };
}

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
    
    // Lấy các element cần thiết
    const tetYearEl = document.getElementById('tet-year');
    const countdownSection = document.querySelector('.countdown-section');
    const countdownTimer = document.getElementById('countdown-timer');
    const countdownInfoCard = document.querySelector('.countdown-info-card');
    const mungTetDisplay = document.getElementById('mung-tet-display');
    const mungTetTitle = document.getElementById('mung-tet-title');
    const greetingText = document.getElementById('greeting-text');
    const tetGreeting = document.querySelector('.tet-greeting');
    const sectionH2 = countdownSection ? countdownSection.querySelector('.container > .countdown-content-wrapper > h2:not(.mung-tet-title)') : null;
    
    // Update the year display
    if (tetYearEl) tetYearEl.textContent = nextTet.year;
    
    // ===== KIỂM TRA MÙNG TẾT (ngày 1-10 tháng 1 âm lịch) =====
    const mungTetInfo = checkMungTet();
    
    if (mungTetInfo.isMungTet) {
        // Đang trong Mùng Tết → hiển thị mode đặc biệt
        if (countdownSection) countdownSection.classList.add('mung-tet-mode');
        if (countdownTimer) countdownTimer.style.display = 'none';
        if (countdownInfoCard) countdownInfoCard.style.display = 'none';
        if (sectionH2) sectionH2.style.display = 'none';
        if (tetGreeting) tetGreeting.style.display = 'none';
        
        // Hiển thị Mùng Tết
        if (mungTetDisplay) {
            mungTetDisplay.style.display = 'flex';
            // Update the text inside .mung-tet-text element
            const mungTetTextEl = document.querySelector('.mung-tet-text');
            if (mungTetTextEl) mungTetTextEl.textContent = mungTetInfo.name;
            if (greetingText) greetingText.textContent = getRandomGreeting();
            // Re-init lucide icons
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                setTimeout(() => lucide.createIcons(), 50);
            }
        }
        
        // Bắn pháo hoa vào Mùng 1 (chỉ 1 lần khi load trang)
        if (mungTetInfo.day === 1 && !hasTriggeredFireworks) {
            hasTriggeredFireworks = true;
            setTimeout(launchFireworks, 500);
        }
        
        return; // Không cần countdown nữa
    }
    
    // ===== CHẾ ĐỘ ĐẾM NGƯỢC BÌNH THƯỜNG =====
    // Reset về trạng thái bình thường nếu không phải Mùng Tết
    if (countdownSection) countdownSection.classList.remove('mung-tet-mode');
    if (countdownTimer) countdownTimer.style.display = 'flex';
    if (countdownInfoCard) countdownInfoCard.style.display = 'block';
    if (sectionH2) sectionH2.style.display = 'block';
    if (mungTetDisplay) mungTetDisplay.style.display = 'none';
    
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
        
        // Show greeting message normally
        if (tetGreeting) tetGreeting.style.display = 'block';
        
        // ===== KIỂM TRA KHI SẮP ĐẾN 00:00:00:00 =====
        // Bắn pháo hoa khi còn dưới 3 giây
        if (distance <= 3000 && distance > 0 && !hasTriggeredFireworks) {
            hasTriggeredFireworks = true;
            // Đợi đến đúng 0 giây rồi bắn
            setTimeout(() => {
                launchFireworks();
            }, distance);
        }
    } else {
        // ===== TẾT ĐÃ ĐẾN! =====
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Bắn pháo hoa khi countdown chạm 0
        if (!hasTriggeredFireworks) {
            hasTriggeredFireworks = true;
            launchFireworks();
        }
        
        // Update greeting message
        if (tetGreeting) {
            tetGreeting.innerHTML = `
                <i data-lucide="party-popper" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin: 0 0.5rem;"></i>
                <strong>Chúc Mừng Năm Mới ${nextTet.year}!</strong>
                <i data-lucide="party-popper" style="width: 24px; height: 24px; display: inline-block; vertical-align: middle; margin: 0 0.5rem;"></i>
                <br><span style="font-size: 1.1rem; margin-top: 0.5rem; display: block;">${getRandomGreeting()}</span>
            `;
            tetGreeting.style.display = 'block';
            // Re-init lucide icons
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
            }
        }
    }
}

// Helpers cho highlight sự kiện âm/dương lịch trên lịch trang chủ
function formatDateKey(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + d;
}
function getTraditionalTetDatesForHome(year) {
    const dates = {};
    if (typeof EVENTS_DATA === 'undefined' || !EVENTS_DATA.LUNAR_EVENTS || typeof lunarToSolar !== 'function') return dates;
    function add(ev, solarDate) {
        if (!solarDate) return;
        const key = formatDateKey(solarDate);
        dates[key] = { name: ev.name, lunar: ev.lunarLabel, description: ev.description, type: 'traditional', importance: ev.type === 'major' ? 'high' : 'medium', isMain: ev.isMainTet || false };
    }
    EVENTS_DATA.LUNAR_EVENTS.forEach(function (ev) {
        let solarDate = (ev.lunarMonth === 8 && ev.lunarDay === 15 && typeof calculateTrungThuDate === 'function') ? calculateTrungThuDate(year) : lunarToSolar(year, ev.lunarMonth, ev.lunarDay);
        add(ev, solarDate);
        if (ev.lunarMonth === 12) {
            const solarPrev = lunarToSolar(year - 1, 12, ev.lunarDay);
            if (solarPrev && solarPrev.getFullYear() === year) add(ev, solarPrev);
        }
    });
    return dates;
}
function getHolidayInfoForHome(date) {
    const dateKey = formatDateKey(date);
    const year = date.getFullYear();
    const fixedHolidays = {};
    if (typeof EVENTS_DATA !== 'undefined') {
        [EVENTS_DATA.SOLAR_EVENTS_VIETNAM, EVENTS_DATA.SOLAR_EVENTS_INTERNATIONAL].forEach(function (list) {
            if (!list) return;
            list.forEach(function (ev) {
                const key = year + '-' + String(ev.month).padStart(2, '0') + '-' + String(ev.day).padStart(2, '0');
                if (!fixedHolidays[key]) fixedHolidays[key] = { name: ev.name, type: ev.type || 'national', description: ev.description };
            });
        });
    }
    if (fixedHolidays[dateKey]) return fixedHolidays[dateKey];
    try {
        if (typeof calculateLunarDate === 'function') {
            const lunarInfo = window.calculateLunarDateFromComponent ? window.calculateLunarDateFromComponent(date) : (typeof calculateLunarDate === 'function' ? calculateLunarDate(date) : null);
            if (lunarInfo && lunarInfo.month === 3 && lunarInfo.day === 10) return { name: 'Giỗ Tổ Hùng Vương', type: 'national', description: 'Quốc lễ – nghỉ lễ chính thức.' };
        }
    } catch (e) {}
    return null;
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
    
    const traditionalDates = getTraditionalTetDatesForHome(year);
    
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
        const dateKey = formatDateKey(currentDate);
        const traditionalDate = traditionalDates[dateKey];
        const holidayInfo = getHolidayInfoForHome(currentDate);
        
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
        if (traditionalDate) {
            dayElement.classList.add('calendar-day-event', 'calendar-day-lunar');
            if (traditionalDate.isMain) dayElement.classList.add('calendar-day-tet-main');
            else if (traditionalDate.importance === 'high' || traditionalDate.importance === 'highest') dayElement.classList.add('calendar-day-event-important');
        }
        if (holidayInfo && !traditionalDate) {
            dayElement.classList.add('calendar-day-event', 'calendar-day-solar');
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
        
        dayElement.appendChild(solarDate);
        dayElement.appendChild(lunarDate);
        
        // Add Tet indicator if it's a Tet date
        if (isTetDate) {
            const tetIndicator = document.createElement('div');
            tetIndicator.className = 'tet-indicator';
            tetIndicator.textContent = '🧧';
            dayElement.appendChild(tetIndicator);
        }
        if (traditionalDate) {
            const eventLabel = document.createElement('div');
            eventLabel.className = 'calendar-event-label calendar-event-label-lunar';
            eventLabel.textContent = traditionalDate.name;
            dayElement.appendChild(eventLabel);
        }
        if (holidayInfo && !traditionalDate) {
            const eventLabel = document.createElement('div');
            eventLabel.className = 'calendar-event-label calendar-event-label-solar';
            eventLabel.textContent = holidayInfo.name;
            dayElement.appendChild(eventLabel);
        }
        
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

// Use lunar calendar component if available, otherwise use local function
function calculateLunarDate(solarDate) {
    // Try to use the shared lunar calendar component
    if (typeof calculateLunarDate !== 'undefined' && calculateLunarDate.toString().includes('solarToLunarFallback')) {
        // Component is loaded, but we need to check if it's the right one
        // For now, use the local implementation
    }
    
    // Use the shared component function if available
    if (typeof window.calculateLunarDateFromComponent === 'function') {
        return window.calculateLunarDateFromComponent(solarDate);
    }
    
    // Fallback to local calculation
    try {
        // Use chinese-lunar-calendar library for accurate conversion
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
    
    // Fallback calculation for browser environment or when library is not available
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

// Import chinese-lunar-calendar library for accurate calculations
// Note: This requires the chinese-lunar-calendar npm package to be installed
function solarToLunar(solarDate) {
    try {
        // Use chinese-lunar-calendar library for accurate conversion
        if (typeof LunarCalendar !== 'undefined' && typeof LunarCalendar.getLunar === 'function') {
            const result = LunarCalendar.getLunar(
                solarDate.getFullYear(),
                solarDate.getMonth() + 1, // chinese-lunar-calendar expects 1-based month
                solarDate.getDate()
            );
            
            return {
                day: result.lunarDate,
                month: result.lunarMonth,
                isLeapMonth: result.isLeap,
                leapMonth: result.isLeap ? result.lunarMonth : null,
                zodiac: result.zodiac,
                ganZhiYear: result.lunarYear,
                ganZhiMonth: result.lunarYear, // Simplified - would need separate calculation
                ganZhiDay: result.lunarYear, // Simplified - would need separate calculation
                dateStr: result.dateStr
            };
        }
    } catch (error) {
        console.warn('chinese-lunar-calendar library not available, using fallback calculation:', error.message);
    }
    
    // Fallback calculation for browser environment or when library is not available
    return solarToLunarFallback(solarDate);
}

// Fallback lunar calendar calculation - use shared component if available
function solarToLunarFallback(solarDate) {
    // Use the shared component function if available
    if (typeof window.solarToLunarFallbackFromComponent === 'function') {
        return window.solarToLunarFallbackFromComponent(solarDate);
    }
    
    // Fallback to local implementation (same as component)
    const year = solarDate.getFullYear();
    const month = solarDate.getMonth() + 1;
    const day = solarDate.getDate();
    
    // Accurate lunar calendar data for specific years
    const lunarYearData = {
        2025: {
            tetDate: new Date(2025, 0, 29), // Jan 29, 2025
            monthDays: [30, 29, 30, 29, 29, 30, 30, 30, 29, 30, 30, 29],
            leapMonth: 6, // Leap month 6
            leapMonthDays: 29
        },
        2024: {
            tetDate: new Date(2024, 1, 10), // Feb 10, 2024
            monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        },
        2026: {
            tetDate: new Date(2026, 1, 17), // Feb 17, 2026
            monthDays: [29, 30, 29, 30, 29, 30, 30, 30, 29, 30, 29, 30],
            leapMonth: null,
            leapMonthDays: 0
        }
    };
    
    // Get lunar year data
    let yearData = lunarYearData[year];
    if (!yearData) {
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
        let prevYearData = lunarYearData[prevYear];
        
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
            let remainingDays = daysFromPrevTet;
            let monthIndex = 0;
            let isLeapMonth = false;
            
            while (remainingDays > 0 && monthIndex < prevYearData.monthDays.length) {
                if (remainingDays >= prevYearData.monthDays[monthIndex]) {
                    remainingDays -= prevYearData.monthDays[monthIndex];
                    monthIndex++;
                    
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
            lunarMonth = 12;
            lunarDay = 1;
        }
    } else if (daysDiff >= 0) {
        // After Tet - calculation with proper leap month handling
        let remainingDays = daysDiff;
        let monthIndex = 0;
        let isLeapMonth = false;
        
        while (remainingDays > 0 && monthIndex < yearData.monthDays.length) {
            if (remainingDays >= yearData.monthDays[monthIndex]) {
                remainingDays -= yearData.monthDays[monthIndex];
                monthIndex++;
                
                if (yearData.leapMonth && monthIndex === yearData.leapMonth && remainingDays >= 0) {
                    if (remainingDays >= yearData.leapMonthDays) {
                        remainingDays -= yearData.leapMonthDays;
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
            lunarMonth = yearData.leapMonth;
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
    
    // Sự kiện âm lịch / dương lịch (nếu có)
    const traditionalDates = getTraditionalTetDatesForHome(date.getFullYear());
    const traditionalDate = traditionalDates[formatDateKey(date)];
    const holidayInfo = getHolidayInfoForHome(date);
    
    // Mùng 1 hoặc Rằm (không trùng ngày lễ có tên) – ghi chú tâm linh
    let lunarNoteHtml = '';
    if (!traditionalDate && (lunarInfo.day === 1 || lunarInfo.day === 15)) {
        lunarNoteHtml = '<div class="lunar-info-event lunar-info-note"><p><strong>🕯️ Ngày âm lịch (tâm linh)</strong></p><p>' + (lunarInfo.day === 1 ? 'Mùng 1' : 'Rằm (15)') + ' âm lịch – ngày cúng, tâm linh phổ biến hàng tháng.</p></div>';
    }
    
    const eventLunarHtml = traditionalDate
        ? '<div class="lunar-info-event lunar-info-event-lunar"><p><strong>🌙 ' + traditionalDate.name + '</strong></p><p>' + (traditionalDate.description || '') + '</p><p class="lunar-info-event-date">' + (traditionalDate.lunar || '') + ' âm lịch</p></div>'
        : '';
    const eventSolarHtml = holidayInfo
        ? '<div class="lunar-info-event lunar-info-event-solar"><p><strong>☀️ ' + holidayInfo.name + '</strong></p><p>' + (holidayInfo.description || '') + '</p></div>'
        : '';
    
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
        ${eventLunarHtml}
        ${eventSolarHtml}
        ${lunarNoteHtml}
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

// Update Tet date display (chỉ cập nhật span ngày Tết trong countdown-info-card)
function updateTetDateDisplay() {
    const el = document.getElementById('tet-date-solar');
    if (el) {
        const nextTet = getNextTet();
        el.textContent = nextTet.date.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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
        getDate: () => {
            // Tính toán từ 15/8 âm lịch
            if (typeof getNextTrungThu === 'function') {
                return getNextTrungThu().date;
            }
            // Fallback nếu hàm chưa được load
            return getNextEventDate(10, 6);
        },
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

// Removed duplicate/incorrect modal countdown implementation

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
    
    // Initialize star bling effects
    initializeStarBlingEffects();
});

// Star Bling Effects Functions
function initializeStarBlingEffects() {
    // Add random sparkle effects to stars
    const stars = document.querySelectorAll('.star-bling');
    const floatingStars = document.querySelectorAll('.floating-star');
    
    // Add random sparkle animation delays
    stars.forEach((star, index) => {
        // Random animation delay for more natural effect
        const randomDelay = Math.random() * 3;
        star.style.animationDelay = `${randomDelay}s`;
        
        // Add click effect for interactivity
        star.addEventListener('click', function() {
            createSparkleBurst(this);
        });
        
        // Add hover effect
        star.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(255, 215, 0, 1))';
        });
        
        star.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.filter = 'drop-shadow(0 0 10px rgba(255, 215, 0, 0.8))';
        });
    });
    
    // Add floating animation to floating stars
    floatingStars.forEach((star, index) => {
        const randomDelay = Math.random() * 4;
        const randomDuration = 4 + Math.random() * 3;
        star.style.animationDelay = `${randomDelay}s`;
        star.style.animationDuration = `${randomDuration}s`;
    });
    
    // Create periodic sparkle effects
    setInterval(() => {
        const randomStar = stars[Math.floor(Math.random() * stars.length)];
        if (randomStar) {
            createMiniSparkle(randomStar);
        }
    }, 2000);
}

function createSparkleBurst(star) {
    // Create burst effect when star is clicked
    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'mini-sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #FFD700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 15;
        `;
        
        const angle = (i * 45) * Math.PI / 180;
        const distance = 30;
        const startX = star.offsetLeft + star.offsetWidth / 2;
        const startY = star.offsetTop + star.offsetHeight / 2;
        
        sparkle.style.left = startX + 'px';
        sparkle.style.top = startY + 'px';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const animation = sparkle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        animation.onfinish = () => {
            sparkle.remove();
        };
    }
}

function createMiniSparkle(star) {
    // Create mini sparkle effect
    const sparkle = document.createElement('div');
    sparkle.className = 'mini-sparkle';
    sparkle.style.cssText = `
        position: absolute;
        width: 6px;
        height: 6px;
        background: #FFA500;
        border-radius: 50%;
        pointer-events: none;
        z-index: 15;
        left: ${star.offsetLeft + star.offsetWidth / 2}px;
        top: ${star.offsetTop + star.offsetHeight / 2}px;
    `;
    
    document.body.appendChild(sparkle);
    
    // Animate mini sparkle
    const animation = sparkle.animate([
        {
            transform: 'scale(0)',
            opacity: 1
        },
        {
            transform: 'scale(1.5)',
            opacity: 0.8
        },
        {
            transform: 'scale(0)',
            opacity: 0
        }
    ], {
        duration: 1500,
        easing: 'ease-in-out'
    });
    
    animation.onfinish = () => {
        sparkle.remove();
    };
}

// Global variable to store current event type
let currentEventType = null;

// Event detail navigation function (now opens modal instead of direct navigation)
function navigateToEventDetail(eventType) {
    currentEventType = eventType;
    openEventModal(eventType);
}

// Function to navigate from modal
function navigateToEventDetailFromModal() {
    if (!currentEventType) return;
    
    // Define the mapping of event types to their detail pages
    const eventPages = {
        'tet': 'lich-van-nien.html',
        'valentine': 'blog.html#valentine',
        'women-day': 'blog.html#women-day',
        'hung-kings': 'blog.html#hung-kings',
        'liberation': 'blog.html#liberation',
        'labor-day': 'blog.html#labor-day',
        'mid-autumn': 'trung-thu.html',
        'teachers-day': 'blog.html#teachers-day',
        'christmas': 'noel.html',
        'new-year': 'blog.html#new-year'
    };
    
    // Get the target page for the event type
    const targetPage = eventPages[currentEventType];
    
    if (targetPage) {
        // Add loading state to button
        const button = document.getElementById('eventModalDetailBtn');
        if (button) {
            const originalText = button.innerHTML;
            button.innerHTML = '<span class="btn-text">Đang chuyển...</span><span class="btn-icon loading-spinner">⏳</span>';
            button.disabled = true;
            button.style.opacity = '0.8';
        }
        
        // Close modal and navigate after a short delay
        setTimeout(() => {
            closeEventModal();
            window.location.href = targetPage;
        }, 300);
    } else {
        // Fallback to blog page if event type not found
        console.warn('Event type not found:', currentEventType);
        closeEventModal();
        window.location.href = 'blog.html';
    }
}

// Removed duplicate/legacy event modal functions to prevent conflicting intervals

// Add keyboard navigation support for event detail buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to event cards
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            const eventType = this.getAttribute('data-event');
            if (eventType) {
                navigateToEventDetail(eventType);
            }
        });
        
        // Add hover effect
        card.style.cursor = 'pointer';
    });
    
    // Close modal when clicking outside
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeEventModal();
            }
        });
    }
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEventModal();
        }
    });
});

// Share Countdown Section as Image
// Global functions for share modal
function showShareModal() {
    const modal = document.getElementById('share-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function updateSharePreview(imageUrl) {
    const previewContainer = document.getElementById('share-preview-container');
    const previewImage = document.getElementById('share-preview-image');
    
    if (previewContainer && previewImage && imageUrl) {
        previewImage.src = imageUrl;
        previewImage.onload = function() {
            previewContainer.style.display = 'block';
        };
        previewImage.onerror = function() {
            previewContainer.style.display = 'none';
        };
    }
}

function hideShareModal() {
    const modal = document.getElementById('share-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        z-index: 10001;
        font-weight: 500;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideUpToast 0.3s ease;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideDownToast 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 2000);
}

// Countdown Preview Modal Functions
function showCountdownPreviewModal() {
    const modal = document.getElementById('countdown-preview-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function hideCountdownPreviewModal() {
    const modal = document.getElementById('countdown-preview-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function cloneCountdownSection() {
    const countdownContentWrapper = document.getElementById('countdown-content-wrapper');
    const previewWrapper = document.getElementById('countdown-preview-wrapper');
    
    if (!countdownContentWrapper || !previewWrapper) return;
    
    // Clear previous content
    previewWrapper.innerHTML = '';
    
    // Clone the countdown content wrapper
    const clone = countdownContentWrapper.cloneNode(true);
    
    // Remove share button if exists in clone
    const clonedShareBtn = clone.querySelector('#share-countdown-btn');
    if (clonedShareBtn) {
        clonedShareBtn.remove();
    }
    
    // Remove the 3 lines as requested:
    // 1. tet-main-greeting
    const tetMainGreeting = clone.querySelector('.tet-main-greeting');
    if (tetMainGreeting) {
        tetMainGreeting.remove();
    }
    
    // 2. h1 with seo-title-hidden
    const seoTitle = clone.querySelector('h1.seo-title-hidden');
    if (seoTitle) {
        seoTitle.remove();
    }
    
    // 3. h2 with "Đếm ngược đến Tết"
    const h2Title = clone.querySelector('h2');
    if (h2Title && h2Title.textContent.includes('Đếm ngược đến Tết')) {
        h2Title.remove();
    }
    
    // Ensure clone has proper styling
    clone.style.width = '100%';
    clone.style.maxWidth = '100%';
    clone.style.margin = '0 auto';
    clone.style.padding = '1rem';
    
    // Remove border, box-shadow and background from countdown-info-card (preview)
    const countdownInfoCard = clone.querySelector('.countdown-info-card');
    if (countdownInfoCard) {
        countdownInfoCard.style.border = 'none';
        countdownInfoCard.style.boxShadow = 'none';
        countdownInfoCard.style.background = 'transparent';
        countdownInfoCard.style.backgroundColor = 'transparent';
        // Add "Tết chỉ còn..." text after countdown-info-card
        const remainingText = document.createElement('p');
        remainingText.className = 'tet-remaining-text';
        remainingText.textContent = 'Tết chỉ còn...';
        countdownInfoCard.insertAdjacentElement('afterend', remainingText);
    }
    
    // Disable animations in clone
    const allElements = clone.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.animation = 'none';
        el.style.animationPlayState = 'paused';
        el.style.transition = 'none';
    });
    
    // Add watermark at the bottom
    const watermark = document.createElement('div');
    watermark.className = 'countdown-preview-watermark';
    watermark.innerHTML = `
        <p class="watermark-text">Sắp Tết 2026 - Đếm Ngược Tết Nguyên Đán</p>
        <p class="watermark-url">saptet.vn</p>
    `;
    clone.appendChild(watermark);
    
    previewWrapper.appendChild(clone);
}

async function capturePreviewModal() {
    // Only capture the countdown content wrapper, not the header and buttons
    const previewWrapper = document.getElementById('countdown-preview-wrapper');
    if (!previewWrapper) return null;
    
    // Wait a moment for rendering
    await new Promise(resolve => setTimeout(resolve, 300));
    
    try {
        const canvas = await html2canvas(previewWrapper, {
            backgroundColor: '#FFF9E6', // Match the background color
            scale: 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            imageTimeout: 20000,
            removeContainer: false,
            foreignObjectRendering: false,
        });
        
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (blob && blob.size > 0) {
                    const url = URL.createObjectURL(blob);
                    resolve({ blob, url });
                } else {
                    resolve(null);
                }
            }, 'image/png', 0.95);
        });
    } catch (error) {
        console.error('Error capturing preview modal:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const shareBtn = document.getElementById('share-countdown-btn');
    const countdownContentWrapper = document.getElementById('countdown-content-wrapper');
    const countdownSection = document.getElementById('countdown');
    
    // Countdown Preview Modal elements
    const previewModal = document.getElementById('countdown-preview-modal');
    const previewCloseBtn = document.getElementById('countdown-preview-close');
    const previewDownloadBtn = document.getElementById('countdown-preview-download');
    const previewShareBtn = document.getElementById('countdown-preview-share');
    
    // Handle share button click - show preview modal
    if (shareBtn && countdownContentWrapper) {
        // Store original button HTML to restore later
        const originalButtonHTML = shareBtn.innerHTML;
        
        shareBtn.addEventListener('click', async function() {
            try {
                // Show loading state
                shareBtn.disabled = true;
                shareBtn.innerHTML = '<span class="share-icon">⏳</span><span class="share-text">Đang xử lý...</span>';
                
                // Wait for fonts to load
                if (document.fonts && document.fonts.ready) {
                    await document.fonts.ready;
                }
                
                // Wait a moment to ensure countdown is updated
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Clone and show preview modal
                cloneCountdownSection();
                showCountdownPreviewModal();
                
                // Restore original button HTML
                shareBtn.disabled = false;
                shareBtn.innerHTML = originalButtonHTML;
            } catch (error) {
                console.error('Error showing preview:', error);
                // Restore original button HTML even on error
                shareBtn.disabled = false;
                shareBtn.innerHTML = originalButtonHTML;
            }
        });
    }
    
    // Handle preview modal close
    if (previewCloseBtn) {
        previewCloseBtn.addEventListener('click', hideCountdownPreviewModal);
    }
    
    if (previewModal) {
        previewModal.addEventListener('click', function(e) {
            if (e.target === previewModal || e.target.classList.contains('countdown-preview-overlay')) {
                hideCountdownPreviewModal();
            }
        });
    }
    
    // Handle download button
    if (previewDownloadBtn) {
        previewDownloadBtn.addEventListener('click', async function() {
            try {
                previewDownloadBtn.disabled = true;
                previewDownloadBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Đang xử lý...</span>';
                
                const result = await capturePreviewModal();
                
                if (result) {
                    // Download the image
                    const link = document.createElement('a');
                    link.download = `tet-countdown-${Date.now()}.png`;
                    link.href = result.url;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Clean up
                    setTimeout(() => {
                        URL.revokeObjectURL(result.url);
                    }, 100);
                    
                    showToast('✅ Đã tải ảnh xuống!');
                } else {
                    showToast('❌ Có lỗi xảy ra khi tạo ảnh');
                }
                
                previewDownloadBtn.disabled = false;
                previewDownloadBtn.innerHTML = '<span class="btn-icon">📥</span><span class="btn-text">Tải xuống</span>';
            } catch (error) {
                console.error('Error downloading image:', error);
                previewDownloadBtn.disabled = false;
                previewDownloadBtn.innerHTML = '<span class="btn-icon">📥</span><span class="btn-text">Tải xuống</span>';
            }
        });
    }
    
    // Handle share button in preview modal
    if (previewShareBtn) {
        previewShareBtn.addEventListener('click', async function() {
            try {
                previewShareBtn.disabled = true;
                previewShareBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">Đang xử lý...</span>';
                
                const result = await capturePreviewModal();
                
                if (result) {
                    // Store the image for sharing
                    window.shareImageBlob = result.blob;
                    window.shareImageUrl = result.url;
                    
                    // Update preview in share modal
                    updateSharePreview(result.url);
                    
                    // Hide preview modal and show share modal
                    hideCountdownPreviewModal();
                    showShareModal();
                } else {
                    showToast('❌ Có lỗi xảy ra khi tạo ảnh');
                }
                
                previewShareBtn.disabled = false;
                previewShareBtn.innerHTML = '<span class="btn-icon">📤</span><span class="btn-text">Chia sẻ</span>';
            } catch (error) {
                console.error('Error sharing image:', error);
                previewShareBtn.disabled = false;
                previewShareBtn.innerHTML = '<span class="btn-icon">📤</span><span class="btn-text">Chia sẻ</span>';
            }
        });
    }
    
    // Share modal handlers (existing share modal code continues below)
    
    function downloadImage(url) {
        const link = document.createElement('a');
        link.download = `tet-countdown-${Date.now()}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL after a delay
        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 100);
    }
    
    // Share modal event handlers
    const shareModal = document.getElementById('share-modal');
    const shareModalClose = document.getElementById('share-modal-close');
    const shareDownloadBtn = document.getElementById('share-download-image');
    const shareOptions = document.querySelectorAll('.share-option');
    
    if (shareModalClose) {
        shareModalClose.addEventListener('click', hideShareModal);
    }
    
    if (shareModal) {
        shareModal.addEventListener('click', function(e) {
            if (e.target === shareModal || e.target.classList.contains('share-modal-overlay')) {
                hideShareModal();
            }
        });
    }
    
    // Download image button
    if (shareDownloadBtn) {
        shareDownloadBtn.addEventListener('click', function() {
            if (window.shareImageUrl) {
                downloadImage(window.shareImageUrl);
                hideShareModal();
            }
        });
    }
    
    // Share options handlers
    shareOptions.forEach(option => {
        option.addEventListener('click', function() {
            const shareType = this.getAttribute('data-share');
            const pageUrl = window.location.href;
            const pageTitle = encodeURIComponent('🎊 Sắp Tết 2026 - Đếm Ngược Đến Tết Nguyên Đán');
            const pageText = encodeURIComponent('Cùng đếm ngược đến Tết Bính Ngọ 2026! 🏮');
            
            let shareUrl = '';
            
            switch(shareType) {
                case 'copy-link':
                    // Copy link to clipboard
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(pageUrl).then(() => {
                            showToast('✅ Đã sao chép liên kết!');
                            hideShareModal();
                        }).catch(() => {
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = pageUrl;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textArea);
                            showToast('✅ Đã sao chép liên kết!');
                            hideShareModal();
                        });
                    }
                    return;
                    
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${pageText}%20${pageUrl}`;
                    break;
                    
                case 'messenger':
                    shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(pageUrl)}&app_id=YOUR_APP_ID`;
                    // For Messenger, we'll use a simpler approach
                    shareUrl = `fb-messenger://share?link=${encodeURIComponent(pageUrl)}`;
                    break;
                    
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${pageText}`;
                    break;
                    
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${pageText}`;
                    break;
            }
            
            if (shareUrl) {
                // Try to share image if available, otherwise share link
                if (window.shareImageBlob && shareType !== 'copy-link') {
                    // For image sharing, we'll open the share URL in a new window
                    // and the user can manually attach the image
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    hideShareModal();
                } else {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                    hideShareModal();
                }
            }
        });
    });
    
    // Add toast animations if not already added
    if (!document.getElementById('toast-animations-style')) {
        const style = document.createElement('style');
        style.id = 'toast-animations-style';
        style.textContent = `
            @keyframes slideUpToast {
                from {
                    transform: translateX(-50%) translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
            @keyframes slideDownToast {
                from {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-50%) translateY(100px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
// Dynamic SEO Description Generator
class DynamicSEO {
    constructor() {
        // getContent runs when a rule matches so day counts stay correct (hourly refresh + long-lived tabs).
        this.descriptions = [
            // Countdown focused descriptions
            {
                condition: () => this.getDaysUntilTet() <= 7,
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - CHỈ CÒN ${this.getDaysUntilTet()} NGÀY NỮA LÀ ĐẾN TẾT NGUYÊN ĐÁN! Chuẩn bị Tết hoàn hảo: món ăn Tết truyền thống (bánh chưng, thịt kho tàu), phong tục Tết, trang trí nhà cửa. Lịch âm dương, giờ hoàng đạo chi tiết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🏮`
            },
            {
                condition: () => this.getDaysUntilTet() <= 30,
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Đếm ngược Tết Nguyên Đán chỉ còn ${this.getDaysUntilTet()} ngày! Khám phá văn hóa Tết Việt Nam: món ăn Tết truyền thống (bánh chưng, thịt kho tàu), phong tục Tết, trò chơi dân gian. Lịch âm dương, giờ hoàng đạo, blog văn hóa Tết chi tiết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🎊`
            },
            // Food focused descriptions
            {
                condition: () => this.isWeekend(),
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Cuối tuần rồi! Học cách làm món Tết Nguyên Đán truyền thống: bánh chưng, thịt kho tàu, nem rán, xôi gấc. Khám phá văn hóa ẩm thực Tết Việt Nam, phong tục Tết, lịch âm dương 2027. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🏮`
            },
            // Culture focused descriptions
            {
                condition: () => this.isLunarDate(),
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Hôm nay ${this.getCurrentLunarDate()} âm lịch! Khám phá văn hóa Tết Nguyên Đán Việt Nam: phong tục Tết truyền thống, món ăn Tết (bánh chưng, thịt kho tàu), trò chơi dân gian. Lịch âm dương, giờ hoàng đạo chi tiết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🎊`
            },
            // General descriptions with seasonal variations
            {
                condition: () => this.isMorning(),
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Chào buổi sáng! Đếm ngược Tết Nguyên Đán chỉ còn ${this.getDaysUntilTet()} ngày. Khám phá văn hóa Tết Việt Nam: món ăn Tết, phong tục Tết, lịch âm dương, blog văn hóa chi tiết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🏮`
            },
            {
                condition: () => this.isEvening(),
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Buổi tối rồi! Chuẩn bị Tết Nguyên Đán: món ăn Tết (bánh chưng, thịt kho tàu), phong tục Tết, trò chơi dân gian. Lịch âm dương, giờ hoàng đạo, blog văn hóa Tết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🎊`
            },
            // Default description
            {
                condition: () => true,
                getContent: () =>
                    `Sắp Tết 2027 - Tết Việt Nam (Tết Việt) - Tết Đinh Mùi 2027 - Đếm ngược Tết Nguyên Đán chỉ còn ${this.getDaysUntilTet()} ngày! Khám phá văn hóa Tết Việt Nam: món ăn Tết (bánh chưng, thịt kho tàu), phong tục Tết, trò chơi dân gian. Lịch âm dương, giờ hoàng đạo, blog văn hóa Tết chi tiết. Từ khóa: Tết Việt Nam, Tết Việt, Tết 2027, Tết. 🎊`
            }
        ];
        
        this.init();
    }

    init() {
        this.updateDescription();
        // Update description every hour
        setInterval(() => this.updateDescription(), 3600000);
    }

    getDaysUntilTet() {
        const tetDate = new Date('2027-02-06');
        const today = new Date();
        const diffTime = tetDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    isWeekend() {
        const day = new Date().getDay();
        return day === 0 || day === 6;
    }

    isMorning() {
        const hour = new Date().getHours();
        return hour >= 6 && hour < 12;
    }

    isEvening() {
        const hour = new Date().getHours();
        return hour >= 18 && hour < 22;
    }

    isLunarDate() {
        // Check if today is a special lunar date (1st, 15th, 30th of lunar month)
        // This is a simplified version - in real implementation you'd use a lunar calendar library
        const today = new Date();
        const day = today.getDate();
        return day === 1 || day === 15 || day === 30;
    }

    getCurrentLunarDate() {
        // Simplified lunar date - in real implementation use a proper lunar calendar
        const today = new Date();
        const day = today.getDate();
        const month = today.getMonth() + 1;
        return `${day}/${month}`;
    }

    updateDescription() {
        const description = this.getBestDescription();
        this.updateMetaTags(description);
    }

    getBestDescription() {
        for (let desc of this.descriptions) {
            if (desc.condition()) {
                return desc.getContent();
            }
        }
        return this.descriptions[this.descriptions.length - 1].getContent();
    }

    updateMetaTags(description) {
        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', description);
        }

        // Update Open Graph description
        let ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            ogDesc.setAttribute('content', description);
        }

        // Update Twitter description
        let twitterDesc = document.querySelector('meta[property="twitter:description"]');
        if (twitterDesc) {
            twitterDesc.setAttribute('content', description);
        }

        // Update page title with countdown if close to Tet
        this.updateTitle();
    }

    updateTitle() {
        const daysUntilTet = this.getDaysUntilTet();
        let title = document.querySelector('title');
        
        if (daysUntilTet <= 7 && title) {
            title.textContent = `🎊 Sắp Tết - CHỈ CÒN ${daysUntilTet} NGÀY NỮA LÀ ĐẾN TẾT 2027!`;
        } else if (daysUntilTet <= 30 && title) {
            title.textContent = `🏮 Sắp Tết - Đếm Ngược Tết 2027 | Còn ${daysUntilTet} Ngày Nữa Tới Tết`;
        } else if (title) {
            title.textContent = `Sắp Tết - Đếm Ngược Tết 2027 | Còn Bao Nhiêu Ngày Nữa Tới Tết?`;
        }
    }
}

// Initialize dynamic SEO when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DynamicSEO();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DynamicSEO();
    });
} else {
    new DynamicSEO();
} 
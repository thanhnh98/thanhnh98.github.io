// Sắp Tết 2027 Resources Configuration
// This file contains all the configurable resources for the Sắp Tết website
// Update these values to customize the app store links and other resources

const APP_RESOURCES = {
    // App Store URLs - Update these with your actual app store links
    appStore: {
        android: 'https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down',
        ios: 'https://apps.apple.com/gb/app/s%E1%BA%AFp-t%E1%BA%BFt-%C4%91%E1%BA%BFm-ng%C6%B0%E1%BB%A3c-t%E1%BA%BFt-2026/id6743064990?platform=iphone'
    },
    
    // App Information
    appInfo: {
        name: 'Sắp Tết 2027',
        description: 'Ứng dụng đếm ngược Tết và lịch âm dương',
        version: '2.0.0',
        website: 'https://saptet.vn'
    },
    
    // Tết Features
    features: {
        countdown: 'Đếm ngược chính xác đến Tết Nguyên Đán',
        calendar: 'Lịch âm dương với thông tin ngày tốt xấu',
        luckyDraw: 'Tết Nguyên đán 2027 và lịch vạn niên',
        foods: 'Khám phá món ăn Tết truyền thống'
    },
    
    // Social Media Links (optional)
    socialMedia: {
        facebook: 'https://www.facebook.com/saptet2026/',
        youtube: 'https://youtube.com/@sap.tet',
        tiktok: 'https://tiktok.com/@sap.tet'
    },
    
    // Contact Information
    contact: {
        email: 'support@sap.tet.vn',
        website: 'https://saptet.vn'
    },
    
    // Assets paths
    assets: {
        images: {
            background: 'assets/images/background.webp',
            googlePlay: 'assets/images/google_play.png',
            appStore: 'assets/images/apple_store.png',
            wheel: 'assets/images/ic_wheel.png'
        },
        sounds: {
            countdown: 'assets/sounds/',
            celebration: 'assets/sounds/'
        },
        fonts: {
            primary: 'assets/fonts/',
            secondary: 'assets/fonts/'
        }
    }
};

// Function to update app store links dynamically
function updateAppStoreLinks() {
    // Update Google Play app link
    const googlePlayBtn = document.getElementById('google-play-btn');
    if (googlePlayBtn && APP_RESOURCES.appStore.android) {
        googlePlayBtn.href = APP_RESOURCES.appStore.android;
        googlePlayBtn.target = '_blank';
        googlePlayBtn.rel = 'noopener noreferrer';
    }
    
    // Update App Store link
    const appStoreBtn = document.getElementById('app-store-btn');
    if (appStoreBtn && APP_RESOURCES.appStore.ios) {
        appStoreBtn.href = APP_RESOURCES.appStore.ios;
        appStoreBtn.target = '_blank';
        appStoreBtn.rel = 'noopener noreferrer';
    }
    
    // Add click tracking for analytics
    if (googlePlayBtn) {
        googlePlayBtn.addEventListener('click', function() {
            console.log('Google Play button clicked');
            // Add analytics tracking here if needed
        });
    }
    
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function() {
            console.log('App Store button clicked');
            // Add analytics tracking here if needed
        });
    }
}

// Function to preload critical images
function preloadImages() {
    const criticalImages = [
        APP_RESOURCES.assets.images.background,
        APP_RESOURCES.assets.images.googlePlay,
        APP_RESOURCES.assets.images.appStore
    ];
    
    criticalImages.forEach(imagePath => {
        const img = new Image();
        img.src = imagePath;
    });
}

// Function to add lucky wheel feature
function initializeLuckyWheel() {
    // This would be expanded with actual lucky wheel functionality
    console.log('Lucky wheel feature initialized');
}

// Initialize resources when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAppStoreLinks();
    preloadImages();
    initializeLuckyWheel();
    
    console.log('Sắp Tết 2027 resources initialized');
    console.log('App info:', APP_RESOURCES.appInfo);
});
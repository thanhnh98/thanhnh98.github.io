// Universal Links Handler
class UniversalLinksManager {
    constructor() {
        this.androidPackage = 'com.saptet.app';
        this.iosAppId = '123456789';
        this.customScheme = 'saptet';
        this.playStoreUrl = 'https://play.google.com/store/apps/details?id=com.saptet.app';
        this.appStoreUrl = 'https://apps.apple.com/app/sap-tet/id123456789';
        
        this.init();
    }
    
    init() {
        this.addSmartBanner();
        this.handleDeepLinks();
        this.interceptLinks();
    }
    
    addSmartBanner() {
        // Only show on mobile
        if (!this.isMobile()) return;
        
        // Check if app is likely installed
        this.checkAppInstalled().then(isInstalled => {
            if (!isInstalled) {
                this.showSmartBanner();
            }
        });
    }
    
    showSmartBanner() {
        const banner = document.createElement('div');
        banner.id = 'smart-app-banner';
        banner.innerHTML = `
            <div class="smart-banner">
                <div class="smart-banner-container">
                    <button class="smart-banner-close" onclick="this.parentElement.parentElement.style.display='none'">&times;</button>
                    <div class="smart-banner-icon">
                        <img src="assets/images/ic_app.webp" alt="Sắp Tết">
                    </div>
                    <div class="smart-banner-info">
                        <div class="smart-banner-title">Sắp Tết</div>
                        <div class="smart-banner-subtitle">Đếm ngược Tết 2026</div>
                        <div class="smart-banner-rating">⭐⭐⭐⭐⭐ MIỄN PHÍ</div>
                    </div>
                    <div class="smart-banner-button">
                        <button onclick="universalLinksManager.openApp()" class="smart-banner-install">
                            ${this.isIOS() ? 'MỞ' : 'CÀI ĐẶT'}
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertBefore(banner, document.body.firstChild);
        document.body.style.paddingTop = '84px';
    }
    
    async checkAppInstalled() {
        try {
            if (this.isIOS()) {
                // Try to open app with custom scheme
                const timeout = new Promise(resolve => setTimeout(() => resolve(false), 2000));
                const appOpen = new Promise(resolve => {
                    window.location = `${this.customScheme}://`;
                    setTimeout(() => resolve(true), 500);
                });
                
                return await Promise.race([appOpen, timeout]);
            } else if (this.isAndroid()) {
                // Android: Try intent URL
                try {
                    const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=${this.androidPackage};end`;
                    window.location = intentUrl;
                    return true;
                } catch (e) {
                    return false;
                }
            }
        } catch (e) {
            return false;
        }
        return false;
    }
    
    handleDeepLinks() {
        // Handle incoming deep links
        const urlParams = new URLSearchParams(window.location.search);
        const deepLink = urlParams.get('deep_link');
        
        if (deepLink) {
            this.openAppWithDeepLink(deepLink);
        }
    }
    
    interceptLinks() {
        // Intercept all internal links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
                return; // External links or special protocols
            }
            
            // Internal link - try to open in app first
            if (this.isMobile()) {
                e.preventDefault();
                this.tryOpenInApp(href);
            }
        });
    }
    
    tryOpenInApp(path) {
        const fullUrl = `${window.location.origin}${path}`;
        
        if (this.isIOS()) {
            // Try universal link first
            const universalLink = fullUrl;
            window.location = universalLink;
            
            // Fallback to custom scheme after delay
            setTimeout(() => {
                window.location = `${this.customScheme}://${path.replace('/', '')}`;
            }, 500);
            
            // Final fallback to web
            setTimeout(() => {
                window.location = fullUrl;
            }, 2000);
            
        } else if (this.isAndroid()) {
            // Android Intent URL
            const intentUrl = `intent://${window.location.host}${path}#Intent;scheme=https;package=${this.androidPackage};S.browser_fallback_url=${encodeURIComponent(fullUrl)};end`;
            window.location = intentUrl;
        } else {
            // Desktop - just navigate normally
            window.location = fullUrl;
        }
    }
    
    openApp() {
        if (this.isIOS()) {
            // Try universal link first
            window.location = window.location.href;
            
            // Fallback to App Store
            setTimeout(() => {
                window.location = this.appStoreUrl;
            }, 2000);
            
        } else if (this.isAndroid()) {
            // Try app intent
            const intentUrl = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;package=${this.androidPackage};S.browser_fallback_url=${encodeURIComponent(this.playStoreUrl)};end`;
            window.location = intentUrl;
        }
    }
    
    openAppWithDeepLink(deepLink) {
        if (this.isIOS()) {
            window.location = `${this.customScheme}://${deepLink}`;
        } else if (this.isAndroid()) {
            window.location = `${this.customScheme}://${deepLink}`;
        }
    }
    
    isMobile() {
        return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    isIOS() {
        return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    }
    
    isAndroid() {
        return /Android/i.test(navigator.userAgent);
    }
}

// Initialize
let universalLinksManager;
document.addEventListener('DOMContentLoaded', function() {
    universalLinksManager = new UniversalLinksManager();
});
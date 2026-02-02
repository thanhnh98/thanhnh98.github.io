// Header Component Loader
class HeaderLoader {
    constructor() {
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        if (filename === 'mon-an-tet.html') {
            return 'mon-an-tet';
        } else if (filename === 'cua-hang.html') {
            return 'cua-hang';
        } else if (filename === 'index.html' || filename === '') {
            const hash = window.location.hash;
            if (hash === '#app-intro') return 'app';
            if (hash) {
                return hash.substring(1); // Remove # from hash
            }
            return 'countdown'; // Default to countdown for index page
        }
        return 'index';
    }

    async loadHeader() {
        try {
            // Use absolute URL to work from any directory level
            // Get the origin (protocol + hostname + port) and construct full URL
            const origin = window.location.origin;
            const headerPath = origin + '/components/header.html';
            const response = await fetch(headerPath);
            const headerHTML = await response.text();
            
            // Insert header into the page
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) {
                headerContainer.innerHTML = headerHTML;
            } else {
                // If no container, insert at the beginning of body
                document.body.insertAdjacentHTML('afterbegin', headerHTML);
            }
            
            // Set active state
            this.setActiveNavItem();
            
            // Add navigation event listeners
            this.addNavigationListeners();
            
            // Add mobile menu toggle listener
            this.addMobileMenuListener();
            
            // Scroll to #app-intro when clicking Ứng dụng
            this.addAppIntroScrollListener();
            
            // Khi vào trang chủ với hash #app-intro thì cuộn mượt tới section
            const path = window.location.pathname;
            const isIndex = path === '/' || path.endsWith('/') || path.endsWith('index.html');
            if (isIndex && window.location.hash === '#app-intro') {
                setTimeout(() => {
                    document.getElementById('app-intro')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
            
            // Initialize Lucide icons in the header
            this.initIcons();
            
        } catch (error) {
            console.error('Error loading header:', error);
            // Fallback: keep existing header if loading fails
        }
    }

    setActiveNavItem() {
        const navLinks = document.querySelectorAll('nav a[data-page]');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === this.currentPage) {
                link.classList.add('active');
            }
        });
    }

    addNavigationListeners() {
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                e.target.classList.add('active');
                
                // Close mobile menu on link click
                const nav = document.querySelector('nav');
                if (nav) {
                    nav.classList.remove('mobile-menu-open');
                }
                
                // Close expandable menu on link click
                const navExpandable = document.querySelector('.nav-expandable');
                if (navExpandable && navExpandable.classList.contains('expanded')) {
                    navExpandable.classList.remove('expanded');
                    const seeMoreBtn = document.querySelector('.see-more-btn');
                    const seeMoreText = seeMoreBtn?.querySelector('.see-more-text');
                    if (seeMoreText) {
                        seeMoreText.textContent = 'Thêm';
                    }
                }
            });
        });
    }

    addAppIntroScrollListener() {
        document.querySelectorAll('a[href*="#app-intro"], a.nav-app-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const path = window.location.pathname;
                const isIndex = path === '/' || path.endsWith('/') || path.endsWith('index.html');
                if (isIndex) {
                    const appSection = document.getElementById('app-intro');
                    if (appSection) {
                        e.preventDefault();
                        appSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    
    addMobileMenuListener() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('nav');
        
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('mobile-menu-open');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('header') && nav.classList.contains('mobile-menu-open')) {
                    nav.classList.remove('mobile-menu-open');
                }
            });
        }
        
        // Add See More button functionality
        this.addSeeMoreListener();
    }
    
    addSeeMoreListener() {
        const seeMoreBtn = document.querySelector('.see-more-btn');
        const navExpandable = document.querySelector('.nav-expandable');
        
        if (seeMoreBtn && navExpandable) {
            seeMoreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                navExpandable.classList.toggle('expanded');
                
                // Update button text
                const seeMoreText = seeMoreBtn.querySelector('.see-more-text');
                if (seeMoreText) {
                    seeMoreText.textContent = navExpandable.classList.contains('expanded') ? 'Thu gọn' : 'Thêm';
                }
            });
            
            // Close dropdown when clicking outside on desktop
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-expandable') && navExpandable.classList.contains('expanded')) {
                    navExpandable.classList.remove('expanded');
                    const seeMoreText = seeMoreBtn.querySelector('.see-more-text');
                    if (seeMoreText) {
                        seeMoreText.textContent = 'Xem thêm';
                    }
                }
            });
        }
    }

    // Method to update active state when hash changes
    updateActiveState() {
        this.currentPage = this.getCurrentPage();
        this.setActiveNavItem();
    }
    
    // Initialize Lucide icons
    initIcons() {
        // Try multiple times to ensure Lucide is loaded
        let attempts = 0;
        const maxAttempts = 10;
        
        const tryInitIcons = () => {
            attempts++;
            
            if (typeof lucide !== 'undefined' && lucide.createIcons) {
                lucide.createIcons();
                return;
            }
            
            // Fallback to icons.js initIcons function
            if (typeof initIcons === 'function' && attempts > 2) {
                initIcons();
                return;
            }
            
            // Retry if not loaded yet
            if (attempts < maxAttempts) {
                setTimeout(tryInitIcons, 100);
            } else {
                console.warn('Lucide Icons library not loaded after multiple attempts');
            }
        };
        
        // Start trying after a short delay
        setTimeout(tryInitIcons, 50);
    }
}

// Initialize header loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const headerLoader = new HeaderLoader();
    headerLoader.loadHeader();
    
    // Listen for hash changes to update active state
    window.addEventListener('hashchange', () => {
        headerLoader.updateActiveState();
    });
    
    // Make headerLoader globally available for debugging
    window.headerLoader = headerLoader;
});
// Navigation and Routing System for Sắp Tết Website

// Simple client-side routing
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/index': 'index.html',
            '/index.html': 'index.html', // Keep for backward compatibility
            '/mon-an-tet': 'mon-an-tet.html',
            '/mon-an-tet.html': 'mon-an-tet.html', // Keep for backward compatibility
            '/tro-choi-tet': 'tro-choi-tet.html',
            '/tro-choi-tet.html': 'tro-choi-tet.html', // Keep for backward compatibility
            '/blog': 'blog.html',
            '/blog.html': 'blog.html',
            '/chi-tiet-mon-an': 'chi-tiet-mon-an.html',
            '/chi-tiet-mon-an.html': 'chi-tiet-mon-an.html',
            '/404': '404.html',
            '/404.html': '404.html'
        };
        
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle initial page load and clean URL
        this.handleRoute(window.location.pathname);
        this.cleanUrl();
        
        // Handle navigation clicks
        this.setupNavigationHandlers();
    }
    
    cleanUrl() {
        const currentPath = window.location.pathname;
        let cleanPath = currentPath;
        
        // Remove .html extension and redirect to clean URL
        if (currentPath.endsWith('.html')) {
            if (currentPath === '/index.html') {
                cleanPath = '/';
            } else {
                cleanPath = currentPath.replace('.html', '');
            }
            
            // Update URL without page reload
            history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
        }
    }
    
    handleRoute(path) {
        // Remove any query parameters or hash
        const cleanPath = path.split('?')[0].split('#')[0];
        
        // Check if route exists
        if (this.routes[cleanPath]) {
            // Route exists, load the corresponding HTML file if needed
            const targetFile = this.routes[cleanPath];
            const currentFile = this.getCurrentPageFile();
            
            if (targetFile !== currentFile) {
                window.location.href = targetFile + window.location.search + window.location.hash;
            }
            return;
        } else {
            // Route doesn't exist, show 404
            this.show404();
        }
    }
    
    show404() {
        // Check if we're already on 404 page to prevent redirect loops
        if (window.location.pathname === '/404.html' || window.location.pathname === '/404') {
            return;
        }
        // Redirect to 404 page
        window.location.href = '/404.html';
    }
    
    getCurrentPageFile() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index' || path === '/index.html') {
            return 'index.html';
        }
        return path.split('/').pop() || 'index.html';
    }
    
    navigate(path) {
        // Clean the path (remove .html extension)
        let cleanPath = path;
        if (path.endsWith('.html')) {
            if (path === '/index.html' || path === 'index.html') {
                cleanPath = '/';
            } else {
                cleanPath = path.replace('.html', '');
            }
        }
        
        // Update browser history with clean URL
        history.pushState(null, '', cleanPath);
        
        // Handle the route
        this.handleRoute(cleanPath);
    }
    
    setupNavigationHandlers() {
        // Handle navigation menu clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href) return;
            
            // Handle internal links
            if (href.startsWith('/') || href.startsWith('./') || 
                (!href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:'))) {
                
                // Special handling for anchor links on same page
                if (href.startsWith('#')) {
                    return; // Let default behavior handle anchor links
                }
                
                // Handle anchor links that start with / but contain #
                if (href.includes('#')) {
                    const [path, hash] = href.split('#');
                    // If it's a root path with anchor (like /#events), just scroll to anchor
                    if (path === '/' || path === '') {
                        // We're on the home page, just scroll to the anchor
                        const currentPath = window.location.pathname;
                        if (currentPath === '/' || currentPath === '/index.html' || currentPath === '/index') {
                            return; // Let default behavior handle anchor scrolling
                        } else {
                            // Navigate to home page with anchor
                            e.preventDefault();
                            window.location.href = '/' + (hash ? '#' + hash : '');
                            return;
                        }
                    }
                    return; // Let default behavior handle other anchor links
                }
                
                // Handle page navigation with clean URLs
                if (href.includes('.html') && !href.includes('#')) {
                    e.preventDefault();
                    // For .html files, navigate directly without using router
                    window.location.href = href;
                    return;
                }
            }
        });
    }
}

// Navigation Menu Enhancement
class NavigationMenu {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupActiveStates();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
    }
    
    setupActiveStates() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Remove active class from all links
            link.classList.remove('active');
            
            // Add active class to current page link
            if (href === currentPath || 
                (currentPath === '/' && href === 'index.html') ||
                (currentPath === '/index.html' && href === '/') ||
                (currentPath.includes('mon-an-tet') && href.includes('mon-an-tet'))) {
                link.classList.add('active');
            }
        });
    }
    
    setupMobileMenu() {
        // Create mobile menu toggle if it doesn't exist
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        if (!header || !nav) return;
        
        let mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (!mobileToggle) {
            mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-menu-toggle';
            mobileToggle.innerHTML = '<span></span><span></span><span></span>';
            mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
            
            // Insert before nav
            header.querySelector('.container').insertBefore(mobileToggle, nav);
        }
        
        // Toggle mobile menu
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!header.contains(e.target)) {
                nav.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close mobile menu when clicking on a link
        nav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                nav.classList.remove('mobile-open');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (!link) return;
            
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed header
                const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without triggering navigation
                history.replaceState(null, '', href);
            }
        });
    }
}

// Page Loading Enhancement
class PageLoader {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupLoadingStates();
        this.setupPageTransitions();
    }
    
    setupLoadingStates() {
        // Add loading class to body initially
        document.body.classList.add('page-loading');
        
        // Remove loading class when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.remove('page-loading');
            document.body.classList.add('page-loaded');
        });
    }
    
    setupPageTransitions() {
        // Add fade-in animation for main content
        const main = document.querySelector('main');
        if (main) {
            main.style.opacity = '0';
            main.style.transform = 'translateY(20px)';
            main.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            // Animate in after a short delay
            setTimeout(() => {
                main.style.opacity = '1';
                main.style.transform = 'translateY(0)';
            }, 100);
        }
    }
}

// Error Handling
class ErrorHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle JavaScript errors
        window.addEventListener('error', (e) => {
            console.error('JavaScript Error:', e.error);
            // this.showErrorMessage('Đã xảy ra lỗi. Vui lòng tải lại trang.');
        });
        
        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled Promise Rejection:', e.reason);
            // this.showErrorMessage('Đã xảy ra lỗi kết nối. Vui lòng thử lại.');
        });
    }
    
    showErrorMessage(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div class="error-content">
                <span class="error-icon">⚠️</span>
                <span class="error-text">${message}</span>
                <button class="error-close">&times;</button>
            </div>
        `;
        
        // Add styles
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff4444;
            color: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
        
        // Manual close
        errorDiv.querySelector('.error-close').addEventListener('click', () => {
            errorDiv.remove();
        });
    }
}

// Initialize all navigation components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initialization
    if (window.navigationInitialized) {
        return;
    }
    window.navigationInitialized = true;
    
    // Only initialize router on pages that need it
    if (!window.location.pathname.includes('404.html')) {
        new Router();
    }
    
    new NavigationMenu();
    new PageLoader();
    new ErrorHandler();
});

// Add CSS for mobile menu and animations
const navigationStyles = document.createElement('style');
navigationStyles.textContent = `
    /* Mobile Menu Styles */
    .mobile-menu-toggle {
        display: none;
        flex-direction: column;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        gap: 4px;
    }
    
    .mobile-menu-toggle span {
        width: 25px;
        height: 3px;
        background: white;
        transition: all 0.3s ease;
        border-radius: 2px;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
    }
    
    @media (max-width: 768px) {
        .mobile-menu-toggle {
            display: flex;
        }
        
        nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-primary);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        nav.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        nav ul {
            flex-direction: column;
            padding: 1rem 0;
        }
        
        nav li {
            margin: 0;
        }
        
        nav a {
            display: block;
            padding: 1rem 2rem;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
    }
    
    /* Active link styles */
    nav a.active {
        background: rgba(255,255,255,0.2);
        border-radius: 25px;
    }
    
    /* Page loading animation */
    .page-loading main {
        opacity: 0;
    }
    
    /* Error notification animation */
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .error-notification .error-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .error-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    }
`;

document.head.appendChild(navigationStyles);
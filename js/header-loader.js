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
        } else if (filename === 'index.html' || filename === '') {
            const hash = window.location.hash;
            if (hash) {
                return hash.substring(1); // Remove # from hash
            }
            return 'countdown'; // Default to countdown for index page
        }
        return 'index';
    }

    async loadHeader() {
        try {
            const response = await fetch('components/header.html');
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
                // Update active state immediately for better UX
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Method to update active state when hash changes
    updateActiveState() {
        this.currentPage = this.getCurrentPage();
        this.setActiveNavItem();
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
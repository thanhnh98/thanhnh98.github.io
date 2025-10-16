// Subdomain Handler for Sắp Tết Website
// Handles invalid subdomain redirects and provides user feedback

class SubdomainHandler {
    constructor() {
        this.invalidSubdomains = [
            'webmail', 'mail', 'admin', 'ftp', 'cpanel', 'whm', 'blog', 'shop', 'store',
            'api', 'app', 'dev', 'test', 'staging', 'beta', 'alpha', 'demo', 'support',
            'help', 'docs', 'cdn', 'static', 'assets', 'img', 'images', 'files',
            'download', 'upload', 'secure', 'ssl', 'vpn', 'remote', 'server', 'db',
            'database', 'mysql', 'phpmyadmin', 'panel', 'control', 'manage', 'dashboard',
            'portal', 'login', 'auth', 'user', 'users', 'account', 'accounts', 'profile',
            'profiles', 'settings', 'config', 'configuration', 'system', 'sys', 'monitor',
            'monitoring', 'stats', 'statistics', 'analytics', 'logs', 'log', 'backup',
            'backups', 'restore', 'recovery', 'maintenance', 'maint', 'status', 'health',
            'ping', 'check', 'verify', 'validate', 'testing', 'qa', 'quality',
            'preview', 'sandbox', 'playground', 'lab', 'labs', 'experiment',
            'experiments', 'research', 'development', 'develop', 'build', 'builder',
            'compile', 'deploy', 'deployment', 'release', 'releases', 'version', 'versions',
            'v1', 'v2', 'v3', 'v4', 'v5', 'legacy', 'old', 'new', 'latest', 'current',
            'production', 'prod', 'live', 'public', 'private', 'internal', 'external',
            'frontend', 'backend', 'client', 'service', 'services', 'microservice',
            'gateway', 'proxy', 'loadbalancer', 'cache', 'redis', 'memcached', 'elasticsearch',
            'kibana', 'grafana', 'prometheus', 'jenkins', 'ci', 'cd', 'pipeline', 'workflow'
        ];
        
        this.validSubdomains = ['www', 'saptet', 'mail'];
        this.mainDomain = 'saptet.vn';
        this.redirectDelay = 5000; // 5 seconds
    }

    // Check if current subdomain is invalid
    isInvalidSubdomain() {
        const hostname = window.location.hostname;
        
        if (!hostname.includes(this.mainDomain)) {
            return false;
        }
        
        const subdomain = hostname.split('.')[0];
        const isValidSubdomain = this.validSubdomains.includes(subdomain);
        
        return this.invalidSubdomains.includes(subdomain) && !isValidSubdomain;
    }

    // Check if current subdomain should redirect to homepage
    shouldRedirectToHomepage() {
        const hostname = window.location.hostname;
        
        if (!hostname.includes(this.mainDomain)) {
            return false;
        }
        
        const subdomain = hostname.split('.')[0];
        return subdomain === 'mail';
    }

    // Get current subdomain
    getCurrentSubdomain() {
        const hostname = window.location.hostname;
        return hostname.split('.')[0];
    }

    // Handle invalid subdomain redirect
    handleInvalidSubdomain() {
        // Check if this is a mail subdomain that should redirect to homepage
        if (this.shouldRedirectToHomepage()) {
            const hostname = window.location.hostname;
            console.log(`Mail subdomain detected: ${hostname}, redirecting to homepage`);
            
            // Immediate redirect to homepage
            window.location.href = `https://${this.mainDomain}/`;
            return true;
        }

        if (!this.isInvalidSubdomain()) {
            return false;
        }

        const subdomain = this.getCurrentSubdomain();
        const hostname = window.location.hostname;
        
        console.warn(`Invalid subdomain access detected: ${hostname}`);
        
        // Show notification
        this.showSubdomainNotification(subdomain, hostname);
        
        // Auto-redirect after delay
        setTimeout(() => {
            window.location.href = `https://${this.mainDomain}/`;
        }, this.redirectDelay);
        
        return true;
    }

    // Show notification for invalid subdomain
    showSubdomainNotification(subdomain, hostname) {
        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'subdomain-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff6b35, #f7931e);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            font-family: 'Nunito', sans-serif;
            font-weight: 600;
            text-align: center;
            max-width: 90%;
            animation: slideDown 0.5s ease-out;
        `;

        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                <span style="font-size: 1.2rem;">⚠️</span>
                <strong>Subdomain không hợp lệ!</strong>
            </div>
            <div style="font-size: 0.9rem; opacity: 0.9;">
                <code>${hostname}</code> không phải là subdomain hợp lệ.<br>
                Đang chuyển hướng về <strong>${this.mainDomain}</strong> trong <span id="redirect-countdown">${this.redirectDelay / 1000}</span>s...
            </div>
        `;

        // Add CSS animation
        if (!document.getElementById('subdomain-notification-styles')) {
            const style = document.createElement('style');
            style.id = 'subdomain-notification-styles';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        transform: translateX(-50%) translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(-50%) translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(notification);

        // Start countdown
        this.startCountdown();

        // Auto-remove notification after redirect
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, this.redirectDelay + 1000);
    }

    // Start countdown timer
    startCountdown() {
        let countdown = this.redirectDelay / 1000;
        const countdownElement = document.getElementById('redirect-countdown');
        
        if (!countdownElement) return;

        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
            }
        }, 1000);
    }

    // Initialize subdomain handler
    init() {
        // Check on page load
        if (this.handleInvalidSubdomain()) {
            return;
        }

        // Also check on any navigation (for SPA-like behavior)
        window.addEventListener('popstate', () => {
            this.handleInvalidSubdomain();
        });

        // Check periodically (in case of dynamic subdomain changes)
        setInterval(() => {
            this.handleInvalidSubdomain();
        }, 10000); // Check every 10 seconds
    }

    // Add new invalid subdomain to the list
    addInvalidSubdomain(subdomain) {
        if (!this.invalidSubdomains.includes(subdomain)) {
            this.invalidSubdomains.push(subdomain);
        }
    }

    // Remove subdomain from invalid list
    removeInvalidSubdomain(subdomain) {
        const index = this.invalidSubdomains.indexOf(subdomain);
        if (index > -1) {
            this.invalidSubdomains.splice(index, 1);
        }
    }

    // Get list of invalid subdomains
    getInvalidSubdomains() {
        return [...this.invalidSubdomains];
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const subdomainHandler = new SubdomainHandler();
    subdomainHandler.init();
    
    // Make it globally available for debugging
    window.subdomainHandler = subdomainHandler;
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SubdomainHandler;
}

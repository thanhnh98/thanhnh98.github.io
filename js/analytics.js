/**
 * Analytics Tracking Helper
 * All events use prefix "web_*" for web-specific tracking
 */

// Global analytics instance (will be set when Firebase is initialized)
let analyticsInstance = null;

// Set analytics instance (called from Firebase initialization)
function setAnalyticsInstance(analytics) {
    analyticsInstance = analytics;
}

// Check if Firebase Analytics is available
function isAnalyticsAvailable() {
    return analyticsInstance !== null && typeof analyticsInstance !== 'undefined';
}

// Store logEvent function reference
let logEventFunction = null;

/**
 * Set logEvent function (called from Firebase initialization)
 */
function setLogEventFunction(logEvent) {
    logEventFunction = logEvent;
}

/**
 * Track custom event with web_ prefix
 * @param {string} eventName - Event name (will be prefixed with "web_")
 * @param {object} eventParams - Additional event parameters
 */
function trackEvent(eventName, eventParams = {}) {
    const fullEventName = `web_${eventName}`;
    
    // Firebase Analytics
    if (isAnalyticsAvailable() && logEventFunction) {
        try {
            logEventFunction(analyticsInstance, fullEventName, eventParams);
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    }
    
    // Console log for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[Analytics] ${fullEventName}`, eventParams);
    }
}

/**
 * Track page view
 * @param {string} pageName - Name of the page
 * @param {string} pagePath - Path of the page
 */
function trackPageView(pageName, pagePath = null) {
    const path = pagePath || window.location.pathname;
    const params = {
        page_title: pageName,
        page_location: window.location.href,
        page_path: path
    };
    
    trackEvent('page_view', params);
    
    // Also track as visit_web for overall web visit
    if (path === '/' || path === '/index.html' || path === '') {
        trackEvent('visit_web', {
            page_title: pageName,
            page_location: window.location.href
        });
    }
}

/**
 * Track download button click
 * @param {string} platform - 'android' or 'ios'
 * @param {string} source - Where the button was clicked (e.g., 'footer', 'intro', 'page')
 */
function trackDownloadClick(platform, source = 'unknown') {
    trackEvent('download_click', {
        platform: platform,
        source: source,
        button_location: source
    });
}

/**
 * Track important user actions
 * @param {string} actionName - Name of the action
 * @param {object} additionalParams - Additional parameters
 */
function trackImportantAction(actionName, additionalParams = {}) {
    trackEvent('important_action', {
        action_name: actionName,
        ...additionalParams
    });
}

/**
 * Track share action
 * @param {string} method - Share method (e.g., 'native', 'whatsapp', 'facebook')
 * @param {string} contentType - Type of content shared
 */
function trackShare(method, contentType = 'page') {
    trackEvent('share', {
        share_method: method,
        content_type: contentType
    });
}

/**
 * Track game/interaction
 * @param {string} gameName - Name of the game/feature
 * @param {string} action - Action performed (e.g., 'start', 'complete', 'score')
 */
function trackGameAction(gameName, action, additionalParams = {}) {
    trackEvent('game_action', {
        game_name: gameName,
        action: action,
        ...additionalParams
    });
}

/**
 * Track navigation
 * @param {string} from - Source page/section
 * @param {string} to - Destination page/section
 */
function trackNavigation(from, to) {
    trackEvent('navigation', {
        from: from,
        to: to
    });
}

// Auto-track page view on load
document.addEventListener('DOMContentLoaded', function() {
    // Get page name from title or path
    const pageTitle = document.title || 'Unknown Page';
    const pagePath = window.location.pathname;
    
    // Extract page name from path
    let pageName = 'Home';
    if (pagePath && pagePath !== '/' && pagePath !== '/index.html') {
        const pathParts = pagePath.split('/');
        const fileName = pathParts[pathParts.length - 1];
        pageName = fileName.replace('.html', '').replace(/-/g, ' ') || 'Page';
    }
    
    // Track page view
    trackPageView(pageName, pagePath);
    
    // Track initial web visit
    if (pagePath === '/' || pagePath === '/index.html' || pagePath === '') {
        trackEvent('visit_web', {
            page_title: pageTitle,
            page_location: window.location.href,
            referrer: document.referrer || 'direct'
        });
    }
});

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        trackEvent,
        trackPageView,
        trackDownloadClick,
        trackImportantAction,
        trackShare,
        trackGameAction,
        trackNavigation
    };
}

// Make functions globally available
window.webAnalytics = {
    trackEvent,
    trackPageView,
    trackDownloadClick,
    trackImportantAction,
    trackShare,
    trackGameAction,
    trackNavigation,
    setAnalyticsInstance,
    setLogEventFunction
};

// Wait for Firebase to initialize and set analytics instance
// This will be called from the Firebase initialization script
window.addEventListener('load', function() {
    // Try to get analytics from global scope (set by Firebase init)
    if (typeof analytics !== 'undefined' && analytics !== null) {
        setAnalyticsInstance(analytics);
    }
    
    // Also try to get it after a delay in case Firebase loads later
    setTimeout(function() {
        if (typeof analytics !== 'undefined' && analytics !== null && !analyticsInstance) {
            setAnalyticsInstance(analytics);
        }
    }, 1000);
});


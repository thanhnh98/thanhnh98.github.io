/**
 * Icon Library Helper - Lucide Icons
 * 
 * This file provides helper functions for using Lucide Icons throughout the website.
 * Lucide Icons: https://lucide.dev/
 * 
 * Usage:
 * 1. Add icon: <i data-lucide="icon-name"></i>
 * 2. Initialize: lucide.createIcons();
 * 
 * Or use the helper:
 * createIcon('icon-name', { size: 24, color: '#DC143C' })
 */

// Icon configuration
const IconConfig = {
    // Default icon size
    defaultSize: 24,
    
    // Default icon color (Tet theme red)
    defaultColor: '#DC143C',
    
    // Icon stroke width
    strokeWidth: 2
};

/**
 * Create a Lucide icon element
 * @param {string} iconName - Name of the icon (e.g., 'calendar', 'clock')
 * @param {Object} options - Icon options (size, color, class, etc.)
 * @returns {HTMLElement} Icon element
 */
function createIcon(iconName, options = {}) {
    const icon = document.createElement('i');
    icon.setAttribute('data-lucide', iconName);
    
    // Apply custom attributes
    if (options.size) {
        icon.style.width = `${options.size}px`;
        icon.style.height = `${options.size}px`;
    }
    
    if (options.color) {
        icon.style.color = options.color;
    }
    
    if (options.class) {
        icon.className = options.class;
    }
    
    if (options.strokeWidth) {
        icon.setAttribute('stroke-width', options.strokeWidth);
    }
    
    return icon;
}

/**
 * Initialize all Lucide icons on the page
 * Call this after DOM content is loaded or after adding new icons dynamically
 */
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.warn('Lucide Icons library not loaded. Please include the script tag.');
    }
}

/**
 * Replace emoji with Lucide icon
 * @param {HTMLElement} element - Element containing emoji
 * @param {string} iconName - Lucide icon name
 * @param {Object} options - Icon options
 */
function replaceEmojiWithIcon(element, iconName, options = {}) {
    if (element && element.textContent) {
        const emoji = element.textContent.trim();
        const icon = createIcon(iconName, options);
        element.innerHTML = '';
        element.appendChild(icon);
        initIcons();
    }
}

// Auto-initialize icons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initIcons);
} else {
    initIcons();
}

// Re-initialize icons when new content is added (for dynamic content)
if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
        let shouldReinit = false;
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.querySelector && node.querySelector('[data-lucide]')) {
                        shouldReinit = true;
                    }
                });
            }
        });
        if (shouldReinit) {
            initIcons();
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createIcon, initIcons, replaceEmojiWithIcon };
}


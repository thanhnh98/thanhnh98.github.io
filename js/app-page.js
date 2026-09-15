(function () {
    const FEATURE_IMAGE_BASE = 'assets/images/app-features/';

    function renderFeatures() {
        const grid = document.getElementById('app-features-grid');
        if (!grid || !Array.isArray(window.APP_FEATURES)) return;

        const fragment = document.createDocumentFragment();
        window.APP_FEATURES.forEach(function (feature) {
            const card = document.createElement('article');
            card.className = 'app-feature-card app-reveal';

            const icon = document.createElement('span');
            icon.className = 'app-feature-icon';

            const image = document.createElement('img');
            image.src = FEATURE_IMAGE_BASE + feature.drawable;
            image.alt = '';
            image.width = 54;
            image.height = 54;
            image.loading = 'lazy';
            icon.appendChild(image);

            const title = document.createElement('h3');
            title.textContent = feature.title || '';

            const description = document.createElement('p');
            description.textContent = feature.description || '';

            card.append(icon, title, description);
            fragment.appendChild(card);
        });

        grid.replaceChildren(fragment);
    }

    function initRevealAnimations() {
        const items = document.querySelectorAll('.app-reveal:not(.is-visible)');
        if (!items.length) return;

        if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            items.forEach(function (item) { item.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

        items.forEach(function (item) { observer.observe(item); });
    }

    function detectPlatform() {
        const ua = navigator.userAgent || navigator.vendor || '';
        if (/android/i.test(ua)) return 'android';
        if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) return 'ios';
        return '';
    }

    function highlightPreferredStore() {
        const platform = detectPlatform();
        if (!platform) return;

        document.querySelectorAll('[data-app-download="' + platform + '"]').forEach(function (link) {
            link.classList.add('is-preferred');
        });
    }

    function wireDownloadTracking() {
        document.querySelectorAll('[data-app-download]').forEach(function (link) {
            link.addEventListener('click', function () {
                const platform = link.getAttribute('data-app-download') || 'unknown';
                if (window.webAnalytics && typeof window.webAnalytics.trackDownloadClick === 'function') {
                    window.webAnalytics.trackDownloadClick(platform, 'app-landing');
                }
            });
        });
    }

    function wireFaqAccordion() {
        const items = Array.from(document.querySelectorAll('.app-faq details'));
        items.forEach(function (item) {
            item.addEventListener('toggle', function () {
                if (!item.open) return;
                items.forEach(function (other) {
                    if (other !== item) other.open = false;
                });
            });
        });
    }

    function initMobileStickyDownload() {
        const sticky = document.getElementById('app-mobile-download');
        const hero = document.querySelector('.app-landing-hero');
        const download = document.getElementById('tai-ung-dung');
        const footer = document.getElementById('footer-container');
        if (!sticky || !hero || !download) return;

        let ticking = false;
        function update() {
            ticking = false;
            const mobile = window.matchMedia('(max-width: 720px)').matches;
            const heroPassed = hero.getBoundingClientRect().bottom < 80;
            const downloadAhead = download.getBoundingClientRect().top > window.innerHeight * 0.72;
            const footerAhead = !footer || footer.getBoundingClientRect().top > window.innerHeight * 0.72;
            sticky.classList.toggle('is-visible', mobile && heroPassed && downloadAhead && footerAhead);
        }

        function requestUpdate() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        }

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate);
        update();
    }

    function init() {
        renderFeatures();
        initRevealAnimations();
        highlightPreferredStore();
        wireDownloadTracking();
        wireFaqAccordion();
        initMobileStickyDownload();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Centralized Footer Loading System
document.addEventListener('DOMContentLoaded', function() {
    const footerContainer = document.getElementById('footer-container');
    
    function ensureLucideAndRenderIcons() {
        const render = () => {
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            } else if (typeof window.initIcons === 'function') {
                window.initIcons();
            }
        };

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            render();
            return;
        }

        const existing = document.querySelector('script[data-lucide-loader="true"]');
        if (existing) {
            existing.addEventListener('load', render, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.async = true;
        script.setAttribute('data-lucide-loader', 'true');
        script.addEventListener('load', render, { once: true });
        document.head.appendChild(script);
    }
    
    if (footerContainer) {
        // Load footer from centralized file (absolute URL for nested pages)
        const origin = window.location.origin;
        fetch(origin + '/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load footer');
                }
                return response.text();
            })
            .then(html => {
                footerContainer.innerHTML = html;
                ensureLucideAndRenderIcons();
                
                // Add analytics tracking to download buttons after footer loads
                setTimeout(function() {
                    const googlePlayBtn = footerContainer.querySelector('.download-btn-footer.google-play-btn');
                    const appStoreBtn = footerContainer.querySelector('.download-btn-footer.app-store-btn');
                    
                    if (googlePlayBtn && window.webAnalytics) {
                        googlePlayBtn.addEventListener('click', function() {
                            window.webAnalytics.trackDownloadClick('android', 'footer');
                        });
                    }
                    
                    if (appStoreBtn && window.webAnalytics) {
                        appStoreBtn.addEventListener('click', function() {
                            window.webAnalytics.trackDownloadClick('ios', 'footer');
                        });
                    }
                }, 100);
            })
            .catch(error => {
                console.error('Error loading footer:', error);
                // Fallback footer content
                footerContainer.innerHTML = `
                    <section id="footer" class="combined-footer-section">
                        <div class="container">
                            <div class="footer-main-content">
                                <div class="app-info">
                                    <div class="app-title-container">
                                        <img src="/assets/images/ic_app.png" alt="Sắp Tết App Icon" class="app-icon-small">
                                        <h2 class="app-title">Sắp Tết - Đếm Ngược Tết 2027</h2>
                                    </div>
                                    <p class="app-description">Ứng dụng đếm ngược Tết Việt Nam và lịch âm dương được yêu thích</p>
                                    
                                    <div class="app-download-section">
                                        <h3 class="download-title">📱 Tải Ứng Dụng</h3>
                                        <div class="download-buttons">
                                            <a href="https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               class="download-btn google-play-btn"
                                               aria-label="Tải ứng dụng Sắp Tết trên Google Play Store">
                                                <div class="btn-content">
                                                    <div class="btn-text">
                                                        <span class="btn-subtitle">Tải trên</span>
                                                        <span class="btn-title">Google Play</span>
                                                    </div>
                                                    <div class="btn-badge">
                                                        <img src="/assets/images/google_play.png" 
                                                             alt="Google Play" 
                                                             class="store-badge-img">
                                                    </div>
                                                </div>
                                            </a>
                                            <a href="https://apps.apple.com/gb/app/s%E1%BA%AFp-t%E1%BA%BFt-%C4%91%E1%BA%BFm-ng%C6%B0%E1%BB%A3c-t%E1%BA%BFt-2026/id6743064990?platform=iphone" 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                               class="download-btn app-store-btn"
                                               aria-label="Tải ứng dụng Sắp Tết trên App Store">
                                                <div class="btn-content">
                                                    <div class="btn-text">
                                                        <span class="btn-subtitle">Tải trên</span>
                                                        <span class="btn-title">App Store</span>
                                                    </div>
                                                    <div class="btn-badge">
                                                        <img src="/assets/images/apple_store.png" 
                                                             alt="App Store" 
                                                             class="store-badge-img">
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                        <p class="app-features">✨ Đếm ngược Tết Việt Nam • Lịch âm dương • Tết Nguyên đán 2027</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="footer-social-section">
                                <h3 class="social-section-title">Cộng Đồng và Hỗ Trợ</h3>
                                <div class="social-links-compact">
                                    <a href="https://www.facebook.com/saptet2026/" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="social-link-compact"
                                       aria-label="Facebook">
                                        <img src="/assets/images/facebook.png" alt="Facebook" class="social-icon-img">
                                    </a>
                                    <a href="https://tiktok.com/@sap.tet" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="social-link-compact"
                                       aria-label="TikTok">
                                        <img src="/assets/images/tiktok.png" alt="TikTok" class="social-icon-img">
                                    </a>
                                    <a href="https://saptet.vn" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       class="social-link-compact"
                                       aria-label="Website">
                                        <span class="social-icon">🌐</span>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="footer-bottom">
                                <p class="developer-info">
                                    Phát triển bởi <a href="https://play.google.com/store/apps/dev?id=5540559479839330036" 
                                                     target="_blank" 
                                                     rel="noopener noreferrer" 
                                                     class="developer-link">TLife</a>
                                </p>
                                <p class="app-info-footer">
                                    Ứng dụng Sắp Tết - Đếm ngược Tết 2027
                                </p>
                            </div>
                        </div>
                        
                        <!-- Structured Data for App Store Links -->
                        <script type="application/ld+json">
                        {
                            "@context": "https://schema.org",
                            "@type": "MobileApplication",
                            "name": "Sắp Tết - Đếm ngược Tết 2027",
                            "description": "Ứng dụng đếm ngược Tết và lịch âm dương được yêu thích",
                            "applicationCategory": "LifestyleApplication",
                            "operatingSystem": ["Android", "iOS"],
                            "offers": {
                                "@type": "Offer",
                                "price": "0",
                                "priceCurrency": "VND"
                            },
                            "downloadUrl": [
                                "https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down",
                                "https://apps.apple.com/gb/app/s%E1%BA%AFp-t%E1%BA%BFt-%C4%91%E1%BA%BFm-ng%C6%B0%E1%BB%A3c-t%E1%BA%BFt-2026/id6743064990?platform=iphone"
                            ],
                            "screenshot": "/assets/images/ic_app.png",
                            "author": {
                                "@type": "Organization",
                                "name": "TLife",
                                "url": "https://saptet.vn"
                            },
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.8",
                                "ratingCount": "1250"
                            }
                        }
                        </script>
                    </section>
                `;
                ensureLucideAndRenderIcons();
            });
    }
});

// Trang chi tiết tin: hiển thị "Đăng" kèm giờ theo múi Việt Nam (UTC+7)
(function () {
    function formatPublishedAtVN(isoDate) {
        if (!isoDate) return '';
        var d = new Date(isoDate);
        if (isNaN(d.getTime())) return '';
        try {
            var fmt = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Ho_Chi_Minh',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            var parts = fmt.formatToParts(d);
            var map = {};
            for (var i = 0; i < parts.length; i++) {
                map[parts[i].type] = parts[i].value;
            }
            return map.day + '/' + map.month + '/' + map.year + ', ' + map.hour + ':' + map.minute + ' (UTC+7)';
        } catch (e) {
            return '';
        }
    }

    function typeMatchesArticle(t) {
        if (t === 'BlogPosting' || t === 'NewsArticle' || t === 'Article') return true;
        if (Array.isArray(t)) {
            for (var i = 0; i < t.length; i++) {
                if (typeMatchesArticle(t[i])) return true;
            }
        }
        return false;
    }

    function readLdJsonDatePublished() {
        var scripts = document.querySelectorAll('script[type="application/ld+json"]');
        for (var i = 0; i < scripts.length; i++) {
            var raw = scripts[i].textContent.trim();
            if (!raw) continue;
            try {
                var data = JSON.parse(raw);
                var candidates = [];
                if (Array.isArray(data)) candidates = data;
                else if (data && data['@graph']) candidates = data['@graph'];
                else candidates = [data];
                for (var j = 0; j < candidates.length; j++) {
                    var item = candidates[j];
                    if (item && item.datePublished && typeMatchesArticle(item['@type'])) {
                        return item.datePublished;
                    }
                }
            } catch (err) { /* ignore */ }
        }
        return null;
    }

    function updateNewsMetaPublishedAt(iso) {
        var text = formatPublishedAtVN(iso);
        if (!text) return;
        document.querySelectorAll('.news-meta span').forEach(function (span) {
            if (/^\s*Đăng\s*:/i.test(span.textContent)) {
                span.textContent = 'Đăng: ' + text;
            }
        });
    }

    function slugFromPath() {
        var p = window.location.pathname.replace(/\/$/, '');
        var name = p.split('/').pop() || '';
        if (name.endsWith('.html')) return name.slice(0, -5);
        return name;
    }

    document.addEventListener('DOMContentLoaded', function () {
        if (!document.body.classList.contains('news-detail-page')) return;

        var fromAttr = document.body.getAttribute('data-news-published-at');
        if (fromAttr) {
            updateNewsMetaPublishedAt(fromAttr);
            return;
        }

        var fromLd = readLdJsonDatePublished();
        if (fromLd) {
            updateNewsMetaPublishedAt(fromLd);
            return;
        }

        var slug = slugFromPath();
        if (!slug || slug === 'index') return;

        fetch('/news.json', { credentials: 'same-origin' })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (data) {
                if (!data || !Array.isArray(data.items)) return;
                var hit = data.items.find(function (post) {
                    var dp = (post.detailPage || '').replace(/^\.\//, '');
                    return dp === 'tin-tuc/' + slug + '.html';
                });
                if (hit && hit.publishedAt) updateNewsMetaPublishedAt(hit.publishedAt);
            })
            .catch(function () { /* offline / file:// */ });
    });
})();
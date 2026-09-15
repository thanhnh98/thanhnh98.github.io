// Centralized Footer Loading System
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    const fallbackFooter = `
        <footer id="footer" class="home-site-footer">
            <div class="home-footer-ribbon" aria-hidden="true"></div>
            <div class="container home-compact-container">
                <div class="home-footer-grid">
                    <div class="home-footer-brand">
                        <a href="/" class="home-footer-logo">
                            <img src="/assets/images/ic_app.png" alt="" width="58" height="58">
                            <span><strong>Sắp Tết</strong><small>Đếm ngược Tết 2027</small></span>
                        </a>
                        <p>Giữ nhịp háo hức đến Tết bằng lịch âm, tiện ích hằng ngày và ứng dụng Sắp Tết trên điện thoại.</p>
                        <a class="home-footer-app-cta" href="/ung-dung.html" data-footer-app-cta><i data-lucide="smartphone" aria-hidden="true"></i> Tải ứng dụng Sắp Tết</a>
                    </div>
                    <nav class="home-footer-links" aria-label="Tiện ích Sắp Tết">
                        <h2>Tiện ích</h2>
                        <a href="/lich-am-hom-nay.html">Lịch âm hôm nay</a>
                        <a href="/loi-chuc-tet.html">Lời chúc Tết</a>
                        <a href="/may-tinh-li-xi.html">Máy tính lì xì</a>
                        <a href="/tro-choi-tet.html">Trò chơi Tết</a>
                    </nav>
                    <nav class="home-footer-links" aria-label="Khám phá Sắp Tết">
                        <h2>Khám phá</h2>
                        <a href="/tin-tuc/">Blog Sắp Tết</a>
                        <a href="/cua-hang.html">Cửa hàng Tết</a>
                        <a href="/su-kien-quan-trong.html">Sự kiện quan trọng</a>
                        <a href="/ung-dung.html">Giới thiệu ứng dụng</a>
                    </nav>
                    <div class="home-footer-community">
                        <h2>Kết nối</h2>
                        <p>Theo dõi Sắp Tết để nhận nội dung và cập nhật mới.</p>
                        <div class="home-footer-socials">
                            <a href="https://www.facebook.com/saptet2027/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Sắp Tết"><img src="/assets/images/facebook.png" alt="" width="24" height="24"></a>
                            <a href="https://www.tiktok.com/@sap.tet" target="_blank" rel="noopener noreferrer" aria-label="TikTok Sắp Tết"><img src="/assets/images/tiktok.png" alt="" width="24" height="24"></a>
                            <a href="mailto:tlife1001@gmail.com" aria-label="Email Sắp Tết"><i data-lucide="mail" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
                <div class="home-footer-bottom">
                    <span>© 2026 Sắp Tết · Phát triển bởi TLife</span>
                    <nav aria-label="Pháp lý"><a href="/privacy-policy/vi/">Chính sách bảo mật</a><a href="/terms-of-use/vi/">Điều khoản sử dụng</a></nav>
                </div>
            </div>
        </footer>`;

    function renderIcons() {
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
            return;
        }
        if (typeof window.initIcons === 'function') {
            window.initIcons();
            return;
        }

        const existing = document.querySelector('script[data-lucide-loader="true"]');
        if (existing) {
            existing.addEventListener('load', renderIcons, { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.async = true;
        script.setAttribute('data-lucide-loader', 'true');
        script.addEventListener('load', renderIcons, { once: true });
        document.head.appendChild(script);
    }

    function finishFooterRender(html) {
        footerContainer.innerHTML = html;
        renderIcons();

        const appCta = footerContainer.querySelector('[data-footer-app-cta]');
        appCta?.addEventListener('click', function () {
            if (window.webAnalytics && typeof window.webAnalytics.trackDownloadClick === 'function') {
                window.webAnalytics.trackDownloadClick('app-page', 'footer');
            }
        });
    }

    fetch(window.location.origin + '/footer.html')
        .then(function (response) {
            if (!response.ok) throw new Error('Failed to load footer');
            return response.text();
        })
        .then(finishFooterRender)
        .catch(function (error) {
            console.error('Error loading footer:', error);
            finishFooterRender(fallbackFooter);
        });
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
            for (var i = 0; i < parts.length; i++) map[parts[i].type] = parts[i].value;
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
                    if (item && item.datePublished && typeMatchesArticle(item['@type'])) return item.datePublished;
                }
            } catch (err) { /* ignore */ }
        }
        return null;
    }

    function updateNewsMetaPublishedAt(iso) {
        var text = formatPublishedAtVN(iso);
        if (!text) return;
        document.querySelectorAll('.news-meta span').forEach(function (span) {
            if (/^\s*Đăng\s*:/i.test(span.textContent)) span.textContent = 'Đăng: ' + text;
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

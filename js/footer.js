// Centralized Footer Loading System
document.addEventListener('DOMContentLoaded', function () {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    if (!document.querySelector('link[href*="footer-compact.css"]')) {
        const footerStyles = document.createElement('link');
        footerStyles.rel = 'stylesheet';
        footerStyles.href = '/css/footer-compact.css?v=20261023-sale';
        document.head.appendChild(footerStyles);
    }

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
                        <a href="/images-metadata/">Thông số ảnh</a>
                    </nav>
                    <nav class="home-footer-links" aria-label="Khám phá Sắp Tết"><h2>Khám phá</h2><a href="/tin-tuc/">Blog Sắp Tết</a><a href="/cua-hang.html">Cửa hàng Tết</a><a href="/su-kien-quan-trong.html">Sự kiện quan trọng</a><a href="/ung-dung.html">Giới thiệu ứng dụng</a><a href="/when-is-tet-in-vietnam/" hreflang="en" lang="en">When is Tet in Vietnam?</a></nav>
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
                <details class="home-footer-sap-group" open>
                    <summary><span data-en="Upcoming events">Sắp X</span><small data-en="29 countdown pages">29 trang đếm ngược</small></summary>
                    <nav class="home-footer-sap-links" aria-label="Các trang Sắp X">
                        <a href="/" data-en="Tet countdown">Sắp Tết</a>
                        <a href="/sap-co-luong/" data-en="Payday countdown">Sắp Có Lương</a>
                        <a href="/sap-san-sale/" data-en="Sale countdown">Sắp Săn Sale</a>
                        <a href="/su-kien/nha-giao-viet-nam/" data-en="Teachers' Day countdown">Sắp 20/11</a>
                        <a href="/su-kien/quoc-te-nam-gioi/" data-en="International Men's Day countdown">Sắp 19/11</a>
                        <a href="/su-kien/black-friday/" data-en="Black Friday countdown">Sắp Black Friday</a>
                        <a href="/su-kien/tet-trung-thu/" data-en="Mid-Autumn Festival countdown">Sắp Trung Thu</a>
                        <a href="/su-kien/quoc-te-phu-nu/" data-en="International Women's Day countdown">Sắp 8/3</a>
                        <a href="/su-kien/phu-nu-viet-nam/" data-en="Vietnamese Women's Day countdown">Sắp 20/10</a>
                        <a href="/su-kien/quoc-khanh-viet-nam/" data-en="Vietnam National Day countdown">Sắp Quốc khánh</a>
                        <a href="/su-kien/giai-phong-mien-nam/" data-en="Reunification Day countdown">Sắp 30/4</a>
                        <a href="/su-kien/quoc-te-lao-dong/" data-en="Labour Day countdown">Sắp 1/5</a>
                        <a href="/su-kien/gio-to-hung-vuong/" data-en="Hung Kings Commemoration countdown">Sắp Giỗ Tổ</a>
                        <a href="/su-kien/ong-cong-ong-tao/" data-en="Kitchen Gods Day countdown">Sắp Ông Công Ông Táo</a>
                        <a href="/su-kien/ngay-cua-me/" data-en="Mother's Day countdown">Sắp Ngày của Mẹ</a>
                        <a href="/su-kien/ngay-cua-cha/" data-en="Father's Day countdown">Sắp Ngày của Cha</a>
                        <a href="/su-kien/that-tich/" data-en="Qixi Festival countdown">Sắp Thất Tịch</a>
                        <a href="/sap-halloween/" data-en="Halloween countdown">Sắp Halloween</a>
                        <a href="/diwali?lang=vi" data-en="Diwali countdown">Sắp Diwali</a>
                        <a href="/thanksgiving?lang=vi" data-en="Thanksgiving countdown">Sắp Lễ Tạ ơn</a>
                        <a href="/hanukkah?lang=vi" data-en="Hanukkah countdown">Sắp Hanukkah</a>
                        <a href="/noel.html" data-en="Christmas countdown">Sắp Giáng sinh</a>
                        <a href="/new-year?lang=vi" data-en="New Year countdown">Sắp Năm mới</a>
                        <a href="/chinese-new-year?lang=vi" data-en="Chinese New Year countdown">Sắp Tết Trung Quốc</a>
                        <a href="/ramadan?lang=vi" data-en="Ramadan countdown">Sắp Ramadan</a>
                        <a href="/valentines-day?lang=vi" data-en="Valentine's Day countdown">Sắp Valentine</a>
                        <a href="/eid-al-fitr?lang=vi" data-en="Eid al-Fitr countdown">Sắp Eid al-Fitr</a>
                        <a href="/easter?lang=vi" data-en="Easter countdown">Sắp Lễ Phục sinh</a>
                        <a href="/songkran?lang=vi" data-en="Songkran countdown">Sắp Songkran</a>
                    </nav>
                </details>
                <div class="home-footer-bottom">
                    <span>© 2026 Sắp Tết · Phát triển bởi <a class="home-footer-tlife" href="https://tlife.io.vn" target="_blank" rel="noopener noreferrer">TLife</a></span>
                    <nav aria-label="Pháp lý"><a href="?lang=en" hreflang="en" lang="en" data-site-lang-toggle>English</a><a href="/privacy-policy/vi/">Chính sách bảo mật</a><a href="/terms-of-use/vi/">Điều khoản sử dụng</a><a href="/support">Hỗ trợ</a></nav>
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
        script.src = 'https://unpkg.com/lucide@1.48.0/dist/umd/lucide.min.js';
        script.async = true;
        script.setAttribute('data-lucide-loader', 'true');
        script.addEventListener('load', renderIcons, { once: true });
        document.head.appendChild(script);
    }

    function finishFooterRender(html) {
        footerContainer.innerHTML = html;
        const englishEquivalent = {
            '/noel.html': '/christmas',
            '/tet-2027-la-ngay-nao/': '/when-is-tet-in-vietnam/'
        }[window.location.pathname];
        if (englishEquivalent && new URLSearchParams(window.location.search).get('lang') !== 'en') {
            footerContainer.querySelector('[data-site-lang-toggle]')?.setAttribute('href', englishEquivalent);
        }
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

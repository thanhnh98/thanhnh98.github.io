// Dynamic SEO metadata manager focused on crawl quality.
class DynamicSEO {
    constructor() {
        this.tetDate = new Date("2027-02-06T00:00:00+07:00");
        this.updateEveryMs = 60 * 60 * 1000;
        this.schemaScriptId = "dynamic-webpage-schema";
        this.baseTitle = "Sắp Tết - Đếm Ngược Tết 2027";
        this.defaultImage = "https://saptet.vn/assets/images/img_sharing.png";
        this.defaultCanonical = "https://saptet.vn/";
        this.enableHourlyRefresh = false;
        this.allowedHomepagePaths = new Set(["/", "/index.html"]);
        this.lastSeoSignature = "";
        this.cachedElements = {};
        this.titleRules = [
            {
                condition: (daysUntilTet) => daysUntilTet <= 7,
                build: (daysUntilTet) =>
                    `${this.baseTitle} | Chỉ Còn ${daysUntilTet} Ngày Nữa`,
            },
            {
                condition: (daysUntilTet) => daysUntilTet <= 30,
                build: (daysUntilTet) =>
                    `${this.baseTitle} | Còn ${daysUntilTet} Ngày Nữa Tới Tết`,
            },
        ];
        this.descriptionRules = [
            {
                condition: (daysUntilTet) => daysUntilTet <= 7,
                build: (daysUntilTet) =>
                    `Đếm ngược Tết Nguyên Đán 2027: chỉ còn ${daysUntilTet} ngày. Xem lịch âm dương, giờ hoàng đạo, gợi ý món ăn và phong tục Tết Việt Nam cập nhật mỗi ngày.`,
            },
            {
                condition: (daysUntilTet) => daysUntilTet <= 30,
                build: (daysUntilTet) =>
                    `Còn ${daysUntilTet} ngày tới Tết 2027. Theo dõi đếm ngược Tết Nguyên Đán, tra cứu lịch âm dương, giờ hoàng đạo và khám phá văn hóa Tết Việt Nam.`,
            },
            {
                condition: () => true,
                build: () =>
                    "Đếm ngược Tết Nguyên Đán 2027 chính xác từng ngày. Xem lịch âm dương, giờ hoàng đạo, món ăn và phong tục Tết Việt Nam trên Sắp Tết.",
            },
        ];
    }

    init() {
        if (!this.shouldRunForCurrentPage()) return;
        this.refreshSeo();
        if (this.enableHourlyRefresh) {
            this.intervalId = window.setInterval(() => this.refreshSeo(), this.updateEveryMs);
        }
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) {
                this.refreshSeo();
            }
        });
    }

    refreshSeo() {
        const daysUntilTet = this.getDaysUntilTet();
        const title = this.buildTitle(daysUntilTet);
        const description = this.buildDescription(daysUntilTet);
        const pageUrl = this.getCurrentPageUrl();
        const signature = `${title}|${description}|${pageUrl}|${daysUntilTet}`;
        if (signature === this.lastSeoSignature) return;
        this.lastSeoSignature = signature;

        document.title = title;
        this.setMetaByName("description", this.clampText(description, 160));
        this.setMetaByName(
            "robots",
            "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        );
        this.setMetaByProperty("og:title", title);
        this.setMetaByProperty("og:description", this.clampText(description, 200));
        this.setMetaByProperty("og:url", pageUrl);
        this.setMetaByProperty("twitter:title", title);
        this.setMetaByProperty("twitter:description", this.clampText(description, 200));
        this.setMetaByProperty("twitter:url", pageUrl);
        this.setCanonical(pageUrl);
        this.setHrefLang(pageUrl);
        this.updateWebPageSchema(title, description, pageUrl, this.getDaysUntilTet());
    }

    getDaysUntilTet() {
        const now = new Date();
        const ms = this.tetDate - now;
        const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
        return Math.max(0, days);
    }

    buildTitle(daysUntilTet) {
        for (const rule of this.titleRules) {
            if (rule.condition(daysUntilTet)) {
                return rule.build(daysUntilTet);
            }
        }
        return `${this.baseTitle} | Còn Bao Nhiêu Ngày Nữa Tới Tết?`;
    }

    buildDescription(daysUntilTet) {
        for (const rule of this.descriptionRules) {
            if (rule.condition(daysUntilTet)) {
                return rule.build(daysUntilTet);
            }
        }
        return this.descriptionRules[this.descriptionRules.length - 1].build(daysUntilTet);
    }

    getCurrentPageUrl() {
        const current = new URL(window.location.href);
        current.hash = "";
        current.search = "";
        if (!current.pathname) {
            current.pathname = "/";
        }
        return current.toString();
    }

    shouldRunForCurrentPage() {
        const path = window.location.pathname || "/";
        return this.allowedHomepagePaths.has(path);
    }

    setCanonical(url) {
        const canonical = this.ensureHeadElement('link[rel="canonical"]', "link", {
            rel: "canonical",
        });
        canonical.setAttribute("href", url);
    }

    setHrefLang(url) {
        const vi = this.ensureHeadElement('link[rel="alternate"][hreflang="vi-VN"]', "link", {
            rel: "alternate",
            hreflang: "vi-VN",
        });
        vi.setAttribute("href", url);

        const xDefault = this.ensureHeadElement(
            'link[rel="alternate"][hreflang="x-default"]',
            "link",
            { rel: "alternate", hreflang: "x-default" }
        );
        xDefault.setAttribute("href", this.defaultCanonical);
    }

    updateWebPageSchema(title, description, url, daysUntilTet) {
        const schema = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description: this.clampText(description, 200),
            url,
            inLanguage: "vi-VN",
            isPartOf: {
                "@type": "WebSite",
                name: "Sắp Tết - Đếm Ngược Tết",
                url: "https://saptet.vn/",
            },
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: this.defaultImage,
            },
            about: {
                "@type": "Thing",
                name: "Tết Nguyên Đán 2027",
            },
            mainEntity: {
                "@type": "Event",
                name: "Tết Nguyên Đán 2027",
                startDate: this.tetDate.toISOString(),
                eventStatus: "https://schema.org/EventScheduled",
                inLanguage: "vi-VN",
            },
            additionalProperty: [
                {
                    "@type": "PropertyValue",
                    name: "daysUntilTet",
                    value: String(daysUntilTet),
                },
            ],
        };

        let script = document.getElementById(this.schemaScriptId);
        if (!script) {
            script = document.createElement("script");
            script.type = "application/ld+json";
            script.id = this.schemaScriptId;
            document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(schema);
    }

    setMetaByName(name, content) {
        const selector = `meta[name="${name}"]`;
        const meta = this.ensureHeadElement(selector, "meta", { name });
        meta.setAttribute("content", content);
    }

    setMetaByProperty(property, content) {
        const selector = `meta[property="${property}"]`;
        const meta = this.ensureHeadElement(selector, "meta", { property });
        meta.setAttribute("content", content);
    }

    ensureHeadElement(selector, tagName, attrs = {}) {
        if (this.cachedElements[selector]) {
            return this.cachedElements[selector];
        }
        let element = document.head.querySelector(selector);
        if (!element) {
            element = document.createElement(tagName);
            for (const [key, value] of Object.entries(attrs)) {
                element.setAttribute(key, value);
            }
            document.head.appendChild(element);
        }
        this.cachedElements[selector] = element;
        return element;
    }

    clampText(text, maxLength) {
        if (text.length <= maxLength) return text;
        return `${text.slice(0, maxLength - 1).trimEnd()}…`;
    }
}

function initDynamicSEO() {
    if (window.__dynamicSeoInitialized) return;
    window.__dynamicSeoInitialized = true;
    const seo = new DynamicSEO();
    seo.init();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initDynamicSEO, { once: true });
} else {
    initDynamicSEO();
}
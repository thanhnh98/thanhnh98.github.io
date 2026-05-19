// Dynamic SEO: only tightens title/description on homepage when Tết is near.
// Static HTML from inject-tet-seo-snippets.js is the primary source for crawlers.
class DynamicSEO {
    constructor() {
        this.tetDate = new Date("2027-02-06T00:00:00+07:00");
        this.updateEveryMs = 60 * 60 * 1000;
        this.schemaScriptId = "dynamic-webpage-schema";
        this.defaultImage = "https://saptet.vn/assets/images/img_sharing.png";
        this.defaultCanonical = "https://saptet.vn/";
        this.enableHourlyRefresh = false;
        this.allowedHomepagePaths = new Set(["/", "/index.html"]);
        this.lastSeoSignature = "";
        this.cachedElements = {};
        this.staticTitle = document.title;
        this.staticDescription =
            document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
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
        const pageUrl = this.getCurrentPageUrl();
        const title = this.buildTitle(daysUntilTet);
        const description = this.buildDescription(daysUntilTet);
        const signature = `${title}|${description}|${pageUrl}|${daysUntilTet}`;
        if (signature === this.lastSeoSignature) return;
        this.lastSeoSignature = signature;

        document.title = title;
        this.setMetaByName("description", this.clampText(description, 160));
        this.setMetaByProperty("og:title", title);
        this.setMetaByProperty("og:description", this.clampText(description, 200));
        this.setMetaByProperty("twitter:title", title);
        this.setMetaByProperty("twitter:description", this.clampText(description, 200));
        this.updateWebPageSchema(title, description, pageUrl, daysUntilTet);
        this.syncVisibleDayCount(daysUntilTet);
    }

    getDaysUntilTet() {
        const now = new Date();
        const ms = this.tetDate - now;
        const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
        return Math.max(0, days);
    }

    buildTitle(daysUntilTet) {
        if (daysUntilTet > 30) {
            return this.staticTitle;
        }
        if (daysUntilTet <= 7) {
            return `Sắp Tết 2027 – Còn ${daysUntilTet} Ngày Đến Tết Nguyên Đán`;
        }
        return `Sắp Tết 2027 – Còn ${daysUntilTet} Ngày Đến Tết Nguyên Đán`;
    }

    buildDescription(daysUntilTet) {
        if (daysUntilTet > 30) {
            return this.staticDescription;
        }
        return `Hôm nay còn ${daysUntilTet} ngày nữa đến Tết Nguyên Đán 2027. Sắp Tết – đếm ngược realtime, lịch âm dương và tiện ích Tết Việt Nam.`;
    }

    syncVisibleDayCount(daysUntilTet) {
        const formatted = daysUntilTet.toLocaleString("vi-VN");
        document.querySelectorAll('[data-seo="days-until-tet"]').forEach((el) => {
            el.textContent = formatted;
        });
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
                name: "Sắp Tết",
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

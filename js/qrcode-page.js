import QRCodeStyling from "https://esm.sh/qr-code-styling@1.8.1";

const DOT_TYPES = [
    { value: "square", label: "Ô vuông" },
    { value: "rounded", label: "Bo góc nhẹ" },
    { value: "dots", label: "Chấm tròn" },
    { value: "classy", label: "Classy" },
    { value: "classy-rounded", label: "Classy bo góc" },
    { value: "extra-rounded", label: "Bo góc mạnh" },
];

const CORNER_SQUARE_TYPES = [
    { value: "square", label: "Vuông" },
    { value: "dot", label: "Chấm" },
    { value: "extra-rounded", label: "Bo góc lớn" },
];

const CORNER_DOT_TYPES = [
    { value: "square", label: "Vuông" },
    { value: "dot", label: "Chấm" },
];

const ECC_LEVELS = [
    { value: "L", label: "L (~7%)" },
    { value: "M", label: "M (~15%)" },
    { value: "Q", label: "Q (~25%)" },
    { value: "H", label: "H (~30%)" },
];

const SIZE_QUICK = [256, 320, 400, 512, 640];
const MARGIN_QUICK = [0, 8, 16, 24];

const COLOR_PRESETS = {
    classic: { dot: "#171717", bg: "#ffffff", csq: "#171717", cdot: "#171717" },
    tet: { dot: "#b91c1c", bg: "#fffbeb", csq: "#991b1b", cdot: "#991b1b" },
    ocean: { dot: "#0c4a6e", bg: "#e0f2fe", csq: "#0369a1", cdot: "#0369a1" },
    forest: { dot: "#14532d", bg: "#ecfccb", csq: "#166534", cdot: "#166534" },
    mono: { dot: "#27272a", bg: "#f4f4f5", csq: "#3f3f46", cdot: "#3f3f46" },
    brand: { dot: "#b91c1c", bg: "#ffffff", csq: "#991b1b", cdot: "#991b1b" },
};

const TRANSPARENT_QR_BG = "rgba(0,0,0,0)";

let applyingColorPreset = false;

/** Tránh gọi update() khi opts không đổi (giảm chớp). */
let lastAppliedQrOptsKey = null;

let renderRafId = null;

/**
 * Gộp nhiều sự kiện input: hủy frame cũ, luôn dùng trạng thái mới nhất trước khi vẽ.
 */
function scheduleRenderQr() {
    if (renderRafId !== null) {
        cancelAnimationFrame(renderRafId);
    }
    renderRafId = requestAnimationFrame(() => {
        renderRafId = null;
        renderQr();
    });
}

function debounce(fn, ms) {
    let t;
    return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}

function isValidHttpUrl(str) {
    try {
        const u = new URL(str.trim());
        return u.protocol === "http:" || u.protocol === "https:";
    } catch {
        return false;
    }
}

function fillSelect(select, options) {
    select.innerHTML = "";
    for (const o of options) {
        const opt = document.createElement("option");
        opt.value = o.value;
        opt.textContent = o.label;
        select.appendChild(opt);
    }
}

function readHexOrColor(hexId, colorId, fallback) {
    const hexEl = document.getElementById(hexId);
    const v = hexEl?.value?.trim() ?? "";
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) return v;
    const c = document.getElementById(colorId)?.value?.trim();
    return c || fallback;
}

function setBgColorRowDisabled(disabled) {
    document.getElementById("qr-bg-color-row")?.classList.toggle("is-disabled", disabled);
}

function setContainerBgRowDisabled(disabled) {
    document.getElementById("qr-container-bg-color-row")?.classList.toggle("is-disabled", disabled);
}

function setColorFromHex(colorId, hexId, hex6) {
    const h = document.getElementById(hexId);
    const c = document.getElementById(colorId);
    if (!h || !c) return;
    let v = hex6.trim();
    if (!v.startsWith("#")) v = `#${v}`;
    if (!/^#[0-9A-Fa-f]{6}$/.test(v)) return;
    h.value = v;
    c.value = v;
}

function markPresetCustom() {
    if (applyingColorPreset) return;
    const preset = document.getElementById("qr-color-preset");
    if (preset && preset.value !== "custom") preset.value = "custom";
}

function applyColorPreset(key) {
    const p = COLOR_PRESETS[key];
    if (!p) return;
    applyingColorPreset = true;
    try {
        const bgT = document.getElementById("qr-bg-transparent");
        if (bgT) bgT.checked = false;
        setColorFromHex("qr-dot-color", "qr-dot-color-hex", p.dot);
        setColorFromHex("qr-bg-color", "qr-bg-color-hex", p.bg);
        setColorFromHex("qr-corner-sq-color", "qr-corner-sq-color-hex", p.csq);
        setColorFromHex("qr-corner-dot-color", "qr-corner-dot-color-hex", p.cdot);
        const presetEl = document.getElementById("qr-color-preset");
        if (presetEl) presetEl.value = key;
    } finally {
        applyingColorPreset = false;
    }
    scheduleRenderQr();
}

function readControls() {
    const urlInput = document.getElementById("qr-url");
    const size = parseInt(document.getElementById("qr-size").value, 10) || 400;
    const margin = parseInt(document.getElementById("qr-margin").value, 10);
    const dotColor = readHexOrColor("qr-dot-color-hex", "qr-dot-color", "#000000");
    const bgTransparent = document.getElementById("qr-bg-transparent")?.checked ?? false;
    const bgColor = bgTransparent
        ? TRANSPARENT_QR_BG
        : readHexOrColor("qr-bg-color-hex", "qr-bg-color", "#ffffff");
    const cornerSquareColor = readHexOrColor("qr-corner-sq-color-hex", "qr-corner-sq-color", dotColor);
    const cornerDotColor = readHexOrColor("qr-corner-dot-color-hex", "qr-corner-dot-color", dotColor);
    const dotsType = document.getElementById("qr-dots-type").value;
    const cornersSquareType = document.getElementById("qr-corners-square-type").value;
    const cornersDotType = document.getElementById("qr-corners-dot-type").value;
    let ecc = document.getElementById("qr-ecc").value;
    const imageSize = parseFloat(document.getElementById("qr-image-size").value) || 0;
    const imageMargin = parseInt(document.getElementById("qr-image-margin").value, 10) || 0;
    const hideBgDots = document.getElementById("qr-hide-bg-dots").checked;
    const imageData = document.getElementById("qr-center-image-data")?.value || "";

    if (imageData && ecc !== "H") {
        ecc = "H";
        const eccSelect = document.getElementById("qr-ecc");
        if (eccSelect) eccSelect.value = "H";
    }

    const s = Math.min(1024, Math.max(128, size));

    return {
        data: urlInput.value.trim(),
        width: s,
        height: s,
        margin: Math.min(48, Math.max(0, Number.isFinite(margin) ? margin : 8)),
        dotColor: dotColor || "#000000",
        bgColor,
        bgTransparent,
        cornerSquareColor: cornerSquareColor || dotColor || "#000000",
        cornerDotColor: cornerDotColor || dotColor || "#000000",
        dotsType,
        cornersSquareType,
        cornersDotType,
        ecc,
        image: imageData || undefined,
        imageOptions: {
            hideBackgroundDots: hideBgDots,
            imageSize: Math.min(0.5, Math.max(0.1, imageSize)),
            margin: Math.min(20, Math.max(0, imageMargin)),
        },
    };
}

function syncHexFromColorPickers() {
    const pairs = [
        ["qr-dot-color", "qr-dot-color-hex"],
        ["qr-bg-color", "qr-bg-color-hex"],
        ["qr-corner-sq-color", "qr-corner-sq-color-hex"],
        ["qr-corner-dot-color", "qr-corner-dot-color-hex"],
        ["qr-container-bg-color", "qr-container-bg-hex"],
    ];
    for (const [colorId, hexId] of pairs) {
        const c = document.getElementById(colorId);
        const h = document.getElementById(hexId);
        if (c && h) h.value = c.value;
    }
}

function applyHexToColor(hexInput, colorInput) {
    const v = hexInput.value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(v)) {
        colorInput.value = v;
    }
}

let qrInstance = null;

function showError(msg) {
    const el = document.getElementById("qr-url-error");
    if (!el) return;
    if (msg) {
        el.textContent = msg;
        el.classList.add("is-visible");
    } else {
        el.textContent = "";
        el.classList.remove("is-visible");
    }
}

function setEmptyHintVisible(visible) {
    document.getElementById("qr-empty-hint")?.classList.toggle("is-hidden", !visible);
}

function clearQrMount() {
    const mount = document.getElementById("qr-canvas-container");
    if (mount) mount.innerHTML = "";
    qrInstance = null;
    lastAppliedQrOptsKey = null;
}

function updatePreviewCheckered(bgTransparent) {
    document.getElementById("qr-preview-inner")?.classList.toggle("qrcode-preview-inner--checkered", !!bgTransparent);
}

function updateContainerStyles() {
    const wrap = document.getElementById("qr-bg-wrap");
    if (!wrap) return;

    const transparent = document.getElementById("qr-container-bg-transparent")?.checked ?? false;
    const bg = transparent
        ? "transparent"
        : readHexOrColor("qr-container-bg-hex", "qr-container-bg-color", "#f3f4f6");

    const pad = parseInt(document.getElementById("qr-container-padding")?.value, 10) || 0;
    const bw = parseInt(document.getElementById("qr-container-border-w")?.value, 10) || 0;
    const bc = document.getElementById("qr-container-border-color")?.value || "#e5e7eb";
    const br = parseInt(document.getElementById("qr-container-border-radius")?.value, 10) || 0;

    wrap.style.backgroundColor = bg;
    wrap.style.padding = `${Math.min(48, Math.max(0, pad))}px`;
    wrap.style.borderWidth = `${Math.min(24, Math.max(0, bw))}px`;
    wrap.style.borderStyle = bw > 0 ? "solid" : "none";
    wrap.style.borderColor = bc;
    wrap.style.borderRadius = `${Math.min(32, Math.max(0, br))}px`;
}

function buildOptions(ctrl) {
    const opts = {
        width: ctrl.width,
        height: ctrl.height,
        data: ctrl.data,
        margin: ctrl.margin,
        qrOptions: {
            errorCorrectionLevel: ctrl.ecc,
        },
        dotsOptions: {
            color: ctrl.dotColor,
            type: ctrl.dotsType,
        },
        cornersSquareOptions: {
            color: ctrl.cornerSquareColor,
            type: ctrl.cornersSquareType,
        },
        cornersDotOptions: {
            color: ctrl.cornerDotColor,
            type: ctrl.cornersDotType,
        },
        backgroundOptions: {
            color: ctrl.bgColor,
        },
    };
    if (ctrl.image) {
        opts.image = ctrl.image;
        opts.imageOptions = ctrl.imageOptions;
    }
    return opts;
}

function syncSelectChips(container, selectEl) {
    if (!container || !selectEl) return;
    const v = selectEl.value;
    container.querySelectorAll(".qrcode-chip").forEach((btn) => {
        const on = btn.dataset.value === v;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
}

function syncValueChips(container, rawValue) {
    if (!container) return;
    const str = String(rawValue);
    container.querySelectorAll(".qrcode-chip").forEach((btn) => {
        const on = btn.dataset.value === str;
        btn.classList.toggle("is-active", on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
}

function buildSelectLinkedChips(containerEl, selectEl, options, chipClassExtra = "") {
    if (!containerEl || !selectEl) return;
    containerEl.innerHTML = "";
    const sync = () => syncSelectChips(containerEl, selectEl);

    for (const o of options) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "qrcode-chip" + (chipClassExtra ? ` ${chipClassExtra}` : "");
        b.dataset.value = o.value;
        b.textContent = o.chipLabel ?? o.label;
        if (o.title) b.title = o.title;
        b.addEventListener("click", () => {
            selectEl.value = o.value;
            sync();
            selectEl.dispatchEvent(new Event("change", { bubbles: true }));
        });
        containerEl.appendChild(b);
    }
    selectEl.addEventListener("change", sync);
    sync();
}

function buildQuickValueChips(containerId, inputId, values, labelFn) {
    const c = document.getElementById(containerId);
    const input = document.getElementById(inputId);
    if (!c || !input) return;
    c.innerHTML = "";
    const sync = () => syncValueChips(c, input.value);

    for (const v of values) {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "qrcode-chip";
        b.dataset.value = String(v);
        b.textContent = labelFn ? labelFn(v) : String(v);
        b.addEventListener("click", () => {
            input.value = String(v);
            sync();
            input.dispatchEvent(new Event("input", { bubbles: true }));
        });
        c.appendChild(b);
    }
    input.addEventListener("input", sync);
    sync();
}

function syncAllSelectChips() {
    syncSelectChips(document.getElementById("qr-dots-type-chips"), document.getElementById("qr-dots-type"));
    syncSelectChips(document.getElementById("qr-corners-square-chips"), document.getElementById("qr-corners-square-type"));
    syncSelectChips(document.getElementById("qr-corners-dot-chips"), document.getElementById("qr-corners-dot-type"));
    syncSelectChips(document.getElementById("qr-ecc-chips"), document.getElementById("qr-ecc"));
}

function renderQr() {
    if (renderRafId !== null) {
        cancelAnimationFrame(renderRafId);
        renderRafId = null;
    }

    const ctrl = readControls();
    updateContainerStyles();
    updatePreviewCheckered(ctrl.bgTransparent);
    setBgColorRowDisabled(document.getElementById("qr-bg-transparent")?.checked ?? false);
    setContainerBgRowDisabled(document.getElementById("qr-container-bg-transparent")?.checked ?? false);

    if (!ctrl.data) {
        showError("");
        clearQrMount();
        setEmptyHintVisible(true);
        syncAllSelectChips();
        syncValueChips(document.getElementById("qr-size-chips"), document.getElementById("qr-size")?.value);
        syncValueChips(document.getElementById("qr-margin-chips"), document.getElementById("qr-margin")?.value);
        return;
    }

    if (!isValidHttpUrl(ctrl.data)) {
        showError("Vui lòng nhập URL hợp lệ (bắt đầu bằng http:// hoặc https://).");
        clearQrMount();
        setEmptyHintVisible(false);
        syncAllSelectChips();
        syncValueChips(document.getElementById("qr-size-chips"), document.getElementById("qr-size")?.value);
        syncValueChips(document.getElementById("qr-margin-chips"), document.getElementById("qr-margin")?.value);
        return;
    }

    showError("");
    setEmptyHintVisible(false);

    const opts = buildOptions(ctrl);
    const mount = document.getElementById("qr-canvas-container");
    if (!mount) return;

    const optsKey = JSON.stringify(opts);

    if (!qrInstance) {
        qrInstance = new QRCodeStyling(opts);
        mount.innerHTML = "";
        qrInstance.append(mount);
        lastAppliedQrOptsKey = optsKey;
    } else if (optsKey !== lastAppliedQrOptsKey) {
        qrInstance.update(opts);
        lastAppliedQrOptsKey = optsKey;
    }

    syncAllSelectChips();
    syncValueChips(document.getElementById("qr-size-chips"), document.getElementById("qr-size")?.value);
    syncValueChips(document.getElementById("qr-margin-chips"), document.getElementById("qr-margin")?.value);
}

function initFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const u = params.get("url");
    if (u) {
        const input = document.getElementById("qr-url");
        if (input) input.value = u;
    }
}

function wireImageUpload() {
    const file = document.getElementById("qr-center-image-file");
    const hidden = document.getElementById("qr-center-image-data");
    const clearBtn = document.getElementById("qr-clear-image");
    if (!file || !hidden) return;

    file.addEventListener("change", () => {
        const f = file.files?.[0];
        if (!f || !f.type.startsWith("image/")) {
            hidden.value = "";
            scheduleRenderQr();
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            hidden.value = reader.result;
            scheduleRenderQr();
        };
        reader.readAsDataURL(f);
    });

    clearBtn?.addEventListener("click", () => {
        file.value = "";
        hidden.value = "";
        scheduleRenderQr();
    });
}

function wireColorHexSync(debouncedRender) {
    const map = [
        ["qr-dot-color", "qr-dot-color-hex"],
        ["qr-bg-color", "qr-bg-color-hex"],
        ["qr-corner-sq-color", "qr-corner-sq-color-hex"],
        ["qr-corner-dot-color", "qr-corner-dot-color-hex"],
        ["qr-container-bg-color", "qr-container-bg-hex"],
    ];
    for (const [cid, hid] of map) {
        const c = document.getElementById(cid);
        const h = document.getElementById(hid);
        if (!c || !h) continue;
        c.addEventListener("input", () => {
            h.value = c.value;
            if (cid !== "qr-container-bg-color") markPresetCustom();
            scheduleRenderQr();
        });
        h.addEventListener("change", () => {
            applyHexToColor(h, c);
            if (cid !== "qr-container-bg-color") markPresetCustom();
            scheduleRenderQr();
        });
        h.addEventListener("input", () => {
            if (cid !== "qr-container-bg-color") markPresetCustom();
            debouncedRender();
        });
    }
}

function wireColorPresetSelect() {
    const el = document.getElementById("qr-color-preset");
    if (!el) return;
    el.addEventListener("change", () => {
        const v = el.value;
        if (v === "custom") return;
        applyColorPreset(v);
    });
}

function ensureUrlBeforeDownload() {
    const ctrl = readControls();
    if (!ctrl.data.trim()) {
        showError("Nhập URL trước khi tải xuống.");
        setEmptyHintVisible(true);
        return false;
    }
    if (!isValidHttpUrl(ctrl.data)) {
        showError("URL không hợp lệ; sửa lại trước khi tải.");
        return false;
    }
    return true;
}

function init() {
    const dotsSelect = document.getElementById("qr-dots-type");
    const csSelect = document.getElementById("qr-corners-square-type");
    const cdSelect = document.getElementById("qr-corners-dot-type");
    const eccSelect = document.getElementById("qr-ecc");

    fillSelect(dotsSelect, DOT_TYPES);
    fillSelect(csSelect, CORNER_SQUARE_TYPES);
    fillSelect(cdSelect, CORNER_DOT_TYPES);
    fillSelect(eccSelect, ECC_LEVELS);
    if (eccSelect) eccSelect.value = "M";

    buildQuickValueChips("qr-size-chips", "qr-size", SIZE_QUICK, (n) => `${n}px`);
    buildQuickValueChips("qr-margin-chips", "qr-margin", MARGIN_QUICK, (n) => (n === 0 ? "0" : `${n}px`));

    buildSelectLinkedChips(document.getElementById("qr-dots-type-chips"), dotsSelect, DOT_TYPES);
    buildSelectLinkedChips(document.getElementById("qr-corners-square-chips"), csSelect, CORNER_SQUARE_TYPES);
    buildSelectLinkedChips(document.getElementById("qr-corners-dot-chips"), cdSelect, CORNER_DOT_TYPES);
    buildSelectLinkedChips(
        document.getElementById("qr-ecc-chips"),
        eccSelect,
        ECC_LEVELS.map((o) => ({
            value: o.value,
            label: o.label,
            chipLabel: o.value,
            title: o.label,
        })),
        "qrcode-chip--ecc",
    );

    initFromQuery();
    syncHexFromColorPickers();
    wireImageUpload();
    wireColorPresetSelect();

    const debouncedRender = debounce(scheduleRenderQr, 380);
    wireColorHexSync(debouncedRender);

    document.getElementById("qr-bg-transparent")?.addEventListener("change", () => {
        markPresetCustom();
        scheduleRenderQr();
    });
    document.getElementById("qr-container-bg-transparent")?.addEventListener("change", scheduleRenderQr);

    document.getElementById("qr-url")?.addEventListener("input", debouncedRender);
    document.getElementById("qr-apply-btn")?.addEventListener("click", (e) => {
        e.preventDefault();
        renderQr();
    });

    const rerenderIds = [
        "qr-size",
        "qr-margin",
        "qr-dots-type",
        "qr-corners-square-type",
        "qr-corners-dot-type",
        "qr-ecc",
        "qr-image-size",
        "qr-image-margin",
        "qr-hide-bg-dots",
        "qr-container-padding",
        "qr-container-border-w",
        "qr-container-border-color",
        "qr-container-border-radius",
    ];
    for (const id of rerenderIds) {
        document.getElementById(id)?.addEventListener("input", scheduleRenderQr);
        document.getElementById(id)?.addEventListener("change", scheduleRenderQr);
    }

    document.getElementById("qr-download-png")?.addEventListener("click", () => {
        if (!ensureUrlBeforeDownload()) return;
        renderQr();
        qrInstance?.download({ name: "qrcode-saptet", extension: "png" });
    });
    document.getElementById("qr-download-svg")?.addEventListener("click", () => {
        if (!ensureUrlBeforeDownload()) return;
        renderQr();
        qrInstance?.download({ name: "qrcode-saptet", extension: "svg" });
    });

    const sizeInput = document.getElementById("qr-size");
    const m = document.getElementById("qr-margin");
    const imgSize = document.getElementById("qr-image-size");
    const pad = document.getElementById("qr-container-padding");
    const bw = document.getElementById("qr-container-border-w");
    const br = document.getElementById("qr-container-border-radius");

    const bindRangeLabel = (input, outId, formatter) => {
        const out = document.getElementById(outId);
        if (!input || !out) return;
        const upd = () => {
            out.textContent = formatter ? formatter(input.value) : `${input.value}`;
        };
        input.addEventListener("input", upd);
        upd();
    };
    bindRangeLabel(sizeInput, "qr-size-out", (v) => `${v} × ${v} px`);
    bindRangeLabel(m, "qr-margin-out", (v) => `${v} px`);
    bindRangeLabel(imgSize, "qr-image-size-out", (v) => `${v}`);
    bindRangeLabel(pad, "qr-container-padding-out", (v) => `${v} px`);
    bindRangeLabel(bw, "qr-container-border-w-out", (v) => `${v} px`);
    bindRangeLabel(br, "qr-container-border-radius-out", (v) => `${v} px`);

    renderQr();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

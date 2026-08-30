const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "qr-code/index.html"), "utf8");
const script = fs.readFileSync(path.join(root, "js/qrcode-page.js"), "utf8");

test("QR page keeps the fast path visible and advanced controls collapsed", () => {
    assert.match(html, /<textarea[^>]+id="qr-url"[^>]+maxlength="2000"/);
    assert.match(html, /id="qr-paste-btn"/);
    assert.match(html, /id="qr-clear-content"[^>]+disabled/);
    assert.match(html, /<details class="qrcode-advanced" id="qr-advanced">/);
    assert.doesNotMatch(html, /<details class="qrcode-advanced" id="qr-advanced"\s+open/);
});

test("downloads are unavailable until a QR is ready", () => {
    assert.match(html, /id="qr-download-png" disabled/);
    assert.match(html, /id="qr-download-svg" disabled/);
    assert.match(script, /setQrReady\(true, "Mã QR đã sẵn sàng"\)/);
    assert.match(script, /downloadPng\.disabled = !ready/);
    assert.match(script, /downloadSvg\.disabled = !ready/);
});

test("QR page accepts text and preserves legacy URL query links", () => {
    assert.doesNotMatch(script, /isValidHttpUrl/);
    assert.match(script, /params\.get\("text"\) \|\| params\.get\("url"\)/);
    assert.match(html, /Tạo mã QR miễn phí từ link hoặc văn bản/);
});

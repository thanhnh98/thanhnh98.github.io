const test = require('node:test');
const assert = require('node:assert/strict');
const { getData, draw } = require('../js/home-share-image.js');

test('share day count matches Vietnam calendar rather than device timezone', () => {
  assert.equal(getData(new Date('2026-10-06T18:00:00Z')).days, 122);
  assert.equal(getData(new Date('2026-10-06T18:00:00Z')).today, '07/10/2026');
  assert.equal(getData(new Date('2027-02-05T17:00:00Z')).days, 0);
  assert.equal(getData(new Date('2027-02-07T00:00:00Z')).days, 0);
});
test('export draws a 1080x1350 card with a small baked-in website watermark', () => {
  const labels = [];
  const context = new Proxy({
    createLinearGradient: () => ({ addColorStop() {} }),
    fillText: (value, x, y) => labels.push({ value, x, y, font: context.font }),
  }, { get: (target, key) => key in target ? target[key] : () => {} });
  const canvas = { getContext: () => context };
  draw(canvas, getData(new Date('2026-10-07T00:00:00Z')));
  assert.equal(canvas.width, 1080);
  assert.equal(canvas.height, 1350);
  const watermark = labels.find(label => label.value === 'saptet.vn');
  assert.equal(watermark.x, 540);
  assert.equal(watermark.y, 1254);
  assert.match(watermark.font, /28px/);
  assert.ok(labels.some(label => label.value === '122'));
});

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const fireworks = require(path.join(root, 'js', 'home-fireworks.js'));

test('homepage exposes a corner fireworks trigger without an eager canvas', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /id="home-fireworks-trigger"/);
  assert.match(html, /aria-label="Bắn pháo hoa đón Tết"/);
  assert.match(html, /src="js\/home-fireworks\.js/);
  assert.doesNotMatch(html, /<canvas[^>]+home-fireworks-canvas/);
});

test('fireworks launch plan randomizes safe viewport targets', () => {
  let seed = 0;
  const values = [.4, .2, .7, .35, .8, .1, .6, .9, .3, .5];
  const plan = fireworks.createLaunchPlan(1280, 720, () => values[(seed++) % values.length]);
  assert.ok(plan.length >= 2 && plan.length <= 4);
  plan.forEach((rocket, index) => {
    assert.ok(rocket.startX >= 24 && rocket.startX <= 1256);
    assert.ok(rocket.targetX >= 128 && rocket.targetX <= 1152);
    assert.ok(rocket.targetY >= 720 * .14 && rocket.targetY <= 720 * .55);
    assert.ok(rocket.delay >= index * 135 && rocket.delay <= index * 135 + 55);
    assert.match(rocket.color, /^#[0-9a-f]{6}$/i);
  });
});

test('twenty-click combo adds a signature rocket across a wider safe range', () => {
  assert.equal(fireworks.isSignatureLaunch(19), false);
  assert.equal(fireworks.isSignatureLaunch(20), true);
  const rocket = fireworks.createSignatureRocket(1280, 720, () => .5);
  assert.equal(rocket.signature, true);
  assert.ok(rocket.targetX >= 1280 * .28 && rocket.targetX <= 1280 * .72);
  assert.ok(rocket.targetY >= 720 * .18 && rocket.targetY <= 720 * .52);
});

test('signature message randomizes branded, live countdown and new year copy', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  assert.equal(fireworks.getDaysUntilTet(now), 161);
  assert.equal(fireworks.createSignatureMessage(() => 0, now), 'Sắp Tết');
  assert.equal(fireworks.createSignatureMessage(() => .4, now), 'Tết còn 161 ngày');
  assert.equal(fireworks.createSignatureMessage(() => .9, now), 'Chúc Mừng Năm Mới');
});

test('fireworks accepts overlapping launches without an active-animation debounce', () => {
  const script = fs.readFileSync(path.join(root, 'js', 'home-fireworks.js'), 'utf8');
  assert.doesNotMatch(script, /if \(pendingLaunches \|\| rockets\.length/);
  assert.match(script, /clickCount \+= 1/);
  assert.match(script, /COMBO_RESET_MS = 1800/);
});

test('fireworks styles keep the canvas non-interactive and respect reduced motion', () => {
  const css = fs.readFileSync(path.join(root, 'css', 'home-retention.css'), 'utf8');
  assert.match(css, /\.home-fireworks-canvas[\s\S]*?pointer-events:\s*none/);
  assert.match(css, /\.home-fireworks-trigger[\s\S]*?position:\s*fixed/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?home-fireworks-trigger/);
});

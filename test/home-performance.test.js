const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

function keyframes(css, name) {
  const blocks = [];
  const re = new RegExp(`@keyframes ${name}\\s*\\{`, 'g');
  let match;
  while ((match = re.exec(css))) {
    let depth = 1;
    let i = re.lastIndex;
    while (depth && i < css.length) {
      if (css[i] === '{') depth += 1;
      if (css[i] === '}') depth -= 1;
      i += 1;
    }
    blocks.push(css.slice(match.index, i));
  }
  return blocks;
}

test('homepage loads self-hosted Lucide subset instead of unpkg latest', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /unpkg\.com\/lucide/);
  assert.match(html, /<script src="js\/vendor\/lucide-subset\.js[^"]*" defer><\/script>/);

  const bundle = read('js/vendor/lucide-subset.js');
  const icons = [...html.matchAll(/data-lucide="([a-z0-9-]+)"/g), ...read('components/header.html').matchAll(/data-lucide="([a-z0-9-]+)"/g)]
    .map((match) => match[1]);
  for (const icon of new Set(icons)) {
    assert.ok(bundle.includes(`"${icon}":`), `lucide subset is missing icon "${icon}" (run npm run build:icons)`);
  }
});

test('no page pulls an unpinned Lucide build', () => {
  const offenders = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (['node_modules', '.git'].includes(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(html|js)$/.test(entry.name) && /unpkg\.com\/lucide@latest(?!\s*\()/.test(fs.readFileSync(full, 'utf8').replace(/\/\*[\s\S]*?\*\//g, ''))) {
        offenders.push(path.relative(root, full));
      }
    }
  };
  walk(root);
  assert.deepEqual(offenders, []);
});

test('homepage body scripts are deferred and web fonts do not block render', () => {
  const html = read('index.html');
  const body = html.slice(html.indexOf('<body'));
  const external = [...body.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)];
  assert.ok(external.length > 0);
  for (const match of external) {
    assert.match(match[0], /\bdefer\b|\basync\b|type="module"/, `${match[1]} should not block parsing`);
  }

  const head = html.slice(0, html.indexOf('</head>')).replace(/<noscript>[\s\S]*?<\/noscript>/g, '');
  const fontSheets = [...head.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)].map((m) => m[0]).filter((tag) => tag.includes('fonts.googleapis.com'));
  assert.ok(fontSheets.length > 0);
  for (const tag of fontSheets) assert.match(tag, /media="print" onload="this\.media='all'"/, 'Google Fonts must load without blocking render');
  assert.match(head, /rel="preload" as="image" href="images\/tet-background-pattern\.svg"/);
});

test('infinite hero animations stay on the compositor (transform/opacity only)', () => {
  const css = read('css/style.css');
  for (const name of ['timerShine', 'starTwinkle']) {
    const blocks = keyframes(css, name);
    assert.ok(blocks.length > 0, `${name} keyframes exist`);
    for (const block of blocks) {
      assert.doesNotMatch(block, /\b(left|top|right|bottom|width|height|box-shadow|text-shadow|filter)\s*:/, `${name} must not animate layout/paint properties`);
    }
  }
  assert.equal(keyframes(css, 'timerGlow').length, 0);
  assert.equal(keyframes(css, 'titleGlow').length, 0);
});

test('fireworks canvas avoids shadowBlur and per-tap bitmap reallocation', () => {
  const js = read('js/home-fireworks.js');
  assert.doesNotMatch(js, /shadowBlur\s*=/);
  assert.doesNotMatch(js, /void trigger\.offsetWidth/);
  assert.match(js, /if \(width === win\.innerWidth && height === win\.innerHeight && canvasRatio === ratio\) return;/);
});

test('hero info card has a fixed width so web font swaps do not shift it', () => {
  const css = read('css/home-retention.css');
  assert.match(css, /\.countdown-info-card \{\n  width: min\(100%, 25rem\);/);
  assert.match(css, /\.countdown-info-card \.countdown-info-title \{[^}]*white-space: nowrap/);
});

test('third-party ads and analytics load after the page is interactive', () => {
  const loader = read('js/header-loader.js');
  assert.match(loader, /window\.addEventListener\('load', whenIdle, \{ once: true \}\)/);
  const html = read('index.html');
  assert.match(html, /addEventListener\('load', whenIdle, \{ once: true \}\)/);
  assert.match(read('js/home-retention.js'), /window\.addEventListener\('load', whenIdle, \{ once: true \}\)/);
});

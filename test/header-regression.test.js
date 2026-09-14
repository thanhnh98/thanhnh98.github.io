const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('shared header exposes accessible expandable navigation controls', () => {
  const header = read('components/header.html');

  assert.match(header, /class="see-more-btn"/);
  assert.match(header, /aria-expanded="false"/);
  assert.match(header, /aria-controls="nav-secondary-menu"/);
  assert.match(header, /id="nav-secondary-menu"/);
});

test('mobile navigation uses one open state across CSS and JavaScript', () => {
  const navigation = read('js/navigation.js');
  const loader = read('js/header-loader.js');
  const styles = read('css/style.css');

  assert.doesNotMatch(navigation, /mobile-open/);
  assert.match(loader, /mobile-menu-open/);
  assert.match(styles, /nav\.mobile-menu-open/);
});

test('mobile secondary navigation can reveal all shared header items', () => {
  const styles = read('css/style.css');
  const expandedRule = styles.match(/\.nav-expandable\.expanded \.nav-secondary\s*\{[^}]+\}/g)?.at(-1) || '';

  assert.doesNotMatch(expandedRule, /max-height:\s*200px/);
  assert.match(expandedRule, /max-height:\s*(?:5|6|7|8|9)\d{2}px/);
});

test('desktop secondary navigation keeps a compact vertical menu and visible active item', () => {
  const styles = read('css/style.css');
  const secondaryRule = styles.match(/\.nav-secondary\s*\{[^}]+\}/)?.[0] || '';
  const activeRule = styles.match(/\.nav-expandable\.expanded \.nav-secondary a\.active\s*\{[^}]+\}/)?.[0] || '';

  assert.match(secondaryRule, /flex-direction:\s*column/);
  assert.match(activeRule, /background:\s*#dc2626/);
  assert.match(activeRule, /color:\s*#fff/);
  assert.match(activeRule, /border:\s*1px solid #dc2626/);
});

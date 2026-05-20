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

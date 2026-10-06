const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const { DISCLAIMER_TEXT } = require('../js/lunar-almanac.js');

const root = path.resolve(__dirname, '..');
const FOLK_CONTENT = /giờ hoàng đạo|tuổi xung|hướng xuất hành|ngày tốt xấu/i;
const SKIP_DIRS = new Set(['node_modules', '.git', 'tin-tuc', 'blog', 'scratch', 'build']);

function walk(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function bodyOf(html) {
  const index = html.indexOf('<body');
  return index === -1 ? html : html.slice(index);
}

test('every page whose body shows folk almanac content carries the shared disclaimer', () => {
  const offenders = [];
  for (const file of walk(root, [])) {
    const html = fs.readFileSync(file, 'utf8');
    const body = bodyOf(html);
    if (!FOLK_CONTENT.test(body)) continue;
    if (!html.includes(DISCLAIMER_TEXT)) offenders.push(path.relative(root, file));
  }
  assert.deepEqual(offenders, []);
});

test('pages with folk almanac content do not claim to be the most accurate', () => {
  const offenders = [];
  for (const file of walk(root, [])) {
    const html = fs.readFileSync(file, 'utf8');
    if (!FOLK_CONTENT.test(bodyOf(html))) continue;
    if (/chính xác nhất/i.test(html)) offenders.push(path.relative(root, file));
  }
  assert.deepEqual(offenders, []);
});

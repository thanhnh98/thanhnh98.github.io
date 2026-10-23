const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('substantial Vietnamese pages expose English through the shared mode or a native alternate', () => {
  const missing = [];
  function visit(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.name.endsWith('.html')) {
        const relative = path.relative(root, absolute);
        const html = fs.readFileSync(absolute, 'utf8');
        if (!/<html lang="vi"/.test(html) || relative.startsWith('templates/') || relative === 'demo-preview.html') continue;
        if (/<meta http-equiv="refresh"/.test(html) || html.split('\n').length < 100) continue;
        if (!/header-loader\.js|site-language\.js|hreflang="en"/.test(html)) missing.push(relative);
      }
    }
  }
  visit(root);
  assert.deepEqual(missing, []);
});

test('English reading mode retains native English routes and selected Vietnamese terminology', () => {
  const mode = read('js/site-language.js');
  const dictionary = JSON.parse(read('data/site-vi-en.json'));
  assert.match(mode, /new MutationObserver/);
  assert.match(mode, /'\/noel\.html': '\/christmas'/);
  assert.match(mode, /'\/tet-2027-la-ngay-nao\/': '\/when-is-tet-in-vietnam\/'/);
  assert.equal(dictionary['Ngày Nhà giáo Việt Nam'], "Vietnamese Teachers' Day");
  assert.equal(dictionary['Máy tính lì xì'], 'Lucky money calculator');
  assert.equal(dictionary['Sắp X'], 'Sắp X');
});

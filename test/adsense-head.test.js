const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const scriptUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3395045728500314';

function htmlFiles(dir = root) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'assets') return [];
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(file);
    return entry.isFile() && entry.name.endsWith('.html') ? [file] : [];
  });
}

test('public pages load AdSense exactly once in the head', () => {
  for (const file of htmlFiles()) {
    const html = fs.readFileSync(file, 'utf8');
    const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head\s*>/i)?.[1];
    if (!head || /<meta\s+name=["']robots["'][^>]*noindex/i.test(head)) continue;

    const scripts = [...head.matchAll(/<script\b[^>]*><\/script>/gi)]
      .map(([tag]) => tag)
      .filter((tag) => tag.includes(scriptUrl));
    assert.equal(scripts.length, 1, `${path.relative(root, file)} must load AdSense once`);
    assert.match(scripts[0], /\sasync(?:\s|>)/i);
    assert.match(scripts[0], /\scrossorigin=["']anonymous["']/i);
  }
});

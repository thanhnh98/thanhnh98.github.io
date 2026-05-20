const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

function getJsonLdObjects(html) {
  return [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1].trim()));
}

function collectEventNodes(node, found = []) {
  if (!node || typeof node !== 'object') return found;
  if (Array.isArray(node)) {
    node.forEach((item) => collectEventNodes(item, found));
    return found;
  }
  if (node['@type'] === 'Event') found.push(node);
  Object.values(node).forEach((value) => collectEventNodes(value, found));
  return found;
}

const htmlFiles = [
  'index.html',
  'con-bao-lau-nua-den-tet.html',
  'con-bao-nhieu-ngay-nua-den-tet/index.html',
  'lich-tet-2027.html',
  'dem-nguoc-thi-thpt-2026.html',
  'noel.html',
  'trung-thu.html',
];

for (const file of htmlFiles) {
  test(`${file} must not use Event schema (countdown app, not events)`, () => {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const events = getJsonLdObjects(html).flatMap((schema) => collectEventNodes(schema));
    assert.equal(events.length, 0, `Found Event in ${file}`);
  });
}

test('homepage keeps Thing date hint for Tet 2027 without Event', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const thing = getJsonLdObjects(html).find((item) => item['@type'] === 'Thing' && item.name === 'Tết Việt Nam');
  assert.ok(thing);
  assert.ok(thing.additionalProperty?.some((prop) => prop.value === '2027-02-06'));
});

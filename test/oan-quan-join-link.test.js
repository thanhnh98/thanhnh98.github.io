const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Jekyll publishes .well-known for app links', () => {
  assert.match(read('_config.yml'), /include:\s*\n\s*-\s*\.well-known/);
});

test('apple-app-site-association only claims the Ô ăn quan invite path', () => {
  const aasa = JSON.parse(read('.well-known/apple-app-site-association'));
  const [detail] = aasa.applinks.details;
  assert.deepEqual(detail.appIDs, ['M55WJF6HXG.tlife.app.saptet']);
  assert.deepEqual(detail.components.map((c) => c['/']), ['/oanquan/join/*']);
});

test('assetlinks.json verifies the Android app', () => {
  const [statement] = JSON.parse(read('.well-known/assetlinks.json'));
  assert.deepEqual(statement.relation, ['delegate_permission/common.handle_all_urls']);
  assert.equal(statement.target.package_name, 'com.thanh_nguyen.tet_count_down');
  assert.ok(statement.target.sha256_cert_fingerprints.length > 0);
  for (const fp of statement.target.sha256_cert_fingerprints) assert.match(fp, /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
});

test('404 page renders the room invite for /oanquan/join/<code>', () => {
  const html = read('404.html');
  assert.ok(html.includes('/^\\/oanquan\\/join\\/(\\d{6})\\/?$/'));
  assert.match(html, /class="oaq-invite"/);
  assert.match(html, /saptet:\/\/saptet\.vn\/\?page=o_an_quan&room=/);
  assert.match(html, /scheme=saptet;package=com\.thanh_nguyen\.tet_count_down/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.thanh_nguyen\.tet_count_down/);
  assert.match(html, /apps\.apple\.com\/app\/id6743064990/);
  assert.match(html, /<meta name="robots" content="noindex/);
});

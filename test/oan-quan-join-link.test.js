const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('Jekyll publishes .well-known for app links', () => {
  assert.match(read('_config.yml'), /include:\s*\n\s*-\s*\.well-known/);
});

test('apple-app-site-association only claims the app invite paths', () => {
  const aasa = JSON.parse(read('.well-known/apple-app-site-association'));
  const [detail] = aasa.applinks.details;
  assert.deepEqual(detail.appIDs, ['M55WJF6HXG.tlife.app.saptet']);
  assert.deepEqual(detail.components.map((c) => c['/']), ['/oanquan/join/*', '/friends/*', '/thiep/*']);
});

test('assetlinks.json verifies the release app and the debug build', () => {
  const statements = JSON.parse(read('.well-known/assetlinks.json'));
  const byPackage = Object.fromEntries(statements.map((s) => [s.target.package_name, s]));
  assert.deepEqual(Object.keys(byPackage).sort(), ['com.thanh_nguyen.tet_count_down', 'com.thanh_nguyen.tet_count_down.debug']);
  assert.deepEqual(byPackage['com.thanh_nguyen.tet_count_down'].target.sha256_cert_fingerprints,
    ['24:70:11:01:73:BC:9C:38:37:77:89:F6:2C:6B:B6:D6:81:8B:AF:5F:70:20:67:BC:8E:1D:F2:9F:68:9D:2E:B7']);
  for (const statement of statements) {
    assert.deepEqual(statement.relation, ['delegate_permission/common.handle_all_urls']);
    for (const fp of statement.target.sha256_cert_fingerprints) assert.match(fp, /^([0-9A-F]{2}:){31}[0-9A-F]{2}$/);
  }
});

test('404 page renders the room invite for /oanquan/join/<code>', () => {
  const html = read('404.html');
  assert.ok(html.includes('/^\\/oanquan\\/join\\/(\\d{6})\\/?$/'));
  assert.match(html, /class="oaq-invite oaq-room"/);
  assert.match(html, /saptet:\/\/saptet\.vn\/\?page=o_an_quan&room=/);
  assert.match(html, /scheme=saptet;package=com\.thanh_nguyen\.tet_count_down/);
  assert.match(html, /play\.google\.com\/store\/apps\/details\?id=com\.thanh_nguyen\.tet_count_down/);
  assert.match(html, /apps\.apple\.com\/app\/id6743064990/);
  assert.match(html, /<meta name="robots" content="noindex/);
});

test('404 page renders the friend invite for /friends/<code>', () => {
  const html = read('404.html');
  assert.ok(html.includes('/^\\/friends\\/([A-Za-z2-9]{8})\\/?$/'));
  assert.match(html, /class="oaq-invite friend-invite"/);
  assert.match(html, /saptet:\/\/saptet\.vn\/\?page=friends&code=/);
  assert.match(html, /intent:\/\/saptet\.vn\/\?page=friends&code=/);
  // The room invite keeps its own card.
  assert.match(html, /class="oaq-invite oaq-room"/);
});

test('a friend invite without the app falls back to /ung-dung', () => {
  const html = read('404.html');
  const start = html.indexOf('window.FRIEND_INVITE_CODE;');
  const script = html.slice(start, html.indexOf('</script>', start));
  assert.match(script, /fallbackUrl = window\.location\.origin \+ '\/ung-dung\.html'/);
  // Android: Chrome's own intent fallback goes to /ung-dung, not the Play Store.
  assert.match(script, /S\.browser_fallback_url=' \+\s*encodeURIComponent\(fallbackUrl\)/);
  // iOS: the page is still visible after the app hand-off → redirect; leaving the page cancels it.
  assert.match(script, /if \(!document\.hidden\) window\.location\.replace\(fallbackUrl\)/);
  assert.match(script, /visibilitychange/);
  assert.match(script, /window\.location\.href = appLink/);
});

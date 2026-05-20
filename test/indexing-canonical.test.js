const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const siteOrigin = 'https://saptet.vn/';

function walkHtmlFiles(dir = root, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;

    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtmlFiles(filePath, files);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(path.relative(root, filePath));
    }
  }

  return files;
}

function fileForSitemapUrl(url) {
  const rel = url === siteOrigin ? 'index.html' : url.replace(siteOrigin, '');
  const candidates = rel.endsWith('/')
    ? [`${rel}index.html`]
    : [rel, `${rel}.html`, `${rel}/index.html`];

  return candidates.find((candidate) => {
    const filePath = path.join(root, candidate);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  });
}

function canonicalFor(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || '';
}

function urlPathForFile(file) {
  return `https://saptet.vn/${file.replace(/(^|\/)index\.html$/, '$1')}`;
}

function pathForInternalUrl(rawUrl, baseUrl) {
  if (/^(mailto:|tel:|javascript:|data:|#)/i.test(rawUrl)) return null;

  try {
    const url = new URL(rawUrl.replace(/&amp;/g, '&'), baseUrl);
    if (url.hostname !== 'saptet.vn' && url.hostname !== 'www.saptet.vn') return null;
    return url.pathname;
  } catch {
    return null;
  }
}

function fileForPathname(pathname) {
  if (pathname === '/') return 'index.html';

  const rel = decodeURIComponent(pathname).replace(/^\//, '');
  const candidates = pathname.endsWith('/')
    ? [`${rel}index.html`]
    : [rel, `${rel}.html`, `${rel}/index.html`];

  return candidates.find((candidate) => {
    const filePath = path.join(root, candidate);
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  });
}

function permanentRedirectPathnames() {
  const redirects = read('_redirects');
  const pathnames = new Set();

  for (const line of redirects.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [from, , code = ''] = trimmed.split(/\s+/);
    if (!from || from.includes(':') || from.includes('*') || from.includes(':slug')) continue;
    if (code.startsWith('30')) pathnames.add(from);
  }

  return pathnames;
}

test('2027 Tet calendar landing pages are indexable canonical URLs', () => {
  for (const file of ['lich-tet-2027.html', 'lich-nghi-tet-2027.html']) {
    const html = read(file);
    const canonical = `https://saptet.vn/${file}`;

    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}"`));
    assert.doesNotMatch(html, /<meta http-equiv="refresh"/i);
    assert.doesNotMatch(html, /<meta name="robots" content="noindex/i);
    assert.match(html, /<meta name="robots" content="index, follow"/i);
    assert.doesNotMatch(html, /lich-tet-2026\.html|lich-nghi-tet-2026\.html/);
  }
});

test('legacy 2026 Tet calendar URLs redirect to 2027 and are not in the sitemap', () => {
  const legacyTargets = {
    'lich-tet-2026.html': 'lich-tet-2027.html',
    'lich-nghi-tet-2026.html': 'lich-nghi-tet-2027.html',
  };

  for (const [legacyFile, targetFile] of Object.entries(legacyTargets)) {
    const html = read(legacyFile);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://saptet.vn/${targetFile}"`));
    assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0;url=${targetFile}"`));
    assert.match(html, /<meta name="robots" content="noindex, follow"/i);
  }

  const sitemap = read('sitemap.xml');
  assert.match(sitemap, /https:\/\/saptet\.vn\/lich-tet-2027\.html/);
  assert.match(sitemap, /https:\/\/saptet\.vn\/lich-nghi-tet-2027\.html/);
  assert.doesNotMatch(sitemap, /https:\/\/saptet\.vn\/lich-tet-2026\.html/);
  assert.doesNotMatch(sitemap, /https:\/\/saptet\.vn\/lich-nghi-tet-2026\.html/);
});

test('sitemap URLs match page canonical URLs for primary landing pages', () => {
  const intentHtml = read('con-bao-nhieu-ngay-nua-den-tet/index.html');
  const legacyHtml = read('con-bao-lau-nua-den-tet.html');
  const sitemap = read('sitemap.xml');
  const intentCanonical = 'https://saptet.vn/con-bao-nhieu-ngay-nua-den-tet';
  const legacyCanonical = 'https://saptet.vn/con-bao-lau-nua-den-tet.html';

  assert.match(sitemap, new RegExp(`<loc>${intentCanonical}</loc>`));
  assert.match(intentHtml, new RegExp(`<link rel="canonical" href="${intentCanonical}"`));
  assert.match(sitemap, new RegExp(`<loc>${legacyCanonical}</loc>`));
  assert.match(legacyHtml, new RegExp(`<link rel="canonical" href="${legacyCanonical}"`));
});

test('all sitemap URLs resolve to indexable self-canonical pages', () => {
  const sitemap = read('sitemap.xml');
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

  for (const url of urls) {
    const file = fileForSitemapUrl(url);
    assert.ok(file, `Missing local file for ${url}`);

    const html = read(file);
    assert.doesNotMatch(html, /<meta http-equiv=["']refresh/i, `${url} should not be a refresh page`);
    assert.doesNotMatch(html, /<meta name=["']robots["'][^>]*content=["'][^"']*noindex/i, `${url} should be indexable`);

    const canonical = canonicalFor(html);
    if (canonical) {
      assert.equal(canonical, url, `${url} should self-canonicalize`);
    }
  }
});

test('indexable pages do not link to noindex or permanent redirect URLs', () => {
  const redirectPathnames = permanentRedirectPathnames();

  for (const sourceFile of walkHtmlFiles()) {
    const sourceHtml = read(sourceFile);
    const sourceIsIndexable = !/<meta http-equiv=["']refresh/i.test(sourceHtml)
      && !/<meta name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(sourceHtml);

    if (!sourceIsIndexable) continue;

    const baseHref = sourceHtml.match(/<base[^>]+href=["']([^"']+)/i)?.[1];
    const baseUrl = baseHref ? new URL(baseHref, urlPathForFile(sourceFile)).href : urlPathForFile(sourceFile);
    const links = [...sourceHtml.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map((match) => match[1]);

    for (const link of links) {
      const pathname = pathForInternalUrl(link, baseUrl);
      if (!pathname) continue;

      assert.ok(!redirectPathnames.has(pathname), `${sourceFile} links to redirect URL ${link}`);

      const targetFile = fileForPathname(pathname);
      if (!targetFile) continue;

      const targetHtml = read(targetFile);
      assert.doesNotMatch(
        targetHtml,
        /<meta name=["']robots["'][^>]*content=["'][^"']*noindex/i,
        `${sourceFile} links to noindex page ${link}`,
      );
    }
  }
});

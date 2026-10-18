const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const workerSource = fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8');

function response(body) {
  return { body, status: 200, type: 'basic', clone: () => response(body) };
}

async function loadRequest({ online, pathname, mode = 'navigate', destination = 'document', cachedBody = 'old hero', freshBody = 'fixed hero' }) {
  const oldPage = response(cachedBody);
  const newPage = response(freshBody);
  const writes = [];
  let networkRequests = 0;
  const handlers = {};
  vm.runInNewContext(workerSource, {
    URL,
    console,
    self: {
      location: { origin: 'https://saptet.vn' },
      addEventListener: (name, handler) => { handlers[name] = handler; }
    },
    caches: {
      match: async () => oldPage,
      open: async () => ({ put: async (request, value) => { writes.push({ request: typeof request === 'string' ? request : request.url, body: value.body }); } })
    },
    fetch: async () => {
      networkRequests += 1;
      if (!online) throw new Error('offline');
      return newPage;
    }
  });

  const backgroundWork = [];
  let result;
  handlers.fetch({
    request: { url: `https://saptet.vn${pathname}`, mode, destination },
    respondWith: (promise) => { result = promise; },
    waitUntil: (promise) => { backgroundWork.push(promise); }
  });
  const page = await result;
  await Promise.all(backgroundWork);
  return { body: page.body, networkRequests, writes };
}

test('homepage navigation gets the current page and refreshes an old precache', async () => {
  for (const pathname of ['/', '/index.html']) {
    const result = await loadRequest({ online: true, pathname });
    assert.equal(result.body, 'fixed hero');
    assert.equal(result.networkRequests, 1);
    assert.deepEqual(result.writes, [{ request: pathname, body: 'fixed hero' }]);
  }
});

test('homepage navigation falls back to its cached page while offline', async () => {
  const result = await loadRequest({ online: false, pathname: '/' });
  assert.equal(result.body, 'old hero');
  assert.equal(result.networkRequests, 1);
  assert.deepEqual(result.writes, []);
});

test('home stylesheets bypass an old precache after their versions change', async () => {
  for (const pathname of ['/css/home-preview.css?v=20261019-mobile-hero', '/css/home-retention.css?v=20261019-desktop-home-2']) {
    const result = await loadRequest({
      online: true,
      pathname,
      mode: 'no-cors',
      destination: 'style',
      cachedBody: 'old layout',
      freshBody: 'fixed layout'
    });
    assert.equal(result.body, 'fixed layout');
    assert.equal(result.networkRequests, 1);
    assert.deepEqual(result.writes, [{ request: `https://saptet.vn${pathname}`, body: 'fixed layout' }]);
  }
});

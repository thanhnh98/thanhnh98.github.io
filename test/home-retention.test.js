const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const modulePath = path.join(root, 'js', 'home-retention.js');

function createStorage(seed) {
  const values = new Map(Object.entries(seed || {}));
  return {
    getItem(key) { return values.has(key) ? values.get(key) : null; },
    setItem(key, value) { values.set(key, String(value)); },
  };
}

test('retention module exposes pure state and phase helpers', () => {
  const homeRetention = require(modulePath);
  assert.equal(typeof homeRetention.updateVisitState, 'function');
  assert.equal(typeof homeRetention.getHomePhase, 'function');
  assert.equal(typeof homeRetention.getVietnamDateKey, 'function');
});

test('same Vietnam calendar day only increments streak once', () => {
  const homeRetention = require(modulePath);
  const storage = createStorage();
  const first = homeRetention.updateVisitState(storage, new Date('2026-08-28T01:00:00Z'));
  const second = homeRetention.updateVisitState(storage, new Date('2026-08-28T14:00:00Z'));

  assert.equal(first.state.visitStreak, 1);
  assert.equal(second.state.visitStreak, 1);
  assert.equal(second.isNewVisitDay, false);
});

test('consecutive visits increment streak across a year boundary', () => {
  const homeRetention = require(modulePath);
  const storage = createStorage();

  homeRetention.updateVisitState(storage, new Date('2026-12-30T18:00:00Z'));
  const next = homeRetention.updateVisitState(storage, new Date('2026-12-31T18:00:00Z'));

  assert.equal(next.state.lastVisitDate, '2027-01-01');
  assert.equal(next.state.visitStreak, 2);
  assert.equal(next.isReturningVisit, true);
});

test('a missed Vietnam day resets streak to one', () => {
  const homeRetention = require(modulePath);
  const storage = createStorage();

  homeRetention.updateVisitState(storage, new Date('2026-08-27T03:00:00Z'));
  const result = homeRetention.updateVisitState(storage, new Date('2026-08-29T03:00:00Z'));

  assert.equal(result.state.visitStreak, 1);
});

test('storage errors keep the homepage usable without persisted streak', () => {
  const homeRetention = require(modulePath);
  const brokenStorage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };

  const result = homeRetention.updateVisitState(brokenStorage, new Date('2026-08-28T03:00:00Z'));
  assert.equal(result.storageAvailable, false);
  assert.equal(result.state.visitStreak, 1);
});

test('home phase covers discovery, 45-day preparation window and Tet days', () => {
  const homeRetention = require(modulePath);

  assert.equal(homeRetention.getHomePhase(new Date('2026-08-28T03:00:00Z')), 'discovery');
  assert.equal(homeRetention.getHomePhase(new Date('2027-01-15T03:00:00Z')), 'preparation');
  assert.equal(homeRetention.getHomePhase(new Date('2027-02-06T03:00:00Z')), 'tet');
  assert.equal(homeRetention.getHomePhase(new Date('2027-02-12T03:00:00Z')), 'tet');
  assert.equal(homeRetention.getHomePhase(new Date('2027-02-13T03:00:00Z')), 'discovery');
});

test('smart app platform detection covers Android, iOS, iPadOS and web', () => {
  const homeRetention = require(modulePath);

  assert.equal(homeRetention.detectAppPlatform({ userAgent: 'Mozilla/5.0 (Linux; Android 15; Pixel 9)' }), 'android');
  assert.equal(homeRetention.detectAppPlatform({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)' }), 'ios');
  assert.equal(homeRetention.detectAppPlatform({ userAgent: 'Mozilla/5.0', platform: 'MacIntel', maxTouchPoints: 5 }), 'ios');
  assert.equal(homeRetention.detectAppPlatform({ userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)', platform: 'MacIntel', maxTouchPoints: 0 }), 'web');
});

test('homepage analytics events are wired exactly once in the retention module', () => {
  const script = fs.readFileSync(modulePath, 'utf8');
  for (const eventName of [
    'home_return_visit',
    'home_daily_card_view',
    'home_daily_action_complete',
    'home_quick_link_click',
    'home_discovery_click',
  ]) {
    assert.equal((script.match(new RegExp(`trackEvent\\('${eventName}'`, 'g')) || []).length, 1, eventName);
  }
});

test('html2canvas is only referenced by the lazy share loader', () => {
  const script = fs.readFileSync(modulePath, 'utf8');
  assert.match(script, /function loadHtml2Canvas/);
  assert.match(script, /document\.createElement\('script'\)/);
  assert.match(script, /html2canvas\.min\.js/);
});

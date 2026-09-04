const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const fireworks = require(path.join(root, 'js', 'home-fireworks.js'));

test('homepage exposes a corner fireworks trigger without an eager canvas', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert.match(html, /id="home-fireworks-trigger"/);
  assert.match(html, /aria-label="Bắn pháo hoa đón Tết"/);
  assert.match(html, /id="home-fireworks-trigger-label"[^>]*>Bấm để bắn pháo hoa</);
  assert.match(html, /id="home-streak"[\s\S]*id="visit-streak"[\s\S]*id="home-fireworks-shot-count"/);
  assert.match(html, /class="home-streak-fireworks-icon"/);
  assert.doesNotMatch(html, /🎆/);
  assert.match(html, /viên mỗi lượt/);
  assert.doesNotMatch(html, /id="home-fireworks-streak-badge"/);
  assert.doesNotMatch(html, /home-fireworks-tooltip/);
  assert.doesNotMatch(html, /<small>ngày<\/small>/);
  assert.match(html, /id="home-fireworks-collection"/);
  assert.match(html, /id="home-fireworks-collection-meter"/);
  assert.match(html, /id="home-fireworks-daily-meter"/);
  assert.match(html, /id="home-fireworks-collection-launch"/);
  assert.match(html, /id="home-fireworks-launch-label">Bắn pháo · 0\/20</);
  assert.match(html, /Mỗi 20 lần bấm sẽ hiện một lời chúc/);
  assert.match(html, /Mỗi ngày mở 1 lời chúc mới/);
  assert.match(html, /src="js\/home-fireworks\.js/);
  assert.doesNotMatch(html, /<canvas[^>]+home-fireworks-canvas/);
});

test('fireworks launch plan creates exactly one rocket per streak day up to twenty', () => {
  let seed = 0;
  const values = [.4, .2, .7, .35, .8, .1, .6, .9, .3, .5];
  const plan = fireworks.createLaunchPlan(1280, 720, () => values[(seed++) % values.length], 14);
  assert.equal(plan.length, 14);
  plan.forEach((rocket, index) => {
    assert.ok(rocket.startX >= 24 && rocket.startX <= 1256);
    assert.ok(rocket.targetX >= 128 && rocket.targetX <= 1152);
    assert.ok(rocket.targetY >= 720 * .14 && rocket.targetY <= 720 * .55);
    assert.ok(rocket.delay >= index * 135 && rocket.delay <= index * 135 + 55);
    assert.match(rocket.color, /^#[0-9a-f]{6}$/i);
  });
  assert.equal(fireworks.createLaunchPlan(1280, 720, () => .5, 99).length, 20);
  assert.equal(fireworks.createLaunchPlan(1280, 720, () => .5, 0).length, 1);
});

test('daily reward uses a signature rocket across a wider safe range', () => {
  const rocket = fireworks.createSignatureRocket(1280, 720, () => .5);
  assert.equal(rocket.signature, true);
  assert.ok(rocket.targetX >= 1280 * .28 && rocket.targetX <= 1280 * .72);
  assert.ok(rocket.targetY >= 720 * .18 && rocket.targetY <= 720 * .52);
});

test('daily wish target is randomly selected from thirty through one hundred rockets', () => {
  assert.equal(fireworks.createDailyTarget(() => 0), 30);
  assert.equal(fireworks.createDailyTarget(() => .5), 65);
  assert.equal(fireworks.createDailyTarget(() => 1), 100);
});

test('daily wish progress grants only one reward after reaching the hidden target', () => {
  const initial = { version: 1, dateKey: '2026-09-03', target: 60, rocketsFired: 42, rewardClaimed: false, messageId: '' };
  const waiting = fireworks.advanceDailyRewardState(initial, 17);
  assert.equal(waiting.state.rocketsFired, 59);
  assert.equal(waiting.rewardReached, false);
  const rewarded = fireworks.advanceDailyRewardState(waiting.state, 3);
  assert.equal(rewarded.state.rocketsFired, 60);
  assert.equal(rewarded.state.rewardClaimed, true);
  assert.equal(rewarded.rewardReached, true);
  const repeated = fireworks.advanceDailyRewardState(rewarded.state, 20);
  assert.equal(repeated.state.rocketsFired, 60);
  assert.equal(repeated.rewardReached, false);
});

test('daily wish state persists on the same Vietnam day and resets the next day', () => {
  const firstDay = new Date('2026-09-03T12:00:00+07:00');
  const nextDay = new Date('2026-09-04T00:01:00+07:00');
  const existing = { version: 1, dateKey: '2026-09-03', target: 77, rocketsFired: 44, rewardClaimed: true, messageId: 'sap-tet' };
  const migrated = { ...existing, messageId: 'tet-vui-nhu-hoi' };
  assert.deepEqual(fireworks.normalizeDailyRewardState(existing, firstDay, () => 0), migrated);
  assert.deepEqual(fireworks.normalizeDailyRewardState(existing, nextDay, () => 0), {
    version: 1,
    dateKey: '2026-09-04',
    target: 30,
    rocketsFired: 0,
    rewardClaimed: false,
    messageId: ''
  });
  const values = new Map();
  const storage = {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); }
  };
  fireworks.saveDailyRewardState(storage, existing);
  assert.deepEqual(fireworks.readDailyRewardState(storage, firstDay, () => 0), migrated);
});

test('collectible wishes stay unique and exclude ambient firework text', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  const messages = fireworks.getSignatureMessages(now);
  assert.equal(fireworks.getDaysUntilTet(now), 161);
  assert.equal(messages.length, 64);
  assert.equal(new Set(messages.map((item) => item.id)).size, messages.length);
  assert.equal(new Set(messages.map((item) => item.text)).size, messages.length);
  assert.equal(fireworks.createSignatureMessage(() => 0, now), 'Tết Vui Như Hội');
  assert.equal(fireworks.createSignatureMessage(() => 1 / messages.length, now), 'Lộc Đỏ Cả Năm');
  assert.equal(fireworks.createSignatureMessage(() => 2 / messages.length, now), 'Sum Vầy Đón Xuân');
  assert.ok(messages.some((item) => item.text === 'Phúc Lộc Đầy Nhà'));
  assert.ok(messages.some((item) => item.text === 'Đón Xuân Bình An'));
  assert.ok(!messages.some((item) => item.special));
  assert.ok(!messages.some((item) => item.text === 'Happy New Year'));
});

test('special firework text includes the live Tet countdown and fixed greetings', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  assert.deepEqual(fireworks.getSpecialFireworkMessages(now).map((item) => item.text), [
    'Còn 161 ngày nữa đến Tết',
    'Sắp Tết 2027',
    'Happy New Year',
    'Chúc Mừng Năm Mới'
  ]);
});

test('signature selection prioritizes wishes that are not unlocked yet', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  const messages = fireworks.getSignatureMessages(now);
  assert.equal(fireworks.createSignatureSelection(() => 0, now, [messages[0].id]).id, messages[1].id);
  assert.equal(fireworks.createSignatureSelection(() => 0, now, messages.map((message) => message.id)).id, messages[0].id);
});

test('regular launches only randomize wishes already in the collection', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  const messages = fireworks.getSignatureMessages(now);
  assert.equal(fireworks.createUnlockedSignatureSelection(() => 0, now, []), null);
  assert.equal(fireworks.createUnlockedSignatureSelection(() => 0, now, [messages[4].id, messages[8].id]).id, messages[4].id);
  assert.equal(fireworks.createUnlockedSignatureSelection(() => .999, now, [messages[4].id, messages[8].id]).id, messages[8].id);
});

test('twentieth click chooses special text or an unlocked wish with a fifty-fifty split', () => {
  const now = new Date('2026-08-28T12:00:00+07:00');
  const messages = fireworks.getSignatureMessages(now);
  const sequence = (values) => {
    let index = 0;
    return () => values[index++];
  };
  assert.equal(fireworks.createFireworkDisplaySelection(sequence([.49, .99]), now, [messages[0].id]).text, 'Chúc Mừng Năm Mới');
  assert.equal(fireworks.createFireworkDisplaySelection(sequence([.5, 0]), now, [messages[4].id]).id, messages[4].id);
  assert.equal(fireworks.createFireworkDisplaySelection(() => .5, now, []).text, 'Happy New Year');
});

test('an owned wish is replayed once every twenty fireworks clicks', () => {
  assert.deepEqual(fireworks.advanceWishReplayCounter(0), { clicksSinceWish: 1, wishReached: false });
  assert.deepEqual(fireworks.advanceWishReplayCounter(18), { clicksSinceWish: 19, wishReached: false });
  assert.deepEqual(fireworks.advanceWishReplayCounter(19), { clicksSinceWish: 0, wishReached: true });
  assert.deepEqual(fireworks.advanceWishReplayCounter(99), { clicksSinceWish: 0, wishReached: true });
});

test('collection state hides invalid entries, deduplicates, and persists new unlocks', () => {
  const normalized = fireworks.normalizeCollectionState({ unlockedIds: ['sap-tet', 'sap-tet', 'khong-ton-tai'] });
  assert.deepEqual(normalized, { version: 1, unlockedIds: ['tet-vui-nhu-hoi'], clicksSinceWish: 0, launcherHintSeen: false });
  const unlocked = fireworks.unlockCollectionItem(normalized, 'van-su-nhu-y');
  assert.equal(unlocked.newlyUnlocked, true);
  assert.deepEqual(unlocked.state, { version: 1, unlockedIds: ['tet-vui-nhu-hoi', 'van-su-nhu-y'], clicksSinceWish: 0, launcherHintSeen: false });
  assert.equal(fireworks.unlockCollectionItem(unlocked.state, 'van-su-nhu-y').newlyUnlocked, false);

  const values = new Map();
  const storage = {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); }
  };
  fireworks.saveCollectionState(storage, unlocked.state);
  assert.deepEqual(fireworks.readCollectionState(storage), unlocked.state);
});

test('collection migration preserves legacy unlocks and launcher discovery state', () => {
  const state = fireworks.normalizeCollectionState({
    unlockedIds: ['sap-tet', 'tet-countdown', 'happy-new-year'],
    clicksSinceWish: 7,
    launcherHintSeen: true
  });
  assert.deepEqual(state, {
    version: 1,
    unlockedIds: ['tet-vui-nhu-hoi', 'loc-do-ca-nam', 'sum-vay-don-xuan'],
    clicksSinceWish: 7,
    launcherHintSeen: true
  });
});

test('collection UI exposes inline launch and live progress without masked placeholders', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const script = fs.readFileSync(path.join(root, 'js', 'home-fireworks.js'), 'utf8');
  assert.match(html, /id="home-fireworks-mission-copy"/);
  assert.match(html, /id="home-fireworks-featured"/);
  assert.match(script, /home-fireworks-daily-count/);
  assert.match(script, /home-fireworks-collection-meter/);
  assert.match(script, /launchAndTrack\('collection_card'\)/);
  assert.match(script, /home_fireworks_wish_replay/);
  assert.match(script, /doc\.createElement\(isUnlocked \? 'button' : 'span'\)/);
  assert.match(html, /id="home-fireworks-reward-modal"/);
  assert.match(html, /role="dialog" aria-modal="true"/);
  assert.match(html, /id="home-fireworks-reward-close"/);
  assert.match(script, /rewardClose\.addEventListener\('click', closeRewardCelebration\)/);
  assert.doesNotMatch(script, /rewardModal\.addEventListener\('click'/);
  assert.match(script, /mỗi ngày lại có một lời chúc mới chờ bạn khám phá/);
  assert.match(script, /todayMessage \? todayMessage\.text : 'Đã mở khóa thành công'/);
  assert.match(script, /todayMessage \? 'Lời chúc hôm nay' : 'Lời chúc nổi bật'/);
  assert.match(script, /daily_reward_unlocked/);
  assert.match(script, /createFireworkDisplaySelection\(Math\.random, nowDate, collectionState\.unlockedIds\)/);
  assert.match(script, /action \+ ' · ' \+ clicks \+ '\/20'/);
  assert.match(script, /Lời chúc đã xuất hiện!/);
  assert.match(script, /launcherHintSeen/);
  assert.match(script, /classList\.add\('has-launched'\)/);
  assert.match(script, /5000/);
  assert.match(script, /if \(!modal \|\| !message \|\| !newlyUnlocked\) return/);
  assert.doesNotMatch(html, /combo/i);
  assert.doesNotMatch(script, /advanceCombo|COMBO_RESET_MS/);
  assert.doesNotMatch(script, /••••••/);
});

test('unlocked wish cards have four collectible visual variants and a spotlight', () => {
  const css = fs.readFileSync(path.join(root, 'css', 'home-retention.css'), 'utf8');
  for (const variant of ['0', '1', '2', '3']) {
    assert.match(css, new RegExp(`home-fireworks-collection-item\\.is-unlocked\\[data-variant="${variant}"\\]`));
    assert.match(css, new RegExp(`home-fireworks-featured\\.is-revealed\\[data-variant="${variant}"\\]`));
  }
});

test('streak reward caps each click at twenty rockets', () => {
  const reward = fireworks.getStreakReward(25);
  assert.equal(reward.streak, 25);
  assert.equal(reward.rockets, 20);
  assert.equal(reward.tier.key, 'royal');
  assert.equal('canLaunch' in reward, false);
});

test('rapid clicks create independent launch plans that stack their rocket counts', () => {
  assert.equal(Array.from({ length: 3 }, () => fireworks.createLaunchPlan(1280, 720, () => .5, 1)).flat().length, 3);
  assert.equal(Array.from({ length: 2 }, () => fireworks.createLaunchPlan(1280, 720, () => .5, 2)).flat().length, 4);
  assert.equal(Array.from({ length: 2 }, () => fireworks.createLaunchPlan(1280, 720, () => .5, 20)).flat().length, 40);
});

test('firework icon upgrades across five Tet VIP tiers', () => {
  assert.equal(fireworks.getRewardTier(1).key, 'scarlet');
  assert.equal(fireworks.getRewardTier(3).key, 'silver');
  assert.equal(fireworks.getRewardTier(7).key, 'gold');
  assert.equal(fireworks.getRewardTier(14).key, 'jade');
  assert.equal(fireworks.getRewardTier(20).key, 'royal');
  const css = fs.readFileSync(path.join(root, 'css', 'home-retention.css'), 'utf8');
  ['silver', 'gold', 'jade', 'royal'].forEach((tier) => assert.match(css, new RegExp(`data-tier="${tier}"`)));
});

test('fireworks styles keep the canvas non-interactive and respect reduced motion', () => {
  const css = fs.readFileSync(path.join(root, 'css', 'home-retention.css'), 'utf8');
  assert.match(css, /\.home-fireworks-canvas[\s\S]*?pointer-events:\s*none/);
  assert.match(css, /\.home-fireworks-trigger[\s\S]*?position:\s*fixed/);
  assert.match(css, /\.home-fireworks-trigger\.is-discovering/);
  assert.doesNotMatch(css, /\.home-fireworks-trigger:not\(\.has-launched\):hover/);
  assert.doesNotMatch(css, /home-fireworks-discovery-ring/);
  assert.match(css, /@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?home-fireworks-trigger/);
});

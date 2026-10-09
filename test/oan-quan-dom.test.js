const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('page exposes crawlable metadata and accessible game controls', () => {
  const html = read('o-an-quan.html');
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(html, /canonical" href="https:\/\/saptet\.vn\/o-an-quan\.html/);
  assert.match(html, /"@type":"VideoGame"/);
  assert.equal((html.match(/data-pit="/g) || []).length, 12);
  assert.match(html, /role="status" aria-live="polite"/);
  assert.match(html, /<details class="oaq-rules-crawlable">/);
  assert.match(html, /<section id="start-screen" class="oaq-start-screen"/);
  assert.doesNotMatch(html, /<dialog id="start-dialog"/);
  assert.match(html, /data-phase="idle" data-mode="bot"/);
});

test('game-first layout separates controls from the centered scoreboard', () => {
  const html = read('o-an-quan.html');
  const hud = html.slice(html.indexOf('<header class="oaq-hud">'), html.indexOf('</header>'));
  const order = ['id="oaq-exit"', 'class="oaq-hud-brand"', 'class="oaq-tools"'];
  order.reduce((previous, marker) => {
    const index = hud.indexOf(marker);
    assert.ok(index > previous, `${marker} should follow the iOS HUD order`);
    return index;
  }, -1);
  const scoreboard = html.slice(html.indexOf('<div class="oaq-scoreboard"'), html.indexOf('<section class="oaq-stage"'));
  assert.ok(scoreboard.indexOf('data-player="1"') < scoreboard.indexOf('id="oaq-time"'));
  assert.ok(scoreboard.indexOf('id="oaq-time"') < scoreboard.indexOf('data-player="0"'));
  assert.match(html, /data-direction="-1" aria-label="Rải sang trái"/);
  assert.match(html, /data-direction="1" aria-label="Rải sang phải"/);
  assert.match(html, /id="hand-badge"/);
  assert.match(hud, /class="oaq-site-brand"/);
  assert.match(hud, /assets\/images\/ic_app-208\.webp/);
  assert.equal((scoreboard.match(/class="oaq-captured"/g) || []).length, 2);
  for (const id of ['north-dan', 'north-quan', 'south-dan', 'south-quan']) assert.match(scoreboard, new RegExp(`id="${id}"`));
});

test('waiting screen exposes a working game share action', () => {
  const html = read('o-an-quan.html');
  const game = read('js/oan-quan-game.js');
  assert.match(html, /id="start-share"/);
  assert.match(game, /navigator\.share/);
  assert.match(game, /https:\/\/saptet\.vn\/o-an-quan\.html/);
});

test('page exposes local match history and natural SEO content', () => {
  const html = read('o-an-quan.html');
  const game = read('js/oan-quan-game.js');
  assert.match(html, /id="start-history"/);
  assert.match(html, /<dialog id="history-dialog"/);
  assert.match(html, /id="history-list"/);
  assert.match(game, /storage\.recordHistory/);
  assert.match(game, /storage\.loadHistory/);
  assert.match(html, /class="oaq-seo-section"/);
  for (const keyword of ['Trò chơi tuổi thơ', 'Game tuổi thơ', 'Ô Ăn Quan']) assert.match(html, new RegExp(keyword, 'i'));
});

test('active matches require confirmation before exiting or leaving the page', () => {
  const html = read('o-an-quan.html');
  const game = read('js/oan-quan-game.js');
  assert.match(html, /<dialog id="exit-dialog"/);
  assert.match(html, /id="confirm-exit"/);
  assert.match(game, /function requestExit\(\)/);
  assert.match(game, /addEventListener\('beforeunload'/);
  assert.match(game, /\['idle', 'gameOver'\]\.includes\(state\.phase\)/);
});

test('browser back returns an active match to the waiting screen first', () => {
  const game = read('js/oan-quan-game.js');
  const navigation = read('js/navigation.js');
  assert.match(game, /history\.pushState/);
  assert.match(game, /addEventListener\('popstate'/);
  assert.match(game, /function returnToWaiting\(\)/);
  assert.match(game, /history\.back\(\)/);
  assert.match(game, /showDialog\(\$\('#exit-dialog'\)\)/);
  assert.match(game, /allowHistoryExit/);
  assert.match(navigation, /'\/o-an-quan':\s*'o-an-quan'/);
});

test('responsive CSS reserves touch targets and a fixed board ratio', () => {
  const css = read('css/o-an-quan.css');
  assert.match(css, /--oaq-board-ratio:\s*3\.15/);
  assert.match(css, /\.oaq-tools[^}]*justify-self:\s*end/);
  assert.match(css, /min-width:\s*44px;\s*min-height:\s*44px/);
  assert.match(css, /\.oaq-page\.oaq-playing #header-container/);
  assert.match(css, /orientation:\s*landscape/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
});

test('sowing uses a canvas landing ripple without flashing the whole pit', () => {
  const html = read('o-an-quan.html');
  const css = read('css/o-an-quan.css');
  const game = read('js/oan-quan-game.js');
  assert.match(html, /<canvas id="oaq-flight-canvas" class="oaq-flight-canvas"/);
  assert.doesNotMatch(css, /\.oaq-pit\.is-drop/);
  assert.doesNotMatch(game, /pulsePit\(extra\.landingPit, 'is-drop'/);
  assert.match(game, /landingRipple\(extra\.landingPit/);
  assert.match(game, /setPlaybackRate\(rate\)/);
  assert.match(game, /snapToEnd\(\)/);
  assert.match(game, /boardWrap\.addEventListener\('pointerdown'/);
  assert.doesNotMatch(game, /outer\.height \+ 18/);
  assert.match(game, /const base = Math\.max\(8, p\.to\.size \* \.12\)/);
  assert.match(css, /animation: oaq-combo 2\.5s both/);
  assert.match(css, /80%\s*\{\s*opacity:\s*1/);
  assert.match(game, /next\.turnBanner !== previousTurnBanner/);
  assert.match(game, /reducedMotion \? 2000 : 2520/);
  assert.match(css, /\.oaq-count[^}]*color:\s*#713526[^}]*background:\s*transparent/);
});

test('pure modules load before the DOM controller', () => {
  const html = read('o-an-quan.html');
  for (const module of ['engine', 'bot', 'storage', 'animator', 'match']) {
    assert.ok(html.indexOf(`oan-quan-${module}.js`) < html.indexOf('oan-quan-game.js'));
  }
});

test('all mobile gameplay assets and generated web artwork exist', () => {
  const assets = [
    'background.jpg', 'mandarin.png', 'stone-01.png', 'stone-02.png', 'stone-03.png',
    'stone-jade.png', 'stone-coral.png', 'stone-gold.png', 'stone-turquoise.png',
    'stone-lavender.png', 'stone-ivory.png',
    'level-easy.png', 'level-medium.png', 'level-hard.png', 'result-loss.png',
    'result-win.png', 'result-draw.png', 'cover.webp', 'decor-overlay.png',
  ];
  assets.forEach((name) => assert.ok(fs.statSync(path.join(root, 'assets/images/o-an-quan', name)).size > 1000, name));
  for (const name of ['oan_quan_music.mp3', 'oan_quan_pick_up.mp3', 'oan_quan_capture_quan.mp3', 'oan_quan_combo_6.mp3']) {
    assert.ok(fs.statSync(path.join(root, 'assets/sounds/o-an-quan', name)).size > 1000, name);
  }
});

test('"Chơi online" opens a popup that sends the player to the Sắp Tết app', () => {
  const html = read('o-an-quan.html');
  const buttons = html.slice(html.indexOf('<div class="oaq-start-buttons">'), html.indexOf('<div class="oaq-start-links">'));
  assert.match(buttons, /<button id="open-online" class="oaq-secondary" type="button">/);
  const dialog = html.slice(html.indexOf('<dialog id="online-dialog"'), html.indexOf('</dialog>', html.indexOf('<dialog id="online-dialog"')));
  assert.ok(dialog.length > 0, 'online dialog exists');
  const links = [...dialog.matchAll(/<a class="oaq-store-link" data-store="(\w+)" href="([^"]+)" target="_blank" rel="([^"]+)">/g)];
  assert.deepEqual(links.map((m) => m[1]), ['play', 'appstore']);
  assert.equal(links[0][2], 'https://play.google.com/store/apps/details?id=com.thanh_nguyen.tet_count_down');
  assert.match(links[1][2], /^https:\/\/apps\.apple\.com\/.*id6743064990/);
  links.forEach((m) => assert.match(m[3], /\bnoopener\b/));
  for (const icon of ['google_play.png', 'apple_store.png']) assert.ok(fs.existsSync(path.join(root, 'assets/images', icon)), icon);
  const js = read('js/oan-quan-game.js');
  assert.match(js, /\$\('#open-online'\)\.addEventListener\('click'/);
  assert.match(js, /\$\('#online-dialog'\)\.addEventListener\('close'/);
  assert.match(js, /track\('online_app_prompt'\)/);
});

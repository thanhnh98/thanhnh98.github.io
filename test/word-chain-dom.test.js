const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('word game has one crawlable title and no duplicated promo sections', () => {
  const html = read('tro-choi-tet.html');

  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.doesNotMatch(html, /game-hero|games-overview|game-section-header/);
  assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/tro-choi-tet\.html">/);
  assert.match(html, /"@type": "Game"/);
  assert.match(html, /<details class="game-rules">[\s\S]*Luật chơi Nối Chữ/);
});

test('word game exposes compact HUD, locked prefix and accessible dialogs', () => {
  const html = read('tro-choi-tet.html');

  assert.equal((html.match(/class="hud-item(?: [^"]+)?"/g) || []).length, 4);
  assert.match(html, /id="required-prefix" class="required-prefix"/);
  assert.match(html, /id="game-feedback"[^>]+role="status"[^>]+aria-live="polite"/);
  assert.match(html, /<dialog id="history-dialog"[^>]+aria-labelledby="history-title"/);
  assert.match(html, /<dialog id="result-dialog"[^>]+aria-labelledby="result-title"/);
  assert.match(html, /id="result-reset"[\s\S]*Chơi lại/);
  assert.match(html, /id="result-chain"[\s\S]*Xem chuỗi từ/);
});

test('sound is non-blocking and gameplay modules load before the controller', () => {
  const html = read('tro-choi-tet.html');
  const controller = read('js/word-chain-game.js');

  assert.doesNotMatch(html, /sound-notification|enable-sound|dont-ask-again/);
  assert.doesNotMatch(controller, /wordChainSoundNotificationShown/);
  assert.ok(html.indexOf('js/word-chain-engine.js') < html.indexOf('js/word-chain-game.js'));
  assert.ok(html.indexOf('js/word-chain-storage.js') < html.indexOf('js/word-chain-game.js'));
  assert.match(controller, /track\('start'\)/);
  assert.match(controller, /track\('hint'/);
  assert.match(controller, /track\('complete'/);
});

test('homepage and game share the same brand token source', () => {
  const colors = read('css/colors.css');
  const homepage = read('css/home-retention.css');
  const game = read('css/game.css');

  for (const token of ['red-deep', 'red', 'gold', 'cream', 'ink', 'muted', 'border', 'shadow']) {
    assert.match(colors, new RegExp(`--brand-${token}:`));
  }
  assert.match(homepage, /--home-deep-red:\s*var\(--brand-red-deep\)/);
  assert.match(homepage, /--home-shadow:\s*var\(--brand-shadow\)/);
  assert.match(game, /var\(--brand-red-deep\)/);
  assert.match(game, /var\(--brand-shadow\)/);
  assert.match(game, /@media \(prefers-reduced-motion: reduce\)/);
});

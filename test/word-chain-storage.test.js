const assert = require('node:assert/strict');
const test = require('node:test');

const { createWordChainStorage } = require('../js/word-chain-storage');

function createMemoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

test('reads legacy settings safely and defaults sound to off', () => {
  const empty = createWordChainStorage(createMemoryStorage());
  const enabled = createWordChainStorage(
    createMemoryStorage({ wordChainSoundEnabled: 'true' })
  );
  const corrupt = createWordChainStorage(
    createMemoryStorage({ wordChainGameHistory: '{broken', wordChainHighestScore: 'nope' })
  );

  assert.equal(empty.loadSound(), false);
  assert.equal(enabled.loadSound(), true);
  assert.deepEqual(corrupt.loadHistory(), []);
  assert.equal(corrupt.loadHighScore(), 0);
});

test('keeps at most ten completed games and preserves total duration', () => {
  const storage = createMemoryStorage({
    wordChainGameHistory: JSON.stringify([{ winner: 'player', duration: 12 }]),
  });
  const adapter = createWordChainStorage(storage, () => new Date('2026-08-30T12:00:00+07:00'));

  for (let index = 0; index < 11; index += 1) {
    adapter.saveResult({
      outcome: index % 2 ? 'lost' : 'won',
      reason: 'timeout',
      playerScore: index,
      botScore: 20,
      duration: 70 + index,
      chain: [],
    });
  }

  const history = adapter.loadHistory();
  assert.equal(history.length, 10);
  assert.equal(history[0].duration, 80);
  assert.equal(history[0].winner, 'player');
  assert.equal(history.at(-1).duration, 71);
});

test('updates the all-game high score even when the latest game is lost', () => {
  const storage = createMemoryStorage({ wordChainHighestScore: '30' });
  const adapter = createWordChainStorage(storage);

  assert.equal(adapter.updateHighScore(50), 50);
  assert.equal(adapter.updateHighScore(20), 50);
  assert.equal(adapter.loadHighScore(), 50);
});

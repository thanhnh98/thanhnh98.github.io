const assert = require('node:assert/strict');
const test = require('node:test');

const { HISTORY_LIMIT, createStorage } = require('../js/oan-quan-storage');

function createMemoryStorage(seed = {}) {
  const values = new Map(Object.entries(seed));
  return {
    getItem: (key) => (values.has(key) ? values.get(key) : null),
    setItem: (key, value) => values.set(key, String(value)),
  };
}

test('loads old O An Quan settings with an empty history', () => {
  const adapter = createStorage(createMemoryStorage({
    'sapTet.oAnQuan.v1': JSON.stringify({ sound: false, highestScore: 42 }),
  }));

  assert.equal(adapter.load().sound, false);
  assert.equal(adapter.load().highestScore, 42);
  assert.deepEqual(adapter.loadHistory(), []);
});

test('stores the latest ten completed matches with stable display data', () => {
  let minute = 0;
  const adapter = createStorage(createMemoryStorage(), () => new Date(`2026-10-09T08:${String(minute++).padStart(2, '0')}:00+07:00`));

  for (let index = 0; index < HISTORY_LIMIT + 2; index += 1) {
    adapter.recordHistory({
      mode: index % 2 ? 'friend' : 'bot', level: 'hard', outcome: 'win', winner: 0,
      southName: 'An', northName: 'Bình', southScore: index, northScore: 10,
      elapsedMs: 65000, rankScore: 120,
    });
  }

  const history = adapter.loadHistory();
  assert.equal(history.length, HISTORY_LIMIT);
  assert.equal(history[0].southScore, 11);
  assert.equal(history.at(-1).southScore, 2);
  assert.equal(history[0].durationSeconds, 65);
  assert.equal(history[0].southName, 'An');
});

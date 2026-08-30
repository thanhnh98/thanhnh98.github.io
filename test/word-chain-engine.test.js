const assert = require('node:assert/strict');
const test = require('node:test');

const { createWordChainEngine, normalizeDictionary } = require('../js/word-chain-engine');

function createScheduler() {
  let nextId = 1;
  let now = 0;
  const intervals = new Map();
  const timeouts = new Map();
  return {
    now: () => now,
    setIntervalFn(callback) {
      const id = nextId++;
      intervals.set(id, callback);
      return id;
    },
    clearIntervalFn: (id) => intervals.delete(id),
    setTimeoutFn(callback) {
      const id = nextId++;
      timeouts.set(id, callback);
      return id;
    },
    clearTimeoutFn: (id) => timeouts.delete(id),
    tick(seconds = 1) {
      for (let count = 0; count < seconds; count += 1) {
        now += 1000;
        [...intervals.values()].forEach((callback) => callback());
      }
    },
    runBot() {
      const jobs = [...timeouts.values()];
      timeouts.clear();
      jobs.forEach((callback) => callback());
    },
    get pendingBots() {
      return timeouts.size;
    },
  };
}

function createTestEngine(words, overrides = {}) {
  const scheduler = createScheduler();
  const completions = [];
  const engine = createWordChainEngine({
    ...scheduler,
    random: () => 0,
    onComplete: (result) => completions.push(result),
    ...overrides,
  });
  engine.initialize(words);
  return { completions, engine, scheduler };
}

test('normalizes, deduplicates and keeps valid long phrases', () => {
  const longPhrase = 'một cụm từ tiếng việt hợp lệ dài hơn mười ký tự';

  assert.deepEqual(
    normalizeDictionary([
      '  Chúc Mừng  ',
      'chúc mừng',
      'một-từ',
      'đơn',
      longPhrase,
      null,
    ]),
    ['chúc mừng', longPhrase]
  );
});

test('starts immediately and accepts only the editable suffix', () => {
  const engine = createWordChainEngine({
    random: () => 0,
    setIntervalFn: () => 1,
    clearIntervalFn: () => {},
    setTimeoutFn: () => 2,
    clearTimeoutFn: () => {},
  });

  engine.initialize(['mùa xuân', 'xuân sang', 'sang năm']);
  engine.start();

  assert.deepEqual(
    Object.fromEntries(
      Object.entries(engine.getState()).filter(([key]) =>
        ['status', 'requiredToken', 'timeLeft', 'playerScore'].includes(key)
      )
    ),
    { status: 'playerTurn', playerScore: 0, timeLeft: 60, requiredToken: 'xuân' }
  );

  assert.equal(engine.submit('sang').ok, true);
  assert.equal(engine.getState().chain.at(-1).phrase, 'xuân sang');
  assert.equal(engine.getState().playerScore, 10);
  assert.equal(engine.getState().status, 'botTurn');
});

test('does not choose a self-loop with no real continuation as the opening', () => {
  const { engine } = createTestEngine(['ịt ịt', 'mùa xuân', 'xuân sang']);

  engine.start();

  assert.equal(engine.getState().chain[0].phrase, 'mùa xuân');
  assert.equal(engine.getState().requiredToken, 'xuân');
});

test('keeps the prefix and clears only the invalid editable answer', () => {
  const { engine } = createTestEngine(['mùa xuân', 'xuân sang', 'sang năm']);
  engine.start();

  assert.equal(engine.submit('không có').ok, false);
  assert.equal(engine.getState().requiredToken, 'xuân');
  assert.equal(engine.getState().mistakesLeft, 2);
  assert.match(engine.getState().feedback, /chưa có trong từ điển/i);
});

test('a hint consumes one use and returns a suffix without submitting it', () => {
  const { engine } = createTestEngine(['mùa xuân', 'xuân sang', 'sang năm']);
  engine.start();
  const chainLength = engine.getState().chain.length;

  assert.deepEqual(engine.useHint(), { ok: true, suffix: 'sang' });
  assert.equal(engine.getState().hintsLeft, 2);
  assert.equal(engine.getState().chain.length, chainLength);
  engine.useHint();
  engine.useHint();
  assert.deepEqual(engine.useHint(), { ok: false, reason: 'no_hints' });
});

test('three invalid answers end the game exactly once', () => {
  const { completions, engine } = createTestEngine(['mùa xuân', 'xuân sang']);
  engine.start();

  engine.submit('sai');
  engine.submit('vẫn sai');
  engine.submit('lại sai');
  engine.submit('lần nữa');

  assert.equal(engine.getState().status, 'lost');
  assert.equal(engine.getState().result.reason, 'mistakes');
  assert.equal(completions.length, 1);
});

test('the player loses once when the active turn reaches zero', () => {
  const { completions, engine, scheduler } = createTestEngine(['mùa xuân', 'xuân sang']);
  engine.start();

  scheduler.tick(60);
  scheduler.tick(2);

  assert.equal(engine.getState().status, 'lost');
  assert.equal(engine.getState().result.reason, 'timeout');
  assert.equal(completions.length, 1);
});

test('the player wins after playing a phrase with no bot continuation', () => {
  const { engine } = createTestEngine(['mùa xuân', 'xuân sang']);
  engine.start();

  assert.deepEqual(engine.submit('sang'), { ok: true, outcome: 'won' });
  assert.equal(engine.getState().status, 'won');
  assert.equal(engine.getState().result.reason, 'bot_no_word');
});

test('the bot wins immediately after playing a terminal phrase', () => {
  const { engine, scheduler } = createTestEngine(['mùa xuân', 'xuân sang', 'sang năm']);
  engine.start();
  engine.submit('sang');

  scheduler.runBot();

  assert.equal(engine.getState().status, 'lost');
  assert.equal(engine.getState().result.reason, 'bot_terminal_word');
  assert.equal(engine.getState().chain.at(-1).phrase, 'sang năm');
});

test('rejects a phrase that already appears in the chain', () => {
  const { engine, scheduler } = createTestEngine(['a b', 'b c', 'c a', 'a d']);
  engine.start();
  engine.submit('c');
  scheduler.runBot();

  assert.equal(engine.getState().requiredToken, 'a');
  assert.deepEqual(engine.submit('b'), { ok: false, reason: 'duplicate' });
  assert.equal(engine.getState().mistakesLeft, 2);
});

test('reset cancels a pending bot callback from the previous game', () => {
  const { engine, scheduler } = createTestEngine([
    'mùa xuân',
    'xuân sang',
    'sang năm',
    'năm mới',
  ]);
  engine.start();
  engine.submit('sang');
  assert.equal(scheduler.pendingBots, 1);

  engine.reset();
  scheduler.runBot();

  assert.equal(engine.getState().status, 'ready');
  assert.equal(engine.getState().chain.length, 0);
  assert.equal(scheduler.pendingBots, 0);
});

test('pause and resume preserve the remaining player time', () => {
  const { engine, scheduler } = createTestEngine(['mùa xuân', 'xuân sang']);
  engine.start();
  scheduler.tick(4);
  engine.pause();
  scheduler.tick(5);

  assert.equal(engine.getState().status, 'paused');
  assert.equal(engine.getState().timeLeft, 56);
  engine.resume();
  scheduler.tick();
  assert.equal(engine.getState().timeLeft, 55);
});

test('result duration is the real elapsed time for the whole game', () => {
  const { engine, scheduler } = createTestEngine(['mùa xuân', 'xuân sang']);
  engine.start();
  scheduler.tick(7);
  engine.submit('sang');

  assert.equal(engine.getState().result.duration, 7);
});

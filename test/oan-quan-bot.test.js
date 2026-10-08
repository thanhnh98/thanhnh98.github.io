const assert = require('node:assert/strict');
const test = require('node:test');
const E = require('../js/oan-quan-engine');
const B = require('../js/oan-quan-bot');

test('every bot level returns a legal move', () => {
  for (const level of ['easy', 'medium', 'hard']) {
    const bot = B.createBot(level, { seed: 19, difficulty: level === 'hard' ? { maxDepth: 5, timeBudgetMs: 80 } : {} });
    const game = E.createState();
    const move = bot.chooseMove(game);
    assert.ok(E.legalMoves(game).some((legal) => legal.pit === move.pit && legal.direction === move.direction));
  }
});

test('seeded easy bots are reproducible', () => {
  const first = B.createBot('easy', { seed: 42 }).chooseMove(E.createState());
  const second = B.createBot('easy', { seed: 42 }).chooseMove(E.createState());
  assert.deepEqual(first, second);
});

test('search bot sees an immediate quan capture', () => {
  const game = E.createState({ board: E.createBoard({ pits: [0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 0, 0] }) });
  const bot = B.createBot('medium', { seed: 1, difficulty: { timeBudgetMs: 100 } });
  const move = bot.chooseMove(game);
  const result = E.applyMove(game, move);
  assert.ok(result.state.board.storeQuan[0] > 0 || E.score(result.state, E.Player.SOUTH) >= 10);
});

test('hard bot respects a practical deadline', () => {
  const bot = B.createBot('hard', { seed: 2, difficulty: { timeBudgetMs: 40 } });
  const started = performance.now();
  bot.chooseMove(E.createState());
  assert.ok(performance.now() - started < 220);
});


const assert = require('node:assert/strict');
const test = require('node:test');
const E = require('../js/oan-quan-engine');

function board(pits, options = {}) {
  return E.createBoard({
    pits,
    quanPresent: (options.q0 === false ? 0 : 1) | (options.q6 === false ? 0 : 2),
    storeDan: [options.storeS || 0, options.storeN || 0],
    storeQuan: [options.quanS || 0, options.quanN || 0],
    debt: options.debt || 0,
    quanCapturedBy: options.quanCapturedBy || [-1, -1],
  });
}
function state(value, toMove = E.Player.SOUTH, rules) { return E.createState({ board: value, toMove, rules }); }
function play(value, pit, direction, toMove, rules) { return E.applyMove(state(value, toMove, rules), { pit, direction }); }
const turnEnd = (result) => result.events.find((event) => event.type === 'turnEnd')?.reason;
const captures = (result) => result.events.filter((event) => event.type === 'capture');

test('initial board and legal moves match mobile', () => {
  const game = E.createState();
  assert.deepEqual(game.board.pits, [0, 5, 5, 5, 5, 5, 0, 5, 5, 5, 5, 5]);
  assert.equal(game.board.quanPresent, 3);
  assert.equal(E.legalMoves(game).length, 10);
});

test('opening pit 5 forward captures the right quan', () => {
  const result = play(E.createBoard(), 5, E.Direction.FORWARD);
  assert.deepEqual(result.state.board.pits, [1, 6, 6, 6, 6, 0, 0, 6, 6, 6, 6, 0]);
  assert.equal(E.hasQuan(result.state.board, 6), false);
  assert.deepEqual(result.state.board.storeDan, [1, 0]);
  assert.deepEqual(result.state.board.storeQuan, [1, 0]);
  assert.equal(E.score(result.state, E.Player.SOUTH), 11);
});

test('opening pit 3 emits the same ordered event sequence', () => {
  const result = play(E.createBoard(), 3, E.Direction.FORWARD);
  assert.deepEqual(result.state.board.pits, [1, 6, 6, 0, 0, 6, 1, 6, 6, 0, 6, 6]);
  assert.deepEqual(result.events.map(({ type, pit }) => [type, pit]), [
    ['pickUp', 3], ['drop', 4], ['drop', 5], ['drop', 6], ['drop', 7], ['drop', 8],
    ['pickUp', 9], ['drop', 10], ['drop', 11], ['drop', 0], ['drop', 1], ['drop', 2],
    ['slap', 3], ['capture', 4], ['turnEnd', undefined],
  ]);
});

test('empty quan pit participates in a chain capture', () => {
  const result = play(board([0, 0, 0, 0, 1, 0, 0, 2, 0, 4, 0, 0], { q6: false }), 4, E.Direction.FORWARD);
  assert.equal(result.state.board.storeDan[0], 6);
  assert.deepEqual(captures(result).map((event) => event.pit), [7, 9]);
  assert.deepEqual(result.events.filter((event) => ['slap', 'capture'].includes(event.type)).map((event) => [event.type, event.pit]), [
    ['slap', 6], ['capture', 7], ['slap', 8], ['capture', 9],
  ]);
});

test('non-empty quan ends a turn while an empty quan acts as empty', () => {
  const stopped = play(board([0, 0, 0, 0, 1, 0, 0, 5, 5, 5, 5, 5]), 4, E.Direction.FORWARD);
  assert.equal(turnEnd(stopped), 'nextIsQuan');
  const empty = play(board([0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0], { q6: false }), 4, E.Direction.FORWARD);
  assert.equal(empty.state.board.storeDan[0], 3);
  assert.equal(turnEnd(empty), 'twoEmpties');
});

test('wrap-around and large hands match mobile vectors', () => {
  const backward = play(board([0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 1, E.Direction.BACKWARD);
  assert.deepEqual(backward.state.board.pits, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1]);
  const large = play(board([0, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), 1, E.Direction.FORWARD);
  assert.deepEqual(large.state.board.pits, [1, 1, 0, 2, 0, 2, 1, 1, 1, 1, 1, 1]);
});

test('borrowing uses own store first and records signed debt', () => {
  const south = state(board([0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4], { storeS: 2, storeN: 9 }));
  assert.equal(south.phase, E.Phase.BORROW);
  const borrowed = E.applyBorrow(south).state;
  assert.deepEqual(borrowed.board.pits.slice(1, 6), [1, 1, 1, 1, 1]);
  assert.deepEqual(borrowed.board.storeDan, [0, 6]);
  assert.equal(borrowed.board.debt, 3);
  const north = E.applyBorrow(state(board([0, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0], { storeS: 9, storeN: 1 }), E.Player.NORTH)).state;
  assert.equal(north.board.debt, -4);
});

test('game ends when a player cannot borrow', () => {
  const game = state(board([0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4], { storeN: 2, quanS: 1 }));
  assert.equal(game.phase, E.Phase.FINISHED);
  assert.equal(E.scoreBreakdown(game, E.Player.SOUTH).total, 10);
  assert.equal(E.scoreBreakdown(game, E.Player.NORTH).total, 22);
  assert.equal(E.winner(game), E.Player.NORTH);
});

test('illegal moves throw', () => {
  const game = E.createState();
  assert.throws(() => E.applyMove(game, { pit: 7, direction: 1 }));
  assert.throws(() => E.applyMove(game, { pit: 0, direction: 1 }));
  assert.throws(() => E.applyBorrow(game));
});

test('quan-non variant blocks a poor quan capture', () => {
  const result = play(E.createBoard(), 5, E.Direction.FORWARD, E.Player.SOUTH, { ...E.DEFAULT_RULES, quanNonMinDan: 5 });
  assert.equal(E.hasQuan(result.state.board, 6), true);
  assert.equal(turnEnd(result), 'quanNon');
});

test('random self-play conserves 50 dân and 2 quan', () => {
  let seed = 7;
  const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
  for (let gameIndex = 0; gameIndex < 40; gameIndex += 1) {
    let game = E.createState();
    let guard = 0;
    while (game.phase !== E.Phase.FINISHED && guard++ < 1000) {
      game = game.phase === E.Phase.BORROW
        ? E.applyBorrow(game).state
        : E.applyMove(game, E.legalMoves(game)[Math.floor(random() * E.legalMoves(game).length)]).state;
      assert.equal(game.board.pits.reduce((sum, value) => sum + value, 0) + game.board.storeDan[0] + game.board.storeDan[1], 50);
      const quanOnBoard = (game.board.quanPresent & 1 ? 1 : 0) + (game.board.quanPresent & 2 ? 1 : 0);
      assert.equal(quanOnBoard + game.board.storeQuan[0] + game.board.storeQuan[1], 2);
    }
    assert.ok(guard < 1000);
  }
});


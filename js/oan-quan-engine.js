(function attachOanQuanEngine(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule() {
  'use strict';

  const Player = Object.freeze({ SOUTH: 0, NORTH: 1 });
  const Direction = Object.freeze({ FORWARD: 1, BACKWARD: -1 });
  const Phase = Object.freeze({ MOVE: 'awaitingMove', BORROW: 'awaitingBorrow', FINISHED: 'finished' });
  const SIZE = 12;
  const QUAN_LEFT = 0;
  const QUAN_RIGHT = 6;
  const BOTH_QUAN = 3;
  const DEFAULT_RULES = Object.freeze({ quanValue: 10, quanNonMinDan: 0, borrowAmount: 5, maxPlies: 400 });

  const opponent = (player) => (player === Player.SOUTH ? Player.NORTH : Player.SOUTH);
  const pitsFor = (player) => (player === Player.SOUTH ? [1, 2, 3, 4, 5] : [7, 8, 9, 10, 11]);
  const owns = (player, pit) => pitsFor(player).includes(pit);
  const isQuanPit = (pit) => pit === QUAN_LEFT || pit === QUAN_RIGHT;
  const quanBit = (pit) => (pit === QUAN_LEFT ? 1 : pit === QUAN_RIGHT ? 2 : 0);
  const quanSlot = (pit) => (pit === QUAN_LEFT ? 0 : 1);
  const nextPit = (pit, direction) => (pit + direction + SIZE) % SIZE;

  function createBoard(overrides = {}) {
    return {
      pits: overrides.pits ? [...overrides.pits] : Array.from({ length: SIZE }, (_, i) => (isQuanPit(i) ? 0 : 5)),
      quanPresent: overrides.quanPresent === undefined ? BOTH_QUAN : overrides.quanPresent,
      storeDan: overrides.storeDan ? [...overrides.storeDan] : [0, 0],
      storeQuan: overrides.storeQuan ? [...overrides.storeQuan] : [0, 0],
      debt: Number(overrides.debt) || 0,
      quanCapturedBy: overrides.quanCapturedBy ? [...overrides.quanCapturedBy] : [-1, -1],
    };
  }

  function cloneBoard(board) { return createBoard(board); }
  function hasQuan(board, pit) { return (board.quanPresent & quanBit(pit)) !== 0; }
  function isEmpty(board, pit) { return board.pits[pit] === 0 && !hasQuan(board, pit); }
  function ownPitsEmpty(board, player) { return pitsFor(player).every((pit) => board.pits[pit] === 0); }
  function bothQuanPitsEmpty(board) {
    return board.quanPresent === 0 && board.pits[QUAN_LEFT] === 0 && board.pits[QUAN_RIGHT] === 0;
  }

  function resolvePhase(board, toMove, ply, rules) {
    if (bothQuanPitsEmpty(board) || ply >= rules.maxPlies) return Phase.FINISHED;
    if (!ownPitsEmpty(board, toMove)) return Phase.MOVE;
    return board.storeDan[0] + board.storeDan[1] < rules.borrowAmount ? Phase.FINISHED : Phase.BORROW;
  }

  function createState(options = {}) {
    const rules = { ...DEFAULT_RULES, ...(options.rules || {}) };
    const board = options.board ? cloneBoard(options.board) : createBoard();
    const toMove = options.toMove === Player.NORTH ? Player.NORTH : Player.SOUTH;
    const ply = Number.isInteger(options.ply) ? options.ply : 0;
    return { board, toMove, ply, rules, phase: resolvePhase(board, toMove, ply, rules) };
  }

  function cloneState(state) {
    return { board: cloneBoard(state.board), toMove: state.toMove, ply: state.ply, rules: { ...state.rules }, phase: state.phase };
  }

  function legalMoves(state) {
    if (state.phase !== Phase.MOVE) return [];
    const moves = [];
    pitsFor(state.toMove).forEach((pit) => {
      if (state.board.pits[pit] > 0) {
        moves.push({ pit, direction: Direction.FORWARD }, { pit, direction: Direction.BACKWARD });
      }
    });
    return moves;
  }

  function sow(board, mover, move, rules, events) {
    let hand = board.pits[move.pit];
    board.pits[move.pit] = 0;
    events.push({ type: 'pickUp', pit: move.pit, count: hand });
    let current = move.pit;

    while (true) {
      while (hand > 0) {
        current = nextPit(current, move.direction);
        board.pits[current] += 1;
        hand -= 1;
        events.push({ type: 'drop', pit: current, handRemaining: hand });
      }

      let n1 = nextPit(current, move.direction);
      if (isQuanPit(n1) && !isEmpty(board, n1)) return 'nextIsQuan';
      if (board.pits[n1] > 0) {
        hand = board.pits[n1];
        board.pits[n1] = 0;
        events.push({ type: 'pickUp', pit: n1, count: hand });
        current = n1;
        continue;
      }

      while (true) {
        const n2 = nextPit(n1, move.direction);
        if (isEmpty(board, n2)) return 'twoEmpties';
        const quan = hasQuan(board, n2);
        if (quan && rules.quanNonMinDan > 0 && board.pits[n2] < rules.quanNonMinDan) return 'quanNon';
        events.push({ type: 'slap', pit: n1 });
        const dan = board.pits[n2];
        board.pits[n2] = 0;
        board.storeDan[mover] += dan;
        if (quan) {
          board.quanPresent &= ~quanBit(n2);
          board.quanCapturedBy[quanSlot(n2)] = mover;
          board.storeQuan[mover] += 1;
        }
        events.push({ type: 'capture', pit: n2, dan, quan, to: mover });
        const n3 = nextPit(n2, move.direction);
        if (!isEmpty(board, n3)) return 'afterCaptureNonEmpty';
        n1 = n3;
      }
    }
  }

  function applyMove(state, move) {
    if (state.phase !== Phase.MOVE) throw new Error(`cannot move in phase ${state.phase}`);
    if (!move || !owns(state.toMove, move.pit)) throw new Error('pit does not belong to mover');
    if (state.board.pits[move.pit] <= 0) throw new Error('pit is empty');
    if (![Direction.FORWARD, Direction.BACKWARD].includes(move.direction)) throw new Error('invalid direction');
    const board = cloneBoard(state.board);
    const events = [];
    const reason = sow(board, state.toMove, move, state.rules, events);
    const toMove = opponent(state.toMove);
    const ply = state.ply + 1;
    const phase = resolvePhase(board, toMove, ply, state.rules);
    events.push({ type: 'turnEnd', reason });
    if (phase === Phase.FINISHED) events.push({ type: 'gameOver' });
    return { state: { board, toMove, ply, rules: { ...state.rules }, phase }, events };
  }

  function applyBorrow(state) {
    if (state.phase !== Phase.BORROW) throw new Error(`cannot borrow in phase ${state.phase}`);
    const board = cloneBoard(state.board);
    const mover = state.toMove;
    const amount = state.rules.borrowAmount;
    const own = Math.min(board.storeDan[mover], amount);
    const fromOpponent = amount - own;
    const events = [];
    board.storeDan[mover] -= own;
    if (own) events.push({ type: 'borrowFromStore', player: mover, count: own });
    if (fromOpponent) {
      board.storeDan[opponent(mover)] -= fromOpponent;
      board.debt += mover === Player.SOUTH ? fromOpponent : -fromOpponent;
      events.push({ type: 'borrowFromOpponent', player: mover, count: fromOpponent });
    }
    pitsFor(mover).forEach((pit, index) => {
      board.pits[pit] += 1;
      events.push({ type: 'drop', pit, handRemaining: amount - index - 1, borrowing: true });
    });
    return {
      state: { board, toMove: mover, ply: state.ply, rules: { ...state.rules }, phase: Phase.MOVE },
      events,
    };
  }

  function score(state, player) {
    return state.board.storeDan[player] + state.rules.quanValue * state.board.storeQuan[player];
  }

  function scoreBreakdown(state, player) {
    const board = state.board;
    let quanPitDan = 0;
    [QUAN_LEFT, QUAN_RIGHT].forEach((pit) => {
      if (board.quanCapturedBy[quanSlot(pit)] === player) quanPitDan += board.pits[pit];
    });
    const rowDan = pitsFor(player).reduce((sum, pit) => sum + board.pits[pit], 0);
    const debt = player === Player.SOUTH ? -board.debt : board.debt;
    const result = {
      danCaptured: board.storeDan[player], quanCaptured: board.storeQuan[player], quanValue: state.rules.quanValue,
      rowDan, quanPitDan, debt,
    };
    result.quanPoints = result.quanCaptured * result.quanValue;
    result.danLeft = rowDan + quanPitDan;
    result.total = result.danCaptured + result.quanPoints + result.danLeft + debt;
    return result;
  }

  function winner(state) {
    const south = scoreBreakdown(state, Player.SOUTH).total;
    const north = scoreBreakdown(state, Player.NORTH).total;
    return south === north ? null : south > north ? Player.SOUTH : Player.NORTH;
  }

  function rankScore({ humanScore, comboPoints = 0, level = 'easy', outcome = 'loss', elapsedMs = 0 }) {
    const levelMultiplier = { easy: 1, medium: 1.5, hard: 2 }[level] || 1;
    const limit = { easy: 360000, medium: 600000, hard: 840000 }[level] || 360000;
    const timeFactor = outcome === 'win' ? 1 + 0.5 * Math.max(0, (limit - elapsedMs) / limit) : 1;
    return Math.round((Math.max(0, humanScore) + Math.max(0, comboPoints)) * levelMultiplier * timeFactor);
  }

  return {
    Player, Direction, Phase, SIZE, QUAN_LEFT, QUAN_RIGHT, DEFAULT_RULES,
    opponent, pitsFor, owns, isQuanPit, nextPit, hasQuan, isEmpty, createBoard, cloneBoard,
    createState, cloneState, resolvePhase, legalMoves, applyMove, applyBorrow, score, scoreBreakdown, winner, rankScore,
  };
});

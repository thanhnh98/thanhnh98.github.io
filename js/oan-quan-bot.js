(function attachOanQuanBot(root, factory) {
  const api = factory(root && root.OanQuanEngine);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanBot = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule(browserEngine) {
  'use strict';

  const Engine = browserEngine || (typeof require === 'function' ? require('./oan-quan-engine') : null);
  const DIFFICULTIES = Object.freeze({
    easy: { maxDepth: 1, timeBudgetMs: 0, randomMoveProbability: 0.4, evalNoise: 3, iterative: false },
    medium: { maxDepth: 4, timeBudgetMs: 300, randomMoveProbability: 0, evalNoise: 0, iterative: true },
    hard: { maxDepth: 10, timeBudgetMs: 800, randomMoveProbability: 0, evalNoise: 0, iterative: true },
  });

  function createRng(seed = Date.now()) {
    let value = Number(seed) >>> 0 || 1;
    return function random() {
      value += 0x6D2B79F5;
      let t = value;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function evaluate(state, pov) {
    if (state.phase === Engine.Phase.FINISHED) {
      const diff = Engine.scoreBreakdown(state, pov).total - Engine.scoreBreakdown(state, Engine.opponent(pov)).total;
      return diff > 0 ? 10000 + diff : diff < 0 ? -10000 + diff : 0;
    }
    const board = state.board;
    const opp = Engine.opponent(pov);
    const debtPov = pov === Engine.Player.SOUTH ? -board.debt : board.debt;
    const debtOpp = -debtPov;
    const store = board.storeDan[pov] + state.rules.quanValue * board.storeQuan[pov] + debtPov;
    const otherStore = board.storeDan[opp] + state.rules.quanValue * board.storeQuan[opp] + debtOpp;
    let side = 0;
    let mobility = 0;
    Engine.pitsFor(pov).forEach((pit) => { side += board.pits[pit]; if (board.pits[pit] > 0) mobility += 1; });
    Engine.pitsFor(opp).forEach((pit) => { side -= board.pits[pit]; if (board.pits[pit] > 0) mobility -= 1; });
    return 2 * (store - otherStore) + side + mobility;
  }

  function readyState(state) {
    let next = state;
    if (next.phase === Engine.Phase.BORROW) next = Engine.applyBorrow(next).state;
    return next;
  }

  function moveKey(move) { return `${move.pit}:${move.direction}`; }
  function stateKey(state, depth) {
    const b = state.board;
    return `${depth}|${state.toMove}|${b.pits.join(',')}|${b.quanPresent}|${b.storeDan}|${b.storeQuan}|${b.debt}|${b.quanCapturedBy}`;
  }

  function createBot(level = 'easy', options = {}) {
    const difficulty = { ...(DIFFICULTIES[level] || DIFFICULTIES.easy), ...(options.difficulty || {}) };
    const random = options.random || createRng(options.seed);
    const now = options.now || (() => (typeof performance !== 'undefined' ? performance.now() : Date.now()));
    let lastSearch = { depth: 0, nodes: 0 };

    function chooseMove(input, controls = {}) {
      const state = readyState(Engine.cloneState(input));
      const legal = Engine.legalMoves(state);
      if (!legal.length) throw new Error('no legal moves');
      if (difficulty.randomMoveProbability && random() < difficulty.randomMoveProbability) {
        lastSearch = { depth: 0, nodes: 0 };
        return legal[Math.floor(random() * legal.length)];
      }

      const started = now();
      const deadline = difficulty.timeBudgetMs > 0 ? started + difficulty.timeBudgetMs : Infinity;
      const cancelled = controls.isCancelled || (() => false);
      const table = new Map();
      let nodes = 0;

      function checkAbort(depth) {
        if (cancelled()) throw new Error('cancelled');
        if (depth > 0 && now() > deadline) throw new Error('deadline');
      }

      function negamax(rawState, depth, alpha, beta) {
        nodes += 1;
        if ((nodes & 127) === 0) checkAbort(depth);
        const current = readyState(rawState);
        if (depth === 0 || current.phase === Engine.Phase.FINISHED) {
          const noise = difficulty.evalNoise ? Math.round((random() * 2 - 1) * difficulty.evalNoise) * 2 : 0;
          return evaluate(current, current.toMove) + noise;
        }
        const key = stateKey(current, depth);
        if (table.has(key)) return table.get(key);
        const moves = Engine.legalMoves(current);
        let best = -Infinity;
        for (const move of moves) {
          const child = Engine.applyMove(current, move).state;
          const score = -negamax(child, depth - 1, -beta, -alpha);
          if (score > best) best = score;
          if (score > alpha) alpha = score;
          if (alpha >= beta) break;
        }
        table.set(key, best);
        return best;
      }

      let bestMove = legal[0];
      let bestScore = -Infinity;
      let completedDepth = 0;
      const firstDepth = difficulty.iterative ? 1 : difficulty.maxDepth;
      for (let depth = firstDepth; depth <= difficulty.maxDepth; depth += 1) {
        let roundMove = bestMove;
        let roundScore = -Infinity;
        let ties = 0;
        try {
          const ordered = [...legal].sort((a, b) => (moveKey(a) === moveKey(bestMove) ? -1 : moveKey(b) === moveKey(bestMove) ? 1 : 0));
          for (const move of ordered) {
            const child = Engine.applyMove(state, move).state;
            const score = -negamax(child, depth - 1, -Infinity, -roundScore);
            if (score > roundScore) { roundScore = score; roundMove = move; ties = 1; }
            else if (score === roundScore && random() < 1 / ++ties) roundMove = move;
          }
          bestMove = roundMove;
          bestScore = roundScore;
          completedDepth = depth;
          if (Math.abs(bestScore) >= 10000 || !difficulty.iterative) break;
        } catch (error) {
          if (!['deadline', 'cancelled'].includes(error.message)) throw error;
          break;
        }
      }
      lastSearch = { depth: completedDepth, nodes };
      return bestMove;
    }

    return { level, difficulty, chooseMove, getLastSearch: () => ({ ...lastSearch }) };
  }

  return { DIFFICULTIES, createRng, evaluate, createBot };
});

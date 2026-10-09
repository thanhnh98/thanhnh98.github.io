(function attachOanQuanMatch(root, factory) {
  const api = factory(root && root.OanQuanEngine, root && root.OanQuanBot);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanMatch = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule(browserEngine, browserBot) {
  'use strict';

  const Engine = browserEngine || (typeof require === 'function' ? require('./oan-quan-engine') : null);
  const Bot = browserBot || (typeof require === 'function' ? require('./oan-quan-bot') : null);
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const normalizeName = (value, fallback) => {
    const trimmed = String(value || '').trim().slice(0, 16).trim();
    return trimmed || fallback;
  };

  function createMatch(options) {
    const animator = options.animator;
    const storage = options.storage;
    const now = options.now || Date.now;
    const listeners = new Set();
    let generation = 0;
    let game = Engine.createState();
    let bot = null;
    let hintBot = Bot.createBot('hard', { seed: 0x51a7 });
    let moveResolve = null;
    let timer = null;
    let activeStarted = null;
    let activeBank = 0;
    let paused = false;
    let undoSnapshot = null;
    let comboPoints = 0;
    let hintsUsed = 0;
    let undosUsed = 0;
    let ui = baseUi();

    function baseUi() {
      return {
        phase: 'idle', mode: 'bot', level: 'easy', human: Engine.Player.SOUTH,
        players: null, selectedPit: null, legalPits: [], hintMove: null,
        hintsRemaining: 3, undosRemaining: 3, canUndo: false, elapsedSeconds: 0,
        southScore: 0, northScore: 0, result: null, turnBanner: null,
      };
    }
    function snapshot() {
      return { ...ui, legalPits: [...ui.legalPits], hintMove: ui.hintMove ? { ...ui.hintMove } : null, board: Engine.cloneBoard(game.board) };
    }
    function emit() { const value = snapshot(); listeners.forEach((listener) => listener(value)); }
    function subscribe(listener) { listeners.add(listener); listener(snapshot()); return () => listeners.delete(listener); }
    function setUi(change) { ui = { ...ui, ...change }; emit(); }
    function activeMs() { return activeBank + (activeStarted === null ? 0 : now() - activeStarted); }
    function startClock() {
      if (!paused && activeStarted === null) activeStarted = now();
      clearInterval(timer);
      timer = setInterval(() => {
        const elapsedSeconds = Math.floor(activeMs() / 1000);
        if (elapsedSeconds !== ui.elapsedSeconds) setUi({ elapsedSeconds });
      }, 250);
    }
    function stopClock() {
      clearInterval(timer); timer = null;
      if (activeStarted !== null) activeBank += now() - activeStarted;
      activeStarted = null;
    }
    async function waitUntilResumed(token) {
      while (paused && token === generation) await wait(80);
      return token === generation;
    }
    function scores() {
      return {
        southScore: Engine.score(game, Engine.Player.SOUTH),
        northScore: Engine.score(game, Engine.Player.NORTH),
      };
    }
    function cancelPending() {
      generation += 1;
      animator.cancel();
      clearInterval(timer); timer = null;
      if (moveResolve) { moveResolve(null); moveResolve = null; }
    }

    function begin(config) {
      cancelPending();
      const token = generation;
      game = Engine.createState({ toMove: config.first });
      ui = {
        ...baseUi(), phase: 'opening', mode: config.mode, level: config.level || 'easy',
        human: Engine.Player.SOUTH, players: config.players || null,
        hintsRemaining: config.mode === 'friend' ? 0 : 3,
        undosRemaining: config.mode === 'friend' ? 0 : 3,
      };
      bot = config.mode === 'bot' ? Bot.createBot(ui.level, { seed: now() }) : null;
      undoSnapshot = null; comboPoints = 0; hintsUsed = 0; undosUsed = 0;
      activeBank = 0; activeStarted = null; paused = false;
      emit();
      run(token);
    }

    function startBot(level = 'easy') {
      storage.update({ level });
      begin({ mode: 'bot', level, first: Engine.Player.SOUTH });
    }

    function startFriend(players = {}) {
      const normalized = {
        player1: normalizeName(players.player1, 'Người chơi 1'),
        player2: normalizeName(players.player2, 'Người chơi 2'),
        first: players.first === Engine.Player.SOUTH ? Engine.Player.SOUTH : Engine.Player.NORTH,
      };
      storage.update({ friend: normalized });
      begin({ mode: 'friend', level: storage.load().level, first: normalized.first, players: normalized });
    }

    async function announceTurn(token) {
      setUi({ turnBanner: game.toMove });
      await wait(900);
      if (token === generation) setUi({ turnBanner: null });
    }

    function awaitHumanMove() {
      return new Promise((resolve) => { moveResolve = resolve; });
    }

    async function run(token, opening = true) {
      if (opening) {
        await animator.playOpening(game.board);
        if (token !== generation) return;
      }
      startClock();
      while (token === generation) {
        if (!await waitUntilResumed(token)) return;
        if (game.phase === Engine.Phase.FINISHED) { finish(); return; }
        await announceTurn(token);
        if (token !== generation) return;

        if (game.phase === Engine.Phase.BORROW) {
          setUi({ phase: 'borrowing', legalPits: [], selectedPit: null, canUndo: false });
          const result = Engine.applyBorrow(game);
          await animator.play(result.events, result.state.board, game.toMove);
          if (token !== generation) return;
          game = result.state;
          setUi(scores());
          continue;
        }

        const friend = ui.mode === 'friend';
        if (friend || game.toMove === ui.human) {
          const legalPits = [...new Set(Engine.legalMoves(game).map((move) => move.pit))];
          setUi({ phase: 'humanTurn', legalPits, selectedPit: null, hintMove: null, canUndo: !!undoSnapshot });
          const move = await awaitHumanMove();
          moveResolve = null;
          if (token !== generation || !move) return;
          undoSnapshot = { game: Engine.cloneState(game), comboPoints };
          setUi({ phase: 'animating', legalPits: [], selectedPit: null, canUndo: false, hintMove: null });
          const result = Engine.applyMove(game, move);
          const captures = result.events.filter((event) => event.type === 'capture').length;
          await animator.play(result.events, result.state.board, game.toMove);
          if (token !== generation) return;
          if (!friend && captures >= 2) comboPoints += Math.min(captures, 6) * 5;
          game = result.state;
          setUi(scores());
        } else {
          setUi({ phase: 'botThinking', legalPits: [], selectedPit: null, canUndo: false });
          const thinkingStarted = now();
          await wait(16);
          if (token !== generation) return;
          const move = bot.chooseMove(game, { isCancelled: () => token !== generation });
          const remaining = 750 - (now() - thinkingStarted);
          if (remaining > 0) await wait(remaining);
          if (token !== generation || !await waitUntilResumed(token)) return;
          setUi({ phase: 'animating' });
          const result = Engine.applyMove(game, move);
          await animator.play(result.events, result.state.board, game.toMove);
          if (token !== generation) return;
          game = result.state;
          setUi(scores());
        }
      }
    }

    function finish() {
      stopClock();
      const south = Engine.scoreBreakdown(game, Engine.Player.SOUTH);
      const north = Engine.scoreBreakdown(game, Engine.Player.NORTH);
      const winningPlayer = Engine.winner(game);
      const friend = ui.mode === 'friend';
      const outcome = winningPlayer === null ? 'draw' : winningPlayer === ui.human ? 'win' : 'loss';
      const elapsedMs = activeMs();
      const ranking = Engine.rankScore({ humanScore: south.total, comboPoints, level: ui.level, outcome, elapsedMs });
      const result = { outcome, winner: winningPlayer, south, north, elapsedMs, comboPoints, rankScore: ranking, mode: ui.mode, level: ui.level, players: ui.players };
      if (!friend) storage.recordResult({ level: ui.level, outcome, score: south.total, rankScore: ranking });
      setUi({ phase: 'gameOver', result, legalPits: [], selectedPit: null, canUndo: false, elapsedSeconds: Math.floor(elapsedMs / 1000) });
      if (options.onComplete) options.onComplete(result);
    }

    function selectPit(pit) {
      if (ui.phase !== 'humanTurn' || !ui.legalPits.includes(pit)) {
        setUi({ selectedPit: null }); return false;
      }
      setUi({ selectedPit: ui.selectedPit === pit ? null : pit });
      return true;
    }

    function chooseDirection(direction) {
      if (ui.phase !== 'humanTurn' || ui.selectedPit === null || !moveResolve) return false;
      const move = { pit: ui.selectedPit, direction };
      const legal = Engine.legalMoves(game).some((item) => item.pit === move.pit && item.direction === move.direction);
      if (!legal) return false;
      const resolve = moveResolve;
      moveResolve = null;
      resolve(move);
      return true;
    }

    function requestHint() {
      if (ui.mode !== 'bot' || ui.phase !== 'humanTurn' || hintsUsed >= 3) return null;
      hintsUsed += 1;
      const move = hintBot.chooseMove(game);
      setUi({ hintMove: move, selectedPit: move.pit, hintsRemaining: 3 - hintsUsed });
      return move;
    }

    function undo() {
      if (ui.phase !== 'humanTurn' || !undoSnapshot) return false;
      if (ui.mode === 'bot' && undosUsed >= 3) return false;
      const saved = undoSnapshot;
      undoSnapshot = null;
      if (ui.mode === 'bot') undosUsed += 1;
      cancelPending();
      const token = generation;
      game = Engine.cloneState(saved.game);
      comboPoints = saved.comboPoints;
      animator.reset(game.board);
      setUi({ phase: 'humanTurn', selectedPit: null, hintMove: null, legalPits: [...new Set(Engine.legalMoves(game).map((move) => move.pit))], canUndo: false, undosRemaining: ui.mode === 'bot' ? 3 - undosUsed : 0, ...scores() });
      run(token, false);
      return true;
    }

    function setPaused(value) {
      const next = value === true;
      if (paused === next) return;
      paused = next;
      if (paused) {
        if (activeStarted !== null) activeBank += now() - activeStarted;
        activeStarted = null;
      } else if (!['idle', 'gameOver'].includes(ui.phase)) {
        activeStarted = now();
      }
    }

    function reset() {
      cancelPending();
      stopClock();
      game = Engine.createState();
      ui = baseUi();
      animator.reset(game.board);
      emit();
    }

    return {
      subscribe, snapshot, startBot, startFriend, selectPit, chooseDirection, requestHint, undo,
      setPaused, reset, accelerateAnimation: () => animator.accelerateOrSkip(),
      getGameState: () => Engine.cloneState(game),
    };
  }

  return { createMatch, normalizeName };
});

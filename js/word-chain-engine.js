(function attachWordChainEngine(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WordChainEngine = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule() {
  'use strict';

  function normalizePhrase(value) {
    if (typeof value !== 'string') return '';
    const phrase = value.trim().toLocaleLowerCase('vi').replace(/\s+/g, ' ');
    if (!/^[\p{L}\s]+$/u.test(phrase)) return '';
    return phrase.split(' ').length >= 2 ? phrase : '';
  }

  function normalizeDictionary(values) {
    const source = Array.isArray(values) ? values : [];
    return [...new Set(source.map(normalizePhrase).filter(Boolean))];
  }

  function createWordChainEngine(options = {}) {
    const settings = {
      turnSeconds: 60,
      maxMistakes: 3,
      maxHints: 3,
      pointsPerWord: 10,
      botDelayMs: 700,
      random: Math.random,
      now: Date.now,
      setIntervalFn: (callback, delay) => setInterval(callback, delay),
      clearIntervalFn: (handle) => clearInterval(handle),
      setTimeoutFn: (callback, delay) => setTimeout(callback, delay),
      clearTimeoutFn: (handle) => clearTimeout(handle),
      onComplete: () => {},
      ...options,
    };

    let phrases = [];
    let openingPhrases = [];
    let phraseSet = new Set();
    let index = new Map();
    let intervalHandle = null;
    let botHandle = null;
    let botDeadline = 0;
    let botRemaining = settings.botDelayMs;
    const listeners = new Set();

    const baseState = (status) => ({
      status,
      chain: [],
      requiredToken: '',
      playerScore: 0,
      botScore: 0,
      mistakesLeft: settings.maxMistakes,
      hintsLeft: settings.maxHints,
      timeLeft: settings.turnSeconds,
      feedback: '',
      hintSuffix: '',
      result: null,
      startedAt: null,
      pausedFrom: null,
    });

    let state = baseState('loading');

    function firstToken(phrase) {
      return phrase.split(' ')[0];
    }

    function lastToken(phrase) {
      return phrase.split(' ').at(-1);
    }

    function snapshot() {
      return {
        ...state,
        chain: state.chain.map((entry) => ({ ...entry })),
        result: state.result ? { ...state.result } : null,
      };
    }

    function emit() {
      const value = snapshot();
      listeners.forEach((listener) => listener(value));
    }

    function stopPlayerTimer() {
      if (intervalHandle !== null) settings.clearIntervalFn(intervalHandle);
      intervalHandle = null;
    }

    function stopBotTimer() {
      if (botHandle !== null) settings.clearTimeoutFn(botHandle);
      botHandle = null;
    }

    function cancelScheduledWork() {
      stopPlayerTimer();
      stopBotTimer();
    }

    function finish(outcome, reason) {
      if (state.status === 'won' || state.status === 'lost') return false;
      cancelScheduledWork();
      const endedAt = settings.now();
      state.status = outcome;
      state.result = {
        outcome,
        reason,
        playerScore: state.playerScore,
        botScore: state.botScore,
        duration: Math.max(0, Math.round((endedAt - state.startedAt) / 1000)),
        chain: state.chain.map((entry) => ({ ...entry })),
      };
      emit();
      settings.onComplete({ ...state.result, chain: state.result.chain.map((entry) => ({ ...entry })) });
      return true;
    }

    function startPlayerTimer() {
      stopPlayerTimer();
      if (state.status !== 'playerTurn') return;
      intervalHandle = settings.setIntervalFn(() => {
        if (state.status !== 'playerTurn') return;
        state.timeLeft = Math.max(0, state.timeLeft - 1);
        if (state.timeLeft === 0) finish('lost', 'timeout');
        else emit();
      }, 1000);
    }

    function availableFor(token) {
      const used = new Set(state.chain.map((entry) => entry.phrase));
      return (index.get(token) || []).filter((phrase) => !used.has(phrase));
    }

    function choose(values) {
      const position = Math.min(values.length - 1, Math.floor(settings.random() * values.length));
      return values[Math.max(0, position)];
    }

    function beginPlayerTurn(requiredToken) {
      state.status = 'playerTurn';
      state.requiredToken = requiredToken;
      state.timeLeft = settings.turnSeconds;
      state.feedback = '';
      state.hintSuffix = '';
      emit();
      startPlayerTimer();
    }

    function playBotTurn() {
      if (state.status !== 'botTurn') return;
      botHandle = null;
      const candidates = availableFor(state.requiredToken);
      if (candidates.length === 0) {
        finish('won', 'bot_no_word');
        return;
      }

      const phrase = choose(candidates);
      state.chain.push({ actor: 'bot', phrase });
      state.botScore += settings.pointsPerWord;
      const nextToken = lastToken(phrase);
      if (availableFor(nextToken).length === 0) {
        state.requiredToken = nextToken;
        finish('lost', 'bot_terminal_word');
        return;
      }
      beginPlayerTurn(nextToken);
    }

    function scheduleBot(delay = settings.botDelayMs) {
      stopBotTimer();
      botRemaining = Math.max(0, delay);
      botDeadline = settings.now() + botRemaining;
      botHandle = settings.setTimeoutFn(playBotTurn, botRemaining);
    }

    function initialize(values) {
      cancelScheduledWork();
      phrases = normalizeDictionary(values && values.data ? values.data : values);
      phraseSet = new Set(phrases);
      index = new Map();
      phrases.forEach((phrase) => {
        const token = firstToken(phrase);
        if (!index.has(token)) index.set(token, []);
        index.get(token).push(phrase);
      });
      openingPhrases = phrases.filter((phrase) =>
        (index.get(lastToken(phrase)) || []).some((candidate) => candidate !== phrase)
      );
      state = baseState(phrases.length ? 'ready' : 'error');
      if (!phrases.length) state.feedback = 'Từ điển không có dữ liệu hợp lệ.';
      emit();
      return snapshot();
    }

    function start() {
      if (!phrases.length) return { ok: false, reason: 'not_ready' };
      cancelScheduledWork();
      state = baseState('ready');
      const opening = choose(openingPhrases.length ? openingPhrases : phrases);
      state.chain.push({ actor: 'opening', phrase: opening });
      state.startedAt = settings.now();
      beginPlayerTurn(lastToken(opening));
      return { ok: true };
    }

    function reject(reason, message) {
      state.mistakesLeft = Math.max(0, state.mistakesLeft - 1);
      state.feedback = message;
      state.hintSuffix = '';
      if (state.mistakesLeft === 0) finish('lost', 'mistakes');
      else emit();
      return { ok: false, reason };
    }

    function submit(suffix) {
      if (state.status !== 'playerTurn') return { ok: false, reason: 'not_player_turn' };
      const cleanedSuffix = typeof suffix === 'string'
        ? suffix.trim().toLocaleLowerCase('vi').replace(/\s+/g, ' ')
        : '';
      if (!cleanedSuffix || !/^[\p{L}\s]+$/u.test(cleanedSuffix)) {
        return reject('empty', 'Hãy nhập phần còn lại của cụm từ.');
      }
      const phrase = normalizePhrase(`${state.requiredToken} ${cleanedSuffix}`);
      if (!phraseSet.has(phrase)) return reject('unknown', 'Cụm từ này chưa có trong từ điển.');
      if (state.chain.some((entry) => entry.phrase === phrase)) {
        return reject('duplicate', 'Cụm từ này đã được dùng trong ván.');
      }

      stopPlayerTimer();
      state.chain.push({ actor: 'player', phrase });
      state.playerScore += settings.pointsPerWord;
      state.feedback = '';
      state.hintSuffix = '';
      state.requiredToken = lastToken(phrase);
      if (availableFor(state.requiredToken).length === 0) {
        finish('won', 'bot_no_word');
        return { ok: true, outcome: 'won' };
      }
      state.status = 'botTurn';
      emit();
      scheduleBot();
      return { ok: true };
    }

    function useHint() {
      if (state.status !== 'playerTurn') return { ok: false, reason: 'not_player_turn' };
      if (state.hintsLeft === 0) return { ok: false, reason: 'no_hints' };
      const candidates = availableFor(state.requiredToken);
      if (!candidates.length) return { ok: false, reason: 'no_word' };
      const phrase = choose(candidates);
      state.hintsLeft -= 1;
      state.hintSuffix = phrase.split(' ').slice(1).join(' ');
      state.feedback = 'Đã điền gợi ý — bạn có thể sửa trước khi gửi.';
      emit();
      return { ok: true, suffix: state.hintSuffix };
    }

    function pause() {
      if (state.status !== 'playerTurn' && state.status !== 'botTurn') return false;
      state.pausedFrom = state.status;
      if (state.status === 'playerTurn') stopPlayerTimer();
      if (state.status === 'botTurn') {
        botRemaining = Math.max(0, botDeadline - settings.now());
        stopBotTimer();
      }
      state.status = 'paused';
      emit();
      return true;
    }

    function resume() {
      if (state.status !== 'paused') return false;
      const resumeStatus = state.pausedFrom;
      state.pausedFrom = null;
      state.status = resumeStatus;
      emit();
      if (resumeStatus === 'playerTurn') startPlayerTimer();
      if (resumeStatus === 'botTurn') scheduleBot(botRemaining);
      return true;
    }

    function reset() {
      cancelScheduledWork();
      state = baseState(phrases.length ? 'ready' : 'loading');
      emit();
      return snapshot();
    }

    function subscribe(listener) {
      listeners.add(listener);
      listener(snapshot());
      return () => listeners.delete(listener);
    }

    return {
      getState: snapshot,
      initialize,
      pause,
      reset,
      resume,
      start,
      submit,
      subscribe,
      useHint,
    };
  }

  return { createWordChainEngine, normalizeDictionary, normalizePhrase };
});

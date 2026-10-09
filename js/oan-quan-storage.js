(function attachOanQuanStorage(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanStorage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule() {
  'use strict';

  const KEY = 'sapTet.oAnQuan.v1';
  const HISTORY_LIMIT = 10;
  const fresh = () => ({
    sound: true,
    level: 'easy',
    stats: {
      easy: { wins: 0, losses: 0, draws: 0 },
      medium: { wins: 0, losses: 0, draws: 0 },
      hard: { wins: 0, losses: 0, draws: 0 },
    },
    highestScore: 0,
    bestRankScore: 0,
    history: [],
    friend: { player1: 'Người chơi 1', player2: 'Người chơi 2', first: 1 },
  });

  function createStorage(storage, now = () => new Date()) {
    function load() {
      try {
        const parsed = JSON.parse(storage && storage.getItem(KEY));
        const base = fresh();
        if (!parsed || typeof parsed !== 'object') return base;
        return {
          ...base,
          ...parsed,
          stats: { ...base.stats, ...(parsed.stats || {}) },
          history: Array.isArray(parsed.history) ? parsed.history.slice(0, HISTORY_LIMIT) : [],
          friend: { ...base.friend, ...(parsed.friend || {}) },
        };
      } catch (_error) { return fresh(); }
    }
    function save(value) {
      try { if (storage) storage.setItem(KEY, JSON.stringify(value)); return true; }
      catch (_error) { return false; }
    }
    function update(change) {
      const next = { ...load(), ...change };
      save(next);
      return next;
    }
    function recordResult({ level, outcome, score, rankScore }) {
      const data = load();
      const row = { ...data.stats[level] };
      if (outcome === 'win') row.wins += 1;
      else if (outcome === 'draw') row.draws += 1;
      else row.losses += 1;
      data.stats = { ...data.stats, [level]: row };
      data.highestScore = Math.max(data.highestScore || 0, score || 0);
      data.bestRankScore = Math.max(data.bestRankScore || 0, rankScore || 0);
      save(data);
      return data;
    }
    function recordHistory(result) {
      const data = load();
      const playedAt = now();
      const entry = {
        playedAt: playedAt instanceof Date ? playedAt.toISOString() : new Date(playedAt).toISOString(),
        mode: result.mode === 'friend' ? 'friend' : 'bot',
        level: ['easy', 'medium', 'hard'].includes(result.level) ? result.level : 'easy',
        outcome: ['win', 'draw', 'loss'].includes(result.outcome) ? result.outcome : 'draw',
        winner: result.winner === 0 || result.winner === 1 ? result.winner : null,
        southName: String(result.southName || 'Bạn').slice(0, 16),
        northName: String(result.northName || 'Máy').slice(0, 16),
        southScore: Math.max(0, Number(result.southScore) || 0),
        northScore: Math.max(0, Number(result.northScore) || 0),
        durationSeconds: Math.max(0, Math.floor((Number(result.elapsedMs) || 0) / 1000)),
        rankScore: Math.max(0, Number(result.rankScore) || 0),
      };
      data.history = [entry, ...data.history].slice(0, HISTORY_LIMIT);
      save(data);
      return entry;
    }
    function loadHistory() { return load().history; }
    return { load, save, update, recordResult, recordHistory, loadHistory };
  }

  return { KEY, HISTORY_LIMIT, createStorage };
});

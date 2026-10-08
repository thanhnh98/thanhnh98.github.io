(function attachOanQuanStorage(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanStorage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule() {
  'use strict';

  const KEY = 'sapTet.oAnQuan.v1';
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
    friend: { player1: 'Người chơi 1', player2: 'Người chơi 2', first: 1 },
  });

  function createStorage(storage) {
    function load() {
      try {
        const parsed = JSON.parse(storage && storage.getItem(KEY));
        const base = fresh();
        if (!parsed || typeof parsed !== 'object') return base;
        return {
          ...base,
          ...parsed,
          stats: { ...base.stats, ...(parsed.stats || {}) },
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
    return { load, save, update, recordResult };
  }

  return { KEY, createStorage };
});

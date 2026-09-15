(function attachWordChainStorage(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.WordChainStorage = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule() {
  'use strict';

  const KEYS = {
    history: 'wordChainGameHistory',
    highScore: 'wordChainHighestScore',
    sound: 'wordChainSoundEnabled',
  };

  function createWordChainStorage(storage, now = () => new Date()) {
    function read(key) {
      try {
        return storage ? storage.getItem(key) : null;
      } catch (_error) {
        return null;
      }
    }

    function write(key, value) {
      try {
        if (storage) storage.setItem(key, value);
        return true;
      } catch (_error) {
        return false;
      }
    }

    function loadHistory() {
      try {
        const parsed = JSON.parse(read(KEYS.history) || '[]');
        return Array.isArray(parsed) ? parsed.slice(0, 10) : [];
      } catch (_error) {
        return [];
      }
    }

    function saveResult(result) {
      const completedAt = now();
      const record = {
        date: completedAt.toLocaleDateString('vi-VN'),
        time: completedAt.toLocaleTimeString('vi-VN'),
        winner: result.outcome === 'won' ? 'player' : 'computer',
        outcome: result.outcome,
        reason: result.reason,
        playerScore: Number(result.playerScore) || 0,
        computerScore: Number(result.botScore) || 0,
        wordsPlayed: Array.isArray(result.chain) ? result.chain.length : 0,
        duration: Math.max(0, Number(result.duration) || 0),
      };
      const history = [record, ...loadHistory()].slice(0, 10);
      write(KEYS.history, JSON.stringify(history));
      return history;
    }

    function loadHighScore() {
      const value = Number.parseInt(read(KEYS.highScore), 10);
      return Number.isFinite(value) && value > 0 ? value : 0;
    }

    function updateHighScore(score) {
      const next = Math.max(loadHighScore(), Number(score) || 0);
      write(KEYS.highScore, String(next));
      return next;
    }

    function loadSound() {
      try {
        return JSON.parse(read(KEYS.sound)) === true;
      } catch (_error) {
        return false;
      }
    }

    function saveSound(enabled) {
      const value = enabled === true;
      write(KEYS.sound, JSON.stringify(value));
      return value;
    }

    return { loadHighScore, loadHistory, loadSound, saveResult, saveSound, updateHighScore };
  }

  return { createWordChainStorage, KEYS };
});

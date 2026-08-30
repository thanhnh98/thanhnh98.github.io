(function initializeWordChainPage() {
  'use strict';

  if (typeof document === 'undefined') return;

  const $ = (id) => document.getElementById(id);
  const elements = {
    board: $('noi-chu-game'),
    botScore: $('bot-score'),
    botThinking: $('bot-thinking'),
    chain: $('word-chain-display'),
    chainCount: $('chain-count'),
    currentWord: $('current-word'),
    feedback: $('game-feedback'),
    form: $('word-form'),
    highScore: $('highest-score'),
    hints: $('hints-display'),
    hintButton: $('hint-btn'),
    historyButton: $('history-btn'),
    historyDialog: $('history-dialog'),
    historyList: $('history-list'),
    input: $('word-input'),
    loadStatus: $('load-status'),
    mistakes: $('mistakes-display'),
    playerScore: $('player-score'),
    prefix: $('required-prefix'),
    resetButton: $('reset-game'),
    resultBotScore: $('result-bot-score'),
    resultChain: $('result-chain'),
    resultDialog: $('result-dialog'),
    resultIcon: $('result-icon'),
    resultPlayerScore: $('result-player-score'),
    resultReset: $('result-reset'),
    resultSummary: $('result-summary'),
    resultTitle: $('result-title'),
    retryButton: $('retry-load'),
    soundButton: $('sound-toggle'),
    startButton: $('start-game'),
    submitButton: $('submit-word'),
    timer: $('timer-display'),
    timerCard: $('timer-card'),
    turnStatus: $('turn-status'),
  };

  if (!elements.form || !window.WordChainEngine || !window.WordChainStorage) return;

  const storage = window.WordChainStorage.createWordChainStorage(window.localStorage);
  let highScore = storage.loadHighScore();
  let soundEnabled = storage.loadSound();
  let autoPaused = false;
  let lastChainLength = -1;
  let loadError = '';

  const sounds = typeof Audio === 'function'
    ? {
        background: new Audio('assets/sounds/noichu_background.mp3'),
        correct: new Audio('assets/sounds/noichu_correct.mp3'),
        incorrect: new Audio('assets/sounds/noichu_incorrect.mp3'),
        won: new Audio('assets/sounds/noichu_game_won.mp3'),
        lost: new Audio('assets/sounds/noichu_game_failed.mp3'),
      }
    : {};

  if (sounds.background) {
    sounds.background.loop = true;
    sounds.background.volume = 0.25;
  }

  function track(action, values = {}) {
    if (window.webAnalytics && typeof window.webAnalytics.trackGameAction === 'function') {
      window.webAnalytics.trackGameAction('word_chain', action, values);
    }
  }

  function playSound(name) {
    if (!soundEnabled || !sounds[name]) return;
    try {
      sounds[name].currentTime = 0;
      const playback = sounds[name].play();
      if (playback && typeof playback.catch === 'function') playback.catch(() => {});
    } catch (_error) {
      // Audio is optional and must never interrupt the game.
    }
  }

  function stopBackground() {
    if (!sounds.background) return;
    sounds.background.pause();
    sounds.background.currentTime = 0;
  }

  function updateSoundButton() {
    elements.soundButton.setAttribute('aria-pressed', String(soundEnabled));
    elements.soundButton.innerHTML = soundEnabled
      ? '<i data-lucide="volume-2" aria-hidden="true"></i><span>Âm thanh bật</span>'
      : '<i data-lucide="volume-x" aria-hidden="true"></i><span>Âm thanh tắt</span>';
    if (window.lucide) window.lucide.createIcons({ attrs: { 'stroke-width': 2 } });
  }

  function showDialog(dialog) {
    if (!dialog || dialog.open) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  }

  function formatReason(reason) {
    return {
      timeout: 'Bạn đã hết 60 giây của lượt này.',
      mistakes: 'Bạn đã dùng hết 3 lần trả lời sai.',
      bot_no_word: 'Máy không còn cụm từ hợp lệ để nối tiếp.',
      bot_terminal_word: 'Máy đã ra một cụm từ không còn đường nối.',
    }[reason] || 'Ván chơi đã kết thúc.';
  }

  function completeGame(result) {
    storage.saveResult(result);
    highScore = storage.updateHighScore(result.playerScore);
    elements.highScore.textContent = String(highScore);
    stopBackground();
    playSound(result.outcome === 'won' ? 'won' : 'lost');
    track('complete', {
      result: result.outcome,
      reason: result.reason,
      player_score: result.playerScore,
      bot_score: result.botScore,
      duration_seconds: result.duration,
    });

    const won = result.outcome === 'won';
    elements.resultIcon.textContent = won ? '🏆' : '🌱';
    elements.resultTitle.textContent = won ? 'Bạn thắng!' : 'Hẹn bạn ván sau';
    elements.resultSummary.textContent = `${formatReason(result.reason)} Ván đấu kéo dài ${result.duration} giây.`;
    elements.resultPlayerScore.textContent = String(result.playerScore);
    elements.resultBotScore.textContent = String(result.botScore);
    showDialog(elements.resultDialog);
  }

  const engine = window.WordChainEngine.createWordChainEngine({ onComplete: completeGame });

  function latestMachinePhrase(chain) {
    return [...chain].reverse().find((entry) => entry.actor === 'bot' || entry.actor === 'opening');
  }

  function renderChain(chain) {
    if (chain.length === lastChainLength) return;
    lastChainLength = chain.length;
    elements.chain.replaceChildren();
    elements.chainCount.textContent = `${chain.length} cụm`;

    if (!chain.length) {
      const empty = document.createElement('li');
      empty.className = 'empty-chain';
      empty.textContent = 'Chuỗi từ sẽ xuất hiện tại đây.';
      elements.chain.append(empty);
      return;
    }

    chain.forEach((entry) => {
      const player = entry.actor === 'player';
      const item = document.createElement('li');
      item.className = `timeline-item ${player ? 'is-player' : 'is-bot'}`;

      const marker = document.createElement('span');
      marker.className = 'timeline-marker';
      marker.setAttribute('aria-hidden', 'true');
      marker.textContent = player ? '👤' : '🤖';

      const content = document.createElement('div');
      const actor = document.createElement('span');
      actor.className = 'timeline-actor';
      actor.textContent = player ? 'Bạn' : 'Máy';
      const phrase = document.createElement('strong');
      phrase.textContent = entry.phrase;
      content.append(actor, phrase);
      item.append(marker, content);
      elements.chain.append(item);
    });
    elements.chain.scrollTop = elements.chain.scrollHeight;
  }

  function render(state) {
    const isPlaying = ['playerTurn', 'botTurn', 'paused'].includes(state.status);
    const isPlayerTurn = state.status === 'playerTurn';
    const machinePhrase = latestMachinePhrase(state.chain);
    const labels = {
      loading: 'Đang tải',
      ready: 'Sẵn sàng',
      playerTurn: 'Lượt của bạn',
      botTurn: 'Lượt của máy',
      paused: 'Đang tạm dừng',
      won: 'Bạn thắng',
      lost: 'Máy thắng',
      error: 'Chưa thể tải',
    };

    elements.playerScore.textContent = String(state.playerScore);
    elements.botScore.textContent = String(state.botScore);
    elements.timer.textContent = `${state.timeLeft} giây`;
    elements.mistakes.textContent = `${state.mistakesLeft} lần`;
    elements.hints.textContent = `${state.hintsLeft} lượt`;
    elements.highScore.textContent = String(highScore);
    elements.turnStatus.textContent = labels[state.status] || '';
    elements.turnStatus.dataset.state = state.status;
    elements.currentWord.textContent = machinePhrase ? machinePhrase.phrase : '—';
    elements.prefix.textContent = state.requiredToken || '—';
    elements.botThinking.hidden = state.status !== 'botTurn';
    elements.input.disabled = !isPlayerTurn;
    elements.submitButton.disabled = !isPlayerTurn;
    elements.hintButton.disabled = !isPlayerTurn || state.hintsLeft === 0;
    elements.resetButton.disabled = !isPlaying && !['won', 'lost'].includes(state.status);
    elements.timerCard.classList.toggle('is-urgent', isPlayerTurn && state.timeLeft <= 10);

    const readyToStart = state.status === 'ready' || state.status === 'won' || state.status === 'lost';
    elements.startButton.disabled = !readyToStart;
    elements.startButton.querySelector('span').textContent = readyToStart
      ? (state.status === 'ready' ? 'Bắt đầu' : 'Chơi ván mới')
      : state.status === 'error' ? 'Chưa thể bắt đầu' : 'Đang chơi';

    if (loadError) elements.feedback.textContent = loadError;
    else if (state.feedback) elements.feedback.textContent = state.feedback;
    else if (state.status === 'playerTurn') elements.feedback.textContent = `Nhập phần đứng sau “${state.requiredToken}”.`;
    else if (state.status === 'botTurn') elements.feedback.textContent = 'Đồng hồ đã dừng trong lúc máy suy nghĩ.';
    else if (state.status === 'paused') elements.feedback.textContent = 'Ván chơi tạm dừng vì tab đang bị ẩn.';
    else if (state.status === 'ready') elements.feedback.textContent = 'Bấm “Bắt đầu” để mở ván mới.';

    renderChain(state.chain);
  }

  engine.subscribe(render);

  async function loadDictionary() {
    loadError = '';
    elements.retryButton.hidden = true;
    elements.loadStatus.hidden = false;
    elements.loadStatus.textContent = 'Đang chuẩn bị trò chơi';
    elements.startButton.disabled = true;
    elements.startButton.querySelector('span').textContent = 'Đang tải từ điển…';
    try {
      const response = await fetch('assets/files/words_json.txt', { cache: 'force-cache' });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      const state = engine.initialize(payload);
      if (state.status === 'error') throw new Error('empty_dictionary');
      elements.loadStatus.textContent = 'Đã sẵn sàng';
      window.setTimeout(() => { elements.loadStatus.hidden = true; }, 1200);
    } catch (_error) {
      engine.initialize([]);
      loadError = 'Không thể tải từ điển. Hãy kiểm tra kết nối và thử lại.';
      elements.loadStatus.textContent = loadError;
      elements.retryButton.hidden = false;
      render(engine.getState());
    }
  }

  function startGame() {
    closeDialog(elements.resultDialog);
    if (!engine.start().ok) return;
    loadError = '';
    elements.input.value = '';
    track('start');
    playSound('background');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    elements.board.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' });
    window.setTimeout(() => elements.input.focus({ preventScroll: true }), reducedMotion ? 0 : 350);
  }

  function renderHistory() {
    const history = storage.loadHistory();
    elements.historyList.replaceChildren();
    if (!history.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-history';
      empty.textContent = 'Chưa có ván nào được lưu.';
      elements.historyList.append(empty);
      return;
    }

    history.forEach((game) => {
      const item = document.createElement('article');
      item.className = `history-item ${game.winner === 'player' ? 'is-win' : 'is-loss'}`;
      const title = document.createElement('strong');
      title.textContent = game.winner === 'player' ? '🏆 Bạn thắng' : '🌱 Máy thắng';
      const date = document.createElement('span');
      date.textContent = `${game.date || ''} ${game.time || ''}`.trim();
      const details = document.createElement('p');
      details.textContent = `${game.playerScore || 0}–${game.computerScore || 0} điểm · ${game.wordsPlayed || 0} cụm · ${game.duration || 0} giây`;
      item.append(title, date, details);
      elements.historyList.append(item);
    });
  }

  elements.form.addEventListener('submit', (event) => {
    event.preventDefault();
    const response = engine.submit(elements.input.value);
    if (response.ok) {
      elements.input.value = '';
      playSound('correct');
    } else if (response.reason !== 'not_player_turn') {
      elements.input.value = '';
      playSound('incorrect');
      elements.input.focus();
    }
  });

  elements.input.addEventListener('input', () => {
    elements.input.value = elements.input.value.toLocaleLowerCase('vi');
  });
  elements.input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !event.isComposing) {
      event.preventDefault();
      elements.form.requestSubmit();
    }
  });
  elements.startButton.addEventListener('click', startGame);
  elements.resetButton.addEventListener('click', startGame);
  elements.resultReset.addEventListener('click', startGame);
  elements.hintButton.addEventListener('click', () => {
    const hint = engine.useHint();
    if (!hint.ok) return;
    elements.input.value = hint.suffix;
    elements.input.focus();
    track('hint', { remaining_hints: engine.getState().hintsLeft });
  });
  elements.historyButton.addEventListener('click', () => {
    renderHistory();
    showDialog(elements.historyDialog);
  });
  elements.resultChain.addEventListener('click', () => {
    closeDialog(elements.resultDialog);
    elements.chain.focus();
    elements.chain.scrollIntoView({ block: 'center' });
  });
  elements.soundButton.addEventListener('click', () => {
    soundEnabled = storage.saveSound(!soundEnabled);
    updateSoundButton();
    if (!soundEnabled) stopBackground();
    else if (['playerTurn', 'botTurn', 'paused'].includes(engine.getState().status)) playSound('background');
  });
  elements.retryButton.addEventListener('click', loadDictionary);

  document.querySelectorAll('[data-close-dialog]').forEach((button) => {
    button.addEventListener('click', () => closeDialog($(button.dataset.closeDialog)));
  });
  [elements.historyDialog, elements.resultDialog].forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) closeDialog(dialog);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    [elements.historyDialog, elements.resultDialog].forEach(closeDialog);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) autoPaused = engine.pause();
    else if (autoPaused) {
      autoPaused = false;
      engine.resume();
    }
  });

  window.addEventListener('beforeunload', (event) => {
    if (['playerTurn', 'botTurn', 'paused'].includes(engine.getState().status)) {
      event.preventDefault();
      event.returnValue = '';
    }
  });

  updateSoundButton();
  loadDictionary();
})();

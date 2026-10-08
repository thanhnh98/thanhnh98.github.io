(function initOanQuanGame() {
  'use strict';

  const E = window.OanQuanEngine;
  const A = window.OanQuanAnimator;
  const root = document.querySelector('.oaq-shell');
  if (!E || !root) return;

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const assetRoot = 'assets/images/o-an-quan/';
  const soundRoot = 'assets/sounds/o-an-quan/';
  const pitElements = new Map($$('[data-pit]').map((element) => [Number(element.dataset.pit), element]));
  const boardWrap = $('#board-wrap');
  const canvas = $('#oaq-flight-canvas');
  const ctx = canvas.getContext('2d');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storage = window.OanQuanStorage.createStorage(window.localStorage);
  let settings = storage.load();
  let state = null;
  let displayed = E.createBoard();
  let effectTimers = [];
  let comboTimer = null;
  let lastConfig = { mode: 'bot', level: settings.level };
  let resultShown = false;
  let handState = null;

  function track(action, params = {}) {
    window.webAnalytics?.trackGameAction('o_an_quan', action, params);
  }

  class AudioManager {
    constructor(enabled) {
      this.enabled = enabled;
      this.unlocked = false;
      this.dropIndex = 0;
      const file = (name, loop = false, volume = 1) => {
        const audio = new Audio(`${soundRoot}${name}.mp3`);
        audio.preload = 'auto'; audio.loop = loop; audio.volume = volume;
        return audio;
      };
      this.music = file('oan_quan_music', true, .35);
      this.drops = [1, 2, 3].map((n) => file(`oan_quan_drop_${n}`));
      this.effects = {
        pickUp: file('oan_quan_pick_up'), slap: file('oan_quan_slap'), captureDan: file('oan_quan_capture_dan'),
        captureQuan: file('oan_quan_capture_quan'), borrow: file('oan_quan_borrow'), select: file('oan_quan_select'),
        turnYou: file('oan_quan_turn_you'), turnBot: file('oan_quan_turn_bot'), pour: file('oan_quan_pour'), quanLand: file('oan_quan_quan_land'),
        win: file('result-win'), loss: file('result-loss'), draw: file('result-draw'),
      };
      for (let level = 2; level <= 6; level += 1) this.effects[`combo${level}`] = file(`oan_quan_combo_${level}`);
    }
    unlock() { this.unlocked = true; if (this.enabled) this.music.play().catch(() => {}); }
    play(name) {
      if (!this.enabled || !this.unlocked) return;
      const audio = name === 'drop' ? this.drops[this.dropIndex++ % this.drops.length] : this.effects[name];
      if (!audio) return;
      audio.currentTime = 0; audio.play().catch(() => {});
    }
    setEnabled(enabled) {
      this.enabled = enabled;
      settings = storage.update({ sound: enabled });
      if (enabled && this.unlocked) this.music.play().catch(() => {}); else this.music.pause();
    }
    pause() { this.music.pause(); }
    resume() { if (this.enabled && this.unlocked) this.music.play().catch(() => {}); }
  }
  const audio = new AudioManager(settings.sound !== false);

  const stoneSprites = [
    'stone-jade.png',
    'stone-coral.png',
    'stone-gold.png',
    'stone-turquoise.png',
    'stone-lavender.png',
    'stone-ivory.png',
  ];
  const sprites = stoneSprites.map((name) => {
    const image = new Image(); image.src = `${assetRoot}${name}`; return image;
  });
  const mandarin = new Image(); mandarin.src = `${assetRoot}mandarin.png`;

  function stoneSlotPosition(index, quanPit = false) {
    const angle = index * 2.399963;
    const ring = Math.min(.92, .2 + Math.sqrt(index) * .13);
    const radius = quanPit ? 32 : 38;
    return { left: 50 + Math.cos(angle) * radius * ring, top: (quanPit ? 58 : 50) + Math.sin(angle) * radius * .72 * ring };
  }

  class FlightCanvas {
    constructor() {
      this.particles = []; this.ripples = []; this.raf = null; this.handPit = 3;
      this.borrowPlayer = null; this.id = 0; this.playbackRate = 1; this.openingSlots = new Map();
    }
    resize() {
      const rect = boardWrap.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const pixelWidth = Math.max(1, Math.round(rect.width * dpr));
      const pixelHeight = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.width = rect.width; this.height = rect.height;
    }
    pointForPit(pit) {
      const outer = boardWrap.getBoundingClientRect();
      const rect = pitElements.get(pit).getBoundingClientRect();
      return { x: rect.left - outer.left + rect.width / 2, y: rect.top - outer.top + rect.height / 2, size: Math.min(rect.width, rect.height) };
    }
    pointForPitSlot(pit, slot) {
      const outer = boardWrap.getBoundingClientRect();
      const rect = pitElements.get(pit).getBoundingClientRect();
      const pos = stoneSlotPosition(Math.max(0, slot), E.isQuanPit(pit));
      return {
        x: rect.left - outer.left + rect.width * (.08 + pos.left * .0084),
        y: rect.top - outer.top + rect.height * (.08 + pos.top * .0084),
        size: Math.min(rect.width, rect.height),
      };
    }
    pointForStore(player) {
      const outer = boardWrap.getBoundingClientRect();
      const rect = $(`.oaq-score[data-player="${player}"]`).getBoundingClientRect();
      return { x: rect.left - outer.left + rect.width / 2, y: -18, size: 34 };
    }
    add(from, to, duration, image, options = {}) {
      this.resize();
      this.particles.push({
        id: this.id++, from, to, duration: Math.max(40, duration), image,
        started: performance.now() + (options.delay || 0),
        scale: options.scale || 1,
        falling: options.falling || false,
        bouncing: options.bouncing || false,
        sowing: options.sowing || false,
        spreading: options.spreading || false,
        rotation: options.rotation || 0,
        heavy: options.heavy || false,
      });
      if (!this.raf) this.raf = requestAnimationFrame((time) => this.draw(time));
    }
    setPlaybackRate(rate) {
      if (!Number.isFinite(rate) || rate <= 0 || rate === this.playbackRate) return;
      const now = performance.now();
      const factor = rate / this.playbackRate;
      this.particles.forEach((particle) => {
        if (particle.started > now) {
          particle.started = now + (particle.started - now) / factor;
          particle.duration /= factor;
          return;
        }
        const progress = Math.min(1, (now - particle.started) / particle.duration);
        particle.duration /= factor;
        particle.started = now - progress * particle.duration;
      });
      this.ripples.forEach((ripple) => {
        const progress = Math.min(1, Math.max(0, (now - ripple.started) / ripple.duration));
        ripple.duration /= factor;
        ripple.started = now - progress * ripple.duration;
      });
      this.playbackRate = rate;
    }
    snapToEnd() { this.clear(); }
    landingRipple(pit, slot) {
      if (reducedMotion) return;
      this.ripples.push({ point: this.pointForPitSlot(pit, slot), started: performance.now(), duration: 240 / this.playbackRate });
      if (!this.raf) this.raf = requestAnimationFrame((time) => this.draw(time));
    }
    openingDrop({ pit, quan, duration }) {
      const slot = this.openingSlots.get(pit) || 0;
      const to = quan ? this.pointForPit(pit) : this.pointForPitSlot(pit, slot);
      if (!quan) this.openingSlots.set(pit, slot + 1);
      if (quan) {
        const from = { x: to.x, y: -to.size * 1.8, size: to.size };
        this.add(from, to, duration, mandarin, { scale: 2.35, falling: true });
        return;
      }
      const fan = (this.id % 7 - 3) * 5;
      const from = { x: (this.width || boardWrap.clientWidth) / 2 + fan, y: -to.size * .35, size: to.size };
      this.add(from, to, duration, sprites[this.id % sprites.length], {
        bouncing: !reducedMotion,
        spreading: true,
        rotation: (this.id % 2 ? 1 : -1) * (.35 + (this.id % 4) * .08),
      });
    }
    fly({ kind, event, flightDuration, stagger = 0 }) {
      if (kind === 'pickUp') {
        this.borrowPlayer = null;
        this.handPit = event.pit;
        const from = this.pointForPit(event.pit);
        const to = { x: from.x, y: from.y + ((event.pit >= 7) ? from.size * .72 : -from.size * .72), size: from.size };
        for (let i = 0; i < Math.min(event.count, 6); i += 1) {
          this.add(from, to, flightDuration, sprites[(event.pit + i) % sprites.length], {
            delay: i * stagger,
            rotation: reducedMotion ? 0 : (i % 2 ? 1 : -1) * (.22 + i * .035),
          });
        }
      } else if (kind === 'drop') {
        const fromPit = event.borrowing && this.borrowPlayer !== null ? this.pointForStore(this.borrowPlayer) : this.pointForPit(this.handPit);
        const from = event.borrowing && this.borrowPlayer !== null ? fromPit : { x: fromPit.x, y: fromPit.y + ((this.handPit >= 7) ? fromPit.size * .72 : -fromPit.size * .72), size: fromPit.size };
        const to = this.pointForPitSlot(event.pit, displayed.pits[event.pit]);
        this.add(from, to, flightDuration, sprites[this.id % sprites.length], {
          delay: event.borrowing ? (4 - event.handRemaining) * 18 : 0,
          falling: event.borrowing,
          bouncing: !event.borrowing && !reducedMotion,
          sowing: !event.borrowing,
          rotation: reducedMotion ? 0 : (this.id % 2 ? 1 : -1) * .55,
        });
        this.handPit = event.pit;
        if (event.borrowing && event.handRemaining === 0) this.borrowPlayer = null;
      } else if (kind === 'capture') {
        const from = this.pointForPit(event.pit);
        const to = this.pointForStore(event.to);
        const total = Math.min(event.dan, 8);
        for (let i = 0; i < total; i += 1) {
          const delay = i * stagger;
          this.add(from, to, Math.max(80, flightDuration - delay), sprites[i % sprites.length], { delay });
        }
        if (event.quan) this.add(from, to, flightDuration, mandarin, { scale: 2.25, heavy: true });
        effectTimers.push(setTimeout(() => pulseStore(event.to, event.quan), Math.max(40, flightDuration * .82)));
      } else if (kind === 'borrow') {
        this.borrowPlayer = event.player;
      }
    }
    clear() {
      this.particles = []; this.ripples = []; this.openingSlots.clear(); this.playbackRate = 1;
      if (this.raf) cancelAnimationFrame(this.raf); this.raf = null; ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw(time) {
      ctx.clearRect(0, 0, this.width || canvas.width, this.height || canvas.height);
      this.particles = this.particles.filter((p) => {
        if (time < p.started) return true;
        const raw = Math.min(1, (time - p.started) / p.duration);
        const t = raw * raw * (3 - 2 * raw);
        let x = p.from.x + (p.to.x - p.from.x) * t;
        let groundY = p.from.y + (p.to.y - p.from.y) * t;
        let y;
        if (p.falling) {
          y = p.from.y + (p.to.y - p.from.y) * raw * raw - Math.sin(Math.PI * Math.max(0, (raw - .82) / .18)) * 7;
        } else if (p.bouncing || p.sowing || p.spreading) {
          const point = A.sampleFlight(p.from, p.to, raw, { bouncing: true, reducedMotion });
          x = point.x; y = point.y; groundY = point.groundY;
        } else {
          const arc = reducedMotion ? Math.max(8, p.from.size * .2) : Math.max(18, p.from.size * .58);
          y = groundY - Math.sin(Math.PI * t) * arc;
        }
        const base = Math.max(8, p.to.size * .12) * p.scale;
        const landingPulse = p.bouncing ? Math.exp(-Math.pow((raw - .78) / .05, 2)) : 0;
        const squash = p.falling && raw > .84
          ? 1 + Math.sin(Math.PI * ((raw - .84) / .16)) * .14
          : 1 + landingPulse * .18;
        ctx.globalAlpha = Math.min(1, raw * 5);
        ctx.save();
        ctx.globalAlpha *= .2;
        ctx.fillStyle = '#2a090f';
        ctx.beginPath();
        const height = Math.max(0, groundY - y);
        const shadowScale = Math.max(.45, 1 - height / Math.max(60, p.from.size * 1.5));
        ctx.ellipse(x + 2, groundY + base * .72, base * .75 * shadowScale, base * .24 * shadowScale, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = Math.min(1, raw * 5);
        ctx.translate(x, y);
        ctx.rotate(p.rotation * Math.sin(Math.PI * Math.min(1, raw / .88)));
        ctx.drawImage(p.image, -base * squash, -base / squash, base * 2 * squash, base * 2 / squash);
        ctx.restore();
        ctx.globalAlpha = 1;
        return raw < 1;
      });
      this.ripples = this.ripples.filter((ripple) => {
        const raw = Math.min(1, Math.max(0, (time - ripple.started) / ripple.duration));
        const radius = ripple.point.size * (.08 + raw * .22);
        ctx.save();
        ctx.globalAlpha = (1 - raw) * .5;
        ctx.strokeStyle = '#ffd86b';
        ctx.lineWidth = Math.max(1, 3 * (1 - raw));
        ctx.beginPath();
        ctx.ellipse(ripple.point.x, ripple.point.y, radius, radius * .5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
        return raw < 1;
      });
      if (this.particles.length || this.ripples.length) this.raf = requestAnimationFrame((next) => this.draw(next)); else this.raf = null;
    }
  }
  const flights = new FlightCanvas();

  function clearEffects() { effectTimers.forEach(clearTimeout); effectTimers = []; comboTimer = null; }
  function pulsePit(pit, className, text = '') {
    const element = pitElements.get(pit); if (!element) return;
    element.classList.add(className); element.querySelector('em').textContent = text;
    effectTimers.push(setTimeout(() => element.classList.remove(className), 380));
  }
  function pulseStore(player, heavy = false) {
    const element = $(`.oaq-score[data-player="${player}"]`);
    if (!element) return;
    const className = heavy ? 'is-impact-heavy' : 'is-impact';
    element.classList.remove('is-impact', 'is-impact-heavy');
    void element.offsetWidth;
    element.classList.add(className);
    effectTimers.push(setTimeout(() => element.classList.remove(className), heavy ? 650 : 480));
  }
  function showActionBanner(text, duration = 760) {
    const banner = $('#turn-banner');
    banner.textContent = text;
    banner.hidden = false;
    banner.style.animation = 'none';
    void banner.offsetWidth;
    banner.style.animation = '';
    effectTimers.push(setTimeout(() => { if (!state?.turnBanner) banner.hidden = true; }, duration));
  }
  function showCombo(level) {
    const names = { 2: 'Ăn đôi!', 3: 'Ăn ba!', 4: 'Ăn bốn! Tuyệt!', 5: 'Ăn năm! Siêu đỉnh!', 6: 'ĂN SÁU! THẦN SẦU!' };
    const combo = $('#combo-burst'); combo.querySelector('strong').textContent = names[level]; combo.querySelector('span').textContent = `COMBO ×${level}`;
    if (comboTimer !== null) clearTimeout(comboTimer);
    combo.hidden = false; combo.style.animation = 'none'; void combo.offsetWidth; combo.style.animation = '';
    boardWrap.classList.add('is-shaking'); audio.play(`combo${level}`);
    comboTimer = setTimeout(() => {
      combo.hidden = true;
      boardWrap.classList.remove('is-shaking');
      comboTimer = null;
    }, reducedMotion ? 2000 : 2520);
    effectTimers.push(comboTimer);
  }

  const animator = window.OanQuanAnimator.createAnimator({
    reducedMotion,
    hooks: {
      onDisplay(board, extra) {
        displayed = board; renderBoard(extra);
      },
      onFly(payload) { flights.fly(payload); if (payload.kind === 'borrow') showActionBanner('RẢI LẠI QUÂN!'); },
      onOpeningDrop(payload) { flights.openingDrop(payload); },
      onPlaybackRate(rate) { flights.setPlaybackRate(rate); },
      onSnapToEnd() { flights.snapToEnd(); },
      onSound(name) { audio.play(name); },
      onCombo(level) { showCombo(level); },
      onCancel() { flights.clear(); clearEffects(); },
    },
  });

  const match = window.OanQuanMatch.createMatch({ animator, storage, onComplete: onComplete });

  function renderPit(pit, count, hasQuan) {
    const element = pitElements.get(pit);
    const holder = element.querySelector('.oaq-stones');
    const drawn = Math.min(count, 30);
    let html = '';
    if (hasQuan) html += '<img class="oaq-stone oaq-mandarin" src="assets/images/o-an-quan/mandarin.png" alt="">';
    for (let index = 0; index < drawn; index += 1) {
      const pos = stoneSlotPosition(index, E.isQuanPit(pit));
      const sprite = stoneSprites[(pit * 2 + index) % stoneSprites.length];
      html += `<img class="oaq-stone" src="${assetRoot}${sprite}" alt="" style="left:${pos.left}%;top:${pos.top}%">`;
    }
    holder.innerHTML = html;
    element.querySelector('.oaq-count').textContent = count;
    element.setAttribute('aria-label', `${E.isQuanPit(pit) ? 'Ô Quan' : `Ô dân ${pit}`}, ${count} dân${hasQuan ? ', còn Quan' : ''}`);
  }
  function placeHandBadge() {
    const badge = $('#hand-badge');
    if (!handState || handState.count <= 0) { badge.hidden = true; return; }
    const outer = boardWrap.getBoundingClientRect();
    const pit = pitElements.get(handState.pit)?.getBoundingClientRect();
    if (!pit || !outer.width) { badge.hidden = true; return; }
    badge.querySelector('b').textContent = handState.count;
    badge.style.left = `${pit.left - outer.left + pit.width / 2}px`;
    badge.style.top = `${pit.top - outer.top + (handState.pit >= 7 ? pit.height * .78 : pit.height * .22)}px`;
    badge.hidden = false;
  }
  function positionDirectionPicker() {
    const picker = $('#direction-picker');
    if (picker.hidden || state?.selectedPit === null) return;
    const outer = boardWrap.getBoundingClientRect();
    const pit = pitElements.get(state.selectedPit)?.getBoundingClientRect();
    if (!pit || !outer.width) return;
    const pickerWidth = picker.getBoundingClientRect().width || 220;
    const center = pit.left - outer.left + pit.width / 2;
    const clamped = Math.max(pickerWidth / 2 + 6, Math.min(outer.width - pickerWidth / 2 - 6, center));
    const top = state.selectedPit >= 7 ? pit.bottom - outer.top + 8 : pit.top - outer.top - (picker.offsetHeight || 44) - 8;
    picker.style.left = `${clamped}px`;
    picker.style.top = `${Math.max(6, Math.min(outer.height - (picker.offsetHeight || 44) - 6, top))}px`;
  }
  function renderBoard(extra = {}) {
    for (let pit = 0; pit < 12; pit += 1) renderPit(pit, displayed.pits[pit], E.hasQuan(displayed, pit));
    if (state) {
      pitElements.forEach((element, pit) => {
        element.classList.toggle('is-legal', state.legalPits.includes(pit));
        element.classList.toggle('is-selected', state.selectedPit === pit);
        element.classList.toggle('is-hint', state.hintMove?.pit === pit);
        element.disabled = !state.legalPits.includes(pit);
      });
    }
    if (extra.pickUpPit !== undefined) pulsePit(extra.pickUpPit, 'is-pick', 'BỐC!');
    if (extra.slapPit !== undefined) pulsePit(extra.slapPit, 'is-slap', 'CHẬP!');
    if (extra.landingPit !== undefined && !extra.opening && state?.phase !== 'opening') {
      flights.landingRipple(extra.landingPit, Math.max(0, displayed.pits[extra.landingPit] - 1));
    }
    if (extra.handCount !== undefined) handState = extra.handCount > 0 ? { pit: extra.handPit, count: extra.handCount } : null;
    if (extra.reset || extra.complete || extra.opening || extra.openingComplete) handState = null;
    $('#south-score').textContent = displayed.storeDan[0] + displayed.storeQuan[0] * 10;
    $('#north-score').textContent = displayed.storeDan[1] + displayed.storeQuan[1] * 10;
    $('#south-dan').textContent = displayed.storeDan[0]; $('#north-dan').textContent = displayed.storeDan[1];
    $('#south-quan').textContent = displayed.storeQuan[0]; $('#north-quan').textContent = displayed.storeQuan[1];
    requestAnimationFrame(() => { placeHandBadge(); positionDirectionPicker(); });
  }

  function playerName(player) {
    if (state?.mode === 'friend') return player === E.Player.NORTH ? state.players.player1 : state.players.player2;
    return player === E.Player.SOUTH ? 'Bạn' : 'Máy';
  }
  function levelName(level) { return ({ easy: 'Dễ', medium: 'Vừa', hard: 'Khó' })[level] || 'Dễ'; }
  function formatTime(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`; }
  let savedScrollY = 0;
  function showStartScreen() { $('#start-screen').hidden = false; }
  function hideStartScreen() { $('#start-screen').hidden = true; }
  function syncPresentation(next) {
    const playing = next.phase !== 'idle';
    const wasPlaying = document.body.classList.contains('oaq-playing');
    root.dataset.phase = next.phase;
    root.dataset.mode = next.mode;
    document.body.dataset.oaqPhase = next.phase;
    document.body.classList.toggle('oaq-playing', playing);
    if (playing && !wasPlaying) savedScrollY = window.scrollY;
    if (!playing && wasPlaying) requestAnimationFrame(() => window.scrollTo({ top: savedScrollY, behavior: 'auto' }));
    if (playing) hideStartScreen(); else showStartScreen();
    const mover = match.getGameState().toMove;
    $$('.oaq-score').forEach((score) => score.classList.toggle('is-active', playing && Number(score.dataset.player) === mover));
    $('.oaq-score-north').classList.toggle('is-thinking', next.phase === 'botThinking');
  }
  function renderState(next) {
    const previousPhase = state?.phase;
    const previousTurnBanner = state?.turnBanner ?? null;
    state = next;
    syncPresentation(next);
    $('#oaq-time').textContent = formatTime(next.elapsedSeconds);
    $('#south-name').textContent = playerName(E.Player.SOUTH); $('#north-name').textContent = playerName(E.Player.NORTH);
    $('#oaq-mode').textContent = next.mode === 'friend' ? 'Ô Ăn Quan · Chơi với bạn' : `Ô Ăn Quan · ${levelName(next.level)}`;
    $('#hint-count').textContent = next.hintsRemaining; $('#undo-count').textContent = next.mode === 'friend' ? '∞' : next.undosRemaining;
    $('#oaq-hint').disabled = next.phase !== 'humanTurn' || next.mode === 'friend' || next.hintsRemaining <= 0 || !!next.hintMove;
    $('#oaq-undo').disabled = next.phase !== 'humanTurn' || !next.canUndo || (next.mode === 'bot' && next.undosRemaining <= 0);
    $('#direction-picker').hidden = next.selectedPit === null || next.phase !== 'humanTurn';
    const status = {
      idle: 'Chọn “Bắt đầu” để chơi.', opening: 'Đang bày bàn…', botThinking: 'Máy đang nghĩ…',
      animating: 'Đang rải quân — chạm bàn cờ để tua nhanh', borrowing: `${playerName(match.getGameState().toMove)} hết quân, đang rải lại 5 dân`, gameOver: 'Ván chơi đã kết thúc.',
    }[next.phase] || (next.phase === 'humanTurn' ? `${playerName(match.getGameState().toMove)} — chọn một ô rồi chọn hướng rải` : '');
    $('#oaq-status').textContent = status;
    const banner = $('#turn-banner');
    if (next.turnBanner === null) banner.hidden = true;
    else if (next.turnBanner !== previousTurnBanner) { banner.textContent = `Lượt của ${playerName(next.turnBanner)}`; banner.hidden = false; banner.style.animation = 'none'; void banner.offsetWidth; banner.style.animation = ''; audio.play(next.turnBanner === E.Player.SOUTH ? 'turnYou' : 'turnBot'); }
    renderBoard();
    if (next.phase === 'gameOver' && previousPhase !== 'gameOver') showResult(next.result);
  }

  function showDialog(dialog, shouldPause = true) {
    if (shouldPause && state && !['idle', 'gameOver'].includes(state.phase)) { match.setPaused(true); audio.pause(); }
    if (!dialog.open) dialog.showModal();
  }
  function closeDialog(dialog, shouldResume = true) {
    if (dialog.open) dialog.close();
    if (shouldResume && state && !['idle', 'gameOver'].includes(state.phase)) { match.setPaused(false); audio.resume(); }
  }

  function start(config) {
    audio.unlock(); resultShown = false; lastConfig = config;
    hideStartScreen(); closeDialog($('#friend-dialog'), false); closeDialog($('#result-dialog'), false);
    if (config.mode === 'friend') match.startFriend(config.players); else match.startBot(config.level);
    track('start', { mode: config.mode, level: config.level || '' });
  }

  function onComplete(result) {
    audio.play(result.outcome); track('complete', { outcome: result.outcome, mode: result.mode, rank_score: result.rankScore });
  }
  function showResult(result) {
    if (resultShown) return; resultShown = true;
    const isFriend = result.mode === 'friend';
    const title = isFriend ? (result.winner === null ? 'Hòa nhau!' : `${playerName(result.winner)} thắng!`) : ({ win: 'Bạn thắng rồi!', draw: 'Hòa nhau!', loss: 'Máy thắng ván này' })[result.outcome];
    $('#result-title').textContent = title;
    $('#result-subtitle').textContent = `${formatTime(Math.floor(result.elapsedMs / 1000))}${isFriend ? ' · Ván chơi với bạn' : ` · ${levelName(state.level)}`}`;
    $('#result-art').src = `${assetRoot}result-${result.outcome}.png`;
    $('#result-south-name').textContent = playerName(E.Player.SOUTH); $('#result-north-name').textContent = playerName(E.Player.NORTH);
    countUp($('#result-south'), result.south.total); countUp($('#result-north'), result.north.total);
    const rows = [
      ['Dân ăn được', result.south.danCaptured, result.north.danCaptured],
      ['Quan ăn được', result.south.quanPoints, result.north.quanPoints],
      ['Dân còn trên hàng', result.south.danLeft, result.north.danLeft],
      ['Vay / nợ', signed(result.south.debt), signed(result.north.debt)],
    ];
    $('#result-breakdown').innerHTML = rows.map(([label, south, north]) => `<tr><td>${label}</td><td>${south}</td><td>${north}</td></tr>`).join('');
    $('#result-rank').textContent = isFriend ? 'Ván chơi với bạn không tính thành tích.' : `Điểm rank local: ${result.rankScore}${result.comboPoints ? ` · combo +${result.comboPoints}` : ''}`;
    showDialog($('#result-dialog'), false);
  }
  function signed(value) { return value > 0 ? `+${value}` : value < 0 ? `−${-value}` : '0'; }
  function countUp(element, target) {
    const started = performance.now();
    function frame(time) { const t = Math.min(1, (time - started) / 520); element.textContent = Math.round(target * (1 - (1 - t) ** 3)); if (t < 1) requestAnimationFrame(frame); }
    requestAnimationFrame(frame);
  }

  pitElements.forEach((element, pit) => element.addEventListener('click', () => { if (match.selectPit(pit)) { audio.play('select'); track('select_pit', { pit }); } }));
  $$('#direction-picker [data-direction]').forEach((button) => button.addEventListener('click', () => match.chooseDirection(Number(button.dataset.direction))));
  boardWrap.addEventListener('pointerdown', (event) => {
    if (state?.phase !== 'animating') return;
    if (event.target.closest('.oaq-direction, .oaq-status')) return;
    match.accelerateAnimation();
  });
  $('#oaq-hint').addEventListener('click', () => { if (match.requestHint()) track('hint'); });
  $('#oaq-undo').addEventListener('click', () => {
    if (!match.undo()) return;
    root.classList.remove('is-rewinding'); void root.offsetWidth; root.classList.add('is-rewinding');
    effectTimers.push(setTimeout(() => root.classList.remove('is-rewinding'), reducedMotion ? 20 : 480));
    track('undo');
  });
  $('#oaq-sound').addEventListener('click', () => {
    audio.setEnabled(!audio.enabled); const button = $('#oaq-sound'); button.setAttribute('aria-pressed', String(audio.enabled)); button.setAttribute('aria-label', audio.enabled ? 'Tắt âm thanh' : 'Bật âm thanh'); button.innerHTML = `<i data-lucide="${audio.enabled ? 'volume-2' : 'volume-x'}"></i>`; window.lucide?.createIcons();
  });
  $('#oaq-help').addEventListener('click', () => showDialog($('#help-dialog')));
  $('#start-help').addEventListener('click', () => { hideStartScreen(); showDialog($('#help-dialog'), false); });
  $('#start-share').addEventListener('click', async () => {
    const url = 'https://saptet.vn/o-an-quan.html';
    const data = { title: 'Ô Ăn Quan Online | Sắp Tết', text: 'Chơi Ô Ăn Quan dân gian trên Sắp Tết!', url };
    try {
      if (navigator.share) await navigator.share(data);
      else {
        await navigator.clipboard.writeText(url);
        const label = $('#start-share span'); label.textContent = 'Đã chép link';
        effectTimers.push(setTimeout(() => { label.textContent = 'Chia sẻ game'; }, 1400));
      }
    } catch (error) {
      if (error?.name !== 'AbortError') console.warn('Không thể chia sẻ game.', error);
    }
  });
  $('#pause-help').addEventListener('click', () => { closeDialog($('#pause-dialog'), false); showDialog($('#help-dialog'), false); });
  $('#oaq-pause').addEventListener('click', () => showDialog($('#pause-dialog')));
  let ignoreNextPauseClose = false;
  $('#pause-dialog').addEventListener('close', () => {
    if (ignoreNextPauseClose) { ignoreNextPauseClose = false; return; }
    if (!$('#help-dialog').open) { match.setPaused(false); audio.resume(); }
  });
  $('#help-dialog').addEventListener('close', () => {
    if (state?.phase === 'idle') showStartScreen(); else if (!$('#pause-dialog').open) { match.setPaused(false); audio.resume(); }
  });
  function exitToStart() { match.reset(); resultShown = false; closeDialog($('#pause-dialog'), false); closeDialog($('#exit-dialog'), false); closeDialog($('#result-dialog'), false); settings = storage.load(); $('#best-score').textContent = settings.highestScore; $('#best-rank').textContent = settings.bestRankScore; showStartScreen(); }
  function requestExit() {
    if (!state || ['idle', 'gameOver'].includes(state.phase)) { exitToStart(); return; }
    if ($('#pause-dialog').open) {
      ignoreNextPauseClose = true;
      $('#pause-dialog').close();
    }
    showDialog($('#exit-dialog'));
  }
  $('#exit-dialog').addEventListener('close', () => { if (state && !['idle', 'gameOver'].includes(state.phase)) { match.setPaused(false); audio.resume(); } });
  $('#confirm-exit').addEventListener('click', exitToStart);
  $('#oaq-exit').addEventListener('click', requestExit); $('#pause-exit').addEventListener('click', requestExit); $('#result-exit').addEventListener('click', exitToStart);
  $('#start-bot').addEventListener('click', () => start({ mode: 'bot', level: $('input[name="oaq-level"]:checked').value }));
  $('#open-friend').addEventListener('click', () => { hideStartScreen(); const saved = storage.load().friend; $('#friend-one').value = saved.player1; $('#friend-two').value = saved.player2; const radio = $(`input[name="friend-first"][value="${saved.first}"]`); if (radio) radio.checked = true; showDialog($('#friend-dialog'), false); });
  $('#friend-dialog').addEventListener('close', () => { if (state?.phase === 'idle') showStartScreen(); });
  $('#start-friend').addEventListener('click', () => start({ mode: 'friend', players: { player1: $('#friend-one').value, player2: $('#friend-two').value, first: Number($('input[name="friend-first"]:checked').value) } }));
  $('#result-replay').addEventListener('click', () => start(lastConfig));
  document.addEventListener('visibilitychange', () => { if (!state || ['idle', 'gameOver'].includes(state.phase)) return; match.setPaused(document.hidden); if (document.hidden) audio.pause(); else audio.resume(); });
  window.addEventListener('beforeunload', (event) => {
    if (!state || ['idle', 'gameOver'].includes(state.phase)) return;
    event.preventDefault();
    event.returnValue = '';
  });
  const portraitMedia = matchMedia('(orientation: portrait) and (max-width: 700px)');
  let rotateDismissed = false;
  function offerLandscapeHint() {
    const dialog = $('#rotate-dialog');
    if (!portraitMedia.matches || rotateDismissed || dialog.open) return;
    hideStartScreen();
    showDialog(dialog);
  }
  portraitMedia.addEventListener('change', (event) => {
    if (event.matches) {
      rotateDismissed = false;
      offerLandscapeHint();
    } else if ($('#rotate-dialog').open) {
      closeDialog($('#rotate-dialog'));
    }
  });
  $('#rotate-dialog').addEventListener('close', () => {
    rotateDismissed = true;
    if (state?.phase === 'idle') showStartScreen();
    else { match.setPaused(false); audio.resume(); }
  });
  window.addEventListener('resize', () => requestAnimationFrame(() => { flights.resize(); placeHandBadge(); positionDirectionPicker(); }));

  match.subscribe(renderState);
  settings = storage.load();
  $(`input[name="oaq-level"][value="${settings.level}"]`).checked = true;
  $('#best-score').textContent = settings.highestScore; $('#best-rank').textContent = settings.bestRankScore;
  $('#oaq-sound').setAttribute('aria-pressed', String(audio.enabled));
  renderBoard();
  showStartScreen();
  setTimeout(offerLandscapeHint, 250);
})();

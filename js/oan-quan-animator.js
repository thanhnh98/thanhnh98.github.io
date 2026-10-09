(function attachOanQuanAnimator(root, factory) {
  const api = factory(root && root.OanQuanEngine);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OanQuanAnimator = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createModule(browserEngine) {
  'use strict';

  const Engine = browserEngine || (typeof require === 'function' ? require('./oan-quan-engine') : null);
  const TIMINGS = Object.freeze({
    pickUp: 430, pickUpFlight: 260, pickUpStagger: 28,
    drop: 430, slap: 460, capture: 720, captureStagger: 32, borrow: 280, turnEnd: 440,
    openingFall: 480, openingQuanFall: 520, openingQuanGap: 150, openingDanStagger: 32, openingPause: 120,
  });

  function sampleFlight(from, to, progress, options = {}) {
    const raw = Math.max(0, Math.min(1, progress));
    const reducedMotion = options.reducedMotion === true;
    const flightEnd = reducedMotion ? 1 : 0.78;
    if (raw >= flightEnd && !reducedMotion) {
      const rebound = (raw - flightEnd) / (1 - flightEnd);
      return {
        x: to.x,
        groundY: to.y,
        y: to.y - Math.sin(Math.PI * rebound) * Math.max(5, to.size * 0.11) * (1 - rebound * 0.4),
        landingPulse: Math.exp(-Math.pow((raw - flightEnd) / 0.05, 2)),
      };
    }
    const flight = raw / flightEnd;
    const eased = flight * flight * (3 - 2 * flight);
    const x = from.x + (to.x - from.x) * eased;
    const groundY = from.y + (to.y - from.y) * eased;
    const height = reducedMotion ? Math.max(8, from.size * 0.2) : Math.max(24, from.size * 0.68);
    return { x, groundY, y: groundY - Math.sin(Math.PI * flight) * height, landingPulse: 0 };
  }

  function createEmptyBoard() {
    return Engine.createBoard({ pits: Array(12).fill(0), quanPresent: 0 });
  }

  function createAnimator(options = {}) {
    const reduced = options.reducedMotion === true;
    const hooks = options.hooks || {};
    let displayed = Engine.createBoard();
    let generation = 0;
    let fastForward = false;
    let skipRequested = false;
    let currentSleep = null;
    const scheduledLandings = new Set();

    function snapshot() { return Engine.cloneBoard(displayed); }
    function emit(extra = {}) { if (hooks.onDisplay) hooks.onDisplay(snapshot(), extra); }
    function duration(ms) {
      if (reduced) {
        if (ms <= 30) return Math.max(8, ms * 0.45);
        if (ms <= 200) return Math.max(45, ms * 0.45);
        return Math.max(120, ms * 0.4);
      }
      return Math.max(1, ms / (fastForward ? 8 : 1));
    }
    function sleep(ms, token) {
      if (skipRequested || token !== generation) return Promise.resolve(false);
      return new Promise((resolve) => {
        const started = Date.now();
        const total = duration(ms);
        const entry = { handle: null, resolve, started, total };
        entry.handle = setTimeout(() => {
          if (currentSleep === entry) currentSleep = null;
          resolve(token === generation && !skipRequested);
        }, total);
        currentSleep = entry;
      });
    }
    function wake(result = false) {
      if (!currentSleep) return;
      clearTimeout(currentSleep.handle);
      currentSleep.resolve(result);
      currentSleep = null;
    }
    function accelerateSleep() {
      if (!currentSleep) return;
      const entry = currentSleep;
      clearTimeout(entry.handle);
      const remaining = Math.max(0, entry.total - (Date.now() - entry.started)) / 8;
      entry.started = Date.now();
      entry.total = remaining;
      entry.handle = setTimeout(() => {
        if (currentSleep === entry) currentSleep = null;
        entry.resolve(!skipRequested);
      }, remaining);
    }
    function cancelScheduledLandings() {
      scheduledLandings.forEach((entry) => {
        clearTimeout(entry.handle);
        entry.resolve(false);
      });
      scheduledLandings.clear();
    }
    function scheduleLanding(ms, token, land) {
      if (skipRequested || token !== generation) return Promise.resolve(false);
      return new Promise((resolve) => {
        const entry = { handle: null, resolve };
        entry.handle = setTimeout(() => {
          scheduledLandings.delete(entry);
          if (token === generation && !skipRequested) {
            land();
            resolve(true);
          } else {
            resolve(false);
          }
        }, duration(ms));
        scheduledLandings.add(entry);
      });
    }

    function reset(board) {
      generation += 1;
      wake(false);
      cancelScheduledLandings();
      fastForward = false;
      skipRequested = false;
      if (hooks.onPlaybackRate) hooks.onPlaybackRate(1);
      displayed = Engine.cloneBoard(board);
      emit({ reset: true });
    }

    async function playOpening(finalBoard) {
      const token = ++generation;
      wake(false);
      cancelScheduledLandings();
      fastForward = false;
      skipRequested = false;
      if (hooks.onPlaybackRate) hooks.onPlaybackRate(1);
      displayed = createEmptyBoard();
      emit({ opening: true });
      const landingTasks = [];
      const quanPits = [0, 6].filter((pit) => Engine.hasQuan(finalBoard, pit));
      for (const pit of quanPits) {
        if (hooks.onOpeningDrop) hooks.onOpeningDrop({ pit, quan: true, duration: duration(TIMINGS.openingQuanFall) });
        landingTasks.push(scheduleLanding(TIMINGS.openingQuanFall, token, () => {
          displayed.quanPresent |= pit === 0 ? 1 : 2;
          emit({ landingPit: pit, quan: true, opening: true });
          if (hooks.onSound) hooks.onSound('quanLand');
        }));
        if (!await sleep(TIMINGS.openingQuanGap, token)) break;
      }
      await Promise.all(landingTasks.splice(0));
      if (!skipRequested && token === generation) await sleep(TIMINGS.openingPause, token);
      const order = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
      outer: for (let round = 0; round < 5; round += 1) {
        for (const pit of order) {
          if (skipRequested || token !== generation) break outer;
          if (hooks.onOpeningDrop) hooks.onOpeningDrop({ pit, quan: false, duration: duration(TIMINGS.openingFall) });
          landingTasks.push(scheduleLanding(TIMINGS.openingFall, token, () => {
            displayed.pits[pit] += 1;
            emit({ landingPit: pit, opening: true });
            if (hooks.onSound) hooks.onSound('drop');
          }));
          if (!await sleep(TIMINGS.openingDanStagger, token)) break outer;
        }
      }
      await Promise.all(landingTasks);
      if (token === generation) {
        displayed = Engine.cloneBoard(finalBoard);
        emit({ openingComplete: true });
      }
      return token === generation;
    }

    async function play(events, finalBoard, mover) {
      const token = ++generation;
      wake(false);
      cancelScheduledLandings();
      fastForward = false;
      skipRequested = false;
      if (hooks.onPlaybackRate) hooks.onPlaybackRate(1);
      let captures = 0;
      for (const event of events) {
        if (token !== generation || skipRequested) break;
        let ms = TIMINGS[event.type] || 0;
        if (event.type === 'pickUp') {
          displayed.pits[event.pit] = 0;
          if (hooks.onSound) hooks.onSound('pickUp');
          if (hooks.onFly) hooks.onFly({
            kind: 'pickUp', event, mover,
            phaseDuration: duration(ms),
            flightDuration: duration(TIMINGS.pickUpFlight),
            stagger: duration(TIMINGS.pickUpStagger),
          });
          emit({ pickUpPit: event.pit, handPit: event.pit, handCount: event.count });
        } else if (event.type === 'drop') {
          if (hooks.onSound) hooks.onSound('drop');
          if (hooks.onFly) hooks.onFly({ kind: 'drop', event, mover, phaseDuration: duration(ms), flightDuration: duration(ms), stagger: 0 });
          if (!await sleep(ms, token)) break;
          displayed.pits[event.pit] += 1;
          emit({ landingPit: event.pit, handPit: event.pit, handCount: event.handRemaining });
          continue;
        } else if (event.type === 'slap') {
          if (hooks.onSound) hooks.onSound('slap');
          emit({ slapPit: event.pit });
        } else if (event.type === 'capture') {
          captures += 1;
          if (hooks.onSound) hooks.onSound(event.quan ? 'captureQuan' : 'captureDan');
          if (hooks.onFly) hooks.onFly({
            kind: 'capture', event, mover,
            phaseDuration: duration(ms),
            flightDuration: duration(ms),
            stagger: duration(TIMINGS.captureStagger),
          });
          if (!await sleep(ms, token)) break;
          displayed.pits[event.pit] = 0;
          displayed.storeDan[event.to] += event.dan;
          if (event.quan) {
            displayed.quanPresent &= ~(event.pit === 0 ? 1 : 2);
            displayed.storeQuan[event.to] += 1;
          }
          emit({ capturePit: event.pit });
          if (captures >= 2 && hooks.onCombo) hooks.onCombo(Math.min(captures, 6));
          continue;
        } else if (event.type === 'borrowFromStore' || event.type === 'borrowFromOpponent') {
          ms = TIMINGS.borrow;
          if (hooks.onSound) hooks.onSound('borrow');
          if (hooks.onFly) hooks.onFly({ kind: 'borrow', event, mover, phaseDuration: duration(ms), flightDuration: duration(ms), stagger: 0 });
          emit({ borrowing: true });
        }
        if (!await sleep(ms, token)) break;
        emit();
      }
      if (token === generation) {
        displayed = Engine.cloneBoard(finalBoard);
        emit({ complete: true });
      }
      return { completed: token === generation, captures };
    }

    function accelerateOrSkip() {
      if (!fastForward) {
        fastForward = true;
        accelerateSleep();
        if (hooks.onPlaybackRate) hooks.onPlaybackRate(8);
        return 'fastForward';
      }
      skipRequested = true;
      wake(false);
      cancelScheduledLandings();
      if (hooks.onSnapToEnd) hooks.onSnapToEnd();
      return 'skip';
    }

    function cancel() {
      generation += 1;
      skipRequested = true;
      wake(false);
      cancelScheduledLandings();
      if (hooks.onCancel) hooks.onCancel();
    }

    return { TIMINGS, reset, playOpening, play, accelerateOrSkip, cancel, snapshot, isFastForward: () => fastForward };
  }

  return { TIMINGS, sampleFlight, createAnimator };
});

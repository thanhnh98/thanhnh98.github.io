(function (root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.TetRunnerEngine = api;
})(typeof window !== 'undefined' ? window : globalThis, function () {
  'use strict';

  function speedAt(elapsedSeconds) {
    return Math.min(16, 8 + Math.max(0, elapsedSeconds) * 0.08);
  }

  // Keep the physical game pace unchanged while the travelled-kilometre counter advances 1.4× faster.
  const KM_PER_WORLD_UNIT = 0.028;

  function kilometersAtDistance(distanceUnits) {
    const kilometers = Math.max(0, Number(distanceUnits) || 0) * KM_PER_WORLD_UNIT;
    return Math.round(kilometers * 100) / 100;
  }

  function journeyIndexAtKilometers(kilometers, stopCount, intervalKilometers) {
    const count = Math.max(1, Math.floor(Number(stopCount) || 1));
    const interval = Math.max(0.01, Number(intervalKilometers) || 1);
    return Math.floor(Math.max(0, Number(kilometers) || 0) / interval) % count;
  }

  function getVietnamYear(date) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
    }).formatToParts(date || new Date());
    return Number(parts.find((part) => part.type === 'year').value);
  }

  function createMascotRegistry(entries) {
    const mascots = (entries || []).filter((entry) => entry && Number.isFinite(entry.year));
    return {
      resolve(year) {
        const exact = mascots.find((entry) => entry.year === year);
        if (exact) return { ...exact, isFallback: false };
        const fallback = mascots.slice().sort((a, b) => b.year - a.year)[0];
        return fallback ? { ...fallback, isFallback: true } : null;
      },
    };
  }

  function spawnGapAt(elapsedSeconds, randomValue) {
    const progress = Math.min(1, Math.max(0, elapsedSeconds) / 120);
    const minimum = 1.5 - progress * 0.6;
    const maximum = 2.2 - progress * 0.85;
    const random = Math.min(1, Math.max(0, Number(randomValue) || 0));
    return minimum + (maximum - minimum) * random;
  }

  const GROUND_OBSTACLES = [
    { type: 'kumquat_planter', width: 1.32, height: 1.16 },
    { type: 'bamboo_fence', width: 1.65, height: 1.32 },
    { type: 'lantern_cart', width: 1.76, height: 1.2 },
    { type: 'tet_gifts', width: 1.28, height: 1.43 },
    { type: 'apricot_tree', width: 1.42, height: 1.55 },
    { type: 'peach_tree', width: 1.46, height: 1.58 },
  ];
  const OBSTACLES = [...GROUND_OBSTACLES, { type: 'firecracker_bundle', width: 1.72, height: 1.08, y: 0.92, overhead: true }];
  const COLLECTIBLES = ['envelope', 'banh_chung', 'banh_tet'];

  function comboMultiplier(combo) {
    if (combo >= 10) return 4;
    if (combo >= 6) return 3;
    if (combo >= 3) return 2;
    return 1;
  }

  function collectiblePoints(combo) {
    return 10 * comboMultiplier(combo);
  }

  function safeStorage(storage) {
    return {
      load() {
        try {
          const value = Number(storage && storage.getItem('sap_tet_runner_v2_high_score_km'));
          return Number.isFinite(value) && value > 0 ? Math.round(value * 100) / 100 : 0;
        } catch (_error) {
          return 0;
        }
      },
      save(value) {
        try {
          if (storage) storage.setItem('sap_tet_runner_v2_high_score_km', Number(value).toFixed(2));
        } catch (_error) {
          // Persistence is optional; gameplay must continue without it.
        }
      },
    };
  }

  function overlaps(a, b) {
    return a.left < b.right && a.right > b.left && a.bottom < b.top && a.top > b.bottom;
  }

  function createGame(options) {
    const config = options || {};
    const random = typeof config.random === 'function' ? config.random : Math.random;
    const persistence = safeStorage(config.storage);
    const playerX = -4.5;
    const playerWidth = 1.05;
    const playerHeight = 1.35;
    let state;
    let entities;
    let verticalVelocity;
    let spawnTimer;
    let coyoteRemaining;
    let jumpBufferRemaining;
    let crashReported;
    let milestoneIndex;
    const milestones = [1, 3, 5, 10];

    function reset(status) {
      state = {
        status: status || 'ready',
        elapsed: 0,
        distance: 0,
        score: 0,
        speed: 8,
        maxSpeed: 8,
        playerY: 0,
        grounded: true,
        ducking: false,
        jumpCount: 0,
        envelopes: 0,
        bonusPoints: 0,
        combo: 0,
        maxCombo: 0,
        multiplier: 1,
        highScore: persistence.load(),
        isHighScore: false,
        crashObstacleType: '',
      };
      entities = [];
      verticalVelocity = 0;
      spawnTimer = 1.65;
      coyoteRemaining = 0.08;
      jumpBufferRemaining = 0;
      crashReported = false;
      milestoneIndex = 0;
    }

    function requestJump() {
      if (state.status !== 'running') return false;
      jumpBufferRemaining = 0.1;
      if (state.grounded || coyoteRemaining > 0) {
        state.ducking = false;
        verticalVelocity = 14;
        state.grounded = false;
        state.jumpCount += 1;
        coyoteRemaining = 0;
        jumpBufferRemaining = 0;
        return true;
      }
      return false;
    }

    function requestDuck(active) {
      if (state.status !== 'running') {
        state.ducking = false;
        return false;
      }
      state.ducking = Boolean(active) && state.grounded;
      return state.ducking;
    }

    function start(jumpImmediately) {
      reset('running');
      if (jumpImmediately) requestJump();
      return getState();
    }

    function spawnObstacle() {
      const template = OBSTACLES[Math.min(OBSTACLES.length - 1, Math.floor(random() * OBSTACLES.length))];
      const obstacle = { ...template, kind: 'obstacle', id: `o-${state.elapsed}-${entities.length}`, x: 10.5, y: template.y || 0 };
      entities.push(obstacle);
      let clusterEnd = obstacle.x + obstacle.width / 2;
      const doubleChance = Math.min(0.34, 0.18 + state.elapsed / 600);
      if (!template.overhead && random() < doubleChance) {
        const secondTemplate = GROUND_OBSTACLES[Math.min(GROUND_OBSTACLES.length - 1, Math.floor(random() * GROUND_OBSTACLES.length))];
        const obstacleGap = 0.24 + random() * 0.18;
        const secondObstacle = {
          ...secondTemplate,
          kind: 'obstacle',
          id: `o-${state.elapsed}-${entities.length}`,
          x: obstacle.x + obstacle.width / 2 + secondTemplate.width / 2 + obstacleGap,
          y: 0,
        };
        entities.push(secondObstacle);
        clusterEnd = secondObstacle.x + secondObstacle.width / 2;
      }
      if (random() < 0.72) {
        const collectibleType = COLLECTIBLES[Math.min(COLLECTIBLES.length - 1, Math.floor(random() * COLLECTIBLES.length))];
        entities.push({
          kind: 'collectible',
          type: collectibleType,
          id: `e-${state.elapsed}-${entities.length}`,
          x: clusterEnd + 1.45 + random() * 1.2,
          y: 1.65 + random() * 1.25,
          width: 0.62,
          height: 0.48,
          collected: false,
        });
      }
      const clusterWidth = clusterEnd - obstacle.x + obstacle.width / 2;
      const fairMinimum = 0.9 + clusterWidth / Math.max(8, state.speed);
      spawnTimer = Math.max(fairMinimum, spawnGapAt(state.elapsed, random()));
    }

    function crash(obstacleType, events) {
      if (state.status === 'crashed') return;
      state.status = 'crashed';
      state.crashObstacleType = obstacleType;
      state.score = kilometersAtDistance(state.distance);
      state.isHighScore = state.score > state.highScore;
      if (state.isHighScore) {
        state.highScore = state.score;
        persistence.save(state.highScore);
      }
      if (!crashReported) {
        crashReported = true;
        events.push({ type: 'game_over', obstacleType });
      }
    }

    function update(deltaSeconds) {
      const events = [];
      if (state.status !== 'running') return { state: getState(), events };
      const delta = Math.min(0.05, Math.max(0, Number(deltaSeconds) || 0));
      if (!delta) return { state: getState(), events };

      state.elapsed += delta;
      state.speed = speedAt(state.elapsed);
      state.maxSpeed = Math.max(state.maxSpeed, state.speed);
      state.distance += state.speed * delta;
      state.score = kilometersAtDistance(state.distance);

      jumpBufferRemaining = Math.max(0, jumpBufferRemaining - delta);
      if (!state.grounded) {
        state.ducking = false;
        verticalVelocity -= 30 * delta;
        state.playerY += verticalVelocity * delta;
        if (state.playerY <= 0) {
          state.playerY = 0;
          state.grounded = true;
          verticalVelocity = 0;
          coyoteRemaining = 0.08;
          if (jumpBufferRemaining > 0) requestJump();
        }
      } else {
        coyoteRemaining = Math.max(0, coyoteRemaining - delta);
      }

      spawnTimer -= delta;
      if (spawnTimer <= 0) spawnObstacle();

      const playerBounds = {
        left: playerX - playerWidth * 0.425,
        right: playerX + playerWidth * 0.425,
        bottom: state.playerY + 0.08,
        top: state.playerY + playerHeight * (state.ducking ? 0.46 : 0.88),
      };

      for (const entity of entities) {
        entity.x -= state.speed * delta;
        if (entity.kind === 'obstacle') {
          const insetWidth = entity.width * 0.425;
          const bounds = entity.overhead
            ? { left: entity.x - insetWidth, right: entity.x + insetWidth, bottom: entity.y, top: entity.y + entity.height * 0.9 }
            : { left: entity.x - insetWidth, right: entity.x + insetWidth, bottom: 0.08, top: entity.height * 0.9 };
          if (overlaps(playerBounds, bounds)) crash(entity.type, events);
        } else if (!entity.collected) {
          const bounds = {
            left: entity.x - entity.width / 2,
            right: entity.x + entity.width / 2,
            bottom: entity.y - entity.height / 2,
            top: entity.y + entity.height / 2,
          };
          if (overlaps(playerBounds, bounds)) {
            entity.collected = true;
            state.combo += 1;
            state.maxCombo = Math.max(state.maxCombo, state.combo);
            state.multiplier = comboMultiplier(state.combo);
            state.envelopes += 1;
            const points = collectiblePoints(state.combo);
            state.bonusPoints += points;
            events.push({ type: 'collectible_collected', collectibleType: entity.type, combo: state.combo, points });
          } else if (entity.x < playerX - 1) {
            state.combo = 0;
            state.multiplier = 1;
            entity.collected = true;
            events.push({ type: 'combo_reset' });
          }
        }
        if (state.status === 'crashed') break;
      }

      entities = entities.filter((entity) => entity.x > -9 && !(entity.kind === 'collectible' && entity.collected));
      while (milestoneIndex < milestones.length && state.score >= milestones[milestoneIndex]) {
        events.push({ type: 'score_milestone', score: milestones[milestoneIndex] });
        milestoneIndex += 1;
      }
      return { state: getState(), events };
    }

    function pause() {
      if (state.status !== 'running') return false;
      state.status = 'paused';
      return true;
    }

    function resume() {
      if (state.status !== 'paused') return false;
      state.status = 'running';
      return true;
    }

    function replay() {
      reset('replaying');
      state.status = 'running';
      requestJump();
      return getState();
    }

    function getState() {
      return { ...state, entities: entities.map((entity) => ({ ...entity })) };
    }

    reset('ready');
    return { start, replay, requestJump, requestDuck, update, pause, resume, getState };
  }

  return {
    speedAt,
    kilometersAtDistance,
    journeyIndexAtKilometers,
    getVietnamYear,
    createMascotRegistry,
    spawnGapAt,
    comboMultiplier,
    collectiblePoints,
    createGame,
  };
});

const assert = require('node:assert/strict');
const test = require('node:test');

const runner = require('../js/tet-runner-engine.js');

test('runner speed increases over time and caps at sixteen units per second', () => {
  assert.equal(runner.speedAt(0), 8);
  assert.equal(runner.speedAt(50), 12);
  assert.equal(runner.speedAt(500), 16);
});

test('replay always resets elapsed time and speed after a fast run', () => {
  const game = runner.createGame({ random: () => 0.999 });
  game.start(false);
  for (let index = 0; index < 400; index += 1) {
    game.requestDuck(true);
    game.update(0.05);
  }
  assert.ok(game.getState().speed > 9);

  const replayed = game.replay();
  assert.equal(replayed.elapsed, 0);
  assert.equal(replayed.speed, 8);
  assert.equal(replayed.maxSpeed, 8);
  assert.equal(replayed.distance, 0);
});

test('score counts travelled kilometres at 1.4x while landmarks keep their configured interval', () => {
  assert.equal(runner.kilometersAtDistance(0), 0);
  assert.equal(runner.kilometersAtDistance(50), 1.4);
  assert.equal(runner.journeyIndexAtKilometers(9.99, 34, 10), 0);
  assert.equal(runner.journeyIndexAtKilometers(10, 34, 10), 1);
  assert.equal(runner.journeyIndexAtKilometers(340, 34, 10), 0);
  assert.equal(runner.journeyIndexAtKilometers(4.99, 34, 5), 0);
  assert.equal(runner.journeyIndexAtKilometers(5, 34, 5), 1);
});

test('mascot registry resolves the Vietnam calendar year and falls back safely', () => {
  const registry = runner.createMascotRegistry([
    { year: 2026, zodiacKey: 'horse', displayName: 'Ngựa' },
  ]);

  assert.equal(runner.getVietnamYear(new Date('2026-12-31T18:00:00Z')), 2027);
  assert.equal(registry.resolve(2026).zodiacKey, 'horse');
  assert.equal(registry.resolve(2027).zodiacKey, 'horse');
  assert.equal(registry.resolve(2027).isFallback, true);
});

test('spawn gaps tighten with difficulty without becoming impossible', () => {
  const early = runner.spawnGapAt(0, 0);
  const late = runner.spawnGapAt(200, 0);

  assert.equal(early, 1.5);
  assert.ok(late >= 0.9);
  assert.ok(late < early);
  assert.ok(runner.spawnGapAt(200, 1) <= 1.35);
});

test('the obstacle generator can create a fair double obstacle cluster', () => {
  const game = runner.createGame({ random: () => 0 });
  game.start(true);
  for (let index = 0; index < 34; index += 1) game.update(0.05);

  const obstacles = game.getState().entities.filter((entity) => entity.kind === 'obstacle');
  assert.equal(obstacles.length, 2);
  const edgeGap = obstacles[1].x - obstacles[1].width / 2 - (obstacles[0].x + obstacles[0].width / 2);
  assert.ok(edgeGap >= 0.18, 'double obstacles must remain visually separate');
  assert.ok(edgeGap <= 0.55, 'double obstacles must fit inside one jump arc');
});

test('one well-timed jump clears both obstacles in a double cluster', () => {
  const game = runner.createGame({ random: () => 0 });
  game.start(false);
  for (let tick = 0; tick < 420; tick += 1) {
    if (tick === 310) game.requestJump();
    game.update(0.01);
  }
  assert.equal(game.getState().status, 'running');
});

test('ducking lowers the horse hitbox and clears a hanging firecracker bundle', () => {
  const standing = runner.createGame({ random: () => 0.999 });
  standing.start(false);
  for (let tick = 0; tick < 380 && standing.getState().status === 'running'; tick += 1) standing.update(0.01);
  assert.equal(standing.getState().status, 'crashed');
  assert.equal(standing.getState().crashObstacleType, 'firecracker_bundle');

  const ducking = runner.createGame({ random: () => 0.999 });
  ducking.start(false);
  for (let tick = 0; tick < 380; tick += 1) {
    if (tick === 290) ducking.requestDuck(true);
    ducking.update(0.01);
  }
  assert.equal(ducking.getState().status, 'running');
  assert.equal(ducking.getState().ducking, true);
  ducking.requestDuck(false);
  assert.equal(ducking.getState().ducking, false);
});

test('the first input starts the run and performs the first jump', () => {
  const game = runner.createGame({ random: () => 0.5 });

  game.start(true);
  game.update(0.05);
  const state = game.getState();

  assert.equal(state.status, 'running');
  assert.ok(state.playerY > 0);
  assert.equal(state.jumpCount, 1);
});

test('the higher playful jump clears three vertical units', () => {
  const game = runner.createGame({ random: () => 0.5 });
  game.start(true);
  let peak = 0;
  for (let index = 0; index < 100; index += 1) {
    game.update(0.02);
    peak = Math.max(peak, game.getState().playerY);
  }
  assert.ok(peak > 3);
});

test('pausing freezes elapsed time and resuming continues from the same state', () => {
  const game = runner.createGame({ random: () => 0.5 });
  game.start(false);
  game.update(0.05);
  game.pause();
  const before = game.getState();
  game.update(1);
  assert.equal(game.getState().elapsed, before.elapsed);
  assert.equal(game.resume(), true);
  game.update(0.05);
  assert.ok(game.getState().elapsed > before.elapsed);
});

test('a collision ends the run once and stores a new high score safely', () => {
  const values = new Map();
  const storage = {
    getItem(key) { return values.get(key) || null; },
    setItem(key, value) { values.set(key, value); },
  };
  const game = runner.createGame({ random: () => 0.5, storage });
  game.start(false);
  const events = [];
  for (let index = 0; index < 200 && game.getState().status !== 'crashed'; index += 1) {
    events.push(...game.update(0.05).events);
  }
  events.push(...game.update(0.05).events);

  assert.equal(game.getState().status, 'crashed');
  assert.equal(events.filter((event) => event.type === 'game_over').length, 1);
  assert.equal(Number(values.get('sap_tet_runner_v2_high_score_km')), game.getState().highScore);
});

test('combo rewards grow at three, six and ten envelopes', () => {
  assert.equal(runner.comboMultiplier(2), 1);
  assert.equal(runner.comboMultiplier(3), 2);
  assert.equal(runner.comboMultiplier(6), 3);
  assert.equal(runner.comboMultiplier(10), 4);
  assert.equal(runner.collectiblePoints(1), 10);
  assert.equal(runner.collectiblePoints(3), 20);
  assert.equal(runner.collectiblePoints(6), 30);
  assert.equal(runner.collectiblePoints(10), 40);
});

test('blocked storage does not stop a run from starting', () => {
  const storage = {
    getItem() { throw new Error('blocked'); },
    setItem() { throw new Error('blocked'); },
  };
  const game = runner.createGame({ storage });
  assert.doesNotThrow(() => game.start(true));
  assert.equal(game.getState().highScore, 0);
});

const assert = require('node:assert/strict');
const test = require('node:test');
const Engine = require('../js/oan-quan-engine');
const Animator = require('../js/oan-quan-animator');

test('animation timings keep pickup phase separate from its stone flights', () => {
  assert.equal(Animator.TIMINGS.pickUp, 430);
  assert.equal(Animator.TIMINGS.pickUpFlight, 260);
  assert.equal(Animator.TIMINGS.pickUpStagger, 28);
  assert.equal(Animator.TIMINGS.drop, 430);
  assert.equal(Animator.TIMINGS.slap, 460);
  assert.equal(Animator.TIMINGS.capture, 720);
  assert.equal(Animator.TIMINGS.captureStagger, 32);
  assert.equal(Animator.TIMINGS.borrow, 280);
  assert.equal(Animator.TIMINGS.turnEnd, 440);
  assert.equal(Animator.TIMINGS.openingFall, 480);
  assert.equal(Animator.TIMINGS.openingQuanFall, 520);
  assert.equal(Animator.TIMINGS.openingDanStagger, 32);
});

test('sowing trajectory rises between pits and settles exactly on its slot', () => {
  const from = { x: 20, y: 80, size: 60 };
  const to = { x: 140, y: 90, size: 60 };
  const middle = Animator.sampleFlight(from, to, 0.38, { bouncing: true });
  const end = Animator.sampleFlight(from, to, 1, { bouncing: true });

  assert.ok(middle.x > from.x && middle.x < to.x);
  assert.ok(middle.y < Math.min(from.y, to.y) - 20, 'stone should visibly rise above both pits');
  assert.equal(end.x, to.x);
  assert.equal(end.y, to.y);
});

test('fast-forward and skip notify the visual layer', () => {
  const changes = [];
  const animator = Animator.createAnimator({
    hooks: {
      onPlaybackRate(rate) { changes.push(['rate', rate]); },
      onSnapToEnd() { changes.push(['snap']); },
    },
  });

  assert.equal(animator.accelerateOrSkip(), 'fastForward');
  assert.equal(animator.accelerateOrSkip(), 'skip');
  assert.deepEqual(changes, [['rate', 8], ['snap']]);
});

test('a sowing stone changes the destination only after it lands', async () => {
  const initial = Engine.createBoard({ pits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const finalBoard = Engine.createBoard({ pits: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const animator = Animator.createAnimator({ reducedMotion: true });
  animator.reset(initial);

  const playing = animator.play([{ type: 'drop', pit: 2, handRemaining: 0 }], finalBoard, Engine.Player.SOUTH);
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(animator.snapshot().pits[2], 0);
  animator.accelerateOrSkip();
  await playing;
  assert.equal(animator.snapshot().pits[2], 1);
});

test('cancelled animation cannot overwrite a newer board', async () => {
  const oldFinal = Engine.createBoard({ pits: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const newer = Engine.createBoard({ pits: [0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const animator = Animator.createAnimator({ reducedMotion: true });
  const playing = animator.play([{ type: 'drop', pit: 2, handRemaining: 0 }], oldFinal, Engine.Player.SOUTH);
  await new Promise((resolve) => setTimeout(resolve, 20));
  animator.cancel();
  animator.reset(newer);
  await playing;
  assert.deepEqual(animator.snapshot().pits, newer.pits);
});

test('opening keeps stones in flight before revealing them inside pits', async () => {
  const events = [];
  const animator = Animator.createAnimator({
    reducedMotion: true,
    hooks: {
      onOpeningDrop(payload) {
        if (!payload.quan) events.push({ type: 'fly', pit: payload.pit });
      },
      onDisplay(board, extra) {
        if (extra.opening && board.pits.some(Boolean)) {
          events.push({ type: 'land', count: board.pits.reduce((sum, value) => sum + value, 0) });
        }
      },
    },
  });

  await animator.playOpening(Engine.createBoard());
  const firstLanding = events.findIndex((event) => event.type === 'land');
  const flightsBeforeLanding = events.slice(0, firstLanding).filter((event) => event.type === 'fly').length;

  assert.ok(firstLanding >= 0, 'opening should eventually reveal a landed stone');
  assert.ok(flightsBeforeLanding >= 2, 'several stones should visibly fly before the first one appears in a pit');
});

test('reduced motion keeps each sowing stone visible instead of flashing', async () => {
  let dropDuration = 0;
  const initial = Engine.createBoard({ pits: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const finalBoard = Engine.createBoard({ pits: [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const animator = Animator.createAnimator({
    reducedMotion: true,
    hooks: {
      onFly(payload) {
        if (payload.kind === 'drop') dropDuration = payload.flightDuration;
      },
    },
  });

  animator.reset(initial);
  await animator.play([
    { type: 'pickUp', pit: 1, count: 1 },
    { type: 'drop', pit: 2, handRemaining: 0 },
  ], finalBoard, Engine.Player.SOUTH);

  assert.ok(dropDuration >= 120, `drop animation should stay legible, received ${dropDuration}ms`);
});

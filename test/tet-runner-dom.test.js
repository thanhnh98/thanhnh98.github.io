const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('homepage places one-viewport runner between sharing and daily content', () => {
  const html = read('index.html');
  const css = read('css/tet-runner.css');
  const share = html.indexOf('class="home-share-strip"');
  const runner = html.indexOf('id="tet-mascot-runner"');
  const today = html.indexOf('id="hom-nay"');

  assert.ok(share >= 0 && runner > share && today > runner);
  assert.match(html, /id="tet-mascot-runner"[^>]*data-home-section="game"/);
  assert.match(html, /<h2 id="tet-runner-heading">Ngựa Phi Đón Tết<\/h2>/);
  assert.match(css, /\.tet-runner-section\s*\{[\s\S]*?min-height:\s*100svh/);
});

test('runner is quick-play accessible and contains no in-page ad markup', () => {
  const html = read('index.html');
  const section = html.match(/<section id="tet-mascot-runner"[\s\S]*?<\/section>/)?.[0] || '';

  assert.match(section, /role="application"/);
  assert.match(section, /Chạm hoặc nhấn Space để nhảy/);
  assert.match(section, /id="tet-runner-replay"/);
  assert.match(section, /id="tet-runner-share-score"/);
  assert.match(section, /id="tet-runner-points-burst"/);
  assert.match(section, /id="tet-runner-result-horse"/);
  assert.match(section, /Chơi lại<\/button>/);
  assert.match(section, /google-side-rail-overlap="false"/);
  assert.doesNotMatch(section, /<ins\b|adsbygoogle|data-ad-slot/);
});

test('runner lazy loads Three.js and exposes lifecycle analytics without jump spam', () => {
  const loader = read('js/tet-runner-loader.js');
  const controller = read('js/tet-runner-three.js');

  assert.match(loader, /rootMargin:\s*'400px 0px'/);
  assert.match(loader, /import\('\.\/tet-runner-three\.bundle\.js/);
  assert.match(loader, /`web_game_tet_runner_\$\{action\}`/);
  assert.match(loader, /game_name:\s*'tet_mascot_runner'/);
  assert.match(loader, /analytics\.trackEvent/);
  assert.match(loader, /analytics\.trackGameAction/);
  for (const action of ['section_view', 'start', 'first_jump', 'score_milestone', 'game_over', 'replay', 'share_score']) {
    assert.match(controller, new RegExp(`track\\('${action}'`));
  }
  assert.doesNotMatch(controller, /track\('jump'/);
  assert.match(controller, /function requestReplayAd\([^)]*onComplete/);
});

test('runner runtime and pinned Three.js are loaded locally', () => {
  const html = read('index.html');
  const controller = read('js/tet-runner-three.js');
  const packageJson = JSON.parse(read('package.json'));

  assert.match(html, /js\/tet-runner-engine\.js/);
  assert.match(html, /js\/tet-runner-loader\.js/);
  assert.match(controller, /from 'three'/);
  assert.equal(packageJson.dependencies.three, '0.186.0');
  assert.equal(packageJson.devDependencies.esbuild, '0.21.5');
  assert.ok(fs.existsSync(path.join(root, 'js/tet-runner-three.bundle.js')));
  assert.ok(fs.existsSync(path.join(root, 'js/vendor/THREE-LICENSE.txt')));
});

test('runner visual refresh keeps gameplay readable and rewards player feedback', () => {
  const html = read('index.html');
  const css = read('css/tet-runner.css');
  const controller = read('js/tet-runner-three.js');
  const loader = read('js/tet-runner-loader.js');

  assert.match(html, /id="tet-runner-combo-burst"/);
  assert.match(html, /<small>Điểm<\/small><strong id="tet-runner-points">0<\/strong>/);
  assert.match(html, /id="tet-runner-final-points"/);
  assert.doesNotMatch(html.match(/<section id="tet-mascot-runner"[\s\S]*?<\/section>/)?.[0] || '', /Lộc Tết|lộc Tết/);
  assert.match(css, /\.tet-runner-ready\s*\{[^}]*inset:\s*auto/);
  assert.match(controller, /function createSkyGradient/);
  assert.match(controller, /function addGroundShadow/);
  assert.match(controller, /function emitParticles/);
  assert.match(controller, /Phi nước đại! ×4/);
  assert.match(controller, /createLanternGate/);
  assert.match(controller, /function createFlowerTree/);
  assert.match(controller, /function createBanhChung/);
  assert.match(controller, /function createBanhTet/);
  assert.match(controller, /function createFirecrackerBundle/);
  assert.match(controller, /setDuck\(true\)/);
  assert.match(controller, /setDuck\(false\)/);
  assert.match(controller, /game\.requestDuck\(active\)/);
  assert.match(html, /id="tet-runner-duck"/);
  assert.match(html, /Bánh chưng · bánh tét/);
  assert.match(controller, /horse\.scale\.setScalar\(\.8\)/);
  assert.match(controller, /decisiveStride/);
  assert.match(controller, /VIETNAM_JOURNEY/);
  assert.match(controller, /REGION_BACKGROUNDS/);
  const journeyRegistry = controller.match(/const VIETNAM_JOURNEY = \[([\s\S]*?)\n\];/)?.[1] || '';
  assert.equal((journeyRegistry.match(/province:/g) || []).length, 34);
  assert.match(controller, /const LANDMARK_INTERVAL_KM = 10/);
  assert.match(controller, /const VIETNAM_ROUTE = interleaveRegions/);
  assert.match(controller, /Còn .* km đến điểm tiếp theo/);
  assert.ok((controller.match(/assets\/images\/tet-runner\/[^']+\.webp/g) || []).length >= 9);
  assert.match(controller, /event\.key === 'ArrowDown'/);
  assert.match(controller, /assets\/sounds\/tet-runner-/);
  assert.match(controller, /background: '\/assets\/sounds\/tet-runner-background\.mp3'/);
  assert.match(controller, /failed: '\/assets\/sounds\/tet-runner-failed\.mp3'/);
  assert.match(controller, /crash: '\/assets\/sounds\/tet-runner-crash\.mp3'/);
  assert.match(controller, /action: '\/assets\/sounds\/tet-runner-action\.mp3'/);
  assert.match(controller, /playEffect\('failed'/);
  assert.match(controller, /playEffect\('crash'/);
  assert.ok(controller.indexOf("playEffect('crash'") < controller.indexOf("playEffect('failed'"));
  assert.ok((controller.match(/playEffect\('action'/g) || []).length >= 3);
  assert.match(controller, /name === 'background'\) audio\.loop = true/);
  assert.match(controller, /function playLandmarkTransition/);
  assert.match(controller, /background\.volume =/);
  assert.match(html, /<p class="tet-runner-kicker">Minigame<\/p>/);
  assert.doesNotMatch(html, /tet-runner-theme-label|Mini game một chạm/);
  assert.doesNotMatch(loader, /resolveSeasonTheme/);
  assert.doesNotMatch(controller, /mid_autumn|noel/);
  assert.doesNotMatch(css, /data-theme="mid_autumn"|data-theme="noel"/);
  assert.match(controller, /function createScoreShareImage/);
  assert.match(controller, /renderer\.render\(scene, camera\);/);
  assert.match(controller, /navigator\.share/);
  assert.match(controller, /function updateResultHorsePortrait/);
  assert.match(controller, /event\.points/);
  assert.match(controller, /pointsNode\.textContent = String\(state\.bonusPoints\)/);
  assert.match(controller, /finalPointsNode\.textContent = String\(state\.bonusPoints\)/);
  assert.match(css, /@keyframes tet-runner-points/);
  assert.match(controller, /runCyclePhase \+=/);
  assert.doesNotMatch(controller, /const runCycle = time \* \(state\.status === 'running'/);
});

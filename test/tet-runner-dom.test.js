const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('homepage places a lightweight game entry between sharing and daily content', () => {
  const html = read('index.html');
  const share = html.indexOf('class="home-share-strip"');
  const runner = html.indexOf('id="tet-runner-entry"');
  const today = html.indexOf('id="hom-nay"');

  assert.ok(share >= 0 && runner > share && today > runner);
  assert.match(html, /id="tet-runner-entry"[^>]*data-home-section="game"/);
  assert.match(html, /href="\/ngua-phi-don-tet\.html"/);
  assert.match(html, /home-game-entry-mascot[\s\S]*horse-mascot\.webp/);
  assert.doesNotMatch(html, /🐎/);
  assert.doesNotMatch(html, /id="tet-mascot-runner"|tet-runner-engine\.js|tet-runner-loader\.js|css\/tet-runner\.css/);
});

test('standalone runner is one viewport, quick-play accessible and contains no in-page ad markup', () => {
  const html = read('ngua-phi-don-tet.html');
  const css = read('css/tet-runner.css');
  const sitemap = read('sitemap.xml');
  const section = html.match(/<section id="tet-mascot-runner"[\s\S]*?<\/section>/)?.[0] || '';

  assert.match(html, /<link rel="canonical" href="https:\/\/saptet\.vn\/ngua-phi-don-tet\.html">/);
  assert.match(sitemap, /https:\/\/saptet\.vn\/ngua-phi-don-tet\.html/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.match(section, /<h1 id="tet-runner-heading">Ngựa Phi Đón Tết<\/h1>/);
  assert.match(css, /\.tet-runner-section\s*\{[\s\S]*?min-height:\s*100svh/);
  assert.match(css, /\.tet-runner-page \.tet-runner-section\s*\{[\s\S]*?height:\s*calc\(100svh - 74px\)/);
  assert.match(css, /\.tet-runner-page \.tet-runner-stage\s*\{[\s\S]*?height:\s*100%;[\s\S]*?max-height:\s*none;[\s\S]*?aspect-ratio:\s*auto/);
  assert.match(css, /@media \(max-width: 680px\) and \(orientation: portrait\)/);
  assert.match(section, /role="application"/);
  assert.match(section, /Chạm hoặc nhấn Space để nhảy/);
  assert.match(section, /id="tet-runner-replay"/);
  assert.match(section, /id="tet-runner-share-score"/);
  assert.match(section, /id="tet-runner-points-burst"/);
  assert.match(section, /<canvas id="tet-runner-result-horse"/);
  assert.match(section, /id="tet-runner-share-preview"[^>]+role="dialog"/);
  assert.match(section, /id="tet-runner-share-preview-image"/);
  assert.match(section, /id="tet-runner-share-preview-confirm"/);
  assert.match(section, /Chơi lại<\/button>/);
  assert.match(section, /google-side-rail-overlap="false"/);
  assert.doesNotMatch(section, /<ins\b|adsbygoogle|data-ad-slot/);
  assert.match(html, /id="tet-landmark-library"/);
  assert.match(html, /id="tet-landmark-library-grid"[^>]+role="list"/);
  assert.match(html, /id="tet-landmark-unlocked-count">1</);
  assert.ok(html.indexOf('id="tet-landmark-library"') > html.indexOf('id="tet-mascot-runner"'));
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
  for (const action of ['section_view', 'start', 'first_jump', 'score_milestone', 'game_over', 'replay', 'share_preview', 'share_score', 'landmark_unlock']) {
    assert.match(controller, new RegExp(`track\\('${action}'`));
  }
  assert.doesNotMatch(controller, /track\('jump'/);
  assert.match(controller, /function requestReplayAd\([^)]*onComplete/);
});

test('homepage game entry tracks the handoff without loading the runner', () => {
  const html = read('index.html');
  const retention = read('js/home-retention.js');

  assert.match(html, /data-home-game-entry/);
  assert.match(retention, /trackEvent\('home_game_open'/);
  assert.match(retention, /game_name:\s*'tet_mascot_runner'/);
});

test('game pages keep the games navigation tab active', () => {
  const loader = read('js/header-loader.js');
  const navigation = read('js/navigation.js');

  for (const page of ['tro-choi-tet.html', 'noi-chu.html', 'ngua-phi-don-tet.html']) {
    assert.match(loader, new RegExp(`filename === '${page.replace('.', '\\.')}'`));
    assert.match(navigation, new RegExp(`'/${page.replace('.', '\\.')}'`));
  }
  assert.match(loader, /return 'games'/);
});

test('runner runtime and pinned Three.js are loaded locally', () => {
  const html = read('ngua-phi-don-tet.html');
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

test('runner landmark registry covers the current 34 province-level units exactly once', () => {
  const controller = read('js/tet-runner-three.js');
  const journeyRegistry = controller.match(/const VIETNAM_JOURNEY = \[([\s\S]*?)\n\];/)?.[1] || '';
  const actualProvinces = [...journeyRegistry.matchAll(/province: '([^']+)'/g)]
    .map((match) => match[1])
    .sort((a, b) => a.localeCompare(b, 'vi'));
  const expectedProvinces = [
    'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng',
    'Đắk Lắk', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Nội',
    'Hà Tĩnh', 'Hải Phòng', 'Hưng Yên', 'Huế', 'Khánh Hòa', 'Lai Châu',
    'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Nghệ An', 'Ninh Bình', 'Phú Thọ',
    'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sơn La', 'Tây Ninh',
    'Thái Nguyên', 'Thanh Hóa', 'Thành phố Hồ Chí Minh', 'Tuyên Quang', 'Vĩnh Long',
  ].sort((a, b) => a.localeCompare(b, 'vi'));

  assert.deepEqual(actualProvinces, expectedProvinces);
  assert.equal(new Set(actualProvinces).size, 34);
});

test('runner visual refresh keeps gameplay readable and rewards player feedback', () => {
  const html = read('ngua-phi-don-tet.html');
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
  assert.match(controller, /const LANDMARK_INTERVAL_KM = 5/);
  assert.match(html, /Mỗi 5 km · địa danh mới/);
  assert.match(html, /Còn 5,00 km đến điểm tiếp theo/);
  assert.match(controller, /const VIETNAM_ROUTE = interleaveRegions/);
  assert.match(controller, /Còn .* km đến điểm tiếp theo/);
  assert.ok(new Set(controller.match(/assets\/images\/tet-runner\/[^']+\.webp/g) || []).size >= 15);
  assert.match(controller, /'Nghệ An': '\/assets\/images\/tet-runner\/central-lang-sen\.webp'/);
  assert.match(controller, /'Hà Tĩnh': '\/assets\/images\/tet-runner\/central-dong-loc-v2\.webp'/);
  assert.match(controller, /'Đồng Nai': '\/assets\/images\/tet-runner\/south-cat-tien\.webp'/);
  assert.ok(fs.existsSync(path.join(root, 'assets/images/tet-runner/south-cat-tien.webp')));
  assert.match(controller, /UNLOCKED_LANDMARKS_STORAGE_KEY/);
  assert.match(controller, /sap_tet_runner_v1_landmarks_unlocked/);
  assert.match(controller, /loading = 'lazy'/);
  assert.match(controller, /historicalUnlockCount/);
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
  assert.match(controller, /name === 'background' \? \.095/);
  assert.match(controller, /gallop: '\/assets\/sounds\/tet-runner-gallop\.mp3\?v=20260914b'/);
  assert.match(controller, /const GALLOP_START_OFFSET_S = 0/);
  assert.match(controller, /name === 'gallop' \? \.28/);
  assert.match(controller, /function restartGallop\(speed, minimumPlayMs = 0\)/);
  assert.match(controller, /gallop\.currentTime = GALLOP_START_OFFSET_S/);
  assert.match(controller, /restartGallop\(game\.getState\(\)\.speed, 900\)/);
  assert.match(controller, /state\.grounded && !wasGrounded[\s\S]*restartGallop\(state\.speed\)/);
  assert.match(controller, /syncGameAudio\(state\.status === 'running', state\.speed, state\.grounded\)/);
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

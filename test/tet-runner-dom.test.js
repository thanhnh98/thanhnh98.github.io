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
  assert.match(html, /id="tet-landmark-progress-label"/);
  assert.match(html, /id="tet-landmark-viewer"[^>]+role="dialog"/);
  assert.match(html, /id="tet-landmark-viewer-geography"/);
  assert.match(html, /id="tet-landmark-viewer-significance"/);
  assert.match(html, /id="tet-landmark-viewer-history"/);
  assert.match(html, /id="tet-landmark-viewer-source"/);
  assert.doesNotMatch(html, /id="tet-landmark-viewer-milestone"/);
  assert.match(html, /Các hình ảnh được sinh bằng AI \(Trí tuệ nhân tạo\)/);
  assert.ok(html.indexOf('id="tet-landmark-library"') > html.indexOf('id="tet-mascot-runner"'));
});

test('phone controls split left/right and the result screen links to the landmark library', () => {
  const html = read('ngua-phi-don-tet.html');
  const css = read('css/tet-runner.css');
  const controller = read('js/tet-runner-three.js');

  // Nút cúi né nằm ngoài khung game để chạm được ở đáy màn hình điện thoại.
  assert.ok(html.indexOf('id="tet-runner-duck"') > html.indexOf('id="tet-runner-fallback"'));
  assert.ok(html.indexOf('id="tet-runner-duck"') < html.indexOf('class="tet-runner-help"'));
  assert.match(css, /\.tet-runner-stage\.is-playing ~ \.tet-runner-duck/);
  assert.match(css, /\.tet-runner-page \.tet-runner-icon-button\s*\{[^}]*left:\s*max\(1rem, env\(safe-area-inset-left\)\)/);
  assert.match(css, /\.tet-runner-page \.tet-runner-duck\s*\{[^}]*right:\s*max\(1rem, env\(safe-area-inset-right\)\)/);

  // Chạm vùng trống quanh khung game cũng nhảy.
  assert.match(controller, /section\.addEventListener\('pointerdown'/);
  assert.match(controller, /if \(stage\.contains\(event\.target\)\) return;/);

  assert.match(html, /id="tet-runner-view-landmarks"[^>]*>.*Xem địa danh<\/button>/);
  assert.match(controller, /viewLandmarksButton/);
  assert.match(controller, /track\('view_landmarks'/);
  assert.match(controller, /landmarkLibrary\.scrollIntoView/);
  assert.match(css, /\.tet-landmark-library\s*\{[^}]*scroll-margin-top:/);
});

test('game-over dialog shows a wide crash snapshot with the full run breakdown', () => {
  const html = read('ngua-phi-don-tet.html');
  const css = read('css/tet-runner.css');
  const controller = read('js/tet-runner-three.js');

  // Bảng kết quả và preview chia sẻ nằm ngoài khung game để phủ trọn viewport điện thoại.
  assert.ok(html.indexOf('id="tet-runner-result"') > html.indexOf('id="tet-runner-fallback"'));
  assert.ok(html.indexOf('id="tet-runner-share-preview"') > html.indexOf('id="tet-runner-result"'));
  assert.match(css, /\.tet-runner-result-card\s*\{[\s\S]*?overflow-y:\s*auto/);

  // Ảnh khoảnh khắc thua: nguyên khung hình đang chơi, không crop.
  assert.match(html, /<canvas id="tet-runner-result-horse"[^>]*width="720"/);
  assert.match(controller, /targetWidth \* \(source\.height \/ source\.width\)/);
  assert.match(controller, /drawImage\(source, 0, 0, source\.width, source\.height, 0, 0, resultHorse\.width, resultHorse\.height\)/);
  assert.doesNotMatch(controller, /source\.width \* \.38/);
  // Ảnh bị giới hạn chiều cao theo tỉ lệ thật của khung game, cả bảng vừa 1 màn hình.
  assert.match(css, /\.tet-runner-result-horse\s*\{[^}]*var\(--shot-max-h/);
  assert.match(controller, /setProperty\('--shot-ratio'/);
  // Khối số liệu gọn: một hàng bốn ô liền mạch.
  assert.match(css, /\.tet-runner-result-stats\s*\{[^}]*grid-template-columns:\s*repeat\(4/);

  for (const id of [
    'tet-runner-result-milestone', 'tet-runner-result-obstacle', 'tet-runner-final-items',
    'tet-runner-final-time', 'tet-runner-result-landmark', 'tet-runner-result-progress',
    'tet-runner-result-record',
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
  assert.match(controller, /finalItemsNode\.textContent = String\(state\.envelopes\)/);
  assert.match(controller, /finalTimeNode\.textContent = formatDuration\(state\.elapsed\)/);
  assert.match(controller, /function formatDuration/);
  assert.match(controller, /resultMilestone\.textContent = reached\.milestoneLabel/);
  assert.match(controller, /resultRecord\.classList\.toggle\('is-record'/);
  assert.match(controller, /Đã mở khóa \$\{unlockedLandmarks\.size\}\/\$\{VIETNAM_ROUTE\.length\} địa danh/);
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
  for (const action of ['section_view', 'start', 'first_jump', 'score_milestone', 'game_over', 'replay', 'share_preview', 'share_score', 'landmark_unlock', 'landmark_view']) {
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

test('runner landmark registry covers 34 province-level units with independent milestones', () => {
  const controller = read('js/tet-runner-three.js');
  const journeyRegistry = controller.match(/const VIETNAM_JOURNEY = \[([\s\S]*?)\n\];/)?.[1] || '';
  const route = [...journeyRegistry.matchAll(/province: '([^']+)'/g)].map((match) => match[1]);
  const expectedRoute = [
    'Cao Bằng', 'Tuyên Quang', 'Lai Châu', 'Lào Cai', 'Lạng Sơn', 'Thái Nguyên',
    'Điện Biên', 'Phú Thọ', 'Bắc Ninh', 'Hà Nội', 'Quảng Ninh', 'Sơn La',
    'Hải Phòng', 'Hưng Yên', 'Ninh Bình', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh',
    'Quảng Trị', 'Huế', 'Đà Nẵng', 'Quảng Ngãi', 'Gia Lai', 'Đắk Lắk',
    'Khánh Hòa', 'Lâm Đồng', 'Đồng Nai', 'Tây Ninh', 'Thành phố Hồ Chí Minh',
    'An Giang', 'Đồng Tháp', 'Vĩnh Long', 'Cần Thơ', 'Cà Mau',
  ];
  const expectedProvinces = [
    'An Giang', 'Bắc Ninh', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng',
    'Đắk Lắk', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp', 'Gia Lai', 'Hà Nội',
    'Hà Tĩnh', 'Hải Phòng', 'Hưng Yên', 'Huế', 'Khánh Hòa', 'Lai Châu',
    'Lâm Đồng', 'Lạng Sơn', 'Lào Cai', 'Nghệ An', 'Ninh Bình', 'Phú Thọ',
    'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sơn La', 'Tây Ninh',
    'Thái Nguyên', 'Thanh Hóa', 'Thành phố Hồ Chí Minh', 'Tuyên Quang', 'Vĩnh Long',
  ].sort((a, b) => a.localeCompare(b, 'vi'));

  const orderedProvinces = route.filter((province, index) => province !== route[index - 1]);
  const provinceCounts = route.reduce((counts, province) => counts.set(province, (counts.get(province) || 0) + 1), new Map());

  assert.deepEqual(orderedProvinces, expectedRoute, 'provinces must progress from north to south');
  assert.deepEqual([...new Set(route)].sort((a, b) => a.localeCompare(b, 'vi')), expectedProvinces);
  assert.equal(route.length, 70);
  assert.equal(new Set(route).size, 34);
  assert.equal(provinceCounts.get('Đà Nẵng'), 3);
  assert.equal(provinceCounts.get('Khánh Hòa'), 3);
  assert.ok([...provinceCounts].every(([province, count]) => ['Đà Nẵng', 'Khánh Hòa'].includes(province) || count === 2));
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
  assert.equal((journeyRegistry.match(/province:/g) || []).length, 70);
  assert.match(controller, /const LANDMARK_INTERVAL_KM = 5/);
  assert.match(html, /Mỗi 5 km · địa danh mới/);
  assert.match(html, /Còn 5,00 km đến điểm tiếp theo/);
  assert.match(controller, /const VIETNAM_ROUTE = VIETNAM_JOURNEY/);
  assert.match(controller, /Còn .* km đến điểm tiếp theo/);
  assert.ok(new Set(controller.match(/assets\/images\/tet-runner\/[^']+\.webp/g) || []).size >= 15);
  assert.match(controller, /landmark: 'Làng Sen'.*central-lang-sen\.webp/);
  assert.match(controller, /landmark: 'Ngã ba Đồng Lộc'.*central-dong-loc-v2\.webp/);
  assert.match(controller, /landmark: 'Vườn quốc gia Cát Tiên'.*south-cat-tien\.webp/);
  assert.match(controller, /landmark: 'Phá Tam Giang'.*central-tam-giang\.webp/);
  assert.match(controller, /province: 'Đà Nẵng', landmark: 'Quần đảo Hoàng Sa'.*central-hoang-sa\.webp/);
  assert.match(controller, /province: 'Khánh Hòa', landmark: 'Quần đảo Trường Sa'.*central-truong-sa\.webp/);
  assert.ok(fs.existsSync(path.join(root, 'assets/images/tet-runner/south-cat-tien.webp')));
  assert.match(controller, /UNLOCKED_LANDMARKS_STORAGE_KEY/);
  assert.match(controller, /sap_tet_runner_v3_landmarks_unlocked/);
  assert.match(controller, /showAllLandmarks/);
  assert.match(controller, /previewAllLandmarks \|\| earned/);
  assert.match(controller, /Xem thử/);
  assert.match(controller, /function openLandmarkViewer/);
  assert.match(controller, /unlockedLandmarks\.has\(index\)/);
  assert.match(controller, /LANDMARK_DETAILS\[stop\.landmark\]/);
  assert.match(controller, /LANDMARK_CONTEXT\[stop\.landmark\]/);
  assert.match(controller, /Nguồn chính thức:/);
  assert.doesNotMatch(controller, /landmarkViewerMilestone/);
  assert.match(controller, /tet-landmark-card-open/);
  assert.match(controller, /event\.key === 'Escape'/);
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
  assert.match(controller, /function reachedLandmarkAt/);
  assert.match(controller, /milestoneLabel: milestoneKm === 0 \? 'ĐIỂM KHỞI HÀNH' : `CỘT MỐC \$\{milestoneKm\} KM`/);
  assert.match(controller, /reachedLandmark\.province.*reachedLandmark\.landmark/);
  assert.match(controller, /đến \$\{reachedLandmark\.landmark\} · \$\{reachedLandmark\.province\}/);
  assert.match(controller, /renderer\.render\(scene, camera\);/);
  assert.match(controller, /navigator\.share/);
  assert.match(controller, /function updateResultHorsePortrait/);
  assert.match(controller, /event\.points/);
  assert.match(controller, /pointsNode\.textContent = String\(state\.bonusPoints\)/);
  assert.match(controller, /finalPointsNode\.textContent = String\(state\.bonusPoints\)/);
  assert.match(css, /@keyframes tet-runner-points/);
  assert.match(css, /\.tet-landmark-viewer\s*\{/);
  assert.match(css, /\.tet-landmark-ai-disclaimer\s*\{/);
  assert.match(controller, /runCyclePhase \+=/);
  assert.doesNotMatch(controller, /const runCycle = time \* \(state\.status === 'running'/);
});

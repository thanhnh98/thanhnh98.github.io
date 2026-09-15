import * as THREE from 'three';

const COLORS = {
  cream: 0xffedc2,
  sky: 0x315f70,
  red: 0xc3293a,
  deepRed: 0x63152a,
  gold: 0xffc94f,
  green: 0x286450,
  jade: 0x54bca0,
  brown: 0x7a432f,
  darkBrown: 0x352333,
  orange: 0xd65a38,
  white: 0xfff9e9,
  purple: 0x57436f,
  dusk: 0xea8c65,
};

const VIETNAM_JOURNEY = [
  { province: 'Hà Nội', landmark: 'Hồ Gươm', region: 'north' },
  { province: 'Ninh Bình', landmark: 'Tràng An', region: 'north' },
  { province: 'Phú Thọ', landmark: 'Đền Hùng', region: 'north' },
  { province: 'Tuyên Quang', landmark: 'Na Hang', region: 'north' },
  { province: 'Lào Cai', landmark: 'Fansipan · Sa Pa', region: 'north' },
  { province: 'Lai Châu', landmark: 'Đèo Ô Quy Hồ', region: 'north' },
  { province: 'Điện Biên', landmark: 'Đồi A1', region: 'north' },
  { province: 'Sơn La', landmark: 'Cao nguyên Mộc Châu', region: 'north' },
  { province: 'Thái Nguyên', landmark: 'Hồ Núi Cốc', region: 'north' },
  { province: 'Cao Bằng', landmark: 'Thác Bản Giốc', region: 'north' },
  { province: 'Lạng Sơn', landmark: 'Núi Mẫu Sơn', region: 'north' },
  { province: 'Quảng Ninh', landmark: 'Vịnh Hạ Long', region: 'north' },
  { province: 'Hải Phòng', landmark: 'Quần đảo Cát Bà', region: 'north' },
  { province: 'Bắc Ninh', landmark: 'Chùa Dâu', region: 'north' },
  { province: 'Hưng Yên', landmark: 'Phố Hiến', region: 'north' },
  { province: 'Thanh Hóa', landmark: 'Thành Nhà Hồ', region: 'north' },
  { province: 'Nghệ An', landmark: 'Làng Sen', region: 'central' },
  { province: 'Hà Tĩnh', landmark: 'Ngã ba Đồng Lộc', region: 'central' },
  { province: 'Quảng Trị', landmark: 'Phong Nha · Kẻ Bàng', region: 'central' },
  { province: 'Huế', landmark: 'Kinh thành Huế', region: 'central' },
  { province: 'Đà Nẵng', landmark: 'Cầu Rồng · Hội An', region: 'central' },
  { province: 'Quảng Ngãi', landmark: 'Lý Sơn · Măng Đen', region: 'central' },
  { province: 'Gia Lai', landmark: 'Biển Hồ', region: 'central' },
  { province: 'Đắk Lắk', landmark: 'Buôn Đôn', region: 'central' },
  { province: 'Khánh Hòa', landmark: 'Vịnh Nha Trang', region: 'central' },
  { province: 'Lâm Đồng', landmark: 'Đà Lạt · Langbiang', region: 'central' },
  { province: 'Thành phố Hồ Chí Minh', landmark: 'Sông Sài Gòn', region: 'south' },
  { province: 'Đồng Nai', landmark: 'Vườn quốc gia Cát Tiên', region: 'south' },
  { province: 'Tây Ninh', landmark: 'Núi Bà Đen', region: 'south' },
  { province: 'Cần Thơ', landmark: 'Chợ nổi Cái Răng', region: 'south' },
  { province: 'Vĩnh Long', landmark: 'Miệt vườn sông nước', region: 'south' },
  { province: 'Đồng Tháp', landmark: 'Sen Tháp Mười', region: 'south' },
  { province: 'An Giang', landmark: 'Núi Sam · Phú Quốc', region: 'south' },
  { province: 'Cà Mau', landmark: 'Mũi Cà Mau', region: 'south' },
];

const LANDMARK_INTERVAL_KM = 5;
const UNLOCKED_LANDMARKS_STORAGE_KEY = 'sap_tet_runner_v1_landmarks_unlocked';

function interleaveRegions(stops) {
  const queues = ['north', 'central', 'south'].map((region) => stops.filter((stop) => stop.region === region));
  const route = [];
  while (queues.some((queue) => queue.length)) {
    queues.forEach((queue) => {
      if (queue.length) route.push(queue.shift());
    });
  }
  return route;
}

const VIETNAM_ROUTE = interleaveRegions(VIETNAM_JOURNEY);

const REGION_BACKGROUNDS = {
  north: [
    '/assets/images/tet-runner/vietnam-north.webp',
  ],
  central: [
    '/assets/images/tet-runner/vietnam-central.webp',
  ],
  south: [
    '/assets/images/tet-runner/vietnam-south.webp',
  ],
};

const LANDMARK_BACKGROUNDS = {
  'Hà Nội': '/assets/images/tet-runner/north-ho-guom.webp',
  'Ninh Bình': '/assets/images/tet-runner/north-trang-an.webp',
  'Lào Cai': '/assets/images/tet-runner/north-sapa.webp',
  'Cao Bằng': '/assets/images/tet-runner/north-ban-gioc.webp',
  'Quảng Ninh': '/assets/images/tet-runner/north-ha-long.webp',
  'Nghệ An': '/assets/images/tet-runner/central-lang-sen.webp',
  'Hà Tĩnh': '/assets/images/tet-runner/central-dong-loc-v2.webp',
  'Huế': '/assets/images/tet-runner/central-hue.webp',
  'Đà Nẵng': '/assets/images/tet-runner/central-hoi-an.webp',
  'Quảng Ngãi': '/assets/images/tet-runner/central-ly-son.webp',
  'Lâm Đồng': '/assets/images/tet-runner/central-da-lat.webp',
  'Thành phố Hồ Chí Minh': '/assets/images/tet-runner/south-saigon.webp',
  'Đồng Nai': '/assets/images/tet-runner/south-cat-tien.webp',
  'Cần Thơ': '/assets/images/tet-runner/south-cai-rang.webp',
  'Vĩnh Long': '/assets/images/tet-runner/south-mekong.webp',
  'Đồng Tháp': '/assets/images/tet-runner/south-mekong.webp',
  'An Giang': '/assets/images/tet-runner/south-mekong.webp',
  'Cà Mau': '/assets/images/tet-runner/south-mekong.webp',
};

const regionSceneCursor = { north: 0, central: 0, south: 0 };
VIETNAM_ROUTE.forEach((stop) => {
  const sceneIndex = regionSceneCursor[stop.region] % REGION_BACKGROUNDS[stop.region].length;
  stop.backgroundUrl = LANDMARK_BACKGROUNDS[stop.province] || REGION_BACKGROUNDS[stop.region][sceneIndex];
  stop.sceneKey = stop.backgroundUrl;
  regionSceneCursor[stop.region] += 1;
});

const BACKGROUND_SCENES = [...new Set(VIETNAM_ROUTE.map((stop) => stop.backgroundUrl))]
  .map((url) => ({ key: url, url }));

const SOUND_URLS = {
  background: '/assets/sounds/tet-runner-background.mp3',
  gallop: '/assets/sounds/tet-runner-gallop.mp3?v=20260914b',
  envelope: '/assets/sounds/tet-runner-envelope.mp3',
  crash: '/assets/sounds/tet-runner-crash.mp3',
  failed: '/assets/sounds/tet-runner-failed.mp3',
  action: '/assets/sounds/tet-runner-action.mp3',
  landmark: '/assets/sounds/tet-runner-landmark.mp3',
};
const GALLOP_START_OFFSET_S = 0;

function material(color, extra = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.86, metalness: 0.02, ...extra });
}

function mesh(geometry, color, position, scale, extraMaterial) {
  const item = new THREE.Mesh(geometry, material(color, extraMaterial));
  if (position) item.position.set(...position);
  if (scale) item.scale.set(...scale);
  return item;
}

function box(size, color, position) {
  return mesh(new THREE.BoxGeometry(...size), color, position);
}

function lowSphere(radius, color, position, scale, extraMaterial) {
  return mesh(new THREE.SphereGeometry(radius, 8, 6), color, position, scale, extraMaterial);
}

function cylinder(radiusTop, radiusBottom, height, color, position, segments = 7) {
  return mesh(new THREE.CylinderGeometry(radiusTop, radiusBottom, height, segments), color, position);
}

function addGroundShadow(group, width, opacity = .28) {
  const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x211526, transparent: true, opacity, depthWrite: false });
  const shadow = new THREE.Mesh(new THREE.CircleGeometry(width, 18), shadowMaterial);
  shadow.position.set(0, .045, .08);
  shadow.rotation.x = -Math.PI / 2;
  shadow.scale.y = .34;
  group.add(shadow);
  return shadow;
}

function createHorse() {
  const horse = new THREE.Group();
  horse.name = 'horse-mascot';

  const body = lowSphere(1, COLORS.orange, [0, 1.45, 0], [1.12, .56, .48]);
  horse.add(body);
  const chest = lowSphere(.55, 0xe46d42, [.62, 1.48, 0], [.78, 1, .88]);
  horse.add(chest);

  const neck = cylinder(.34, .46, 1.16, COLORS.orange, [.62, 1.95, 0]);
  neck.rotation.z = -.43;
  horse.add(neck);
  const head = lowSphere(.52, 0xe46d42, [1.04, 2.48, 0], [1.05, .76, .72]);
  head.rotation.z = -.12;
  horse.add(head);
  const muzzle = lowSphere(.34, 0xf5a45e, [1.43, 2.34, 0], [1.12, .72, .8]);
  horse.add(muzzle);

  const earGeometry = new THREE.ConeGeometry(.15, .48, 5);
  const earA = mesh(earGeometry, COLORS.orange, [.82, 2.96, .2]);
  const earB = mesh(earGeometry, COLORS.orange, [.82, 2.96, -.2]);
  earA.rotation.z = -.2;
  earB.rotation.z = -.2;
  horse.add(earA, earB);

  const eyeWhite = lowSphere(.11, COLORS.white, [1.27, 2.59, .38], [1, 1, .55]);
  const pupil = lowSphere(.06, COLORS.darkBrown, [1.31, 2.6, .44], [1, 1, .45]);
  horse.add(eyeWhite, pupil);

  const maneGeometry = new THREE.ConeGeometry(.18, .46, 5);
  for (let index = 0; index < 5; index += 1) {
    const mane = mesh(maneGeometry, COLORS.deepRed, [.23 + index * .14, 2.18 + index * .15, 0]);
    mane.rotation.z = 1.05;
    horse.add(mane);
  }

  const scarf = cylinder(.38, .38, .18, COLORS.red, [.72, 2.16, 0], 8);
  scarf.rotation.z = -.42;
  horse.add(scarf);
  const scarfTail = box([.62, .14, .08], COLORS.gold, [.2, 2.16, .06]);
  scarfTail.rotation.z = .22;
  horse.add(scarfTail);

  const saddle = lowSphere(.58, COLORS.red, [-.18, 1.77, .03], [1.08, .22, .72]);
  const saddleTrim = box([.82, .08, .55], COLORS.gold, [-.2, 1.68, .03]);
  horse.add(saddle, saddleTrim);

  const tailPivot = new THREE.Group();
  tailPivot.position.set(-1.02, 1.58, 0);
  const tail = cylinder(.05, .14, 1.05, COLORS.deepRed, [-.35, -.32, 0], 6);
  tail.rotation.z = -1.02;
  tailPivot.add(tail);
  horse.add(tailPivot);

  const legPivots = [];
  [[-.65, .15], [-.6, -.2], [.57, .17], [.62, -.2]].forEach(([x, z], index) => {
    const pivot = new THREE.Group();
    pivot.position.set(x, 1.17, z);
    const upper = cylinder(.13, .16, .72, index % 2 ? 0xd85a31 : COLORS.orange, [0, -.34, 0], 6);
    const lower = cylinder(.1, .12, .66, 0xf08b47, [0, -.98, 0], 6);
    const hoof = box([.3, .18, .28], COLORS.darkBrown, [.1, -1.28, 0]);
    pivot.add(upper, lower, hoof);
    horse.add(pivot);
    legPivots.push(pivot);
  });

  horse.userData = { legPivots, tailPivot, body, head, scarfTail, chest };
  horse.scale.setScalar(.88);
  return horse;
}

function addHorseAccessories(horse) {
  const accessories = new THREE.Group();
  accessories.name = 'horse-tet-accessories';
  const medallion = cylinder(.2, .2, .07, COLORS.gold, [.63, 2.05, .4], 10);
  medallion.rotation.x = Math.PI / 2;
  const plume = new THREE.Mesh(new THREE.ConeGeometry(.13, .58, 6), material(COLORS.red));
  plume.position.set(.7, 3.17, 0);
  plume.rotation.z = -.18;
  accessories.add(medallion, plume);
  horse.add(accessories);
  horse.userData.themeAccessories = accessories;
  return accessories;
}

function createEnvelope() {
  const group = new THREE.Group();
  group.add(box([.64, .46, .1], COLORS.red, [0, 0, 0]));
  const seal = cylinder(.1, .1, .04, COLORS.gold, [0, 0, .075], 8);
  seal.rotation.x = Math.PI / 2;
  group.add(seal);
  const fold = new THREE.Mesh(new THREE.ConeGeometry(.32, .26, 3), material(0x8d1020));
  fold.position.set(0, .11, .065);
  fold.rotation.z = Math.PI;
  fold.rotation.x = Math.PI / 2;
  group.add(fold);
  return group;
}

function createBanhChung() {
  const group = new THREE.Group();
  group.add(box([.58, .58, .22], 0x2f7950, [0, 0, 0]));
  group.add(box([.09, .61, .24], COLORS.gold, [0, 0, 0]));
  group.add(box([.61, .09, .24], 0xf6d36d, [0, 0, 0]));
  group.rotation.z = .08;
  return group;
}

function createBanhTet() {
  const group = new THREE.Group();
  const cake = cylinder(.22, .22, .78, 0x3b8755, [0, 0, 0], 9);
  cake.rotation.z = Math.PI / 2;
  group.add(cake);
  [-.24, 0, .24].forEach((x) => {
    const tie = cylinder(.235, .235, .055, COLORS.gold, [x, 0, 0], 9);
    tie.rotation.z = Math.PI / 2;
    group.add(tie);
  });
  group.rotation.z = -.1;
  return group;
}

function createCollectible(type) {
  if (type === 'banh_chung') return createBanhChung();
  if (type === 'banh_tet') return createBanhTet();
  return createEnvelope();
}

function createKumquatPlanter() {
  const group = new THREE.Group();
  addGroundShadow(group, .75);
  group.add(cylinder(.46, .34, .62, COLORS.purple, [0, .31, 0], 7));
  group.add(cylinder(.48, .48, .1, COLORS.gold, [0, .59, 0], 8));
  group.add(cylinder(.09, .11, .62, COLORS.brown, [0, .85, 0], 6));
  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2;
    group.add(lowSphere(.26, COLORS.green, [Math.cos(angle) * .34, 1.08 + (index % 2) * .22, Math.sin(angle) * .28]));
    group.add(lowSphere(.085, 0xffa735, [Math.cos(angle) * .42, 1.1 + (index % 3) * .18, Math.sin(angle) * .34]));
  }
  group.scale.setScalar(.83);
  return group;
}

function createFlowerTree(blossomColor) {
  const group = new THREE.Group();
  addGroundShadow(group, .82);
  group.add(cylinder(.43, .32, .48, COLORS.purple, [0, .24, 0], 7));
  group.add(cylinder(.1, .15, 1.22, COLORS.brown, [0, .94, 0], 7));
  const branches = [];
  [[-.34, 1.12, -.72], [.36, 1.2, .72], [-.24, 1.48, -.6], [.28, 1.56, .58]].forEach(([x, y, angle]) => {
    const branch = cylinder(.045, .075, .72, COLORS.brown, [x, y, 0], 6);
    branch.rotation.z = angle;
    branch.userData.baseRotation = angle;
    group.add(branch);
    branches.push(branch);
  });
  for (let index = 0; index < 14; index += 1) {
    const angle = index * 2.18;
    const radius = .28 + (index % 4) * .13;
    const blossom = lowSphere(.12, index % 4 === 0 ? COLORS.white : blossomColor, [Math.cos(angle) * radius, 1.24 + (index % 5) * .16, Math.sin(angle) * .22], [1, .72, 1]);
    group.add(blossom);
  }
  group.userData.swayParts = branches;
  return group;
}

function createBambooFence() {
  const group = new THREE.Group();
  addGroundShadow(group, 1.05);
  for (let index = 0; index < 5; index += 1) {
    const pole = cylinder(.08, .1, 1.35 + (index % 2) * .14, 0xb57b3f, [-.62 + index * .31, .68, 0], 6);
    group.add(pole);
  }
  group.add(box([1.65, .13, .18], COLORS.brown, [0, .42, 0]));
  group.add(box([1.65, .13, .18], COLORS.brown, [0, .98, 0]));
  const knot = lowSphere(.16, COLORS.red, [0, .74, .13], [1.2, .8, .45]);
  group.add(knot);
  const ribbon = box([.58, .13, .07], COLORS.red, [.28, .73, .12]);
  ribbon.rotation.z = -.28;
  group.add(ribbon);
  group.userData.movingParts = [ribbon];
  return group;
}

function createLanternCart() {
  const group = new THREE.Group();
  addGroundShadow(group, 1.08);
  group.add(box([1.48, .5, .72], COLORS.purple, [0, .48, 0]));
  const wheels = [];
  [-.55, .55].forEach((x) => {
    const wheel = cylinder(.27, .27, .12, COLORS.darkBrown, [x, .2, .42], 9);
    wheel.rotation.x = Math.PI / 2;
    group.add(wheel);
    wheels.push(wheel);
  });
  [-.42, .05, .48].forEach((x, index) => {
    const lantern = lowSphere(.27, index === 1 ? COLORS.gold : 0xe33443, [x, .95 + (index % 2) * .08, 0], [.82, 1.12, .82], { emissive: index === 1 ? 0x6b3900 : 0x52050d, emissiveIntensity: .55 });
    group.add(lantern);
  });
  group.userData.wheels = wheels;
  return group;
}

function createTetGifts() {
  const group = new THREE.Group();
  addGroundShadow(group, .9);
  [[-.32, .32, .58, COLORS.red], [.3, .3, .54, COLORS.jade], [.02, .82, .62, COLORS.purple]].forEach(([x, y, size, color]) => {
    group.add(box([size, size, size], color, [x, y, 0]));
    group.add(box([size * .14, size * 1.02, size * 1.02], COLORS.gold, [x, y, 0]));
  });
  return group;
}

function createFirecrackerBundle() {
  const group = new THREE.Group();
  const rope = cylinder(.035, .035, 1.7, COLORS.gold, [0, 1.02, 0], 7);
  rope.rotation.z = Math.PI / 2;
  group.add(rope);
  const firecrackers = [];
  [-.62, -.4, -.18, .04, .26, .48, .68].forEach((x, index) => {
    const cracker = cylinder(.1, .1, .5 + (index % 3) * .12, index % 2 ? 0xe7373f : COLORS.red, [x, .55 - (index % 2) * .09, 0], 8);
    cracker.rotation.z = index % 2 ? -.12 : .12;
    const cap = cylinder(.11, .11, .05, COLORS.gold, [x, .27 - (index % 2) * .09, 0], 8);
    group.add(cracker, cap);
    firecrackers.push(cracker);
  });
  group.add(lowSphere(.13, COLORS.gold, [0, 1.03, .04], [1.35, .8, .6]));
  group.userData.firecrackers = firecrackers;
  return group;
}

function createObstacle(type) {
  let obstacle;
  if (type === 'kumquat_planter') obstacle = createKumquatPlanter();
  else if (type === 'bamboo_fence') obstacle = createBambooFence();
  else if (type === 'lantern_cart') obstacle = createLanternCart();
  else if (type === 'apricot_tree') obstacle = createFlowerTree(0xffd04f);
  else if (type === 'peach_tree') obstacle = createFlowerTree(0xff789d);
  else if (type === 'firecracker_bundle') obstacle = createFirecrackerBundle();
  else obstacle = createTetGifts();
  obstacle.scale.multiplyScalar(1.16);
  return obstacle;
}

function createHouse(x, scale, colors) {
  const group = new THREE.Group();
  group.position.set(x, 0, -6);
  group.scale.setScalar(scale);
  group.add(box([2.2, 1.55, .8], colors[0], [0, .78, 0]));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.65, .85, 4), material(colors[1]));
  roof.position.set(0, 1.88, 0);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = .58;
  group.add(roof);
  group.add(box([.5, .85, .12], COLORS.deepRed, [0, .42, .47]));
  return group;
}

function createBlossomTree(x, z, scale) {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.scale.setScalar(scale);
  group.add(cylinder(.12, .2, 2.2, COLORS.brown, [0, 1.1, 0], 7));
  for (let index = 0; index < 9; index += 1) {
    const angle = index * 2.4;
    const radius = .42 + (index % 3) * .2;
    const color = index % 3 === 0 ? 0xff7a91 : 0xffb143;
    group.add(lowSphere(.24, color, [Math.cos(angle) * radius, 2.05 + (index % 4) * .22, Math.sin(angle) * radius], [1, .75, 1]));
  }
  return group;
}

function createSkyGradient() {
  const geometry = new THREE.PlaneGeometry(42, 18);
  const sky = new THREE.Mesh(geometry, new THREE.ShaderMaterial({
    depthWrite: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x172f4c) },
      middleColor: { value: new THREE.Color(0x59445f) },
      bottomColor: { value: new THREE.Color(0xb85c51) },
    },
    vertexShader: 'varying float vY; void main(){ vY = uv.y; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: 'varying float vY; uniform vec3 topColor; uniform vec3 middleColor; uniform vec3 bottomColor; void main(){ vec3 lower = mix(bottomColor, middleColor, smoothstep(0.0, .55, vY)); vec3 color = mix(lower, topColor, smoothstep(.45, 1.0, vY)); gl_FragColor = vec4(color, 1.0); }',
  }));
  sky.position.set(0, 4.2, -22);
  return sky;
}

function createCloud(x, y, scale) {
  const cloud = new THREE.Group();
  cloud.position.set(x, y, -15);
  cloud.scale.setScalar(scale);
  [[-.5, 0, .45], [0, .12, .62], [.58, -.02, .4]].forEach(([cx, cy, size]) => {
    cloud.add(lowSphere(size, 0xffe5c8, [cx, cy, 0], [1.35, .62, .35], { transparent: true, opacity: .55 }));
  });
  return cloud;
}

function createMountain(x, scale, color) {
  const mountain = new THREE.Mesh(new THREE.ConeGeometry(3.2, 4.5, 5), material(color));
  mountain.position.set(x, 1.35, -12);
  mountain.scale.set(scale, .7 * scale, .45);
  mountain.rotation.y = Math.PI / 5;
  return mountain;
}

function createLanternGate(x) {
  const gate = new THREE.Group();
  gate.position.set(x, 0, -4.1);
  gate.add(cylinder(.12, .16, 3.8, COLORS.darkBrown, [-1.6, 1.9, 0], 7));
  gate.add(cylinder(.12, .16, 3.8, COLORS.darkBrown, [1.6, 1.9, 0], 7));
  gate.add(box([3.7, .18, .2], COLORS.gold, [0, 3.55, 0]));
  const lanterns = [];
  [-1.18, -.58, 0, .58, 1.18].forEach((lx, index) => {
    const lantern = lowSphere(.22, index % 2 ? COLORS.gold : COLORS.red, [lx, 3.17, .08], [.82, 1.2, .82], { emissive: index % 2 ? 0x704000 : 0x600812, emissiveIntensity: .7 });
    gate.add(lantern);
    lanterns.push(lantern);
  });
  gate.userData.lanterns = lanterns;
  return gate;
}

function createPetal(color = 0xff9cad) {
  const petal = new THREE.Mesh(new THREE.CircleGeometry(.075, 5), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: .88, depthWrite: false }));
  petal.visible = false;
  return petal;
}

function createTetDecor() {
  const group = new THREE.Group();
  group.name = 'runner-tet-decor';
  group.userData.floaters = [];
  [-7.4, 7.5].forEach((x, index) => {
    const lantern = lowSphere(.26, index ? COLORS.gold : COLORS.red, [x, 4.7, -7.4], [.82, 1.18, .82], { emissive: index ? 0x704000 : 0x600812, emissiveIntensity: .7 });
    lantern.userData.baseY = lantern.position.y;
    lantern.userData.phase = index * 1.4;
    group.userData.floaters.push(lantern);
    group.add(lantern);
  });
  return group;
}

function requestReplayAd(_context, onComplete) {
  onComplete();
}

export function initTetRunner({ section, engine, track, showFallback }) {
  const stage = section.querySelector('#tet-runner-stage');
  const canvasHost = section.querySelector('#tet-runner-canvas');
  const ready = section.querySelector('#tet-runner-ready');
  const paused = section.querySelector('#tet-runner-paused');
  const result = section.querySelector('#tet-runner-result');
  const replayButton = section.querySelector('#tet-runner-replay');
  const shareScoreButton = section.querySelector('#tet-runner-share-score');
  const sharePreview = section.querySelector('#tet-runner-share-preview');
  const sharePreviewImage = section.querySelector('#tet-runner-share-preview-image');
  const sharePreviewClose = section.querySelector('#tet-runner-share-preview-close');
  const sharePreviewBack = section.querySelector('#tet-runner-share-preview-back');
  const sharePreviewConfirm = section.querySelector('#tet-runner-share-preview-confirm');
  const sharePreviewCopy = section.querySelector('#tet-runner-share-preview-copy');
  const sharePreviewDownload = section.querySelector('#tet-runner-share-preview-download');
  const duckButton = section.querySelector('#tet-runner-duck');
  const soundButton = section.querySelector('#tet-runner-sound');
  const scoreNode = section.querySelector('#tet-runner-score');
  const highScoreNode = section.querySelector('#tet-runner-high-score');
  const pointsNode = section.querySelector('#tet-runner-points');
  const comboNode = section.querySelector('#tet-runner-combo');
  const pointsBurst = section.querySelector('#tet-runner-points-burst');
  const comboBurst = section.querySelector('#tet-runner-combo-burst');
  const landmark = section.querySelector('#tet-runner-landmark');
  const locationCard = section.querySelector('#tet-runner-location');
  const provinceNode = section.querySelector('#tet-runner-province');
  const landmarkNameNode = section.querySelector('#tet-runner-landmark-name');
  const nextLocationNode = section.querySelector('#tet-runner-next-location');
  const finalScoreNode = section.querySelector('#tet-runner-final-score');
  const finalPointsNode = section.querySelector('#tet-runner-final-points');
  const finalComboNode = section.querySelector('#tet-runner-final-combo');
  const resultCopy = section.querySelector('#tet-runner-result-copy');
  const resultHorse = section.querySelector('#tet-runner-result-horse');
  const landmarkLibraryGrid = document.querySelector('#tet-landmark-library-grid');
  const unlockedLandmarkCount = document.querySelector('#tet-landmark-unlocked-count');
  if (!stage || !canvasHost || !duckButton) throw new Error('runner_dom_missing');

  const lowQuality = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4)
    || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !lowQuality, alpha: false, powerPreference: 'high-performance' });
  } catch (_error) {
    showFallback('webgl');
    return Promise.resolve();
  }
  if (!renderer.getContext()) {
    showFallback('webgl');
    return Promise.resolve();
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowQuality ? 1 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x172f4c);
  scene.fog = new THREE.Fog(0x51475c, 17, 36);
  const camera = new THREE.OrthographicCamera(-9, 9, 5.8, -1.6, .1, 80);
  camera.position.set(.4, 3.35, 13);
  camera.lookAt(.4, 2.35, 0);

  scene.add(createSkyGradient());
  scene.add(new THREE.HemisphereLight(0xffe3b4, 0x27243f, 2.65));
  const sunlight = new THREE.DirectionalLight(0xffdfae, 2.55);
  sunlight.position.set(-3, 8, 8);
  scene.add(sunlight);

  const sunGlow = new THREE.Mesh(new THREE.CircleGeometry(1.38, 28), new THREE.MeshBasicMaterial({ color: 0xffd878, transparent: true, opacity: .14, depthWrite: false, fog: false }));
  sunGlow.position.set(6.3, 4.35, -18.1);
  scene.add(sunGlow);
  const sun = new THREE.Mesh(new THREE.CircleGeometry(1.05, 28), new THREE.MeshBasicMaterial({ color: 0xffcf68, transparent: true, opacity: .94, depthWrite: false, fog: false }));
  sun.position.set(6.3, 4.35, -18);
  scene.add(sun);

  const world = new THREE.Group();
  scene.add(world);
  const ground = box([48, .65, 7], 0x211c2c, [2, -.33, 0]);
  world.add(ground);
  const road = box([48, .08, 3.2], 0x754554, [2, .02, .3]);
  world.add(road);
  const runwayEdge = box([48, .42, .14], 0x3b2033, [2, .2, -.45]);
  const runwayTrim = box([48, .055, .16], COLORS.gold, [2, .43, -.42]);
  world.add(runwayEdge, runwayTrim);

  const groundMarkers = [];
  for (let index = 0; index < 16; index += 1) {
    const marker = box([.72, .035, .42], index % 2 ? 0xe8a84f : 0xf3c98f, [-8 + index * 1.7, .08, .35]);
    marker.rotation.y = -.12;
    groundMarkers.push(marker);
    world.add(marker);
  }

  const backdrop = new THREE.Group();
  backdrop.add(createHouse(-8, 1.05, [0x735365, 0x8d3043]));
  backdrop.add(createHouse(-2.6, .8, [0x806071, 0x54283e]));
  backdrop.add(createHouse(3.2, 1.15, [0x684e66, 0x963447]));
  backdrop.add(createHouse(9, .88, [0x77566d, 0x4d385b]));
  backdrop.add(createBlossomTree(-4.1, -4.6, 1));
  backdrop.add(createBlossomTree(2.2, -5.2, .8));
  backdrop.add(createBlossomTree(8.2, -5.5, 1.1));
  world.add(backdrop);

  const hills = new THREE.Group();
  [-10, -4, 2, 8, 14].forEach((x, index) => hills.add(createMountain(x, index % 2 ? .85 : 1.08, index % 2 ? 0x53677a : 0x44596f)));
  scene.add(hills);

  const clouds = new THREE.Group();
  clouds.add(createCloud(-7, 4.7, 1.1), createCloud(1, 5.35, .72), createCloud(8, 4.9, .95));
  scene.add(clouds);

  const festivalLayer = new THREE.Group();
  const gates = [createLanternGate(-8), createLanternGate(4), createLanternGate(16)];
  festivalLayer.add(...gates);
  world.add(festivalLayer);

  const travelBackgrounds = new Map();
  let targetBackgroundScene = VIETNAM_ROUTE[0].sceneKey;
  let generatedBackgroundReady = false;
  const proceduralScenery = [backdrop, hills, clouds, sun, sunGlow];
  const textureLoader = new THREE.TextureLoader();
  BACKGROUND_SCENES.forEach(({ key, url }, index) => {
    const backgroundMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, fog: false });
    const backgroundPlane = new THREE.Mesh(new THREE.PlaneGeometry(22, 12.38), backgroundMaterial);
    backgroundPlane.position.set(.4, 3.55, -8.8 - index * .02);
    backgroundPlane.renderOrder = -5 + index;
    scene.add(backgroundPlane);
    travelBackgrounds.set(key, { plane: backgroundPlane, material: backgroundMaterial, loaded: false });
    textureLoader.load(url, (texture) => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      backgroundMaterial.map = texture;
      backgroundMaterial.needsUpdate = true;
      const entry = travelBackgrounds.get(key);
      entry.loaded = true;
      if (!generatedBackgroundReady && key === VIETNAM_ROUTE[0].sceneKey) {
        generatedBackgroundReady = true;
        backgroundMaterial.opacity = 1;
        proceduralScenery.forEach((object) => { object.visible = false; });
      }
    }, undefined, () => {
      // Procedural scenery remains available if a generated panorama cannot load.
    });
  });

  const tetDecor = createTetDecor();
  scene.add(tetDecor);

  const horseRegistry = engine.createMascotRegistry([{
    year: 2026,
    zodiacKey: 'horse',
    displayName: 'Ngựa',
    theme: 'binh-ngo',
    createModel: createHorse,
  }]);
  const mascotYear = engine.getVietnamYear(new Date());
  const mascot = horseRegistry.resolve(mascotYear);
  const horse = mascot.createModel();
  addHorseAccessories(horse);
  horse.position.x = -4.5;
  horse.scale.setScalar(.8);
  world.add(horse);

  const horseShadow = new THREE.Mesh(new THREE.CircleGeometry(.85, 20), new THREE.MeshBasicMaterial({ color: 0x201425, transparent: true, opacity: .38, depthWrite: false }));
  horseShadow.rotation.x = -Math.PI / 2;
  horseShadow.position.set(-4.45, .055, .18);
  horseShadow.scale.y = .32;
  world.add(horseShadow);

  const particles = Array.from({ length: lowQuality ? 22 : 44 }, (_, index) => {
    const particle = createPetal(index % 3 ? 0xff9aaf : 0xffd45c);
    particle.userData.life = 0;
    particle.userData.velocity = new THREE.Vector3();
    scene.add(particle);
    return particle;
  });

  const game = engine.createGame({ random: Math.random, storage: window.localStorage });
  const unlockedLandmarks = new Set([0]);
  const entityMeshes = new Map();
  let soundEnabled = false;
  let audioContext = null;
  let soundEffects = null;
  let inView = false;
  let pageVisible = !document.hidden;
  let autoPaused = false;
  let rafId = 0;
  let lastTime = performance.now();
  let runStartedAt = 0;
  let firstJumpTracked = false;
  let sectionViewed = false;
  let wasGrounded = true;
  let previousMultiplier = 1;
  let shakeUntil = 0;
  let currentJourneyIndex = -1;
  let duckVisual = 0;
  let runCyclePhase = 0;

  try {
    const storedLandmarks = JSON.parse(window.localStorage.getItem(UNLOCKED_LANDMARKS_STORAGE_KEY) || '[]');
    if (Array.isArray(storedLandmarks)) {
      storedLandmarks.forEach((index) => {
        if (Number.isInteger(index) && index >= 0 && index < VIETNAM_ROUTE.length) unlockedLandmarks.add(index);
      });
    }
  } catch (_error) {}

  const historicalUnlockCount = Math.min(
    VIETNAM_ROUTE.length,
    Math.floor(Math.max(0, game.getState().highScore) / LANDMARK_INTERVAL_KM) + 1,
  );
  for (let index = 0; index < historicalUnlockCount; index += 1) unlockedLandmarks.add(index);

  function persistUnlockedLandmarks() {
    try {
      window.localStorage.setItem(UNLOCKED_LANDMARKS_STORAGE_KEY, JSON.stringify([...unlockedLandmarks].sort((a, b) => a - b)));
    } catch (_error) {}
  }

  function renderLandmarkLibrary() {
    if (!landmarkLibraryGrid || !unlockedLandmarkCount) return;
    unlockedLandmarkCount.textContent = String(unlockedLandmarks.size);
    landmarkLibraryGrid.replaceChildren(...VIETNAM_ROUTE.map((stop, index) => {
      const unlocked = unlockedLandmarks.has(index);
      const card = document.createElement('article');
      card.className = `tet-landmark-card${unlocked ? ' is-unlocked' : ' is-locked'}`;
      card.dataset.landmarkIndex = String(index);
      card.setAttribute('role', 'listitem');

      const imageWrap = document.createElement('div');
      imageWrap.className = 'tet-landmark-card-image';
      const image = document.createElement('img');
      image.src = stop.backgroundUrl;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.alt = unlocked ? `${stop.landmark}, ${stop.province}` : '';
      imageWrap.appendChild(image);

      const status = document.createElement('span');
      status.className = 'tet-landmark-card-status';
      status.innerHTML = unlocked
        ? '<i data-lucide="badge-check" aria-hidden="true"></i> Đã mở khóa'
        : '<i data-lucide="lock-keyhole" aria-hidden="true"></i> Chưa mở khóa';
      imageWrap.appendChild(status);

      const copy = document.createElement('div');
      copy.className = 'tet-landmark-card-copy';
      const province = document.createElement('small');
      province.textContent = stop.province;
      const name = document.createElement('h3');
      name.textContent = unlocked ? stop.landmark : 'Địa danh bí mật';
      const requirement = document.createElement('span');
      requirement.textContent = index === 0 ? 'Điểm khởi hành' : `Mở khóa ở ${index * LANDMARK_INTERVAL_KM} km`;
      copy.append(province, name, requirement);
      card.append(imageWrap, copy);
      return card;
    }));
    window.lucide?.createIcons();
  }

  function unlockLandmark(index, kilometers) {
    if (unlockedLandmarks.has(index)) return;
    unlockedLandmarks.add(index);
    persistUnlockedLandmarks();
    renderLandmarkLibrary();
    const stop = VIETNAM_ROUTE[index];
    track('landmark_unlock', {
      landmark_index: index,
      province: stop.province,
      landmark: stop.landmark,
      distance_km: Number(kilometers.toFixed(2)),
      mascot_year: mascotYear,
    });
  }

  persistUnlockedLandmarks();
  renderLandmarkLibrary();

  try { soundEnabled = window.localStorage.getItem('sap_tet_runner_v1_sound') === 'true'; } catch (_error) {}

  function updateSoundButton() {
    soundButton.setAttribute('aria-pressed', String(soundEnabled));
    soundButton.setAttribute('aria-label', soundEnabled ? 'Tắt âm thanh trò chơi' : 'Bật âm thanh trò chơi');
    soundButton.innerHTML = soundEnabled
      ? '<i data-lucide="volume-2" aria-hidden="true"></i><span>Âm thanh</span>'
      : '<i data-lucide="volume-x" aria-hidden="true"></i><span>Âm thanh</span>';
    window.lucide?.createIcons();
  }

  function playTone(frequency, duration, wave = 'sine', volume = .05) {
    if (!soundEnabled) return;
    try {
      audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = wave;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
      oscillator.connect(gain).connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch (_error) {}
  }

  function ensureSoundEffects() {
    if (soundEffects) return soundEffects;
    soundEffects = Object.fromEntries(Object.entries(SOUND_URLS).map(([name, url]) => {
      const audio = new Audio(url);
      audio.preload = name === 'background' || name === 'gallop' ? 'auto' : 'none';
      audio.volume = name === 'background' ? .095 : (name === 'gallop' ? .28 : (name === 'failed' ? .2 : (name === 'action' ? .14 : .22)));
      if (name === 'background') audio.loop = true;
      if (name === 'gallop') audio.loop = true;
      return [name, audio];
    }));
    return soundEffects;
  }

  function playEffect(name, maxDurationMs) {
    if (!soundEnabled) return;
    const audio = ensureSoundEffects()[name];
    if (!audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
    if (maxDurationMs) {
      window.setTimeout(() => {
        if (!audio.paused) audio.pause();
      }, maxDurationMs);
    }
  }

  function playLandmarkTransition(journeyIndex) {
    if (!soundEnabled) return;
    const effects = ensureSoundEffects();
    const background = effects.background;
    background.volume = .025;
    playEffect('landmark', 1700);
    const melodies = [
      [523, 659, 784, 1047],
      [440, 554, 659, 880],
      [392, 523, 659, 784],
    ];
    const melody = melodies[journeyIndex % melodies.length];
    melody.forEach((frequency, index) => {
      window.setTimeout(() => playTone(frequency, .18, index === melody.length - 1 ? 'triangle' : 'sine', .035), index * 115);
    });
    window.setTimeout(() => {
      if (soundEnabled) background.volume = .095;
    }, 1250);
  }

  let gallopHoldUntil = 0;

  function restartGallop(speed, minimumPlayMs = 0) {
    if (!soundEnabled) return;
    const gallop = ensureSoundEffects().gallop;
    gallop.playbackRate = THREE.MathUtils.clamp((speed || 8) / 9, .88, 1.45);
    const seekToFirstStride = () => {
      try { gallop.currentTime = GALLOP_START_OFFSET_S; } catch (_error) {}
    };
    if (gallop.readyState >= 1) seekToFirstStride();
    else gallop.addEventListener('loadedmetadata', seekToFirstStride, { once: true });
    gallopHoldUntil = performance.now() + minimumPlayMs;
    gallop.play().catch(() => {});
  }

  function syncGameAudio(shouldPlay, speed, grounded = true) {
    if (!soundEnabled && !soundEffects) return;
    const effects = ensureSoundEffects();
    const gallop = effects.gallop;
    const background = effects.background;
    gallop.playbackRate = THREE.MathUtils.clamp((speed || 8) / 9, .88, 1.45);
    const shouldPlayGallop = soundEnabled && shouldPlay && (grounded || performance.now() < gallopHoldUntil);
    if (soundEnabled && shouldPlay) {
      if (background.paused) background.play().catch(() => {});
    } else if (!background.paused) {
      background.pause();
    }
    if (shouldPlayGallop && gallop.paused) gallop.play().catch(() => {});
    if (!shouldPlayGallop && !gallop.paused) gallop.pause();
  }

  function stopAllSounds() {
    if (!soundEffects) return;
    Object.values(soundEffects).forEach((audio) => audio.pause());
  }

  function resize() {
    const width = Math.max(1, canvasHost.clientWidth);
    const height = Math.max(1, canvasHost.clientHeight);
    const aspect = width / height;
    const viewHeight = 9;
    const viewWidth = viewHeight * aspect;
    camera.left = -viewWidth / 2 + .45;
    camera.right = viewWidth / 2 + .45;
    camera.top = 6.5;
    camera.bottom = -2.5;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.render(scene, camera);
  }

  function updateResultHorsePortrait() {
    if (!resultHorse || typeof resultHorse.getContext !== 'function') return;
    renderer.render(scene, camera);
    const source = renderer.domElement;
    const context = resultHorse.getContext('2d');
    const cropX = Math.round(source.width * .1);
    const cropY = Math.round(source.height * .5);
    const cropWidth = Math.round(source.width * .38);
    const cropHeight = Math.round(source.height * .5);
    context.clearRect(0, 0, resultHorse.width, resultHorse.height);
    context.drawImage(source, cropX, cropY, cropWidth, cropHeight, 0, 0, resultHorse.width, resultHorse.height);
  }

  function syncEntityMeshes(state) {
    const liveIds = new Set();
    state.entities.forEach((entity) => {
      liveIds.add(entity.id);
      let object = entityMeshes.get(entity.id);
      if (!object) {
        object = entity.kind === 'collectible' ? createCollectible(entity.type) : createObstacle(entity.type);
        object.userData.kind = entity.kind;
        object.userData.type = entity.type;
        object.userData.baseY = entity.y;
        entityMeshes.set(entity.id, object);
        world.add(object);
      }
      object.position.x = entity.x;
      object.position.y = entity.y;
    });
    entityMeshes.forEach((object, id) => {
      if (liveIds.has(id)) return;
      world.remove(object);
      object.traverse((child) => {
        child.geometry?.dispose?.();
        child.material?.dispose?.();
      });
      entityMeshes.delete(id);
    });
  }

  function formatKilometers(value) {
    return `${Number(value || 0).toFixed(2).replace('.', ',')} km`;
  }

  function createScoreShareImage(state) {
    const shareCanvas = document.createElement('canvas');
    shareCanvas.width = 1200;
    shareCanvas.height = 630;
    const context = shareCanvas.getContext('2d');
    renderer.render(scene, camera);
    context.drawImage(renderer.domElement, 0, 0, shareCanvas.width, shareCanvas.height);

    const shade = context.createLinearGradient(260, 0, 1200, 0);
    shade.addColorStop(0, 'rgba(42, 10, 28, 0.02)');
    shade.addColorStop(.52, 'rgba(60, 12, 29, 0.48)');
    shade.addColorStop(1, 'rgba(55, 8, 20, 0.94)');
    context.fillStyle = shade;
    context.fillRect(0, 0, 1200, 630);

    context.fillStyle = '#ffd45c';
    context.font = '800 24px system-ui, sans-serif';
    context.fillText('SẮP TẾT · MINIGAME', 760, 105);
    context.fillStyle = '#fff8e8';
    context.font = '900 50px system-ui, sans-serif';
    context.fillText('Ngựa Phi Đón Tết', 760, 170);
    context.fillStyle = '#ffe6a3';
    context.font = '700 25px system-ui, sans-serif';
    context.fillText('Mình đã phi được', 760, 235);
    context.fillStyle = '#ffffff';
    context.font = '1000 80px system-ui, sans-serif';
    context.fillText(formatKilometers(state.score), 760, 320);
    context.fillStyle = '#fff1c9';
    context.font = '700 25px system-ui, sans-serif';
    context.fillText(`${state.bonusPoints} điểm · Combo cao nhất ${state.maxCombo}`, 760, 375);
    context.fillStyle = '#ffd45c';
    context.font = '800 24px system-ui, sans-serif';
    context.fillText('Bạn có vượt được mình không?', 760, 455);
    context.fillStyle = 'rgba(255, 248, 232, .82)';
    context.font = '600 20px system-ui, sans-serif';
    context.fillText('saptet.vn', 760, 510);
    return shareCanvas;
  }

  function canvasToPngFile(canvas) {
    const [header, data] = canvas.toDataURL('image/png').split(',');
    const mimeType = header.match(/:(.*?);/)?.[1] || 'image/png';
    const binary = window.atob(data);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return new File([bytes], 'ngua-phi-don-tet.png', { type: mimeType });
  }

  let pendingShareCanvas = null;

  function closeSharePreview() {
    sharePreview?.setAttribute('hidden', '');
    if (sharePreviewImage) sharePreviewImage.removeAttribute('src');
    pendingShareCanvas = null;
    shareScoreButton?.focus({ preventScroll: true });
  }

  function openSharePreview() {
    const state = game.getState();
    pendingShareCanvas = createScoreShareImage(state);
    sharePreviewImage.src = pendingShareCanvas.toDataURL('image/png');
    sharePreview.removeAttribute('hidden');
    sharePreviewConfirm.focus({ preventScroll: true });
    track('share_preview', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
  }

  async function shareScore() {
    const state = game.getState();
    const file = canvasToPngFile(pendingShareCanvas || createScoreShareImage(state));
    const shareData = {
      title: 'Ngựa Phi Đón Tết',
      text: `Mình đã phi được ${formatKilometers(state.score)} trong Ngựa Phi Đón Tết. Bạn có vượt được không? saptet.vn/ngua-phi-don-tet.html`,
      files: [file],
    };
    let method = 'download';
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        method = 'native_image';
        await navigator.share(shareData);
        shareScoreButton.classList.add('is-done');
        shareScoreButton.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Đã chia sẻ';
      } else {
        downloadScoreImage();
        shareScoreButton.classList.add('is-done');
        shareScoreButton.innerHTML = '<i data-lucide="download" aria-hidden="true"></i> Đã lưu ảnh';
      }
      closeSharePreview();
      window.lucide?.createIcons();
      track('share_score', { score: state.score, bonus_points: state.bonusPoints, method, mascot_year: mascotYear });
    } catch (error) {
      if (error?.name !== 'AbortError') {
        shareScoreButton.textContent = 'Thử chia sẻ lại';
      }
    }
  }

  function downloadScoreImage() {
    const state = game.getState();
    const file = canvasToPngFile(pendingShareCanvas || createScoreShareImage(state));
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = file.name;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    track('download_score_image', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
  }

  async function copyScoreImage() {
    const state = game.getState();
    const canvas = pendingShareCanvas || createScoreShareImage(state);
    try {
      if (!navigator.clipboard?.write || typeof ClipboardItem === 'undefined') {
        throw new Error('Clipboard API not supported');
      }
      const blob = await new Promise((resolve, reject) => {
        canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
      });
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      if (sharePreviewCopy) {
        sharePreviewCopy.innerHTML = '<i data-lucide="check" aria-hidden="true"></i> Đã sao chép';
        sharePreviewCopy.classList.add('is-done');
        window.lucide?.createIcons();
        window.setTimeout(() => {
          sharePreviewCopy.innerHTML = '<i data-lucide="copy" aria-hidden="true"></i> Sao chép ảnh';
          sharePreviewCopy.classList.remove('is-done');
          window.lucide?.createIcons();
        }, 2000);
      }
      track('copy_score_image', { score: state.score, bonus_points: state.bonusPoints, mascot_year: mascotYear });
    } catch (error) {
      downloadScoreImage();
      if (sharePreviewCopy) {
        sharePreviewCopy.innerHTML = '<i data-lucide="download" aria-hidden="true"></i> Đã lưu ảnh';
        window.lucide?.createIcons();
      }
    }
  }

  function updateHud(state) {
    scoreNode.textContent = formatKilometers(state.score);
    highScoreNode.textContent = formatKilometers(state.highScore);
    pointsNode.textContent = String(state.bonusPoints);
    comboNode.textContent = `×${state.multiplier}`;
  }

  function emitParticles(x, y, count, mode = 'petal') {
    let emitted = 0;
    particles.forEach((particle, index) => {
      if (emitted >= count || particle.userData.life > 0) return;
      emitted += 1;
      particle.visible = true;
      particle.material.color.setHex(mode === 'dust' ? (index % 2 ? 0xe5aa73 : 0xffcf86) : (index % 3 ? 0xff9aaf : 0xffd45c));
      particle.material.opacity = .9;
      particle.position.set(x + (Math.random() - .5) * .35, y + Math.random() * .18, .7 + Math.random() * .5);
      particle.scale.setScalar(mode === 'dust' ? 1.6 : 1);
      particle.userData.life = .55 + Math.random() * .4;
      particle.userData.velocity.set((Math.random() - .55) * 2.7, .9 + Math.random() * 2.5, (Math.random() - .5) * .25);
      particle.userData.spin = (Math.random() - .5) * .25;
    });
  }

  function animateParticles(delta) {
    particles.forEach((particle) => {
      if (particle.userData.life <= 0) return;
      particle.userData.life -= delta;
      if (particle.userData.life <= 0) {
        particle.visible = false;
        return;
      }
      particle.userData.velocity.y -= 4.6 * delta;
      particle.position.addScaledVector(particle.userData.velocity, delta);
      particle.rotation.z += particle.userData.spin;
      particle.material.opacity = Math.min(.9, particle.userData.life * 1.5);
    });
  }

  function flashMessage(node, text) {
    if (!node) return;
    window.clearTimeout(node._flashTimer);
    node.textContent = text;
    node.hidden = false;
    node.classList.remove('is-visible');
    void node.offsetWidth;
    node.classList.add('is-visible');
    node._flashTimer = window.setTimeout(() => { node.hidden = true; }, 1500);
  }

  function updateJourney(kilometers) {
    const journeyIndex = engine.journeyIndexAtKilometers(kilometers, VIETNAM_ROUTE.length, LANDMARK_INTERVAL_KM);
    const completedInLeg = Math.max(0, kilometers) % LANDMARK_INTERVAL_KM;
    const remaining = LANDMARK_INTERVAL_KM - completedInLeg;
    if (nextLocationNode) nextLocationNode.textContent = `Còn ${remaining.toFixed(2).replace('.', ',')} km đến điểm tiếp theo`;
    unlockLandmark(journeyIndex, kilometers);
    if (journeyIndex === currentJourneyIndex) return;
    currentJourneyIndex = journeyIndex;
    const stop = VIETNAM_ROUTE[journeyIndex];
    targetBackgroundScene = stop.sceneKey;
    provinceNode.textContent = stop.province;
    landmarkNameNode.textContent = stop.landmark;
    locationCard.classList.remove('is-arriving');
    void locationCard.offsetWidth;
    locationCard.classList.add('is-arriving');
    if (kilometers > 0) {
      flashMessage(landmark, `${stop.province} · ${stop.landmark}`);
      playLandmarkTransition(journeyIndex);
    }
  }

  function animateTravelBackgrounds(delta) {
    const requested = travelBackgrounds.get(targetBackgroundScene);
    const targetScene = requested?.loaded
      ? targetBackgroundScene
      : [...travelBackgrounds.entries()].find(([, entry]) => entry.loaded)?.[0];
    travelBackgrounds.forEach((entry, sceneKey) => {
      const targetOpacity = generatedBackgroundReady && sceneKey === targetScene ? 1 : 0;
      entry.material.opacity = THREE.MathUtils.damp(entry.material.opacity, targetOpacity, 3.8, delta);
    });
  }

  function showGameOver(state) {
    stage.classList.remove('is-playing');
    syncGameAudio(false, state.speed);
    finalScoreNode.textContent = formatKilometers(state.score);
    finalPointsNode.textContent = String(state.bonusPoints);
    finalComboNode.textContent = String(state.maxCombo);
    const obstacleNames = {
      kumquat_planter: 'Chậu quất',
      bamboo_fence: 'Hàng rào tre',
      lantern_cart: 'Xe đèn lồng',
      tet_gifts: 'Núi quà Tết',
      apricot_tree: 'Cây hoa mai',
      peach_tree: 'Cây hoa đào',
      firecracker_bundle: 'Chùm pháo Tết',
    };
    const scoreGap = Math.max(0, state.highScore - state.score);
    resultCopy.textContent = state.isHighScore
      ? 'Kỷ lục mới! Mã đáo thành công rồi!'
      : `${obstacleNames[state.crashObstacleType] || 'Chướng ngại'} chặn đường — còn ${formatKilometers(scoreGap)} để bắt kịp kỷ lục.`;
    shakeUntil = performance.now() + 280;
    emitParticles(-4.1, 1.1, lowQuality ? 8 : 16, 'petal');
    playEffect('crash', 900);
    window.setTimeout(() => {
      updateResultHorsePortrait();
      result.removeAttribute('hidden');
      replayButton.focus({ preventScroll: true });
      playEffect('failed', 2800);
    }, reducedMotion ? 0 : 240);
    track('game_over', {
      score: state.score,
      distance: state.score,
      distance_km: state.score,
      duration_s: Math.round(state.elapsed),
      max_speed: Number(state.maxSpeed.toFixed(2)),
      envelopes: state.envelopes,
      items_collected: state.envelopes,
      bonus_points: state.bonusPoints,
      max_combo: state.maxCombo,
      obstacle_type: state.crashObstacleType,
      is_high_score: state.isHighScore,
      mascot_year: mascotYear,
    });
  }

  function handleEngineEvents(events, state) {
    events.forEach((event) => {
      if (event.type === 'collectible_collected') {
        flashMessage(pointsBurst, `+${event.points} điểm`);
        playTone(720 + event.combo * 25, .12, 'triangle', .045);
        playEffect('envelope', 900);
        emitParticles(-3.7, state.playerY + 1.25, lowQuality ? 5 : 9, 'petal');
        if (state.multiplier > previousMultiplier) {
          const labels = { 2: 'Song mã! ×2', 3: 'Mã đáo! ×3', 4: 'Phi nước đại! ×4' };
          flashMessage(comboBurst, labels[state.multiplier]);
          playTone(880 + state.multiplier * 80, .24, 'triangle', .065);
        }
        previousMultiplier = state.multiplier;
      }
      if (event.type === 'combo_reset') previousMultiplier = 1;
      if (event.type === 'score_milestone') track('score_milestone', { score: event.score, mascot_year: mascotYear });
      if (event.type === 'game_over') showGameOver(state);
    });
  }

  function animateScene(time, delta, state) {
    syncGameAudio(state.status === 'running', state.speed, state.grounded);
    runCyclePhase += delta * (state.status === 'running' ? 12 + state.speed * .7 : 2.5);
    const runCycle = runCyclePhase;
    const jumpStretch = state.grounded ? 0 : Math.min(.14, state.playerY * .045);
    const stride = Math.sin(runCycle);
    const decisiveStride = Math.sign(stride) * Math.pow(Math.abs(stride), .62);
    const runningBob = state.status === 'running' && state.grounded ? Math.abs(Math.sin(runCycle * 2)) * .065 : 0;
    const idleBounce = state.status === 'ready' ? Math.sin(time * .004) * .025 : 0;
    duckVisual = THREE.MathUtils.damp(duckVisual, state.ducking ? 1 : 0, 18, delta);
    horse.position.y = state.playerY - duckVisual * .08;
    horse.position.y += idleBounce + runningBob * (1 - duckVisual);
    horse.rotation.z = state.status === 'crashed' ? -.32 : (state.status === 'running' ? decisiveStride * .018 : Math.sin(time * .002) * .01);
    horse.scale.set(.8 - jumpStretch * .24 + duckVisual * .06, .8 + jumpStretch - duckVisual * .36, .8);
    horse.userData.legPivots.forEach((leg, index) => {
      const offset = index % 2 ? Math.PI : 0;
      const legStride = Math.sin(runCycle + offset);
      const snappedStride = Math.sign(legStride) * Math.pow(Math.abs(legStride), .58);
      leg.rotation.z = duckVisual > .05 ? (index % 2 ? -.88 : .88) : (state.grounded ? snappedStride * .72 : (index % 2 ? -.42 : .52));
    });
    horse.userData.tailPivot.rotation.z = decisiveStride * .22;
    horse.userData.head.rotation.z = duckVisual * .34 + (state.grounded ? -decisiveStride * .045 : -.08);
    horse.userData.body.rotation.z = duckVisual * .08 + (state.grounded ? -decisiveStride * .018 : .035);
    horse.userData.chest.rotation.z = duckVisual * .12 + (state.grounded ? decisiveStride * .015 : -.025);
    horse.userData.scarfTail.rotation.z = .22 + Math.sin(runCycle * 1.7) * .16;
    horseShadow.scale.set(1 - Math.min(.42, state.playerY * .12), .32 - Math.min(.12, state.playerY * .03), 1);
    horseShadow.material.opacity = .38 - Math.min(.22, state.playerY * .06);
    entityMeshes.forEach((object) => {
      if (object.userData.kind === 'collectible') {
        object.rotation.y += reducedMotion ? 0 : .035;
        object.position.y = object.userData.baseY + Math.sin(time * .004 + object.position.x) * .08;
        return;
      }
      object.userData.movingParts?.forEach((part) => { part.rotation.z = -.28 + Math.sin(time * .008 + object.position.x) * .12; });
      object.userData.swayParts?.forEach((part, index) => { part.rotation.z = part.userData.baseRotation + Math.sin(time * .002 + index) * .035; });
      object.userData.firecrackers?.forEach((part, index) => { part.rotation.z = (index % 2 ? -.12 : .12) + Math.sin(time * .006 + index) * .045; });
      object.userData.wheels?.forEach((wheel) => { wheel.rotation.y -= state.speed * delta * .8; });
    });
    groundMarkers.forEach((marker, index) => {
      const span = groundMarkers.length * 1.7;
      marker.position.x = -8 + ((index * 1.7 - state.distance * .9) % span + span) % span;
    });
    backdrop.position.x = -((state.distance * .075) % 11.6);
    festivalLayer.position.x = -((state.distance * .18) % 12);
    hills.position.x = -((state.distance * .022) % 12);
    clouds.position.x = -((state.distance * .012) % 14);
    gates.forEach((gate, gateIndex) => gate.userData.lanterns.forEach((lantern, index) => {
      lantern.rotation.z = Math.sin(time * .0028 + gateIndex + index * .5) * .08;
    }));
    tetDecor.userData.floaters.forEach((item) => {
      item.position.y = item.userData.baseY + Math.sin(time * .0022 + item.userData.phase) * .1;
      item.rotation.z = Math.sin(time * .0016 + item.userData.phase) * .09;
    });

    if (!state.grounded && wasGrounded) emitParticles(-4.8, .15, lowQuality ? 5 : 10, 'dust');
    if (state.grounded && !wasGrounded) {
      emitParticles(-4.5, .13, lowQuality ? 7 : 14, 'dust');
      restartGallop(state.speed);
      if (!reducedMotion) shakeUntil = time + 90;
    }
    wasGrounded = state.grounded;
    animateParticles(delta);

    updateJourney(state.score);
    animateTravelBackgrounds(delta);

    if (time < shakeUntil && !reducedMotion) {
      camera.position.x = .4 + (Math.random() - .5) * .09;
      camera.position.y = 3.35 + (Math.random() - .5) * .07;
    } else {
      camera.position.x = .4;
      camera.position.y = 3.35;
    }
  }

  function frame(time) {
    rafId = 0;
    if (!inView || !pageVisible) return;
    const delta = Math.min(.05, Math.max(0, (time - lastTime) / 1000));
    lastTime = time;
    let state = game.getState();
    if (state.status === 'running') {
      const update = game.update(delta);
      state = update.state;
      handleEngineEvents(update.events, state);
    }
    syncEntityMeshes(state);
    updateHud(state);
    animateScene(time, delta, state);
    renderer.render(scene, camera);
    rafId = window.requestAnimationFrame(frame);
  }

  function startLoop() {
    if (rafId || !inView || !pageVisible) return;
    lastTime = performance.now();
    rafId = window.requestAnimationFrame(frame);
  }

  function setAutomaticPause(shouldPause) {
    const state = game.getState();
    if (shouldPause && state.status === 'running') {
      autoPaused = game.pause();
      if (autoPaused) {
        game.requestDuck(false);
        duckButton.classList.remove('is-pressed');
        paused.removeAttribute('hidden');
        syncGameAudio(false, state.speed);
      }
    } else if (!shouldPause && autoPaused) {
      autoPaused = false;
      paused.setAttribute('hidden', '');
      game.resume();
      lastTime = performance.now();
    }
  }

  function begin(inputMethod) {
    const state = game.getState();
    if (state.status === 'ready') {
      game.start(true);
      runStartedAt = performance.now();
      firstJumpTracked = true;
      previousMultiplier = 1;
      currentJourneyIndex = -1;
      wasGrounded = true;
      runCyclePhase = 0;
      ready.setAttribute('hidden', '');
      stage.classList.add('is-playing');
      track('start', { input_method: inputMethod, quality: lowQuality ? 'low' : 'standard', mascot_year: mascotYear, mascot_fallback: mascot.isFallback });
      track('first_jump', { input_method: inputMethod, mascot_year: mascotYear });
      playEffect('action', 500);
      restartGallop(game.getState().speed, 900);
      syncGameAudio(true, game.getState().speed, game.getState().grounded);
      return;
    }
    if (state.status !== 'running') return;
    const jumped = game.requestJump();
    if (!jumped) return;
    duckButton.classList.remove('is-pressed');
    if (!firstJumpTracked) {
      firstJumpTracked = true;
      track('first_jump', { input_method: inputMethod, mascot_year: mascotYear });
    }
    playEffect('action', 500);
  }

  stage.addEventListener('pointerdown', (event) => {
    if (event.target.closest('button, a')) return;
    stage.focus({ preventScroll: true });
    begin(event.pointerType === 'touch' ? 'touch' : 'pointer');
  });
  stage.addEventListener('contextmenu', (event) => event.preventDefault());

  function setDuck(active) {
    const wasDucking = game.getState().ducking;
    const ducking = game.requestDuck(active);
    duckButton.classList.toggle('is-pressed', ducking);
    if (ducking && !wasDucking) playEffect('action', 500);
    return ducking;
  }

  duckButton.addEventListener('pointerdown', (event) => {
    event.preventDefault();
    event.stopPropagation();
    stage.focus({ preventScroll: true });
    duckButton.setPointerCapture?.(event.pointerId);
    setDuck(true);
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach((eventName) => {
    duckButton.addEventListener(eventName, (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDuck(false);
    });
  });
  duckButton.addEventListener('click', (event) => event.stopPropagation());

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' && inView && document.activeElement === stage) {
      event.preventDefault();
      if (game.getState().status === 'running') {
        setDuck(true);
      } else {
        stage.blur();
        window.scrollBy({ top: Math.max(180, window.innerHeight * .72), behavior: reducedMotion ? 'auto' : 'smooth' });
      }
      return;
    }
    if (!inView || ![' ', 'ArrowUp', 'w', 'W'].includes(event.key)) return;
    if (event.target.closest('button, a, input, textarea')) return;
    event.preventDefault();
    stage.focus({ preventScroll: true });
    begin('keyboard');
  });
  document.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowDown') setDuck(false);
  });

  shareScoreButton.addEventListener('click', (event) => {
    event.stopPropagation();
    openSharePreview();
  });
  sharePreviewConfirm.addEventListener('click', shareScore);
  sharePreviewClose.addEventListener('click', closeSharePreview);
  sharePreviewBack.addEventListener('click', closeSharePreview);
  if (sharePreviewCopy) sharePreviewCopy.addEventListener('click', copyScoreImage);
  if (sharePreviewDownload) sharePreviewDownload.addEventListener('click', downloadScoreImage);
  sharePreview.addEventListener('click', (event) => {
    if (event.target === sharePreview) closeSharePreview();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !sharePreview.hasAttribute('hidden')) closeSharePreview();
  });

  replayButton.addEventListener('click', () => {
    const previous = game.getState();
    requestReplayAd({ score: previous.score, durationMs: performance.now() - runStartedAt }, () => {
      track('replay', { previous_score: previous.score, mascot_year: mascotYear });
      game.replay();
      runStartedAt = performance.now();
      lastTime = runStartedAt;
      firstJumpTracked = true;
      previousMultiplier = 1;
      currentJourneyIndex = -1;
      wasGrounded = true;
      runCyclePhase = 0;
      track('first_jump', { input_method: 'replay', mascot_year: mascotYear });
      result.setAttribute('hidden', '');
      closeSharePreview();
      shareScoreButton.classList.remove('is-done');
      shareScoreButton.innerHTML = '<i data-lucide="share-2" aria-hidden="true"></i> Chia sẻ điểm';
      stage.classList.add('is-playing');
      duckButton.classList.remove('is-pressed');
      stage.focus({ preventScroll: true });
      playEffect('action', 500);
      restartGallop(game.getState().speed, 900);
      syncGameAudio(true, game.getState().speed, game.getState().grounded);
    });
  });

  soundButton.addEventListener('click', (event) => {
    event.stopPropagation();
    soundEnabled = !soundEnabled;
    try { window.localStorage.setItem('sap_tet_runner_v1_sound', String(soundEnabled)); } catch (_error) {}
    updateSoundButton();
    if (soundEnabled) {
      ensureSoundEffects();
      playTone(540, .1, 'sine');
      playEffect('envelope', 500);
      const currentState = game.getState();
      if (currentState.status === 'running' && currentState.grounded) restartGallop(currentState.speed);
      syncGameAudio(currentState.status === 'running', currentState.speed, currentState.grounded);
    } else {
      stopAllSounds();
    }
  });

  const visibilityObserver = new IntersectionObserver((entries) => {
    const entry = entries[0];
    inView = entry.isIntersecting;
    if (entry.intersectionRatio >= .45 && !sectionViewed) {
      sectionViewed = true;
      track('section_view', { mascot_year: mascotYear, mascot_fallback: mascot.isFallback });
    }
    setAutomaticPause(!inView || !pageVisible);
    if (inView) startLoop();
  }, { threshold: [0, .45] });
  visibilityObserver.observe(section);

  document.addEventListener('visibilitychange', () => {
    pageVisible = !document.hidden;
    setAutomaticPause(!pageVisible || !inView);
    if (pageVisible) startLoop();
  });
  window.addEventListener('blur', () => {
    setDuck(false);
    setAutomaticPause(true);
  });
  window.addEventListener('focus', () => {
    setAutomaticPause(!inView || !pageVisible);
    startLoop();
  });

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvasHost);
  updateSoundButton();
  updateHud(game.getState());
  resize();
  return Promise.resolve();
}

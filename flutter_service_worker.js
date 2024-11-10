'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"favicon-16x16.png": "cae674bb8ac8878f032b6aa6472c7d94",
"flutter_bootstrap.js": "4a67544d8ea4b9f13dfdc4fbd8f6a7b7",
"version.json": "878e83788e8c51feea66f8d68a9cde27",
"favicon.ico": "e34a1e29c0a1341b75502571e2be3a35",
"index.html": "8174c926294506b6aa62133d0ebd4ab1",
"/": "8174c926294506b6aa62133d0ebd4ab1",
"android-chrome-192x192.png": "052470bdc8b6da7537edbc9f43c5ef5b",
"apple-touch-icon.png": "98afb146f511453b02d4f96e8ec3acc1",
"CNAME": "8c8ce1042536ef52b466a715c3158340",
"main.dart.js": "2d45c1ec12c85a5cf38e2c4bf1080358",
"flutter.js": "f393d3c16b631f36852323de8e583132",
"favicon.png": "06ed110a8afa3bee5cd97b0ff0adae11",
"android-chrome-512x512.png": "06c17ea79bf0d340658c7f4746b430ca",
"site.webmanifest": "cd86af0653bddbed9bff0d8844ee6fda",
"assets/AssetManifest.json": "734123484454d7d71b1e58bff75f0542",
"assets/NOTICES": "f9bdd31951a6a7269beae8c22a0f7e75",
"assets/FontManifest.json": "4e06607ed7d6c371d5a44fbf60a263d0",
"assets/AssetManifest.bin.json": "5d5b0781651dc6a17c0e49794d30d114",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "e986ebe42ef785b27164c36a9abc7818",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "0a952c88f6f04f515337aa85de1fff0b",
"assets/fonts/MaterialIcons-Regular.otf": "0db35ae7a415370b89e807027510caf0",
"assets/assets/images/background.webp": "689d90af51f455799458fcf86cf44359",
"assets/assets/fonts/gilroy_semibold.otf": "82e5334b9753f83c1a97ac8419ee3c71",
"assets/assets/fonts/thuphap_en.ttf": "a03277f954adafc838445facee007e81",
"assets/assets/fonts/gilroy_extra_bold.otf": "c37c61167ee0b1b418f983f2f9a180b5",
"assets/assets/fonts/gilroy_bold.otf": "83a4e50a248e2b9da6b2e6802834646d",
"assets/assets/fonts/thuphap5.ttf": "472f00740b7c3f224b346637f5a5df80",
"assets/assets/fonts/thuphap1.ttf": "e0293a97b4a78c483cd3d7041b7b5a69",
"assets/assets/fonts/gilroy_normal.otf": "500ee3f8d1beb34b515976e9b27e3706",
"assets/assets/fonts/thuphap3.ttf": "7ec8c2583a0976255f3f11a4ff272db4",
"assets/assets/fonts/selender.otf": "cf0c23f0a9a403387998fb0945fabff9",
"assets/assets/fonts/thuphap2.otf": "032dc55ef56b203c822f3e4185a1e59b",
"assets/assets/fonts/thuphap4.otf": "00e2553db0b92767a1710e2bb62324c8",
"favicon-32x32.png": "0ef79cd72ef8a9c13d5c83f9a0758af9",
"canvaskit/skwasm.js": "694fda5704053957c2594de355805228",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.js": "671c6b4f8fcc199dcc551c7bb125f239",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/canvaskit.js": "66177750aff65a66cb07bb44b8c6422b",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}

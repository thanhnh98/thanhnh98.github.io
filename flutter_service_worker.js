'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "d25ec18b7fe75bca1158c4e056f5e907",
"favicon.ico": "8c6bd57e611ecb3b9e5bcb005c61cf7f",
"index.html": "57ba81a88898eac46f5bfe2a079c00dc",
"/": "57ba81a88898eac46f5bfe2a079c00dc",
"main.dart.js": "badc0a93cb74afb445581e507bf9ba34",
"ms-icon-310x310.png": "1f3691202509488ab4118dae753bc206",
"ms-icon-144x144.png": "fa091bde5c1cd810ff3ca105f862f354",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"ms-icon-150x150.png": "9a6130d749fd9e03bac1109f8a8bca83",
"icons/Icon-192.png": "1679156f79b3df781f3eabaa5cce6132",
"icons/Icon-maskable-192.png": "1679156f79b3df781f3eabaa5cce6132",
"icons/Icon-maskable-512.png": "fc5ba7bcadfc9e42ac00079fcefa793c",
"icons/Icon-512.png": "fc5ba7bcadfc9e42ac00079fcefa793c",
"manifest.json": "21da1a6641a8ba8732e32ee2939485f5",
"manifest%202.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"assets/AssetManifest.json": "d377b10742dc944b09f8b29b47c7ea3c",
"assets/NOTICES": "13392672638f5350829c9bae9ff51ede",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/shaders/ink_sparkle.frag": "729a9447077b7ec92b41781bab15831f",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/assets/chplay.png": "dc6d34239efe6e011b684db3a8376c9b",
"assets/assets/android.json": "6a93359898656160cb62de9b9eae6d70",
"assets/assets/chplay_thumb.png": "87f43639c37335bfd8372c07d48e2339",
"assets/assets/github.png": "ef7a02b69836dc8b6a732a54c4200dcb",
"assets/assets/android.png": "1201025e89f82810d1bab5c6e55a31b8",
"assets/assets/github_thumb.png": "9c2c6287d8ad72655b2d80af052a5c12",
"assets/assets/img_bg.jpg": "a8c018c6fa1a3ee47a6760874d7e0d49",
"assets/assets/placeholder.png": "9ca149283b4a0516f52e0203d56e38ce",
"assets/assets/linkedin.png": "6a909d9c816ef65966127a242f6e29e7",
"assets/assets/profile.png": "737cd1ced03f483ef202d6ab34f78d27",
"assets/assets/ic_android.png": "b64840b948dff05f01d986e9cdc33efd",
"assets/assets/profile_full.jpg": "de17a2853f7dba39e83657e1ba7ed996",
"assets/assets/img_black_bg.jpg": "6499fbceda30cc9de9d688205cad4fb0",
"assets/assets/linked_in.png": "35c2b43383593a0d3d348d19e4c42059",
"assets/assets/bg.jpg": "caee88dd8997150feb2993ce79f24fb5",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"ms-icon-70x70.png": "96c78ab320961120c09cc3fac792cee1",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
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

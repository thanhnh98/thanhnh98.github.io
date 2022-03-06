'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "favicon-16x16.png": "1f5314bb365462ba312ca096ab8dc14c",
"version.json": "d25ec18b7fe75bca1158c4e056f5e907",
"favicon.ico": "8c6bd57e611ecb3b9e5bcb005c61cf7f",
"index.html": "cdbccc7945c11d49b67b5b3125a44cc1",
"/": "cdbccc7945c11d49b67b5b3125a44cc1",
"apple-icon.png": "f15b0db4fe1d6de0d4041e1b5e4e6cc4",
"apple-icon-144x144.png": "fa091bde5c1cd810ff3ca105f862f354",
"android-icon-192x192.png": "75b53e90a49ccf80bbb73fc73fa693fd",
"apple-icon-precomposed.png": "f15b0db4fe1d6de0d4041e1b5e4e6cc4",
"apple-icon-114x114.png": "a2a92f12fe760a93f0b8bcbe683d6612",
"main.dart.js": "1f2ac259da245dd388aca27517c48936",
"ms-icon-310x310.png": "1f3691202509488ab4118dae753bc206",
"ms-icon-144x144.png": "fa091bde5c1cd810ff3ca105f862f354",
"apple-icon-57x57.png": "e7078bb7d3522dd1d8b06e5a76b4eefb",
"apple-icon-152x152.png": "c373f56719c2bfd59f19d8d8c9b20096",
"ms-icon-150x150.png": "9a6130d749fd9e03bac1109f8a8bca83",
"android-icon-72x72.png": "1f58eeab4ea5f616bf26b3e2da07163a",
"android-icon-96x96.png": "8a3147f812c04429c9459002c87f5f27",
"android-icon-36x36.png": "91f6ac048fd7e0de60dddaa2ccac8be2",
"apple-icon-180x180.png": "46f9e37af9d3890199f5691f268ab5c8",
"favicon-96x96.png": "8a3147f812c04429c9459002c87f5f27",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "f475ece2701c9a7930e5cfd619d91d83",
"android-icon-48x48.png": "7deabc7aa6cfaa3b867b80420dc6e59a",
"apple-icon-76x76.png": "d89fd6998e9a3b65848e6606465e10fe",
"apple-icon-60x60.png": "c994669b9bfad21d116a73ede85bf812",
"manifest%202.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"assets/AssetManifest.json": "e35ece8136eec576adff323471229bf0",
"assets/NOTICES": "acfb986b120ea24d2553d5ab091dc6c7",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/chplay.png": "dc6d34239efe6e011b684db3a8376c9b",
"assets/assets/android.json": "07ef8b1880f403db7bec40bdb2c31f95",
"assets/assets/github.png": "1bf386f9c07a7ce0ccfd56c43db4035b",
"assets/assets/linkedin.png": "6a909d9c816ef65966127a242f6e29e7",
"assets/assets/profile.png": "737cd1ced03f483ef202d6ab34f78d27",
"assets/assets/profile_full.jpg": "de17a2853f7dba39e83657e1ba7ed996",
"assets/assets/bg.jpg": "caee88dd8997150feb2993ce79f24fb5",
"browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"android-icon-144x144.png": "fa091bde5c1cd810ff3ca105f862f354",
"apple-icon-72x72.png": "1f58eeab4ea5f616bf26b3e2da07163a",
"apple-icon-120x120.png": "c557477f5318ac2cb0f9b780e93976de",
"favicon-32x32.png": "cade1bac38fa359fc3cb551ea6e444c0",
"ms-icon-70x70.png": "96c78ab320961120c09cc3fac792cee1"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
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
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
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

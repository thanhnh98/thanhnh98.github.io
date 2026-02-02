// Service Worker for Sắp Tết PWA
// Version được tự động update bởi scripts/update-version.js khi deploy
const CACHE_NAME = 'sap-tet-v1.0.1770022567698-28e70eb';

// Invalid subdomains list
const INVALID_SUBDOMAINS = [
    'webmail', 'mail', 'admin', 'ftp', 'cpanel', 'whm', 'blog', 'shop', 'store',
    'api', 'app', 'dev', 'test', 'staging', 'beta', 'alpha', 'demo', 'support',
    'help', 'docs', 'cdn', 'static', 'assets', 'img', 'images', 'files',
    'download', 'upload', 'secure', 'ssl', 'vpn', 'remote', 'server', 'db',
    'database', 'mysql', 'phpmyadmin', 'panel', 'control', 'manage', 'dashboard',
    'portal', 'login', 'auth', 'user', 'users', 'account', 'accounts', 'profile',
    'profiles', 'settings', 'config', 'configuration', 'system', 'sys', 'monitor',
    'monitoring', 'stats', 'statistics', 'analytics', 'logs', 'log', 'backup',
    'backups', 'restore', 'recovery', 'maintenance', 'maint', 'status', 'health',
    'ping', 'check', 'verify', 'validate', 'testing', 'qa', 'quality',
    'preview', 'sandbox', 'playground', 'lab', 'labs', 'experiment',
    'experiments', 'research', 'development', 'develop', 'build', 'builder',
    'compile', 'deploy', 'deployment', 'release', 'releases', 'version', 'versions',
    'v1', 'v2', 'v3', 'v4', 'v5', 'legacy', 'old', 'new', 'latest', 'current',
    'production', 'prod', 'live', 'public', 'private', 'internal', 'external',
    'frontend', 'backend', 'client', 'service', 'services', 'microservice',
    'gateway', 'proxy', 'loadbalancer', 'cache', 'redis', 'memcached', 'elasticsearch',
    'kibana', 'grafana', 'prometheus', 'jenkins', 'ci', 'cd', 'pipeline', 'workflow'
];
const urlsToCache = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/colors.css',
  '/js/script.js',
  '/js/main.js',
  '/js/countdown.js',
  '/js/faq-modal.js',
  '/js/footer.js',
  '/assets/images/background.webp',
  '/assets/images/ic_app.webp',
  '/favicon.ico',
  '/favicon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Cached all files successfully');
        return self.skipWaiting();
      })
      .catch(err => {
        console.log('Service Worker: Cache failed', err);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated');
      return self.clients.claim();
    })
  );
});

// Function to check if subdomain is invalid
function isInvalidSubdomain(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    
    if (!hostname.includes('saptet.vn')) {
      return false;
    }
    
    const subdomain = hostname.split('.')[0];
    const isValidSubdomain = subdomain === 'www' || subdomain === 'saptet';
    
    return INVALID_SUBDOMAINS.includes(subdomain) && !isValidSubdomain;
  } catch (e) {
    return false;
  }
}

// Fetch event - serve cached content when offline and handle subdomain redirects
self.addEventListener('fetch', event => {
  // Handle subdomain redirects
  if (isInvalidSubdomain(event.request.url)) {
    console.log('Service Worker: Invalid subdomain detected, redirecting to 404');
    event.respondWith(
      fetch('/404.html')
        .then(response => {
          return new Response(response.body, {
            status: 404,
            statusText: 'Not Found',
            headers: response.headers
          });
        })
        .catch(() => {
          return new Response('404 - Subdomain not found', {
            status: 404,
            statusText: 'Not Found',
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Handle background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    console.log('Service Worker: Background sync triggered');
    // Handle any background sync tasks here
  }
});

// Handle push notifications (for future use)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      },
      actions: [
        {
          action: 'explore',
          title: 'Xem ngay',
          icon: '/android-chrome-192x192.png'
        },
        {
          action: 'close',
          title: 'Đóng',
          icon: '/favicon-32x32.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
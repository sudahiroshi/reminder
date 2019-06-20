const cache_name = 'reminder-v1';
var cache_file = [
    '/reminder/',
    '/reminder/manifest.json',
    '/reminder/icon-192.png',
    '/reminder/icon-256.png',
    '/reminder/reminder.css',
    '/reminder/reminder.js',
    '/reminder/service-worker.js'
];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches
            .open(cache_name)
            .then(function(cache) {
                return cache.addAll(cache_file);
            })
    );
    console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
});

// 現状では、この処理を書かないとService Workerが有効と判定されないようです
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches
            .match(e.request)
            .then(function(response) {
                return response ? response : fetch(e.request);
            })
    )
});
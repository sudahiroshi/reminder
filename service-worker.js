// service-worker.js
const cache_name = 'reminder-v1';
var cache = [
    '/',
    '/manifest.json',
    '/icon-192.png',
    '/icon-256.png',
    '/reminder.css',
    '/reminder.js',
    '/service-worker.js'
];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches
            .open(cache_name)
            .then(function(cache) {
                return cache.addAll(cache);
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
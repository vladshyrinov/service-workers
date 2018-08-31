const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'css/style.css',
    'js/index.js'
]

// call install event

self.addEventListener('install', (event) => {
    console.log("SW installed");

    event.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                console.log('SW: Caching files');
                cache.addAll(cacheAssets);
            } )
            .then(() => self.skipWaiting())
    );
})

// call activate event

self.addEventListener('activate', (event) => {
    console.log("SW activated");
    // remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('SW: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

// call fetch event

self.addEventListener('fetch', e => {
    console.log('SW: Fetching');
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})
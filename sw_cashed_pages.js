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
            .then(cache => {} )
    );
})

// call activate event

self.addEventListener('activate', (event) => {
    console.log("SW activated");
})
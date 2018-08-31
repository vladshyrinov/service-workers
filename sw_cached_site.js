const cacheName = 'v2';

// call install event

self.addEventListener('install', (event) => {
    console.log("SW installed");
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
    e.respondWith(
        fetch(e.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open cache
            caches
                .open(cacheName)
                .then(cache => {
                    // Add response to cache
                    console.log(e.request, resClone);
                    // cache.put(e.request, resClone);
                })
            return res;
        }).catch(err => caches.match(e.request).then(res => res))
    );
})
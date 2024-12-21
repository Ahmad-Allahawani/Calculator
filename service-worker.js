// Cache name
const CACHE_NAME = "my-pwa-cache-v1";

// Files to cache
const CACHE_ASSETS = [
    "/Calculator/index.html",
    "/Calculator/icon.png",
    "/icons/icon-512x512.png",
    "/Calculator/style.css", 
    "/Calculator/script.js" 
];

// Install Event
self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[Service Worker] Caching app shell");
            return cache.addAll(CACHE_ASSETS);
        })
    );
});

// Activate Event
self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("[Service Worker] Clearing old cache");
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Event
self.addEventListener("fetch", (event) => {
    console.log("[Service Worker] Fetching resource: ", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

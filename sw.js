// Service worker de ANIMAKID: guarda la app en el teléfono para que funcione sin internet.
// Cambia CACHE_VERSION cada vez que publiques cambios para que los usuarios reciban la nueva versión.
const CACHE_VERSION = 'animakid-v1';

const PRECACHE = [
  "./",
  "index.html",
  "style.css",
  "script.js",
  "manifest.webmanifest",
  "data/animals.json",
  "assets/fonts/fredoka-500-latin.woff2",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-192.png",
  "icons/maskable-512.png",
  "icons/favicon-48.png",
  "assets/images/web/lion.webp",
  "assets/sounds/lion.mp3",
  "assets/images/web/cow.webp",
  "assets/sounds/cow.mp3",
  "assets/images/web/dog.webp",
  "assets/sounds/dog.mp3",
  "assets/images/web/cat.webp",
  "assets/sounds/cat.mp3",
  "assets/images/web/elephant.webp",
  "assets/sounds/elephant.mp3",
  "assets/images/web/horse.webp",
  "assets/sounds/horse.mp3",
  "assets/images/web/monkey.webp",
  "assets/sounds/monkey.mp3",
  "assets/images/web/duck.webp",
  "assets/sounds/duck.mp3",
  "assets/images/web/pig.webp",
  "assets/sounds/pig.mp3",
  "assets/images/web/hen.webp",
  "assets/sounds/hen.mp3",
  "assets/images/web/donkey.webp",
  "assets/sounds/donkey.mp3",
  "assets/images/web/goose.webp",
  "assets/sounds/goose.mp3",
  "assets/images/web/bull.webp",
  "assets/sounds/bull.mp3",
  "assets/images/web/sheep.webp",
  "assets/sounds/sheep.mp3",
  "assets/images/web/goat.webp",
  "assets/sounds/goat.mp3",
  "assets/images/web/rooster.webp",
  "assets/sounds/rooster.mp3",
  "assets/images/web/turkey.webp",
  "assets/sounds/turkey.mp3"
];

// La música de fondo es grande, se guarda la primera vez que se reproduce.

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        if (res.ok && res.status === 200) {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(req, copy));
        }
        return res;
      }).catch(() => req.mode === 'navigate' ? caches.match('index.html') : Response.error());
    })
  );
});

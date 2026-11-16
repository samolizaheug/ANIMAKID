// Antes el juego se podía instalar desde esta web. Este service worker borra esa copia guardada
// en los teléfonos de quienes lo instalaron y se desactiva solo.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: 'window' })) client.navigate(client.url);
  })());
});

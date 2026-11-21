/* Offline cache – při každé změně appky zvyš verzi */
const CACHE = 'deniska-v1';
const FILES = [
  './',
  'css/app.css',
  'data/01-zacatecnik.js',
  'data/02-jidlo.js',
  'data/03-zabava.js',
  'data/04-nakupovani.js',
  'data/05-cestovani.js',
  'data/06-domov.js',
  'data/07-lide.js',
  'data/08-pocasi.js',
  'data/09-zdravi.js',
  'data/10-minulost.js',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'index.html',
  'js/app.js',
  'js/deniska.js',
  'manifest.webmanifest',
];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // síť první (ať ségra vždycky dostane novou verzi), offline z cache
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return r; }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});

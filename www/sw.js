/* v3 — purge des caches des versions precedentes.
   Dans l'APK les fichiers sont deja locaux : aucun cache n'est necessaire. */
self.addEventListener("install", e => { self.skipWaiting(); });

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => { /* passe-plat : rien n'est mis en cache */ });

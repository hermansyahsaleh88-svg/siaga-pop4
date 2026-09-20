// Service Worker SIAGA P0-P4
// Catatan: aplikasi ini WAJIB online (data tersimpan di server Supabase).
// Service worker ini HANYA bertugas meng-cache "app shell" (file HTML, ikon,
// manifest) supaya aplikasi cepat terbuka & bisa di-install sebagai PWA.
// Tidak ada data checklist / submission yang di-cache di sini.

const CACHE_NAME = 'siaga-p0p4-shell-v1';
// Sengaja TIDAK menyebut nama file HTML secara spesifik (mis. index.html
// atau SIAGA_P0-P4_Online.html) supaya service worker ini tetap berfungsi
// apa pun nama file utama di hosting Anda. Halaman utama akan otomatis
// ter-cache saat pertama kali dibuka lewat handler 'fetch' di bawah.
const APP_SHELL = [
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(APP_SHELL.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Hanya tangani request GET untuk file di origin sendiri (app shell).
  // Semua request ke Supabase (API data) TIDAK disentuh sama sekali —
  // langsung diteruskan ke jaringan seperti biasa, karena aplikasi ini
  // butuh data yang selalu terbaru dari server.
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      // Cache-first untuk shell supaya buka cepat, tapi tetap perbarui di background.
      return cached || network;
    })
  );
});

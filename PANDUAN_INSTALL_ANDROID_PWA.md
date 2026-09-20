# Panduan: SIAGA P0-P4 sebagai Aplikasi Android (PWA)

Aplikasi SIAGA P0-P4 sekarang sudah dilengkapi fitur **PWA (Progressive Web App)**,
sehingga bisa dipasang seperti aplikasi biasa di HP Android — muncul ikon di
layar utama, tampil layar penuh tanpa address bar browser — **tanpa perlu
membuat file APK atau upload ke Play Store**.

Karena aplikasi ini tetap membutuhkan koneksi internet untuk menyimpan data ke
server (Supabase), PWA ini **tidak membuat aplikasi bisa dipakai offline** —
PWA hanya menyediakan "ikon aplikasi" dan tampilan layar penuh yang lebih
nyaman di HP.

---

## ⚠️ Update: khusus untuk siagap0p4.netlify.app (deploy via Git)

Sudah saya cek langsung ke **https://siagap0p4.netlify.app/** — situs Anda
memang belum punya `manifest.json`, `service-worker.js`, maupun folder
`icons/` (semuanya masih 404), dan file HTML yang tayang di sana juga masih
versi lama (belum ada tag PWA-nya). Karena Netlify Anda terhubung ke
**repository Git (GitHub/GitLab) dengan auto-deploy**, cara memperbaikinya
BUKAN dengan upload manual lewat dashboard Netlify, melainkan lewat repo:

1. Buka folder project di komputer Anda yang merupakan **clone dari repo
   Git** yang tersambung ke Netlify tersebut (folder yang biasa Anda pakai
   untuk `git add` / `git commit` / `git push` ke situs ini).
2. Cari file HTML utama di root folder itu — kemungkinan besar namanya
   **`index.html`** (karena situs Anda tayang langsung di alamat root
   `https://siagap0p4.netlify.app/` tanpa nama file, dan
   `.../SIAGA_P0-P4_Online.html` juga 404 — tandanya Netlify menyajikan
   `index.html`).
3. **Buka file `index.html` itu**, lalu bandingkan dengan file
   `SIAGA_P0-P4_Online.html` di folder `SIAGA_P0-P4_PWA/` yang saya kirim —
   **salin seluruh isi** `SIAGA_P0-P4_Online.html` (file baru, sudah ada tag
   PWA) untuk **menimpa isi `index.html`** di repo Anda. Nama file di repo
   tetap `index.html`, hanya isinya yang diganti dengan isi file baru ini.
4. Salin 3 item lain dari folder `SIAGA_P0-P4_PWA/` ke **root folder repo
   yang sama** (sejajar dengan `index.html`):
   - `manifest.json`
   - `service-worker.js`
   - folder `icons/` (seluruh isinya, folder ini sudah tidak bergantung
     nama file HTML — sudah saya perbaiki agar aman dipakai dengan nama
     file apa pun)
5. `git add .` → `git commit -m "Tambah dukungan PWA"` → `git push`.
6. Tunggu 1–2 menit sampai Netlify selesai auto-deploy (bisa dicek progresnya
   di dashboard Netlify → tab **Deploys**).
7. Setelah selesai, cek dulu dari browser (boleh dari HP atau komputer):
   buka `https://siagap0p4.netlify.app/manifest.json` — kalau muncul teks
   JSON (bukan halaman "Page not found"), berarti sudah berhasil ter-upload.

Setelah langkah di atas berhasil, lanjutkan ke bagian **"4. Cara pasang ke
layar utama HP Android"** di bawah.

---

## 1. Isi folder ini

```
SIAGA_P0-P4_PWA/
├─ SIAGA_P0-P4_Online.html      ← isi file ini yang perlu disalin ke index.html Anda
├─ manifest.json                ← "identitas" PWA (nama app, ikon, warna tema)
├─ service-worker.js            ← wajib ada agar Android mau menawarkan instalasi
├─ favicon.ico                  ← ikon kecil untuk tab browser
└─ icons/                       ← seluruh ukuran ikon aplikasi (72px s/d 512px)
```

**Semua file & folder di atas harus diupload bersamaan** ke hosting Anda, di
**folder yang sama**, dengan struktur folder `icons/` tetap dipertahankan
persis seperti ini. Jangan mengganti nama file `manifest.json` atau
`service-worker.js`.

> Untuk hosting selain Netlify/Git (misalnya upload manual via cPanel File
> Manager atau FTP): upload semua file di atas apa adanya (boleh pakai nama
> `SIAGA_P0-P4_Online.html`), dan jika sebelumnya sudah ada file versi lama,
> **timpa (replace)** dengan file baru dari folder ini.

---

## 2. Syarat wajib: HTTPS

Fitur PWA (service worker) **hanya berfungsi di alamat HTTPS**, bukan HTTP
biasa. Jika hosting Anda sudah memakai HTTPS (kebanyakan hosting modern &
domain dengan SSL otomatis seperti Netlify, Vercel, Cloudflare Pages, atau
hosting cPanel dengan Let's Encrypt aktif), maka Anda tidak perlu melakukan
apa pun tambahan — langsung lanjut ke langkah upload.

Jika alamat Anda masih `http://...` (belum ada gembok di address bar),
aktifkan SSL/HTTPS gratis di panel hosting Anda terlebih dahulu (biasanya
tersedia via "Let's Encrypt" atau "Auto SSL" di cPanel), baru lanjutkan.

---

## 3. Upload ke hosting Anda

1. Upload seluruh isi folder `SIAGA_P0-P4_PWA/` (termasuk folder `icons/`)
   ke direktori website Anda (misalnya via File Manager cPanel, FTP, atau
   `git push` jika pakai Netlify/Vercel/GitHub Pages).
2. Pastikan struktur di server sama seperti struktur folder lokal di atas
   — jangan pindahkan `manifest.json` atau `service-worker.js` ke folder lain.
3. Buka `https://domainanda.com/SIAGA_P0-P4_Online.html` dari browser desktop
   dulu untuk memastikan aplikasi tetap tampil & bisa login seperti biasa.

---

## 4. Cara pasang ke layar utama HP Android

1. Buka **Google Chrome** di HP Android, kunjungi alamat aplikasi Anda
   (`https://domainanda.com/SIAGA_P0-P4_Online.html`).
2. Tunggu beberapa detik — biasanya Chrome otomatis menampilkan notifikasi
   di bawah layar: **"Tambahkan SIAGA P0-P4 ke layar utama"** / **"Install app"**.
   - Jika muncul, tekan **Install/Pasang**.
3. Jika notifikasi otomatis tidak muncul, pasang manual:
   - Tekan ikon **titik tiga (⋮)** di pojok kanan atas Chrome.
   - Pilih **"Tambahkan ke Layar Utama"** (Add to Home screen) atau
     **"Instal aplikasi"** (Install app) — tergantung versi Chrome.
   - Tekan **Tambahkan/Install**.
4. Ikon **SIAGA P0-P4** (roda gigi oranye di atas latar biru tua, sesuai
   warna tema aplikasi) akan muncul di layar utama HP, persis seperti
   aplikasi lain yang terpasang dari Play Store.
5. Buka dari ikon tersebut — aplikasi akan tampil **layar penuh** tanpa
   address bar browser, terasa seperti aplikasi native.

Di dalam aplikasi, saya juga menambahkan tombol kecil **"↓ Install App"** di
pojok kanan atas (sebelah status Online/Terputus) yang akan muncul otomatis
di Chrome Android bila browser mendeteksi aplikasi ini layak dipasang —
tombol ini jalan pintas selain menu titik tiga di atas.

---

## 5. Catatan penting

- **Tetap wajib online.** Ikon di layar utama hanya jalan pintas membuka
  aplikasi web ini secara layar penuh — data checklist tetap tersimpan ke
  server Supabase seperti biasa, jadi HP tetap harus terhubung internet
  saat dipakai mengisi/approve laporan.
- **Update otomatis.** Karena ini bukan APK, setiap kali Anda memperbarui
  isi `SIAGA_P0-P4_Online.html` di hosting (misalnya menambah fitur baru
  di kemudian hari), semua pengguna yang sudah memasang ikon ini akan
  otomatis mendapat versi terbaru saat membuka aplikasinya — tidak perlu
  install ulang.
- **iPhone/Safari** juga didukung (tag `apple-touch-icon` sudah
  disertakan) — caranya: buka di Safari → tombol Share (kotak dengan
  panah ke atas) → "Tambah ke Layar Utama".
- Jika ikon aplikasi tidak muncul dengan benar, coba hapus cache Chrome
  untuk domain tersebut lalu buka ulang halamannya — service worker
  browser terkadang butuh reload sekali agar mengambil ikon terbaru.

Selesai — aplikasi SIAGA P0-P4 sudah bisa dipasang sebagai aplikasi Android
tanpa APK maupun Play Store.

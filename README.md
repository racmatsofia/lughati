# Lughati (لُغَتِي)

> **"Bahasa Arab jadi milikmu."** — Website pembelajaran bahasa Arab yang mudah & mengasyikkan.

Lughati adalah aplikasi web (PWA) untuk belajar bahasa Arab dari nol. Fitur intinya: **klik tulisan Arab → langsung dengar pengucapan penutur asli**, ditambah gamifikasi (XP, streak, badge, liga), latihan interaktif, kamus, flashcard SRS, cerita, latihan berbicara, sertifikat, dan dashboard guru.

🌐 **Live:** https://lughati.lughati.workers.dev

---

## ✨ Fitur

### Belajar
- 🔊 **Audio klik-untuk-dengar** di semua teks Arab — klik kata/kalimat → audio diputar. Mode lambat **0.75×**, ulangi, dan fallback suara bawaan perangkat.
- 🔤 **Hijaiyah** — 28 huruf + makhraj + harakat + bentuk huruf (terpisah/awal/tengah/akhir), game **Tebak Suara Huruf**, dan **Trace Huruf** (kanvas tulis).
- 📚 **Pelajaran interaktif** dengan **6 tipe soal**: pilih arti, pilih kata Arab, dengar & pilih, **isi harakat**, **susun kalimat**, dan tebak huruf.
- 🎤 **Latihan Berbicara** — rekam suara, skor pengucapan otomatis (levenshtein pada teks Arab tanpa harakat), umpan balik, dan penanda kata lemah.
- 📖 **Kamus** Arab ↔ Indonesia: pencarian, filter jenis kata, **filter favorit**, **sinonim & antonim**, contoh kalimat ber-audio, riwayat pencarian, kata populer.
- 🃏 **Flashcard** — animasi balik 3D + pengulangan berjeda (SRS), **pemilihan deck** (deck dasar, deck milikmu, per tema).
- 📜 **Cerita interaktif** berharakat (4 cerita), **Putar semua** (pembacaan berurutan), terjemahan & transliterasi on/off, kuis pemahaman.

### Motivasi & Progres
- 🎮 **6 game** yang semuanya berfungsi: Kilat Kosakata (timer), Cocokkan Pasangan (memori), Susun Huruf, Dengar & Ketuk, Duel Kata (vs bot), Tantangan Harian (2× XP).
- 🏆 Gamifikasi: XP, level, **streak harian**, misi harian, **badge/pencapaian**, **liga & papan peringkat**.
- 📊 **Progres**: grafik aktivitas 14 hari, kalender belajar (heatmap), skill bar, daftar kata lemah.
- 🎓 **Sertifikat** yang bisa diunduh/dicetak sebagai PDF dan dibagikan.

### Platform
- 📱 **PWA**: installable (manifest + shortcut), **service worker** dengan precache & runtime cache (font), **banner offline**.
- 🌗 **Mode terang/gelap/sistem**, plus **Mode Anak**.
- ♿ **Aksesibilitas**: mode disleksia (font Lexend + spasi lega), kontras tinggi, kurangi gerak, ukuran teks Arab (kecil/sedang/besar).
- 🌐 **Dwi-bahasa ID/EN** (i18n) — bisa diganti di Profil.
- 👨‍🏫 **Dashboard Guru**: sub-nav (Kelas/Tugas/Progres/Laporan/Pengaturan), daftar siswa + detail, buat & tetapkan tugas, undang siswa, ekspor CSV.
- 🔐 Auth (mock lokal), onboarding personalisasi, penyimpanan progres di perangkat.

---

## 📋 Status implementasi vs PRD

| PRD | Fitur | Status |
|---|---|---|
| §8.1–8.5 | Landing, Auth, Onboarding, Dashboard, Detail Modul | ✅ |
| §8.6 | Pelajaran interaktif (6 tipe soal) | ✅ |
| §8.7 | Hijaiyah (huruf, makhraj, tebak suara, trace) | ✅ |
| §8.8 | Kamus (audio, favorit, sinonim/antonim, riwayat) | ✅ |
| §8.9 | Flashcard + SRS + deck | ✅ |
| §8.10 | Cerita interaktif + putar semua + kuis | ✅ |
| §8.11 | 6 game (semua berfungsi) | ✅ |
| §8.12 | Progres (grafik, heatmap, kata lemah) | ✅ |
| §8.13–8.14 | Peringkat & Pencapaian | ✅ |
| §8.15 | Profil & Pengaturan (lengkap + aksesibilitas) | ✅ |
| §8.16 | Dashboard Guru | ✅ |
| §8.17–8.18 | Harga, Tentang, Bantuan, 404 | ✅ |
| §10 | Mesin audio klik-untuk-dengar | ✅ (Web Speech API) |
| §11.1 | Gamifikasi | ✅ |
| §11.2 | Latihan berbicara (speech) | ✅ (webkitSpeechRecognition) |
| §11.3 | SRS | ✅ |
| §11.4 | Offline / PWA | ✅ |
| §11.5 | Tema & personalisasi | ✅ |
| §11.7 | Notifikasi push | ⚠️ pengingat in-app (push belum) |
| §11.8 | Multibahasa UI | ✅ (ID/EN) |
| §11.9 | Mode anak | ✅ (dasar) |
| §11.11 | Sertifikat & bagikan | ✅ |
| §11.6 | Culture Corner | ⚠️ sebagian (tema & contoh kalimat) |
| Backend | Auth & sinkronisasi lintas perangkat | ⚠️ mock lokal (butuh backend nyata) |

---

## 🎨 Brand

| | |
|---|---|
| **Nama** | Lughati · لُغَتِي |
| **Arti** | dari *lughah* (لُغَة = bahasa) + akhiran *-ī* (ـِي = milikku) → **"bahasa-ku"** |
| **Tagline** | Bahasa Arab jadi milikmu |
| **Maskot** | Jamal si Unta 🐪 (*jamal* جَمَل = unta; *jamāl* جَمَال = keindahan) |
| **Palet** | Teal `#0E7C7B` · Gold `#F2A63B` · Coral `#E85D5D` · Sand `#FFFBF5` · Ink `#1E2A28` |
| **Tipografi** | Baloo 2 (judul) · Nunito (body) · Inter (transliterasi) · Amiri (Arab) · Lexend (mode disleksia) |

## 🛠️ Tech Stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** (design token via `@theme`, dark mode berbasis class) + **tailwind-merge**
- **React Router 7** · **lucide-react**
- **vite-plugin-pwa** (Workbox) untuk service worker & manifest
- **Web Speech API** — SpeechSynthesis (audio) & SpeechRecognition (latihan berbicara)

## 🚀 Menjalankan

```bash
npm install
npm run dev        # server pengembangan
npm run build      # build produksi ke ./dist
npm run preview    # pratinjau hasil build
```

## 🧪 Pengujian

Skrip uji berbasis Chrome DevTools Protocol (browser harus berjalan dengan `--remote-debugging-port=9222`):

```bash
node scripts/smoke.mjs      # render 15 halaman
node scripts/interact.mjs   # interaksi: 5 game, jawab soal, cari kamus, ganti deck, hijaiyah
node scripts/overflow.mjs   # deteksi overflow horizontal di viewport mobile
node scripts/shots.mjs      # screenshot otomatis ke .shots/
```

## ☁️ Deploy ke Cloudflare

Aplikasi dideploy sebagai **Cloudflare Worker dengan Static Assets** (SPA fallback via `wrangler.jsonc`).

```bash
rm -rf .wrangler          # buang cache config lama bila ada
npm run build
npx wrangler deploy
```

Set `CLOUDFLARE_API_TOKEN` dan `CLOUDFLARE_ACCOUNT_ID` sebagai environment variable sebelum deploy.

## 📁 Struktur

```
src/
├── components/     # UI, audio, layout, brand, PWA, MiniGames (6 game), Avatar
├── lib/            # data & kurikulum, store, audio engine, pwa, i18n, utils
├── pages/          # 23 halaman (landing, app, auth, guru, sertifikat, dll.)
├── App.tsx         # routing
└── index.css       # design system (Tailwind v4, dark mode, aksesibilitas, print)
scripts/            # uji smoke/interaksi/overflow/screenshot
design/             # sumber desain (pen + 21 screenshot)
PRD-Lughati.md      # Product Requirements Document
```

## 📝 Catatan Audio

Pengucapan diputar lewat **mesin suara pada perangkat** pengguna (Web Speech API, `lang="ar-SA"`).
Untuk hasil terbaik, pasang paket suara Arab di sistem operasi/browser (Chrome, Edge, atau Safari).
Bila suara Arab tidak tersedia, Lughati tetap memutar audio dengan suara bawaan agar pengguna mendapat umpan balik.
Latihan berbicara memakai `SpeechRecognition` (Chrome/Edge/Safari) dan **memproses suara di perangkat**.

---

© Lughati · Dibuat untuk pelajar bahasa Arab. بِالْعَرَبِيَّةِ نَتَعَلَّمُ وَنَتَقَدَّمُ

# Lughati (لُغَتِي)

> **"Bahasa Arab jadi milikmu."** — Website pembelajaran bahasa Arab yang mudah & mengasyikkan.

Lughati adalah aplikasi web (PWA) untuk belajar bahasa Arab dari nol. Fitur intinya: **klik tulisan Arab → langsung dengar pengucapan penutur asli**, ditambah gamifikasi (XP, streak, badge, liga), latihan interaktif, kamus, flashcard SRS, cerita, dan dashboard guru.

## ✨ Fitur

- 🔊 **Audio klik-untuk-dengar** di semua teks Arab (klik kata/kalimat → audio diputar), lengkap dengan mode lambat **0.75×** dan ulangi.
- 🎮 **Gamifikasi** — XP, level, streak harian, misi, badge/pencapaian, liga & papan peringkat.
- 🔤 **Hijaiyah** — 28 huruf + makhraj + harakat, game "Tebak Suara Huruf", dan latihan menulis (trace).
- 📚 **Pelajaran interaktif** — pilihan arti, dengar & pilih, menyusun, dan latihan berbicara.
- 📖 **Kamus** Arab ↔ Indonesia dengan contoh kalimat ber-audio dan master–detail.
- 🃏 **Flashcard** dengan animasi balik 3D + pengulangan berjeda (SRS).
- 📜 **Cerita interaktif** berharakat dengan terjemahan & kuis pemahaman.
- 📊 **Progres** — grafik aktivitas, heatmap kalender, kata lemah untuk diulang.
- 👨‍🏫 **Dashboard Guru** — pantau kelas, tugas, ekspor CSV.
- 🌗 **Mode terang/gelap**, pengaturan transliterasi, kecepatan audio, aksesibilitas.
- 📱 **PWA** — responsif mobile-first (bottom nav) & desktop (sidebar), bisa dipasang ke layar utama.

## 🎨 Brand

| | |
|---|---|
| **Nama** | Lughati · لُغَتِي |
| **Arti** | dari *lughah* (لُغَة = bahasa) + akhiran *-ī* (ـِي = milikku) → **"bahasa-ku"** |
| **Tagline** | Bahasa Arab jadi milikmu |
| **Maskot** | Jamal si Unta 🐪 (*jamal* جَمَل = unta; *jamāl* جَمَال = keindahan) |
| **Palet** | Teal `#0E7C7B` · Gold `#F2A63B` · Coral `#E85D5D` · Sand `#FFFBF5` · Ink `#1E2A28` |
| **Tipografi** | Baloo 2 (judul) · Nunito (body) · Inter (transliterasi) · Amiri (Arab) |

## 🛠️ Tech Stack

- **React 19** + **TypeScript**
- **Vite 6**
- **Tailwind CSS v4** (design token via `@theme`, dark mode berbasis class)
- **React Router 7**
- **lucide-react** (ikon)
- **Web Speech API** untuk audio (TTS bahasa Arab) — dengan fallback suara bawaan perangkat

## 🚀 Menjalankan

```bash
npm install
npm run dev        # server pengembangan
npm run build      # build produksi ke ./dist
npm run preview    # pratinjau hasil build
```

## ☁️ Deploy ke Cloudflare Pages

```bash
npm run build
npx wrangler pages deploy dist --project-name=lughati
```

Fallback SPA sudah disiapkan di `public/_redirects`.

## 📁 Struktur

```
src/
├── components/     # UI, audio, layout, brand, auth shell
├── lib/            # data & kurikulum, store (state), audio engine, utils
├── pages/          # 21 halaman (landing, app, auth, dll.)
├── App.tsx         # routing
└── index.css       # design system (Tailwind v4 + dark mode)
design/             # sumber desain (pen + 21 screenshot)
PRD-Lughati.md      # Product Requirements Document
```

## 📝 Catatan Audio

Pengucapan diputar lewat **mesin suara pada perangkat** pengguna (Web Speech API, `lang="ar-SA"`).
Untuk hasil terbaik, pasang paket suara Arab di sistem operasi/browser (Chrome, Edge, atau Safari).
Bila suara Arab tidak tersedia, Lughati tetap memutar audio dengan suara bawaan agar pengguna mendapat umpan balik.

---

© Lughati · Dibuat untuk pelajar bahasa Arab. بِالْعَرَبِيَّةِ نَتَعَلَّمُ وَنَتَقَدَّمُ

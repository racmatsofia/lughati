# Lughati (لُغَتِي) — Design

Folder desain UI/UX untuk website pembelajaran bahasa Arab **Lughati**.
Sumber desain: file `.pen` (dibuka di pen.dev canvas).

## Isi Folder

```
design/
├── lughati.pen          # Source file desain (buka di pen.dev / Pencil)
├── screens/             # 21 screenshot layar (PNG @2x)
│   ├── 01-landing.png
│   ├── 02-login.png
│   ├── 03-daftar.png
│   ├── 04-onboarding.png
│   ├── 05-dashboard-belajar.png
│   ├── 06-detail-modul.png
│   ├── 07-pelajaran.png
│   ├── 08-hijaiyah.png
│   ├── 09-kamus.png
│   ├── 10-flashcard.png
│   ├── 11-cerita.png
│   ├── 12-latihan.png
│   ├── 13-progres.png
│   ├── 14-peringkat.png
│   ├── 15-pencapaian.png
│   ├── 16-profil.png
│   ├── 17-kelas-guru.png
│   ├── 18-harga.png
│   ├── 19-tentang.png
│   ├── 20-bantuan.png
│   └── 21-404.png
└── html/
    └── landing.html     # Landing page dalam HTML + Tailwind (siap koding)
```

## Design System (ringkasan)

| Token | Nilai |
|---|---|
| Primary Teal | `#0E7C7B` |
| Teal Dark | `#0A5C5B` |
| Teal Light | `#D6F0EF` |
| Sahara Gold | `#F2A63B` |
| Coral | `#E85D5D` |
| Sand BG | `#FFFBF5` |
| Ink (teks) | `#1E2A28` |
| Success | `#2FA36B` |

**Tipografi:** Baloo 2 (judul) · Nunito (body) · Inter (transliterasi) · Amiri (teks Arab).

## Cakupan (sesuai PRD)

- 21 layar mencakup seluruh sitemap PRD (§7)
- Fitur audio "klik-untuk-dengar" ada di semua konten Arab
- Gamifikasi: XP, streak, badge, liga, misi harian
- Responsive: mobile-first (bottom nav) + desktop (sidebar)

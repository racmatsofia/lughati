# PRD — **Lughati** (لُغَتِي)
### Website Pembelajaran Bahasa Arab yang Mudah & Mengasyikkan

| Field | Keterangan |
|---|---|
| **Nama Produk** | Lughati (لُغَتِي) |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2025 |
| **Status** | Draft → siap untuk design & development |
| **Jenis Produk** | Responsive Web App (PWA), Mobile-first |
| **Bahasa Antarmuka** | Bahasa Indonesia (utama), English (opsional) |
| **Owner** | Product Team Lughati |

---

## 1. Ringkasan Eksekutif

**Lughati** adalah platform belajar bahasa Arab berbasis web yang dirancang agar **mudah dipahami pemula** dan **mengasyikkan seperti bermain game**. Pendekatan utama:

- **Belajar sambil bermain** — pelajaran dibagi menjadi unit kecil (5–10 menit) dengan misi, XP, dan badge.
- **Audio di setiap kata & kalimat** — cukup **klik tulisan Arab (atau tombol speaker)**, maka audio penutur asli langsung diputar.
- **Mobile-first** — nyaman dipakai di HP (mayoritas pengguna Indonesia), tetap optimal di desktop.
- **Bebas stres** — tidak ada hukuman; salah dijawab artinya dapat kesempatan mencoba lagi.
- **Budaya & konteks** — bukan hanya kosakata, tapi juga adab, ungkapan harian, dan budaya Arab.

> **One-liner:** *"Lughati — belajar bahasa Arab dari nol, cukup klik, langsung dengar, jadi lancar."*

---

## 2. Latar Belakang & Masalah

### 2.1 Latar Belakang
Mayoritas umat Islam di Indonesia ingin memahami bahasa Arab (untuk ibadah, Al-Qur'an, hafalan, pekerjaan, atau studi). Namun banyak yang menyerah di awal karena materi terasa sulit dan membosankan.

### 2.2 Masalah Pengguna (Pain Points)
| # | Masalah | Dampak |
|---|---|---|
| P1 | Tulisan Arab dan harakat terasa asing | Pengguna takut salah baca |
| P2 | Tidak tahu cara melafalkan | Tidak percaya diri berbicara |
| P3 | Materi buku teks membosankan | Cepat bosan, berhenti |
| P4 | Tidak ada feedback atas pengucapan | Kesalahan menetap (fossilisasi) |
| P5 | Tidak ada motivasi/habit | Tidak konsisten belajar |
| P6 | Materi terlalu akademis (nahwu–sharaf penuh istilah) | Overwhelming untuk pemula |

### 2.3 Peluang
- Audio native + pelafalan interaktif membuat belajar "berbicara" mungkin tanpa guru tatap muka.
- Gamifikasi terbukti meningkatkan retensi harian (streak, misi harian).
- PWA memungkinkan akses murah, latihan offline, dan notifikasi pengingat.

---

## 3. Tujuan & Metrik Keberhasilan

### 3.1 Tujuan Produk
1. Membuat pemula bisa **membaca huruf hijaiyah & harakat** dalam 2 minggu pemakaian rutin.
2. Membuat pengguna bisa **mengerti dan mengucapkan** 500+ kosakata dan frasa dasar.
3. Menjaga **kebiasaan belajar harian** (habit loop) melalui streak & pengingat.
4. Menjadikan belajar bahasa Arab **menyenangkan** (skor kepuasan tinggi).

### 3.2 Metrik Sukses (KPI)
| Metrik | Target (6 bulan) |
|---|---|
| D1 Retention | ≥ 45% |
| D7 Retention | ≥ 25% |
| D30 Retention | ≥ 12% |
| Rata-rata durasi sesi | 8–12 menit |
| Lesson completion rate | ≥ 70% |
| Akurasi pengucapan naik (pre/post) | +30% |
| CSAT / NPS | ≥ 4.5 / 5 • NPS > 40 |

### 3.3 Non-Goals (Tidak termasuk MVP)
- Sertifikasi resmi / kurikulum sekolah formal.
- Kelas video live dengan guru (fase lanjut).
- Sertifikasi level CEFR / Arabiyyah Bayna Yadayk resmi.

---

## 4. Target Pengguna & Persona

### 4.1 Segmen Utama
1. **Pemula total** — belum bisa membaca huruf Arab.
2. **Pelajar/mahasiswa** — butuh kosakata & pemahaman teks.
3. **Karyawan/profesional** — butuh bahasa Arab praktis (kerja di Timur Tengah, bisnis).
4. **Orang tua** — ingin anak belajar dengan cara yang seru.
5. **Guru/ustadz/ustadzah** — butuh alat bantu kelas.

### 4.2 Persona

**Persona 1 — Aisyah, 17, Pelajar SMA (Mobile-first)**
- Motivasi: ingin bisa baca Al-Qur'an lancar & nilai bahasa Arab naik.
- Perangkat: HP Android, kuota terbatas.
- Kebutuhan: sesi singkat, audio, latihan soal, streak.
- Frustrasi: materi terlalu padat, banyak istilah sulit.

**Persona 2 — Budi, 34, Pekerja Migran (Mobile + offline)**
- Motivasi: bisa berkomunikasi dengan atasan & teman kerja di Arab Saudi.
- Perangkat: HP Android, internet tidak stabil.
- Kebutuhan: frase praktis harian, audio pelafalan, mode offline.
- Frustrasi: tidak tahu pengucapan yang benar.

**Persona 3 — Ust. Rahmat, 45, Guru Bahasa Arab (Desktop)**
- Motivasi: mengajar 30 siswa dengan cara lebih menarik.
- Perangkat: Laptop + proyektor.
- Kebutuhan: dashboard kelas, laporan progres, materi siap pakai.

**Persona 4 — Salma, 29, Ibu Rumah Tangga (Mobile)**
- Motivasi: menemani anak belajar Al-Qur'an.
- Kebutuhan: belajar hijaiyah dengan gambar & suara, ramah anak.

### 4.3 Jobs To Be Done
- "Saat saya ingin belajar bahasa Arab, saya ingin materi yang ringkas dan bisa didengar, agar saya paham tanpa harus bertanya ke orang."

---

## 5. Brand Identity

### 5.1 Nama Brand: **Lughati**

| Aspek | Detail |
|---|---|
| **Tulisan Arab** | لُغَتِي |
| **Transliterasi** | *Lughatī* |
| **Asal Kata** | Bahasa Arab: **لُغَة** (*lughah*) = "bahasa"; akhiran **ـِي** (*-ī*) = "milikku / -ku" |
| **Arti Harfiah** | **"Bahasa-ku"** / "Bahasa Arab milikku" |
| **Makna Brand** | Bahasa Arab terasa dekat, personal, dan menjadi bagian dari hidup pengguna — bukan pelajaran asing yang jauh, tapi "bahasa milikku sendiri". |
| **Pengucapan** | "Luu-gha-tii" (dibaca lembut, *gh* seperti "ğ" ) |

### 5.2 Tagline
- **Utama:** *"Bahasa Arab jadi milikmu."*
- **Sekunder (fungsional):** *"Klik, dengar, lancar."*
- **Versi ramah anak:** *"Belajar Arab itu seru!"*

### 5.3 Filosofi Logo
- **Bentuk:** Kaligrafi **لُغَتِي** dengan garis tebal membulat, ditambah **elemen titik hijaiyah (نُقْطَة)** sebagai aksen.
- **Simbol alternatif (favicon/app icon):** huruf **ل** (lam) yang distilasi menjadi bentuk **buku terbuka** atau **gelombang suara** — menyimbolkan "bahasa" + "audio/suara".
- **Area bersih:** minimal 25% dari tinggi logo di setiap sisi.
- **Versi:** full color, monokrom (hitam/putih), dan versi ikon-only.

### 5.4 Maskot: **Jamal si Unta**
| Aspek | Detail |
|---|---|
| **Nama** | **Jamal** |
| **Arti Nama** | **جَمَل** (*jamal*) = "unta". Kebetulan sama dengan kata **جَمَال** (*jamāl*) yang berarti **"keindahan"** — pesan bahwa belajar bahasa Arab itu indah. |
| **Karakter** | Unta kecil ramah, sabar, sedikit lucu, suka bercerita. |
| **Peran** | Memandu pengguna (tutorial), memberi semangat saat salah, memberi selamat saat naik level. |
| **Visual** | Warna krem + aksen teal & emas, mata besar ramah, ekspresi berubah (happy, thinking, cheering, sad-ringan). |
| **Penggunaan** | Empty state, onboarding, badge, error 404, reward. |

### 5.5 Nilai Brand (Brand Values)
1. **Ringan** — mudah dipahami, tidak membebani.
2. **Hangat** — ramah, tidak menghakimi kesalahan.
3. **Seru** — belajar terasa seperti bermain.
4. **Bermakna** — dekat dengan ibadah, budaya, dan kehidupan nyata.
5. **Terpercaya** — konten sesuai kaidah, audio penutur asli.

### 5.6 Tone of Voice
- **Bahasa:** santai tapi sopan, "aku–kamu", hindari istilah teknis berlebihan.
- **Semangat:** positif, mendorong, tidak menghukum.
- **Contoh mikro-kopi:**
  - Benar → *"Mantap! اَحْسَنْتَ (ahsan-ta) 👏"*
  - Salah → *"Hampir benar! Coba dengar sekali lagi ya 🎧"*
  - Streak hilang → *"Nggak apa-apa, Jamal tetap di sini. Ayo mulai lagi!"*

### 5.7 Nada Visual Brand
Modern, bersih, ramah, dengan sentuhan **geometri Islami** (pola bintang & arabesque halus sebagai latar/aksen, bukan dominan).

---

## 6. Design System

### 6.1 Palet Warna

**Warna Utama (Brand)**
| Nama | Hex | RGB | Penggunaan |
|---|---|---|---|
| **Lughati Teal (Primary)** | `#0E7C7B` | 14, 124, 123 | Tombol utama, header, tautan, ikon aktif |
| **Lughati Teal Dark** | `#0A5C5B` | 10, 92, 91 | Hover/pressed state tombol primary |
| **Lughati Teal Light** | `#D6F0EF` | 214, 240, 239 | Background kartu terpilih, highlight |
| **Sahara Gold (Secondary)** | `#F2A63B` | 242, 166, 59 | Badge, XP, aksen, bintang, CTA sekunder |
| **Sahara Gold Dark** | `#D98A1F` | 217, 138, 31 | Hover emas |
| **Pomegranate Coral (Accent)** | `#E85D5D` | 232, 93, 93 | Notifikasi, penting, streak api, error ringan |

**Warna Netral**
| Nama | Hex | Penggunaan |
|---|---|---|
| **Sand 50 (Background)** | `#FFFBF5` | Latar utama (krem hangat) |
| **Sand 100** | `#F6EEE2` | Latar section alternatif |
| **Sand 200** | `#EAE0D2` | Garis pembatas, border |
| **Ink 900 (Teks)** | `#1E2A28` | Teks utama |
| **Ink 600 (Teks sekunder)** | `#5C6B68` | Teks pendukung |
| **Ink 400** | `#93A19E` | Placeholder, disabled |
| **White** | `#FFFFFF` | Kartu, modal, permukaan |

**Warna Semantik / Status**
| Nama | Hex | Arti |
|---|---|---|
| **Success Green** | `#2FA36B` | Jawaban benar, progres selesai |
| **Warning Amber** | `#F2A63B` | Peringatan, streak hampir habis |
| **Error Red** | `#E85D5D` | Jawaban salah, error |
| **Info Blue** | `#3B82C4` | Tips, info netral |

**Warna Mode Gelap (Dark Mode)**
| Nama | Hex |
|---|---|
| Background | `#0F1B1A` |
| Surface | `#162625` |
| Surface Elevated | `#1E3230` |
| Teks Utama | `#F2F7F6` |
| Teks Sekunder | `#A9BCBA` |
| Border | `#2A423F` |
| Teal (Primary dark) | `#2BB3B1` |
| Gold (dark) | `#F4B455` |

**Kontras (Aksesibilitas):**
- Teks Ink 900 di Sand 50 → rasio > 12:1 (AAA).
- Tombol putih di atas Teal `#0E7C7B` → rasio ± 4.9:1 (AA untuk ≥ 18px/bold).
- Untuk teks kecil di atas teal, gunakan `#0A5C5B` (rasio lebih tinggi).

### 6.2 Tipografi

| Peran | Font | Fallback | Ukuran (Mobile / Desktop) | Weight |
|---|---|---|---|---|
| **Display / Judul Besar** | **Baloo 2** (ramah & bulat) | Nunito, sans-serif | 32 / 44px | 700 |
| **Heading H1** | Baloo 2 | Nunito | 28 / 36px | 700 |
| **Heading H2** | Baloo 2 | Nunito | 22 / 28px | 600 |
| **Heading H3** | Nunito | system-ui | 18 / 22px | 700 |
| **Body** | **Nunito / Inter** | system-ui | 16 / 17px | 400 |
| **Label / Tombol** | Nunito | system-ui | 15 / 15px | 700 |
| **Caption** | Nunito | system-ui | 13 / 13px | 500 |
| **Teks Arab (Display)** | **Amiri** atau **Noto Naskh Arabic** | serif arab | 28–48px | 400/700 |
| **Teks Arab (UI)** | **Noto Naskh Arabic** | — | 20–28px | 400 |
| **Teks Latin transliterasi** | Inter Italic | — | 14–16px | 400 |

**Aturan Teks Arab:**
- Selalu `direction: rtl; text-align: right/center`.
- Line-height minimal **1.8** agar harakat tidak terpotong.
- Minimal font-size teks Arab **20px** di mobile.
- Gunakan harakat lengkap pada mode pemula (دَرْسٌ), hilang bertahap di mode lanjutan.

### 6.3 Spacing, Radius, Shadow

**Spacing (skala 4px):** 4, 8, 12, 16, 24, 32, 48, 64, 96

**Border Radius:**
| Token | Nilai | Penggunaan |
|---|---|---|
| `radius-sm` | 8px | chip, input kecil |
| `radius-md` | 12px | input, tombol |
| `radius-lg` | 16px | kartu |
| `radius-xl` | 24px | kartu besar, modal |
| `radius-pill` | 999px | tombol bunder, badge, avatar |

**Shadow:**
| Token | Nilai | Penggunaan |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(30,42,40,.06)` | kartu datar |
| `shadow-md` | `0 6px 16px rgba(30,42,40,.10)` | kartu terangkat, hover |
| `shadow-lg` | `0 18px 40px rgba(30,42,40,.16)` | modal, popover |
| `shadow-glow-teal` | `0 0 0 4px rgba(14,124,123,.18)` | focus ring aksesibilitas |

### 6.4 Ikonografi & Ilustrasi
- **Ikon:** stroke-based, ketebalan 2px, sudut membulat (gaya Lucide/Phosphor).
- **Ikon khusus Arab:** speaker/audio 🔊, mikrofon 🎤, buku, huruf hijaiyah, pita penghargaan.
- **Ilustrasi:** flat, warna brand, karakter Jamal, pola geometri Islami sebagai latar dengan opacity 5–8%.
- **Motif:** bintang 8 sudut (khatam), arabesque, lengkung mihrab untuk header.

### 6.5 Gerak (Motion)
- Durasi: micro 120–180ms, transisi halaman 240–320ms.
- Easing: `cubic-bezier(.2,.8,.2,1)` (ease-out ramah).
- Micro-interaction: tombol "press" turun 2px, kartu naik saat hover, confetti saat naik level.
- Hormati `prefers-reduced-motion` → matikan animasi besar.

### 6.6 Komponen Inti (Design Tokens → Komponen)
`Button` (primary, secondary, ghost, danger), `IconButton`, `SpeakerButton` (khusus audio), `Card`, `CourseCard`, `VocabularyCard`, `Flashcard` (3D flip), `ProgressBar`, `StreakFlame`, `XPBadge`, `Chip/Filter`, `TabBar`, `Navbar`, `Sidebar`, `BottomNav`, `Modal`, `BottomSheet`, `Toast`, `Tooltip`, `Input`, `Select`, `AudioPlayerBar`, `Avatar`, `LeaderboardRow`, `AchievementBadge`, `Skeleton`, `EmptyState`.

---

## 7. Information Architecture (Sitemap)

```
Lughati
├── /                     Landing / Beranda (publik)
├── /masuk                Login
├── /daftar               Register
├── /lupa-sandi           Forgot password
├── /onboarding           Kuis level & tujuan belajar (setelah daftar)
├── /app
│   ├── /belajar          Dashboard belajar (jalur/modul)
│   ├── /belajar/:modul   Detail modul
│   ├── /pelajaran/:id    Lesson interaktif (latihan)
│   ├── /hijaiyah         Belajar & latih huruf hijaiyah
│   ├── /kamus            Kamus interaktif + audio
│   ├── /flashcard        Flashcard & hafalan (SRS)
│   ├── /cerita           Cerita pendek interaktif (qira'ah)
│   ├── /latihan          Game latihan & kuis
│   ├── /progres          Statistik & riwayat
│   ├── /peringkat        Leaderboard
│   ├── /pencapaian       Badge & achievement
│   └── /profil           Profil & pengaturan
├── /kelas                Dashboard guru (desktop)
├── /harga                Premium / paket
├── /tentang              Tentang Lughati
├── /bantuan              Pusat bantuan & FAQ
└── /404                  404 Not Found
```

---

## 8. Detail Halaman

> Setiap halaman dijelaskan: **Tujuan**, **Komponen/Blok**, **Aksi utama (CTA)**, **Perilaku**, dan **Catatan mobile/desktop**.

---

### 8.1 Landing / Beranda (`/`)

**Tujuan:** Memperkenalkan Lughati, menumbuhkan minat, dan mengarahkan ke daftar.

**Blok:**
1. **Top Navbar** — logo Lughati (لُغَتِي), menu: Fitur, Kursus, Harga, Tentang; tombol "Masuk" (ghost) & "Coba Gratis" (primary).
2. **Hero** — headline *"Bahasa Arab jadi milikmu."*, subheadline, 2 CTA ("Mulai Gratis", "Lihat Demo"), ilustrasi Jamal + kartu kata interaktif (klik → audio).
3. **Social proof** — bar statistik: "10.000+ pelajar", "500+ kosakata ber-audio", "4.8 ★".
4. **Fitur Utama** — grid 6 kartu (Audio 1-Klik, Gamifikasi, Hijaiyah, Kamus, Cerita, Offline).
5. **Cara Kerja** — 3 langkah: Pilih level → Belajar 5 menit/hari → Rayakan progres.
6. **Demo interaktif** — mini-player: pengguna mencoba klik kata Arab dan mendengar audio tanpa daftar.
7. **Testimoni** — carousel kartu.
8. **Harga singkat** — Free vs Premium.
9. **CTA besar + Footer** — kolom Produk, Perusahaan, Bantuan, sosial media, bahasa.

**CTA utama:** `Mulai Gratis`.

---

### 8.2 Login (`/masuk`) & Register (`/daftar`)

**Tujuan:** Masuk/daftar cepat dengan friksi minimal.

**Komponen:** form email + kata sandi, tombol *Lihat sandi*, "Masuk dengan Google", "Lanjutkan sebagai tamu", tautan lupa sandi, link ke register.

**Perilaku:** validasi real-time, error jelas & ramah, animasi Jamal saat memuat.

**Mobile:** satu kolom, tombol full-width, login Google di atas.
**Desktop:** layout split 2 kolom — kiri ilustrasi/brand, kanan form (kartu). Ilustrasi pola Islami.

---

### 8.3 Onboarding (`/onboarding`)

**Tujuan:** Memahami pengguna untuk rekomendasi jalur belajar.

**Langkah (4 langkah, progress bar di atas):**
1. **Tujuan belajar** — Ibadah/Al-Qur'an, Kerja, Sekolah, Travel, Umum (pilih 1+).
2. **Level awal** — "Belum bisa baca huruf Arab" / "Bisa baca, belum paham" / "Sudah bisa dasar".
3. **Waktu belajar harian** — 5 / 10 / 15 / 20 menit.
4. **Pengingat** — pilih jam notifikasi.

**Output:** jalur belajar personal + paket pelajaran pertama.

---

### 8.4 Dashboard Belajar (`/app/belajar`)

**Tujuan:** Titik awal harian; mendorong konsistensi.

**Blok:**
1. **Sapaan personal** — "Ahlan, Aisyah 👋" + status streak.
2. **Kartu Misi Harian** — "Selesaikan 1 pelajaran", progress ring.
3. **Lanjutkan Belajar** — kartu besar pelajaran terakhir + tombol "Lanjut".
4. **Jalur Belajar (Learning Path)** — node modul berbentuk jalur berkelok (seperti peta petualangan), tiap node = 1 modul; terkunci/aktif/selesai.
5. **Streak & XP** — widget api 🔥 dan XP mingguan.
6. **Pelajaran Rekomendasi** — "Karena kamu suka tema Makanan".
7. **Kata Hari Ini** — kata + audio + contoh kalimat.

**CTA utama:** `Lanjut Belajar`.

**Mobile:** kolom tunggal; jalur vertikal; bottom navigation.
**Desktop:** grid 12 kolom — jalur belajar (7 col) + sidebar kanan (5 col) berisi streak, XP, kata hari ini, leaderboard mini.

---

### 8.5 Detail Modul (`/app/belajar/:modul`)

**Isi:** judul modul, deskripsi, tujuan pembelajaran, daftar pelajaran (list dengan status & estimasi waktu), tombol "Mulai" untuk pelajaran aktif, indikator "X/Y pelajaran selesai".

---

### 8.6 Pelajaran Interaktif (`/app/pelajaran/:id`) — **Halaman Inti**

**Tujuan:** Latihan menyenangkan dengan audio & feedback instan.

**Struktur:** 6–12 soal per sesi, tipe soal bergantian:
1. **Pilih arti** — lihat kosakata Arab (+audio), pilih arti benar (gambar/teks).
2. **Pilih kata Arab** — lihat arti, pilih tulisan Arab yang tepat.
3. **Dengar & pilih** — audio diputar, pilih gambar/kata yang cocok.
4. **Lafalkan (Speech)** — mikrofon, ucapkan kata, dapat skor akurasi.
5. **Susun kalimat** — susun kata jadi kalimat benar (drag/ketuk).
6. **Isi harakat** — pilih harakat tepat.
7. **Menulis (trace)** — jiplak huruf hijaiyah dengan jari.

**Elemen UI persisten:**
- Bar progress di atas + tombol "X" keluar.
- Nyawa/kesempatan (opsional mode menantang) atau tanpa hukuman (mode santai — default).
- Tombol speaker besar di dekat setiap teks Arab.

**Feedback:**
- Benar → hijau, suara "ding", animasi centang, +XP.
- Salah → merah lembut, tampilkan jawaban benar + audio, tombol "Coba lagi".

**Akhir pelajaran:** layar ringkasan — XP didapat, akurasi, durasi, streak, kata yang perlu diulang, tombol "Lanjut" & "Ulangi kata sulit".

**Mobile:** layout vertikal penuh, tombol aksi di bagian bawah (sticky), swipe interaksi.
**Desktop:** konten soal di tengah (max-width 720px), panel progress di kiri (opsional), tanpa bottom nav.

---

### 8.7 Hijaiyah (`/app/hijaiyah`)

**Isi:** grid 28 huruf + tanda baca (fathah, kasrah, dhammah, sukun, syaddah, tanwin).
**Interaksi:** klik huruf → audio makhraj, animasi stroke penulisan, contoh suku kata (بَ بِ بُ).
**Latihan:** "Tebak suara huruf", "Pasangkan huruf & suara", "Trace huruf".
**Khusus:** tabel makhraj (tempat keluar huruf) dengan ilustrasi mulut.

---

### 8.8 Kamus (`/app/kamus`)

**Fitur:**
- Pencarian (Arab ↔ Indonesia ↔ transliterasi).
- **Klik kata → audio** (lihat §10).
- Filter: tema, kelas kata (isim/fi'il/harf), level.
- Setiap kata: tulisan Arab berharakat, transliterasi, arti, contoh kalimat (dengan audio), sinonim/antonim, catatan penggunaan.
- Tombol **"Tambah ke Flashcard"** dan **"Favorit"**.
- Riwayat pencarian & kata populer.

**Mobile:** hasil list kartu penuh, tombol speaker besar, filter sebagai bottom sheet.
**Desktop:** list kiri + panel detail kanan (master–detail), filter di sidebar.

---

### 8.9 Flashcard & Hafalan (`/app/flashcard`)

**Fitur:**
- Kartu flip 3D (depan: Arab + audio; belakang: arti + contoh).
- Mode: **Belajar**, **Uji**, **Hafalan cepat**.
- **Spaced Repetition (SRS)** — kartu muncul kembali sesuai tingkat kesulitan (Leitner/SM-2).
- Deck: bawaan (per tema) + deck buatan pengguna.
- Swipe kiri/kanan untuk "tidak ingat"/"ingat".

---

### 8.10 Cerita Interaktif (`/app/cerita`)

**Isi:** cerita pendek berjenjang (A1–B1) dengan:
- Teks Arab berharakat, transliterasi on/off, terjemahan per kalimat.
- **Klik kalimat/kata → audio** + sorot kata.
- Vocabulary popup (tap kata → arti + audio).
- Kuis pemahaman di akhir + rekaman suara pengguna membaca.

**Contoh judul:** "يَوْمٌ فِي السُّوقِ" (Sehari di Pasar), "أُسْرَتِي" (Keluargaku).

---

### 8.11 Latihan & Game (`/app/latihan`)

**Mode game:**
- **Kilat Kosakata** (time attack), **Cocokkan Pasangan** (memory), **Susun Huruf**, **Duel** (async dengan teman/bot), **Tantangan Harian** (set soal khusus, bonus XP), **Dengar & Ketuk** (audio → pilih gambar cepat).
- Papan skor harian & hadiah badge.

---

### 8.12 Progres (`/app/progres`)

- Ringkasan: total XP, level, hari beruntun, total kata dikuasai, waktu belajar.
- Grafik: belajar per hari (minggu/bulan), akurasi per keterampilan (membaca/mendengar/berbicara).
- Daftar kata lemah (perlu review) → tombol "Latih sekarang".
- Kalender aktivitas (heat map ala GitHub, warna teal).

---

### 8.13 Peringkat (`/app/peringkat`)

- Tab: **Global**, **Mingguan**, **Teman/kelas**.
- Baris: peringkat, avatar, nama, XP; highlight pengguna sendiri.
- Liga (Bronze→Diamond) dengan promo/degradasi mingguan.

---

### 8.14 Pencapaian (`/app/pencapaian`)

- Grid badge (berwarna = terbuka, abu = terkunci) + deskripsi & tanggal.
- Contoh badge: *Langkah Pertama* (selesaikan pelajaran pertama), *Api Abadi* (streak 30 hari), *Telinga Emas* (100 soal mendengar sempurna), *Lidah Fasih* (skor pengucapan > 90), *Kutu Buku* (baca 5 cerita), *Kolektor* (500 kata dikuasai).

---

### 8.15 Profil & Pengaturan (`/app/profil`)

- Info akun, avatar, level, statistik ringkas.
- Pengaturan: bahasa antarmuka, tampilan (terang/gelap/sistem), kecepatan audio default, tampilkan transliterasi, harakat (lengkap/bertahap), notifikasi & jam pengingat, ukuran teks Arab, mode offline (unduh paket), kelola akun, hapus akun, keluar.
- Bagian **Aksesibilitas**: mode disleksia, kontras tinggi, kurangi gerak.

---

### 8.16 Kelas / Guru (`/kelas`) — Desktop-focused

- Buat kelas, undang siswa (kode/link), tetapkan tugas/modul.
- Dashboard: progres per siswa, kata yang sering salah di kelas, ekspor CSV.
- Laporan mingguan otomatis.

---

### 8.17 Harga (`/harga`)

- **Gratis:** akses modul dasar, 5 pelajaran/hari, fitur audio dasar.
- **Premium:** semua modul, unlimited pelajaran, mode offline (unduh), kamus lengkap, tanpa iklan, sertifikat, latihan berbicara lanjutan.
- Toggle Bulanan/Tahunan (diskon tahunan), FAQ singkat.

---

### 8.18 Tentang (`/tentang`), Bantuan (`/bantuan`), 404

- **Tentang:** misi, cerita brand Lughati, arti nama & maskot Jamal, tim, kontak.
- **Bantuan:** FAQ akordeon + pencarian + kontak dukungan.
- **404:** ilustrasi Jamal bingung + pesan ramah + tombol "Kembali ke Beranda".

---

## 9. Tampilan: Mobile View vs Desktop View

### 9.1 Prinsip Umum
- **Mobile-first**, kemudian diperkaya untuk desktop.
- **Breakpoint:**
| Nama | Range | Kolom grid | Gutter |
|---|---|---|---|
| `xs` | 0–479px | 4 | 16px |
| `sm` | 480–767px | 4 | 20px |
| `md` | 768–1023px | 8 | 24px |
| `lg` | 1024–1279px | 12 | 32px |
| `xl` | ≥1280px | 12 (max-width 1200px) | 32px |

### 9.2 Navigasi
| Aspek | Mobile | Desktop |
|---|---|---|
| Pola | **Bottom Navigation Bar** (5 item: Belajar, Kamus, Latihan, Progres, Profil) | **Top Navbar + Sidebar kiri** |
| Item sekunder | Menu "Lainnya" dalam bottom sheet | Semua tampil di sidebar |
| Aksi utama | FAB / tombol sticky bawah | Tombol di header kanan |
| Halaman pelajaran | Fullscreen, tombol aksi sticky bawah | Container tengah, keyboard shortcut |

### 9.3 Perbandingan per Area

| Area | Mobile View | Desktop View |
|---|---|---|
| **Hero Landing** | Vertikal: teks → CTA → ilustrasi | 2 kolom: teks (kiri), ilustrasi + card audio (kanan) |
| **Grid fitur** | 1–2 kolom | 3 kolom |
| **Jalur belajar** | Jalur vertikal berkelok, 1 kolom | Jalur vertikal + panel ringkasan di sidebar kanan |
| **Kamus** | List kartu → buka halaman detail | Master–detail (list kiri + detail kanan) |
| **Flashcard** | Kartu penuh, swipe, tombol bawah | Kartu tengah + info SRS di samping |
| **Statistik** | 1 kolom, grafik sederhana | 2–3 kolom, grafik lebih kaya |
| **Leaderboard** | Top 3 kartu + list | Tabel penuh dengan kolom XP & liga |
| **Pelajaran** | Soal full-screen, audio besar | Soal di tengah + shortcut keyboard (1-4, Enter, Spasi untuk putar audio) |
| **Guru/Kelas** | Ringkas (lihat saja) | Penuh (kelola kelas) |
| **Footer** | Akordeon kolom | 4 kolom terbuka |

### 9.4 Perilaku Adaptif
- **Touch vs Cursor:** target sentuh ≥ 44px (mobile); hover states hanya desktop.
- **Tipografi responsif:** clamp() untuk heading.
- **Gambar/ilustrasi:** versi mobile lebih sederhana (SVG ringan).
- **Tabel → Kartu:** tabel besar berubah menjadi kartu bertumpuk di mobile.
- **Modal → Bottom Sheet:** di mobile gunakan bottom sheet; di desktop modal tengah.
- **Audio:** tombol speaker tetap besar & mudah dijangkau dengan jempol (zona bawah layar).

---

## 10. Fitur Audio (Spesifikasi Detail)

> **Ini fitur kunci Lughati:** *"Klik tulisan Arab → dengar pengucapan penutur asli."*

### 10.1 Pemicu (Trigger) Audio
1. **Klik/tap pada teks Arab** mana pun yang bertanda audio (kata, frasa, kalimat, huruf hijaiyah) → audio langsung diputar.
2. **Tombol speaker (🔊)** di samping teks → memutar audio yang sama.
3. **Auto-play** opsional saat soal mendengar (`Dengar & pilih`).
4. **Keyboard:** fokus pada elemen audio + tekan `Enter`/`Space` (desktop) untuk memutar.

### 10.2 Perilaku Pemutaran
- **Latency:** mulai < 300ms (audio di-preload/cache).
- Saat diputar: elemen teks **ter-highlight** (background teal light) + ikon speaker beranimasi gelombang.
- **Tidak ada tumpang tindih:** memutar audio baru menghentikan audio sebelumnya.
- **Repeat:** putar ulang tanpa batas; tombol **🔁 ulang**.
- **Slow mode:** tombol **🐢 0.75×** untuk pelafalan lambat (khusus pemula).
- **Loop mode:** putar berulang (opsional) untuk hafalan.
- **Auto-scroll** ke kalimat yang sedang diputar pada mode cerita.

### 10.3 Varian Audio per Tipe Konten
| Konten | Audio |
|---|---|
| Huruf hijaiyah | Nama huruf + makhraj + contoh suku kata |
| Kata (mufradat) | Kata tunggal, jelas, standar (fusha) |
| Kalimat/frasa | Kalimat utuh + opsi kata per kata |
| Cerita | Per kalimat + per kata (tap kata) |
| Dialog | Percakapan 2 penutur + mode peran |
| Angka | 0–100+ |

### 10.4 Kualitas & Sumber Audio
- **Penutur asli** (native), aksen fusha standar; variasi suara pria/wanita.
- Format: **MP3/OGG**, bitrate 96–128 kbps, mono, durasi per kata < 2s.
- **CDN + cache** (service worker) untuk offline.
- **Fallback:** jika audio tidak tersedia → gunakan **Web Speech API (TTS)** bahasa `ar-SA` + toast *"Menggunakan suara otomatis"*.

### 10.5 Audio Player Bar (global, opsional)
- Muncul di bawah saat audio panjang (cerita/dialog): play/pause, seek, kecepatan (0.5×, 0.75×, 1×), ulangi kalimat, unduh (premium).

### 10.6 Aksesibilitas Audio
- Setiap elemen audio punya `aria-label` ("Putar pengucapan: كِتَاب").
- Status `aria-live="polite"` mengumumkan "Memutar…".
- Kontrol volume mengikuti volume sistem; tidak ada audio yang memutar otomatis tanpa aksi pengguna (kecuali soal mendengar, dengan opsi nonaktif).

---

## 11. Fitur Utama Lainnya

### 11.1 Gamifikasi (Motivasi)
- **XP & Level** — tiap aktivitas memberi XP.
- **Streak (Api Harian)** — hari beruntun; pengingat sebelum tengah malam; "streak freeze" (premium/iklan).
- **Liga & Leaderboard** — naik/turun liga tiap minggu.
- **Badge & Achievement** — koleksi pencapaian.
- **Misi Harian & Tantangan** — target kecil yang bisa dicapai.
- **Confetti & Sound Reward** — selebrasi saat naik level/badge.

### 11.2 Speech Recognition (Latihan Berbicara)
- Rekam suara → transkripsi & **skor akurasi** (0–100) + umpan balik per huruf/fonem yang kurang tepat.
- Bandingkan dengan audio referensi (dengar ulang).
- Berbasis Web Speech API + model penilaian pengucapan.

### 11.3 Spaced Repetition (SRS)
- Algoritma pengulangan berjeda untuk hafalan jangka panjang.
- Daftar "kata lemah" otomatis dari kesalahan pengguna.

### 11.4 Offline Mode (PWA)
- Install ke layar utama, buka kapan saja.
- Unduh paket pelajaran + audio untuk offline (premium/terbatas).
- Sinkronisasi progres saat kembali online.

### 11.5 Tema & Personalisasi
- Terang / Gelap / Ikuti sistem.
- Ukuran teks Arab (kecil–besar), tampilkan/sembunyikan harakat, tampilkan/sembunyikan transliterasi.
- Pilih suara audio (pria/wanita), kecepatan default.

### 11.6 Budaya & Konteks (Culture Corner)
- Ungkapan harian (salam, terima kasih, minta maaf), adab, nama hari/bulan Hijriah, hari besar, masakan, tempat wisata.
- "Kata hari ini" dengan konteks nyata.

### 11.7 Notifikasi & Pengingat
- Push notification (PWA): pengingat belajar sesuai jam pilihan.
- Notifikasi streak hampir hilang, badge baru, PR dari guru.

### 11.8 Multibahasa UI
- Bahasa Indonesia (default), English.
- Terminologi `i18n` siap diperluas (mis. Melayu, Turki).

### 11.9 Mode Anak (Kids Mode)
- Tampilan lebih besar & berwarna, animasi lebih banyak, konten ramah anak, kontrol orang tua (batas waktu).

### 11.10 Pencarian Global
- Satu kotak pencarian untuk kosakata, pelajaran, cerita, dan bantuan.

### 11.11 Akun & Sosial
- Login Google/Email, profil publik ringkas, tambah teman, tantang teman.
- Sertifikat/badge yang bisa dibagikan (shareable card).

---

## 12. Alur Pengguna Utama (User Flows)

### 12.1 Flow Onboarding → Pelajaran Pertama
`Landing → Coba Gratis → Register → Onboarding (4 langkah) → Dashboard → Pelajaran 1 → Ringkasan → Dashboard`

### 12.2 Flow "Klik & Dengar"
`Halaman apa pun → Klik/tap teks Arab → (highlight + animasi) → Audio diputar → Selesai / Ulangi / Mode lambat`

### 12.3 Flow Latihan Berbicara
`Pelajaran tipe Lafalkan → Tekan mikrofon → Izin mikrofon (sekali) → Ucapkan → Skor akurasi + feedback → Ulangi / Lanjut`

### 12.4 Flow Streak Harian
`Notifikasi pengingat → Buka app → Misi Harian → Selesaikan 1 pelajaran → Streak +1 → XP & animasi → Selesai`

### 12.5 Flow Guru
`Login → /kelas → Buat kelas → Undang siswa (kode) → Tetapkan modul → Pantau progres → Ekspor laporan`

---

## 13. Konten & Struktur Kurikulum

### 13.1 Tingkat (Level)
| Level | Fokus | Contoh Materi |
|---|---|---|
| **A0 — Hijaiyah** | Baca & tulis huruf | 28 huruf, harakat, sukun, syaddah |
| **A1 — Dasar** | Kosakata & frasa harian | Salam, keluarga, angka, warna, makanan |
| **A2 — Pra-Menengah** | Kalimat sederhana & tata bahasa dasar | Isim–fi'il–harf, jumlah ismiyah/fi'liyah |
| **B1 — Menengah** | Percakapan & teks | Dialog, cerita, waktu, pekerjaan |
| **B2 — Lanjut** | Nahwu–sharaf & teks lebih kompleks | I'rab, wazan, teks asli sederhana |

### 13.2 Tema Modul (A1 contoh)
Salam & Perkenalan • Keluarga • Angka & Waktu • Warna & Bentuk • Makanan & Minuman • Rumah • Anggota Tubuh • Pakaian • Pekerjaan • Tempat Umum • Perjalanan • Cuaca • Olahraga • Hobi.

### 13.3 Struktur Satu Pelajaran
- 6–12 soal, 2–4 kosakata baru, 1–2 pola kalimat.
- Durasi target: **5–7 menit**.
- Objektif jelas ("Setelah pelajaran ini kamu bisa …").

### 13.4 Panduan Konten
- Harakat lengkap untuk A0–A1, berkurang di A2+.
- Setiap kosakata **wajib** punya audio + contoh kalimat.
- Validasi oleh ahli bahasa Arab (native reviewer).
- Visual kontekstual (gambar/foto) untuk kata benda konkret.

---

## 14. Requirement Non-Fungsional

### 14.1 Performa
- **LCP < 2.5s**, **INP < 200ms**, **CLS < 0.1** (mobile 4G).
- Audio mulai < 300ms setelah interaksi.
- Bundle JS awal < 200KB (gzip); gambar lazy-load, format WebP/AVIF.
- Lighthouse Performance ≥ 90 (mobile).

### 14.2 Aksesibilitas (WCAG 2.1 AA)
- Kontras warna ≥ 4.5:1 untuk teks normal.
- Navigasi penuh keyboard.
- Dukungan screen reader (ARIA benar, termasuk untuk teks Arab RTL).
- Teks alternatif untuk semua gambar & tombol audio.
- `prefers-reduced-motion` dihormati.

### 14.3 SEO
- SSR/SSG untuk halaman publik (landing, kamus publik, tentang, bantuan).
- Meta & Open Graph, sitemap, structured data (Course, FAQ).
- URL ramah & bersih.

### 14.4 Keamanan & Privasi
- HTTPS wajib, password hashing (bcrypt/argon2).
- Sesuai UU PDP Indonesia & (jika perlu) GDPR.
- Izin mikrofon hanya saat dipakai + penjelasan jelas.
- Rekaman suara pengguna: default **diproses lokal**, simpan hanya bila pengguna setuju.
- Rate limiting, proteksi XSS/CSRF.

### 14.5 Reliabilitas & Skalabilitas
- Uptime ≥ 99.9%.
- Audio via CDN global.
- Backup harian.

### 14.6 Kompatibilitas
- Browser: Chrome, Safari, Firefox, Edge (2 versi terakhir); iOS Safari 15+.
- Perangkat: Android & iOS mid-range (tidak hanya flagship).

### 14.7 Lokalisasi & Internasionalisasi
- Mendukung teks RTL dan LTR di halaman yang sama.
- Format angka (Arab: ١٢٣ / Latin: 123) dapat diganti.
- Zona waktu untuk streak & notifikasi.

---

## 15. Rekomendasi Tech Stack

| Lapisan | Teknologi |
|---|---|
| Frontend | Next.js (React) + TypeScript, Tailwind CSS, Framer Motion |
| State & Data | TanStack Query, Zustand |
| PWA/Offline | Workbox Service Worker, IndexedDB |
| Audio | Howler.js / HTML5 Audio + Web Audio API, Web Speech API (TTS + recognition) |
| Backend | Node.js (NestJS) atau Supabase (Auth, DB, Storage) |
| Database | PostgreSQL |
| Storage Audio | Object storage (S3/Cloudflare R2) + CDN |
| Auth | Supabase Auth / Firebase Auth (Google + Email) |
| Analitik | PostHog / Mixpanel + Sentry (error) |
| Notifikasi | Web Push (FCM) |
| Deployment | Vercel (frontend) + managed backend |

---

## 16. Roadmap

### Fase 0 — Riset & Desain (2–3 minggu)
Riset pengguna, brand final, design system, prototipe konsep.

### Fase 1 — MVP (8–10 minggu) 🎯
- Landing, Auth, Onboarding
- Dashboard + Jalur belajar (A0 Hijaiyah + A1 dasar)
- Pelajaran interaktif (4 tipe soal) + **audio klik-untuk-dengar**
- Kamus + audio
- Flashcard dasar
- Progres & streak
- Responsive (mobile + desktop), PWA installable

### Fase 2 — Engagement (6–8 minggu)
- Gamifikasi lengkap (liga, badge, misi harian)
- Latihan berbicara (speech recognition)
- Cerita interaktif
- SRS
- Offline mode
- Notifikasi

### Fase 3 — Skala & Sekolah (8 minggu)
- Dashboard guru/kelas
- Premium & pembayaran
- Kids mode
- Multibahasa (English)
- Sertifikat

---

## 17. Analitik & Event Tracking

**Event kunci:**
`page_view`, `signup_completed`, `onboarding_finished`, `lesson_started`, `lesson_completed`, `question_answered` (tipe, benar/salah, waktu), `audio_played` (konten, tipe, sumber asli/tts), `audio_slow_mode_used`, `speech_attempt` (skor), `flashcard_reviewed`, `streak_incremented`, `badge_unlocked`, `leaderboard_viewed`, `search_performed`, `offline_pack_downloaded`, `notification_opened`.

**Dashboard analitik:** funnel onboarding, retensi kohort, kata paling sering salah, tingkat pemakaian audio, jam belajar populer.

---

## 18. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Pengguna bosan setelah 1 minggu | Retensi rendah | Gamifikasi, misi harian, notifikasi, konten ringan |
| Audio tidak lengkap | Fitur inti lumpuh | Skala produksi audio bertahap + fallback TTS |
| Ukuran audio besar → boros kuota | Pengguna menyerah | Kompresi, streaming, offline pack opsional |
| Speech recognition tidak akurat untuk Arab | Frustrasi | Feedback lunak, bukan penentu, sediakan lewati |
| Konflik RTL/LTR di UI | Layout rusak | Kepatuhan `dir`, komponen teruji |
| Konten kurang valid dari sisi kaidah | Kehilangan kepercayaan | Reviewer ahli & native speaker |
| Biaya produksi audio tinggi | Anggaran | Prioritas konten inti dulu |

---

## 19. Acceptance Criteria (Contoh, MVP)

- [ ] Pengguna dapat mendaftar dan menyelesaikan onboarding ≤ 2 menit.
- [ ] **Klik/tap pada teks Arab langsung memutar audio** (latensi < 300ms) di seluruh halaman yang mendukung.
- [ ] Tombol speaker, mode lambat (0.75×), dan ulang berfungsi di semua elemen audio.
- [ ] Fallback TTS aktif bila audio native tidak ada.
- [ ] Pelajaran dapat diselesaikan dan memberi XP + memperbarui streak.
- [ ] Tampilan optimal di 360px (mobile) dan 1440px (desktop) tanpa scroll horizontal.
- [ ] Bottom navigation muncul di mobile; sidebar + top navbar di desktop.
- [ ] Kontras & navigasi keyboard memenuhi WCAG AA.
- [ ] PWA dapat di-install dan membuka halaman dasar saat offline.
- [ ] Waktu muat LCP < 2.5s pada simulasi 4G.

---

## 20. Lampiran

### 20.1 Ringkasan Palet (Quick Reference)
```
Primary Teal   #0E7C7B    ███████
Teal Dark      #0A5C5B    ███████
Teal Light     #D6F0EF    ███████
Sahara Gold    #F2A63B    ███████
Coral Accent   #E85D5D    ███████
Sand BG        #FFFBF5    ███████
Ink 900        #1E2A28    ███████
Success        #2FA36B    ███████
```

### 20.2 Brand Card
```
Nama      : Lughati (لُغَتِي)
Arti      : "Bahasa-ku" / Bahasa Arab milikku
Tagline   : "Bahasa Arab jadi milikmu."
Maskot    : Jamal si Unta (جَمَل = unta; جَمَال = keindahan)
Nilai     : Ringan • Hangat • Seru • Bermakna • Terpercaya
Warna     : Teal (ketenangan & pertumbuhan) + Emas (nilai & cahaya) + Coral (semangat)
```

### 20.3 Catatan Akhir
PRD ini adalah dokumen hidup. Setiap perubahan besar wajib melalui review tim produk, desain, dan konten (reviewer bahasa Arab) sebelum masuk ke sprint pengembangan.

---

*Dokumen ini dibuat untuk proyek Lughati — website pembelajaran bahasa Arab yang mudah dan mengasyikkan.*

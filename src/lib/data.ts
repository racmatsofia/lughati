/* =========================================================================
   Lughati — Konten & Kurikulum
   Semua teks Arab memakai harakat lengkap untuk level pemula.
   ========================================================================= */

export type WordType = "isim" | "fi'il" | "harf" | "hijaiyah" | "frasa" | "angka";

export type Word = {
  id: string;
  ar: string;
  translit: string;
  meaning: string;
  type: WordType;
  theme: string;
  example?: { ar: string; translit: string; meaning: string };
};

export type HijaiyahLetter = {
  ar: string;
  name: string;
  translit: string;
  makhraj: string;
  forms: [string, string, string, string]; // terpisah, awal, tengah, akhir
};

export type Lesson = {
  id: string;
  title: string;
  minutes: number;
  wordIds: string[];
};

export type Module = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: "A0" | "A1" | "A2" | "B1";
  emoji: string;
  lessons: Lesson[];
};

/* ------------------------------- HIJAIYAH ------------------------------- */
export const HIJAIYAH: HijaiyahLetter[] = [
  { ar: "ا", name: "Alif", translit: "a", makhraj: "Rongga mulut, tanpa hambatan.", forms: ["ا", "ا", "ـا", "ـا"] },
  { ar: "ب", name: "Ba'", translit: "b", makhraj: "Kedua bibir tertutup, lalu dibuka dengan hembusan udara.", forms: ["ب", "بـ", "ـبـ", "ـب"] },
  { ar: "ت", name: "Ta'", translit: "t", makhraj: "Ujung lidah menyentuh pangkal gigi depan atas.", forms: ["ت", "تـ", "ـتـ", "ـت"] },
  { ar: "ث", name: "Tsa'", translit: "ts", makhraj: "Ujung lidah keluar sedikit menyentuh ujung gigi atas.", forms: ["ث", "ثـ", "ـثـ", "ـث"] },
  { ar: "ج", name: "Jim", translit: "j", makhraj: "Tengah lidah menempel langit-langit.", forms: ["ج", "جـ", "ـجـ", "ـج"] },
  { ar: "ح", name: "Ha'", translit: "ḥ", makhraj: "Tengah tenggorokan, tanpa getaran.", forms: ["ح", "حـ", "ـحـ", "ـح"] },
  { ar: "خ", name: "Kha'", translit: "kh", makhraj: "Pangkal tenggorokan, dengan getaran lembut.", forms: ["خ", "خـ", "ـخـ", "ـخ"] },
  { ar: "د", name: "Dal", translit: "d", makhraj: "Ujung lidah menekan pangkal gigi atas.", forms: ["د", "د", "ـد", "ـد"] },
  { ar: "ذ", name: "Dzal", translit: "dz", makhraj: "Ujung lidah keluar menyentuh ujung gigi atas (bergetar).", forms: ["ذ", "ذ", "ـذ", "ـذ"] },
  { ar: "ر", name: "Ra'", translit: "r", makhraj: "Ujung lidah bergetar ringan di langit-langit depan.", forms: ["ر", "ر", "ـر", "ـر"] },
  { ar: "ز", name: "Zay", translit: "z", makhraj: "Ujung lidah dekat gigi atas, bergetar.", forms: ["ز", "ز", "ـز", "ـز"] },
  { ar: "س", name: "Sin", translit: "s", makhraj: "Ujung lidah dekat gigi atas, berdesir.", forms: ["س", "سـ", "ـسـ", "ـس"] },
  { ar: "ش", name: "Syin", translit: "sy", makhraj: "Tengah lidah menempel langit-langit, berdesir.", forms: ["ش", "شـ", "ـشـ", "ـش"] },
  { ar: "ص", name: "Shad", translit: "ṣ", makhraj: "Tebal — ujung lidah dekat gigi, mulut membulat.", forms: ["ص", "صـ", "ـصـ", "ـص"] },
  { ar: "ض", name: "Dhad", translit: "ḍ", makhraj: "Tepi lidah menyentuh gigi geraham atas.", forms: ["ض", "ضـ", "ـضـ", "ـض"] },
  { ar: "ط", name: "Tha'", translit: "ṭ", makhraj: "Tebal — ujung lidah menekan pangkal gigi atas.", forms: ["ط", "طـ", "ـطـ", "ـط"] },
  { ar: "ظ", name: "Zha'", translit: "ẓ", makhraj: "Tebal — ujung lidah keluar menyentuh gigi atas.", forms: ["ظ", "ظـ", "ـظـ", "ـظ"] },
  { ar: "ع", name: "'Ain", translit: "'a", makhraj: "Tengah tenggorokan, suara ditekan.", forms: ["ع", "عـ", "ـعـ", "ـع"] },
  { ar: "غ", name: "Ghain", translit: "gh", makhraj: "Pangkal tenggorokan, bergetar seperti berkumur.", forms: ["غ", "غـ", "ـغـ", "ـغ"] },
  { ar: "ف", name: "Fa'", translit: "f", makhraj: "Ujung gigi atas menyentuh bibir bawah.", forms: ["ف", "فـ", "ـفـ", "ـف"] },
  { ar: "ق", name: "Qaf", translit: "q", makhraj: "Pangkal lidah menekan langit-langit lunak.", forms: ["ق", "قـ", "ـقـ", "ـق"] },
  { ar: "ك", name: "Kaf", translit: "k", makhraj: "Pangkal lidah sedikit ke depan dari qaf.", forms: ["ك", "كـ", "ـكـ", "ـك"] },
  { ar: "ل", name: "Lam", translit: "l", makhraj: "Ujung lidah menempel langit-langit depan.", forms: ["ل", "لـ", "ـلـ", "ـل"] },
  { ar: "م", name: "Mim", translit: "m", makhraj: "Kedua bibir rapat, suara keluar dari hidung.", forms: ["م", "مـ", "ـمـ", "ـم"] },
  { ar: "ن", name: "Nun", translit: "n", makhraj: "Ujung lidah menempel langit-langit, suara dari hidung.", forms: ["ن", "نـ", "ـنـ", "ـن"] },
  { ar: "و", name: "Wau", translit: "w", makhraj: "Bibir membulat ke depan.", forms: ["و", "و", "ـو", "ـو"] },
  { ar: "ه", name: "Ha", translit: "h", makhraj: "Pangkal tenggorokan, hembusan ringan.", forms: ["ه", "هـ", "ـهـ", "ـه"] },
  { ar: "ي", name: "Ya'", translit: "y", makhraj: "Tengah lidah naik ke langit-langit.", forms: ["ي", "يـ", "ـيـ", "ـي"] },
];

export const HARAKAT = [
  { ar: "بَ", name: "Fathah", sound: "ba", note: "Bunyi 'a'" },
  { ar: "بِ", name: "Kasrah", sound: "bi", note: "Bunyi 'i'" },
  { ar: "بُ", name: "Dhammah", sound: "bu", note: "Bunyi 'u'" },
  { ar: "بْ", name: "Sukun", sound: "b", note: "Tanpa vokal" },
  { ar: "بّ", name: "Syaddah", sound: "bb", note: "Digandakan" },
  { ar: "بً", name: "Fathatain", sound: "ban", note: "Tanwin 'an'" },
  { ar: "بٍ", name: "Kasratain", sound: "bin", note: "Tanwin 'in'" },
  { ar: "بٌ", name: "Dhammatain", sound: "bun", note: "Tanwin 'un'" },
];

/* ------------------------------- VOCABULARY ----------------------------- */
export const WORDS: Word[] = [
  // Salam & perkenalan
  { id: "salam", ar: "السَّلَامُ عَلَيْكُم", translit: "as-salaamu 'alaikum", meaning: "Semoga keselamatan atasmu (salam)", type: "frasa", theme: "salam", example: { ar: "السَّلَامُ عَلَيْكُم يَا أَخِي", translit: "as-salaamu 'alaikum yaa akhii", meaning: "Salam atasmu, wahai saudaraku" } },
  { id: "ahlan", ar: "أَهْلًا وَسَهْلًا", translit: "ahlan wa sahlan", meaning: "Selamat datang", type: "frasa", theme: "salam", example: { ar: "أَهْلًا وَسَهْلًا بِكُمْ", translit: "ahlan wa sahlan bikum", meaning: "Selamat datang untuk kalian" } },
  { id: "sabah", ar: "صَبَاحُ الْخَيْر", translit: "shabaahul khair", meaning: "Selamat pagi", type: "frasa", theme: "salam" },
  { id: "masa", ar: "مَسَاءُ الْخَيْر", translit: "masaa'ul khair", meaning: "Selamat sore/malam", type: "frasa", theme: "salam" },
  { id: "syukran", ar: "شُكْرًا", translit: "syukran", meaning: "Terima kasih", type: "frasa", theme: "salam", example: { ar: "شُكْرًا جَزِيلًا", translit: "syukran jaziilan", meaning: "Terima kasih banyak" } },
  { id: "afwan", ar: "عَفْوًا", translit: "'afwan", meaning: "Maaf / sama-sama", type: "frasa", theme: "salam" },
  { id: "ismi", ar: "اِسْمِي", translit: "ismii", meaning: "Namaku", type: "frasa", theme: "salam", example: { ar: "اِسْمِي عَائِشَة", translit: "ismii 'Aaisyah", meaning: "Namaku Aisyah" } },
  { id: "kayfa", ar: "كَيْفَ حَالُكَ؟", translit: "kaifa haaluka?", meaning: "Bagaimana keadaanmu?", type: "frasa", theme: "salam" },
  { id: "bikhair", ar: "بِخَيْر", translit: "bikhair", meaning: "Baik", type: "frasa", theme: "salam" },
  { id: "maassalam", ar: "مَعَ السَّلَامَة", translit: "ma'as salaamah", meaning: "Selamat jalan", type: "frasa", theme: "salam" },

  // Keluarga
  { id: "usrah", ar: "أُسْرَة", translit: "usrah", meaning: "keluarga", type: "isim", theme: "keluarga", example: { ar: "أُحِبُّ أُسْرَتِي", translit: "uhibbu usratii", meaning: "Aku sayang keluargaku" } },
  { id: "ab", ar: "أَب", translit: "ab", meaning: "ayah", type: "isim", theme: "keluarga" },
  { id: "umm", ar: "أُمّ", translit: "umm", meaning: "ibu", type: "isim", theme: "keluarga" },
  { id: "akh", ar: "أَخ", translit: "akh", meaning: "kakak/adik laki-laki", type: "isim", theme: "keluarga" },
  { id: "ukht", ar: "أُخْت", translit: "ukht", meaning: "kakak/adik perempuan", type: "isim", theme: "keluarga" },
  { id: "ibn", ar: "اِبْن", translit: "ibn", meaning: "anak laki-laki", type: "isim", theme: "keluarga" },
  { id: "bint", ar: "بِنْت", translit: "bint", meaning: "anak perempuan", type: "isim", theme: "keluarga" },
  { id: "jadd", ar: "جَدّ", translit: "jadd", meaning: "kakek", type: "isim", theme: "keluarga" },
  { id: "jaddah", ar: "جَدَّة", translit: "jaddah", meaning: "nenek", type: "isim", theme: "keluarga" },

  // Angka & waktu
  { id: "wahid", ar: "وَاحِد", translit: "waahid", meaning: "satu", type: "angka", theme: "angka" },
  { id: "itsnan", ar: "اِثْنَان", translit: "itsnaan", meaning: "dua", type: "angka", theme: "angka" },
  { id: "tsalatsah", ar: "ثَلَاثَة", translit: "tsalaatsah", meaning: "tiga", type: "angka", theme: "angka" },
  { id: "arba'ah", ar: "أَرْبَعَة", translit: "arba'ah", meaning: "empat", type: "angka", theme: "angka" },
  { id: "khamsah", ar: "خَمْسَة", translit: "khamsah", meaning: "lima", type: "angka", theme: "angka" },
  { id: "yawm", ar: "يَوْم", translit: "yaum", meaning: "hari", type: "isim", theme: "angka" },
  { id: "sa'ah", ar: "سَاعَة", translit: "saa'ah", meaning: "jam", type: "isim", theme: "angka" },
  { id: "shabah", ar: "صَبَاح", translit: "shabaah", meaning: "pagi", type: "isim", theme: "angka" },

  // Makanan
  { id: "maa", ar: "مَاء", translit: "maa'", meaning: "air", type: "isim", theme: "makanan", example: { ar: "أَشْرَبُ الْمَاء", translit: "asyrabul maa'", meaning: "Aku minum air" } },
  { id: "khubz", ar: "خُبْز", translit: "khubz", meaning: "roti", type: "isim", theme: "makanan" },
  { id: "aruzz", ar: "أَرُزّ", translit: "aruzz", meaning: "nasi", type: "isim", theme: "makanan" },
  { id: "lahm", ar: "لَحْم", translit: "lahm", meaning: "daging", type: "isim", theme: "makanan" },
  { id: "samak", ar: "سَمَك", translit: "samak", meaning: "ikan", type: "isim", theme: "makanan" },
  { id: "tho'am", ar: "طَعَام", translit: "tha'aam", meaning: "makanan", type: "isim", theme: "makanan" },
  { id: "syay", ar: "شَاي", translit: "syaay", meaning: "teh", type: "isim", theme: "makanan" },
  { id: "qahwah", ar: "قَهْوَة", translit: "qahwah", meaning: "kopi", type: "isim", theme: "makanan" },

  // Rumah
  { id: "bait", ar: "بَيْت", translit: "bait", meaning: "rumah", type: "isim", theme: "rumah", example: { ar: "هَذَا بَيْتِي", translit: "haadzaa baitii", meaning: "Ini rumahku" } },
  { id: "baab", ar: "بَاب", translit: "baab", meaning: "pintu", type: "isim", theme: "rumah" },
  { id: "maktab", ar: "مَكْتَب", translit: "maktab", meaning: "meja", type: "isim", theme: "rumah" },
  { id: "kursi", ar: "كُرْسِيّ", translit: "kursiyy", meaning: "kursi", type: "isim", theme: "rumah" },
  { id: "madrasah", ar: "مَدْرَسَة", translit: "madrasah", meaning: "sekolah", type: "isim", theme: "rumah" },
  { id: "kitab", ar: "كِتَاب", translit: "kitaab", meaning: "buku", type: "isim", theme: "rumah", example: { ar: "أَقْرَأُ كِتَابًا", translit: "aqra'u kitaaban", meaning: "Saya membaca buku" } },
  { id: "qalam", ar: "قَلَم", translit: "qalam", meaning: "pena", type: "isim", theme: "rumah" },

  // Warna
  { id: "ahmar", ar: "أَحْمَر", translit: "ahmar", meaning: "merah", type: "isim", theme: "warna" },
  { id: "azraq", ar: "أَزْرَق", translit: "azraq", meaning: "biru", type: "isim", theme: "warna" },
  { id: "akhdhar", ar: "أَخْضَر", translit: "akhdhar", meaning: "hijau", type: "isim", theme: "warna" },
  { id: "ashfar", ar: "أَصْفَر", translit: "ashfar", meaning: "kuning", type: "isim", theme: "warna" },
  { id: "abyadh", ar: "أَبْيَض", translit: "abyadh", meaning: "putih", type: "isim", theme: "warna" },
  { id: "aswad", ar: "أَسْوَد", translit: "aswad", meaning: "hitam", type: "isim", theme: "warna" },

  // Perjalanan
  { id: "mathar", ar: "مَطَار", translit: "mathaar", meaning: "bandara", type: "isim", theme: "perjalanan" },
  { id: "suq", ar: "سُوق", translit: "suuq", meaning: "pasar", type: "isim", theme: "perjalanan" },
  { id: "sayyarah", ar: "سَيَّارَة", translit: "sayyaarah", meaning: "mobil", type: "isim", theme: "perjalanan" },
  { id: "qithar", ar: "قِطَار", translit: "qithaar", meaning: "kereta", type: "isim", theme: "perjalanan" },
  { id: "funduq", ar: "فُنْدُق", translit: "funduq", meaning: "hotel", type: "isim", theme: "perjalanan" },
  { id: "thariq", ar: "طَرِيق", translit: "thariiq", meaning: "jalan", type: "isim", theme: "perjalanan" },

  // Kata kerja umum
  { id: "ya'kul", ar: "يَأْكُل", translit: "ya'kul", meaning: "memakan", type: "fi'il", theme: "kata-kerja" },
  { id: "yasyrab", ar: "يَشْرَب", translit: "yasyrab", meaning: "meminum", type: "fi'il", theme: "kata-kerja" },
  { id: "yaqra", ar: "يَقْرَأ", translit: "yaqra'", meaning: "membaca", type: "fi'il", theme: "kata-kerja" },
  { id: "yaktub", ar: "يَكْتُب", translit: "yaktub", meaning: "menulis", type: "fi'il", theme: "kata-kerja" },
  { id: "yadzhab", ar: "يَذْهَب", translit: "yadzhab", meaning: "pergi", type: "fi'il", theme: "kata-kerja" },
  { id: "yajlis", ar: "يَجْلِس", translit: "yajlis", meaning: "duduk", type: "fi'il", theme: "kata-kerja" },
];

export const wordById = (id: string): Word | undefined => WORDS.find((w) => w.id === id);

export const THEMES: { key: string; label: string; emoji: string }[] = [
  { key: "salam", label: "Salam & Perkenalan", emoji: "👋" },
  { key: "keluarga", label: "Keluarga", emoji: "👨‍👩‍👧" },
  { key: "angka", label: "Angka & Waktu", emoji: "🔢" },
  { key: "makanan", label: "Makanan & Minuman", emoji: "🍞" },
  { key: "rumah", label: "Rumah & Sekolah", emoji: "🏠" },
  { key: "warna", label: "Warna & Bentuk", emoji: "🎨" },
  { key: "perjalanan", label: "Perjalanan", emoji: "✈️" },
  { key: "kata-kerja", label: "Kata Kerja", emoji: "🏃" },
];

const wordsOf = (theme: string) => WORDS.filter((w) => w.theme === theme).map((w) => w.id);

function chunkLessons(moduleId: string, theme: string, titles: string[], per = 3): Lesson[] {
  const ids = wordsOf(theme);
  const lessons: Lesson[] = [];
  for (let i = 0; i < titles.length; i++) {
    const slice = ids.slice(i * per, i * per + per);
    lessons.push({
      id: `${moduleId}-l${i + 1}`,
      title: titles[i],
      minutes: 5,
      wordIds: slice.length ? slice : ids.slice(0, per),
    });
  }
  return lessons;
}

/* -------------------------------- MODULES ------------------------------- */
export const MODULES: Module[] = [
  {
    id: "hijaiyah",
    slug: "hijaiyah",
    title: "Huruf Hijaiyah",
    subtitle: "Kenali 28 huruf Arab dari nol, satu per satu.",
    level: "A0",
    emoji: "🔤",
    lessons: Array.from({ length: 10 }, (_, i) => ({
      id: `hijaiyah-l${i + 1}`,
      title: `Kelompok Huruf ${i + 1}`,
      minutes: 6,
      wordIds: [],
    })),
  },
  {
    id: "salam",
    slug: "salam-perkenalan",
    title: "Salam & Perkenalan",
    subtitle: "Ucapkan salam dan perkenalkan dirimu dengan percaya diri.",
    level: "A1",
    emoji: "👋",
    lessons: chunkLessons("salam", "salam", [
      "Salam Pembuka",
      "Menanyakan Kabar",
      "Terima Kasih & Maaf",
      "Memperkenalkan Diri",
    ]),
  },
  {
    id: "keluarga",
    slug: "keluarga",
    title: "Keluarga",
    subtitle: "Sebutkan anggota keluargamu dalam bahasa Arab.",
    level: "A1",
    emoji: "👨‍👩‍👧",
    lessons: chunkLessons("keluarga", "keluarga", ["Ayah & Ibu", "Saudara", "Kakek & Nenek"]),
  },
  {
    id: "angka",
    slug: "angka-waktu",
    title: "Angka & Waktu",
    subtitle: "Hitung 1–5 dan sebutkan waktu harian.",
    level: "A1",
    emoji: "🔢",
    lessons: chunkLessons("angka", "angka", ["Angka 1–5", "Hari & Jam", "Waktu Harian"]),
  },
  {
    id: "makanan",
    slug: "makanan-minuman",
    title: "Makanan & Minuman",
    subtitle: "Pesan makanan dan minuman favoritmu.",
    level: "A1",
    emoji: "🍞",
    lessons: chunkLessons("makanan", "makanan", ["Makanan Pokok", "Minuman", "Buah & Lauk"]),
  },
  {
    id: "rumah",
    slug: "rumah-sekolah",
    title: "Rumah & Sekolah",
    subtitle: "Benda-benda di sekitar dan alat belajar.",
    level: "A1",
    emoji: "🏠",
    lessons: chunkLessons("rumah", "rumah", ["Rumahku", "Alat Belajar", "Tempat Umum"]),
  },
  {
    id: "warna",
    slug: "warna-bentuk",
    title: "Warna & Bentuk",
    subtitle: "Deskripsikan warna benda di sekitarmu.",
    level: "A1",
    emoji: "🎨",
    lessons: chunkLessons("warna", "warna", ["Warna Dasar", "Warna Lainnya"]),
  },
  {
    id: "perjalanan",
    slug: "perjalanan",
    title: "Perjalanan",
    subtitle: "Kosakata bepergian dan transportasi.",
    level: "A2",
    emoji: "✈️",
    lessons: chunkLessons("perjalanan", "perjalanan", ["Transportasi", "Di Jalan", "Tempat Umum"]),
  },
  {
    id: "kata-kerja",
    slug: "kata-kerja",
    title: "Kata Kerja Harian",
    subtitle: "Aktivitas sehari-hari dalam bahasa Arab.",
    level: "A2",
    emoji: "🏃",
    lessons: chunkLessons("kata-kerja", "kata-kerja", ["Aktivitas Pagi", "Belajar & Bekerja"]),
  },
];

export const moduleById = (id: string) => MODULES.find((m) => m.id === id);
export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);

/* ------------------------------- STORIES -------------------------------- */
export type Story = {
  id: string;
  title: string;
  titleId: string;
  level: string;
  emoji: string;
  minutes: number;
  lines: { ar: string; translit: string; meaning: string }[];
};

export const STORIES: Story[] = [
  {
    id: "pasar",
    title: "يَوْمٌ فِي السُّوقِ",
    titleId: "Sehari di Pasar",
    level: "A1",
    emoji: "🛒",
    minutes: 4,
    lines: [
      { ar: "ذَهَبَ أَحْمَدُ إِلَى السُّوقِ", translit: "dzahaba Ahmadu ilas suuq", meaning: "Ahmad pergi ke pasar" },
      { ar: "اِشْتَرَى خُبْزًا وَسَمَكًا", translit: "isytaraa khubzan wa samakan", meaning: "Dia membeli roti dan ikan" },
      { ar: "رَأَى صَدِيقَهُ فِي السُّوقِ", translit: "ra'aa shadiiqahu fis suuq", meaning: "Dia melihat temannya di pasar" },
      { ar: "قَالَ: السَّلَامُ عَلَيْكُم", translit: "qaala: as-salaamu 'alaikum", meaning: "Dia berkata: Semoga keselamatan atasmu" },
      { ar: "رَجَعَ إِلَى الْبَيْتِ سَعِيدًا", translit: "raja'a ilal baiti sa'iidan", meaning: "Dia kembali ke rumah dengan gembira" },
    ],
  },
  {
    id: "usrati",
    title: "أُسْرَتِي",
    titleId: "Keluargaku",
    level: "A1",
    emoji: "🏡",
    minutes: 3,
    lines: [
      { ar: "أُسْرَتِي صَغِيرَةٌ وَجَمِيلَة", translit: "usratii shaghiirah wa jamiilah", meaning: "Keluargaku kecil dan indah" },
      { ar: "أَبِي مُدَرِّسٌ وَأُمِّي طَبِيبَة", translit: "abii mudarris wa ummii thabiibah", meaning: "Ayahku guru dan ibuku dokter" },
      { ar: "لِي أَخٌ وَأُخْت", translit: "lii akhun wa ukht", meaning: "Aku punya satu saudara laki-laki dan satu saudara perempuan" },
      { ar: "أُحِبُّ أُسْرَتِي كَثِيرًا", translit: "uhibbu usratii katsiiran", meaning: "Aku sangat mencintai keluargaku" },
    ],
  },
];

/* ----------------------------- ACHIEVEMENTS ----------------------------- */
export type Achievement = {
  id: string;
  title: string;
  desc: string;
  emoji: string;
  goal: number;
  metric: "lessons" | "words" | "streak" | "xp" | "stories";
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first", title: "Langkah Pertama", desc: "Selesaikan pelajaran pertamamu", emoji: "🐣", goal: 1, metric: "lessons" },
  { id: "five", title: "Semangat!", desc: "Selesaikan 5 pelajaran", emoji: "🔥", goal: 5, metric: "lessons" },
  { id: "twenty", title: "Rajin Belajar", desc: "Selesaikan 20 pelajaran", emoji: "📚", goal: 20, metric: "lessons" },
  { id: "words50", title: "Kolektor Kata", desc: "Kuasai 50 kosakata", emoji: "🗂️", goal: 50, metric: "words" },
  { id: "streak7", title: "Api Mingguan", desc: "Belajar 7 hari beruntun", emoji: "🗓️", goal: 7, metric: "streak" },
  { id: "streak30", title: "Api Abadi", desc: "Belajar 30 hari beruntun", emoji: "🌋", goal: 30, metric: "streak" },
  { id: "xp1000", title: "Pendekar XP", desc: "Kumpulkan 1.000 XP", emoji: "⚡", goal: 1000, metric: "xp" },
  { id: "story", title: "Kutu Cerita", desc: "Selesaikan 1 cerita", emoji: "📖", goal: 1, metric: "stories" },
];

/* ------------------------------ LEADERBOARD ----------------------------- */
export const LEADERBOARD = [
  { name: "Yusuf A.", xp: 2480, avatar: "🧑‍🎓", league: "Diamond" },
  { name: "Fatimah", xp: 2310, avatar: "👩‍🎓", league: "Diamond" },
  { name: "Rizki", xp: 2105, avatar: "🧑", league: "Gold" },
  { name: "Kamu", xp: 1240, avatar: "🙂", league: "Gold", me: true },
  { name: "Hana", xp: 1190, avatar: "👧", league: "Gold" },
  { name: "Ilham", xp: 980, avatar: "👦", league: "Silver" },
  { name: "Nadia", xp: 870, avatar: "👩", league: "Silver" },
  { name: "Bilal", xp: 760, avatar: "🧔", league: "Bronze" },
];

/* -------------------------------- GAMES --------------------------------- */
export const GAMES = [
  { id: "kilat", title: "Kilat Kosakata", desc: "Jawab sebanyak mungkin dalam 60 detik.", emoji: "⚡", color: "gold" },
  { id: "cocok", title: "Cocokkan Pasangan", desc: "Pasangkan kata Arab dengan artinya.", emoji: "🧩", color: "brand" },
  { id: "dengar", title: "Dengar & Ketuk", desc: "Dengar audio, ketuk kata yang benar.", emoji: "🎧", color: "coral" },
  { id: "susun", title: "Susun Huruf", desc: "Susun huruf menjadi kata yang benar.", emoji: "🔤", color: "brand" },
  { id: "duel", title: "Duel Kata", desc: "Tantang teman secara bergiliran.", emoji: "⚔️", color: "gold" },
  { id: "harian", title: "Tantangan Harian", desc: "Set soal spesial, bonus XP 2×.", emoji: "🎯", color: "coral" },
];

/* --------------------------- CLASSES (GURU) ----------------------------- */
export const CLASS_STUDENTS = [
  { name: "Yusuf A.", xp: 2480, progress: 82, avatar: "🧑‍🎓" },
  { name: "Fatimah", xp: 2310, progress: 76, avatar: "👩‍🎓" },
  { name: "Rizki", xp: 2105, progress: 68, avatar: "🧑" },
  { name: "Hana", xp: 1190, progress: 44, avatar: "👧" },
  { name: "Ilham", xp: 980, progress: 39, avatar: "👦" },
  { name: "Nadia", xp: 870, progress: 31, avatar: "👩" },
];

/* --------------------------------- FAQ ---------------------------------- */
export const FAQ = [
  { q: "Apakah Lughati gratis?", a: "Ya! Kamu bisa mulai belajar gratis dengan modul dasar dan fitur audio klik-untuk-dengar. Paket Premium membuka semua modul, mode offline, dan latihan berbicara lanjutan." },
  { q: "Bagaimana cara mendengar pengucapan?", a: "Cukup klik/tap tulisan Arab mana pun, atau tekan tombol speaker 🔊 di sampingnya. Gunakan tombol 0.75× untuk mendengar versi lambat." },
  { q: "Apakah audio berfungsi tanpa internet?", a: "Audio memanfaatkan suara pada perangkatmu. Untuk hasil terbaik, gunakan Chrome/Edge/Safari terbaru. Mode offline (Premium) menyimpan paket pelajaran & audio." },
  { q: "Apakah saya perlu bisa membaca huruf Arab?", a: "Tidak. Modul Hijaiyah dirancang untuk pemula total, dimulai dari mengenal 28 huruf satu per satu." },
  { q: "Apakah Lughati cocok untuk anak-anak?", a: "Ya. Tersedia mode ramah anak dengan tampilan lebih besar dan warna ceria, serta kontrol waktu belajar untuk orang tua." },
  { q: "Bagaimana progres saya disimpan?", a: "Progres tersimpan otomatis di perangkatmu (mode tamu) dan akan tersinkron bila kamu masuk dengan akun." },
];

export const PRICING = {
  free: {
    name: "Gratis",
    price: 0,
    tagline: "Mulai tanpa biaya",
    features: [
      "Modul dasar (Hijaiyah & Salam)",
      "Audio klik-untuk-dengar",
      "5 pelajaran per hari",
      "Flashcard & kamus dasar",
      "Streak & XP",
    ],
  },
  premium: {
    name: "Premium",
    price: 39000,
    yearly: 349000,
    tagline: "Belajar tanpa batas",
    features: [
      "Semua modul (A0–B2)",
      "Pelajaran tanpa batas",
      "Latihan berbicara (skor pengucapan)",
      "Mode offline (unduh paket & audio)",
      "Kamus lengkap & cerita interaktif",
      "Tanpa iklan + sertifikat",
    ],
  },
};

// Smoke test halaman aplikasi Lughati lewat Chrome DevTools Protocol.
// Mengisi localStorage (login tamu + progres) lalu membuka tiap route.
const BASE = process.env.SMOKE_URL || "https://lughati.lughati.workers.dev";
const CDP = "http://127.0.0.1:9222";

const store = {
  user: { name: "Aisyah", email: "aisyah@lughati.app", avatar: "🙂", goals: ["ibadah"], dailyMinutes: 10, onboarded: true },
  progress: {
    completedLessons: ["salam-l1", "salam-l2"],
    learnedWords: ["salam", "ahlan", "syukran", "kitab", "bait", "usrah"],
    weakWords: ["madrasah", "qalam"],
    storiesRead: ["pasar"],
    favorites: ["kitab", "bait"],
    flashcards: ["salam", "ahlan", "syukran", "kitab"],
    xp: 1240, streak: 12, bestStreak: 12,
    lastActive: new Date().toISOString().slice(0, 10),
    history: [0, 1, 2, 3, 4, 5, 6].map((i) => ({
      date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10),
      xp: [120, 90, 140, 60, 200, 150, 110][i],
    })),
    accuracy: 86, quizzes: 14,
  },
  settings: { theme: "light", translit: true, harakat: true, rate: 1, lang: "id", reminders: true, remindAt: "19:30", soundEffects: true },
};

const routes = [
  ["/app/belajar", ["Ahlan, Aisyah", "Misi Harian", "Jalur Belajar", "Kata Hari Ini"]],
  ["/app/belajar/salam-perkenalan", ["Salam & Perkenalan", "Daftar Pelajaran"]],
  ["/app/pelajaran/salam/salam-l1", ["Soal 1/", "Pilih arti yang benar"]],
  ["/app/hijaiyah", ["Hijaiyah", "Tebak Suara Huruf", "Trace Huruf"]],
  ["/app/kamus", ["Kamus", "KATA DITEMUKAN", "Tambah ke Flashcard"]],
  ["/app/flashcard", ["Flashcard", "Sudah hafal", "Belum hafal"]],
  ["/app/cerita", ["Cerita", "Sehari di Pasar"]],
  ["/app/latihan", ["Kilat Kosakata", "Tantangan Harian"]],
  ["/app/progres", ["Progres Belajar", "Kemampuan", "Kalender belajar"]],
  ["/app/peringkat", ["Peringkat", "Liga"]],
  ["/app/pencapaian", ["Pencapaian", "Langkah Pertama"]],
  ["/app/profil", ["Profil & Pengaturan", "Mode Offline", "Reset progres", "Aksesibilitas"]],
  ["/app/berbicara", ["Latihan Berbicara", "Ketuk mikrofon"]],
  ["/app/sertifikat", ["Sertifikat", "Kode verifikasi", "Aisyah"]],
  ["/kelas", ["Dashboard Guru", "Daftar Siswa", "Laporan Mingguan", "Kata paling sering salah"]],
];

async function main() {
  const list = await (await fetch(`${CDP}/json/list`)).json();
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((res) => {
      const mid = ++id;
      pending.set(mid, res);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  ws.addEventListener("message", (e) => {
    const msg = JSON.parse(e.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg.result);
      pending.delete(msg.id);
    }
  });
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1280,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // kunjungi origin dulu agar localStorage bisa diset
  await send("Page.navigate", { url: BASE + "/" });
  await new Promise((r) => setTimeout(r, 1800));

  await send("Runtime.evaluate", {
    expression: `localStorage.setItem('lughati.v1', ${JSON.stringify(JSON.stringify(store))}); 'ok'`,
  });

  let pass = 0, fail = 0;
  for (const [route, expects] of routes) {
    await send("Page.navigate", { url: BASE + route });
    await new Promise((r) => setTimeout(r, 1600));
    const { result } = await send("Runtime.evaluate", { expression: "document.body.innerText", returnByValue: true });
    const text = result?.value || "";
    const lower = text.toLowerCase();
    const missing = expects.filter((e) => !lower.includes(e.toLowerCase()));
    const errors = text.trim().length < 20;
    const ok = missing.length === 0 && !errors;
    if (ok) pass++; else fail++;
    console.log(`${ok ? "PASS" : "FAIL"}  ${route.padEnd(34)} ${ok ? "" : "missing=" + JSON.stringify(missing) + " len=" + text.length}`);
  }
  console.log(`\n${pass} passed, ${fail} failed`);
  ws.close();
  process.exit(fail ? 1 : 0);
}
main().catch((e) => { console.error(e); process.exit(1); });

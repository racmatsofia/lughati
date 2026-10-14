/**
 * Uji interaksi Lughati via Chrome DevTools Protocol.
 * Menguji hal-hal yang tidak terlihat oleh smoke test statis:
 *  - membuka tiap game & memastikan konten game muncul
 *  - menjawab soal pelajaran & memastikan umpan balik muncul
 *  - mencari di kamus & menandai favorit
 *  - berganti deck flashcard
 *  - menemukan tipe soal "Susun Kalimat"
 */
const BASE = process.env.SMOKE_URL || "https://lughati.lughati.workers.dev";
const CDP = "http://127.0.0.1:9222";

const store = {
  user: { name: "Aisyah", email: "a@b.c", avatar: "🙂", goals: [], dailyMinutes: 10, onboarded: true },
  progress: {
    completedLessons: [], learnedWords: ["salam", "ahlan"], weakWords: [], storiesRead: [],
    favorites: [], flashcards: ["salam", "ahlan", "syukran"], xp: 1240, streak: 12, bestStreak: 12,
    lastActive: new Date().toISOString().slice(0, 10), history: [], accuracy: 86, quizzes: 14,
    searchHistory: [], dailyDone: null,
  },
  settings: { theme: "light", translit: true, harakat: true, rate: 1, lang: "id", reminders: true, remindAt: "19:30", soundEffects: true, arabicSize: "sedang", dyslexic: false, highContrast: false, reduceMotion: false, kidsMode: false },
};

const list = await (await fetch(`${CDP}/json/list`)).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0;
const pend = new Map();
const send = (m, q = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: q })); });
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } });
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const evalJs = async (expression) => (await send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true })).result?.value;
const text = () => evalJs("document.body.innerText");
const click = (sel) => evalJs(`(()=>{const el=document.querySelector(${JSON.stringify(sel)}); if(!el) return false; el.click(); return true;})()`);
const clickByText = (tag, needle) =>
  evalJs(`(()=>{const els=[...document.querySelectorAll(${JSON.stringify(tag)})]; const el=els.find(e=>e.innerText && e.innerText.toLowerCase().includes(${JSON.stringify(needle)}.toLowerCase())); if(!el) return false; el.click(); return true;})()`);

await send("Page.navigate", { url: BASE + "/" });
await wait(1500);
await send("Runtime.evaluate", { expression: `localStorage.setItem('lughati.v1', ${JSON.stringify(JSON.stringify(store))})` });

let pass = 0, fail = 0;
const check = (name, ok, extra = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${ok ? "" : "  " + extra}`);
  ok ? pass++ : fail++;
};

/* ---------------- 1. Semua game bisa dibuka ---------------- */
const games = [
  ["Kilat Kosakata", "pilih kata arab yang benar"],
  ["Cocokkan Pasangan", "temukan pasangan kata"],
  ["Susun Huruf", "ketuk huruf di bawah"],
  ["Dengar & Ketuk", "ketuk gambar yang kamu dengar"],
  ["Duel Kata", "jamal bot"],
];
for (const [name, expects] of games) {
  await send("Page.navigate", { url: BASE + "/app/latihan" });
  await wait(1500);
  const opened = await evalJs(`(()=>{
    const h=[...document.querySelectorAll('h3')].find(x=>x.innerText.trim()===${JSON.stringify(name)});
    if(!h) return false;
    const card=h.closest('div');
    const btn=card && card.querySelector('button');
    if(!btn) return false; btn.click(); return true;
  })()`);
  await wait(1200);
  const body = (await text()).toLowerCase();
  check(`game: ${name}`, opened && body.includes(expects), `opened=${opened}`);
  // tutup modal
  await evalJs(`(()=>{const b=[...document.querySelectorAll('button')].find(x=>x.getAttribute('aria-label')==='Tutup'); b&&b.click();})()`);
  await wait(500);
}

/* ---------------- 2. Pelajaran: jawab & umpan balik ---------------- */
await send("Page.navigate", { url: BASE + "/app/pelajaran/salam/salam-l1" });
await wait(1600);
await waitingFor("Soal 1/");
let foundSusun = false;
let answeredOk = false;
for (let step = 0; step < 14; step++) {
  const body = (await text()).toLowerCase();
  if (body.includes("susun kata arab sesuai arti")) foundSusun = true;

  // klik pilihan pertama (bisa tombol pilihan atau tile susun)
  const clicked = await evalJs(`(()=>{
    const hinted = document.body.innerText.toLowerCase().includes('susun kata arab');
    if (hinted) {
      const tiles=[...document.querySelectorAll('button')].filter(b=>b.className.includes('arabic') && b.className.includes('rounded-2xl'));
      if(!tiles.length) return false; tiles[0].click(); return true;
    }
    // pilihan ganda: tombol dengan anak span huruf A/B/C/D
    const opts=[...document.querySelectorAll('button')].filter(b=>/^[ABCD]/.test(b.innerText.trim()));
    if(opts.length){opts[0].click(); return 'mc';}
    const tiles=[...document.querySelectorAll('button')].filter(b=>b.className.includes('arabic') && b.className.includes('rounded-2xl'));
    if(tiles.length){tiles[0].click(); return 'tile';}
    return false;
  })()`);
  await wait(600);
  if (clicked === "mc" || clicked === "tile") {
    const after = (await text()).toLowerCase();
    if (after.includes("xp") && (after.includes("mantap") || after.includes("hampir benar"))) answeredOk = true;
  }
  // klik Lanjut / Selesaikan bila ada
  const nexted = await clickByText("button", "lanjut") || await clickByText("button", "selesaikan");
  if (!nexted) break;
  await wait(700);
  if ((await text()).toLowerCase().includes("deck") === false && (await text()).toLowerCase().includes("ahsanta")) break;
}
check("pelajaran: umpan balik jawaban muncul", answeredOk);
check("pelajaran: tipe soal 'Susun Kalimat' ada", foundSusun);

/* ---------------- 3. Kamus: pencarian + favorit ---------------- */
await send("Page.navigate", { url: BASE + "/app/kamus" });
await wait(1600);
const searched = await evalJs(`(()=>{
  const input=document.querySelector('input[placeholder^="Cari"]');
  if(!input) return false;
  const setter=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  setter.call(input,'buku'); input.dispatchEvent(new Event('input',{bubbles:true}));
  return true;
})()`);
await wait(900);
const searchBody = (await text()).toLowerCase();
check("kamus: pencarian 'buku' menemukan kata", searched && /buku/.test(searchBody) && searchBody.includes("kata ditemukan"));
const favClicked = await click('button[aria-label="Favorit"]');
await wait(600);
check("kamus: tombol favorit berfungsi", !!favClicked);

/* ---------------- 4. Flashcard: ganti deck ---------------- */
await send("Page.navigate", { url: BASE + "/app/flashcard" });
await wait(1600);
const deckBefore = await text();
const switched = await clickByText("button", "Keluarga");
await wait(900);
const deckAfter = await text();
check("flashcard: deck bawaan tampil", /deck dasar/i.test(deckBefore));
check("flashcard: ganti deck berfungsi", switched && deckAfter !== deckBefore);

/* ---------------- 5. Hijaiyah: ganti huruf + trace ---------------- */
await send("Page.navigate", { url: BASE + "/app/hijaiyah" });
await wait(1500);
const hij = await text();
check("hijaiyah: detail huruf & makhraj", hij.includes("Makhraj") && hij.includes("Alif") && hij.includes("Terpisah"));

console.log(`\n${pass} passed, ${fail} failed`);
ws.close();
process.exit(fail ? 1 : 0);

async function waitingFor(needle) {
  for (let i = 0; i < 20; i++) {
    if ((await text()).includes(needle)) return true;
    await wait(300);
  }
  return false;
}

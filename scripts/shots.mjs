import { writeFileSync, mkdirSync } from "node:fs";
const CDP = "http://127.0.0.1:9222";
const BASE = process.env.SMOKE_URL || "https://lughati.lughati.workers.dev";
const store = {
  user: { name: "Aisyah", email: "a@b.c", avatar: "🙂", goals: [], dailyMinutes: 10, onboarded: true },
  progress: {
    completedLessons: ["hijaiyah-l1", "salam-l1", "salam-l2"],
    learnedWords: ["salam", "ahlan", "syukran", "kitab", "bait", "usrah"],
    weakWords: ["madrasah", "qalam"], storiesRead: ["pasar"], favorites: ["kitab"],
    flashcards: ["salam", "ahlan", "syukran", "kitab"],
    xp: 1240, streak: 12, bestStreak: 12, lastActive: new Date().toISOString().slice(0, 10),
    history: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => ({ date: new Date(Date.now() - i * 86400000).toISOString().slice(0, 10), xp: [120, 90, 140, 60, 200, 150, 110, 80, 0, 170, 130, 95, 160][i] })),
    accuracy: 86, quizzes: 14,
  },
  settings: { theme: "light", translit: true, harakat: true, rate: 1, lang: "id", reminders: true, remindAt: "19:30", soundEffects: true },
};
const shots = [
  ["dashboard", "/app/belajar", 1280, 900],
  ["progres", "/app/progres", 1280, 1000],
  ["kamus", "/app/kamus", 1280, 900],
  ["landing-mobile", "/", 390, 844],
  ["dashboard-mobile", "/app/belajar", 390, 844],
  ["kamus-mobile", "/app/kamus", 390, 844],
  ["latihan", "/app/latihan", 1280, 900],
  ["pencapaian", "/app/pencapaian", 1280, 900],
];
const list = await (await fetch(`${CDP}/json/list`)).json();
const page = list.find((t) => t.type === "page");
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = new Map();
const send = (m, q = {}) => new Promise((r) => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method: m, params: q })); });
ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result); pend.delete(m.id); } });
await new Promise((r) => ws.addEventListener("open", r, { once: true }));
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send("Page.navigate", { url: BASE + "/" }); await new Promise((r) => setTimeout(r, 1500));
await send("Runtime.evaluate", { expression: `localStorage.setItem('lughati.v1', ${JSON.stringify(JSON.stringify(store))})` });
mkdirSync(".shots", { recursive: true });
for (const [name, route, w, h] of shots) {
  await send("Emulation.setDeviceMetricsOverride", { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
  await send("Page.navigate", { url: BASE + route });
  await new Promise((r) => setTimeout(r, 2000));
  const { data } = await send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`.shots/${name}.png`, Buffer.from(data, "base64"));
  console.log("saved", name, `${w}x${h}`);
}
ws.close(); process.exit(0);

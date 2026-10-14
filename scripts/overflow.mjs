// Cek horizontal overflow pada viewport mobile.
const BASE = process.env.SMOKE_URL || "https://lughati.lughati.workers.dev";
const CDP = "http://127.0.0.1:9222";

const store = {
  user: { name: "Aisyah", email: "a@b.c", avatar: "🙂", goals: [], dailyMinutes: 10, onboarded: true },
  progress: {
    completedLessons: ["salam-l1"], learnedWords: ["salam", "ahlan", "kitab"], weakWords: ["qalam"],
    storiesRead: [], favorites: ["kitab"], flashcards: ["salam", "ahlan"],
    xp: 1240, streak: 12, bestStreak: 12, lastActive: new Date().toISOString().slice(0, 10),
    history: [0,1,2,3,4,5,6].map((i)=>({date:new Date(Date.now()-i*86400000).toISOString().slice(0,10),xp:[120,90,140,60,200,150,110][i]})),
    accuracy: 86, quizzes: 14,
  },
  settings: { theme: "light", translit: true, harakat: true, rate: 1, lang: "id", reminders: true, remindAt: "19:30", soundEffects: true },
};

const routes = ["/", "/app/belajar", "/app/pelajaran/salam/salam-l1", "/app/hijaiyah", "/app/kamus", "/app/flashcard", "/app/progres", "/app/profil"];

async function main() {
  const list = await (await fetch(`${CDP}/json/list`)).json();
  const page = list.find((t) => t.type === "page");
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } });
  await new Promise((r) => ws.addEventListener("open", r, { once: true }));
  await send("Page.enable"); await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: BASE + "/" });
  await new Promise((r) => setTimeout(r, 1500));
  await send("Runtime.evaluate", { expression: `localStorage.setItem('lughati.v1', ${JSON.stringify(JSON.stringify(store))})` });

  for (const route of routes) {
    await send("Page.navigate", { url: BASE + route });
    await new Promise((r) => setTimeout(r, 1500));
    const { result } = await send("Runtime.evaluate", {
      returnByValue: true,
      expression: `(() => {
        const vw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        const bad = [...document.querySelectorAll('*')]
          .filter(el => el.getBoundingClientRect().right > vw + 1 || el.getBoundingClientRect().left < -1)
          .filter(el => getComputedStyle(el).position !== 'fixed')
          .slice(0, 6)
          .map(el => el.tagName.toLowerCase() + '.' + (el.className && typeof el.className === 'string' ? el.className.split(' ').slice(0,3).join('.') : '') + ' r=' + Math.round(el.getBoundingClientRect().right));
        return { vw, sw, overflow: sw - vw, bad };
      })()`,
    });
    const r = result.value;
    const flag = r.overflow > 1 ? "OVERFLOW" : "ok";
    console.log(`${flag.padEnd(9)} ${route.padEnd(34)} vw=${r.vw} sw=${r.sw} (+${r.overflow})`);
    if (r.overflow > 1) r.bad.forEach((b) => console.log("            ↳ " + b));
  }
  ws.close(); process.exit(0);
}
main().catch((e) => { console.error(e); process.exit(1); });

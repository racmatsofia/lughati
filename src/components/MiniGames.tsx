import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Flame,
  RotateCcw,
  Snail,
  Trophy,
  Volume2,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import { WORDS, arabicTiles, wordEmoji, type Word } from "../lib/data";
import { useSpeaker } from "./audio";
import { Button, Card, ProgressBar, Ring } from "./ui";
import { Mascot } from "./brand";
import { cn, formatNumber } from "../lib/utils";

/* ------------------------------- helpers -------------------------------- */
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const pickWords = (n: number, filter?: (w: Word) => boolean) =>
  shuffle(filter ? WORDS.filter(filter) : WORDS).slice(0, n);

export type GameProps = {
  onClose: () => void;
  onFinish: (result: { xp: number; correct: number; total: number }) => void;
};

/* ----------------------------- Game header ------------------------------ */
function GameTop({
  title,
  onClose,
  right,
  progress,
}: {
  title: string;
  onClose: () => void;
  right?: React.ReactNode;
  progress?: number;
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-3">
        <button onClick={onClose} className="text-fg-subtle hover:text-fg shrink-0" aria-label="Tutup">
          <X size={20} />
        </button>
        <p className="font-display font-bold text-fg truncate">{title}</p>
        <div className="shrink-0 min-w-[44px] text-right">{right}</div>
      </div>
      {progress !== undefined && <ProgressBar value={progress} height={7} className="mt-3" />}
    </div>
  );
}

/* ------------------------------ Result ---------------------------------- */
function Result({
  score,
  total,
  xp,
  onClose,
  onRetry,
}: {
  score: number;
  total: number;
  xp: number;
  onClose: () => void;
  onRetry?: () => void;
}) {
  const pct = total ? Math.round((score / total) * 100) : 0;
  return (
    <div className="text-center py-2">
      <div className="flex justify-center">
        <Ring value={pct} size={120} stroke={11}>
          <div>
            <p className="font-display font-bold text-2xl text-fg">{score}</p>
            <p className="text-[10px] text-fg-muted">/ {total}</p>
          </div>
        </Ring>
      </div>
      <div className="mt-3 flex justify-center">
        <Mascot message={pct >= 70 ? "Ahsanta! اَحْسَنْتَ 👏" : "Bagus, coba lagi ya! 🐪"} />
      </div>
      <p className="text-sm text-fg-muted mt-4">
        +<span className="font-bold text-gold-dark dark:text-gold">{formatNumber(xp)} XP</span> ditambahkan
      </p>
      <div className="mt-5 flex gap-3">
        {onRetry && (
          <Button variant="outline" className="flex-1" onClick={onRetry}>
            <RotateCcw size={16} /> Ulangi
          </Button>
        )}
        <Button className="flex-1" onClick={onClose}>
          Selesai
        </Button>
      </div>
    </div>
  );
}

/* ========================= 1. Kilat Kosakata ============================ */
export function KilatGame({ onClose, onFinish }: GameProps) {
  const duration = 60;
  const [time, setTime] = useState(duration);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const { play } = useSpeaker();
  const words = useMemo(() => shuffle(WORDS).slice(0, 40), []);
  const [qi, setQi] = useState(0);
  const word = words[qi % words.length];

  const options = useMemo(() => {
    const others = shuffle(WORDS.filter((w) => w.id !== word.id)).slice(0, 3);
    return shuffle([word, ...others]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setTime((s) => (s <= 1 ? (setEnded(true), 0) : s - 1)), 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    if (ended) onFinish({ xp: score * 5, correct: score, total: score + (qi - score) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    if (id === word.id) {
      setScore((s) => s + 1);
      setCombo((c) => c + 1);
    } else setCombo(0);
    setTimeout(() => {
      setPicked(null);
      setQi((i) => i + 1);
    }, 450);
  }

  if (ended) return <Result score={score} total={Math.max(score, qi)} xp={score * 5} onClose={onClose} />;

  return (
    <div>
      <GameTop
        title="Kilat Kosakata"
        onClose={onClose}
        right={
          <span className="inline-flex items-center gap-1 font-bold text-coral">
            <Zap size={14} /> {time}s
          </span>
        }
        progress={(time / duration) * 100}
      />
      <div className="flex items-center justify-between mb-4 text-sm font-bold">
        <span className="text-fg">
          Skor: <span className="text-brand">{score}</span>
        </span>
        <span className="text-gold-dark dark:text-gold inline-flex items-center gap-1">
          <Flame size={14} /> combo {combo}
        </span>
      </div>
      <p className="text-xs font-bold uppercase tracking-wider text-fg-muted text-center mb-2">
        Pilih kata Arab yang benar
      </p>
      <p className="font-display font-bold text-3xl text-center text-fg mb-5">{word.meaning}</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const isAnswer = o.id === word.id;
          const isPicked = o.id === picked;
          return (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              className={cn(
                "aspect-square rounded-2xl border-2 grid place-items-center p-2 transition",
                !picked && "border-line bg-surface hover:border-brand",
                picked && isAnswer && "border-success bg-success-soft dark:bg-success/20",
                picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                picked && !isAnswer && !isPicked && "border-line opacity-50",
              )}
            >
              <span className="arabic text-3xl text-fg">{o.ar}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================= 2. Cocokkan Pasangan ========================= */
type MemCard = { key: string; wordId: string; face: "ar" | "mean"; text: string };

export function MemoryGame({ onClose, onFinish }: GameProps) {
  const [round, setRound] = useState(0);
  const words = useMemo(() => pickWords(6), []);
  const [cards, setCards] = useState<MemCard[]>(() => buildCards(words));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useSpeaker();

  function buildCards(ws: Word[]): MemCard[] {
    const c: MemCard[] = [];
    ws.forEach((w) => {
      c.push({ key: `${w.id}-ar`, wordId: w.id, face: "ar", text: w.ar });
      c.push({ key: `${w.id}-mean`, wordId: w.id, face: "mean", text: w.meaning });
    });
    return shuffle(c);
  }

  function flip(card: MemCard) {
    if (flipped.includes(card.key) || matched.includes(card.wordId)) return;
    const next = [...flipped, card.key];
    setFlipped(next);
    if (card.face === "ar") play(card.text);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((k) => cards.find((c) => c.key === k)!);
      if (a.wordId === b.wordId) {
        setMatched((m) => [...m, a.wordId]);
        setFlipped([]);
        if (matched.length + 1 === words.length) setDone(true);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  function restart() {
    setCards(buildCards(pickWords(6)));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDone(false);
    setRound((r) => r + 1);
  }

  const pairs = Math.floor(matched.length);
  const score = Math.max(0, 6 * 10 - moves * 2);

  useEffect(() => {
    if (done) onFinish({ xp: Math.max(10, score), correct: pairs, total: 6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return <Result score={pairs} total={6} xp={Math.max(10, score)} onClose={onClose} onRetry={restart} />;

  return (
    <div>
      <GameTop
        title="Cocokkan Pasangan"
        onClose={onClose}
        right={<span className="text-sm font-bold text-fg-muted">{moves} langkah</span>}
        progress={(pairs / 6) * 100}
      />
      <p className="text-sm text-fg-muted mb-4">
        Temukan pasangan kata Arab & artinya. Ketuk dua kartu.
      </p>
      <div className="grid grid-cols-3 gap-2.5" key={round}>
        {cards.map((c) => {
          const isOpen = flipped.includes(c.key) || matched.includes(c.wordId);
          const isMatched = matched.includes(c.wordId);
          return (
            <button
              key={c.key}
              onClick={() => flip(c)}
              className={cn(
                "h-24 rounded-2xl border-2 grid place-items-center p-1.5 transition text-center",
                !isOpen && "bg-brand text-white border-brand hover:bg-brand-dark",
                isOpen && !isMatched && "bg-brand-light dark:bg-brand/20 border-brand text-fg",
                isMatched && "bg-success-soft dark:bg-success/20 border-success text-fg opacity-90",
              )}
            >
              {isOpen ? (
                c.face === "ar" ? (
                  <span className="arabic text-xl leading-tight">{c.text}</span>
                ) : (
                  <span className="text-[13px] font-bold leading-tight">{c.text}</span>
                )
              ) : (
                <span className="text-2xl">؟</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-fg-subtle mt-4">
        {pairs}/6 pasangan ditemukan
      </p>
    </div>
  );
}

/* ============================ 3. Susun Huruf ============================ */
export function SusunGame({ onClose, onFinish }: GameProps) {
  const total = 6;
  const pool = useMemo(
    () =>
      pickWords(
        24,
        (w) => !w.ar.includes(" ") && arabicTiles(w.ar).length >= 3 && arabicTiles(w.ar).length <= 6,
      ),
    [],
  );
  const [qi, setQi] = useState(0);
  const [placed, setPlaced] = useState<number[]>([]);
  const [status, setStatus] = useState<"idle" | "ok" | "bad">("idle");
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useSpeaker();

  const current = pool[qi % pool.length];
  const tiles = useMemo(() => arabicTiles(current.ar), [current]);
  const shuffled = useMemo(() => shuffleBy(tiles, qi), [tiles, qi]);
  const built = placed.map((i) => shuffled[i]).join("");

  useEffect(() => {
    setPlaced([]);
    setStatus("idle");
  }, [qi]);

  useEffect(() => {
    if (!built || built.length < current.ar.length || status !== "idle") return;
    const ok = built === current.ar;
    setStatus(ok ? "ok" : "bad");
    if (ok) {
      setCorrect((c) => c + 1);
      play(current.ar);
    }
    const timer = setTimeout(() => {
      if (qi + 1 >= total) setDone(true);
      else setQi((i) => i + 1);
    }, 950);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [built]);

  useEffect(() => {
    if (done) onFinish({ xp: correct * 12, correct, total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  if (done) return <Result score={correct} total={total} xp={correct * 12} onClose={onClose} />;

  return (
    <div>
      <GameTop
        title="Susun Huruf"
        onClose={onClose}
        right={
          <span className="text-sm font-bold text-fg-muted">
            {qi + 1}/{total}
          </span>
        }
        progress={(qi / total) * 100}
      />
      <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-4 text-center">
        <span className="text-4xl">{wordEmoji(current)}</span>
        <p className="font-display font-bold text-xl text-fg mt-1">{current.meaning}</p>
        <p className="latin italic text-xs text-fg-subtle">{current.translit}</p>
      </div>

      <div
        className={cn(
          "mt-4 min-h-[74px] rounded-2xl border-2 border-dashed flex items-center justify-center gap-1.5 p-3 flex-wrap transition",
          status === "ok" && "border-success bg-success-soft dark:bg-success/20",
          status === "bad" && "border-coral bg-coral-soft dark:bg-coral/20",
          status === "idle" && "border-line bg-surface",
        )}
      >
        {placed.length === 0 ? (
          <span className="text-sm text-fg-subtle">Ketuk huruf di bawah untuk menyusun…</span>
        ) : (
          placed.map((i, k) => (
            <span key={k} className="arabic text-3xl text-fg">
              {shuffled[i]}
            </span>
          ))
        )}
      </div>

      <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
        {shuffled.map((t, i) =>
          placed.includes(i) ? (
            <span key={`${t}-${i}`} className="w-14 h-14" />
          ) : (
            <button
              key={`${t}-${i}`}
              onClick={() => setPlaced((p) => [...p, i])}
              disabled={status !== "idle"}
              className="arabic text-3xl w-14 h-14 rounded-2xl border-2 border-line bg-surface hover:border-brand transition disabled:opacity-40"
            >
              {t}
            </button>
          ),
        )}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => setPlaced((p) => p.slice(0, -1))} disabled={!placed.length}>
          <RotateCcw size={15} /> Hapus
        </Button>
        <Button variant="outline" size="sm" onClick={() => play(current.ar)}>
          <Volume2 size={15} /> Dengar
        </Button>
      </div>
    </div>
  );
}

function shuffleBy<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed + 1;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ============================ 4. Dengar & Ketuk ========================= */
export function DengarGame({ onClose, onFinish }: GameProps) {
  const total = 8;
  const words = useMemo(() => pickWords(total + 8), []);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const { play, playing } = useSpeaker();
  const word = words[qi % words.length];

  const options = useMemo(
    () => shuffle([word, ...shuffle(WORDS.filter((w) => w.id !== word.id)).slice(0, 3)]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [qi],
  );

  useEffect(() => {
    const t = setTimeout(() => play(word.ar), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  useEffect(() => {
    if (done) onFinish({ xp: correct * 12, correct, total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    if (id === word.id) setCorrect((c) => c + 1);
    setTimeout(() => {
      setPicked(null);
      if (qi + 1 >= total) setDone(true);
      else setQi((i) => i + 1);
    }, 700);
  }

  if (done) return <Result score={correct} total={total} xp={correct * 12} onClose={onClose} />;

  return (
    <div>
      <GameTop
        title="Dengar & Ketuk"
        onClose={onClose}
        right={
          <span className="text-sm font-bold text-fg-muted">
            {qi + 1}/{total}
          </span>
        }
        progress={(qi / total) * 100}
      />
      <div className="text-center">
        <button
          onClick={() => play(word.ar)}
          className={cn(
            "grid place-items-center w-20 h-20 rounded-full bg-brand text-white mx-auto transition",
            playing && "ring-4 ring-brand/30",
          )}
          aria-label="Putar audio"
        >
          <Volume2 size={30} />
        </button>
        <button
          onClick={() => play(word.ar, 0.6)}
          className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand/25 px-3 py-1.5 text-xs font-bold text-brand-dark dark:text-white"
        >
          <Snail size={13} /> 0.75×
        </button>
      </div>
      <p className="text-center text-sm text-fg-muted mt-4 mb-4">Ketuk gambar yang kamu dengar</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const isAnswer = o.id === word.id;
          const isPicked = o.id === picked;
          return (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              className={cn(
                "rounded-2xl border-2 p-4 flex flex-col items-center gap-2 transition",
                !picked && "border-line bg-surface hover:border-brand",
                picked && isAnswer && "border-success bg-success-soft dark:bg-success/20",
                picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                picked && !isAnswer && !isPicked && "border-line opacity-50",
              )}
            >
              <span className="text-4xl">{wordEmoji(o)}</span>
              <span className="font-bold text-sm text-fg">{o.meaning}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ============================== 5. Duel Kata ============================ */
export function DuelGame({ onClose, onFinish }: GameProps) {
  const total = 8;
  const words = useMemo(() => pickWords(total + 8), []);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [me, setMe] = useState(0);
  const [bot, setBot] = useState(0);
  const [done, setDone] = useState(false);
  const word = words[qi % words.length];

  const options = useMemo(
    () => shuffle([word, ...shuffle(WORDS.filter((w) => w.id !== word.id)).slice(0, 3)]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [qi],
  );

  useEffect(() => {
    if (done) onFinish({ xp: me * 15 + (me > bot ? 25 : 0), correct: me, total });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    const ok = id === word.id;
    let myScore = me;
    if (ok) {
      myScore = me + 1;
      setMe(myScore);
    }
    const botScores = Math.random() < 0.6;
    const botScore = bot + (botScores ? 1 : 0);
    if (botScores) setBot(botScore);
    setTimeout(() => {
      setPicked(null);
      if (qi + 1 >= total) setDone(true);
      else setQi((i) => i + 1);
    }, 800);
  }

  if (done) {
    const win = me > bot;
    const draw = me === bot;
    return (
      <div className="text-center py-2">
        <span className="text-5xl">{win ? "🏆" : draw ? "🤝" : "💪"}</span>
        <h3 className="font-display font-bold text-2xl mt-3 text-fg">
          {win ? "Kamu menang!" : draw ? "Seri!" : "Bot menang kali ini"}
        </h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-brand-light dark:bg-brand/20 p-4">
            <p className="text-xs font-bold text-fg-muted">Kamu</p>
            <p className="font-display font-bold text-3xl text-brand mt-1">{me}</p>
          </div>
          <div className="rounded-2xl bg-surface-2 p-4">
            <p className="text-xs font-bold text-fg-muted">Jamal Bot 🐪</p>
            <p className="font-display font-bold text-3xl text-fg-muted mt-1">{bot}</p>
          </div>
        </div>
        <p className="text-sm text-fg-muted mt-4">
          +{me * 15 + (win ? 25 : 0)} XP ditambahkan
        </p>
        <Button className="w-full mt-5" onClick={onClose}>
          Selesai
        </Button>
      </div>
    );
  }

  return (
    <div>
      <GameTop
        title="Duel Kata"
        onClose={onClose}
        right={
          <span className="text-sm font-bold text-fg-muted">
            {qi + 1}/{total}
          </span>
        }
        progress={(qi / total) * 100}
      />
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 text-center">
          <p className="text-xs font-bold text-fg-muted">Kamu</p>
          <p className="font-display font-bold text-2xl text-brand">{me}</p>
        </div>
        <span className="text-fg-subtle font-bold">VS</span>
        <div className="flex-1 text-center">
          <p className="text-xs font-bold text-fg-muted">Jamal Bot 🐪</p>
          <p className="font-display font-bold text-2xl text-fg-muted">{bot}</p>
        </div>
      </div>
      <p className="font-display font-bold text-2xl text-center text-fg mb-1">{word.meaning}</p>
      <p className="text-center text-xs text-fg-subtle mb-5">Pilih kata Arab yang tepat, cepat!</p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((o) => {
          const isAnswer = o.id === word.id;
          const isPicked = o.id === picked;
          return (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              className={cn(
                "aspect-square rounded-2xl border-2 grid place-items-center p-2 transition",
                !picked && "border-line bg-surface hover:border-brand",
                picked && isAnswer && "border-success bg-success-soft dark:bg-success/20",
                picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                picked && !isAnswer && !isPicked && "border-line opacity-50",
              )}
            >
              <span className="arabic text-3xl text-fg">{o.ar}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ========================== 6. Tantangan Harian ========================= */
type HarianQ = { type: "meaning" | "listen"; word: Word; options: Word[] };

export function HarianGame({ onClose, onFinish }: GameProps) {
  const total = 10;
  const questions = useMemo<HarianQ[]>(() => {
    const ws = pickWords(total);
    return ws.map((w, i) => ({
      type: i % 2 === 0 ? "meaning" : "listen",
      word: w,
      options: shuffle([w, ...shuffle(WORDS.filter((x) => x.id !== w.id)).slice(0, 3)]),
    }));
  }, []);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);
  const { play } = useSpeaker();
  const q = questions[qi];

  useEffect(() => {
    if (q?.type === "listen") {
      const t = setTimeout(() => play(q.word.ar), 350);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  useEffect(() => {
    if (done) onFinish({ xp: correct * 20, correct, total }); // 2× XP
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    if (id === q.word.id) setCorrect((c) => c + 1);
    setTimeout(() => {
      setPicked(null);
      if (qi + 1 >= total) setDone(true);
      else setQi((i) => i + 1);
    }, 650);
  }

  if (done)
    return <Result score={correct} total={total} xp={correct * 20} onClose={onClose} />;

  return (
    <div>
      <GameTop
        title="Tantangan Harian"
        onClose={onClose}
        right={
          <span className="inline-flex items-center gap-1 text-sm font-bold text-gold-dark dark:text-gold">
            <Zap size={14} />2×
          </span>
        }
        progress={(qi / total) * 100}
      />
      <p className="text-xs font-bold uppercase tracking-wider text-fg-muted text-center mb-3">
        {q.type === "meaning" ? "Pilih arti yang benar" : "Dengarkan, lalu pilih kata yang benar"}
      </p>
      {q.type === "meaning" ? (
        <button
          onClick={() => play(q.word.ar)}
          className="arabic text-5xl text-fg mx-auto block rounded-2xl px-3 py-2 hover:bg-brand-light/60 dark:hover:bg-brand/15"
        >
          {q.word.ar}
        </button>
      ) : (
        <div className="text-center">
          <button
            onClick={() => play(q.word.ar)}
            className="grid place-items-center w-16 h-16 rounded-full bg-brand text-white mx-auto"
            aria-label="Putar audio"
          >
            <Volume2 size={26} />
          </button>
        </div>
      )}
      <div className="grid gap-3 mt-5">
        {q.options.map((o) => {
          const isAnswer = o.id === q.word.id;
          const isPicked = o.id === picked;
          const isArabic = q.type === "listen";
          return (
            <button
              key={o.id}
              onClick={() => choose(o.id)}
              className={cn(
                "rounded-2xl border-2 p-3.5 text-left transition flex items-center gap-3",
                !picked && "border-line bg-surface hover:border-brand",
                picked && isAnswer && "border-success bg-success-soft dark:bg-success/20",
                picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                picked && !isAnswer && !isPicked && "border-line opacity-50",
              )}
            >
              {isArabic ? (
                <span className="arabic text-2xl text-fg">{o.ar}</span>
              ) : (
                <span className="font-bold text-fg">{o.meaning}</span>
              )}
              {picked && isAnswer && <Check size={16} className="ml-auto text-success" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

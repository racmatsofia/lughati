import { useEffect, useMemo, useState } from "react";
import { Check, Play, Timer, Trophy, X } from "lucide-react";
import { PageHeader } from "../components/layout";
import { GAMES, WORDS, type Word } from "../lib/data";
import { SpeakerButton, useSpeaker } from "../components/audio";
import { Button, Card, Chip, Modal } from "../components/ui";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export default function Games() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const { addXp } = useApp();

  const toneMap: Record<string, string> = {
    gold: "bg-gold-soft dark:bg-gold/15 text-gold-dark dark:text-gold",
    brand: "bg-brand-light dark:bg-brand/20 text-brand",
    coral: "bg-coral-soft dark:bg-coral/20 text-coral",
  };

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Latihan & Game"
        subtitle="Belajar sambil bermain. Kumpulkan XP dan naikkan peringkatmu!"
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {GAMES.map((g) => (
          <Card key={g.id} className="p-6 flex flex-col hover:-translate-y-1 transition">
            <span className={cn("grid place-items-center w-14 h-14 rounded-3xl text-2xl", toneMap[g.color])}>
              {g.emoji}
            </span>
            <h3 className="font-display font-bold text-lg text-fg mt-4">{g.title}</h3>
            <p className="text-sm text-fg-muted mt-1 flex-1">{g.desc}</p>
            <Button
              className="mt-5 self-start"
              onClick={() => (g.id === "kilat" || g.id === "harian" ? setPlaying(g.id) : setComingSoon(g.title))}
            >
              <Play size={16} /> Main
            </Button>
          </Card>
        ))}
      </div>

      <Modal open={!!playing} onClose={() => setPlaying(null)}>
        {playing && (
          <SpeedGame
            mode={playing}
            onClose={() => setPlaying(null)}
            onScore={(xp) => addXp(xp)}
          />
        )}
      </Modal>

      <Modal open={!!comingSoon} onClose={() => setComingSoon(null)} title={comingSoon ?? ""}>
        <p className="text-fg-muted">
          Mode <span className="font-bold text-fg">{comingSoon}</span> sedang disiapkan. Sementara
          itu, coba <span className="font-bold text-brand">Kilat Kosakata</span> dulu ya! 🐪
        </p>
        <Button className="mt-5 w-full" onClick={() => setComingSoon(null)}>
          Mengerti
        </Button>
      </Modal>
    </div>
  );
}

/* ------------------------- Kilat Kosakata (timed) ----------------------- */
function SpeedGame({
  mode,
  onClose,
  onScore,
}: {
  mode: string;
  onClose: () => void;
  onScore: (xp: number) => void;
}) {
  const duration = mode === "harian" ? 45 : 60;
  const [time, setTime] = useState(duration);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [ended, setEnded] = useState(false);
  const { play } = useSpeaker();

  const questions = useMemo(
    () =>
      [...WORDS].sort(() => Math.random() - 0.5).slice(0, 40),
    [],
  );
  const [qIndex, setQIndex] = useState(0);
  const word: Word = questions[qIndex % questions.length];

  const options = useMemo(() => {
    const others = WORDS.filter((w) => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3);
    return [word, ...others].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex]);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => {
      setTime((s) => {
        if (s <= 1) {
          clearInterval(t);
          setEnded(true);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    play(word.ar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qIndex]);

  useEffect(() => {
    if (ended) onScore(score * 5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended]);

  function choose(id: string) {
    if (picked) return;
    setPicked(id);
    if (id === word.id) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
    setTimeout(() => {
      setPicked(null);
      setQIndex((i) => i + 1);
    }, 550);
  }

  if (ended) {
    return (
      <div className="text-center">
        <Trophy className="mx-auto text-gold" size={44} />
        <h3 className="font-display font-bold text-2xl mt-3">Waktu habis!</h3>
        <p className="text-fg-muted mt-1">Skor kamu</p>
        <p className="font-display font-bold text-5xl text-brand mt-1">{score}</p>
        <p className="text-sm text-fg-muted mt-2">+{score * 5} XP ditambahkan</p>
        <Button className="mt-6 w-full" onClick={onClose}>
          Selesai
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={onClose} className="text-fg-subtle hover:text-fg" aria-label="Tutup">
          <X size={20} />
        </button>
        <span className="inline-flex items-center gap-1.5 font-bold text-coral">
          <Timer size={16} /> {time}s
        </span>
        <span className="font-bold text-fg">
          {score} <span className="text-fg-subtle text-sm">· 🔥{streak}</span>
        </span>
      </div>

      <div className="h-2 rounded-full bg-surface-2 overflow-hidden mb-5">
        <div className="h-full bg-coral transition-all" style={{ width: `${(time / duration) * 100}%` }} />
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2 text-center">
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

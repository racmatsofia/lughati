import { useState } from "react";
import { Check, Play, Zap } from "lucide-react";
import { PageHeader } from "../components/layout";
import { GAMES } from "../lib/data";
import { Button, Card, Chip, Modal } from "../components/ui";
import { InstallPrompt } from "../components/PWA";
import {
  DengarGame,
  DuelGame,
  HarianGame,
  KilatGame,
  MemoryGame,
  SusunGame,
  type GameProps,
} from "../components/MiniGames";
import { useApp } from "../lib/store";
import { useT } from "../lib/i18n";
import { cn, formatNumber, todayKey } from "../lib/utils";

type GameId = "kilat" | "cocok" | "susun" | "dengar" | "duel" | "harian";

const registry: Record<GameId, (p: GameProps) => React.ReactElement> = {
  kilat: KilatGame,
  cocok: MemoryGame,
  susun: SusunGame,
  dengar: DengarGame,
  duel: DuelGame,
  harian: HarianGame,
};

const tone: Record<string, string> = {
  gold: "bg-gold-soft dark:bg-gold/15 text-gold-dark dark:text-gold",
  brand: "bg-brand-light dark:bg-brand/20 text-brand",
  coral: "bg-coral-soft dark:bg-coral/20 text-coral",
};

export default function Games() {
  const [playing, setPlaying] = useState<GameId | null>(null);
  const [lastXp, setLastXp] = useState<number | null>(null);
  const { addXp, progress, update } = useApp();
  const t = useT();

  const dailyDone = progress.dailyDone === todayKey();
  const Game = playing ? registry[playing] : null;

  function finish(result: { xp: number; correct: number; total: number }) {
    addXp(result.xp);
    setLastXp(result.xp);
    if (playing === "harian") update({ dailyDone: todayKey() });
  }

  return (
    <div className="animate-fade-up">
      <PageHeader title={t("latihan.title")} subtitle={t("latihan.sub")} />

      {/* Hero: Tantangan Harian */}
      <div className="relative overflow-hidden rounded-3xl bg-brand text-white p-6 mb-6">
        <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-15" />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-white/70">
              {t("latihan.tantangan")}
            </p>
            <h2 className="font-display font-bold text-2xl mt-1">Kilat Kosakata</h2>
            <p className="text-white/80 text-sm mt-1">{t("latihan.bonus")}</p>
          </div>
          {dailyDone ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-3 font-bold">
              <Check size={18} /> Selesai hari ini
            </span>
          ) : (
            <Button variant="gold" size="lg" onClick={() => setPlaying("harian")}>
              <Play size={18} /> {t("c.main")}
            </Button>
          )}
        </div>
      </div>

      <InstallPrompt className="mb-6" />

      {/* Grid game */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {GAMES.map((g) => (
          <Card key={g.id} className="p-5 flex flex-col hover:-translate-y-1 transition">
            <span className={cn("grid place-items-center w-13 h-13 min-w-13 min-h-13 rounded-2xl text-2xl p-3", tone[g.color])}>
              {g.emoji}
            </span>
            <h3 className="font-display font-bold text-base sm:text-lg text-fg mt-3">{g.title}</h3>
            <p className="text-sm text-fg-muted mt-1 flex-1 leading-snug">{g.desc}</p>
            <Button className="mt-4 self-start" size="sm" onClick={() => setPlaying(g.id as GameId)}>
              <Play size={15} /> {t("c.main")}
            </Button>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-fg-subtle">
        <Zap size={15} /> Total {formatNumber(progress.xp)} XP · level {Math.floor(progress.xp / 300) + 1}
      </div>

      {/* Papan skor mini */}
      {lastXp !== null && !playing && (
        <Card className="mt-4 p-4 flex items-center gap-3">
          <Chip tone="gold">+{lastXp} XP</Chip>
          <p className="text-sm text-fg-muted">Kerja bagus! Teruskan untuk naik peringkat.</p>
        </Card>
      )}

      <Modal open={!!playing} onClose={() => setPlaying(null)}>
        {Game && (
          <Game
            onClose={() => setPlaying(null)}
            onFinish={(r) => finish(r)}
          />
        )}
      </Modal>
    </div>
  );
}

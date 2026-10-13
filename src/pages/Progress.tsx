import { Link } from "react-router-dom";
import { BookOpen, Flame, Target, TrendingUp, Zap } from "lucide-react";
import { PageHeader } from "../components/layout";
import { Card, Chip, ProgressBar, Ring, buttonClasses } from "../components/ui";
import { SpeakerButton } from "../components/audio";
import { wordById, ACHIEVEMENTS } from "../lib/data";
import { useApp } from "../lib/store";
import { cn, formatNumber, todayKey } from "../lib/utils";

export default function ProgressPage() {
  const { progress, level, unlockedBadges } = useApp();
  const today = todayKey();

  const last14 = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(Date.now() - (13 - i) * 86400000);
    const key = todayKey(d);
    const xp = progress.history.find((h) => h.date === key)?.xp ?? 0;
    return { key, date: d, xp };
  });
  const maxXp = Math.max(50, ...last14.map((d) => d.xp));

  // heatmap 12 minggu
  const weeks = 12;
  const heat = Array.from({ length: weeks * 7 }).map((_, i) => {
    const d = new Date(Date.now() - (weeks * 7 - 1 - i) * 86400000);
    const key = todayKey(d);
    const xp = progress.history.find((h) => h.date === key)?.xp ?? 0;
    return { key, xp };
  });

  const skills = [
    { label: "Membaca", value: Math.min(100, progress.learnedWords.length * 3 + 10) },
    { label: "Mendengar", value: progress.accuracy || 0 },
    { label: "Berbicara", value: Math.max(0, Math.min(100, (progress.accuracy || 0) - 12)) },
    { label: "Kosakata", value: Math.min(100, Math.round((progress.learnedWords.length / 60) * 100)) },
  ];

  const totalMinutes = progress.quizzes * 5;

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Progres Belajar"
        subtitle="Lihat perjalananmu dan temukan kata yang perlu diulang."
      />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Zap size={20} />} label="Total XP" value={formatNumber(progress.xp)} tone="brand" />
        <StatCard icon={<Flame size={20} />} label="Streak" value={`${progress.streak} hari`} tone="gold" />
        <StatCard icon={<BookOpen size={20} />} label="Pelajaran" value={`${progress.completedLessons.length}`} tone="coral" />
        <StatCard icon={<Target size={20} />} label="Kata dikuasai" value={`${progress.learnedWords.length}`} tone="brand" />
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.4fr_1fr] gap-5">
        {/* Aktivitas 14 hari */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display font-bold text-lg text-fg">Aktivitas 14 hari</h2>
            <Chip tone="brand">
              <TrendingUp size={14} /> {formatNumber(progress.history.slice(-14).reduce((s, h) => s + h.xp, 0))} XP
            </Chip>
          </div>
          <p className="text-sm text-fg-muted">Total waktu belajar ± {totalMinutes} menit</p>

          <div className="mt-6 flex items-end justify-between gap-1.5 h-40">
            {last14.map((d) => {
              const h = Math.max(4, (d.xp / maxXp) * 100);
              const isToday = d.key === today;
              return (
                <div key={d.key} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      "w-full rounded-lg transition-all",
                      isToday ? "bg-gold" : d.xp > 0 ? "bg-brand" : "bg-surface-2",
                    )}
                    style={{ height: `${d.xp > 0 ? h : 4}%` }}
                    title={`${d.key}: ${d.xp} XP`}
                  />
                  <span className="text-[10px] text-fg-subtle">{d.date.getDate()}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Level & skill */}
        <div className="space-y-5">
          <Card className="p-6 text-center">
            <Ring value={((progress.xp % 300) / 300) * 100} size={110} stroke={10}>
              <div>
                <p className="font-display font-bold text-2xl text-brand">{level}</p>
                <p className="text-[10px] text-fg-muted">Level</p>
              </div>
            </Ring>
            <p className="font-display font-bold text-lg text-fg mt-4">{formatNumber(progress.xp)} XP</p>
            <p className="text-sm text-fg-muted">
              {300 - (progress.xp % 300)} XP lagi menuju Level {level + 1}
            </p>
            <p className="text-xs text-fg-subtle mt-3">Streak terbaik: {progress.bestStreak} hari 🔥</p>
          </Card>

          <Card className="p-6">
            <h3 className="font-display font-bold text-fg mb-4">Kemampuan</h3>
            <div className="space-y-4">
              {skills.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-bold text-fg">{s.label}</span>
                    <span className="text-fg-muted">{s.value}%</span>
                  </div>
                  <ProgressBar value={s.value} height={8} tone={s.value >= 60 ? "brand" : "gold"} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Heatmap */}
      <Card className="p-6 mt-5">
        <h2 className="font-display font-bold text-lg text-fg mb-4">Kalender belajar</h2>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="flex flex-col gap-1.5">
              {Array.from({ length: 7 }).map((_, d) => {
                const item = heat[w * 7 + d];
                const intensity =
                  item.xp === 0 ? 0 : item.xp < 100 ? 1 : item.xp < 250 ? 2 : 3;
                return (
                  <span
                    key={d}
                    title={`${item.key}: ${item.xp} XP`}
                    className={cn(
                      "w-3.5 h-3.5 rounded-[4px]",
                      intensity === 0 && "bg-surface-2",
                      intensity === 1 && "bg-brand/30",
                      intensity === 2 && "bg-brand/60",
                      intensity === 3 && "bg-brand",
                    )}
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mt-3 text-xs text-fg-subtle">
          <span>Sedikit</span>
          <span className="w-3.5 h-3.5 rounded-[4px] bg-surface-2" />
          <span className="w-3.5 h-3.5 rounded-[4px] bg-brand/30" />
          <span className="w-3.5 h-3.5 rounded-[4px] bg-brand/60" />
          <span className="w-3.5 h-3.5 rounded-[4px] bg-brand" />
          <span>Banyak</span>
        </div>
      </Card>

      {/* Weak words */}
      <Card className="p-6 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg text-fg">Kata yang perlu diulang</h2>
          {progress.weakWords.length > 0 && (
            <Link to="/app/flashcard" className="text-sm font-bold text-brand hover:underline">
              Latih sekarang
            </Link>
          )}
        </div>
        {progress.weakWords.length === 0 ? (
          <p className="text-fg-muted text-sm">
            Belum ada kata lemah. Terus belajar — kata yang sering salah akan muncul di sini. 🎉
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {progress.weakWords.map((id) => {
              const w = wordById(id);
              if (!w) return null;
              return (
                <div key={id} className="flex items-center gap-3 rounded-2xl bg-bg-alt dark:bg-surface-2 p-3">
                  <SpeakerButton text={w.ar} size="sm" tone="soft" />
                  <div className="flex-1 min-w-0">
                    <p className="arabic text-xl text-fg">{w.ar}</p>
                    <p className="text-xs text-fg-muted truncate">{w.meaning} · {w.translit}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Achievements preview */}
      <Card className="p-6 mt-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-lg text-fg">
            Pencapaian ({unlockedBadges.length}/{ACHIEVEMENTS.length})
          </h2>
          <Link to="/app/pencapaian" className={buttonClasses("ghost", "sm")}>
            Lihat semua
          </Link>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACHIEVEMENTS.map((a) => {
            const unlocked = unlockedBadges.includes(a.id);
            return (
              <span
                key={a.id}
                title={a.title}
                className={cn(
                  "grid place-items-center w-14 h-14 rounded-2xl text-2xl",
                  unlocked ? "bg-brand-light dark:bg-brand/25" : "bg-surface-2 grayscale opacity-50",
                )}
              >
                {a.emoji}
              </span>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "brand" | "gold" | "coral";
}) {
  const tones = {
    brand: "bg-brand-light dark:bg-brand/20 text-brand",
    gold: "bg-gold-soft dark:bg-gold/15 text-gold-dark dark:text-gold",
    coral: "bg-coral-soft dark:bg-coral/20 text-coral",
  };
  return (
    <Card className="p-5">
      <span className={cn("grid place-items-center w-11 h-11 rounded-2xl", tones[tone])}>{icon}</span>
      <p className="font-display font-bold text-2xl text-fg mt-3">{value}</p>
      <p className="text-sm text-fg-muted">{label}</p>
    </Card>
  );
}

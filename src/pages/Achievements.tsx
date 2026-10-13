import { Award, Lock } from "lucide-react";
import { PageHeader } from "../components/layout";
import { ACHIEVEMENTS } from "../lib/data";
import { Card, Chip, ProgressBar } from "../components/ui";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export default function Achievements() {
  const { progress, unlockedBadges } = useApp();

  const stats: Record<string, number> = {
    lessons: progress.completedLessons.length,
    words: progress.learnedWords.length,
    streak: progress.bestStreak,
    xp: progress.xp,
    stories: progress.storiesRead.length,
  };

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Pencapaian"
        subtitle="Kumpulkan badge dengan menjaga kebiasaan belajarmu. Setiap badge punya cerita!"
      />

      <div className="mb-6 flex items-center gap-3">
        <Chip tone="brand">
          <Award size={14} /> {unlockedBadges.length} dari {ACHIEVEMENTS.length} terbuka
        </Chip>
        <ProgressBar value={(unlockedBadges.length / ACHIEVEMENTS.length) * 100} className="flex-1" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ACHIEVEMENTS.map((a) => {
          const unlocked = unlockedBadges.includes(a.id);
          const current = Math.min(stats[a.metric] ?? 0, a.goal);
          const pct = Math.round((current / a.goal) * 100);

          return (
            <Card
              key={a.id}
              className={cn(
                "p-6 transition",
                unlocked ? "border-brand/40 bg-brand-light/30 dark:bg-brand/10" : "",
              )}
            >
              <div className="flex items-start justify-between">
                <span
                  className={cn(
                    "grid place-items-center w-16 h-16 rounded-3xl text-3xl transition",
                    unlocked ? "bg-brand text-white animate-pop" : "bg-surface-2 grayscale opacity-60",
                  )}
                >
                  {unlocked ? a.emoji : <Lock size={22} className="text-fg-subtle" />}
                </span>
                {unlocked && <Chip tone="success">Terbuka</Chip>}
              </div>

              <h3 className="font-display font-bold text-lg text-fg mt-4">{a.title}</h3>
              <p className="text-sm text-fg-muted mt-1">{a.desc}</p>

              {!unlocked && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-fg-muted mb-1.5">
                    <span>Progres</span>
                    <span>{current}/{a.goal}</span>
                  </div>
                  <ProgressBar value={pct} height={8} tone="gold" />
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

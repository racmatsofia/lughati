import { useState } from "react";
import { Crown, Medal, Trophy } from "lucide-react";
import { PageHeader } from "../components/layout";
import { LEADERBOARD } from "../lib/data";
import { Card, Chip } from "../components/ui";
import { useApp } from "../lib/store";
import { cn, formatNumber } from "../lib/utils";

const leagues = [
  { name: "Diamond", emoji: "💎", color: "text-info" },
  { name: "Gold", emoji: "🥇", color: "text-gold" },
  { name: "Silver", emoji: "🥈", color: "text-fg-subtle" },
  { name: "Bronze", emoji: "🥉", color: "text-gold-dark" },
];

export default function Leaderboard() {
  const { progress } = useApp();
  const [tab, setTab] = useState<"global" | "mingguan" | "kelas">("global");

  const data = LEADERBOARD.map((p) =>
    p.me ? { ...p, xp: Math.max(p.xp, progress.xp) || p.xp } : p,
  ).sort((a, b) => b.xp - a.xp);

  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Peringkat"
        subtitle="Bersaing sehat dengan pelajar lain. Naikkan XP-mu setiap minggu!"
      />

      <div className="flex gap-2 mb-6">
        {(
          [
            ["global", "Global"],
            ["mingguan", "Mingguan"],
            ["kelas", "Kelas"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold transition",
              tab === key ? "bg-brand text-white" : "bg-surface border border-line text-fg-muted",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-6 items-end">
        {[top3[1], top3[0], top3[2]].filter(Boolean).map((p, i) => {
          const rank = p === top3[0] ? 1 : p === top3[1] ? 2 : 3;
          const heights = { 1: "h-40", 2: "h-32", 3: "h-28" } as const;
          return (
            <Card
              key={p.name}
              className={cn(
                "relative p-3 text-center flex flex-col justify-end",
                heights[rank as 1 | 2 | 3],
                rank === 1 && "bg-gold-soft dark:bg-gold/15 border-gold/40",
              )}
            >
              {rank === 1 && <Crown className="absolute top-3 left-1/2 -translate-x-1/2 text-gold" size={22} />}
              <span className="text-4xl">{p.avatar}</span>
              <p className="font-bold text-fg text-sm truncate mt-2">{p.name}</p>
              <p className="text-xs text-fg-muted">{formatNumber(p.xp)} XP</p>
              <span
                className={cn(
                  "mt-2 grid place-items-center w-8 h-8 rounded-full mx-auto font-display font-bold text-white",
                  rank === 1 ? "bg-gold" : rank === 2 ? "bg-fg-subtle" : "bg-gold-dark",
                )}
              >
                {rank}
              </span>
            </Card>
          );
        })}
      </div>

      {/* List */}
      <Card className="divide-y divide-line overflow-hidden">
        {rest.map((p, i) => {
          const rank = i + 4;
          return (
            <div
              key={p.name}
              className={cn(
                "flex items-center gap-4 p-4",
                p.me && "bg-brand-light/50 dark:bg-brand/10",
              )}
            >
              <span className={cn("w-6 text-center font-bold", p.me ? "text-brand" : "text-fg-subtle")}>
                {rank}
              </span>
              <span className="text-2xl">{p.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className={cn("font-bold truncate", p.me ? "text-brand" : "text-fg")}>
                  {p.name} {p.me && <span className="text-xs">(kamu)</span>}
                </p>
                <p className="text-xs text-fg-muted">{p.league} League</p>
              </div>
              <span className="font-bold text-fg">{formatNumber(p.xp)} XP</span>
            </div>
          );
        })}
      </Card>

      {/* Liga */}
      <Card className="p-6 mt-5">
        <h3 className="font-display font-bold text-lg text-fg mb-4">Liga</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {leagues.map((l) => (
            <div key={l.name} className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-4 text-center">
              <span className="text-3xl">{l.emoji}</span>
              <p className={cn("font-bold mt-2", l.color)}>{l.name}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-gold-soft dark:bg-gold/15 p-4">
          <Medal className="text-gold-dark dark:text-gold shrink-0" />
          <p className="text-sm text-fg">
            Kamu berada di liga <span className="font-bold">Gold</span>. Kumpulkan XP untuk naik ke{" "}
            <span className="font-bold">Diamond</span> minggu depan!
          </p>
        </div>
      </Card>

      <div className="mt-5 flex items-center justify-center gap-2 text-sm text-fg-subtle">
        <Trophy size={15} /> Peringkat diperbarui setiap Senin pukul 00.00
      </div>
    </div>
  );
}

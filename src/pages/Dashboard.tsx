import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Flame,
  Lock,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { Card, Chip, ProgressBar, Ring } from "../components/ui";
import { ArabicWord, ExampleBlock, SpeakerButton } from "../components/audio";
import { buttonClasses } from "../components/ui";
import { MODULES, WORDS, LEADERBOARD } from "../lib/data";
import { useApp } from "../lib/store";
import { cn, formatNumber, todayKey } from "../lib/utils";

export default function Dashboard() {
  const { user, progress, level, moduleProgress } = useApp();

  const todayXp = progress.history.find((h) => h.date === todayKey())?.xp ?? 0;
  const missionDone = todayXp > 0;

  // Modul aktif = modul pertama yang belum tuntas
  let currentModuleIndex = MODULES.findIndex((m) =>
    m.lessons.some((l) => !progress.completedLessons.includes(l.id)),
  );
  if (currentModuleIndex < 0) currentModuleIndex = MODULES.length - 1;
  const currentModule = MODULES[currentModuleIndex];
  const currentLesson =
    currentModule.lessons.find((l) => !progress.completedLessons.includes(l.id)) ??
    currentModule.lessons[0];
  const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === currentLesson.id);
  const modulePct = moduleProgress(currentModule.id, currentModule.lessons.map((l) => l.id));

  const wordOfDay = WORDS[new Date().getDate() % WORDS.length];

  const weekXp = progress.history.slice(-7).reduce((s, h) => s + h.xp, 0);
  const weekMax = Math.max(200, ...progress.history.slice(-7).map((h) => h.xp));

  return (
    <div className="animate-fade-up">
      {/* Greeting */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-fg">
            Ahlan, {user?.name?.split(" ")[0]} 👋
          </h1>
          <p className="text-fg-muted mt-1">Siap lanjut belajar hari ini?</p>
        </div>
        <Link
          to="/app/profil"
          className="grid place-items-center w-12 h-12 rounded-full bg-brand-light dark:bg-brand/20 text-2xl shrink-0"
          aria-label="Profil"
        >
          {user?.avatar}
        </Link>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 lg:hidden">
        <Chip tone="gold">
          <Flame size={15} /> {progress.streak} hari
        </Chip>
        <Chip tone="brand">
          <Zap size={15} /> {formatNumber(progress.xp)} XP
        </Chip>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.7fr_1fr] gap-6">
        {/* ===================== Kolom utama ===================== */}
        <div className="space-y-5">
          {/* Misi harian */}
          <Card className="p-5 flex items-center gap-4">
            <Ring value={missionDone ? 100 : 0} size={64} stroke={8}>
              <span className="text-xl">{missionDone ? "✅" : "🎯"}</span>
            </Ring>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-lg text-fg">Misi Harian</h2>
              <p className="text-sm text-fg-muted">Selesaikan 1 pelajaran hari ini</p>
              <p className="text-xs font-bold text-brand mt-1">
                {missionDone ? "1/1 selesai · bonus diklaim" : "0/1 selesai · bonus 20 XP"}
              </p>
            </div>
            <ChevronRight className="text-fg-subtle shrink-0" size={20} />
          </Card>

          {/* Lanjut belajar */}
          <div className="relative overflow-hidden rounded-3xl bg-brand text-white p-6">
            <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-15" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70">
                Lanjut Belajar
              </p>
              <h2 className="font-display font-bold text-2xl mt-1">{currentModule.title}</h2>
              <p className="text-white/80 text-sm mt-1">
                {currentLesson.title} · Pelajaran {currentLessonIndex + 1} dari{" "}
                {currentModule.lessons.length} · {currentLesson.minutes} menit
              </p>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={modulePct} tone="white" height={8} />
                <span className="text-sm font-bold shrink-0">{modulePct}%</span>
              </div>
              <Link
                to={`/app/pelajaran/${currentModule.id}/${currentLesson.id}`}
                className={cn(buttonClasses("outline", "md"), "mt-5 !bg-white !text-brand !border-transparent hover:!bg-white/90")}
              >
                <Play size={17} /> Lanjut Belajar
              </Link>
            </div>
          </div>

          {/* Jalur belajar */}
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-lg text-fg">Jalur Belajar</h2>
              <Link to="/app/kamus" className="text-sm font-bold text-brand hover:underline">
                Lihat semua
              </Link>
            </div>

            <ul className="space-y-2">
              {MODULES.map((m, i) => {
                const lessonIds = m.lessons.map((l) => l.id);
                const done = lessonIds.filter((id) => progress.completedLessons.includes(id)).length;
                const allDone = done === lessonIds.length;
                const isActive = i === currentModuleIndex;
                const locked = i > currentModuleIndex && !allDone && done === 0;

                const inner = (
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-2xl p-3 transition",
                      isActive && "bg-brand-light/60 dark:bg-brand/15",
                      locked && "opacity-60",
                    )}
                  >
                    <span
                      className={cn(
                        "grid place-items-center w-11 h-11 rounded-full shrink-0 text-lg",
                        allDone
                          ? "bg-brand text-white"
                          : locked
                            ? "bg-surface-2 text-fg-subtle"
                            : isActive
                              ? "bg-white dark:bg-surface text-brand ring-2 ring-brand"
                              : "bg-surface-2 text-fg-muted",
                      )}
                    >
                      {allDone ? <Check size={20} /> : locked ? <Lock size={16} /> : m.emoji}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-bold text-fg truncate">{m.title}</span>
                      <span className="block text-sm text-fg-muted">
                        {allDone
                          ? `Selesai · ${done}/${lessonIds.length}`
                          : locked
                            ? "Terkunci"
                            : `Sedang dipelajari · ${done}/${lessonIds.length}`}
                      </span>
                    </span>
                    <ChevronRight className="text-fg-subtle shrink-0" size={18} />
                  </div>
                );

                return (
                  <li key={m.id}>
                    {locked ? (
                      <div>{inner}</div>
                    ) : (
                      <Link to={`/app/belajar/${m.slug}`} className="block hover:bg-bg-alt dark:hover:bg-surface-2 rounded-2xl">
                        {inner}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Kata hari ini */}
          <div className="rounded-3xl bg-gold-soft dark:bg-gold/12 p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-dark dark:text-gold">
                Kata Hari Ini
              </p>
              <Link to="/app/kamus" className="text-xs font-bold text-gold-dark dark:text-gold hover:underline">
                Buka kamus
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4 flex-wrap">
              <ArabicWord text={wordOfDay.ar} translit={wordOfDay.translit} fontSize={34} />
              <div>
                <p className="font-display font-bold text-xl text-fg">{wordOfDay.meaning}</p>
                <p className="text-sm text-fg-muted">isim · {wordOfDay.translit}</p>
              </div>
            </div>
            {wordOfDay.example && (
              <div className="mt-4">
                <ExampleBlock {...wordOfDay.example} />
              </div>
            )}
          </div>
        </div>

        {/* ===================== Sidebar kanan (desktop) ===================== */}
        <div className="hidden lg:block space-y-5">
          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">Level kamu</p>
            <div className="flex items-center gap-4 mt-3">
              <Ring value={((progress.xp % 300) / 300) * 100} size={72} stroke={8}>
                <span className="font-display font-bold text-lg text-brand">{level}</span>
              </Ring>
              <div>
                <p className="font-display font-bold text-2xl text-fg">{formatNumber(progress.xp)} XP</p>
                <p className="text-sm text-fg-muted">
                  {300 - (progress.xp % 300)} XP menuju Level {level + 1}
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-gold-soft dark:bg-gold/15 p-3 text-center">
                <Flame className="mx-auto text-gold-dark dark:text-gold" size={20} />
                <p className="font-display font-bold text-xl text-fg mt-1">{progress.streak}</p>
                <p className="text-xs text-fg-muted">hari beruntun</p>
              </div>
              <div className="rounded-2xl bg-brand-light dark:bg-brand/20 p-3 text-center">
                <Sparkles className="mx-auto text-brand" size={20} />
                <p className="font-display font-bold text-xl text-fg mt-1">{progress.learnedWords.length}</p>
                <p className="text-xs text-fg-muted">kata dikuasai</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">XP minggu ini</p>
            <p className="font-display font-bold text-2xl text-fg mt-1">{formatNumber(weekXp)} XP</p>
            <div className="mt-4 flex items-end justify-between gap-1.5 h-24">
              {Array.from({ length: 7 }).map((_, i) => {
                const day = new Date(Date.now() - (6 - i) * 86400000);
                const xp = progress.history.find((h) => h.date === todayKey(day))?.xp ?? 0;
                const h = Math.max(4, Math.round((xp / weekMax) * 74));
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full rounded-t-lg bg-brand/80 transition-all" style={{ height: `${h}px` }} />
                    <span className="text-[10px] text-fg-subtle">
                      {["S", "S", "R", "K", "J", "S", "M"][day.getDay()]}
                    </span>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">Peringkat</p>
              <Link to="/app/peringkat" className="text-xs font-bold text-brand hover:underline">
                Lihat
              </Link>
            </div>
            <ul className="space-y-2">
              {LEADERBOARD.slice(0, 4).map((p, i) => (
                <li key={p.name} className="flex items-center gap-3">
                  <span className={cn("w-5 text-sm font-bold", p.me ? "text-brand" : "text-fg-subtle")}>
                    {i + 1}
                  </span>
                  <span className="text-lg">{p.avatar}</span>
                  <span className={cn("flex-1 text-sm truncate", p.me ? "font-bold text-brand" : "text-fg-muted")}>
                    {p.name}
                  </span>
                  <span className="text-xs font-bold text-fg-muted">{formatNumber(p.xp)}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

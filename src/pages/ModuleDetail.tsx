import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check, ChevronRight, Clock, Lock, Play } from "lucide-react";
import { Card, Chip, ProgressBar, buttonClasses } from "../components/ui";
import { PageHeader } from "../components/layout";
import { moduleBySlug, wordById } from "../lib/data";
import { SpeakerButton } from "../components/audio";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export default function ModuleDetail() {
  const { slug } = useParams();
  const mod = slug ? moduleBySlug(slug) : undefined;
  const { progress, moduleProgress } = useApp();

  if (!mod) return <Navigate to="/app/belajar" replace />;

  const lessonIds = mod.lessons.map((l) => l.id);
  const pct = moduleProgress(mod.id, lessonIds);
  const firstIncomplete = mod.lessons.find((l) => !progress.completedLessons.includes(l.id));

  return (
    <div className="animate-fade-up">
      <Link
        to="/app/belajar"
        className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-brand mb-4"
      >
        <ArrowLeft size={16} /> Jalur Belajar
      </Link>

      <Card className="p-6 sm:p-8 mb-6">
        <div className="flex flex-wrap items-start gap-4">
          <span className="grid place-items-center w-16 h-16 rounded-3xl bg-brand-light dark:bg-brand/20 text-3xl shrink-0">
            {mod.emoji}
          </span>
          <div className="flex-1 min-w-[200px]">
            <div className="flex items-center gap-2 mb-1">
              <Chip tone="brand">Level {mod.level}</Chip>
              <Chip tone="neutral">{mod.lessons.length} pelajaran</Chip>
            </div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-fg">{mod.title}</h1>
            <p className="text-fg-muted mt-1">{mod.subtitle}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <ProgressBar value={pct} height={10} />
          <span className="text-sm font-bold text-fg shrink-0">{pct}%</span>
        </div>

        {firstIncomplete && (
          <Link
            to={`/app/pelajaran/${mod.id}/${firstIncomplete.id}`}
            className={cn(buttonClasses("primary", "md"), "mt-5")}
          >
            <Play size={17} /> {pct > 0 ? "Lanjut Belajar" : "Mulai Pelajaran Pertama"}
          </Link>
        )}
      </Card>

      <PageHeader title="Daftar Pelajaran" subtitle="Selesaikan satu per satu untuk membuka berikutnya." />

      <ul className="space-y-3">
        {mod.lessons.map((l, i) => {
          const done = progress.completedLessons.includes(l.id);
          const prevDone = i === 0 || progress.completedLessons.includes(mod.lessons[i - 1].id);
          const locked = !prevDone && !done;
          const words = l.wordIds.map(wordById).filter(Boolean);

          return (
            <li key={l.id}>
              <Card
                className={cn(
                  "flex items-center gap-4 p-4 transition",
                  locked ? "opacity-60" : "hover:shadow-lift",
                )}
              >
                <span
                  className={cn(
                    "grid place-items-center w-11 h-11 rounded-full shrink-0 font-bold",
                    done
                      ? "bg-brand text-white"
                      : locked
                        ? "bg-surface-2 text-fg-subtle"
                        : "bg-brand-light dark:bg-brand/20 text-brand-dark dark:text-white",
                  )}
                >
                  {done ? <Check size={20} /> : locked ? <Lock size={16} /> : i + 1}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="font-bold text-fg truncate">{l.title}</p>
                  <p className="text-sm text-fg-muted flex items-center gap-1.5">
                    <Clock size={13} /> {l.minutes} menit
                    {words.length > 0 && <span>· {words.length} kosakata</span>}
                  </p>
                  {words.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {words.slice(0, 3).map((w) => (
                        <span key={w!.id} className="inline-flex items-center gap-1 rounded-full bg-bg-alt dark:bg-surface-2 px-2.5 py-1">
                          <span className="arabic text-sm text-fg">{w!.ar}</span>
                          <SpeakerButton text={w!.ar} size="sm" tone="ghost" />
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {locked ? (
                  <Lock size={18} className="text-fg-subtle" />
                ) : (
                  <Link
                    to={`/app/pelajaran/${mod.id}/${l.id}`}
                    className="grid place-items-center w-10 h-10 rounded-full bg-brand text-white hover:bg-brand-dark transition shrink-0"
                    aria-label={`Buka ${l.title}`}
                  >
                    {done ? <Check size={18} /> : <ChevronRight size={20} />}
                  </Link>
                )}
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

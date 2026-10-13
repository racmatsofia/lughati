import { useState } from "react";
import { ArrowLeft, BookOpen, Check, Languages, Play, Sparkles } from "lucide-react";
import { PageHeader } from "../components/layout";
import { STORIES, type Story } from "../lib/data";
import { SentenceAudio, SpeakerButton, useSpeaker } from "../components/audio";
import { Button, Card, Chip, ProgressBar } from "../components/ui";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export default function Stories() {
  const { settings, setSettings, progress, readStory, addXp } = useApp();
  const [active, setActive] = useState<Story | null>(null);

  if (active) {
    return (
      <Reader
        story={active}
        onBack={() => setActive(null)}
        onFinish={() => {
          readStory(active.id);
          setActive(null);
        }}
        alreadyRead={progress.storiesRead.includes(active.id)}
      />
    );
  }

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Cerita"
        subtitle="Baca cerita pendek berharakat. Ketuk setiap kalimat untuk mendengar pengucapannya."
      />

      <div className="mb-5">
        <button
          onClick={() => setSettings({ translit: !settings.translit })}
          className="inline-flex items-center gap-2 rounded-full bg-surface border border-line px-4 py-2 text-sm font-bold text-fg-muted hover:border-brand"
        >
          <Languages size={16} /> Transliterasi: {settings.translit ? "Aktif" : "Nonaktif"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {STORIES.map((s) => (
          <Card key={s.id} className="p-6 flex flex-col hover:-translate-y-1 transition">
            <div className="flex items-start justify-between">
              <span className="grid place-items-center w-14 h-14 rounded-3xl bg-brand-light dark:bg-brand/20 text-3xl">
                {s.emoji}
              </span>
              <Chip tone="gold">Level {s.level}</Chip>
            </div>
            <p className="arabic text-3xl text-fg mt-4">{s.title}</p>
            <p className="font-display font-bold text-lg text-fg mt-1">{s.titleId}</p>
            <p className="text-sm text-fg-muted mt-1">
              {s.lines.length} kalimat · {s.minutes} menit
              {progress.storiesRead.includes(s.id) && " · ✓ selesai"}
            </p>
            <Button className="mt-5 self-start" onClick={() => setActive(s)}>
              <BookOpen size={17} /> Baca sekarang
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------- Reader -------------------------------- */
function Reader({
  story,
  onBack,
  onFinish,
  alreadyRead,
}: {
  story: Story;
  onBack: () => void;
  onFinish: () => void;
  alreadyRead: boolean;
}) {
  const { settings, setSettings, addXp } = useApp();
  const [activeLine, setActiveLine] = useState(0);
  const [showMeaning, setShowMeaning] = useState(true);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});

  // Kuis: 2 kalimat acak-deterministik
  const quizLines = [story.lines[0], story.lines[Math.min(2, story.lines.length - 1)]];
  const quizStart = 0;

  const answeredCount = Object.keys(quizAnswers).length;
  const correctCount = quizLines.filter(
    (l, i) => quizAnswers[quizStart + i] === l.meaning,
  ).length;
  const allAnswered = answeredCount >= quizLines.length;

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-brand mb-4"
      >
        <ArrowLeft size={16} /> Semua cerita
      </button>

      <Card className="p-6 sm:p-8 mb-5">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{story.emoji}</span>
          <Chip tone="gold">Level {story.level}</Chip>
          {alreadyRead && <Chip tone="success">✓ Sudah dibaca</Chip>}
        </div>
        <p className="arabic text-4xl text-fg mt-4">{story.title}</p>
        <p className="font-display font-bold text-xl text-fg mt-1">{story.titleId}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setSettings({ translit: !settings.translit })}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold transition",
              settings.translit ? "bg-brand text-white" : "bg-surface-2 text-fg-muted",
            )}
          >
            Transliterasi
          </button>
          <button
            onClick={() => setShowMeaning((m) => !m)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold transition",
              showMeaning ? "bg-brand text-white" : "bg-surface-2 text-fg-muted",
            )}
          >
            Terjemahan
          </button>
        </div>
      </Card>

      <div className="space-y-3">
        {story.lines.map((l, i) => (
          <SentenceAudio
            key={i}
            ar={l.ar}
            translit={l.translit}
            meaning={showMeaning ? l.meaning : undefined}
            active={activeLine === i}
            className={i === 0 ? "" : ""}
          />
        ))}
      </div>

      {/* Quiz */}
      <Card className="mt-6 p-6">
        <h3 className="font-display font-bold text-lg text-fg mb-1">Kuis pemahaman</h3>
        <p className="text-sm text-fg-muted mb-4">Pilih arti yang tepat untuk setiap kalimat.</p>

        <div className="space-y-5">
          {quizLines.map((l, qi) => {
            const others = story.lines.filter((x) => x.meaning !== l.meaning).slice(0, 2);
            const choices = [l.meaning, ...others.map((o) => o.meaning)];
            const picked = quizAnswers[qi];
            return (
              <div key={qi}>
                <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-4 flex items-center gap-3">
                  <SpeakerButton text={l.ar} size="sm" tone="soft" />
                  <p className="arabic text-xl text-fg flex-1">{l.ar}</p>
                </div>
                <div className="mt-2 space-y-2">
                  {choices.map((c) => {
                    const isAnswer = c === l.meaning;
                    const isPicked = c === picked;
                    return (
                      <button
                        key={c}
                        onClick={() => setQuizAnswers((a) => ({ ...a, [qi]: c }))}
                        disabled={!!picked}
                        className={cn(
                          "w-full rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition",
                          !picked && "border-line bg-surface hover:border-brand",
                          picked && isAnswer && "border-brand bg-brand-light/60 dark:bg-brand/20",
                          picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                          picked && !isAnswer && !isPicked && "border-line opacity-50",
                        )}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <div className="mt-5 rounded-2xl bg-success-soft dark:bg-success/20 p-4 flex items-center gap-3">
            <span className="grid place-items-center w-9 h-9 rounded-full bg-success text-white">
              <Check size={18} />
            </span>
            <p className="font-bold text-fg">
              Skor kuis: {correctCount}/{quizLines.length} · +30 XP untuk cerita ini 🎉
            </p>
          </div>
        )}
      </Card>

      <div className="mt-5 flex gap-3">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Kembali
        </Button>
        <Button className="flex-1" onClick={onFinish}>
          <Sparkles size={17} /> Tandai selesai
        </Button>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { ArrowRight, Check, Heart, RotateCcw, Snail, Volume2, X } from "lucide-react";
import { HIJAIYAH, WORDS, moduleById, wordById, type Lesson as LessonType, type Module, type Word } from "../lib/data";
import { SpeakerButton, Waveform } from "../components/audio";
import { Button, Card, ProgressBar, Ring, buttonClasses } from "../components/ui";
import { Confetti, Mascot } from "../components/brand";
import { useApp } from "../lib/store";
import { useSpeaker } from "../components/audio";
import { cn } from "../lib/utils";

type Q = {
  kind: "meaning" | "word" | "listen" | "letter";
  promptAr?: string;
  promptText?: string;
  translit?: string;
  audio: string;
  answer: string;
  choices: string[];
  wordId?: string;
  hint: string;
};

function shuffle<T>(arr: T[], seed = 7): T[] {
  const a = [...arr];
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestions(lesson: LessonType, mod: Module): Q[] {
  const qs: Q[] = [];

  if (mod.id === "hijaiyah" || lesson.wordIds.length === 0) {
    const idx = Number(lesson.id.split("l")[1] || 1) - 1;
    const letters = HIJAIYAH.slice((idx * 4) % 28, ((idx * 4) % 28) + 4);
    const pool = letters.length ? letters : HIJAIYAH.slice(0, 4);
    pool.forEach((L, i) => {
      const others = shuffle(HIJAIYAH.filter((x) => x.name !== L.name)).slice(0, 3);
      qs.push({
        kind: i % 2 === 0 ? "letter" : "listen",
        promptAr: i % 2 === 0 ? L.ar : undefined,
        promptText: i % 2 === 0 ? undefined : `Huruf apakah ini?`,
        translit: undefined,
        audio: L.ar,
        answer: L.name,
        choices: shuffle([L.name, ...others.map((o) => o.name)], idx + i + 3),
        hint: i % 2 === 0 ? "Kenali nama hurufnya" : "Dengar lalu pilih huruf yang benar",
      });
    });
    return qs;
  }

  const words = lesson.wordIds.map(wordById).filter(Boolean) as Word[];
  words.forEach((w, i) => {
    const sameTheme = WORDS.filter((x) => x.theme === w.theme && x.id !== w.id);
    const pool = sameTheme.length >= 3 ? sameTheme : WORDS.filter((x) => x.id !== w.id);
    const distractors = shuffle(pool, i + 51).slice(0, 3);

    // 1) tebak arti
    qs.push({
      kind: "meaning",
      promptAr: w.ar,
      translit: w.translit,
      audio: w.ar,
      answer: w.meaning,
      choices: shuffle([w.meaning, ...distractors.map((d) => d.meaning)], i + 11),
      wordId: w.id,
      hint: "Pilih arti yang benar",
    });

    // 2) dengar & pilih
    qs.push({
      kind: "listen",
      promptText: "Dengarkan, lalu pilih kata yang benar",
      audio: w.ar,
      answer: w.ar,
      choices: shuffle([w.ar, ...distractors.map((d) => d.ar)], i + 23),
      wordId: w.id,
      hint: "Dengarkan pelan-pelan bila perlu",
    });
  });

  return qs;
}

export default function Lesson() {
  const { moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { progress, completeLesson, markWeak, addXp } = useApp();
  const { play } = useSpeaker();

  const mod = moduleId ? moduleById(moduleId) : undefined;
  const lesson = mod?.lessons.find((l) => l.id === lessonId);
  const questions = useMemo(() => (mod && lesson ? buildQuestions(lesson, mod) : []), [mod, lesson]);

  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(3);
  const [weak, setWeak] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [showBreak, setShowBreak] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const autoplayRef = useRef(0);

  const q = questions[index];
  const answered = picked !== null;
  const isCorrect = answered && picked === q?.answer;

  // Auto-play untuk soal mendengar
  useEffect(() => {
    if (!q) return;
    if (q.kind === "listen" && autoplayRef.current !== index) {
      autoplayRef.current = index;
      const t = setTimeout(() => play(q.audio), 350);
      return () => clearTimeout(t);
    }
  }, [index, q, play]);

  if (!mod || !lesson) return <Navigate to="/app/belajar" replace />;

  const total = questions.length;
  const progressPct = ((index + (answered ? 1 : 0)) / total) * 100;

  function choose(choice: string) {
    if (answered) return;
    setPicked(choice);
    const correct = choice === q.answer;
    if (correct) {
      setCorrectCount((c) => c + 1);
    } else {
      setHearts((h) => h - 1);
      if (q.wordId) {
        setWeak((w) => (w.includes(q.wordId!) ? w : [...w, q.wordId!]));
        markWeak(q.wordId);
      }
      if (hearts - 1 <= 0) setShowBreak(true);
    }
  }

  function next() {
    if (index + 1 >= total) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  }

  function finish() {
    const accuracy = Math.round((correctCount / total) * 100);
    const perfect = correctCount === total;
    const xp = correctCount * 10 + (perfect ? 20 : 0);
    completeLesson(lesson!.id, lesson!.wordIds, accuracy, xp);
    setDone(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2600);
  }

  /* ------------------------------ Summary ------------------------------ */
  if (done) {
    const accuracy = Math.round((correctCount / total) * 100);
    const xp = correctCount * 10 + (correctCount === total ? 20 : 0);
    return (
      <div className="animate-fade-up max-w-xl mx-auto text-center pt-4">
        <Confetti show={showConfetti} />
        <div className="flex justify-center">
          <Ring value={accuracy} size={140} stroke={12}>
            <div>
              <p className="font-display font-bold text-3xl text-fg">{accuracy}%</p>
              <p className="text-xs text-fg-muted">akurasi</p>
            </div>
          </Ring>
        </div>
        <h1 className="font-display font-bold text-3xl text-fg mt-6">
          {accuracy >= 80 ? "Ahsanta! اَحْسَنْتَ 👏" : "Bagus, terus berlatih!"}
        </h1>
        <p className="text-fg-muted mt-2">
          Kamu menyelesaikan <span className="font-bold text-fg">{lesson.title}</span>.
        </p>

        <div className="grid grid-cols-3 gap-3 mt-7">
          <StatBox label="XP didapat" value={`+${xp}`} tone="gold" />
          <StatBox label="Benar" value={`${correctCount}/${total}`} tone="brand" />
          <StatBox label="Streak" value={`${progress.streak} 🔥`} tone="coral" />
        </div>

        {weak.length > 0 && (
          <Card className="mt-6 p-5 text-left">
            <p className="font-bold text-fg mb-3">Kata yang perlu diulang</p>
            <div className="space-y-2">
              {weak.map((id) => {
                const w = wordById(id);
                if (!w) return null;
                return (
                  <div key={id} className="flex items-center gap-3 rounded-2xl bg-bg-alt dark:bg-surface-2 p-3">
                    <SpeakerButton text={w.ar} size="sm" tone="soft" />
                    <div className="flex-1">
                      <p className="arabic text-xl text-fg">{w.ar}</p>
                      <p className="text-xs text-fg-muted">{w.translit} · {w.meaning}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        )}

        <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
          <Link to={`/app/belajar/${mod.slug}`} className={buttonClasses("outline", "lg")}>
            <RotateCcw size={17} /> Kembali ke Modul
          </Link>
          <Link to="/app/belajar" className={buttonClasses("primary", "lg")}>
            Lanjut <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  /* ------------------------------ Question ------------------------------ */
  const bigArabic = q.kind === "listen" || q.kind === "word";

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      {/* top bar */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate(`/app/belajar/${mod.slug}`)}
          className="grid place-items-center w-10 h-10 rounded-full bg-surface-2 text-fg-muted hover:text-coral transition shrink-0"
          aria-label="Keluar"
        >
          <X size={18} />
        </button>
        <ProgressBar value={progressPct} height={10} />
        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-soft dark:bg-coral/20 px-3 py-1.5 text-sm font-extrabold text-coral shrink-0">
          <Heart size={14} fill="currentColor" /> {Math.max(hearts, 0)}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">{q.hint}</p>
        <p className="text-sm font-bold text-brand">
          Soal {index + 1}/{total}
        </p>
      </div>

      {/* Prompt card */}
      <Card className="p-6 sm:p-8 text-center">
        {q.promptAr && (
          <button
            onClick={() => play(q.audio)}
            className={cn(
              "arabic rounded-2xl px-4 py-2 transition hover:bg-brand-light/60 dark:hover:bg-brand/15",
              q.kind === "letter" ? "text-7xl" : "text-6xl",
            )}
            aria-label={`Dengarkan ${q.promptAr}`}
          >
            {q.promptAr}
          </button>
        )}
        {q.promptText && <p className="font-display font-bold text-xl text-fg">{q.promptText}</p>}

        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            onClick={() => play(q.audio)}
            className="grid place-items-center w-16 h-16 rounded-full bg-brand text-white hover:bg-brand-dark transition shadow-[0_8px_24px_rgb(14_124_123/0.35)]"
            aria-label="Putar audio"
          >
            <Volume2 size={26} />
          </button>
          <button
            onClick={() => play(q.audio, 0.6)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand/25 px-4 py-2.5 text-sm font-bold text-brand-dark dark:text-white"
          >
            <Snail size={15} /> 0.75×
          </button>
        </div>

        <p className="text-xs text-fg-subtle mt-4">Ketuk speaker untuk mendengar 🔊</p>
      </Card>

      {/* Choices */}
      <div className={cn("mt-5 grid gap-3", bigArabic ? "sm:grid-cols-2" : "")}>
        {q.choices.map((c, i) => {
          const isAnswer = c === q.answer;
          const isPicked = c === picked;
          return (
            <button
              key={c}
              onClick={() => choose(c)}
              disabled={answered}
              className={cn(
                "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition",
                !answered && "bg-surface border-line hover:border-brand hover:bg-brand-light/30 dark:hover:bg-brand/10",
                answered && isAnswer && "border-brand bg-brand-light/70 dark:bg-brand/20",
                answered && isPicked && !isAnswer && "border-coral bg-coral-soft dark:bg-coral/20",
                answered && !isAnswer && !isPicked && "border-line bg-surface opacity-60",
              )}
            >
              <span
                className={cn(
                  "grid place-items-center w-9 h-9 rounded-full text-sm font-bold shrink-0",
                  answered && isAnswer
                    ? "bg-brand text-white"
                    : answered && isPicked
                      ? "bg-coral text-white"
                      : "bg-surface-2 text-fg-muted",
                )}
              >
                {answered && isAnswer ? <Check size={16} /> : String.fromCharCode(65 + i)}
              </span>
              {bigArabic ? (
                <span className="arabic text-2xl text-fg">{c}</span>
              ) : (
                <span className="font-bold text-fg">{c}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className={cn(
            "mt-5 rounded-2xl p-4 flex items-center gap-3 animate-fade-up",
            isCorrect
              ? "bg-success-soft dark:bg-success/20"
              : "bg-coral-soft dark:bg-coral/20",
          )}
        >
          <span
            className={cn(
              "grid place-items-center w-9 h-9 rounded-full text-white shrink-0",
              isCorrect ? "bg-success" : "bg-coral",
            )}
          >
            {isCorrect ? <Check size={18} /> : <X size={18} />}
          </span>
          <div className="flex-1">
            <p className="font-bold text-fg">
              {isCorrect ? "Mantap! اَحْسَنْتَ 👏" : "Hampir benar! Coba dengar lagi 🎧"}
            </p>
            <p className="text-sm text-fg-muted">
              {isCorrect ? "+10 XP · jawaban benar" : `Jawaban benar: ${q.answer}`}
            </p>
          </div>
          {!isCorrect && <SpeakerButton text={q.audio} size="sm" tone="soft" />}
        </div>
      )}

      {answered && (
        <Button onClick={next} size="lg" className="w-full mt-5">
          {index + 1 >= total ? "Selesaikan" : "Lanjut"} <ArrowRight size={18} />
        </Button>
      )}

      {!answered && (
        <div className="mt-5 flex items-center justify-center gap-2 text-fg-subtle text-sm">
          <Waveform className="text-brand/60 h-4" />
          Pilih satu jawaban di atas
        </div>
      )}

      {/* Break modal */}
      {showBreak && (
        <div className="fixed inset-0 z-50 grid place-items-center p-5">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <Card className="relative max-w-sm w-full p-6 text-center animate-pop">
            <div className="flex justify-center">
              <Mascot size="lg" />
            </div>
            <h3 className="font-display font-bold text-xl text-fg mt-3">Tidak apa-apa! 🐪</h3>
            <p className="text-fg-muted text-sm mt-2">
              Kesalahan adalah bagian dari belajar. Mau coba lagi dari awal atau lanjutkan?
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                onClick={() => {
                  setHearts(3);
                  setShowBreak(false);
                }}
              >
                Lanjut belajar
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  setHearts(3);
                  setIndex(0);
                  setPicked(null);
                  setCorrectCount(0);
                  setWeak([]);
                  setShowBreak(false);
                }}
              >
                <RotateCcw size={16} /> Ulangi dari awal
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function StatBox({ label, value, tone }: { label: string; value: string; tone: "gold" | "brand" | "coral" }) {
  const tones = {
    gold: "bg-gold-soft dark:bg-gold/15 text-gold-dark dark:text-gold",
    brand: "bg-brand-light dark:bg-brand/20 text-brand-dark dark:text-white",
    coral: "bg-coral-soft dark:bg-coral/20 text-coral",
  };
  return (
    <div className={cn("rounded-2xl p-4", tones[tone])}>
      <p className="font-display font-bold text-xl">{value}</p>
      <p className="text-xs mt-0.5 opacity-90">{label}</p>
    </div>
  );
}

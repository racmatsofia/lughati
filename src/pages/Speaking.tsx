import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Mic, MicOff, RotateCcw, Snail, Sparkles, Volume2 } from "lucide-react";
import { PageHeader } from "../components/layout";
import { WORDS, wordEmoji, type Word } from "../lib/data";
import { SpeakerButton, useSpeaker } from "../components/audio";
import { Button, Card, Chip, ProgressBar, Ring, buttonClasses } from "../components/ui";
import { Mascot } from "../components/brand";
import { useApp } from "../lib/store";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";

/* --------------------- penilaian pengucapan (client) -------------------- */
function normalizeAr(s: string): string {
  return s
    .replace(/[\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\u0621-\u064A]/g, "");
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

function similarity(target: string, said: string): number {
  const a = normalizeAr(target);
  const b = normalizeAr(said);
  if (!a || !b) return 0;
  const d = levenshtein(a, b);
  return Math.max(0, Math.round((1 - d / Math.max(a.length, b.length)) * 100));
}

/* ------------------------------- komponen ------------------------------- */
type SR = any;

export default function Speaking() {
  const t = useT();
  const { addXp, markWeak, markKnown } = useApp();
  const total = 8;
  const deck = useMemo<Word[]>(
    () => [...WORDS].filter((w) => !w.ar.includes(" ")).sort(() => Math.random() - 0.5).slice(0, total),
    [],
  );

  const [qi, setQi] = useState(0);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const recognitionRef = useRef<SR>(null);
  const { play } = useSpeaker();

  const word = deck[qi];

  const supported = useMemo(() => {
    if (typeof window === "undefined") return false;
    return !!(window as any).SpeechRecognition || !!(window as any).webkitSpeechRecognition;
  }, []);

  useEffect(() => {
    if (!supported) return;
    const Ctor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new Ctor();
    rec.lang = "ar-SA";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 3;

    rec.onresult = (e: any) => {
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) text += e.results[i][0].transcript;
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal) {
        const s = similarity(word?.ar ?? "", text);
        setScore(s);
        setScores((arr) => [...arr, s]);
        if (s >= 70) markKnown(word.id);
        else markWeak(word.id);
      }
    };
    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === "not-allowed" || e.error === "service-not-allowed")
        setError("Izin mikrofon ditolak. Aktifkan izin mikrofon di pengaturan browser.");
      else if (e.error === "no-speech") setError("Tidak ada suara terdeteksi. Coba lagi ya.");
      else setError(`Terjadi kesalahan: ${e.error}`);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    return () => {
      try {
        rec.abort();
      } catch {
        /* noop */
      }
    };
  }, [supported, word, markKnown, markWeak]);

  const start = useCallback(() => {
    setError("");
    setTranscript("");
    setScore(null);
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }, []);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      /* noop */
    }
    setListening(false);
  }, []);

  function next() {
    if (qi + 1 >= deck.length) {
      const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      addXp(Math.round(avg / 2));
      setDone(true);
    } else {
      setQi((i) => i + 1);
      setTranscript("");
      setScore(null);
      setError("");
    }
  }

  function restart() {
    setQi(0);
    setScores([]);
    setTranscript("");
    setScore(null);
    setDone(false);
    setError("");
  }

  /* ------------------------------ Hasil --------------------------------- */
  if (done) {
    const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return (
      <div className="animate-fade-up max-w-xl mx-auto text-center pt-4">
        <div className="flex justify-center">
          <Ring value={avg} size={140} stroke={12}>
            <div>
              <p className="font-display font-bold text-3xl text-fg">{avg}</p>
              <p className="text-xs text-fg-muted">{t("bicara.skor")}</p>
            </div>
          </Ring>
        </div>
        <div className="flex justify-center mt-5">
          <Mascot message={avg >= 75 ? "Lidahmu fasih! 👏" : "Latihan lagi biar makin lancar 🐪"} />
        </div>
        <p className="text-fg-muted mt-4">
          +{Math.round(avg / 2)} XP ditambahkan dari {scores.length} kata.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" onClick={restart}>
            <RotateCcw size={17} /> {t("bicara.cobaLagi")}
          </Button>
          <Link to="/app/latihan" className={buttonClasses("primary", "md")}>
            Latihan lain <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <PageHeader title={t("bicara.title")} subtitle={t("bicara.sub")} />

      {!supported && (
        <Card className="p-5 mb-5 border-gold/40 bg-gold-soft dark:bg-gold/15">
          <div className="flex gap-3">
            <AlertTriangle className="text-gold-dark dark:text-gold shrink-0" size={20} />
            <p className="text-sm text-fg">{t("bicara.tidakDidukung")}</p>
          </div>
        </Card>
      )}

      <div className="flex items-center gap-3 mb-4">
        <ProgressBar value={(qi / deck.length) * 100} height={8} />
        <span className="text-sm font-bold text-fg shrink-0">
          {qi + 1}/{deck.length}
        </span>
      </div>

      {/* Kartu kata */}
      <Card className="p-6 sm:p-8 text-center">
        <span className="text-4xl">{wordEmoji(word)}</span>
        <button
          onClick={() => play(word.ar)}
          className="arabic block mx-auto text-5xl sm:text-6xl text-fg mt-3 rounded-2xl px-4 py-2 hover:bg-brand-light/60 dark:hover:bg-brand/15 transition"
        >
          {word.ar}
        </button>
        <p className="latin italic text-sm text-fg-subtle mt-2">{word.translit}</p>
        <p className="font-bold text-fg-muted mt-1">{word.meaning}</p>

        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => play(word.ar)}>
            <Volume2 size={15} /> {t("bicara.dengarContoh")}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => play(word.ar, 0.6)}>
            <Snail size={15} /> 0.75×
          </Button>
        </div>

        {/* Mikrofon */}
        <div className="mt-7">
          <button
            onClick={listening ? stop : start}
            disabled={!supported}
            className={cn(
              "relative grid place-items-center w-24 h-24 rounded-full mx-auto text-white transition disabled:opacity-40",
              listening ? "bg-coral" : "bg-brand hover:bg-brand-dark",
            )}
            aria-label={listening ? "Berhenti" : "Mulai merekam"}
          >
            {listening && <span className="absolute inset-0 rounded-full bg-coral animate-ring" />}
            {listening ? <MicOff size={34} /> : <Mic size={34} />}
          </button>
          <p className="text-sm font-bold text-fg-muted mt-3">
            {listening ? t("bicara.mendengar") : t("bicara.ketuk")}
          </p>
          <p className="text-xs text-fg-subtle mt-1">{t("bicara.menit")}</p>
        </div>

        {transcript && (
          <div className="mt-5 rounded-2xl bg-bg-alt dark:bg-surface-2 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-1">
              Yang terdengar
            </p>
            <p className="arabic text-2xl text-fg">{transcript}</p>
          </div>
        )}

        {score !== null && (
          <div
            className={cn(
              "mt-4 rounded-2xl p-4 flex items-center gap-4 text-left",
              score >= 85
                ? "bg-success-soft dark:bg-success/20"
                : score >= 65
                  ? "bg-gold-soft dark:bg-gold/15"
                  : "bg-coral-soft dark:bg-coral/20",
            )}
          >
            <Ring
              value={score}
              size={62}
              stroke={8}
            >
              <span className="font-display font-bold text-sm text-fg">{score}</span>
            </Ring>
            <div className="flex-1">
              <p className="font-bold text-fg">
                {score >= 85 ? "Fasih sekali! مَا شَاءَ الله 🌟" : score >= 65 ? "Bagus, hampir tepat 👍" : "Coba lagi pelan-pelan 🎧"}
              </p>
              <p className="text-sm text-fg-muted">
                Bandingkan dengan contoh, lalu ucapkan ulang.
              </p>
            </div>
            <SpeakerButton text={word.ar} tone="soft" />
          </div>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-coral-soft dark:bg-coral/20 text-coral text-sm font-semibold px-3 py-2.5">
            {error}
          </p>
        )}

        <div className="mt-6 flex items-center justify-center gap-3">
          <Button variant="ghost" onClick={next}>
            {t("bicara.lewati")} <ArrowRight size={16} />
          </Button>
          <Button onClick={() => (score !== null ? next() : start())} disabled={!supported}>
            {score !== null ? (
              <>
                {t("c.lanjut")} <ArrowRight size={16} />
              </>
            ) : (
              <>
                <Sparkles size={16} /> {t("bicara.cobaLagi")}
              </>
            )}
          </Button>
        </div>
      </Card>

      {scores.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {scores.map((s, i) => (
            <Chip key={i} tone={s >= 85 ? "success" : s >= 65 ? "gold" : "coral"}>
              {i + 1}: {s}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
}

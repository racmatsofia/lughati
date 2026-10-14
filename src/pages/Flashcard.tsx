import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Layers, RotateCcw, Sparkles, ThumbsDown, ThumbsUp } from "lucide-react";
import { PageHeader } from "../components/layout";
import { THEMES, WORDS, wordById, type Word } from "../lib/data";
import { ArabicWord, ExampleBlock, SpeakerButton } from "../components/audio";
import { Button, Card, Chip, EmptyState, ProgressBar, Ring } from "../components/ui";
import { useApp } from "../lib/store";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";

type DeckKey = "dasar" | "milikku" | string;

export default function Flashcard() {
  const t = useT();
  const { progress, markKnown, markWeak } = useApp();
  const [deckKey, setDeckKey] = useState<DeckKey>("dasar");

  const deck = useMemo<Word[]>(() => {
    if (deckKey === "milikku") return progress.flashcards.map(wordById).filter(Boolean) as Word[];
    if (deckKey === "dasar") return WORDS.slice(0, 10);
    const ids = WORDS.filter((w) => w.theme === deckKey).map((w) => w.id);
    return ids.length ? (ids.map(wordById).filter(Boolean) as Word[]) : WORDS.slice(0, 10);
  }, [deckKey, progress.flashcards]);

  const [order, setOrder] = useState<string[]>(() => deck.map((w) => w.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [again, setAgain] = useState<string[]>([]);

  const deckIds = deck.map((w) => w.id).join(",");
  useEffect(() => {
    setOrder(deck.map((w) => w.id));
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setAgain([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckIds]);

  const currentId = order[index];
  const word = currentId ? wordById(currentId) : undefined;
  const total = order.length;
  const reviewed = known.length + again.length;
  const pct = total ? Math.round((reviewed / total) * 100) : 0;
  const finished = total > 0 && reviewed >= total;

  function advance(knownIt: boolean) {
    if (!word) return;
    if (knownIt) {
      setKnown((k) => [...k, word.id]);
      markKnown(word.id);
    } else {
      setAgain((a) => [...a, word.id]);
      markWeak(word.id);
      setOrder((o) => [...o.filter((x) => x !== word.id), word.id]);
    }
    setFlipped(false);
    setIndex((i) => (i + 1 >= order.length ? 0 : i + 1));
  }

  function restart() {
    setOrder(deck.map((w) => w.id));
    setIndex(0);
    setFlipped(false);
    setKnown([]);
    setAgain([]);
  }

  const decks: { key: DeckKey; label: string; count: number }[] = [
    { key: "dasar", label: t("fc.deckDasar"), count: 10 },
    { key: "milikku", label: t("fc.deckMilik"), count: progress.flashcards.length },
    ...THEMES.map((th) => ({
      key: th.key,
      label: `${th.emoji} ${th.label.split(" ")[0]}`,
      count: WORDS.filter((w) => w.theme === th.key).length,
    })),
  ];

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <PageHeader title={t("fc.title")} subtitle={t("fc.sub")} />

      {/* Deck picker */}
      <div className="flex items-center gap-2 mb-4">
        <Layers size={16} className="text-fg-subtle shrink-0" />
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {decks.map((d) => (
            <button
              key={d.key}
              onClick={() => setDeckKey(d.key)}
              className={cn(
                "shrink-0 rounded-full px-3.5 py-2 text-sm font-bold transition",
                deckKey === d.key
                  ? "bg-brand text-white"
                  : "bg-surface border border-line text-fg-muted hover:border-brand",
              )}
            >
              {d.label} · {d.count}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <ProgressBar value={pct} height={8} />
        <span className="text-sm font-bold text-fg shrink-0">
          {reviewed}/{total}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <Chip tone="success">✓ {t("fc.hafal")}: {known.length}</Chip>
        <Chip tone="coral">↻ {t("fc.belum")}: {again.length}</Chip>
      </div>

      {deck.length === 0 ? (
        <Card>
          <EmptyState
            emoji="🃏"
            title="Deck ini masih kosong"
            desc="Tambahkan kata dari halaman Kamus untuk mulai menghafal."
            action={
              <Link to="/app/kamus">
                <Button>
                  <Sparkles size={17} /> Buka Kamus
                </Button>
              </Link>
            }
          />
        </Card>
      ) : finished ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center">
            <Ring value={100} size={120} stroke={10}>
              <span className="text-3xl">🎉</span>
            </Ring>
          </div>
          <h2 className="font-display font-bold text-2xl text-fg mt-5">{t("fc.selesai")}</h2>
          <p className="text-fg-muted mt-2">
            {known.length} kata dihafal, {again.length} kata perlu diulang.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={restart}>
              <RotateCcw size={17} /> {t("c.ulangi")}
            </Button>
            <Link to="/app/latihan">
              <Button variant="outline">
                <Sparkles size={17} /> {t("nav.latihan")}
              </Button>
            </Link>
          </div>
        </Card>
      ) : word ? (
        <>
          <div style={{ perspective: 1200 }} className="w-full">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="relative block w-full h-72 sm:h-80"
              aria-label="Balik kartu"
            >
              <div
                className="relative w-full h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Depan */}
                <div
                  className="absolute inset-0 rounded-3xl bg-brand text-white grid place-items-center p-6"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="text-center" onClick={(e) => e.stopPropagation()}>
                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4">
                      Kata Arab
                    </p>
                    <ArabicWord text={word.ar} fontSize={54} showTranslit={false} showSlow={false} />
                    <p className="text-white/70 text-sm mt-5">Ketuk kartu untuk melihat arti</p>
                  </div>
                </div>
                {/* Belakang */}
                <div
                  className="absolute inset-0 rounded-3xl bg-surface border border-line grid place-items-center p-6 overflow-y-auto"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="text-center w-full">
                    <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-3">
                      Arti
                    </p>
                    <p className="font-display font-bold text-3xl text-fg">{word.meaning}</p>
                    <p className="arabic text-2xl text-brand mt-3">{word.ar}</p>
                    <p className="latin italic text-fg-subtle text-sm mt-1">{word.translit}</p>
                    {word.example && (
                      <div className="mt-4 text-left">
                        <ExampleBlock {...word.example} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <SpeakerButton text={word.ar} size="lg" label={`Putar ${word.meaning}`} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="danger" size="lg" onClick={() => advance(false)}>
              <ThumbsDown size={18} /> {t("fc.belum")}
            </Button>
            <Button size="lg" onClick={() => advance(true)}>
              <ThumbsUp size={18} /> {t("fc.hafal")}
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

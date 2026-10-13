import { useEffect, useMemo, useState } from "react";
import { RotateCcw, ThumbsDown, ThumbsUp, Sparkles } from "lucide-react";
import { PageHeader } from "../components/layout";
import { WORDS, wordById, type Word } from "../lib/data";
import { ArabicWord, ExampleBlock } from "../components/audio";
import { Button, Card, Chip, ProgressBar, buttonClasses, Ring } from "../components/ui";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export default function Flashcard() {
  const { progress, markKnown, markWeak } = useApp();

  const deck = useMemo<Word[]>(() => {
    const ids = progress.flashcards.length
      ? progress.flashcards
      : WORDS.slice(0, 10).map((w) => w.id);
    return ids.map(wordById).filter(Boolean) as Word[];
  }, [progress.flashcards]);

  const [order, setOrder] = useState<string[]>(() => deck.map((w) => w.id));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<string[]>([]);
  const [again, setAgain] = useState<string[]>([]);

  // sinkronkan order bila deck berubah
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

  function advance(knownIt: boolean) {
    if (!word) return;
    if (knownIt) {
      setKnown((k) => [...k, word.id]);
      markKnown(word.id);
    } else {
      setAgain((a) => [...a, word.id]);
      markWeak(word.id);
      setOrder((o) => [...o.filter((x) => x !== word.id), word.id]); // ulangi di akhir
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

  const finished = total > 0 && reviewed >= total;

  return (
    <div className="animate-fade-up max-w-2xl mx-auto">
      <PageHeader
        title="Flashcard"
        subtitle="Hafalkan kosakata dengan pengulangan berjeda (SRS). Ketuk kartu untuk membalik."
      />

      <div className="flex items-center gap-3 mb-4">
        <ProgressBar value={pct} height={8} />
        <span className="text-sm font-bold text-fg shrink-0">
          {reviewed}/{total}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        <Chip tone="success">✓ Hafal: {known.length}</Chip>
        <Chip tone="coral">↻ Ulangi: {again.length}</Chip>
        <Chip tone="brand">{progress.flashcards.length ? "Deck milikmu" : "Deck dasar"}</Chip>
      </div>

      {finished ? (
        <Card className="p-8 text-center">
          <div className="flex justify-center">
            <Ring value={100} size={120} stroke={10}>
              <span className="text-3xl">🎉</span>
            </Ring>
          </div>
          <h2 className="font-display font-bold text-2xl text-fg mt-5">Deck selesai!</h2>
          <p className="text-fg-muted mt-2">
            {known.length} kata dihafal, {again.length} kata perlu diulang.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={restart}>
              <RotateCcw size={17} /> Ulangi deck
            </Button>
            <a href="/app/latihan" className={buttonClasses("outline", "md")}>
              <Sparkles size={17} /> Latihan lain
            </a>
          </div>
        </Card>
      ) : word ? (
        <>
          {/* Kartu 3D */}
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
                  className="absolute inset-0 rounded-3xl bg-surface border border-line grid place-items-center p-6"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="text-center w-full">
                    <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-3">Arti</p>
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

          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="danger" size="lg" onClick={() => advance(false)}>
              <ThumbsDown size={18} /> Belum hafal
            </Button>
            <Button size="lg" onClick={() => advance(true)}>
              <ThumbsUp size={18} /> Sudah hafal
            </Button>
          </div>
        </>
      ) : (
        <Card className="p-8 text-center text-fg-muted">Deck kosong.</Card>
      )}
    </div>
  );
}

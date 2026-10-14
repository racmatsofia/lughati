import { useMemo, useState } from "react";
import { ChevronRight, Clock, Heart, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { PageHeader } from "../components/layout";
import { WORDS, relatedFor, type Word, type WordType } from "../lib/data";
import { ArabicWord, ExampleBlock, SpeakerButton } from "../components/audio";
import { Button, Card, Chip, EmptyState, Modal } from "../components/ui";
import { useApp } from "../lib/store";
import { useT } from "../lib/i18n";
import { cn } from "../lib/utils";

type FilterKey = WordType | "semua" | "favorit";

const filters: { key: FilterKey; label: string }[] = [
  { key: "semua", label: "Semua" },
  { key: "isim", label: "Isim" },
  { key: "fi'il", label: "Fi'il" },
  { key: "harf", label: "Harf" },
  { key: "frasa", label: "Frasa" },
  { key: "angka", label: "Angka" },
];

const POPULAR = ["kitab", "usrah", "maa", "bait", "syukran", "madrasah"];

export default function Kamus() {
  const t = useT();
  const { progress, toggleFavorite, addFlashcard, addSearch } = useApp();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterKey>("semua");
  const [selected, setSelected] = useState<Word>(WORDS[0]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toast, setToast] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return WORDS.filter((w) => {
      const okFilter =
        filter === "semua"
          ? true
          : filter === "favorit"
            ? progress.favorites.includes(w.id)
            : w.type === filter;
      if (!okFilter) return false;
      if (!q) return true;
      return (
        w.ar.includes(query.trim()) ||
        w.translit.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q)
      );
    });
  }, [query, filter, progress.favorites]);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 1800);
  }

  const isEmptySearch = !query.trim() && filter === "semua";

  const detail = (w: Word) => {
    const rel = relatedFor(w.id);
    return (
      <div>
        <div className="flex items-start justify-between">
          <p className="text-xs font-bold uppercase tracking-wider text-fg-muted">Kata</p>
          <button
            onClick={() => toggleFavorite(w.id)}
            className={cn(
              "grid place-items-center w-10 h-10 rounded-full transition",
              progress.favorites.includes(w.id)
                ? "bg-coral-soft text-coral"
                : "bg-surface-2 text-fg-subtle hover:text-coral",
            )}
            aria-label={t("kamus.favorit")}
          >
            <Heart size={18} fill={progress.favorites.includes(w.id) ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-2">
          <ArabicWord text={w.ar} fontSize={44} showTranslit={false} showSlow />
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="latin italic text-fg-subtle">{w.translit}</span>
          <Chip tone="gold">{typeLabel(w.type)}</Chip>
        </div>

        <p className="font-display font-bold text-2xl text-fg mt-4">{w.meaning}</p>

        {w.example && (
          <div className="mt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">
              {t("kamus.contoh")}
            </p>
            <ExampleBlock {...w.example} />
          </div>
        )}

        {(rel.syn?.length || rel.ant?.length) && (
          <div className="mt-5">
            {rel.syn?.length ? (
              <div className="mb-3">
                <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">
                  {t("kamus.sinonim")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {rel.syn.map(([ar, note]) => (
                    <span
                      key={ar}
                      className="inline-flex items-center gap-2 rounded-full bg-bg-alt dark:bg-surface-2 px-3 py-1.5"
                    >
                      <span className="arabic text-lg text-fg">{ar}</span>
                      <span className="latin text-xs italic text-fg-subtle">{note}</span>
                      <SpeakerButton text={ar} size="sm" tone="ghost" />
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {rel.ant?.length ? (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mb-2">
                  {t("kamus.antonim")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {rel.ant.map(([ar, note]) => (
                    <span
                      key={ar}
                      className="inline-flex items-center gap-2 rounded-full bg-coral-soft dark:bg-coral/20 px-3 py-1.5"
                    >
                      <span className="arabic text-lg text-fg">{ar}</span>
                      <span className="latin text-xs italic text-fg-subtle">{note}</span>
                      <SpeakerButton text={ar} size="sm" tone="ghost" />
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip tone="neutral">Tema: {w.theme}</Chip>
          <Chip tone="neutral">Level A1</Chip>
        </div>

        <Button
          className="w-full mt-6"
          onClick={() => {
            addFlashcard(w.id);
            showToast("Ditambahkan ke Flashcard ✓");
          }}
        >
          <Plus size={18} /> {t("kamus.tambahFlashcard")}
        </Button>
      </div>
    );
  };

  return (
    <div className="animate-fade-up">
      <PageHeader title={t("kamus.title")} subtitle={t("kamus.sub")} />

      {/* Pencarian */}
      <form
        className="flex gap-2.5"
        onSubmit={(e) => {
          e.preventDefault();
          addSearch(query);
        }}
      >
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("kamus.cari")}
            className="w-full rounded-2xl border border-line bg-surface pl-11 pr-4 py-3.5 text-fg placeholder:text-fg-subtle focus:border-brand focus:ring-4 focus:ring-brand/15 outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-fg-subtle"
              aria-label={t("c.tutup")}
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="grid place-items-center w-12 rounded-2xl border border-line bg-surface text-fg-muted">
          <SlidersHorizontal size={18} />
        </div>
      </form>

      {/* Riwayat & populer */}
      {isEmptySearch && (
        <div className="mt-4 space-y-3">
          {progress.searchHistory.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-fg-subtle">
                <Clock size={13} /> {t("kamus.riwayat")}:
              </span>
              {progress.searchHistory.map((h) => (
                <button
                  key={h}
                  onClick={() => setQuery(h)}
                  className="rounded-full bg-surface-2 px-3 py-1.5 text-xs font-bold text-fg-muted hover:text-brand"
                >
                  {h}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-fg-subtle">{t("kamus.populer")}:</span>
            {POPULAR.map((id) => {
              const w = WORDS.find((x) => x.id === id)!;
              return (
                <button
                  key={id}
                  onClick={() => {
                    setSelected(w);
                    setQuery(w.meaning);
                  }}
                  className="rounded-full bg-brand-light dark:bg-brand/20 px-3 py-1.5 text-xs font-bold text-brand-dark dark:text-white hover:bg-brand-soft"
                >
                  {w.meaning}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {filters.map((f) => (
          <FilterChip key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </FilterChip>
        ))}
        <FilterChip
          active={filter === "favorit"}
          onClick={() => setFilter("favorit")}
          tone="coral"
        >
          <Heart size={13} fill={filter === "favorit" ? "currentColor" : "none"} /> {t("kamus.favorit")}
          {progress.favorites.length > 0 && ` (${progress.favorites.length})`}
        </FilterChip>
      </div>

      <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mt-5 mb-3">
        {t("kamus.ditemukan", { n: results.length })}
      </p>

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-5">
        <div className="space-y-2.5 min-w-0">
          {results.length === 0 && (
            <Card>
              <EmptyState
                title={t("kamus.tidakDitemukan")}
                desc={filter === "favorit" ? "Ketuk ikon hati pada kata untuk menyimpannya di sini." : t("kamus.tidakDitemukanDesc")}
                emoji={filter === "favorit" ? "🤍" : "🐪"}
              />
            </Card>
          )}
          {results.map((w) => {
            const isSel = selected.id === w.id;
            return (
              <button
                key={w.id}
                onClick={() => {
                  setSelected(w);
                  if (window.innerWidth < 1024) setMobileOpen(true);
                }}
                className={cn(
                  "w-full flex items-center gap-3 rounded-3xl border-2 p-4 text-left transition",
                  isSel
                    ? "border-brand bg-brand-light/50 dark:bg-brand/10"
                    : "border-line bg-surface hover:border-brand/50",
                )}
              >
                <div className="flex-1 min-w-0">
                  <p className="arabic text-2xl text-fg">{w.ar}</p>
                  <p className="text-sm text-fg-muted truncate">
                    {w.meaning} · {typeLabel(w.type)}
                  </p>
                </div>
                {progress.favorites.includes(w.id) && <Heart size={15} className="text-coral" fill="currentColor" />}
                <SpeakerButton text={w.ar} size="sm" tone="soft" />
                <ChevronRight size={18} className="text-fg-subtle" />
              </button>
            );
          })}
        </div>

        <Card className="hidden lg:block p-6 sticky top-6 h-fit min-w-0">
          {detail(selected)}
        </Card>
      </div>

      <Modal open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="lg:hidden">{detail(selected)}</div>
      </Modal>

      {toast && (
        <div className="fixed bottom-24 lg:bottom-8 left-1/2 -translate-x-1/2 z-50 rounded-full bg-fg text-bg px-5 py-3 text-sm font-bold shadow-lg animate-fade-up">
          {toast}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
  tone = "brand",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  tone?: "brand" | "coral";
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold transition",
        active
          ? tone === "coral"
            ? "bg-coral text-white"
            : "bg-brand text-white"
          : "bg-surface border border-line text-fg-muted hover:border-brand",
      )}
    >
      {children}
    </button>
  );
}

function typeLabel(t: WordType) {
  return {
    isim: "isim · kata benda",
    "fi'il": "fi'il · kata kerja",
    harf: "harf · kata tugas",
    hijaiyah: "hijaiyah",
    frasa: "frasa",
    angka: "angka",
  }[t];
}

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { Volume2, RotateCcw, Snail } from "lucide-react";
import { cn } from "../lib/utils";
import { hasArabicVoice, speak, speechSupported, stopSpeaking } from "../lib/audio";
import { useApp } from "../lib/store";

/* ------------------------------ useSpeaker ------------------------------ */
export function useSpeaker() {
  const { settings } = useApp();
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => stopSpeaking(), []);

  const play = useCallback(
    (text: string, rateOverride?: number) => {
      const rate = rateOverride ?? settings.rate;
      speak(text, {
        rate,
        onStart: () => setPlaying(true),
        onEnd: () => setPlaying(false),
      });
    },
    [settings.rate],
  );

  const playSlow = useCallback(
    (text: string) => {
      speak(text, { rate: 0.6, onStart: () => setPlaying(true), onEnd: () => setPlaying(false) });
    },
    [],
  );

  return { playing, play, playSlow, supported: speechSupported(), hasArabic: hasArabicVoice() };
}

/* ------------------------------ Waveform -------------------------------- */
export function Waveform({ className }: { className?: string }) {
  const bars = [10, 20, 14, 26, 18, 24, 12, 20, 10];
  return (
    <span className={cn("inline-flex items-end gap-[3px] h-6", className)} aria-hidden>
      {bars.map((h, i) => (
        <span
          key={i}
          className="wave-bar w-[3px] rounded-full bg-current"
          style={{ height: h, animationDelay: `${i * 80}ms` }}
        />
      ))}
    </span>
  );
}

/* ---------------------------- SpeakerButton ----------------------------- */
export function SpeakerButton({
  text,
  size = "md",
  tone = "solid",
  className,
  label,
}: {
  text: string;
  size?: "sm" | "md" | "lg";
  tone?: "solid" | "soft" | "ghost";
  className?: string;
  label?: string;
}) {
  const { playing, play } = useSpeaker();
  const sizes = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };
  const iconSize = { sm: 15, md: 18, lg: 24 };
  const tones = {
    solid: "bg-brand text-white hover:bg-brand-dark shadow-[0_6px_16px_rgb(14_124_123/0.3)]",
    soft: "bg-brand-light text-brand-dark hover:bg-brand-soft dark:bg-brand/25 dark:text-white",
    ghost: "bg-surface-2 text-fg-muted hover:text-brand",
  };
  return (
    <button
      type="button"
      aria-label={label ?? `Putar pengucapan: ${text}`}
      aria-pressed={playing}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        play(text);
      }}
      className={cn(
        "relative inline-grid place-items-center rounded-full transition active:scale-95 shrink-0",
        sizes[size],
        tones[tone],
        className,
      )}
    >
      {playing ? (
        <Waveform className="h-4" />
      ) : (
        <Volume2 size={iconSize[size]} strokeWidth={2.4} />
      )}
    </button>
  );
}

/* ---------------------------- ArabicWord -------------------------------- */
/**
 * Teks Arab yang dapat diklik/tap untuk didengar pengucapannya.
 * Ini adalah interaksi inti Lughati.
 */
export function ArabicWord({
  text,
  translit,
  fontSize = 26,
  showTranslit,
  showSlow = false,
  className,
  disabled,
}: {
  text: string;
  translit?: string;
  fontSize?: number;
  showTranslit?: boolean;
  showSlow?: boolean;
  className?: string;
  disabled?: boolean;
}) {
  const { playing, play, playSlow } = useSpeaker();
  const translitOn = showTranslit ?? true;
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => play(text)}
          aria-label={`Dengarkan: ${text}`}
          disabled={disabled}
          className={cn(
            "arabic rounded-2xl px-3 py-1 font-bold text-fg transition-all duration-200",
            "hover:bg-brand-light/70 dark:hover:bg-brand/20 active:scale-[0.98]",
            playing && "bg-brand-light dark:bg-brand/25 text-brand-dark dark:text-white",
          )}
          style={{ fontSize: `calc(${fontSize}px * var(--arabic-scale, 1))` }}
        >
          {text}
        </button>
        {!disabled && <SpeakerButton text={text} size="md" tone="solid" />}
      </div>
      {play && showSlow && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => playSlow(text)}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand/25 px-3 py-1.5 text-[13px] font-bold text-brand-dark dark:text-white transition hover:bg-brand-soft"
          >
            <Snail size={14} /> 0.75×
          </button>
          <button
            type="button"
            onClick={() => play(text)}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-[13px] font-bold text-fg-muted transition hover:text-brand"
          >
            <RotateCcw size={14} /> Ulangi
          </button>
        </div>
      )}
      {translitOn && translit && (
        <p className="latin text-sm text-fg-subtle italic">{translit}</p>
      )}
    </div>
  );
}

/* --------------------------- SentenceAudio ------------------------------ */
/** Kalimat/bait cerita: klik Arab → dengar. */
export function SentenceAudio({
  ar,
  translit,
  meaning,
  active,
  className,
}: {
  ar: string;
  translit?: string;
  meaning?: string;
  active?: boolean;
  className?: string;
}) {
  const { playing, play } = useSpeaker();
  const { settings } = useApp();
  return (
    <button
      type="button"
      onClick={() => play(ar)}
      className={cn(
        "group w-full text-right rounded-2xl border p-4 transition-all",
        active || playing
          ? "border-brand bg-brand-light/60 dark:bg-brand/15"
          : "border-line bg-surface hover:border-brand/60",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <SpeakerButton text={ar} size="sm" tone="soft" />
        <div className="flex-1">
          <p className="arabic text-fg text-[22px] leading-[2]">{ar}</p>
          {settings.translit && translit && (
            <p className="latin text-[13px] text-fg-subtle italic mt-1 text-left">{translit}</p>
          )}
          {meaning && <p className="text-sm text-fg-muted mt-1 text-left">{meaning}</p>}
        </div>
      </div>
    </button>
  );
}

/* --------------------------- ExampleBlock ------------------------------- */
export function ExampleBlock({ ar, translit, meaning }: { ar: string; translit: string; meaning: string }) {
  const { settings } = useApp();
  return (
    <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="text-right flex-1">
          <p className="arabic text-[20px] text-fg">{ar}</p>
        </div>
        <SpeakerButton text={ar} size="sm" tone="soft" />
      </div>
      {settings.translit && <p className="latin text-[13px] italic text-fg-subtle mt-2">{translit}</p>}
      <p className="text-sm text-fg-muted mt-1">{meaning}</p>
    </div>
  );
}

/* ----------------------------- AudioNote -------------------------------- */
export function AudioNote({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const { supported, hasArabic } = useSpeaker();
  if (!supported) return null;
  return (
    <div className={cn("text-xs text-fg-subtle", className)}>
      <button onClick={() => setOpen((o) => !o)} className="underline decoration-dotted">
        {hasArabic ? "🔊 Audio siap (suara Arab tersedia)" : "🔊 Audio memakai suara bawaan perangkat"}
      </button>
      {open && (
        <p className="mt-2 max-w-md leading-relaxed">
          Lughati memutar pengucapan lewat mesin suara pada perangkatmu. Untuk hasil terbaik,
          pasang paket suara Arab di sistem operasi/browser (Chrome, Edge, atau Safari).
        </p>
      )}
    </div>
  );
}

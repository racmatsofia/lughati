/**
 * Audio engine Lughati.
 * Fitur inti: "klik tulisan Arab → dengar pengucapan".
 * Menggunakan Web Speech API (SpeechSynthesis) dengan suara Arab.
 * Bila suara Arab tidak tersedia di perangkat, sistem memakai suara bawaan
 * (tetap diputar) agar pengguna tetap mendapat umpan balik audio.
 */

let voices: SpeechSynthesisVoice[] = [];

function refreshVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  voices = window.speechSynthesis.getVoices() ?? [];
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export function speechSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

export function hasArabicVoice(): boolean {
  if (!voices.length) refreshVoices();
  return voices.some((v) => v.lang?.toLowerCase().startsWith("ar"));
}

export function pickArabicVoice(): SpeechSynthesisVoice | undefined {
  if (!voices.length) refreshVoices();
  const arabic = voices.filter((v) => v.lang?.toLowerCase().startsWith("ar"));
  if (!arabic.length) return undefined;
  // Prioritaskan suara yang terdengar natural untuk fusha.
  const preferred = arabic.find((v) => /majed|tarik|naayf|hamed|maged|microsoft/i.test(v.name));
  return preferred ?? arabic[0];
}

export type SpeakOptions = {
  rate?: number;
  onStart?: () => void;
  onEnd?: () => void;
};

let currentUtterance: SpeechSynthesisUtterance | null = null;

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
}

export function speak(text: string, opts: SpeakOptions = {}): boolean {
  const { rate = 1, onStart, onEnd } = opts;
  if (!speechSupported()) {
    onEnd?.();
    return false;
  }
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  utterance.rate = rate;
  utterance.pitch = 1;
  utterance.volume = 1;
  const voice = pickArabicVoice();
  if (voice) utterance.voice = voice;

  utterance.onstart = () => onStart?.();
  utterance.onend = () => {
    if (currentUtterance === utterance) currentUtterance = null;
    onEnd?.();
  };
  utterance.onerror = () => {
    if (currentUtterance === utterance) currentUtterance = null;
    onEnd?.();
  };

  currentUtterance = utterance;
  // Sedikit delay membantu sebagian browser mobile.
  window.speechSynthesis.speak(utterance);
  onStart?.();
  return true;
}

/** Deteksi apakah ada huruf Arab pada teks (untuk penentuan arah & font). */
export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

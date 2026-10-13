export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function todayKey(d = new Date()): string {
  return d.toISOString().slice(0, 10);
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function pct(part: number, total: number): number {
  if (!total) return 0;
  return Math.round((part / total) * 100);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("id-ID").format(n);
}

/** Format tanggal relatif sederhana dalam Bahasa Indonesia. */
export function relativeDay(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const diff = Math.round((Date.now() - d.getTime()) / 86400000);
  if (diff <= 0) return "Hari ini";
  if (diff === 1) return "Kemarin";
  if (diff < 7) return `${diff} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

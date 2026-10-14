import { useRef, useState } from "react";
import { Award, Copy, Download, Share2, Sparkles } from "lucide-react";
import { PageHeader } from "../components/layout";
import { Button, Card, Chip } from "../components/ui";
import { Logo } from "../components/brand";
import { ACHIEVEMENTS } from "../lib/data";
import { useApp } from "../lib/store";
import { formatNumber } from "../lib/utils";

export default function Certificate() {
  const { user, progress, level, unlockedBadges } = useApp();
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const issued = new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const code = `LGH-${String(progress.xp).padStart(4, "0")}-${level}${progress.streak}`;

  async function share() {
    const text = `Aku sudah belajar bahasa Arab di Lughati! Level ${level}, ${formatNumber(
      progress.xp,
    )} XP, ${progress.learnedWords.length} kata dikuasai. Bahasa Arab jadi milikku! 🐪`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Lughati — Sertifikat Belajar", text, url: location.origin });
        return;
      } catch {
        /* dibatalkan */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${location.origin}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="animate-fade-up">
      <div className="no-print">
        <PageHeader
          title="Sertifikat"
          subtitle="Bagikan pencapaianmu dan tunjukkan pada dunia bahwa bahasa Arab jadi milikmu."
        />
      </div>

      {/* Sertifikat */}
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-[28px] border-2 border-gold/50 bg-surface p-8 sm:p-12 text-center shadow-soft"
      >
        <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-30" />
        <div className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gold/10" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-brand/10" />

        <div className="relative">
          <div className="flex justify-center">
            <Logo to="/" />
          </div>

          <div className="mt-7">
            <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft dark:bg-gold/20 px-4 py-2 text-xs font-bold uppercase tracking-widest text-gold-dark dark:text-gold">
              <Award size={14} /> Sertifikat Pencapaian
            </span>
          </div>

          <p className="text-fg-muted mt-6">Diberikan kepada</p>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-fg mt-1">
            {user?.name}
          </h1>
          <div className="mx-auto mt-3 h-px w-40 bg-line" />

          <p className="arabic text-brand text-3xl mt-6">لُغَتِي</p>
          <p className="text-fg-muted mt-2 max-w-xl mx-auto leading-relaxed">
            atas ketekunan mempelajari bahasa Arab di Lughati dan telah mencapai
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Metric label="Level" value={String(level)} />
            <Metric label="Total XP" value={formatNumber(progress.xp)} />
            <Metric label="Kata dikuasai" value={String(progress.learnedWords.length)} />
            <Metric label="Hari beruntun" value={String(progress.bestStreak)} />
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {ACHIEVEMENTS.filter((a) => unlockedBadges.includes(a.id))
              .slice(0, 6)
              .map((a) => (
                <span
                  key={a.id}
                  title={a.title}
                  className="grid place-items-center w-11 h-11 rounded-2xl bg-brand-light dark:bg-brand/20 text-xl"
                >
                  {a.emoji}
                </span>
              ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div>
              <p className="text-xs text-fg-subtle">Diterbitkan</p>
              <p className="font-bold text-fg text-sm">{issued}</p>
            </div>
            <div className="text-center">
              <p className="arabic text-xl text-brand">جَزَاكَ اللهُ خَيْرًا</p>
              <p className="text-xs text-fg-subtle">Tim Lughati</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-fg-subtle">Kode verifikasi</p>
              <p className="font-bold text-fg text-sm tracking-wider">{code}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Aksi */}
      <div className="no-print mt-6 flex flex-wrap gap-3">
        <Button onClick={() => window.print()}>
          <Download size={17} /> Unduh / Cetak PDF
        </Button>
        <Button variant="outline" onClick={share}>
          <Share2 size={17} /> Bagikan
        </Button>
        {copied && <Chip tone="success">Tersalin ke clipboard ✓</Chip>}
      </div>

      <Card className="no-print p-5 mt-5">
        <div className="flex items-start gap-3">
          <Sparkles className="text-gold-dark dark:text-gold shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-bold text-fg text-sm">Sertifikat ini berbasis pencapaianmu di Lughati</p>
            <p className="text-sm text-fg-muted mt-1">
              Terus jaga streak dan tambah kosakata — level dan angka di sertifikat akan ikut naik.
              Gunakan tombol Cetak untuk menyimpan sebagai PDF.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-3">
      <p className="font-display font-bold text-xl text-brand">{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}

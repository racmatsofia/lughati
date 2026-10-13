import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Accessibility,
  Bell,
  BookMarked,
  Download,
  Flame,
  Info,
  LogOut,
  RotateCcw,
  Settings2,
  Sparkles,
  Volume2,
  Zap,
} from "lucide-react";
import { PageHeader } from "../components/layout";
import { AvatarPicker } from "../components/Avatar";
import { Button, Card, Chip, Modal, ProgressBar } from "../components/ui";
import { AudioNote } from "../components/audio";
import { useApp } from "../lib/store";
import { cn, formatNumber } from "../lib/utils";

const avatars = ["🙂", "👩‍🎓", "🧑‍🎓", "👨‍🏫", "🧕", "👦", "👧", "🧔", "🐪", "🌟"];

export default function Profile() {
  const { user, progress, level, settings, setSettings, logout, resetProgress } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [installable, setInstallable] = useState(!!(window as any).__lughatiInstall);

  return (
    <div className="animate-fade-up">
      <PageHeader title="Profil & Pengaturan" subtitle="Sesuaikan pengalaman belajarmu." />

      {/* Kartu profil */}
      <Card className="p-6">
        <div className="flex flex-wrap items-center gap-5">
          <span className="grid place-items-center w-20 h-20 rounded-full bg-brand-light dark:bg-brand/25 text-4xl">
            {user?.avatar}
          </span>
          <div className="flex-1 min-w-[200px]">
            <h2 className="font-display font-bold text-2xl text-fg">{user?.name}</h2>
            <p className="text-fg-muted text-sm">{user?.email}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <Chip tone="brand">
                <Sparkles size={14} /> Level {level}
              </Chip>
              <Chip tone="gold">
                <Zap size={14} /> {formatNumber(progress.xp)} XP
              </Chip>
              <Chip tone="coral">
                <Flame size={14} /> {progress.streak} hari
              </Chip>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-fg mb-3">Pilih avatar</p>
          <div className="flex flex-wrap gap-2">
            {avatars.map((a) => (
              <AvatarPicker key={a} emoji={a} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat label="Pelajaran" value={`${progress.completedLessons.length}`} />
          <MiniStat label="Kata" value={`${progress.learnedWords.length}`} />
          <MiniStat label="Akurasi" value={`${progress.accuracy}%`} />
        </div>
      </Card>

      {/* Pengaturan tampilan */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Settings2 size={18} />} title="Tampilan" />
        <div className="space-y-1">
          <Row label="Tema" hint="Terang, gelap, atau ikuti sistem">
            <Segmented
              value={settings.theme}
              onChange={(v) => setSettings({ theme: v as any })}
              options={[
                ["light", "Terang"],
                ["dark", "Gelap"],
                ["system", "Sistem"],
              ]}
            />
          </Row>
          <Toggle
            label="Tampilkan transliterasi"
            hint="Tulisan latin di bawah teks Arab"
            checked={settings.translit}
            onChange={(v) => setSettings({ translit: v })}
          />
          <Toggle
            label="Tampilkan harakat penuh"
            hint="Bantu pemula membaca dengan tepat"
            checked={settings.harakat}
            onChange={(v) => setSettings({ harakat: v })}
          />
        </div>
      </Card>

      {/* Audio */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Volume2 size={18} />} title="Audio" />
        <Row label="Kecepatan audio default" hint="Gunakan 0.75× saat masih pemula">
          <Segmented
            value={String(settings.rate)}
            onChange={(v) => setSettings({ rate: Number(v) })}
            options={[
              ["0.75", "Lambat"],
              ["1", "Normal"],
              ["1.25", "Cepat"],
            ]}
          />
        </Row>
        <div className="mt-4">
          <AudioNote />
        </div>
      </Card>

      {/* Notifikasi & aksesibilitas */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Bell size={18} />} title="Notifikasi & Aksesibilitas" />
        <div className="space-y-1">
          <Toggle
            label="Pengingat belajar harian"
            hint={`Setiap hari pukul ${settings.remindAt}`}
            checked={settings.reminders}
            onChange={(v) => setSettings({ reminders: v })}
          />
          <Row label="Jam pengingat">
            <input
              type="time"
              value={settings.remindAt}
              onChange={(e) => setSettings({ remindAt: e.target.value })}
              className="rounded-xl border border-line bg-bg px-3 py-2 font-bold text-fg"
            />
          </Row>
          <Toggle
            label="Efek suara"
            hint="Bunyi saat menjawab benar atau naik level"
            checked={settings.soundEffects}
            onChange={(v) => setSettings({ soundEffects: v })}
          />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-fg-subtle">
          <Accessibility size={14} /> Lughati mengikuti pengaturan "kurangi gerak" pada perangkatmu.
        </div>
      </Card>

      {/* Offline */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Download size={18} />} title="Mode Offline" />
        <p className="text-sm text-fg-muted mb-4">
          Pasang Lughati sebagai aplikasi & unduh paket pelajaran untuk belajar tanpa internet.
        </p>
        <Button variant="outline" disabled>
          <Download size={17} /> {installable ? "Pasang aplikasi" : "Unduh paket offline"}
        </Button>
        <p className="text-xs text-fg-subtle mt-2">
          Tersedia di Chrome/Edge desktop & Android. Premium membuka semua paket.
        </p>
      </Card>

      {/* Lainnya */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Info size={18} />} title="Lainnya" />
        <div className="flex flex-wrap gap-2">
          <Link to="/tentang" className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-fg-muted hover:text-brand">
            Tentang Lughati
          </Link>
          <Link to="/bantuan" className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-fg-muted hover:text-brand">
            Pusat Bantuan
          </Link>
          <Link to="/harga" className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-fg-muted hover:text-brand">
            Upgrade Premium
          </Link>
          <Link to="/kelas" className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-fg-muted hover:text-brand">
            Dashboard Guru
          </Link>
        </div>
      </Card>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setConfirmReset(true)}>
          <RotateCcw size={17} /> Reset progres
        </Button>
        <Button variant="danger" onClick={logout}>
          <LogOut size={17} /> Keluar
        </Button>
      </div>

      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title="Reset progres?">
        <p className="text-fg-muted">
          Semua XP, streak, dan kata yang dikuasai akan dihapus. Tindakan ini tidak bisa dibatalkan.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setConfirmReset(false)}>
            Batal
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={() => {
              resetProgress();
              setConfirmReset(false);
            }}
          >
            Ya, reset
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="grid place-items-center w-8 h-8 rounded-xl bg-brand-light dark:bg-brand/20 text-brand">
        {icon}
      </span>
      <h3 className="font-display font-bold text-lg text-fg">{title}</h3>
    </div>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <div>
        <p className="font-bold text-fg text-sm">{label}</p>
        {hint && <p className="text-xs text-fg-muted">{hint}</p>}
      </div>
      {children}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <div>
        <p className="font-bold text-fg text-sm">{label}</p>
        {hint && <p className="text-xs text-fg-muted">{hint}</p>}
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative w-12 h-7 rounded-full transition shrink-0",
          checked ? "bg-brand" : "bg-surface-2",
        )}
      >
        <span
          className={cn(
            "absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all",
            checked ? "left-6" : "left-1",
          )}
        />
      </button>
    </div>
  );
}

function Segmented({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="inline-flex rounded-full bg-surface-2 p-1">
      {options.map(([v, label]) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-sm font-bold transition",
            value === v ? "bg-brand text-white" : "text-fg-muted",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-3 text-center">
      <p className="font-display font-bold text-xl text-fg">{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ArrowLeft, Download, Plus, Users } from "lucide-react";
import { Logo, ThemeToggle } from "../components/brand";
import { Button, Card, Chip, ProgressBar } from "../components/ui";
import { CLASS_STUDENTS, MODULES } from "../lib/data";
import { formatNumber } from "../lib/utils";

export default function Teacher() {
  const avg =
    Math.round(CLASS_STUDENTS.reduce((s, x) => s + x.progress, 0) / CLASS_STUDENTS.length);

  function exportCsv() {
    const rows = [
      ["Nama", "XP", "Progres"],
      ...CLASS_STUDENTS.map((s) => [s.name, String(s.xp), `${s.progress}%`]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lughati-kelas.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo to="/" />
            <Chip tone="brand">Dashboard Guru</Chip>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link to="/app/belajar" className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-brand">
              <ArrowLeft size={16} /> Ke Aplikasi Siswa
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-fg">Kelas Bahasa Arab 10-A</h1>
            <p className="text-fg-muted mt-1">
              Kode kelas: <span className="font-bold text-brand">LGH-10A</span> · {CLASS_STUDENTS.length} siswa
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}>
              <Download size={17} /> Ekspor CSV
            </Button>
            <Button>
              <Plus size={17} /> Undang siswa
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat icon={<Users size={18} />} label="Total siswa" value={`${CLASS_STUDENTS.length}`} />
          <Stat icon="📊" label="Rata-rata progres" value={`${avg}%`} />
          <Stat icon="⚡" label="Total XP kelas" value={formatNumber(CLASS_STUDENTS.reduce((s, x) => s + x.xp, 0))} />
          <Stat icon="🔥" label="Aktif hari ini" value={`${Math.round(CLASS_STUDENTS.length * 0.7)}`} />
        </div>

        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5 mt-6">
          <Card className="p-6">
            <h2 className="font-display font-bold text-lg text-fg mb-4">Progres siswa</h2>
            <div className="space-y-4">
              {CLASS_STUDENTS.map((s) => (
                <div key={s.name} className="flex items-center gap-4">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-light dark:bg-brand/20 text-xl shrink-0">
                    {s.avatar}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-fg text-sm truncate">{s.name}</span>
                      <span className="text-xs text-fg-muted">{formatNumber(s.xp)} XP</span>
                    </div>
                    <ProgressBar value={s.progress} height={7} tone={s.progress >= 60 ? "brand" : "gold"} />
                  </div>
                  <span className="text-sm font-bold text-fg w-10 text-right">{s.progress}%</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-5">
            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-4">Tugas aktif</h2>
              <div className="space-y-3">
                {MODULES.slice(0, 3).map((m) => (
                  <div key={m.id} className="flex items-center gap-3 rounded-2xl bg-bg-alt dark:bg-surface-2 p-3">
                    <span className="text-xl">{m.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-fg text-sm truncate">{m.title}</p>
                      <p className="text-xs text-fg-muted">{m.lessons.length} pelajaran</p>
                    </div>
                    <Chip tone="success">Aktif</Chip>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-3">Kata tersulit di kelas</h2>
              <ul className="space-y-2 text-sm">
                {[
                  ["مَدْرَسَة", "madrasah", 12],
                  ["مُدَرِّس", "mudarris", 9],
                  ["اِسْتَمَعَ", "istama'a", 8],
                ].map(([ar, tr, n]) => (
                  <li key={ar as string} className="flex items-center gap-3">
                    <span className="arabic text-xl text-fg">{ar}</span>
                    <span className="latin italic text-fg-subtle flex-1">{tr}</span>
                    <Chip tone="coral">{n}× salah</Chip>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card className="p-5">
      <span className="grid place-items-center w-10 h-10 rounded-2xl bg-brand-light dark:bg-brand/20 text-brand">
        {icon}
      </span>
      <p className="font-display font-bold text-2xl text-fg mt-3">{value}</p>
      <p className="text-sm text-fg-muted">{label}</p>
    </Card>
  );
}

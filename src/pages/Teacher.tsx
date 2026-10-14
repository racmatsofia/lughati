import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  BookOpen,
  ChevronRight,
  ClipboardList,
  Download,
  FileText,
  LayoutGrid,
  Plus,
  Settings2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { Logo, ThemeToggle } from "../components/brand";
import { Button, Card, Chip, Modal, ProgressBar, Segmented } from "../components/ui";
import { SpeakerButton } from "../components/audio";
import { CLASS_STUDENTS, MODULES, WORDS } from "../lib/data";
import { cn, formatNumber } from "../lib/utils";

type Tab = "kelas" | "tugas" | "progres" | "laporan" | "pengaturan";

const tabs: { key: Tab; label: string; icon: any }[] = [
  { key: "kelas", label: "Kelas", icon: LayoutGrid },
  { key: "tugas", label: "Tugas", icon: ClipboardList },
  { key: "progres", label: "Progres", icon: BarChart3 },
  { key: "laporan", label: "Laporan", icon: FileText },
  { key: "pengaturan", label: "Pengaturan", icon: Settings2 },
];

const HARDEST = [
  { ar: "مَدْرَسَة", tr: "madrasah", meaning: "sekolah", wrong: 12 },
  { ar: "مُدَرِّس", tr: "mudarris", meaning: "guru", wrong: 9 },
  { ar: "اِسْتَمَعَ", tr: "istama'a", meaning: "mendengarkan", wrong: 8 },
  { ar: "كِتَاب", tr: "kitaab", meaning: "buku", wrong: 7 },
  { ar: "بَيْت", tr: "bait", meaning: "rumah", wrong: 6 },
];

type Assignment = { id: number; module: string; due: string; done: number; total: number };

export default function Teacher() {
  const [tab, setTab] = useState<Tab>("kelas");
  const [students, setStudents] = useState(CLASS_STUDENTS);
  const [className, setClassName] = useState("Kelas Bahasa Arab 10-A");
  const [code, setCode] = useState("LGH-10A");
  const [detail, setDetail] = useState<(typeof CLASS_STUDENTS)[number] | null>(null);
  const [assignOpen, setAssignOpen] = useState(false);
  const [newModule, setNewModule] = useState(MODULES[1].title);
  const [newDue, setNewDue] = useState("2025-12-31");
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, module: MODULES[0].title, due: "2025-10-20", done: 22, total: 30 },
    { id: 2, module: MODULES[1].title, due: "2025-10-27", done: 11, total: 30 },
    { id: 3, module: MODULES[2].title, due: "2025-11-03", done: 4, total: 30 },
  ]);
  const [inviteOpen, setInviteOpen] = useState(false);

  const avg = Math.round(students.reduce((s, x) => s + x.progress, 0) / students.length);
  const totalXp = students.reduce((s, x) => s + x.xp, 0);
  const totalWords = useMemo(() => students.reduce((s, x) => s + Math.round(x.progress * 1.6), 0), [students]);

  function exportCsv() {
    const rows = [
      ["Nama", "XP", "Progres", "Status"],
      ...students.map((s) => [s.name, String(s.xp), `${s.progress}%`, s.progress >= 60 ? "Baik" : "Perlu bimbingan"]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lughati-kelas.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function addAssignment() {
    setAssignments((list) => [
      { id: Date.now(), module: newModule, due: newDue, done: 0, total: students.length },
      ...list,
    ]);
    setAssignOpen(false);
  }

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-line bg-surface sticky top-0 z-30">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo to="/" />
            <Chip tone="brand">Dashboard Guru</Chip>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/app/belajar"
              className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-brand"
            >
              <ArrowLeft size={16} /> <span className="hidden sm:inline">Ke Aplikasi Siswa</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display font-bold text-2xl sm:text-3xl text-fg">{className}</h1>
            <p className="text-fg-muted mt-1">
              Kode kelas: <span className="font-bold text-brand">{code}</span> · {students.length} siswa
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportCsv}>
              <Download size={17} /> Ekspor CSV
            </Button>
            <Button onClick={() => setInviteOpen(true)}>
              <Plus size={17} /> Undang Siswa
            </Button>
          </div>
        </div>

        {/* Sub-nav */}
        <nav className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
          {tabs.map((tb) => (
            <button
              key={tb.key}
              onClick={() => setTab(tb.key)}
              className={cn(
                "inline-flex items-center gap-2 shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition",
                tab === tb.key ? "bg-brand text-white" : "bg-surface border border-line text-fg-muted hover:border-brand",
              )}
            >
              <tb.icon size={16} /> {tb.label}
            </button>
          ))}
        </nav>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Stat icon={<Users size={18} />} label="Siswa aktif" value={String(students.length)} tone="brand" />
          <Stat icon={<TrendingUp size={18} />} label="Rata-rata nilai" value={`${avg}%`} tone="gold" />
          <Stat icon={<ClipboardList size={18} />} label="Tugas aktif" value={String(assignments.length)} tone="coral" />
          <Stat icon={<BookOpen size={18} />} label="Kata dikuasai" value={formatNumber(totalWords)} tone="brand" />
        </div>

        {/* ============================ KELAS ============================ */}
        {tab === "kelas" && (
          <div className="grid lg:grid-cols-[1.6fr_1fr] gap-5">
            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-4">Daftar Siswa</h2>
              <div className="space-y-3">
                {students.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setDetail(s)}
                    className="w-full flex items-center gap-4 rounded-2xl p-2 hover:bg-bg-alt dark:hover:bg-surface-2 transition text-left"
                  >
                    <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-light dark:bg-brand/20 text-xl shrink-0">
                      {s.avatar}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="flex items-center justify-between mb-1">
                        <span className="font-bold text-fg text-sm truncate">{s.name}</span>
                        <span className="text-xs text-fg-muted ml-3 shrink-0">
                          {s.progress}% · {formatNumber(s.xp)} XP
                        </span>
                      </span>
                      <ProgressBar value={s.progress} height={7} tone={s.progress >= 60 ? "brand" : "gold"} />
                    </span>
                    <ChevronRight size={18} className="text-fg-subtle shrink-0" />
                  </button>
                ))}
              </div>
            </Card>

            <div className="space-y-5">
              <Card className="p-6">
                <h2 className="font-display font-bold text-lg text-fg mb-4">Kata paling sering salah</h2>
                <ul className="space-y-3">
                  {HARDEST.map((h) => (
                    <li key={h.ar} className="flex items-center gap-3">
                      <SpeakerButton text={h.ar} size="sm" tone="soft" />
                      <span className="arabic text-xl text-fg">{h.ar}</span>
                      <span className="latin italic text-fg-subtle text-xs flex-1 truncate">
                        {h.meaning}
                      </span>
                      <Chip tone="coral">{h.wrong}×</Chip>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 bg-brand text-white border-transparent">
                <h3 className="font-display font-bold text-lg">Laporan Mingguan</h3>
                <p className="text-white/85 text-sm mt-2">
                  240 pelajaran selesai minggu ini · <span className="font-bold">+12%</span> dari minggu lalu.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 !bg-white !text-brand !border-transparent hover:!bg-white/90"
                  onClick={exportCsv}
                >
                  <Download size={16} /> Ekspor CSV
                </Button>
              </Card>
            </div>
          </div>
        )}

        {/* ============================ TUGAS ============================ */}
        {tab === "tugas" && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display font-bold text-lg text-fg">Daftar Tugas</h2>
              <Button size="sm" onClick={() => setAssignOpen(true)}>
                <Plus size={16} /> Buat tugas
              </Button>
            </div>
            <div className="space-y-3">
              {assignments.map((a) => (
                <div key={a.id} className="rounded-2xl border border-line p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-fg truncate">{a.module}</p>
                      <p className="text-xs text-fg-muted">Tenggat {a.due}</p>
                    </div>
                    <Chip tone={a.done === a.total ? "success" : "brand"}>
                      {a.done}/{a.total} selesai
                    </Chip>
                  </div>
                  <ProgressBar value={(a.done / a.total) * 100} height={7} className="mt-3" />
                </div>
              ))}
              {assignments.length === 0 && (
                <p className="text-fg-muted text-sm">Belum ada tugas. Buat tugas pertama untuk kelasmu.</p>
              )}
            </div>
          </Card>
        )}

        {/* =========================== PROGRES =========================== */}
        {tab === "progres" && (
          <div className="grid lg:grid-cols-2 gap-5">
            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-4">Distribusi nilai</h2>
              <div className="space-y-4">
                {[
                  { label: "Sangat baik (≥85)", n: students.filter((s) => s.progress >= 85).length, tone: "success" as const },
                  { label: "Baik (70–84)", n: students.filter((s) => s.progress >= 70 && s.progress < 85).length, tone: "brand" as const },
                  { label: "Cukup (55–69)", n: students.filter((s) => s.progress >= 55 && s.progress < 70).length, tone: "gold" as const },
                  { label: "Perlu bimbingan (<55)", n: students.filter((s) => s.progress < 55).length, tone: "coral" as const },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="font-bold text-fg">{row.label}</span>
                      <span className="text-fg-muted">{row.n} siswa</span>
                    </div>
                    <ProgressBar
                      value={(row.n / students.length) * 100}
                      height={9}
                      tone={row.tone === "success" ? "brand" : row.tone}
                    />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-4">Peringkat kelas</h2>
              <ol className="space-y-3">
                {[...students]
                  .sort((a, b) => b.xp - a.xp)
                  .map((s, i) => (
                    <li key={s.name} className="flex items-center gap-3">
                      <span className={cn("w-6 text-center font-bold", i < 3 ? "text-gold-dark dark:text-gold" : "text-fg-subtle")}>
                        {i + 1}
                      </span>
                      <span className="text-xl">{s.avatar}</span>
                      <span className="flex-1 font-bold text-fg text-sm truncate">{s.name}</span>
                      <span className="font-bold text-fg-muted text-sm">{formatNumber(s.xp)} XP</span>
                    </li>
                  ))}
              </ol>
            </Card>
          </div>
        )}

        {/* =========================== LAPORAN =========================== */}
        {tab === "laporan" && (
          <div className="space-y-5">
            <Card className="p-6">
              <h2 className="font-display font-bold text-lg text-fg mb-4">Ringkasan minggu ini</h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MiniStat label="Pelajaran selesai" value="240" />
                <MiniStat label="Rata-rata XP" value={formatNumber(Math.round(totalXp / students.length))} />
                <MiniStat label="Kehadiran" value="92%" />
                <MiniStat label="Perubahan" value="+12%" />
              </div>
              <div className="mt-6 flex justify-center">
                <Button onClick={exportCsv}>
                  <Download size={17} /> Unduh laporan (CSV)
                </Button>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="font-display font-bold text-lg text-fg mb-3">Rekomendasi</h3>
              <ul className="space-y-2 text-sm text-fg-muted list-disc pl-5">
                <li>Latih ulang kata <span className="arabic text-fg">مَدْرَسَة</span> untuk seluruh kelas.</li>
                <li>Beri tugas tambahan pada modul {MODULES[2].title} bagi 2 siswa dengan progres &lt; 45%.</li>
                <li>Adakan sesi tanya-jawab latihan mendengar (skor rata-rata 68%).</li>
              </ul>
            </Card>
          </div>
        )}

        {/* ========================= PENGATURAN ========================= */}
        {tab === "pengaturan" && (
          <Card className="p-6">
            <h2 className="font-display font-bold text-lg text-fg mb-5">Pengaturan kelas</h2>
            <label className="block mb-4">
              <span className="block text-sm font-bold text-fg mb-1.5">Nama kelas</span>
              <input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full max-w-md rounded-2xl border border-line bg-bg px-4 py-3 text-fg outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
              />
            </label>
            <label className="block mb-4">
              <span className="block text-sm font-bold text-fg mb-1.5">Kode kelas</span>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full max-w-xs rounded-2xl border border-line bg-bg px-4 py-3 font-bold tracking-wider text-fg outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
              />
            </label>
            <div className="mb-4">
              <span className="block text-sm font-bold text-fg mb-2">Modul aktif</span>
              <div className="flex flex-wrap gap-2">
                {MODULES.slice(0, 5).map((m) => (
                  <Chip key={m.id} tone="brand">
                    {m.emoji} {m.title}
                  </Chip>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between max-w-md py-3 border-t border-line">
              <span className="text-sm font-bold text-fg">Reset peringkat mingguan</span>
              <Segmented
                value="senin"
                onChange={() => {}}
                options={[
                  ["senin", "Senin"],
                  ["minggu", "Minggu"],
                ]}
              />
            </div>
          </Card>
        )}
      </main>

      {/* Detail siswa */}
      <Modal open={!!detail} onClose={() => setDetail(null)}>
        {detail && (
          <div>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid place-items-center w-14 h-14 rounded-full bg-brand-light dark:bg-brand/20 text-2xl">
                  {detail.avatar}
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl text-fg">{detail.name}</h3>
                  <p className="text-sm text-fg-muted">
                    {detail.progress}% · {formatNumber(detail.xp)} XP
                  </p>
                </div>
              </div>
              <button onClick={() => setDetail(null)} className="text-fg-subtle hover:text-fg" aria-label="Tutup">
                <X size={20} />
              </button>
            </div>

            <ProgressBar value={detail.progress} height={9} className="mt-5" />

            <div className="grid grid-cols-3 gap-3 mt-5">
              <MiniStat label="Pelajaran" value={String(Math.round(detail.progress / 10))} />
              <MiniStat label="Kata" value={String(Math.round(detail.progress * 2.2))} />
              <MiniStat label="Streak" value={`${Math.round(detail.progress / 7)} 🔥`} />
            </div>

            <p className="text-xs font-bold uppercase tracking-wider text-fg-muted mt-5 mb-2">
              Kata yang perlu dibantu
            </p>
            <div className="space-y-2">
              {HARDEST.slice(0, 3).map((h) => (
                <div key={h.ar} className="flex items-center gap-3 rounded-2xl bg-bg-alt dark:bg-surface-2 p-3">
                  <SpeakerButton text={h.ar} size="sm" tone="soft" />
                  <span className="arabic text-lg text-fg">{h.ar}</span>
                  <span className="text-xs text-fg-muted flex-1">{h.meaning}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDetail(null)}>
                Tutup
              </Button>
              <Button className="flex-1" onClick={() => setDetail(null)}>
                Kirim pesan
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Buat tugas */}
      <Modal open={assignOpen} onClose={() => setAssignOpen(false)} title="Buat tugas baru">
        <label className="block mb-4">
          <span className="block text-sm font-bold text-fg mb-1.5">Modul</span>
          <select
            value={newModule}
            onChange={(e) => setNewModule(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg outline-none focus:border-brand"
          >
            {MODULES.map((m) => (
              <option key={m.id} value={m.title}>
                {m.emoji} {m.title}
              </option>
            ))}
          </select>
        </label>
        <label className="block mb-4">
          <span className="block text-sm font-bold text-fg mb-1.5">Tenggat</span>
          <input
            type="date"
            value={newDue}
            onChange={(e) => setNewDue(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg outline-none focus:border-brand"
          />
        </label>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setAssignOpen(false)}>
            Batal
          </Button>
          <Button className="flex-1" onClick={addAssignment}>
            <Plus size={16} /> Tetapkan
          </Button>
        </div>
      </Modal>

      {/* Undang siswa */}
      <Modal open={inviteOpen} onClose={() => setInviteOpen(false)} title="Undang siswa">
        <p className="text-fg-muted text-sm">
          Bagikan kode kelas ini. Siswa dapat bergabung dari menu Profil → Kelas.
        </p>
        <div className="mt-4 rounded-2xl bg-bg-alt dark:bg-surface-2 p-5 text-center">
          <p className="font-display font-bold text-3xl tracking-widest text-brand">{code}</p>
          <p className="text-xs text-fg-muted mt-1">lughati.lughati.workers.dev/kelas</p>
        </div>
        <Button
          className="w-full mt-4"
          onClick={() => {
            navigator.clipboard?.writeText(`https://lughati.lughati.workers.dev/kelas · Kode: ${code}`);
            setInviteOpen(false);
          }}
        >
          Salin tautan undangan
        </Button>
      </Modal>
    </div>
  );
}

function Stat({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "brand" | "gold" | "coral";
}) {
  const tones = {
    brand: "bg-brand-light dark:bg-brand/20 text-brand",
    gold: "bg-gold-soft dark:bg-gold/15 text-gold-dark dark:text-gold",
    coral: "bg-coral-soft dark:bg-coral/20 text-coral",
  };
  return (
    <Card className="p-5">
      <span className={cn("grid place-items-center w-10 h-10 rounded-2xl", tones[tone])}>{icon}</span>
      <p className="font-display font-bold text-2xl text-fg mt-3">{value}</p>
      <p className="text-sm text-fg-muted">{label}</p>
    </Card>
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Clock, Target, Bell, GraduationCap } from "lucide-react";
import { Logo, Mascot, ThemeToggle } from "../components/brand";
import { Button, ProgressBar } from "../components/ui";
import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

const goals = [
  { key: "ibadah", label: "Ibadah & Al-Qur'an", emoji: "🕌" },
  { key: "kerja", label: "Pekerjaan", emoji: "💼" },
  { key: "sekolah", label: "Sekolah/Kuliah", emoji: "🎓" },
  { key: "travel", label: "Bepergian", emoji: "✈️" },
  { key: "umum", label: "Minat umum", emoji: "🌟" },
];

const levels = [
  { key: "nol", label: "Belum bisa baca huruf Arab", desc: "Mulai dari Hijaiyah", emoji: "🌱" },
  { key: "baca", label: "Bisa baca, belum paham arti", desc: "Fokus kosakata", emoji: "📖" },
  { key: "dasar", label: "Sudah paham dasar", desc: "Lanjut ke percakapan", emoji: "🚀" },
];

const durations = [5, 10, 15, 20];

export default function Onboarding() {
  const { completeOnboarding, user } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["ibadah"]);
  const [level, setLevel] = useState("nol");
  const [minutes, setMinutes] = useState(10);
  const [reminder, setReminder] = useState(true);
  const [time, setTime] = useState("19:30");

  const total = 4;
  const progress = ((step + 1) / total) * 100;

  function toggleGoal(key: string) {
    setSelectedGoals((g) => (g.includes(key) ? g.filter((x) => x !== key) : [...g, key]));
  }

  function finish() {
    completeOnboarding({ goals: selectedGoals, dailyMinutes: minutes });
    navigate("/app/belajar", { replace: true });
  }

  const canNext = step === 0 ? selectedGoals.length > 0 : true;

  return (
    <div className="min-h-dvh bg-bg flex flex-col">
      <header className="flex items-center justify-between p-5 max-w-3xl w-full mx-auto">
        <Logo to="/" />
        <div className="flex items-center gap-3">
          <span className="text-sm text-fg-muted font-bold">
            Langkah {step + 1}/{total}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-3xl w-full mx-auto px-5">
        <ProgressBar value={progress} height={8} />
      </div>

      <main className="flex-1 max-w-3xl w-full mx-auto px-5 py-8 sm:py-12">
        <div key={step} className="animate-fade-up">
          {step === 0 && (
            <StepShell icon={Target} title="Apa tujuanmu belajar bahasa Arab?" subtitle="Pilih satu atau lebih — kami sesuaikan materinya.">
              <div className="grid sm:grid-cols-2 gap-3">
                {goals.map((g) => {
                  const active = selectedGoals.includes(g.key);
                  return (
                    <button
                      key={g.key}
                      onClick={() => toggleGoal(g.key)}
                      className={cn(
                        "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition",
                        active
                          ? "border-brand bg-brand-light/60 dark:bg-brand/15"
                          : "border-line bg-surface hover:border-brand/50",
                      )}
                    >
                      <span className="text-2xl">{g.emoji}</span>
                      <span className="font-bold text-fg flex-1">{g.label}</span>
                      {active && (
                        <span className="grid place-items-center w-6 h-6 rounded-full bg-brand text-white">
                          <Check size={14} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </StepShell>
          )}

          {step === 1 && (
            <StepShell icon={GraduationCap} title="Seberapa jauh kamu sekarang?" subtitle="Kami mulai dari titik yang tepat untukmu.">
              <div className="space-y-3">
                {levels.map((l) => {
                  const active = level === l.key;
                  return (
                    <button
                      key={l.key}
                      onClick={() => setLevel(l.key)}
                      className={cn(
                        "w-full flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition",
                        active ? "border-brand bg-brand-light/60 dark:bg-brand/15" : "border-line bg-surface hover:border-brand/50",
                      )}
                    >
                      <span className="text-2xl">{l.emoji}</span>
                      <span className="flex-1">
                        <span className="block font-bold text-fg">{l.label}</span>
                        <span className="block text-sm text-fg-muted">{l.desc}</span>
                      </span>
                      <span
                        className={cn(
                          "grid place-items-center w-6 h-6 rounded-full border-2",
                          active ? "border-brand bg-brand text-white" : "border-line",
                        )}
                      >
                        {active && <Check size={14} />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </StepShell>
          )}

          {step === 2 && (
            <StepShell icon={Clock} title="Berapa lama kamu ingin belajar tiap hari?" subtitle="Konsisten lebih penting daripada lama. Mulai kecil saja.">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {durations.map((d) => (
                  <button
                    key={d}
                    onClick={() => setMinutes(d)}
                    className={cn(
                      "rounded-2xl border-2 p-5 text-center transition",
                      minutes === d ? "border-brand bg-brand-light/60 dark:bg-brand/15" : "border-line bg-surface hover:border-brand/50",
                    )}
                  >
                    <span className="block font-display font-bold text-3xl text-fg">{d}</span>
                    <span className="text-sm text-fg-muted">menit</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 rounded-2xl bg-bg-alt dark:bg-surface-2 p-4">
                <Mascot message={`Kamu butuh ± ${Math.round((500 / Math.max(minutes, 5)) * 5)} hari untuk menguasai 500 kata. Semangat!`} size="sm" />
              </div>
            </StepShell>
          )}

          {step === 3 && (
            <StepShell icon={Bell} title="Ingatkan aku belajar" subtitle="Notifikasi singkat membantu menjaga kebiasaan.">
              <div className="space-y-4">
                <label className="flex items-center justify-between rounded-2xl border-2 border-line bg-surface p-4">
                  <span>
                    <span className="block font-bold text-fg">Pengingat harian</span>
                    <span className="text-sm text-fg-muted">Satu notifikasi ramah setiap hari</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={reminder}
                    onChange={(e) => setReminder(e.target.checked)}
                    className="accent-brand w-6 h-6"
                  />
                </label>
                {reminder && (
                  <label className="flex items-center justify-between rounded-2xl border-2 border-line bg-surface p-4">
                    <span className="font-bold text-fg">Jam belajar</span>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="rounded-xl border border-line bg-bg px-3 py-2 font-bold text-fg"
                    />
                  </label>
                )}
                <div className="rounded-2xl bg-gold-soft dark:bg-gold/20 p-4 text-sm text-gold-dark dark:text-gold font-semibold">
                  🔥 Mulai hari ini, jaga streak-mu agar tidak terputus!
                </div>
              </div>
            </StepShell>
          )}
        </div>
      </main>

      <div className="max-w-3xl w-full mx-auto px-5 pb-8 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          onClick={() => (step === 0 ? navigate("/") : setStep((s) => s - 1))}
        >
          <ArrowLeft size={17} /> {step === 0 ? "Nanti saja" : "Kembali"}
        </Button>
        {step < total - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext}>
            Lanjut <ArrowRight size={17} />
          </Button>
        ) : (
          <Button onClick={finish}>
            Mulai belajar <ArrowRight size={17} />
          </Button>
        )}
      </div>
    </div>
  );
}

function StepShell({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: any;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="grid place-items-center w-14 h-14 rounded-2xl bg-brand-light dark:bg-brand/25 text-brand mb-5">
        <Icon size={26} />
      </span>
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-fg">{title}</h1>
      <p className="text-fg-muted mt-2 mb-7">{subtitle}</p>
      {children}
    </div>
  );
}

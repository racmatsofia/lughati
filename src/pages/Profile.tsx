import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Accessibility,
  Award,
  BookOpen,
  Bell,
  Download,
  Eye,
  Flame,
  Info,
  KeyRound,
  Languages,
  LogOut,
  Palette,
  RotateCcw,
  Save,
  Settings2,
  Smartphone,
  Sparkles,
  Trophy,
  UserCog,
  Volume2,
  Zap,
} from "lucide-react";
import { PageHeader } from "../components/layout";
import { AvatarPicker } from "../components/Avatar";
import { Button, Card, Chip, Modal, Segmented } from "../components/ui";
import { AudioNote } from "../components/audio";
import { usePWAInstall } from "../lib/pwa";
import { useApp } from "../lib/store";
import { useT } from "../lib/i18n";
import { cn, formatNumber } from "../lib/utils";

const avatars = ["🙂", "👩‍🎓", "🧑‍🎓", "👨‍🏫", "🧕", "👦", "👧", "🧔", "🐪", "🌟", "🦁", "🐯"];
const leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];

export default function Profile() {
  const t = useT();
  const {
    user,
    progress,
    level,
    settings,
    setSettings,
    logout,
    resetProgress,
    setName,
    unlockedBadges,
  } = useApp();
  const { canInstall, installed, promptInstall } = usePWAInstall();
  const [confirmReset, setConfirmReset] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [passOpen, setPassOpen] = useState(false);
  const [draftName, setDraftName] = useState(user?.name ?? "");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [passMsg, setPassMsg] = useState("");

  const league = leagues[Math.min(leagues.length - 1, Math.floor(level / 4))];

  return (
    <div className="animate-fade-up">
      <PageHeader title={t("profil.title")} subtitle={t("profil.sub")} />

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
                <Flame size={14} /> {progress.streak}
              </Chip>
              <Chip tone="neutral">
                <Trophy size={14} /> Liga {league}
              </Chip>
            </div>
          </div>
          <Button variant="outline" onClick={() => setEditOpen(true)}>
            <UserCog size={17} /> {t("profil.editProfil")}
          </Button>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-fg mb-3">{t("profil.pilihAvatar")}</p>
          <div className="flex flex-wrap gap-2">
            {avatars.map((a) => (
              <AvatarPicker key={a} emoji={a} />
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <MiniStat icon={<Flame size={16} />} label={t("profil.hariStreak")} value={`${progress.streak}`} />
          <MiniStat icon={<BookOpen size={16} />} label={t("progres.kata")} value={`${progress.learnedWords.length}`} />
          <MiniStat icon={<Award size={16} />} label={t("profil.badge")} value={`${unlockedBadges.length}`} />
        </div>
      </Card>

      {/* Akun */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<UserCog size={18} />} title={t("profil.akun")} />
        <RowButton
          icon={<UserCog size={17} />}
          label={t("profil.editProfil")}
          onClick={() => setEditOpen(true)}
        />
        <RowButton
          icon={<KeyRound size={17} />}
          label={t("profil.gantiSandi")}
          onClick={() => setPassOpen(true)}
        />
        <RowButton
          icon={<Award size={17} />}
          label={t("profil.sertifikat")}
          to="/app/sertifikat"
        />
      </Card>

      {/* Preferensi */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Settings2 size={18} />} title={t("profil.preferensi")} />

        <Row icon={<Languages size={17} />} label={t("profil.bahasa")}>
          <Segmented
            value={settings.lang}
            onChange={(v) => setSettings({ lang: v as "id" | "en" })}
            options={[
              ["id", t("set.indonesia")],
              ["en", t("set.inggris")],
            ]}
          />
        </Row>

        <Row icon={<Palette size={17} />} label={t("profil.tampilan")}>
          <Segmented
            value={settings.theme}
            onChange={(v) => setSettings({ theme: v as any })}
            options={[
              ["light", t("set.terang")],
              ["dark", t("set.gelap")],
              ["system", t("set.sistem")],
            ]}
          />
        </Row>

        <Row icon={<Eye size={17} />} label={t("profil.teksArab")}>
          <Segmented
            value={settings.arabicSize}
            onChange={(v) => setSettings({ arabicSize: v as any })}
            options={[
              ["kecil", t("set.kecil")],
              ["sedang", t("set.sedang")],
              ["besar", t("set.besar")],
            ]}
          />
        </Row>

        <Row icon={<Volume2 size={17} />} label="Audio">
          <Segmented
            value={String(settings.rate)}
            onChange={(v) => setSettings({ rate: Number(v) })}
            options={[
              ["0.75", t("set.lambat")],
              ["1", t("set.normal")],
              ["1.25", t("set.cepat")],
            ]}
          />
        </Row>

        <Toggle
          icon={<Languages size={17} />}
          label={t("cerita.transliterasi")}
          hint="Tulisan latin di bawah teks Arab"
          checked={settings.translit}
          onChange={(v) => setSettings({ translit: v })}
        />

        <Toggle
          icon={<Bell size={17} />}
          label={t("profil.pengingat")}
          hint={`${t("profil.pengingat")} · ${settings.remindAt}`}
          checked={settings.reminders}
          onChange={(v) => setSettings({ reminders: v })}
        />

        {settings.reminders && (
          <Row icon={<Bell size={17} />} label={`${t("profil.pengingat")} — jam`}>
            <input
              type="time"
              value={settings.remindAt}
              onChange={(e) => setSettings({ remindAt: e.target.value })}
              className="rounded-xl border border-line bg-bg px-3 py-2 font-bold text-fg"
            />
          </Row>
        )}
      </Card>

      {/* Aksesibilitas */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Accessibility size={18} />} title={t("profil.aksesibilitas")} />
        <Toggle
          label={t("profil.modeDisleksia")}
          hint="Font lebih mudah dibaca & spasi lebih lega"
          checked={settings.dyslexic}
          onChange={(v) => setSettings({ dyslexic: v })}
        />
        <Toggle
          label={t("profil.kontrasTinggi")}
          hint="Teks & garis lebih tegas"
          checked={settings.highContrast}
          onChange={(v) => setSettings({ highContrast: v })}
        />
        <Toggle
          label={t("profil.kurangiGerak")}
          hint="Matikan animasi & transisi"
          checked={settings.reduceMotion}
          onChange={(v) => setSettings({ reduceMotion: v })}
        />
        <Toggle
          label={t("profil.modeAnak")}
          hint="Tampilan lebih besar & ramah anak"
          checked={settings.kidsMode}
          onChange={(v) => setSettings({ kidsMode: v })}
        />
        <div className="mt-4">
          <AudioNote />
        </div>
      </Card>

      {/* Offline */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Smartphone size={18} />} title={t("profil.modeOffline")} />
        <p className="text-sm text-fg-muted mb-4">{t("profil.modeOfflineDesc")}</p>
        {installed ? (
          <Chip tone="success">✓ {t("profil.terpasang")}</Chip>
        ) : (
          <Button variant="outline" onClick={() => promptInstall()} disabled={!canInstall}>
            <Download size={17} /> {t("profil.pasangApp")}
          </Button>
        )}
        {!canInstall && !installed && (
          <p className="text-xs text-fg-subtle mt-2">
            Buka lewat Chrome/Edge desktop atau Android untuk memasang sebagai aplikasi. iOS: Bagikan → Tambahkan ke Layar Utama.
          </p>
        )}
      </Card>

      {/* Lainnya */}
      <Card className="p-6 mt-5">
        <SectionHeader icon={<Info size={18} />} title={t("profil.legal")} />
        <div className="flex flex-wrap gap-2">
          <Pill to="/tentang">{t("profil.tentang")}</Pill>
          <Pill to="/bantuan">{t("profil.bantuan")}</Pill>
          <Pill to="/harga">{t("profil.premium")}</Pill>
          <Pill to="/kelas">{t("profil.kelasGuru")}</Pill>
        </div>
      </Card>

      <div className="mt-5 flex flex-wrap gap-3">
        <Button variant="outline" onClick={() => setConfirmReset(true)}>
          <RotateCcw size={17} /> {t("profil.resetProgres")}
        </Button>
        <Button variant="danger" onClick={logout}>
          <LogOut size={17} /> {t("profil.keluar")}
        </Button>
      </div>

      {/* Modal edit profil */}
      <Modal open={editOpen} onClose={() => setEditOpen(false)} title={t("profil.editProfil")}>
        <label className="block mb-4">
          <span className="block text-sm font-bold text-fg mb-1.5">{t("profil.pilihNama")}</span>
          <input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </label>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setEditOpen(false)}>
            {t("c.batal")}
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              if (draftName.trim().length >= 2) setName(draftName.trim());
              setEditOpen(false);
            }}
          >
            <Save size={16} /> {t("c.simpan")}
          </Button>
        </div>
      </Modal>

      {/* Modal ganti sandi */}
      <Modal open={passOpen} onClose={() => setPassOpen(false)} title={t("profil.gantiSandi")}>
        <label className="block mb-3">
          <span className="block text-sm font-bold text-fg mb-1.5">{t("profil.sandiLama")}</span>
          <input
            type="password"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </label>
        <label className="block mb-3">
          <span className="block text-sm font-bold text-fg mb-1.5">{t("profil.sandiBaru")}</span>
          <input
            type="password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
          />
        </label>
        {passMsg && <p className="text-sm font-semibold text-coral mb-2">{passMsg}</p>}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setPassOpen(false)}>
            {t("c.batal")}
          </Button>
          <Button
            className="flex-1"
            onClick={() => {
              if (oldPass.length < 4) return setPassMsg("Kata sandi lama belum benar.");
              if (newPass.length < 6) return setPassMsg("Kata sandi baru minimal 6 karakter.");
              setPassMsg("");
              setOldPass("");
              setNewPass("");
              setPassOpen(false);
            }}
          >
            <Save size={16} /> {t("c.simpan")}
          </Button>
        </div>
      </Modal>

      {/* Modal reset */}
      <Modal open={confirmReset} onClose={() => setConfirmReset(false)} title={t("profil.resetProgres")}>
        <p className="text-fg-muted">
          Semua XP, streak, dan kata yang dikuasai akan dihapus. Tindakan ini tidak bisa dibatalkan.
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => setConfirmReset(false)}>
            {t("c.batal")}
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={() => {
              resetProgress();
              setConfirmReset(false);
            }}
          >
            {t("c.ya")}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

/* ------------------------------ sub bagian ------------------------------ */
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
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <span className="flex items-center gap-2.5 font-bold text-fg text-sm">
        {icon && <span className="text-fg-subtle">{icon}</span>}
        {label}
      </span>
      {children}
    </div>
  );
}

function RowButton({
  icon,
  label,
  onClick,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  to?: string;
}) {
  const inner = (
    <span className="flex items-center gap-3 w-full py-3 text-left border-b border-line last:border-0">
      <span className="text-fg-subtle">{icon}</span>
      <span className="flex-1 font-bold text-fg text-sm">{label}</span>
      <span className="text-fg-subtle">›</span>
    </span>
  );
  return to ? (
    <Link to={to} className="block hover:text-brand">
      {inner}
    </Link>
  ) : (
    <button onClick={onClick} className="w-full">
      {inner}
    </button>
  );
}

function Toggle({
  icon,
  label,
  hint,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  hint?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-3 border-b border-line last:border-0">
      <div className="flex items-start gap-2.5">
        {icon && <span className="text-fg-subtle mt-0.5">{icon}</span>}
        <div>
          <p className="font-bold text-fg text-sm">{label}</p>
          {hint && <p className="text-xs text-fg-muted">{hint}</p>}
        </div>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn("relative w-12 h-7 rounded-full transition shrink-0", checked ? "bg-brand" : "bg-surface-2")}
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

function Pill({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full bg-surface-2 px-4 py-2 text-sm font-bold text-fg-muted hover:text-brand transition"
    >
      {children}
    </Link>
  );
}

function MiniStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-3 text-center">
      <span className="text-brand flex justify-center">{icon}</span>
      <p className="font-display font-bold text-xl text-fg mt-1">{value}</p>
      <p className="text-xs text-fg-muted">{label}</p>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Download, X, WifiOff } from "lucide-react";
import { useOnlineStatus, usePWAInstall } from "../lib/pwa";
import { useT } from "../lib/i18n";
import { Button } from "./ui";
import { cn } from "../lib/utils";

/* --------------------------- Install prompt ------------------------------ */
export function InstallPrompt({ className }: { className?: string }) {
  const { canInstall, installed, promptInstall } = usePWAInstall();
  const [dismissed, setDismissed] = useState(
    () => sessionStorage.getItem("lughati.installDismissed") === "1",
  );
  const t = useT();

  if (installed || dismissed || !canInstall) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-brand/30 bg-brand-light/60 dark:bg-brand/15 p-4 animate-fade-up",
        className,
      )}
    >
      <span className="grid place-items-center w-10 h-10 rounded-2xl bg-brand text-white shrink-0">
        <Download size={18} />
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-fg text-sm">{t("profil.pasangApp")}</p>
        <p className="text-xs text-fg-muted">{t("profil.modeOfflineDesc")}</p>
      </div>
      <Button size="sm" onClick={() => promptInstall()}>
        {t("profil.pasangApp")}
      </Button>
      <button
        onClick={() => {
          setDismissed(true);
          sessionStorage.setItem("lughati.installDismissed", "1");
        }}
        className="text-fg-subtle hover:text-fg shrink-0"
        aria-label={t("c.tutup")}
      >
        <X size={18} />
      </button>
    </div>
  );
}

/* --------------------------- Offline banner ------------------------------ */
export function OfflineBanner() {
  const online = useOnlineStatus();
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!online) setShow(true);
    else {
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [online]);

  if (!show && online) return null;

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[70] flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold shadow-lg transition-all",
        "bottom-24 lg:bottom-6",
        online ? "bg-success text-white" : "bg-fg text-bg",
      )}
      role="status"
      aria-live="polite"
    >
      {online ? (
        <>✅ {t("c.selesai")}</>
      ) : (
        <>
          <WifiOff size={16} /> {t("brand.offline")}
        </>
      )}
    </div>
  );
}

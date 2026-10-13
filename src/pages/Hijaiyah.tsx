import { useEffect, useRef, useState } from "react";
import { Eraser, Headphones, Pencil, X } from "lucide-react";
import { PageHeader } from "../components/layout";
import { HARAKAT, HIJAIYAH } from "../lib/data";
import { SpeakerButton, useSpeaker } from "../components/audio";
import { Button, Card, Chip, Modal } from "../components/ui";
import { cn } from "../lib/utils";

export default function Hijaiyah() {
  const [active, setActive] = useState(0);
  const [game, setGame] = useState(false);
  const [trace, setTrace] = useState(false);
  const letter = HIJAIYAH[active];
  const { play } = useSpeaker();

  return (
    <div className="animate-fade-up">
      <PageHeader
        title="Hijaiyah"
        subtitle="Belajar 28 huruf Arab dari nol, satu per satu. Ketuk huruf untuk mendengar."
      />

      {/* Grid huruf */}
      <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-7 gap-2.5">
        {HIJAIYAH.map((L, i) => (
          <button
            key={L.ar}
            onClick={() => {
              setActive(i);
              play(L.ar);
            }}
            className={cn(
              "aspect-square rounded-3xl border-2 grid place-items-center transition",
              i === active
                ? "bg-brand border-brand text-white"
                : "bg-surface border-line hover:border-brand hover:bg-brand-light/40 dark:hover:bg-brand/10",
            )}
            aria-label={`Huruf ${L.name}`}
          >
            <span className="arabic text-3xl sm:text-4xl">{L.ar}</span>
          </button>
        ))}
      </div>

      {/* Detail huruf */}
      <Card className="mt-6 p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="sm:w-40 shrink-0">
            <div className="aspect-square rounded-3xl bg-brand-light dark:bg-brand/20 grid place-items-center">
              <span className="arabic text-7xl text-brand-dark dark:text-white">{letter.ar}</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-display font-bold text-3xl text-fg">{letter.name}</h2>
            <p className="latin italic text-fg-subtle">{letter.translit}</p>

            <button
              onClick={() => play(letter.ar)}
              className="mt-4 inline-flex items-center gap-2.5 rounded-full bg-brand-light dark:bg-brand/20 pl-1.5 pr-4 py-1.5 font-bold text-brand-dark dark:text-white"
            >
              <span className="grid place-items-center w-9 h-9 rounded-full bg-surface">
                <SpeakerButton text={letter.ar} size="sm" tone="soft" />
              </span>
              Dengar pengucapan
            </button>

            {/* Harakat */}
            <div className="mt-5 grid grid-cols-3 gap-3">
              {HARAKAT.slice(0, 3).map((h) => {
                const form = letter.ar + h.ar[1];
                return (
                  <button
                    key={h.name}
                    onClick={() => play(letter.ar + h.ar.replace(letter.ar, ""))}
                    className="rounded-2xl bg-bg-alt dark:bg-surface-2 p-3 flex items-center justify-between hover:ring-1 hover:ring-brand/40 transition"
                  >
                    <span className="arabic text-2xl text-fg">{form}</span>
                    <SpeakerButton text={form} size="sm" tone="ghost" />
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-sm text-fg-muted leading-relaxed">
              <span className="font-bold text-fg">Makhraj:</span> {letter.makhraj}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Chip tone="neutral">Terpisah: {letter.forms[0]}</Chip>
              <Chip tone="neutral">Awal: {letter.forms[1]}</Chip>
              <Chip tone="neutral">Tengah: {letter.forms[2]}</Chip>
              <Chip tone="neutral">Akhir: {letter.forms[3]}</Chip>
            </div>
          </div>
        </div>
      </Card>

      <div className="mt-5 grid sm:grid-cols-2 gap-3">
        <Button size="lg" onClick={() => setGame(true)}>
          <Headphones size={18} /> Tebak Suara Huruf
        </Button>
        <Button size="lg" variant="outline" onClick={() => setTrace(true)}>
          <Pencil size={18} /> Trace Huruf
        </Button>
      </div>

      <Modal open={game} onClose={() => setGame(false)}>
        {game && <GuessGame onClose={() => setGame(false)} />}
      </Modal>

      <Modal open={trace} onClose={() => setTrace(false)}>
        {trace && <TraceCanvas letter={letter} onClose={() => setTrace(false)} />}
      </Modal>
    </div>
  );
}

/* --------------------------- Tebak Suara Huruf -------------------------- */
function GuessGame({ onClose }: { onClose: () => void }) {
  const { play, playing } = useSpeaker();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [options, setOptions] = useState(() => buildOptions(0));
  const answer = options[0];

  useEffect(() => {
    const t = setTimeout(() => play(answer.ar), 400);
    return () => clearTimeout(t);
  }, [round]); // eslint-disable-line

  function buildOptions(r: number) {
    const start = (r * 5) % (HIJAIYAH.length - 4);
    const pool = HIJAIYAH.slice(start, start + 4);
    const correct = pool[r % 4];
    const rest = pool.filter((x) => x !== correct);
    return [correct, ...rest];
  }

  function choose(index: number) {
    if (picked) return;
    setPicked(options[index].ar);
    if (options[index].ar === answer.ar) setScore((s) => s + 1);
  }

  function next() {
    const r = round + 1;
    setRound(r);
    setPicked(null);
    const start = (r * 5) % (HIJAIYAH.length - 4);
    const pool = HIJAIYAH.slice(start, start + 4);
    const correct = pool[r % 4];
    setOptions([correct, ...pool.filter((x) => x !== correct)]);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg">Tebak Suara Huruf</h3>
        <button onClick={onClose} className="text-fg-subtle hover:text-fg" aria-label="Tutup">
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-fg-muted mb-4">Dengar audio, lalu pilih huruf yang benar.</p>

      <div className="text-center mb-5">
        <button
          onClick={() => play(answer.ar)}
          className={cn(
            "grid place-items-center w-20 h-20 rounded-full bg-brand text-white mx-auto transition",
            playing && "ring-4 ring-brand/30",
          )}
          aria-label="Putar audio"
        >
          <Headphones size={30} />
        </button>
        <p className="text-xs text-fg-subtle mt-2">Ketuk untuk memutar ulang</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((o, i) => {
          const isAnswer = o.ar === answer.ar;
          const isPicked = o.ar === picked;
          return (
            <button
              key={o.ar}
              onClick={() => choose(i)}
              className={cn(
                "aspect-square rounded-2xl border-2 grid place-items-center transition",
                !picked && "border-line bg-surface hover:border-brand",
                picked && isAnswer && "border-brand bg-brand-light dark:bg-brand/20",
                picked && isPicked && !isAnswer && "border-coral bg-coral-soft",
                picked && !isAnswer && !isPicked && "border-line opacity-50",
              )}
            >
              <span className="arabic text-4xl text-fg">{o.ar}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-bold text-fg-muted">Skor: {score}</span>
        {picked && (
          <Button onClick={next}>Soal berikutnya</Button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Trace Canvas ---------------------------- */
function TraceCanvas({ letter, onClose }: { letter: { ar: string; name: string }; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#0E7C7B";
  }, []);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg">Trace: {letter.name}</h3>
        <button onClick={onClose} className="text-fg-subtle hover:text-fg" aria-label="Tutup">
          <X size={20} />
        </button>
      </div>
      <p className="text-sm text-fg-muted mb-4">Jiplak huruf dengan jari atau mouse-mu.</p>

      <div className="relative rounded-2xl bg-bg-alt dark:bg-surface-2 overflow-hidden touch-none">
        <span className="absolute inset-0 grid place-items-center arabic text-[160px] text-line select-none pointer-events-none">
          {letter.ar}
        </span>
        <canvas
          ref={canvasRef}
          className="relative w-full h-64"
          onPointerDown={(e) => {
            drawing.current = true;
            const ctx = canvasRef.current!.getContext("2d")!;
            const p = pos(e);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
          }}
          onPointerMove={(e) => {
            if (!drawing.current) return;
            const ctx = canvasRef.current!.getContext("2d")!;
            const p = pos(e);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }}
          onPointerUp={() => (drawing.current = false)}
          onPointerLeave={() => (drawing.current = false)}
        />
      </div>

      <div className="mt-5 flex gap-3">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => {
            const canvas = canvasRef.current!;
            canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
          }}
        >
          <Eraser size={16} /> Hapus
        </Button>
        <Button className="flex-1" onClick={onClose}>
          Selesai
        </Button>
      </div>
    </div>
  );
}

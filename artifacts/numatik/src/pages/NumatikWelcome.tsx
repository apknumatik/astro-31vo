/**
 * NumatikWelcome — halaman sambutan 3D Numatik (tata surya, hiperspace, 6 bahasa).
 *
 * PEMAKAIAN:
 *   import NumatikWelcome from "./NumatikWelcome";
 *   <NumatikWelcome
 *      onStart={() => navigate("/menu")}   // dipanggil setelah efek masuk-dimensi selesai
 *      onClose={() => ...}                 // tombol X (opsional)
 *      academicYear="2026 – 2027"          // opsional, ambil dari sumber aplikasi
 *   />
 *   Tanpa onStart, komponen menampilkan overlay "Selamat belajar!" (mode demo).
 *
 * Pasang NumatikWelcome.tsx dan numatik-welcome.css di folder yang sama.
 * Semua CSS di-scope ke .nmw sehingga tidak mengubah gaya halaman lain.
 */
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import "./numatik-welcome.css";

export type WelcomeLang = "id" | "en" | "ms" | "ja" | "zh" | "ru";
type Dict = { n: string; g: string; s: string; y: string; b: string; h: string; t: string };

// Terjemahan ms/zh/ru masih DRAF dan perlu direview penutur asli.
const L: Record<WelcomeLang, Dict> = {
  id: { n: "ID", g: "Selamat Datang di Aplikasi", s: "Numerasi Aktif dengan Teknologi Informasi dan Komunikasi", y: "Tahun Ajaran {y}", b: "MULAI", h: "Selamat belajar!", t: "APLIKASI MULTIMEDIA PEMBELAJARAN INTERAKTIF MATEMATIKA" },
  en: { n: "EN", g: "Welcome to the App", s: "Active Numeracy with Information and Communication Technology", y: "Academic Year {y}", b: "START", h: "Happy learning!", t: "INTERACTIVE MULTIMEDIA LEARNING APP FOR JUNIOR HIGH MATHEMATICS" },
  ms: { n: "MS", g: "Selamat Datang ke Aplikasi", s: "Numerasi Aktif dengan Teknologi Maklumat dan Komunikasi", y: "Tahun Akademik {y}", b: "MULA", h: "Selamat belajar!", t: "APLIKASI MULTIMEDIA PEMBELAJARAN INTERAKTIF MATEMATIK SEKOLAH MENENGAH" },
  ja: { n: "日本語", g: "アプリへようこそ", s: "情報通信技術で学ぶアクティブ・ニューメラシー", y: "{y}年度", b: "スタート", h: "いっしょに学ぼう！", t: "中学数学のインタラクティブ・マルチメディア学習アプリ" },
  zh: { n: "中文", g: "欢迎使用应用", s: "借助信息通信技术的主动数感学习", y: "{y} 学年", b: "开始", h: "开始学习吧！", t: "初中数学互动多媒体学习应用" },
  ru: { n: "RU", g: "Добро пожаловать в приложение", s: "Активная математическая грамотность с помощью ИКТ", y: "{y} учебный год", b: "НАЧАТЬ", h: "Учимся вместе!", t: "ИНТЕРАКТИВНОЕ МУЛЬТИМЕДИЙНОЕ ПРИЛОЖЕНИЕ ДЛЯ ИЗУЧЕНИЯ МАТЕМАТИКИ" },
};

const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* abaikan */ } },
};
const buzz = (p: number | number[]) => { try { navigator.vibrate?.(p); } catch { /* abaikan */ } };
const S = (o: Record<string, string | number>) => o as CSSProperties;

function detectLang(key: string): WelcomeLang {
  const q = new URLSearchParams(window.location.search).get("lang");
  const dev = (navigator.language || "id").slice(0, 2).toLowerCase();
  return ([q, store.get(key), dev, "id"].find((k) => k && k in L) as WelcomeLang) || "id";
}

const SYMBOLS = ["π", "√", "∑", "∞", "△", "□", "∠", "÷", "×", "%", "≈", "x²", "∫", "θ"];

export interface NumatikWelcomeProps {
  onStart?: () => void;
  onClose?: () => void;
  lang?: WelcomeLang;
  onLangChange?: (l: WelcomeLang) => void;
  academicYear?: string;
  langStorageKey?: string;
  muteStorageKey?: string;
}

export default function NumatikWelcome({
  onStart, onClose, lang: langProp, onLangChange,
  academicYear = "2026 – 2027", langStorageKey = "numatik-lang", muteStorageKey = "numatik-mute",
}: NumatikWelcomeProps) {
  const [lang, setLangState] = useState<WelcomeLang>(() => langProp ?? detectLang(langStorageKey));
  const [muted, setMuted] = useState(() => store.get(muteStorageKey) === "1");
  const [warping, setWarping] = useState(false);
  const [arrived, setArrived] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(0);   // 0 diam, 1 hiperspace, 2 tiba
  const t0Ref = useRef(0);
  const mRef = useRef(1);      // pengali kecepatan bintang
  const acRef = useRef<AudioContext | null>(null);
  const mutedRef = useRef(muted);
  const timers = useRef<number[]>([]);
  const onStartRef = useRef(onStart);
  onStartRef.current = onStart;

  useEffect(() => { if (langProp) setLangState(langProp); }, [langProp]);
  const setLang = (l: WelcomeLang) => { setLangState(l); store.set(langStorageKey, l); onLangChange?.(l); };
  const d = L[lang];

  const symbols = useMemo(
    () =>
      Array.from({ length: typeof window !== "undefined" && window.innerWidth < 700 ? 10 : 16 }, (_, i) => ({
        s: SYMBOLS[i % SYMBOLS.length],
        left: Math.random() * 100,
        size: 16 + Math.random() * 32,
        dur: 24 + Math.random() * 26,
        delay: -Math.random() * 45,
        dx: Math.round(Math.random() * 90 - 45),
      })),
    []
  );

  const finish = () => {
    buzz([60]);
    if (onStartRef.current) onStartRef.current();
    else setArrived(true);
  };
  const finishRef = useRef(finish);
  finishRef.current = finish;

  /* ===== tilt 3D (pointer + gyro), langsung ke CSS variable tanpa re-render ===== */
  useEffect(() => {
    const el = rootRef.current!;
    const tilt = (x: number, y: number) => {
      el.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
    };
    const onGyro = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      tilt(Math.max(-1, Math.min(1, e.gamma / 35)) / 2, Math.max(-1, Math.min(1, (e.beta - 45) / 35)) / 2);
    };
    addEventListener("deviceorientation", onGyro);
    return () => { removeEventListener("deviceorientation", onGyro); };
  }, []);

  /* ===== langit 3D + terowongan cahaya ===== */
  useEffect(() => {
    const cv = canvasRef.current!;
    const cx = cv.getContext("2d")!;
    const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
    const speed = 0.0009, hues = [190, 200, 210, 270, 300, 50];
    let W = 0, H = 0, dpr = 1, raf = 0, alive = true;
    const size = () => { dpr = window.devicePixelRatio || 1; W = cv.width = cv.clientWidth * dpr; H = cv.height = cv.clientHeight * dpr; };
    size();
    const N = Math.min(380, Math.floor((cv.clientWidth * cv.clientHeight) / 3800) + 110);
    const stars = Array.from({ length: N + 240 }, (_, i) => ({
      x: Math.random() * 2 - 1, y: Math.random() * 2 - 1, z: Math.random(),
      h: i < N ? (Math.random() < 0.2 ? 190 : Math.random() < 0.1 ? 270 : 210) : hues[i % 6], beam: i >= N,
    }));
    const frame = (now: number) => {
      if (!alive) return;
      let m = mRef.current;
      if (modeRef.current === 1) {
        const t = Math.min(1, (now - t0Ref.current) / 1900);
        m = 1 + 70 * t * t;
        if (t >= 1) { modeRef.current = 2; finishRef.current(); }
      } else if (modeRef.current === 2) m += (7 - m) * 0.04;
      else m += (1 - m) * 0.08;
      mRef.current = m;
      const fast = m > 3;
      cx.globalCompositeOperation = "source-over";
      cx.fillStyle = fast ? "rgba(2,8,22,.2)" : "#020816";
      cx.fillRect(0, 0, W, H);
      if (fast) cx.globalCompositeOperation = "lighter";
      if (modeRef.current) {
        const g = cx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * 0.45);
        g.addColorStop(0, "rgba(170,230,255," + Math.min(0.3, (m - 1) / 160) + ")");
        g.addColorStop(1, "rgba(2,8,22,0)");
        cx.fillStyle = g; cx.fillRect(0, 0, W, H);
      }
      const f = Math.max(W, H) * 0.5;
      for (const s of stars) {
        if (s.beam && !fast) continue;
        const pz = s.z + speed * m * (fast ? 2.4 : 0);
        s.z -= speed * m;
        if (s.z <= 0.02) { s.z = 1; s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; continue; }
        const k = 1 / s.z, x = W / 2 + s.x * f * k * 0.25, y = H / 2 + s.y * f * k * 0.25;
        const a = Math.min(1, (1 - s.z) * 1.6 + 0.15), r = Math.max(0.4, (1 - s.z) * 2.2) * dpr;
        if (fast) {
          const k2 = 1 / Math.min(1.6, pz);
          cx.strokeStyle = "hsla(" + s.h + ",100%,78%," + Math.min(1, a + 0.3) + ")";
          cx.lineWidth = r * (1 + m * 0.02);
          cx.beginPath(); cx.moveTo(W / 2 + s.x * f * k2 * 0.25, H / 2 + s.y * f * k2 * 0.25); cx.lineTo(x, y); cx.stroke();
        } else {
          cx.fillStyle = "hsla(" + s.h + ",90%,80%," + a + ")";
          cx.beginPath(); cx.arc(x, y, r, 0, 6.283); cx.fill();
        }
      }
      if (!still || modeRef.current) raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    addEventListener("resize", size);
    return () => { alive = false; cancelAnimationFrame(raf); removeEventListener("resize", size); };
  }, []);

  /* ===== bersihkan audio & timer saat unmount ===== */
  useEffect(() => () => { timers.current.forEach(clearTimeout); acRef.current?.close().catch(() => {}); acRef.current = null; }, []);

  const whoosh = () => {
    if (mutedRef.current) return;
    try {
      const Ctor = window.AudioContext || (window as any).webkitAudioContext;
      const ac = (acRef.current = acRef.current || new Ctor());
      const t = ac.currentTime, n = ac.sampleRate * 2.4, buf = ac.createBuffer(1, n, ac.sampleRate), data = buf.getChannelData(0);
      for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
      const s = ac.createBufferSource(); s.buffer = buf;
      const bp = ac.createBiquadFilter(); bp.type = "bandpass"; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(180, t); bp.frequency.exponentialRampToValueAtTime(7000, t + 1.9);
      const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(0.45, t + 1.6); g.gain.linearRampToValueAtTime(0, t + 2.3);
      s.connect(bp); bp.connect(g); g.connect(ac.destination); s.start(t);
      const o = ac.createOscillator(), og = ac.createGain(); o.type = "sine";
      o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(420, t + 1.8);
      og.gain.setValueAtTime(0, t); og.gain.linearRampToValueAtTime(0.18, t + 1.5); og.gain.linearRampToValueAtTime(0, t + 2.2);
      o.connect(og); og.connect(ac.destination); o.start(t); o.stop(t + 2.3);
    } catch { /* suara opsional */ }
  };
  const toggleMute = () => {
    const v = !mutedRef.current; mutedRef.current = v; setMuted(v); store.set(muteStorageKey, v ? "1" : "0");
  };

  const handleGo = () => {
    if (modeRef.current) return;
    try {
      const DOE = (window as any).DeviceOrientationEvent;
      if (DOE && typeof DOE.requestPermission === "function") DOE.requestPermission().catch(() => {});
    } catch { /* abaikan */ }
    setWarping(true); whoosh(); buzz(20);
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) { finish(); return; }
    modeRef.current = 1; t0Ref.current = performance.now();
    timers.current.push(window.setTimeout(() => buzz([40, 30, 80]), 1500));
  };
  const replay = () => { modeRef.current = 0; setArrived(false); setWarping(false); };

  return (
    <div ref={rootRef} className={"nmw" + (warping ? " warping" : "")} lang={lang}>
      <canvas ref={canvasRef} className="sky" />
      <div className="nebula" />
      <div className="math" aria-hidden="true">
        {symbols.map((m, i) => (
          <span key={i} style={S({ left: m.left + "%", fontSize: m.size + "px", animationDuration: m.dur + "s", animationDelay: m.delay + "s", "--dx": m.dx + "px", opacity: 0 })}>{m.s}</span>
        ))}
      </div>

      <main className="app">
        <nav className="langs" aria-label="Language">
          {(Object.keys(L) as WelcomeLang[]).map((k) => (
            <button key={k} aria-pressed={k === lang} onClick={() => setLang(k)}>{L[k].n}</button>
          ))}
        </nav>
        <button className="mute" aria-label="Sound" onClick={toggleMute}>{muted ? "🔇" : "🔊"}</button>
        <button className="close" aria-label="Close" onClick={onClose}>✕</button>

        <section className="stage">
          <div className="copy">
            <div className="head">
              <p className="greet">{d.g}</p>
              <h1 className="title">NUMATIK</h1>
            </div>
            <div className="dock">
              <p className="sub">{d.s}</p>
              <span className="year">{d.y.replace("{y}", academicYear)}</span>
              <button className="go" onClick={handleGo}>{d.b}</button>
            </div>
          </div>

          <div className="space" aria-hidden="true">
            <img className="sun-image" src="/sun.png" alt="" />
          </div>
        </section>

        <div className="ticker"><div>{("✨ " + d.t + " ✨ ").repeat(3)}</div></div>
      </main>

      {!onStart && (
        <div className={"arrive" + (arrived ? " show" : "")}>
          <p>{d.h}</p>
          <button onClick={replay}>⟲</button>
        </div>
      )}
    </div>
  );
}

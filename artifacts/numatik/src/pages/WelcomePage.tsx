import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import WelcomeSolarSystem from "@/components/WelcomeSolarSystem";
import { Volume2, VolumeX } from "lucide-react";
import ExitDialog from "@/components/ExitDialog";
import ThemePickerModal from "@/components/ThemePickerModal";
import LanguagePickerModal from "@/components/LanguagePickerModal";
import { playPopSound } from "@/hooks/useAudio";
import { readLocalStorage, writeLocalStorage } from "@/lib/localStorage";
import { useLanguage } from "@/contexts/LanguageContext";
import "./WelcomePage.css";

const WelcomePage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [transitionStarted, setTransitionStarted] = useState(false);
  const [muted, setMuted] = useState(() => readLocalStorage("numatik_welcome_muted") === "1");
  const transitionTimerRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleThemeContinue = useCallback(() => {
    setShowThemePicker(false);
    setShowLangPicker(true);
  }, []);

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) window.clearTimeout(transitionTimerRef.current);
      const context = audioContextRef.current;
      if (context && context.state !== "closed") void context.close();
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      writeLocalStorage("numatik_welcome_muted", next ? "1" : "0");
      return next;
    });
  }, []);

  const requestGyro = useCallback(async () => {
    const orientationApi = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<"granted" | "denied">;
    };
    if (typeof orientationApi.requestPermission === "function") {
      try {
        await orientationApi.requestPermission();
      } catch {
        // Gyroscope is optional.
      }
    }
  }, []);

  const playWhoosh = useCallback(() => {
    if (muted) return;
    try {
      const context = new AudioContext();
      audioContextRef.current = context;
      const buffer = context.createBuffer(1, context.sampleRate * 1.2, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        const progress = i / data.length;
        data[i] = (Math.random() * 2 - 1) * Math.pow(progress, 0.7);
      }
      const source = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(420, context.currentTime);
      filter.frequency.exponentialRampToValueAtTime(2600, context.currentTime + 1.05);
      filter.Q.value = 0.7;
      gain.gain.setValueAtTime(0.001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.28, context.currentTime + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 1.2);
      source.buffer = buffer;
      source.connect(filter);
      filter.connect(gain);
      gain.connect(context.destination);
      source.start();
    } catch {
      // Audio is optional and only starts from user interaction.
    }
  }, [muted]);

  const handleStart = useCallback(async () => {
    await requestGyro();
    playPopSound();
    playWhoosh();
    if (!muted && "vibrate" in navigator) navigator.vibrate([35, 25, 55]);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowThemePicker(true);
      return;
    }

    setTransitionStarted(true);
    transitionTimerRef.current = window.setTimeout(() => {
      setShowThemePicker(true);
    }, 1900);
  }, [muted, playWhoosh, requestGyro]);

  const languageLabel = {
    id: "ID",
    en: "EN",
    "ms-MY": "MS",
    ja: "JA",
    "zh-CN": "ZH",
    ru: "RU",
  }[language];

  return (
    <div className={`welcome-page${transitionStarted ? " is-transitioning" : ""}`}>
      <div className="welcome-math-symbols" aria-hidden="true">
        {["π", "∑", "√", "∠", "∞", "Δ", "×", "÷"].map((symbol, index) => (
          <span key={symbol} style={{ "--symbol-index": index } as React.CSSProperties}>{symbol}</span>
        ))}
      </div>
      <button
        type="button"
        className="welcome-language"
        aria-label={t("languageLabel")}
        onClick={() => setShowLangPicker(true)}
      >
        {languageLabel}
      </button>
      <button
        type="button"
        className="welcome-mute"
        aria-label={muted ? t("soundOn") : t("soundOff")}
        aria-pressed={muted}
        onClick={toggleMute}
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <div className="fixed right-0 top-0 z-[7] p-4">
        <ExitDialog />
      </div>

      <div className="welcome-content">
        <main className="welcome-main">
          <div className="welcome-copy">
            <p className="welcome-greeting">{t("welcome")}</p>
            <h1 className="welcome-title">{t("appName")}</h1>
            <p className="welcome-subtitle">{t("subtitle")}</p>
            <p className="welcome-year">{t("schoolYear")}</p>
            <div className="welcome-start-row">
              <button type="button" className="welcome-start" onClick={handleStart}>
                {t("start")}
              </button>
            </div>
          </div>
          <WelcomeSolarSystem transitionStarted={transitionStarted} />
        </main>
        <div className="welcome-marquee" aria-label={t("marquee")}>
          <div className="welcome-marquee-track">
            {[0, 1, 2, 3].map((item) => (
              <span key={item}>{t("marquee")}</span>
            ))}
          </div>
        </div>
      </div>

      <ThemePickerModal
        open={showThemePicker}
        onClose={() => setShowThemePicker(false)}
        onContinue={handleThemeContinue}
      />
      <LanguagePickerModal
        open={showLangPicker}
        onClose={() => setShowLangPicker(false)}
      />
    </div>
  );
};

export default WelcomePage;

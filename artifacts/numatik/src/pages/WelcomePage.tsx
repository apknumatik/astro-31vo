import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ExitDialog from "@/components/ExitDialog";
import ThemePickerModal from "@/components/ThemePickerModal";
import LanguagePickerModal from "@/components/LanguagePickerModal";
import { playPopSound } from "@/hooks/useAudio";
import { useLanguage, type Language } from "@/contexts/LanguageContext";
import NumatikWelcome, { type WelcomeLang } from "./NumatikWelcome";

const toWelcomeLang = (language: Language): WelcomeLang => {
  if (language === "ms-MY") return "ms";
  if (language === "zh-CN") return "zh";
  return language;
};

const toAppLang = (language: WelcomeLang): Language => {
  if (language === "ms") return "ms-MY";
  if (language === "zh") return "zh-CN";
  return language;
};

const WelcomePage = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [showWelcome, setShowWelcome] = useState(true);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [instantLanguageTransition, setInstantLanguageTransition] = useState(false);

  const handleThemeContinue = useCallback(() => {
    setInstantLanguageTransition(true);
    setShowThemePicker(false);
    setShowLangPicker(true);
  }, []);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("lang")) return;
    if (language !== "id") setLanguage("id");
  }, [language, setLanguage]);

  const handleStart = useCallback(() => {
    playPopSound();
    setInstantLanguageTransition(false);
    setShowWelcome(false);
    setShowThemePicker(true);
  }, []);

  const handleThemeClose = useCallback(() => {
    setShowThemePicker(false);
    setShowWelcome(true);
  }, []);

  const handleLanguageClose = useCallback(() => {
    setShowLangPicker(false);
    setShowWelcome(true);
  }, []);

  const handleClose = useCallback(() => {
    document.querySelector<HTMLButtonElement>("#btn-exit")?.click();
  }, []);

  const handleLangChange = useCallback((nextLanguage: WelcomeLang) => {
    const appLanguage = toAppLang(nextLanguage);
    setLanguage(appLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", appLanguage);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, [setLanguage]);

  const academicYear = t("schoolYear").match(/\d{4}\s*[–-]\s*\d{4}/)?.[0] ?? "";

  return (
    <>
      {showWelcome && (
        <NumatikWelcome
          onStart={handleStart}
          onClose={handleClose}
          lang={toWelcomeLang(language)}
          onLangChange={handleLangChange}
          academicYear={academicYear}
          langStorageKey="numatik_language"
        />
      )}
      <div className="hidden">
        <ExitDialog />
      </div>
      <ThemePickerModal
        open={showThemePicker}
        onClose={handleThemeClose}
        onContinue={handleThemeContinue}
      />
      <LanguagePickerModal
        open={showLangPicker}
        onClose={handleLanguageClose}
        instantEntrance={instantLanguageTransition}
      />
    </>
  );
};

export default WelcomePage;

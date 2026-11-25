import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  ArrowLeft,
  CircleHelp,
  Loader2,
  Megaphone,
  Menu,
  Search,
  X,
} from "lucide-react";
import Starfield, { StarfieldVisibilityContext } from "@/components/Starfield";
import MenuHeaderControls from "@/components/MenuHeaderControls";
import MenuSidebar from "@/components/MenuSidebar";
import ExitDialog from "@/components/ExitDialog";
import { MENU_ITEMS, MENU_SECTIONS, type MenuGroup, type MenuItemConfig } from "@/data/menuConfig";
import { MENU_ANNOUNCEMENTS } from "@/data/menuAnnouncements";
import { playPopSound } from "@/hooks/useAudio";
import { useResponsiveSidebarVisibility } from "@/hooks/useResponsiveSidebarVisibility";
import { hasSeenGuide, markGuideSeen } from "@/lib/guideVisit";
import { useSound } from "@/contexts/SoundContext";

type DeepSearchItem = { path: string; title: string; content: string };

const RECENT_STORAGE_KEY = "numatik-menu-recent";

const normalizeBrandName = (text: string) => text.replace(/NUMATIK/gi, "Numatik");

const formatMenuLabel = (label: string) => {
  if (!/[A-Za-z]/.test(label)) return label;
  const acronyms = new Set(["AI", "LKPD", "TKA", "RPP", "SD", "SMP", "SMA"]);
  return label
    .toLowerCase()
    .replace(/\b([a-z])/g, (letter) => letter.toUpperCase())
    .replace(/\b[A-Za-z]+\b/g, (word) => {
      const upper = word.toUpperCase();
      return acronyms.has(upper) ? upper : word;
    });
};

let deepIndexCache: DeepSearchItem[] | null = null;
let deepIndexPromise: Promise<DeepSearchItem[]> | null = null;

function loadDeepSearchIndex(): Promise<DeepSearchItem[]> {
  if (deepIndexCache) return Promise.resolve(deepIndexCache);
  if (!deepIndexPromise) {
    deepIndexPromise = fetch("/search-index.json")
      .then((response) => response.ok ? response.json() : [])
      .then((data: DeepSearchItem[]) => {
        deepIndexCache = data;
        return data;
      })
      .catch(() => {
        deepIndexCache = [];
        return [];
      });
  }
  return deepIndexPromise;
}

function readRecentPaths(): string[] {
  try {
    const saved = localStorage.getItem(RECENT_STORAGE_KEY);
    if (!saved) return [];
    const parsed: unknown = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];
    const validPaths = new Set<string>(MENU_ITEMS.map((item) => item.path));
    return parsed
      .filter((path): path is string => typeof path === "string" && validPaths.has(path))
      .slice(0, 3);
  } catch (error) {
    console.warn("Unable to read recent menu items.", error);
    return [];
  }
}

function findMenuItem(path: string): MenuItemConfig | undefined {
  return MENU_ITEMS.find((item) => item.path === path);
}

function isHomeMenuItem(item: MenuItemConfig): boolean {
  return item.key !== "ujiMandiri";
}

const MenuPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { soundOn } = useSound();
  const [searchQuery, setSearchQuery] = useState("");
  const [deepIndex, setDeepIndex] = useState<DeepSearchItem[] | null>(deepIndexCache);
  const [deepIndexLoading, setDeepIndexLoading] = useState(false);
  const [recentPaths, setRecentPaths] = useState(readRecentPaths);
  const [guideSeen, setGuideSeen] = useState(hasSeenGuide);
  const [isPageVisible, setIsPageVisible] = useState(() => !document.hidden);
  const [isSidebarVisible, setIsSidebarVisible] = useResponsiveSidebarVisibility();

  useEffect(() => {
    if (location.state?.showLearningWelcome !== true) return;
    toast.success(t("learningWelcome"));
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate, t]);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => document.removeEventListener("visibilitychange", updateVisibility);
  }, []);

  useEffect(() => {
    if (!searchQuery.trim() || deepIndex) return;
    let cancelled = false;
    setDeepIndexLoading(true);
    loadDeepSearchIndex().then((data) => {
      if (!cancelled) {
        setDeepIndex(data);
        setDeepIndexLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [searchQuery, deepIndex]);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    if (!normalizedQuery) return true;
    const label = t(`menuItems.${item.key}.label`).toLowerCase();
    const description = t(`menuItems.${item.key}.desc`).toLowerCase();
    return `${label} ${description}`.includes(normalizedQuery);
  });

  const filteredDeepResults = useMemo(() => {
    if (!normalizedQuery || !deepIndex) return [];
    return deepIndex
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();
        const titleHit = titleLower.includes(normalizedQuery);
        const pathHit = item.path.toLowerCase().includes(normalizedQuery);
        const contentIndex = contentLower.indexOf(normalizedQuery);
        if (!titleHit && !pathHit && contentIndex < 0) return null;
        const snippet = contentIndex >= 0
          ? item.content.slice(Math.max(0, contentIndex - 60), contentIndex + normalizedQuery.length + 100)
          : item.content.slice(0, 140);
        const rank = titleHit ? 0 : pathHit ? 1 : 2;
        return { ...item, snippet, rank };
      })
      .filter((item): item is DeepSearchItem & { snippet: string; rank: number } => Boolean(item))
      .sort((a, b) => a.rank - b.rank || a.title.localeCompare(b.title))
      .slice(0, 24);
  }, [normalizedQuery, deepIndex]);

  const recentItems = recentPaths
    .map(findMenuItem)
    .filter((item): item is MenuItemConfig => item !== undefined);

  const handleOpenPath = (path: string, routeState?: { skipIntroAnimation?: boolean }) => {
    if (MENU_ITEMS.some((item) => item.path === path)) {
      const updatedPaths = [path, ...recentPaths.filter((recentPath) => recentPath !== path)].slice(0, 3);
      setRecentPaths(updatedPaths);
      try {
        localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(updatedPaths));
      } catch (error) {
        console.warn("Unable to save recent menu items.", error);
      }
    }
    if (soundOn) {
      playPopSound();
      if ("vibrate" in navigator) navigator.vibrate(10);
    }
    navigate(path, routeState ? { state: routeState } : undefined);
  };

  const handleOpenItem = (item: MenuItemConfig) => handleOpenPath(item.path);

  const handleOpenGuide = () => {
    markGuideSeen();
    setGuideSeen(true);
    handleOpenPath("/petunjuk");
  };

  const renderFirstVisitAnnouncement = () => (
    <aside className="menu-announcement menu-first-visit" role="status">
      <CircleHelp aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span className="menu-first-visit-text">{t("menu.newUserGuideAnnouncement")}</span>
      <button
        type="button"
        onClick={handleOpenGuide}
        className="menu-first-visit-action menu-focusable"
      >
        {t("menu.viewGuide")}
      </button>
    </aside>
  );

  const renderDesktopAnnouncement = () => {
    if (!guideSeen) return renderFirstVisitAnnouncement();

    const announcement = MENU_ANNOUNCEMENTS[0];
    if (!announcement) return null;

    return (
      <aside className="menu-announcement" role="status">
        <Megaphone aria-hidden="true" className="h-4 w-4 shrink-0" />
        <p>{t(announcement.messageKey)}</p>
      </aside>
    );
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    document.getElementById("menu-desktop-content")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderRecentItems = () => recentItems.length > 0 && (
    <div className="menu-recent-strip" aria-label={t("menu.lastOpened")}>
      <span className="menu-recent-label">{t("menu.lastOpened")}</span>
      {recentItems.map((item) => (
        <button
          key={item.path}
          type="button"
          onClick={() => handleOpenItem(item)}
          className="menu-recent-chip menu-focusable"
          aria-label={normalizeBrandName(t(`menuItems.${item.key}.label`))}
          title={normalizeBrandName(t(`menuItems.${item.key}.label`))}
        >
          {formatMenuLabel(t(`menu.${item.key}`))}
        </button>
      ))}
    </div>
  );

  const renderCompactCard = (item: MenuItemConfig) => {
    const Icon = item.icon;
    return (
      <button
        key={item.path}
        type="button"
        onClick={() => handleOpenItem(item)}
        aria-label={normalizeBrandName(t(`menuItems.${item.key}.label`))}
        className="menu-card menu-focusable menu-compact-card"
      >
        <span className="menu-compact-icon-box">
          <Icon aria-hidden="true" className="h-11 w-11" />
        </span>
        <span className="menu-compact-title" data-menu-key={item.key}>
          {formatMenuLabel(t(`menu.${item.key}`))}
        </span>
      </button>
    );
  };

  const renderExpandedCard = (item: MenuItemConfig, desktop = false) => {
    const Icon = item.icon;
    const feedbackCardClass = item.key === "kritikSaran" && !desktop ? " menu-feedback-card" : "";
    return (
      <button
        key={item.path}
        type="button"
        onClick={() => handleOpenItem(item)}
        aria-label={normalizeBrandName(t(`menuItems.${item.key}.label`))}
        className={`menu-card menu-focusable menu-expanded-card${desktop ? " menu-expanded-card-desktop" : ""}${feedbackCardClass}`}
      >
        <span className="menu-card-icon-box">
          <Icon aria-hidden="true" className="menu-card-icon" />
        </span>
        <span className="menu-expanded-copy">
          <span className="menu-card-title menu-expanded-title">{formatMenuLabel(t(`menuItems.${item.key}.label`))}</span>
          <span className="menu-card-description menu-expanded-description" title={desktop ? normalizeBrandName(t(`menuItems.${item.key}.desc`)) : undefined}>
            {normalizeBrandName(t(`menuItems.${item.key}.desc`))}
          </span>
        </span>
      </button>
    );
  };

  const renderFeaturedCard = (item: MenuItemConfig, desktop = false) => {
    const Icon = item.icon;
    return (
      <button
        key={item.path}
        type="button"
        onClick={() => handleOpenItem(item)}
        aria-label={normalizeBrandName(t(`menuItems.${item.key}.label`))}
        className={`menu-card menu-focusable menu-featured-card${desktop ? " menu-featured-card-desktop" : ""}`}
      >
        <Icon aria-hidden="true" className="menu-featured-watermark" />
        <span className="menu-featured-icon-box">
          <Icon aria-hidden="true" />
        </span>
        <span className="menu-featured-title">
          {formatMenuLabel(desktop ? t(`menuItems.${item.key}.label`) : t(`menu.${item.key}`))}
        </span>
        <span className="menu-card-description menu-featured-description">
          {normalizeBrandName(t(`menuItems.${item.key}.desc`))}
        </span>
      </button>
    );
  };

  const renderSection = (group: MenuGroup, mode: "compact" | "expanded", desktop = false) => {
    const section = MENU_SECTIONS.find((candidate) => candidate.group === group);
    if (!section) return null;
    const items = MENU_ITEMS.filter((item) => item.group === group && !item.featured && isHomeMenuItem(item));
    return (
      <section
        key={group}
        id={desktop ? `menu-section-${group}` : `menu-mobile-section-${group}`}
        className="menu-section"
      >
        <h2 className="menu-section-title">{t(section.labelKey)}</h2>
        <div className={mode === "compact" ? "menu-compact-grid" : "menu-expanded-grid"}>
          {items.map((item) => mode === "compact" ? renderCompactCard(item) : renderExpandedCard(item, desktop))}
        </div>
      </section>
    );
  };

  const renderSearchResults = (desktop = false) => (
    <div className="menu-search-results">
      {normalizedQuery && deepIndexLoading && filteredDeepResults.length === 0 && (
        <div className="menu-search-status" role="status">
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
          <span>{t("menu.deepSearchLoading")}</span>
        </div>
      )}

      {filteredDeepResults.length > 0 && (
        <section className="menu-deep-results">
          <h2 className="menu-section-title">
            {t("menu.deepSearchTitle")} ({filteredDeepResults.length}{filteredDeepResults.length === 24 ? "+" : ""})
          </h2>
          <div className="menu-deep-result-list">
            {filteredDeepResults.map((result) => (
              <button
                key={result.path}
                type="button"
                onClick={() => handleOpenPath(result.path)}
                className="menu-deep-result menu-focusable"
              >
                <span className="menu-deep-result-copy">
                  <span className="menu-card-title menu-deep-result-title">{normalizeBrandName(result.title)}</span>
                  <span className="menu-card-description menu-deep-result-snippet">{normalizeBrandName(result.snippet)}</span>
                </span>
                <span className="menu-muted shrink-0 text-xs">{t("menu.open")}</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {filteredMenuItems.length > 0 && (
        <section className="menu-search-menu-results">
          <h2 className="menu-section-title">{t("menu.matchingMenuItems")}</h2>
          <div className={desktop ? "menu-expanded-grid menu-search-card-grid" : "menu-search-card-grid"}>
            {filteredMenuItems.map((item) => renderExpandedCard(item, desktop))}
          </div>
        </section>
      )}

      {filteredMenuItems.length === 0 && filteredDeepResults.length === 0 && !deepIndexLoading && (
        <div className="menu-empty-state">
          <Search aria-hidden="true" className="menu-card-icon h-8 w-8" />
          <p className="menu-card-title">{t("menu.noSearchResults")}</p>
          <p className="menu-card-description">{t("menu.tryDifferentQuery")}</p>
        </div>
      )}
    </div>
  );

  const renderMobileHome = () => (
    <div className="menu-mobile-home">
      <div className="menu-featured-grid">
        {MENU_ITEMS.filter((item) => item.featured).map((item) => renderFeaturedCard(item))}
      </div>
      <div className="menu-mobile-sections">
        {MENU_SECTIONS.map((section) => renderSection(section.group, "compact"))}
      </div>
    </div>
  );

  const renderDesktopHome = () => {
    const sections = MENU_SECTIONS.map((section) => ({
      ...section,
      items: MENU_ITEMS.filter((item) => item.group === section.group && !item.featured && isHomeMenuItem(item)),
    }));

    return (
      <>
        <div className="menu-featured-grid menu-featured-grid-desktop">
          {MENU_ITEMS.filter((item) => item.featured).map((item) => renderFeaturedCard(item, true))}
        </div>
        <div className="menu-desktop-sections">
          {sections.map((section) => (
            <h2
              key={section.group}
              id={`menu-section-${section.group}`}
              className="menu-section-title"
            >
              {t(section.labelKey)}
            </h2>
          ))}
          {Array.from({ length: 4 }, (_, row) => sections.map(({ group, items }) => {
            const item = items[row];
            return item
              ? renderExpandedCard(item, true)
              : <div key={`${group}-empty-${row}`} aria-hidden="true" />;
          }))}
        </div>
      </>
    );
  };

  return (
    <div className="menu-page menu-app-root" data-tab-active={isPageVisible}>
      <StarfieldVisibilityContext.Provider value={isPageVisible}>
        <Starfield />
      </StarfieldVisibilityContext.Provider>
      {isSidebarVisible && (
        <div className="menu-mobile-sidebar-layer">
          <button
            type="button"
            aria-label={t("menu.hideSidebar")}
            onClick={() => setIsSidebarVisible(false)}
            className="menu-mobile-sidebar-backdrop"
          />
          <MenuSidebar
            onOpenItem={handleOpenItem}
            onHomeClick={handleHomeClick}
            onToggleVisibility={() => setIsSidebarVisible(false)}
            isVisible
          />
        </div>
      )}
      <div className="menu-mobile-layout">
        <header className="menu-mobile-header">
          <div className="menu-brand menu-mobile-brand-row">
            {!isSidebarVisible && (
              <button
                type="button"
                onClick={() => setIsSidebarVisible(true)}
                aria-label={t("menu.showSidebar")}
                title={t("menu.showSidebar")}
                aria-expanded={false}
                className="menu-sidebar-toggle menu-mobile-sidebar-trigger menu-focusable"
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
            <div className="menu-mobile-brand-copy">
              <h1 className="menu-page-title menu-brand-title">
                <button
                  type="button"
                  onClick={handleHomeClick}
                  aria-label={t("menu.homeTab")}
                  className="menu-brand-home-button menu-focusable"
                >
                  NUMATIK
                </button>
              </h1>
              <button
                type="button"
                onClick={() => handleOpenPath("/")}
                aria-label={t("nav.backToHome")}
                className="menu-mobile-home-return menu-focusable"
              >
                <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                <span>{t("nav.backToHome")}</span>
              </button>
            </div>
          </div>
          <div className="menu-mobile-header-actions">
            <MenuHeaderControls />
            <ExitDialog className="menu-control-button menu-mobile-exit-button" />
          </div>
        </header>

        <main className="menu-mobile-main">
          <div className="menu-search-box">
            <Search aria-hidden="true" className="menu-search-icon" />
            <label htmlFor="mobile-menu-search" className="sr-only">{t("menu.searchAriaLabel")}</label>
            <input
              id="mobile-menu-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={t("menu.searchPlaceholder")}
              className="menu-search-field menu-search-input menu-focusable"
            />
            {searchQuery && (
              <button
                type="button"
                aria-label={t("menu.clearSearch")}
                title={t("menu.clearSearch")}
                onClick={() => setSearchQuery("")}
                className="menu-search-clear menu-focusable"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            )}
          </div>

          {guideSeen && renderRecentItems()}

          <div className={`menu-mobile-content${normalizedQuery ? " menu-mobile-search-content" : ""}`}>
            {normalizedQuery
              ? renderSearchResults()
              : renderMobileHome()}
          </div>
        </main>

      </div>

      <div className="menu-desktop-layout">
        <MenuSidebar
          onOpenItem={handleOpenItem}
          onHomeClick={handleHomeClick}
          onToggleVisibility={() => setIsSidebarVisible(false)}
          isVisible={isSidebarVisible}
        />

        <main className="menu-desktop-main">
          <header className="menu-desktop-header">
            {!isSidebarVisible && (
              <button
                type="button"
                onClick={() => setIsSidebarVisible(true)}
                aria-label={t("menu.showSidebar")}
                aria-expanded={isSidebarVisible}
                title={t("menu.showSidebar")}
                className="menu-sidebar-toggle menu-focusable"
              >
                <Menu aria-hidden="true" className="h-5 w-5" />
              </button>
            )}
            <div className="menu-search-box">
              <Search aria-hidden="true" className="menu-search-icon" />
              <label htmlFor="desktop-menu-search" className="sr-only">{t("menu.searchAriaLabel")}</label>
              <input
                id="desktop-menu-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={t("menu.searchPlaceholder")}
                className="menu-search-field menu-search-input menu-focusable"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label={t("menu.clearSearch")}
                  title={t("menu.clearSearch")}
                  onClick={() => setSearchQuery("")}
                  className="menu-search-clear menu-focusable"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </div>
            <MenuHeaderControls />
          </header>

          {renderRecentItems()}
          {renderDesktopAnnouncement()}

          <div id="menu-desktop-content" className={`menu-desktop-content${normalizedQuery ? " menu-desktop-search-content" : ""}`}>
            {normalizedQuery
              ? renderSearchResults(true)
              : renderDesktopHome()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MenuPage;

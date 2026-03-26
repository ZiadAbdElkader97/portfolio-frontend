import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import i18n from "../i18n";

const STORAGE_KEY = "portfolio-customizer";

const defaultState = {
  activeTheme: "BLUE_THEME",
  activeMode: "light",
  isBorderRadius: 12,
};

export const CustomizerContext = createContext(null);

const muiLocaleFromI18n = (lng) => (lng === "ar" ? "arEG" : "enUS");
const dirFromI18n = (lng) => (lng === "ar" ? "rtl" : "ltr");

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function CustomizerProvider({ children }) {
  const stored = readStored();

  const [activeTheme, setActiveTheme] = useState(
    () => stored.activeTheme || defaultState.activeTheme
  );
  const [activeMode, setActiveMode] = useState(() => {
    if (stored.activeMode) return stored.activeMode;
    const legacy = localStorage.getItem("mode");
    if (legacy === "light") return "light";
    if (legacy === "dark") return "dark";
    return defaultState.activeMode;
  });
  const [isBorderRadius, setIsBorderRadius] = useState(
    () => stored.isBorderRadius ?? defaultState.isBorderRadius
  );

  const [activeDir, setActiveDir] = useState(() =>
    dirFromI18n(i18n.language || "en")
  );
  const [isLanguage, setIsLanguage] = useState(() =>
    muiLocaleFromI18n(i18n.language || "en")
  );

  useEffect(() => {
    const sync = (lng) => {
      const code = typeof lng === "string" ? lng : i18n.language || "en";
      setActiveDir(dirFromI18n(code));
      setIsLanguage(muiLocaleFromI18n(code));
    };
    if (i18n.isInitialized) sync();
    i18n.on("initialized", sync);
    i18n.on("languageChanged", sync);
    return () => {
      i18n.off("initialized", sync);
      i18n.off("languageChanged", sync);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ activeTheme, activeMode, isBorderRadius })
    );
    localStorage.setItem("mode", activeMode === "light" ? "light" : "dark");
  }, [activeTheme, activeMode, isBorderRadius]);

  const toggleMode = useCallback(() => {
    setActiveMode((m) => (m === "light" ? "dark" : "light"));
  }, []);

  const value = useMemo(
    () => ({
      activeTheme,
      setActiveTheme,
      activeMode,
      setActiveMode,
      toggleMode,
      activeDir,
      setActiveDir,
      isBorderRadius,
      setIsBorderRadius,
      isLanguage,
      setIsLanguage,
    }),
    [
      activeTheme,
      activeMode,
      toggleMode,
      activeDir,
      isBorderRadius,
      isLanguage,
    ]
  );

  return (
    <CustomizerContext.Provider value={value}>
      {children}
    </CustomizerContext.Provider>
  );
}

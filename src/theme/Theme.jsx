import { useContext, useEffect, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import * as locales from "@mui/material/locale";
import { CustomizerContext } from "../context/CustomizerContext";
import typography from "./Typography.jsx";
import { shadows, darkshadows } from "./Shadows.jsx";
import { DarkThemeColors } from "./DarkThemeColors.jsx";
import { LightThemeColors } from "./LightThemeColors.jsx";
import { baseDarkTheme, baselightTheme } from "./DefaultColors.jsx";

export function BuildTheme(config = {}) {
  const themeOptions =
    LightThemeColors.find((theme) => theme.name === config.theme) ||
    LightThemeColors[0];
  const darkthemeOptions =
    DarkThemeColors.find((theme) => theme.name === config.theme) ||
    DarkThemeColors[0];

  const defaultTheme =
    config.activeMode === "dark" ? baseDarkTheme : baselightTheme;
  const defaultShadow =
    config.activeMode === "dark" ? darkshadows : shadows;
  const themeSelect =
    config.activeMode === "dark" ? darkthemeOptions : themeOptions;

  const radius =
    typeof config.isBorderRadius === "number"
      ? config.isBorderRadius
      : 12;

  const baseMode = {
    palette: {
      mode: config.activeMode,
    },
    shape: {
      borderRadius: radius,
    },
    shadows: defaultShadow,
    typography,
  };

  const locale = locales[config.isLanguage] || locales.enUS;

  const merged = deepmerge(
    deepmerge(
      deepmerge(deepmerge(baseMode, defaultTheme), locale),
      themeSelect
    ),
    { direction: config.direction }
  );

  return createTheme(merged);
}

export function useAppMuiTheme() {
  const {
    activeTheme,
    activeDir,
    activeMode,
    isBorderRadius,
    isLanguage,
  } = useContext(CustomizerContext);

  const theme = useMemo(
    () =>
      BuildTheme({
        direction: activeDir,
        theme: activeTheme,
        activeMode,
        isBorderRadius,
        isLanguage,
      }),
    [activeDir, activeTheme, activeMode, isBorderRadius, isLanguage]
  );

  useEffect(() => {
    document.documentElement.setAttribute("dir", activeDir);
    document.documentElement.setAttribute(
      "lang",
      isLanguage === "arEG" ? "ar" : "en"
    );
  }, [activeDir, isLanguage]);

  return theme;
}

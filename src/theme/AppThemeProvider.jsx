import { useContext, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { CustomizerContext } from "../context/CustomizerContext";
import { useAppMuiTheme } from "./Theme.jsx";

const cacheLtr = createCache({ key: "mui", prepend: true });
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
  prepend: true,
});

function InnerTheme({ children }) {
  const theme = useAppMuiTheme();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function AppThemeProvider({ children }) {
  const { activeDir } = useContext(CustomizerContext);
  const cache = useMemo(
    () => (activeDir === "rtl" ? cacheRtl : cacheLtr),
    [activeDir]
  );

  return (
    <CacheProvider value={cache}>
      <InnerTheme>{children}</InnerTheme>
    </CacheProvider>
  );
}

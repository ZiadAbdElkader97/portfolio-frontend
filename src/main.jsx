import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import App from "./App.jsx";
import "./index.css";
import { CustomizerProvider } from "./context/CustomizerContext";
import { DashboardAuthProvider } from "./context/DashboardAuthContext";
import { AppThemeProvider } from "./theme/AppThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CustomizerProvider>
      <AppThemeProvider>
        <DashboardAuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </DashboardAuthProvider>
      </AppThemeProvider>
    </CustomizerProvider>
  </StrictMode>
);

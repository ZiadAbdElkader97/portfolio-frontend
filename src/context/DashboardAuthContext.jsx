import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "portfolio-dashboard-session";

const DashboardAuthContext = createContext(null);

export function DashboardAuthProvider({ children }) {
  const [session, setSession] = useState(() =>
    sessionStorage.getItem(STORAGE_KEY)
  );

  const login = useCallback((email, password) => {
    const ok =
      typeof email === "string" &&
      email.trim().length > 0 &&
      typeof password === "string" &&
      password.length >= 4;
    if (!ok) return false;
    sessionStorage.setItem(STORAGE_KEY, "1");
    setSession("1");
    return true;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session, login, logout]
  );

  return (
    <DashboardAuthContext.Provider value={value}>
      {children}
    </DashboardAuthContext.Provider>
  );
}

export function useDashboardAuth() {
  const ctx = useContext(DashboardAuthContext);
  if (!ctx) {
    throw new Error("useDashboardAuth must be used within DashboardAuthProvider");
  }
  return ctx;
}

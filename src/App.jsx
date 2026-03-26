import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import Preloader from "./components/ui/Preloader";

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const minDisplayMs = 1650;
    const started = performance.now();

    const finish = () => {
      const elapsed = performance.now() - started;
      const remaining = Math.max(0, minDisplayMs - elapsed);
      window.setTimeout(() => setShowPreloader(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
    }

    return () => window.removeEventListener("load", finish);
  }, []);

  return (
    <>
      {showPreloader && <Preloader />}
      {!showPreloader && <AppRoutes />}
    </>
  );
}

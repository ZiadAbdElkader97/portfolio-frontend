import { Navigate } from "react-router-dom";
import { useDashboardAuth } from "../context/DashboardAuthContext";
import DashboardPanelPage from "../views/DashboardPanelPage";

export default function DashboardPanelRoute() {
  const { isAuthenticated } = useDashboardAuth();

  if (!isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <DashboardPanelPage />;
}

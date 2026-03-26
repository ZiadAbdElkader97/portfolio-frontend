import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardShell from "../layouts/DashboardShell";
import HomePage from "../views/HomePage";
import FeaturesPage from "../views/FeaturesPage";
import ProjectsPage from "../views/ProjectsPage";
import ProjectDetailPage from "../views/ProjectDetailPage";
import ResumePage from "../views/ResumePage";
import ContactPage from "../views/ContactPage";
import DashboardLoginPage from "../views/DashboardLoginPage";
import DashboardPanelRoute from "./DashboardPanelRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardShell />}>
        <Route index element={<DashboardLoginPage />} />
        <Route path="panel" element={<DashboardPanelRoute />} />
      </Route>
    </Routes>
  );
}

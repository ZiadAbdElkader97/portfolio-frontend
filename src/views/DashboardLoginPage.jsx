import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import LockRounded from "@mui/icons-material/LockRounded";
import { useDashboardAuth } from "../context/DashboardAuthContext";

export default function DashboardLoginPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useDashboardAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/dashboard/panel" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const ok = login(email, password);
    if (ok) {
      navigate("/dashboard/panel", { replace: true });
    } else {
      setError(t("loginError"));
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 440,
        borderRadius: 4,
        border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
        boxShadow: `0 24px 64px ${alpha("#000", theme.palette.mode === "dark" ? 0.35 : 0.08)}`,
        bgcolor: alpha(theme.palette.background.paper, 0.85),
        backdropFilter: "blur(20px)",
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2.5,
            display: "grid",
            placeItems: "center",
            mb: 2,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.35)}`,
          }}
        >
          <LockRounded sx={{ color: "#fff", fontSize: 28 }} />
        </Box>
        <Typography variant="h5" fontWeight={800} gutterBottom>
          {t("loginTitle")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
          {t("loginSubtitle")}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t("loginEmail")}
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label={t("loginPassword")}
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            helperText={t("loginPasswordHint")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ py: 1.35, fontWeight: 700, borderRadius: 2 }}
          >
            {t("loginSubmit")}
          </Button>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 3, lineHeight: 1.6 }}>
          {t("loginDemoNote")}
        </Typography>
      </CardContent>
    </Card>
  );
}

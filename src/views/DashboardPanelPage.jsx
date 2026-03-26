import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import DashboardCustomizeOutlined from "@mui/icons-material/DashboardCustomizeOutlined";
import LogoutRounded from "@mui/icons-material/LogoutRounded";
import { useDashboardAuth } from "../context/DashboardAuthContext";

export default function DashboardPanelPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useDashboardAuth();

  const handleLogout = () => {
    logout();
    navigate("/dashboard", { replace: true });
  };

  return (
    <Box sx={{ py: { xs: 4, md: 6 }, width: "100%" }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutRounded />}
            onClick={handleLogout}
            sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}
          >
            {t("logout")}
          </Button>
        </Box>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            textAlign: "center",
            py: { xs: 4, md: 6 },
            px: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            background: `linear-gradient(160deg, ${alpha(
              theme.palette.primary.main,
              0.08
            )}, ${alpha(theme.palette.secondary.main, 0.06)})`,
          }}
        >
          <CardContent>
            <Box
              sx={{
                width: 72,
                height: 72,
                borderRadius: 3,
                mx: "auto",
                mb: 2,
                display: "grid",
                placeItems: "center",
                bgcolor: alpha(theme.palette.primary.main, 0.15),
                color: "primary.main",
              }}
            >
              <DashboardCustomizeOutlined sx={{ fontSize: 36 }} />
            </Box>
            <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
              {t("dashboardHero")}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 520, mx: "auto", lineHeight: 1.85 }}
            >
              {t("dashboardBody")}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

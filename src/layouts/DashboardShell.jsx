import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";

export default function DashboardShell() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        backgroundImage: `
          radial-gradient(ellipse 100% 80% at 0% 0%, ${alpha(theme.palette.primary.main, 0.18)}, transparent 50%),
          radial-gradient(ellipse 80% 60% at 100% 100%, ${alpha(theme.palette.secondary.main, 0.12)}, transparent 45%)
        `,
      }}
    >
      <Box
        component="header"
        sx={{
          px: { xs: 2, sm: 3 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
          backdropFilter: "blur(12px)",
          bgcolor: alpha(theme.palette.background.paper, 0.6),
        }}
      >
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackRounded />}
          color="inherit"
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          <Typography component="span" variant="body2" fontWeight={700}>
            Portfolio
          </Typography>
        </Button>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          Ziad · Admin
        </Typography>
      </Box>
      <Box
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

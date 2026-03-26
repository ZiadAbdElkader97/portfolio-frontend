import { useEffect, useState } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { alpha, keyframes, useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.04); opacity: 0.92; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export default function Preloader() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => {
        if (p >= 96) return p;
        const next = p + Math.random() * 18 + 4;
        return Math.min(next, 96);
      });
    }, 220);
    return () => clearInterval(id);
  }, []);

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: theme.palette.background.default,
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -20%, ${alpha(theme.palette.primary.main, 0.22)}, transparent),
          radial-gradient(ellipse 60% 40% at 100% 100%, ${alpha(theme.palette.secondary.main, 0.14)}, transparent)
        `,
      }}
    >
      <Box
        sx={{
          width: 88,
          height: 88,
          borderRadius: 3,
          display: "grid",
          placeItems: "center",
          mb: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          boxShadow: `0 16px 48px ${alpha(theme.palette.primary.main, 0.45)}`,
          animation: `${pulse} 2.2s ease-in-out infinite`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            color: "#fff",
            letterSpacing: -0.5,
            textShadow: `0 2px 12px ${alpha("#000", 0.25)}`,
          }}
        >
          Z
        </Typography>
      </Box>

      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          letterSpacing: 1.2,
          textTransform: "uppercase",
          fontSize: "0.75rem",
          color: "text.secondary",
          mb: 0.5,
        }}
      >
        {t("preloaderKicker")}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {t("preloaderTitle")}
      </Typography>

      <Box sx={{ width: { xs: "82%", sm: 320 }, maxWidth: 360 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4,
            borderRadius: 4,
            bgcolor: alpha(theme.palette.primary.main, 0.12),
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              backgroundSize: "200% 100%",
              animation: `${shimmer} 1.8s linear infinite`,
            },
          }}
        />
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", textAlign: "center", mt: 1.5 }}
        >
          {t("preloaderSubtitle")}
        </Typography>
      </Box>
    </Box>
  );
}

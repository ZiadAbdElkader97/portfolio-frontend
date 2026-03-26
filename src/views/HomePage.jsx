import { useTranslation } from "react-i18next";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router-dom";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import CodeRounded from "@mui/icons-material/CodeRounded";
import AppTooltip from "../components/ui/AppTooltip";
import {
  FaReact,
  FaFigma,
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { SiMui } from "react-icons/si";
import { socialLinks } from "../data/socialLinks";

const socialIcons = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

function SocialRow() {
  const { t } = useTranslation();
  const theme = useTheme();

  const socialDescKey = (id) =>
    `tooltipSocialDesc${id.charAt(0).toUpperCase()}${id.slice(1)}`;

  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
      {socialLinks.map((s) => {
        const Icon = socialIcons[s.id];
        return (
          <AppTooltip
            key={s.id}
            title={t(s.titleKey)}
            description={t(socialDescKey(s.id))}
            placement="top"
          >
            <Box
              component="a"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t(s.titleKey)}
              sx={{
                width: 44,
                height: 44,
                borderRadius: 2,
                display: "grid",
                placeItems: "center",
                color: "primary.main",
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: theme.shadows[4],
                  bgcolor: alpha(theme.palette.primary.main, 0.18),
                  borderColor: alpha(theme.palette.primary.main, 0.3),
                },
              }}
            >
              <Icon size={20} />
            </Box>
          </AppTooltip>
        );
      })}
    </Stack>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [text] = useTypewriter({
    words: [t("Professional Coder."), t("Full Stack Developer.")],
    loop: true,
    typeSpeed: 28,
    deleteSpeed: 12,
    delaySpeed: 2200,
  });

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 10 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${alpha(
            theme.palette.primary.main,
            0.22
          )}, transparent 55%),
          radial-gradient(ellipse 70% 50% at 85% 10%, ${alpha(
            theme.palette.secondary.main,
            0.18
          )}, transparent 50%),
          linear-gradient(180deg, ${alpha(
            theme.palette.background.default,
            0
          )} 0%, ${theme.palette.background.default} 100%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <Typography
                variant="overline"
                sx={{
                  letterSpacing: 3,
                  color: "primary.main",
                  fontWeight: 600,
                }}
              >
                {t("Welcome To My World")}
              </Typography>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  mt: 1,
                  mb: 1,
                  fontWeight: 700,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                }}
              >
                {t("Hi, I’m")}{" "}
                <Box
                  component="span"
                  sx={{
                    background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {t("Ziad Abd Elkader")}
                </Box>
              </Typography>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontWeight: 500,
                  color: "text.secondary",
                  minHeight: { xs: "2.5rem", sm: "3rem" },
                }}
              >
                {t("a")}{" "}
                <Box component="span" sx={{ color: "primary.main" }}>
                  {text}
                </Box>
                <Cursor cursorStyle="|" cursorColor={theme.palette.primary.main} />
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mt: 3, maxWidth: 560, lineHeight: 1.8 }}
              >
                {t(
                  "Full Stack Developer with hands-on experience in building and deploying scalable web applications using JavaScript, React, Laravel, and databases (MySQL). Strong background in frontend & backend development, problem-solving, and teamwork. Eager to contribute to high-impact projects and grow within dynamic tech environments."
                )}
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
                <AppTooltip
                  title={t("My Projects")}
                  description={t("tooltipBtnProjectsDesc")}
                  placement="top"
                >
                  <Box component="span" sx={{ display: "inline-flex" }}>
                    <Button
                      variant="contained"
                      size="large"
                      component={RouterLink}
                      to="/projects"
                      endIcon={<ArrowForwardRounded />}
                    >
                      {t("My Projects")}
                    </Button>
                  </Box>
                </AppTooltip>
                <AppTooltip
                  title={t("Contact With Me")}
                  description={t("tooltipBtnContactDesc")}
                  placement="top"
                >
                  <Box component="span" sx={{ display: "inline-flex" }}>
                    <Button
                      variant="outlined"
                      size="large"
                      component={RouterLink}
                      to="/contact"
                    >
                      {t("Contact With Me")}
                    </Button>
                  </Box>
                </AppTooltip>
              </Stack>

              <Stack spacing={2} sx={{ mt: 5 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("find me in")}
                </Typography>
                <SocialRow />
              </Stack>

              <Stack spacing={2} sx={{ mt: 4 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {t("best skill on")}
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                  <Chip
                    icon={<FaReact size={18} />}
                    label="React"
                    variant="outlined"
                    color="primary"
                  />
                  <Chip
                    icon={<SiMui size={18} />}
                    label="MUI"
                    variant="outlined"
                    color="secondary"
                  />
                  <Chip
                    icon={<FaFigma size={16} />}
                    label={t("Fegma")}
                    variant="outlined"
                  />
                  <Chip
                    icon={<CodeRounded />}
                    label="JavaScript"
                    variant="outlined"
                  />
                </Stack>
              </Stack>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: 4,
                  p: { xs: 3, md: 4 },
                  background: `linear-gradient(145deg, ${alpha(
                    theme.palette.primary.main,
                    0.12
                  )}, ${alpha(theme.palette.secondary.main, 0.08)})`,
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                  boxShadow: theme.shadows[10],
                }}
              >
                <Typography variant="h6" gutterBottom fontWeight={700}>
                  {t("What I do")}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {t(
                    "I develop front-end websites and make them more beautiful and professional."
                  )}
                </Typography>
                <Stack spacing={1.5}>
                  {[t("Web Developer"), t("Software Engineering"), t("Problem Solving")].map(
                    (label) => (
                      <Box
                        key={label}
                        sx={{
                          py: 1.25,
                          px: 2,
                          borderRadius: 2,
                          bgcolor: alpha(theme.palette.background.paper, 0.6),
                          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
                        }}
                      >
                        <Typography variant="subtitle2">{label}</Typography>
                      </Box>
                    )
                  )}
                </Stack>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

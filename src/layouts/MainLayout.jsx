import { useContext, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  useScrollTrigger,
  Slide,
  Container,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Fab,
  Zoom,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import MenuRounded from "@mui/icons-material/MenuRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import WbSunnyRounded from "@mui/icons-material/WbSunnyRounded";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import ColorLensRounded from "@mui/icons-material/ColorLensRounded";
import KeyboardArrowUpRounded from "@mui/icons-material/KeyboardArrowUpRounded";
import { CustomizerContext } from "../context/CustomizerContext";
import { mainNavLinks } from "../data/navLinks";
import { themePresetNames } from "../data/themePresets";
import { socialLinks } from "../data/socialLinks";
import logoImg from "../assets/images/me-logo.jpg";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import AppTooltip, { getHeaderActionIconButtonSx } from "../components/ui/AppTooltip";

const socialIconMap = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

function socialDescKey(id) {
  return `tooltipSocialDesc${id.charAt(0).toUpperCase()}${id.slice(1)}`;
}

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({ threshold: 80 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <div>{children}</div>
    </Slide>
  );
}

function ScrollTopFab() {
  const theme = useTheme();
  const { t } = useTranslation();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 400,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Box
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 24,
          zIndex: (z) => z.zIndex.speedDial,
          ...(theme.direction === "rtl"
            ? { left: 24, right: "auto" }
            : { right: 24 }),
        }}
      >
        <AppTooltip
          title={t("tooltipScrollTopTitle")}
          description={t("tooltipScrollTopDesc")}
          placement="left"
        >
          <Fab
            color="primary"
            size="medium"
            aria-label="scroll back to top"
            onClick={handleClick}
            sx={{
              boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.45)}`,
              "&:hover": {
                boxShadow: `0 12px 28px ${alpha(theme.palette.primary.main, 0.55)}`,
              },
            }}
          >
            <KeyboardArrowUpRounded />
          </Fab>
        </AppTooltip>
      </Box>
    </Zoom>
  );
}

export default function MainLayout() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteAnchor, setPaletteAnchor] = useState(null);
  const { pathname } = useLocation();

  const headerIconSx = getHeaderActionIconButtonSx(theme);

  const {
    activeMode,
    toggleMode,
    activeTheme,
    setActiveTheme,
  } = useContext(CustomizerContext);

  const handleLangToggle = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
  };

  const appBarSx = {
    backdropFilter: "blur(14px)",
    backgroundColor: alpha(theme.palette.background.paper, 0.88),
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.14)}`,
  };

  const navButtonSx = {
    color: "text.secondary",
    fontWeight: 500,
    px: 1.25,
    py: 0.75,
    borderRadius: 2,
    "&.active": {
      color: "primary.main",
      bgcolor: alpha(theme.palette.primary.main, 0.08),
    },
  };

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }} onClick={() => setMobileOpen(false)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          mb: 1,
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Ziad
        </Typography>
        <AppTooltip title={t("Close")} description={t("tooltipMenuCloseDesc")} placement="left">
          <IconButton
            aria-label="close menu"
            onClick={(e) => {
              e.stopPropagation();
              setMobileOpen(false);
            }}
            sx={headerIconSx}
          >
            <CloseRounded />
          </IconButton>
        </AppTooltip>
      </Box>
      <Divider />
      <List sx={{ px: 1, py: 2 }}>
        {mainNavLinks.map((item) => (
          <AppTooltip
            key={item.to}
            title={t(item.labelKey)}
            description={t(item.tooltipDescKey)}
            placement="right"
          >
            <ListItemButton
              component={NavLink}
              to={item.to}
              end={item.end}
              selected={item.end ? pathname === "/" : pathname === item.to}
              sx={{ borderRadius: 2, mb: 0.5 }}
            >
              <ListItemText primary={t(item.labelKey)} />
            </ListItemButton>
          </AppTooltip>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <HideOnScroll>
        <AppBar position="sticky" elevation={0} sx={appBarSx} color="inherit">
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ py: 0.5, gap: 1 }}>
              <AppTooltip title={t("Home")} description={t("tooltipLogoDesc")} placement="bottom">
                <Box
                  component={NavLink}
                  to="/"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    mr: 2,
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 2,
                    pr: 0.5,
                    transition: "background-color 0.2s",
                    "&:hover": {
                      bgcolor: alpha(theme.palette.primary.main, 0.06),
                    },
                  }}
                >
                  <Box
                    component="img"
                    src={logoImg}
                    alt=""
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      objectFit: "cover",
                      boxShadow: 2,
                    }}
                  />
                  <Typography
                    variant="h6"
                    sx={{ display: { xs: "none", sm: "block" }, fontWeight: 700 }}
                  >
                    Ziad
                  </Typography>
                </Box>
              </AppTooltip>

              {isMdUp && (
                <Box sx={{ flexGrow: 1, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                  {mainNavLinks.map((item) => (
                    <AppTooltip
                      key={item.to}
                      title={t(item.labelKey)}
                      description={t(item.tooltipDescKey)}
                      placement="bottom"
                    >
                      <Box component="span" sx={{ display: "inline-flex" }}>
                        <Button
                          component={NavLink}
                          to={item.to}
                          end={item.end}
                          sx={navButtonSx}
                        >
                          {t(item.labelKey)}
                        </Button>
                      </Box>
                    </AppTooltip>
                  ))}
                </Box>
              )}

              {!isMdUp && <Box sx={{ flexGrow: 1 }} />}

              <AppTooltip
                title={t("Switch color theme")}
                description={t("tooltipPaletteDesc")}
                placement="bottom"
              >
                <IconButton
                  color="inherit"
                  onClick={(e) => setPaletteAnchor(e.currentTarget)}
                  aria-label="theme palette"
                  sx={headerIconSx}
                >
                  <ColorLensRounded sx={{ fontSize: 22 }} />
                </IconButton>
              </AppTooltip>
              <Menu
                anchorEl={paletteAnchor}
                open={Boolean(paletteAnchor)}
                onClose={() => setPaletteAnchor(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                slotProps={{
                  paper: {
                    sx: {
                      mt: 1,
                      borderRadius: 2,
                      border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                      boxShadow: theme.shadows[8],
                    },
                  },
                }}
              >
                {themePresetNames.map((opt) => (
                  <MenuItem
                    key={opt.value}
                    selected={activeTheme === opt.value}
                    onClick={() => {
                      setActiveTheme(opt.value);
                      setPaletteAnchor(null);
                    }}
                  >
                    {t(opt.labelKey)}
                  </MenuItem>
                ))}
              </Menu>

              <AppTooltip
                title={t("Change Language")}
                description={t("tooltipLanguageDesc")}
                placement="bottom"
              >
                <IconButton
                  color="inherit"
                  onClick={handleLangToggle}
                  aria-label="toggle language"
                  sx={headerIconSx}
                >
                  <TranslateRounded sx={{ fontSize: 22 }} />
                </IconButton>
              </AppTooltip>

              <AppTooltip
                title={t("Toggle theme mode")}
                description={t("tooltipModeDesc")}
                placement="bottom"
              >
                <IconButton
                  color="inherit"
                  onClick={toggleMode}
                  aria-label="toggle light dark mode"
                  sx={headerIconSx}
                >
                  {activeMode === "dark" ? (
                    <WbSunnyRounded sx={{ fontSize: 22 }} />
                  ) : (
                    <DarkModeRounded sx={{ fontSize: 22 }} />
                  )}
                </IconButton>
              </AppTooltip>

              {!isMdUp && (
                <AppTooltip
                  title={t("Menu")}
                  description={t("tooltipMenuOpenDesc")}
                  placement="bottom"
                >
                  <IconButton
                    color="inherit"
                    edge="end"
                    onClick={() => setMobileOpen(true)}
                    aria-label="open menu"
                    sx={headerIconSx}
                  >
                    <MenuRounded sx={{ fontSize: 24 }} />
                  </IconButton>
                </AppTooltip>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      <Drawer
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { borderRadius: 0 } }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <Box
        component="footer"
        sx={{
          mt: "auto",
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
          py: { xs: 4, md: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "2fr 1fr 1fr 1fr",
              },
              gap: 4,
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                <Box
                  component="img"
                  src={logoImg}
                  alt=""
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    objectFit: "cover",
                  }}
                />
                <Typography variant="h6" fontWeight={700}>
                  Ziad Abd Elkader
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {t(
                  "Full Stack Developer with hands-on experience in building and deploying scalable web applications using JavaScript, React, Laravel, and databases (MySQL). Strong background in frontend & backend development, problem-solving, and teamwork. Eager to contribute to high-impact projects and grow within dynamic tech environments."
                )}
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {socialLinks.map((s) => {
                  const Icon = socialIconMap[s.id];
                  return (
                    <AppTooltip
                      key={s.id}
                      title={t(s.titleKey)}
                      description={t(socialDescKey(s.id))}
                      placement="top"
                    >
                      <IconButton
                        component="a"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                          bgcolor: alpha(theme.palette.primary.main, 0.08),
                          "&:hover": {
                            bgcolor: alpha(theme.palette.primary.main, 0.18),
                            borderColor: alpha(theme.palette.primary.main, 0.35),
                          },
                        }}
                        aria-label={t(s.titleKey)}
                      >
                        <Icon size={18} />
                      </IconButton>
                    </AppTooltip>
                  );
                })}
              </Box>
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom fontWeight={700}>
                {t("Quick Link")}
              </Typography>
              {mainNavLinks.map((item) => (
                <AppTooltip
                  key={item.to}
                  title={t(item.labelKey)}
                  description={t(item.tooltipDescKey)}
                  placement="right"
                >
                  <Box component="span" sx={{ display: "block" }}>
                    <Button
                      component={NavLink}
                      to={item.to}
                      end={item.end}
                      color="inherit"
                      fullWidth
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                        py: 0.5,
                        color: "text.secondary",
                        "&.active": { color: "primary.main" },
                      }}
                    >
                      {t(item.labelKey)}
                    </Button>
                  </Box>
                </AppTooltip>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom fontWeight={700}>
                {t("Resources")}
              </Typography>
              {[t("Documentation"), t("Support"), t("Open Source")].map((label) => (
                <Typography key={label} variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
                  {label}
                </Typography>
              ))}
            </Box>

            <Box>
              <Typography variant="subtitle2" color="primary" gutterBottom fontWeight={700}>
                {t("Contact")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                zizoahlawy97@gmail.com
              </Typography>
              <Typography variant="body2" color="text.secondary">
                +20 114 891 5059
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t("Cairo, Egypt")}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 4 }} />

          <Typography variant="body2" color="text.secondary" textAlign="center">
            {t("All rights reserved by Ziad Abd ElKader Shehata © 2025.")}
          </Typography>
        </Container>
      </Box>

      <ScrollTopFab />
    </Box>
  );
}

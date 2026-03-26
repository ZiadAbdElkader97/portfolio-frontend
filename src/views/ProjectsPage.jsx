import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import AppTooltip from "../components/ui/AppTooltip";
import ProjectCoverArt from "../components/projects/ProjectCoverArt";
import { projects } from "../data/projects";

const GAP_PX = 12;

function getProjectsNavButtonSx(theme) {
  const ring = alpha(theme.palette.primary.main, 0.45);
  return {
    width: { xs: 48, sm: 56, md: 60 },
    height: { xs: 48, sm: 56, md: 60 },
    flexShrink: 0,
    borderRadius: "50%",
    color: "primary.main",
    position: "relative",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: alpha(theme.palette.background.paper, 0.55),
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: `
      0 0 0 1px ${alpha(theme.palette.divider, 0.35)},
      0 0 0 1.5px ${alpha(theme.palette.primary.main, 0.12)} inset,
      0 2px 8px ${alpha(theme.palette.common.black, theme.palette.mode === "dark" ? 0.35 : 0.08)},
      0 12px 40px ${alpha(theme.palette.primary.main, 0.12)}
    `,
    transition:
      "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, background-color 0.35s ease, color 0.25s ease, opacity 0.25s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      inset: -2,
      borderRadius: "50%",
      padding: 2,
      background: `linear-gradient(135deg, ${ring}, ${alpha(theme.palette.primary.main, 0.08)}, ${ring})`,
      WebkitMask:
        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
      WebkitMaskComposite: "xor",
      maskComposite: "exclude",
      opacity: 0.65,
      pointerEvents: "none",
      transition: "opacity 0.35s ease",
    },
    "&:hover:not(:disabled)": {
      bgcolor: alpha(theme.palette.primary.main, 0.14),
      color: "primary.dark",
      transform: "scale(1.08)",
      boxShadow: `
        0 0 0 1px ${alpha(theme.palette.primary.main, 0.35)},
        0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)} inset,
        0 8px 28px ${alpha(theme.palette.primary.main, 0.28)},
        0 20px 50px ${alpha(theme.palette.common.black, theme.palette.mode === "dark" ? 0.4 : 0.1)}
      `,
      "&::before": { opacity: 1 },
    },
    "&:active:not(:disabled)": {
      transform: "scale(0.96)",
    },
    "&:focus-visible": {
      outline: `2px solid ${theme.palette.primary.main}`,
      outlineOffset: 3,
    },
    "&:disabled": {
      opacity: 0.35,
      cursor: "not-allowed",
    },
  };
}

function ProjectsNavPrev({ theme, onClick, label, disabled = false }) {
  return (
    <IconButton
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      disableRipple
      sx={getProjectsNavButtonSx(theme)}
    >
      <ChevronLeftRounded sx={{ fontSize: { xs: 28, sm: 32, md: 34 } }} />
    </IconButton>
  );
}

function ProjectsNavNext({ theme, onClick, label, disabled = false }) {
  return (
    <IconButton
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      disableRipple
      sx={getProjectsNavButtonSx(theme)}
    >
      <ChevronRightRounded sx={{ fontSize: { xs: 28, sm: 32, md: 34 } }} />
    </IconButton>
  );
}

ProjectsNavPrev.propTypes = {
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

ProjectsNavNext.propTypes = {
  theme: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default function ProjectsPage() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();
  const isRtl = i18n.dir() === "rtl";

  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));

  const visibleCount = isXs ? 1 : isMdDown ? 2 : 3;
  const n = projects.length;
  const canSlide = n > visibleCount;
  const [startIndex, setStartIndex] = useState(0);

  const logicalDotIndex = n > 0 ? ((startIndex % n) + n) % n : 0;

  const visibleProjects = useMemo(() => {
    if (!n) return [];
    const count = Math.min(visibleCount, n);
    return Array.from({ length: count }, (_, i) => projects[(logicalDotIndex + i) % n]);
  }, [n, logicalDotIndex, visibleCount]);

  const slidePrev = () => {
    if (!canSlide) return;
    setStartIndex((i) => i - 1);
  };

  const slideNext = () => {
    if (!canSlide) return;
    setStartIndex((i) => i + 1);
  };

  const go = (slug) => {
    navigate(`/projects/${slug}`);
  };

  

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        overflow: "hidden",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: { xs: "8%", md: "12%" },
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(900px, 92vw)",
          height: 320,
          borderRadius: "50%",
          background: alpha(theme.palette.primary.main, 0.06),
          filter: "blur(80px)",
          pointerEvents: "none",
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", maxWidth: 680, mx: "auto", mb: 0.5 }}>
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 2.5,
              fontSize: "0.72rem",
            }}
          >
            {t("My Projects")}
          </Typography>
          <Typography
            variant="h3"
            component="h1"
            fontWeight={800}
            sx={{
              mt: 1.5,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            {t("Visit My Portfolio and Keep Your Feedback")}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2, lineHeight: 1.7, maxWidth: 520, mx: "auto" }}
          >
            {t("projectsSliderHint")}
          </Typography>
        </Box>

        <Box sx={{ py: { xs: 3, md: 5 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "stretch",
              justifyContent: "center",
              gap: { xs: 2.5, md: 2, lg: 3 },
              maxWidth: 1180,
              mx: "auto",
              px: { xs: 0, sm: 0 },
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                order: isRtl ? 3 : 0,
              }}
            >
              <ProjectsNavPrev
                theme={theme}
                onClick={slidePrev}
                label={t("projectSliderPrev")}
                disabled={!canSlide}
              />
            </Box>

            <Box
              sx={{
                order: isRtl ? 2 : 1,
                flex: 1,
                minWidth: 0,
                width: "100%",
                maxWidth: { md: "100%", lg: 1040 },
                mx: "auto",
              }}
            >
              <Box sx={{ width: "100%", borderRadius: 2 }}>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${Math.min(visibleCount, Math.max(n, 1))}, minmax(0, 1fr))`,
                    gap: `${GAP_PX}px`,
                  }}
                >
                  {visibleProjects.map((p) => (
                    <Box key={`visible-${p.id}-${logicalDotIndex}`} sx={{ minWidth: 0 }}>
                      <AppTooltip
                        title={t("projectOpenTooltipTitle")}
                        description={t("projectOpenTooltipDesc")}
                        placement="top"
                      >
                        <Card
                          elevation={0}
                          role="button"
                          tabIndex={0}
                          aria-label={p.title}
                          onClick={() => go(p.slug)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              go(p.slug);
                            }
                          }}
                          sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            borderRadius: 3,
                            overflow: "hidden",
                            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            bgcolor: theme.palette.background.paper,
                            cursor: "pointer",
                            transition:
                              "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.3s ease",
                            boxShadow:
                              theme.palette.mode === "dark"
                                ? `0 4px 24px ${alpha("#000", 0.35)}`
                                : `0 2px 8px ${alpha("#000", 0.04)}, 0 8px 24px ${alpha("#000", 0.04)}`,
                            "&:hover, &:focus-visible": {
                              transform: "translateY(-4px)",
                              borderColor: alpha(theme.palette.primary.main, 0.28),
                              boxShadow:
                                theme.palette.mode === "dark"
                                  ? `0 16px 48px ${alpha("#000", 0.5)}, 0 0 0 1px ${alpha(theme.palette.primary.main, 0.2)}`
                                  : `0 12px 32px ${alpha("#000", 0.08)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.12)}`,
                              outline: "none",
                            },
                          }}
                        >
                          <ProjectCoverArt project={p} dense showLocation />
                          <CardContent
                            sx={{
                              pt: 2,
                              px: 2,
                              pb: 1,
                              flexGrow: 1,
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight={800}
                              sx={{
                                lineHeight: 1.3,
                                mb: 1,
                                letterSpacing: "-0.01em",
                              }}
                            >
                              {p.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                lineHeight: 1.65,
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                                flex: 1,
                              }}
                            >
                              {t(p.descKey)}
                            </Typography>
                          </CardContent>
                          <CardActions sx={{ px: 2, pb: 2, pt: 0, mt: "auto" }}>
                            <Button
                              fullWidth
                              variant="contained"
                              size="medium"
                              endIcon={<ArrowForwardRounded />}
                              onClick={(e) => {
                                e.stopPropagation();
                                go(p.slug);
                              }}
                              sx={{
                                fontWeight: 700,
                                py: 1.1,
                                borderRadius: 2,
                                textTransform: "none",
                                boxShadow: "none",
                                "&:hover": {
                                  boxShadow: `0 6px 20px ${alpha(theme.palette.primary.main, 0.28)}`,
                                },
                              }}
                            >
                              {t("projectExplore")}
                            </Button>
                          </CardActions>
                        </Card>
                      </AppTooltip>
                    </Box>
                  ))}
                </Box>
              </Box>

              {n > 1 && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 0.75,
                    mt: 2,
                    flexWrap: "wrap",
                  }}
                >
                  {projects.map((p, i) => (
                    <Box
                      key={p.id}
                      onClick={() => {
                        setStartIndex(i);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setStartIndex(i);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={p.title}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        cursor: "pointer",
                        flex: i === logicalDotIndex ? "0 0 24px" : "0 0 7px",
                        bgcolor:
                          i === logicalDotIndex
                            ? "primary.main"
                            : alpha(theme.palette.text.primary, 0.18),
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor:
                            i === logicalDotIndex
                              ? "primary.main"
                              : alpha(theme.palette.primary.main, 0.4),
                        },
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                order: isRtl ? 0 : 3,
              }}
            >
              <ProjectsNavNext
                theme={theme}
                onClick={slideNext}
                label={t("projectSliderNext")}
                disabled={!canSlide}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              mt: 1.5,
            }}
          >
            <ProjectsNavPrev
              theme={theme}
              onClick={slidePrev}
              label={t("projectSliderPrev")}
              disabled={!canSlide}
            />
            <ProjectsNavNext
              theme={theme}
              onClick={slideNext}
              label={t("projectSliderNext")}
              disabled={!canSlide}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

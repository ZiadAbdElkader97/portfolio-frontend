import PropTypes from "prop-types";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
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
  const needsLoop = n > visibleCount;

  const extendedSlides = useMemo(() => {
    if (!needsLoop) {
      return projects.map((p) => ({ project: p, reactKey: p.id }));
    }
    return [
      ...projects.map((p) => ({ project: p, reactKey: `${p.id}-a` })),
      ...projects.map((p) => ({ project: p, reactKey: `${p.id}-b` })),
      ...projects.map((p) => ({ project: p, reactKey: `${p.id}-c` })),
    ];
  }, [needsLoop]);

  const [virtualIndex, setVirtualIndex] = useState(() =>
    needsLoop ? n : 0
  );
  const virtualIndexRef = useRef(virtualIndex);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    virtualIndexRef.current = virtualIndex;
  }, [virtualIndex]);

  useLayoutEffect(() => {
    setVirtualIndex(needsLoop ? n : 0);
  }, [needsLoop, n]);

  const viewportRef = useRef(null);
  const [viewportW, setViewportW] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const ro = new ResizeObserver(() => {
      setViewportW(el.clientWidth);
    });
    ro.observe(el);
    setViewportW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  const { slideWidth, stepPx } = useMemo(() => {
    if (viewportW <= 0 || visibleCount <= 0) {
      return { slideWidth: 0, stepPx: 0 };
    }
    const gapsTotal = GAP_PX * (visibleCount - 1);
    const w = (viewportW - gapsTotal) / visibleCount;
    return { slideWidth: w, stepPx: w + GAP_PX };
  }, [viewportW, visibleCount]);

  const translateX =
    slideWidth <= 0 ? 0 : -virtualIndex * stepPx;

  const handleTransitionEnd = useCallback(
    (e) => {
      if (e.propertyName !== "transform") return;
      if (!needsLoop) return;

      const cur = virtualIndexRef.current;
      const el = trackRef.current;
      let next = cur;

      if (cur >= 2 * n) {
        next = cur - n;
      } else if (cur < n) {
        next = cur + n;
      } else {
        return;
      }

      if (el) {
        el.style.transition = "none";
      }
      setVirtualIndex(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (el) {
            el.style.transition = "";
          }
        });
      });
    },
    [needsLoop, n]
  );

  const slidePrev = () => {
    if (!needsLoop) return;
    setVirtualIndex((i) => i - 1);
  };

  const slideNext = () => {
    if (!needsLoop) return;
    setVirtualIndex((i) => i + 1);
  };

  const go = (slug) => {
    navigate(`/projects/${slug}`);
  };

  const logicalDotIndex =
    needsLoop && n > 0
      ? ((virtualIndex - n) % n + n) % n
      : 0;

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
                disabled={!needsLoop}
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
              <Box
                ref={viewportRef}
                sx={{
                  overflow: "hidden",
                  width: "100%",
                  borderRadius: 2,
                  direction: "ltr",
                }}
              >
                <Box
                  ref={trackRef}
                  onTransitionEnd={handleTransitionEnd}
                  sx={{
                    display: "flex",
                    gap: `${GAP_PX}px`,
                    width: "max-content",
                    transform: `translate3d(${translateX}px, 0, 0)`,
                    transition:
                      "transform 0.45s cubic-bezier(0.25, 0.8, 0.25, 1)",
                    willChange: "transform",
                  }}
                >
                  {extendedSlides.map(({ project: p, reactKey }) => (
                    <Box
                      key={reactKey}
                      sx={{
                        flex: "0 0 auto",
                        width:
                          slideWidth > 0
                            ? `${slideWidth}px`
                            : `calc((100% - ${GAP_PX * (visibleCount - 1)}px) / ${visibleCount})`,
                        minWidth: 0,
                        maxWidth: slideWidth > 0 ? `${slideWidth}px` : undefined,
                      }}
                    >
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

              {needsLoop && n > 1 && (
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
                        setVirtualIndex(n + i);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setVirtualIndex(n + i);
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
                disabled={!needsLoop}
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
              disabled={!needsLoop}
            />
            <ProjectsNavNext
              theme={theme}
              onClick={slideNext}
              label={t("projectSliderNext")}
              disabled={!needsLoop}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

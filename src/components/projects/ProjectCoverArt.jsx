import PropTypes from "prop-types";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { alpha, keyframes } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import { projectIconComponents } from "./projectIcons";

const shimmer = keyframes`
  0% { transform: translateX(-120%) skewX(-12deg); opacity: 0; }
  15% { opacity: 0.22; }
  100% { transform: translateX(220%) skewX(-12deg); opacity: 0; }
`;

const gradientDrift = keyframes`
  0%, 100% { opacity: 1; transform: scale(1) translate(0, 0); }
  50% { opacity: 0.94; transform: scale(1.02) translate(1%, -0.5%); }
`;

export default function ProjectCoverArt({
  project,
  height,
  dense = false,
  showLocation = true,
}) {
  const { t } = useTranslation();
  const {
    gradient,
    icon,
    shortTitle,
    title,
    tags = [],
    locationKey,
    coverImage,
  } = project;
  const Icon = projectIconComponents[icon] ?? projectIconComponents.web;
  const g = `linear-gradient(${gradient.angle}deg, ${gradient.stops.join(", ")})`;
  const hasPhoto = Boolean(coverImage);
  const aspectRatio = dense ? "16 / 10" : "16 / 9";
  const minH = dense ? 176 : 280;

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: hasPhoto ? "grey.900" : "transparent",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          ...(hasPhoto
            ? {
                aspectRatio,
                minHeight: minH,
              }
            : {
                height: height ?? (dense ? 200 : 300),
              }),
          overflow: "hidden",
          background: hasPhoto ? undefined : g,
          isolation: "isolate",
        }}
      >
        {hasPhoto ? (
          <Box
            component="img"
            src={coverImage}
            alt={title}
            loading="lazy"
            decoding="async"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center center",
              display: "block",
            }}
          />
        ) : null}

        {hasPhoto ? (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(180deg,
                ${alpha("#000", 0.05)} 0%,
                transparent 42%,
                ${alpha("#000", 0.55)} 88%,
                ${alpha("#000", 0.75)} 100%)`,
              pointerEvents: "none",
            }}
          />
        ) : (
          <>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `
                  radial-gradient(ellipse 85% 65% at 15% 25%, ${alpha("#fff", 0.14)} 0%, transparent 52%),
                  radial-gradient(ellipse 65% 55% at 92% 88%, ${alpha("#fff", 0.08)} 0%, transparent 48%)
                `,
                animation: `${gradientDrift} 16s ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0.14,
                backgroundImage: `
                  linear-gradient(${alpha("#fff", 0.08)} 1px, transparent 1px),
                  linear-gradient(90deg, ${alpha("#fff", 0.08)} 1px, transparent 1px)
                `,
                backgroundSize: "22px 22px",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "42%",
                height: "100%",
                background: `linear-gradient(105deg,
                  transparent 0%,
                  ${alpha("#fff", 0.1)} 48%,
                  transparent 72%)`,
                animation: `${shimmer} 7s ease-in-out infinite`,
                pointerEvents: "none",
              }}
            />
          </>
        )}

        <Icon
          sx={{
            position: "absolute",
            ...(hasPhoto
              ? {
                  top: 12,
                  right: 12,
                  fontSize: dense ? 36 : 44,
                  color: alpha("#fff", 0.92),
                  filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.45))",
                  p: 0.75,
                  borderRadius: 2,
                  bgcolor: alpha("#000", 0.25),
                  backdropFilter: "blur(8px)",
                }
              : {
                  right: "6%",
                  bottom: "10%",
                  top: "auto",
                  left: "auto",
                  fontSize: dense ? 76 : 120,
                  maxWidth: "42%",
                  maxHeight: "48%",
                  width: "1em",
                  height: "1em",
                  color: alpha("#fff", 0.14),
                  pointerEvents: "none",
                  filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.2))",
                }),
          }}
        />

        <Box sx={{ position: "relative", zIndex: 1, p: dense ? 1.75 : 2.5 }}>
          <Typography
            variant="overline"
            sx={{
              color: alpha("#fff", 0.88),
              letterSpacing: dense ? 2.5 : 3,
              fontWeight: 700,
              fontSize: dense ? "0.6rem" : "0.68rem",
            }}
          >
            {t("projectCoverKicker")}
          </Typography>
          <Typography
            variant={dense ? "h6" : "h4"}
            sx={{
              mt: 0.5,
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#fff",
              textShadow: "0 2px 12px rgba(0,0,0,0.5)",
              maxWidth: hasPhoto ? "95%" : "90%",
            }}
          >
            {shortTitle || title}
          </Typography>
          {showLocation && locationKey && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              sx={{
                mt: 1,
                display: "inline-flex",
                px: 1,
                py: 0.35,
                borderRadius: 10,
                bgcolor: alpha("#000", 0.35),
                border: `1px solid ${alpha("#fff", 0.18)}`,
                backdropFilter: "blur(10px)",
              }}
            >
              <LocationOnOutlined
                sx={{ fontSize: dense ? 14 : 16, color: alpha("#fff", 0.9) }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: alpha("#fff", 0.95),
                  fontWeight: 600,
                  letterSpacing: 0.2,
                  fontSize: dense ? "0.68rem" : "0.75rem",
                }}
              >
                {t(locationKey)}
              </Typography>
            </Stack>
          )}
        </Box>

        {!dense && tags.length > 0 && (
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={0.75}
            sx={{
              position: "relative",
              zIndex: 1,
              p: 2.5,
              pt: 0,
            }}
          >
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  height: 26,
                  bgcolor: alpha("#fff", 0.14),
                  color: "#fff",
                  fontWeight: 600,
                  border: `1px solid ${alpha("#fff", 0.22)}`,
                  backdropFilter: "blur(8px)",
                  "& .MuiChip-label": { px: 1.25 },
                }}
              />
            ))}
          </Stack>
        )}

        {!hasPhoto ? (
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: `linear-gradient(0deg, ${alpha("#000", 0.5)} 0%, transparent 100%)`,
              pointerEvents: "none",
            }}
          />
        ) : null}
      </Box>
    </Box>
  );
}

ProjectCoverArt.propTypes = {
  project: PropTypes.shape({
    gradient: PropTypes.shape({
      angle: PropTypes.number.isRequired,
      stops: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    icon: PropTypes.string.isRequired,
    shortTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    locationKey: PropTypes.string,
    coverImage: PropTypes.string,
  }).isRequired,
  height: PropTypes.number,
  dense: PropTypes.bool,
  showLocation: PropTypes.bool,
};

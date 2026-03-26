import { Navigate, Link as RouterLink, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Container,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import { getProjectBySlug } from "../data/projects";
import ProjectCoverArt from "../components/projects/ProjectCoverArt";

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const theme = useTheme();
  const project = slug ? getProjectBySlug(slug) : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            component={RouterLink}
            to="/projects"
            underline="hover"
            color="inherit"
            sx={{ fontWeight: 600 }}
          >
            {t("My Projects")}
          </Link>
          <Typography color="text.primary" fontWeight={600}>
            {project.shortTitle || project.title}
          </Typography>
        </Breadcrumbs>

        <Button
          component={RouterLink}
          to="/projects"
          startIcon={<ArrowBackRounded />}
          sx={{ mb: 3, textTransform: "none", fontWeight: 600 }}
        >
          {t("projectViewBack")}
        </Button>

        <Box
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
            boxShadow:
              theme.palette.mode === "dark"
                ? `0 12px 40px ${alpha("#000", 0.35)}`
                : `0 8px 30px ${alpha("#000", 0.06)}, 0 1px 0 ${alpha("#fff", 0.8)} inset`,
            mb: 4,
          }}
        >
          <ProjectCoverArt project={project} showLocation />
        </Box>

        <Typography variant="h3" component="h1" fontWeight={800} gutterBottom>
          {project.title}
        </Typography>

        {project.locationKey && (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 2 }}
          >
            <LocationOnOutlined color="primary" sx={{ fontSize: 22 }} />
            <Typography variant="subtitle1" color="text.secondary" fontWeight={600}>
              {t("projectBasedIn")}{" "}
              <Box component="span" color="text.primary" fontWeight={700}>
                {t(project.locationKey)}
              </Box>
            </Typography>
          </Stack>
        )}

        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 3 }}>
          {project.tags.map((tag) => (
            <Chip key={tag} label={tag} color="primary" variant="outlined" />
          ))}
        </Stack>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.9, mb: 4, fontSize: "1.05rem" }}
        >
          {t(project.descKey)}
        </Typography>

        <Button
          variant="contained"
          size="large"
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewRounded />}
          sx={{ fontWeight: 700, py: 1.5, px: 3, borderRadius: 2 }}
        >
          {t("projectViewLive")}
        </Button>
      </Container>
    </Box>
  );
}

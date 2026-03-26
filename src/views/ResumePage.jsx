import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Tab,
  Tabs,
  Typography,
  Grid,
} from "@mui/material";
import AppTooltip from "../components/ui/AppTooltip";
import { alpha, useTheme } from "@mui/material/styles";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import HandymanOutlined from "@mui/icons-material/HandymanOutlined";
import WorkOutlineOutlined from "@mui/icons-material/WorkOutlineOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import {
  educationSectionMeta,
  educationEntries,
  itSkills,
  programmingSkills,
  experienceEntries,
  cvDownloadUrl,
} from "../data/resume";

function SkillBars({ items }) {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box>
      {items.map((row) => (
        <Box key={`${row.labelKey}-${row.suffix || ""}-${row.delay}`} sx={{ mb: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.75 }}>
            <Typography variant="body2" fontWeight={600}>
              {t(row.labelKey)}
              {row.suffix || ""}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {row.value}%
            </Typography>
          </Box>
          <Box
            sx={{
              height: 10,
              borderRadius: 5,
              overflow: "hidden",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${row.value}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: row.delay, ease: "easeOut" }}
              style={{
                height: "100%",
                borderRadius: 999,
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

function EducationPanel() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="caption" color="primary" fontWeight={600}>
          {educationSectionMeta.period}
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {t(educationSectionMeta.titleKey)}
          <SchoolOutlined color="primary" />
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {educationEntries.map((edu) => (
          <Grid size={{ xs: 12, md: 6 }} key={edu.id}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="overline" color="primary">
                  {edu.result}
                </Typography>
                <Typography variant="h6" fontWeight={700}>
                  {t(edu.titleKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t(edu.subtitleKey)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {t(edu.descKey)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

function SkillsPanel() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="caption" color="primary">
            {t("Features")}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            {t("IT Skills")}
            <HandymanOutlined color="primary" />
          </Typography>
          <SkillBars items={itSkills} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="caption" color="primary">
            {t("Features")}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            {t("Programming skills")}
            <HandymanOutlined color="secondary" />
          </Typography>
          <SkillBars items={programmingSkills} />
        </Grid>
      </Grid>
    </motion.div>
  );
}

function ExperiencePanel() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="caption" color="primary">
          2018 — {t("Now")}
        </Typography>
        <Typography variant="h5" fontWeight={700} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {t("Job Experience")}
          <WorkOutlineOutlined color="primary" />
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {experienceEntries.map((job) => (
          <Grid size={{ xs: 12 }} key={job.id}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
                  <Typography variant="overline" color="primary">
                    {t(job.resultKey)}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700}>
                  {t(job.titleKey)}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {t(job.subtitleKey)}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                  {t(job.descKey)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}

function CvPanel() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          px: 2,
          borderRadius: 3,
          border: `1px dashed ${alpha(theme.palette.primary.main, 0.4)}`,
          bgcolor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <DescriptionOutlined sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
        <Typography variant="h5" fontWeight={700} gutterBottom>
          {t("Download My CV")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {t("Download")}
        </Typography>
        <AppTooltip
          title={t("Download CV")}
          description={t("tooltipCvDownloadDesc")}
          placement="top"
        >
          <Box component="span" sx={{ display: "inline-flex" }}>
            <Button
              variant="contained"
              size="large"
              component="a"
              href={cvDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<DownloadRounded />}
            >
              {t("Download CV")}
            </Button>
          </Box>
        </AppTooltip>
      </Box>
    </motion.div>
  );
}

const panels = [EducationPanel, SkillsPanel, ExperiencePanel, CvPanel];

export default function ResumePage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [tab, setTab] = useState(0);

  const tabDefs = [
    {
      labelKey: "Education",
      icon: <SchoolOutlined />,
      tooltipDescKey: "tooltipTabEdu",
    },
    {
      labelKey: "Professional Skills",
      icon: <HandymanOutlined />,
      tooltipDescKey: "tooltipTabSkills",
    },
    {
      labelKey: "Experience",
      icon: <WorkOutlineOutlined />,
      tooltipDescKey: "tooltipTabExp",
    },
    {
      labelKey: "Download CV",
      icon: <DescriptionOutlined />,
      tooltipDescKey: "tooltipTabCv",
    },
  ];

  const Panel = panels[tab];

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 4 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {t("My Resume")}
          </Typography>
          <Typography variant="h3" component="h1" fontWeight={700} sx={{ mt: 1 }}>
            {t("7+ Years of Experience")}
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
            bgcolor: alpha(theme.palette.background.paper, 0.5),
            overflow: "hidden",
          }}
        >
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              px: { xs: 1, sm: 2 },
              borderBottom: `1px solid ${theme.palette.divider}`,
              "& .MuiTab-root": { minHeight: 56, textTransform: "none", fontWeight: 600 },
            }}
          >
            {tabDefs.map((def, i) => (
              <Tab
                key={def.labelKey}
                icon={def.icon}
                iconPosition="start"
                value={i}
                label={
                  <AppTooltip
                    title={t(def.labelKey)}
                    description={t(def.tooltipDescKey)}
                    placement="top"
                    enterDelay={500}
                  >
                    <Box component="span" sx={{ display: "inline-flex", alignItems: "center" }}>
                      {t(def.labelKey)}
                    </Box>
                  </AppTooltip>
                }
              />
            ))}
          </Tabs>
          <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Panel />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

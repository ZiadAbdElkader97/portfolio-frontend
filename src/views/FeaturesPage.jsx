import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
} from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import AppsRounded from "@mui/icons-material/AppsRounded";
import EngineeringOutlined from "@mui/icons-material/EngineeringOutlined";
import PsychologyOutlined from "@mui/icons-material/PsychologyOutlined";
import AccountTreeOutlined from "@mui/icons-material/AccountTreeOutlined";
import BusinessCenterOutlined from "@mui/icons-material/BusinessCenterOutlined";
import CodeOutlined from "@mui/icons-material/CodeOutlined";
import { featureItems } from "../data/features";

const iconById = {
  web: AppsRounded,
  software: EngineeringOutlined,
  problem: PsychologyOutlined,
  pm: AccountTreeOutlined,
  business: BusinessCenterOutlined,
  code: CodeOutlined,
};

export default function FeaturesPage() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {t("Features")}
          </Typography>
          <Typography variant="h3" component="h1" fontWeight={700} sx={{ mt: 1 }}>
            {t("What I do")}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
            {t(
              "I’am a Front End Developer, I learned programming languages, I hope to reach my goal .. thanks to God."
            )}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {featureItems.map((item, index) => {
            const Icon = iconById[item.id];
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                      background: alpha(theme.palette.primary.main, 0.03),
                      transition: "transform 0.25s ease, box-shadow 0.25s ease",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: theme.shadows[8],
                        borderColor: alpha(theme.palette.primary.main, 0.35),
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          mb: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          color: "primary.main",
                        }}
                      >
                        <Icon fontSize="medium" />
                      </Box>
                      <Typography variant="h6" gutterBottom fontWeight={700}>
                        {t(item.titleKey)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
                        {t(item.descKey)}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

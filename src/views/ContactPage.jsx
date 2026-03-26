import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import AppTooltip from "../components/ui/AppTooltip";
import { alpha, useTheme } from "@mui/material/styles";
import PhoneInTalkOutlined from "@mui/icons-material/PhoneInTalkOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import LocationOnOutlined from "@mui/icons-material/LocationOnOutlined";
import contactImg from "../assets/images/contact.jpg";
import { socialLinks } from "../data/socialLinks";
import { isValidEmail } from "../utils/validation";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const socialIcons = {
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
  twitter: FaTwitter,
  instagram: FaInstagram,
};

export default function ContactPage() {
  const { t } = useTranslation();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrMsg(t("Username is required!"));
      return;
    }
    if (!phoneNumber.trim()) {
      setErrMsg(t("Phone Number is required!"));
      return;
    }
    if (!email.trim()) {
      setErrMsg(t("Please give your email!"));
      return;
    }
    if (!isValidEmail(email)) {
      setErrMsg(t("Give a valid Email!"));
      return;
    }
    if (!subject.trim()) {
      setErrMsg(t("please give your subject!"));
      return;
    }
    if (!message.trim()) {
      setErrMsg(t("Message is required!"));
      return;
    }
    const name = username.trim();
    setErrMsg("");
    setUsername("");
    setEmail("");
    setSubject("");
    setPhoneNumber("");
    setMessage("");
    setSnackMessage(
      `${t("Thank you dear")} ${name}, ${t("Your Messages has been Sent Successfully!")}`
    );
    setSnackOpen(true);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: 6 }}>
          <Typography
            variant="overline"
            sx={{ color: "primary.main", fontWeight: 600, letterSpacing: 2 }}
          >
            {t("Contact")}
          </Typography>
          <Typography variant="h3" component="h1" fontWeight={700} sx={{ mt: 1 }}>
            {t("Contact With Me")}
          </Typography>
        </Box>

        <Grid container spacing={4} alignItems="stretch">
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={0}
              sx={{
                height: "100%",
                borderRadius: 3,
                overflow: "hidden",
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            >
              <Box
                component="img"
                src={contactImg}
                alt=""
                sx={{ width: "100%", height: 220, objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {t("Ziad Abd Elkader")}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  {t("Frontend Developer")}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.75 }}>
                  {t(
                    "I’am a Front End Developer, I learned programming languages, I hope toreach my goal .. thanks to God."
                  )}
                </Typography>

                <StackRow
                  icon={<PhoneInTalkOutlined color="primary" />}
                  label={t("Phone")}
                  value="01148915059"
                />
                <StackRow
                  icon={<EmailOutlined color="primary" />}
                  label={t("Email")}
                  value="zizoahlawy97@gmail.com"
                />
                <StackRow
                  icon={<LocationOnOutlined color="primary" />}
                  label={t("Location")}
                  value={t("Cairo, Egypt")}
                />

                <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
                  {t("find me in")}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {socialLinks.map((s) => {
                    const Icon = socialIcons[s.id];
                    return (
                      <Box
                        key={s.id}
                        component="a"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={t(s.titleKey)}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 2,
                          display: "grid",
                          placeItems: "center",
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: "primary.main",
                          "&:hover": { bgcolor: alpha(theme.palette.primary.main, 0.2) },
                        }}
                      >
                        <Icon size={18} />
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={0}
              component="form"
              onSubmit={handleSend}
              sx={{
                height: "100%",
                borderRadius: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                {errMsg && (
                  <Alert severity="error" sx={{ mb: 2 }} onClose={() => setErrMsg("")}>
                    {errMsg}
                  </Alert>
                )}
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("Your Name")}
                      placeholder={t("Enter your name")}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label={t("Phone Number")}
                      placeholder={t("Enter your phone")}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      type="email"
                      label={t("Email")}
                      placeholder={t("Enter your email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label={t("Subject")}
                      placeholder={t("Enter your subject")}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      multiline
                      minRows={5}
                      label={t("Message")}
                      placeholder={t("Enter your mesaage")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <AppTooltip
                      title={t("Send Message")}
                      description={t("tooltipSendMessageDesc")}
                      placement="top"
                    >
                      <Box component="span" sx={{ display: "inline-flex" }}>
                        <Button type="submit" variant="contained" size="large">
                          {t("Send Message")}
                        </Button>
                      </Box>
                    </AppTooltip>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackOpen}
        autoHideDuration={6000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackOpen(false)}>
          {snackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function StackRow({ icon, label, value }) {
  return (
    <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start", mb: 2 }}>
      <Box sx={{ mt: 0.25 }}>{icon}</Box>
      <Box>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="body2" fontWeight={600}>
          {value}
        </Typography>
      </Box>
    </Box>
  );
}

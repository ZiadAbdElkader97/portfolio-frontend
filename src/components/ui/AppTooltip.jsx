import { Tooltip, Box, Typography } from "@mui/material";
import { alpha, lighten, useTheme } from "@mui/material/styles";

/**
 * Tooltips aligned with the active theme: same visual language as cards/surfaces,
 * subtle primary accent — no harsh black/white inversion.
 */
export default function AppTooltip({
  title,
  description,
  children,
  placement = "bottom",
  arrow = true,
  enterDelay = 320,
  ...rest
}) {
  const theme = useTheme();
  const { palette } = theme;
  const isDark = palette.mode === "dark";

  const hasDesc = description != null && String(description).length > 0;

  // Surface: dark = slightly lifted from paper; light = soft frosted card
  const surface = isDark
    ? lighten(palette.background.paper, 0.14)
    : alpha(palette.common.white, 0.97);

  const borderColor = alpha(
    palette.primary.main,
    isDark ? 0.32 : 0.24
  );

  const boxShadow = isDark
    ? `0 12px 36px ${alpha("#000000", 0.4)},
       inset 0 1px 0 ${alpha("#ffffff", 0.06)}`
    : `0 8px 28px ${alpha(palette.grey[600] ?? "#2A3547", 0.08)},
       0 2px 10px ${alpha(palette.primary.main, 0.07)},
       inset 0 1px 0 ${alpha("#ffffff", 0.85)}`;

  const fg = palette.text.primary;
  const muted = alpha(palette.text.secondary, isDark ? 0.9 : 0.85);

  const titleNode = hasDesc ? (
    <Box sx={{ maxWidth: 292, textAlign: "start" }}>
      <Typography
        component="span"
        variant="subtitle2"
        sx={{
          display: "block",
          fontWeight: 700,
          color: fg,
          lineHeight: 1.35,
          letterSpacing: 0.01,
        }}
      >
        {title}
      </Typography>
      <Typography
        component="span"
        variant="caption"
        sx={{
          display: "block",
          mt: 0.7,
          color: muted,
          lineHeight: 1.55,
          fontWeight: 400,
        }}
      >
        {description}
      </Typography>
    </Box>
  ) : (
    title
  );

  return (
    <Tooltip
      arrow={arrow}
      placement={placement}
      describeChild
      disableInteractive
      enterDelay={enterDelay}
      leaveDelay={0}
      enterNextDelay={280}
      slotProps={{
        popper: {
          modifiers: [{ name: "offset", options: { offset: [0, 10] } }],
        },
        tooltip: {
          sx: {
            bgcolor: surface,
            color: fg,
            borderRadius: 2,
            border: `1px solid ${borderColor}`,
            boxShadow,
            backdropFilter: "saturate(140%) blur(14px)",
            WebkitBackdropFilter: "saturate(140%) blur(14px)",
            px: hasDesc ? 1.5 : 1.2,
            py: hasDesc ? 1.3 : 0.9,
            fontSize: "0.8125rem",
            fontWeight: hasDesc ? undefined : 500,
            maxWidth: 340,
            "& .MuiTooltip-arrow": {
              color: surface,
            },
          },
        },
      }}
      title={titleNode}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}

export function getHeaderActionIconButtonSx(theme) {
  return {
    width: 44,
    height: 44,
    borderRadius: 2.5,
    border: `1px solid ${alpha(theme.palette.divider, 0.22)}`,
    bgcolor: alpha(theme.palette.primary.main, 0.07),
    color: "text.primary",
    transition:
      "background-color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease",
    "&:hover": {
      bgcolor: alpha(theme.palette.primary.main, 0.16),
      borderColor: alpha(theme.palette.primary.main, 0.42),
      transform: "translateY(-2px)",
      boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.24)}`,
    },
    "&:active": {
      transform: "translateY(0)",
    },
  };
}

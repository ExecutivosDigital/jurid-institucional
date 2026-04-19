export const tokens = {
  colors: {
    bg: "#0e0a05",
    bgSoft: "#15100a",
    bgCard: "#1c1610",
    gold: "#b09060",
    goldLight: "#c9a57c",
    goldDeep: "#8a7050",
    text: "#ffffff",
    textMuted: "#b8a890",
    textSoft: "#8a7e6c",
    border: "rgba(201, 165, 124, 0.18)",
  },
  radius: {
    md: "12px",
    lg: "20px",
    pill: "999px",
  },
  spacing: {
    containerMax: "1200px",
    containerPadding: "0 24px",
  },
} as const;

export type Tokens = typeof tokens;

import { PaletteMode } from "@mui/material";

export const light = {
  alternate: {
    main: "#f7faff",
    dark: "#edf1f7",
  },
  cardShadow: "rgba(23, 70, 161, .11)",
  mode: "light" as PaletteMode,
  primary: {
    main: "#7400b8ff",
    light: "#6930c3ff",
    dark: "#5e60ceff",
    contrastText: "#fff",
  },
  secondary: {
    light: "#2196f3",
    main: "#48bfe3ff",
    dark: "#1976d2",
    contrastText: "#ffffff",
  },
  text: {
    primary: "#000000",
    secondary: "#edf2f4",
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: "#ffffff",
    default: "#ffffff",
    level2: "#f5f5f5",
    level1: "#ffffff",
  },
};

export const dark = {
  alternate: {
    main: "#1a2138",
    dark: "#151a30",
  },
  cardShadow: "#38ef7d 0px 4px 12px;",
  common: {
    black: "#000",
    white: "#fff",
  },
  mode: "dark" as PaletteMode,
  primary: {
    main: "#7400b8ff",
    light: "#6930c3ff",
    dark: "#5e60ceff",
    contrastText: "#fff",
  },
  secondary: {
    light: "#2979ff",
    main: "#2196f3",
    dark: "#2962ff",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  text: {
    primary: "#EEEEEF",
    secondary: "#AEB0B4",
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#000000",
    default: "#311D3F",
    level2: "#E23E57",
    level1: "#88304E",
  },
};

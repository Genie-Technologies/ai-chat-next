import { PaletteMode } from "@mui/material";

export const light = {
  alternate: {
    main: "#f7faff",
    dark: "#edf1f7",
  },
  cardShadow: "rgba(23, 70, 161, .11)",
  mode: "light" as PaletteMode,
  primary: {
    main: "#3a0ca3",
    light: "#4895ef",
    dark: "#03045e",
    contrastText: "#fff",
  },
  secondary: {
    light: "#ffba08",
    main: "#fca311",
    dark: "#6a040f",
    contrastText: "rgba(0, 0, 0, 0.87)",
  },
  text: {
    primary: "#03045e",
    secondary: "#00b4d8",
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
    main: "#E23E57",
    light: "#9A1663",
    dark: "#609966",
    contrastText: "#fff",
  },
  secondary: {
    light: "#38ef7d",
    main: "#03C988",
    dark: "#609966",
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

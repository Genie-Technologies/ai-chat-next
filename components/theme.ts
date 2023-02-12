import { Roboto } from "@next/font/google";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// TODO: https://mui.com/material-ui/customization/dark-mode/

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3a0ca3",
    },
    secondary: {
      main: "#fc00ff",
    },
    error: {
      main: "#f72585",
    },
    success: {
      main: "#4cc9f0",
    },
    background: {
      default: "#000",
      paper: "#000",
    },
  },
  // pallete for dark mode
  // palette: {
  //   mode: "dark",
  //   primary: {
  //     main: "#10002b",
  //   },
  //   secondary: {
  //     main: "#7209b7",
  //   },
  //   error: {
  //     main: "#f72585",
  //   },
  //   success: {
  //     main: "#4cc9f0",
  //   },
  //   background: {
  //     default: "#000",
  //     paper: "#000",
  //   },
  // },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;

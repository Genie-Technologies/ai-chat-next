import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./Navbar";
import theme from "./theme";

export default function Layout({ children }: any) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <main style={{ backgroundColor: theme().palette.background.default }}>
          {children}
        </main>
      </ThemeProvider>
    </>
  );
}

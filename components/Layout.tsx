import { ThemeProvider } from "@emotion/react";
import Navbar from "./Navbar";
import theme from "./theme";
// import Footer from "./footer";

export default function Layout({ children }: any) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navbar />
        <main>{children}</main>
      </ThemeProvider>
    </>
  );
}

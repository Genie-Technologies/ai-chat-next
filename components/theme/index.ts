import { Theme, responsiveFontSizes } from "@mui/material";
import { createTheme, ComponentsOverrides } from "@mui/material/styles";
import shadows from "./shadows";
import { light, dark } from "./palette";

const getTheme = (
  mode: string = "dark",
  themeToggler: Function = () => {}
): Theme =>
  responsiveFontSizes(
    createTheme({
      palette: mode === "light" ? light : dark,
      shadows: shadows(mode),
      typography: {
        fontFamily: '"Inter", sans-serif',
        button: {
          textTransform: "none",
          fontWeight: "medium" as React.CSSProperties["fontWeight"],
        },
      },
      zIndex: {
        appBar: 1200,
        drawer: 1300,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              fontWeight: 400,
              borderRadius: 5,
              paddingTop: 10,
              paddingBottom: 10,
            },
            containedSecondary: mode === "light" ? { color: "white" } : {},
          } as ComponentsOverrides["MuiButton"],
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              borderRadius: 5,
            },
          } as ComponentsOverrides["MuiInputBase"],
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 5,
            },
            input: {
              borderRadius: 5,
            },
          } as ComponentsOverrides["MuiOutlinedInput"],
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 8,
            },
          } as ComponentsOverrides["MuiCard"],
        },
        MuiFormControl: {
          styleOverrides: {
            root: {
              // Set a minimum height to accommodate the helper text
              minHeight: '80px',
            },
          },
        },
      },
      // @ts-ignore
      themeToggler,
    })
  );

export default getTheme;

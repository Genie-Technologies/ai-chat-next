"use client";

import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Main from "../../layouts/Main";
import Container from "../../Container";
import { Customization, Hero, Hub, Pricings } from "./components";

import styles from "../../../styles/Landing.module.scss";

const Landing = (): JSX.Element => {
  const theme = useTheme();
  return (
    <Main>
      <Box
        position={"relative"}
        sx={{
          // Have a background of linear gradient of purple and green
          background: `linear-gradient(180deg, ${theme.palette.primary.dark} 0%, ${theme.palette.background.paper} 100%)`,
          marginTop: -13,
          paddingTop: 13,
          scrollbarColor: "rebeccapurple green",
        }}
      >
        <Container>
          <Hero />
        </Container>

        <Container>
          <Hub />
        </Container>
        <Box
          component={"svg"}
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 1920 100.1"
          sx={{
            width: "100%",
            marginBottom: theme.spacing(-1),
          }}
        >
          <path
            fill={theme.palette.background.paper}
            d="M0,0c0,0,934.4,93.4,1920,0v100.1H0L0,0z"
          ></path>
        </Box>
      </Box>

      <Box position={"relative"} className={styles.customizationSection}>
        <Container position="relative" zIndex={2}>
          <Customization />
        </Container>
      </Box>
      <Box bgcolor={"alternate.main"}>
        <Container>
          <Pricings />
        </Container>
      </Box>
    </Main>
  );
};

export default Landing;

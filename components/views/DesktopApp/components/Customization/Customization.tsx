/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";

const Customization = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          sx={{
            textTransform: "uppercase",
            fontWeight: "medium",
          }}
          gutterBottom
          color={"secondary"}
          align={"center"}
        >
          EXPERIENCE THE
        </Typography>
        <Typography
          variant="h4"
          align={"center"}
          data-aos={"fade-up"}
          gutterBottom
          sx={{
            fontWeight: 700,
          }}
          color={"secondary"}
        >
          Future of Messaging
        </Typography>
        <Typography
          variant="h6"
          align={"center"}
          color={"text.secondary"}
          data-aos={"fade-up"}
        >
          We aim to provide the best messaging experience for you with the help
          of the latest technologies and a personal human touch.
        </Typography>
        <Box
          display={
            process.env.CHAT_FEATURE_ENABLED === "true" ? "flex" : "none"
          }
          flexDirection={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "stretched", sm: "flex-start" }}
          justifyContent={"center"}
          marginTop={2}
        >
          <Button
            variant="contained"
            color="secondary"
            size="large"
            fullWidth={isMd ? false : true}
            sx={{
              display:
                process.env.CHAT_FEATURE_ENABLED === "true" ? "flex" : "none",
            }}
          >
            <Link
              href="/chat"
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              Try now
            </Link>
          </Button>
        </Box>
      </Box>
      <Grid
        container
        spacing={isMd ? 4 : 2}
        sx={{
          display:
            process.env.CHAT_FEATURE_ENABLED === "true" ? "flex" : "none",
        }}
      >
        <Grid item xs={12} sm={6} data-aos={"fade-up"}>
          <Grid container alignItems="center">
            <Box
              component={"img"}
              loading="lazy"
              height={1}
              width={1}
              src={
                "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FUndraw%2Fphotosession.png?alt=media&token=1e0fa105-80d5-4413-b3ec-f3b0e2b1717d"
              }
              alt="..."
              boxShadow={3}
              borderRadius={2}
              maxWidth={600}
              sx={{
                filter:
                  theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} data-aos={"fade-up"}>
          <Grid
            container
            alignItems="center"
            sx={{
              marginTop: { xs: 0, md: "40%" },
            }}
          >
            <Box
              component={"img"}
              loading="lazy"
              height={1}
              width={1}
              src={
                "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FUndraw%2Fsignup.png?alt=media&token=3bc87305-4902-4e2f-aa91-5093e2c5b32a"
              }
              alt="..."
              boxShadow={3}
              borderRadius={2}
              maxWidth={600}
              sx={{
                filter:
                  theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Customization;

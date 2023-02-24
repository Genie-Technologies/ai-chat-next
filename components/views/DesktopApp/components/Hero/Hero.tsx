import React, { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Dialog from "../../../../GeneralDialog/Dialog";
import SignUpForm from "../../../../Signup/Signup";

const Hero = (): JSX.Element => {
  const theme = useTheme();
  const [openSignUp, setOpenSignUp] = useState(false);

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const openSignUpDialog = () => {
    setOpenSignUp(true);
  };

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={"center"}>
        <Box data-aos={isMd ? "fade-right" : "fade-up"}>
          <Box marginBottom={2}>
            <Typography
              variant="h3"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              Communicate smarter{" "}
              <Typography
                color={"primary"}
                component={"span"}
                variant={"inherit"}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, ${alpha(
                    theme.palette.secondary.main,
                    0.3
                  )} 0%)`,
                }}
              >
                with AI-powered messaging
              </Typography>
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant="h6" component="p" color="text.secondary">
              Experience a new level of messaging with our AI-assisted Messenger
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretched", sm: "flex-start" }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth={isMd ? false : true}
              sx={{
                boxShadow: 3,
                borderRadius: 2,
                marginRight: isMd ? 2 : 0,
                marginBottom: isMd ? 0 : 2,
              }}
              onClick={openSignUpDialog}
            >
              SIGN UP FOR EARLY ACCESS
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"center"}
        xs={12}
        md={6}
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="2000"
      >
        <Box
          component={"img"}
          loading="lazy"
          height={1}
          width={1}
          src={"https://assets.maccarianagency.com/screenshots/dashboard.png"}
          alt="..."
          boxShadow={3}
          borderRadius={2}
          maxWidth={600}
          sx={{
            filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
          }}
        />
      </Grid>
      <Dialog
        open={openSignUp}
        handleClose={() => setOpenSignUp(false)}
        showActions={false}
      >
        <SignUpForm />
      </Dialog>
    </Grid>
  );
};

export default Hero;

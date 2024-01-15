import React, { useState } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Image from 'next/image';
import Dialog from "../../../../GeneralDialog/Dialog";
import SignUpForm from "../../../../Signup/Signup";
import homepage from '../../../../../imgs/homepage.png';

const Landing = (): JSX.Element => {
  const theme = useTheme();
  const [openSignUp, setOpenSignUp] = useState(false);

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const openSignUpDialog = () => {
    setOpenSignUp(true);
  };

  return (
    <Grid container>
      <Grid container item xs={12} alignItems="center" justifyContent="center">
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
                    theme.palette.text.secondary,
                    0.3
                  )} 0%)`,
                }}
              >
                with AI-powered messaging
              </Typography>
            </Typography>
          </Box>

          <Box marginBottom={3} sx={{
                  textAlign: 'center',
                }}>
            <Typography variant="h6" component="p" color="text.secondary">
              Experience a new level of messaging with our AI-assisted Messenger
            </Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="center"
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
                display: 'block',
                textAlign: 'center',
              }}
              onClick={openSignUpDialog}
            >
              SIGN UP NOW
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

export default Landing;

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import SignUpForm from "../../../../Signup/Signup";
import Dialog from "../../../../GeneralDialog/Dialog";

import { featuresForPricing } from "../../../../utils";

import styles from "../../../../../styles/Pricings.module.scss";

const Pricing = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [signUpDialogOpen, setSignUpDialogOpen] = useState(false);

  const openSignUpModal = () => {
    setSignUpDialogOpen(true);
  };

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
          Pricing
        </Typography>
        <Typography
          variant="h4"
          align={"center"}
          data-aos={"fade-up"}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Free!
        </Typography>
        <Typography
          variant="h6"
          align={"center"}
          color={"text.secondary"}
          data-aos={"fade-up"}
        >
          (For a Limited Time)
        </Typography>
      </Box>
      <Grid container spacing={isMd ? 0 : 2} justifyContent="center">
        <Grid container item xs={12} md={6}>
          <Card
            data-aos={isMd ? "fade-right" : "fade-up"}
            sx={{
              boxShadow: 0,
            }}
            className={styles.pricingCard}
          >
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Box marginBottom={4}>
                <Typography
                  fontWeight={600}
                  variant={"h2"}
                  align={"center"}
                  gutterBottom
                >
                  $0
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {featuresForPricing.map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.warning.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size={"large"}
                variant={"contained"}
                color={"secondary"}
                onClick={() => setSignUpDialogOpen(true)}
              >
                GET STARTED
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Dialog
          open={signUpDialogOpen}
          handleClose={() => setSignUpDialogOpen(false)}
          showActions={false}
        >
          <SignUpForm />
        </Dialog>
        {/* <Grid item container xs={12} md={6} alignItems={"center"}>
          <Box
            component={Card}
            bgcolor={theme.palette.background.paper}
            color={theme.palette.secondary.main}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: { sm: 4 },
              }}
            >
              <Box marginBottom={4}>
                <svg
                  width={80}
                  height={80}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
                </svg>
              </Box>
              <Typography variant={"h4"} gutterBottom sx={{ fontWeight: 600 }}>
                Customized
              </Typography>
              <Typography gutterBottom align={"center"}>
                Design a custom package for your business.
              </Typography>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button size={"large"} disabled>
                Coming Soon!
              </Button>
            </CardActions>
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
};

export default Pricing;

import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { featuresForPricing } from "../../../../utils";

const Pricing = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [pricingOption, setPricingOption] = useState("annual");

  const handleClick = (
    event: any,
    newPricingOption: React.SetStateAction<string>
  ) => {
    setPricingOption(newPricingOption);
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
          It is Free!
        </Typography>
        <Typography
          variant="h6"
          align={"center"}
          color={"text.secondary"}
          data-aos={"fade-up"}
        >
          For a limited time only!
        </Typography>
      </Box>
      <Grid container spacing={isMd ? 0 : 2}>
        <Grid item xs={12} md={6}>
          <Card
            data-aos={isMd ? "fade-right" : "fade-up"}
            sx={{
              boxShadow: 0,
              backgroundColor: theme.palette.primary.main,
            }}
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
              <Button size={"large"} variant={"contained"} color={"secondary"}>
                GET STARTED
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item container xs={12} md={6} alignItems={"center"}>
          <Box
            component={Card}
            bgcolor={theme.palette.background.paper}
            minWidth={500}
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;

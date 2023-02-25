import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export const integrations = [
  {
    logo: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FTodoistColorLogo.png?alt=media&token=f965924e-a1ba-4df1-a04b-ab90730cf626",
    name: "Todoist",
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Google_Calendar_icon_%282020%29.svg",
    name: "Google Calendar",
  },
  {
    logo: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FNetflix_Symbol_RGB.png?alt=media&token=02341764-552e-4b1f-9283-88ef7130c9c1",
    name: "Netflix",
  },
  {
    logo: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FGiphyLogo.png?alt=media&token=dd34757b-d28b-4160-9637-c07a4c633816",
    name: "Giphy",
  },
];

const Integrations = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={"center"}>
        <Box data-aos={isMd ? "fade-right" : "fade-up"}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "medium",
            }}
            gutterBottom
            color={"secondary"}
          >
            Integrations
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Seamless Integrations for
            <Typography
              color={"primary"}
              component={"span"}
              variant={"inherit"}
              sx={{
                background: `linear-gradient(180deg, transparent 82%, ${alpha(
                  theme.palette.secondary.light,
                  0.3
                )} 0%)`,
              }}
            >
              Effortless Communication.
            </Typography>
          </Typography>
          <Typography variant="h6" component="p" color="text.secondary">
            From Productivity to Entertainment: Discover the Limitless
            Possibilities with Our AI Integrations
          </Typography>
          <Box marginTop={2}>
            <Button
              size={"large"}
              variant={"contained"}
              color={"primary"}
              disabled
              endIcon={
                <Box
                  component={"svg"}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              }
            >
              Coming Soon
            </Button>
          </Box>
        </Box>
      </Grid>
      <Grid item container spacing={2} xs={12} md={6}>
        {integrations.map((item, i) => (
          <Grid
            item
            xs={4}
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            data-aos-offset={100}
            data-aos-duration={600}
          >
            <Box
              display={"block"}
              width={1}
              height={1}
              sx={{
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                  boxShadow: `10px 20px 40px 14px ${alpha(
                    theme.palette.primary.main,
                    0.25
                  )}`,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                },
              }}
            >
              <Card>
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 3,
                    border: `1px solid ${theme.palette.primary.main}`,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component={"img"}
                    loading="lazy"
                    height={50}
                    width={50}
                    src={item.logo}
                    alt={item.name}
                  />
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default Integrations;

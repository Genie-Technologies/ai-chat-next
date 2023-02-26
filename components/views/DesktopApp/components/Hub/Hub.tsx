import React, { useState } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import ForumIcon from "@mui/icons-material/Forum";
import CameraEnhanceIcon from "@mui/icons-material/CameraEnhance";
import SummarizeIcon from "@mui/icons-material/Summarize";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import ShieldIcon from "@mui/icons-material/Shield";

const mock = [
  {
    icon: <ForumIcon color="primary" />,
    subtitle: "AI-generated replies based on your texting style",
    suffix: "+",
  },
  {
    icon: <CameraEnhanceIcon color="primary" />,
    subtitle: "AI-generated memes/pictures of the conversation context",
    suffix: "+",
  },
  {
    icon: <SummarizeIcon color="primary" />,
    subtitle: "Daily summaries of unread messages",
    suffix: "%",
  },
  {
    icon: <SaveAsIcon color="primary" />,
    subtitle: "AI-generated notes based on conversations",
    suffix: "%",
  },
  {
    icon: <ShieldIcon color="primary" />,
    subtitle: "Privacy-Focused and your data is in your control",
    suffix: "%",
  },
];

const Hero = (): JSX.Element => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [viewPortEntered, setViewPortEntered] = useState(false);
  const setViewPortVisibility = (
    isVisible: boolean | ((prevState: boolean) => boolean)
  ) => {
    if (viewPortEntered) {
      return;
    }

    setViewPortEntered(isVisible);
  };

  return (
    <Grid container spacing={4}>
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
          src={"https://assets.maccarianagency.com/screenshots/dashboard1.jpg"}
          alt="..."
          boxShadow={3}
          borderRadius={2}
          maxWidth={600}
          sx={{
            filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
          }}
        />
      </Grid>
      <Grid item container xs={12} md={6} alignItems={"center"}>
        <Box data-aos={isMd ? "fade-right" : "fade-up"}>
          <Box marginBottom={2}>
            <Typography
              variant="h4"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              Our Messenger Offers A Range Of Features To Help You{" "}
              <Typography
                color={"secondary"}
                component={"span"}
                variant={"inherit"}
              >
                Communicate Smarter
              </Typography>
            </Typography>
          </Box>

          <Box>
            <Grid container spacing={2}>
              {mock.map((item, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <Typography variant="h3" gutterBottom>
                    <Box component="span" display="block" textAlign={"center"}>
                      <VisibilitySensor
                        onChange={(isVisible: any) =>
                          setViewPortVisibility(isVisible)
                        }
                        delayedCall
                      >
                        {/* <CountUp
                          duration={2}
                          end={viewPortEntered ? item.title : 0}
                          start={0}
                          suffix={item.suffix}
                        /> */}
                        {item.icon}
                      </VisibilitySensor>
                    </Box>
                  </Typography>
                  <Typography
                    color="text.secondary"
                    component="p"
                    textAlign={"center"}
                  >
                    {item.subtitle}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Hero;

import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Images } from "../Shared/Illustrations";
import Container from "../Container";
import CaptionRTrial from "./CaptionRUpload/CaptionRDemo";
import Stack from "@mui/material/Stack";

import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const CaptionRCard = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box>
            <Box marginBottom={2}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                }}
              >
                Captions That Capture The Moment:
                <Typography
                  variant="h4"
                  component="span"
                  color="primary"
                  sx={{
                    fontWeight: 700,
                    display: "inline-block",
                    marginLeft: 1,
                    textDecoration: "underline",
                    textDecorationColor: "primary",
                    textDecorationThickness: "2px",
                    textDecorationStyle: "solid",
                    textDecorationSkipInk: "none",
                  }}
                >
                  {" "}
                  Powered By ResponAi
                </Typography>
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" component="p" color="text.secondary">
                Transform Your Photos Into Powerful Posts With Our Image Caption
                Generator.
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={1} width={1} display={"flex"} justifyContent={"center"}>
            <Box height={1} width={1} maxWidth={450}>
              <Images width={"100%"} height={"100%"} />
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Stack
        spacing={2}
        alignItems="center"
        maxWidth={700}
        direction={isMd ? "row" : "column"}
      >
        <FacebookOutlinedIcon
          sx={{
            color: "#3b5998",
            fontSize: "4rem",
          }}
        />
        <InstagramIcon sx={{ color: "#e1306c", fontSize: "4rem" }} />
        <TwitterIcon sx={{ color: "#1da1f2", fontSize: "4rem" }} />
        <LinkedInIcon sx={{ color: "#0e76a8", fontSize: "4rem" }} />
      </Stack>

      <CaptionRTrial />
    </Container>
  );
};

export default CaptionRCard;

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
                Captions that capture the moment: powered by AI
              </Typography>
            </Box>
            <Box marginBottom={3}>
              <Typography variant="h6" component="p" color="text.secondary">
                Transform your photos into powerful posts with our image caption
                generator.
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

      <CaptionRTrial />
    </Container>
  );
};

export default CaptionRCard;

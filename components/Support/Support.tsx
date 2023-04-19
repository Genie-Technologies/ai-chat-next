import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "../Container";
import { Button } from "@mui/material";

const SupportPage = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Container>
      <Box marginBottom={isMd ? 8 : 4}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
          }}
        >
          Support
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="h4" component="h3">
          How can we help you?
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="body1" component="p">
          If you have any questions or feedback, please don't hesitate to reach
          out to us. We're happy to help with any issues you're experiencing,
          and we're always looking for ways to improve our app.
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="h4" component="h3">
          Contact Us
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="body1" component="p">
          You can contact us via email at support@responai.com or by filling out
          our contact form at https://responai.com/contact.
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="h4" component="h3">
          Privacy Policy
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="body1" component="p">
          Our privacy policy can be found at
          https://responai.com/privacy-policy.
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="h4" component="h3">
          Terms and Conditions
        </Typography>
      </Box>

      <Box marginBottom={isMd ? 8 : 4}>
        <Typography variant="body1" component="p">
          Our terms and conditions can be found at
          https://responai.com/terms-and-conditions.
        </Typography>
      </Box>

      <Button variant="contained" color="primary">
        Contact Us
      </Button>
    </Container>
  );
};

export default SupportPage;

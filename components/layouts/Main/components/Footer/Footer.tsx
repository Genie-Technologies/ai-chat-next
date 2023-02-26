import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { croppedLogoSrc } from "../../../../utils";
import Image from "next/image";
import Link from "next/link";

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box display={"flex"} title="ResponAi" width={80}>
            {/* <Link href={"/"} style={{ textDecoration: "none" }}> */}
            <Image
              src={croppedLogoSrc}
              alt="Respon.Ai"
              width={200}
              height={50}
            />
            {/* </Link> */}
          </Box>
          <Box display="flex" flexWrap={"wrap"} alignItems={"center"}>
            <Box marginTop={1} marginRight={2}>
              <Link
                href={"/"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                Home
              </Link>
            </Box>
            <Box marginTop={1}>
              <Button variant="contained" color="secondary" size="small">
                <Link
                  href="/chat"
                  style={{
                    textDecoration: "none",
                    color: theme.palette.text.primary,
                  }}
                >
                  Try Now
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={"center"}
          variant={"subtitle2"}
          color="text.secondary"
          gutterBottom
        >
          &copy; ResponAi. 2023, United States. All rights reserved
        </Typography>
        <Typography
          align={"center"}
          variant={"caption"}
          color="text.secondary"
          component={"p"}
        >
          When you visit or interact with our sites, services or tools, we or
          our authorised service providers may use cookies for storing
          information to help provide you with a better, faster and safer
          experience and for marketing purposes.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

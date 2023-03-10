import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import NavItem from "./components/NavItem";
import { PageItem, croppedLogoSrc } from "../../../../../../utils";

interface Props {
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
}

const SidebarNav = ({ pages }: Props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;

  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={"flex"}
          component="a"
          href="/"
          title="ResponAi"
          width={{ xs: 100, md: 120 }}
        >
          <Link href={"/"} style={{ textDecoration: "none" }}>
            <Box component={"img"} src={croppedLogoSrc} height={1} width={1} />
          </Link>
        </Box>
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box marginTop={1}>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              display:
                process.env.CHAT_FEATURE_ENABLED === "true" ? "block" : "none",
            }}
          >
            <Link
              href="/chat"
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                display={
                  process.env.CHAT_FEATURE_ENABLED === "true" ? "block" : "none"
                }
              >
                Try Now
              </Typography>
            </Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;

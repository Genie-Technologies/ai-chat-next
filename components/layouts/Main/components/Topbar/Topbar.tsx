import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";

import { PageItem, croppedLogoSrc } from "../../../../utils";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Skeleton } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";

interface Props {
  onSidebarOpen: () => void;
  pages: {
    landings: Array<PageItem>;
    company: Array<PageItem>;
    account: Array<PageItem>;
    secondary: Array<PageItem>;
    blog: Array<PageItem>;
    portfolio: Array<PageItem>;
  };
  colorInvert?: boolean;
}

const Topbar = ({
  onSidebarOpen,
}: Props): JSX.Element => {
  const theme = useTheme();
  const { user, isLoading } = useUser();

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Box display={"flex"} title="ResponAi" width={{ xs: 100, md: 120 }}>
        <Link href={"/"} style={{ textDecoration: "none" }}>
          <Box component={"img"} src={croppedLogoSrc} height={1} width={200} />
        </Link>
      </Box>

      {isLoading ? (
        <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
          <Skeleton variant="rectangular" width={100} height={40} />
        </Box>
      ) : (
        <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
          <Box marginLeft={4}>
            <Link
              href="https://twitter.com/ResponAi"
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
              target="_blank"
            >
              <Button variant="contained" color="secondary" size="large" sx={{ color: 'white'}}>
                <TwitterIcon />
              </Button>
            </Link>
          </Box>

          <Box marginLeft={4}>
            <Link
              href={user ? "/chat" : "/api/auth/login"}
              style={{
                textDecoration: "none",
                color: theme.palette.text.primary,
              }}
            >
              <Button variant="contained" color="secondary" size="large">
                <Typography variant="subtitle1" color="text.primary">
                  {user ? "Chat" : "Sign In"}
                </Typography>
              </Button>
            </Link>
          </Box>

          <Box marginLeft={4}>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                display:
                  process.env.CHAT_FEATURE_ENABLED === "true"
                    ? "block"
                    : "none",
              }}
            >
              <Link
                href="/chat"
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                <Typography variant="subtitle1" color="text.primary">
                  Try Now
                </Typography>
              </Link>
            </Button>
          </Box>
        </Box>
      )}

      <Box sx={{ display: { xs: "flex", md: "none" } }} alignItems={"center"}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant="outlined"
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

export default Topbar;

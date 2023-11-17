import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

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
  const { user } = useUser();
  const { mode } = theme.palette;

  const {
    landings: landingPages,
    secondary: secondaryPages,
    company: companyPages,
    account: accountPages,
    portfolio: portfolioPages,
    blog: blogPages,
  } = pages;
  const drawerOptions = user ? ['Chat'] : ['Signup'];

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
        <List>
          {drawerOptions.map((text, index) => (
            <ListItem key={text} disablePadding>
              <Link
                href={user ? "/chat" : "/api/auth/login"}
                style={{
                  textDecoration: "none",
                  color: theme.palette.text.primary,
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default SidebarNav;

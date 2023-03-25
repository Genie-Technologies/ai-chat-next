import { Chat } from "./Chat";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatsList from "./ChatList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { User } from "../../services/UserService/User.service";
import { useRouter } from "next/router";

import io from "socket.io-client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ChatCard({
  user,
  accessToken,
}: {
  user: User;
  accessToken: string;
}) {
  const theme = useTheme();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [connectedWS, setConnectedWS] = React.useState<any>(null);

  const openUserMenu = Boolean(anchorEl);
  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    router.push("/api/auth/logout");
  };

  React.useEffect(() => {
    // Initialize Websocket Connection
    console.log("Initializing Websocket Connection");

    // Check if a websocket connection already exists
    if (connectedWS) {
      console.log("Websocket Connection already exists");
      return;
    }

    // Get user token from Auth0

    const ws = io("http://localhost:3002", {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    ws.on("connect", () => {
      console.log("Connected to Websocket -->: ", ws.id);
      setConnectedWS(ws);
    });

    ws.on("disconnect", () => {
      console.log("Disconnected from Websocket");
    });

    ws.on("message", (data) => {
      console.log("Message Received: ", data);
    });
  }, []);

  const handleSendMessage = (message: string) => {
    console.log("Sending Message: ", message);
    connectedWS.emit("message", message);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "10px",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Item
              style={{
                boxShadow: "none",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Button
                onClick={handleUserMenuClick}
                aria-controls={openUserMenu ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? "true" : undefined}
                id="user-menu-button"
                sx={{
                  backgroundColor: `${theme.palette.background.paper} !important`,
                  boxShadow: "none",
                  borderRadius: 10,
                  ":hover": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                    boxShadow: "none",
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    float: "right",
                    ":hover": {
                      cursor: "pointer",
                      boxShadow:
                        "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                      transition: "all 0.3s ease",
                    },
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "none"
                        : "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                  alt="Shagun Mistry"
                  variant="circular"
                  src={user.picture}
                ></Avatar>
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleUserMenuClose}
                MenuListProps={{
                  "aria-labelledby": "user-menu-button",
                }}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={0} justifyContent={"center"} marginTop={5}>
          <Grid item>
            <ChatsList />
          </Grid>
          <Grid
            item
            style={{
              minHeight: "70vh",
              height: "100%",
            }}
          >
            <Chat handleSendMessage={handleSendMessage} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

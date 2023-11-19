import * as React from "react";

import { Button, IconButton, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PushPinIcon from "@mui/icons-material/PushPinRounded";
import { Threads } from "../../services/ThreadService/Threads.service";
import { User } from "../../services/UserService/User.service";
import { stringAvatar } from "../utils";
import { LogoutRounded } from "@mui/icons-material";
import Link from "next/link";

export default function ChatsList({
  newChat,
  threads,
  setCurrentThread,
  openDrawer,
}: {
  newChat: () => void;
  threads: Threads[];
  currentThread: any;
  user: User;
  setCurrentThread: (threadId: string | null) => void;
  openDrawer: boolean;
}) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const onSetSelectedThread = (id: string | null) => {
    setSelectedId(id);
    setCurrentThread(id);
  };

  const ChosenListItemStyles = {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.contrastText,
    borderRadius: "10px",
    transition: "all 1s ease",
  };

  const ListItemStyles = {
    transition: "all 1s ease",
    "&:hover": {
      cursor: "pointer",
      boxShadow: `rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
    },
    borderRadius: "10px",
  };

  const renderThreads = (drawerOpen: boolean): JSX.Element[] | JSX.Element => {
    if (!threads && !drawerOpen) {
      return [];
    }

    if (!threads && drawerOpen) {
      return (
        <ListItem alignItems="flex-start" sx={ListItemStyles}>
          <ListItemAvatar>
            <Avatar alt="Loading..." />
          </ListItemAvatar>
          <ListItemText primary="Loading..." />
        </ListItem>
      );
    }

    if (!threads.length && drawerOpen) {
      return (
        <ListItem alignItems="flex-start" sx={ListItemStyles}>
          <ListItemAvatar>
            <Avatar alt="No chats" />
          </ListItemAvatar>
          <ListItemText primary="No chats yet." />
        </ListItem>
      );
    }

    if (drawerOpen) {
      return threads.map((item, idx) => {
        return (
          <ListItem
            alignItems="flex-start"
            sx={selectedId === item.id ? ChosenListItemStyles : ListItemStyles}
            key={idx}
            onClick={() => onSetSelectedThread(item.id)}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.threadName}
                {...stringAvatar(item.threadName)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.threadName}
              secondary={
                <Typography
                  sx={{
                    display: "inline",
                    wordWrap: "break-word",
                  }}
                  component="p"
                  variant="caption"
                  color={theme.palette.secondary.light}
                  textOverflow={"ellipsis"}
                >
                  {item.lastMessage}
                </Typography>
              }
            />
          </ListItem>
        );
      });
    } else {
      return threads.map((item, idx) => {
        // Just return the icons for when the drawer is closed
        return (
          <ListItem
            alignItems="flex-start"
            sx={selectedId === item.id ? ChosenListItemStyles : ListItemStyles}
            key={idx}
            onClick={() => onSetSelectedThread(item.id)}
          >
            <ListItemAvatar>
              <Avatar
                alt={item.threadName}
                {...stringAvatar(item.threadName)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={item.threadName}
              secondary={
                <Typography
                  sx={{
                    display: "inline",
                    wordWrap: "break-word",
                  }}
                  component="p"
                  variant="caption"
                  color={theme.palette.secondary.light}
                  textOverflow={"ellipsis"}
                >
                  {item.lastMessage}
                </Typography>
              }
            />
          </ListItem>
        );
      });
    }

    return [];
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: "100%",
        overflow: "auto",
        backgroundColor: theme.palette.background.default,
        overflowX: "hidden",
      }}
    >
      <Stack spacing={0}>
        {openDrawer ? (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={newChat}
            sx={{
              transition: "all 0.5s ease",
              maxWidth: "100%",
              margin: "10px",
            }}
          >
            New Chat
          </Button>
        ) : (
          // Show an IconButton for when the drawer is closed
          <IconButton
            onClick={newChat}
            sx={{
              transition: "all 2s ease",
            }}
          >
            <AddIcon />
          </IconButton>
        )}
        <List>
          {/** Have a pinned chat item at the top for AI chat */}
          <ListItem
            alignItems="flex-start"
            sx={selectedId === null ? ChosenListItemStyles : ListItemStyles}
            onClick={() => onSetSelectedThread(null)}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <PushPinIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Talk to "
              primaryTypographyProps={{
                sx: {
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
              }}
              secondary="ResponAi"
              secondaryTypographyProps={{
                sx: {
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: theme.palette.secondary.dark,
                },
              }}
            />
          </ListItem>

          {renderThreads(openDrawer)}
        </List>

        <Link href="/api/auth/logout" style={{ textDecoration: "none" }}>
          {openDrawer ? (
            <Button
              variant="contained"
              onClick={() => {
                window.location.reload();
              }}
              sx={{
                transition: "all 0.5s ease",
                maxWidth: "80%",
                margin: "10px",
              }}
            >
              Logout
            </Button>
          ) : (
            <IconButton
              sx={{
                transition: "all 2s ease",
              }}
            >
              <LogoutRounded />
            </IconButton>
          )}
        </Link>
      </Stack>
    </Paper>
  );
}

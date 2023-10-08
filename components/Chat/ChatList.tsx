import * as React from "react";

import { Button, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import styles from "../../styles/ChatList.module.scss";
import PushPinIcon from "@mui/icons-material/PushPinRounded";
import { Threads } from "../../services/ThreadService/Threads.service";
import { User } from "../../services/UserService/User.service";
import { stringAvatar } from "../utils";

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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    wordWrap: "break-word",
  };

  const ListItemStyles = {
    borderBottom: "1px solid #e0e0e0",
    "&:hover": {
      transition: "all 0.5s ease",
      cursor: "pointer",
      boxShadow: `rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px`,
    },
    wordWrap: "break-word",
  };

  return (
    <Paper elevation={2}>
      <Stack spacing={0}>
        {openDrawer ? (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={newChat}
            sx={{
              // Animate the button to the right when the drawer is open
              transition: "all 0.5s ease",
            }}
          >
            New Chat
          </Button>
        ) : null}
        <List>
          {/** Have a pinned chat item at the top for AI chat */}
          <ListItem
            alignItems="flex-start"
            sx={ListItemStyles}
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

          {threads &&
            threads.map((item, idx) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  sx={
                    selectedId === item.id
                      ? ChosenListItemStyles
                      : ListItemStyles
                  }
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
                      <React.Fragment>
                        {/* <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color={theme.palette.primary.main}
                      >
                        {
                          // Besides the first item in the participants array, all other items are the other participants in the chat
                          item.participants &&
                            item.participants
                              .filter(
                                (participant) =>
                                  participant.email !== user.email
                              )
                              .map((participant, idx) => {
                                return (
                                  <span key={idx}>
                                    {participant.email ?? participant.firstName}
                                    {idx !== item.participants.length - 2
                                      ? ", "
                                      : ""}
                                  </span>
                                );
                              })
                        }
                      </Typography> */}
                        {" — "}
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color={
                            theme.palette.mode === "dark"
                              ? theme.palette.text.primary
                              : theme.palette.primary.dark
                          }
                        >
                          {item.lastMessage}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              );
            })}
        </List>
      </Stack>
    </Paper>
  );
}

import * as React from "react";

import { chatListItems } from "../utils";
import { useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
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

export default function ChatsList({
  newChat,
  threads,
  currentThread,
  user,
  setCurrentThread,
}: {
  newChat: () => void;
  threads: Threads[];
  currentThread: any;
  user: User;
  setCurrentThread: (threadId: string) => void;
}) {
  const theme = useTheme();
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const onSetSelectedThread = (id: string) => {
    setSelectedId(id);
    setCurrentThread(id);
  };

  const pinnedItemListStyle = {
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "10px",
  };

  const ListItemStyles = {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    margin: "10px 0 10px 0",
    "&:hover": {
      boxShadow: `${theme.palette.primary.light} 0px 10px 10px -5px, ${theme.palette.primary.dark} 0px 8px 10px -8px`,
      borderRadius: "10px",
      transition: "all 0.5s ease",
      cursor: "pointer",
    },
    wordWrap: "break-word",
  };

  const basePaperStyle = {
    width: "100%",
    maxWidth: 360,
    border:
      theme.palette.mode === "dark"
        ? `1px solid ${theme.palette.secondary.main}`
        : "none",
    minHeight: "100vh",
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    borderRadius: "10px",
    boxShadow:
      theme.palette.mode === "dark"
        ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
        : "none",
    marginRight: "10px",
  };

  return (
    <Paper elevation={0} sx={{ ...basePaperStyle }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={8}
          style={{
            boxShadow: "none",
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              borderBottom: `1px solid ${theme.palette.secondary.main}`,
              borderRadius: "0",
            }}
            placeholder="Search Chats"
            inputProps={{ "aria-label": "Search Chats" }}
          />
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon color="secondary" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={4}
          style={{
            boxShadow: "none",
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{
              color: theme.palette.primary.contrastText,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                transition: "all 0.5s ease",
              },
            }}
            onClick={() => newChat()}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          borderRadius: "10px",
        }}
      >
        {/** Have a pinned chat item at the top for AI chat */}
        <ListItem
          alignItems="flex-start"
          sx={
            !selectedId
              ? { ...ListItemStyles, ...pinnedItemListStyle }
              : { ...ListItemStyles }
          }
          className={styles.chatListItem}
          onClick={() => onSetSelectedThread(null)}
        >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
              <PushPinIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Talk to ResponAi"
            primaryTypographyProps={{
              sx: {
                fontWeight: "bold",
                color: theme.palette.primary.main,
                fontSize: "1.2rem",
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
                  selectedId == item.id
                    ? { ...ListItemStyles, ...pinnedItemListStyle }
                    : { ...ListItemStyles }
                }
                key={idx}
                className={styles.chatListItem}
                onClick={() => onSetSelectedThread(item.id)}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.threadName}
                    src="/static/images/avatar/2.jpg"
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
    </Paper>
  );
}

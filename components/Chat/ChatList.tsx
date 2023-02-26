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

export default function ChatsList() {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
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
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        marginRight: "10px",
      }}
    >
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
              color: theme.palette.text.primary,
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
                transition: "all 0.5s ease",
              },
            }}
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
        {chatListItems.map((item, idx) => {
          return (
            <ListItem
              alignItems="flex-start"
              sx={{
                color: theme.palette.secondary.main,
                borderRadius: "0",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                margin: "10px 0 10px 0",
                "&:hover": {
                  boxShadow: `${theme.palette.primary.light} 0px 10px 10px -5px, ${theme.palette.primary.dark} 0px 8px 10px -8px`,
                  borderRadius: "10px",
                  transition: "all 0.5s ease",
                  cursor: "pointer",
                },
              }}
              key={idx}
              className={styles.chatListItem}
            >
              <ListItemAvatar>
                <Avatar alt={item.sender} src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={item.threadName}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color={theme.palette.primary.main}
                    >
                      {item.recievers.join(", ")}
                    </Typography>
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
                      {item.previewMessage}
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

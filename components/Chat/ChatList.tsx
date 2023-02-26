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

export default function ChatsList() {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 360,
        border: `1px solid ${theme.palette.secondary.main}`,
        minHeight: "100vh",
        backgroundColor: theme.palette.background.paper,
        padding: "20px 0 0 0",
        borderRadius: "10px 0 0 10px",
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
                borderRadius: "10px",
                "&:hover": {
                  backgroundColor: theme.palette.background.paper,
                  transition: "all 0.5s ease",
                },
              }}
              key={idx}
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
                      color="#38ef7d"
                    >
                      {item.recievers.join(", ")}
                    </Typography>
                    {" — " + item.previewMessage}
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

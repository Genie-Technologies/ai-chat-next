import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";
import { chatListItems } from "../utils";

export default function ChatsList() {
  const theme = useTheme();
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        borderRadius: "10px",
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
      }}
    >
      {chatListItems.map((item) => {
        return (
          <ListItem
            alignItems="flex-start"
            sx={{
              color: theme.palette.secondary.main,
            }}
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
  );
}

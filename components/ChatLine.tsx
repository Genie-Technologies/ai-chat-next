import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person2Rounded";

import styles from "../styles/ChatLine.module.scss";

export type Message = {
  who: "me" | "other" | undefined;
  message?: string;
  customKey: number;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">
          <a href="#" className="hover:underline">
            AI
          </a>
        </p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "other", message, customKey }: Message) {
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  const getStyleForMessage = (forWho: "me" | "other") => {
    // If it is a message from me, then align it to the right and style it differently
    if (forWho === "me") {
      return {
        textAlign: "right",
        color: "white",
        backgroundColor: "#3f51b5",
      };
    }
    // If it is a message from other, then align it to the left and style it differently
    return {
      textAlign: "left",
      color: "black",
      backgroundColor: "#e0e0e0",
    };
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
    >
      <ListItem alignItems="flex-start" className={styles.listMessage}>
        <ListItemAvatar style={{ display: who === "me" ? "none" : "block" }}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={message}
          style={{
            textAlign: who === "me" ? "right" : "left",
          }}
        />
      </ListItem>
      <Divider variant="fullWidth" component="li" />
    </List>
  );
}

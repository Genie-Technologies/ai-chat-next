import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import * as materialColors from "@mui/material/colors";

export type Message = {
  who: "me" | "other" | undefined;
  message?: string;
  customKey: number;
};

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "other", message, customKey }: Message) {
  const theme = useTheme();

  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  const loopThroughColors = Object.keys(materialColors);
  const randomColor =
    loopThroughColors[Math.floor(Math.random() * loopThroughColors.length)];

  return (
    <ListItem
      key={customKey}
      style={{
        display: "flex",
        justifyContent: who === "me" ? "flex-end" : "flex-start",
      }}
    >
      {who === "me" && (
        <ListItemAvatar>
          <Avatar
            alt="me"
            sx={{
              backgroundColor: materialColors.red[500],
            }}
          ></Avatar>
        </ListItemAvatar>
      )}
      <ListItemText
        primary={message}
        style={{
          backgroundColor:
            who === "me"
              ? theme.palette.primary.main
              : theme.palette.primary.light,
          borderRadius: "20px",
          padding: "8px 16px",
          maxWidth: "70%",
        }}
      />
    </ListItem>
  );
}

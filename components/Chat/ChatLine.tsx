import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material";
import * as materialColors from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";

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
  const [loading, setLoading] = React.useState(false);

  const theme = useTheme();

  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  const getMessageBubble = () => {
    if (who === "me") {
      return (
        <>
          {loading ? (
            <Skeleton variant="rounded" width={300} height={40} />
          ) : (
            <ListItemText
              primary={message}
              style={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: "20px",
                padding: "8px 16px",
                maxWidth: "70%",
              }}
            />
          )}
          {!loading ? (
            <ListItemAvatar>
              <Avatar
                alt="me"
                sx={{
                  backgroundColor: materialColors.red[500],
                  marginLeft: "8px",
                }}
              ></Avatar>
            </ListItemAvatar>
          ) : (
            loading && <Skeleton variant="circular" width={40} height={40} />
          )}
        </>
      );
    }

    return (
      <>
        {!loading ? (
          <ListItemAvatar>
            <Avatar
              alt="other"
              sx={{
                backgroundColor: materialColors.green[500],
              }}
            ></Avatar>
          </ListItemAvatar>
        ) : (
          loading && <Skeleton variant="circular" width={40} height={40} />
        )}

        {loading ? (
          <Skeleton variant="rounded" width={300} height={40} />
        ) : (
          <ListItemText
            primary={message}
            style={{
              backgroundColor: theme.palette.primary.light,
              borderRadius: "20px",
              padding: "8px 16px",
              maxWidth: "70%",
            }}
          />
        )}
      </>
    );
  };

  return (
    <ListItem
      key={customKey}
      style={{
        display: "flex",
        justifyContent: who === "me" ? "flex-end" : "flex-start",
      }}
    >
      {getMessageBubble()}
    </ListItem>
  );
}
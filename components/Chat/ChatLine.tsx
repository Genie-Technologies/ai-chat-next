import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useTheme, useMediaQuery } from "@mui/material";
import * as materialColors from "@mui/material/colors";
import Skeleton from "@mui/material/Skeleton";
import { stringAvatar } from "../utils";

export type Props = {
  who: "me" | "other";
  message: string;
  customKey: number;
};

export function ChatLine({ who, message, customKey }: Props) {
  const [loading, setLoading] = React.useState(false);
  const isLargeScreen = useMediaQuery("(min-width:1200px)");
  const theme = useTheme();

  if (!message) {
    return null;
  }

  const messageStyle = {
    borderRadius: "10px",
    background:
      who === "me"
        ? theme.palette.secondary.light
        : theme.palette.secondary.dark,
    color: theme.palette.secondary.contrastText,
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
    maxWidth: 'fit-content',
    padding: "8px 16px",
  };

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
                ...messageStyle,
                overflowWrap: "break-word",
                textAlign: "right",
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
                  boxShadow:
                    "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
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
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
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
              ...messageStyle,
              overflowWrap: "break-word",
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

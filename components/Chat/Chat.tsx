import { type Message, ChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import InputMessage from "./InputMessage";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "other",
    message: "Hi! I'm A friendly AI assistant. Ask me anything!",
    customKey: 1,
  },
];

export function Chat() {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "me" } as Message,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: last10messages,
        user: cookie[COOKIE_NAME],
      }),
    });

    console.log("response", response);
    const data = await response.json();

    // strip out white spaces from the bot message
    const botNewMessage = data.text.trim();

    setMessages([
      ...newMessages,
      { message: botNewMessage, who: "other" } as Message,
    ]);
    setLoading(false);
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
        padding: 2,
        overflow: "scroll",
        border:
          theme.palette.mode === "dark"
            ? `1px solid ${theme.palette.info.main}`
            : "none",
        borderRadius: "0",
      }}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            alignItems: "center",
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <AvatarGroup max={3}>
            <Avatar
              alt="Remy Sharp"
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://material-ui.com/static/images/avatar/2.jpg"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://material-ui.com/static/images/avatar/3.jpg"
            />
          </AvatarGroup>
          <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
            Title of Chat here
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button sx={{ float: "right" }} variant="contained">
            <MenuIcon />
          </Button>
        </Grid>
      </Grid>
      <List sx={{ overflow: "auto", p: 2 }}>
        {messages.map((message, index) => (
          <ChatLine
            key={index}
            message={message.message}
            who={message.who}
            customKey={index}
          />
        ))}
      </List>
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </Card>
  );
}

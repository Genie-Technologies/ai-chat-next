import { useEffect, useState } from "react";
import InputMessage from "./Chat/InputMessage";
import { type Message, ChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { Grid, List, Paper, Typography, useTheme } from "@mui/material";
import Card from "@mui/material/Card";

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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "black",
        borderRadius: 10,
      }}
    >
      <Typography variant="h5" sx={{ p: 2 }}>
        Chat with AI
      </Typography>
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

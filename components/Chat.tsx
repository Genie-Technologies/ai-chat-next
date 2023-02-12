import { useEffect, useState } from "react";
import InputMessage from "./Chat/InputMessage";
import { type Message, ChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { Grid, List, Paper, Typography } from "@mui/material";

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
    <div>
      <List>
        {messages.map(({ message, who }, index) => (
          <ChatLine customKey={index} who={who} message={message} key={index} />
        ))}
        {/* {loading && <LoadingChatLine />} */}
      </List>
      {messages.length < 2 && (
        <Typography variant="subtitle1" gutterBottom>
          Type a message to start the conversation
        </Typography>
      )}
      <InputMessage
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
  );
}

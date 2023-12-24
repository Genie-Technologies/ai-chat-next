import { ChatLine } from "./ChatLine";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import AIInputMessage from "./AIInputMessage";
import List from "@mui/material/List";
import { useTheme } from "@mui/material/styles";
import UserService, { User } from "../../services/UserService/User.service";
import ThreadService from "../../services/ThreadService/Threads.service";
import { useChat } from 'ai/react';

import { Message } from "../utils";
import { Grid } from "@mui/material";

const threadService = new ThreadService();
const userService = new UserService();

export function AIChat({
  ThreadSelect,
}: {
  ThreadSelect: ({ selectedThread, setSelectedThread }: any) => JSX.Element;
}) {
  const theme = useTheme();
  const [selectedThreadId, setThreadId] = useState("");
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: `${process.env.NEXT_PUBLIC_API_URL}/ai/chat`,
    body: {
      threadId: selectedThreadId,
    }
  });

  console.log('messages', messages);
  return (
    <Card
      elevation={0}
      sx={{
        height: "100%",
        minHeight: "100vh",
        maxHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: 2,
        overflow: "hidden",
        borderRadius: "10px",
        margin: "auto",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Grid container justifyContent={"center"}>
        <Avatar alt="responAI" />
      </Grid>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "2rem",
          fontWeight: "bold",
        }}
      >
        <ThreadSelect selectedThread={selectedThreadId} setThreadId={setThreadId} />
      </div>
      <List sx={{ overflow: "auto", p: 2 }}>
        {messages.map((message, index) => {
          return (
            <ChatLine
              key={message.id}
              message={message.content}
              customKey={index}
              who={message.role == "assistant" ? "other": "me"}
            />
          );
        })}
      </List>
      <AIInputMessage
        input={input}
        setInput={handleInputChange}
        sendMessage={handleSubmit}
        loading={isLoading}
      />
    </Card>
  );
}

export default AIChat
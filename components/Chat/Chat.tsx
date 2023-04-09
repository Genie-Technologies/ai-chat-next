import { ChatLine } from "./ChatLine";
import { useCookies } from "react-cookie";
import { useEffect, useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import InputMessage from "./InputMessage";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { TextField, useEventCallback } from "@mui/material";
import { User } from "../../services/UserService/User.service";
import { isMobileNumber } from "../utils";
import ThreadService, {
  Threads,
  ThreadsResponseData,
} from "../../services/ThreadService/Threads.service";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";
const snackbar_message = "snackbar_message";

// default first message to display in UI (not necessary to define the prompt)
// export const initialMessages: MessageBody[] = [
//   {
//     who: "other",
//     message: "Hi! I'm A friendly AI assistant. Ask me anything!",
//     customKey: 1,
//   },
// ];

export interface MessageBody {
  createdAt: string;
  id: string;
  message: string;
  recieverId: string;
  senderId: string;
  threadId: string;
  updatedAt: string;
}

export function Chat({
  user,
  handleSendMessage,
  isNewChat,
  currentThread,
  setCurrentThread,
}: {
  user: User;
  handleSendMessage: Function;
  isNewChat: boolean;
  currentThread: ThreadsResponseData[0];
  setCurrentThread: Function;
}) {
  const theme = useTheme();
  const [messages, setMessages] = useState<MessageBody[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  const getMessagesForThread = useCallback(async () => {
    if (currentThread) {
      // Call out to the API to get the messages for this thread
      const threadService = new ThreadService();
      console.log("Current Thread: ", currentThread);
      const newMessages = await threadService.getMessagesForThread(
        currentThread.id
      );
      console.log("newMessages", newMessages);
      setMessages(newMessages);
    }
  }, [currentThread]);

  useEffect(() => {
    getMessagesForThread();
  }, [getMessagesForThread]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);

    // add message to UI

    setMessages([
      ...messages,
      {
        createdAt: new Date().toISOString(),
        id: "",
        message,
        recieverId: "",
        senderId: "",
        threadId: "",
        updatedAt: new Date().toISOString(),
      },
    ]);

    handleSendMessage(message);

    setLoading(false);
  };

  const sendEventToWindowListener = (message: string, severity: string) => {
    const event = new CustomEvent(snackbar_message, {
      detail: { message, severity },
    });
    window.dispatchEvent(event);
  };

  // handle new chat creation
  const startNewChat = async (e: React.FormEvent) => {
    try {
      setChatLoading(true);
      e.preventDefault();
      const theElement = e.target as HTMLInputElement;
      const numberEntered = theElement.value;
      if (numberEntered && isMobileNumber(numberEntered)) {
        console.log("Start new chat with: ", numberEntered);
        const threadService = new ThreadService();
        console.log("User: ", user);
        const requestBody = {} as any;

        const newThread: Threads = {
          id: "",
          userId: user.id ?? user.authOId,
          createdAt: new Date(),
          isActive: true,
          threadName: numberEntered,
        };
        requestBody.threads = newThread;
        requestBody.participants = [user.id ?? user.authOId, numberEntered];

        const newThreadResponse = await threadService.createThread(requestBody);
        if (newThreadResponse) {
          console.log("New thread created: ", newThreadResponse);
          sendEventToWindowListener("New chat started!", "success");
          setCurrentThread(newThreadResponse);
        }
      }
      setChatLoading(false);
    } catch (error) {
      console.log("Error creating new thread: ", error);
      sendEventToWindowListener(
        "There was an error creating a new thread. Please try again later.",
        "error"
      );
      setChatLoading(false);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        maxHeight: "100vh",
        minWidth: "50vw",
        maxWidth: "50vw",
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
        borderRadius: "10px",
        boxShadow:
          theme.palette.mode === "dark"
            ? `0px 0px 25px 0px ${theme.palette.info.main}`
            : `0px 0px 25px 0px ${theme.palette.grey[300]}`,
      }}
    >
      {isNewChat && (
        // Show a search bar to look up a user to chat with
        <Autocomplete
          freeSolo
          id="grouped-demo"
          options={
            user.friends
              ? user.friends.sort(
                  (a, b) => -b.substring(0, 1).localeCompare(a.substring(0, 1))
                )
              : []
          }
          groupBy={(option) => option.substring(0, 1)}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Or Enter Phone Number"
              // Once they press enter or click on a friend, start a new chat
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === "Tab") {
                  startNewChat(e);
                }
              }}
              onBlur={(e) => {
                startNewChat(e);
              }}
            />
          )}
        />
      )}

      {!isNewChat && currentThread && (
        <>
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
              {/* <AvatarGroup max={3}>
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
              </AvatarGroup> */}
              <Typography
                variant="h6"
                sx={{ color: theme.palette.text.primary }}
              >
                {currentThread.threadName}
              </Typography>
            </Grid>
            {/* <Grid item xs={4}>
              <Button sx={{ float: "right" }} variant="contained">
                <MenuIcon />
              </Button>
            </Grid> */}
          </Grid>
          <List sx={{ overflow: "auto", p: 2 }}>
            {messages.map((message, index) => (
              <ChatLine
                key={index}
                message={message.message}
                who={message.recieverId === user.id ? "me" : "other"}
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
        </>
      )}
    </Card>
  );
}

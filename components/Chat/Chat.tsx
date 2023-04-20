import { type Message, ChatLine } from "./ChatLine";
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
import { TextField } from "@mui/material";
import UserService, { User } from "../../services/UserService/User.service";
import { isEmail, isMobileNumber } from "../utils";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";

const COOKIE_NAME = "nextjs-example-ai-chat-gpt3";
const snackbar_message = "snackbar_message";

// default first message to display in UI (not necessary to define the prompt)
export const initialMessages: Message[] = [
  {
    who: "other",
    message: "Hi! I'm A friendly AI assistant. Ask me anything!",
    customKey: 1,
  },
];

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
  currentThread: Threads | null;
  setCurrentThread: Function;
}) {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cookie, setCookie] = useCookies([COOKIE_NAME]);

  const [chatLoading, setChatLoading] = useState(false);
  const [userFriends, setUserFriends] = useState<string[]>(user.friends ?? []);

  useEffect(() => {
    if (!cookie[COOKIE_NAME]) {
      // generate a semi random short id
      const randomId = Math.random().toString(36).substring(7);
      setCookie(COOKIE_NAME, randomId);
    }
  }, [cookie, setCookie]);

  useCallback(async () => {
    console.log("UseCallBack ---> ", currentThread);
    // Get the latest messages from the API
    if (currentThread) {
      const threadService = new ThreadService();
      const messages = await threadService.getMessagesForThread(
        currentThread.id
      );

      if (messages) {
        console.log("Messages: ", messages);
        setMessages(messages);
      }
    }
  }, [currentThread]);

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    const newMessages = [
      ...messages,
      { message: message, who: "me" } as Message,
    ];
    setMessages(newMessages);

    console.log("Current Thread: ", currentThread);

    const listOfParticipants = currentThread?.participants
      .filter((participant) => participant.userid !== user.id)
      .map((participant) => participant.userid);

    console.log("listOfParticipants", listOfParticipants);
    handleSendMessage(message, listOfParticipants);

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
      const valueEntered = theElement.value;

      if (!valueEntered) {
        sendEventToWindowListener(
          "Please enter a phone number to chat with.",
          "error"
        );
        setChatLoading(false);
        return;
      }

      if (valueEntered && isEmail(valueEntered)) {
        // Search for the user by email
        const userService = new UserService();
        const userFound = await userService.searchUsers(
          `email=${valueEntered}`
        );

        if (userFound && userFound.length > 0) {
          // push the new user to the friends array if they are not already in there
          userFound.forEach((_user: User) => {
            const fullName = `${_user.firstName} ${_user.lastName}`;
            if (
              !userFriends.includes(fullName) &&
              !userFriends.includes(_user.email)
            ) {
              userFriends.push(_user.email);
            }
          });
        }

        console.log("User found: ", userFound);
        if (userFound && userFound.length === 1) {
          // Start a new chat with the user
          const selectedUser = userFound[0];
          const threadService = new ThreadService();
          const newThread: Threads = {
            id: "",
            userId: user.id,
            participants: [selectedUser.id, user.id],
            messages: [],
            createdAt: new Date().toISOString(),
            isActive: true,
            lastMessage: null,
            threadName: selectedUser.email,
            threadLinkId: "",
          };

          console.log("About to create new thread: ", newThread);
          const newThreadResponse = await threadService.createThread(newThread);

          console.log("New thread response: ", newThreadResponse);
          if (newThreadResponse) {
            console.log("New thread created: ", newThreadResponse);
            sendEventToWindowListener("New chat started!", "success");
            setCurrentThread(newThreadResponse[0]);
          }
        } else {
          sendEventToWindowListener(
            "No user found with that email address.",
            "error"
          );
        }
      }

      // If a phone number was entered.
      if (valueEntered && isMobileNumber(valueEntered)) {
        console.log("Start new chat with: ", valueEntered);
        const threadService = new ThreadService();
        console.log("[Chat Compoennt] User: ", user);
        const newThread: any = {
          id: "",
          userId: user.id ?? user.authOId,
          createdAt: new Date().toISOString(),
          participants: [user.authOId, valueEntered],
          messages: [],
          isActive: true,
          lastMessage: null,
          threadName: valueEntered,
        };

        const newThreadResponse = await threadService.createThread(newThread);
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

  console.log("------- Current Thread: ", currentThread, "-------");

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
            userFriends.length > 0
              ? userFriends.sort(
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
              {currentThread?.participants
                ?.filter((participant) => participant.userid !== user.email)
                .map((participant) => {
                  if (participant.userid !== user.id) {
                    return (
                      <Avatar
                        key={participant.userid}
                        alt={participant.firstName}
                        sx={{ marginRight: 1 }}
                      />
                    );
                  }
                })}
            </Grid>
          </Grid>
          <List sx={{ overflow: "auto", p: 2 }}>
            {currentThread.messages
              ? currentThread.messages.map((id, index) => {
                  return (
                    <ChatLine
                      key={id.id}
                      message={id.message}
                      customKey={index}
                      who="me"
                    />
                  );
                })
              : null}
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

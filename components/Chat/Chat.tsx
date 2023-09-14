import { ChatLine } from "./ChatLine";
import { useEffect, useState, useCallback } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import InputMessage from "./InputMessage";
import List from "@mui/material/List";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { TextField } from "@mui/material";
import UserService, { User } from "../../services/UserService/User.service";
import {
  ReceivedMessageData,
  isEmail,
  isMobileNumber,
  sendEventToWindowListener,
} from "../utils";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";
import { snackbar_message } from "../constants";
import { Message } from "../utils";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

const threadService = new ThreadService();
const userService = new UserService();

export function Chat({
  user,
  handleSendMessage,
  isNewChat,
  currentThread,
  setCurrentThread,
  socket,
}: {
  user: User;
  handleSendMessage: Function;
  isNewChat: boolean;
  currentThread: Threads | null;
  setCurrentThread: Function;
  socket: Socket;
}) {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [userFriends, setUserFriends] = useState<string[]>(user.friends ?? []);

  useEffect(() => {
    const getMessages = async () => {
      if (!currentThread) {
        setMessages([]);
        return;
      }

      const messages = await threadService.getMessagesForThread(
        currentThread.id
      );

      if (messages) {
        setMessages(messages);
      }
    };
    getMessages();
  }, [currentThread]);

  // handle new message from socket
  useEffect(() => {
    function onReceivedMessage(messageData: ReceivedMessageData) {
      const { threadId, newMessage, participants } = messageData;

      if (threadId === currentThread?.id && participants.includes(user.id)) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    }

    socket.on(`received_message`, onReceivedMessage);

    return () => {
      socket.off(`received_message`, onReceivedMessage);
    };
  }, [socket, currentThread?.id, user.id]);

  const updateFriendsList = (friends: []) => {
    if (friends && friends.length > 0) {
      // push the new user to the friends array if they are not already in there
      friends.forEach((friend: User) => {
        const fullName = `${friend.firstName} ${friend.lastName}`;
        if (
          !userFriends.includes(fullName) &&
          !userFriends.includes(friend.email)
        ) {
          setUserFriends([...userFriends, friend.email]);
        }
      });
    }
  };

  // send message to API /api/chat endpoint
  const sendMessage = async (message: string) => {
    setLoading(true);
    // Handling adding the message optimistically could be complicated.
    const newMessages = [
      ...messages,
      {
        message: message,
        threadId: currentThread?.id,
        createdAt: new Date().toISOString(),
        senderId: user.id,
        // generate a uuid for the message below using the uuid package
        id: uuidv4(),
      } as Message,
    ];
    setMessages(newMessages);

    const listOfParticipants = currentThread?.participants
      .map((participant) => {
        if (participant.userId !== user.id) {
          return participant.userId;
        }
      })
      .filter(Boolean);

    if (currentThread) handleSendMessage(message, listOfParticipants);
    setLoading(false);
  };

  const handleNewChatCreationAfterSearch = async (
    selectedUser: any,
    type: "email" | "phone"
  ) => {
    const newThread: Threads = {
      id: "",
      userId: user.id,
      participants: [selectedUser.id, user.id],
      createdAt: new Date().toISOString(),
      isActive: true,
      lastMessage: null,
      threadName: type === "email" ? selectedUser.email : selectedUser.phone,
    };

    const newThreadResponse = await threadService.createThread(newThread);

    if (newThreadResponse) {
      sendEventToWindowListener(
        snackbar_message,
        "New chat started!",
        "success"
      );
      setCurrentThread(newThreadResponse[0]);
    }
  };

  const startNewChat = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const theElement = e.target as HTMLInputElement;
      const valueEntered = theElement.value;

      if (!valueEntered) {
        sendEventToWindowListener(
          snackbar_message,
          "Please enter a phone number or an email to chat with.",
          "error"
        );
        return;
      }

      if (valueEntered && isEmail(valueEntered)) {
        // Search for the user by email
        const userFound = await userService.searchUsers(
          `email=${valueEntered}`
        );

        updateFriendsList(userFound);

        if (userFound && userFound.length === 1) {
          handleNewChatCreationAfterSearch(userFound[0], "email");
        } else {
          sendEventToWindowListener(
            snackbar_message,
            "No user found with that email address.",
            "error"
          );
        }
      }

      // If a phone number was entered.
      if (valueEntered && isMobileNumber(valueEntered)) {
        // Search for the user by phone number
        // TODO: Even if the phone number is not found, we should still create a new thread and send a message to the user via SMS.
        const userFound = await userService.searchUsers(
          `phone=${valueEntered}`
        );

        updateFriendsList(userFound);

        if (userFound && userFound.length === 1) {
          handleNewChatCreationAfterSearch(userFound[0], "phone");
        } else {
          sendEventToWindowListener(
            snackbar_message,
            "No user found with that phone number.",
            "error"
          );
        }
      }
    } catch (error) {
      sendEventToWindowListener(
        snackbar_message,
        "There was an error creating a new thread. Please try again later.",
        "error"
      );
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
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.palette.background.paper,
        padding: 2,
        overflow: "hidden",
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
      {false && (
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
            {currentThread?.participants &&
            currentThread?.participants?.length > 0 ? (
              currentThread.participants
                .filter((participant) => participant.userId !== user.email)
                .map((participant) => {
                  if (participant.userId !== user.id) {
                    return (
                      <Avatar
                        key={participant.userId}
                        alt={participant.firstName}
                        sx={{ marginRight: 1 }}
                      />
                    );
                  }
                })
            ) : (
              <Avatar alt="responAI" sx={{ marginRight: 1 }} />
            )}
          </Grid>
        </Grid>
        <List sx={{ overflow: "auto", p: 2 }}>
          {messages.map((message, index) => {
            return (
              <ChatLine
                key={index}
                message={message.message}
                customKey={index}
                who={message.senderId === user.id ? "me" : "other"}
              />
            );
          })}
        </List>
        <InputMessage
          input={input}
          setInput={setInput}
          sendMessage={sendMessage}
          loading={loading}
        />
      </>
    </Card>
  );
}

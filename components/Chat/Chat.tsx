import { ChatLine } from "./ChatLine";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import InputMessage from "./InputMessage";
import List from "@mui/material/List";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@mui/material/styles";
import { AvatarGroup, Paper, TextField } from "@mui/material";
import UserService, { User } from "../../services/UserService/User.service";
import {
  ReceivedMessageData,
  isEmail,
  isMobileNumber,
  sendEventToWindowListener,
  stringAvatar,
} from "../utils";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";
import { snackbar_message } from "../constants";
import { Message } from "../utils";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import AddChatUser from "./AddChatUser";

const threadService = new ThreadService();
const userService = new UserService();

export function Chat({
  user,
  handleSendMessage,
  currentThread,
  setThreads,
  socket,
  setCurrentThread
}: {
  user: User;
  handleSendMessage: Function;
  currentThread: Threads | null;
  setThreads: Function;
  socket: Socket;
  setCurrentThread: Function;
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
      <>
        <Paper
          elevation={0}
          sx={{
            borderRadius: "10px",
            display: "fixed",
            top: 0,
            justifyContent: "center",
            width: "max-content",
            margin: "10px auto",
          }}
        >
          {currentThread?.participants &&
          currentThread?.participants?.length > 0 ? (
            <AvatarGroup sx={{ backgroundColor: theme.palette.background.paper}}>
              {currentThread.participants
                .filter((participant) => participant.userId !== user.email)
                .map((participant) => {
                  if (participant.userId !== user.id) {
                    return (
                      <Avatar
                        key={participant.userId}
                        alt={participant.firstName}
                        {...stringAvatar(participant.userId)}
                      />
                    );
                  }
                })}
            </AvatarGroup>
          ) : (
            <Avatar alt="responAI" />
          )}
        </Paper>

        {/* Original code for this is with phone number lookup is stored in Notion Project QuickNotes */}
      {currentThread?.participants && currentThread.participants?.length < 1 && (
        <AddChatUser threadId={currentThread.id} setThreads={setThreads} userId={user.id} setCurrentThread={setCurrentThread} />
      )}

        <List sx={{ overflow: "auto", p: 2, marginTop: "auto" }}>
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
          threadId={currentThread?.id}
        />
      </>
    </Card>
  );
}

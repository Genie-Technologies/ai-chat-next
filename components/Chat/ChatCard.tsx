import { useEffect } from "react";
import { Chat } from "./Chat";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatsList from "./ChatList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserService, { User } from "../../services/UserService/User.service";
import { useRouter } from "next/router";

import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";
import { connectSocket } from "../socket";
import { ReceivedMessageData, grabSubsetOfMessage } from "../utils";

const threadService = new ThreadService();
const userService = new UserService();

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ChatCard({
  user,
  accessToken,
  threads,
}: {
  user: User;
  accessToken: string;
  threads: Threads[];
}) {
  const theme = useTheme();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [connectedWS, setConnectedWS] = React.useState<any>(null);
  const [isNewChat, setIsNewChat] = React.useState<boolean>(false);

  const [_threads, setThreads] = React.useState<Threads[]>(
    threads && threads.length > 0 ? threads : []
  );
  const [currentThread, setCurrentThread] = React.useState<Threads | null>(
    threads && threads.length > 0 ? threads[0] : null
  );

  const openUserMenu = Boolean(anchorEl);

  const socket = connectSocket(accessToken);

  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    router.push("/api/auth/logout");
  };

  useEffect(() => {
    function onConnect() {
      setConnectedWS(true);
    }

    function onDisconnect() {
      setConnectedWS(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // How to handle interrupted connections: https://socket.io/how-to/use-with-react#temporary-disconnections
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]); 


  // Listen for new messages
  useEffect(() => {
    if (!connectedWS) return 
    function onReceivedMessage(messageData: ReceivedMessageData) {
      const { threadId, newMessage, participants } = messageData;
      if (threadId) {
        // Check if the thread already exists
        const threadExists = _threads.find((thread) => {
          return thread.id === messageData.threadId;
        });

        if (threadExists) {
          setThreads((prevThreads) => {
            return prevThreads.map((thread) => {
              if (thread.id === messageData.threadId) {
                const updatedThread = { ...thread };
                updatedThread.messages.push(newMessage);
                updatedThread.lastMessage = grabSubsetOfMessage(newMessage.message);
                return updatedThread;
              }
              return thread;
            });
          });
        } else {
          const newThread = {
            createdAt: newMessage.createdAt,
            isActive: true,
            lastMessage: grabSubsetOfMessage(newMessage.message),
            messages: [newMessage],
            participants: participants,
            userId: newMessage.senderId,
            threadName: messageData.threadName,
            id: messageData.threadId
          };

          setThreads([..._threads, newThread])
        }
      }
    }

    socket.on(`received_message`, onReceivedMessage);

    return () => {
      socket.off(`received_message`, onReceivedMessage);
    }
  }, [connectedWS, socket, _threads, user.id]);


  // join the current thread to show online users for that thread. 
  useEffect(() => {
    if (connectedWS && currentThread?.id) {
      socket.emit("join", {
        room: currentThread.id,
      });
    }
  }, [connectedWS, socket, currentThread?.id]);

  // join home to show user is online in the home page
  useEffect(() => {
    if (connectedWS && user.id) {
      socket.emit("join_home", {
        user_id: user.id,
      });
    }
  }, [connectedWS, socket, user.id]);

  const handleSendMessage = (message: string, participantUserIds: string[]) => {
    if (connectedWS && currentThread) {
        socket.emit(`incoming_message`, {
          message,
          sender_id: user.id,
          receiver_id: "",
          participants: participantUserIds,
          thread_id: currentThread.id,
          thread_name: currentThread.threadName,
          timestamp: new Date().toISOString(),
        });

      // Add the message to the current thread
      const newThreads = _threads.map((thread) => {
        if (thread.id === currentThread.id) {
          const newDate = new Date().toISOString();
          thread.messages.push({
            message,
            senderId: user.id,
            receiverId: participantUserIds[0],
            threadId: currentThread.id,
            updatedAt: newDate,
            createdAt: newDate,
            id: "",
          });

          thread.lastMessage = message;
        }
        return thread;
      });

      setThreads(newThreads);
    }
  };

  const startNewChat = () => {
    setIsNewChat(!isNewChat);
  };

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "10px",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Item
              style={{
                boxShadow: "none",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Button
                onClick={handleUserMenuClick}
                aria-controls={openUserMenu ? "user-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openUserMenu ? "true" : undefined}
                id="user-menu-button"
                sx={{
                  backgroundColor: `${theme.palette.background.paper} !important`,
                  boxShadow: "none",
                  borderRadius: 10,
                  ":hover": {
                    backgroundColor: `${theme.palette.background.paper} !important`,
                    boxShadow: "none",
                  },
                }}
                
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    float: "right",
                    ":hover": {
                      cursor: "pointer",
                      boxShadow:
                        "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
                      transition: "all 0.3s ease",
                    },
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "none"
                        : "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  }}
                  alt="Shagun Mistry"
                  variant="circular"
                  src={user.picture}
                ></Avatar>
                Hello
              </Button>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={openUserMenu}
                onClose={handleUserMenuClose}
                MenuListProps={{
                  "aria-labelledby": "user-menu-button",
                }}
              >
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
              </Menu>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent={"center"} marginTop={5}>
          <Grid item>
            <ChatsList
              newChat={startNewChat}
              threads={_threads}
              currentThread={currentThread}
              user={user}
            />
          </Grid>
          <Grid
            item
            style={{
              minHeight: "70vh",
              height: "100%",
            }}
          >
            {currentThread?.messages && <Chat
              user={user}
              handleSendMessage={handleSendMessage}
              isNewChat={!currentThread || isNewChat}
              currentThread={currentThread}
              setCurrentThread={(thread: Threads) => {
                setCurrentThread(thread);
                // save it to the threads array if it doesn't exist
                if (!_threads.find((t) => t.id === thread.id)) {
                  setThreads([..._threads, thread]);
                }
                setIsNewChat(false);
              }}
              socket={socket}
            />}
            
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

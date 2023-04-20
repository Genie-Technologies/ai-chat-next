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

import io, { Socket } from "socket.io-client";
import ThreadService, {
  Threads,
  ThreadsResponseData,
} from "../../services/ThreadService/Threads.service";
import { reverse } from "dns";

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
  const [webhook, setWebhook] = React.useState<any>(null);

  const [_threads, setThreads] = React.useState<Threads[]>(
    threads && threads.length > 0 ? threads : []
  );
  const [currentThread, setCurrentThread] = React.useState<Threads | null>(
    threads && threads.length > 0 ? threads[0] : null
  );

  console.log("MY threads", threads, currentThread);

  const openUserMenu = Boolean(anchorEl);
  const handleUserMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    router.push("/api/auth/logout");
  };

  React.useEffect(() => {
    // Initialize Websocket Connection
    console.log("Initializing Websocket Connection");

    // Check if a websocket connection already exists
    if (connectedWS) {
      console.log("Websocket Connection already exists");
      return;
    }

    const ws = io("http://localhost:3002", {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    ws.on("connect", () => {
      console.log("Connected to Websocket -->: ", ws.id, "For User: ", user.id);
      setConnectedWS(ws);
    });

    ws.on("disconnect", () => {
      console.log("Disconnected from Websocket");
    });

    ws.on("message", (data) => {
      console.log("Message Received: ", data);
    });

    ws.on(`received_message_${user.id}`, async (data) => {
      console.log("Received Message for User: ", data, _threads);
      if (data && data.thread_id) {
        // Check if the thread already exists
        const threadExists = _threads.find((thread) => {
          console.log(
            "Thread: ",
            thread.threadLinkId,
            "Data ---",
            data.thread_link_id
          );
          return thread.threadLinkId === data.thread_link_id;
        });
        console.log("Does Thread exist: ", threadExists);
        if (threadExists) {
          // If the thread exists, add the message to the thread
          const newThreads = _threads.map((thread) => {
            if (thread.id === data.thread_id) {
              thread.messages.push(data);
            }
            return thread;
          });
          setThreads(newThreads);
        } else {
          const threadService = new ThreadService();
          const userService = new UserService();
          // Reach out to the User Service to get the user details
          const sender = await userService.getUser(data.sender_id);
          console.log("--> Sender: ", sender);
          if (!!sender) {
            console.log("Sender Exists!");
            const newThread = {
              id: "",
              messages: [data],
              participants: [],
              userId: user.id,
              createdAt: new Date().toISOString(),
              isActive: true,
              lastMessage: data.message,
              threadName: sender.firstName ?? sender.email,
              threadLinkId: data.thread_link_id,
            };
            console.log("Creating new thread: ", newThread);
            threadService
              .createThread(newThread)
              .then((res) => {
                console.log("New Thread Created: ", res);
                if (res && res.length > 0) {
                  setThreads([..._threads, res[0]]);
                  setCurrentThread(res[0]);
                } else {
                  console.log("Error Creating Thread", res);
                }
              })
              .catch((err) => {
                console.log("Error Creating Thread: ", err);
              });
          }
        }
      }
    });

    ws.emit("join_home", {
      user_id: user.id,
    });

    ws.on(user.id, (data) => {
      console.log("Received Message for User HOME: ", data);
    });

    if (currentThread) {
      console.log("Current Thread: ", currentThread.id);
      ws.emit("join", {
        room: currentThread.id,
      });
    }
  }, []);

  const handleSendMessage = (message: string, participantUserIds: string[]) => {
    console.log("Sending Message to: ", participantUserIds);
    if (connectedWS && currentThread) {
      participantUserIds.forEach((participantUserId) => {
        connectedWS.emit(`incoming_message`, {
          message,
          sender_id: user.id,
          receiver_id: participantUserId,
          thread_id: currentThread.id,
          timestamp: new Date().toISOString(),
          thread_link_id: currentThread.threadLinkId,
        });
      });
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
            <Chat
              user={user}
              handleSendMessage={handleSendMessage}
              isNewChat={!currentThread || isNewChat}
              currentThread={currentThread}
              setCurrentThread={(thread: Threads) => {
                console.log("ChatCard Setting Current Thread: ", thread);
                setCurrentThread(thread);
                // save it to the threads array if it doesn't exist
                if (!_threads.find((t) => t.id === thread.id)) {
                  setThreads([..._threads, thread]);
                }
                setIsNewChat(false);
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

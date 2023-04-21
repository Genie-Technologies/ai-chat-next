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

import io from "socket.io-client";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";

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
    // Check if a websocket connection already exists
    if (connectedWS) {
      return;
    }

    const ws = io("http://localhost:3002", {
      transports: ["websocket"],
      auth: {
        token: accessToken,
      },
    });

    ws.on("connect", () => {
      setConnectedWS(ws);
    });

    ws.on("disconnect", () => {});

    ws.on("message", (data) => {});

    ws.on(`received_message_${user.id}`, async (data) => {
      if (data && data.thread_id) {
        // Check if the thread already exists
        const threadExists = _threads.find((thread) => {
          return thread.threadLinkId === data.thread_link_id;
        });

        if (threadExists) {
          const newThreads = _threads.map((thread) => {
            if (thread.threadLinkId === data.thread_link_id) {
              thread.messages.push(data);
              thread.lastMessage = data.message;
            }
            return thread;
          });
          setThreads(newThreads);
        } else {
          const sender = await userService.getUser(data.sender_id);

          if (!!sender) {
            const newThread = {
              createdAt: new Date().toISOString(),
              id: "",
              isActive: true,
              lastMessage: data.message,
              messages: [data],
              participants: [],
              threadLinkId: data.thread_link_id,
              threadName: sender.firstName ?? sender.email,
              userId: user.id,
            };

            threadService
              .createThread(newThread)
              .then((res) => {
                if (res && res.length > 0) {
                  setThreads([..._threads, res[0]]);
                  setCurrentThread(res[0]);
                } else {
                }
              })
              .catch((err) => {});
          }
        }
      }
    });

    ws.emit("join_home", {
      user_id: user.id,
    });

    // ws.on(user.id, (data) => {});

    if (currentThread) {
      ws.emit("join", {
        room: currentThread.id,
      });
    }
  }, []);

  const handleSendMessage = (message: string, participantUserIds: string[]) => {
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

      // Add the message to the current thread
      const newThreads = _threads.map((thread) => {
        if (thread.id === currentThread.id) {
          const newDate = new Date().toISOString();
          thread.messages.push({
            message,
            senderId: user.id,
            receiverId: participantUserIds[0],
            threadId: currentThread.threadLinkId,
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

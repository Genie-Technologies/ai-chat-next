import { useEffect, useState } from "react";
import { Theme, styled, useTheme, CSSObject } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Link from "next/link";

import { Chat } from "./Chat";
import ChatList from "./ChatList";
import AIChat from "./AIChat";

import { User } from "../../services/UserService/User.service";
import ThreadService, {
  Threads,
} from "../../services/ThreadService/Threads.service";

import {
  ReceivedMessageData,
  grabSubsetOfMessage,
  croppedLogoSrc,
} from "../utils";

const threadService = new ThreadService();

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ThreadSelect from "./ThreadSelect";

const drawerWidth = 340;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.default,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: theme.palette.background.default,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ChatCard({
  user,
  threads,
  socket,
}: {
  user: User;
  accessToken: string;
  threads: Threads[];
  socket: any;
}) {
  const theme = useTheme();

  const [openDrawer, setOpenDrawer] = useState(true);
  const [connectedWS, setConnectedWS] = useState<any>(null);
  const [_threads, setThreads] = useState<Threads[]>(
    threads && threads.length > 0 ? threads : []
  );
  const [currentThread, setCurrentThread] = useState<Threads | null>(null);

  const handleDrawerOpenOrClose = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    function onConnect() {
      setConnectedWS(true);
    }

    function onDisconnect() {
      setConnectedWS(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // How to handle interrupted connections: https://socket.io/how-to/use-with-react#temporary-disconnections
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  // Listen for new messages
  useEffect(() => {
    if (!connectedWS) return;
    function onReceivedMessage(messageData: ReceivedMessageData) {
      const { threadId, newMessage, participants } = messageData;
      if (threadId) {
        // Check if the thread already exists
        const threadExists = _threads.find((thread) => {
          return thread.id === threadId;
        });

        if (threadExists) {
          setThreads((prevThreads) => {
            return prevThreads.map((thread) => {
              if (thread.id === messageData.threadId) {
                const updatedThread = { ...thread };
                updatedThread.lastMessage = grabSubsetOfMessage(
                  newMessage.message
                );
                return updatedThread;
              }
              return thread;
            });
          });
        } else {
          // TODO: This is for creating new threads which we don't have yet.
          // const newThread = {
          //   createdAt: newMessage.createdAt,
          //   isActive: true,
          //   lastMessage: grabSubsetOfMessage(newMessage.message),
          //   // messages: [newMessage],
          //   participants: participants,
          //   userId: newMessage.senderId,
          //   threadName: messageData.threadName,
          //   id: messageData.threadId
          // };
          // setThreads([..._threads, newThread])
        }
      }
    }

    socket.on(`received_message`, onReceivedMessage);

    return () => {
      socket.off(`received_message`, onReceivedMessage);
    };
  }, [connectedWS, socket, _threads, user.id]);

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
        user_id: user.id,
      });

      // Set last message of thread
      const newThreads = _threads.map((thread) => {
        if (thread.id === currentThread.id) {
          const newDate = new Date().toISOString();

          thread.lastMessage = message;
        }
        return thread;
      });

      setThreads(newThreads);
    }
  };

  const onSetCurrentThread = async (threadId: string | null) => {
    if (!threadId) {
      setCurrentThread(null);
      return;
    }

    // fetch messages for threadId
    const res = await threadService.getThread(threadId, user.id);

    if (!res) {
      return;
    }

    setThreads((prevThreads) => {
      if (prevThreads.find((thread) => thread.id === threadId)) {
        return prevThreads.map((thread) => {
          if (thread.id === threadId) {
            res.isActive = true;
            return res;
          }
          return thread;
        });
      } else {
        return [...prevThreads, res];
      }
    });
    setCurrentThread(res);
  };

  return (
    <Card>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={openDrawer}
          anchor="left"
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <DrawerHeader>
            {openDrawer ? (
              <Box
                display={"flex"}
                title="ResponAi"
                width={{ xs: 70 }}
                sx={{ marginRight: "auto" }}
              >
                <Link href={"/"} style={{ textDecoration: "none" }}>
                  <Box
                    component={"img"}
                    src={croppedLogoSrc}
                    height={1}
                    width={100}
                  />
                </Link>
              </Box>
            ) : null}

            <IconButton onClick={handleDrawerOpenOrClose}>
              <MenuIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <ChatList
            threads={_threads}
            currentThread={currentThread}
            user={user}
            setCurrentThread={onSetCurrentThread}
            openDrawer={openDrawer}
            setThreads={setThreads}
          />
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
          }}
        >
          {currentThread ? (
            <Chat
              user={user}
              handleSendMessage={handleSendMessage}
              currentThread={currentThread}
              setThreads={setThreads}
              socket={socket}
              setCurrentThread={setCurrentThread}
            />
          ) : (
            <AIChat
              ThreadSelect={({ selectedThread, setThreadId }: any) => (
                <ThreadSelect
                  threads={threads}
                  selectedThread={selectedThread}
                  setThreadId={setThreadId}
                />
              )}
            />
          )}
        </Box>
      </Box>
    </Card>
  );
}

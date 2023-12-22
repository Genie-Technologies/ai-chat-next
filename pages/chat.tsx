import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";

import { useState } from "react";
import Alert from "@mui/material/Alert";
import ChatCard from "../components/Chat/ChatCard";
import Head from "next/head";
import Snackbar from "@mui/material/Snackbar";
import UserService, { AuthOUser } from "../services/UserService/User.service";
import ThreadService, {
  Threads,
} from "../services/ThreadService/Threads.service";
import { connectSocket } from "../components/socket";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ChatPage = ({
  user,
  accessToken,
  threads,
}: {
  user: any;
  accessToken: any;
  threads: Threads[];
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");
  // TODO: This could potentially cause a bug if this component rerenders. Had
  // bug previosly when in child ChatCard component and rerendering.
  let socket = connectSocket(accessToken);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("snackbar_message", (e) => {
      const { detail } = e as CustomEvent;
      setMessage(detail.message);
      setSeverity(detail.severity);
      setSnackbarOpen(true);
    });
  }

  return (
    <>
      <Head>
        <title>Respon Chat</title>
      </Head>
      <Box sx={{ flexGrow: 1, p: 2, padding: 0 }}>
        {user ? (
          <ChatCard
            user={user}
            accessToken={accessToken}
            threads={threads}
            socket={socket}
          />
        ) : (
          <Typography variant="h4" component="h4">
            You are not logged in.
          </Typography>
        )}
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={severity}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ChatPage;

// export const maxDuration = 30;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context): Promise<any> {
    const { req, res } = context;

    console.log("req", req);
    console.log("res", res);
    const session = await getSession(req, res);

    console.log("session", session);

    const nullReturn = {
      user: null,
      accessToken: null,
      threads: null,
    };

    if (session) {
      const user = session.user;
      const accessToken = (await getAccessToken(req, res).catch((err) => {
        if (err.code === "ERR_EXPIRED_ACCESS_TOKEN") {
          // Clear the cookie and redirect to the login page
          res.writeHead(302, {
            Location: "/api/auth/logout",
          });
          res.end();

          return null;
        }
      })) as any;

      const userService = new UserService();
      const threadService = new ThreadService();

      if (!accessToken || !user) {
        return {
          props: nullReturn,
        };
      }

      const userData = await userService.getUser(
        user.email,
        user as AuthOUser,
        accessToken.accessToken
      );

      if (!userData) {
        return {
          props: nullReturn,
        };
      }

      const threads = await threadService.getThreads(userData.id as string);

      return {
        props: {
          user: userData,
          accessToken: accessToken,
          threads,
        },
      };
    }

    return {
      props: {
        user: null,
        accessToken: null,
        threads: null,
      },
    };
  },
});

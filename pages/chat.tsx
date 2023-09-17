import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import { Main } from "../components/layouts";
import Head from "next/head";
import { Alert, Snackbar, Typography } from "@mui/material";
import UserService, { AuthOUser } from "../services/UserService/User.service";
import { useEffect, useState } from "react";
import ThreadService, {
  Threads,
} from "../services/ThreadService/Threads.service";
import { connectSocket } from "../components/socket";

const ChatPage = ({
  user,
  accessToken,
  threads,
}: {
  user: any;
  accessToken: any;
  threads: Threads[];
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "warning" | "info" | "success"
  >("success");
  // TODO: This could potentially cause a bug if this component rerenders. Had
  // bug previosly when in child component and rerendering. 
  let socket = connectSocket(accessToken);

  const handleClose = () => {
    setOpen(false);
  };

  if (typeof window !== "undefined") {
    window.addEventListener("snackbar_message", (e) => {
      const { detail } = e as CustomEvent;
      setMessage(detail.message);
      setSeverity(detail.severity);
      setOpen(true);
    });
  }

  return (
    <Main>
      <Head>
        <title>Respon Chat</title>
      </Head>
      <Paper>
        {user ? (
          <ChatCard user={user} accessToken={accessToken} threads={threads} socket={socket} />
        ) : (
          <Typography variant="h4" component="h4">
            You are not logged in.
          </Typography>
        )}
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Main>
  );
};

export default ChatPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context): Promise<any> {
    const { req, res } = context;

    const session = await getSession(req, res);

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

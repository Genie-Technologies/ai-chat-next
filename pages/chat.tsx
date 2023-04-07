import {
  getAccessToken,
  getSession,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0";
import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import { Main } from "../components/layouts";
import Head from "next/head";
import { Typography } from "@mui/material";
import UserService, { AuthOUser } from "../services/UserService/User.service";
import { useEffect } from "react";
import ThreadService from "../services/ThreadService/Threads.service";

const ChatPage = ({ user, accessToken, threads }: any) => {
  useEffect(() => {
    console.log("--> User: ", user);
  }, []);
  return (
    <Main>
      <Head>
        <title>Respon Chat</title>
      </Head>
      <Paper>
        {user ? (
          <ChatCard user={user} accessToken={accessToken} threads={threads} />
        ) : (
          <Typography variant="h4" component="h4">
            You are not logged in.
          </Typography>
        )}
      </Paper>
    </Main>
  );
};

export default ChatPage;

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context): Promise<any> {
    const { req, res } = context;
    const session = await getSession(req, res);

    if (session) {
      const user = session.user;
      const accessToken = await getAccessToken(req, res);

      console.log("Access Token ---> ", accessToken);

      // if session exists, then reach out to the API to get the user data
      const userService = new UserService();
      const threadService = new ThreadService();

      const userData = await userService.getUser(
        user.sid,
        user as AuthOUser,
        accessToken.accessToken
      );

      const threads = await threadService.getThreads(user.sid);
      console.log("Threads: ", threads);

      // Get user token from Auth0
      console.log("Access Token: ", accessToken);

      console.log("User: ", userData);

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

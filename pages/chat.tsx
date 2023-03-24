import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import { Main } from "../components/layouts";
import Head from "next/head";
import { Typography } from "@mui/material";
import UserService, { AuthOUser } from "../services/UserService/User.service";

const ChatPage = ({ user }: any) => {
  return (
    <Main>
      <Head>
        <title>Respon Chat</title>
      </Head>
      <Paper>
        {user ? (
          <ChatCard user={user} />
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
  async getServerSideProps(context) {
    const { req, res } = context;
    const session = await getSession(req, res);

    if (session) {
      const user = session.user;

      // if session exists, then reach out to the API to get the user data
      const userService = new UserService();
      const userData = await userService.getUser(user.sid, user as AuthOUser);

      return {
        props: {
          user: userData,
        },
      };
    }

    return {
      props: {
        user: null,
      },
    };
  },
});

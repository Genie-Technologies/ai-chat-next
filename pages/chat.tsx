import { Container } from "@mui/material";
import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import styles from "../styles/ChatPage.module.scss";
import { Main } from "../components/layouts";
import Head from "next/head";

export default function ChatPage() {
  return (
    <Main>
      <Head>
        <title>Respon Chat</title>
      </Head>
      <Paper>
        <ChatCard />
      </Paper>
    </Main>
  );
}

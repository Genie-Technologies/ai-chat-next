import { Container } from "@mui/material";
import { Chat } from "../components/Chat";
import ChatCard from "../components/Chat/ChatCard";

import styles from "../styles/ChatPage.module.scss";
import { Main } from "../components/layouts";
import Head from "next/head";

export default function ChatPage() {
  return (
    <Main>
      <Head>
        <title>Chat</title>
      </Head>
      <Container className={styles.container}>
        <ChatCard />
      </Container>
    </Main>
  );
}

import { Container } from "@mui/material";
import { Chat } from "../components/Chat";
import ChatCard from "../components/Chat/ChatCard";

import styles from "../styles/ChatPage.module.scss";

export default function ChatPage() {
  return (
    <Container className={styles.container}>
      <ChatCard />
    </Container>
  );
}

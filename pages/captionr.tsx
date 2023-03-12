import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import { Main } from "../components/layouts";
import Head from "next/head";
import CaptionrCard from "../components/Captionr/CaptionrCard";
import { croppedLogoSrc } from "../components/utils";

export default function ChatPage() {
  return (
    <Main>
      <Head>
        <title>CaptionR By ResponAi</title>
        <meta name="description" content="CaptionR By ResponAi" />
        <link rel="icon" href={croppedLogoSrc} />
      </Head>
      <Paper>
        <CaptionrCard />
      </Paper>
    </Main>
  );
}

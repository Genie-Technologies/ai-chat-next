import { croppedLogoSrc } from "../components/utils";
import { Main } from "../components/layouts";
import { Support } from "../components/views/DesktopApp/components";
import Head from "next/head";
import Paper from "@mui/material/Paper";

export default function SupportPage() {
  return (
    <Main>
      <Head>
        <title>Support</title>
        <meta name="description" content="Support" />
        <link rel="icon" href={croppedLogoSrc} />
      </Head>
      <Paper elevation={0} sx={{ marginTop: 5, marginBottom: 5, padding: 2 }}>
        <Support />
      </Paper>
    </Main>
  );
}

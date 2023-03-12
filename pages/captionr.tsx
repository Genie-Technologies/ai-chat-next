import ChatCard from "../components/Chat/ChatCard";
import Paper from "@mui/material/Paper";

import { Main } from "../components/layouts";
import Head from "next/head";
import CaptionrCard from "../components/Captionr/CaptionrCard";

export default function ChatPage() {
  return (
    <Main>
      <Head>
        <title>CaptionR - ResponAi</title>
      </Head>
      <Paper>
        <CaptionrCard />

        {/* <FormControl>
          <Typography variant="h6" component="h6">
            URL
          </Typography>
          <TextField id="outlined-basic" label="URL" variant="outlined" />

          <Button
            variant="contained"
            onClick={() => {
              const url = document.getElementById(
                "outlined-basic"
              ) as HTMLInputElement;
              const urlValue = url.value;

              fetch("/api/captionr", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageFile: urlValue }),
              }).then((response) => {
                console.log(response);
              });
            }}
          >
            Submit
          </Button>
        </FormControl> */}
      </Paper>
    </Main>
  );
}

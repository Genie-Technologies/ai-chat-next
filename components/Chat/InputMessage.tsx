import styles from "../../styles/ChatPage.module.scss";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { Divider, IconButton, InputBase, Paper, useTheme } from "@mui/material";
import { aiGeneratedRepliesForDemo } from "../utils";

type InputMessageType = {
  input: string;
  setInput: Function;
  sendMessage: Function;
  loading: boolean;
};

function InputMessage({ input, setInput, sendMessage }: InputMessageType) {
  const theme = useTheme();

  const fillInput = (reply: string) => {
    setInput(reply);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "80%",
          margin: "10px auto",
          textAlign: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={0}
          className={styles.aiGeneratedOptions}
          sx={{
            flexWrap: "wrap",
            display:
              process.env.CHAT_FEATURE_ENABLED === "true" ? "none" : "flex",
          }}
        >
          {aiGeneratedRepliesForDemo.map((reply, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "auto",
                  height: "auto",
                  padding: "3px",
                }}
              >
                <Chip
                  key={index}
                  label={reply}
                  onClick={() => fillInput(reply)}
                  color={
                    theme.palette.mode === "dark" ? "secondary" : "primary"
                  }
                  variant="outlined"
                />
              </div>
            );
          })}
        </Stack>
        <br />
        <Paper
          component="form"
          elevation={5}
          sx={{
            p: "5px 10px",
            display: "flex",
            alignItems: "center",
            width: "auto",
            borderRadius: "10px",
          }}
        >
          <InputBase
            color="primary"
            sx={{
              ml: 1,
              flex: 1,
              padding: "0 10px",
              height: "auto",
            }}
            placeholder="Type Message"
            inputProps={{ "aria-label": "type message" }}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(input);
                setInput("");
              }
            }}
            onChange={(e) => {
              if (e.target.value !== "\n") setInput(e.target.value);
            }}
            multiline
            required
          />

          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            color="primary"
            size="large"
            aria-label="directions"
            onClick={() => {
              sendMessage(input);
              setInput("");
            }}
            type="submit"
          >
            <SendIcon />
          </IconButton>
        </Paper>
      </div>
    </div>
  );
}

export default InputMessage;

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
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

function InputMessage({
  input,
  setInput,
  sendMessage,
  loading,
}: InputMessageType) {
  const theme = useTheme();
  return (
    <div>
      <Stack
        direction="column"
        spacing={0}
        className={styles.aiGeneratedOptions}
        sx={{
          // display: "flex",
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
                onClick={() => {
                  console.log(reply);
                }}
                color={theme.palette.mode === "dark" ? "secondary" : "primary"}
                variant="outlined"
              />
            </div>
          );
        })}
      </Stack>
      <br />
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "auto",
        }}
      >
        <InputBase
          color="primary"
          sx={{ ml: 1, flex: 1 }}
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
            setInput(e.target.value);
          }}
          multiline
          required
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="secondary"
          sx={{ p: "10px" }}
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
  );
}

export default InputMessage;

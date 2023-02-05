import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "../../styles/ChatPage.module.scss";
import SendIcon from "@mui/icons-material/Send";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";

type InputMessageType = {
  input: string;
  setInput: Function;
  sendMessage: Function;
};

function InputMessage({ input, setInput, sendMessage }: InputMessageType) {
  return (
    <div>
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
          required
        />

        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          color="primary"
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

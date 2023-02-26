import { Chat } from "./Chat";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatsList from "./ChatList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ChatCard() {
  const theme = useTheme();

  return (
    <Card
      sx={{
        minWidth: 275,
        borderRadius: "10px",
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}></Grid>
          <Grid item xs={4}>
            <Item
              style={{
                boxShadow: "none",
                backgroundColor: theme.palette.background.paper,
              }}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  float: "right",
                  ":hover": { cursor: "pointer" },
                }}
                component={"button"}
                alt="Shagun Mistry"
                variant="rounded"
                src="https://avatars.githubusercontent.com/u/47032027?v=4"
              ></Avatar>
            </Item>
          </Grid>
        </Grid>
        <Grid container spacing={0} justifyContent={"center"} marginTop={5}>
          <Grid item>
            <ChatsList />
          </Grid>
          <Grid
            item
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
              minHeight: "70vh",
              height: "100%",
            }}
          >
            <Chat />
          </Grid>
          <Grid
            item
            style={{
              boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
              minHeight: "70vh",
              height: "100%",
            }}
          >
            <Chat /> {/** This is AI Chat */}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

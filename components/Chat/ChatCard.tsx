import { Chat } from "../Chat";
import { styled } from "@mui/material/styles";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ChatsList from "./ChatList";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ChatCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Shagun Mistry
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>Some Daily Summary or something here.</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <ChatsList />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <Chat />
            </Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

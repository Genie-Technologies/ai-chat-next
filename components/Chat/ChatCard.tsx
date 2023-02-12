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
            <Item style={{ boxShadow: "none" }}>
              <Typography
                sx={{ fontSize: 18 }}
                color="text.primary"
                gutterBottom
              >
                Shagun Mistry
              </Typography>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ boxShadow: "none" }}>
              Some Daily Summary or something here.
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item style={{ boxShadow: "none" }}>
              <ChatsList />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item
              style={{
                borderRadius: "10px",
                boxShadow: "rgba(0, 0, 0, 0.25) 0px 25px 50px -12px",
              }}
            >
              <Chat />
            </Item>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

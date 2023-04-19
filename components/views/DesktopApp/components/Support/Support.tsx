/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";

const supportTeam = [
  {
    name: "Shagun Mistry",
    title: "Co-Founder",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/responai-70dd0.appspot.com/o/about%2Fshagun_mistry.png?alt=media&token=c67d7e95-e036-4db0-8032-b65d1b27b537",
  },
  {
    name: "Alex Lebron",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/responai-70dd0.appspot.com/o/about%2FAlex_Lebron.jpeg?alt=media&token=87ebe5c9-8658-4d26-86a8-7195b043d805",
    title: "Co-Founder",
  },
];
const Support = (): JSX.Element => {
  return (
    <>
      <Box>
        <Box marginBottom={15}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontWeight: "medium",
            }}
            gutterBottom
            color={"secondary"}
            align={"center"}
          >
            Support Team
          </Typography>
          <Typography variant={"h4"} sx={{ fontWeight: 700 }} align={"center"}>
            Our friendly support team will help you with anything
          </Typography>
          <Typography
            variant="h6"
            component="p"
            color="text.secondary"
            align={"center"}
          >
            If you have any questions, please contact us. We'll be there to lend
            a helping hand.
          </Typography>
          <Box marginTop={2} display={"flex"} justifyContent={"center"}>
            <a href="mailto:shagun.mistry@protonmail.com">
              <Button
                color={"primary"}
                variant={"contained"}
                size={"large"}
                startIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    width={20}
                    height={20}
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                }
              >
                Contact us
              </Button>
            </a>
          </Box>
        </Box>
      </Box>
      <Typography variant={"h3"} sx={{ fontWeight: 700 }} align={"center"}>
        Our team
      </Typography>

      <Box
        marginBottom={4}
        width={1}
        display={"flex"}
        justifyContent={"center"}
      >
        <Grid container spacing={2} justifyContent={"center"}>
          {supportTeam.map((item, i) => (
            <Grid item xs={6} md={3} key={i}>
              <ListItem
                disableGutters
                data-aos={"fade-up"}
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "center" },
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={item.name}
                    sx={{
                      width: 100,
                      height: 100,
                      marginRight: 2,
                    }}
                    src={item.avatar}
                  />
                </ListItemAvatar>
                <ListItemText primary={item.name} secondary={item.title} />
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Support;

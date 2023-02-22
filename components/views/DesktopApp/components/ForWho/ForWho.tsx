import React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import styles from "../../../../../styles/ForWho.module.scss";

const forWho = [
  {
    title: "Home",
    icon: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fvideo-call.png?alt=media&token=c3a74a1e-ed1c-40ef-a680-6f3f542ec687",
  },
  {
    title: "Work",
    icon: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fpet-cats.png?alt=media&token=6682f3ea-1f5d-4d5a-bc27-8d4542d47071",
  },
  {
    title: "Play",
    icon: "https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fplaying-games.png?alt=media&token=67cb9492-8cb5-4f4d-8d55-bd42ecd7f2e1",
  },
];

const Reviews = (): JSX.Element => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2}>
        {forWho.map((item, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box
              display={"block"}
              width={1}
              height={1}
              sx={{
                textDecoration: "none",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                data-aos={"fade-up"}
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                flexDirection={"column"}
                display={"flex"}
                className={styles.ForWhoBox}
              >
                <CardContent
                  sx={{
                    margin: "0 auto",
                    display: "block",
                  }}
                >
                  <Box
                    component={Avatar}
                    width={{ xs: 200, md: 220 }}
                    height={{ xs: 200, md: 220 }}
                    marginBottom={2}
                    src={item.icon}
                  />
                  <Typography
                    variant={"h5"}
                    gutterBottom
                    sx={{ fontWeight: 600, textAlign: "center" }}
                  >
                    {item.title}
                  </Typography>
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;

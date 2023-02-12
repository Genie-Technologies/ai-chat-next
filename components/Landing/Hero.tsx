import { Box, Grid, Paper, Typography } from "@mui/material";

import styles from "../../styles/Hero.module.scss";

export function Hero() {
  return (
    <div className={styles.heroPaper}>
      <Box className={styles.heroBox}>
        <Typography variant="h2" component="h1" gutterBottom>
          Intelligent Conversations, Powered by AI
        </Typography>
        <Typography variant="h4" component="h4">
          Experience the Future of Messaging Today
        </Typography>
      </Box>

      <Box className={styles.heroIllustrationBox}>
        <Grid container spacing={3} className={styles.heroGrid}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} className={styles.heroIllustration}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fwork-pressure.png?alt=media&token=5676e897-3380-4eed-ac4e-0ab2fdcb7af9"
                alt="Work"
                className={styles.heroIllustrationImage}
              />
              <Typography variant="h5" component="h5">
                For Work
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} className={styles.heroIllustration}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fpet-cats.png?alt=media&token=6682f3ea-1f5d-4d5a-bc27-8d4542d47071"
                alt="Home"
                className={styles.heroIllustrationImage}
              />
              <Typography variant="h5" component="h5">
                For Home
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={0} className={styles.heroIllustration}>
              <img
                src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fplaying-games.png?alt=media&token=67cb9492-8cb5-4f4d-8d55-bd42ecd7f2e1"
                alt="Play"
                className={styles.heroIllustrationImage}
              />
              <Typography variant="h5" component="h5">
                For Play
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

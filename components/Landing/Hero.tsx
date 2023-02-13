import { Box, Button, Grid, Paper, Typography } from "@mui/material";

import styles from "../../styles/Hero.module.scss";
import Dialog from "../GeneralDialog/Dialog";
import { useState } from "react";
import SignUpForm from "../Signup/Signup";

export function Hero() {
  const [openDialog, setOpenDialog] = useState(false);

  const openSignUpModal = () => {
    setOpenDialog(true);
  };
  return (
    <div className={styles.heroPaper}>
      <Box className={styles.heroBox}>
        <Typography variant="h3" component="h1" gutterBottom>
          Intelligent Conversations, Powered by AI
        </Typography>
        <Typography variant="h4" component="h4">
          Experience the Future of Messaging Today
        </Typography>

        <Box>
          <Button
            variant="contained"
            color="secondary"
            className={styles.heroButton}
            onClick={() => openSignUpModal()}
          >
            <Typography variant="h5" component="h5">
              Get Started
            </Typography>
          </Button>
        </Box>
      </Box>

      <Dialog open={openDialog} handleClose={() => setOpenDialog(false)}>
        <SignUpForm />
      </Dialog>
    </div>
  );
}

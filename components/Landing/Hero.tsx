import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";

import styles from "../../styles/Hero.module.scss";
import Dialog from "../GeneralDialog/Dialog";
import { useState } from "react";

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
        {/** Create a Card to show for sign up */}
        <Card
          className={styles.root}
          style={{
            minWidth: 275,
            maxWidth: 500,
            margin: "auto",
            marginTop: 50,
            background: "transparent",
            boxShadow: "none",
          }}
        >
          <CardMedia
            component="img"
            height="200"
            image="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2FCo-working.png?alt=media&token=3ac78f2d-35b6-40ac-ab0e-ca2019bb3b8c"
            alt="illustration"
          />
          <CardContent>
            <Typography variant="h3" gutterBottom>
              Subscribe by Email
            </Typography>
            <Typography>
              We will send you the latest news and updates about our product!
            </Typography>
            <TextField
              id="outlined-basic-email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              color="secondary"
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginRight: "auto", marginLeft: "auto" }}
            >
              Subscribe
            </Button>
          </CardActions>
        </Card>
      </Dialog>
    </div>
  );
}

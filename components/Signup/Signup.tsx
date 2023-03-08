import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";

import styles from "../../styles/Signup.module.scss";
import { Stack } from "@mui/system";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { CircularLoader } from "../Shared/CircularLoader";

export function SignUpForm() {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    if (!e) {
      e = {
        preventDefault: () => {},
      } as React.FormEvent<HTMLFormElement>;
    }

    e.preventDefault();
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await res.json();

    setIsLoading(false);
    if (data.success) {
      setSuccess("Success! You are now signed up for early access.");
      setOpenSnackBar(true);
      setError("");
      setEmail("");
    } else {
      setError(data.error);
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      setEmail(email);
      setError("");
    } else {
      setError("Please enter a valid email address.");
    }
    return re.test(email);
  };

  const signUpUser = () => {
    if (validateEmail(email)) {
      handleSubmit();
    }
  };

  if (isLoading) {
    return (
      <Container className={styles.signUpContainer} sx={{ height: "100%" }}>
        <CircularLoader
          color="secondary"
          variant="indeterminate"
          sx={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card
        className={styles.signUpCard}
        sx={{ backgroundColor: theme.palette.background.paper }}
      >
        <CardContent className={styles.signUpContainer}>
          <Typography
            variant="h5"
            className={styles.signUpHeader}
            color="primary"
          >
            SIGN UP FOR EARLY ACCESS
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Email"
              value={email}
              onBlur={(e) => validateEmail(e.target.value)}
              onChange={(e) => setEmail(e.target.value)}
              required
              helperText="Please enter a valid email address."
              error={error ? true : false}
            />
            <Button
              type="submit"
              className={styles.signUpButton}
              color="secondary"
              variant="contained"
              onClick={() => signUpUser()}
            >
              Sign Up
            </Button>
          </Stack>

          {success && (
            <Snackbar
              open={openSnackBar}
              autoHideDuration={6000}
              onClose={() => setOpenSnackBar(false)}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity="success">
                <AlertTitle>Successfully signed up!</AlertTitle>
                {success}
              </Alert>
            </Snackbar>
          )}
        </CardContent>
      </Card>
    </form>
  );
}

export default SignUpForm;

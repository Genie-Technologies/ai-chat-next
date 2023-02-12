import {
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import styles from "../../styles/Signup.module.scss";
import { Stack } from "@mui/system";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    if (data.error) {
      setError(data.error);
    } else {
      setSuccess(data.success);
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

  return (
    <form onSubmit={handleSubmit}>
      <Card className={styles.signUpCard}>
        <CardContent className={styles.signUpContainer}>
          <Typography
            variant="h4"
            className={styles.signUpHeader}
            color="secondary"
          >
            Sign Up
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
              color="primary"
              variant="contained"
              disabled={error ? true : false}
            >
              Sign Up
            </Button>
          </Stack>

          {success && <Typography variant="h6">{success}</Typography>}
        </CardContent>
      </Card>
    </form>
  );
}

export default SignUpForm;

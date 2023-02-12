import { Button, Grid, Paper, Typography } from "@mui/material";
import styles from "../styles/Features.module.scss";
import Link from "next/link";

export default function FeaturesList() {
  return (
    <div>
      <Typography variant="h3" component="h2" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={0} className={styles.featureText}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              className={styles.featureHeader}
              color="secondary"
            >
              AI-Powered Chat Summaries
            </Typography>
            <Typography variant="body1" component="p">
              A valuable tool for anyone who wants to stay up-to-date with their
              chats, even when they are busy or on-the-go. Whether you are in a
              group chat for work, socializing with friends, or organizing an
              event, this feature will help you stay on top of what's important.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fvideo-call.png?alt=media&token=c3a74a1e-ed1c-40ef-a680-6f3f542ec687"
              alt="AI-Powered Chat Summaries"
              className={styles.featureImage}
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={0}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fpeople-collaborating.png?alt=media&token=8d584334-1254-430f-814e-f1eb50decfbc"
              alt="Personal Touch: A Customized Chat Experience for Every Person"
              className={styles.featureImage}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0} className={styles.featureText}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              className={styles.featureHeader}
              color="secondary"
            >
              A Personalized Chat Experience for Every Person
            </Typography>
            <Typography variant="body1" component="p">
              Say goodbye to generic one-size-fits-all messaging and hello to a
              truly personalized experience for every person you talk to! Every
              conversation feels like a one-of-a-kind experience. So why settle
              for an ordinary chat when you can have a personalized one?
              <br />
              {/** Surround the text with a link to the chat */}
              <Button variant="contained" color="secondary">
                <Link href="/chat">Try it out now!</Link>
              </Button>
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={0} className={styles.featureText}>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              className={styles.featureHeader}
              color="secondary"
            >
              Smart Effortless and Personalized Replies
            </Typography>
            <Typography
              variant="body1"
              component="p"
              className={styles.featureDetails}
            >
              Tired of typing out long responses every time you message someone?
              With Smart Replies, you'll receive
              <Typography variant="body1" component="strong" color="secondary">
                {" "}
                personalized suggestions based on your texting style and the
                context of the conversation.
              </Typography>
              <br />
              Say goodbye to repetitive typing and hello to effortless, natural
              conversations!
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={0}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/shagunresume.appspot.com/o/CosmicChat%2Fmultimedia.png?alt=media&token=6abc53d6-977f-4637-b12a-c7f2f65da507"
              alt="Smart Effortless and Personalized Replies"
              className={styles.featureImage}
            />
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={0} className={styles.moreFeatures}>
        <Typography variant="h4" component="h2" gutterBottom>
          And many more features!
        </Typography>
        <Typography variant="body1" component="p">
          <Button variant="contained" color="secondary">
            <Link href="/features">Learn more</Link>
          </Button>
        </Typography>
      </Paper>
    </div>
  );
}

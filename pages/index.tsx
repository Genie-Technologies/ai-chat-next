import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Layout, Text, Page } from "@vercel/examples-ui";

function Home() {
  return (
    <Page className="flex flex-col gap-12">
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Simplify Your Life with AI-Powered Conversations
          </Typography>
          <Typography variant="h5" component="h3">
            Save Time and Effort with Every Chat
          </Typography>
        </Box>
      </Container>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;

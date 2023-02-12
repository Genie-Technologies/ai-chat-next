import { Hero } from "../components/Landing/Hero";
import { Layout, Page } from "@vercel/examples-ui";
import Container from "@mui/material/Container";
import FeaturesList from "../components/Features";
import Head from "next/head";
import SignUpForm from "../components/Signup/Signup";

function Home() {
  return (
    <div>
      <Head>
        <title>Cosmic Chat</title>
      </Head>
      <Hero />
      <br />
      <br />
      <br />
      <br />

      <Container maxWidth="lg" style={{ marginTop: "10em" }}>
        <FeaturesList />
        <SignUpForm />
      </Container>
    </div>
  );
}

Home.Layout = Layout;

export default Home;

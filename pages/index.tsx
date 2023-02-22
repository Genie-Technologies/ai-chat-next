import { Hero } from "../components/Landing/Hero";
import { Layout, Page } from "@vercel/examples-ui";
import Container from "@mui/material/Container";
import FeaturesList from "../components/Features";
import Head from "next/head";
import SignUpForm from "../components/Signup/Signup";
import ForWho from "../components/Landing/ForWho";
import DesktopApp from "../components/views/DesktopApp/Landing";

function Home() {
  return (
    <div>
      <Head>
        <title>Cosmic Chat</title>
      </Head>
      <DesktopApp />
      {/* <Hero />
      <ForWho />

      <Container maxWidth="lg" style={{ marginTop: "10%" }}>
        <FeaturesList />
        <SignUpForm />
      </Container> */}
    </div>
  );
}

Home.Layout = Layout;

export default Home;

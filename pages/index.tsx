import { Layout } from "@vercel/examples-ui";
import Head from "next/head";
import Landing from "../components/views/DesktopApp/Landing";

function Home() {
  return (
    <div>
      <Head>
        <title>ResponAi</title>
      </Head>
      <Landing />
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

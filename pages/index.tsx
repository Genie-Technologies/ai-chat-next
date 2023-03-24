import { Layout } from "@vercel/examples-ui";
import Head from "next/head";
import Landing from "../components/views/DesktopApp/Landing";

function Home() {
  return (
    <div>
      <Head>
        <title>ResponAi - Future of Messaging </title>
      </Head>
      <Landing />
    </div>
  );
}

Home.Layout = Layout;

export default Home;

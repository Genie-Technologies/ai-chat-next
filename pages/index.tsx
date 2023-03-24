import { Layout } from "@vercel/examples-ui";
import Head from "next/head";
import Landing from "../components/views/DesktopApp/Landing";
import { croppedLogoSrc } from "../components/utils";

function Home() {
  return (
    <div>
      <Head>
        <title>ResponAi - Future of Messaging </title>
        <link rel="icon" href={croppedLogoSrc} />
      </Head>
      <Landing />
    </div>
  );
}

Home.Layout = Layout;

export default Home;

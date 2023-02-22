import React from "react";
import Head from "next/head";
import Page from "../components/Page";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import "aos/dist/aos.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Converso - Next-Gen Messaging</title>
      </Head>
      <Page>
        <Component {...pageProps} />
        <Analytics />
      </Page>
    </React.Fragment>
  );
}

export default App;

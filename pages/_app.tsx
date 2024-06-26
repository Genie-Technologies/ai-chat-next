import React from "react";
import Head from "next/head";
import Page from "../components/Page";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

import { UserProvider } from "@auth0/nextjs-auth0/client";

import "aos/dist/aos.css";
import { croppedLogoSrc } from "../components/utils";

function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>ResponAi - Future of Messaging</title>
        <link rel="icon" href={croppedLogoSrc} />
      </Head>
      <Page>
        <UserProvider>
          <Component {...pageProps} />
          <Analytics />
        </UserProvider>
      </Page>
    </React.Fragment>
  );
}

export default App;

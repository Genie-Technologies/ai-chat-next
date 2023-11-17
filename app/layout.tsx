
import React from "react";
import Page from "../components/Page";
import { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { croppedLogoSrc } from "../components/utils";
import "aos/dist/aos.css";

export const metadata: Metadata = {
    title: 'Responai',
    description: 'Future of Messaging',
    icons: [
        {
            url: croppedLogoSrc,
            rel: 'icon',
        },
        ],
  }

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>
        <Page>
        <UserProvider>
            {children}
            <Analytics />
        </UserProvider>
      </Page>
            </body>
      </html>
    )
  }



   
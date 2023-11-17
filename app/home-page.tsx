'use client'

import { Layout } from "@vercel/examples-ui";
import Landing from "../components/views/DesktopApp/Landing";

export const metadata = {
    title: 'ResponAi - Future of Messaging',
  }

function Page() {
    console.log('LANDING PAGE')
  return (<Landing />);
}

Page.Layout = Layout;

export default Page;

import React from "react";
import Head from "next/head";
import { useUser } from "@auth0/nextjs-auth0/client";
import { CircularLoader } from "../components/Shared/CircularLoader";
import Paper from "@mui/material/Paper";
import { Main } from "../components/layouts";
import Link from "next/link";

export default function Dashboard() {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <CircularLoader color="primary" variant="indeterminate" />;
  }

  return (
    <Main>
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {user ? (
            <title>Dashboard - {user.name}</title>
          ) : (
            <title>ResponAi - Dashboard</title>
          )}
        </Head>
        <Paper>
          <div>
            {user ? (
              <div>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard, {user.name}!</p>
              </div>
            ) : (
              <div>
                <h1>Dashboard</h1>
                <p>You are not logged in.</p>
                <Link href="/api/auth/login">Login</Link>
              </div>
            )}
          </div>
        </Paper>
      </React.Fragment>
    </Main>
  );
}

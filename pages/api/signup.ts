import { NextApiResponse } from "next";
import { type NextRequest } from "next/server";

type NextApiRequest = NextRequest & {
  body: {
    email: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get the email from the request body
  const email = req.body.email;

  console.log(`Received request to subscribe ${email} to the newsletter.`);

  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  try {
    console.log("Sending request to lambda function...");
    const response = await fetch(
      "https://diigtm5ng7.execute-api.us-east-1.amazonaws.com/beta_signup",
      {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({ emailAddress: email }),
      }
    );

    // Get the resFponse from the lambda function
    // const data = await response.json();

    // Return the response to the client
    return res.status(200).json({
      success: true,
      message: `Successfully subscribed ${email}.`,
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: `Error subscribing ${email}.`,
    });
  }
}

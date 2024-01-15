import { type NextRequest, NextResponse } from "next/server";
import { Message, conversationsSummaryForDemo } from "../../components/utils";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const botName = "AI";
const userName = "News reporter";

// I don't think this func is being used. 
export default async function handler(req: NextRequest, res: any) {
  // Join the demo conversation summary in a single string that is formatted for the chat
  // conversationSummaryForDemo is an array of { threadName: string, summary: string }
  const conversationSummaryForDemo = conversationsSummaryForDemo
    .map((conversation) => {
      return `${conversation.threadName}: ${conversation.summary}`;
    })
    .join("\n");

  // return response with 200 and stringify json text
  return res.json({
    text: conversationSummaryForDemo,
  });
}

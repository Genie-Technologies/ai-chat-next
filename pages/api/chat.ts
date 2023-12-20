import { type NextRequest, NextResponse } from "next/server";
import { Message, conversationsSummaryForDemo } from "../../components/utils";

// break the app if the API key is missing
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing Environment Variable OPENAI_API_KEY");
}

const botName = "AI";
const userName = "News reporter"; // TODO: move to ENV var

export const maxDuration = 200


export default async function handler(req: NextRequest, res: any) {
  // read body from request
  // const body = await req.json();

  // // const messages = req.body.messages
  // const messagesPrompt = generatePromptFromMessages(body.messages);
  // const defaultPrompt = `Act like you are my closest friend and respond to this:\n\n${botName}: ${firstMessge}\n${userName}: ${messagesPrompt}\n${botName}: `;
  // const finalPrompt = process.env.AI_PROMPT
  //   ? `${process.env.AI_PROMPT}${messagesPrompt}\n${botName}: `
  //   : defaultPrompt;

  // const payload = {
  //   model: "text-davinci-003",
  //   prompt: finalPrompt,
  //   temperature: process.env.AI_TEMP ? parseFloat(process.env.AI_TEMP) : 0.7,
  //   max_tokens: process.env.AI_MAX_TOKENS
  //     ? parseInt(process.env.AI_MAX_TOKENS)
  //     : 200,
  //   top_p: 1,
  //   frequency_penalty: 0,
  //   presence_penalty: 0,
  //   stop: [`${botName}:`, `${userName}:`],
  //   user: body?.user,
  // };

  // const requestHeaders: Record<string, string> = {
  //   "Content-Type": "application/json",
  //   Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  // };

  // if (process.env.OPENAI_API_ORG) {
  //   requestHeaders["OpenAI-Organization"] = process.env.OPENAI_API_ORG;
  // }

  // const response = await fetch("https://api.openai.com/v1/completions", {
  //   headers: requestHeaders,
  //   method: "POST",
  //   body: JSON.stringify(payload),
  // });

  // const data = await response.json();

  // if (data.error) {
  //   console.error("OpenAI API error: ", data.error);
  //   return NextResponse.json({
  //     text: `ERROR with API integration. ${data.error.message}`,
  //   });
  // }

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

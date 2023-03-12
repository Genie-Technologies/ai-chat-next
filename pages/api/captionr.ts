import { NextApiResponse } from "next";
import { type NextRequest } from "next/server";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { Configuration, OpenAIApi } from "openai";

type NextApiRequest = NextRequest & {
  body: {
    imageFile: string;
    category?:
      | "food"
      | "travel"
      | "nature"
      | "people"
      | "animals"
      | "motivation"
      | "funny";
    socialMedia?: "twitter" | "instagram" | "facebook" | "tiktok";
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imageFile = req.body.imageFile;
  const category = req.body.category || "funny";
  const socialMedia = req.body.socialMedia || "all";

  console.log(`Received request to caption ${imageFile}.`);

  try {
    console.log("Sending request to Micorsoft Azure Computer Vision API...");
    const credentials = new ApiKeyCredentials({
      inHeader: {
        "Ocp-Apim-Subscription-Key": process.env.AZURE_COMPUTER_VISION_API_KEY,
      },
    });
    const client = new ComputerVisionClient(
      credentials,
      process.env.AZURE_COMPUTER_VISION_API_ENDPOINT || ""
    );

    const description = await client.describeImage(imageFile, {
      maxCandidates: 1,
    });

    // based on the description, generate a caption using OpenAI
    const openai = new OpenAIApi(
      new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      })
    );

    if (!description.captions || description.captions.length === 0) {
      throw new Error("No captions found");
    }

    const imageDesc = description.captions[0].text;

    const prompt = `Write a ${category} caption for ${socialMedia} for a picture that is about ${imageDesc}.`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          content: prompt,
          role: "user",
        },
      ],
      max_tokens: 500,
      temperature: 0.7,
      top_p: 1,
    });

    console.log("Response from OpenAI: ", response.data.choices);

    return res.status(200).json({
      success: true,
      message: response.data.choices[0]
        ? response.data.choices[0].message?.content
        : "",
    });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({
      success: false,
      message: `Error: ${error}`,
    });
  }
}

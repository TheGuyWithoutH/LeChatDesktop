import { Mistral } from "@mistralai/mistralai";
import Chat from "../data/chat";
import { z } from "zod";

/**
 * Mistral API client
 */
export const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY ?? "",
});

/**
 * Send chat messages to Mistral API
 * @param chat Chat object containing messages
 * @returns Promise containing the stream of response from Mistral API
 */
export const sendChatMessages = async (chat: Chat) => {
  return mistral.chat.stream({
    model: "mistral-small-latest",
    // @ts-ignore
    messages: chat.messages,
    safePrompt: true,
  });
};

/**
 * Generate a chat name for a given message
 * @param message Message to generate chat name for
 * @returns Promise containing the generated chat name
 */
export const generateChatName = async (message: string) => {
  const response = await mistral.chat.parse({
    model: "ministral-8b-latest",
    messages: [
      {
        role: "system",
        content: "Define a name for this chat.",
      },
      {
        role: "user",
        content: message,
      },
    ],
    responseFormat: z.object({
      name: z.string(),
    }),
    maxTokens: 250,
    temperature: 0,
  });

  return response.choices[0].message.parsed.name;
};

/**
 * Upload a file to Mistral API
 * @param file File to upload
 * @returns Promise containing the signed URL of the uploaded file
 */
export const uploadFile = async (file: File) => {
  try {
    const uploaded_file = await mistral.files.upload({
      file: file,
      // @ts-ignore
      purpose: "ocr",
    });

    const signedUrl = await mistral.files.getSignedUrl({
      fileId: uploaded_file.id,
    });

    return signedUrl.url;
  } catch (error) {
    console.error("Error uploading file", error);
    return "";
  }
};

/**
 * Mock function to send chat messages
 * @param chat Chat object containing messages
 * @returns Async generator containing mock responses
 */
export const mockSendChatMessages = async function* (chat: Chat) {
  console.log("Mocking chat messages");
  yield "Hello";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield "How can I help you?";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield "I am a mock response";
  await new Promise((resolve) => setTimeout(resolve, 1000));
  yield "I am a mock response";
};

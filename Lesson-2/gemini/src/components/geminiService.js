// import OpenAI from 'openai';

// const openai = new OpenAI({
//     apiKey: "",
//     dangerouslyAllowBrowser: true
// });

// export const getOpenAIResponse = async (prompt) => {

//     try {
//         const response = await openai.completions.create({
//             model: 'gpt-4.1',
//             prompt: prompt,
//         });
//         return response.output_text;
//     } catch (error) {
//         console.error("Error generating text:", error);
//         throw error;
//     }
// };

// The client gets the API key from the environment variable `GEMINI_API_KEY`.

//API integration
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: "AIzaSyDfJJ_zOvIH7hs7-Ny3KQWgfhwNEb78Ums",
});

export default async function getGeminiTextResponse(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response;
}


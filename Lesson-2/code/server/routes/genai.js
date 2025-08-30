import express, { json } from "express";

const routes = express.Router();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

// create a gemini chat model (intergartin gemini api)
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
      apiKey: "AIzaSyDfJJ_zOvIH7hs7-Ny3KQWgfhwNEb78Ums",

});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a AI bot!"],
  ["placeholder", "{history}"],
  ["human", "{input}"],
]);

// chain model + prompt
const chain = prompt.pipe(model);

// wrap chain with memory
const chainWithHistory = new RunnableWithMessageHistory({
  runnable: chain,
  getMessageHistory: async (sessionId) => {
    if (!messageHistories.has(sessionId)) {
      messageHistories.set(sessionId, new InMemoryChatMessageHistory());
    }

    return messageHistories.get(sessionId);
  },
  inputMessagesKey: "input",
  historyMessagesKey: "history",
});

// maintain chat history
routes.post("/api/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  console.log(message, sessionId);
  
  try {
    const response = await chainWithHistory.invoke(
      { input: message },
      { configurable: { sessionId } }
    );
    res.status(200), json({ reply: response.content });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "something went wrong" });
  }
});


export default routes;
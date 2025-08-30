// const express = require("express");
import express from "express";
const routes = express.Router();

// const ChatGoogleGenerativeAI = require("@langchain/community/chat_models/google_genai");
// const ChatPromptTemplate = require("@langchain/core/prompts");
// const RunnableWithMessageHistory = require("@langchain/core/runnables");
// const InMemoryChatMessageHistory = require("@langchain/core/chat_history");

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableWithMessageHistory } from "@langchain/core/runnables";
import { InMemoryChatMessageHistory } from "@langchain/core/chat_history";

const messageHistories = new Map();

// Create Gemini Chat model
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: "AIzaSyAQcQlPhbQuk5-TKQCbd1lLl3qtyZnnNZo",
});

// System + Human prompt
const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a helpful chatbot that remembers past conversations."],
  ["placeholder", "{history}"],
  ["human", "{input}"],
]);

// Chain with model + prompt
const chain = prompt.pipe(model);

// Wrap chain with memory
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

routes.post("/api/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  console.log(message);

  try {
    const response = await chainWithHistory.invoke(
      { input: message },
      { configurable: { sessionId } }
    );

    res.json({ reply: response.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default routes;

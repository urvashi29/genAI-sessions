import React, { useState } from "react";
import getGeminiTextResponse from "./geminiService";

const GoogleGeminiComponent = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    //api call
    const aiResponse = await getGeminiTextResponse(input);
    setResponse(aiResponse.text);
  };

  return (
    <div>
      <h2>Intergrating Gemini API with ReactJs.</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Enter Prompt..."
          onChange={(e) => setInput(e.target.value)}
        />
        <br />
        <button type="submit">Get Response</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default GoogleGeminiComponent;

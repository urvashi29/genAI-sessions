import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4()); // unique per chat session

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, sessionId }),
    });

    const data = await res.json();
    console.log(data);
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🤖 Gemini Chatbot with Memory</h2>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          height: "400px",
          overflowY: "scroll",
          marginBottom: "10px",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ margin: "5px 0" }}>
            <b>{msg.sender === "user" ? "🧑 You" : "🤖 Bot"}:</b> {msg.text}
          </div>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "70%", padding: "10px" }}
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        style={{ padding: "10px 20px", marginLeft: "10px" }}
      >
        Send
      </button>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [message, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId] = useState(uuidv4());

  const sendMessage = async () => {
    setMessages([...message, { sender: "user", text: input }]);

    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "ContentType": "application/json" },
      body: JSON.stringify({ message: input, sessionId }),
    });

    const data = await res.json();
    console.log(data);
    setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    setInput("");
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🤖 🧑Gemini Chatbot with Memory</h2>
      <div
        style={{
          border: "1px solid black",
          padding: "10px",
          height: "400px",
          marginBottom: "10px",
        }}
      >
        {message.map((msg) => {
          return <div>{msg.sender == "user" ? "You:🧑" : "🤖 Bot"}</div>;
        })}
      </div>

      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "70%", padding: "10pxs" }}
          placeholder="Type you message..."
        />
      </div>

      <button
        type="submit"
        onClick={sendMessage}
        style={{
          padding: "10px 20px",
          backgroundColor: "teal",
          color: "white",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default App;
